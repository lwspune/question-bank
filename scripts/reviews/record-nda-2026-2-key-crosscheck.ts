/**
 * Record the NDA II 2026 Mathematics cross-check against an independent key.
 *
 *   npx tsx scripts/reviews/record-nda-2026-2-key-crosscheck.ts            # dry run
 *   npx tsx scripts/reviews/record-nda-2026-2-key-crosscheck.ts --apply
 *
 * Run AFTER scripts/nda-pyq/flip-public.ts — `reviewed_content_hash` must be the
 * hash the row carries in the state being attested, and publishing does not move
 * it (visibility is not a hash input), so either order is safe here; the ordering
 * matters only if a later pass ever edits text.
 *
 * METHOD is `source_key_crosscheck`, and the choice is load-bearing rather than
 * cosmetic. `blind_rederivation` is what produced the ANSWERS and was already
 * recorded implicitly by the pipeline; what is being attested HERE is a different
 * and stronger thing — that each stored answer was diffed against a SEPARATE
 * source that could not share our failure modes.
 *
 * WHY EVERY VERDICT IS `confirmed`, INCLUDING THE THREE DISAGREEMENTS. The
 * vocabulary splits "we were wrong" (key_fixed / stem_fixed / solution_rewritten)
 * from "the source was wrong" (defect_preserved). Neither fits Q4, Q11 and Q62:
 * nothing of ours was changed, and the defective artifact is a third-party key
 * that is not part of this corpus and cannot be "preserved" in it. The review
 * concluded the stored answer is correct in all 120 cases, so `confirmed` is the
 * honest verdict, and the distinction between "confirmed by agreement" and
 * "confirmed OVER a disagreeing key" lives in the per-row note — which is where a
 * reader who needs it will actually look.
 *
 * THE EVIDENCE STANDARD, stated plainly because it is NOT two blind passes:
 * one blind derivation, written before the key existed so it could not be
 * contaminated by it, then diffed against a coaching institute's independently
 * produced key. 117 of 120 agreed. The 3 that did not were each read off the
 * original printed booklet and resolved AGAINST the key. There is no official
 * UPSC key for this sitting and none is expected, so this is final rather than
 * interim.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN = "source-key-crosscheck:2026-09-14-nda-2026-2-maths";
const SOURCE_FILE = "NDA2_2026_Maths_SetA.pdf";
const DERIVED_MODEL =
  "claude-opus-5 (blind derivation, cross-checked against an independent answer key)";

const KEY_LABEL =
  "Centurion Defence Academy, 'ANSWER-KEY NDA-II 2026 (MATHEMATICS)', booklet series A. " +
  "An independent third-party key, not an official UPSC key — none exists for this sitting.";

/** The three rows where our derivation and the key disagree. */
const ADJUDICATED: Record<number, string> = {
  4:
    "DISAGREED with the key (key B, ours A) and OURS STANDS. Adjudicated against the printed " +
    "booklet page: the shared context reads 'the ratio 1 : 2 : 7' and the stem 'What is sin A . cos B " +
    "equal to?', options (a) 1/4 (b) 1/2 (c) 1 (d) 2 — the transcription is faithful. A = 18 deg, " +
    "B = 36 deg, and sin18 cos36 = [(sqrt5-1)/4][(sqrt5+1)/4] = 4/16 = 1/4 exactly, verified to 40 " +
    "decimal places. The key's 1/2 is exactly what 2 sinX cosY = sin(X+Y) + sin(X-Y) yields without " +
    "the halving, i.e. a dropped factor of 2.",
  11:
    "DISAGREED with the key (key A, ours C) and OURS STANDS. Adjudicated against the printed " +
    "booklet page: stem '6 sin(pi/18) - 8 sin^3(pi/18)', options (a) 1/4 (b) 1/2 (c) 1 (d) 2 — " +
    "faithful. 6 sin t - 8 sin^3 t = 2(3 sin t - 4 sin^3 t) = 2 sin 3t = 2 sin(pi/6) = 1 exactly, " +
    "verified to 40 decimal places. The key's 1/4 is HALF of sin 3t where it should be TWICE it. " +
    "Note Q4 and Q11 carry an identical option set and the key errs on both by a power-of-two factor " +
    "on a standard identity.",
  62:
    "DISAGREED with the key (key A 'I only', ours C 'Both I and II') and OURS STANDS. Adjudicated " +
    "against the printed booklet page: statement II reads 'The minimum value of cos a + cos b + cos g " +
    "is 1' and the options are (a) I only (b) II only (c) Both I and II (d) Neither I nor II — " +
    "faithful. Since b = 90 - a, cos b = sin a, so cos^2 a + cos^2 b = 1 and the direction-cosine " +
    "identity forces cos g = 0. Both statements therefore concern cos a + sin a on a in [0,90], whose " +
    "range is [1, sqrt2]: max sqrt2 at a = 45, min 1 at a = 0 and a = 90. Those endpoints are the x- " +
    "and y-axes, ordinary lines with direction cosines (1,0,0) and (0,1,0) satisfying a + b = 90, so " +
    "the minimum is genuinely attained. The key's 'I only' requires them excluded and nothing in the " +
    "question excludes them. THIS IS THE ONE OF THE THREE RESTING ON A READING RATHER THAN ARITHMETIC, " +
    "and the blind pass had named 'I only' as its runner-up in advance on exactly this ground.",
};

type KeyEntry = { number: number; answer: string };

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const key: KeyEntry[] = JSON.parse(
    readFileSync(join(process.cwd(), "scripts/nda-pyq/data/2026-2.sourcekey.json"), "utf8")
  );
  const keyByNum = new Map(key.map((k) => [k.number, k.answer.toUpperCase()]));

  const { data, error } = await db
    .from("questions")
    .select("id, question_number, content_hash, visibility, options(label, is_correct)")
    .eq("source_file", SOURCE_FILE);
  if (error) throw error;
  if (!data?.length) throw new Error(`no rows for ${SOURCE_FILE}`);
  if (data.length !== 120) throw new Error(`expected 120 rows, found ${data.length}`);

  const inputs: ReviewInput[] = [];
  let agreed = 0;
  let disagreed = 0;

  for (const row of data) {
    const n = Number(row.question_number);
    const correct = (row.options as { label: string; is_correct: boolean }[])
      .filter((o) => o.is_correct)
      .map((o) => o.label);
    if (correct.length !== 1) {
      throw new Error(`Q${n}: ${correct.length} correct options — refusing to attest this row`);
    }
    const ours = correct[0].toUpperCase();
    const theirs = keyByNum.get(n);
    if (!theirs) throw new Error(`Q${n}: no entry in the source key`);

    const isAdjudicated = n in ADJUDICATED;
    if (ours === theirs) {
      agreed += 1;
      if (isAdjudicated) {
        throw new Error(
          `Q${n} is recorded as adjudicated but now AGREES with the key — the data has moved ` +
            `since the adjudication was written. Refusing.`
        );
      }
    } else {
      disagreed += 1;
      if (!isAdjudicated) {
        throw new Error(
          `Q${n} disagrees with the key (ours ${ours}, key ${theirs}) but has no recorded ` +
            `adjudication. Every disagreement must be read against the printed page before it is ` +
            `attested. Refusing.`
        );
      }
    }

    inputs.push({
      questionId: row.id as string,
      reviewedContentHash: row.content_hash as string,
      method: "source_key_crosscheck",
      verdict: "confirmed",
      runLabel: RUN,
      derivedModel: DERIVED_MODEL,
      note: isAdjudicated
        ? `${KEY_LABEL} ${ADJUDICATED[n]}`
        : `${KEY_LABEL} The independently derived answer (${ours}) and the key agree.`,
    });
  }

  console.log(`${SOURCE_FILE}: ${data.length} rows`);
  console.log(`  agreed with the key   : ${agreed}`);
  console.log(`  disagreed (adjudicated): ${disagreed}  -> Q${Object.keys(ADJUDICATED).join(", Q")}`);
  console.log(`  method                : source_key_crosscheck`);
  console.log(`  run                   : ${RUN}`);

  if (!APPLY) {
    console.log(`\n[dry-run] pass --apply to record ${inputs.length} review(s). Nothing written.`);
    return;
  }
  const result = await recordReviews(db, inputs);
  console.log(`\n${formatRecordResult(result)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
