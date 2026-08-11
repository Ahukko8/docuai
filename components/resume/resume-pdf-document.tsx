import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import type {
  ResumeEditorData,
  ResumeEducation,
  ResumeExperience,
} from "@/types/resume";

import {
  getResumeTemplateTheme,
} from "@/lib/resume/template-config";


interface ResumePdfDocumentProps {
  resume:
    ResumeEditorData;
}


const styles =
  StyleSheet.create({
    page: {
      backgroundColor:
        "#FFFFFF",
    },

    section: {
      marginBottom: 18,
    },

    row: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",

      alignItems:
        "flex-start",
    },

    contactRow: {
      flexDirection:
        "row",

      flexWrap:
        "wrap",

      alignItems:
        "center",
    },

    bulletRow: {
      flexDirection:
        "row",

      marginBottom: 3,
    },

    bullet: {
      width: 10,
    },

    flex: {
      flexGrow: 1,
      flexShrink: 1,
    },
  });


export default function ResumePdfDocument({
  resume,
}: ResumePdfDocumentProps) {
  switch (resume.template) {
    case "executive":
      return (
        <ExecutivePdf
          resume={resume}
        />
      );

    case "creative":
      return (
        <CreativePdf
          resume={resume}
        />
      );

    default:
      return (
        <ModernPdf
          resume={resume}
        />
      );
  }
}


export {
  ResumePdfDocument,
};


/* ======================================= */
/* MODERN PDF */
/* ======================================= */

function ModernPdf({
  resume,
}: ResumePdfDocumentProps) {
  const theme =
    getResumeTemplateTheme(
      "modern"
    );

  const experiences =
    sortExperiences(
      resume.experience
    );

  const education =
    sortEducation(
      resume.education
    );

  const subtitle =
    getProfessionalTitle(
      resume
    );


  return (
    <Document
      title={resume.title}
      author="DocuAI"
      subject="Professional Resume"
    >
      <Page
        size="A4"
        wrap
        style={{
          ...styles.page,

          fontFamily:
            theme.pdfBodyFont,

          color:
            theme.colors.ink,

          fontSize: 9.5,
        }}
      >
        <View
          style={{
            backgroundColor:
              theme.colors
                .header,

            paddingTop: 29,

            paddingBottom: 27,

            paddingHorizontal: 34,
          }}
        >
          <View
            style={{
              width: 34,
              height: 3,
              borderRadius: 2,

              backgroundColor:
                theme.colors
                  .accent,

              marginBottom: 15,
            }}
          />


          <Text
            style={{
              color:
                theme.colors
                  .headerText,

              fontFamily:
                "Helvetica-Bold",

              fontSize: 25,

              lineHeight: 1,

              letterSpacing:
                -0.5,
            }}
          >
            {getName(resume)}
          </Text>


          {subtitle && (
            <Text
              style={{
                marginTop: 8,

                color:
                  "#C7D2FE",

                fontFamily:
                  "Helvetica-Bold",

                fontSize: 10,
              }}
            >
              {subtitle}
            </Text>
          )}


          <PdfContactLine
            resume={resume}
            color="#CBD5E1"
            marginTop={11}
          />
        </View>


        <View
          style={{
            paddingTop: 27,

            paddingBottom: 30,

            paddingHorizontal: 34,
          }}
        >
          {resume.summary && (
            <ModernPdfSection
              title={
                theme.labels
                  .summary
              }
              theme={theme}
            >
              <Text
                style={{
                  color:
                    theme.colors
                      .muted,

                  fontSize: 9.5,

                  lineHeight: 1.5,
                }}
              >
                {resume.summary}
              </Text>
            </ModernPdfSection>
          )}


          {experiences.length >
            0 && (
            <ModernPdfSection
              title={
                theme.labels
                  .experience
              }
              theme={theme}
            >
              {experiences.map(
                (
                  experience,
                  index
                ) => (
                  <View
                    key={
                      experience.id
                    }
                    style={{
                      marginBottom:
                        index ===
                        experiences.length -
                          1
                          ? 0
                          : 15,
                    }}
                  >
                    <View
                      style={
                        styles.row
                      }
                    >
                      <View
                        style={
                          styles.flex
                        }
                      >
                        <Text
                          style={{
                            fontFamily:
                              "Helvetica-Bold",

                            fontSize:
                              10.5,

                            color:
                              theme
                                .colors
                                .ink,
                          }}
                        >
                          {experience.position ||
                            "Position"}
                        </Text>


                        {experience.company && (
                          <Text
                            style={{
                              marginTop:
                                3,

                              fontFamily:
                                "Helvetica-Bold",

                              fontSize:
                                8.5,

                              color:
                                theme
                                  .colors
                                  .accent,
                            }}
                          >
                            {
                              experience.company
                            }
                          </Text>
                        )}
                      </View>


                      <Text
                        style={{
                          marginLeft:
                            14,

                          fontSize:
                            8,

                          color:
                            theme
                              .colors
                              .muted,
                        }}
                      >
                        {formatDateRange(
                          experience.startDate,
                          experience.endDate
                        )}
                      </Text>
                    </View>


                    <PdfDescription
                      text={
                        experience.description
                      }
                      color={
                        theme.colors
                          .muted
                      }
                    />
                  </View>
                )
              )}
            </ModernPdfSection>
          )}


          {education.length > 0 && (
            <ModernPdfSection
              title={
                theme.labels
                  .education
              }
              theme={theme}
            >
              {education.map(
                (
                  item,
                  index
                ) => (
                  <PdfEducation
                    key={item.id}
                    item={item}
                    theme={theme}
                    marginBottom={
                      index ===
                      education.length -
                        1
                        ? 0
                        : 10
                    }
                  />
                )
              )}
            </ModernPdfSection>
          )}


          {resume.skills.length >
            0 && (
            <ModernPdfSection
              title={
                theme.labels
                  .skills
              }
              theme={theme}
              last
            >
              <Text
                style={{
                  fontFamily:
                    "Helvetica-Bold",

                  color:
                    theme.colors
                      .muted,

                  fontSize:
                    8.8,

                  lineHeight:
                    1.6,
                }}
              >
                {resume.skills.join(
                  "  •  "
                )}
              </Text>
            </ModernPdfSection>
          )}
        </View>
      </Page>
    </Document>
  );
}


/* ======================================= */
/* EXECUTIVE PDF */
/* ======================================= */

function ExecutivePdf({
  resume,
}: ResumePdfDocumentProps) {
  const theme =
    getResumeTemplateTheme(
      "executive"
    );

  const experiences =
    sortExperiences(
      resume.experience
    );

  const education =
    sortEducation(
      resume.education
    );

  const subtitle =
    getProfessionalTitle(
      resume
    );


  return (
    <Document
      title={resume.title}
      author="DocuAI"
      subject="Professional Resume"
    >
      <Page
        size="A4"
        wrap
        style={{
          ...styles.page,

          backgroundColor:
            theme.colors
              .paper,

          fontFamily:
            theme.pdfBodyFont,

          color:
            theme.colors
              .ink,

          fontSize: 9.5,

          paddingTop: 35,

          paddingBottom: 35,

          paddingHorizontal: 39,
        }}
      >
        <View
          style={{
            borderTopWidth: 1,

            borderTopColor:
              theme.colors
                .accent,

            paddingTop: 20,

            paddingBottom: 20,

            borderBottomWidth:
              1,

            borderBottomColor:
              theme.colors
                .line,

            alignItems:
              "center",
          }}
        >
          <Text
            style={{
              fontFamily:
                theme
                  .pdfHeadingFont,

              fontSize: 27,

              color:
                theme.colors
                  .ink,

              letterSpacing:
                0.5,
            }}
          >
            {getName(resume)}
          </Text>


          {subtitle && (
            <Text
              style={{
                marginTop: 9,

                fontFamily:
                  "Helvetica-Bold",

                fontSize: 8.5,

                textTransform:
                  "uppercase",

                letterSpacing:
                  1.8,

                color:
                  theme.colors
                    .accent,
              }}
            >
              {subtitle}
            </Text>
          )}


          <PdfContactLine
            resume={resume}
            color={
              theme.colors
                .muted
            }
            marginTop={10}
            centered
          />
        </View>


        <View
          style={{
            paddingTop: 25,
          }}
        >
          {resume.summary && (
            <ExecutivePdfSection
              title={
                theme.labels
                  .summary
              }
              theme={theme}
            >
              <Text
                style={{
                  fontSize:
                    9.5,

                  color:
                    theme.colors
                      .muted,

                  lineHeight:
                    1.55,
                }}
              >
                {resume.summary}
              </Text>
            </ExecutivePdfSection>
          )}


          {experiences.length >
            0 && (
            <ExecutivePdfSection
              title={
                theme.labels
                  .experience
              }
              theme={theme}
            >
              {experiences.map(
                (
                  experience,
                  index
                ) => (
                  <View
                    key={
                      experience.id
                    }
                    style={{
                      marginBottom:
                        index ===
                        experiences.length -
                          1
                          ? 0
                          : 17,
                    }}
                  >
                    {experience.company && (
                      <Text
                        style={{
                          color:
                            theme
                              .colors
                              .accent,

                          fontFamily:
                            "Helvetica-Bold",

                          fontSize:
                            8.2,

                          letterSpacing:
                            1,

                          textTransform:
                            "uppercase",
                        }}
                      >
                        {
                          experience.company
                        }
                      </Text>
                    )}


                    <View
                      style={{
                        ...styles.row,

                        marginTop: 4,
                      }}
                    >
                      <Text
                        style={{
                          flexGrow: 1,

                          flexShrink: 1,

                          fontFamily:
                            "Helvetica-Bold",

                          fontSize:
                            10.2,

                          color:
                            theme
                              .colors
                              .ink,
                        }}
                      >
                        {experience.position ||
                          "Position"}
                      </Text>


                      <Text
                        style={{
                          marginLeft:
                            15,

                          fontSize: 8,

                          color:
                            theme
                              .colors
                              .muted,
                        }}
                      >
                        {formatDateRange(
                          experience.startDate,
                          experience.endDate
                        )}
                      </Text>
                    </View>


                    <PdfDescription
                      text={
                        experience.description
                      }
                      color={
                        theme.colors
                          .muted
                      }
                    />
                  </View>
                )
              )}
            </ExecutivePdfSection>
          )}


          {education.length > 0 && (
            <ExecutivePdfSection
              title={
                theme.labels
                  .education
              }
              theme={theme}
            >
              {education.map(
                (
                  item,
                  index
                ) => (
                  <PdfEducation
                    key={item.id}
                    item={item}
                    theme={theme}
                    marginBottom={
                      index ===
                      education.length -
                        1
                        ? 0
                        : 11
                    }
                  />
                )
              )}
            </ExecutivePdfSection>
          )}


          {resume.skills.length >
            0 && (
            <ExecutivePdfSection
              title={
                theme.labels
                  .skills
              }
              theme={theme}
              last
            >
              <Text
                style={{
                  color:
                    theme.colors
                      .muted,

                  fontSize:
                    8.8,

                  lineHeight:
                    1.6,

                  letterSpacing:
                    0.2,
                }}
              >
                {resume.skills.join(
                  "   ·   "
                )}
              </Text>
            </ExecutivePdfSection>
          )}
        </View>


        <View
          style={{
            marginTop: 12,

            borderBottomWidth:
              1,

            borderBottomColor:
              theme.colors
                .line,
          }}
        />
      </Page>
    </Document>
  );
}


/* ======================================= */
/* CREATIVE PDF */
/* ======================================= */

function CreativePdf({
  resume,
}: ResumePdfDocumentProps) {
  const theme =
    getResumeTemplateTheme(
      "creative"
    );

  const experiences =
    sortExperiences(
      resume.experience
    );

  const education =
    sortEducation(
      resume.education
    );

  const subtitle =
    getProfessionalTitle(
      resume
    );


  return (
    <Document
      title={resume.title}
      author="DocuAI"
      subject="Professional Resume"
    >
      <Page
        size="A4"
        wrap
        style={{
          ...styles.page,

          backgroundColor:
            theme.colors
              .paper,

          fontFamily:
            theme.pdfBodyFont,

          color:
            theme.colors
              .ink,

          fontSize: 9.5,
        }}
      >
        <View
          fixed
          style={{
            position:
              "absolute",

            left: 0,
            top: 0,
            bottom: 0,

            width:
              theme
                .leftAccentWidth,

            backgroundColor:
              theme.colors
                .accent,
          }}
        />


        <View
          style={{
            paddingTop: 34,

            paddingBottom: 34,

            paddingLeft: 43,

            paddingRight: 36,
          }}
        >
          <View>
            <View
              style={{
                alignSelf:
                  "flex-start",

                borderRadius: 10,

                backgroundColor:
                  theme.colors
                    .accentSoft,

                paddingVertical:
                  4,

                paddingHorizontal:
                  9,
              }}
            >
              <Text
                style={{
                  fontFamily:
                    "Helvetica-Bold",

                  color:
                    theme.colors
                      .accent,

                  fontSize: 6.8,

                  letterSpacing:
                    1.1,

                  textTransform:
                    "uppercase",
                }}
              >
                Professional Resume
              </Text>
            </View>


            <Text
              style={{
                marginTop: 14,

                fontFamily:
                  "Helvetica-Bold",

                color:
                  theme.colors
                    .ink,

                fontSize: 29,

                lineHeight: 0.95,

                letterSpacing:
                  -0.7,
              }}
            >
              {getName(resume)}
            </Text>


            {subtitle && (
              <Text
                style={{
                  marginTop: 10,

                  fontFamily:
                    "Helvetica-Bold",

                  color:
                    theme.colors
                      .accent,

                  fontSize:
                    10.5,
                }}
              >
                {subtitle}
              </Text>
            )}


            <PdfContactLine
              resume={resume}
              color={
                theme.colors
                  .muted
              }
              marginTop={11}
            />


            <View
              style={{
                marginTop: 18,

                borderBottomWidth:
                  1,

                borderBottomColor:
                  theme.colors
                    .line,
              }}
            />
          </View>


          <View
            style={{
              paddingTop: 22,
            }}
          >
            {resume.summary && (
              <CreativePdfSection
                title={
                  theme.labels
                    .summary
                }
                theme={theme}
              >
                <Text
                  style={{
                    color:
                      theme.colors
                        .muted,

                    fontSize: 9.5,

                    lineHeight:
                      1.55,
                  }}
                >
                  {resume.summary}
                </Text>
              </CreativePdfSection>
            )}


            {experiences.length >
              0 && (
              <CreativePdfSection
                title={
                  theme.labels
                    .experience
                }
                theme={theme}
              >
                {experiences.map(
                  (
                    experience,
                    index
                  ) => (
                    <View
                      key={
                        experience.id
                      }
                      style={{
                        padding: 11,

                        borderWidth:
                          1,

                        borderColor:
                          theme
                            .colors
                            .accentSoft,

                        borderRadius:
                          7,

                        marginBottom:
                          index ===
                          experiences.length -
                            1
                            ? 0
                            : 10,
                      }}
                    >
                      <View
                        style={
                          styles.row
                        }
                      >
                        <View
                          style={
                            styles.flex
                          }
                        >
                          <Text
                            style={{
                              fontFamily:
                                "Helvetica-Bold",

                              color:
                                theme
                                  .colors
                                  .ink,

                              fontSize:
                                10.2,
                            }}
                          >
                            {experience.position ||
                              "Position"}
                          </Text>


                          {experience.company && (
                            <Text
                              style={{
                                marginTop:
                                  3,

                                fontFamily:
                                  "Helvetica-Bold",

                                color:
                                  theme
                                    .colors
                                    .accent,

                                fontSize:
                                  8.5,
                              }}
                            >
                              {
                                experience.company
                              }
                            </Text>
                          )}
                        </View>


                        <View
                          style={{
                            marginLeft:
                              12,

                            backgroundColor:
                              theme
                                .colors
                                .accentSoft,

                            borderRadius:
                              10,

                            paddingHorizontal:
                              7,

                            paddingVertical:
                              4,
                          }}
                        >
                          <Text
                            style={{
                              color:
                                theme
                                  .colors
                                  .accent,

                              fontSize:
                                7.4,

                              fontFamily:
                                "Helvetica-Bold",
                            }}
                          >
                            {formatDateRange(
                              experience.startDate,
                              experience.endDate
                            )}
                          </Text>
                        </View>
                      </View>


                      <PdfDescription
                        text={
                          experience.description
                        }
                        color={
                          theme
                            .colors
                            .muted
                        }
                      />
                    </View>
                  )
                )}
              </CreativePdfSection>
            )}


            {education.length > 0 && (
              <CreativePdfSection
                title={
                  theme.labels
                    .education
                }
                theme={theme}
              >
                {education.map(
                  (
                    item,
                    index
                  ) => (
                    <PdfEducation
                      key={item.id}
                      item={item}
                      theme={theme}
                      marginBottom={
                        index ===
                        education.length -
                          1
                          ? 0
                          : 10
                      }
                    />
                  )
                )}
              </CreativePdfSection>
            )}


            {resume.skills.length >
              0 && (
              <CreativePdfSection
                title={
                  theme.labels
                    .skills
                }
                theme={theme}
                last
              >
                <View
                  style={{
                    flexDirection:
                      "row",

                    flexWrap:
                      "wrap",
                  }}
                >
                  {resume.skills.map(
                    (skill) => (
                      <View
                        key={skill}
                        style={{
                          backgroundColor:
                            theme
                              .colors
                              .accentSoft,

                          borderRadius:
                            4,

                          paddingVertical:
                            4,

                          paddingHorizontal:
                            7,

                          marginRight:
                            5,

                          marginBottom:
                            5,
                        }}
                      >
                        <Text
                          style={{
                            color:
                              theme
                                .colors
                                .ink,

                            fontFamily:
                              "Helvetica-Bold",

                            fontSize:
                              7.8,
                          }}
                        >
                          {skill}
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </CreativePdfSection>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}


/* ======================================= */
/* PDF SECTIONS */
/* ======================================= */

function ModernPdfSection({
  title,
  children,
  theme,
  last = false,
}: {
  title: string;

  children:
    React.ReactNode;

  theme:
    ReturnType<
      typeof getResumeTemplateTheme
    >;

  last?: boolean;
}) {
  return (
    <View
      style={{
        marginBottom:
          last ? 0 : 19,
      }}
    >
      <Text
        style={{
          fontFamily:
            "Helvetica-Bold",

          fontSize: 9,

          letterSpacing:
            1.3,

          textTransform:
            "uppercase",

          color:
            theme.colors
              .ink,
        }}
      >
        {title}
      </Text>


      <View
        style={{
          marginTop: 5,

          width: 30,

          height: 2.5,

          borderRadius: 2,

          backgroundColor:
            theme.colors
              .accent,
        }}
      />


      <View
        style={{
          marginTop: 10,
        }}
      >
        {children}
      </View>
    </View>
  );
}


function ExecutivePdfSection({
  title,
  children,
  theme,
  last = false,
}: {
  title: string;

  children:
    React.ReactNode;

  theme:
    ReturnType<
      typeof getResumeTemplateTheme
    >;

  last?: boolean;
}) {
  return (
    <View
      style={{
        marginBottom:
          last ? 0 : 21,
      }}
    >
      <View
        style={{
          flexDirection:
            "row",

          alignItems:
            "center",
        }}
      >
        <Text
          style={{
            fontFamily:
              theme
                .pdfHeadingFont,

            fontSize: 9,

            textTransform:
              "uppercase",

            letterSpacing:
              1.1,

            color:
              theme.colors
                .ink,
          }}
        >
          {title}
        </Text>


        <View
          style={{
            flexGrow: 1,

            marginLeft: 11,

            borderBottomWidth:
              0.7,

            borderBottomColor:
              theme.colors
                .line,
          }}
        />
      </View>


      <View
        style={{
          marginTop: 11,
        }}
      >
        {children}
      </View>
    </View>
  );
}


function CreativePdfSection({
  title,
  children,
  theme,
  last = false,
}: {
  title: string;

  children:
    React.ReactNode;

  theme:
    ReturnType<
      typeof getResumeTemplateTheme
    >;

  last?: boolean;
}) {
  return (
    <View
      style={{
        marginBottom:
          last ? 0 : 20,
      }}
    >
      <View
        style={{
          flexDirection:
            "row",

          alignItems:
            "center",
        }}
      >
        <View
          style={{
            width: 19,

            height: 19,

            borderRadius: 5,

            backgroundColor:
              theme.colors
                .accentSoft,

            alignItems:
              "center",

            justifyContent:
              "center",
          }}
        >
          <View
            style={{
              width: 5,

              height: 5,

              borderRadius:
                3,

              backgroundColor:
                theme.colors
                  .accent,
            }}
          />
        </View>


        <Text
          style={{
            marginLeft: 8,

            fontFamily:
              "Helvetica-Bold",

            fontSize:
              10.5,

            color:
              theme.colors
                .ink,
          }}
        >
          {title}
        </Text>


        <View
          style={{
            flexGrow: 1,

            marginLeft: 9,

            borderBottomWidth:
              0.8,

            borderBottomColor:
              theme.colors
                .accentSoft,
          }}
        />
      </View>


      <View
        style={{
          marginTop: 10,
        }}
      >
        {children}
      </View>
    </View>
  );
}


/* ======================================= */
/* PDF SHARED */
/* ======================================= */

function PdfContactLine({
  resume,
  color,
  marginTop,
  centered = false,
}: {
  resume:
    ResumeEditorData;

  color:
    string;

  marginTop:
    number;

  centered?: boolean;
}) {
  const values = [
    resume.personalInfo.email,
    resume.personalInfo.phone,
    resume.personalInfo.location,
    resume.personalInfo.linkedin,
  ].filter(Boolean);


  if (values.length === 0) {
    return null;
  }


  return (
    <Text
      style={{
        marginTop,

        color,

        fontSize: 7.8,

        lineHeight: 1.45,

        textAlign:
          centered
            ? "center"
            : "left",
      }}
    >
      {values.join(
        "  •  "
      )}
    </Text>
  );
}


function PdfDescription({
  text,
  color,
}: {
  text:
    string;

  color:
    string;
}) {
  const lines =
    getDescriptionLines(
      text
    );


  if (lines.length === 0) {
    return null;
  }


  return (
    <View
      style={{
        marginTop: 7,
      }}
    >
      {lines.map(
        (line, index) => (
          <View
            key={`${line}-${index}`}
            style={
              styles.bulletRow
            }
          >
            <Text
              style={{
                ...styles.bullet,

                color,

                fontSize:
                  8.5,
              }}
            >
              •
            </Text>


            <Text
              style={{
                flexGrow: 1,

                flexShrink: 1,

                color,

                fontSize:
                  8.7,

                lineHeight:
                  1.45,
              }}
            >
              {line}
            </Text>
          </View>
        )
      )}
    </View>
  );
}


function PdfEducation({
  item,
  theme,
  marginBottom,
}: {
  item:
    ResumeEducation;

  theme:
    ReturnType<
      typeof getResumeTemplateTheme
    >;

  marginBottom:
    number;
}) {
  return (
    <View
      style={{
        ...styles.row,

        marginBottom,
      }}
    >
      <View
        style={
          styles.flex
        }
      >
        <Text
          style={{
            fontFamily:
              "Helvetica-Bold",

            fontSize:
              9.5,

            color:
              theme.colors
                .ink,
          }}
        >
          {item.degree ||
            "Degree"}
        </Text>


        {item.school && (
          <Text
            style={{
              marginTop: 3,

              fontSize: 8.3,

              color:
                theme.colors
                  .accent,
            }}
          >
            {item.school}
          </Text>
        )}
      </View>


      <Text
        style={{
          marginLeft: 14,

          fontSize: 7.8,

          color:
            theme.colors
              .muted,
        }}
      >
        {formatDateRange(
          item.startDate,
          item.endDate
        )}
      </Text>
    </View>
  );
}


/* ======================================= */
/* HELPERS */
/* ======================================= */

function getName(
  resume:
    ResumeEditorData
) {
  return (
    resume.personalInfo
      .name?.trim() ||
    "Your Name"
  );
}


function getProfessionalTitle(
  resume:
    ResumeEditorData
) {
  const current =
    sortExperiences(
      resume.experience
    )[0];

  return (
    current?.position
      ?.trim() || ""
  );
}


function getDescriptionLines(
  value: string
) {
  return value
    .split(/\n+/)
    .map((line) =>
      line
        .replace(
          /^[•\-*]\s*/,
          ""
        )
        .trim()
    )
    .filter(Boolean);
}


function formatDateRange(
  start: string,
  end: string
) {
  const formattedStart =
    formatDate(start);

  const formattedEnd =
    end
      ? formatDate(end)
      : "Present";


  if (
    !formattedStart &&
    !formattedEnd
  ) {
    return "";
  }


  if (!formattedStart) {
    return formattedEnd;
  }


  return `${formattedStart} – ${formattedEnd}`;
}


function formatDate(
  value: string
) {
  if (!value) {
    return "";
  }


  if (
    value.toLowerCase() ===
    "present"
  ) {
    return "Present";
  }


  const match =
    value.match(
      /^(\d{4})-(\d{2})$/
    );


  if (!match) {
    return value;
  }


  const year =
    Number(match[1]);

  const month =
    Number(match[2]);


  const date =
    new Date(
      Date.UTC(
        year,
        month - 1,
        1
      )
    );


  return new Intl
    .DateTimeFormat(
      "en",
      {
        month:
          "short",

        year:
          "numeric",

        timeZone:
          "UTC",
      }
    )
    .format(date);
}


function sortExperiences(
  items:
    ResumeExperience[]
) {
  return [
    ...items,
  ].sort(
    (
      a,
      b
    ) =>
      dateValue(
        b.startDate
      ) -
      dateValue(
        a.startDate
      )
  );
}


function sortEducation(
  items:
    ResumeEducation[]
) {
  return [
    ...items,
  ].sort(
    (
      a,
      b
    ) =>
      dateValue(
        b.startDate
      ) -
      dateValue(
        a.startDate
      )
  );
}


function dateValue(
  value: string
) {
  if (!value) {
    return 0;
  }


  const timestamp =
    Date.parse(
      `${value}-01`
    );


  return Number.isNaN(
    timestamp
  )
    ? 0
    : timestamp;
}