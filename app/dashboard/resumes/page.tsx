import Link from "next/link";

import {
    getResumesAction,
} from "@/actions/resumes/get";

import {
    createBlankResumeAction,
} from "@/actions/resumes/create";

import DeleteResumeButton from "@/components/delete-resume-button";


export default async function ResumesPage() {
    const resumes =
        await getResumesAction();


    return (
        <div>

            <div className="flex flex-wrap items-center justify-between gap-5">

                <div>

                    <h1 className="text-3xl font-bold">
                        My Resumes
                    </h1>


                    <p className="mt-2 text-sm text-zinc-400">
                        Create and manage your resumes.
                    </p>

                </div>


                <form
                    action={
                        createBlankResumeAction
                    }
                >

                    <button
                        type="submit"
                        className="
              inline-flex
              h-10
              items-center
              justify-center
              rounded-md
              bg-purple-600
              px-4
              text-sm
              font-medium
              text-white
              transition
              hover:bg-purple-500
            "
                    >
                        Create Resume
                    </button>

                </form>

            </div>


            {resumes.length === 0 ? (

                <div className="mt-10 rounded-2xl border border-dashed border-white/10 py-16 text-center">

                    <h2 className="font-medium">
                        No resumes yet
                    </h2>


                    <p className="mt-2 text-sm text-zinc-500">
                        Create your first resume to get started.
                    </p>

                </div>

            ) : (

                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                    {resumes.map(
                        (resume) => (

                            <article
                                key={resume.id}
                                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                "
                            >

                                <h2 className="font-semibold">
                                    {resume.title}
                                </h2>


                                <p className="mt-2 text-xs capitalize text-zinc-500">
                                    {resume.template} template
                                </p>


                                <div className="mt-5 flex items-center gap-2">

                                    <Link
                                        href={`/dashboard/resumes/${resume.id}`}
                                        className="
      inline-flex
      h-9
      items-center
      justify-center
      rounded-md
      border
      border-white/10
      px-3
      text-sm
      font-medium
      transition
      hover:bg-white/10
    "
                                    >
                                        Edit Resume
                                    </Link>


                                    <DeleteResumeButton
                                        resumeId={
                                            resume.id
                                        }
                                        compact
                                    />

                                </div>

                            </article>

                        )
                    )}

                </div>

            )}

        </div>
    );
}