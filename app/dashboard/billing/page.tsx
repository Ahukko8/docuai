import Link from "next/link";

import {
  auth,
} from "@clerk/nextjs/server";

import {
  redirect,
} from "next/navigation";

import {
  Check,
  Crown,
  CreditCard,
  Sparkles,
} from "lucide-react";

import {
  getUserEntitlementsService,
} from "@/services/billing.service";

import {
  openCustomerPortalAction,
} from "@/actions/billing/open-customer-portal";


export default async function BillingPage() {
  const {
    userId,
  } = await auth();


  if (!userId) {
    redirect(
      "/sign-in"
    );
  }


  const entitlements =
    await getUserEntitlementsService(
      userId
    );


  const planName =
    formatPlanName(
      entitlements.plan
    );


  return (
    <div
      className="
        mx-auto
        max-w-5xl
      "
    >
      {/* PAGE HEADER */}

      <div>
        <div
          className="
            flex
            items-center
            gap-2
            text-purple-300
          "
        >
          <CreditCard className="h-5 w-5" />

          <span
            className="
              text-sm
              font-medium
            "
          >
            Billing & Plan
          </span>
        </div>


        <h1
          className="
            mt-3
            text-3xl
            font-bold
            tracking-tight
          "
        >
          Manage your subscription
        </h1>


        <p
          className="
            mt-2
            max-w-2xl
            text-sm
            leading-6
            text-zinc-400
          "
        >
          View your current plan, AI
          allowance, resume template
          access, and Paddle billing
          options.
        </p>
      </div>


      {/* CURRENT PLAN */}

      <section
        className="
          mt-8
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-start
            justify-between
            gap-6
            p-6
            md:p-8
          "
        >
          <div>
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.15em]
                text-zinc-500
              "
            >
              Current plan
            </p>


            <div
              className="
                mt-3
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <h2
                className="
                  text-3xl
                  font-bold
                "
              >
                {planName}
              </h2>


              {entitlements.hasPaidAccess && (
                <span
                  className="
                    rounded-full
                    border
                    border-emerald-500/20
                    bg-emerald-500/10
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    text-emerald-300
                  "
                >
                  Paid
                </span>
              )}
            </div>


            {entitlements.subscriptionStatus && (
              <p
                className="
                  mt-3
                  text-sm
                  text-zinc-400
                "
              >
                Subscription status:{" "}
                <span
                  className="
                    font-medium
                    capitalize
                    text-white
                  "
                >
                  {
                    entitlements.subscriptionStatus
                  }
                </span>
              </p>
            )}
          </div>


          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >
            {entitlements.hasPaidAccess ? (
              <form
                action={
                  openCustomerPortalAction
                }
              >
                <button
                  type="submit"

                  className="
                    inline-flex
                    h-10
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-white/10
                    bg-white/[0.05]
                    px-4
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-white/[0.1]
                  "
                >
                  <CreditCard
                    className="
                      mr-2
                      h-4
                      w-4
                    "
                  />

                  Manage billing
                </button>
              </form>
            ) : (
              <Link
                href="/pricing"

                className="
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  rounded-lg
                  bg-purple-600
                  px-4
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-purple-500
                "
              >
                <Crown
                  className="
                    mr-2
                    h-4
                    w-4
                  "
                />

                View plans
              </Link>
            )}
          </div>
        </div>


        {/* PLAN DETAILS */}

        <div
          className="
            grid
            border-t
            border-white/10
            md:grid-cols-3
          "
        >
          <PlanStat
            label="AI improvements"
            value={`${entitlements.monthlyAiLimit} / month`}
          />


          <PlanStat
            label="Premium templates"
            value={
              entitlements.canUsePremiumTemplates
                ? "Included"
                : "Not included"
            }
          />


          <PlanStat
            label="PDF export"
            value="Included"
          />
        </div>
      </section>


      {/* FEATURES */}

      <section className="mt-10">
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <Sparkles
            className="
              h-5
              w-5
              text-purple-300
            "
          />

          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Your plan includes
          </h2>
        </div>


        <div
          className="
            mt-5
            grid
            gap-4
            sm:grid-cols-2
          "
        >
          <FeatureCard>
            Create and edit professional
            resumes with automatic saving.
          </FeatureCard>


          <FeatureCard>
            Export resumes as professional
            PDF documents.
          </FeatureCard>


          <FeatureCard>
            Use up to{" "}
            <strong className="text-white">
              {
                entitlements.monthlyAiLimit
              }
            </strong>{" "}
            AI resume improvements every
            month.
          </FeatureCard>


          <FeatureCard>
            {entitlements.canUsePremiumTemplates
              ? "Use Modern, Executive and Creative resume templates."
              : "Use the Modern template. Upgrade to Pro or Advanced for Executive and Creative templates."}
          </FeatureCard>
        </div>
      </section>


      {/* UPGRADE */}

      {!entitlements.hasPaidAccess && (
        <section
          className="
            mt-10
            rounded-2xl
            border
            border-purple-500/20
            bg-purple-500/[0.06]
            p-6
            md:p-8
          "
        >
          <Crown
            className="
              h-7
              w-7
              text-purple-300
            "
          />


          <h2
            className="
              mt-4
              text-2xl
              font-semibold
            "
          >
            Unlock more with a paid plan
          </h2>


          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-zinc-400
            "
          >
            Choose Starter, Pro or
            Advanced and get a larger
            monthly AI allowance. Pro and
            Advanced also unlock the
            Executive and Creative resume
            templates.
          </p>


          <Link
            href="/pricing"

            className="
              mt-6
              inline-flex
              h-11
              items-center
              justify-center
              rounded-lg
              bg-purple-600
              px-5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-purple-500
            "
          >
            View pricing
          </Link>
        </section>
      )}
    </div>
  );
}


function PlanStat({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div
      className="
        border-b
        border-white/10
        p-5
        last:border-b-0
        md:border-b-0
        md:border-r
        md:last:border-r-0
      "
    >
      <p
        className="
          text-xs
          text-zinc-500
        "
      >
        {label}
      </p>


      <p
        className="
          mt-1
          text-sm
          font-semibold
          text-white
        "
      >
        {value}
      </p>
    </div>
  );
}


function FeatureCard({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <div
      className="
        flex
        gap-3
        rounded-xl
        border
        border-white/10
        bg-white/[0.025]
        p-4
      "
    >
      <div
        className="
          mt-0.5
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-emerald-500/10
        "
      >
        <Check
          className="
            h-3
            w-3
            text-emerald-400
          "
        />
      </div>


      <p
        className="
          text-sm
          leading-6
          text-zinc-400
        "
      >
        {children}
      </p>
    </div>
  );
}


function formatPlanName(
  plan:
    | "free"
    | "starter"
    | "pro"
    | "advanced"
) {
  switch (plan) {
    case "starter":
      return "Starter";

    case "pro":
      return "Pro";

    case "advanced":
      return "Advanced";

    default:
      return "Free";
  }
}