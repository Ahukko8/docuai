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
    "Terms & Conditions | DocuAI",

  description:
    "Terms and Conditions governing the use of DocuAI.",
};


export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"

      description="These Terms govern your access to and use of DocuAI, an AI-powered resume creation service supplied by ClickBuyHub LLC."
    >
      <LegalSection title="1. About DocuAI">
        <p>
          DocuAI is provided by{" "}
          <strong className="text-zinc-200">
            {siteConfig.legalName}
          </strong>
          . DocuAI provides tools that
          help users create, edit,
          improve, format, save, and
          export professional resumes.
        </p>


        <p>
          These Terms apply whenever you
          access or use the DocuAI
          website, account dashboard,
          resume editor, AI features,
          downloadable documents, or
          other services we provide.
        </p>
      </LegalSection>


      <LegalSection title="2. Acceptance of these Terms">
        <p>
          By creating an account,
          accessing DocuAI, purchasing a
          subscription, or otherwise
          using the service, you agree to
          these Terms.
        </p>


        <p>
          If you do not agree to these
          Terms, you should not use
          DocuAI.
        </p>
      </LegalSection>


      <LegalSection title="3. Eligibility and accounts">
        <p>
          You must have the legal
          capacity to enter into an
          agreement in your jurisdiction
          to purchase or use paid
          DocuAI services.
        </p>


        <p>
          You are responsible for:
        </p>


        <LegalList>
          <li>
            providing accurate account
            information;
          </li>

          <li>
            protecting access to your
            account;
          </li>

          <li>
            activity performed through
            your account; and
          </li>

          <li>
            notifying us if you believe
            your account has been
            compromised.
          </li>
        </LegalList>
      </LegalSection>


      <LegalSection title="4. Plans and subscriptions">
        <p>
          DocuAI may provide free and
          paid subscription plans,
          including Starter, Pro, and
          Advanced plans.
        </p>


        <p>
          Features, usage allowances,
          templates, AI limits, and
          pricing associated with each
          plan are displayed on our
          pricing page.
        </p>


        <p>
          Subscription plans may be
          offered on monthly or annual
          billing cycles.
        </p>


        <p>
          Unless canceled, a recurring
          subscription may renew
          automatically according to the
          billing cycle selected during
          checkout.
        </p>
      </LegalSection>


      <LegalSection title="5. Payments and Paddle">
        <p>
          Paid DocuAI transactions are
          processed through Paddle.
          Paddle acts as the authorized
          reseller and Merchant of
          Record for applicable DocuAI
          purchases.
        </p>


        <p>
          When you complete a purchase
          through Paddle, your payment,
          receipt, transaction taxes
          where applicable, billing
          management, cancellations, and
          refund processing may be
          handled by Paddle under its
          applicable buyer terms and
          policies.
        </p>


        <p>
          ClickBuyHub LLC remains the
          supplier and operator of the
          DocuAI product.
        </p>


        <p>
          Additional Paddle buyer terms
          presented during checkout may
          apply to your transaction.
        </p>
      </LegalSection>


      <LegalSection title="6. Cancellation">
        <p>
          You may cancel a recurring
          subscription through the
          billing management tools made
          available through DocuAI or
          Paddle.
        </p>


        <p>
          Unless otherwise required by
          law or stated during
          cancellation, cancellation
          normally takes effect at the
          end of the current paid billing
          period.
        </p>


        <p>
          A scheduled cancellation does
          not necessarily terminate
          access immediately. Paid
          features may remain available
          until the effective
          cancellation date.
        </p>
      </LegalSection>


      <LegalSection title="7. Refunds">
        <p>
          Refunds are governed by our
          Refund & Cancellation Policy,
          Paddle&apos;s applicable buyer and
          refund policies, and mandatory
          consumer protection laws.
        </p>


        <p>
          Nothing in these Terms limits
          any non-waivable statutory
          rights you may have.
        </p>
      </LegalSection>


      <LegalSection title="8. AI-generated content">
        <p>
          DocuAI includes artificial
          intelligence features designed
          to help improve resume
          summaries, work-experience
          descriptions, and related
          professional content.
        </p>


        <p>
          AI-generated content may be
          incomplete, inaccurate, or
          unsuitable for your particular
          circumstances.
        </p>


        <p>
          You are responsible for
          reviewing and verifying all
          AI-generated text before using
          it in a resume, job
          application, professional
          profile, or other document.
        </p>


        <p>
          DocuAI does not guarantee that
          AI-generated content will
          result in interviews,
          employment, promotion,
          admission, or any other
          outcome.
        </p>
      </LegalSection>


      <LegalSection title="9. Accuracy of resume information">
        <p>
          You are solely responsible for
          ensuring that information in
          your resume is truthful,
          accurate, current, and not
          misleading.
        </p>


        <p>
          You must not use DocuAI to
          fabricate qualifications,
          employment history,
          achievements, certifications,
          identities, references, or
          other material facts.
        </p>
      </LegalSection>


      <LegalSection title="10. Acceptable use">
        <p>
          You may not use DocuAI:
        </p>


        <LegalList>
          <li>
            for unlawful or fraudulent
            activity;
          </li>

          <li>
            to impersonate another
            person;
          </li>

          <li>
            to infringe intellectual
            property, privacy, or other
            rights;
          </li>

          <li>
            to introduce malicious code
            or interfere with the
            service;
          </li>

          <li>
            to attempt unauthorized
            access to accounts, systems,
            APIs, or infrastructure;
          </li>

          <li>
            to circumvent plan,
            subscription, AI usage, or
            feature restrictions; or
          </li>

          <li>
            to misuse the service in a
            way that may harm DocuAI,
            other users, or third
            parties.
          </li>
        </LegalList>
      </LegalSection>


      <LegalSection title="11. Your content">
        <p>
          You retain your rights in
          resume information and other
          content that you submit to
          DocuAI, subject to rights
          necessary for us to operate
          the service.
        </p>


        <p>
          You grant ClickBuyHub LLC a
          limited right to host, process,
          transmit, format, analyze, and
          otherwise use your submitted
          content only as reasonably
          necessary to provide,
          maintain, secure, and improve
          DocuAI.
        </p>
      </LegalSection>


      <LegalSection title="12. Intellectual property">
        <p>
          DocuAI, including its software,
          interface, branding, original
          templates, designs,
          documentation, and related
          materials, is owned by or
          licensed to ClickBuyHub LLC,
          except for third-party
          materials.
        </p>


        <p>
          These Terms do not transfer
          ownership of DocuAI or its
          underlying technology to you.
        </p>
      </LegalSection>


      <LegalSection title="13. Third-party services">
        <p>
          DocuAI relies on third-party
          infrastructure and service
          providers for functions such
          as authentication, hosting,
          data storage, artificial
          intelligence, and payment
          processing.
        </p>


        <p>
          Your use of certain third-party
          functionality may also be
          subject to those providers&apos;
          applicable policies and terms.
        </p>
      </LegalSection>


      <LegalSection title="14. Availability and changes">
        <p>
          We may maintain, modify,
          improve, replace, or discontinue
          features of DocuAI from time to
          time.
        </p>


        <p>
          We do not guarantee that the
          service will be uninterrupted
          or error-free at all times.
        </p>


        <p>
          Where a material change affects
          an active paid subscription, we
          will take reasonable steps to
          communicate the change where
          required.
        </p>
      </LegalSection>


      <LegalSection title="15. Suspension and termination">
        <p>
          We may restrict or suspend
          access where reasonably
          necessary to address security
          threats, fraud, abuse, legal
          obligations, payment issues, or
          material violations of these
          Terms.
        </p>


        <p>
          We may terminate accounts for
          serious or repeated violations,
          subject to applicable law.
        </p>
      </LegalSection>


      <LegalSection title="16. No employment guarantee">
        <p>
          DocuAI is a resume-building
          and writing assistance tool.
          It is not a recruitment agency,
          employer, career placement
          service, or guarantee of
          employment.
        </p>
      </LegalSection>


      <LegalSection title="17. Disclaimer">
        <p>
          To the maximum extent permitted
          by applicable law, DocuAI is
          provided on an &quot;as available&quot;
          basis.
        </p>


        <p>
          We do not guarantee particular
          employment, applicant tracking
          system, recruitment, or hiring
          outcomes.
        </p>
      </LegalSection>


      <LegalSection title="18. Limitation of liability">
        <p>
          To the maximum extent permitted
          by applicable law, ClickBuyHub
          LLC will not be liable for
          indirect, incidental, special,
          consequential, or punitive
          damages arising from your use
          of DocuAI.
        </p>


        <p>
          Nothing in these Terms excludes
          or limits liability where doing
          so would be prohibited by
          applicable law.
        </p>
      </LegalSection>


      <LegalSection title="19. Privacy">
        <p>
          Our collection and processing
          of personal information is
          described in the DocuAI Privacy
          Policy.
        </p>
      </LegalSection>


      <LegalSection title="20. Changes to these Terms">
        <p>
          We may update these Terms to
          reflect changes to DocuAI,
          applicable law, business
          operations, or regulatory
          requirements.
        </p>


        <p>
          The updated version will be
          published on this page with a
          revised effective date.
        </p>
      </LegalSection>


      <LegalSection title="21. Applicable law and consumer rights">
        <p>
          These Terms are subject to
          applicable law and any
          mandatory consumer protection
          rights that cannot legally be
          excluded or limited.
        </p>


        <p>
          Transactions processed by
          Paddle may also be governed by
          Paddle&apos;s applicable buyer terms
          and country-specific
          provisions.
        </p>
      </LegalSection>


      <LegalSection title="22. Contact">
        <p>
          Questions about these Terms or
          DocuAI may be sent to:
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