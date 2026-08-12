import Link from "next/link";

import {
  auth,
  currentUser,
} from "@clerk/nextjs/server";

import {
  redirect,
} from "next/navigation";

import {
  ArrowRight,
  Crown,
  FileSignature,
  FileText,
  LayoutDashboard,
  Plus,
  Settings,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  getResumesAction,
} from "@/actions/resumes/get";

import {
  createBlankResumeAction,
} from "@/actions/resumes/create";

import {
  getUserEntitlementsService,
} from "@/services/billing.service";


export default async function DashboardPage() {
  const {
    userId,
  } = await auth();


  if (!userId) {
    redirect("/sign-in");
  }


  const [
    user,
    resumes,
    entitlements,
  ] = await Promise.all([
    currentUser(),

    getResumesAction(),

    getUserEntitlementsService(
      userId
    ),
  ]);


  if (!user) {
    redirect("/sign-in");
  }


  const firstName =
    user.firstName?.trim() ||
    user.primaryEmailAddress
      ?.emailAddress
      .split("@")[0] ||
    "there";


  const recentResumes =
    resumes.slice(0, 3);


  return (
    <div
      className="
        mx-auto
        w-full
        max-w-7xl
        px-1
        pb-12
      "
    >
      {/* ====================== */}
      {/* WELCOME AREA */}
      {/* ====================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-zinc-950
          px-5
          py-8
          sm:px-8
          sm:py-10
          lg:px-10
        "
      >
        {/* Background glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-24
            h-72
            w-72
            rounded-full
            bg-purple-600/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div
            className="
              max-w-2xl
            "
          >
            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-purple-500/20
                bg-purple-500/10
                px-3
                py-1.5
                text-xs
                font-medium
                text-purple-300
              "
            >
              <LayoutDashboard
                className="
                  h-3.5
                  w-3.5
                "
              />

              Dashboard
            </div>


            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
                text-white
                sm:text-4xl
                lg:text-5xl
              "
            >
              Welcome back,{" "}
              {firstName}
            </h1>


            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-zinc-400
                sm:text-base
                sm:leading-7
              "
            >
              Create, improve, and
              manage professional
              resumes with DocuAI.
              Your work is saved so
              you can continue where
              you left off.
            </p>
          </div>


          <form
            action={
              createBlankResumeAction
            }
            className="
              w-full
              sm:w-auto
            "
          >
            <Button
              type="submit"
              size="lg"
              className="
                h-12
                w-full
                bg-purple-600
                px-6
                text-white
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

              Create Resume
            </Button>
          </form>
        </div>
      </section>


      {/* ====================== */}
      {/* STATS */}
      {/* ====================== */}

      <section
        className="
          mt-6
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatCard
          title="Resumes"
          value={
            String(
              resumes.length
            )
          }
          description="Saved resumes"
          icon={
            <FileText
              className="
                h-5
                w-5
              "
            />
          }
        />


        <StatCard
          title="AI allowance"
          value={
            String(
              entitlements
                .monthlyAiLimit
            )
          }
          description="Improvements per month"
          icon={
            <Sparkles
              className="
                h-5
                w-5
              "
            />
          }
        />


        <StatCard
          title="Current plan"
          value={
            formatPlanName(
              entitlements.plan
            )
          }
          description={
            entitlements
              .hasPaidAccess
              ? "Paid subscription"
              : "Free account"
          }
          icon={
            <Crown
              className="
                h-5
                w-5
              "
            />
          }
        />


        <StatCard
          title="Premium templates"
          value={
            entitlements
              .canUsePremiumTemplates
              ? "Unlocked"
              : "Locked"
          }
          description={
            entitlements
              .canUsePremiumTemplates
              ? "Executive & Creative"
              : "Available with Pro"
          }
          icon={
            <WandSparkles
              className="
                h-5
                w-5
              "
            />
          }
        />
      </section>


      {/* ====================== */}
      {/* MAIN CONTENT */}
      {/* ====================== */}

      <section
        className="
          mt-6
          grid
          gap-6
          lg:grid-cols-[1.5fr_0.8fr]
        "
      >
        {/* Recent resumes */}

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.025]
            p-5
            sm:p-6
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div>
              <h2
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                Your resumes
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-zinc-500
                "
              >
                Continue working on
                your latest resumes.
              </p>
            </div>


            <Button
              variant="ghost"
              size="sm"
              className="
                shrink-0
                text-zinc-300
              "
            >
              <Link
                href="/dashboard/resumes"
              >
                View all

              </Link>
            </Button>
          </div>


          {recentResumes.length > 0 ? (
            <div
              className="
                mt-6
                space-y-3
              "
            >
              {recentResumes.map(
                (resume) => (
                  <Link
                    key={
                      resume.id
                    }
                    href={`/dashboard/resumes/${resume.id}`}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      gap-4
                      rounded-xl
                      border
                      border-white/10
                      bg-zinc-950/50
                      p-4
                      transition
                      hover:border-purple-500/30
                      hover:bg-purple-500/[0.04]
                    "
                  >
                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-3
                      "
                    >
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
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


                      <div
                        className="
                          min-w-0
                        "
                      >
                        <p
                          className="
                            truncate
                            text-sm
                            font-medium
                            text-zinc-200
                          "
                        >
                          {
                            resume.title ||
                            "Untitled Resume"
                          }
                        </p>


                        <p
                          className="
                            mt-1
                            text-xs
                            text-zinc-500
                          "
                        >
                          {formatTemplateName(
                            resume.template
                          )}{" "}
                          template
                        </p>
                      </div>
                    </div>


                    <ArrowRight
                      className="
                        h-4
                        w-4
                        shrink-0
                        text-zinc-600
                        transition
                        group-hover:translate-x-1
                        group-hover:text-purple-300
                      "
                    />
                  </Link>
                )
              )}
            </div>
          ) : (
            <div
              className="
                mt-6
                flex
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-white/10
                px-5
                py-12
                text-center
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-purple-500/10
                  text-purple-300
                "
              >
                <FileText
                  className="
                    h-6
                    w-6
                  "
                />
              </div>


              <h3
                className="
                  mt-4
                  font-semibold
                  text-white
                "
              >
                Create your first resume
              </h3>


              <p
                className="
                  mt-2
                  max-w-sm
                  text-sm
                  leading-6
                  text-zinc-500
                "
              >
                Start with a clean
                resume and use DocuAI
                to improve your
                professional content.
              </p>


              <form
                action={
                  createBlankResumeAction
                }
                className="
                  mt-5
                "
              >
                <Button
                  type="submit"
                  className="
                    bg-purple-600
                    text-white
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

                  Create Resume
                </Button>
              </form>
            </div>
          )}
        </div>


        {/* Quick actions */}

        <div
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.025]
            p-5
            sm:p-6
          "
        >
          <h2
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            Quick actions
          </h2>


          <p
            className="
              mt-1
              text-sm
              text-zinc-500
            "
          >
            Jump directly to the tools
            you need.
          </p>


          <div
            className="
              mt-6
              space-y-3
            "
          >
            <form
              action={
                createBlankResumeAction
              }
            >
              <button
                type="submit"
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-white/10
                  bg-zinc-950/50
                  p-4
                  text-left
                  transition
                  hover:border-purple-500/30
                  hover:bg-purple-500/[0.04]
                "
              >
                <QuickIcon>
                  <Plus
                    className="
                      h-4
                      w-4
                    "
                  />
                </QuickIcon>


                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <p
                    className="
                      text-sm
                      font-medium
                      text-zinc-200
                    "
                  >
                    New resume
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-zinc-500
                    "
                  >
                    Start from scratch
                  </p>
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
              </button>
            </form>


            <QuickAction
              href="/dashboard/resumes"
              title="Manage resumes"
              description="View and edit saved resumes"
              icon={
                <FileText
                  className="
                    h-4
                    w-4
                  "
                />
              }
            />


            <QuickAction
              href="/dashboard/cover-letters"
              title="Cover letters"
              description="Create and manage cover letters"
              icon={
                <FileSignature
                  className="
                    h-4
                    w-4
                  "
                />
              }
            />

            <QuickAction
              href="/dashboard/billing"
              title="Billing & plan"
              description="Manage your subscription"
              icon={
                <Crown
                  className="
                    h-4
                    w-4
                  "
                />
              }
            />




            <QuickAction
              href="/dashboard/settings"
              title="Settings"
              description="Account and security"
              icon={
                <Settings
                  className="
                    h-4
                    w-4
                  "
                />
              }
            />
          </div>
        </div>
      </section>


      {/* ====================== */}
      {/* COVER LETTER PREVIEW */}
      {/* ====================== */}

      <section
        className="
          mt-6
          overflow-hidden
          rounded-2xl
          border
          border-purple-500/20
          bg-gradient-to-br
          from-purple-500/[0.08]
          to-transparent
          p-6
          sm:p-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div
            className="
              max-w-2xl
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                text-xs
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

              New feature
            </div>


            <h2
              className="
                mt-3
                text-xl
                font-semibold
                text-white
                sm:text-2xl
              "
            >
              AI Cover Letters
            </h2>


            <p
              className="
                mt-3
                text-sm
                leading-6
                text-zinc-400
              "
            >
              Our next milestone has been acheived! You can now
              add personalized cover
              letters with professional
              templates, AI writing,
              autosave, editing, and
              PDF export.
            </p>
          </div>


          <div
            className="
              inline-flex
              w-fit
              rounded-full
              border
              border-purple-500/20
              bg-purple-500/10
              px-4
              py-2
              text-xs
              font-medium
              text-purple-300
            "
          >
            Cover letters are in beta. We would love your feedback!
          </div>
        </div>
      </section>
    </div>
  );
}


function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.025]
        p-5
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
        <div>
          <p
            className="
              text-sm
              text-zinc-500
            "
          >
            {title}
          </p>


          <p
            className="
              mt-3
              text-2xl
              font-bold
              tracking-tight
              text-white
            "
          >
            {value}
          </p>


          <p
            className="
              mt-1
              text-xs
              text-zinc-600
            "
          >
            {description}
          </p>
        </div>


        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-purple-500/10
            text-purple-300
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
}


function QuickAction({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-white/10
        bg-zinc-950/50
        p-4
        transition
        hover:border-purple-500/30
        hover:bg-purple-500/[0.04]
      "
    >
      <QuickIcon>
        {icon}
      </QuickIcon>


      <div
        className="
          min-w-0
          flex-1
        "
      >
        <p
          className="
            text-sm
            font-medium
            text-zinc-200
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            text-xs
            text-zinc-500
          "
        >
          {description}
        </p>
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
    </Link>
  );
}


function QuickIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-lg
        bg-purple-500/10
        text-purple-300
      "
    >
      {children}
    </div>
  );
}


function formatPlanName(
  plan:
    | "free"
    | "starter"
    | "pro"
    | "advanced"
) {
  switch (plan) {
    case "starter":
      return "Starter";

    case "pro":
      return "Pro";

    case "advanced":
      return "Advanced";

    default:
      return "Free";
  }
}


function formatTemplateName(
  template:
    | "modern"
    | "executive"
    | "creative"
) {
  switch (template) {
    case "executive":
      return "Executive";

    case "creative":
      return "Creative";

    default:
      return "Modern";
  }
}