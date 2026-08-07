import {
  paddleServer,
  paddleServerConfig,
} from "@/lib/paddle/server";

import {
  getBillingSubscriptionByPaddleIdRepository,
  hasProcessedPaddleEventRepository,
  markPaddleEventProcessedRepository,
  upsertBillingSubscriptionRepository,
} from "@/repositories/billing.repository";

import type {
  BillingSubscription,
} from "@/types/billing";


export const runtime =
  "nodejs";


interface PaddleWebhookEvent {
  eventId: string;

  eventType: string;

  occurredAt:
    string | Date;

  data:
    PaddleSubscriptionData;
}


interface PaddleSubscriptionData {
  id: string;

  customerId: string;

  status:
    BillingSubscription["status"];

  customData?:
    Record<
      string,
      unknown
    > | null;

  items?: Array<{
    price?: {
      id?: string;

      productId?: string;
    };
  }>;

  currentBillingPeriod?: {
    endsAt?: string;
  } | null;

  scheduledChange?: {
    effectiveAt?: string;
  } | null;
}


export async function POST(
  request: Request
) {
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


  /*
   * Signature verification requires the
   * exact, unmodified raw request body.
   */
  const rawBody =
    await request.text();


  let event:
    PaddleWebhookEvent;


  try {
    event =
      (
        await paddleServer
          .webhooks
          .unmarshal(
            rawBody,

            paddleServerConfig
              .webhookSecret,

            signature
          )
      ) as unknown as
        PaddleWebhookEvent;
  } catch (error) {
    console.error(
      "Invalid Paddle webhook:",
      error
    );


    return new Response(
      "Invalid webhook signature.",
      {
        status: 400,
      }
    );
  }


  const occurredAt =
    event.occurredAt instanceof
    Date
      ? event.occurredAt
          .toISOString()
      : event.occurredAt;


  const alreadyProcessed =
    await hasProcessedPaddleEventRepository(
      event.eventId
    );


  if (alreadyProcessed) {
    return Response.json({
      received: true,

      duplicate: true,
    });
  }


  try {
    if (
      event.eventType ===
        "subscription.created" ||
      event.eventType ===
        "subscription.updated"
    ) {
      await processSubscriptionEvent(
        event.data,
        occurredAt
      );
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
      "Paddle webhook processing failed:",
      error
    );


    return new Response(
      "Webhook processing failed.",
      {
        status: 500,
      }
    );
  }
}


async function processSubscriptionEvent(
  data:
    PaddleSubscriptionData,

  occurredAt: string
) {
  const existing =
    await getBillingSubscriptionByPaddleIdRepository(
      data.id
    );


  /*
   * Ignore older events that arrived
   * after a newer subscription event.
   */
  if (
    existing &&
    new Date(
      existing.occurredAt
    ).getTime() >=
      new Date(
        occurredAt
      ).getTime()
  ) {
    return;
  }


  const customUserId =
    typeof data.customData
      ?.clerk_user_id ===
    "string"
      ? data.customData
          .clerk_user_id
      : null;


  const userId =
    customUserId ??
    existing?.userId;


  if (!userId) {
    throw new Error(
      "Paddle subscription does not contain a Clerk user ID."
    );
  }


  const firstPrice =
    data.items?.[0]?.price;


  await upsertBillingSubscriptionRepository(
    {
      userId,

      paddleCustomerId:
        data.customerId,

      paddleSubscriptionId:
        data.id,

      status:
        data.status,

      priceId:
        firstPrice?.id ??
        existing?.priceId ??
        null,

      productId:
        firstPrice
          ?.productId ??
        existing?.productId ??
        null,

      currentPeriodEnd:
        data.currentBillingPeriod
          ?.endsAt ??
        null,

      scheduledChangeAt:
        data.scheduledChange
          ?.effectiveAt ??
        null,

      occurredAt,
    }
  );
}