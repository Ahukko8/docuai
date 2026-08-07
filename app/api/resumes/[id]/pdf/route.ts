import {
  auth,
} from "@clerk/nextjs/server";

import {
  getResumeService,
} from "@/services/resume.service";

import {
  renderResumePdf,
} from "@/lib/pdf/render-resume-pdf";

import {
  assertTemplateAccessService,
} from "@/services/billing.service";


export const runtime =
  "nodejs";


export const dynamic =
  "force-dynamic";


interface PdfRouteContext {
  params:
    Promise<{
      id: string;
    }>;
}


export async function GET(
  _request: Request,
  context: PdfRouteContext
) {
  /*
   * Authentication is always checked
   * server-side.
   */
  const {
    userId,
  } = await auth();


  if (!userId) {
    return new Response(
      "Unauthorized",
      {
        status: 401,
      }
    );
  }


  const {
    id,
  } =
    await context.params;


  if (!id) {
    return new Response(
      "Resume ID is required.",
      {
        status: 400,
      }
    );
  }


  /*
   * getResumeService must query using BOTH:
   *
   * resume ID
   * Clerk user ID
   *
   * so one user cannot download another
   * user's resume.
   */
  const resume =
    await getResumeService(
      id,
      userId
    );


  if (!resume) {
    return new Response(
      "Resume not found.",
      {
        status: 404,
      }
    );
  }


  /*
   * Premium access is checked again here.
   *
   * Never rely only on hiding templates
   * in the browser.
   */
  try {
    await assertTemplateAccessService(
      userId,
      resume.template
    );
  } catch {
    return new Response(
      "Your current plan does not include this resume template.",
      {
        status: 403,
      }
    );
  }


  try {
    const pdfBuffer =
      await renderResumePdf(
        resume
      );


    /*
     * Response accepts Uint8Array cleanly
     * in Next.js Route Handlers.
     */
    const pdfBytes =
      new Uint8Array(
        pdfBuffer
      );


    const filename =
      createFilename(
        resume.title
      );


    return new Response(
      pdfBytes,
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            createContentDisposition(
              filename
            ),

          "Content-Length":
            String(
              pdfBytes.byteLength
            ),

          /*
           * Resume PDFs contain private
           * user data and should not be
           * cached by shared infrastructure.
           */
          "Cache-Control":
            "private, no-store, max-age=0",

          "X-Content-Type-Options":
            "nosniff",
        },
      }
    );
  } catch (error) {
    console.error(
      "PDF generation failed:",
      error
    );


    return new Response(
      "Unable to generate the PDF.",
      {
        status: 500,
      }
    );
  }
}


function createFilename(
  title: string
) {
  const cleaned =
    title
      .normalize("NFKD")
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
    cleaned || "resume"
  }.pdf`;
}


function createContentDisposition(
  filename: string
) {
  const asciiFilename =
    filename.replace(
      /[^a-zA-Z0-9._-]/g,
      "-"
    );


  return [
    "attachment",

    `filename="${asciiFilename}"`,

    `filename*=UTF-8''${encodeURIComponent(
      filename
    )}`,
  ].join("; ");
}