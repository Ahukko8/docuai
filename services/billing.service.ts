import "server-only";

import {
  listBillingSubscriptionsByUserIdRepository,
} from "@/repositories/billing.repository";

import {
  getPlanFromPriceId,
} from "@/lib/billing/plans";

import type {
  AppPlan,
  PaddleSubscriptionStatus,
  UserEntitlements,
} from "@/types/billing";

import type {
  ResumeTemplate,
} from "@/types/resume";


/*
 * We are keeping our earlier DocuAI rule:
 *
 * active   -> access
 * trialing -> access
 * past_due -> temporary access during recovery
 * paused   -> no access
 * canceled -> no access
 *
 * A scheduled cancellation does NOT revoke access
 * while status remains active.
 */
const ACCESS_STATUSES =
  new Set<
    PaddleSubscriptionStatus
  >([
    "active",
    "trialing",
    "past_due",
  ]);


const PLAN_RANK:
  Record<
    AppPlan,
    number
  > = {
  free: 0,

  starter: 1,

  pro: 2,

  advanced: 3,
};


export function subscriptionGrantsAccess(
  status:
    PaddleSubscriptionStatus
) {
  return ACCESS_STATUSES.has(
    status
  );
}


export async function getUserEntitlementsService(
  userId: string
): Promise<UserEntitlements> {
  const subscriptions =
    await listBillingSubscriptionsByUserIdRepository(
      userId
    );


  let bestPlan:
    AppPlan = "free";


  let selectedStatus:
    PaddleSubscriptionStatus | null =
    null;


  for (
    const subscription of
    subscriptions
  ) {
    if (
      !subscriptionGrantsAccess(
        subscription.status
      )
    ) {
      continue;
    }


    const plan =
      subscription.planTier ??
      getPlanFromPriceId(
        subscription.priceId
      )?.plan ??
      null;


    if (!plan) {
      continue;
    }


    if (
      PLAN_RANK[plan] >
      PLAN_RANK[bestPlan]
    ) {
      bestPlan =
        plan;

      selectedStatus =
        subscription.status;
    }
  }


  switch (bestPlan) {
    case "starter":
      return {
        plan: "starter",

        hasPaidAccess: true,

        canUsePremiumTemplates:
          false,

        monthlyAiLimit: 20,

        subscriptionStatus:
          selectedStatus,
      };


    case "pro":
      return {
        plan: "pro",

        hasPaidAccess: true,

        canUsePremiumTemplates:
          true,

        monthlyAiLimit: 100,

        subscriptionStatus:
          selectedStatus,
      };


    case "advanced":
      return {
        plan:
          "advanced",

        hasPaidAccess: true,

        canUsePremiumTemplates:
          true,

        monthlyAiLimit: 300,

        subscriptionStatus:
          selectedStatus,
      };


    default:
      return {
        plan: "free",

        hasPaidAccess:
          false,

        canUsePremiumTemplates:
          false,

        monthlyAiLimit: 5,

        subscriptionStatus:
          null,
      };
  }
}


export async function assertTemplateAccessService(
  userId: string,

  template:
    ResumeTemplate
) {
  const premiumTemplate =
    template ===
      "executive" ||
    template ===
      "creative";


  if (!premiumTemplate) {
    return;
  }


  const entitlements =
    await getUserEntitlementsService(
      userId
    );


  if (
    !entitlements
      .canUsePremiumTemplates
  ) {
    throw new Error(
      "Executive and Creative templates require Pro or Advanced."
    );
  }
}