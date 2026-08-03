"use client";

import {
  useState,
  type ReactNode,
} from "react";

import {
  Plus,
  Save,
  Trash2,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import DeleteResumeButton from "@/components/delete-resume-button";

import {
  useResumeAutosave,
  type SaveStatus,
} from "@/hooks/use-resume-autosave";

import {
  useUnsavedChangesWarning,
} from "@/hooks/use-unsaved-changes-warning";

import type {
  ResumeEducation,
  ResumeEditorData,
  ResumeExperience,
} from "@/types/resume";

import TemplateSelector from "@/components/template-selector";

import AiImproveButton from "@/components/resume/ai-improve-button";

import DownloadPdfButton from "@/components/resume/download-pdf-button";


interface ResumeEditorProps {
  initialResume: ResumeEditorData;
}


const inputClassName = `
  w-full
  rounded-lg
  border
  border-white/10
  bg-white/[0.04]
  px-3
  py-2.5
  text-sm
  text-white
  outline-none
  transition
  placeholder:text-zinc-600
  focus:border-purple-500/60
  focus:ring-2
  focus:ring-purple-500/10
`;


export default function ResumeEditor({
  initialResume,
}: ResumeEditorProps) {
  /*
   * The initial state comes from the Server Component.
   * This keeps the initial server and browser render
   * consistent and avoids hydration mismatches.
   */
  const [
    resume,
    setResume,
  ] = useState<ResumeEditorData>(
    () => initialResume
  );


  /*
   * Skills use separate input text so users can type
   * a trailing comma without React removing it.
   */
  const [
    skillsText,
    setSkillsText,
  ] = useState(
    () =>
      initialResume.skills.join(", ")
  );


  const {
    status,
    saveNow,
    isSaving,
  } = useResumeAutosave(
    resume,
    1500
  );

  useUnsavedChangesWarning(
    status
  );


  function updatePersonalInfo(
    field:
      keyof ResumeEditorData["personalInfo"],
    value: string
  ) {
    setResume(
      (current) => ({
        ...current,

        personalInfo: {
          ...current.personalInfo,

          [field]: value,
        },
      })
    );
  }


  function updateExperience(
    id: string,
    field:
      keyof Omit<
        ResumeExperience,
        "id"
      >,
    value: string
  ) {
    setResume(
      (current) => ({
        ...current,

        experience:
          current.experience.map(
            (experience) =>
              experience.id === id
                ? {
                  ...experience,
                  [field]: value,
                }
                : experience
          ),
      })
    );
  }


  function addExperience() {
    const experience:
      ResumeExperience = {
      /*
       * This runs only after a user click,
       * so it does not affect hydration.
       */
      id: crypto.randomUUID(),

      company: "",

      position: "",

      startDate: "",

      endDate: "",

      description: "",
    };


    setResume(
      (current) => ({
        ...current,

        experience: [
          ...current.experience,
          experience,
        ],
      })
    );
  }


  function removeExperience(
    id: string
  ) {
    setResume(
      (current) => ({
        ...current,

        experience:
          current.experience.filter(
            (experience) =>
              experience.id !== id
          ),
      })
    );
  }


  function updateEducation(
    id: string,
    field:
      keyof Omit<
        ResumeEducation,
        "id"
      >,
    value: string
  ) {
    setResume(
      (current) => ({
        ...current,

        education:
          current.education.map(
            (education) =>
              education.id === id
                ? {
                  ...education,
                  [field]: value,
                }
                : education
          ),
      })
    );
  }


  function addEducation() {
    const education:
      ResumeEducation = {
      id: crypto.randomUUID(),

      school: "",

      degree: "",

      startDate: "",

      endDate: "",
    };


    setResume(
      (current) => ({
        ...current,

        education: [
          ...current.education,
          education,
        ],
      })
    );
  }


  function removeEducation(
    id: string
  ) {
    setResume(
      (current) => ({
        ...current,

        education:
          current.education.filter(
            (education) =>
              education.id !== id
          ),
      })
    );
  }


  function updateSkills(
    value: string
  ) {
    setSkillsText(value);


    const parsedSkills =
      value
        .split(",")
        .map(
          (skill) =>
            skill.trim()
        )
        .filter(Boolean);


    setResume(
      (current) => ({
        ...current,

        skills: parsedSkills,
      })
    );
  }


  return (
    <div
      className="
        grid
        items-start
        gap-8
        xl:grid-cols-[minmax(0,1fr)_minmax(500px,0.9fr)]
      "
    >
      {/* EDITOR */}

      <section className="min-w-0">
        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.025]
          "
        >
          {/* EDITOR HEADER */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-4
              border-b
              border-white/10
              p-5
            "
          >
            <div>
              <h2 className="font-semibold">
                Resume Editor
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-zinc-500
                "
              >
                Changes save automatically after
                you stop typing.
              </p>
            </div>


            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              <span
                className={getSaveStatusClassName(
                  status
                )}
              >
                {getSaveStatusText(
                  status
                )}
              </span>


              <DeleteResumeButton
                resumeId={resume.id}
                redirectAfterDelete
              />

              <DownloadPdfButton
                resumeId={resume.id}

                resumeTitle={
                  resume.title
                }

                beforeDownload={
                  saveNow
                }
              />


              <Button
                type="button"

                disabled={isSaving}

                onClick={() => {
                  void saveNow();
                }}

                className="
                  bg-purple-600
                  hover:bg-purple-500
                "
              >
                <Save
                  className="
                    mr-2
                    h-4
                    w-4
                  "
                />

                {isSaving
                  ? "Saving..."
                  : "Save now"}
              </Button>
            </div>
          </div>


          <div
            className="
              space-y-10
              p-5
              md:p-6
            "
          >
            {/* DOCUMENT SETTINGS */}

            <EditorSection>
              <SectionHeading
                title="Document"
                description="Choose a title and resume template."
              />


              <Field label="Resume title">
                <input
                  value={resume.title}

                  onChange={(event) =>
                    setResume(
                      (current) => ({
                        ...current,

                        title:
                          event.target
                            .value,
                      })
                    )
                  }

                  placeholder="Software Engineer Resume"

                  className={
                    inputClassName
                  }
                />
              </Field>


              <Field label="Template">
                <TemplateSelector
                  selected={
                    resume.template
                  }

                  onSelect={(
                    template
                  ) =>
                    setResume(
                      (current) => ({
                        ...current,

                        template,
                      })
                    )
                  }
                />
              </Field>
            </EditorSection>


            {/* PERSONAL INFORMATION */}

            <EditorSection>
              <SectionHeading
                title="Personal information"
                description="Add your contact and professional details."
              />


              <div
                className="
                  grid
                  gap-4
                  sm:grid-cols-2
                "
              >
                <Field label="Full name">
                  <input
                    value={
                      resume
                        .personalInfo
                        .name
                    }

                    onChange={(event) =>
                      updatePersonalInfo(
                        "name",
                        event.target.value
                      )
                    }

                    placeholder="John Doe"

                    className={
                      inputClassName
                    }
                  />
                </Field>


                <Field label="Email">
                  <input
                    type="email"

                    value={
                      resume
                        .personalInfo
                        .email
                    }

                    onChange={(event) =>
                      updatePersonalInfo(
                        "email",
                        event.target.value
                      )
                    }

                    placeholder="john@example.com"

                    className={
                      inputClassName
                    }
                  />
                </Field>


                <Field label="Phone">
                  <input
                    type="tel"

                    value={
                      resume
                        .personalInfo
                        .phone
                    }

                    onChange={(event) =>
                      updatePersonalInfo(
                        "phone",
                        event.target.value
                      )
                    }

                    placeholder="+960 777 0000"

                    className={
                      inputClassName
                    }
                  />
                </Field>


                <Field label="Location">
                  <input
                    value={
                      resume
                        .personalInfo
                        .location
                    }

                    onChange={(event) =>
                      updatePersonalInfo(
                        "location",
                        event.target.value
                      )
                    }

                    placeholder="Malé, Maldives"

                    className={
                      inputClassName
                    }
                  />
                </Field>
              </div>


              <Field label="LinkedIn">
                <input
                  value={
                    resume
                      .personalInfo
                      .linkedin
                  }

                  onChange={(event) =>
                    updatePersonalInfo(
                      "linkedin",
                      event.target.value
                    )
                  }

                  placeholder="linkedin.com/in/johndoe"

                  className={
                    inputClassName
                  }
                />
              </Field>
            </EditorSection>


            {/* SUMMARY */}

            <EditorSection>

              <div className="flex flex-wrap items-start justify-between gap-4">

                <SectionHeading
                  title="Professional summary"
                  description="Write a short overview of your professional experience."
                />


                <AiImproveButton
                  kind="summary"

                  text={
                    resume.summary
                  }

                  context={{
                    targetRole:
                      resume.title,
                  }}

                  onApply={(
                    improvedText
                  ) =>
                    setResume(
                      (current) => ({
                        ...current,

                        summary:
                          improvedText,
                      })
                    )
                  }
                />

              </div>


              <textarea
                value={
                  resume.summary
                }

                onChange={(event) =>
                  setResume(
                    (current) => ({
                      ...current,

                      summary:
                        event.target.value,
                    })
                  )
                }

                rows={5}

                placeholder="Experienced software developer with a background in building modern web applications..."

                className={
                  inputClassName
                }
              />

            </EditorSection>

            {/* EXPERIENCE */}

            <EditorSection>
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <SectionHeading
                  title="Work experience"
                  description="Add your employment history and accomplishments."
                />


                <Button
                  type="button"

                  variant="outline"

                  size="sm"

                  onClick={
                    addExperience
                  }
                >
                  <Plus
                    className="
                      mr-1.5
                      h-4
                      w-4
                    "
                  />

                  Add
                </Button>
              </div>


              {resume.experience.length ===
                0 ? (
                <EmptySection
                  message="No work experience added yet."
                />
              ) : (
                <div className="space-y-4">
                  {resume.experience.map(
                    (
                      experience,
                      index
                    ) => (
                      <div
                        key={
                          experience.id
                        }

                        className="
                          rounded-xl
                          border
                          border-white/10
                          bg-black/20
                          p-4
                        "
                      >
                        <div
                          className="
                            mb-4
                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >
                          <p
                            className="
                              text-sm
                              font-medium
                            "
                          >
                            Experience{" "}
                            {index + 1}
                          </p>


                          <button
                            type="button"

                            onClick={() =>
                              removeExperience(
                                experience.id
                              )
                            }

                            aria-label={`Remove experience ${index + 1}`}

                            className="
                              rounded-md
                              p-2
                              text-zinc-500
                              transition
                              hover:bg-red-500/10
                              hover:text-red-400
                            "
                          >
                            <Trash2
                              className="
                                h-4
                                w-4
                              "
                            />
                          </button>
                        </div>


                        <div
                          className="
                            grid
                            gap-4
                            sm:grid-cols-2
                          "
                        >
                          <Field label="Position">
                            <input
                              value={
                                experience.position
                              }

                              onChange={(
                                event
                              ) =>
                                updateExperience(
                                  experience.id,
                                  "position",
                                  event
                                    .target
                                    .value
                                )
                              }

                              placeholder="Frontend Developer"

                              className={
                                inputClassName
                              }
                            />
                          </Field>


                          <Field label="Company">
                            <input
                              value={
                                experience.company
                              }

                              onChange={(
                                event
                              ) =>
                                updateExperience(
                                  experience.id,
                                  "company",
                                  event
                                    .target
                                    .value
                                )
                              }

                              placeholder="Company name"

                              className={
                                inputClassName
                              }
                            />
                          </Field>


                          <Field label="Start date">
                            <input
                              type="month"

                              value={
                                experience.startDate
                              }

                              onChange={(
                                event
                              ) =>
                                updateExperience(
                                  experience.id,
                                  "startDate",
                                  event
                                    .target
                                    .value
                                )
                              }

                              className={
                                inputClassName
                              }
                            />
                          </Field>


                          <Field label="End date">
                            <input
                              type="month"

                              value={
                                experience.endDate
                              }

                              onChange={(
                                event
                              ) =>
                                updateExperience(
                                  experience.id,
                                  "endDate",
                                  event
                                    .target
                                    .value
                                )
                              }

                              className={
                                inputClassName
                              }
                            />
                          </Field>
                        </div>


                        <div className="mt-4">
                          <div>

                            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">

                              <span className="text-xs font-medium text-zinc-400">
                                Description
                              </span>


                              <AiImproveButton
                                kind="experience"

                                text={
                                  experience.description
                                }

                                context={{
                                  targetRole:
                                    resume.title,

                                  position:
                                    experience.position,

                                  company:
                                    experience.company,
                                }}

                                onApply={(
                                  improvedText
                                ) =>
                                  updateExperience(
                                    experience.id,
                                    "description",
                                    improvedText
                                  )
                                }
                              />

                            </div>


                            <textarea
                              value={
                                experience.description
                              }

                              onChange={(event) =>
                                updateExperience(
                                  experience.id,
                                  "description",
                                  event.target.value
                                )
                              }

                              rows={5}

                              placeholder="Describe your responsibilities, accomplishments and results."

                              className={
                                inputClassName
                              }
                            />

                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </EditorSection>


            {/* EDUCATION */}

            <EditorSection>
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <SectionHeading
                  title="Education"
                  description="Add your educational qualifications."
                />


                <Button
                  type="button"

                  variant="outline"

                  size="sm"

                  onClick={
                    addEducation
                  }
                >
                  <Plus
                    className="
                      mr-1.5
                      h-4
                      w-4
                    "
                  />

                  Add
                </Button>
              </div>


              {resume.education.length ===
                0 ? (
                <EmptySection
                  message="No education added yet."
                />
              ) : (
                <div className="space-y-4">
                  {resume.education.map(
                    (
                      education,
                      index
                    ) => (
                      <div
                        key={
                          education.id
                        }

                        className="
                          rounded-xl
                          border
                          border-white/10
                          bg-black/20
                          p-4
                        "
                      >
                        <div
                          className="
                            mb-4
                            flex
                            items-center
                            justify-between
                            gap-3
                          "
                        >
                          <p
                            className="
                              text-sm
                              font-medium
                            "
                          >
                            Education{" "}
                            {index + 1}
                          </p>


                          <button
                            type="button"

                            onClick={() =>
                              removeEducation(
                                education.id
                              )
                            }

                            aria-label={`Remove education ${index + 1}`}

                            className="
                              rounded-md
                              p-2
                              text-zinc-500
                              transition
                              hover:bg-red-500/10
                              hover:text-red-400
                            "
                          >
                            <Trash2
                              className="
                                h-4
                                w-4
                              "
                            />
                          </button>
                        </div>


                        <div
                          className="
                            grid
                            gap-4
                            sm:grid-cols-2
                          "
                        >
                          <Field label="School">
                            <input
                              value={
                                education.school
                              }

                              onChange={(
                                event
                              ) =>
                                updateEducation(
                                  education.id,
                                  "school",
                                  event
                                    .target
                                    .value
                                )
                              }

                              placeholder="University or school"

                              className={
                                inputClassName
                              }
                            />
                          </Field>


                          <Field label="Degree">
                            <input
                              value={
                                education.degree
                              }

                              onChange={(
                                event
                              ) =>
                                updateEducation(
                                  education.id,
                                  "degree",
                                  event
                                    .target
                                    .value
                                )
                              }

                              placeholder="Bachelor of Computer Science"

                              className={
                                inputClassName
                              }
                            />
                          </Field>


                          <Field label="Start date">
                            <input
                              type="month"

                              value={
                                education.startDate
                              }

                              onChange={(
                                event
                              ) =>
                                updateEducation(
                                  education.id,
                                  "startDate",
                                  event
                                    .target
                                    .value
                                )
                              }

                              className={
                                inputClassName
                              }
                            />
                          </Field>


                          <Field label="End date">
                            <input
                              type="month"

                              value={
                                education.endDate
                              }

                              onChange={(
                                event
                              ) =>
                                updateEducation(
                                  education.id,
                                  "endDate",
                                  event
                                    .target
                                    .value
                                )
                              }

                              className={
                                inputClassName
                              }
                            />
                          </Field>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </EditorSection>


            {/* SKILLS */}

            <EditorSection>
              <SectionHeading
                title="Skills"
                description="Separate each skill with a comma."
              />


              <input
                value={
                  skillsText
                }

                onChange={(event) =>
                  updateSkills(
                    event.target.value
                  )
                }

                placeholder="React, Next.js, TypeScript, Supabase"

                className={
                  inputClassName
                }
              />
            </EditorSection>
          </div>
        </div>
      </section>


      {/* LIVE PREVIEW */}

      <aside
        className="
          min-w-0
          xl:sticky
          xl:top-8
        "
      >
        <p
          className="
            mb-3
            text-sm
            font-medium
            text-zinc-400
          "
        >
          Live Preview
        </p>


        <div
          className="
            overflow-hidden
            rounded-xl
            bg-zinc-200
            p-3
            shadow-2xl
          "
        >
          <div
            className="
              min-h-[800px]
              bg-white
              px-8
              py-10
              text-zinc-900
              sm:px-10
              sm:py-12
            "
          >
            <header>
              <h1
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                "
              >
                {resume.personalInfo.name ||
                  "Your Name"}
              </h1>


              <div
                className="
                  mt-2
                  flex
                  flex-wrap
                  gap-x-3
                  gap-y-1
                  text-xs
                  text-zinc-600
                "
              >
                {resume.personalInfo.email && (
                  <span>
                    {
                      resume
                        .personalInfo
                        .email
                    }
                  </span>
                )}


                {resume.personalInfo.phone && (
                  <span>
                    {
                      resume
                        .personalInfo
                        .phone
                    }
                  </span>
                )}


                {resume.personalInfo.location && (
                  <span>
                    {
                      resume
                        .personalInfo
                        .location
                    }
                  </span>
                )}


                {resume.personalInfo.linkedin && (
                  <span>
                    {
                      resume
                        .personalInfo
                        .linkedin
                    }
                  </span>
                )}
              </div>
            </header>


            {resume.summary && (
              <ResumePreviewSection
                title="Profile"
              >
                <p
                  className="
                    whitespace-pre-wrap
                    text-sm
                    leading-6
                    text-zinc-700
                  "
                >
                  {resume.summary}
                </p>
              </ResumePreviewSection>
            )}


            {resume.experience.length >
              0 && (
                <ResumePreviewSection
                  title="Experience"
                >
                  <div className="space-y-5">
                    {resume.experience.map(
                      (experience) => (
                        <article
                          key={
                            experience.id
                          }
                        >
                          <div
                            className="
                            flex
                            items-start
                            justify-between
                            gap-4
                          "
                          >
                            <div>
                              <h3
                                className="
                                text-sm
                                font-semibold
                              "
                              >
                                {experience.position ||
                                  "Position"}
                              </h3>

                              <p
                                className="
                                text-sm
                                text-zinc-600
                              "
                              >
                                {experience.company ||
                                  "Company"}
                              </p>
                            </div>


                            <p
                              className="
                              shrink-0
                              text-xs
                              text-zinc-500
                            "
                            >
                              {formatDateRange(
                                experience.startDate,
                                experience.endDate
                              )}
                            </p>
                          </div>


                          {experience.description && (
                            <p
                              className="
                              mt-2
                              whitespace-pre-wrap
                              text-sm
                              leading-6
                              text-zinc-700
                            "
                            >
                              {
                                experience.description
                              }
                            </p>
                          )}
                        </article>
                      )
                    )}
                  </div>
                </ResumePreviewSection>
              )}


            {resume.education.length >
              0 && (
                <ResumePreviewSection
                  title="Education"
                >
                  <div className="space-y-4">
                    {resume.education.map(
                      (education) => (
                        <article
                          key={
                            education.id
                          }

                          className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                        >
                          <div>
                            <h3
                              className="
                              text-sm
                              font-semibold
                            "
                            >
                              {education.degree ||
                                "Degree"}
                            </h3>

                            <p
                              className="
                              text-sm
                              text-zinc-600
                            "
                            >
                              {education.school ||
                                "School"}
                            </p>
                          </div>


                          <p
                            className="
                            shrink-0
                            text-xs
                            text-zinc-500
                          "
                          >
                            {formatDateRange(
                              education.startDate,
                              education.endDate
                            )}
                          </p>
                        </article>
                      )
                    )}
                  </div>
                </ResumePreviewSection>
              )}


            {resume.skills.length >
              0 && (
                <ResumePreviewSection
                  title="Skills"
                >
                  <div
                    className="
                    flex
                    flex-wrap
                    gap-2
                  "
                  >
                    {resume.skills.map(
                      (
                        skill,
                        index
                      ) => (
                        <span
                          key={`${skill}-${index}`}

                          className="
                          rounded
                          bg-zinc-100
                          px-2
                          py-1
                          text-xs
                          text-zinc-700
                        "
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </ResumePreviewSection>
              )}
          </div>
        </div>
      </aside>
    </div>
  );
}


function EditorSection({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="space-y-4">
      {children}
    </div>
  );
}


function SectionHeading({
  title,
  description,
}: {
  title: string;

  description: string;
}) {
  return (
    <div>
      <h3 className="font-semibold">
        {title}
      </h3>

      <p
        className="
          mt-1
          text-xs
          leading-5
          text-zinc-500
        "
      >
        {description}
      </p>
    </div>
  );
}


function Field({
  label,
  children,
}: {
  label: string;

  children: ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="
          mb-2
          block
          text-xs
          font-medium
          text-zinc-400
        "
      >
        {label}
      </span>

      {children}
    </label>
  );
}


function EmptySection({
  message,
}: {
  message: string;
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-dashed
        border-white/10
        px-4
        py-8
        text-center
      "
    >
      <p
        className="
          text-sm
          text-zinc-500
        "
      >
        {message}
      </p>
    </div>
  );
}


function ResumePreviewSection({
  title,
  children,
}: {
  title: string;

  children: ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2
        className="
          mb-3
          border-b
          border-zinc-300
          pb-1.5
          text-xs
          font-bold
          uppercase
          tracking-[0.14em]
        "
      >
        {title}
      </h2>

      {children}
    </section>
  );
}


function getSaveStatusText(
  status: SaveStatus
) {
  switch (status) {
    case "dirty":
      return "Unsaved changes";

    case "saving":
      return "Saving...";

    case "error":
      return "Save failed";

    default:
      return "Saved";
  }
}


function getSaveStatusClassName(
  status: SaveStatus
) {
  const baseClassName =
    "text-xs";


  switch (status) {
    case "dirty":
      return `${baseClassName} text-amber-400`;

    case "error":
      return `${baseClassName} text-red-400`;

    case "saving":
      return `${baseClassName} text-purple-300`;

    default:
      return `${baseClassName} text-zinc-400`;
  }
}


function formatDateRange(
  startDate: string,
  endDate: string
) {
  return [
    startDate,
    endDate,
  ]
    .filter(Boolean)
    .join(" — ");
}