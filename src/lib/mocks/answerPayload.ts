/**
 * The body of PATCH /api/mock/attempt/[id]/answer: one question's response
 * (selection / flag / time). Its own module so the contract is unit-tested
 * (tests/mock-answer-payload.test.ts) without the route's auth and I/O.
 *
 * A response is EITHER an option label (MCQ) or a value (JEE Section-B numeric),
 * never both — mirroring the `attempt_answers` CHECK added in migration 0087.
 * Rejecting both-at-once here means the DB constraint is a backstop rather than
 * the thing users meet as a 500.
 *
 * A multiple-select question sends `selectedLabels`, the ticked set (migration 0215). An
 * emptied set becomes null, since the table stores unanswered as null; a repeated letter is
 * refused here as the DB CHECK refuses it.
 *
 * `numericResponse` is finite-checked because z.number() accepts NaN and
 * Infinity, and either would reach a numeric column as a write error.
 */
import { z } from "zod";
import { MOCK_OPTION_LABELS } from "./answers";

export const AnswerBodySchema = z
  .object({
    questionId: z.string().uuid(),
    selectedLabel: z.enum(MOCK_OPTION_LABELS).nullable(),
    numericResponse: z.number().finite().nullable().default(null),
    selectedLabels: z
      .array(z.enum(MOCK_OPTION_LABELS))
      .max(MOCK_OPTION_LABELS.length)
      .refine((a) => new Set(a).size === a.length, { message: "An option is ticked twice" })
      .nullable()
      .default(null)
      .transform((a) => (a && a.length > 0 ? a : null)),
    isFlagged: z.boolean(),
    timeSpentSecs: z.number().int().min(0).max(24 * 3600),
  })
  .refine(
    (b) => [b.selectedLabel, b.numericResponse, b.selectedLabels].filter((v) => v !== null).length <= 1,
    { message: "A response is one option, one value or one set of options, never two of them" },
  );
