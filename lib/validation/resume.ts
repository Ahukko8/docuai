import { z } from "zod";


const resumeTemplateSchema = z.enum([
  "modern",
  "executive",
  "creative",
]);


const personalInfoSchema = z.object({
  name: z
    .string()
    .max(
      120,
      "Name cannot exceed 120 characters."
    ),

  email: z
    .string()
    .max(
      254,
      "Email cannot exceed 254 characters."
    ),

  phone: z
    .string()
    .max(
      50,
      "Phone cannot exceed 50 characters."
    ),

  location: z
    .string()
    .max(
      150,
      "Location cannot exceed 150 characters."
    ),

  linkedin: z
    .string()
    .max(
      300,
      "LinkedIn URL cannot exceed 300 characters."
    ),
});


const experienceSchema = z.object({
  id: z
    .string()
    .min(
      1,
      "Experience ID is required."
    ),

  company: z
    .string()
    .max(
      160,
      "Company cannot exceed 160 characters."
    ),

  position: z
    .string()
    .max(
      160,
      "Position cannot exceed 160 characters."
    ),

  startDate: z
    .string()
    .max(
      20,
      "Start date is invalid."
    ),

  endDate: z
    .string()
    .max(
      20,
      "End date is invalid."
    ),

  description: z
    .string()
    .max(
      5000,
      "Experience description is too long."
    ),
});


const educationSchema = z.object({
  id: z
    .string()
    .min(
      1,
      "Education ID is required."
    ),

  school: z
    .string()
    .max(
      200,
      "School cannot exceed 200 characters."
    ),

  degree: z
    .string()
    .max(
      200,
      "Degree cannot exceed 200 characters."
    ),

  startDate: z
    .string()
    .max(
      20,
      "Start date is invalid."
    ),

  endDate: z
    .string()
    .max(
      20,
      "End date is invalid."
    ),
});


export const resumeDraftSchema = z.object({
  title: z
    .string()
    .max(
      150,
      "Resume title cannot exceed 150 characters."
    ),

  template:
    resumeTemplateSchema,

  personalInfo:
    personalInfoSchema,

  summary: z
    .string()
    .max(
      5000,
      "Professional summary is too long."
    ),

  experience: z
    .array(
      experienceSchema
    )
    .max(
      30,
      "A resume cannot contain more than 30 jobs."
    ),

  education: z
    .array(
      educationSchema
    )
    .max(
      30,
      "A resume cannot contain more than 30 education records."
    ),

  skills: z
    .array(
      z
        .string()
        .min(
          1,
          "Skill cannot be empty."
        )
        .max(
          100,
          "A skill cannot exceed 100 characters."
        )
    )
    .max(
      100,
      "A resume cannot contain more than 100 skills."
    ),
});


export type ValidatedResumeDraft =
  z.infer<
    typeof resumeDraftSchema
  >;


export interface ResumeReadinessResult {
  score: number;

  issues: string[];
}


export function checkResumeReadiness(
  resume: ValidatedResumeDraft
): ResumeReadinessResult {
  const checks = [
    {
      passed:
        resume.title.trim().length >= 3,

      issue:
        "Give the resume a descriptive title.",
    },

    {
      passed:
        resume.personalInfo.name
          .trim().length >= 2,

      issue:
        "Add your full name.",
    },

    {
      passed:
        isValidEmail(
          resume.personalInfo.email
        ),

      issue:
        "Add a valid email address.",
    },

    {
      passed:
        resume.personalInfo.phone
          .trim().length > 0 ||
        resume.personalInfo.location
          .trim().length > 0,

      issue:
        "Add a phone number or location.",
    },

    {
      passed:
        resume.summary
          .trim().length >= 40,

      issue:
        "Write a professional summary of at least 40 characters.",
    },

    {
      passed:
        resume.experience.some(
          (experience) =>
            experience.company
              .trim().length > 0 &&
            experience.position
              .trim().length > 0
        ),

      issue:
        "Add at least one position and company.",
    },

    {
      passed:
        resume.experience.some(
          (experience) =>
            experience.description
              .trim().length >= 30
        ),

      issue:
        "Describe at least one work experience in more detail.",
    },

    {
      passed:
        resume.education.some(
          (education) =>
            education.school
              .trim().length > 0 ||
            education.degree
              .trim().length > 0
        ),

      issue:
        "Add your educational background.",
    },

    {
      passed:
        resume.skills.length >= 3,

      issue:
        "Add at least three relevant skills.",
    },
  ];


  const passedCount =
    checks.filter(
      (check) => check.passed
    ).length;


  const score =
    Math.round(
      (
        passedCount /
        checks.length
      ) * 100
    );


  return {
    score,

    issues: checks
      .filter(
        (check) =>
          !check.passed
      )
      .map(
        (check) =>
          check.issue
      ),
  };
}


function isValidEmail(
  value: string
) {
  return z
    .email()
    .safeParse(
      value.trim()
    )
    .success;
}