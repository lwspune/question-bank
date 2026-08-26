/**
 * Record the 2026-08-26 source adjudication of the 16 `audit:keys` flags.
 *
 *   npx tsx scripts/reviews/record-audit-key-adjudication.ts            # dry run
 *   npx tsx scripts/reviews/record-audit-key-adjudication.ts --apply
 *
 * Run AFTER resolve-audit-key-flags.ts — `reviewed_content_hash` must be the
 * hash the row carries once any edit has landed. (None of these 16 changed a
 * stem, option or key, so every hash is in fact unchanged; the ordering rule
 * still holds and is cheap to respect.)
 *
 * VERDICT is `defect_preserved` for all 16, and that is the accurate one rather
 * than a convenient one: in every case OUR answer stood and nothing about the
 * question's content was altered. What was found is a defect in the SOURCE (a
 * duplicated option, a wrong printed key) or a mismatch between a legitimate
 * multi-answer question and a bank that models exactly one correct option. Not
 * `confirmed`, which would read as "checked, nothing to do", when 12 rows were
 * withdrawn from public view as a result.
 *
 * METHOD is `blind_rederivation`: every second-marked option was re-derived by
 * solving (scripts/reviews/data/report-adjudication/verify-multi.py), and the
 * two duplicate-option rows were read off the printed page.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN = "audit-keys-adjudication:2026-08-26-nda-maths-practice";

type Row = { qnum: string; like: string; note: string };

const ROWS: Row[] = [
  { qnum: "60", like: "Sets_and_Relations", note: "MULTI-ANSWER, not a spurious mark: 'xy>0' on R is symmetric and transitive and not reflexive, so (B) and (C) are both true; the stem itself says 'is/are'. Printed key B. Withdrawn to PRIVATE — the bank models exactly one correct option and the only single-answer repair is to un-mark a TRUE option." },
  { qnum: "650", like: "Matrices_and_Determinants", note: "MULTI-ANSWER: (C) is false for general symmetric M,N (discriminating counterexample found by search — the obvious 2x2 pair happens to give a symmetric product) and adj(MN) = adj(N)adj(M), so (D) is false too; both are answers to 'which is (are) NOT correct'. Printed key C. Withdrawn to PRIVATE." },
  { qnum: "656", like: "Matrices_and_Determinants", note: "MULTI-ANSWER: det(adj P) = 4 and det(adj P) = det(P)^2 for 3x3, so det(P) = +/-2 and BOTH (A) -2 and (D) 2 are possible. Stem says 'possible value(s) ... is (are)'. Printed key A. Withdrawn to PRIVATE." },
  { qnum: "687", like: "Matrices_and_Determinants", note: "MULTI-ANSWER: the coefficient matrix is Vandermonde with det = -(a-b)(a-g)(b-g), so distinct parameters give the unique trivial solution and any two equal give infinitely many — (B) and (C) both true. Printed key B. Withdrawn to PRIVATE." },
  { qnum: "734", like: "Probability", note: "MULTI-ANSWER: with P(A)=0.7 and P(B)=0.6 the intersection must lie in [0.3, 0.6], so both (C) 0.65 and (D) 0.28 are necessarily false. Stem says 'statement(s) is/are'. Printed key C. Withdrawn to PRIVATE; this row is in the teacher paper 'Probability', which still builds because org members can read their own org's PRIVATE rows." },
  { qnum: "807", like: "Probability", note: "MULTI-ANSWER: P(X and Y) = 2/15 gives P(Y) = 4/15 and P(X'|Y) = 1/2, so (B) and (C) are both true while (A) and (D) are false. Printed key B. Withdrawn to PRIVATE." },
  { qnum: "819", like: "Probability", note: "MULTI-ANSWER: P(X) = 1/2, P(Y) = 1/3 and P(X and Y) = 1/6 make X and Y independent AND give P(X or Y) = 2/3, so (A) and (B) are both true. Stem says 'is(are)'. Printed key A. Withdrawn to PRIVATE." },
  { qnum: "820", like: "Probability", note: "MULTI-ANSWER: the two conditions solve to {P(E), P(F)} = {4/5, 3/5}, and (A) and (D) are simply the two orderings of that one solution. Printed key A. Withdrawn to PRIVATE." },
  { qnum: "972", like: "Logarithms", note: "MULTI-ANSWER: the relation reduces to (ln x)^2 = (ln 5)^2, so x = 5 or x = 1/5 — options (C) and (B). Printed key B. Withdrawn to PRIVATE." },
  { qnum: "1097", like: "Trigonometric_Identities", note: "MULTI-ANSWER: cos 2t = +/-sqrt(2/3) gives f(1/3) = 1 -/+ sqrt(3/2), so (A) and (B) are both values. Stem says 'the values of f(1/3) is (are)'. Printed key A. Withdrawn to PRIVATE." },
  { qnum: "1498", like: "2D__Lines", note: "MULTI-ANSWER: the distance condition gives |t+2| = 1, so t = -1 and t = -3, i.e. both (-1,0) and (-3,2) lie at distance 1/5. Printed key B. Withdrawn to PRIVATE." },
  { qnum: "2517", like: "Application_of_Derivatives", note: "BOOK DEFECT, source-verified on the page: '2pi sq. cm/s' is printed at BOTH (a) and (b); our transcription is faithful. dS/dt = 2pi is correct, so a student choosing (b) is right and would be marked wrong. No repair exists that does not invent an option the book never printed. Withdrawn to PRIVATE." },
  { qnum: "65", like: "Sets_and_Relations", note: "audit:keys FALSE POSITIVE. Key C is correct — 1+ab>0 on Z is reflexive and symmetric but not transitive (a=2, b=0, c=-2). The flag came from an already-adjudicated bracket naming the book's wrong key BY LETTER ('option D'), which the probe reads as this solution's conclusion. Bracket reworded to name the option's TEXT; key and stem untouched." },
  { qnum: "85", like: "Sets_and_Relations", note: "audit:keys FALSE POSITIVE, same cause as Q65. Key B is correct — |a-b|>0 means a != b, which is symmetric only (1!=2 and 2!=1 but 1=1). Bracket reworded to name the option's TEXT; key and stem untouched." },
  { qnum: "2343", like: "Limits_and_Continuity", note: "audit:keys FALSE POSITIVE. Key B (=1) is correct — the symmetric difference quotient tends to f'(2) = 1. The flag came from a bracket naming the book's wrong key BY LETTER ('option A'). Bracket reworded to name the VALUE; key and stem untouched." },
  { qnum: "2280", like: "Limits_and_Continuity", note: "BOOK DEFECT, source-verified on the page: '0' is printed at BOTH (a) and (d); our transcription is faithful. Harmless — the key (1/2) is unique and correct — so the row stays PUBLIC with the duplicate named in the solution rather than left looking like a transcription slip." },
];

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
  const { data, error } = await db
    .from("questions")
    .select("id,question_number,source_file,content_hash,visibility")
    .in("question_number", ROWS.map((r) => r.qnum))
    .like("source_file", "NDA_Maths_Practice%");
  if (error) throw error;

  const inputs: ReviewInput[] = [];
  for (const r of ROWS) {
    const hits = (data as any[]).filter(
      (q) => String(q.question_number) === r.qnum && String(q.source_file).includes(r.like)
    );
    if (hits.length !== 1) {
      console.error(`REFUSE Q${r.qnum}: matched ${hits.length} rows for source ~ "${r.like}"`);
      process.exit(1);
    }
    inputs.push({
      questionId: hits[0].id,
      reviewedContentHash: hits[0].content_hash,
      method: "blind_rederivation",
      verdict: "defect_preserved",
      runLabel: RUN,
      note: r.note.slice(0, 480),
      source: "live",
    });
  }
  console.log(`${inputs.length} verdict(s) ready under run "${RUN}" (all defect_preserved)`);
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
