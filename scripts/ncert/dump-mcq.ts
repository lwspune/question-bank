/**
 * Dump a chapter's committed MCQs for BLIND re-derivation (runbook step 4).
 *
 *   npx tsx scripts/ncert/dump-mcq.ts <chapterId> [outPath]
 *
 * Deliberately omits `is_correct` so the verifying agent cannot see the ingest
 * key — step 4 is an INDEPENDENT re-derivation, not a review of our own answer.
 * The agent's output goes to data/<id>.blind.mcq-verify.json; mark-mcq-verify.ts
 * stamps `matches_current` HERE (the verifier must not self-report agreement, or
 * it stops being blind), and apply-solutions.ts flags every mismatch LOUD.
 *
 * Guard: every MCQ must carry exactly 4 options. THIS pipeline is the one that
 * earned the guard — an earlier NCERT dump used a wrong field name and silently
 * emitted `options: []`, so the verifier "checked" keys it could not see and
 * recommended flipping a correct key (Integrals Ex 7.9 Q9, caught only by
 * source-verification). Fail loudly instead of dumping empties.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requireChapter, DATA } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  loadEnv();
  const id = process.argv[2];
  const chapter = requireChapter(id);
  const out = process.argv[3] ?? join(DATA, `${id}.mcq-blind.json`);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data, error } = await db
    .from("questions")
    .select("id, question_number, source_row, text, context, options(label, text)")
    .eq("exam_id", chapter.examId)
    .eq("source_file", chapter.sourceFile)
    .eq("question_format", "mcq")
    .order("source_row");
  if (error) throw error;

  const rows = (data ?? []).map((q: any) => ({
    id: q.id,
    ref: q.question_number,
    stem: q.text,
    context: q.context ?? null,
    options: (q.options ?? [])
      .slice()
      .sort((a: any, b: any) => String(a.label).localeCompare(String(b.label)))
      .map((o: any) => ({ label: o.label, text: o.text })),
  }));

  if (!rows.length) throw new Error(`no MCQ rows found for source_file="${chapter.sourceFile}"`);
  const bad = rows.filter((r) => r.options.length !== 4);
  if (bad.length) {
    throw new Error(
      `refusing to dump: ${bad.length} row(s) do not carry exactly 4 options — ` +
        bad.map((b) => `${b.ref}(${b.options.length})`).join(", ")
    );
  }

  writeFileSync(out, JSON.stringify(rows, null, 2), "utf-8");
  console.log(`dumped ${rows.length} MCQ rows (no is_correct) -> ${out}`);
  console.log(`guard OK: every row carries 4 options. refs: ${rows[0].ref} … ${rows[rows.length - 1].ref}`);
  // The verifying agent's output schema is a CONTRACT with mark-mcq-verify.ts,
  // and the prompt driving the agent is hand-written each time — so print it here
  // rather than leaving the next author to guess. A wrong field name costs a
  // whole agent run (mark-mcq-verify then reports every row as NULL).
  console.log(
    `\nthe verifier must write data/${id}.blind.mcq-verify.json as:\n` +
      `  [{ "id": "<verbatim>", "ref": "<verbatim>", "derived_answer": "A|B|C|D", "solution": "<brief>" }]\n` +
      `  ^ the field is derived_answer — NOT "answer".\n` +
      `\nGIVE THE AGENT scripts/ncert/MCQ_VERIFY_BRIEF.md. Its \`solution\` is written straight\n` +
      `onto the question row and SHIPS TO STUDENTS, so it must use LaTeX \\(...\\) for all math\n` +
      `and must NEVER name an option by letter (audit:keys reads a named letter as the\n` +
      `concluded answer and fires SOLN≠KEY). A run briefed only on the schema produced 27 of\n` +
      `29 solutions naming letters and 28 of 29 in plain text, and needed a rewrite pass.`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
