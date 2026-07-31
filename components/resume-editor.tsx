"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import TemplateSelector from "./template-selector";
import { createResume } from "@/actions/resume";


export default function ResumeEditor() {

    const [saving, setSaving] = useState(false);


    const [resume, setResume] = useState({
        template: "modern",
        name: "",
        email: "",
        phone: "",
        summary: "",
        experience: "",
        education: "",
        skills: ""

    });

    const [template, setTemplate] = useState("modern");



    function updateField(
        field: string,
        value: string
    ) {

        setResume({

            ...resume,

            [field]: value

        });

    }



    async function saveResume() {

        try {

            setSaving(true);


            const result =
                await createResume({

                    title:
                        resume.name
                            ?
                            `${resume.name}'s Resume`
                            :
                            "New Resume",


                    template,


                    name:
                        resume.name,


                    email:
                        resume.email,


                    experience:
                        resume.experience,


                    education:
                        resume.education,


                    skills:
                        resume.skills

                });


            console.log(
                "Saved:",
                result
            );


            alert(
                "Resume saved successfully!"
            );


        }

        catch (error) {

            console.error(error);

            alert(
                "Failed to save resume"
            );


        }

        finally {

            setSaving(false);

        }

    }



    return (

        <div className="
grid
lg:grid-cols-2
gap-8
">


            {/* FORM */}

            <div className="
space-y-5
">


                <h2 className="
text-2xl
font-bold
">

                    Resume Information

                </h2>

                <div className="mb-8">

                    <h2 className="
text-2xl
font-bold
mb-4
">
                        Choose Template
                    </h2>


                    <TemplateSelector

                        selected={template}

                        onSelect={setTemplate}

                    />

                </div>


                <input

                    placeholder="Full Name"

                    className="
w-full
rounded-lg
border
border-white/10
bg-white/5
p-3
"

                    onChange={(e) =>
                        updateField(
                            "name",
                            e.target.value
                        )
                    }

                />



                <input

                    placeholder="Email"

                    className="
w-full
rounded-lg
border
border-white/10
bg-white/5
p-3
"

                    onChange={(e) =>
                        updateField(
                            "email",
                            e.target.value
                        )
                    }

                />



                <textarea

                    placeholder="Professional Summary"

                    className="
w-full
rounded-lg
border
border-white/10
bg-white/5
p-3
h-32
"

                    onChange={(e) =>
                        updateField(
                            "summary",
                            e.target.value
                        )
                    }

                />




                <textarea

                    placeholder="Work Experience"

                    className="
w-full
rounded-lg
border
border-white/10
bg-white/5
p-3
h-40
"

                    onChange={(e) =>
                        updateField(
                            "experience",
                            e.target.value
                        )
                    }

                />




                <textarea

                    placeholder="Education"

                    className="
w-full
rounded-lg
border
border-white/10
bg-white/5
p-3
h-32
"

                    onChange={(e) =>
                        updateField(
                            "education",
                            e.target.value
                        )
                    }

                />




                <input

                    placeholder="Skills (React, Python, Marketing...)"

                    className="
w-full
rounded-lg
border
border-white/10
bg-white/5
p-3
"

                    onChange={(e) =>
                        updateField(
                            "skills",
                            e.target.value
                        )
                    }

                />



                <Button

                    onClick={saveResume}

                    className="
bg-purple-600
"

                >

                    {
                        saving
                            ?
                            "Saving..."
                            :
                            "Save Resume"
                    }

                </Button>


            </div>





            {/* PREVIEW */}

            <div>

                <h2 className="
text-2xl
font-bold
mb-5
">

                    Live Preview

                </h2>



                <div className="
rounded-xl
bg-white
text-black
p-8
min-h-[600px]
">


                    <h1 className="
text-3xl
font-bold
">

                        {resume.name || "Your Name"}

                    </h1>



                    <p>
                        {resume.email}
                    </p>



                    <hr className="
my-5
"/>



                    <h3 className="font-bold">
                        Summary
                    </h3>


                    <p>

                        {resume.summary ||

                            "Your professional summary will appear here."

                        }

                    </p>




                    <h3 className="
font-bold
mt-6
">

                        Experience

                    </h3>


                    <p className="whitespace-pre-line">

                        {resume.experience}

                    </p>



                    <h3 className="
font-bold
mt-6
">

                        Education

                    </h3>


                    <p>

                        {resume.education}

                    </p>




                    <h3 className="
font-bold
mt-6
">

                        Skills

                    </h3>


                    <p>

                        {resume.skills}

                    </p>



                </div>


            </div>



        </div>

    )

}