/**
 * POST /api/path's body (MENTOR_SPEC.md Phase 1), checked before any database
 * work: start (board + stream), stop, "Not taught yet" on a chapter,
 * Lighter / More (Phase 3), the class checklist (`cover`: the ticked chapter
 * ids, [] for "Start from chapter 1") and Switch chapter (§18).
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
  // 80 mirrors set_path_covered's cap (0261); a plan holds at most 47 chapters.
  z.object({ action: z.literal("cover"), chapterIds: z.array(z.string().uuid()).max(80) }).strict(),
  z.object({ action: z.literal("switch"), chapterId: z.string().uuid() }).strict(),
]);

export type PathAction =
  | { action: "start"; exam: PathExam; stream: Stream }
  | { action: "stop" }
  | { action: "defer"; chapterId: string }
  | { action: "pace"; direction: "lighter" | "more" }
  | { action: "cover"; chapterIds: string[] }
  | { action: "switch"; chapterId: string };

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
