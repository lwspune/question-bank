/**
 * Record, in `question_reviews`, that a CDS English paper's answers were checked
 * against an OFFICIAL published key.
 *
 *   npx tsx scripts/cds/record-key-reviews.ts <paperId>            # DRY RUN
 *   npx tsx scripts/cds/record-key-reviews.ts <paperId> --apply    # write
 *
 * WHY THIS EXISTS. `question_reviews` (migration 0074) is where this repo keeps
 * "who checked what, how, and what they concluded". A paper checked against
 * ground truth is the strongest verdict this corpus can produce, and leaving it
 * recorded only in a JSON file under scripts/ would keep it invisible to
 * `reviews:report` and to anyone asking the bank what has been verified.
 *
 * NOTE, because a stale ledger line says otherwise: CDS English was NOT at zero
 * review rows before this. `SUGGESTIONS.md` records "question_reviews currently
 * holds zero CDS rows", which was true when written on 2026-08-25 and was
 * overtaken within days — `reviews:report` shows the 2026-08-22 marker cleanup,
 * the 2026-08-23 blind run and the 08-30 review, i.e. 100% coverage of CDS
 * English. What is actually new here is the GROUNDING: these are the first CDS
 * verdicts resting on an OFFICIAL key rather than on our own derivation, which
 * matters exactly because that 2026-08-23 blind run's 169 `confirmed` rows are
 * the ones the README warns cannot be trusted.
 *
 * METHOD is `source_key_crosscheck`, not `blind_rederivation`, even though the
 * derivation WAS blind. The distinction is deliberate: the verdict rests on the
 * published key, and naming the method after the controlling evidence is what
 * lets a later reader weigh it. A `blind_rederivation` row says two independent
 * passes agreed; this says our answer matched ground truth, which is stronger
 * and differently founded.
 *
 * Idempotent: the table's dedupe key is (question_id, run_label,
 * reviewed_content_hash), so a re-run writes 0. A row whose content_hash has
 * since changed is NOT silently re-stamped as reviewed — it will write a new
 * row under the new hash only if this script is re-run, which is the honest
 * behaviour: the review applies to the text it was made against.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { dataPath, requirePaper, EXAM_ID } from "./config";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: require("path").join(process.cwd(), ".env.local"), override: true });

/** The model that produced the blind derivation these verdicts rest on. */
const DERIVED_MODEL = "claude-opus-5";

type BlindScore = {
  key: { sourceFile: string; series: string; published: string; provisional: boolean };
  blindPass: { total: number; agree: number };
  disagreements: { number: number; derived: string; key: string; adjudication: string }[];
};

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  if (!paper.answerKey) throw new Error(`${paper.id} has no official key; there is nothing to record.`);

  const score: BlindScore = JSON.parse(readFileSync(dataPath(paper.id, "blindscore"), "utf8"));
  const questions: { number: number; answer: string }[] = JSON.parse(
    readFileSync(dataPath(paper.id, "questions"), "utf8")
  );
  const disputed = new Map(score.disagreements.map((d) => [d.number, d]));

  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data: rows, error } = await sb
    .from("questions")
    .select("id,question_number,content_hash")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (error) throw error;

  const byNumber = new Map<number, { id: string; content_hash: string }>();
  for (const r of (rows ?? []) as any[]) byNumber.set(Number(r.question_number), r);

  // A question with no live row is REPORTED, never skipped quietly: a short
  // review batch would otherwise read as a complete one.
  const missing = questions.filter((q) => !byNumber.has(q.number)).map((q) => q.number);
  if (missing.length) throw new Error(`no live row for question(s): ${missing.join(", ")}`);

  const runLabel = `cds-english:${paper.id}-official-key`;
  const keyName = paper.answerKey.split(/[\\/]/).pop();
  const inputs: ReviewInput[] = questions.map((q) => {
    const live = byNumber.get(q.number)!;
    const d = disputed.get(q.number);
    return {
      questionId: live.id,
      reviewedContentHash: live.content_hash,
      method: "source_key_crosscheck",
      verdict: d ? "key_fixed" : "confirmed",
      runLabel,
      derivedModel: DERIVED_MODEL,
      source: "live",
      note: d
        ? `Blind derivation gave ${d.derived}; the official UPSC provisional key (${keyName}, Series ${score.key.series}) gives ${d.key}. ${d.adjudication} Option order was re-checked against the printed page first, so this was not a mis-slotted option.`
        : `Blind derivation agreed with the official UPSC provisional key (${keyName}, Series ${score.key.series}, published ${score.key.published}). Paper-level blind score ${score.blindPass.agree}/${score.blindPass.total}. The key is PROVISIONAL; a final key may differ.`,
    };
  });

  const confirmed = inputs.filter((i) => i.verdict === "confirmed").length;
  console.log(`\n${paper.id} — ${paper.pyqNote}`);
  console.log(`run_label      ${runLabel}`);
  console.log(`method         source_key_crosscheck`);
  console.log(`rows           ${inputs.length}  (${confirmed} confirmed, ${inputs.length - confirmed} key_fixed)`);
  for (const d of score.disagreements) console.log(`  key_fixed Q${d.number}: ${d.derived} -> ${d.key}`);

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write. Nothing recorded.`);
    return;
  }
  const result = await recordReviews(sb, inputs);
  console.log("\n" + formatRecordResult(result, "reviews"));
  if (result.error) process.exitCode = 1;
  for (const r of result.rejected) console.error(`  rejected [${r.index}]: ${r.reason}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
