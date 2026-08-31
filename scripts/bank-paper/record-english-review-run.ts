/**
 * Persist a DATA-DRIVEN CDS English review run into `question_reviews`.
 *
 *   npx tsx scripts/bank-paper/record-english-review-run.ts <verdicts.json>
 *   npx tsx scripts/bank-paper/record-english-review-run.ts <verdicts.json> --apply
 *
 * WHY A SECOND RECORDER. `record-english-reviews.ts` is pinned to the
 * 2026-08-23 blind run: its run label and its note text both describe that
 * pass, and it can only ever emit `confirmed` (it skips every disagreement by
 * design). Rewriting it to serve later runs would retro-relabel evidence
 * already on record, which is exactly what an append-only table exists to
 * prevent. So that script keeps its run and this one takes the rest.
 *
 * WHAT THIS ADDS. The 2026-08-30 pass is a DUAL check, not a single one:
 *   1. blind derivation - key and stored solution withheld, directions and the
 *      full passage supplied (withholding the directions is what made three
 *      earlier vocabulary "fixes" wrong; see the warning in scripts/cds/fix-keys.ts);
 *   2. transcription fidelity against the printed booklet - the option SET and,
 *      separately, the label->text ORDER.
 * Check 2 is not optional garnish. A blind derivation CANNOT catch a mis-slotted
 * option: the solver derives correctly, finds that text at some label, and
 * confirms that label. The CDS corpus has already produced 19 wrong keys of
 * exactly that shape, so fidelity is a PREREQUISITE control, not a parallel one.
 *
 * A flipped row is recorded `key_fixed`, never `confirmed`, so "we were wrong"
 * stays distinguishable from "the source was wrong". A row where the two
 * derivations disagree and neither is decisive gets NO ROW at all - this corpus
 * carries no official key, so a disagreement means nobody has concluded
 * anything, and a verdict there would assert an outcome no one reached.
 *
 * The hash is read LIVE rather than carried from the dump: it fingerprints the
 * question AS REVIEWED, so a stem repaired later makes the verdict queryably
 * stale instead of silently trusted.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

const DEFAULT_RUN_LABEL = "bank-paper:cds-english-review-2026-08-30";

/**
 * A run label must be given explicitly for anything that is NOT the original
 * 2026-08-30 pass. Reusing one label across two passes would merge distinct
 * evidence under one name, and the unique key is
 * (question_id, run_label, reviewed_content_hash) - so a follow-up review of a
 * row whose hash has not moved would be silently dropped rather than recorded.
 */
function runLabel(): string {
  const arg = process.argv.find((a) => a.startsWith("--run="));
  return arg ? arg.slice("--run=".length) : DEFAULT_RUN_LABEL;
}
// `stem_fixed` and `key_fixed` are kept DISTINCT rather than collapsed into one
// "corrected" verdict: migration 0074 separates them so a later reader can tell
// a repaired question from a re-keyed one. Where both happened, `key_fixed` is
// recorded - it is the stronger claim, and the note names the stem repair too.
const ALLOWED = new Set(["confirmed", "key_fixed", "stem_fixed"]);

type Verdict = { questionId: string; verdict: string; where: string; note: string };

async function main() {
  const file = process.argv[2];
  const apply = process.argv.includes("--apply");
  if (!file) throw new Error("usage: record-english-review-run.ts <verdicts.json> [--apply]");

  const rows = JSON.parse(readFileSync(file, "utf8")) as Verdict[];
  for (const r of rows) {
    if (!ALLOWED.has(r.verdict)) {
      throw new Error(`${r.where}: verdict ${JSON.stringify(r.verdict)} is not one this run emits`);
    }
  }
  const ids = rows.map((r) => r.questionId);
  if (new Set(ids).size !== ids.length) throw new Error("duplicate questionId in verdicts file");

  const db = createClient(url!, key!, { auth: { persistSession: false } });

  const hash = new Map<string, string>();
  // Chunked at 200: `.in()` puts the list in the URL, and a few hundred uuids
  // exceeds the request-line limit (PostgREST answers a bare Bad Request).
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await db
      .from("questions")
      .select("id, content_hash")
      .in("id", ids.slice(i, i + 200));
    if (error) throw new Error(error.message);
    for (const q of data ?? []) hash.set(q.id as string, q.content_hash as string);
  }

  const inputs: ReviewInput[] = [];
  const missing: string[] = [];
  for (const r of rows) {
    const h = hash.get(r.questionId);
    if (!h) {
      missing.push(`${r.where} (${r.questionId})`);
      continue;
    }
    inputs.push({
      questionId: r.questionId,
      reviewedContentHash: h,
      method: "blind_rederivation",
      verdict: r.verdict as ReviewInput["verdict"],
      runLabel: runLabel(),
      note: r.note,
    });
  }
  if (missing.length) {
    throw new Error(`no live question for:\n  ${missing.join("\n  ")}`);
  }

  const tally = inputs.reduce<Record<string, number>>((a, i) => {
    a[i.verdict] = (a[i.verdict] ?? 0) + 1;
    return a;
  }, {});
  console.log(`run label : ${runLabel()}`);
  console.log(`verdicts  : ${rows.length}`);
  console.log(`tally     : ${JSON.stringify(tally)}`);
  for (const r of rows) console.log(`  ${r.verdict.padEnd(11)} ${r.where}`);

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write. Nothing inserted.`);
    return;
  }
  const res = await recordReviews(db, inputs);
  console.log(`\nattempted ${res.attempted} · accepted ${res.accepted} · written ${res.written}`);
  for (const x of res.rejected) console.log(`   REJECTED ${JSON.stringify(x)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
