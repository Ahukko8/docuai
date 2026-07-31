/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";


import { auth } from "@clerk/nextjs/server";

import {
    updateResumeService
}
    from "@/services/resume.service";


export async function updateResumeAction(
    id: string,
    data: any
) {

    const { userId } = await auth();


    if (!userId) {

        throw new Error(
            "Unauthorized"
        );

    }


    return await updateResumeService(
        id,
        userId,
        data
    );

}