import "server-only";

import {
  Environment,
  Paddle,
} from "@paddle/paddle-node-sdk";


function requiredEnv(
  name: string
) {
  const value =
    process.env[name];


  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}`
    );
  }


  return value;
}


const environment =
  requiredEnv(
    "PADDLE_ENVIRONMENT"
  );


if (
  environment !== "sandbox" &&
  environment !== "production"
) {
  throw new Error(
    "PADDLE_ENVIRONMENT must be sandbox or production."
  );
}


const apiKey =
  requiredEnv(
    "PADDLE_API_KEY"
  );


const webhookSecret =
  requiredEnv(
    "PADDLE_WEBHOOK_SECRET"
  );


export const paddleServerConfig = {
  environment,

  apiKey,

  webhookSecret,
};


export const paddleServer =
  new Paddle(
    apiKey,
    {
      environment:
        environment === "sandbox"
          ? Environment.sandbox
          : Environment.production,
    }
  );