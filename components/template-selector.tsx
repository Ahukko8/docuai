"use client";

import {
  Check,
  Crown,
  LockKeyhole,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  RESUME_TEMPLATE_THEMES,
} from "@/lib/resume/template-config";

import type {
  ResumeTemplate,
} from "@/types/resume";


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


const templateOrder:
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


  return (
    <div
      className="
        grid
        gap-4
        md:grid-cols-3
      "
    >
      {templateOrder.map(
        (templateId) => {
          const template =
            RESUME_TEMPLATE_THEMES[
              templateId
            ];


          const active =
            selected ===
            templateId;


          const isPremium =
            templateId !==
            "modern";


          const isLocked =
            isPremium &&
            !canUsePremiumTemplates;


          function handleSelect() {
            if (isLocked) {
              router.push(
                "/pricing"
              );

              return;
            }


            onSelect(
              templateId
            );
          }


          return (
            <button
              key={
                templateId
              }

              type="button"

              onClick={
                handleSelect
              }

              className={`
                relative
                overflow-hidden
                rounded-xl
                border
                p-4
                text-left
                transition

                ${
                  active
                    ? "border-purple-500 bg-purple-500/10 ring-2 ring-purple-500/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                }
              `}
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
                      flex-wrap
                      items-center
                      gap-2
                    "
                  >
                    <h3
                      className="
                        font-medium
                        text-white
                      "
                    >
                      {
                        template.name
                      }
                    </h3>


                    {isPremium && (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-full
                          bg-amber-500/10
                          px-2
                          py-1
                          text-[10px]
                          font-semibold
                          text-amber-300
                        "
                      >
                        <Crown
                          className="
                            h-3
                            w-3
                          "
                        />

                        PRO
                      </span>
                    )}
                  </div>


                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-zinc-400
                    "
                  >
                    {
                      template.description
                    }
                  </p>
                </div>


                {active &&
                !isLocked ? (
                  <span
                    className="
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-purple-500
                      text-white
                    "
                  >
                    <Check
                      className="
                        h-4
                        w-4
                      "
                    />
                  </span>
                ) : isLocked ? (
                  <span
                    className="
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-amber-500/10
                      text-amber-300
                    "
                  >
                    <LockKeyhole
                      className="
                        h-3.5
                        w-3.5
                      "
                    />
                  </span>
                ) : null}
              </div>


              <p
                className="
                  mt-4
                  border-t
                  border-white/10
                  pt-3
                  text-[11px]
                  leading-5
                  text-zinc-500
                "
              >
                {
                  template.recommendedFor
                }
              </p>


              {isLocked && (
                <p
                  className="
                    mt-3
                    flex
                    items-center
                    gap-1.5
                    text-[11px]
                    font-medium
                    text-amber-300
                  "
                >
                  <LockKeyhole
                    className="
                      h-3
                      w-3
                    "
                  />

                  Pro or Advanced required
                </p>
              )}
            </button>
          );
        }
      )}
    </div>
  );
}