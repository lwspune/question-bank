/**
 * slug → exam UUID, cached and shared by every visitor.
 *
 * The header's Bank tab needs `/browse?examId=<uuid>`, which is the one piece of
 * nav that can't be derived from the registry alone. Resolving it on the server
 * per-request is fine ONLY because this map is identical for everyone — no
 * cookie, no session — so it can be cached and embedded in a page that is served
 * to all visitors alike. That property is what lets the rest of the header move
 * to the browser without the nav losing its exam filter.
 */
import { unstable_cache } from "next/cache";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import type { ExamIdMap } from "@/lib/exam/examNav";

export const getExamIdMap = unstable_cache(
  async (): Promise<ExamIdMap> => {
    const map: ExamIdMap = {};
    try {
      const { data } = await createSupabaseAnonClient()
        .from("exams")
        .select("id, name");
      const byName = new Map((data ?? []).map((e) => [e.name, e.id]));
      for (const exam of EXAM_REGISTRY) {
        map[exam.slug] = byName.get(exam.examName) ?? null;
      }
    } catch {
      // A DB blip must not break the header on every page. Every slug resolves
      // to null, so the Bank tab falls back to a bare /browse — degraded, not
      // broken. Same posture loadActiveExamContext() took.
    }
    return map;
  },
  ["exam-id-map"],
  { revalidate: 3600 }
);
