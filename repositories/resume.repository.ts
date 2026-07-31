import { adminClient } from "@/lib/supabase/admin";


export interface CreateResumeInput {

    userId: string;

    title: string;

    template: string;

    personalInfo: object;

    experience: object;

    education: object;

    skills: string[];

}



export async function createResumeRepository(
    data: CreateResumeInput
) {

    const { data: resume, error } =

        await adminClient
            .from("resumes")
            .insert({

                user_id: data.userId,

                title: data.title,

                template: data.template,

                personal_info: data.personalInfo,

                experience: data.experience,

                education: data.education,

                skills: data.skills

            })
            .select()
            .single();



    if (error) {

        throw new Error(error.message);

    }


    return resume;

}



export async function getUserResumesRepository(
    userId: string
) {


    const { data, error } =

        await adminClient
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

        throw new Error(error.message);

    }


    return data ?? [];

}