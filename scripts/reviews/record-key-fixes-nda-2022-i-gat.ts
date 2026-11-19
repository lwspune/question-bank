/**
 * Record the six NDA 2022 (I) GAT "ordering of words" key corrections of
 * 2026-11-19 (source Q23-Q26, Q29, Q30 of GAT_NDA1_2022_PYQ.xlsx), the rest of the
 * block whose Q21/Q22 were corrected on 2026-09-07 (record-key-fixes-pqrs-test-1.ts).
 *
 *   npx tsx scripts/reviews/record-key-fixes-nda-2022-i-gat.ts            # dry run
 *   npx tsx scripts/reviews/record-key-fixes-nda-2022-i-gat.ts --apply
 *
 * Run AFTER scripts/practice-paper/apply-adjudicated-fixes.ts --apply: the answer
 * letter is a content_hash input, so the reviewed hash is read live, and the
 * script REFUSES unless the live key is already the corrected letter.
 *
 * METHOD is source_key_crosscheck, as for Q21/Q22: each was read off the printed
 * UPSC booklet (SDFR-F-TAG/44A), which confirmed our parts and all four options
 * are faithful and prints NO answer key, so the stored A came from a prep-house
 * .xlsx Answer column. The block keyed A on nine of its ten rows. These notes are
 * the only place the evidence lives: the solutions carry none (owner, 2026-11-19).
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN = "key-fix:2026-11-19-nda-2022-i-gat-ordering";
const BOOKLET = "Read off the printed booklet (NDA 2022 (I) GAT, SDFR-F-TAG/44A): parts and options match exactly and no key is printed, so the stored A came from the prep-house .xlsx, whose block keyed A on 9 of 10 rows.";

type Target = { id: string; label: string; expectKey: string; note: string };

const TARGETS: Target[] = [
  { id: "56ee0236-206c-4aae-b991-a95392fd8a98", label: "Q23", expectKey: "C", note: `Keyed SPQR; corrected to QSPR. ${BOOKLET} SPQR strands 'in the arena of sport, perhaps' after 'against Australia'. The row's own solution derived QSPR.` },
  { id: "2100ffe1-ab0d-49d0-9ec2-db916c6f6152", label: "Q24", expectKey: "C", note: `Keyed SQRP; corrected to SPRQ. ${BOOKLET} SQRP leaves 'in terms of GDP and GNP' at the end with nothing to qualify. The row's own solution derived SPRQ.` },
  { id: "97602b27-cade-4b92-804f-72f669f7f7d5", label: "Q25", expectKey: "B", note: `Keyed PRQS; corrected to RPSQ. ${BOOKLET} PRQS puts 'that they are not men of straw' before 'believing'. The row's own solution derived PRSQ, which is not an option; solution rewritten.` },
  { id: "6c8d9296-efbb-438b-b2e9-662043f32e36", label: "Q26", expectKey: "D", note: `Keyed PRQS; corrected to RPQS. ${BOOKLET} PRQS opens on 'of its rain-soaked verdure'. The row's own solution derived RPQS.` },
  { id: "91d742bb-5b32-49ad-99dc-71c150bf34d8", label: "Q29", expectKey: "C", note: `Keyed RQPS; corrected to RSQP. ${BOOKLET} RQPS puts 'that causes the least discomfort' before 'the option'. The row's own solution derived RSQP.` },
  { id: "f6a63ef9-f2e7-4768-8a3a-5a3736cc8133", label: "Q30", expectKey: "B", note: `Keyed RQPS; corrected to SRQP. ${BOOKLET} RQPS strands 'faith and belief are' at the end. The row's own solution derived SRQP.` },
];

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const inputs: ReviewInput[] = [];
  for (const t of TARGETS) {
    const { data, error } = await db
      .from("questions")
      .select("id, question_number, content_hash, options(label, is_correct)")
      .eq("id", t.id)
      .single();
    if (error) throw error;
    const keys = (data.options as { label: string; is_correct: boolean }[]).filter((o) => o.is_correct).map((o) => o.label);
    if (keys.length !== 1 || keys[0] !== t.expectKey) {
      console.error(`REFUSE ${t.label}: live key is [${keys.join(",")}], expected ${t.expectKey}`);
      process.exit(1);
    }
    console.log(`${t.label}  key=${keys[0]}  hash=${String(data.content_hash).slice(0, 12)}  source_key_crosscheck/key_fixed`);
    inputs.push({
      questionId: data.id,
      reviewedContentHash: String(data.content_hash),
      method: "source_key_crosscheck",
      verdict: "key_fixed",
      runLabel: RUN,
      note: t.note.slice(0, 480),
      source: "live",
    });
  }
  console.log(`\nrun: ${RUN}`);
  if (!APPLY) {
    console.log("[dry run] pass --apply to write.");
    return;
  }
  console.log(formatRecordResult(await recordReviews(db, inputs)));
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
