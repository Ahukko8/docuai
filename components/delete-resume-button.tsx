"use client";

import {
    useTransition,
} from "react";

import {
    useRouter,
} from "next/navigation";

import {
    Trash,
    Trash2,
    Loader2
} from "lucide-react";

import {
    deleteResumeAction,
} from "@/actions/resumes/delete";

import {
    Button,
} from "@/components/ui/button";


interface DeleteResumeButtonProps {
    resumeId: string;

    redirectAfterDelete?: boolean;

    compact?: boolean;
}


export default function DeleteResumeButton({
    resumeId,
    redirectAfterDelete = false,
    compact = false,
}: DeleteResumeButtonProps) {
    const router = useRouter();

    const [
        isPending,
        startTransition,
    ] = useTransition();


    function handleDelete() {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this resume? This cannot be undone."
            );


        if (!confirmed) {
            return;
        }


        startTransition(
            async () => {
                try {
                    await deleteResumeAction(
                        resumeId
                    );


                    if (
                        redirectAfterDelete
                    ) {
                        router.push(
                            "/dashboard/resumes"
                        );

                        router.refresh();

                        return;
                    }


                    router.refresh();
                } catch (error) {
                    console.error(
                        "Delete resume:",
                        error
                    );


                    window.alert(
                        "Unable to delete resume. Please try again."
                    );
                }
            }
        );
    }


    if (compact) {
        return (
            <button
                type="button"
                disabled={isPending}
                onClick={
                    handleDelete
                }
                aria-label="Delete resume"
                className="
          inline-flex
          h-9
          w-9
          items-center
          justify-center
          rounded-md
          border
          border-red-500/20
          text-red-400
          transition
          hover:bg-red-500/10
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
            >
                <Trash2 className="h-4 w-4" />
            </button>
        );
    }


    return (
        <Button
            type="button"

            variant="outline"

            disabled={isPending}

            onClick={
                handleDelete
            }

            className="
        border-red-500/20
        text-red-400
        hover:bg-red-500/10
        hover:text-red-300
      "
        >
            <Trash2 className="mr-2 h-4 w-4" />

            {isPending
                ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                : <Trash className="mr-2 h-4 w-4" />}
        </Button>
    );
}