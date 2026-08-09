import type {
  Metadata,
} from "next";

import {
  LegalList,
  LegalPage,
  LegalSection,
} from "@/components/legal-page";

import {
  siteConfig,
} from "@/lib/site-config";


export const metadata:
  Metadata = {
  title:
    "Privacy Policy | DocuAI",

  description:
    "Privacy Policy for DocuAI by ClickBuyHub LLC.",
};


export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"

      description="This Privacy Policy explains how ClickBuyHub LLC collects, uses, stores, and shares information when you use DocuAI."
    >
      <LegalSection title="1. Who we are">
        <p>
          DocuAI is operated by{" "}
          <strong className="text-zinc-200">
            {siteConfig.legalName}
          </strong>
          .
        </p>


        <p>
          For personal information that
          we determine the purposes and
          means of processing, ClickBuyHub
          LLC acts as the responsible
          business or data controller as
          applicable under relevant law.
        </p>
      </LegalSection>


      <LegalSection title="2. Information we collect">
        <p>
          Depending on how you use
          DocuAI, we may process:
        </p>


        <LegalList>
          <li>
            account information such as
            your name, email address, user
            identifier, and authentication
            information;
          </li>

          <li>
            resume content including
            contact details, employment
            history, education, skills,
            summaries, and other content
            you choose to enter;
          </li>

          <li>
            AI prompts and resume text
            submitted to AI-powered
            features;
          </li>

          <li>
            subscription and billing
            status information such as
            plan, Paddle customer ID,
            subscription ID, transaction
            ID, and subscription status;
          </li>

          <li>
            technical information such as
            browser type, device
            information, IP-derived
            information, request logs,
            security information, and
            error data; and
          </li>

          <li>
            messages or information you
            send to customer support.
          </li>
        </LegalList>
      </LegalSection>


      <LegalSection title="3. Payment information">
        <p>
          Payments for paid DocuAI plans
          are processed by Paddle.
        </p>


        <p>
          ClickBuyHub LLC does not need
          to receive or store your full
          payment card number in order to
          operate DocuAI subscriptions.
        </p>


        <p>
          Paddle processes payment and
          transaction information under
          its own applicable privacy,
          buyer, and payment policies.
        </p>
      </LegalSection>


      <LegalSection title="4. How we use information">
        <p>
          We may use personal information
          to:
        </p>


        <LegalList>
          <li>
            create and maintain your
            account;
          </li>

          <li>
            authenticate users and secure
            accounts;
          </li>

          <li>
            store and retrieve resumes;
          </li>

          <li>
            provide resume editing,
            autosave, template, and PDF
            export functionality;
          </li>

          <li>
            provide AI-powered resume
            improvement features;
          </li>

          <li>
            enforce subscription plans,
            AI usage allowances, and
            premium feature access;
          </li>

          <li>
            process and reconcile billing
            events from Paddle;
          </li>

          <li>
            provide customer support;
          </li>

          <li>
            detect fraud, abuse,
            unauthorized access, or
            security incidents;
          </li>

          <li>
            maintain and improve DocuAI;
            and
          </li>

          <li>
            comply with applicable legal
            obligations.
          </li>
        </LegalList>
      </LegalSection>


      <LegalSection title="5. Legal bases">
        <p>
          Depending on your location and
          applicable law, we may process
          personal information where
          necessary to perform a contract
          with you, comply with legal
          obligations, pursue legitimate
          interests such as security and
          service operation, or based on
          consent where consent is
          required.
        </p>
      </LegalSection>


      <LegalSection title="6. Service providers">
        <p>
          DocuAI currently uses
          third-party service providers
          for core application functions.
          These may include:
        </p>


        <LegalList>
          <li>
            Clerk for authentication and
            user account services;
          </li>

          <li>
            Supabase for database and
            application data storage;
          </li>

          <li>
            OpenAI for AI-powered text
            processing;
          </li>

          <li>
            Paddle for checkout,
            subscription billing,
            transaction processing, tax
            handling associated with
            transactions, and customer
            billing tools; and
          </li>

          <li>
            Vercel for application
            hosting and related
            infrastructure.
          </li>
        </LegalList>


        <p>
          We may replace, add, or remove
          service providers as DocuAI
          evolves.
        </p>
      </LegalSection>


      <LegalSection title="7. AI processing">
        <p>
          When you request an AI-powered
          improvement, relevant resume
          text and context may be sent to
          our AI service provider so the
          requested output can be
          generated.
        </p>


        <p>
          You should avoid entering
          sensitive personal information
          that is not necessary for your
          resume or the requested AI
          function.
        </p>
      </LegalSection>


      <LegalSection title="8. When we share information">
        <p>
          We do not sell your personal
          information as part of the
          ordinary operation of DocuAI.
        </p>


        <p>
          We may share information:
        </p>


        <LegalList>
          <li>
            with service providers needed
            to operate DocuAI;
          </li>

          <li>
            with Paddle as necessary for
            billing and subscription
            fulfillment;
          </li>

          <li>
            where required by law, court
            order, regulatory authority,
            or lawful process;
          </li>

          <li>
            when reasonably necessary to
            protect users, ClickBuyHub
            LLC, DocuAI, or third parties
            from fraud, abuse, security
            threats, or unlawful
            activity; or
          </li>

          <li>
            in connection with a lawful
            merger, acquisition,
            financing, restructuring, or
            sale of business assets,
            subject to applicable legal
            requirements.
          </li>
        </LegalList>
      </LegalSection>


      <LegalSection title="9. International processing">
        <p>
          DocuAI and its service
          providers may process
          information in countries other
          than the country where you
          live.
        </p>


        <p>
          Where required, appropriate
          legal mechanisms and safeguards
          may be used for international
          transfers of personal
          information.
        </p>
      </LegalSection>


      <LegalSection title="10. Data retention">
        <p>
          We retain information for as
          long as reasonably necessary to
          provide DocuAI, maintain your
          account, comply with legal and
          financial obligations, resolve
          disputes, enforce agreements,
          and protect the service.
        </p>


        <p>
          Different categories of data
          may be retained for different
          periods.
        </p>


        <p>
          Billing records may need to be
          retained even after an account
          is closed where necessary for
          tax, accounting, fraud
          prevention, dispute, or legal
          purposes.
        </p>
      </LegalSection>


      <LegalSection title="11. Security">
        <p>
          We use reasonable technical,
          administrative, and
          organizational measures
          designed to protect personal
          information against
          unauthorized access, loss,
          misuse, alteration, or
          disclosure.
        </p>


        <p>
          No online system can guarantee
          absolute security.
        </p>
      </LegalSection>


      <LegalSection title="12. Your privacy rights">
        <p>
          Depending on your location,
          applicable law may give you
          rights concerning your personal
          information, which may include
          the right to:
        </p>


        <LegalList>
          <li>
            request access to personal
            information;
          </li>

          <li>
            request correction of
            inaccurate information;
          </li>

          <li>
            request deletion;
          </li>

          <li>
            request restriction of
            processing;
          </li>

          <li>
            object to certain processing;
          </li>

          <li>
            request data portability;
          </li>

          <li>
            withdraw consent where
            processing is based on
            consent; and
          </li>

          <li>
            make a complaint to an
            applicable supervisory or
            regulatory authority.
          </li>
        </LegalList>


        <p>
          These rights may be subject to
          legal limitations and
          exceptions.
        </p>
      </LegalSection>


      <LegalSection title="13. Account deletion requests">
        <p>
          You may contact us if you want
          to request deletion of your
          DocuAI account or associated
          personal information.
        </p>


        <p>
          Some records may continue to be
          retained where required or
          permitted by law, including
          billing, transaction, security,
          and dispute-related records.
        </p>
      </LegalSection>


      <LegalSection title="14. Cookies and local technologies">
        <p>
          DocuAI may use cookies or
          similar browser technologies
          that are necessary for
          authentication, security,
          session management, checkout,
          and core application
          functionality.
        </p>


        <p>
          If we introduce non-essential
          analytics, advertising, or
          additional tracking
          technologies that require
          notice or consent, we will
          update our disclosures and
          consent mechanisms where
          required.
        </p>
      </LegalSection>


      <LegalSection title="15. Third-party websites">
        <p>
          DocuAI may link to third-party
          websites or services.
        </p>


        <p>
          Their privacy practices are
          governed by their own policies
          rather than this Privacy
          Policy.
        </p>
      </LegalSection>


      <LegalSection title="16. Changes to this policy">
        <p>
          We may update this Privacy
          Policy as DocuAI, our service
          providers, or applicable laws
          change.
        </p>


        <p>
          We will publish the updated
          version on this page and update
          the effective date.
        </p>
      </LegalSection>


      <LegalSection title="17. Contact us">
        <p>
          Privacy questions and requests
          may be sent to:
        </p>


        <p>
          <strong className="text-zinc-200">
            {siteConfig.legalName}
          </strong>
          <br />

          Email:{" "}
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="
              text-purple-300
              underline
              underline-offset-4
            "
          >
            {siteConfig.supportEmail}
          </a>
        </p>


        {siteConfig.businessAddress && (
          <p>
            Business address:
            <br />

            {
              siteConfig.businessAddress
            }
          </p>
        )}
      </LegalSection>
    </LegalPage>
  );
}