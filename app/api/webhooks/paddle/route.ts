import type {
  Customer,
  Subscription,
  Transaction,
} from "@paddle/paddle-node-sdk";

import {
  paddleServer,
  paddleServerConfig,
} from "@/lib/paddle/server";

import {
  getPlanFromPriceId,
} from "@/lib/billing/plans";

import {
  hasProcessedPaddleEventRepository,
  linkBillingIdentityRepository,
  markPaddleEventProcessedRepository,
  resolveUserIdForCustomerRepository,
  upsertBillingCustomerRepository,
  upsertBillingSubscriptionRepository,
  upsertBillingTransactionRepository,
} from "@/repositories/billing.repository";


export const runtime =
  "nodejs";


export const dynamic =
  "force-dynamic";


interface VerifiedWebhook<
  T
> {
  eventId: string;

  eventType: string;

  occurredAt:
    string | Date;

  data: T;
}


export async function POST(
  request: Request
) {
  /*
   * IMPORTANT:
   *
   * Signature verification needs the exact
   * raw request body.
   *
   * Do not request.json() before this.
   */
  const rawBody =
    await request.text();


  const signature =
    request.headers.get(
      "paddle-signature"
    );


  if (!signature) {
    return new Response(
      "Missing Paddle signature.",
      {
        status: 400,
      }
    );
  }


  let event:
    VerifiedWebhook<unknown>;


  try {
    const verified =
      await paddleServer
        .webhooks
        .unmarshal(
          rawBody,
          paddleServerConfig
            .webhookSecret,
          signature
        );


    event =
      verified as unknown as
        VerifiedWebhook<unknown>;
  } catch (error) {
    console.error(
      "Paddle webhook signature verification failed:",
      error
    );


    /*
     * Do NOT return 2xx.
     *
     * Paddle should retry invalid/failed
     * deliveries when appropriate.
     */
    return new Response(
      "Invalid webhook signature.",
      {
        status: 400,
      }
    );
  }


  const occurredAt =
    toIsoString(
      event.occurredAt
    );


  const duplicate =
    await hasProcessedPaddleEventRepository(
      event.eventId
    );


  if (duplicate) {
    return Response.json({
      received: true,

      duplicate: true,
    });
  }


  try {
    switch (
      event.eventType
    ) {
      case "customer.created":

      case "customer.updated":
        await handleCustomerEvent(
          event as
            VerifiedWebhook<Customer>
        );

        break;


      case "transaction.completed":
        await handleTransactionCompletedEvent(
          event as
            VerifiedWebhook<Transaction>
        );

        break;


      case "subscription.created":

      case "subscription.updated":

      case "subscription.canceled":
        await handleSubscriptionEvent(
          event as
            VerifiedWebhook<Subscription>
        );

        break;


      default:
        /*
         * Verified events that we don't
         * currently need are safely ignored.
         */
        break;
    }


    await markPaddleEventProcessedRepository(
      {
        eventId:
          event.eventId,

        eventType:
          event.eventType,

        occurredAt,
      }
    );


    return Response.json({
      received: true,
    });
  } catch (error) {
    console.error(
      `Paddle webhook processing failed for ${event.eventType}:`,
      error
    );


    /*
     * Again, do not return 2xx when our
     * fulfillment handler failed.
     */
    return new Response(
      "Webhook processing failed.",
      {
        status: 500,
      }
    );
  }
}


async function handleCustomerEvent(
  event:
    VerifiedWebhook<Customer>
) {
  const occurredAt =
    toIsoString(
      event.occurredAt
    );


  const customer =
    event.data;


  /*
   * customData normally won't have our
   * Clerk ID because checkout custom data
   * lives on the transaction/subscription.
   *
   * But support it when present.
   */
  const customUserId =
    readClerkUserId(
      customer.customData
    );


  const resolvedUserId =
    customUserId ??
    await resolveUserIdForCustomerRepository(
      customer.id
    );


  await upsertBillingCustomerRepository(
    {
      paddleCustomerId:
        customer.id,

      userId:
        resolvedUserId,

      email:
        customer.email,

      occurredAt,
    }
  );


  if (resolvedUserId) {
    await linkBillingIdentityRepository(
      customer.id,
      resolvedUserId
    );
  }
}


async function handleTransactionCompletedEvent(
  event:
    VerifiedWebhook<Transaction>
) {
  const occurredAt =
    toIsoString(
      event.occurredAt
    );


  const transaction =
    event.data;


  const firstItem =
    transaction.items[0];


  const priceId =
    firstItem?.price?.id ??
    null;


  const productId =
    firstItem?.price
      ?.productId ??
    null;


  const customUserId =
    readClerkUserId(
      transaction.customData
    );


  const resolvedUserId =
    customUserId ??
    (
      transaction.customerId
        ? await resolveUserIdForCustomerRepository(
            transaction.customerId
          )
        : null
    );


  await upsertBillingTransactionRepository(
    {
      paddleTransactionId:
        transaction.id,

      paddleCustomerId:
        transaction.customerId,

      paddleSubscriptionId:
        transaction.subscriptionId,

      userId:
        resolvedUserId,

      status:
        transaction.status,

      priceId,

      productId,

      /*
       * Store Paddle's value as-is.
       * Don't perform money calculations here.
       */
      total:
        transaction.details
          ?.totals
          ?.total ??
        null,

      currencyCode:
        transaction
          .currencyCode,

      occurredAt,
    }
  );


  if (
    transaction.customerId &&
    resolvedUserId
  ) {
    await linkBillingIdentityRepository(
      transaction.customerId,
      resolvedUserId
    );
  }
}


async function handleSubscriptionEvent(
  event:
    VerifiedWebhook<Subscription>
) {
  const occurredAt =
    toIsoString(
      event.occurredAt
    );


  const subscription =
    event.data;


  const firstItem =
    subscription.items[0];


  const priceId =
    firstItem?.price?.id ??
    null;


  const productId =
    firstItem?.price
      ?.productId ??
    null;


  const plan =
    getPlanFromPriceId(
      priceId
    );


  const customUserId =
    readClerkUserId(
      subscription.customData
    );


  const resolvedUserId =
    customUserId ??
    await resolveUserIdForCustomerRepository(
      subscription.customerId
    );


  await upsertBillingSubscriptionRepository(
    {
      userId:
        resolvedUserId,

      paddleCustomerId:
        subscription
          .customerId,

      paddleSubscriptionId:
        subscription.id,

      status:
        subscription.status,

      priceId,

      productId,

      planTier:
        plan?.plan ??
        null,

      billingInterval:
        plan?.interval ??
        null,

      currentPeriodEnd:
        subscription
          .currentBillingPeriod
          ?.endsAt ??
        null,

      scheduledChangeAction:
        subscription
          .scheduledChange
          ?.action ??
        null,

      scheduledChangeAt:
        subscription
          .scheduledChange
          ?.effectiveAt ??
        null,

      canceledAt:
        subscription
          .canceledAt ??
        null,

      occurredAt,
    }
  );


  if (resolvedUserId) {
    await linkBillingIdentityRepository(
      subscription.customerId,
      resolvedUserId
    );
  }
}


function readClerkUserId(
  customData:
    Record<
      string,
      unknown
    > | null
) {
  const value =
    customData
      ?.clerk_user_id;


  return typeof value ===
    "string"
    ? value
    : null;
}


function toIsoString(
  value:
    string | Date
) {
  return value instanceof Date
    ? value.toISOString()
    : value;
}