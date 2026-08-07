import type {
  ResumeTemplate,
} from "@/types/resume";


export type ResumeHeaderStyle =
  | "solid"
  | "editorial"
  | "accent";


export type ResumeSectionStyle =
  | "line"
  | "classic"
  | "label";


export type ResumeSkillsStyle =
  | "pills"
  | "inline";


export interface ResumeTemplateTheme {
  name: string;

  description: string;

  recommendedFor: string;

  headerStyle:
    ResumeHeaderStyle;

  sectionStyle:
    ResumeSectionStyle;

  skillsStyle:
    ResumeSkillsStyle;

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
      "Clean, technical and highly readable.",

    recommendedFor:
      "Technology, consulting, operations and general professional roles.",

    headerStyle:
      "solid",

    sectionStyle:
      "line",

    skillsStyle:
      "pills",

    colors: {
      paper:
        "#ffffff",

      ink:
        "#172033",

      muted:
        "#5f6b7a",

      accent:
        "#2563eb",

      accentSoft:
        "#eff6ff",

      line:
        "#dbe3ef",

      header:
        "#101827",

      headerText:
        "#ffffff",
    },

    browserFontFamily:
      "Arial, Helvetica, sans-serif",

    pdfBodyFont:
      "Helvetica",

    pdfHeadingFont:
      "Helvetica-Bold",

    leftAccentWidth:
      0,
  },


  executive: {
    name:
      "Executive",

    description:
      "Elegant and authoritative with restrained styling.",

    recommendedFor:
      "Leadership, finance, management, law and senior professional roles.",

    headerStyle:
      "editorial",

    sectionStyle:
      "classic",

    skillsStyle:
      "inline",

    colors: {
      paper:
        "#fffefb",

      ink:
        "#211f1c",

      muted:
        "#6f6960",

      accent:
        "#9a6635",

      accentSoft:
        "#f8f2ea",

      line:
        "#cfc6b9",

      header:
        "#fffefb",

      headerText:
        "#211f1c",
    },

    browserFontFamily:
      "Georgia, 'Times New Roman', serif",

    pdfBodyFont:
      "Times-Roman",

    pdfHeadingFont:
      "Times-Bold",

    leftAccentWidth:
      0,
  },


  creative: {
    name:
      "Creative",

    description:
      "Distinctive and contemporary while remaining ATS-conscious.",

    recommendedFor:
      "Marketing, product, design, media and creative technology roles.",

    headerStyle:
      "accent",

    sectionStyle:
      "label",

    skillsStyle:
      "pills",

    colors: {
      paper:
        "#ffffff",

      ink:
        "#252236",

      muted:
        "#6f6980",

      accent:
        "#7c3aed",

      accentSoft:
        "#f3efff",

      line:
        "#ded7ef",

      header:
        "#f7f4ff",

      headerText:
        "#2f2254",
    },

    browserFontFamily:
      "Arial, Helvetica, sans-serif",

    pdfBodyFont:
      "Helvetica",

    pdfHeadingFont:
      "Helvetica-Bold",

    leftAccentWidth:
      10,
  },
};


export function getResumeTemplateTheme(
  template: ResumeTemplate
): ResumeTemplateTheme {
  return (
    RESUME_TEMPLATE_THEMES[
      template
    ] ??
    RESUME_TEMPLATE_THEMES.modern
  );
}