import "server-only";

import {
  adminClient,
} from "@/lib/supabase/admin";

import type {
  BillingSubscription,
} from "@/types/billing";


export async function getBillingSubscriptionByUserIdRepository(
  userId: string
) {
  const {
    data,
    error,
  } = await adminClient
    .from(
      "billing_subscriptions"
    )
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();


  if (error) {
    throw new Error(
      error.message
    );
  }


  if (!data) {
    return null;
  }


  return mapSubscriptionRow(
    data
  );
}


export async function getBillingSubscriptionByPaddleIdRepository(
  paddleSubscriptionId: string
) {
  const {
    data,
    error,
  } = await adminClient
    .from(
      "billing_subscriptions"
    )
    .select("*")
    .eq(
      "paddle_subscription_id",
      paddleSubscriptionId
    )
    .maybeSingle();


  if (error) {
    throw new Error(
      error.message
    );
  }


  if (!data) {
    return null;
  }


  return mapSubscriptionRow(
    data
  );
}


export async function upsertBillingSubscriptionRepository(
  subscription:
    BillingSubscription
) {
  const {
    error,
  } = await adminClient
    .from(
      "billing_subscriptions"
    )
    .upsert(
      {
        user_id:
          subscription.userId,

        paddle_customer_id:
          subscription
            .paddleCustomerId,

        paddle_subscription_id:
          subscription
            .paddleSubscriptionId,

        status:
          subscription.status,

        price_id:
          subscription.priceId,

        product_id:
          subscription.productId,

        current_period_end:
          subscription
            .currentPeriodEnd,

        scheduled_change_at:
          subscription
            .scheduledChangeAt,

        occurred_at:
          subscription.occurredAt,

        updated_at:
          new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    );


  if (error) {
    throw new Error(
      error.message
    );
  }
}


export async function hasProcessedPaddleEventRepository(
  eventId: string
) {
  const {
    data,
    error,
  } = await adminClient
    .from(
      "paddle_webhook_events"
    )
    .select("event_id")
    .eq("event_id", eventId)
    .maybeSingle();


  if (error) {
    throw new Error(
      error.message
    );
  }


  return Boolean(data);
}


export async function markPaddleEventProcessedRepository(
  event: {
    eventId: string;

    eventType: string;

    occurredAt: string;
  }
) {
  const {
    error,
  } = await adminClient
    .from(
      "paddle_webhook_events"
    )
    .insert({
      event_id:
        event.eventId,

      event_type:
        event.eventType,

      occurred_at:
        event.occurredAt,
    });


  if (
    error &&
    error.code !== "23505"
  ) {
    throw new Error(
      error.message
    );
  }
}


function mapSubscriptionRow(
  row: Record<
    string,
    unknown
  >
): BillingSubscription {
  return {
    userId:
      String(row.user_id),

    paddleCustomerId:
      String(
        row.paddle_customer_id
      ),

    paddleSubscriptionId:
      String(
        row.paddle_subscription_id
      ),

    status:
      String(
        row.status
      ) as BillingSubscription["status"],

    priceId:
      typeof row.price_id ===
      "string"
        ? row.price_id
        : null,

    productId:
      typeof row.product_id ===
      "string"
        ? row.product_id
        : null,

    currentPeriodEnd:
      typeof row.current_period_end ===
      "string"
        ? row.current_period_end
        : null,

    scheduledChangeAt:
      typeof row.scheduled_change_at ===
      "string"
        ? row.scheduled_change_at
        : null,

    occurredAt:
      String(row.occurred_at),
  };
}