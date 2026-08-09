import Link from "next/link";

import {
  Bot,
  Download,
  FileText,
  ShieldCheck,
} from "lucide-react";


const features = [
  {
    title:
      "AI resume writing",

    description:
      "Improve professional summaries and work-experience descriptions with AI.",

    icon:
      Bot,
  },

  {
    title:
      "Professional templates",

    description:
      "Build resumes using Modern, Executive, and Creative professional designs.",

    icon:
      FileText,
  },

  {
    title:
      "PDF export",

    description:
      "Download your completed resume as a professionally formatted PDF.",

    icon:
      Download,
  },

  {
    title:
      "Secure account access",

    description:
      "Create, save, edit, and manage resumes from your authenticated account.",

    icon:
      ShieldCheck,
  },
];


export default function VerificationTrustSection() {
  return (
    <section
      className="
        border-y
        border-white/10
        bg-zinc-950
        px-5
        py-20
        text-white
        sm:px-8
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
        "
      >
        <div
          className="
            max-w-3xl
          "
        >
          <p
            className="
              text-sm
              font-medium
              text-purple-300
            "
          >
            AI-powered resume builder
          </p>


          <h2
            className="
              mt-3
              text-3xl
              font-bold
              tracking-tight
              sm:text-4xl
            "
          >
            Build professional resumes
            with DocuAI
          </h2>


          <p
            className="
              mt-5
              text-base
              leading-7
              text-zinc-400
            "
          >
            DocuAI helps job seekers
            create, improve, format, save,
            and export professional
            resumes using AI-powered
            writing tools and modern
            resume templates.
          </p>
        </div>


        <div
          className="
            mt-10
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {features.map(
            ({
              title,
              description,
              icon: Icon,
            }) => (
              <article
                key={title}

                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
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
                  <Icon className="h-5 w-5" />
                </div>


                <h3
                  className="
                    mt-4
                    font-semibold
                  "
                >
                  {title}
                </h3>


                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-zinc-500
                  "
                >
                  {description}
                </p>
              </article>
            )
          )}
        </div>


        <div
          className="
            mt-10
            flex
            flex-wrap
            gap-3
          "
        >
          <Link
            href="/pricing"

            className="
              inline-flex
              h-11
              items-center
              justify-center
              rounded-lg
              bg-purple-600
              px-5
              text-sm
              font-semibold
              transition
              hover:bg-purple-500
            "
          >
            View pricing
          </Link>


          <Link
            href="/contact"

            className="
              inline-flex
              h-11
              items-center
              justify-center
              rounded-lg
              border
              border-white/10
              px-5
              text-sm
              font-medium
              text-zinc-300
              transition
              hover:bg-white/[0.05]
            "
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}