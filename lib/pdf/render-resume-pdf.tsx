import "server-only";

import {
  renderToBuffer,
} from "@react-pdf/renderer";

import ResumePdfDocument from "@/components/resume/resume-pdf-document";

import type {
  ResumeEditorData,
} from "@/types/resume";


export async function renderResumePdf(
  resume: ResumeEditorData
) {
  return renderToBuffer(
    <ResumePdfDocument
      resume={resume}
    />
  );
}