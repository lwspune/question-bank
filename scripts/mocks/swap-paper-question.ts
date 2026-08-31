/**
 * Swap one question out of an assembled paper and another in, IN PLACE.
 *
 *   npx tsx scripts/mocks/swap-paper-question.ts            # dry run
 *   npx tsx scripts/mocks/swap-paper-question.ts --apply
 *
 * WHY A SCRIPT. A review sometimes finds a question that cannot be repaired —
 * its source .docx is not on disk, so there is nothing to repair it AGAINST, and
 * inventing the missing half would be fabrication. The honest remedy is to
 * replace it. Doing that by hand is where a blueprint quietly rots: the natural
 * mistakes are to write a new `position` (which reorders the paper), to drop in
 * a question from a different chapter or difficulty (which breaks the
 * allocation the blueprint exists to enforce), or to bring in one that already
 * appears in another paper (which breaks the no-repeat rule).
 *
 * So every one of those is a REFUSAL here, not a warning:
 *
 *   - the outgoing question must appear in this paper EXACTLY once
 *   - the incoming question must NOT be in this paper
 *   - the incoming question must not be in ANY OTHER paper either
 *   - chapter, subtopic and difficulty must MATCH the outgoing question — this
 *     is what keeps the blueprint cell intact without re-running the builder
 *   - RULE 1: the incoming question must carry no `set_id` and no `context`,
 *     because a set member is only answerable alongside its siblings
 *   - it must be PUBLIC, with four DISTINCT options and exactly one correct
 *
 * `position` is deliberately never written. It is a fractional sort key, not an
 * ordinal, so preserving the row and changing only `question_id` keeps the
 * printed order byte-identical — which matters, because RULE 3's interleaving
 * was computed over the whole paper and cannot be re-derived one row at a time.
 *
 * WHAT THIS SCRIPT CANNOT CHECK, and it bit on first use. The duplicate-option
 * guard below compares option TEXT. It cannot see that two DIFFERENTLY WRITTEN
 * options denote the SAME SET. The first question swapped in here was an NDA
 * 2018 PYQ whose option C reads `(A u B) - (A n B)` and whose option D reads
 * `(A' u B') - (A' n B')` — which De Morgan turns into `(A n B)' - (A u B)'`,
 * i.e. exactly option C. Four distinct strings, two correct answers, every
 * structural check green. Options A and B were likewise the same set as each
 * other (the complement).
 *
 * So a swap-in is NOT cleared by this script alone. It must go through the blind
 * re-derivation pass afterwards, which is what caught that one — a solver asked
 * to name the option matching its derived value has to notice when two of them
 * match. Treat a green run here as "structurally placeable", never "correct".
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");

const PAPER = "4091015f-8c0a-4c70-9f45-960c4079741f"; // Blueprint Mock 3

type Swap = { out: string; in: string; why: string };

const SWAPS: Swap[] = [
  {
    // Q6, NDA1_2018_Maths_PYQ.xlsx -> Q3, NDA2_2019_Maths_PYQ.xlsx
    out: "3fec3a58-1019-438a-92de-9340f26379b7",
    in: "dddd2978-81b3-4141-9f27-47b8ad854d1d",
    why:
      "TWO CORRECT OPTIONS. This question was itself swapped in earlier this run and the blind pass caught it: C is (A u B) - (A n B), and D is (A' u B') - (A' n B'), which De Morgan rewrites as (A n B)' - (A u B)' = (A u B) - (A n B) — the same set. A and B are both the complement of that, so the four options are two pairs. Confirmed by exhausting all 256 (A,B) pairs on a 4-element universe, which realises every Boolean atom and so settles the identity rather than sampling it. No key repair can fix a question with two right answers, and the printed NDA paper is what it is, so it is replaced rather than altered. The incoming NDA 2019 PYQ occupies the SAME cell (Sets & Relations / Set Operations / MODERATE) and asks which relation is NOT correct: B is absorption and C and D are the two distributive laws, all always true, while A claims A u (A n B) = A u B when absorption makes it A. Exactly one false statement.",
  },
];

/** Applied earlier in this run; kept for the record. */
const DONE: Swap[] = [
  {
    // Q92, NDA_Maths_Mock_Test_03.docx
    out: "00526aaf-b5d7-44db-bf65-830eaa8894ef",
    in: "3fec3a58-1019-438a-92de-9340f26379b7", // Q6, NDA1_2018_Maths_PYQ.xlsx
    why:
      "UNPRINTABLE, and unrepairable. Option (a) leaked into the stem and was then truncated mid-LaTeX, so the stem ends '(a) $A \\cup P(A) = P' and option A is a bare '$'. The question as stored has three options and a broken stem. Its source .docx is not on disk, so there is nothing to restore the lost text from; reconstructing it would be invention, not repair. Replaced by an NDA 2018 PYQ in the SAME cell (Sets & Relations / Set Operations / MODERATE) testing the symmetric-difference identity.",
  },
  {
    // Q82, NDA_Maths_Mock_Test_02.docx
    out: "0d64bb8f-5c50-4403-9bf2-320d71717bc0",
    in: "32f6cd31-d333-467e-a725-a2eb0cba5e32", // Q110, NDA_Maths_2023_1_QuestionBank.xlsx
    why:
      "AMBIGUOUS as printed. It asks which of AM, median and GM are 'defined' for a set of discrete numbers and keys 'All of them' — but the geometric mean is undefined once any observation is zero or negative, and the stem never restricts the numbers to positives. So the keyed answer is right only under a condition the question does not state, and a student who reasons correctly is marked wrong. Its source .docx is not on disk, so the intended wording cannot be recovered. Replaced by an NDA 2023-I PYQ in the SAME cell (Statistics / Central Tendency / EASY) asking for the mode of a listed data set.",
  },
];

type Q = {
  id: string;
  question_number: string;
  source_file: string | null;
  visibility: string;
  difficulty: string;
  set_id: string | null;
  context: string | null;
  chapter_id: string | null;
  subtopic_id: string | null;
  options: { label: string; text: string; is_correct: boolean }[];
};

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const ids = SWAPS.flatMap((s) => [s.out, s.in]);
  const { data: qData, error: qErr } = await db
    .from("questions")
    .select(
      "id, question_number, source_file, visibility, difficulty, set_id, context, chapter_id, subtopic_id, options(label, text, is_correct)"
    )
    .in("id", ids);
  if (qErr) throw qErr;
  const byId = new Map((qData as any[]).map((q) => [q.id as string, q as Q]));

  // Every paper, so the no-repeat rule can be checked across the whole set.
  const { data: pqData, error: pqErr } = await db
    .from("paper_questions")
    .select("paper_id, question_id, position")
    .in("question_id", ids);
  if (pqErr) throw pqErr;
  const placements = pqData as { paper_id: string; question_id: string; position: number }[];

  let refused = 0;
  const plan: { paperId: string; position: number; out: Q; in: Q; why: string }[] = [];

  for (const s of SWAPS) {
    const outQ = byId.get(s.out);
    const inQ = byId.get(s.in);
    const tag = `${outQ ? `Q${outQ.question_number}` : s.out.slice(0, 8)} -> ${
      inQ ? `Q${inQ.question_number}` : s.in.slice(0, 8)
    }`;
    const refuse = (msg: string) => {
      console.error(`REFUSE ${tag}: ${msg}`);
      refused++;
    };
    if (!outQ) {
      refuse("outgoing question not found");
      continue;
    }
    if (!inQ) {
      refuse("incoming question not found");
      continue;
    }

    const here = placements.filter((p) => p.paper_id === PAPER && p.question_id === s.out);
    if (here.length !== 1) {
      refuse(`outgoing question appears ${here.length}x in this paper, expected 1`);
      continue;
    }
    if (placements.some((p) => p.question_id === s.in)) {
      const where = placements.filter((p) => p.question_id === s.in).map((p) => p.paper_id);
      refuse(`incoming question is already placed in paper(s) ${where.join(", ")}`);
      continue;
    }

    if (inQ.visibility !== "PUBLIC") {
      refuse(`incoming question is ${inQ.visibility}`);
      continue;
    }
    if (inQ.set_id || inQ.context) {
      refuse("RULE 1: incoming question is set-bound (has set_id or context)");
      continue;
    }
    if (inQ.chapter_id !== outQ.chapter_id) {
      refuse("chapter differs — this would move the blueprint cell");
      continue;
    }
    if (inQ.subtopic_id !== outQ.subtopic_id) {
      refuse("subtopic differs — this would move the blueprint cell");
      continue;
    }
    if (inQ.difficulty !== outQ.difficulty) {
      refuse(`difficulty ${inQ.difficulty} != ${outQ.difficulty} — this would move the E/M/H split`);
      continue;
    }

    const opts = inQ.options ?? [];
    if (opts.length !== 4) {
      refuse(`incoming question has ${opts.length} options`);
      continue;
    }
    if (opts.filter((o) => o.is_correct).length !== 1) {
      refuse("incoming question does not have exactly one correct option");
      continue;
    }
    if (new Set(opts.map((o) => (o.text ?? "").trim())).size !== 4) {
      refuse("incoming question has duplicate option text");
      continue;
    }

    plan.push({ paperId: PAPER, position: here[0].position, out: outQ, in: inQ, why: s.why });
    const key = opts.find((o) => o.is_correct)!.label;
    console.log(`\nposition ${here[0].position}`);
    console.log(`  OUT  Q${outQ.question_number}  ${outQ.source_file}`);
    console.log(`  IN   Q${inQ.question_number}  ${inQ.source_file}  key=${key}`);
    console.log(`  cell PRESERVED: same chapter, subtopic and ${inQ.difficulty}`);
    console.log(`  why: ${s.why}`);
  }

  if (refused) {
    console.error(`\n${refused} refused — NOTHING written.`);
    process.exit(1);
  }
  if (!APPLY) {
    console.log(`\nDRY RUN — ${plan.length} swap(s) would be applied.`);
    return;
  }

  for (const p of plan) {
    const { error } = await db
      .from("paper_questions")
      .update({ question_id: p.in.id })
      .eq("paper_id", p.paperId)
      .eq("question_id", p.out.id);
    if (error) throw error;
    console.log(`swapped at position ${p.position}: Q${p.out.question_number} -> Q${p.in.question_number}`);
  }
  console.log(`\n${plan.length} swap(s) applied. Positions untouched.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
