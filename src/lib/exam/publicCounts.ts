/**
 * PUBLIC questions per exam and kind, from one read (migration 0237,
 * 2026-11-08). The homepage catalogue and the /browse exam pills both build on
 * it; each caches the result its own way. Spec: tests/public-question-counts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { KindCounts } from "./questionCounts";

export type PublicCountRow = { exam_id: string; question_kind: string; questions: number };

/**
 * One row per exam and kind that has PUBLIC questions. THROWS on a failed read
 * and on an empty one (the bank is never empty), so a cache never keeps zeros.
 */
export async function loadPublicQuestionCounts(client: SupabaseClient): Promise<PublicCountRow[]> {
  const { data, error } = await client.rpc("public_question_counts");
  if (error) throw new Error(`public question counts: count read failed (${error.message})`);
  const rows = (data ?? []) as PublicCountRow[];
  if (rows.length === 0) throw new Error("public question counts: count read returned no rows");
  return rows;
}

/** Rows by exam id, both kinds (absent kind = 0), and the whole bank's total. */
export function tallyPublicCounts(rows: readonly PublicCountRow[]): { byExamId: Map<string, KindCounts>; total: number } {
  const byExamId = new Map<string, KindCounts>();
  let total = 0;
  for (const r of rows) {
    if (r.question_kind !== "pyq" && r.question_kind !== "practice") {
      throw new Error(`public question counts: unknown kind ${r.question_kind}`);
    }
    const c = byExamId.get(r.exam_id) ?? { pyq: 0, practice: 0 };
    c[r.question_kind] += r.questions;
    byExamId.set(r.exam_id, c);
    total += r.questions;
  }
  return { byExamId, total };
}
