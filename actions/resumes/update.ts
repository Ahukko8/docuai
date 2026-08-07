"use server";

import {
  auth,
} from "@clerk/nextjs/server";

import {
  resumeDraftSchema,
} from "@/lib/validation/resume";

import {
  assertTemplateAccessService,
} from "@/services/billing.service";

import {
  updateResumeService,
} from "@/services/resume.service";


export async function updateResumeAction(
  id: string,
  input: unknown
) {
  const {
    userId,
  } = await auth();


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
    throw new Error(
      validation.error
        .issues[0]
        ?.message ??
        "Invalid resume information."
    );
  }


  await assertTemplateAccessService(
    userId,
    validation.data.template
  );


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