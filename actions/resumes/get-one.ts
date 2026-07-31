"use server";


import { auth } from "@clerk/nextjs/server";

import {
    getResumeService
}
    from "@/services/resume.service";


export async function getResumeAction(
    id: string
) {

    const { userId } = await auth();


    if (!userId) {

        throw new Error(
            "Unauthorized"
        );

    }


    return await getResumeService(
        id,
        userId
    );

}