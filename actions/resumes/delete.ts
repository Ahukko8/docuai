"use server";


import { auth } from "@clerk/nextjs/server";

import {
    deleteResumeService
}
    from "@/services/resume.service";


export async function deleteResumeAction(
    id: string
) {

    const { userId } = await auth();


    if (!userId) {

        throw new Error(
            "Unauthorized"
        );

    }


    return await deleteResumeService(
        id,
        userId
    );

}