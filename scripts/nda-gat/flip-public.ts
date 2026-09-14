/**
 * Publish a committed GAT paper.
 *
 *   npx tsx scripts/nda-gat/flip-public.ts 2026-2                  # dry-run: gates only
 *   npx tsx scripts/nda-gat/flip-public.ts 2026-2 --apply
 *   npx tsx scripts/nda-gat/flip-public.ts 2026-2 --revert --apply
 *
 * SIX GATES, each REFUSING rather than warning. Five are ported from
 * scripts/nda-pyq; the sixth is specific to a GAT paper.
 *
 *  1. PROVENANCE — every row must carry `derived_model`. A UPSC booklet prints
 *     no key, so every answer here is derived, and a published derived answer
 *     that does not announce itself reads as an official key. Keyed on the
 *     COLUMN, never on a prose match, so re-wording the disclosure cannot
 *     silently disarm the gate. (The CDS General Knowledge lesson.)
 *  2. FIGURES — a stem that points at a diagram must have one, and no row may
 *     carry an image its transcription never asked for.
 *  3. SOLUTIONS — no row may publish without one.
 *  4. OPTION INTEGRITY — 4 options, exactly 1 correct, no duplicate or blank
 *     text. The duplicate check is CASE-SENSITIVE on purpose: in the sibling
 *     Maths corpus the case IS the variable (`H tan g` vs `h tan g`), and
 *     lowercasing reported three duplicate-option defects on a clean paper.
 *  5. COVERAGE — 1..150 present, except numbers the answers file deliberately
 *     records as unanswerable. Intended drops are READ from that file rather
 *     than inferred from the gap, because inferring makes every hole
 *     self-justifying.
 *  6. SECTIONS — the GAT-specific one. `NDA_GAT_PAPER` declares two sections
 *     with HARD counts (english 50, gk 100) reconstructed by SUBJECT
 *     membership, so a single English question mis-filed under Physics makes
 *     the sections 49/101 and the mock FAILS TO BUILD with an error naming
 *     neither the question nor the cause. The boundary is printed on the page
 *     (PART A p2, PART B p9), so it is checkable against the source rather than
 *     inferred.
 */
import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import {
  EXAM_ID,
  QUESTIONS_PER_PAPER,
  dataPath,
  requirePaper,
} from "./config";
import { ENGLISH_SUBJECT, PART_A_LAST } from "./lib";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type LiveRow = {
  id: string;
  question_number: string | null;
  solution: string | null;
  image_url: string | null;
  derived_model: string | null;
  visibility: string;
  subjects: { name: string } | { name: string }[] | null;
  options: { label: string; text: string; is_correct: boolean }[];
};

const subjectName = (v: LiveRow["subjects"]): string =>
  Array.isArray(v) ? (v[0]?.name ?? "") : (v?.name ?? "");

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const revert = process.argv.includes("--revert");

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await db
    .from("questions")
    .select(
      "id, question_number, solution, image_url, derived_model, visibility, subjects(name), options(label, text, is_correct)"
    )
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (error) throw error;
  const rows = (data ?? []) as unknown as LiveRow[];
  console.log(`${paper.id}: ${rows.length} row(s) under ${paper.sourceFile}`);

  if (revert) {
    if (!apply) {
      console.log(`[dry-run] would set ${rows.length} row(s) PRIVATE. Nothing written.`);
      return;
    }
    const { error: e, count } = await db
      .from("questions")
      .update({ visibility: "PRIVATE" }, { count: "exact" })
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile);
    if (e) throw e;
    console.log(`reverted ${count} row(s) to PRIVATE.`);
    return;
  }

  const problems: string[] = [];

  // 1. provenance
  const unstamped = rows.filter((r) => !r.derived_model);
  if (unstamped.length) {
    problems.push(
      `${unstamped.length} row(s) carry no derived_model — run stamp-provenance.ts first. ` +
        `A derived answer published without provenance reads as an official key.`
    );
  }

  // 2. figures
  const qPath = dataPath(paper.id, "questions");
  if (existsSync(qPath)) {
    const qf = JSON.parse(readFileSync(qPath, "utf8")) as {
      questions?: { number: number; hasFigure?: boolean }[];
    };
    const want = new Set(
      (qf.questions ?? []).filter((q) => q.hasFigure).map((q) => String(q.number))
    );
    const missingImg = rows.filter((r) => want.has(String(r.question_number)) && !r.image_url);
    const strayImg = rows.filter((r) => r.image_url && !want.has(String(r.question_number)));
    if (missingImg.length)
      problems.push(
        `${missingImg.length} figure question(s) have no image_url: Q${missingImg.map((r) => r.question_number).join(", Q")}`
      );
    if (strayImg.length)
      problems.push(
        `${strayImg.length} row(s) carry an image the transcription did not ask for: Q${strayImg.map((r) => r.question_number).join(", Q")}`
      );
    console.log(`  figures expected by the transcription: ${want.size}`);
  } else {
    problems.push(`missing ${qPath} — cannot check figure coverage`);
  }

  // 3. solutions
  const noSoln = rows.filter((r) => !r.solution?.trim());
  if (noSoln.length)
    problems.push(`${noSoln.length} row(s) have no solution: Q${noSoln.map((r) => r.question_number).join(", Q")}`);

  // 4. option integrity — case-sensitive, see the header
  const norm = (s: string) => (s ?? "").replace(/\s+/g, " ").trim();
  for (const r of rows) {
    const opts = r.options ?? [];
    if (opts.length !== 4) problems.push(`Q${r.question_number}: ${opts.length} options, expected 4`);
    const correct = opts.filter((o) => o.is_correct).length;
    if (correct !== 1) problems.push(`Q${r.question_number}: ${correct} correct options, expected exactly 1`);
    const texts = opts.map((o) => norm(o.text));
    if (new Set(texts).size !== texts.length) problems.push(`Q${r.question_number}: duplicate option text`);
    if (texts.some((t) => !t)) problems.push(`Q${r.question_number}: blank option`);
  }

  // 5. coverage
  const intended = new Set<number>();
  const aPath = dataPath(paper.id, "answers");
  if (existsSync(aPath)) {
    const f = JSON.parse(readFileSync(aPath, "utf8")) as {
      derivations?: { number: number; answer: string | null }[];
    };
    for (const d of f.derivations ?? []) if (d.answer == null) intended.add(d.number);
  }
  const nums = new Set(rows.map((r) => Number(r.question_number)));
  const missing: number[] = [];
  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) if (!nums.has(n) && !intended.has(n)) missing.push(n);
  if (missing.length) problems.push(`paper is short: missing Q${missing.join(", Q")}`);
  if (intended.size) console.log(`  note: Q${[...intended].join(", Q")} deliberately absent.`);

  // 6. sections — the GAT-specific gate
  const partA = rows.filter((r) => Number(r.question_number) <= PART_A_LAST);
  const partB = rows.filter((r) => Number(r.question_number) > PART_A_LAST);
  const aWrong = partA.filter((r) => subjectName(r.subjects) !== ENGLISH_SUBJECT);
  const bWrong = partB.filter((r) => subjectName(r.subjects) === ENGLISH_SUBJECT);
  if (aWrong.length)
    problems.push(
      `${aWrong.length} Part A row(s) are not ${ENGLISH_SUBJECT}: ` +
        aWrong.map((r) => `Q${r.question_number}=${subjectName(r.subjects)}`).join(", ")
    );
  if (bWrong.length)
    problems.push(
      `${bWrong.length} Part B row(s) are ${ENGLISH_SUBJECT}: Q${bWrong.map((r) => r.question_number).join(", Q")}`
    );
  console.log(`  sections: Part A ${partA.length} ${ENGLISH_SUBJECT} · Part B ${partB.length} General Knowledge`);

  if (problems.length) {
    console.log(`\nREFUSING TO PUBLISH (${problems.length} problem(s)):`);
    for (const p of problems) console.log(`  - ${p}`);
    // exitCode + return, never process.exit(): calling exit() while the Supabase
    // client still holds open handles trips a libuv assertion on Windows, which
    // prints after the real output and would mask a genuine error next to it.
    process.exitCode = 1;
    return;
  }
  console.log(`\nall gates pass: provenance, figures, solutions, option integrity, coverage, sections.`);

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to publish ${rows.length} row(s). Nothing written.`);
    return;
  }

  const { error: uErr, count } = await db
    .from("questions")
    .update({ visibility: "PUBLIC" }, { count: "exact" })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (uErr) throw new Error(`publish failed: ${uErr.message}`);

  // Read back rather than trusting the update's own count.
  const { count: nowPublic } = await db
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile)
    .eq("visibility", "PUBLIC");
  console.log(`published ${count} row(s); ${nowPublic} of ${rows.length} now PUBLIC.`);
  if (nowPublic !== rows.length) throw new Error(`expected all ${rows.length} PUBLIC, found ${nowPublic}`);
  console.log(`\nreversible: npx tsx scripts/nda-gat/flip-public.ts ${paper.id} --revert --apply`);
}

main().catch((e) => {
  console.error("FAILED:", e.message ?? e);
  process.exitCode = 1;
});
