import {
  UserProfile,
} from "@clerk/nextjs";

import {
  auth,
} from "@clerk/nextjs/server";

import {
  redirect,
} from "next/navigation";

import Link from "next/link";

import {
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";


export default async function AccountSettingsPage() {
  const {
    userId,
  } = await auth();


  if (!userId) {
    redirect("/sign-in");
  }


  return (
    <div
      className="
        mx-auto
        w-full
        max-w-6xl
        pb-12
      "
    >
      <Link
        href="/dashboard/settings"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-zinc-500
          transition
          hover:text-white
        "
      >
        <ArrowLeft
          className="
            h-4
            w-4
          "
        />

        Back to settings
      </Link>


      <div
        className="
          mt-6
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
          "
        >
          <div
            className="
              mt-1
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-purple-500/10
              text-purple-300
            "
          >
            <ShieldCheck
              className="
                h-5
                w-5
              "
            />
          </div>


          <div>
            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
                text-white
              "
            >
              Account & Security
            </h1>


            <p
              className="
                mt-2
                text-sm
                text-zinc-400
              "
            >
              Manage your DocuAI
              identity, authentication,
              and account security.
            </p>
          </div>
        </div>
      </div>


      <div
        className="
          mt-8
          overflow-x-auto
        "
      >
        <UserProfile
          routing="path"
          path="/dashboard/settings/account"
        />
      </div>
    </div>
  );
}