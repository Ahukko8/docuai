import "server-only";

import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import type {
  ResumeEditorData,
  ResumeTemplate,
} from "@/types/resume";


interface ResumePdfDocumentProps {
  resume: ResumeEditorData;
}


interface PdfTheme {
  accent: string;

  background: string;

  bodyText: string;

  mutedText: string;

  lineColor: string;

  headerBackground: string;

  headerText: string;

  bodyFont: string;

  headingFont: string;

  pageLeftBorderWidth: number;

  pageLeftBorderColor: string;

  useSkillPills: boolean;
}


const themes: Record<
  ResumeTemplate,
  PdfTheme
> = {
  modern: {
    accent: "#7c3aed",

    background: "#ffffff",

    bodyText: "#27272a",

    mutedText: "#71717a",

    lineColor: "#d4d4d8",

    headerBackground: "#18181b",

    headerText: "#ffffff",

    bodyFont: "Helvetica",

    headingFont: "Helvetica",

    pageLeftBorderWidth: 0,

    pageLeftBorderColor:
      "transparent",

    useSkillPills: true,
  },

  executive: {
    accent: "#92400e",

    background: "#fffdf8",

    bodyText: "#292524",

    mutedText: "#78716c",

    lineColor: "#d6d3d1",

    headerBackground:
      "#fffdf8",

    headerText: "#1c1917",

    bodyFont: "Times-Roman",

    headingFont: "Times-Roman",

    pageLeftBorderWidth: 0,

    pageLeftBorderColor:
      "transparent",

    useSkillPills: false,
  },

  creative: {
    accent: "#db2777",

    background: "#fffafd",

    bodyText: "#27272a",

    mutedText: "#71717a",

    lineColor: "#f0abcf",

    headerBackground:
      "#fdf2f8",

    headerText: "#831843",

    bodyFont: "Helvetica",

    headingFont: "Helvetica",

    pageLeftBorderWidth: 12,

    pageLeftBorderColor:
      "#db2777",

    useSkillPills: true,
  },
};


export default function ResumePdfDocument({
  resume,
}: ResumePdfDocumentProps) {
  const theme =
    themes[resume.template] ??
    themes.modern;


  const styles =
    createPdfStyles(theme);


  const contactItems = [
    resume.personalInfo.email,

    resume.personalInfo.phone,

    resume.personalInfo.location,

    resume.personalInfo.linkedin,
  ].filter(
    (item): item is string =>
      Boolean(item?.trim())
  );


  const experiences =
    resume.experience.filter(
      (experience) =>
        Boolean(
          experience.company.trim() ||
            experience.position.trim() ||
            experience.description.trim()
        )
    );


  const education =
    resume.education.filter(
      (item) =>
        Boolean(
          item.school.trim() ||
            item.degree.trim()
        )
    );


  const skills =
    resume.skills
      .map((skill) => skill.trim())
      .filter(Boolean);


  return (
    <Document
      title={
        resume.title ||
        "Professional Resume"
      }

      author={
        resume.personalInfo.name ||
        "Resume User"
      }

      subject="Professional resume"

      keywords="resume, curriculum vitae, career"
    >
      <Page
        size="A4"

        wrap

        style={styles.page}
      >
        <View style={styles.header}>
          <Text style={styles.name}>
            {resume.personalInfo.name ||
              "Your Name"}
          </Text>


          {contactItems.length >
            0 && (
            <Text
              style={
                styles.contactLine
              }
            >
              {contactItems.join(
                "  |  "
              )}
            </Text>
          )}
        </View>


        {resume.summary.trim() && (
          <PdfSection
            title="Professional Profile"
            styles={styles}
          >
            <Text
              style={
                styles.bodyParagraph
              }
            >
              {resume.summary.trim()}
            </Text>
          </PdfSection>
        )}


        {experiences.length > 0 && (
          <PdfSection
            title="Professional Experience"
            styles={styles}
          >
            {experiences.map(
              (experience) => (
                <View
                  key={experience.id}

                  wrap={false}

                  style={
                    styles.entry
                  }
                >
                  <View
                    style={
                      styles.entryHeader
                    }
                  >
                    <View
                      style={
                        styles.entryTitleGroup
                      }
                    >
                      <Text
                        style={
                          styles.entryTitle
                        }
                      >
                        {experience.position ||
                          "Position"}
                      </Text>


                      {experience.company && (
                        <Text
                          style={
                            styles.entrySubtitle
                          }
                        >
                          {
                            experience.company
                          }
                        </Text>
                      )}
                    </View>


                    <Text
                      style={
                        styles.entryDate
                      }
                    >
                      {formatDateRange(
                        experience.startDate,
                        experience.endDate
                      )}
                    </Text>
                  </View>


                  {getDescriptionLines(
                    experience.description
                  ).map(
                    (
                      description,
                      index
                    ) => (
                      <View
                        key={`${experience.id}-${index}`}

                        style={
                          styles.bulletRow
                        }
                      >
                        <Text
                          style={
                            styles.bullet
                          }
                        >
                          •
                        </Text>

                        <Text
                          style={
                            styles.bulletText
                          }
                        >
                          {description}
                        </Text>
                      </View>
                    )
                  )}
                </View>
              )
            )}
          </PdfSection>
        )}


        {education.length > 0 && (
          <PdfSection
            title="Education"
            styles={styles}
          >
            {education.map(
              (item) => (
                <View
                  key={item.id}

                  wrap={false}

                  style={
                    styles.entry
                  }
                >
                  <View
                    style={
                      styles.entryHeader
                    }
                  >
                    <View
                      style={
                        styles.entryTitleGroup
                      }
                    >
                      <Text
                        style={
                          styles.entryTitle
                        }
                      >
                        {item.degree ||
                          "Qualification"}
                      </Text>


                      {item.school && (
                        <Text
                          style={
                            styles.entrySubtitle
                          }
                        >
                          {item.school}
                        </Text>
                      )}
                    </View>


                    <Text
                      style={
                        styles.entryDate
                      }
                    >
                      {formatDateRange(
                        item.startDate,
                        item.endDate
                      )}
                    </Text>
                  </View>
                </View>
              )
            )}
          </PdfSection>
        )}


        {skills.length > 0 && (
          <PdfSection
            title="Skills"
            styles={styles}
          >
            {theme.useSkillPills ? (
              <View
                style={
                  styles.skillsContainer
                }
              >
                {skills.map(
                  (
                    skill,
                    index
                  ) => (
                    <Text
                      key={`${skill}-${index}`}

                      style={
                        styles.skillPill
                      }
                    >
                      {skill}
                    </Text>
                  )
                )}
              </View>
            ) : (
              <Text
                style={
                  styles.bodyParagraph
                }
              >
                {skills.join("  •  ")}
              </Text>
            )}
          </PdfSection>
        )}
      </Page>
    </Document>
  );
}


interface PdfSectionProps {
  title: string;

  children:
    React.ReactNode;

  styles:
    ReturnType<
      typeof createPdfStyles
    >;
}


function PdfSection({
  title,
  children,
  styles,
}: PdfSectionProps) {
  return (
    <View style={styles.section}>
      <Text
        style={
          styles.sectionTitle
        }
      >
        {title}
      </Text>

      {children}
    </View>
  );
}


function createPdfStyles(
  theme: PdfTheme
) {
  return StyleSheet.create({
    page: {
      backgroundColor:
        theme.background,

      color:
        theme.bodyText,

      fontFamily:
        theme.bodyFont,

      fontSize: 10,

      lineHeight: 1.45,

      paddingTop: 34,

      paddingRight: 38,

      paddingBottom: 38,

      paddingLeft:
        theme.pageLeftBorderWidth >
        0
          ? 42
          : 38,

      borderLeftWidth:
        theme.pageLeftBorderWidth,

      borderLeftColor:
        theme.pageLeftBorderColor,
    },


    header: {
      backgroundColor:
        theme.headerBackground,

      color:
        theme.headerText,

      paddingTop: 20,

      paddingRight: 22,

      paddingBottom: 20,

      paddingLeft: 22,

      marginBottom: 22,

      borderBottomWidth:
        theme.headerBackground ===
        theme.background
          ? 2
          : 0,

      borderBottomColor:
        theme.accent,
    },


    name: {
      fontFamily:
        theme.headingFont,

      fontSize: 25,

      fontWeight: "bold",

      letterSpacing: 0.3,

      marginBottom: 7,
    },


    contactLine: {
      fontSize: 8.5,

      color:
        theme.headerBackground ===
        theme.background
          ? theme.mutedText
          : theme.headerText,

      lineHeight: 1.4,
    },


    section: {
      marginBottom: 19,
    },


    sectionTitle: {
      fontFamily:
        theme.headingFont,

      color:
        theme.accent,

      fontSize: 10.5,

      fontWeight: "bold",

      textTransform:
        "uppercase",

      letterSpacing: 1.1,

      borderBottomWidth: 1,

      borderBottomColor:
        theme.lineColor,

      paddingBottom: 5,

      marginBottom: 10,
    },


    bodyParagraph: {
      color:
        theme.bodyText,

      fontSize: 9.5,

      lineHeight: 1.55,
    },


    entry: {
      marginBottom: 13,
    },


    entryHeader: {
      flexDirection: "row",

      justifyContent:
        "space-between",

      alignItems:
        "flex-start",

      marginBottom: 5,
    },


    entryTitleGroup: {
      flexGrow: 1,

      flexShrink: 1,

      paddingRight: 12,
    },


    entryTitle: {
      fontFamily:
        theme.headingFont,

      fontSize: 10,

      fontWeight: "bold",

      color:
        theme.bodyText,
    },


    entrySubtitle: {
      fontSize: 9,

      color:
        theme.mutedText,

      marginTop: 2,
    },


    entryDate: {
      fontSize: 8,

      color:
        theme.mutedText,

      textAlign: "right",

      maxWidth: 120,
    },


    bulletRow: {
      flexDirection: "row",

      alignItems: "flex-start",

      marginBottom: 3,

      paddingRight: 5,
    },


    bullet: {
      width: 12,

      color:
        theme.accent,

      fontSize: 9,
    },


    bulletText: {
      flexGrow: 1,

      flexShrink: 1,

      color:
        theme.bodyText,

      fontSize: 9,

      lineHeight: 1.5,
    },


    skillsContainer: {
      flexDirection: "row",

      flexWrap: "wrap",
    },


    skillPill: {
      backgroundColor:
        `${theme.accent}15`,

      color:
        theme.accent,

      borderWidth: 1,

      borderColor:
        `${theme.accent}40`,

      borderRadius: 4,

      fontSize: 8,

      paddingTop: 4,

      paddingRight: 7,

      paddingBottom: 4,

      paddingLeft: 7,

      marginRight: 5,

      marginBottom: 5,
    },
  });
}


function getDescriptionLines(
  description: string
) {
  const trimmed =
    description.trim();


  if (!trimmed) {
    return [];
  }


  return trimmed
    .split(/\r?\n/)
    .map((line) =>
      line
        .replace(
          /^[•\-–—*]\s*/,
          ""
        )
        .trim()
    )
    .filter(Boolean);
}


function formatDateRange(
  startDate: string,
  endDate: string
) {
  const formattedStart =
    formatMonth(startDate);


  const formattedEnd =
    endDate
      ? formatMonth(endDate)
      : formattedStart
        ? "Present"
        : "";


  return [
    formattedStart,
    formattedEnd,
  ]
    .filter(Boolean)
    .join(" — ");
}


function formatMonth(
  value: string
) {
  if (!value) {
    return "";
  }


  const match =
    /^(\d{4})-(\d{2})$/.exec(
      value
    );


  if (!match) {
    return value;
  }


  const year = match[1];

  const monthNumber =
    Number(match[2]);


  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];


  const month =
    months[
      monthNumber - 1
    ];


  if (!month) {
    return value;
  }


  return `${month} ${year}`;
}