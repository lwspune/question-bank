/**
 * Resolve the 16 practice rows flagged by `npm run audit:keys` (2026-08-26).
 *
 *   npx tsx scripts/reviews/resolve-audit-key-flags.ts            # dry run
 *   npx tsx scripts/reviews/resolve-audit-key-flags.ts --apply
 *
 * WHAT THE SOURCE SAID. Every row was read against the printed practice booklet
 * (C:\tmp\Practice\Maths) and its printed answer key. NOT ONE of the 16 is a
 * wrong answer in our bank. They are three different things, and only the third
 * needed a content change:
 *
 * GROUP A — 11 rows with TWO options marked correct. The second mark is NOT
 * spurious: every one is a genuine MULTIPLE-CORRECT question (JEE-Advanced-style
 * items reprinted in this book), and their stems say so — "which of the
 * following is/are true", "the possible value(s) ... is (are)", "statement(s)".
 * Each second option was verified TRUE by solving (verify-multi.py, 0 failures):
 * Q656's det(P) really is +/-2; Q820's two options are the two orderings of the
 * same {3/5, 4/5} solution; Q1498's two points are both at distance 1/5.
 * The defect is therefore NOT in the data — it is that this bank's MCQ model
 * allows exactly one correct option, and `question_format` has no multi-correct
 * member. Withdrawn to PRIVATE rather than mangled into single-answer, because
 * the only single-answer repair available is to un-mark one TRUE option, which
 * would mark a student wrong for giving a correct answer.
 *
 * GROUP B — 3 rows flagged SOLN != KEY are PROBE FALSE POSITIVES, and the
 * probe is right to be suspicious. Each solution already carries a
 * "[Textbook note: the source book keys option D ...]" bracket recording an
 * adjudicated BOOK error; `audit-keys` reads that letter as the solution's own
 * conclusion. Our keys are correct (re-verified here). The brackets are reworded
 * to name the option's TEXT instead of its letter — which keeps the pedagogy and
 * silences the probe permanently rather than relocating it. Same fix the repo
 * has applied to this false-positive class before.
 *
 * GROUP C — 2 rows with duplicate options: BOTH duplicates are the BOOK's own,
 * verified on the page. They are treated differently because their harm differs:
 *   Q2280 prints "0" at both (a) and (d) — a duplicated DISTRACTOR. The key
 *     (1/2) is unique and correct, so nobody can be mis-marked. Preserved as
 *     printed, with the defect named in the solution.
 *   Q2517 prints "2pi sq. cm/s" at both (a) and (b) — a duplicated ANSWER. A
 *     student choosing (b) is mathematically right and would be marked wrong.
 *     There is no repair that does not invent an option the book never printed,
 *     so it is withdrawn to PRIVATE.
 *
 * WITHDRAWING IS NOT DELETING. Visibility only: the rows keep their ids, text,
 * options, solutions and any paper references. Q734 sits in one teacher paper
 * ("Probability"); PRIVATE rows stay readable by their own org's members, so
 * that paper still builds. Reverse with:
 *   update questions set visibility = 'PUBLIC' where id in (...);
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");

/** Rows withdrawn to PRIVATE. No text changes, so content_hash is untouched. */
type Withdraw = { qnum: string; sourceLike: string; why: string };

const WITHDRAW: Withdraw[] = [
  { qnum: "60", sourceLike: "Sets_and_Relations", why: "Multi-correct: 'xy>0' on R is symmetric AND transitive AND not reflexive, so (B) and (C) are both true. Stem says 'is/are'. Printed key B." },
  { qnum: "650", sourceLike: "Matrices_and_Determinants", why: "Multi-correct: MN is not symmetric for all symmetric M,N (counterexample found) and adj(MN)=adj(N)adj(M) not adj(M)adj(N), so (C) and (D) are both 'not correct'. Stem says 'statement(s) is (are)'. Printed key C." },
  { qnum: "656", sourceLike: "Matrices_and_Determinants", why: "Multi-correct: det(adj P)=4 and det(adj P)=det(P)^2, so det(P)=+/-2 and BOTH (A) -2 and (D) 2 are possible. Stem says 'possible value(s) ... is (are)'. Printed key A." },
  { qnum: "687", sourceLike: "Matrices_and_Determinants", why: "Multi-correct: the Vandermonde determinant is (a-b)(a-g)(b-g), so distinct gives a unique (trivial) solution and any two equal gives infinitely many — (B) and (C) both true. Printed key B." },
  { qnum: "734", sourceLike: "Probability", why: "Multi-correct: P(A and B) must lie in [0.3, 0.6], so both (C) 0.65 and (D) 0.28 are necessarily false. Stem says 'statement(s) is/are'. Printed key C. NOTE: this row is in the teacher paper 'Probability'." },
  { qnum: "807", sourceLike: "Probability", why: "Multi-correct: P(X and Y)=2/15 gives P(Y)=4/15 and P(X'|Y)=1/2, so (B) and (C) are both true. Printed key B." },
  { qnum: "819", sourceLike: "Probability", why: "Multi-correct: P(X)=1/2, P(Y)=1/3, P(X and Y)=1/6 makes X,Y independent AND P(X or Y)=2/3, so (A) and (B) are both true. Stem says 'is(are)'. Printed key A." },
  { qnum: "820", sourceLike: "Probability", why: "Multi-correct: the system solves to {P(E),P(F)} = {4/5, 3/5}; (A) and (D) are the two orderings of the same solution. Printed key A." },
  { qnum: "972", sourceLike: "Logarithms", why: "Multi-correct: the relation reduces to (ln x)^2 = (ln 5)^2, so x = 5 or x = 1/5 — both (B) and (C). Printed key B." },
  { qnum: "1097", sourceLike: "Trigonometric_Identities", why: "Multi-correct: cos2t = +/-sqrt(2/3) gives f(1/3) = 1 -/+ sqrt(3/2), so (A) and (B) are both values. Stem says 'the values of f(1/3) is (are)'. Printed key A." },
  { qnum: "1498", sourceLike: "2D__Lines", why: "Multi-correct: the distance condition gives t = -1 and t = -3, i.e. both (-1,0) and (-3,2). Printed key B." },
  { qnum: "2517", sourceLike: "Application_of_Derivatives", why: "BOOK defect: the printed page shows '2pi sq. cm/s' at BOTH (a) and (b) (our transcription is faithful). dS/dt = 2pi is correct, so a student choosing (b) is right and would be marked wrong. No repair exists that does not invent an option the book never printed." },
];

/** Rows whose SOLUTION text changes. Keys and stems are untouched. */
type SolutionEdit = { qnum: string; sourceLike: string; why: string; find: string; to: string };

const EDITS: SolutionEdit[] = [
  {
    qnum: "65",
    sourceLike: "Sets_and_Relations",
    why: "audit:keys false positive — the bracket names the book's option by LETTER ('option D'), which the probe reads as this solution concluding D. Key C is correct and stays. Reworded to name the option's TEXT.",
    find:
      "[Textbook note: the source book keys option D ('equivalence relation'), but transitivity fails on Z (a=2, b=0, c=−2), so the relation is reflexive and symmetric but not transitive.]",
    to:
      "[Textbook note: the source book's key calls this an equivalence relation, but transitivity fails on Z — take a=2, b=0, c=−2: 1+ab and 1+bc are both positive while 1+ac = −3 is not. So the relation is reflexive and symmetric but not transitive.]",
  },
  {
    qnum: "85",
    sourceLike: "Sets_and_Relations",
    why: "audit:keys false positive — same cause as Q65. Key B is correct and stays. Reworded to name the option's TEXT.",
    find:
      "[Textbook note: the source book keys option D ('symmetric and transitive'), but transitivity fails (e.g. 1≠ 2 and 2≠ 1 while 1=1), so the relation is symmetric only.]",
    to:
      "[Textbook note: the source book's key calls the relation both symmetric and transitive, but transitivity fails — 1≠2 and 2≠1, yet 1=1, so 1 is not related to itself. The relation is symmetric only.]",
  },
  {
    qnum: "2343",
    sourceLike: "Limits_and_Continuity",
    why: "audit:keys false positive — the bracket names the book's option by LETTER ('option A'), read by the probe as this solution concluding A. Key B (=1) is correct and stays. Reworded to name the VALUE.",
    find:
      "[Textbook note: the source book keys option A (0) and its printed solution reaches 0 via a sign error in the left-hand difference quotient; the correct value is 1.]",
    to:
      "[Textbook note: the source book's key gives the limit as 0, its printed solution reaching that value through a sign error in the left-hand difference quotient. The symmetric quotient above gives f'(2) = 1.]",
  },
  {
    qnum: "2280",
    sourceLike: "Limits_and_Continuity",
    why: "BOOK defect, source-verified: the printed page shows '0' at BOTH (a) and (d). Harmless — the key (1/2) is unique — but it should be recorded rather than left to look like a transcription slip.",
    find: "Matches option B. Hence (B).",
    to:
      "Hence (B). [Textbook note: the printed page gives the same value 0 at both (a) and (d). Our transcription is faithful to it; the duplicate is a distractor, so the answer 1/2 remains the only correct option.]",
  },
];

// eslint-disable-next-line no-control-regex
const CTRL = /[\x00-\x08\x0B\x0C\x0E-\x1F]/;

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const qnums = [...WITHDRAW.map((w) => w.qnum), ...EDITS.map((e) => e.qnum)];
  const { data, error } = await db
    .from("questions")
    .select("id,question_number,source_file,visibility,solution,content_hash,options(label,is_correct)")
    .in("question_number", qnums)
    .like("source_file", "NDA_Maths_Practice%");
  if (error) throw error;

  // question_number repeats across booklets (Q60 exists in both Sets & Relations
  // and Vectors), so a row is identified by (number, source substring).
  const pick = (qnum: string, like: string) =>
    (data as any[]).filter((q) => String(q.question_number) === qnum && String(q.source_file).includes(like));

  let refused = 0;
  const toWithdraw: { id: string; qnum: string; why: string; marked: string }[] = [];
  const toEdit: { id: string; qnum: string; why: string; solution: string }[] = [];

  console.log("GROUP A+C — withdraw to PRIVATE\n");
  for (const w of WITHDRAW) {
    const hits = pick(w.qnum, w.sourceLike);
    if (hits.length !== 1) {
      console.error(`REFUSE Q${w.qnum}: matched ${hits.length} rows for source ~ "${w.sourceLike}"`);
      refused++;
      continue;
    }
    const q = hits[0];
    const marked = (q.options as any[]).filter((o) => o.is_correct).map((o) => o.label).sort().join(",");
    // A withdraw is only justified by the structural defect that motivated it.
    const isMulti = marked.includes(",");
    const isDupAnswer = w.qnum === "2517";
    if (!isMulti && !isDupAnswer) {
      console.error(`REFUSE Q${w.qnum}: expected 2 correct options (or the known dup-answer row), found key=${marked}`);
      refused++;
      continue;
    }
    if (q.visibility !== "PUBLIC") {
      console.log(`  Q${w.qnum}  already ${q.visibility} — skipping`);
      continue;
    }
    toWithdraw.push({ id: q.id, qnum: w.qnum, why: w.why, marked });
    console.log(`  Q${w.qnum}  marked=[${marked}]  PUBLIC -> PRIVATE`);
    console.log(`     ${w.why}`);
  }

  console.log("\nGROUP B — solution text only (keys and stems untouched)\n");
  for (const e of EDITS) {
    const hits = pick(e.qnum, e.sourceLike);
    if (hits.length !== 1) {
      console.error(`REFUSE Q${e.qnum}: matched ${hits.length} rows for source ~ "${e.sourceLike}"`);
      refused++;
      continue;
    }
    const q = hits[0];
    const src: string = q.solution ?? "";
    if (e.find === e.to) {
      console.error(`REFUSE Q${e.qnum}: find === to (mangled needle?)`);
      refused++;
      continue;
    }
    const n = src.split(e.find).length - 1;
    if (n !== 1) {
      console.error(`REFUSE Q${e.qnum}: needle matched ${n}x, expected exactly 1`);
      console.error(`   find: ${JSON.stringify(e.find)}`);
      refused++;
      continue;
    }
    const out = src.replace(e.find, e.to);
    if (CTRL.test(out) || out.includes("\\\\(")) {
      console.error(`REFUSE Q${e.qnum}: control char or double-escaped delimiter in authored text`);
      refused++;
      continue;
    }
    toEdit.push({ id: q.id, qnum: e.qnum, why: e.why, solution: out });
    console.log(`  Q${e.qnum}  solution reworded (content_hash UNCHANGED — hash excludes solution)`);
    console.log(`     ${e.why}`);
  }

  if (refused) {
    console.error(`\n${refused} row(s) refused — nothing written.`);
    process.exit(1);
  }
  console.log(`\n${toWithdraw.length} withdrawal(s), ${toEdit.length} solution edit(s).`);
  if (!APPLY) {
    console.log("DRY RUN — re-run with --apply.");
    return;
  }

  for (const w of toWithdraw) {
    const { error: e1 } = await db.from("questions").update({ visibility: "PRIVATE" }).eq("id", w.id);
    if (e1) throw e1;
    console.log(`withdrew Q${w.qnum}`);
  }
  for (const e of toEdit) {
    const { error: e2 } = await db.from("questions").update({ solution: e.solution }).eq("id", e.id);
    if (e2) throw e2;
    console.log(`edited Q${e.qnum}`);
  }
  console.log(`\ndone: ${toWithdraw.length} withdrawn, ${toEdit.length} edited.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
