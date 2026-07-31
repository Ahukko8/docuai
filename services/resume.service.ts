/* eslint-disable @typescript-eslint/no-explicit-any */
import {

    createResumeRepository,

    getUserResumesRepository

}

    from "@/repositories/resume.repository";



export async function createResumeService(
    data: any
) {

    if (!data.userId) {

        throw new Error(
            "User ID missing"
        );

    }



    return await createResumeRepository({

        userId: data.userId,

        title:
            data.title ||
            "Untitled Resume",

        template:
            data.template ||
            "modern",

        personalInfo: {

            name: data.name,

            email: data.email

        },


        experience: {

            content: data.experience

        },


        education: {

            content: data.education

        },


        skills:

            typeof data.skills === "string"

                ?

                data.skills
                    .split(",")
                    .map((s: string) => s.trim())

                :

                data.skills

    });

}




export async function getUserResumesService(
    userId: string
) {

    return await getUserResumesRepository(
        userId
    );

}