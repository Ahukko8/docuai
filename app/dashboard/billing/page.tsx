import {
  auth,
  currentUser,
} from "@clerk/nextjs/server";

import {
  redirect,
} from "next/navigation";

import PaddleCheckoutButton from "@/components/paddle-checkout-button";

import {
  getUserEntitlementsService,
} from "@/services/billing.service";


interface BillingPageProps {
  searchParams:
    Promise<{
      checkout?: string;
    }>;
}


export default async function BillingPage({
  searchParams,
}: BillingPageProps) {
  const {
    userId,
  } = await auth();


  if (!userId) {
    redirect("/");
  }


  const [
    user,
    entitlements,
    query,
  ] = await Promise.all([
    currentUser(),

    getUserEntitlementsService(
      userId
    ),

    searchParams,
  ]);


  const email =
    user
      ?.primaryEmailAddress
      ?.emailAddress ??
    null;


  return (
    <div className="mx-auto max-w-4xl">

      <div>
        <h1 className="text-3xl font-bold">
          Billing
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage your CareerAI plan and access.
        </p>
      </div>


      {query.checkout ===
        "success" && (
        <div
          className="
            mt-6
            rounded-xl
            border
            border-emerald-500/20
            bg-emerald-500/10
            p-4
            text-sm
            text-emerald-300
          "
        >
          Payment completed. Paddle is verifying your subscription. Refresh this page shortly if Pro access is not visible yet.
        </div>
      )}


      <div
        className="
          mt-8
          grid
          gap-6
          md:grid-cols-2
        "
      >
        <article
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-6
          "
        >
          <h2 className="text-xl font-semibold">
            Free
          </h2>

          <p className="mt-2 text-3xl font-bold">
            $0
          </p>

          <ul
            className="
              mt-6
              space-y-3
              text-sm
              text-zinc-400
            "
          >
            <li>Modern resume template</li>
            <li>5 AI improvements monthly</li>
            <li>PDF export</li>
            <li>Resume autosave</li>
          </ul>
        </article>


        <article
          className="
            rounded-2xl
            border
            border-purple-500/30
            bg-purple-500/[0.07]
            p-6
          "
        >
          <div className="flex items-center justify-between gap-4">

            <h2 className="text-xl font-semibold">
              Pro
            </h2>

            {entitlements.hasProAccess && (
              <span
                className="
                  rounded-full
                  bg-emerald-500/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-emerald-300
                "
              >
                Current plan
              </span>
            )}

          </div>


          <p className="mt-2 text-3xl font-bold">
            $9.99
            <span className="text-sm font-normal text-zinc-500">
              /month
            </span>
          </p>


          <ul
            className="
              mt-6
              space-y-3
              text-sm
              text-zinc-300
            "
          >
            <li>Modern, Executive and Creative templates</li>
            <li>100 AI improvements monthly</li>
            <li>Premium PDF designs</li>
            <li>Future ATS analysis tools</li>
          </ul>


          <div className="mt-7">

            {entitlements.hasProAccess ? (
              <p className="text-sm text-zinc-400">
                Subscription status:{" "}
                <span className="capitalize text-white">
                  {entitlements.subscriptionStatus}
                </span>
              </p>
            ) : (
              <PaddleCheckoutButton
                userId={userId}
                email={email}
              />
            )}

          </div>
        </article>
      </div>
    </div>
  );
}