/**
 * Published student results, for /results and the homepage and exam-page
 * strips (migration 0149). Read with the anon client: the table hands out
 * published names only, and never whose account they are.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { singleFlight } from "@/lib/cache/singleFlight";
import { buildFailureMemoMs } from "@/lib/cache/buildPhase";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getExamByName } from "@/lib/exam/examContext";
import type { PublicResult, ResultStage } from "./summary";

export const RESULTS_CACHE_TAG = "student-results";

type Raw = {
  display_name: string | null;
  result_announcements: {
    sitting: string;
    stage: ResultStage;
    announced_on: string;
    exams: { name: string } | null;
  } | null;
};

/** Newest announcement first. THROWS on a failed read, so a cache never keeps an empty list. */
export async function listPublishedResults(client: SupabaseClient): Promise<PublicResult[]> {
  const { data, error } = await client
    .from("student_results")
    .select("display_name, result_announcements(sitting, stage, announced_on, exams(name))")
    .eq("published", true)
    .limit(1000);
  if (error) throw new Error(`student results: ${error.message}`);
  const rows = ((data ?? []) as unknown as Raw[]).flatMap((r) => {
    const a = r.result_announcements;
    const exam = getExamByName(a?.exams?.name);
    if (!a || !exam || !r.display_name) return [];
    return [{ on: a.announced_on, result: { examSlug: exam.slug, examName: exam.displayName, sitting: a.sitting, stage: a.stage, name: r.display_name } }];
  });
  rows.sort((x, y) => y.on.localeCompare(x.on));
  return rows.map((r) => r.result);
}

const cachedResults = unstable_cache(
  () => listPublishedResults(createSupabaseAnonClient()),
  // The review page clears the tag on every publish, so a name shows at once.
  ["student-results-v1"],
  { revalidate: 86400, tags: [RESULTS_CACHE_TAG] }
);

/** The published list, cached for a day and shared by every page that shows it. */
export function getPublishedResults(): Promise<PublicResult[]> {
  return singleFlight("student-results", cachedResults, { rememberFailureMs: buildFailureMemoMs() });
}
