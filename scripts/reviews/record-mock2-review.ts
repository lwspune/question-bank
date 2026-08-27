/**
 * Record the RULE 4 + RULE 5 review of Blueprint Mock 2.
 *
 *   npx tsx scripts/reviews/record-mock2-review.ts            # dry run
 *   npx tsx scripts/reviews/record-mock2-review.ts --apply
 *
 * Verdicts are DERIVED from the blind results, not hand-typed, so the record
 * cannot drift from the evidence that produced it:
 *
 *   blind letter == stored key            -> confirmed
 *   row whose STEM was repaired this run  -> stem_fixed
 *   row whose SOLUTION was rewritten      -> solution_rewritten
 *
 * METHOD is `blind_rederivation` for every row: each was solved from the stem
 * and options alone, with the key and stored solution withheld from the dump.
 * That is the stronger of the two methods and the honest label here.
 *
 * A row with no blind derivation is REFUSED rather than recorded as confirmed —
 * "nobody checked this" and "somebody checked it and it was fine" are the two
 * states this table exists to keep apart.
 *
 * `reviewed_content_hash` is read AFTER the repairs landed, so a stem fixed in
 * this run is fingerprinted as reviewed in its corrected form.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const PAPER = "9248f15d-ef90-4b18-822a-aafd5ef4c50c";
const RUN = "paper-blind:2026-08-27-blueprint-mock-2";
const BLIND_DIR = join(process.cwd(), "scripts", "reviews", "data", "blind", "2026-08-27-mock2");

/** Rows changed during this review, with the verdict that describes the change. */
const CHANGED: Record<string, { verdict: ReviewInput["verdict"]; note: string }> = {
  // Q1130 — the stored stem said tan(alpha/2) = b/a and matched no option.
  "6d644819-04ee-45e1-bb22-170f90f59c89": {
    verdict: "stem_fixed",
    note:
      "Blind pass returned NONE against the stored stem. Source-verified against the printed booklet " +
      "(2 Trigonometry page 53-72.pdf, page index 6, left column): it prints tan(alpha) = b/a, not " +
      "tan(alpha/2). Stem repaired and re-derived blind against the corrected text, which agrees with " +
      "the stored key A, 2 sin(alpha)/sqrt(cos 2 alpha).",
  },
  // Q607 — RULE 5: the solution opened with an internal KEY DISPUTE note.
  "330725d3-30be-4b53-bf8f-7f47d109a7cb": {
    verdict: "solution_rewritten",
    note:
      "RULE 5: the stored solution opened 'KEY DISPUTE: answer key = C, but the correct value is option " +
      "B', printing an unresolved-sounding dispute to a student. The dispute is settled - the stored key " +
      "is already B and the determinant is exactly 2(15!)(16!)(17!), verified in exact integer " +
      "arithmetic. Reworded to derive the value, naming the booklet's wrong key by VALUE not letter.",
  },
};

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Latest blind derivation per questionId. Later files win, which is how the
  // re-derivations (batch 9-11) supersede the stale ones they replace.
  const blind = new Map<string, { derived: string; value?: string; note?: string }>();
  for (const f of readdirSync(BLIND_DIR).filter((f) => /^result\d+\.json$/.test(f)).sort(
    (a, b) => Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0])
  )) {
    for (const r of JSON.parse(readFileSync(join(BLIND_DIR, f), "utf8")) as any[]) {
      const id = r.questionId ?? r.id;
      if (id) blind.set(String(id), { derived: r.derived, value: r.value, note: r.note ?? r.why });
    }
  }

  const { data, error } = await db
    .from("paper_questions")
    .select("questions!inner(id, question_number, content_hash, options(label, is_correct))")
    .eq("paper_id", PAPER);
  if (error) throw error;
  const rows = (data as any[]).map((r) => r.questions);

  const inputs: ReviewInput[] = [];
  const problems: string[] = [];
  const tally: Record<string, number> = {};

  for (const q of rows) {
    const key = (q.options as any[]).find((o) => o.is_correct)?.label ?? null;
    const b = blind.get(q.id);
    if (!b) {
      problems.push(`Q${q.question_number}: no blind derivation — refusing to record a verdict`);
      continue;
    }
    if (!key) {
      problems.push(`Q${q.question_number}: no correct option`);
      continue;
    }
    const got = (b.derived ?? "").trim().toUpperCase();
    if (got !== key) {
      problems.push(`Q${q.question_number}: blind=${got} but key=${key} — adjudicate, do not record`);
      continue;
    }

    const changed = CHANGED[q.id];
    const verdict = changed?.verdict ?? "confirmed";
    const note =
      changed?.note ??
      `Blind re-derivation agreed with the stored key ${key}. Derived: ${(b.value ?? "").slice(0, 200)}`;
    tally[verdict] = (tally[verdict] ?? 0) + 1;
    inputs.push({
      questionId: q.id,
      reviewedContentHash: q.content_hash,
      method: "blind_rederivation",
      verdict,
      runLabel: RUN,
      note: note.slice(0, 480),
      source: "live",
    });
  }

  console.log(`paper rows ${rows.length} | blind derivations available ${blind.size}`);
  console.log(`verdicts ready ${inputs.length}`, tally);
  if (problems.length) {
    console.error(`\n${problems.length} row(s) NOT recorded:`);
    problems.forEach((p) => console.error("  " + p));
  }
  if (inputs.length !== rows.length) {
    console.error(`\nREFUSE: ${rows.length - inputs.length} of ${rows.length} rows unrecorded.`);
    process.exit(1);
  }
  if (!APPLY) {
    console.log("\nDRY RUN — re-run with --apply.");
    return;
  }
  const res = await recordReviews(db as any, inputs);
  console.log(formatRecordResult(res));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
