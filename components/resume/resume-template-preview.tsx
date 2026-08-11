import type {
  ResumeEditorData,
  ResumeEducation,
  ResumeExperience,
} from "@/types/resume";

import {
  getResumeTemplateTheme,
} from "@/lib/resume/template-config";


interface ResumeTemplatePreviewProps {
  resume: ResumeEditorData;
}


export default function ResumeTemplatePreview({
  resume,
}: ResumeTemplatePreviewProps) {
  switch (resume.template) {
    case "executive":
      return (
        <ExecutiveResume
          resume={resume}
        />
      );

    case "creative":
      return (
        <CreativeResume
          resume={resume}
        />
      );

    default:
      return (
        <ModernResume
          resume={resume}
        />
      );
  }
}


export {
  ResumeTemplatePreview,
};


/* ======================================= */
/* MODERN */
/* ======================================= */

function ModernResume({
  resume,
}: ResumeTemplatePreviewProps) {
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
    <ResumePaper
      background={
        theme.colors.paper
      }
      fontFamily={
        theme
          .browserFontFamily
      }
    >
      <header
        className="
          px-8
          py-9
          sm:px-11
          sm:py-10
        "
        style={{
          backgroundColor:
            theme.colors
              .header,

          color:
            theme.colors
              .headerText,
        }}
      >
        <div
          className="
            h-1
            w-12
            rounded-full
          "
          style={{
            backgroundColor:
              theme.colors
                .accent,
          }}
        />


        <h1
          className="
            mt-5
            text-[28px]
            font-bold
            leading-none
            tracking-[-0.035em]
            sm:text-[32px]
          "
        >
          {getName(resume)}
        </h1>


        {subtitle && (
          <p
            className="
              mt-3
              text-[12px]
              font-medium
              tracking-wide
            "
            style={{
              color:
                "#C7D2FE",
            }}
          >
            {subtitle}
          </p>
        )}


        <ContactLine
          resume={resume}
          color="#CBD5E1"
          className="mt-5"
        />
      </header>


      <div
        className="
          space-y-7
          px-8
          py-8
          sm:px-11
          sm:py-10
        "
      >
        {resume.summary && (
          <ModernSection
            title={
              theme.labels
                .summary
            }
            accent={
              theme.colors
                .accent
            }
            ink={
              theme.colors
                .ink
            }
          >
            <p
              className="
                text-[10.5px]
                leading-[1.65]
              "
              style={{
                color:
                  theme.colors
                    .muted,
              }}
            >
              {resume.summary}
            </p>
          </ModernSection>
        )}


        {experiences.length >
          0 && (
          <ModernSection
            title={
              theme.labels
                .experience
            }
            accent={
              theme.colors
                .accent
            }
            ink={
              theme.colors
                .ink
            }
          >
            <div className="space-y-6">
              {experiences.map(
                (
                  experience
                ) => (
                  <ModernExperience
                    key={
                      experience.id
                    }
                    experience={
                      experience
                    }
                    accent={
                      theme
                        .colors
                        .accent
                    }
                    ink={
                      theme
                        .colors
                        .ink
                    }
                    muted={
                      theme
                        .colors
                        .muted
                    }
                  />
                )
              )}
            </div>
          </ModernSection>
        )}


        {education.length > 0 && (
          <ModernSection
            title={
              theme.labels
                .education
            }
            accent={
              theme.colors
                .accent
            }
            ink={
              theme.colors
                .ink
            }
          >
            <div className="space-y-4">
              {education.map(
                (item) => (
                  <EducationRow
                    key={item.id}
                    item={item}
                    ink={
                      theme
                        .colors
                        .ink
                    }
                    muted={
                      theme
                        .colors
                        .muted
                    }
                    accent={
                      theme
                        .colors
                        .accent
                    }
                  />
                )
              )}
            </div>
          </ModernSection>
        )}


        {resume.skills.length >
          0 && (
          <ModernSection
            title={
              theme.labels
                .skills
            }
            accent={
              theme.colors
                .accent
            }
            ink={
              theme.colors
                .ink
            }
          >
            <p
              className="
                text-[10px]
                font-medium
                leading-6
              "
              style={{
                color:
                  theme.colors
                    .muted,
              }}
            >
              {resume.skills.join(
                "  •  "
              )}
            </p>
          </ModernSection>
        )}
      </div>
    </ResumePaper>
  );
}


/* ======================================= */
/* EXECUTIVE */
/* ======================================= */

function ExecutiveResume({
  resume,
}: ResumeTemplatePreviewProps) {
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
    <ResumePaper
      background={
        theme.colors.paper
      }
      fontFamily={
        theme
          .browserFontFamily
      }
    >
      <div
        className="
          px-8
          py-10
          sm:px-12
          sm:py-12
        "
      >
        <header
          className="
            text-center
          "
        >
          <div
            className="
              mx-auto
              mb-7
              h-px
              w-full
            "
            style={{
              backgroundColor:
                theme.colors
                  .accent,
            }}
          />


          <h1
            className="
              text-[30px]
              font-semibold
              leading-none
              tracking-[0.015em]
              sm:text-[34px]
            "
            style={{
              color:
                theme.colors
                  .ink,

              fontFamily:
                theme
                  .browserHeadingFontFamily,
            }}
          >
            {getName(resume)}
          </h1>


          {subtitle && (
            <p
              className="
                mt-4
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
              "
              style={{
                color:
                  theme.colors
                    .accent,
              }}
            >
              {subtitle}
            </p>
          )}


          <ContactLine
            resume={resume}
            color={
              theme.colors
                .muted
            }
            className="
              mt-5
              justify-center
            "
          />


          <div
            className="
              mx-auto
              mt-7
              h-px
              w-full
            "
            style={{
              backgroundColor:
                theme.colors
                  .line,
            }}
          />
        </header>


        <div
          className="
            mt-9
            space-y-9
          "
        >
          {resume.summary && (
            <ExecutiveSection
              title={
                theme.labels
                  .summary
              }
              theme={theme}
            >
              <p
                className="
                  text-[10.5px]
                  leading-[1.7]
                "
                style={{
                  color:
                    theme.colors
                      .muted,
                }}
              >
                {resume.summary}
              </p>
            </ExecutiveSection>
          )}


          {experiences.length >
            0 && (
            <ExecutiveSection
              title={
                theme.labels
                  .experience
              }
              theme={theme}
            >
              <div className="space-y-7">
                {experiences.map(
                  (
                    experience
                  ) => (
                    <ExecutiveExperience
                      key={
                        experience.id
                      }
                      experience={
                        experience
                      }
                      ink={
                        theme
                          .colors
                          .ink
                      }
                      muted={
                        theme
                          .colors
                          .muted
                      }
                      accent={
                        theme
                          .colors
                          .accent
                      }
                    />
                  )
                )}
              </div>
            </ExecutiveSection>
          )}


          {education.length > 0 && (
            <ExecutiveSection
              title={
                theme.labels
                  .education
              }
              theme={theme}
            >
              <div className="space-y-5">
                {education.map(
                  (item) => (
                    <EducationRow
                      key={item.id}
                      item={item}
                      ink={
                        theme
                          .colors
                          .ink
                      }
                      muted={
                        theme
                          .colors
                          .muted
                      }
                      accent={
                        theme
                          .colors
                          .accent
                      }
                    />
                  )
                )}
              </div>
            </ExecutiveSection>
          )}


          {resume.skills.length >
            0 && (
            <ExecutiveSection
              title={
                theme.labels
                  .skills
              }
              theme={theme}
            >
              <p
                className="
                  text-[10px]
                  leading-6
                  tracking-[0.02em]
                "
                style={{
                  color:
                    theme.colors
                      .muted,
                }}
              >
                {resume.skills.join(
                  "   ·   "
                )}
              </p>
            </ExecutiveSection>
          )}
        </div>


        <div
          className="
            mt-10
            h-px
            w-full
          "
          style={{
            backgroundColor:
              theme.colors.line,
          }}
        />
      </div>
    </ResumePaper>
  );
}


/* ======================================= */
/* CREATIVE */
/* ======================================= */

function CreativeResume({
  resume,
}: ResumeTemplatePreviewProps) {
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
    <ResumePaper
      background={
        theme.colors.paper
      }
      fontFamily={
        theme
          .browserFontFamily
      }
    >
      <div
        className="
          relative
          min-h-full
        "
      >
        <div
          className="
            absolute
            bottom-0
            left-0
            top-0
          "
          style={{
            width:
              theme
                .leftAccentWidth,

            backgroundColor:
              theme.colors
                .accent,
          }}
        />


        <div
          className="
            px-8
            py-10
            pl-10
            sm:px-12
            sm:py-12
            sm:pl-14
          "
        >
          <header>
            <div
              className="
                inline-flex
                items-center
                rounded-full
                px-3
                py-1
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
              "
              style={{
                backgroundColor:
                  theme.colors
                    .accentSoft,

                color:
                  theme.colors
                    .accent,
              }}
            >
              Professional Resume
            </div>


            <h1
              className="
                mt-5
                max-w-[90%]
                text-[30px]
                font-extrabold
                leading-[0.96]
                tracking-[-0.045em]
                sm:text-[36px]
              "
              style={{
                color:
                  theme.colors
                    .ink,
              }}
            >
              {getName(resume)}
            </h1>


            {subtitle && (
              <p
                className="
                  mt-4
                  text-[12px]
                  font-semibold
                "
                style={{
                  color:
                    theme.colors
                      .accent,
                }}
              >
                {subtitle}
              </p>
            )}


            <ContactLine
              resume={resume}
              color={
                theme.colors
                  .muted
              }
              className="mt-5"
            />


            <div
              className="
                mt-7
                h-px
                w-full
              "
              style={{
                backgroundColor:
                  theme.colors
                    .line,
              }}
            />
          </header>


          <div
            className="
              mt-8
              space-y-8
            "
          >
            {resume.summary && (
              <CreativeSection
                title={
                  theme.labels
                    .summary
                }
                accent={
                  theme.colors
                    .accent
                }
                ink={
                  theme.colors
                    .ink
                }
                soft={
                  theme.colors
                    .accentSoft
                }
              >
                <p
                  className="
                    text-[10.5px]
                    leading-[1.65]
                  "
                  style={{
                    color:
                      theme.colors
                        .muted,
                  }}
                >
                  {resume.summary}
                </p>
              </CreativeSection>
            )}


            {experiences.length >
              0 && (
              <CreativeSection
                title={
                  theme.labels
                    .experience
                }
                accent={
                  theme.colors
                    .accent
                }
                ink={
                  theme.colors
                    .ink
                }
                soft={
                  theme.colors
                    .accentSoft
                }
              >
                <div className="space-y-6">
                  {experiences.map(
                    (
                      experience
                    ) => (
                      <CreativeExperience
                        key={
                          experience.id
                        }
                        experience={
                          experience
                        }
                        ink={
                          theme
                            .colors
                            .ink
                        }
                        muted={
                          theme
                            .colors
                            .muted
                        }
                        accent={
                          theme
                            .colors
                            .accent
                        }
                        soft={
                          theme
                            .colors
                            .accentSoft
                        }
                      />
                    )
                  )}
                </div>
              </CreativeSection>
            )}


            {education.length >
              0 && (
              <CreativeSection
                title={
                  theme.labels
                    .education
                }
                accent={
                  theme.colors
                    .accent
                }
                ink={
                  theme.colors
                    .ink
                }
                soft={
                  theme.colors
                    .accentSoft
                }
              >
                <div className="space-y-4">
                  {education.map(
                    (item) => (
                      <EducationRow
                        key={item.id}
                        item={item}
                        ink={
                          theme
                            .colors
                            .ink
                        }
                        muted={
                          theme
                            .colors
                            .muted
                        }
                        accent={
                          theme
                            .colors
                            .accent
                        }
                      />
                    )
                  )}
                </div>
              </CreativeSection>
            )}


            {resume.skills.length >
              0 && (
              <CreativeSection
                title={
                  theme.labels
                    .skills
                }
                accent={
                  theme.colors
                    .accent
                }
                ink={
                  theme.colors
                    .ink
                }
                soft={
                  theme.colors
                    .accentSoft
                }
              >
                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                  "
                >
                  {resume.skills.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="
                          rounded-md
                          px-2.5
                          py-1.5
                          text-[9px]
                          font-medium
                        "
                        style={{
                          color:
                            theme
                              .colors
                              .ink,

                          backgroundColor:
                            theme
                              .colors
                              .accentSoft,
                        }}
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </CreativeSection>
            )}
          </div>
        </div>
      </div>
    </ResumePaper>
  );
}


/* ======================================= */
/* SHARED PAPER */
/* ======================================= */

function ResumePaper({
  children,
  background,
  fontFamily,
}: {
  children:
    React.ReactNode;

  background:
    string;

  fontFamily:
    string;
}) {
  return (
    <div
      className="
        mx-auto
        w-full
        max-w-[794px]
        overflow-hidden
        shadow-[0_24px_80px_rgba(0,0,0,0.22)]
      "
      style={{
        backgroundColor:
          background,

        fontFamily,

        minHeight:
          "1123px",
      }}
    >
      {children}
    </div>
  );
}


/* ======================================= */
/* SECTION STYLES */
/* ======================================= */

function ModernSection({
  title,
  children,
  accent,
  ink,
}: {
  title: string;

  children:
    React.ReactNode;

  accent: string;

  ink: string;
}) {
  return (
    <section>
      <h2
        className="
          text-[10px]
          font-extrabold
          uppercase
          tracking-[0.16em]
        "
        style={{
          color: ink,
        }}
      >
        {title}
      </h2>


      <div
        className="
          mt-2
          h-[3px]
          w-9
          rounded-full
        "
        style={{
          backgroundColor:
            accent,
        }}
      />


      <div className="mt-4">
        {children}
      </div>
    </section>
  );
}


function ExecutiveSection({
  title,
  children,
  theme,
}: {
  title: string;

  children:
    React.ReactNode;

  theme:
    ReturnType<
      typeof getResumeTemplateTheme
    >;
}) {
  return (
    <section>
      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <h2
          className="
            shrink-0
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.16em]
          "
          style={{
            color:
              theme.colors
                .ink,

            fontFamily:
              theme
                .browserHeadingFontFamily,
          }}
        >
          {title}
        </h2>


        <div
          className="
            h-px
            flex-1
          "
          style={{
            backgroundColor:
              theme.colors
                .line,
          }}
        />
      </div>


      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}


function CreativeSection({
  title,
  children,
  accent,
  ink,
  soft,
}: {
  title: string;

  children:
    React.ReactNode;

  accent: string;

  ink: string;

  soft: string;
}) {
  return (
    <section>
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg
          "
          style={{
            backgroundColor:
              soft,
          }}
        >
          <div
            className="
              h-2
              w-2
              rounded-full
            "
            style={{
              backgroundColor:
                accent,
            }}
          />
        </div>


        <h2
          className="
            text-[12px]
            font-extrabold
            tracking-[-0.02em]
          "
          style={{
            color: ink,
          }}
        >
          {title}
        </h2>


        <div
          className="
            h-px
            flex-1
          "
          style={{
            backgroundColor:
              soft,
          }}
        />
      </div>


      <div className="mt-4">
        {children}
      </div>
    </section>
  );
}


/* ======================================= */
/* EXPERIENCE */
/* ======================================= */

function ModernExperience({
  experience,
  ink,
  muted,
  accent,
}: {
  experience:
    ResumeExperience;

  ink: string;

  muted: string;

  accent: string;
}) {
  return (
    <article>
      <div
        className="
          flex
          items-start
          justify-between
          gap-5
        "
      >
        <div>
          <h3
            className="
              text-[11px]
              font-bold
            "
            style={{
              color: ink,
            }}
          >
            {experience.position ||
              "Position"}
          </h3>


          {experience.company && (
            <p
              className="
                mt-1
                text-[9.5px]
                font-semibold
              "
              style={{
                color: accent,
              }}
            >
              {
                experience.company
              }
            </p>
          )}
        </div>


        <p
          className="
            shrink-0
            text-right
            text-[8.5px]
            font-medium
          "
          style={{
            color: muted,
          }}
        >
          {formatDateRange(
            experience.startDate,
            experience.endDate
          )}
        </p>
      </div>


      <Description
        text={
          experience.description
        }
        color={muted}
      />
    </article>
  );
}


function ExecutiveExperience({
  experience,
  ink,
  muted,
  accent,
}: {
  experience:
    ResumeExperience;

  ink: string;

  muted: string;

  accent: string;
}) {
  return (
    <article>
      {experience.company && (
        <p
          className="
            text-[9px]
            font-bold
            uppercase
            tracking-[0.12em]
          "
          style={{
            color: accent,
          }}
        >
          {experience.company}
        </p>
      )}


      <div
        className="
          mt-1.5
          flex
          items-start
          justify-between
          gap-5
        "
      >
        <h3
          className="
            text-[11px]
            font-semibold
          "
          style={{
            color: ink,
          }}
        >
          {experience.position ||
            "Position"}
        </h3>


        <p
          className="
            shrink-0
            text-[8.5px]
          "
          style={{
            color: muted,
          }}
        >
          {formatDateRange(
            experience.startDate,
            experience.endDate
          )}
        </p>
      </div>


      <Description
        text={
          experience.description
        }
        color={muted}
      />
    </article>
  );
}


function CreativeExperience({
  experience,
  ink,
  muted,
  accent,
  soft,
}: {
  experience:
    ResumeExperience;

  ink: string;

  muted: string;

  accent: string;

  soft: string;
}) {
  return (
    <article
      className="
        rounded-xl
        border
        p-4
      "
      style={{
        borderColor:
          soft,
      }}
    >
      <div
        className="
          flex
          items-start
          justify-between
          gap-5
        "
      >
        <div>
          <h3
            className="
              text-[11px]
              font-bold
            "
            style={{
              color: ink,
            }}
          >
            {experience.position ||
              "Position"}
          </h3>


          {experience.company && (
            <p
              className="
                mt-1
                text-[9.5px]
                font-semibold
              "
              style={{
                color: accent,
              }}
            >
              {
                experience.company
              }
            </p>
          )}
        </div>


        <p
          className="
            shrink-0
            rounded-full
            px-2
            py-1
            text-[8px]
            font-medium
          "
          style={{
            color: accent,

            backgroundColor:
              soft,
          }}
        >
          {formatDateRange(
            experience.startDate,
            experience.endDate
          )}
        </p>
      </div>


      <Description
        text={
          experience.description
        }
        color={muted}
      />
    </article>
  );
}


/* ======================================= */
/* EDUCATION */
/* ======================================= */

function EducationRow({
  item,
  ink,
  muted,
  accent,
}: {
  item:
    ResumeEducation;

  ink: string;

  muted: string;

  accent: string;
}) {
  return (
    <article
      className="
        flex
        items-start
        justify-between
        gap-5
      "
    >
      <div>
        <h3
          className="
            text-[10.5px]
            font-bold
          "
          style={{
            color: ink,
          }}
        >
          {item.degree ||
            "Degree"}
        </h3>


        {item.school && (
          <p
            className="
              mt-1
              text-[9px]
              font-medium
            "
            style={{
              color: accent,
            }}
          >
            {item.school}
          </p>
        )}
      </div>


      <p
        className="
          shrink-0
          text-[8.5px]
        "
        style={{
          color: muted,
        }}
      >
        {formatDateRange(
          item.startDate,
          item.endDate
        )}
      </p>
    </article>
  );
}


/* ======================================= */
/* DESCRIPTION */
/* ======================================= */

function Description({
  text,
  color,
}: {
  text: string;

  color: string;
}) {
  const lines =
    getDescriptionLines(
      text
    );


  if (lines.length === 0) {
    return null;
  }


  return (
    <ul
      className="
        mt-3
        space-y-1.5
      "
    >
      {lines.map(
        (line, index) => (
          <li
            key={`${line}-${index}`}
            className="
              flex
              gap-2
              text-[9.5px]
              leading-[1.55]
            "
            style={{
              color,
            }}
          >
            <span
              className="
                shrink-0
              "
            >
              •
            </span>

            <span>
              {line}
            </span>
          </li>
        )
      )}
    </ul>
  );
}


/* ======================================= */
/* CONTACT */
/* ======================================= */

function ContactLine({
  resume,
  color,
  className = "",
}: {
  resume:
    ResumeEditorData;

  color: string;

  className?: string;
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
    <div
      className={`
        flex
        flex-wrap
        items-center
        gap-x-2
        gap-y-1
        text-[8.5px]
        leading-5
        ${className}
      `}
      style={{
        color,
      }}
    >
      {values.map(
        (value, index) => (
          <span
            key={`${value}-${index}`}
            className="
              flex
              items-center
              gap-2
            "
          >
            {index > 0 && (
              <span
                className="
                  opacity-50
                "
              >
                •
              </span>
            )}

            {value}
          </span>
        )
      )}
    </div>
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