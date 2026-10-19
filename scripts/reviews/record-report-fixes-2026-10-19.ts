/**
 * Record the 2026-10-19 report adjudication as question_reviews rows.
 *
 *   npx tsx scripts/reviews/record-report-fixes-2026-10-19.ts            # dry run
 *   npx tsx scripts/reviews/record-report-fixes-2026-10-19.ts --apply
 *
 * Run AFTER apply-report-fixes-2026-10-19.ts --apply, so `reviewed_content_hash`
 * is the hash the row carries once the edit has landed.
 *
 * Key moves and the flawed-paper ruling are `blind_rederivation`: each answer
 * was derived from the printed source without trusting the stored key. Copy
 * repairs and solution rewrites are `report_triage`.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN = "report-adjudication:2026-10-19";

type Row = { id: string; verdict: ReviewInput["verdict"]; method: ReviewInput["method"]; note: string };

const D = "blind_rederivation" as const;
const T = "report_triage" as const;

const ROWS: Row[] = [
  { id: "6665d7a0-397d-48f7-9f6d-e43db11fa0a8", verdict: "key_fixed", method: D,
    note: "NDA 2017-II Q2, booklet p3: asks remainder THEN quotient. 46 = 6x7 + 4, so (100)2 and (111)2. Key A -> B." },
  { id: "d42ad0e1-e69c-4255-8cf6-29942a49c980", verdict: "key_fixed", method: D,
    note: "NDA 2018-I Q11, booklet p4, stem as stored. x(1 - log15 5) = log15 3^x gives 3^x(1+3^x) = 12, 3^x = 3, x = 1. Key D -> C." },
  { id: "f8491cd6-b9ea-4292-aa7a-ed331c39c835", verdict: "key_fixed", method: D,
    note: "NDA 2022-I Q18, booklet p7, stem as stored. a+b = alpha+beta, ab = alpha*beta + c, so x^2 - (alpha+beta)x + alpha*beta + c = 0. Key B -> A; the old working reached A then wrote B." },
  { id: "5c62111a-5b45-4b42-a863-121a30157fe8", verdict: "key_fixed", method: D,
    note: "NDA 2024-I Q12, booklet p7. Statement 3 fails for A = -I (A^3 = A, A != I). Key D -> A. Statements relabelled 1-3 as printed (A-C clashed with option letters)." },
  { id: "9d0f9315-635e-459f-b8f5-f0371a943159", verdict: "key_fixed", method: D,
    note: "NDA 2023-II GAT Q116, booklet p31 shows the four drawings. Dalton's phosphorus is the three-spoke circle (d); the circled cross is sulphur. Key C -> D. Concept report c631d2a4." },
  { id: "9990b873-2ce6-49bf-9dd1-077f742c8cd9", verdict: "key_fixed", method: D,
    note: "NDA 2025-I Q34, booklet p11: passage is p = |sin a - sin(a - 90)|; the modulus bars were lost. Minimum is 0 at a = 135 deg. Key C -> A. Context fixed on sibling Q35 too." },
  { id: "49d9d19d-5e2c-4eec-b8cc-6a1adc64a016", verdict: "stem_fixed", method: T,
    note: "NDA 2025-I Q35, set sibling of Q34: passage modulus restored. Max sqrt(2), key B unchanged." },
  { id: "49f6bd22-06da-484d-88ee-075f4ce0be3a", verdict: "key_fixed", method: D,
    note: "NDA 2025-I Q39, booklet p13: options are (3 -/+ sqrt3)/2 a and (3 -/+ sqrt3)/4 a (ours read sqrt3 -/+ sqrt3). PN = h sqrt3 = (3 + sqrt3)a/2. Key D -> B." },
  { id: "c3618086-1c45-4104-a233-32e4e94f66ac", verdict: "stem_fixed", method: T,
    note: "NDA 2025-I Q40, booklet p13: options restored to (3 +/- sqrt3)/2 b, (3 +/- sqrt3)/4 b. MN = (3 + sqrt3)b/2, key A unchanged." },
  { id: "937205fb-14d9-4be3-8be7-11e0670425bc", verdict: "stem_fixed", method: T,
    note: "NDA 2025-I Q95, booklet p29: the rule is f(x/y) = f(x)/f(y), not f(xy) = f(x)f(y). Answer 81 unchanged." },
  { id: "622e12f7-6ff3-46c3-bc08-65aadd0b7f21", verdict: "stem_fixed", method: T,
    note: "NDA 2025-I Q96, booklet p29: asks f(1)f(4) (a product), and the rule is f(x/y) = f(x)/f(y). 1 x 9 = 9, key C unchanged." },
  { id: "2edc3844-7df9-457b-80f0-8f8ca92b9f08", verdict: "stem_fixed", method: T,
    note: "NDA 2024-II Q112, booklet p41: option (c) is (xbar - x_n - k)/n; ours was equal to (d). Key D unchanged." },
  { id: "0e9bc8db-5744-45aa-a450-a0cc6cb9c5b7", verdict: "stem_fixed", method: T,
    note: "NDA 2018-I Q118, booklet p42: statements restored with the printed symbols, solution written out. Key B unchanged." },
  { id: "aa228215-8957-485e-bfc6-709de017ec1f", verdict: "solution_rewritten", method: T,
    note: "Removed the note about the source booklet's key column from the student-facing solution. Key D unchanged." },
  { id: "de62d0c0-725c-45c2-9e8c-c7f7ab3c81e8", verdict: "solution_rewritten", method: T,
    note: "Solution now shows why k = 1: (1 - k)u = (1 - k)^2 must hold for two values of u. Key C unchanged." },
  { id: "80cd7000-ceeb-4013-a7f6-4ca0127eec79", verdict: "stem_fixed", method: T,
    note: "Match table rebuilt with List I / List II headers and the fourth List II item inside the table. Key B unchanged." },
  { id: "9b3ede98-7afb-4007-8889-60c1f3498dd2", verdict: "stem_fixed", method: T,
    note: "Stray line break in the reported speech removed. Key A unchanged." },
  { id: "cc638341-314f-4046-a482-5d05ad845401", verdict: "key_fixed", method: D,
    note: "Owner's report: option (b) 1.2 ohm is a misprint of 12.1 ohm, the derived answer. Option B corrected, key C -> B, 'is is' fixed." },
  { id: "4d2d4673-66a0-4c78-a1a4-a5b59206d6f1", verdict: "stem_fixed", method: T,
    note: "Pandoc artefacts removed from the stem (~ in \\text, stray quotes round x). Plot image present. Answer 150 unchanged." },
  { id: "ffdc9e7e-e7f4-4074-b5b9-c54955c645b8", verdict: "stem_fixed", method: T,
    note: "Balbharati Ch 7 p37 really prints the powers on the line ('2 1/2'). Options now show 2^(1/2) etc. as meant (owner's choice); key C = sqrt2 unchanged." },
  { id: "0c44b997-1c74-4637-b405-9d484f7dd933", verdict: "stem_fixed", method: T,
    note: "Option A 'a. and b' -> 'a and b'. The book prints the same stray dot. Key C unchanged." },
  { id: "354a93dd-bc28-471b-911f-dacb07ef0074", verdict: "defect_preserved", method: D,
    note: "12 May 2024 S1 .docx prints 'at (1,1)', on neither curve; the answer sheet gives (a) 15/8 by formal substitution. Key A kept, defect named; the true meeting point (1/2,1/2) gives option C." },
  { id: "89b647b0-04e7-424c-9753-cb564c8aebde", verdict: "key_fixed", method: D,
    note: "25 Apr 2025 S2: answer sheet marks (a), whose tangent is negative (obtuse angle); its own working lists both. Angle of intersection is acute: log(7/3)/(1 + log3 log7). Key A -> B (owner's choice)." },
];

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await db.from("questions").select("id,content_hash").in("id", ROWS.map((r) => r.id));
  if (error) throw error;
  const byId = new Map((data as any[]).map((q) => [q.id, q]));

  const inputs: ReviewInput[] = [];
  for (const r of ROWS) {
    const q = byId.get(r.id);
    if (!q) {
      console.error(`REFUSE ${r.id}: not found`);
      process.exit(1);
    }
    inputs.push({
      questionId: r.id,
      reviewedContentHash: q.content_hash,
      method: r.method,
      verdict: r.verdict,
      runLabel: RUN,
      note: r.note.slice(0, 480),
      source: "live",
    });
  }

  const tally: Record<string, number> = {};
  for (const i of inputs) tally[i.verdict] = (tally[i.verdict] ?? 0) + 1;
  console.log(`${inputs.length} verdict(s) ready under run "${RUN}"`, tally);
  if (!APPLY) {
    console.log("DRY RUN: re-run with --apply.");
    return;
  }
  console.log(formatRecordResult(await recordReviews(db as any, inputs)));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
