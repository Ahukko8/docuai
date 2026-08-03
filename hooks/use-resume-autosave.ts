"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";

import {
  updateResumeAction,
} from "@/actions/resumes/update";

import type {
  ResumeEditorData,
  UpdateResumeInput,
} from "@/types/resume";


export type SaveStatus =
  | "saved"
  | "dirty"
  | "saving"
  | "error";


interface SaveQueueContext {
  pendingResumeRef:
    MutableRefObject<
      ResumeEditorData | null
    >;

  activePromiseRef:
    MutableRefObject<
      Promise<void> | null
    >;

  lastSavedSnapshotRef:
    MutableRefObject<string>;

  latestSnapshotRef:
    MutableRefObject<string>;

  setStatus:
    Dispatch<
      SetStateAction<SaveStatus>
    >;
}


function serializeResume(
  resume: ResumeEditorData
) {
  return JSON.stringify(resume);
}


function createUpdateInput(
  resume: ResumeEditorData
): UpdateResumeInput {
  return {
    title:
      resume.title.trim() ||
      "Untitled Resume",

    template:
      resume.template,

    personalInfo:
      resume.personalInfo,

    summary:
      resume.summary,

    experience:
      resume.experience,

    education:
      resume.education,

    skills:
      resume.skills,
  };
}


/*
 * This is outside the React hook, so it is
 * not a reactive function and does not need
 * useCallback or an Effect dependency.
 */
async function drainSaveQueue(
  context: SaveQueueContext
) {
  try {
    while (
      context.pendingResumeRef.current
    ) {
      const nextResume =
        context.pendingResumeRef.current;


      /*
       * Clear the current queued value before
       * awaiting. If the user edits during the
       * request, the newest resume will be
       * placed back into this ref.
       */
      context.pendingResumeRef.current =
        null;


      context.setStatus(
        "saving"
      );


      await updateResumeAction(
        nextResume.id,
        createUpdateInput(
          nextResume
        )
      );


      context
        .lastSavedSnapshotRef
        .current =
        serializeResume(
          nextResume
        );
    }


    /*
     * A newer change might be waiting for its
     * debounce timer even though the current
     * database request has completed.
     */
    const everythingSaved =
      context
        .lastSavedSnapshotRef
        .current ===
      context
        .latestSnapshotRef
        .current;


    context.setStatus(
      everythingSaved
        ? "saved"
        : "dirty"
    );
  } catch (error) {
    console.error(
      "Resume autosave failed:",
      error
    );


    context.pendingResumeRef.current =
      null;


    context.setStatus(
      "error"
    );


    throw error;
  }
}


function queueResumeSave(
  resume: ResumeEditorData,
  context: SaveQueueContext
): Promise<void> {
  /*
   * Always keep the newest version.
   * Older queued keystrokes are discarded.
   */
  context.pendingResumeRef.current =
    resume;


  if (
    !context.activePromiseRef.current
  ) {
    const savePromise =
      drainSaveQueue(
        context
      ).finally(() => {
        context
          .activePromiseRef
          .current = null;


        /*
         * Handle a change queued exactly as
         * the previous drain was finishing.
         */
        const pendingResume =
          context
            .pendingResumeRef
            .current;


        if (pendingResume) {
          void queueResumeSave(
            pendingResume,
            context
          ).catch(() => {
            // Status and logging are handled
            // inside drainSaveQueue.
          });
        }
      });


    context.activePromiseRef.current =
      savePromise;
  }


  return (
    context.activePromiseRef.current ??
    Promise.resolve()
  );
}


export function useResumeAutosave(
  resume: ResumeEditorData,
  delay = 1500
) {
  const [
    status,
    setStatus,
  ] = useState<SaveStatus>(
    "saved"
  );


  const initialSnapshot =
    serializeResume(resume);


  const lastSavedSnapshotRef =
    useRef(initialSnapshot);


  const latestSnapshotRef =
    useRef(initialSnapshot);


  const pendingResumeRef =
    useRef<
      ResumeEditorData | null
    >(null);


  const activePromiseRef =
    useRef<
      Promise<void> | null
    >(null);


  const timerRef =
    useRef<
      ReturnType<
        typeof setTimeout
      > | null
    >(null);


  useEffect(() => {
    const currentSnapshot =
      serializeResume(resume);


    latestSnapshotRef.current =
      currentSnapshot;


    /*
     * Do not autosave when the current data
     * already matches the latest successful
     * database save.
     */
    if (
      currentSnapshot ===
      lastSavedSnapshotRef.current
    ) {
      if (
        !activePromiseRef.current
      ) {
        setStatus("saved");
      }

      return;
    }


    setStatus("dirty");


    if (timerRef.current) {
      clearTimeout(
        timerRef.current
      );
    }


    timerRef.current =
      setTimeout(() => {
        timerRef.current =
          null;


        void queueResumeSave(
          resume,
          {
            pendingResumeRef,

            activePromiseRef,

            lastSavedSnapshotRef,

            latestSnapshotRef,

            setStatus,
          }
        ).catch(() => {
          /*
           * The queue function already logs
           * the error and changes the status.
           */
        });
      }, delay);


    return () => {
      if (timerRef.current) {
        clearTimeout(
          timerRef.current
        );

        timerRef.current =
          null;
      }
    };
  }, [
    resume,
    delay,
  ]);


  async function saveNow() {
    if (timerRef.current) {
      clearTimeout(
        timerRef.current
      );

      timerRef.current =
        null;
    }


    const currentSnapshot =
      serializeResume(resume);


    latestSnapshotRef.current =
      currentSnapshot;


    if (
      currentSnapshot ===
        lastSavedSnapshotRef.current &&
      !activePromiseRef.current
    ) {
      setStatus("saved");

      return true;
    }


    try {
      await queueResumeSave(
        resume,
        {
          pendingResumeRef,

          activePromiseRef,

          lastSavedSnapshotRef,

          latestSnapshotRef,

          setStatus,
        }
      );


      return (
        lastSavedSnapshotRef.current ===
        currentSnapshot
      );
    } catch {
      return false;
    }
  }


  return {
    status,

    saveNow,

    isSaving:
      status === "saving",
  };
}