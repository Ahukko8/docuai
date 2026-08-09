import Link from "next/link";

import {
    auth,
    currentUser,
} from "@clerk/nextjs/server";

import {
    redirect,
} from "next/navigation";

import {
    CreditCard,
    FileText,
    Lock,
    Mail,
    ReceiptText,
    ShieldCheck,
    User,
} from "lucide-react";

import {
    Button,
} from "@/components/ui/button";

import {
    getUserEntitlementsService,
} from "@/services/billing.service";


export default async function SettingsPage() {
    const {
        userId,
    } = await auth();


    if (!userId) {
        redirect("/sign-in");
    }


    const [
        user,
        entitlements,
    ] = await Promise.all([
        currentUser(),

        getUserEntitlementsService(
            userId
        ),
    ]);


    if (!user) {
        redirect("/sign-in");
    }


    const fullName =
        [
            user.firstName,
            user.lastName,
        ]
            .filter(Boolean)
            .join(" ") ||
        "DocuAI User";


    const email =
        user.primaryEmailAddress
            ?.emailAddress ||
        "No primary email";


    return (
        <div
            className="
        mx-auto
        w-full
        max-w-5xl
        pb-12
      "
        >
            {/* HEADER */}

            <div>
                <p
                    className="
            text-sm
            font-medium
            text-purple-300
          "
                >
                    Dashboard
                </p>


                <h1
                    className="
            mt-2
            text-3xl
            font-bold
            tracking-tight
            text-white
            sm:text-4xl
          "
                >
                    Settings
                </h1>


                <p
                    className="
            mt-3
            max-w-2xl
            text-sm
            leading-6
            text-zinc-400
            sm:text-base
          "
                >
                    Manage your DocuAI account,
                    security, subscription, and
                    legal preferences.
                </p>
            </div>


            {/* PROFILE */}

            <section
                className="
          mt-8
          rounded-2xl
          border
          border-white/10
          bg-white/[0.025]
          p-5
          sm:p-6
        "
            >
                <div
                    className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
                >
                    <div
                        className="
              flex
              min-w-0
              items-center
              gap-4
            "
                    >
                        {user.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={
                                    user.imageUrl
                                }
                                alt={
                                    fullName
                                }
                                className="
                  h-14
                  w-14
                  shrink-0
                  rounded-full
                  object-cover
                "
                            />
                        ) : (
                            <div
                                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-purple-500/10
                  text-purple-300
                "
                            >
                                <User
                                    className="
                    h-6
                    w-6
                  "
                                />
                            </div>
                        )}


                        <div
                            className="
                min-w-0
              "
                        >
                            <h2
                                className="
                  truncate
                  font-semibold
                  text-white
                "
                            >
                                {fullName}
                            </h2>


                            <div
                                className="
                  mt-1
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-zinc-500
                "
                            >
                                <Mail
                                    className="
                    h-3.5
                    w-3.5
                    shrink-0
                  "
                                />

                                <span
                                    className="
                    truncate
                  "
                                >
                                    {email}
                                </span>
                            </div>
                        </div>
                    </div>


                    <Button
                        variant="outline"
                        className="
              w-full
              border-white/10
              bg-transparent
              sm:w-auto
            "
                    >
                        <Link
                            href="/dashboard/settings/account"
                        >
                            Manage account
                        </Link>
                    </Button>
                </div>
            </section>


            {/* SETTINGS GRID */}

            <div
                className="
          mt-6
          grid
          gap-5
          md:grid-cols-2
        "
            >
                <SettingsCard
                    icon={
                        <User
                            className="
                h-5
                w-5
              "
                        />
                    }
                    title="Account"
                    description="Update your profile details and account information."
                    href="/dashboard/settings/account"
                    action="Manage account"
                />


                <SettingsCard
                    icon={
                        <Lock
                            className="
                h-5
                w-5
              "
                        />
                    }
                    title="Security"
                    description="Manage passwords, connected accounts, sessions, and account security."
                    href="/dashboard/settings/account"
                    action="Security settings"
                />


                <SettingsCard
                    icon={
                        <CreditCard
                            className="
                h-5
                w-5
              "
                        />
                    }
                    title="Billing"
                    description={`Current plan: ${formatPlanName(
                        entitlements.plan
                    )}. Manage your DocuAI subscription and billing.`}
                    href="/dashboard/billing"
                    action="Manage billing"
                />


                <SettingsCard
                    icon={
                        <ShieldCheck
                            className="
                h-5
                w-5
              "
                        />
                    }
                    title="Privacy"
                    description="Review how DocuAI processes and protects your personal information."
                    href="/privacy"
                    action="Privacy policy"
                />
            </div>


            {/* PLAN */}

            <section
                className="
          mt-6
          rounded-2xl
          border
          border-purple-500/20
          bg-purple-500/[0.05]
          p-5
          sm:p-6
        "
            >
                <div
                    className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
                >
                    <div>
                        <p
                            className="
                text-xs
                font-medium
                uppercase
                tracking-wider
                text-purple-300
              "
                        >
                            Current plan
                        </p>


                        <h2
                            className="
                mt-2
                text-2xl
                font-bold
                text-white
              "
                        >
                            {formatPlanName(
                                entitlements.plan
                            )}
                        </h2>


                        <p
                            className="
                mt-2
                text-sm
                text-zinc-400
              "
                        >
                            {
                                entitlements
                                    .monthlyAiLimit
                            }{" "}
                            AI improvements per
                            month
                            {" · "}

                            {entitlements
                                .canUsePremiumTemplates
                                ? "Premium templates included"
                                : "Modern template included"}
                        </p>
                    </div>


                    <Button
                        className="
              w-full
              bg-purple-600
              text-white
              hover:bg-purple-500
              sm:w-auto
            "
                    >
                        <Link
                            href={
                                entitlements
                                    .hasPaidAccess
                                    ? "/dashboard/billing"
                                    : "/pricing"
                            }
                        >
                            {entitlements
                                .hasPaidAccess
                                ? "Manage plan"
                                : "View plans"}
                        </Link>
                    </Button>
                </div>
            </section>


            {/* LEGAL */}

            <section
                className="
          mt-6
          rounded-2xl
          border
          border-white/10
          bg-white/[0.025]
          p-5
          sm:p-6
        "
            >
                <div
                    className="
            flex
            items-center
            gap-3
          "
                >
                    <div
                        className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-purple-500/10
              text-purple-300
            "
                    >
                        <ReceiptText
                            className="
                h-5
                w-5
              "
                        />
                    </div>


                    <div>
                        <h2
                            className="
                font-semibold
                text-white
              "
                        >
                            Legal & support
                        </h2>

                        <p
                            className="
                mt-1
                text-sm
                text-zinc-500
              "
                        >
                            Policies and support
                            information.
                        </p>
                    </div>
                </div>


                <div
                    className="
            mt-5
            divide-y
            divide-white/10
            rounded-xl
            border
            border-white/10
          "
                >
                    <LegalLink
                        href="/terms"
                        label="Terms & Conditions"
                    />

                    <LegalLink
                        href="/privacy"
                        label="Privacy Policy"
                    />

                    <LegalLink
                        href="/refund-policy"
                        label="Refund & Cancellation Policy"
                    />

                    <LegalLink
                        href="/contact"
                        label="Contact Support"
                    />
                </div>
            </section>


            {/* PRODUCT */}

            <div
                className="
          mt-8
          flex
          items-center
          justify-center
          gap-2
          text-xs
          text-zinc-600
        "
            >
                <FileText
                    className="
            h-3.5
            w-3.5
          "
                />

                DocuAI by ClickBuyHub LLC
            </div>
        </div>
    );
}


function SettingsCard({
    icon,
    title,
    description,
    href,
    action,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
    action: string;
}) {
    return (
        <Link
            href={href}
            className="
        group
        rounded-2xl
        border
        border-white/10
        bg-white/[0.025]
        p-5
        transition
        hover:border-purple-500/30
        hover:bg-purple-500/[0.04]
      "
        >
            <div
                className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-purple-500/10
          text-purple-300
        "
            >
                {icon}
            </div>


            <h2
                className="
          mt-5
          font-semibold
          text-white
        "
            >
                {title}
            </h2>


            <p
                className="
          mt-2
          min-h-12
          text-sm
          leading-6
          text-zinc-500
        "
            >
                {description}
            </p>


            <div
                className="
          mt-4
          flex
          items-center
          text-sm
          font-medium
          text-purple-300
        "
            >
                {action}
            </div>
        </Link>
    );
}


function LegalLink({
    href,
    label,
}: {
    href: string;
    label: string;
}) {
    return (
        <Link
            href={href}
            className="
        flex
        items-center
        justify-between
        gap-4
        px-4
        py-4
        text-sm
        text-zinc-400
        transition
        hover:bg-white/[0.025]
        hover:text-white
      "
        >
            {label}

        </Link>
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