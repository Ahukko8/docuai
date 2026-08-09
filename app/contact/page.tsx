import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  CreditCard,
  FileText,
  LifeBuoy,
  Mail,
} from "lucide-react";

import {
  siteConfig,
} from "@/lib/site-config";


export const metadata:
  Metadata = {
  title:
    "Contact & Support | DocuAI",

  description:
    "Contact DocuAI support for account, product, resume, billing, and privacy questions.",
};


export default function ContactPage() {
  return (
    <main
      className="
        min-h-screen
        bg-zinc-950
        px-5
        py-16
        text-white
        sm:px-8
      "
    >
      <div
        className="
          mx-auto
          max-w-5xl
        "
      >
        <div
          className="
            mx-auto
            max-w-2xl
            text-center
          "
        >
          <LifeBuoy
            className="
              mx-auto
              h-9
              w-9
              text-purple-300
            "
          />


          <h1
            className="
              mt-5
              text-4xl
              font-bold
              tracking-tight
            "
          >
            Contact DocuAI
          </h1>


          <p
            className="
              mt-4
              text-base
              leading-7
              text-zinc-400
            "
          >
            Get help with your DocuAI
            account, resumes,
            subscriptions, AI features,
            billing, or privacy requests.
          </p>
        </div>


        <div
          className="
            mt-12
            grid
            gap-5
            md:grid-cols-2
          "
        >
          <ContactCard
            icon={
              <Mail className="h-5 w-5" />
            }

            title="Product & account support"
          >
            <p>
              For DocuAI product,
              technical, resume, or
              account questions:
            </p>


            <a
              href={`mailto:${siteConfig.supportEmail}`}

              className="
                mt-3
                inline-block
                font-medium
                text-purple-300
                underline
                underline-offset-4
              "
            >
              {siteConfig.supportEmail}
            </a>
          </ContactCard>


          <ContactCard
            icon={
              <CreditCard className="h-5 w-5" />
            }

            title="Billing & subscriptions"
          >
            <p>
              Signed-in customers can
              manage eligible subscription
              and billing settings from
              their account.
            </p>


            <Link
              href="/dashboard/billing"

              className="
                mt-3
                inline-block
                font-medium
                text-purple-300
                underline
                underline-offset-4
              "
            >
              Manage billing
            </Link>
          </ContactCard>


          <ContactCard
            icon={
              <CreditCard className="h-5 w-5" />
            }

            title="Paddle payment support"
          >
            <p>
              For transaction receipts,
              payment issues, cancellation,
              or refund requests associated
              with a Paddle transaction,
              you may also use Paddle&apos;s
              buyer support service.
            </p>


            <a
              href="https://paddle.net"
              target="_blank"
              rel="noreferrer"

              className="
                mt-3
                inline-block
                font-medium
                text-purple-300
                underline
                underline-offset-4
              "
            >
              Paddle buyer support
            </a>
          </ContactCard>


          <ContactCard
            icon={
              <FileText className="h-5 w-5" />
            }

            title="Legal & privacy"
          >
            <p>
              For privacy requests or
              questions about our terms
              and policies, contact:
            </p>


            <a
              href={`mailto:${siteConfig.supportEmail}`}

              className="
                mt-3
                inline-block
                font-medium
                text-purple-300
                underline
                underline-offset-4
              "
            >
              {siteConfig.supportEmail}
            </a>
          </ContactCard>
        </div>


        <div
          className="
            mt-10
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-6
          "
        >
          <h2 className="font-semibold">
            Business information
          </h2>


          <div
            className="
              mt-4
              space-y-2
              text-sm
              leading-6
              text-zinc-400
            "
          >
            <p>
              <span className="text-zinc-200">
                Product:
              </span>{" "}

              {siteConfig.productName}
            </p>


            <p>
              <span className="text-zinc-200">
                Supplier:
              </span>{" "}

              {siteConfig.legalName}
            </p>


            <p>
              <span className="text-zinc-200">
                Support:
              </span>{" "}

              {siteConfig.supportEmail}
            </p>


            {siteConfig.businessAddress && (
              <p>
                <span className="text-zinc-200">
                  Business address:
                </span>{" "}

                {
                  siteConfig.businessAddress
                }
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}


function ContactCard({
  icon,
  title,
  children,
}: {
  icon:
    React.ReactNode;

  title: string;

  children:
    React.ReactNode;
}) {
  return (
    <article
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-6
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-purple-500/10
          text-purple-300
        "
      >
        {icon}
      </div>


      <h2
        className="
          mt-4
          font-semibold
        "
      >
        {title}
      </h2>


      <div
        className="
          mt-3
          text-sm
          leading-6
          text-zinc-400
        "
      >
        {children}
      </div>
    </article>
  );
}