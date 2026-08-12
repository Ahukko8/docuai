"use server";

import {
  auth,
} from "@clerk/nextjs/server";

import {
  redirect,
} from "next/navigation";

import {
  revalidatePath,
} from "next/cache";

import {
  createCoverLetterService,
  deleteCoverLetterService,
  getCoverLetterService,
  listCoverLettersService,
  updateCoverLetterService,
} from "@/services/cover-letter.service";

import {
  generateCoverLetterService,
} from "@/services/cover-letter-ai.service";

import {
  getUserEntitlementsService,
} from "@/services/billing.service";

import {
  coverLetterDraftSchema,
  generateCoverLetterSchema,
} from "@/lib/validation/cover-letter";

import type {
  UpdateCoverLetterInput,
} from "@/types/cover-letter";

import type {
  GenerateCoverLetterInput,
} from "@/lib/validation/cover-letter";


export async function createBlankCoverLetterAction() {
  const {
    userId,
  } = await auth();


  if (!userId) {
    throw new Error(
      "Unauthorized"
    );
  }


  const coverLetter =
    await createCoverLetterService(
      userId
    );


  redirect(
    `/dashboard/cover-letters/${coverLetter.id}`
  );
}


export async function getCoverLettersAction() {
  const {
    userId,
  } = await auth();


  if (!userId) {
    throw new Error(
      "Unauthorized"
    );
  }


  return listCoverLettersService(
    userId
  );
}


export async function getCoverLetterAction(
  id: string
) {
  const {
    userId,
  } = await auth();


  if (!userId) {
    throw new Error(
      "Unauthorized"
    );
  }


  return getCoverLetterService(
    id,
    userId
  );
}


export async function updateCoverLetterAction(
  id: string,
  input:
    UpdateCoverLetterInput
) {
  const {
    userId,
  } = await auth();


  if (!userId) {
    throw new Error(
      "Unauthorized"
    );
  }


  const parsed =
    coverLetterDraftSchema
      .safeParse(
        input
      );


  if (!parsed.success) {
    throw new Error(
      parsed.error
        .issues[0]
        ?.message ||
        "Invalid cover letter."
    );
  }


  if (
    parsed.data.template !==
    "modern"
  ) {
    const entitlements =
      await getUserEntitlementsService(
        userId
      );


    if (
      !entitlements
        .canUsePremiumTemplates
    ) {
      throw new Error(
        "Your current plan does not include this cover letter template."
      );
    }
  }


  return updateCoverLetterService(
    id,
    userId,
    parsed.data
  );
}


export async function deleteCoverLetterAction(
  id: string
) {
  const {
    userId,
  } = await auth();


  if (!userId) {
    throw new Error(
      "Unauthorized"
    );
  }


  await deleteCoverLetterService(
    id,
    userId
  );


  revalidatePath(
    "/dashboard/cover-letters"
  );
}


export async function generateCoverLetterAction(
  input:
    GenerateCoverLetterInput
) {
  const {
    userId,
  } = await auth();


  if (!userId) {
    throw new Error(
      "Unauthorized"
    );
  }


  const parsed =
    generateCoverLetterSchema
      .safeParse(
        input
      );


  if (!parsed.success) {
    throw new Error(
      parsed.error
        .issues[0]
        ?.message ||
        "Invalid generation request."
    );
  }


  return generateCoverLetterService({
    ...parsed.data,

    userId,
  });
}