import "server-only";

import {
  getBillingSubscriptionByUserIdRepository,
} from "@/repositories/billing.repository";

import {
  paddleServerConfig,
} from "@/lib/paddle/server";

import type {
  UserEntitlements,
} from "@/types/billing";

import type {
  ResumeTemplate,
} from "@/types/resume";


const FULL_ACCESS_STATUSES =
  new Set([
    "trialing",
    "active",
    "past_due",
  ]);


export async function getUserEntitlementsService(
  userId: string
): Promise<UserEntitlements> {
  const subscription =
    await getBillingSubscriptionByUserIdRepository(
      userId
    );


  const isCorrectProduct =
    subscription?.productId ===
    paddleServerConfig
      .proProductId;


  const hasValidStatus =
    subscription
      ? FULL_ACCESS_STATUSES.has(
          subscription.status
        )
      : false;


  const hasProAccess =
    Boolean(
      subscription &&
        isCorrectProduct &&
        hasValidStatus
    );


  return {
    plan:
      hasProAccess
        ? "pro"
        : "free",

    hasProAccess,

    canUsePremiumTemplates:
      hasProAccess,

    monthlyAiLimit:
      hasProAccess
        ? 100
        : 5,

    subscriptionStatus:
      subscription?.status ??
      null,
  };
}


export async function assertTemplateAccessService(
  userId: string,
  template:
    ResumeTemplate
) {
  const premiumTemplate =
    template === "executive" ||
    template === "creative";


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
      "Executive and Creative templates require CareerAI Pro."
    );
  }
}