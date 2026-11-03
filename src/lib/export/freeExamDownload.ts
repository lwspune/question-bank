/**
 * Is a download for an exam that needs no pass? (2026-11-02, migration 0210:
 * the Class 9-10 exams.) A free exam's paper, key and formula sheet download
 * like a pass holder's: branded PDF, no pass, no free download spent. A
 * sign-in is still asked, as for every download.
 *
 * Each kind of download names its paper differently, so each target resolves
 * to its exam its own way. Anything that cannot be resolved, or a read that
 * fails, is NOT free: the paid path then answers as it always did.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { getExamBySlug } from "@/lib/exam/examContext";
import { isFreeExamName } from "@/lib/billing/passScope";
import { SCOPE_FREE } from "@/lib/entitlements/access";
import { NOTES_NAV_INDEX } from "@/lib/notes/notesNavIndex.generated";
import type { FormulaSheetTarget } from "./formulaSheet";

export type DownloadTarget = {
  /** The bank's exam filter (/browse). */
  examId?: string | null;
  /** A board past paper's exam. */
  examSlug?: string | null;
  /** A past paper (mock) by its slug. */
  mockSlug?: string | null;
  /** A homework plan: one of its days, or one chapter's top PYQs. */
  homeworkSlug?: string | null;
  /** Selected questions: free only when every one of them is. */
  questionIds?: readonly string[] | null;
  /** A notes chapter's formula sheet. */
  formula?: FormulaSheetTarget | null;
};

/** The exam of a notes chapter, from the generated nav index; null if unknown. */
export function formulaSheetExamName(sheet: FormulaSheetTarget): string | null {
  const entry = NOTES_NAV_INDEX.find(
    (e) => e.subjectRoute === sheet.subjectRoute && e.chapterSlug === sheet.chapterSlug
  );
  return entry?.examName ?? null;
}

/** A notes chapter's formula sheet belongs to a free exam. No database read. */
export function formulaSheetIsFree(sheet: FormulaSheetTarget): boolean {
  return isFreeExamName(formulaSheetExamName(sheet));
}

type PassRow = { exam: { pass_scope: string } | { pass_scope: string }[] | null };
const scopeOf = (r: PassRow): string | null =>
  (Array.isArray(r.exam) ? r.exam[0]?.pass_scope : r.exam?.pass_scope) ?? null;

function failed(what: string, message: string): false {
  console.error(`${what} failed`, message);
  return false;
}

/** .in() puts the list in the URL; ~200 ids is the safe chunk (CLAUDE.md pitfalls). */
const CHUNK = 200;

export async function downloadIsFree(db: SupabaseClient, t: DownloadTarget): Promise<boolean> {
  if (t.examSlug) return getExamBySlug(t.examSlug)?.passScope === SCOPE_FREE;
  if (t.formula) return formulaSheetIsFree(t.formula);

  if (t.examId) {
    const { data, error } = await db.from("exams").select("pass_scope").eq("id", t.examId).maybeSingle();
    if (error) return failed("downloadIsFree exam", error.message);
    return (data as { pass_scope: string } | null)?.pass_scope === SCOPE_FREE;
  }
  if (t.mockSlug) {
    const { data, error } = await db
      .from("mock_tests")
      .select("exam:exams!exam_id(pass_scope)")
      .eq("slug", t.mockSlug)
      .maybeSingle();
    if (error) return failed("downloadIsFree mock", error.message);
    return data ? scopeOf(data as PassRow) === SCOPE_FREE : false;
  }
  if (t.homeworkSlug) {
    const { data, error } = await db
      .from("homework_plans")
      .select("exam:exams!exam_id(pass_scope)")
      .eq("slug", t.homeworkSlug)
      .maybeSingle();
    if (error) return failed("downloadIsFree homework", error.message);
    return data ? scopeOf(data as PassRow) === SCOPE_FREE : false;
  }
  if (t.questionIds) {
    const ids = [...new Set(t.questionIds)];
    if (ids.length === 0) return false;
    let found = 0;
    for (let i = 0; i < ids.length; i += CHUNK) {
      const { data, error } = await db
        .from("questions")
        .select("id, exam:exams!exam_id(pass_scope)")
        .in("id", ids.slice(i, i + CHUNK));
      if (error) return failed("downloadIsFree questions", error.message);
      const rows = (data ?? []) as PassRow[];
      if (rows.some((r) => scopeOf(r) !== SCOPE_FREE)) return false;
      found += rows.length;
    }
    // A question the reader cannot see is not known to be free.
    return found === ids.length;
  }
  return false;
}
