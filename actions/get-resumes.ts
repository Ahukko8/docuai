"use server";

import { supabaseAdmin } from "@/lib/supabase-server";
import { auth } from "@clerk/nextjs/server";


export async function getResumes() {

    const { userId } = await auth();


    if (!userId)
        return [];


    const { data, error } =

        await supabaseAdmin
            .from("resumes")
            .select("*")
            .eq(
                "user_id",
                userId
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );



    if (error) {

        throw new Error(
            error.message
        );

    }


    return data;

}