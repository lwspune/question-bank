/**
 * Assert the published CDS mocks are faithful, gradeable snapshots.
 *
 *   npx tsx scripts/cds/verify-mocks.ts
 *
 * A mock stores only ordered question REFS; content and the key are resolved
 * live at delivery. So a snapshot can be structurally perfect and still be
 * undeliverable — if a referenced question is PRIVATE the runner renders a blank
 * question with no options and NO ERROR (loadMockQuestionViews falls back to
 * `text: ""`), and the grader finds no key and marks every answered question
 * WRONG with a penalty. Nothing else in the stack checks for that, so this does.
 *
 * Checks per mock: 120 refs, positions contiguous 1..120, distinct question ids,
 * every referenced row live + PUBLIC + exactly one correct option + four
 * DISTINCT option texts (the CDS defect class was a correct answer sitting at
 * the wrong letter beside a duplicate), and the snapshot's totals self-consistent.
 *
 * Exits non-zero on any failure. Read-only.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID } from "./config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const EXPECTED_Q = 120;
const EXPECTED_MARKS = 100;
const EXPECTED_SECS = 7200;

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: mocks, error } = await db
    .from("mock_tests")
    .select("slug, title, status, duration_secs, total_questions, total_marks, sections, questions")
    .eq("exam_id", EXAM_ID)
    .order("slug");
  if (error) throw new Error(`mock_tests: ${error.message}`);

  const problems: string[] = [];
  let checked = 0;

  for (const m of (mocks ?? []) as Record<string, unknown>[]) {
    const slug = m.slug as string;
    const qs = (m.questions ?? []) as { position: number; questionId: string }[];
    const fail = (s: string) => problems.push(`${slug}: ${s}`);

    if (m.total_questions !== EXPECTED_Q) fail(`total_questions ${m.total_questions}`);
    if (Number(m.total_marks) !== EXPECTED_MARKS) fail(`total_marks ${m.total_marks}`);
    if (m.duration_secs !== EXPECTED_SECS) fail(`duration_secs ${m.duration_secs}`);
    if (qs.length !== EXPECTED_Q) fail(`${qs.length} question refs`);

    const positions = qs.map((q) => q.position).sort((a, b) => a - b);
    const contiguous = positions.every((p, i) => p === i + 1);
    if (!contiguous) fail(`positions are not contiguous 1..${qs.length}`);

    const ids = qs.map((q) => q.questionId);
    if (new Set(ids).size !== ids.length) fail(`duplicate question ids in the snapshot`);

    // Resolve every referenced question exactly as delivery would.
    const seen = new Map<string, { visibility: string; opts: { text: string; is_correct: boolean }[] }>();
    for (let i = 0; i < ids.length; i += 100) {
      const chunk = ids.slice(i, i + 100);
      const { data, error: qErr } = await db
        .from("questions")
        .select("id, visibility, options(text, is_correct)")
        .in("id", chunk);
      if (qErr) throw new Error(`${slug}: question fetch: ${qErr.message}`);
      for (const r of (data ?? []) as Record<string, unknown>[]) {
        seen.set(r.id as string, {
          visibility: r.visibility as string,
          opts: (r.options ?? []) as { text: string; is_correct: boolean }[],
        });
      }
    }

    let missing = 0;
    let notPublic = 0;
    let badKey = 0;
    let dupOpts = 0;
    for (const id of ids) {
      const row = seen.get(id);
      if (!row) {
        missing += 1;
        continue;
      }
      if (row.visibility !== "PUBLIC") notPublic += 1;
      if (row.opts.filter((o) => o.is_correct).length !== 1) badKey += 1;
      const texts = row.opts.map((o) => (o.text ?? "").trim());
      if (new Set(texts).size !== texts.length) dupOpts += 1;
    }
    if (missing) fail(`${missing} referenced question(s) do not exist`);
    if (notPublic) fail(`${notPublic} referenced question(s) are not PUBLIC (would render BLANK)`);
    if (badKey) fail(`${badKey} referenced question(s) lack exactly one correct option (ungradeable)`);
    if (dupOpts) fail(`${dupOpts} referenced question(s) still have duplicate option texts`);

    checked += 1;
    if (problems.length === 0 || !problems.some((p) => p.startsWith(`${slug}:`))) {
      console.log(`  ✓ ${slug.padEnd(20)} ${m.status}  ${qs.length}q / ${m.total_marks}m`);
    }
  }

  console.log(`\nchecked ${checked} CDS mock(s)`);
  if (problems.length) {
    console.log(`\n✗ ${problems.length} problem(s):`);
    problems.forEach((p) => console.log(`    ${p}`));
    process.exit(1);
  }
  console.log("all faithful, deliverable and gradeable.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
