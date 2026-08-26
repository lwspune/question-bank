/**
 * Record the 2026-08-26 source adjudication of the 14 REPORTed rows.
 *
 *   npx tsx scripts/reviews/record-report-adjudication.ts            # dry run
 *   npx tsx scripts/reviews/record-report-adjudication.ts --apply
 *
 * Run AFTER apply-report-fixes-practice.ts and apply-report-fixes-pyq.ts:
 * `reviewed_content_hash` must be the hash the row carries once the edit has
 * landed, or the verdict is born stale.
 *
 * METHOD is `blind_rederivation` for all 14 — each answer was re-derived from
 * the PRINTED source (booklet or UPSC paper) and checked symbolically /
 * numerically, and for the four PYQ rows the derivation was made without
 * consulting the stored key. That is the stronger claim than `solution_audit`,
 * and it is the honest one here because the source was actually read.
 *
 * VERDICTS split three ways, deliberately:
 *   stem_fixed          our transcription was wrong; the source was right
 *   defect_preserved    the SOURCE is wrong; our transcription is byte-faithful
 *                       and the stem is left as printed, with the defect named
 *                       in the solution
 *   key_fixed           the stored answer was wrong and has been corrected
 *
 * That distinction is the point of the table: "we were wrong" and "the source
 * was wrong" are different facts and must not both read as `confirmed`.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN = "report-adjudication:2026-08-26-nda-maths";

type Row = { id: string; qnum: string; verdict: ReviewInput["verdict"]; note: string };

const ROWS: Row[] = [
  // ── practice: our transcription was wrong, the booklet was right ──
  { id: "e7e39e1c-4e6d-462e-92b2-fc42c620a31e", qnum: "2007", verdict: "stem_fixed",
    note: "Booklet p-idx 11: first line is (x-2)/2 = (y-1)/5 = (z+3)/-3 and option (b) is 23/(9 sqrt38). Three transcription defects repaired. Printed key D confirmed; direction (2,5,-3) has magnitude sqrt(38) and dot 26 with (-1,8,4)." },
  { id: "d677d35f-54ba-4373-9734-54998a6097c3", qnum: "2010", verdict: "stem_fixed",
    note: "Booklet p-idx 11: y-1 not y-2, x/-3 not x/1, (z-1)/6 not /9; options (a)/(b) were shifted. Five defects repaired. Printed key C confirmed; the z-components fix t = -3, giving lambda = 2 and mu = 1/3." },
  { id: "c0a31791-5fda-4d01-8613-9a73380685ae", qnum: "2013", verdict: "stem_fixed",
    note: "Booklet p-idx 11: (2y+3)/3 not /2, and the second line is x = 3r+2; y = -2r-1; z = 2 (ours read 'x = 3y - 2 = -2r - 1', not a line). Printed key D confirmed; directions (2,3,4) and (3,-2,0) are perpendicular." },
  { id: "35ea0233-9a59-4fca-a388-829cf0d35fbe", qnum: "2023", verdict: "stem_fixed",
    note: "Booklet p-idx 12: the line is (x+1)/2 = (y+1)/3 = (z+1)/4; ours had y-1. Printed key A confirmed; the parameter is exactly 1, P = (1,2,3), OP = sqrt(14). The rewriter's guess that the line was x/1 = y/2 = z/3 was wrong." },
  { id: "ca6660d0-239a-438b-901f-a8461df2b6fe", qnum: "1803", verdict: "stem_fixed",
    note: "BOOK omits Q's position vector (four points named, three vectors printed) AND our pass corrupted two of the three printed. Vectors restored; Q = 4i is uniquely forced by P + (R - S), which the book's own key (a) requires. Printed key A confirmed." },
  { id: "9bf3f0a3-00d1-481f-a98c-903d8c16a5d4", qnum: "1831", verdict: "stem_fixed",
    note: "Booklet p-idx 2: the sides are the CONCRETE vectors i+j-k and 2i-3j+k; our pass rendered them as a+b and 2a-3b, which is why the question appeared to state no magnitudes. Three distractors also repaired. Printed key A confirmed; diagonals sqrt(13) and sqrt(21)." },
  { id: "1985017e-003e-4cc8-b473-917124956f2f", qnum: "741", verdict: "stem_fixed",
    note: "Booklet p-idx 35: the other 2 questions have TWO options (true/false), not three; option (a) is 5/32 not 3/32. Printed key D confirmed; 1/256 + 9/256 + 2/256 = 3/64. The three-option reading gave 7/288, which matches no option." },
  { id: "2265828d-9802-4f1d-90d8-70ce4ac650c7", qnum: "447", verdict: "stem_fixed",
    note: "Booklet p-idx 20: the first term is the stacked fraction (1/6)sin(theta), read by our vision pass as '1 - sin(theta)'; option (d) is n*pi + pi/3. Printed key B confirmed; 6c^3 + c^2 - 1 = (2c-1)(3c^2+2c+1) and the quadratic has discriminant -8." },

  // ── practice: the SOURCE is wrong; our transcription is faithful ──
  { id: "ce7779cd-0984-4b44-8ff2-a26fd6faabb2", qnum: "2406", verdict: "defect_preserved",
    note: "Our stem is byte-faithful: the booklet really prints a MINUS between 2x and the radical (verified at 12x zoom). But as printed the argument leaves [-1,1] at x = -0.4, inside the domain the question itself states, and the derivative matches no option. The printed domain and printed key both belong to the product form 2x*sqrt(1-x^2). Stem left as printed; defect named in the solution. Key C confirmed." },
  { id: "630637a2-9f90-4a0f-8f42-b0d8f4487c81", qnum: "1163", verdict: "defect_preserved",
    note: "Our stem is byte-faithful: the booklet really prints 2cos2B - 1 (verified at 16x zoom). That gives tan^2 A = (1+7tan^2 B)/(3+tan^2 B), matching no option; the intended numerator is 3cos2B - 1. Stem left as printed; defect named in the solution. Key A confirmed. The two forms agree ONLY at tanB = 1, so a spot-check at beta = 45 degrees passes by coincidence." },

  // ── PYQ: the stored answer was wrong ──
  { id: "d4b22b39-0d02-472d-9977-ae698e9f5637", qnum: "34", verdict: "key_fixed",
    note: "NDA 2022-I, booklet p13. Stem and option order byte-faithful to the printed paper; the paper carries no answer key. T = d tan(theta), T + h = d tan(2theta) give T/h = cos(2theta) exactly, so the tower is h cos(2theta) = (c). Key A -> C. One submitted attempt had chosen C and been marked wrong; re-graded (+3.33)." },
  { id: "4ac27c60-ea91-4d6b-8b1f-ff3f84c716e5", qnum: "57", verdict: "key_fixed",
    note: "NDA 2022-I, booklet p21. Stem byte-faithful; the paper carries no answer key. Cubing to clear the 4/3 index gives [1+(y')^2]^3 = (y'')^4, so the highest-ORDER derivative carries power 4 and the degree is 4 = (d). Key C -> D. No submitted attempt had answered it." },
  { id: "d6603eac-055d-4cc3-934d-f2508a7d66a3", qnum: "77", verdict: "key_fixed",
    note: "NDA 2022-I, booklet p27. Stem byte-faithful; the paper carries no answer key. f'(2) = 0 gives -m/4 + 2n = 0, i.e. m - 8n = 0, leaving m + 8n = 16n free; (8,1) and (24,3) both satisfy the condition and give 16 and 48. So the value asked for is not determined = (d). Key B -> D. No submitted attempt had answered it." },
  { id: "fb68b32b-6f4e-492e-924b-4945897f4fd6", qnum: "91", verdict: "key_fixed",
    note: "NDA 2017-II, booklet p33. Stem and option order byte-faithful; the paper carries no answer key. f is identically 1 on (-1,0) while f(0) = 0, so f IS discontinuous at 0; it is continuous only at 1 = (d). Checked with exact rational arithmetic at every integer -4..4. Key B -> D. Both submitted attempts had left it blank." },
];

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await db
    .from("questions")
    .select("id,question_number,content_hash")
    .in("id", ROWS.map((r) => r.id));
  if (error) throw error;
  const byId = new Map((data as any[]).map((q) => [q.id, q]));

  const inputs: ReviewInput[] = [];
  for (const r of ROWS) {
    const q = byId.get(r.id);
    if (!q) {
      console.error(`REFUSE Q${r.qnum}: not found`);
      process.exit(1);
    }
    inputs.push({
      questionId: r.id,
      reviewedContentHash: q.content_hash,
      method: "blind_rederivation",
      verdict: r.verdict,
      runLabel: RUN,
      note: r.note.slice(0, 480),
      source: "live",
    });
  }

  const tally: Record<string, number> = {};
  for (const i of inputs) tally[i.verdict] = (tally[i.verdict] ?? 0) + 1;
  console.log(`${inputs.length} verdict(s) ready under run "${RUN}"`);
  console.log(tally);
  if (!APPLY) {
    console.log("DRY RUN — re-run with --apply.");
    return;
  }
  const res = await recordReviews(db as any, inputs);
  console.log(formatRecordResult(res));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
