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
import { readInChunks } from "@/lib/supabase/readInChunks";

async function numericIds(db: SupabaseClient, ids: readonly string[]): Promise<Set<string> | null> {
  try {
    const rows = await readInChunks<{ id: string }>(ids, (part, from, to) =>
      db.from("questions").select("id").in("id", part).eq("question_format", "numeric").order("id").range(from, to)
    );
    return new Set(rows.map((r) => r.id));
  } catch (e) {
    console.error("before-you-start: numeric read failed", e instanceof Error ? e.message : e);
    return null;
  }
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
