"use client";

import {
  useRouter,
} from "next/navigation";

import {
  Check,
  Crown,
  Lock,
  Sparkles,
} from "lucide-react";

import type {
  ResumeTemplate,
} from "@/types/resume";

import {
  RESUME_TEMPLATE_THEMES,
} from "@/lib/resume/template-config";


interface TemplateSelectorProps {
  selected:
    ResumeTemplate;

  canUsePremiumTemplates:
    boolean;

  onSelect:
    (
      template:
        ResumeTemplate
    ) => void;
}


const templates:
  ResumeTemplate[] = [
  "modern",
  "executive",
  "creative",
];


export default function TemplateSelector({
  selected,
  canUsePremiumTemplates,
  onSelect,
}: TemplateSelectorProps) {
  const router =
    useRouter();


  function handleSelect(
    template:
      ResumeTemplate
  ) {
    const premium =
      template !==
      "modern";


    if (
      premium &&
      !canUsePremiumTemplates
    ) {
      router.push(
        "/pricing"
      );

      return;
    }


    onSelect(template);
  }


  return (
    <section>
      <div
        className="
          flex
          items-end
          justify-between
          gap-4
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Sparkles
              className="
                h-4
                w-4
                text-purple-400
              "
            />

            <h2
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              Choose your design
            </h2>
          </div>


          <p
            className="
              mt-1.5
              max-w-xl
              text-xs
              leading-5
              text-zinc-500
            "
          >
            Pick a professionally
            designed layout. DocuAI
            handles the formatting
            automatically.
          </p>
        </div>
      </div>


      <div
        className="
          -mx-1
          mt-5
          flex
          snap-x
          gap-4
          overflow-x-auto
          px-1
          pb-3
          md:grid
          md:grid-cols-3
          md:overflow-visible
          md:pb-0
        "
      >
        {templates.map(
          (templateKey) => {
            const template =
              RESUME_TEMPLATE_THEMES[
                templateKey
              ];

            const isSelected =
              selected ===
              templateKey;

            const premium =
              templateKey !==
              "modern";

            const locked =
              premium &&
              !canUsePremiumTemplates;


            return (
              <button
                key={
                  templateKey
                }
                type="button"
                onClick={() =>
                  handleSelect(
                    templateKey
                  )
                }
                className={`
                  group
                  relative
                  w-[230px]
                  shrink-0
                  snap-start
                  overflow-hidden
                  rounded-2xl
                  border
                  text-left
                  transition-all
                  duration-200
                  md:w-full

                  ${
                    isSelected
                      ? `
                        border-purple-500
                        bg-purple-500/[0.06]
                        shadow-lg
                        shadow-purple-950/20
                      `
                      : `
                        border-white/10
                        bg-white/[0.025]
                        hover:border-white/20
                        hover:bg-white/[0.04]
                      `
                  }
                `}
              >
                {/* Preview */}

                <div
                  className="
                    bg-zinc-900
                    p-4
                  "
                >
                  <MiniTemplatePreview
                    template={
                      templateKey
                    }
                  />
                </div>


                {/* Information */}

                <div
                  className="
                    p-4
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                  >
                    <div>
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <h3
                          className="
                            text-sm
                            font-semibold
                            text-white
                          "
                        >
                          {
                            template.name
                          }
                        </h3>


                        {template.badge && (
                          <span
                            className={`
                              rounded-full
                              px-2
                              py-0.5
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-wide

                              ${
                                premium
                                  ? `
                                    bg-amber-500/10
                                    text-amber-300
                                  `
                                  : `
                                    bg-purple-500/10
                                    text-purple-300
                                  `
                              }
                            `}
                          >
                            {
                              template.badge
                            }
                          </span>
                        )}
                      </div>
                    </div>


                    {isSelected ? (
                      <div
                        className="
                          flex
                          h-6
                          w-6
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-purple-600
                          text-white
                        "
                      >
                        <Check
                          className="
                            h-3.5
                            w-3.5
                          "
                        />
                      </div>
                    ) : locked ? (
                      <div
                        className="
                          flex
                          h-6
                          w-6
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-white/5
                          text-zinc-500
                        "
                      >
                        <Lock
                          className="
                            h-3
                            w-3
                          "
                        />
                      </div>
                    ) : null}
                  </div>


                  <p
                    className="
                      mt-2
                      text-[11px]
                      leading-5
                      text-zinc-500
                    "
                  >
                    {
                      template.description
                    }
                  </p>


                  <div
                    className="
                      mt-4
                      border-t
                      border-white/10
                      pt-3
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-zinc-600
                      "
                    >
                      Recommended for
                    </p>


                    <p
                      className="
                        mt-1
                        text-[10px]
                        leading-4
                        text-zinc-400
                      "
                    >
                      {
                        template.recommendedFor
                      }
                    </p>
                  </div>


                  {locked && (
                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        gap-1.5
                        text-[10px]
                        font-medium
                        text-amber-300
                      "
                    >
                      <Crown
                        className="
                          h-3
                          w-3
                        "
                      />

                      Upgrade to Pro
                    </div>
                  )}
                </div>
              </button>
            );
          }
        )}
      </div>
    </section>
  );
}


/* ======================================= */
/* MINI PREVIEWS */
/* ======================================= */

function MiniTemplatePreview({
  template,
}: {
  template:
    ResumeTemplate;
}) {
  if (
    template ===
    "executive"
  ) {
    return (
      <ExecutiveMini />
    );
  }


  if (
    template ===
    "creative"
  ) {
    return (
      <CreativeMini />
    );
  }


  return (
    <ModernMini />
  );
}


function ModernMini() {
  return (
    <div
      className="
        aspect-[210/297]
        overflow-hidden
        rounded-md
        bg-white
        shadow-lg
      "
    >
      <div
        className="
          h-[25%]
          bg-slate-900
          p-3
        "
      >
        <div
          className="
            h-0.5
            w-5
            bg-indigo-500
          "
        />

        <div
          className="
            mt-2
            h-2
            w-20
            rounded-sm
            bg-white
          "
        />

        <div
          className="
            mt-1.5
            h-1
            w-12
            rounded-sm
            bg-indigo-300
          "
        />

        <div
          className="
            mt-2
            h-0.5
            w-28
            rounded
            bg-slate-500
          "
        />
      </div>


      <MiniBody
        accent="bg-indigo-500"
      />
    </div>
  );
}


function ExecutiveMini() {
  return (
    <div
      className="
        aspect-[210/297]
        overflow-hidden
        rounded-md
        bg-[#fffefc]
        p-3
        shadow-lg
      "
    >
      <div
        className="
          border-t
          border-amber-700/60
          pt-3
          text-center
        "
      >
        <div
          className="
            mx-auto
            h-2
            w-20
            rounded-sm
            bg-stone-800
          "
        />

        <div
          className="
            mx-auto
            mt-2
            h-0.5
            w-12
            bg-amber-700/70
          "
        />

        <div
          className="
            mx-auto
            mt-2
            h-0.5
            w-24
            bg-stone-300
          "
        />

        <div
          className="
            mt-3
            border-b
            border-stone-200
          "
        />
      </div>


      <div
        className="
          mt-4
          space-y-4
        "
      >
        {[1, 2, 3].map(
          (item) => (
            <div
              key={item}
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
                    h-1
                    w-10
                    bg-stone-700
                  "
                />

                <div
                  className="
                    h-px
                    flex-1
                    bg-stone-200
                  "
                />
              </div>

              <MiniTextLines />
            </div>
          )
        )}
      </div>
    </div>
  );
}


function CreativeMini() {
  return (
    <div
      className="
        relative
        aspect-[210/297]
        overflow-hidden
        rounded-md
        bg-white
        p-3
        pl-5
        shadow-lg
      "
    >
      <div
        className="
          absolute
          bottom-0
          left-0
          top-0
          w-2
          bg-violet-600
        "
      />


      <div
        className="
          inline-block
          rounded-full
          bg-violet-50
          px-2
          py-1
        "
      >
        <div
          className="
            h-0.5
            w-8
            bg-violet-500
          "
        />
      </div>


      <div
        className="
          mt-3
          h-2
          w-20
          rounded-sm
          bg-zinc-900
        "
      />

      <div
        className="
          mt-2
          h-1
          w-12
          bg-violet-500
        "
      />

      <div
        className="
          mt-3
          h-px
          bg-zinc-200
        "
      />


      <div
        className="
          mt-4
          space-y-3
        "
      >
        {[1, 2, 3].map(
          (item) => (
            <div
              key={item}
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
                    h-3
                    w-3
                    rounded
                    bg-violet-100
                  "
                />

                <div
                  className="
                    h-1
                    w-12
                    bg-zinc-700
                  "
                />
              </div>

              <MiniTextLines />
            </div>
          )
        )}
      </div>
    </div>
  );
}


function MiniBody({
  accent,
}: {
  accent: string;
}) {
  return (
    <div
      className="
        space-y-4
        p-3
      "
    >
      {[1, 2, 3].map(
        (item) => (
          <div
            key={item}
          >
            <div
              className="
                h-1
                w-12
                bg-zinc-700
              "
            />

            <div
              className={`
                mt-1
                h-0.5
                w-5
                ${accent}
              `}
            />

            <MiniTextLines />
          </div>
        )
      )}
    </div>
  );
}


function MiniTextLines() {
  return (
    <div
      className="
        mt-2
        space-y-1
      "
    >
      <div
        className="
          h-0.5
          w-full
          rounded
          bg-zinc-200
        "
      />

      <div
        className="
          h-0.5
          w-[90%]
          rounded
          bg-zinc-200
        "
      />

      <div
        className="
          h-0.5
          w-[72%]
          rounded
          bg-zinc-200
        "
      />
    </div>
  );
}