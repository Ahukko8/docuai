import {
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";

import type {
  CoverLetterEditorData,
} from "@/types/cover-letter";

import type {
  ResumeEditorData,
} from "@/types/resume";


interface Props {
  coverLetter:
    CoverLetterEditorData;

  resume:
    ResumeEditorData | null;
}


export default function CoverLetterPdfDocument({
  coverLetter,
  resume,
}: Props) {
  switch (
    coverLetter.template
  ) {
    case "executive":
      return (
        <ExecutivePdf
          coverLetter={
            coverLetter
          }
          resume={resume}
        />
      );


    case "professional":
      return (
        <ProfessionalPdf
          coverLetter={
            coverLetter
          }
          resume={resume}
        />
      );


    default:
      return (
        <ModernPdf
          coverLetter={
            coverLetter
          }
          resume={resume}
        />
      );
  }
}


function ModernPdf({
  coverLetter,
  resume,
}: Props) {
  return (
    <Document>
      <Page
        size="A4"
        wrap
        style={{
          fontFamily:
            "Helvetica",

          backgroundColor:
            "#FFFFFF",

          color:
            "#27272A",

          fontSize:
            10,
        }}
      >
        <View
          style={{
            backgroundColor:
              "#111827",

            paddingHorizontal:
              38,

            paddingVertical:
              31,
          }}
        >
          <View
            style={{
              width: 34,

              height: 3,

              backgroundColor:
                "#6366F1",

              marginBottom:
                15,
            }}
          />


          <Text
            style={{
              color:
                "#FFFFFF",

              fontFamily:
                "Helvetica-Bold",

              fontSize:
                25,
            }}
          >
            {getSenderName(
              resume
            )}
          </Text>


          <PdfContact
            resume={resume}
            color="#CBD5E1"
          />
        </View>


        <PdfLetterBody
          coverLetter={
            coverLetter
          }
          resume={resume}
          accent="#4F46E5"
        />
      </Page>
    </Document>
  );
}


function ExecutivePdf({
  coverLetter,
  resume,
}: Props) {
  return (
    <Document>
      <Page
        size="A4"
        wrap
        style={{
          fontFamily:
            "Helvetica",

          backgroundColor:
            "#FFFEFC",

          paddingHorizontal:
            42,

          paddingVertical:
            36,

          color:
            "#1C1917",

          fontSize:
            10,
        }}
      >
        <View
          style={{
            borderTopWidth:
              1,

            borderBottomWidth:
              1,

            borderColor:
              "#9A6A38",

            paddingVertical:
              20,

            alignItems:
              "center",
          }}
        >
          <Text
            style={{
              fontFamily:
                "Times-Roman",

              fontSize:
                27,
            }}
          >
            {getSenderName(
              resume
            )}
          </Text>


          <PdfContact
            resume={resume}
            color="#78716C"
            centered
          />
        </View>


        <PdfLetterBody
          coverLetter={
            coverLetter
          }
          resume={resume}
          accent="#9A6A38"
          noHorizontalPadding
        />
      </Page>
    </Document>
  );
}


function ProfessionalPdf({
  coverLetter,
  resume,
}: Props) {
  return (
    <Document>
      <Page
        size="A4"
        wrap
        style={{
          fontFamily:
            "Helvetica",

          backgroundColor:
            "#FFFFFF",

          color:
            "#27272A",

          fontSize:
            10,
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

            width: 10,

            backgroundColor:
              "#1D4ED8",
          }}
        />


        <View
          style={{
            paddingHorizontal:
              42,

            paddingTop:
              38,
          }}
        >
          <Text
            style={{
              fontFamily:
                "Helvetica-Bold",

              fontSize:
                26,
            }}
          >
            {getSenderName(
              resume
            )}
          </Text>


          <View
            style={{
              marginTop: 8,

              width: 30,

              height: 3,

              backgroundColor:
                "#1D4ED8",
            }}
          />


          <PdfContact
            resume={resume}
            color="#71717A"
          />


          <View
            style={{
              marginTop: 18,

              borderBottomWidth:
                1,

              borderBottomColor:
                "#E4E4E7",
            }}
          />
        </View>


        <PdfLetterBody
          coverLetter={
            coverLetter
          }
          resume={resume}
          accent="#1D4ED8"
        />
      </Page>
    </Document>
  );
}


function PdfLetterBody({
  coverLetter,
  resume,
  accent,
  noHorizontalPadding =
    false,
}: Props & {
  accent:
    string;

  noHorizontalPadding?:
    boolean;
}) {
  return (
    <View
      style={{
        paddingTop:
          27,

        paddingBottom:
          40,

        paddingHorizontal:
          noHorizontalPadding
            ? 0
            : 42,
      }}
    >
      <Text
        style={{
          fontSize: 9,

          color:
            "#71717A",
        }}
      >
        {formatLetterDate(
          coverLetter.letterDate
        )}
      </Text>


      <View
        style={{
          marginTop: 20,
        }}
      >
        {coverLetter
          .recipientName && (
          <Text
            style={{
              fontFamily:
                "Helvetica-Bold",

              fontSize:
                9.5,
            }}
          >
            {
              coverLetter
                .recipientName
            }
          </Text>
        )}


        {coverLetter
          .companyName && (
          <Text
            style={{
              marginTop: 2,

              fontSize:
                9.5,
            }}
          >
            {
              coverLetter
                .companyName
            }
          </Text>
        )}


        {coverLetter
          .companyAddress && (
          <Text
            style={{
              marginTop: 2,

              fontSize:
                9.5,

              lineHeight:
                1.45,
            }}
          >
            {
              coverLetter
                .companyAddress
            }
          </Text>
        )}
      </View>


      {coverLetter
        .jobTitle && (
        <Text
          style={{
            marginTop: 20,

            color:
              accent,

            fontFamily:
              "Helvetica-Bold",

            fontSize:
              9.5,
          }}
        >
          Re:{" "}
          {
            coverLetter
              .jobTitle
          }
        </Text>
      )}


      <Text
        style={{
          marginTop: 22,

          fontSize:
            10,

          lineHeight:
            1.55,
        }}
      >
        Dear{" "}
        {coverLetter
          .recipientName ||
          "Hiring Manager"}
        ,
      </Text>


      <PdfParagraph
        value={
          coverLetter.opening
        }
      />


      <PdfParagraph
        value={
          coverLetter.body
        }
      />


      <PdfParagraph
        value={
          coverLetter.closing
        }
      />


      <View
        style={{
          marginTop: 24,
        }}
      >
        <Text
          style={{
            fontSize: 10,
          }}
        >
          {coverLetter
            .signOff ||
            "Sincerely"}
          ,
        </Text>


        <Text
          style={{
            marginTop: 20,

            fontFamily:
              "Helvetica-Bold",

            fontSize:
              10,
          }}
        >
          {getSenderName(
            resume
          )}
        </Text>
      </View>
    </View>
  );
}


function PdfParagraph({
  value,
}: {
  value:
    string;
}) {
  if (!value) {
    return null;
  }


  return (
    <Text
      style={{
        marginTop: 15,

        fontSize:
          10,

        lineHeight:
          1.58,

        color:
          "#3F3F46",
      }}
    >
      {value}
    </Text>
  );
}


function PdfContact({
  resume,
  color,
  centered =
    false,
}: {
  resume:
    ResumeEditorData | null;

  color:
    string;

  centered?:
    boolean;
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
    <Text
      style={{
        marginTop:
          10,

        fontSize:
          7.8,

        color,

        lineHeight:
          1.45,

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

function formatLetterDate(
  value:
    string
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


  return new Intl
    .DateTimeFormat(
      "en",
      {
        day:
          "numeric",

        month:
          "long",

        year:
          "numeric",

        timeZone:
          "UTC",
      }
    )
    .format(date);
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