"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import {
  createResumeService,
} from "@/services/resume.service";


export async function createBlankResumeAction() {
  const { userId } = await auth();


  if (!userId) {
    throw new Error("Unauthorized");
  }


  const resume =
    await createResumeService({
      userId,

      title: "Untitled Resume",

      template: "modern",

      name: "",

      email: "",

      phone: "",

      summary: "",

      experience: [],

      education: [],

      skills: [],
    });


  if (!resume?.id) {
    throw new Error(
      "Failed to create resume."
    );
  }


  redirect(
    `/dashboard/resumes/${resume.id}`
  );
}