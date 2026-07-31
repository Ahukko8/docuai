"use client";


import { resumeTemplates } from "@/lib/templates";


interface Props {

    selected: string;

    onSelect: (id: string) => void;

}



export default function TemplateSelector({

    selected,

    onSelect

}: Props) {


    return (

        <div className="
grid
md:grid-cols-3
gap-4
">


            {
                resumeTemplates.map((template) => (


                    <button

                        key={template.id}

                        onClick={() =>
                            onSelect(template.id)
                        }

                        className={`

rounded-xl
border
p-5
text-left

${selected === template.id
                                ?
                                "border-purple-500 bg-purple-500/10"
                                :
                                "border-white/10 bg-white/5"
                            }

`}

                    >


                        <h3 className="
font-semibold
">

                            {template.name}

                        </h3>


                        <p className="
text-sm
text-zinc-400
mt-2
">

                            {template.description}

                        </p>



                        {
                            !template.free &&

                            <span className="
inline-block
mt-3
text-xs
text-purple-400
">

                                PRO

                            </span>

                        }



                    </button>


                ))

            }


        </div>

    )

}