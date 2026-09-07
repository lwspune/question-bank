/**
 * Re-grade submitted mock attempts against the CURRENT answer key.
 *
 *   npx tsx scripts/reviews/regrade-attempt.ts <mockSlug>            # dry run
 *   npx tsx scripts/reviews/regrade-attempt.ts <mockSlug> --apply
 *
 * WHY THIS EXISTS. `mock_attempts` stores a FROZEN result (score, correct_count,
 * wrong_count, skipped_count, section_scores) computed at submit time. So
 * correcting an answer key does NOT re-grade an attempt that has already been
 * submitted: the review screen reads the live options and would show a student's
 * choice as correct while the result screen still reads the stored score and
 * calls it wrong. That contradiction is worse than either state on its own.
 *
 * It reuses the app's own pure grader (`gradeMock`) rather than re-implementing
 * the marking scheme, so a re-grade cannot drift from a fresh submit.
 *
 * SAFETY. A re-grade that LOWERS a student's score is possible in principle (if
 * a key moves away from what they picked) and is reported loudly, but requires
 * --allow-lower to be written: silently reducing a mark someone has already
 * seen is not something to do as a side effect of a data fix.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { gradeMock } from "../../src/lib/mocks/attempt";
import type { MockGradeQuestion } from "../../src/lib/mocks/attempt";
import type { SavedResponse } from "../../src/lib/mocks/answers";
import { loadAnswerKey } from "../../src/lib/mocks/query";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const ALLOW_LOWER = process.argv.includes("--allow-lower");
const SLUG = process.argv[2];

async function main() {
  if (!SLUG || SLUG.startsWith("--")) {
    console.error("usage: regrade-attempt.ts <mockSlug> [--apply] [--allow-lower]");
    process.exit(2);
  }
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: mock, error: mErr } = await db
    .from("mock_tests")
    .select("id,slug,title,questions")
    .eq("slug", SLUG)
    .single();
  if (mErr || !mock) throw mErr ?? new Error("mock not found");

  const snapshot = (mock as any).questions as {
    questionId: string;
    sectionKey: string;
    marks: number;
    negMarks: number;
    grace?: boolean;
  }[];

  // The live key, via the SAME loader the app grades with. This script used to
  // read `options` directly, which made it a second implementation of "what is
  // the answer" — and one that was blind to numeric (JEE Section-B) questions,
  // whose key lives in questions.numeric_answer and which have no options at
  // all. It would have regraded every JEE attempt as though the paper had no
  // Section B. loadAnswerKey chunks its own .in() filter (a few hundred uuids
  // exceed the request line).
  const ids = snapshot.map((q) => q.questionId);
  const key = await loadAnswerKey(db as any, ids);

  // Narrow by VALIDATING, never by casting: a key we cannot read silently
  // mis-grades every attempt. loadAnswerKey returns a validated union and simply
  // OMITS a question whose key it could not read, so the thing to refuse on is
  // ABSENCE. Regrading against a paper with a missing key would score that
  // question as skipped for everyone and quietly move real students' marks.
  const missingKey = ids.filter((id) => !key[id]);
  if (missingKey.length) {
    console.error(
      `REFUSE: ${missingKey.length} question(s) in the snapshot have no readable ` +
        `answer key (e.g. ${missingKey[0]}).`
    );
    process.exit(1);
  }

  const gradeQuestions: MockGradeQuestion[] = snapshot.map((q) => ({
    questionId: q.questionId,
    sectionKey: q.sectionKey,
    marks: q.marks,
    negMarks: q.negMarks,
    answer: key[q.questionId] ?? null,
    ...(q.grace ? { grace: true } : {}),
  }));

  const { data: attempts, error: aErr } = await db
    .from("mock_attempts")
    .select("id,user_id,status,score,max_score,correct_count,wrong_count,skipped_count")
    .eq("mock_id", (mock as any).id)
    .in("status", ["submitted", "expired"]);
  if (aErr) throw aErr;

  console.log(`${(mock as any).title} [${SLUG}] — ${(attempts as any[]).length} submitted attempt(s)\n`);

  let lowered = 0;
  const plan: { id: string; before: any; after: any }[] = [];

  for (const a of attempts as any[]) {
    const answerMap: Record<string, SavedResponse> = {};
    for (let i = 0; i < ids.length; i += 100) {
      const { data, error } = await db
        .from("attempt_answers")
        .select("question_id,selected_label,numeric_response")
        .eq("attempt_id", a.id)
        .in("question_id", ids.slice(i, i + 100));
      if (error) throw error;
      // BOTH response columns: reading only selected_label would score every
      // numeric (JEE Section-B) answer as blank and silently drop real marks.
      for (const r of data as any[])
        answerMap[r.question_id] = {
          selectedLabel: r.selected_label ?? null,
          numericResponse:
            r.numeric_response === null || r.numeric_response === undefined
              ? null
              : Number(r.numeric_response),
        };
    }
    const result = gradeMock(gradeQuestions, answerMap);
    const changed =
      Number(a.score) !== result.score ||
      a.correct_count !== result.correct ||
      a.wrong_count !== result.wrong ||
      a.skipped_count !== result.skipped;
    const delta = result.score - Number(a.score);
    if (!changed) {
      console.log(`  ${a.id.slice(0, 8)}  unchanged (${a.score}/${a.max_score})`);
      continue;
    }
    if (delta < 0) lowered++;
    console.log(
      `  ${a.id.slice(0, 8)}  score ${a.score} -> ${result.score}  (${delta >= 0 ? "+" : ""}${delta.toFixed(2)})` +
        `  correct ${a.correct_count} -> ${result.correct}, wrong ${a.wrong_count} -> ${result.wrong}, skipped ${a.skipped_count} -> ${result.skipped}` +
        (delta < 0 ? "   <-- LOWERS this student's score" : "")
    );
    plan.push({ id: a.id, before: a, after: result });
  }

  if (!plan.length) {
    console.log("\nNothing to re-grade.");
    return;
  }
  if (lowered && !ALLOW_LOWER) {
    console.error(
      `\nREFUSE: ${lowered} attempt(s) would LOSE marks. Re-run with --allow-lower if that is intended.`
    );
    process.exit(1);
  }
  if (!APPLY) {
    console.log(`\nDRY RUN — ${plan.length} attempt(s) would be re-graded. Re-run with --apply.`);
    return;
  }

  for (const p of plan) {
    const { error } = await db
      .from("mock_attempts")
      .update({
        score: p.after.score,
        max_score: p.after.maxScore,
        correct_count: p.after.correct,
        wrong_count: p.after.wrong,
        skipped_count: p.after.skipped,
        section_scores: p.after.sectionScores,
        updated_at: new Date().toISOString(),
      })
      .eq("id", p.id);
    if (error) throw error;
    console.log(`re-graded ${p.id.slice(0, 8)}`);
  }
  console.log(`\n${plan.length} attempt(s) re-graded.`);
  console.log(
    "NOTE: user_activity is append-only by design, so any `answer_wrong` event\n" +
      "logged at submit time for a now-correct answer stays in the history."
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
