import {
  z,
} from "zod";


export const improveResumeTextSchema =
  z.object({
    kind: z.enum([
      "summary",
      "experience",
    ]),

    text: z
      .string()
      .trim()
      .min(
        20,
        "Enter at least 20 characters before using AI."
      )
      .max(
        5000,
        "The text is too long to improve."
      ),

    context: z
      .object({
        targetRole: z
          .string()
          .max(160)
          .optional(),

        position: z
          .string()
          .max(160)
          .optional(),

        company: z
          .string()
          .max(160)
          .optional(),
      })
      .optional(),
  });


export type ImproveResumeTextInput =
  z.infer<
    typeof improveResumeTextSchema
  >;