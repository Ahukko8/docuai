"use server";

import {
  auth,
} from "@clerk/nextjs/server";

import {
  redirect,
} from "next/navigation";

import {
  getBillingCustomerByUserIdRepository,
  listBillingSubscriptionsByUserIdRepository,
} from "@/repositories/billing.repository";

import {
  paddleServer,
} from "@/lib/paddle/server";


export async function openCustomerPortalAction() {
  /*
   * Authentication happens first.
   *
   * We never accept customerId or
   * subscriptionId from the browser.
   */
  const {
    userId,
  } = await auth();


  if (!userId) {
    redirect(
      "/sign-in"
    );
  }


  const subscriptions =
    await listBillingSubscriptionsByUserIdRepository(
      userId
    );


  const customer =
    await getBillingCustomerByUserIdRepository(
      userId
    );


  /*
   * Prefer the customer ID tied directly
   * to one of this user's subscriptions.
   */
  const paddleCustomerId =
    subscriptions[0]
      ?.paddleCustomerId ??
    customer
      ?.paddleCustomerId;


  if (!paddleCustomerId) {
    throw new Error(
      "No Paddle billing account is linked to this user yet."
    );
  }


  const subscriptionIds =
    subscriptions
      .filter(
        (subscription) =>
          subscription
            .paddleCustomerId ===
          paddleCustomerId
      )
      .map(
        (subscription) =>
          subscription
            .paddleSubscriptionId
      )
      .slice(
        0,
        25
      );


  const portalSession =
    await paddleServer
      .customerPortalSessions
      .create(
        paddleCustomerId,
        subscriptionIds
      );


  const portalUrl =
    portalSession
      ?.urls
      ?.general
      ?.overview;


  if (!portalUrl) {
    throw new Error(
      "Paddle did not return a customer portal URL."
    );
  }


  redirect(
    portalUrl
  );
}