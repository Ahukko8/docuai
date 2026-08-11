import "server-only";

import OpenAI from "openai";


const GROQ_BASE_URL =
  "https://api.groq.com/openai/v1";


let aiClient:
  OpenAI | null = null;


export const RESUME_AI_MODEL =
  process.env.GROQ_MODEL?.trim() ||
  "openai/gpt-oss-20b";


export function getAIClient() {
  if (aiClient) {
    return aiClient;
  }


  const apiKey =
    process.env.GROQ_API_KEY
      ?.trim();


  if (!apiKey) {
    throw new Error(
      "Missing GROQ_API_KEY environment variable."
    );
  }


  aiClient =
    new OpenAI({
      apiKey,

      baseURL:
        GROQ_BASE_URL,
    });


  return aiClient;
}