"use client";

import {
  useEffect,
} from "react";

import type {
  SaveStatus,
} from "@/hooks/use-resume-autosave";


export function useUnsavedChangesWarning(
  status: SaveStatus
) {
  const shouldWarn =
    status === "dirty" ||
    status === "saving" ||
    status === "error";


  /*
   * Protect against closing the tab,
   * refreshing, or navigating to an
   * external page.
   */
  useEffect(() => {
    if (!shouldWarn) {
      return;
    }


    function handleBeforeUnload(
      event: BeforeUnloadEvent
    ) {
      event.preventDefault();

      /*
       * Required for compatibility with
       * some browsers.
       */
      event.returnValue = true;
    }


    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );


    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [shouldWarn]);


  /*
   * Next.js internal Link navigation does
   * not unload the browser document, so
   * beforeunload alone will not catch it.
   *
   * This intercepts same-origin links while
   * the resume still has unsaved changes.
   */
  useEffect(() => {
    if (!shouldWarn) {
      return;
    }


    function handleDocumentClick(
      event: MouseEvent
    ) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }


      const target =
        event.target;


      if (
        !(target instanceof Element)
      ) {
        return;
      }


      const anchor =
        target.closest<
          HTMLAnchorElement
        >("a[href]");


      if (!anchor) {
        return;
      }


      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute(
          "download"
        )
      ) {
        return;
      }


      const destination =
        new URL(
          anchor.href,
          window.location.href
        );


      /*
       * External navigation will be handled
       * by beforeunload.
       */
      if (
        destination.origin !==
        window.location.origin
      ) {
        return;
      }


      const current =
        new URL(
          window.location.href
        );


      const isSamePage =
        destination.pathname ===
          current.pathname &&
        destination.search ===
          current.search;


      if (isSamePage) {
        return;
      }


      const confirmed =
        window.confirm(
          status === "error"
            ? "Your latest resume changes could not be saved. Leave this page anyway?"
            : "Your resume still has unsaved changes. Leave this page anyway?"
        );


      if (!confirmed) {
        event.preventDefault();

        event.stopPropagation();
      }
    }


    document.addEventListener(
      "click",
      handleDocumentClick,
      true
    );


    return () => {
      document.removeEventListener(
        "click",
        handleDocumentClick,
        true
      );
    };
  }, [
    shouldWarn,
    status,
  ]);
}