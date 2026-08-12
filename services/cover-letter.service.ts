import "server-only";

import {
  createCoverLetterRepository,
  deleteCoverLetterRepository,
  getCoverLetterRepository,
  listCoverLettersRepository,
  updateCoverLetterRepository,
} from "@/repositories/cover-letter.repository";

import type {
  UpdateCoverLetterInput,
} from "@/types/cover-letter";


export async function createCoverLetterService(
  userId: string
) {
  return createCoverLetterRepository(
    userId
  );
}


export async function listCoverLettersService(
  userId: string
) {
  return listCoverLettersRepository(
    userId
  );
}


export async function getCoverLetterService(
  id: string,
  userId: string
) {
  return getCoverLetterRepository(
    id,
    userId
  );
}


export async function updateCoverLetterService(
  id: string,
  userId: string,
  input:
    UpdateCoverLetterInput
) {
  return updateCoverLetterRepository(
    id,
    userId,
    input
  );
}


export async function deleteCoverLetterService(
  id: string,
  userId: string
) {
  await deleteCoverLetterRepository(
    id,
    userId
  );
}