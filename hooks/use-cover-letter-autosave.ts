"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  updateCoverLetterAction,
} from "@/actions/cover-letters/actions";

import type {
  UpdateCoverLetterInput,
} from "@/types/cover-letter";


export type CoverLetterSaveStatus =
  | "saved"
  | "dirty"
  | "saving"
  | "error";


type SavePhase =
  | "idle"
  | "saving"
  | "error";


interface QueuedSave {
  value:
    UpdateCoverLetterInput;

  snapshot:
    string;
}


export function useCoverLetterAutosave(
  id: string,
  value:
    UpdateCoverLetterInput
) {
  /*
   * The serialized value is ordinary
   * derived render data.
   *
   * We do NOT read or write refs here.
   */
  const currentSnapshot =
    JSON.stringify(
      value
    );


  /*
   * The snapshot that was most recently
   * confirmed by the server.
   *
   * Initial data is already stored in
   * Supabase, so it begins as "saved".
   */
  const [
    savedSnapshot,
    setSavedSnapshot,
  ] =
    useState(
      () =>
        JSON.stringify(
          value
        )
    );


  const [
    phase,
    setPhase,
  ] =
    useState<SavePhase>(
      "idle"
    );


  /*
   * The debounce timer.
   *
   * This ref is only accessed inside
   * effects and callbacks.
   */
  const timerRef =
    useRef<
      ReturnType<
        typeof setTimeout
      > | null
    >(null);


  /*
   * Only the newest pending version
   * needs to be saved.
   *
   * If the user types multiple times
   * while a request is running, older
   * queued versions are replaced by the
   * newest one.
   */
  const queuedSaveRef =
    useRef<
      QueuedSave | null
    >(null);


  /*
   * Holds the currently running queue
   * processor.
   *
   * This prevents overlapping update
   * requests.
   */
  const processingPromiseRef =
    useRef<
      Promise<void> | null
    >(null);


  /*
   * Process all queued saves.
   *
   * If another save is already running,
   * callers wait for that same process.
   */
  const processQueue =
    useCallback(
      async () => {
        if (
          processingPromiseRef.current
        ) {
          return processingPromiseRef.current;
        }


        const processingPromise =
          (async () => {
            try {
              while (
                queuedSaveRef.current
              ) {
                /*
                 * Grab the newest queued
                 * version and clear the
                 * slot.
                 *
                 * If another edit arrives
                 * during the request it
                 * will populate the slot
                 * again.
                 */
                const nextSave =
                  queuedSaveRef.current;


                queuedSaveRef.current =
                  null;


                setPhase(
                  "saving"
                );


                await updateCoverLetterAction(
                  id,
                  nextSave.value
                );


                /*
                 * Only mark the exact
                 * version confirmed by
                 * the server as saved.
                 */
                setSavedSnapshot(
                  nextSave.snapshot
                );


                setPhase(
                  "idle"
                );
              }
            } catch (error) {
              /*
               * Don't silently retry
               * indefinitely after a
               * real server failure.
               */
              queuedSaveRef.current =
                null;


              setPhase(
                "error"
              );


              console.error(
                "Cover letter autosave failed:",
                error
              );


              throw error;
            } finally {
              processingPromiseRef.current =
                null;
            }
          })();


        processingPromiseRef.current =
          processingPromise;


        return processingPromise;
      },
      [id]
    );


  /*
   * Debounced autosave.
   *
   * Nothing is saved if the current
   * version already matches the version
   * confirmed by the server.
   */
  useEffect(
    () => {
      if (
        currentSnapshot ===
        savedSnapshot
      ) {
        return;
      }


      if (
        timerRef.current
      ) {
        clearTimeout(
          timerRef.current
        );
      }


      timerRef.current =
        setTimeout(
          () => {
            timerRef.current =
              null;


            queuedSaveRef.current =
              {
                value,

                snapshot:
                  currentSnapshot,
              };


            void processQueue()
              .catch(
                () => {
                  /*
                   * processQueue already
                   * records the error and
                   * changes the status.
                   *
                   * Catch here prevents
                   * an unhandled promise
                   * rejection from the
                   * timer callback.
                   */
                }
              );
          },
          1500
        );


      return () => {
        if (
          timerRef.current
        ) {
          clearTimeout(
            timerRef.current
          );


          timerRef.current =
            null;
        }
      };
    },
    [
      currentSnapshot,
      processQueue,
      savedSnapshot,
      value,
    ]
  );


  /*
   * Immediate/manual save.
   *
   * This is especially important before
   * PDF generation. Calling saveNow()
   * waits until the queued update has
   * actually finished.
   */
  const saveNow =
    useCallback(
      async () => {
        /*
         * Cancel any pending debounce
         * because we're saving this
         * version immediately.
         */
        if (
          timerRef.current
        ) {
          clearTimeout(
            timerRef.current
          );


          timerRef.current =
            null;
        }


        /*
         * If this exact value is already
         * saved and no request is active,
         * there is nothing to do.
         */
        if (
          currentSnapshot ===
            savedSnapshot &&
          !processingPromiseRef.current
        ) {
          setPhase(
            "idle"
          );

          return;
        }


        /*
         * Replace any stale queued data
         * with the newest value from this
         * render.
         */
        queuedSaveRef.current =
          {
            value,

            snapshot:
              currentSnapshot,
          };


        /*
         * If a request is already
         * processing, its loop will pick
         * up this newly queued version.
         *
         * Awaiting processQueue therefore
         * also makes saveNow useful before
         * downloading the PDF.
         */
        await processQueue();
      },
      [
        currentSnapshot,
        processQueue,
        savedSnapshot,
        value,
      ]
    );


  /*
   * Cancel only the pending debounce
   * timer when the hook unmounts.
   *
   * We intentionally don't try to mutate
   * React state from this cleanup.
   */
  useEffect(
    () => {
      return () => {
        if (
          timerRef.current
        ) {
          clearTimeout(
            timerRef.current
          );


          timerRef.current =
            null;
        }
      };
    },
    []
  );


  /*
   * Dirty state can be DERIVED instead
   * of storing it in a ref or setting it
   * synchronously inside an effect.
   */
  let status:
    CoverLetterSaveStatus;


  if (
    phase ===
    "saving"
  ) {
    status =
      "saving";
  } else if (
    phase ===
    "error"
  ) {
    status =
      "error";
  } else if (
    currentSnapshot !==
    savedSnapshot
  ) {
    status =
      "dirty";
  } else {
    status =
      "saved";
  }


  return {
    status,
    saveNow,
  };
}