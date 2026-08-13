/**
 * Per-exam question counts on EXACTLY the basis `/browse?examId=…` defaults to.
 *
 * The `/browse` starting panel advertises a number on each exam pill and then
 * sends the visitor to that exam's filtered view. Those two numbers have to be
 * the same one, and neither existing source gives it:
 *
 *   - `getCachedExamCatalog` counts total PUBLIC (pyq + practice). Right for
 *     the homepage, whose cards link to guides and notes; wrong here, because
 *     a bare `?examId=` view is PYQ-only. It would have advertised NDA at
 *     8,259 against a destination showing 4,860.
 *   - Summing `listChapterLandings` gets the kind right but drops every chapter
 *     under MIN_QUESTIONS_FOR_LANDING (15), which cost NDA 161 questions —
 *     measured, not hypothesised: 4,699 rendered against 4,860 on the page.
 *
 * So this asks the question directly, once per revalidate window, with the same
 * practice-only rule `/browse` itself applies.
 *
 * Head counts only (`head: true`): the row payload is never read, so this is
 * immune to the PostgREST 1000-row truncation trap that has bitten this
 * codebase five times.
 */
import { unstable_cache } from "next/cache";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { EXAM_REGISTRY, isPracticeOnlyExam } from "@/lib/exam/examContext";

/** exam slug → questions visible in that exam's default `/browse` view. */
export type DefaultViewCounts = Record<string, number>;

export const getDefaultViewCountsByExam = unstable_cache(
  async (): Promise<DefaultViewCounts> => {
    const db = createSupabaseAnonClient();
    const counts: DefaultViewCounts = {};

    try {
      const { data: examRows } = await db.from("exams").select("id, name");
      const idByName = new Map(
        (examRows ?? []).map((e) => [e.name as string, e.id as string])
      );

      await Promise.all(
        EXAM_REGISTRY.map(async (exam) => {
          const examId = idByName.get(exam.examName);
          if (!examId) return; // In the registry, not yet seeded.
          // The same rule browse/page.tsx applies when no `kind` is in the URL.
          const kind = isPracticeOnlyExam(exam.examName) ? "practice" : "pyq";
          const { count } = await db
            .from("questions")
            .select("id", { count: "exact", head: true })
            .eq("exam_id", examId)
            .eq("question_kind", kind);
          if (typeof count === "number") counts[exam.slug] = count;
        })
      );
    } catch {
      // A DB blip must not 500 the bank's front door. An empty map drops every
      // pill, and the panel still renders its chapter row and the /questions
      // link — degraded, not broken. Same posture as getExamIdMap().
    }

    return counts;
  },
  ["browse-default-view-counts"],
  { revalidate: 3600 }
);
