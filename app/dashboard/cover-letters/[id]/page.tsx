import {
  auth,
} from "@clerk/nextjs/server";

import {
  notFound,
  redirect,
} from "next/navigation";

import {
  getCoverLetterAction,
} from "@/actions/cover-letters/actions";

import {
  getResumesAction,
} from "@/actions/resumes/get";

import {
  getUserEntitlementsService,
} from "@/services/billing.service";

import CoverLetterEditor from "@/components/cover-letter/cover-letter-editor";


interface CoverLetterPageProps {
  params:
    Promise<{
      id: string;
    }>;
}


export default async function CoverLetterPage({
  params,
}: CoverLetterPageProps) {
  const {
    userId,
  } = await auth();


  if (!userId) {
    redirect(
      "/sign-in"
    );
  }


  const {
    id,
  } = await params;


  const [
    coverLetter,
    resumes,
    entitlements,
  ] =
    await Promise.all([
      getCoverLetterAction(
        id
      ),

      getResumesAction(),

      getUserEntitlementsService(
        userId
      ),
    ]);


  if (!coverLetter) {
    notFound();
  }


  return (
    <CoverLetterEditor
      initialCoverLetter={
        coverLetter
      }
      resumes={
        resumes
      }
      canUsePremiumTemplates={
        entitlements
          .canUsePremiumTemplates
      }
    />
  );
}