import { adminClient } from "@/lib/supabase/admin";

import type {
  PersonalInfo,
  ResumeEducation,
  ResumeExperience,
  ResumeTemplate,
  UpdateResumeInput,
} from "@/types/resume";


export interface CreateResumeRepositoryInput {
  userId: string;

  title: string;

  template: ResumeTemplate;

  personalInfo: PersonalInfo;

  summary: string;

  experience: ResumeExperience[];

  education: ResumeEducation[];

  skills: string[];
}


export async function createResumeRepository(
  input: CreateResumeRepositoryInput
) {
  const { data, error } = await adminClient
    .from("resumes")
    .insert({
      user_id: input.userId,

      title: input.title,

      template: input.template,

      personal_info: input.personalInfo,

      summary: input.summary,

      experience: input.experience,

      education: input.education,

      skills: input.skills,
    })
    .select()
    .single();


  if (error) {
    console.error(
      "createResumeRepository:",
      error
    );

    throw new Error(error.message);
  }


  return data;
}


export async function getUserResumesRepository(
  userId: string
) {
  const { data, error } = await adminClient
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", {
      ascending: false,
    });


  if (error) {
    console.error(
      "getUserResumesRepository:",
      error
    );

    throw new Error(error.message);
  }


  return data ?? [];
}


export async function getResumeByIdRepository(
  id: string,
  userId: string
) {
  const { data, error } = await adminClient
    .from("resumes")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();


  if (error) {
    console.error(
      "getResumeByIdRepository:",
      error
    );

    throw new Error(error.message);
  }


  return data;
}


export async function updateResumeRepository(
  id: string,
  userId: string,
  input: UpdateResumeInput
) {
  const { data, error } = await adminClient
    .from("resumes")
    .update({
      title: input.title,

      template: input.template,

      personal_info: input.personalInfo,

      summary: input.summary,

      experience: input.experience,

      education: input.education,

      skills: input.skills,

      updated_at:
        new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();


  if (error) {
    console.error(
      "updateResumeRepository:",
      error
    );

    throw new Error(error.message);
  }


  return data;
}


export async function deleteResumeRepository(
  id: string,
  userId: string
) {
  const { error } = await adminClient
    .from("resumes")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);


  if (error) {
    console.error(
      "deleteResumeRepository:",
      error
    );

    throw new Error(error.message);
  }


  return true;
}