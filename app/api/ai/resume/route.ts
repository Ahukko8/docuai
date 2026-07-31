import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";


export async function POST(
    request: Request
) {

    try {

        const body = await request.json();

        const {
            name,
            jobTitle,
            experience,
            skills
        } = body;



        const prompt = `
You are a professional resume writer.

Create an ATS optimized resume section.

Candidate:

Name:
${name}

Job Title:
${jobTitle}

Experience:
${experience}

Skills:
${skills}


Write:
- Professional summary
- Work experience bullet points
- Skills section

Use strong action verbs.
`;



        const response =
            await openai.chat.completions.create({

                model: "gpt-4.1-mini",

                messages: [

                    {
                        role: "system",
                        content:
                            "You help users create professional resumes."
                    },

                    {
                        role: "user",
                        content: prompt
                    }

                ],

            });


        return NextResponse.json({

            result:
                response.choices[0].message.content

        });


    }

    catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                error: "AI generation failed"
            },
            {
                status: 500
            }
        )

    }

}