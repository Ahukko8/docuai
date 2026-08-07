import "server-only";

import {
  Environment,
  Paddle,
} from "@paddle/paddle-node-sdk";


function requiredEnvironmentVariable(
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


export const paddleServerConfig = {
  apiKey:
    requiredEnvironmentVariable(
      "PADDLE_API_KEY"
    ),

  webhookSecret:
    requiredEnvironmentVariable(
      "PADDLE_WEBHOOK_SECRET"
    ),

  proProductId:
    requiredEnvironmentVariable(
      "PADDLE_PRO_PRODUCT_ID"
    ),

  environment:
    process.env
      .NEXT_PUBLIC_PADDLE_ENVIRONMENT ===
    "production"
      ? Environment.production
      : Environment.sandbox,
};


export const paddleServer =
  new Paddle(
    paddleServerConfig.apiKey,
    {
      environment:
        paddleServerConfig.environment,
    }
  );