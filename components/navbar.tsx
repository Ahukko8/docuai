import Link from "next/link";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import {
  FileText,
  LayoutDashboard,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";


export default function Navbar() {
  return (
    <nav
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-white/10
        bg-zinc-950/90
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          gap-4
          px-5
          sm:px-6
          lg:px-8
        "
      >
        {/* ========================= */}
        {/* LOGO */}
        {/* ========================= */}

        <Link
          href="/"
          className="
            flex
            shrink-0
            items-center
            gap-2
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-purple-600
              text-white
              shadow-lg
              shadow-purple-950/30
            "
          >
            <FileText
              className="
                h-4
                w-4
              "
            />
          </div>


          <span
            className="
              text-lg
              font-bold
              tracking-tight
              text-white
              sm:text-xl
            "
          >
            Docu
            <span className="text-purple-400">
              AI
            </span>
          </span>
        </Link>


        {/* ========================= */}
        {/* DESKTOP NAVIGATION */}
        {/* ========================= */}

        <div
          className="
            hidden
            items-center
            gap-7
            md:flex
          "
        >
          <Link
            href="/pricing"
            className="
              text-sm
              font-medium
              text-zinc-400
              transition
              hover:text-white
            "
          >
            Pricing
          </Link>


          <Link
            href="/contact"
            className="
              text-sm
              font-medium
              text-zinc-400
              transition
              hover:text-white
            "
          >
            Contact
          </Link>


          {/* Only visible to authenticated users */}

          <Show when="signed-in">
            <Link
              href="/dashboard/resumes"
              className="
                text-sm
                font-medium
                text-zinc-400
                transition
                hover:text-white
              "
            >
              My Resumes
            </Link>
          </Show>
        </div>


        {/* ========================= */}
        {/* AUTH AREA */}
        {/* ========================= */}

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
          "
        >
          {/* ========================= */}
          {/* SIGNED OUT */}
          {/* ========================= */}

          <Show when="signed-out">
            <SignInButton>
              <Button
                variant="ghost"
                className="
                  hidden
                  text-zinc-300
                  hover:bg-white/5
                  hover:text-white
                  sm:inline-flex
                "
              >
                Log in
              </Button>
            </SignInButton>


            <SignUpButton>
              <Button
                className="
                  bg-purple-600
                  text-white
                  hover:bg-purple-500
                "
              >
                Start Free
              </Button>
            </SignUpButton>
          </Show>


          {/* ========================= */}
          {/* SIGNED IN */}
          {/* ========================= */}

          <Show when="signed-in">
            <div
              className="
                hidden
                items-center
                gap-2
                rounded-full
                border
                border-emerald-500/20
                bg-emerald-500/10
                px-3
                py-1.5
                sm:flex
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-400
                "
              />

              <span
                className="
                  text-xs
                  font-medium
                  text-emerald-300
                "
              >
                Signed in
              </span>
            </div>


            <Button
              className="
                bg-purple-600
                text-white
                hover:bg-purple-500
              "
            >
              <Link href="/dashboard">
                <LayoutDashboard
                  className="
                    mr-2
                    h-4
                    w-4
                  "
                />

                <span className="hidden sm:inline">
                  Dashboard
                </span>

                <span className="sm:hidden">
                  Dashboard
                </span>
              </Link>
            </Button>


            <UserButton
              showName={false}

              appearance={{
                elements: {
                  avatarBox:
                    "h-9 w-9",
                },
              }}
            />
          </Show>
        </div>
      </div>


      {/* ========================= */}
      {/* MOBILE NAVIGATION */}
      {/* ========================= */}

      <div
        className="
          border-t
          border-white/5
          px-5
          py-3
          md:hidden
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            gap-5
            overflow-x-auto
          "
        >
          <Link
            href="/pricing"
            className="
              shrink-0
              text-xs
              font-medium
              text-zinc-400
              transition
              hover:text-white
            "
          >
            Pricing
          </Link>


          <Link
            href="/contact"
            className="
              shrink-0
              text-xs
              font-medium
              text-zinc-400
              transition
              hover:text-white
            "
          >
            Contact
          </Link>


          <Show when="signed-in">
            <Link
              href="/dashboard/resumes"
              className="
                shrink-0
                text-xs
                font-medium
                text-zinc-400
                transition
                hover:text-white
              "
            >
              My Resumes
            </Link>


            <Link
              href="/dashboard/billing"
              className="
                shrink-0
                text-xs
                font-medium
                text-zinc-400
                transition
                hover:text-white
              "
            >
              Billing
            </Link>
          </Show>
        </div>
      </div>
    </nav>
  );
}