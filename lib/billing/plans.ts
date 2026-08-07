import "server-only";

import type {
  AppPlan,
  BillingInterval,
} from "@/types/billing";


interface PaidPlanDefinition {
  plan: Exclude<
    AppPlan,
    "free"
  >;

  monthlyAiLimit: number;

  canUsePremiumTemplates:
    boolean;

  prices: {
    month: string;

    year: string;
  };
}


function requiredEnv(
  name: string
) {
  const value =
    process.env[name];


  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}`
    );
  }


  return value;
}


export const paidPlans:
  PaidPlanDefinition[] = [
  {
    plan: "starter",

    monthlyAiLimit: 20,

    canUsePremiumTemplates:
      false,

    prices: {
      month:
        requiredEnv(
          "NEXT_PUBLIC_PADDLE_STARTER_MONTH_PRICE_ID"
        ),

      year:
        requiredEnv(
          "NEXT_PUBLIC_PADDLE_STARTER_YEAR_PRICE_ID"
        ),
    },
  },


  {
    plan: "pro",

    monthlyAiLimit: 100,

    canUsePremiumTemplates:
      true,

    prices: {
      month:
        requiredEnv(
          "NEXT_PUBLIC_PADDLE_PRO_MONTH_PRICE_ID"
        ),

      year:
        requiredEnv(
          "NEXT_PUBLIC_PADDLE_PRO_YEAR_PRICE_ID"
        ),
    },
  },


  {
    plan: "advanced",

    monthlyAiLimit: 300,

    canUsePremiumTemplates:
      true,

    prices: {
      month:
        requiredEnv(
          "NEXT_PUBLIC_PADDLE_ADVANCED_MONTH_PRICE_ID"
        ),

      year:
        requiredEnv(
          "NEXT_PUBLIC_PADDLE_ADVANCED_YEAR_PRICE_ID"
        ),
    },
  },
];


export function getPlanFromPriceId(
  priceId:
    string | null | undefined
): {
  plan:
    Exclude<
      AppPlan,
      "free"
    >;

  interval:
    BillingInterval;

  monthlyAiLimit: number;

  canUsePremiumTemplates:
    boolean;
} | null {
  if (!priceId) {
    return null;
  }


  for (
    const definition of
    paidPlans
  ) {
    if (
      definition.prices.month ===
      priceId
    ) {
      return {
        plan:
          definition.plan,

        interval:
          "month",

        monthlyAiLimit:
          definition.monthlyAiLimit,

        canUsePremiumTemplates:
          definition
            .canUsePremiumTemplates,
      };
    }


    if (
      definition.prices.year ===
      priceId
    ) {
      return {
        plan:
          definition.plan,

        interval:
          "year",

        monthlyAiLimit:
          definition.monthlyAiLimit,

        canUsePremiumTemplates:
          definition
            .canUsePremiumTemplates,
      };
    }
  }


  return null;
}