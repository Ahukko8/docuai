import "server-only";

import OpenAI from "openai";

import {
  env,
} from "@/lib/env";


let client: OpenAI | null =
  null;


export const RESUME_AI_MODEL =
  "gpt-5.6-luna";


export function getOpenAIClient() {
  if (!env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is missing. Add it to .env.local and restart the server."
    );
  }


  if (!client) {
    client = new OpenAI({
      apiKey:
        env.OPENAI_API_KEY,
    });
  }


  return client;
}