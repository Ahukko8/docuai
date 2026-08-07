import Link from "next/link";

import {
  CheckCircle2,
} from "lucide-react";


export default function WelcomePage() {
  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-zinc-950
        px-5
        text-white
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-emerald-500/10
          "
        >
          <CheckCircle2
            className="
              h-7
              w-7
              text-emerald-400
            "
          />
        </div>


        <h1
          className="
            mt-6
            text-3xl
            font-bold
          "
        >
          Welcome!
        </h1>


        <p
          className="
            mt-3
            leading-7
            text-zinc-400
          "
        >
          Your payment was completed
          successfully. Your account
          access will be updated as
          soon as Paddle confirms the
          subscription.
        </p>


        <Link
          href="/dashboard"

          className="
            mt-7
            inline-flex
            h-11
            items-center
            justify-center
            rounded-lg
            bg-purple-600
            px-6
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-purple-500
          "
        >
          Go to dashboard
        </Link>
      </div>
    </main>
  );
}