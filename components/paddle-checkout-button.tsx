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

  email:
    string | null;
}


let paddlePromise:
  Promise<
    Paddle | undefined
  > | null = null;


function getPaddle() {
  if (!paddlePromise) {
    const token =
      process.env
        .NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;


    if (!token) {
      throw new Error(
        "NEXT_PUBLIC_PADDLE_CLIENT_TOKEN is missing."
      );
    }


    paddlePromise =
      initializePaddle({
        token,

        environment:
          process.env
            .NEXT_PUBLIC_PADDLE_ENVIRONMENT ===
          "production"
            ? "production"
            : "sandbox",
      });
  }


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


      const paddle =
        await getPaddle();


      if (!paddle) {
        throw new Error(
          "Unable to initialize Paddle Checkout."
        );
      }


      paddle.Checkout.open({
        items: [
          {
            priceId,

            quantity: 1,
          },
        ],

        customer:
          email
            ? {
                email,
              }
            : undefined,

        customData: {
          clerk_user_id:
            userId,
        },

        settings: {
          displayMode:
            "overlay",

          theme: "dark",

          successUrl:
            `${window.location.origin}/dashboard/billing?checkout=success`,
        },
      });
    } catch (error) {
      console.error(
        "Paddle Checkout:",
        error
      );


      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to open checkout."
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