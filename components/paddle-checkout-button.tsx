"use client";

import {
  useState,
} from "react";

import {
  initializePaddle,
  type Paddle,
} from "@paddle/paddle-js";

import {
  Crown,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";


interface PaddleCheckoutButtonProps {
  userId: string;

  email: string | null;
}


interface PaddleEventPayload {
  name?: string;

  type?: string;

  code?: string;

  detail?: string;

  documentation_url?: string;

  errors?: Array<{
    field?: string;

    message?: string;
  }>;
}


let paddlePromise:
  Promise<Paddle | undefined> | null =
  null;


function getPaddle() {
  if (paddlePromise) {
    return paddlePromise;
  }


  const token =
    process.env
      .NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;


  const environment =
    process.env
      .NEXT_PUBLIC_PADDLE_ENVIRONMENT;


  if (!token) {
    throw new Error(
      "NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is missing."
    );
  }


  if (
    environment === "sandbox" &&
    !token.startsWith("test_")
  ) {
    throw new Error(
      "The sandbox Paddle client token must begin with test_."
    );
  }


  paddlePromise =
    initializePaddle({
      token,

      environment:
        environment ===
        "production"
          ? "production"
          : "sandbox",

      eventCallback: (
        paddleEvent
      ) => {
        const event =
          paddleEvent as unknown as
            PaddleEventPayload;


        if (
          event.name ===
            "checkout.error" ||
          event.name ===
            "checkout.warning" ||
          event.name ===
            "checkout.payment.error" ||
          event.name ===
            "checkout.payment.failed"
        ) {
          console.error(
            "[Paddle checkout problem]",
            {
              name:
                event.name,

              type:
                event.type,

              code:
                event.code,

              detail:
                event.detail,

              errors:
                event.errors,

              documentationUrl:
                event.documentation_url,
            }
          );

          return;
        }


        console.log(
          "[Paddle checkout event]",
          paddleEvent
        );
      },
    });


  return paddlePromise;
}


export default function PaddleCheckoutButton({
  userId,
  email,
}: PaddleCheckoutButtonProps) {
  const [
    loading,
    setLoading,
  ] = useState(false);


  async function openCheckout() {
    try {
      setLoading(true);


      const priceId =
        process.env
          .NEXT_PUBLIC_PADDLE_PRO_PRICE_ID;


      if (!priceId) {
        throw new Error(
          "NEXT_PUBLIC_PADDLE_PRO_PRICE_ID is missing."
        );
      }


      if (
        !priceId.startsWith(
          "pri_"
        )
      ) {
        throw new Error(
          "The Paddle price ID must begin with pri_. Do not use the product ID."
        );
      }


      const paddle =
        await getPaddle();


      if (!paddle) {
        throw new Error(
          "Paddle failed to initialize."
        );
      }


      console.log(
        "[Paddle checkout configuration]",
        {
          environment:
            process.env
              .NEXT_PUBLIC_PADDLE_ENVIRONMENT,

          priceId,

          tokenPrefix:
            process.env
              .NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
              ?.slice(0, 5),

          hasCustomerEmail:
            Boolean(email),
        }
      );


      paddle.Checkout.open({
        items: [
          {
            priceId,

            quantity: 1,
          },
        ],

        /*
         * Keep Clerk's ID on the Paddle
         * transaction and subscription.
         */
        customData: {
          clerk_user_id:
            userId,
        },

        /*
         * Temporarily do not prefill the
         * customer. This removes invalid
         * customer data as a possible cause.
         */
        settings: {
          displayMode:
            "overlay",

          variant:
            "one-page",

          theme:
            "light",

          locale:
            "en",

          successUrl:
            `${window.location.origin}/dashboard/billing?checkout=success`,
        },
      });
    } catch (error) {
      console.error(
        "[Paddle initialization error]",
        error
      );


      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to open Paddle checkout."
      );
    } finally {
      setLoading(false);
    }
  }


  return (
    <Button
      type="button"

      disabled={loading}

      onClick={() => {
        void openCheckout();
      }}

      className="
        bg-purple-600
        hover:bg-purple-500
      "
    >
      <Crown className="mr-2 h-4 w-4" />

      {loading
        ? "Opening checkout..."
        : "Upgrade to Pro"}
    </Button>
  );
}