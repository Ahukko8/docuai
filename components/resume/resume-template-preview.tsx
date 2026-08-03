import type {
  CSSProperties,
  ReactNode,
} from "react";

import {
  getResumeTemplateTheme,
} from "@/lib/resume/template-config";

import type {
  ResumeEducation,
  ResumeEditorData,
  ResumeExperience,
} from "@/types/resume";


interface ResumeTemplatePreviewProps {
  resume: ResumeEditorData;
}


export default function ResumeTemplatePreview({
  resume,
}: ResumeTemplatePreviewProps) {
  const theme =
    getResumeTemplateTheme(
      resume.template
    );


  const experiences =
    sortNewestFirst(
      resume.experience
    ).filter(hasExperienceContent);


  const education =
    sortNewestFirst(
      resume.education
    ).filter(hasEducationContent);


  const skills =
    resume.skills
      .map((skill) => skill.trim())
      .filter(Boolean);


  const contactItems = [
    resume.personalInfo.email,

    resume.personalInfo.phone,

    resume.personalInfo.location,

    resume.personalInfo.linkedin,
  ].filter(
    (item): item is string =>
      Boolean(item?.trim())
  );


  const headline =
    getProfessionalHeadline(
      resume
    );


  const pageStyle:
    CSSProperties = {
    backgroundColor:
      theme.colors.paper,

    color: theme.colors.ink,

    fontFamily:
      theme.browserFontFamily,

    borderLeft:
      theme.leftAccentWidth
        ? `${theme.leftAccentWidth}px solid ${theme.colors.accent}`
        : undefined,
  };


  return (
    <aside
      className="
        min-w-0
        xl:sticky
        xl:top-8
      "
    >
      <div
        className="
          mb-3
          flex
          items-center
          justify-between
          gap-3
        "
      >
        <p className="text-sm font-medium text-zinc-400">
          Live Preview
        </p>


        <span
          className="
            rounded-full
            border
            border-white/10
            bg-white/[0.04]
            px-2.5
            py-1
            text-[10px]
            font-medium
            uppercase
            tracking-wider
            text-zinc-400
          "
        >
          {theme.name}
        </span>
      </div>


      <div
        className="
          overflow-hidden
          rounded-xl
          bg-zinc-200
          p-3
          shadow-2xl
        "
      >
        <article
          style={pageStyle}

          className="
            min-h-[850px]
            overflow-hidden
          "
        >
          <ResumeHeader
            resume={resume}

            headline={headline}

            contactItems={
              contactItems
            }
          />


          <div
            className="
              px-8
              py-8
              sm:px-10
            "
          >
            {resume.summary.trim() && (
              <ResumeSection
                title="Professional Profile"

                resume={resume}
              >
                <p
                  className="
                    whitespace-pre-wrap
                    text-[13px]
                    leading-6
                  "
                  style={{
                    color:
                      theme.colors.muted,
                  }}
                >
                  {resume.summary.trim()}
                </p>
              </ResumeSection>
            )}


            {experiences.length >
              0 && (
              <ResumeSection
                title="Professional Experience"

                resume={resume}
              >
                <div className="space-y-6">
                  {experiences.map(
                    (experience) => (
                      <ExperienceEntry
                        key={
                          experience.id
                        }

                        experience={
                          experience
                        }

                        resume={resume}
                      />
                    )
                  )}
                </div>
              </ResumeSection>
            )}


            {education.length >
              0 && (
              <ResumeSection
                title="Education"

                resume={resume}
              >
                <div className="space-y-4">
                  {education.map(
                    (item) => (
                      <EducationEntry
                        key={item.id}

                        education={item}

                        resume={resume}
                      />
                    )
                  )}
                </div>
              </ResumeSection>
            )}


            {skills.length > 0 && (
              <ResumeSection
                title="Core Skills"

                resume={resume}
              >
                {theme.skillsStyle ===
                "inline" ? (
                  <p
                    className="
                      text-[13px]
                      leading-6
                    "
                    style={{
                      color:
                        theme.colors.muted,
                    }}
                  >
                    {skills.join(" • ")}
                  </p>
                ) : (
                  <div
                    className="
                      flex
                      flex-wrap
                      gap-2
                    "
                  >
                    {skills.map(
                      (
                        skill,
                        index
                      ) => (
                        <span
                          key={`${skill}-${index}`}

                          className="
                            rounded-md
                            border
                            px-2.5
                            py-1
                            text-[11px]
                            font-medium
                          "
                          style={{
                            color:
                              theme.colors
                                .accent,

                            backgroundColor:
                              theme.colors
                                .accentSoft,

                            borderColor:
                              theme.colors
                                .line,
                          }}
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                )}
              </ResumeSection>
            )}
          </div>
        </article>
      </div>
    </aside>
  );
}


interface ResumeHeaderProps {
  resume: ResumeEditorData;

  headline: string;

  contactItems: string[];
}


function ResumeHeader({
  resume,
  headline,
  contactItems,
}: ResumeHeaderProps) {
  const theme =
    getResumeTemplateTheme(
      resume.template
    );


  if (
    theme.headerStyle ===
    "editorial"
  ) {
    return (
      <header
        className="
          px-10
          pb-6
          pt-10
          text-center
        "
        style={{
          backgroundColor:
            theme.colors.header,

          color:
            theme.colors.headerText,
        }}
      >
        <h1
          className="
            text-[34px]
            font-bold
            tracking-[0.03em]
          "
        >
          {resume.personalInfo.name ||
            "Your Name"}
        </h1>


        {headline && (
          <p
            className="
              mt-2
              text-xs
              uppercase
              tracking-[0.2em]
            "
            style={{
              color:
                theme.colors.accent,
            }}
          >
            {headline}
          </p>
        )}


        <div
          className="
            mx-auto
            mt-5
            h-px
            w-28
          "
          style={{
            backgroundColor:
              theme.colors.accent,
          }}
        />


        {contactItems.length >
          0 && (
          <p
            className="
              mt-4
              text-[11px]
              leading-5
            "
            style={{
              color:
                theme.colors.muted,
            }}
          >
            {contactItems.join(
              "  •  "
            )}
          </p>
        )}
      </header>
    );
  }


  if (
    theme.headerStyle ===
    "accent"
  ) {
    return (
      <header
        className="
          px-8
          py-9
          sm:px-10
        "
        style={{
          backgroundColor:
            theme.colors.header,

          color:
            theme.colors.headerText,
        }}
      >
        <div
          className="
            mb-4
            h-1
            w-16
            rounded-full
          "
          style={{
            backgroundColor:
              theme.colors.accent,
          }}
        />


        <h1
          className="
            text-[34px]
            font-bold
            tracking-tight
          "
        >
          {resume.personalInfo.name ||
            "Your Name"}
        </h1>


        {headline && (
          <p
            className="
              mt-2
              text-sm
              font-medium
            "
            style={{
              color:
                theme.colors.accent,
            }}
          >
            {headline}
          </p>
        )}


        {contactItems.length >
          0 && (
          <p
            className="
              mt-5
              text-[11px]
              leading-5
            "
            style={{
              color:
                theme.colors.muted,
            }}
          >
            {contactItems.join(
              "  •  "
            )}
          </p>
        )}
      </header>
    );
  }


  return (
    <header
      className="
        px-8
        py-9
        sm:px-10
      "
      style={{
        backgroundColor:
          theme.colors.header,

        color:
          theme.colors.headerText,
      }}
    >
      <div
        className="
          mb-5
          h-1
          w-12
          rounded-full
        "
        style={{
          backgroundColor:
            theme.colors.accent,
        }}
      />


      <h1
        className="
          text-[34px]
          font-bold
          tracking-tight
        "
      >
        {resume.personalInfo.name ||
          "Your Name"}
      </h1>


      {headline && (
        <p
          className="
            mt-2
            text-sm
            font-medium
          "
          style={{
            color: "#bfd4ff",
          }}
        >
          {headline}
        </p>
      )}


      {contactItems.length > 0 && (
        <p
          className="
            mt-5
            text-[11px]
            leading-5
            text-white/75
          "
        >
          {contactItems.join(
            "  •  "
          )}
        </p>
      )}
    </header>
  );
}


interface ResumeSectionProps {
  title: string;

  resume: ResumeEditorData;

  children: ReactNode;
}


function ResumeSection({
  title,
  resume,
  children,
}: ResumeSectionProps) {
  const theme =
    getResumeTemplateTheme(
      resume.template
    );


  if (
    theme.sectionStyle ===
    "classic"
  ) {
    return (
      <section className="mb-8">
        <h2
          className="
            mb-4
            border-b
            pb-2
            text-[13px]
            font-bold
            uppercase
            tracking-[0.15em]
          "
          style={{
            color:
              theme.colors.ink,

            borderColor:
              theme.colors.accent,
          }}
        >
          {title}
        </h2>

        {children}
      </section>
    );
  }


  if (
    theme.sectionStyle ===
    "label"
  ) {
    return (
      <section className="mb-8">
        <div className="mb-4">
          <h2
            className="
              inline-block
              rounded-md
              px-3
              py-1.5
              text-[11px]
              font-bold
              uppercase
              tracking-[0.14em]
            "
            style={{
              color:
                theme.colors.accent,

              backgroundColor:
                theme.colors
                  .accentSoft,
            }}
          >
            {title}
          </h2>
        </div>

        {children}
      </section>
    );
  }


  return (
    <section className="mb-8">
      <div
        className="
          mb-4
          flex
          items-center
          gap-3
        "
      >
        <h2
          className="
            shrink-0
            text-[11px]
            font-bold
            uppercase
            tracking-[0.15em]
          "
          style={{
            color:
              theme.colors.accent,
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
              theme.colors.line,
          }}
        />
      </div>

      {children}
    </section>
  );
}


interface ExperienceEntryProps {
  experience:
    ResumeExperience;

  resume: ResumeEditorData;
}


function ExperienceEntry({
  experience,
  resume,
}: ExperienceEntryProps) {
  const theme =
    getResumeTemplateTheme(
      resume.template
    );


  const bullets =
    parseDescriptionLines(
      experience.description
    );


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
        <div className="min-w-0">
          <h3
            className="
              text-[14px]
              font-bold
              leading-5
            "
          >
            {experience.position ||
              "Position"}
          </h3>


          {experience.company && (
            <p
              className="
                mt-0.5
                text-[12px]
                font-medium
              "
              style={{
                color:
                  theme.colors.accent,
              }}
            >
              {experience.company}
            </p>
          )}
        </div>


        <p
          className="
            shrink-0
            text-right
            text-[10px]
            leading-5
          "
          style={{
            color:
              theme.colors.muted,
          }}
        >
          {formatDateRange(
            experience.startDate,
            experience.endDate
          )}
        </p>
      </div>


      {bullets.length > 0 && (
        <ul
          className="
            mt-2.5
            space-y-1.5
            pl-4
          "
          style={{
            color:
              theme.colors.muted,
          }}
        >
          {bullets.map(
            (bullet, index) => (
              <li
                key={index}

                className="
                  list-disc
                  text-[12px]
                  leading-5
                  marker:text-current
                "
              >
                {bullet}
              </li>
            )
          )}
        </ul>
      )}
    </article>
  );
}


interface EducationEntryProps {
  education:
    ResumeEducation;

  resume: ResumeEditorData;
}


function EducationEntry({
  education,
  resume,
}: EducationEntryProps) {
  const theme =
    getResumeTemplateTheme(
      resume.template
    );


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
            text-[13px]
            font-bold
          "
        >
          {education.degree ||
            "Qualification"}
        </h3>


        {education.school && (
          <p
            className="
              mt-0.5
              text-[12px]
            "
            style={{
              color:
                theme.colors.muted,
            }}
          >
            {education.school}
          </p>
        )}
      </div>


      <p
        className="
          shrink-0
          text-right
          text-[10px]
          leading-5
        "
        style={{
          color:
            theme.colors.muted,
        }}
      >
        {formatDateRange(
          education.startDate,
          education.endDate
        )}
      </p>
    </article>
  );
}


function hasExperienceContent(
  experience:
    ResumeExperience
) {
  return Boolean(
    experience.position.trim() ||
      experience.company.trim() ||
      experience.description.trim()
  );
}


function hasEducationContent(
  education:
    ResumeEducation
) {
  return Boolean(
    education.degree.trim() ||
      education.school.trim()
  );
}


function getProfessionalHeadline(
  resume: ResumeEditorData
) {
  const position =
    resume.experience.find(
      (experience) =>
        experience.position.trim()
    )?.position;


  if (position) {
    return position.trim();
  }


  const cleanedTitle =
    resume.title
      .replace(
        /\s*resume\s*$/i,
        ""
      )
      .trim();


  if (
    !cleanedTitle ||
    cleanedTitle.toLowerCase() ===
      "untitled"
  ) {
    return "";
  }


  return cleanedTitle;
}


function parseDescriptionLines(
  description: string
) {
  const trimmed =
    description.trim();


  if (!trimmed) {
    return [];
  }


  const lines =
    trimmed
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


  return lines.length
    ? lines
    : [trimmed];
}


function sortNewestFirst<
  T extends {
    startDate: string;
  },
>(
  items: T[]
) {
  return items
    .map((item, index) => ({
      item,
      index,
    }))
    .sort((left, right) => {
      const leftValue =
        parseSortableDate(
          left.item.startDate
        );


      const rightValue =
        parseSortableDate(
          right.item.startDate
        );


      if (
        leftValue === rightValue
      ) {
        return (
          left.index -
          right.index
        );
      }


      return (
        rightValue -
        leftValue
      );
    })
    .map(({ item }) => item);
}


function parseSortableDate(
  value: string
) {
  const match =
    /^(\d{4})-(\d{2})$/.exec(
      value
    );


  if (!match) {
    return 0;
  }


  return (
    Number(match[1]) *
      100 +
    Number(match[2])
  );
}


function formatDateRange(
  startDate: string,
  endDate: string
) {
  const start =
    formatMonth(startDate);


  const end =
    endDate
      ? formatMonth(endDate)
      : start
        ? "Present"
        : "";


  return [start, end]
    .filter(Boolean)
    .join(" — ");
}


function formatMonth(
  value: string
) {
  const match =
    /^(\d{4})-(\d{2})$/.exec(
      value
    );


  if (!match) {
    return value;
  }


  const monthNames = [
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
    monthNames[
      Number(match[2]) - 1
    ];


  return month
    ? `${month} ${match[1]}`
    : value;
}