"use client";

import {
  initializePaddle,
  type Paddle,
} from "@paddle/paddle-js";


let paddlePromise:
  Promise<Paddle | undefined> | null =
  null;


export function getPaddleClient() {
  if (paddlePromise) {
    return paddlePromise;
  }


  const environment =
    process.env
      .NEXT_PUBLIC_PADDLE_ENVIRONMENT;


  const token =
    process.env
      .NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;


  if (!environment) {
    throw new Error(
      "NEXT_PUBLIC_PADDLE_ENVIRONMENT is missing."
    );
  }


  if (
    environment !== "sandbox" &&
    environment !== "production"
  ) {
    throw new Error(
      "NEXT_PUBLIC_PADDLE_ENVIRONMENT must be either sandbox or production."
    );
  }


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
      "Sandbox Paddle client token must begin with test_."
    );
  }


  if (
    environment === "production" &&
    !token.startsWith("live_")
  ) {
    throw new Error(
      "Production Paddle client token must begin with live_."
    );
  }


  /*
   * Paddle recommends explicitly setting
   * sandbox but allowing production to use
   * the normal live environment.
   */
  paddlePromise =
    environment === "sandbox"
      ? initializePaddle({
          token,

          environment:
            "sandbox",

          eventCallback:
            handlePaddleEvent,
        })
      : initializePaddle({
          token,

          eventCallback:
            handlePaddleEvent,
        });


  return paddlePromise;
}


function handlePaddleEvent(
  event: unknown
) {
  console.log(
    "[Paddle]",
    event
  );
}