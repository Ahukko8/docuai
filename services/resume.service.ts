import {
  createResumeRepository,
  deleteResumeRepository,
  getResumeByIdRepository,
  getUserResumesRepository,
  updateResumeRepository,
} from "@/repositories/resume.repository";

import type {
  PersonalInfo,
  ResumeEducation,
  ResumeEditorData,
  ResumeExperience,
  ResumeTemplate,
  UpdateResumeInput,
} from "@/types/resume";


function normalizeTemplate(
  value: unknown
): ResumeTemplate {
  if (
    value === "modern" ||
    value === "executive" ||
    value === "creative"
  ) {
    return value;
  }

  return "modern";
}


function normalizePersonalInfo(
  value: unknown
): PersonalInfo {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
    };
  }


  const info =
    value as Record<string, unknown>;


  return {
    name:
      typeof info.name === "string"
        ? info.name
        : "",

    email:
      typeof info.email === "string"
        ? info.email
        : "",

    phone:
      typeof info.phone === "string"
        ? info.phone
        : "",

    location:
      typeof info.location === "string"
        ? info.location
        : "",

    linkedin:
      typeof info.linkedin === "string"
        ? info.linkedin
        : "",
  };
}


function normalizeExperience(
  value: unknown
): ResumeExperience[] {
  // New format
  if (Array.isArray(value)) {
    return value.map(
      (item, index) => {
        const exp =
          typeof item === "object" &&
          item !== null
            ? (
                item as Record<
                  string,
                  unknown
                >
              )
            : {};


        return {
          id:
            typeof exp.id === "string"
              ? exp.id
              : `experience-${index}`,

          company:
            typeof exp.company ===
            "string"
              ? exp.company
              : "",

          position:
            typeof exp.position ===
            "string"
              ? exp.position
              : "",

          startDate:
            typeof exp.startDate ===
            "string"
              ? exp.startDate
              : "",

          endDate:
            typeof exp.endDate ===
            "string"
              ? exp.endDate
              : "",

          description:
            typeof exp.description ===
            "string"
              ? exp.description
              : "",
        };
      }
    );
  }


  // Old format:
  // { content: "Worked at..." }
  if (
    typeof value === "object" &&
    value !== null
  ) {
    const old =
      value as Record<string, unknown>;


    if (
      typeof old.content === "string" &&
      old.content.trim()
    ) {
      return [
        {
          id: "legacy-experience-0",

          company: "",

          position: "",

          startDate: "",

          endDate: "",

          description:
            old.content,
        },
      ];
    }
  }


  // Very old/simple string format
  if (
    typeof value === "string" &&
    value.trim()
  ) {
    return [
      {
        id: "legacy-experience-0",

        company: "",

        position: "",

        startDate: "",

        endDate: "",

        description: value,
      },
    ];
  }


  return [];
}


function normalizeEducation(
  value: unknown
): ResumeEducation[] {
  if (Array.isArray(value)) {
    return value.map(
      (item, index) => {
        const education =
          typeof item === "object" &&
          item !== null
            ? (
                item as Record<
                  string,
                  unknown
                >
              )
            : {};


        return {
          id:
            typeof education.id ===
            "string"
              ? education.id
              : `education-${index}`,

          school:
            typeof education.school ===
            "string"
              ? education.school
              : "",

          degree:
            typeof education.degree ===
            "string"
              ? education.degree
              : "",

          startDate:
            typeof education.startDate ===
            "string"
              ? education.startDate
              : "",

          endDate:
            typeof education.endDate ===
            "string"
              ? education.endDate
              : "",
        };
      }
    );
  }


  if (
    typeof value === "object" &&
    value !== null
  ) {
    const old =
      value as Record<string, unknown>;


    if (
      typeof old.content === "string" &&
      old.content.trim()
    ) {
      return [
        {
          id: "legacy-education-0",

          school: old.content,

          degree: "",

          startDate: "",

          endDate: "",
        },
      ];
    }
  }


  if (
    typeof value === "string" &&
    value.trim()
  ) {
    return [
      {
        id: "legacy-education-0",

        school: value,

        degree: "",

        startDate: "",

        endDate: "",
      },
    ];
  }


  return [];
}


function normalizeSkills(
  value: unknown
): string[] {
  if (Array.isArray(value)) {
    return value
      .filter(
        (skill): skill is string =>
          typeof skill === "string"
      )
      .map((skill) => skill.trim())
      .filter(Boolean);
  }


  if (typeof value === "string") {
    return value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }


  if (
    typeof value === "object" &&
    value !== null
  ) {
    const old =
      value as Record<string, unknown>;


    if (
      typeof old.content === "string"
    ) {
      return old.content
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }
  }


  return [];
}


export function mapResumeRowToEditor(
  row: Record<string, unknown>
): ResumeEditorData {
  return {
    id: String(row.id ?? ""),

    title:
      typeof row.title === "string"
        ? row.title
        : "Untitled Resume",

    template:
      normalizeTemplate(
        row.template
      ),

    personalInfo:
      normalizePersonalInfo(
        row.personal_info
      ),

    summary:
      typeof row.summary === "string"
        ? row.summary
        : "",

    experience:
      normalizeExperience(
        row.experience
      ),

    education:
      normalizeEducation(
        row.education
      ),

    skills:
      normalizeSkills(
        row.skills
      ),
  };
}


interface LegacyCreateInput {
  userId: string;

  title?: string;

  template?: unknown;

  name?: string;

  email?: string;

  phone?: string;

  summary?: string;

  experience?: unknown;

  education?: unknown;

  skills?: unknown;
}


export async function createResumeService(
  input: LegacyCreateInput
) {
  if (!input.userId) {
    throw new Error(
      "User ID is required."
    );
  }


  return createResumeRepository({
    userId: input.userId,

    title:
      input.title?.trim() ||
      "Untitled Resume",

    template:
      normalizeTemplate(
        input.template
      ),

    personalInfo: {
      name: input.name ?? "",

      email: input.email ?? "",

      phone: input.phone ?? "",

      location: "",

      linkedin: "",
    },

    summary:
      input.summary ?? "",

    experience:
      normalizeExperience(
        input.experience
      ),

    education:
      normalizeEducation(
        input.education
      ),

    skills:
      normalizeSkills(
        input.skills
      ),
  });
}


export async function getUserResumesService(
  userId: string
) {
  return getUserResumesRepository(
    userId
  );
}


export async function getResumeService(
  id: string,
  userId: string
): Promise<ResumeEditorData | null> {
  const row =
    await getResumeByIdRepository(
      id,
      userId
    );


  if (!row) {
    return null;
  }


  return mapResumeRowToEditor(
    row
  );
}


export async function updateResumeService(
  id: string,
  userId: string,
  input: UpdateResumeInput
) {
  return updateResumeRepository(
    id,
    userId,
    input
  );
}


export async function deleteResumeService(
  id: string,
  userId: string
) {
  return deleteResumeRepository(
    id,
    userId
  );
}