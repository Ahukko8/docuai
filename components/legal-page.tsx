import Link from "next/link";

import type {
  ReactNode,
} from "react";

import {
  ArrowLeft,
} from "lucide-react";

import {
  siteConfig,
} from "@/lib/site-config";


interface LegalPageProps {
  title: string;

  description: string;

  children: ReactNode;
}


export function LegalPage({
  title,
  description,
  children,
}: LegalPageProps) {
  return (
    <main
      className="
        min-h-screen
        bg-zinc-950
        px-5
        py-12
        text-white
        sm:px-8
        lg:px-10
      "
    >
      <div
        className="
          mx-auto
          max-w-4xl
        "
      >
        <Link
          href="/"

          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-zinc-400
            transition
            hover:text-white
          "
        >
          <ArrowLeft className="h-4 w-4" />

          Back to DocuAI
        </Link>


        <header
          className="
            mt-10
            border-b
            border-white/10
            pb-8
          "
        >
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.16em]
              text-purple-300
            "
          >
            {siteConfig.legalName}
          </p>


          <h1
            className="
              mt-3
              text-4xl
              font-bold
              tracking-tight
              sm:text-5xl
            "
          >
            {title}
          </h1>


          <p
            className="
              mt-4
              max-w-3xl
              text-base
              leading-7
              text-zinc-400
            "
          >
            {description}
          </p>


          <p
            className="
              mt-5
              text-xs
              text-zinc-600
            "
          >
            Last updated:{" "}
            {siteConfig.lastUpdated}
          </p>
        </header>


        <article
          className="
            space-y-10
            py-10
          "
        >
          {children}
        </article>
      </div>
    </main>
  );
}


interface LegalSectionProps {
  title: string;

  children: ReactNode;
}


export function LegalSection({
  title,
  children,
}: LegalSectionProps) {
  return (
    <section>
      <h2
        className="
          text-xl
          font-semibold
          tracking-tight
        "
      >
        {title}
      </h2>


      <div
        className="
          mt-4
          space-y-4
          text-sm
          leading-7
          text-zinc-400
        "
      >
        {children}
      </div>
    </section>
  );
}


export function LegalList({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ul
      className="
        list-disc
        space-y-2
        pl-5
      "
    >
      {children}
    </ul>
  );
}