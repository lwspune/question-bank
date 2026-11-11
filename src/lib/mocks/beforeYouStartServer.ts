/**
 * Server side of "Before you start" (lib/mocks/beforeYouStart.ts): reads which
 * of a paper's questions are numeric (the snapshot stores marks, not format)
 * and the paper's option count (its blueprint), then computes the lines.
 *
 * Best-effort: a failed read returns NO lines, never a guessed line, because a
 * paper read as all-MCQ would get a guessing rule that is wrong for its
 * numeric answers. Used by the mock page and scripts/mocks/before-you-start-smoke.ts.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { MockRow } from "./query";
import { getBlueprint, optionCountOf } from "./blueprints";
import { beforeYouStartLines, type BeforeYouStartLine } from "./beforeYouStart";

/** `.in()` puts the ids in the URL: chunk well under the request-line limit. */
const CHUNK = 150;

async function numericIds(db: SupabaseClient, ids: readonly string[]): Promise<Set<string> | null> {
  const out = new Set<string>();
  for (let i = 0; i < ids.length; i += CHUNK) {
    const { data, error } = await db
      .from("questions")
      .select("id")
      .in("id", ids.slice(i, i + CHUNK))
      .eq("question_format", "numeric");
    if (error) {
      console.error("before-you-start: numeric read failed", error.message);
      return null;
    }
    for (const r of data ?? []) out.add(r.id as string);
  }
  return out;
}

export async function loadBeforeYouStart(
  db: SupabaseClient,
  mock: Pick<MockRow, "questions" | "paperCode">,
  examSlug: string | null
): Promise<BeforeYouStartLine[]> {
  const ids = mock.questions.map((q) => q.questionId);
  if (ids.length === 0) return [];
  const numeric = await numericIds(db, ids);
  if (!numeric) return [];
  const blueprint = examSlug ? getBlueprint(examSlug, mock.paperCode) : null;
  return beforeYouStartLines(
    mock.questions.map((q) => ({
      marks: q.marks,
      negMarks: q.negMarks,
      numeric: numeric.has(q.questionId),
      grace: q.grace,
      optionMarks: q.optionMarks,
      msqScheme: q.msqScheme,
    })),
    blueprint ? optionCountOf(blueprint) : null
  );
}
