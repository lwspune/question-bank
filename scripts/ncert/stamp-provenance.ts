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
import { DATA, requireChapter } from "./config";

type CrossCheckRow = { ref: string; verdict: string; note?: string };

const DERIVED_MODEL = "claude-opus-5 (authored; NCERT key prints no answer for this question)";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);
  loadEnv();

  const path = join(DATA, `${id}.crosscheck.json`);
  if (!existsSync(path)) {
    throw new Error(
      `no ${id}.crosscheck.json — run the answer-key cross-check FIRST. This script stamps ` +
        `only the rows that pass recorded as NO-KEY-ENTRY, so without it there is no evidence ` +
        `of which answers the book leaves unconfirmed.`
    );
  }
  const rows: CrossCheckRow[] = JSON.parse(readFileSync(path, "utf8"));

  const tally = new Map<string, number>();
  for (const r of rows) tally.set(r.verdict, (tally.get(r.verdict) ?? 0) + 1);
  console.log(`cross-check verdicts: ${[...tally].map(([k, n]) => `${k}=${n}`).join("  ")}`);

  const targets = rows.filter((r) => r.verdict === "NO-KEY-ENTRY");
  // Structural guard: a solved example carries the book's own solution and must
  // never be claimed as derived. Its ref is "Eg <n>.<m>"; an exercise is "Ex ...".
  const solved = targets.filter((r) => r.ref.startsWith("Eg "));
  if (solved.length) {
    throw new Error(
      `${solved.length} NO-KEY-ENTRY row(s) are SOLVED examples (${solved.map((r) => r.ref).join(", ")}). ` +
        `Those carry the book's own printed solution and are outside the cross-check by ` +
        `construction — they must not be recorded as NO-KEY-ENTRY. Fix the cross-check output.`
    );
  }

  console.log(`\n${targets.length} row(s) to stamp (verdict NO-KEY-ENTRY):`);
  for (const r of targets) console.log(`  ${r.ref}`);
  if (!targets.length) {
    console.log("\nNothing to stamp — the key confirms every exercise answer in this chapter.");
    return;
  }

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to stamp derived_model/derived_at on these ${targets.length} row(s).`);
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const now = new Date().toISOString();
  let stamped = 0;
  for (const r of targets) {
    const { error, count } = await client
      .from("questions")
      .update({ derived_model: DERIVED_MODEL, derived_at: now }, { count: "exact" })
      .eq("exam_id", ch.examId)
      .eq("source_file", ch.sourceFile)
      .eq("question_number", r.ref);
    if (error) throw new Error(`stamp failed for ${r.ref}: ${error.message}`);
    if (count !== 1) throw new Error(`stamp for ${r.ref} matched ${count} rows (expected exactly 1)`);
    stamped++;
  }
  console.log(`\nstamped ${stamped} row(s) with derived_model + derived_at.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
