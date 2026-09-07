/**
 * Record the 2026-09-07 key corrections made while ingesting the LWS
 * "Pressure Belt, POS" paper.
 *
 *   npx tsx scripts/reviews/record-key-fixes-2026-09-07.ts            # dry run
 *   npx tsx scripts/reviews/record-key-fixes-2026-09-07.ts --apply
 *
 * Run AFTER scripts/practice-paper/apply-adjudicated-fixes.ts --apply:
 * `reviewed_content_hash` must be the hash the row carries once the edit has
 * landed, because a corrective review's edit is its own output. The answer
 * letter is a hash input, so all three hashes moved — the script therefore
 * reads the live hash rather than hard-coding one, and REFUSES unless the live
 * key is already the corrected letter.
 *
 * METHODS are deliberately different, and the difference is the point:
 *
 *  - Oswaal Q120 is `solution_audit`. It was caught by READING the stored
 *    solution and noticing it refutes its own key (the solution places the belt
 *    at 30 degrees; the keyed Roaring Forties are the 40-degree-S westerlies).
 *    NOT `blind_rederivation` — the key was visible throughout — and not
 *    `source_key_crosscheck`, because the Oswaal PDF is not on disk, so whether
 *    the booklet printed the wrong letter or our pass mis-transcribed it could
 *    not be established. That row still owes a blind pass.
 *  - Q13 and Q41 are `source_key_crosscheck`: two independent BLIND passes both
 *    returned A, the paper's own key (via the nda-tracker RESULTS sheet) gave B
 *    and D, and the stored answer was changed to match the key. Both passes had
 *    flagged these MED and had NAMED the key's letter as their runner-up, which
 *    is why they were adjudicated to the key rather than defended.
 *
 * Q70 is deliberately ABSENT. The RESULTS sheet keys it D (Verb), but the .docx
 * underlines "old" (w:val="single", verified at run level) and the same author's
 * July paper keys the identical sentence as Adjective. Our answer stands, so
 * there is no corrective verdict to record; recording `confirmed` would overstate
 * the evidence, since this was not a blind re-derivation of that row.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN = "key-fix:2026-09-07-lws-pressure-belt-ingest";

type Target = {
  id: string;
  label: string;
  expectKey: string;
  method: ReviewInput["method"];
  note: string;
};

const TARGETS: Target[] = [
  {
    id: "e4d3de0b-e1b1-4e98-a0b4-03a475a3328c",
    label: "Oswaal GAT Mock 6 Q120",
    expectKey: "A",
    method: "solution_audit",
    note:
      "Keyed 'Roaring forties' for 'Subtropical high-pressure belts are otherwise called as'. Corrected " +
      "to 'Horse latitudes'. SELF-REFUTING: the row's own stored solution places the belt at about 30 " +
      "degrees, while the Roaring Forties are by definition the 40-degree-S westerlies - a wind belt, not " +
      "a pressure belt. Invisible to audit:keys because the solution names no option letter (the stealth " +
      "wrong-key class). Found incidentally during the dedup gate for the LWS Pressure Belt paper; only 2 " +
      "rows bank-wide mention horse latitudes and the other does not key the identity, so there was no " +
      "sibling to cross-confirm. Source PDF not on disk, so book-error vs our-transcription could not be " +
      "settled; corrected rather than preserved because the answer is wrong either way and this is a " +
      "commercial practice booklet, not a PYQ with an issued key. Solution rewritten to justify the " +
      "answer. Still owes a blind pass.",
  },
  {
    id: "3b13aa96-8e0c-4dce-94b0-1bfa7cc5aa94",
    label: "LWS Pressure Belt Q13",
    expectKey: "B",
    method: "source_key_crosscheck",
    note:
      "'At which latitude are calm conditions most frequently observed?' Two independent blind passes both " +
      "returned A (0 degrees, the doldrums) at MED confidence, and BOTH named B (30 degrees, the horse " +
      "latitudes) as the runner-up on the ground that it is also a belt of calms. The paper's own key gives " +
      "B, so the stored answer was changed to match it. Genuinely ambiguous rather than a derivation error - " +
      "calm is more PERSISTENT under subtropical subsidence, while the equatorial doldrums are broken by " +
      "convectional thunderstorms. Note this paper's own Q47 uses 'Belt of Calms' as a name for the " +
      "doldrums, which is the tension; the solution now states it explicitly.",
  },
  {
    id: "7c66123d-8605-492a-a0c0-0d694210eb78",
    label: "LWS Pressure Belt Q41",
    expectKey: "D",
    method: "source_key_crosscheck",
    note:
      "Statement set on atmospheric pressure. Two independent blind passes both returned A (1 and 2 only) at " +
      "MED, rejecting statement 3 (centrifugal force from the Earth's rotation contributing to the " +
      "equatorial low), and BOTH named D as the runner-up with the exact condition: that Indian texts do " +
      "credit the rotational centrifugal effect as a CONTRIBUTING cause alongside solar heating. That " +
      "condition holds for this syllabus and the paper's own key gives D, so all three statements stand.",
  },
];

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const inputs: ReviewInput[] = [];
  for (const t of TARGETS) {
    const { data, error } = await db
      .from("questions")
      .select("id, question_number, source_file, content_hash, visibility, options(label, is_correct)")
      .eq("id", t.id)
      .single();
    if (error) throw error;

    const keys = (data.options as { label: string; is_correct: boolean }[])
      .filter((o) => o.is_correct)
      .map((o) => o.label);
    if (keys.length !== 1 || keys[0] !== t.expectKey) {
      console.error(
        `REFUSE ${t.label}: live key is [${keys.join(",")}], expected ${t.expectKey} — ` +
          `run scripts/practice-paper/apply-adjudicated-fixes.ts --apply first`,
      );
      process.exit(1);
    }

    console.log(
      `${t.label}  Q${data.question_number}  key=${keys[0]}  hash=${String(data.content_hash).slice(0, 12)}  ` +
        `(${data.visibility})  ${t.method}/key_fixed`,
    );
    inputs.push({
      questionId: data.id,
      reviewedContentHash: String(data.content_hash),
      method: t.method,
      verdict: "key_fixed",
      runLabel: RUN,
      note: t.note.slice(0, 480),
      source: "live",
    });
  }

  console.log(`\nrun: ${RUN}`);
  if (!APPLY) {
    console.log("\nDRY RUN — re-run with --apply.");
    return;
  }
  console.log(formatRecordResult(await recordReviews(db as any, inputs)));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
