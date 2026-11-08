/**
 * public_question_counts (migration 0237) against the test project: its rows
 * must equal the head counts they replaced, exam by exam and kind by kind, as
 * the anon client sees them.
 *
 * Other test files add and remove PUBLIC questions in the same project while
 * the suite runs, so two reads seconds apart can differ (the first gate saw
 * 177, 182 and 183). The comparison is made only across a window in which the
 * direct counts did not move: direct, function, direct again, retried until
 * the two direct reads agree.
 */
import { describe, it, expect } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { loadPublicQuestionCounts, type PublicCountRow } from "@/lib/exam/publicCounts";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function directCounts(db: SupabaseClient, rows: readonly PublicCountRow[]): Promise<number[]> {
  const counts = await Promise.all(
    rows.map(async (r) => {
      const { count, error } = await db
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("exam_id", r.exam_id)
        .eq("visibility", "PUBLIC")
        .eq("question_kind", r.question_kind);
      if (error || count == null) throw new Error(`head count: ${error?.message ?? "no count"}`);
      return count;
    })
  );
  const { count: total, error } = await db.from("questions").select("id", { count: "exact", head: true }).eq("visibility", "PUBLIC");
  if (error || total == null) throw new Error(`total count: ${error?.message ?? "no count"}`);
  return [...counts, total];
}

describe.skipIf(!HAS_ENV)("public_question_counts", () => {
  const anon = () =>
    createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { persistSession: false },
    });

  it("matches a head count for every exam and kind, and the bank's total", async () => {
    const db = anon();
    for (let attempt = 1; ; attempt++) {
      const shape = await loadPublicQuestionCounts(db);
      const before = await directCounts(db, shape);
      const rows = await loadPublicQuestionCounts(db);
      const after = await directCounts(db, shape);
      const sameShape =
        rows.length === shape.length && rows.every((r) => shape.some((s) => s.exam_id === r.exam_id && s.question_kind === r.question_kind));
      if (sameShape && before.join() === after.join()) {
        const fromFunction = shape.map((s) => rows.find((r) => r.exam_id === s.exam_id && r.question_kind === s.question_kind)!.questions);
        expect([...fromFunction, rows.reduce((n, r) => n + r.questions, 0)]).toEqual(before);
        return;
      }
      // The bank moved under the reads; another test file is writing. Try again.
      if (attempt === 8) throw new Error("the test project's questions never held still for one comparison");
      await new Promise((r) => setTimeout(r, 1500));
    }
  }, 60_000);
});
