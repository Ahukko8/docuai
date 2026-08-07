import {
  headers,
} from "next/headers";

import {
  currentUser,
} from "@clerk/nextjs/server";

import PricingClient from "@/components/pricing-client";


export const dynamic =
  "force-dynamic";


export default async function PricingPage() {
  const [
    requestHeaders,
    user,
  ] =
    await Promise.all([
      headers(),

      currentUser(),
    ]);


  const rawCountry =
    requestHeaders
      .get(
        "x-vercel-ip-country"
      )
      ?.trim()
      .toUpperCase();


  /*
   * Only pass a valid ISO-like
   * two-letter country value.
   *
   * If Vercel doesn't provide it,
   * pass nothing and allow Paddle
   * to detect the visitor via IP.
   */
  const countryCode =
    rawCountry &&
    /^[A-Z]{2}$/.test(
      rawCountry
    )
      ? rawCountry
      : undefined;


  const email =
    user
      ?.primaryEmailAddress
      ?.emailAddress;


  return (
    <main
      className="
        min-h-screen
        bg-zinc-950
        px-5
        py-16
        text-white
        sm:px-8
        lg:px-10
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
        "
      >
        <PricingClient
          countryCode={
            countryCode
          }

          userId={
            user?.id
          }

          email={email}
        />
      </div>
    </main>
  );
}