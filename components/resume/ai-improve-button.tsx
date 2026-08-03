"use client";

import {
  useState,
} from "react";

import {
  Sparkles,
} from "lucide-react";

import {
  improveResumeTextAction,
} from "@/actions/ai/improve-resume-text";

import {
  Button,
} from "@/components/ui/button";


interface AiImproveButtonProps {
  kind:
    | "summary"
    | "experience";

  text: string;

  context?: {
    targetRole?: string;

    position?: string;

    company?: string;
  };

  onApply:
    (improvedText: string) =>
      void;
}


export default function AiImproveButton({
  kind,
  text,
  context,
  onApply,
}: AiImproveButtonProps) {
  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    remaining,
    setRemaining,
  ] = useState<
    number | null
  >(null);


  async function improveText() {
    if (
      text.trim().length < 20
    ) {
      window.alert(
        "Enter at least 20 characters before using AI."
      );

      return;
    }


    try {
      setLoading(true);


      const result =
        await improveResumeTextAction({
          kind,

          text,

          context,
        });


      onApply(
        result.text
      );


      setRemaining(
        result.remaining
      );
    } catch (error) {
      console.error(
        "AI improvement:",
        error
      );


      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to improve the text."
      );
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="flex items-center gap-2">

      {remaining !== null && (
        <span className="text-[11px] text-zinc-500">
          {remaining} AI uses left
        </span>
      )}


      <Button
        type="button"

        size="sm"

        variant="outline"

        disabled={
          loading ||
          text.trim().length < 20
        }

        onClick={
          improveText
        }

        className="
          border-purple-500/20
          text-purple-300
          hover:bg-purple-500/10
          hover:text-purple-200
        "
      >
        <Sparkles className="mr-1.5 h-4 w-4" />

        {loading
          ? "Improving..."
          : "Improve with AI"}
      </Button>

    </div>
  );
}