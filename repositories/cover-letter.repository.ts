import "server-only";

import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

import type {
  CoverLetterEditorData,
  CoverLetterTemplate,
  UpdateCoverLetterInput,
} from "@/types/cover-letter";


interface CoverLetterRow {
  id: string;

  user_id: string;

  resume_id:
    string | null;

  title: string;

  template:
    CoverLetterTemplate;

  recipient_name:
    string;

  company_name:
    string;

  job_title:
    string;

  company_address:
    string;

  job_description:
    string;

  letter_date:
    string;

  opening:
    string;

  body:
    string;

  closing:
    string;

  sign_off:
    string;

  created_at:
    string;

  updated_at:
    string;
}


let adminClient:
  SupabaseClient | null = null;


function getAdminClient() {
  if (adminClient) {
    return adminClient;
  }


  const url =
    process.env
      .NEXT_PUBLIC_SUPABASE_URL;


  const serviceRoleKey =
    process.env
      .SUPABASE_SERVICE_ROLE_KEY;


  if (!url) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL."
    );
  }


  if (!serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY."
    );
  }


  adminClient =
    createClient(
      url,
      serviceRoleKey,
      {
        auth: {
          persistSession:
            false,

          autoRefreshToken:
            false,
        },
      }
    );


  return adminClient;
}


export async function createCoverLetterRepository(
  userId: string
) {
  const supabase =
    getAdminClient();


  const {
    data,
    error,
  } =
    await supabase
      .from(
        "cover_letters"
      )
      .insert({
        user_id:
          userId,

        title:
          "Untitled Cover Letter",

        template:
          "modern",

        letter_date:
          getToday(),
      })
      .select("*")
      .single();


  if (error) {
    throw new Error(
      `Unable to create cover letter: ${error.message}`
    );
  }


  return mapRow(
    data as CoverLetterRow
  );
}


export async function listCoverLettersRepository(
  userId: string
) {
  const supabase =
    getAdminClient();


  const {
    data,
    error,
  } =
    await supabase
      .from(
        "cover_letters"
      )
      .select("*")
      .eq(
        "user_id",
        userId
      )
      .order(
        "updated_at",
        {
          ascending:
            false,
        }
      );


  if (error) {
    throw new Error(
      `Unable to load cover letters: ${error.message}`
    );
  }


  return (
    data ?? []
  ).map(
    (row) =>
      mapRow(
        row as CoverLetterRow
      )
  );
}


export async function getCoverLetterRepository(
  id: string,
  userId: string
) {
  const supabase =
    getAdminClient();


  const {
    data,
    error,
  } =
    await supabase
      .from(
        "cover_letters"
      )
      .select("*")
      .eq(
        "id",
        id
      )
      .eq(
        "user_id",
        userId
      )
      .maybeSingle();


  if (error) {
    throw new Error(
      `Unable to load cover letter: ${error.message}`
    );
  }


  if (!data) {
    return null;
  }


  return mapRow(
    data as CoverLetterRow
  );
}


export async function updateCoverLetterRepository(
  id: string,
  userId: string,
  input:
    UpdateCoverLetterInput
) {
  const supabase =
    getAdminClient();


  const {
    data,
    error,
  } =
    await supabase
      .from(
        "cover_letters"
      )
      .update({
        title:
          input.title,

        template:
          input.template,

        resume_id:
          input.resumeId,

        recipient_name:
          input.recipientName,

        company_name:
          input.companyName,

        job_title:
          input.jobTitle,

        company_address:
          input.companyAddress,

        job_description:
          input.jobDescription,

        letter_date:
          input.letterDate ||
          getToday(),

        opening:
          input.opening,

        body:
          input.body,

        closing:
          input.closing,

        sign_off:
          input.signOff,

        updated_at:
          new Date()
            .toISOString(),
      })
      .eq(
        "id",
        id
      )
      .eq(
        "user_id",
        userId
      )
      .select("*")
      .maybeSingle();


  if (error) {
    throw new Error(
      `Unable to save cover letter: ${error.message}`
    );
  }


  if (!data) {
    throw new Error(
      "Cover letter not found."
    );
  }


  return mapRow(
    data as CoverLetterRow
  );
}


export async function deleteCoverLetterRepository(
  id: string,
  userId: string
) {
  const supabase =
    getAdminClient();


  const {
    error,
  } =
    await supabase
      .from(
        "cover_letters"
      )
      .delete()
      .eq(
        "id",
        id
      )
      .eq(
        "user_id",
        userId
      );


  if (error) {
    throw new Error(
      `Unable to delete cover letter: ${error.message}`
    );
  }
}


function mapRow(
  row:
    CoverLetterRow
): CoverLetterEditorData {
  return {
    id:
      row.id,

    title:
      row.title,

    template:
      row.template,

    resumeId:
      row.resume_id,

    recipientName:
      row.recipient_name,

    companyName:
      row.company_name,

    jobTitle:
      row.job_title,

    companyAddress:
      row.company_address,

    jobDescription:
      row.job_description,

    letterDate:
      row.letter_date,

    opening:
      row.opening,

    body:
      row.body,

    closing:
      row.closing,

    signOff:
      row.sign_off,

    createdAt:
      row.created_at,

    updatedAt:
      row.updated_at,
  };
}


function getToday() {
  return new Date()
    .toISOString()
    .slice(
      0,
      10
    );
}