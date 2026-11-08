/**
 * POST /api/path's body (MENTOR_SPEC.md Phase 1), checked before any database
 * work: start (board + stream), stop, or "Not taught yet" on a chapter.
 *
 * Pure. Spec: tests/path-parse.test.ts.
 */
import { z } from "zod";
import { PATH_EXAMS, STREAMS, type PathExam, type Stream } from "./model";

const schema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("start"), exam: z.enum(PATH_EXAMS), stream: z.enum(STREAMS) }).strict(),
  z.object({ action: z.literal("stop") }).strict(),
  z.object({ action: z.literal("defer"), chapterId: z.string().uuid() }).strict(),
]);

export type PathAction =
  | { action: "start"; exam: PathExam; stream: Stream }
  | { action: "stop" }
  | { action: "defer"; chapterId: string };

export function parsePathAction(raw: unknown): { ok: true; value: PathAction } | { ok: false; error: string } {
  const r = schema.safeParse(raw);
  return r.success ? { ok: true, value: r.data } : { ok: false, error: "Invalid request." };
}
