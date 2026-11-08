/**
 * POST /api/path's body (MENTOR_SPEC.md Phase 1), checked before any database
 * work: start (board + stream), stop, "Not taught yet" on a chapter, or
 * Lighter / More (Phase 3).
 *
 * Pure. Spec: tests/path-parse.test.ts.
 */
import { z } from "zod";
import { PATH_EXAMS, STREAMS, type PathExam, type Stream } from "./model";

const schema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("start"), exam: z.enum(PATH_EXAMS), stream: z.enum(STREAMS) }).strict(),
  z.object({ action: z.literal("stop") }).strict(),
  z.object({ action: z.literal("defer"), chapterId: z.string().uuid() }).strict(),
  z.object({ action: z.literal("pace"), direction: z.enum(["lighter", "more"]) }).strict(),
]);

export type PathAction =
  | { action: "start"; exam: PathExam; stream: Stream }
  | { action: "stop" }
  | { action: "defer"; chapterId: string }
  | { action: "pace"; direction: "lighter" | "more" };

export function parsePathAction(raw: unknown): { ok: true; value: PathAction } | { ok: false; error: string } {
  const r = schema.safeParse(raw);
  return r.success ? { ok: true, value: r.data } : { ok: false, error: "Invalid request." };
}

const chapterParam = z.string().uuid();

/** GET /api/path/chapter's `chapterId` (Phase 2), or null. */
export function parseChapterParam(raw: string | null): string | null {
  const r = chapterParam.safeParse(raw);
  return r.success ? r.data : null;
}
