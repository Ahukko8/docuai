import {
  auth,
} from "@clerk/nextjs/server";

import {
  getCoverLetterService,
} from "@/services/cover-letter.service";

import {
  getResumeService,
} from "@/services/resume.service";

import {
  getUserEntitlementsService,
} from "@/services/billing.service";

import {
  renderCoverLetterPdf,
} from "@/lib/pdf/render-cover-letter-pdf";


export const runtime =
  "nodejs";


export const dynamic =
  "force-dynamic";


interface RouteContext {
  params:
    Promise<{
      id: string;
    }>;
}


export async function GET(
  _request:
    Request,
  context:
    RouteContext
) {
  const {
    userId,
  } = await auth();


  if (!userId) {
    return new Response(
      "Unauthorized",
      {
        status:
          401,
      }
    );
  }


  const {
    id,
  } =
    await context.params;


  const coverLetter =
    await getCoverLetterService(
      id,
      userId
    );


  if (!coverLetter) {
    return new Response(
      "Cover letter not found.",
      {
        status:
          404,
      }
    );
  }


  if (
    coverLetter.template !==
    "modern"
  ) {
    const entitlements =
      await getUserEntitlementsService(
        userId
      );


    if (
      !entitlements
        .canUsePremiumTemplates
    ) {
      return new Response(
        "Your current plan does not include this cover letter template.",
        {
          status:
            403,
        }
      );
    }
  }


  const resume =
    coverLetter.resumeId
      ? await getResumeService(
          coverLetter.resumeId,
          userId
        )
      : null;


  try {
    const buffer =
      await renderCoverLetterPdf(
        coverLetter,
        resume
      );


    const bytes =
      new Uint8Array(
        buffer
      );


    const filename =
      createFilename(
        coverLetter.title
      );


    return new Response(
      bytes,
      {
        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            createContentDisposition(
              filename
            ),

          "Content-Length":
            String(
              bytes.byteLength
            ),

          "Cache-Control":
            "private, no-store, max-age=0",

          "X-Content-Type-Options":
            "nosniff",
        },
      }
    );
  } catch (error) {
    console.error(
      "Cover letter PDF generation failed:",
      error
    );


    return new Response(
      "Unable to generate PDF.",
      {
        status:
          500,
      }
    );
  }
}


function createFilename(
  title:
    string
) {
  const cleaned =
    title
      .normalize(
        "NFKD"
      )
      .replace(
        /[^\w\s-]/g,
        ""
      )
      .trim()
      .replace(
        /\s+/g,
        "-"
      )
      .replace(
        /-+/g,
        "-"
      )
      .slice(
        0,
        80
      );


  return `${
    cleaned ||
    "cover-letter"
  }.pdf`;
}


function createContentDisposition(
  filename:
    string
) {
  const ascii =
    filename.replace(
      /[^a-zA-Z0-9._-]/g,
      "-"
    );


  return [
    "attachment",

    `filename="${ascii}"`,

    `filename*=UTF-8''${encodeURIComponent(
      filename
    )}`,
  ].join(
    "; "
  );
}