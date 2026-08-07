"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";

import {
  getPaddleClient,
} from "@/lib/paddle/client";

import {
  pricingTiers,
  type BillingCycle,
  type Tier,
} from "@/lib/pricing/tiers";


interface PricingClientProps {
  countryCode?: string;

  userId?: string;

  email?: string;
}


type PriceMap =
  Record<string, string>;


export default function PricingClient({
  countryCode,
  userId,
  email,
}: PricingClientProps) {
  const [
    billingCycle,
    setBillingCycle,
  ] =
    useState<BillingCycle>(
      "month"
    );


  const [
    prices,
    setPrices,
  ] =
    useState<PriceMap>({});


  const [
    loadingPrices,
    setLoadingPrices,
  ] =
    useState(true);


  const [
    priceError,
    setPriceError,
  ] =
    useState<
      string | null
    >(null);


  const [
    checkoutPriceId,
    setCheckoutPriceId,
  ] =
    useState<
      string | null
    >(null);


  useEffect(() => {
    let cancelled =
      false;


    async function loadPrices() {
      try {
        setLoadingPrices(
          true
        );

        setPriceError(
          null
        );


        const paddle =
          await getPaddleClient();


        if (!paddle) {
          throw new Error(
            "Paddle failed to initialize."
          );
        }


        const items =
          pricingTiers.map(
            (tier) => ({
              priceId:
                tier.priceId[
                  billingCycle
                ],

              quantity: 1,
            })
          );


        /*
         * If Vercel supplied the visitor's
         * ISO country code we use it.
         *
         * Otherwise we omit address entirely
         * so Paddle auto-detects location.
         */
        const result =
          countryCode
            ? await paddle.PricePreview(
                {
                  items,

                  address: {
                    countryCode,
                  },
                }
              )
            : await paddle.PricePreview(
                {
                  items,
                }
              );


        if (cancelled) {
          return;
        }


        const priceMap:
          PriceMap = {};


        for (
          const item of
          result.data.details
            .lineItems
        ) {
          /*
           * IMPORTANT:
           *
           * We use Paddle's already formatted
           * total directly.
           *
           * No Intl.NumberFormat.
           * No division by 100.
           * No currency calculations.
           */
          priceMap[
            item.price.id
          ] =
            item.formattedTotals
              .total;
        }


        setPrices(
          priceMap
        );
      } catch (error) {
        console.error(
          "Unable to preview Paddle prices:",
          error
        );


        if (
          !cancelled
        ) {
          setPriceError(
            error instanceof Error
              ? error.message
              : "Unable to load prices."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingPrices(
            false
          );
        }
      }
    }


    void loadPrices();


    return () => {
      cancelled = true;
    };
  }, [
    billingCycle,
    countryCode,
  ]);


  async function subscribe(
    tier: Tier
  ) {
    const priceId =
      tier.priceId[
        billingCycle
      ];


    try {
      setCheckoutPriceId(
        priceId
      );


      const paddle =
        await getPaddleClient();


      if (!paddle) {
        throw new Error(
          "Paddle failed to initialize."
        );
      }


      paddle.Checkout.open({
        items: [
          {
            priceId,

            quantity: 1,
          },
        ],


        /*
         * Clerk user ID is copied into
         * Paddle custom data so our webhook
         * can map the subscription back to
         * the correct account.
         */
        customData:
          userId
            ? {
                clerk_user_id:
                  userId,

                selected_plan:
                  tier.name,

                billing_cycle:
                  billingCycle,
              }
            : {
                selected_plan:
                  tier.name,

                billing_cycle:
                  billingCycle,
              },


        customer:
          email
            ? {
                email,
              }
            : undefined,


        settings: {
          displayMode:
            "overlay",

          variant:
            "one-page",

          theme: "dark",

          successUrl:
            `${window.location.origin}/welcome`,
        },
      });
    } catch (error) {
      console.error(
        "Paddle checkout:",
        error
      );


      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to open checkout."
      );
    } finally {
      setCheckoutPriceId(
        null
      );
    }
  }


  return (
    <section>
      <div
        className="
          mx-auto
          max-w-3xl
          text-center
        "
      >
        <div
          className="
            mx-auto
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
          <Sparkles className="h-3.5 w-3.5" />

          Build a better resume
        </div>


        <h1
          className="
            mt-6
            text-4xl
            font-bold
            tracking-tight
            sm:text-5xl
          "
        >
          Choose the plan that
          fits your career
        </h1>


        <p
          className="
            mx-auto
            mt-5
            max-w-2xl
            text-base
            leading-7
            text-zinc-400
          "
        >
          Create professional,
          ATS-conscious resumes with
          AI-powered writing and
          polished PDF templates.
        </p>


        {countryCode && (
          <p
            className="
              mt-3
              text-xs
              text-zinc-600
            "
          >
            Prices localized for{" "}
            {countryCode}.
          </p>
        )}
      </div>


      {/* BILLING TOGGLE */}

      <div
        className="
          mt-10
          flex
          justify-center
        "
      >
        <div
          className="
            inline-flex
            rounded-xl
            border
            border-white/10
            bg-white/[0.04]
            p-1
          "
        >
          <button
            type="button"

            onClick={() =>
              setBillingCycle(
                "month"
              )
            }

            className={`
              rounded-lg
              px-5
              py-2
              text-sm
              font-medium
              transition

              ${
                billingCycle ===
                "month"
                  ? "bg-white text-zinc-950"
                  : "text-zinc-400 hover:text-white"
              }
            `}
          >
            Monthly
          </button>


          <button
            type="button"

            onClick={() =>
              setBillingCycle(
                "year"
              )
            }

            className={`
              rounded-lg
              px-5
              py-2
              text-sm
              font-medium
              transition

              ${
                billingCycle ===
                "year"
                  ? "bg-white text-zinc-950"
                  : "text-zinc-400 hover:text-white"
              }
            `}
          >
            Yearly
          </button>
        </div>
      </div>


      {priceError && (
        <div
          className="
            mx-auto
            mt-8
            max-w-2xl
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            p-4
            text-center
            text-sm
            text-red-300
          "
        >
          {priceError}
        </div>
      )}


      {/* PRICING CARDS */}

      <div
        className="
          mt-10
          grid
          gap-6
          lg:grid-cols-3
        "
      >
        {pricingTiers.map(
          (tier) => {
            const priceId =
              tier.priceId[
                billingCycle
              ];


            const price =
              prices[
                priceId
              ];


            const checkingOut =
              checkoutPriceId ===
              priceId;


            return (
              <article
                key={tier.name}

                className={`
                  relative
                  flex
                  flex-col
                  rounded-2xl
                  border
                  p-6

                  ${
                    tier.popular
                      ? "border-purple-500/40 bg-purple-500/[0.07] shadow-xl shadow-purple-950/20"
                      : "border-white/10 bg-white/[0.03]"
                  }
                `}
              >
                {tier.popular && (
                  <span
                    className="
                      absolute
                      -top-3
                      left-1/2
                      -translate-x-1/2
                      rounded-full
                      bg-purple-600
                      px-3
                      py-1
                      text-[11px]
                      font-semibold
                      text-white
                    "
                  >
                    Most popular
                  </span>
                )}


                <h2
                  className="
                    text-xl
                    font-semibold
                  "
                >
                  {tier.name}
                </h2>


                <p
                  className="
                    mt-3
                    min-h-[48px]
                    text-sm
                    leading-6
                    text-zinc-400
                  "
                >
                  {tier.description}
                </p>


                <div className="mt-6">
                  {loadingPrices ? (
                    <div
                      className="
                        flex
                        h-12
                        items-center
                      "
                    >
                      <Loader2
                        className="
                          h-5
                          w-5
                          animate-spin
                          text-zinc-500
                        "
                      />
                    </div>
                  ) : (
                    <>
                      <p
                        className="
                          text-4xl
                          font-bold
                          tracking-tight
                        "
                      >
                        {price ??
                          "Unavailable"}
                      </p>


                      <p
                        className="
                          mt-1
                          text-xs
                          text-zinc-500
                        "
                      >
                        per{" "}
                        {billingCycle ===
                        "month"
                          ? "month"
                          : "year"}
                      </p>
                    </>
                  )}
                </div>


                <ul
                  className="
                    mt-7
                    flex-1
                    space-y-3
                  "
                >
                  {tier.features.map(
                    (feature) => (
                      <li
                        key={feature}

                        className="
                          flex
                          gap-3
                          text-sm
                          text-zinc-300
                        "
                      >
                        <Check
                          className="
                            mt-0.5
                            h-4
                            w-4
                            shrink-0
                            text-emerald-400
                          "
                        />

                        {feature}
                      </li>
                    )
                  )}
                </ul>


                <button
                  type="button"

                  disabled={
                    loadingPrices ||
                    !price ||
                    checkingOut
                  }

                  onClick={() => {
                    void subscribe(
                      tier
                    );
                  }}

                  className={`
                    mt-8
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    rounded-lg
                    px-5
                    text-sm
                    font-semibold
                    transition
                    disabled:cursor-not-allowed
                    disabled:opacity-50

                    ${
                      tier.popular
                        ? "bg-purple-600 text-white hover:bg-purple-500"
                        : "bg-white text-zinc-950 hover:bg-zinc-200"
                    }
                  `}
                >
                  {checkingOut
                    ? "Opening checkout..."
                    : `Subscribe to ${tier.name}`}
                </button>
              </article>
            );
          }
        )}
      </div>


      <p
        className="
          mx-auto
          mt-8
          max-w-2xl
          text-center
          text-xs
          leading-5
          text-zinc-600
        "
      >
        Prices are localized by
        Paddle based on your
        location. Taxes may vary by
        country or region.
      </p>
    </section>
  );
}