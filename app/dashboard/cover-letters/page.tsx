import Link from "next/link";

import {
  auth,
} from "@clerk/nextjs/server";

import {
  redirect,
} from "next/navigation";

import {
  ArrowRight,
  FileText,
  Plus,
  Sparkles,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  createBlankCoverLetterAction,
  getCoverLettersAction,
} from "@/actions/cover-letters/actions";


export default async function CoverLettersPage() {
  const {
    userId,
  } = await auth();


  if (!userId) {
    redirect(
      "/sign-in"
    );
  }


  const coverLetters =
    await getCoverLettersAction();


  return (
    <div
      className="
        mx-auto
        max-w-7xl
        pb-16
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-purple-300
            "
          >
            <Sparkles
              className="
                h-4
                w-4
              "
            />

            AI Cover Letters
          </div>


          <h1
            className="
              mt-2
              text-3xl
              font-bold
              tracking-tight
              text-white
              sm:text-4xl
            "
          >
            Cover Letters
          </h1>


          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-zinc-400
            "
          >
            Generate tailored cover
            letters using your existing
            resume and the job
            description.
          </p>
        </div>


        <form
          action={
            createBlankCoverLetterAction
          }
        >
          <Button
            type="submit"
            size="lg"
            className="
              w-full
              bg-purple-600
              hover:bg-purple-500
              sm:w-auto
            "
          >
            <Plus
              className="
                mr-2
                h-4
                w-4
              "
            />

            New Cover Letter
          </Button>
        </form>
      </div>


      {coverLetters.length ===
      0 ? (
        <div
          className="
            mt-10
            flex
            flex-col
            items-center
            justify-center
            rounded-3xl
            border
            border-dashed
            border-white/10
            bg-white/[0.02]
            px-6
            py-20
            text-center
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-purple-500/10
              text-purple-300
            "
          >
            <FileText
              className="
                h-7
                w-7
              "
            />
          </div>


          <h2
            className="
              mt-5
              text-xl
              font-semibold
              text-white
            "
          >
            Create your first
            cover letter
          </h2>


          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-zinc-500
            "
          >
            Select one of your
            resumes, paste the target
            job description, and let
            DocuAI create a tailored
            first draft.
          </p>


          <form
            action={
              createBlankCoverLetterAction
            }
            className="
              mt-6
            "
          >
            <Button
              type="submit"
              className="
                bg-purple-600
                hover:bg-purple-500
              "
            >
              <Plus
                className="
                  mr-2
                  h-4
                  w-4
                "
              />

              Create Cover Letter
            </Button>
          </form>
        </div>
      ) : (
        <div
          className="
            mt-10
            grid
            gap-4
            sm:grid-cols-2
            xl:grid-cols-3
          "
        >
          {coverLetters.map(
            (
              coverLetter
            ) => (
              <Link
                key={
                  coverLetter.id
                }
                href={`/dashboard/cover-letters/${coverLetter.id}`}
                className="
                  group
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.025]
                  p-5
                  transition
                  hover:border-purple-500/30
                  hover:bg-purple-500/[0.04]
                "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-purple-500/10
                      text-purple-300
                    "
                  >
                    <FileText
                      className="
                        h-5
                        w-5
                      "
                    />
                  </div>


                  <ArrowRight
                    className="
                      h-4
                      w-4
                      text-zinc-600
                      transition
                      group-hover:translate-x-1
                      group-hover:text-purple-300
                    "
                  />
                </div>


                <h2
                  className="
                    mt-5
                    truncate
                    font-semibold
                    text-white
                  "
                >
                  {
                    coverLetter.title
                  }
                </h2>


                <p
                  className="
                    mt-2
                    text-sm
                    text-zinc-500
                  "
                >
                  {coverLetter.jobTitle ||
                    "No job selected"}
                </p>


                <p
                  className="
                    mt-1
                    text-xs
                    text-zinc-600
                  "
                >
                  {coverLetter.companyName ||
                    "No company selected"}
                </p>


                <div
                  className="
                    mt-5
                    border-t
                    border-white/10
                    pt-4
                  "
                >
                  <span
                    className="
                      rounded-full
                      bg-white/5
                      px-2.5
                      py-1
                      text-[10px]
                      font-medium
                      capitalize
                      text-zinc-400
                    "
                  >
                    {
                      coverLetter.template
                    }
                  </span>
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}