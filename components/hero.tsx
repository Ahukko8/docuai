"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";


export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-zinc-950
        px-5
        py-20
        text-white
        sm:px-6
        sm:py-24
        lg:px-8
        lg:py-32
      "
    >
      {/* Background effects */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[420px]
            w-[420px]
            -translate-x-1/2
            rounded-full
            bg-purple-600/10
            blur-3xl
            sm:h-[520px]
            sm:w-[520px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            h-72
            w-72
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />
      </div>


      <motion.div
        initial={{
          opacity: 0,
          y: 24,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="
          relative
          mx-auto
          max-w-5xl
          text-center
        "
      >
        {/* Badge */}

        <div
          className="
            mx-auto
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-purple-500/20
            bg-purple-500/10
            px-3
            py-1.5
            text-xs
            font-medium
            text-purple-300
            sm:text-sm
          "
        >
          <Sparkles className="h-4 w-4" />

          AI-powered resume builder
        </div>


        {/* Heading */}

        <h1
          className="
            mx-auto
            mt-6
            max-w-4xl
            text-4xl
            font-bold
            tracking-tight
            text-white
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
          "
        >
          Build a professional resume
          that stands out
        </h1>


        {/* Description */}

        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-base
            leading-7
            text-zinc-400
            sm:text-lg
            sm:leading-8
          "
        >
          Create polished, ATS-conscious
          resumes with AI-powered writing
          tools, professional templates,
          automatic saving, and PDF
          export — all in one place.
        </p>


        {/* CTA */}

        <div
          className="
            mt-8
            flex
            flex-col
            items-center
            justify-center
            gap-3
            sm:flex-row
          "
        >
          <Button
            size="lg"
            className="
              h-12
              w-full
              bg-purple-600
              px-6
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-purple-950/30
              hover:bg-purple-500
              sm:w-auto
            "
          >
            <Link href="/dashboard">
              Create your resume
            </Link>
          </Button>
        </div>


        {/* Trust points */}

        <div
          className="
            mx-auto
            mt-8
            flex
            max-w-2xl
            flex-col
            items-center
            justify-center
            gap-3
            text-sm
            text-zinc-500
            sm:flex-row
            sm:flex-wrap
            sm:gap-x-6
          "
        >
          <TrustItem text="Start free" />

          <TrustItem text="AI resume improvements" />

          <TrustItem text="Professional PDF export" />
        </div>


        {/* Resume preview card */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            delay: 0.2,
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            relative
            mx-auto
            mt-14
            max-w-4xl
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              p-3
              shadow-2xl
              shadow-black/30
              backdrop-blur
              sm:p-4
            "
          >
            <div
              className="
                overflow-hidden
                rounded-xl
                border
                border-white/10
                bg-zinc-900
              "
            >
              {/* Fake app toolbar */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  px-4
                  py-3
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <div
                    className="
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-zinc-600
                    "
                  />

                  <div
                    className="
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-zinc-600
                    "
                  />

                  <div
                    className="
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-zinc-600
                    "
                  />
                </div>


                <span
                  className="
                    text-xs
                    text-zinc-500
                  "
                >
                  DocuAI Resume Editor
                </span>
              </div>


              {/* Fake resume editor */}

              <div
                className="
                  grid
                  gap-4
                  p-4
                  sm:p-6
                  md:grid-cols-[0.9fr_1.1fr]
                "
              >
                {/* Editor side */}

                <div
                  className="
                    space-y-3
                    rounded-xl
                    border
                    border-white/10
                    bg-zinc-950/70
                    p-4
                  "
                >
                  <div
                    className="
                      h-3
                      w-28
                      rounded-full
                      bg-zinc-700
                    "
                  />

                  <div
                    className="
                      h-10
                      rounded-lg
                      border
                      border-white/10
                      bg-white/[0.03]
                    "
                  />

                  <div
                    className="
                      h-10
                      rounded-lg
                      border
                      border-white/10
                      bg-white/[0.03]
                    "
                  />

                  <div
                    className="
                      h-24
                      rounded-lg
                      border
                      border-white/10
                      bg-white/[0.03]
                    "
                  />


                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-purple-500/20
                      bg-purple-500/10
                      px-3
                      py-2
                      text-xs
                      text-purple-300
                    "
                  >
                    <Sparkles className="h-3.5 w-3.5" />

                    Improve with AI
                  </div>
                </div>


                {/* Preview side */}

                <div
                  className="
                    rounded-xl
                    bg-white
                    p-5
                    text-left
                    text-zinc-900
                    shadow-xl
                    sm:p-6
                  "
                >
                  <div
                    className="
                      border-b
                      border-zinc-200
                      pb-4
                    "
                  >
                    <div
                      className="
                        h-5
                        w-40
                        rounded
                        bg-zinc-900
                      "
                    />

                    <div
                      className="
                        mt-2
                        h-2
                        w-56
                        max-w-full
                        rounded
                        bg-zinc-300
                      "
                    />
                  </div>


                  <div className="mt-5">
                    <div
                      className="
                        h-3
                        w-20
                        rounded
                        bg-purple-600
                      "
                    />

                    <div
                      className="
                        mt-3
                        space-y-2
                      "
                    >
                      <div className="h-2 w-full rounded bg-zinc-200" />
                      <div className="h-2 w-[92%] rounded bg-zinc-200" />
                      <div className="h-2 w-[84%] rounded bg-zinc-200" />
                    </div>
                  </div>


                  <div className="mt-6">
                    <div
                      className="
                        h-3
                        w-28
                        rounded
                        bg-purple-600
                      "
                    />

                    <div className="mt-3 space-y-3">
                      <div>
                        <div className="h-2.5 w-32 rounded bg-zinc-700" />
                        <div className="mt-2 h-2 w-full rounded bg-zinc-200" />
                        <div className="mt-1.5 h-2 w-[88%] rounded bg-zinc-200" />
                      </div>


                      <div>
                        <div className="h-2.5 w-28 rounded bg-zinc-700" />
                        <div className="mt-2 h-2 w-full rounded bg-zinc-200" />
                        <div className="mt-1.5 h-2 w-[78%] rounded bg-zinc-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}


function TrustItem({
  text,
}: {
  text: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <div
        className="
          flex
          h-5
          w-5
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

      <span>{text}</span>
    </div>
  );
}