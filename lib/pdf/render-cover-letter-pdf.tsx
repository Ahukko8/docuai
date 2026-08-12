import "server-only";

import {
  renderToBuffer,
} from "@react-pdf/renderer";

import CoverLetterPdfDocument from "@/components/cover-letter/cover-letter-pdf-document";

import type {
  CoverLetterEditorData,
} from "@/types/cover-letter";

import type {
  ResumeEditorData,
} from "@/types/resume";


export async function renderCoverLetterPdf(
  coverLetter:
    CoverLetterEditorData,
  resume:
    ResumeEditorData | null
) {
  return renderToBuffer(
    <CoverLetterPdfDocument
      coverLetter={
        coverLetter
      }
      resume={
        resume
      }
    />
  );
}