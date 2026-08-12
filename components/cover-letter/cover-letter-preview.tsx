import type {
  CoverLetterEditorData,
} from "@/types/cover-letter";

import type {
  ResumeEditorData,
} from "@/types/resume";


interface CoverLetterPreviewProps {
  coverLetter:
    CoverLetterEditorData;

  resume:
    ResumeEditorData | null;
}


export default function CoverLetterPreview({
  coverLetter,
  resume,
}: CoverLetterPreviewProps) {
  switch (
    coverLetter.template
  ) {
    case "executive":
      return (
        <ExecutiveTemplate
          coverLetter={
            coverLetter
          }
          resume={resume}
        />
      );


    case "professional":
      return (
        <ProfessionalTemplate
          coverLetter={
            coverLetter
          }
          resume={resume}
        />
      );


    default:
      return (
        <ModernTemplate
          coverLetter={
            coverLetter
          }
          resume={resume}
        />
      );
  }
}


function ModernTemplate({
  coverLetter,
  resume,
}: CoverLetterPreviewProps) {
  return (
    <Paper>
      <header
        className="
          bg-slate-900
          px-8
          py-9
          text-white
          sm:px-12
        "
      >
        <div
          className="
            h-1
            w-12
            rounded-full
            bg-indigo-500
          "
        />


        <h1
          className="
            mt-5
            text-3xl
            font-bold
            tracking-tight
          "
        >
          {getSenderName(
            resume
          )}
        </h1>


        <SenderContact
          resume={resume}
          className="
            mt-3
            text-slate-300
          "
        />
      </header>


      <LetterBody
        coverLetter={
          coverLetter
        }
        resume={resume}
        accentClass="text-indigo-600"
      />
    </Paper>
  );
}


function ExecutiveTemplate({
  coverLetter,
  resume,
}: CoverLetterPreviewProps) {
  return (
    <Paper
      className="
        bg-[#fffefc]
      "
    >
      <div
        className="
          px-8
          py-10
          sm:px-12
        "
      >
        <header
          className="
            border-y
            border-[#9A6A38]
            py-7
            text-center
          "
        >
          <h1
            className="
              font-serif
              text-3xl
              font-semibold
              tracking-wide
              text-stone-900
            "
          >
            {getSenderName(
              resume
            )}
          </h1>


          <SenderContact
            resume={resume}
            className="
              mt-3
              justify-center
              text-stone-500
            "
          />
        </header>


        <LetterBody
          coverLetter={
            coverLetter
          }
          resume={resume}
          accentClass="text-[#9A6A38]"
          executive
        />
      </div>
    </Paper>
  );
}


function ProfessionalTemplate({
  coverLetter,
  resume,
}: CoverLetterPreviewProps) {
  return (
    <Paper>
      <div
        className="
          flex
          min-h-[1123px]
        "
      >
        <div
          className="
            w-3
            shrink-0
            bg-blue-700
          "
        />


        <div
          className="
            flex-1
            px-8
            py-10
            sm:px-12
          "
        >
          <header
            className="
              border-b
              border-zinc-200
              pb-6
            "
          >
            <h1
              className="
                text-3xl
                font-extrabold
                tracking-tight
                text-zinc-900
              "
            >
              {getSenderName(
                resume
              )}
            </h1>


            <div
              className="
                mt-2
                h-1
                w-10
                rounded-full
                bg-blue-700
              "
            />


            <SenderContact
              resume={resume}
              className="
                mt-4
                text-zinc-500
              "
            />
          </header>


          <LetterBody
            coverLetter={
              coverLetter
            }
            resume={resume}
            accentClass="text-blue-700"
          />
        </div>
      </div>
    </Paper>
  );
}


function LetterBody({
  coverLetter,
  resume,
  accentClass,
  executive = false,
}: CoverLetterPreviewProps & {
  accentClass:
    string;

  executive?:
    boolean;
}) {
  return (
    <main
      className={`
        px-8
        py-9
        sm:px-12
        ${
          executive
            ? "px-0 sm:px-0"
            : ""
        }
      `}
    >
      <p
        className="
          text-[11px]
          text-zinc-500
        "
      >
        {formatLetterDate(
          coverLetter.letterDate
        )}
      </p>


      <div
        className="
          mt-7
          text-[11px]
          leading-5
          text-zinc-700
        "
      >
        {coverLetter
          .recipientName && (
          <p
            className="
              font-semibold
              text-zinc-900
            "
          >
            {
              coverLetter
                .recipientName
            }
          </p>
        )}


        {coverLetter
          .companyName && (
          <p>
            {
              coverLetter
                .companyName
            }
          </p>
        )}


        {coverLetter
          .companyAddress && (
          <p
            className="
              whitespace-pre-line
            "
          >
            {
              coverLetter
                .companyAddress
            }
          </p>
        )}
      </div>


      {coverLetter
        .jobTitle && (
        <p
          className={`
            mt-7
            text-[11px]
            font-bold
            ${accentClass}
          `}
        >
          Re:{" "}
          {
            coverLetter
              .jobTitle
          }
        </p>
      )}


      <p
        className="
          mt-7
          text-[11px]
          leading-[1.75]
          text-zinc-800
        "
      >
        Dear{" "}
        {coverLetter
          .recipientName ||
          "Hiring Manager"}
        ,
      </p>


      <Paragraph
        value={
          coverLetter.opening
        }
      />


      <Paragraph
        value={
          coverLetter.body
        }
      />


      <Paragraph
        value={
          coverLetter.closing
        }
      />


      <div
        className="
          mt-8
          text-[11px]
          leading-6
          text-zinc-800
        "
      >
        <p>
          {coverLetter
            .signOff ||
            "Sincerely"}
          ,
        </p>


        <p
          className="
            mt-4
            font-semibold
            text-zinc-900
          "
        >
          {getSenderName(
            resume
          )}
        </p>
      </div>
    </main>
  );
}


function Paragraph({
  value,
}: {
  value: string;
}) {
  if (!value) {
    return null;
  }


  return (
    <div
      className="
        mt-5
        whitespace-pre-line
        text-[11px]
        leading-[1.75]
        text-zinc-700
      "
    >
      {value}
    </div>
  );
}


function SenderContact({
  resume,
  className,
}: {
  resume:
    ResumeEditorData | null;

  className:
    string;
}) {
  const personalInfo =
    getPersonalInfo(
      resume
    );


  if (!personalInfo) {
    return null;
  }


  const values = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
  ]
    .map(
      (value) =>
        value?.trim()
    )
    .filter(
      (
        value
      ): value is string =>
        Boolean(value)
    );


  if (
    values.length ===
    0
  ) {
    return null;
  }


  return (
    <div
      className={`
        flex
        flex-wrap
        gap-x-2
        gap-y-1
        text-[9px]
        ${className}
      `}
    >
      {values.map(
        (
          value,
          index
        ) => (
          <span
            key={`${value}-${index}`}
          >
            {index > 0 &&
              " • "}

            {value}
          </span>
        )
      )}
    </div>
  );
}

function Paper({
  children,
  className = "",
}: {
  children:
    React.ReactNode;

  className?:
    string;
}) {
  return (
    <div
      className={`
        mx-auto
        min-h-[1123px]
        w-full
        max-w-[794px]
        overflow-hidden
        bg-white
        text-zinc-900
        shadow-[0_24px_80px_rgba(0,0,0,0.25)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}


function getSenderName(
  resume:
    ResumeEditorData | null
) {
  const personalInfo =
    getPersonalInfo(
      resume
    );


  return (
    personalInfo
      ?.name
      ?.trim() ||
    "Your Name"
  );
} 


function getPersonalInfo(
  resume:
    ResumeEditorData | null
) {
  if (!resume) {
    return null;
  }



  const possibleResume =
    resume as ResumeEditorData & {
      personal_info?:
        Partial<
          ResumeEditorData[
            "personalInfo"
          ]
        >;

      personalInfo?:
        Partial<
          ResumeEditorData[
            "personalInfo"
          ]
        >;
    };


  return (
    possibleResume
      .personalInfo ??
    possibleResume
      .personal_info ??
    null
  );
}

function formatLetterDate(
  value: string
) {
  if (!value) {
    return "";
  }

  const date =
    new Date(
      `${value}T00:00:00Z`
    );

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }
  ).format(date);
}