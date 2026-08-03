"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import {
  deleteResumeService,
} from "@/services/resume.service";


export async function deleteResumeAction(
  id: string
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!id) {
    throw new Error(
      "Resume ID is required."
    );
  }


  await deleteResumeService(
    id,
    userId
  );


  revalidatePath(
    "/dashboard/resumes"
  );


  return {
    success: true,
  };
}