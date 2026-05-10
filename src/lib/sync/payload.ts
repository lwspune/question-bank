import { z } from "zod";

const trimmedNonEmpty = z
  .string()
  .transform((s) => s.trim())
  .refine((s) => s.length > 0, { message: "must not be empty" });

const trimmedNullableOptional = z
  .string()
  .optional()
  .transform((s) => (s == null ? undefined : s.trim() || undefined));

const optionLabel = z.enum(["A", "B", "C", "D"]);

const optionSchema = z.object({
  label: optionLabel,
  text: trimmedNonEmpty,
  isCorrect: z.boolean(),
});

const attemptStatsSchema = z.object({
  count: z.number().int().nonnegative(),
  correctPct: z.number(),
});

const questionSchema = z
  .object({
    sourceQuestionId: z.string().min(1),
    text: trimmedNonEmpty,
    context: trimmedNullableOptional,
    difficulty: z.enum(["EASY", "MODERATE", "HARD"]),
    solution: trimmedNullableOptional,
    pyqYear: z.number().int().min(1900).max(2100).optional(),
    marks: z.number().nonnegative().optional(),
    negMarks: z.number().nonnegative().optional(),
    subject: z.object({ name: trimmedNonEmpty }),
    chapter: z.object({ name: trimmedNonEmpty }),
    subtopic: z.object({ name: trimmedNonEmpty }).optional(),
    options: z.array(optionSchema).length(4),
    attemptStats: attemptStatsSchema.optional(),
  })
  .refine(
    (q) => {
      const labels = q.options.map((o) => o.label).sort();
      return (
        labels[0] === "A" &&
        labels[1] === "B" &&
        labels[2] === "C" &&
        labels[3] === "D"
      );
    },
    { message: "options must include exactly A, B, C, D", path: ["options"] }
  )
  .refine(
    (q) => q.options.filter((o) => o.isCorrect).length === 1,
    {
      message: "exactly one option must be marked correct",
      path: ["options"],
    }
  );

const syncPayloadSchema = z.object({
  source: z.object({
    app: z.string().min(1),
    mockId: z.string().min(1),
    mockTitle: trimmedNonEmpty,
    publishedAt: z.string().datetime(),
  }),
  exam: z.object({ name: trimmedNonEmpty }),
  questions: z.array(questionSchema).min(1),
});

export type SyncPayload = z.infer<typeof syncPayloadSchema>;
export type SyncQuestion = SyncPayload["questions"][number];

export type ValidateResult =
  | { ok: true; payload: SyncPayload }
  | { ok: false; errors: string[] };

export function validateSyncPayload(input: unknown): ValidateResult {
  const result = syncPayloadSchema.safeParse(input);
  if (!result.success) {
    return {
      ok: false,
      errors: result.error.errors.map((e) =>
        e.path.length > 0 ? `${e.path.join(".")}: ${e.message}` : e.message
      ),
    };
  }
  return { ok: true, payload: result.data };
}
