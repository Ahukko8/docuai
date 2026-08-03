import "server-only";

import {
  adminClient,
} from "@/lib/supabase/admin";


interface UsageResult {
  allowed: boolean;

  used: number;

  remaining: number;
}


export async function reserveAiGenerationRepository(
  userId: string,
  periodStart: string,
  limit: number
): Promise<UsageResult> {
  const {
    data,
    error,
  } = await adminClient.rpc(
    "reserve_ai_generation",
    {
      p_user_id: userId,

      p_period_start:
        periodStart,

      p_limit: limit,
    }
  );


  if (error) {
    console.error(
      "reserveAiGenerationRepository:",
      error
    );

    throw new Error(
      "Unable to check AI usage."
    );
  }


  const result =
    Array.isArray(data)
      ? data[0]
      : data;


  if (!result) {
    throw new Error(
      "AI usage response was empty."
    );
  }


  return {
    allowed:
      Boolean(result.allowed),

    used:
      Number(result.used),

    remaining:
      Number(result.remaining),
  };
}


export async function refundAiGenerationRepository(
  userId: string,
  periodStart: string
) {
  const {
    error,
  } = await adminClient.rpc(
    "refund_ai_generation",
    {
      p_user_id: userId,

      p_period_start:
        periodStart,
    }
  );


  if (error) {
    console.error(
      "refundAiGenerationRepository:",
      error
    );
  }
}