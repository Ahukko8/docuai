"use client";

import {
  useState,
} from "react";

import {
  Download,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";


interface DownloadPdfButtonProps {
  resumeId: string;

  resumeTitle: string;

  beforeDownload?: () =>
    Promise<boolean>;
}


export default function DownloadPdfButton({
  resumeId,
  resumeTitle,
  beforeDownload,
}: DownloadPdfButtonProps) {
  const [
    downloading,
    setDownloading,
  ] = useState(false);


  async function downloadPdf() {
    try {
      setDownloading(true);


      if (beforeDownload) {
        const saved =
          await beforeDownload();


        if (!saved) {
          window.alert(
            "Your latest changes could not be saved. Fix the save error before downloading."
          );

          return;
        }
      }


      const response =
        await fetch(
          `/api/resumes/${encodeURIComponent(
            resumeId
          )}/pdf`,
          {
            method: "GET",

            cache: "no-store",
          }
        );


      if (!response.ok) {
        const message =
          await response.text();


        throw new Error(
          message ||
            "Unable to generate PDF."
        );
      }


      const blob =
        await response.blob();


      const objectUrl =
        URL.createObjectURL(
          blob
        );


      const anchor =
        document.createElement(
          "a"
        );


      anchor.href =
        objectUrl;


      anchor.download =
        createDownloadFilename(
          resumeTitle
        );


      document.body.appendChild(
        anchor
      );


      anchor.click();


      anchor.remove();


      URL.revokeObjectURL(
        objectUrl
      );
    } catch (error) {
      console.error(
        "Download PDF:",
        error
      );


      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to download the PDF."
      );
    } finally {
      setDownloading(false);
    }
  }


  return (
    <Button
      type="button"

      variant="outline"

      disabled={downloading}

      onClick={() => {
        void downloadPdf();
      }}

      className="
        border-emerald-500/20
        text-emerald-300
        hover:bg-emerald-500/10
        hover:text-emerald-200
      "
    >
      <Download className="mr-2 h-4 w-4" />

      {downloading
        ? "Preparing PDF..."
        : "Download PDF"}
    </Button>
  );
}


function createDownloadFilename(
  title: string
) {
  const cleaned =
    title
      .normalize("NFKD")
      .replace(
        /[^\w\s-]/g,
        ""
      )
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 80);


  return `${
    cleaned || "resume"
  }.pdf`;
}