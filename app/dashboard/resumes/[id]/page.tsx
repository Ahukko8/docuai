import {
  auth,
} from "@clerk/nextjs/server";

import {
  notFound,
  redirect,
} from "next/navigation";

import {
  getResumeAction,
} from "@/actions/resumes/get-one";

import ResumeEditor from "@/components/resume-editor";

import {
  getUserEntitlementsService,
} from "@/services/billing.service";


interface EditResumePageProps {
  params:
  Promise<{
    id: string;
  }>;
}


export default async function EditResumePage({
  params,
}: EditResumePageProps) {
  const {
    userId,
  } = await auth();


  if (!userId) {
    redirect("/");
  }


  const {
    id,
  } = await params;


  const [
    resume,
    entitlements,
  ] = await Promise.all([
    getResumeAction(id),

    getUserEntitlementsService(
      userId
    ),
  ]);


  if (!resume) {
    notFound();
  }


  return (
    <div className="mx-auto max-w-[1600px]">

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Edit Resume
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Build, improve and export your professional resume.
        </p>
      </div>


      <ResumeEditor
        initialResume={resume}

        hasProAccess={
          entitlements
            .hasProAccess
        }
      />

    </div>
  );
}