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
    isFlagged: z.boolean(),
    timeSpentSecs: z.number().int().min(0).max(24 * 3600),
  })
  .refine((b) => b.selectedLabel === null || b.numericResponse === null, {
    message: "A response is either an option or a value, not both",
  });
