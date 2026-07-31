"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";


export default function ResumeGenerator() {

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState("");



    async function generate() {

        setLoading(true);


        const res =
            await fetch("/api/ai/resume",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({

                        name: "John Doe",

                        jobTitle:
                            "Frontend Developer",

                        experience:
                            "2 years building React applications",

                        skills:
                            "React, Next.js, TypeScript"

                    })

                });


        const data = await res.json();


        setResult(data.result);

        setLoading(false);

    }



    return (

        <div className="max-w-xl mx-auto space-y-6">


            <Button
                onClick={generate}
                disabled={loading}
            >

                {
                    loading
                        ?
                        "Generating..."
                        :
                        "Generate Resume"
                }

            </Button>



            {
                result && (

                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 whitespace-pre-wrap">

                        {result}

                    </div>

                )
            }


        </div>

    )

}