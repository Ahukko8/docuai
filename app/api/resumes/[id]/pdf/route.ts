import {
  auth,
} from "@clerk/nextjs/server";

import {
  getResumeService,
} from "@/services/resume.service";

import {
  renderResumePdf,
} from "@/lib/pdf/render-resume-pdf";


export const runtime =
  "nodejs";


export const dynamic =
  "force-dynamic";


interface PdfRouteContext {
  params: Promise<{
    id: string;
  }>;
}


export async function GET(
  _request: Request,
  context: PdfRouteContext
) {
  const {
    isAuthenticated,
    userId,
  } = await auth();


  if (
    !isAuthenticated ||
    !userId
  ) {
    return new Response(
      "Unauthorized",
      {
        status: 401,
      }
    );
  }


  const { id } =
    await context.params;


  if (!id) {
    return new Response(
      "Resume ID is required.",
      {
        status: 400,
      }
    );
  }


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


  try {
    const pdfBuffer =
      await renderResumePdf(
        resume
      );


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

          "Cache-Control":
            "private, no-store, max-age=0",
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
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80);


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