/**
 * Stamp `derived_model` / `derived_at` on rows whose authored answer the book's
 * answer key DOES NOT CONFIRM.
 *
 *   npx tsx scripts/ncert/stamp-provenance.ts <chapterId>          # dry-run
 *   npx tsx scripts/ncert/stamp-provenance.ts <chapterId> --apply  # write
 *
 * WHY THIS EXISTS, and why it is per-ROW rather than per-chapter
 * ─────────────────────────────────────────────────────────────────────────────
 * The NCERT Maths pipeline needed nothing like this: those answer keys are
 * complete, so every exercise answer we author is checked against the book by
 * the step-6 cross-check before it ships. Physics and Chemistry break that
 * assumption in two different ways, and both are MEASURED:
 *
 *   - PHYSICS keys are complete per chapter but SKIP the conceptual questions —
 *     they print no final value for "explain why" / "state with reasons". Class
 *     11 chapter 1 skips 1.3, 1.4 and 1.8; chapter 7 skips five of twenty-one.
 *   - CHEMISTRY is worse: FOUR chapters have no printed key at all (Class 11
 *     units 3 and 4; Class 12 units 6 and 10), and the ~92 Class-12 "Intext
 *     Questions" have none anywhere — the key's own header reads "Answers to
 *     Some Questions in Exercises".
 *
 * For those rows OUR ANSWER IS THE ONLY ANSWER A STUDENT GETS, and nothing in
 * the book confirms it. A derived answer that does not announce itself reads as
 * an official key — the exact defect caught one step too late in the CDS General
 * Knowledge lane, where provenance was missing at publish time.
 *
 * So the stamp is driven by EVIDENCE, not by a chapter-level flag: it reads the
 * cross-check's own verdicts and stamps exactly the rows it recorded as
 * NO-KEY-ENTRY. A chapter-level "this book has gaps" boolean would over-claim,
 * stamping the majority of rows the key DOES confirm.
 *
 * Deliberately NOT stamped:
 *   - `solved` rows (bucket "solved" → ref "Eg <n>.<m>"). Those carry the BOOK's
 *     own printed worked solution; claiming them as derived is the opposite
 *     error. They are also outside the cross-check by construction, so they can
 *     never appear in crosscheck.json as NO-KEY-ENTRY — but the ref guard below
 *     makes that structural rather than incidental.
 *   - AGREE / BOOK-KEY-WRONG rows. Both were adjudicated against the printed key,
 *     which is a stronger warrant than a stamp.
 *
 * Run AFTER apply-solutions and AFTER the cross-check, and BEFORE flip-public.
 * Provenance belongs to the COMMIT side of the boundary, never the publish side.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA, questionsJsonPath, requireChapter, type Chapter } from "./config";
import { requiredStampRefs, type CrossCheckRow } from "./provenance";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** The rows this chapter's rule requires to be stamped (provenance.ts). */
export function chapterStampTargets(id: string, ch: Chapter): { refs: string[]; model: string } {
  if (!ch.answersPdf) {
    const qPath = questionsJsonPath(id);
    if (!existsSync(qPath)) throw new Error(`no merged transcription at ${qPath} — run merge.ts first`);
    const all: { ref: string }[] = JSON.parse(readFileSync(qPath, "utf8"));
    return requiredStampRefs({ hasAnswerKey: false, questionRefs: all.map((r) => r.ref), crosscheck: null });
  }
  const path = join(DATA, `${id}.crosscheck.json`);
  const crosscheck: CrossCheckRow[] | null = existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : null;
  return requiredStampRefs({ hasAnswerKey: true, questionRefs: [], crosscheck });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);
  loadEnv();

  const { refs, model } = chapterStampTargets(id, ch);
  console.log(`${id}: ${refs.length} row(s) need the derived-answer stamp (${ch.answersPdf ? "NO-KEY-ENTRY in the cross-check" : "this book publishes no answer key"}).`);
  if (!refs.length) {
    console.log("Nothing to stamp — the key confirms every exercise answer in this chapter.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  // What REMAINS, not what is in scope: before 2026-11-17 the dry run printed the
  // same "would stamp N" before and after an apply, and that was misread as an
  // apply that never ran.
  const { data, error: rErr } = await client
    .from("questions")
    .select("question_number, derived_model")
    .eq("exam_id", ch.examId)
    .eq("source_file", ch.sourceFile);
  if (rErr) throw new Error(`read failed: ${rErr.message}`);
  const stampedAlready = new Set(
    ((data ?? []) as { question_number: string | null; derived_model: string | null }[])
      .filter((r) => r.derived_model)
      .map((r) => r.question_number)
  );
  const remaining = refs.filter((r) => !stampedAlready.has(r));
  console.log(`${refs.length - remaining.length} already stamped, ${remaining.length} remaining:`);
  for (const r of remaining) console.log(`  ${r}`);
  if (!remaining.length) return;

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to stamp derived_model/derived_at on these ${remaining.length} row(s).`);
    return;
  }

  const now = new Date().toISOString();
  let stamped = 0;
  for (const ref of remaining) {
    const { error, count } = await client
      .from("questions")
      .update({ derived_model: model, derived_at: now }, { count: "exact" })
      .eq("exam_id", ch.examId)
      .eq("source_file", ch.sourceFile)
      .eq("question_number", ref);
    if (error) throw new Error(`stamp failed for ${ref}: ${error.message}`);
    if (count !== 1) throw new Error(`stamp for ${ref} matched ${count} rows (expected exactly 1)`);
    stamped++;
  }
  console.log(`\nstamped ${stamped} row(s) with derived_model + derived_at.`);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
