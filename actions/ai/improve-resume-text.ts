"use server";

import {
  auth,
} from "@clerk/nextjs/server";

import {
  improveResumeTextSchema,
} from "@/lib/validation/resume-ai";

import {
  improveResumeTextService,
} from "@/services/resume-ai.service";


export async function improveResumeTextAction(
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


  const validation =
    improveResumeTextSchema.safeParse(
      input
    );


  if (!validation.success) {
    throw new Error(
      validation.error
        .issues[0]
        ?.message ??
        "Invalid AI request."
    );
  }


  return improveResumeTextService({
    ...validation.data,

    userId,
  });
}