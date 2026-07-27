/**
 * Dump a committed paper's STORED answers for cross-checking against the
 * official solution bundled inside the source PDF.
 *
 *   npx tsx scripts/mh-ssc-10/dump-answers.ts alg-2016
 *
 * Writes out/<id>/answers.md — one block per question, in paper order, carrying
 * the stem, the options with the stored key marked, and the stored solution.
 *
 * Guard: refuses to dump unless every row carries a real answer (a key for an
 * MCQ, solution text for a subjective). A cross-check run against empty answers
 * reports a meaningless all-AGREE — that exact bug wasted a pass on the State
 * Board Line-and-Planes chapter, where the dump emitted a `has_solution`
 * boolean instead of the solution text.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, OUT, requirePaper } from "./config";

type Row = {
  question_number: string | null;
  source_row: number | null;
  question_format: string | null;
  text: string;
  context: string | null;
  solution: string | null;
  options: { label: string; text: string; is_correct: boolean }[];
};

async function main() {
  const id = process.argv[2];
  const paper = requirePaper(id);
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await client
    .from("questions")
    .select(
      "question_number, source_row, question_format, text, context, solution, options(label, text, is_correct)"
    )
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile)
    .order("source_row", { ascending: true });
  if (error) throw new Error(`read failed: ${error.message}`);
  const rows = (data ?? []) as unknown as Row[];
  if (rows.length === 0) throw new Error(`no committed rows for ${paper.sourceFile}`);

  const unanswered = rows.filter((r) =>
    r.question_format === "mcq"
      ? !r.options.some((o) => o.is_correct)
      : !r.solution || !r.solution.trim()
  );
  if (unanswered.length > 0) {
    throw new Error(
      `${unanswered.length} row(s) carry no answer (${unanswered
        .map((r) => r.question_number)
        .slice(0, 8)
        .join(", ")}). Refusing to dump — a cross-check against empty answers ` +
        `reports a meaningless all-AGREE.`
    );
  }

  const out: string[] = [
    `# ${paper.subjectName} ${paper.year} — STORED answers (${rows.length} questions)`,
    ``,
    `Source file: ${paper.sourceFile}`,
    `Cross-check these against the official solution bundled in the source PDF.`,
    ``,
  ];
  for (const r of rows) {
    out.push(`## ${r.question_number ?? "(no ref)"}  [${r.question_format ?? "mcq"}]`);
    if (r.context) out.push(`CONTEXT: ${r.context}`);
    out.push(`STEM: ${r.text}`);
    if (r.options.length > 0) {
      for (const o of r.options.sort((a, b) => a.label.localeCompare(b.label))) {
        out.push(`  ${o.is_correct ? "→" : " "} (${o.label}) ${o.text}`);
      }
    }
    out.push(`STORED ANSWER: ${r.solution ?? "(none)"}`);
    out.push("");
  }

  const dir = join(OUT, id);
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "answers.md");
  writeFileSync(target, out.join("\n"), "utf8");
  console.log(`${id}: ${rows.length} rows → ${target}`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
