export type BillingCycle =
  | "month"
  | "year";


export type TierName =
  | "Starter"
  | "Pro"
  | "Advanced";


export interface Tier {
  name: TierName;

  description: string;

  features: string[];

  priceId: {
    month: string;

    year: string;
  };

  popular?: boolean;
}


function requiredPublicEnv(
  name: string,
  value:
    | string
    | undefined
) {
  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}`
    );
  }


  return value;
}


export const pricingTiers:
  Tier[] = [
  {
    name: "Starter",

    description:
      "Everything you need to build and export a professional resume.",

    features: [
      "Modern resume template",
      "20 AI improvements per month",
      "PDF resume export",
      "Automatic saving",
    ],

    priceId: {
      month:
        requiredPublicEnv(
          "NEXT_PUBLIC_PADDLE_STARTER_MONTH_PRICE_ID",

          process.env
            .NEXT_PUBLIC_PADDLE_STARTER_MONTH_PRICE_ID
        ),

      year:
        requiredPublicEnv(
          "NEXT_PUBLIC_PADDLE_STARTER_YEAR_PRICE_ID",

          process.env
            .NEXT_PUBLIC_PADDLE_STARTER_YEAR_PRICE_ID
        ),
    },
  },


  {
    name: "Pro",

    description:
      "More AI power and access to every professional resume design.",

    popular: true,

    features: [
      "Modern, Executive and Creative templates",
      "100 AI improvements per month",
      "Premium PDF designs",
      "Automatic saving",
    ],

    priceId: {
      month:
        requiredPublicEnv(
          "NEXT_PUBLIC_PADDLE_PRO_MONTH_PRICE_ID",

          process.env
            .NEXT_PUBLIC_PADDLE_PRO_MONTH_PRICE_ID
        ),

      year:
        requiredPublicEnv(
          "NEXT_PUBLIC_PADDLE_PRO_YEAR_PRICE_ID",

          process.env
            .NEXT_PUBLIC_PADDLE_PRO_YEAR_PRICE_ID
        ),
    },
  },


  {
    name: "Advanced",

    description:
      "Highest AI allowance for frequent resume creation and optimization.",

    features: [
      "All professional templates",
      "300 AI improvements per month",
      "Premium PDF designs",
      "Automatic saving",
    ],

    priceId: {
      month:
        requiredPublicEnv(
          "NEXT_PUBLIC_PADDLE_ADVANCED_MONTH_PRICE_ID",

          process.env
            .NEXT_PUBLIC_PADDLE_ADVANCED_MONTH_PRICE_ID
        ),

      year:
        requiredPublicEnv(
          "NEXT_PUBLIC_PADDLE_ADVANCED_YEAR_PRICE_ID",

          process.env
            .NEXT_PUBLIC_PADDLE_ADVANCED_YEAR_PRICE_ID
        ),
    },
  },
];