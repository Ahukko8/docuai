/* eslint-disable @typescript-eslint/no-explicit-any */
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

export async function getResumeByIdRepository(
    id: string,
    userId: string
) {

    const { data, error } =

        await adminClient
            .from("resumes")
            .select("*")
            .eq("id", id)
            .eq("user_id", userId)
            .single();



    if (error) {

        throw new Error(error.message);

    }


    return data;

}





export async function updateResumeRepository(
    id: string,
    userId: string,
    data: any
) {

    const { data: resume, error } =

        await adminClient
            .from("resumes")
            .update({

                title: data.title,

                template: data.template,

                personal_info: data.personalInfo,

                experience: data.experience,

                education: data.education,

                skills: data.skills,

                updated_at: new Date()

            })
            .eq("id", id)
            .eq("user_id", userId)
            .select()
            .single();



    if (error) {

        throw new Error(error.message);

    }


    return resume;

}





export async function deleteResumeRepository(
    id: string,
    userId: string
) {

    const { error } =

        await adminClient
            .from("resumes")
            .delete()
            .eq("id", id)
            .eq("user_id", userId);



    if (error) {

        throw new Error(error.message);

    }


    return true;

}