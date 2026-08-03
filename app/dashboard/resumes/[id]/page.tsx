import {
  notFound
} from "next/navigation";

import {
  getResumeAction
} from "@/actions/resumes/get-one";

import ResumeEditor from "@/components/resume-editor";


interface EditResumePageProps {
  params: Promise<{
    id: string;
  }>;
}


export default async function EditResumePage({
  params,
}: EditResumePageProps) {
  const { id } =
    await params;


  const resume =
    await getResumeAction(id);


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
          Build and preview your resume.
        </p>

      </div>


      <ResumeEditor
        initialResume={resume}
      />

    </div>
  );
}