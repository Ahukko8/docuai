import "server-only";

import {
  adminClient,
} from "@/lib/supabase/admin";

import type {
  BillingCustomer,
  BillingSubscription,
  BillingTransaction,
} from "@/types/billing";


export async function getBillingCustomerByPaddleIdRepository(
  paddleCustomerId: string
) {
  const {
    data,
    error,
  } = await adminClient
    .from("billing_customers")
    .select("*")
    .eq(
      "paddle_customer_id",
      paddleCustomerId
    )
    .maybeSingle();


  if (error) {
    throw new Error(
      error.message
    );
  }


  return data
    ? mapCustomer(data)
    : null;
}


export async function getBillingCustomerByUserIdRepository(
  userId: string
) {
  const {
    data,
    error,
  } = await adminClient
    .from("billing_customers")
    .select("*")
    .eq(
      "user_id",
      userId
    )
    .order(
      "updated_at",
      {
        ascending: false,
      }
    )
    .limit(1)
    .maybeSingle();


  if (error) {
    throw new Error(
      error.message
    );
  }


  return data
    ? mapCustomer(data)
    : null;
}


export async function upsertBillingCustomerRepository(
  customer:
    BillingCustomer
) {
  const existing =
    await getBillingCustomerByPaddleIdRepository(
      customer
        .paddleCustomerId
    );


  if (
    existing &&
    new Date(
      existing.occurredAt
    ).getTime() >=
      new Date(
        customer.occurredAt
      ).getTime()
  ) {
    return;
  }


  const {
    error,
  } = await adminClient
    .from("billing_customers")
    .upsert(
      {
        paddle_customer_id:
          customer
            .paddleCustomerId,

        user_id:
          customer.userId ??
          existing?.userId ??
          null,

        email:
          customer.email,

        occurred_at:
          customer.occurredAt,

        updated_at:
          new Date()
            .toISOString(),
      },
      {
        onConflict:
          "paddle_customer_id",
      }
    );


  if (error) {
    throw new Error(
      error.message
    );
  }
}


export async function getBillingSubscriptionByPaddleIdRepository(
  paddleSubscriptionId:
    string
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


  return data
    ? mapSubscription(data)
    : null;
}


export async function listBillingSubscriptionsByUserIdRepository(
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
    .eq(
      "user_id",
      userId
    )
    .order(
      "updated_at",
      {
        ascending: false,
      }
    );


  if (error) {
    throw new Error(
      error.message
    );
  }


  return (
    data ?? []
  ).map(
    mapSubscription
  );
}


export async function upsertBillingSubscriptionRepository(
  subscription:
    BillingSubscription
) {
  const existing =
    await getBillingSubscriptionByPaddleIdRepository(
      subscription
        .paddleSubscriptionId
    );


  if (
    existing &&
    new Date(
      existing.occurredAt
    ).getTime() >=
      new Date(
        subscription.occurredAt
      ).getTime()
  ) {
    return;
  }


  const {
    error,
  } = await adminClient
    .from(
      "billing_subscriptions"
    )
    .upsert(
      {
        user_id:
          subscription.userId ??
          existing?.userId ??
          null,

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

        plan_tier:
          subscription.planTier,

        billing_interval:
          subscription
            .billingInterval,

        current_period_end:
          subscription
            .currentPeriodEnd,

        scheduled_change_action:
          subscription
            .scheduledChangeAction,

        scheduled_change_at:
          subscription
            .scheduledChangeAt,

        canceled_at:
          subscription.canceledAt,

        occurred_at:
          subscription.occurredAt,

        updated_at:
          new Date()
            .toISOString(),
      },
      {
        onConflict:
          "paddle_subscription_id",
      }
    );


  if (error) {
    throw new Error(
      error.message
    );
  }
}


export async function getBillingTransactionByPaddleIdRepository(
  paddleTransactionId:
    string
) {
  const {
    data,
    error,
  } = await adminClient
    .from(
      "billing_transactions"
    )
    .select("*")
    .eq(
      "paddle_transaction_id",
      paddleTransactionId
    )
    .maybeSingle();


  if (error) {
    throw new Error(
      error.message
    );
  }


  return data
    ? mapTransaction(data)
    : null;
}


export async function upsertBillingTransactionRepository(
  transaction:
    BillingTransaction
) {
  const existing =
    await getBillingTransactionByPaddleIdRepository(
      transaction
        .paddleTransactionId
    );


  if (
    existing &&
    new Date(
      existing.occurredAt
    ).getTime() >=
      new Date(
        transaction.occurredAt
      ).getTime()
  ) {
    return;
  }


  const {
    error,
  } = await adminClient
    .from(
      "billing_transactions"
    )
    .upsert(
      {
        paddle_transaction_id:
          transaction
            .paddleTransactionId,

        paddle_customer_id:
          transaction
            .paddleCustomerId,

        paddle_subscription_id:
          transaction
            .paddleSubscriptionId,

        user_id:
          transaction.userId ??
          existing?.userId ??
          null,

        status:
          transaction.status,

        price_id:
          transaction.priceId,

        product_id:
          transaction.productId,

        total:
          transaction.total,

        currency_code:
          transaction
            .currencyCode,

        occurred_at:
          transaction.occurredAt,

        updated_at:
          new Date()
            .toISOString(),
      },
      {
        onConflict:
          "paddle_transaction_id",
      }
    );


  if (error) {
    throw new Error(
      error.message
    );
  }
}


export async function resolveUserIdForCustomerRepository(
  paddleCustomerId:
    string
) {
  const {
    data:
      subscription,
  } =
    await adminClient
      .from(
        "billing_subscriptions"
      )
      .select("user_id")
      .eq(
        "paddle_customer_id",
        paddleCustomerId
      )
      .not(
        "user_id",
        "is",
        null
      )
      .order(
        "updated_at",
        {
          ascending: false,
        }
      )
      .limit(1)
      .maybeSingle();


  if (
    subscription?.user_id
  ) {
    return String(
      subscription.user_id
    );
  }


  const {
    data:
      transaction,
  } =
    await adminClient
      .from(
        "billing_transactions"
      )
      .select("user_id")
      .eq(
        "paddle_customer_id",
        paddleCustomerId
      )
      .not(
        "user_id",
        "is",
        null
      )
      .order(
        "updated_at",
        {
          ascending: false,
        }
      )
      .limit(1)
      .maybeSingle();


  return transaction?.user_id
    ? String(
        transaction.user_id
      )
    : null;
}


export async function linkBillingIdentityRepository(
  paddleCustomerId:
    string,

  userId: string
) {
  const existingCustomer =
    await getBillingCustomerByPaddleIdRepository(
      paddleCustomerId
    );


  if (
    existingCustomer?.userId &&
    existingCustomer.userId !==
      userId
  ) {
    throw new Error(
      "Paddle customer is already linked to another application user."
    );
  }


  const results =
    await Promise.all([
      adminClient
        .from(
          "billing_customers"
        )
        .update({
          user_id:
            userId,

          updated_at:
            new Date()
              .toISOString(),
        })
        .eq(
          "paddle_customer_id",
          paddleCustomerId
        ),


      adminClient
        .from(
          "billing_subscriptions"
        )
        .update({
          user_id:
            userId,

          updated_at:
            new Date()
              .toISOString(),
        })
        .eq(
          "paddle_customer_id",
          paddleCustomerId
        )
        .is(
          "user_id",
          null
        ),


      adminClient
        .from(
          "billing_transactions"
        )
        .update({
          user_id:
            userId,

          updated_at:
            new Date()
              .toISOString(),
        })
        .eq(
          "paddle_customer_id",
          paddleCustomerId
        )
        .is(
          "user_id",
          null
        ),
    ]);


  for (
    const result of results
  ) {
    if (result.error) {
      throw new Error(
        result.error.message
      );
    }
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
    .eq(
      "event_id",
      eventId
    )
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
    .upsert(
      {
        event_id:
          event.eventId,

        event_type:
          event.eventType,

        occurred_at:
          event.occurredAt,

        processed_at:
          new Date()
            .toISOString(),
      },
      {
        onConflict:
          "event_id",

        ignoreDuplicates:
          true,
      }
    );


  if (error) {
    throw new Error(
      error.message
    );
  }
}


function mapCustomer(
  row:
    Record<
      string,
      unknown
    >
): BillingCustomer {
  return {
    paddleCustomerId:
      String(
        row.paddle_customer_id
      ),

    userId:
      typeof row.user_id ===
      "string"
        ? row.user_id
        : null,

    email:
      String(row.email),

    occurredAt:
      String(
        row.occurred_at
      ),
  };
}


function mapSubscription(
  row:
    Record<
      string,
      unknown
    >
): BillingSubscription {
  return {
    userId:
      typeof row.user_id ===
      "string"
        ? row.user_id
        : null,

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

    planTier:
      typeof row.plan_tier ===
      "string"
        ? row.plan_tier as
            BillingSubscription["planTier"]
        : null,

    billingInterval:
      typeof row.billing_interval ===
      "string"
        ? row.billing_interval as
            BillingSubscription["billingInterval"]
        : null,

    currentPeriodEnd:
      typeof row.current_period_end ===
      "string"
        ? row.current_period_end
        : null,

    scheduledChangeAction:
      typeof row.scheduled_change_action ===
      "string"
        ? row.scheduled_change_action
        : null,

    scheduledChangeAt:
      typeof row.scheduled_change_at ===
      "string"
        ? row.scheduled_change_at
        : null,

    canceledAt:
      typeof row.canceled_at ===
      "string"
        ? row.canceled_at
        : null,

    occurredAt:
      String(
        row.occurred_at
      ),
  };
}


function mapTransaction(
  row:
    Record<
      string,
      unknown
    >
): BillingTransaction {
  return {
    paddleTransactionId:
      String(
        row.paddle_transaction_id
      ),

    paddleCustomerId:
      typeof row.paddle_customer_id ===
      "string"
        ? row.paddle_customer_id
        : null,

    paddleSubscriptionId:
      typeof row.paddle_subscription_id ===
      "string"
        ? row.paddle_subscription_id
        : null,

    userId:
      typeof row.user_id ===
      "string"
        ? row.user_id
        : null,

    status:
      String(row.status),

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

    total:
      typeof row.total ===
      "string"
        ? row.total
        : null,

    currencyCode:
      typeof row.currency_code ===
      "string"
        ? row.currency_code
        : null,

    occurredAt:
      String(
        row.occurred_at
      ),
  };
}