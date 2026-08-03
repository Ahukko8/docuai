"use client";

import type {
    ResumeTemplate
} from "@/types/resume";


interface Template {
    id: ResumeTemplate;

    name: string;

    description: string;

    pro: boolean;
}


const templates: Template[] = [
    {
        id: "modern",

        name: "Modern",

        description:
            "Clean and ATS-friendly.",

        pro: false,
    },

    {
        id: "executive",

        name: "Executive",

        description:
            "Professional layout for senior roles.",

        pro: true,
    },

    {
        id: "creative",

        name: "Creative",

        description:
            "A polished layout for creative careers.",

        pro: true,
    },
];


interface TemplateSelectorProps {
    selected: ResumeTemplate;

    onSelect:
    (template: ResumeTemplate) =>
        void;
}


export default function TemplateSelector({
    selected,
    onSelect,
}: TemplateSelectorProps) {
    return (
        <div className="grid gap-3 sm:grid-cols-3">

            {templates.map(
                (template) => {
                    const active =
                        selected ===
                        template.id;


                    return (
                        <button
                            key={template.id}

                            type="button"

                            onClick={() =>
                                onSelect(
                                    template.id
                                )
                            }

                            className={`
                rounded-xl
                border
                p-4
                text-left
                transition

                ${active
                                    ? "border-purple-500 bg-purple-500/10"
                                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                                }
              `}
                        >

                            <div className="flex items-center justify-between gap-2">

                                <span className="font-medium text-white">
                                    {template.name}
                                </span>


                                {template.pro && (
                                    <span className="rounded-full bg-purple-500/15 px-2 py-1 text-[10px] font-semibold text-purple-300">
                                        PRO
                                    </span>
                                )}

                            </div>


                            <p className="mt-2 text-xs leading-5 text-zinc-400">
                                {template.description}
                            </p>

                        </button>
                    );
                }
            )}

        </div>
    );
}