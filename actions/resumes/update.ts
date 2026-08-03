"use server";

import {
  auth,
} from "@clerk/nextjs/server";

import {
  updateResumeService,
} from "@/services/resume.service";

import {
  resumeDraftSchema,
} from "@/lib/validation/resume";


export async function updateResumeAction(
  id: string,
  input: unknown
) {
  const { userId } =
    await auth();


  if (!userId) {
    throw new Error(
      "Unauthorized"
    );
  }


  if (!id) {
    throw new Error(
      "Resume ID is required."
    );
  }


  const validation =
    resumeDraftSchema.safeParse(
      input
    );


  if (!validation.success) {
    const firstIssue =
      validation.error.issues[0];


    throw new Error(
      firstIssue?.message ??
        "The resume contains invalid information."
    );
  }


  const updatedResume =
    await updateResumeService(
      id,
      userId,
      validation.data
    );


  return {
    success: true,

    updatedAt:
      updatedResume.updated_at,
  };
}