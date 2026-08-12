import {
  z,
} from "zod";


export const coverLetterTemplateSchema =
  z.enum([
    "modern",
    "executive",
    "professional",
  ]);


export const coverLetterDraftSchema =
  z.object({
    title:
      z
        .string()
        .trim()
        .min(1)
        .max(160),

    template:
      coverLetterTemplateSchema,

    resumeId:
      z
        .string()
        .uuid()
        .nullable(),

    recipientName:
      z
        .string()
        .trim()
        .max(160),

    companyName:
      z
        .string()
        .trim()
        .max(200),

    jobTitle:
      z
        .string()
        .trim()
        .max(200),

    companyAddress:
      z
        .string()
        .trim()
        .max(500),

    jobDescription:
      z
        .string()
        .trim()
        .max(15000),

    letterDate:
      z
        .string()
        .trim()
        .max(10),

    opening:
      z
        .string()
        .max(3000),

    body:
      z
        .string()
        .max(7000),

    closing:
      z
        .string()
        .max(3000),

    signOff:
      z
        .string()
        .trim()
        .max(100),
  });


export const generateCoverLetterSchema =
  z.object({
    resumeId:
      z
        .string()
        .uuid(),

    recipientName:
      z
        .string()
        .trim()
        .max(160),

    companyName:
      z
        .string()
        .trim()
        .min(
          1,
          "Company name is required."
        )
        .max(200),

    jobTitle:
      z
        .string()
        .trim()
        .min(
          1,
          "Job title is required."
        )
        .max(200),

    companyAddress:
      z
        .string()
        .trim()
        .max(500),

    jobDescription:
      z
        .string()
        .trim()
        .min(
          20,
          "Paste a little more of the job description."
        )
        .max(15000),
  });


export type GenerateCoverLetterInput =
  z.infer<
    typeof generateCoverLetterSchema
  >;