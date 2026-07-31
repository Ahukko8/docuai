"use server";


import { auth } from "@clerk/nextjs/server";

import {
    getUserResumesService
}
    from "@/services/resume.service";



export async function getResumesAction() {

    const { userId } = await auth();


    if (!userId) {

        return [];

    }


    return await getUserResumesService(
        userId
    );

}