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

  // Live key, chunked — an .in() filter rides in the URL and a few hundred
  // uuids exceeds the request line.
  const key: Record<string, string> = {};
  const ids = snapshot.map((q) => q.questionId);
  for (let i = 0; i < ids.length; i += 100) {
    const { data, error } = await db
      .from("options")
      .select("question_id,label,is_correct")
      .in("question_id", ids.slice(i, i + 100))
      .eq("is_correct", true);
    if (error) throw error;
    for (const o of data as any[]) key[o.question_id] = o.label;
  }
  const missing = ids.filter((id) => !key[id]);
  if (missing.length) {
    console.error(`REFUSE: ${missing.length} question(s) in the snapshot have no correct option.`);
    process.exit(1);
  }
  // Narrow by VALIDATING, never by casting: an unexpected label silently
  // mis-grades every attempt, and a cast would hide exactly that.
  const LABELS = ["A", "B", "C", "D"] as const;
  type Label = (typeof LABELS)[number];
  const isLabel = (v: string): v is Label => (LABELS as readonly string[]).includes(v);
  const badLabel = ids.filter((id) => !isLabel(key[id]));
  if (badLabel.length) {
    console.error(
      `REFUSE: ${badLabel.length} question(s) have a correct option outside A-D ` +
        `(e.g. ${badLabel[0]} -> ${JSON.stringify(key[badLabel[0]])}).`
    );
    process.exit(1);
  }

  const gradeQuestions: MockGradeQuestion[] = snapshot.map((q) => ({
    questionId: q.questionId,
    sectionKey: q.sectionKey,
    marks: q.marks,
    negMarks: q.negMarks,
    answer: key[q.questionId] as Label,
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
    const answerMap: Record<string, string | null> = {};
    for (let i = 0; i < ids.length; i += 100) {
      const { data, error } = await db
        .from("attempt_answers")
        .select("question_id,selected_label")
        .eq("attempt_id", a.id)
        .in("question_id", ids.slice(i, i + 100));
      if (error) throw error;
      for (const r of data as any[]) answerMap[r.question_id] = r.selected_label;
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
