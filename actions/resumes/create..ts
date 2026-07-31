/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { auth } from "@clerk/nextjs/server";

import {
    createResumeService
}
    from "@/services/resume.service";



export async function createResumeAction(
    data: any
) {

    const { userId } = await auth();



    if (!userId) {

        throw new Error(
            "Unauthorized"
        );

    }



    return await createResumeService({

        ...data,

        userId

    });

}