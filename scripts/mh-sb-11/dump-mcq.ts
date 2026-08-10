/**
 * Dump a chapter's committed MCQs for BLIND re-derivation (runbook step 4).
 *
 *   npx tsx scripts/mh-sb-11/dump-mcq.ts <chapterId> [outPath]
 *
 * Deliberately omits `is_correct` so the verifying agent cannot see the ingest
 * key — step 4 is an INDEPENDENT re-derivation, not a review of our own answer
 * ("Do NOT trust the ingest key — re-derive"). The agent's output goes to
 * data/<id>.mcq-verify.json and is applied by apply-solutions.ts, which flags
 * `matches_current=false` LOUD for a manual re-key.
 *
 * Guard: every MCQ must carry exactly 4 options. The sibling NCERT pipeline
 * shipped a dump whose field name was wrong, so it silently emitted
 * `options: []` — the verifier then "checked" keys without seeing the options
 * and its verdicts were worthless. Fail loudly instead of dumping empties.
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
  // and the prompt that drives the agent is written by hand each time — so print
  // it here rather than leaving the next author to guess. Getting the field name
  // wrong costs a whole agent run (mark-mcq-verify reports every row as NULL).
  console.log(
    `\nthe verifier must write data/<id>.blind.mcq-verify.json as:\n` +
      `  [{ "id": "<verbatim>", "ref": "<verbatim>", "derived_answer": "A|B|C|D", "why": "<one line>" }]\n` +
      `  ^ the field is derived_answer — NOT "answer".`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
