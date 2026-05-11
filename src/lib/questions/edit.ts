import { z } from "zod";
import { contentHash } from "@/lib/upload/hash";
import { normalizeNewlines } from "@/lib/text/normalizeNewlines";

// Trim + convert any literal `\n` (backslash + n) typed by the admin into
// real newlines, so the DB row matches what the UI renders (and the content
// hash stays stable across save/re-save).
const trimmedNonEmpty = z
  .string()
  .transform((s) => normalizeNewlines(s.trim()))
  .refine((s) => s.length > 0, { message: "must not be empty" });

const trimmedNullable = z
  .string()
  .nullable()
  .transform((s) =>
    s == null ? null : normalizeNewlines(s.trim()) || null
  );

const optionLabel = z.enum(["A", "B", "C", "D"]);

const optionSchema = z.object({
  label: optionLabel,
  text: trimmedNonEmpty,
  imageUrl: z.string().nullable(),
});

const editQuestionSchema = z
  .object({
    text: trimmedNonEmpty,
    context: trimmedNullable,
    difficulty: z.enum(["EASY", "MODERATE", "HARD"]),
    solution: trimmedNullable,
    imageUrl: z.string().nullable(),
    subjectId: z.string().uuid(),
    chapterId: z.string().uuid(),
    subtopicId: z.string().uuid().nullable(),
    visibility: z.enum(["PUBLIC", "PRIVATE"]),
    correct: optionLabel,
    options: z.array(optionSchema).length(4),
  })
  .refine(
    (p) => {
      const labels = p.options.map((o) => o.label).sort();
      return (
        labels[0] === "A" &&
        labels[1] === "B" &&
        labels[2] === "C" &&
        labels[3] === "D"
      );
    },
    { message: "options must include exactly A, B, C, D", path: ["options"] }
  );

export type EditQuestionPayload = z.infer<typeof editQuestionSchema>;

export type ValidationResult =
  | { ok: true; payload: EditQuestionPayload; contentHash: string }
  | { ok: false; errors: string[] };

export function validateEditPayload(input: unknown): ValidationResult {
  const result = editQuestionSchema.safeParse(input);
  if (!result.success) {
    return {
      ok: false,
      errors: result.error.errors.map((e) =>
        e.path.length > 0 ? `${e.path.join(".")}: ${e.message}` : e.message
      ),
    };
  }
  const payload = result.data;
  const sortedTexts = payload.options
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((o) => o.text);
  const hash = contentHash(payload.text, sortedTexts, payload.correct);
  return { ok: true, payload, contentHash: hash };
}
