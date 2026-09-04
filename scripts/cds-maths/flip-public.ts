/**
 * Publish a committed CDS Elementary Mathematics paper — PRIVATE -> PUBLIC.
 *
 *   npx tsx scripts/cds-maths/flip-public.ts <paperId>            # dry-run: gates only
 *   npx tsx scripts/cds-maths/flip-public.ts <paperId> --apply    # publish
 *   npx tsx scripts/cds-maths/flip-public.ts <paperId> --revert --apply   # back to PRIVATE
 *
 * Scoped to ONE paper's `source_file` so it can never reach another sitting, or
 * the CDS English / General Knowledge rows that share this exam.
 *
 * FIVE GATES, each earned somewhere in this repo. Every one REFUSES rather than
 * warning, because a publish is outward-facing and the failure modes below are
 * all silent once live.
 *
 *  1. PROVENANCE. No booklet in this corpus prints a key, so every answer is
 *     derived. A published derived answer with no `derived_model` reads as an
 *     official key. Keyed on the COLUMN, never on a prose match in the note, so
 *     re-wording the disclosure cannot silently disarm the gate.
 *  2. FIGURES. A question whose stem says "in the figure given below" and which
 *     carries no `image_url` is unanswerable the moment it goes public. Checked
 *     against the transcription's own `hasFigure`, both ways.
 *  3. SOLUTIONS. A published PYQ with no solution shows a student a bare letter.
 *  4. OPTION INTEGRITY. Exactly four options, exactly one correct, no duplicate
 *     text. A duplicate makes the answer ambiguous as a LETTER even when it is
 *     unambiguous as fact — the defect class that produced 19 wrong keys on the
 *     sibling CDS English corpus.
 *  5. COVERAGE. The paper must be whole. A short paper is a finding.
 *
 * `--revert` exists so publishing is reversible in one command, which is what
 * makes it a decision rather than a commitment.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const revert = process.argv.includes("--revert");
  loadEnv();

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: rows, error } = await client
    .from("questions")
    .select("id, question_number, visibility, solution, derived_model, image_url, options(label, is_correct, text)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (error) throw new Error(`read failed: ${error.message}`);
  if (!rows?.length) throw new Error(`no rows for ${paper.sourceFile} — commit the paper first`);

  const pub = rows.filter((r) => r.visibility === "PUBLIC").length;
  console.log(`${paper.id} (${paper.sourceFile}): ${rows.length} row(s), ${pub} already PUBLIC`);

  if (revert) {
    if (!apply) {
      console.log(`\n[dry-run] would set ${rows.length} row(s) PRIVATE. Nothing written.`);
      return;
    }
    const { error: rErr, count } = await client
      .from("questions")
      .update({ visibility: "PRIVATE" }, { count: "exact" })
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile);
    if (rErr) throw new Error(`revert failed: ${rErr.message}`);
    console.log(`reverted ${count} row(s) to PRIVATE.`);
    return;
  }

  const problems: string[] = [];

  // 1. provenance
  const noProv = rows.filter((r) => !r.derived_model);
  if (noProv.length) {
    problems.push(
      `${noProv.length} row(s) have no derived_model — run stamp-provenance.ts first. ` +
        `Publishing a derived answer that does not announce itself reads as an official key. ` +
        `(Q${noProv.slice(0, 8).map((r) => r.question_number).join(", Q")}${noProv.length > 8 ? ", ..." : ""})`
    );
  }

  // 2. figures, both ways, against the transcription's own flags
  const qPath = dataPath(paper.id, "questions");
  if (existsSync(qPath)) {
    const qs = JSON.parse(readFileSync(qPath, "utf8")) as { number: number; hasFigure?: boolean }[];
    const wantFig = new Set(qs.filter((q) => q.hasFigure).map((q) => String(q.number)));
    const missingImg = rows.filter((r) => wantFig.has(String(r.question_number)) && !r.image_url);
    const strayImg = rows.filter((r) => r.image_url && !wantFig.has(String(r.question_number)));
    if (missingImg.length) {
      problems.push(
        `${missingImg.length} figure question(s) have no image_url — the stem points at a diagram ` +
          `that would not be there: Q${missingImg.map((r) => r.question_number).join(", Q")}`
      );
    }
    if (strayImg.length) {
      problems.push(
        `${strayImg.length} row(s) carry an image the transcription did not ask for: ` +
          `Q${strayImg.map((r) => r.question_number).join(", Q")}`
      );
    }
  } else {
    problems.push(`missing ${qPath} — cannot check figure coverage`);
  }

  // 3. solutions
  const noSoln = rows.filter((r) => !r.solution?.trim());
  if (noSoln.length) {
    problems.push(`${noSoln.length} row(s) have no solution: Q${noSoln.map((r) => r.question_number).join(", Q")}`);
  }

  // 4. option integrity
  // CASE-SENSITIVE on purpose, and this gate is where getting it wrong is most
  // expensive. In a maths corpus the case IS the variable: 2023-II Q31 offers
  // `H tan(g) - h tan(b)` against `h tan(g) - H tan(b)` (H is the flagstaff-top
  // height, h the tower height) and Q39/Q40 offer `2r^2/(R-r)` against
  // `2R^2/(R-r)`. Lowercasing collapses each pair, so the gate reported three
  // "duplicate option" defects on a paper that has none -- refusing to publish a
  // correct paper, and inviting a "repair" that would DESTROY the discriminator
  // the question turns on. lib.ts carried the same bug and was fixed first; this
  // copy was missed, which is the argument for one shared normaliser.
  const norm = (s: string) => (s ?? "").replace(/\s+/g, " ").trim();
  for (const r of rows) {
    const opts = (r.options ?? []) as { label: string; is_correct: boolean; text: string }[];
    if (opts.length !== 4) problems.push(`Q${r.question_number}: ${opts.length} options, expected 4`);
    const correct = opts.filter((o) => o.is_correct).length;
    if (correct !== 1) problems.push(`Q${r.question_number}: ${correct} correct options, expected exactly 1`);
    const texts = opts.map((o) => norm(o.text));
    if (new Set(texts).size !== texts.length) problems.push(`Q${r.question_number}: duplicate option text`);
    if (texts.some((t) => !t)) problems.push(`Q${r.question_number}: blank option`);
  }

  // 5. coverage
  const nums = new Set(rows.map((r) => Number(r.question_number)));
  const missing: number[] = [];
  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) if (!nums.has(n)) missing.push(n);
  if (missing.length) problems.push(`paper is short: missing Q${missing.join(", Q")}`);

  if (problems.length) {
    console.log(`\nREFUSING TO PUBLISH (${problems.length} problem(s)):`);
    for (const p of problems) console.log(`  - ${p}`);
    process.exit(1);
  }
  console.log(`\nall gates pass: provenance, figures, solutions, option integrity, coverage.`);

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to publish ${rows.length} row(s). Nothing written.`);
    return;
  }

  const { error: uErr, count } = await client
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (uErr) throw new Error(`publish failed: ${uErr.message}`);

  // Read back rather than trusting the update's own count.
  const { count: nowPublic } = await client
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile)
    .eq("visibility", "PUBLIC");
  console.log(`published ${count} row(s); ${nowPublic} of ${rows.length} now PUBLIC.`);
  if (nowPublic !== rows.length) throw new Error(`expected all ${rows.length} rows PUBLIC, found ${nowPublic}`);
  console.log(`\nreversible: npx tsx scripts/cds-maths/flip-public.ts ${paper.id} --revert --apply`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
