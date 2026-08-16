/**
 * Whether to render the `/browse` question-format control for a given scope.
 *
 * WHY IT IS CONDITIONAL. Measured 2026-08-16 over the PUBLIC bank: 38,102 MCQ ·
 * 8,370 subjective · 2,900 numeric. The mix is confined to six exams (JEE Mains
 * and the five board corpora, 199 of 549 chapters); NDA, MHT-CET, NEET,
 * Foundation Course and Worksheets are 100% MCQ across 29,524 questions, where
 * the control could only ever be a no-op. Same posture the syllabus-fit filter
 * takes off JEE — hidden rather than disabled, so it adds no noise to the exams
 * it has nothing to say about.
 *
 * WHY THE INPUT IS A REGISTRY FLAG AND NOT A LIVE COUNT. This was built as a
 * cached hourly aggregate first, and that failed in production: grouping
 * (exam, kind, format) over the bank is a 49,372-row seq scan — ~4.4s and 8,838
 * buffers — against the anon role's 3s statement_timeout, and it timed out
 * INTERMITTENTLY, which is worse than failing outright. Splitting it per exam
 * uses an index but still leaves JEE Mains at ~3.7s. The only ways to serve it
 * live were a new index on the most heavily written table in the schema, or a
 * raised timeout — both far too much to decide whether to draw a control. It is
 * therefore declared on EXAM_REGISTRY.mixedFormats, alongside `practiceOnly`
 * and `hasMocks`, and re-measured against the live bank by
 * tests/format-mix-registry.test.ts so it cannot silently rot.
 *
 * (The measurement itself has a trap worth remembering: `SET ROLE anon` in a
 * psql session does NOT reproduce this, because statement_timeout is a per-role
 * setting applied at login, not by SET ROLE. The probe that found it was a
 * real anon-key call through supabase-js.)
 */
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import type { ExamIdMap } from "@/lib/exam/examNav";
import type { FormatFilter } from "./filters";

/**
 * Exam UUIDs whose PUBLIC corpus holds more than one format.
 *
 * Takes the cached slug→uuid map rather than reading the DB: `/browse` filters
 * by `examId`, the registry is keyed by slug, and `getExamIdMap()` is already
 * cached and already paid for by the header.
 */
export function mixedFormatExamIds(examIds: ExamIdMap): string[] {
  const ids: string[] = [];
  for (const exam of EXAM_REGISTRY) {
    if (!exam.mixedFormats) continue;
    const id = examIds[exam.slug];
    if (id) ids.push(id);
  }
  return ids;
}

/**
 * Should the format control be rendered?
 *
 * The two failure directions are NOT symmetric. A visible control on a
 * single-format exam is noise; a HIDDEN control while `?format=` is active
 * strands the viewer with an invisible narrowing, no way to undo it, and no
 * error to explain the missing questions. So an active filter pins it on, and
 * every "we don't know" path resolves toward showing it.
 */
export function shouldShowFormatFilter({
  mixedExamIds,
  examId,
  activeFormat,
}: {
  mixedExamIds: string[];
  examId: string | null;
  activeFormat: FormatFilter;
}): boolean {
  // Never hide an active filter — see above. Also the reason a stale registry
  // flag can only ever cost noise, never reachability.
  if (activeFormat !== "all") return true;
  // No reading at all (a DB blip emptied the id map): degrade to always-visible
  // rather than silently removing a filter.
  if (mixedExamIds.length === 0) return true;
  // No exam selected — bank-wide there is certainly a mix.
  if (examId === null) return true;
  return mixedExamIds.includes(examId);
}
