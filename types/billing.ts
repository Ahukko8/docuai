export type AppPlan =
  | "free"
  | "starter"
  | "pro"
  | "advanced";


export type BillingInterval =
  | "month"
  | "year";


export type PaddleSubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "paused"
  | "canceled";


export interface BillingCustomer {
  paddleCustomerId: string;

  userId:
    string | null;

  email: string;

  occurredAt: string;
}


export interface BillingSubscription {
  userId:
    string | null;

  paddleCustomerId: string;

  paddleSubscriptionId: string;

  status:
    PaddleSubscriptionStatus;

  priceId:
    string | null;

  productId:
    string | null;

  planTier:
    AppPlan | null;

  billingInterval:
    BillingInterval | null;

  currentPeriodEnd:
    string | null;

  scheduledChangeAction:
    string | null;

  scheduledChangeAt:
    string | null;

  canceledAt:
    string | null;

  occurredAt: string;
}


export interface BillingTransaction {
  paddleTransactionId: string;

  paddleCustomerId:
    string | null;

  paddleSubscriptionId:
    string | null;

  userId:
    string | null;

  status: string;

  priceId:
    string | null;

  productId:
    string | null;

  total:
    string | null;

  currencyCode:
    string | null;

  occurredAt: string;
}


export interface UserEntitlements {
  plan: AppPlan;

  hasPaidAccess: boolean;

  canUsePremiumTemplates: boolean;

  monthlyAiLimit: number;

  subscriptionStatus:
    PaddleSubscriptionStatus | null;
}