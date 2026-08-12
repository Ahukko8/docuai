"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  Check,
  Download,
  FileText,
  Loader2,
  Lock,
  Sparkles,
  Trash2,
} from "lucide-react";

import Link from "next/link";

import {
  Button,
} from "@/components/ui/button";

import {
  deleteCoverLetterAction,
  generateCoverLetterAction,
} from "@/actions/cover-letters/actions";

import {
  useCoverLetterAutosave,
} from "@/hooks/use-cover-letter-autosave";

import {
  useUnsavedChangesWarning,
} from "@/hooks/use-unsaved-changes-warning";

import CoverLetterPreview from "@/components/cover-letter/cover-letter-preview";

import type {
  CoverLetterEditorData,
  CoverLetterTemplate,
  UpdateCoverLetterInput,
} from "@/types/cover-letter";

import type {
  ResumeEditorData,
} from "@/types/resume";


interface CoverLetterEditorProps {
  initialCoverLetter:
    CoverLetterEditorData;

  resumes:
    ResumeEditorData[];

  canUsePremiumTemplates:
    boolean;
}


const templates: {
  id:
    CoverLetterTemplate;

  name:
    string;

  description:
    string;

  premium:
    boolean;
}[] = [
  {
    id:
      "modern",

    name:
      "Modern",

    description:
      "Bold and contemporary.",

    premium:
      false,
  },

  {
    id:
      "executive",

    name:
      "Executive",

    description:
      "Elegant and refined.",

    premium:
      true,
  },

  {
    id:
      "professional",

    name:
      "Professional",

    description:
      "Clean corporate style.",

    premium:
      true,
  },
];


export default function CoverLetterEditor({
  initialCoverLetter,
  resumes,
  canUsePremiumTemplates,
}: CoverLetterEditorProps) {
  const router =
    useRouter();


  const [
    coverLetter,
    setCoverLetter,
  ] =
    useState(
      initialCoverLetter
    );


  const [
    generating,
    setGenerating,
  ] =
    useState(false);


  const [
    deleting,
    setDeleting,
  ] =
    useState(false);


  const [
    downloading,
    setDownloading,
  ] =
    useState(false);


  const [
    aiError,
    setAiError,
  ] =
    useState<
      string | null
    >(null);


  const updateInput =
    useMemo(
      () =>
        toUpdateInput(
          coverLetter
        ),
      [coverLetter]
    );


  const {
    status,
    saveNow,
  } =
    useCoverLetterAutosave(
      coverLetter.id,
      updateInput
    );


  useUnsavedChangesWarning(
    status
  );


  const selectedResume =
    useMemo(
      () =>
        resumes.find(
          (resume) =>
            resume.id ===
            coverLetter.resumeId
        ) ?? null,
      [
        resumes,
        coverLetter.resumeId,
      ]
    );


  function update<
    K extends keyof CoverLetterEditorData
  >(
    key: K,
    value:
      CoverLetterEditorData[K]
  ) {
    setCoverLetter(
      (current) => ({
        ...current,

        [key]:
          value,
      })
    );
  }


  async function handleGenerate() {
    setAiError(
      null
    );


    if (
      !coverLetter.resumeId
    ) {
      setAiError(
        "Select a resume first."
      );

      return;
    }


    setGenerating(
      true
    );


    try {
      const result =
        await generateCoverLetterAction({
          resumeId:
            coverLetter.resumeId,

          recipientName:
            coverLetter.recipientName,

          companyName:
            coverLetter.companyName,

          jobTitle:
            coverLetter.jobTitle,

          companyAddress:
            coverLetter.companyAddress,

          jobDescription:
            coverLetter.jobDescription,
        });


      setCoverLetter(
        (current) => ({
          ...current,

          opening:
            result.opening,

          body:
            result.body,

          closing:
            result.closing,

          title:
            current.title ===
              "Untitled Cover Letter"
              ? `${current.jobTitle || "Cover Letter"} — ${current.companyName || "Company"}`
              : current.title,
        })
      );
    } catch (error) {
      setAiError(
        error instanceof Error
          ? error.message
          : "Unable to generate the cover letter."
      );
    } finally {
      setGenerating(
        false
      );
    }
  }


  async function handleDownload() {
    setDownloading(
      true
    );


    try {
      await saveNow();


      const response =
        await fetch(
          `/api/cover-letters/${coverLetter.id}/pdf`
        );


      if (!response.ok) {
        const message =
          await response.text();


        throw new Error(
          message ||
            "Unable to download PDF."
        );
      }


      const blob =
        await response.blob();


      const url =
        URL.createObjectURL(
          blob
        );


      const anchor =
        document.createElement(
          "a"
        );


      anchor.href =
        url;


      anchor.download =
        `${sanitizeFilename(
          coverLetter.title
        )}.pdf`;


      document.body
        .appendChild(
          anchor
        );


      anchor.click();


      anchor.remove();


      URL.revokeObjectURL(
        url
      );
    } catch (error) {
      setAiError(
        error instanceof Error
          ? error.message
          : "Unable to download the PDF."
      );
    } finally {
      setDownloading(
        false
      );
    }
  }


  async function handleDelete() {
    const confirmed =
      window.confirm(
        "Delete this cover letter? This cannot be undone."
      );


    if (!confirmed) {
      return;
    }


    setDeleting(
      true
    );


    try {
      await deleteCoverLetterAction(
        coverLetter.id
      );


      router.push(
        "/dashboard/cover-letters"
      );


      router.refresh();
    } finally {
      setDeleting(
        false
      );
    }
  }


  return (
    <div
      className="
        mx-auto
        max-w-[1600px]
        pb-16
      "
    >
      {/* Toolbar */}

      <div
        className="
          mb-6
          flex
          flex-col
          gap-4
          rounded-2xl
          border
          border-white/10
          bg-white/[0.025]
          p-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <Button
            variant="ghost"
            size="icon"
          >
            <Link
              href="/dashboard/cover-letters"
            >
              <ArrowLeft
                className="
                  h-4
                  w-4
                "
              />
            </Link>
          </Button>


          <div>
            <p
              className="
                text-sm
                font-medium
                text-white
              "
            >
              Cover Letter Editor
            </p>


            <SaveStatus
              status={
                status
              }
            />
          </div>
        </div>


        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          <Button
            variant="outline"
            onClick={
              handleDownload
            }
            disabled={
              downloading
            }
          >
            {downloading ? (
              <Loader2
                className="
                  mr-2
                  h-4
                  w-4
                  animate-spin
                "
              />
            ) : (
              <Download
                className="
                  mr-2
                  h-4
                  w-4
                "
              />
            )}

            PDF
          </Button>


          <Button
            variant="destructive"
            onClick={
              handleDelete
            }
            disabled={
              deleting
            }
          >
            <Trash2
              className="
                mr-2
                h-4
                w-4
              "
            />

            Delete
          </Button>
        </div>
      </div>


      <div
        className="
          grid
          gap-6
          xl:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)]
        "
      >
        {/* Editor */}

        <div
          className="
            space-y-6
          "
        >
          <EditorCard
            title="Document"
            description="Name and source resume."
          >
            <Field
              label="Cover letter name"
            >
              <Input
                value={
                  coverLetter.title
                }
                onChange={(
                  value
                ) =>
                  update(
                    "title",
                    value
                  )
                }
                placeholder="Software Engineer — Acme"
              />
            </Field>


            <Field
              label="Source resume"
            >
              <select
                value={
                  coverLetter.resumeId ??
                  ""
                }
                onChange={(
                  event
                ) =>
                  update(
                    "resumeId",
                    event
                      .target
                      .value ||
                      null
                  )
                }
                className="
                  h-11
                  w-full
                  rounded-lg
                  border
                  border-white/10
                  bg-zinc-950
                  px-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  focus:border-purple-500
                "
              >
                <option value="">
                  Select resume
                </option>

                {resumes.map(
                  (resume) => (
                    <option
                      key={
                        resume.id
                      }
                      value={
                        resume.id
                      }
                    >
                      {
                        resume.title
                      }
                    </option>
                  )
                )}
              </select>
            </Field>
          </EditorCard>


          <EditorCard
            title="Target job"
            description="Tell DocuAI which position you're applying for."
          >
            <div
              className="
                grid
                gap-4
                sm:grid-cols-2
              "
            >
              <Field
                label="Job title"
              >
                <Input
                  value={
                    coverLetter.jobTitle
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      "jobTitle",
                      value
                    )
                  }
                  placeholder="Software Engineer"
                />
              </Field>


              <Field
                label="Company"
              >
                <Input
                  value={
                    coverLetter.companyName
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      "companyName",
                      value
                    )
                  }
                  placeholder="Acme Inc."
                />
              </Field>


              <Field
                label="Hiring manager"
              >
                <Input
                  value={
                    coverLetter.recipientName
                  }
                  onChange={(
                    value
                  ) =>
                    update(
                      "recipientName",
                      value
                    )
                  }
                  placeholder="Jane Smith"
                />
              </Field>


              <Field
                label="Letter date"
              >
                <input
                  type="date"
                  value={
                    coverLetter.letterDate
                  }
                  onChange={(
                    event
                  ) =>
                    update(
                      "letterDate",
                      event
                        .target
                        .value
                    )
                  }
                  className="
                    h-11
                    w-full
                    rounded-lg
                    border
                    border-white/10
                    bg-zinc-950
                    px-3
                    text-sm
                    text-white
                    outline-none
                    focus:border-purple-500
                  "
                />
              </Field>
            </div>


            <Field
              label="Company address"
            >
              <Textarea
                value={
                  coverLetter.companyAddress
                }
                onChange={(
                  value
                ) =>
                  update(
                    "companyAddress",
                    value
                  )
                }
                placeholder="Optional company address"
                rows={3}
              />
            </Field>


            <Field
              label="Job description"
            >
              <Textarea
                value={
                  coverLetter.jobDescription
                }
                onChange={(
                  value
                ) =>
                  update(
                    "jobDescription",
                    value
                  )
                }
                placeholder="Paste the job description here. DocuAI will compare it with your selected resume and tailor the letter."
                rows={9}
              />
            </Field>


            {aiError && (
              <div
                className="
                  rounded-lg
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-3
                  text-sm
                  text-red-300
                "
              >
                {aiError}
              </div>
            )}


            <Button
              onClick={
                handleGenerate
              }
              disabled={
                generating ||
                !coverLetter.resumeId
              }
              className="
                w-full
                bg-purple-600
                hover:bg-purple-500
              "
              size="lg"
            >
              {generating ? (
                <Loader2
                  className="
                    mr-2
                    h-4
                    w-4
                    animate-spin
                  "
                />
              ) : (
                <Sparkles
                  className="
                    mr-2
                    h-4
                    w-4
                  "
                />
              )}

              {coverLetter.opening
                ? "Regenerate with AI"
                : "Generate with AI"}
            </Button>
          </EditorCard>


          <EditorCard
            title="Letter content"
            description="AI creates the first draft. You remain in control of the final wording."
          >
            <Field
              label="Opening"
            >
              <Textarea
                value={
                  coverLetter.opening
                }
                onChange={(
                  value
                ) =>
                  update(
                    "opening",
                    value
                  )
                }
                rows={5}
              />
            </Field>


            <Field
              label="Main body"
            >
              <Textarea
                value={
                  coverLetter.body
                }
                onChange={(
                  value
                ) =>
                  update(
                    "body",
                    value
                  )
                }
                rows={10}
              />
            </Field>


            <Field
              label="Closing"
            >
              <Textarea
                value={
                  coverLetter.closing
                }
                onChange={(
                  value
                ) =>
                  update(
                    "closing",
                    value
                  )
                }
                rows={5}
              />
            </Field>


            <Field
              label="Sign-off"
            >
              <Input
                value={
                  coverLetter.signOff
                }
                onChange={(
                  value
                ) =>
                  update(
                    "signOff",
                    value
                  )
                }
                placeholder="Sincerely"
              />
            </Field>
          </EditorCard>


          <EditorCard
            title="Design"
            description="Choose a ready-made professional cover letter."
          >
            <div
              className="
                grid
                gap-3
                sm:grid-cols-3
              "
            >
              {templates.map(
                (template) => {
                  const selected =
                    coverLetter.template ===
                    template.id;


                  const locked =
                    template.premium &&
                    !canUsePremiumTemplates;


                  return (
                    <button
                      key={
                        template.id
                      }
                      type="button"
                      onClick={() => {
                        if (
                          locked
                        ) {
                          router.push(
                            "/pricing"
                          );

                          return;
                        }


                        update(
                          "template",
                          template.id
                        );
                      }}
                      className={`
                        relative
                        rounded-xl
                        border
                        p-4
                        text-left
                        transition

                        ${
                          selected
                            ? `
                              border-purple-500
                              bg-purple-500/10
                            `
                            : `
                              border-white/10
                              bg-zinc-950/50
                              hover:border-white/20
                            `
                        }
                      `}
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <FileText
                          className="
                            h-5
                            w-5
                            text-purple-300
                          "
                        />


                        {selected ? (
                          <Check
                            className="
                              h-4
                              w-4
                              text-purple-300
                            "
                          />
                        ) : locked ? (
                          <Lock
                            className="
                              h-4
                              w-4
                              text-zinc-600
                            "
                          />
                        ) : null}
                      </div>


                      <p
                        className="
                          mt-4
                          text-sm
                          font-semibold
                          text-white
                        "
                      >
                        {
                          template.name
                        }
                      </p>


                      <p
                        className="
                          mt-1
                          text-xs
                          leading-5
                          text-zinc-500
                        "
                      >
                        {
                          template.description
                        }
                      </p>


                      {template.premium && (
                        <p
                          className="
                            mt-3
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-wider
                            text-amber-300
                          "
                        >
                          Pro
                        </p>
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </EditorCard>
        </div>


        {/* Preview */}

        <div
          className="
            xl:sticky
            xl:top-6
            xl:self-start
          "
        >
          <div
            className="
              overflow-auto
              rounded-2xl
              border
              border-white/10
              bg-zinc-900/70
              p-3
              sm:p-6
            "
          >
            <CoverLetterPreview
              coverLetter={
                coverLetter
              }
              resume={
                selectedResume
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}


function EditorCard({
  title,
  description,
  children,
}: {
  title:
    string;

  description:
    string;

  children:
    React.ReactNode;
}) {
  return (
    <section
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.025]
        p-5
        sm:p-6
      "
    >
      <h2
        className="
          font-semibold
          text-white
        "
      >
        {title}
      </h2>


      <p
        className="
          mt-1
          text-sm
          leading-6
          text-zinc-500
        "
      >
        {description}
      </p>


      <div
        className="
          mt-6
          space-y-5
        "
      >
        {children}
      </div>
    </section>
  );
}


function Field({
  label,
  children,
}: {
  label:
    string;

  children:
    React.ReactNode;
}) {
  return (
    <label
      className="
        block
      "
    >
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


function Input({
  value,
  onChange,
  placeholder,
}: {
  value:
    string;

  onChange:
    (
      value:
        string
    ) => void;

  placeholder?:
    string;
}) {
  return (
    <input
      value={value}
      onChange={(
        event
      ) =>
        onChange(
          event.target.value
        )
      }
      placeholder={
        placeholder
      }
      className="
        h-11
        w-full
        rounded-lg
        border
        border-white/10
        bg-zinc-950
        px-3
        text-sm
        text-white
        outline-none
        transition
        placeholder:text-zinc-700
        focus:border-purple-500
      "
    />
  );
}


function Textarea({
  value,
  onChange,
  placeholder,
  rows,
}: {
  value:
    string;

  onChange:
    (
      value:
        string
    ) => void;

  placeholder?:
    string;

  rows:
    number;
}) {
  return (
    <textarea
      value={value}
      onChange={(
        event
      ) =>
        onChange(
          event.target.value
        )
      }
      placeholder={
        placeholder
      }
      rows={rows}
      className="
        w-full
        resize-y
        rounded-lg
        border
        border-white/10
        bg-zinc-950
        px-3
        py-3
        text-sm
        leading-6
        text-white
        outline-none
        transition
        placeholder:text-zinc-700
        focus:border-purple-500
      "
    />
  );
}


function SaveStatus({
  status,
}: {
  status:
    | "saved"
    | "dirty"
    | "saving"
    | "error";
}) {
  switch (status) {
    case "saving":
      return (
        <p
          className="
            mt-1
            text-xs
            text-zinc-500
          "
        >
          Saving…
        </p>
      );


    case "dirty":
      return (
        <p
          className="
            mt-1
            text-xs
            text-amber-400
          "
        >
          Unsaved changes
        </p>
      );


    case "error":
      return (
        <p
          className="
            mt-1
            text-xs
            text-red-400
          "
        >
          Save failed
        </p>
      );


    default:
      return (
        <p
          className="
            mt-1
            text-xs
            text-emerald-400
          "
        >
          Saved
        </p>
      );
  }
}


function toUpdateInput(
  value:
    CoverLetterEditorData
): UpdateCoverLetterInput {
  return {
    title:
      value.title,

    template:
      value.template,

    resumeId:
      value.resumeId,

    recipientName:
      value.recipientName,

    companyName:
      value.companyName,

    jobTitle:
      value.jobTitle,

    companyAddress:
      value.companyAddress,

    jobDescription:
      value.jobDescription,

    letterDate:
      value.letterDate,

    opening:
      value.opening,

    body:
      value.body,

    closing:
      value.closing,

    signOff:
      value.signOff,
  };
}


function sanitizeFilename(
  value:
    string
) {
  return (
    value
      .trim()
      .replace(
        /[^a-zA-Z0-9-_ ]/g,
        ""
      )
      .replace(
        /\s+/g,
        "-"
      ) ||
    "cover-letter"
  );
}