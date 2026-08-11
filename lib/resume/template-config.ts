import type {
  ResumeTemplate,
} from "@/types/resume";


export type ResumeHeaderStyle =
  | "dark"
  | "editorial"
  | "accent-rail";


export type ResumeSectionStyle =
  | "accent-underline"
  | "editorial-rule"
  | "creative";


export type ResumeSkillsStyle =
  | "inline"
  | "editorial"
  | "soft-blocks";


export interface ResumeTemplateTheme {
  name: string;

  description: string;

  recommendedFor: string;

  badge: string;

  headerStyle:
    ResumeHeaderStyle;

  sectionStyle:
    ResumeSectionStyle;

  skillsStyle:
    ResumeSkillsStyle;

  labels: {
    summary: string;
    experience: string;
    education: string;
    skills: string;
  };

  colors: {
    paper: string;
    ink: string;
    muted: string;
    accent: string;
    accentSoft: string;
    line: string;
    header: string;
    headerText: string;
  };

  browserFontFamily: string;

  browserHeadingFontFamily: string;

  pdfBodyFont: string;

  pdfHeadingFont: string;

  leftAccentWidth: number;
}


export const RESUME_TEMPLATE_THEMES:
  Record<
    ResumeTemplate,
    ResumeTemplateTheme
  > = {
  modern: {
    name:
      "Modern",

    description:
      "Bold, clean and versatile with a polished contemporary feel.",

    recommendedFor:
      "Technology, graduates and general professionals",

    badge:
      "Popular",

    headerStyle:
      "dark",

    sectionStyle:
      "accent-underline",

    skillsStyle:
      "inline",

    labels: {
      summary:
        "Profile",

      experience:
        "Experience",

      education:
        "Education",

      skills:
        "Skills",
    },

    colors: {
      paper:
        "#FFFFFF",

      ink:
        "#18181B",

      muted:
        "#64748B",

      accent:
        "#6366F1",

      accentSoft:
        "#EEF2FF",

      line:
        "#E5E7EB",

      header:
        "#111827",

      headerText:
        "#FFFFFF",
    },

    browserFontFamily:
      'Inter, Arial, Helvetica, sans-serif',

    browserHeadingFontFamily:
      'Inter, Arial, Helvetica, sans-serif',

    pdfBodyFont:
      "Helvetica",

    pdfHeadingFont:
      "Helvetica",

    leftAccentWidth:
      0,
  },


  executive: {
    name:
      "Executive",

    description:
      "Refined editorial styling designed for leadership and senior roles.",

    recommendedFor:
      "Leadership, finance, consulting and management",

    badge:
      "Pro",

    headerStyle:
      "editorial",

    sectionStyle:
      "editorial-rule",

    skillsStyle:
      "editorial",

    labels: {
      summary:
        "Executive Profile",

      experience:
        "Professional Experience",

      education:
        "Education",

      skills:
        "Core Expertise",
    },

    colors: {
      paper:
        "#FFFEFC",

      ink:
        "#1C1917",

      muted:
        "#78716C",

      accent:
        "#9A6A38",

      accentSoft:
        "#FAF6F1",

      line:
        "#D6D3D1",

      header:
        "#FFFEFC",

      headerText:
        "#1C1917",
    },

    browserFontFamily:
      'Arial, Helvetica, sans-serif',

    browserHeadingFontFamily:
      'Georgia, "Times New Roman", serif',

    pdfBodyFont:
      "Helvetica",

    pdfHeadingFont:
      "Times-Roman",

    leftAccentWidth:
      0,
  },


  creative: {
    name:
      "Creative",

    description:
      "Distinctive, energetic and expressive while remaining professional.",

    recommendedFor:
      "Design, marketing, media and product roles",

    badge:
      "Pro",

    headerStyle:
      "accent-rail",

    sectionStyle:
      "creative",

    skillsStyle:
      "soft-blocks",

    labels: {
      summary:
        "About",

      experience:
        "Experience",

      education:
        "Education",

      skills:
        "Skills",
    },

    colors: {
      paper:
        "#FFFFFF",

      ink:
        "#18181B",

      muted:
        "#71717A",

      accent:
        "#7C3AED",

      accentSoft:
        "#F5F3FF",

      line:
        "#E4E4E7",

      header:
        "#FFFFFF",

      headerText:
        "#18181B",
    },

    browserFontFamily:
      'Inter, Arial, Helvetica, sans-serif',

    browserHeadingFontFamily:
      'Inter, Arial, Helvetica, sans-serif',

    pdfBodyFont:
      "Helvetica",

    pdfHeadingFont:
      "Helvetica-Bold",

    leftAccentWidth:
      14,
  },
};


/*
 * Compatibility aliases.
 *
 * These make the new config easier to use
 * with code from previous milestones.
 */

export const resumeTemplateThemes =
  RESUME_TEMPLATE_THEMES;


export const RESUME_TEMPLATES =
  RESUME_TEMPLATE_THEMES;


export function getResumeTemplateTheme(
  template: ResumeTemplate
) {
  return (
    RESUME_TEMPLATE_THEMES[
      template
    ] ??
    RESUME_TEMPLATE_THEMES
      .modern
  );
}