export type AppPlan =
  | "free"
  | "pro";


export type PaddleSubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "paused"
  | "canceled";


export interface BillingSubscription {
  userId: string;

  paddleCustomerId: string;

  paddleSubscriptionId: string;

  status:
    PaddleSubscriptionStatus;

  priceId:
    string | null;

  productId:
    string | null;

  currentPeriodEnd:
    string | null;

  scheduledChangeAt:
    string | null;

  occurredAt: string;
}


export interface UserEntitlements {
  plan: AppPlan;

  hasProAccess: boolean;

  canUsePremiumTemplates: boolean;

  monthlyAiLimit: number;

  subscriptionStatus:
    PaddleSubscriptionStatus | null;
}