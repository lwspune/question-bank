/**
 * Record the RULE 4 + RULE 5 review of Blueprint Mock 3.
 *
 *   npx tsx scripts/reviews/record-mock3-review.ts            # dry run
 *   npx tsx scripts/reviews/record-mock3-review.ts --apply
 *
 * Verdicts are DERIVED from the blind results, never hand-typed, so the record
 * cannot drift from the evidence that produced it:
 *
 *   blind letter == stored key            -> confirmed
 *   row whose stem or options were repaired this run -> stem_fixed
 *
 * METHOD is `blind_rederivation` for every row: each was solved from the stem
 * and options alone, with the key and stored solution withheld at dump time.
 *
 * A row with NO blind derivation is REFUSED rather than recorded as confirmed.
 * "Nobody checked this" and "somebody checked it and it was fine" are the two
 * states this table exists to keep apart.
 *
 * `reviewed_content_hash` is read AFTER the repairs landed, so a stem repaired
 * in this run is fingerprinted in its corrected form — a later edit then makes
 * the verdict queryably stale rather than silently trusted.
 *
 * ONE ROW IS RECORDED FOR A QUESTION NOT IN THE PAPER. Q6 of NDA1_2018 was
 * swapped IN during this run and then swapped back OUT when the blind pass found
 * it has two correct options (C and D are the same set under De Morgan). It is
 * still live and PUBLIC in the bank. Recording it as `unverifiable` is the point
 * of this table: without a row, the next session re-discovers it from scratch,
 * or worse, "fixes" a key that is not the problem.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const PAPER = "4091015f-8c0a-4c70-9f45-960c4079741f";
const RUN = "paper-blind:2026-08-29-blueprint-mock-3";
const BLIND_DIR = join(process.cwd(), "scripts", "reviews", "data", "blind", "2026-08-29-mock3");

/** Rows changed during this review, with the verdict that describes the change. */
const CHANGED: Record<string, { verdict: ReviewInput["verdict"]; note: string }> = {
  // Q161 — Complex Numbers
  "51a2b64e-a1b0-408d-aa5c-ca7d11b14484": {
    verdict: "stem_fixed",
    note:
      "Blind pass returned NONE. Source-verified against the printed booklet (01. Algebra_questions.pdf, page index 8): it prints exactly FOUR factors and no ellipsis, while our stem carried an ellipsis and a spurious (1 - w^64 + w^128), making seven. Four factors give (-2)^4 w^6 = 16 = key D; seven give -128w, which is not real and matches no option. Stem repaired, solution rewritten to derive each bracket, then re-derived blind: D.",
  },
  // Q304 — Permutations and Combinations
  "50b8fb46-7572-4e00-b5d6-88e9bf8872ec": {
    verdict: "stem_fixed",
    note:
      "Blind pass disagreed with the key. Source-verified (01. Algebra_questions.pdf, page index 14): the booklet prints T(n+1) - T(n) = 36 with options 2/5/6/9, while we stored = 10 with options 5/10/8/7 — the stem constant AND all four option values corrupt. The stored SOLUTION was already solving the booklet's real question ('= 36 ... n(n-1) = 72 ... n = 9'). Stem and all four options repaired; key D unchanged and re-confirmed blind.",
  },
  // Q1572 — Circles
  "6c1b21bc-c5dc-4dd5-81d9-9bd982129388": {
    verdict: "stem_fixed",
    note:
      "Blind pass returned NONE. Source-verified (3. 2D Geometry page 73-92.pdf, page index 8): the booklet prints x^2+y^2-4y=0 and x^2+y^2-8x-4y+11=0; we stored -2y-4 and -11. As stored the chord is sqrt(4403)/17 and option B exceeded the diameter. With the printed pair: centres (0,2) r=2 and (4,2) r=3, radical axis x=11/8, chord = sqrt(135)/4 = key C. Stem repaired; the stored solution ALSO had to be rewritten because it derived 2*sqrt(259/68) and then wrote '= sqrt(135)/4', a false equality printed to a student.",
  },
  // Q1892 — Vectors
  "33a8c023-36b8-4970-ae36-e9b424cd3ca7": {
    verdict: "stem_fixed",
    note:
      "Blind pass disagreed with the key. Source-verified (3. 3D Geometry page 93-109.pdf, page index 5): the booklet prints option (a) as pi/3; we stored pi/2. Only option A was corrupt — stem, options B/C/D and the stored solution (which derives pi/3 and says 'Matches option A') were already right. Option A repaired; key A unchanged and re-confirmed blind.",
  },
  // Q1912 — Vectors
  "1f01e46d-bf1e-4b0f-a3d3-572eed1a0028": {
    verdict: "stem_fixed",
    note:
      "Blind pass flagged a corrupt stem: it carried a bare comma between two expressions, with no operator joining them. Source-verified (3. 3D Geometry page 93-109.pdf, page index 6): the booklet prints (b+c) . a x {(b+c) x a} — the leading '(b+c) .' had been dropped and a comma left in its place. With the printed expression, a x {(b+c) x a} = (b+c)(a.a) - a((b+c).a) = (13,-2,-3), dotted with (1,0,0) gives 13 = key C. Stem repaired, solution rewritten, re-derived blind: C.",
  },
  // Q71 — Complex Numbers (LWS mock)
  "3b9d33f7-7a26-4249-95d5-aab1e839bded": {
    verdict: "stem_fixed",
    note:
      "Two glyph defects in the options: C was a capital 'I' and D a doubled hyphen '--i'. NOT source-verified — the .docx is not on disk — but settled by the option set itself: the four options of a question asking for i^(4n+1) are 1, -1, i, -i, and A and B were already 1 and -1. Repaired to i and -i; key C unchanged and re-confirmed blind.",
  },
  // Q69 — Application of Derivatives (LWS mock)
  "86e9934e-04c3-4a87-9fac-126b42acfc41": {
    verdict: "stem_fixed",
    note:
      "Option B was the capital letter 'O' where the digit 0 belongs. NOT source-verified — the .docx is not on disk — but settled by the mathematics: on 1 < x < 3 the function |x-1| + |x-3| is the constant 2, so the derivative at x = 2 is 0, and 0 completes the option set -2, 0, 2, Undefined. Repaired; key B unchanged and re-confirmed blind.",
  },
  // Q27 — Matrices (LWS mock)
  "a702666e-781f-4e87-bad2-272892c992c9": {
    verdict: "stem_fixed",
    note:
      "Found by the render gate, not the blind pass: an en-dash (U+2013) for a minus inside a math zone in the stem and in option D, and option C printed as '-- A' — a pandoc artifact from the .docx ingest. KaTeX renders an en-dash in warn mode, so it looks like a minus and nothing fails. Repaired, and the solution rewritten because it opened a math zone mid-expression. Key A re-derived independently: A idempotent gives AB = BA = 0 and (I-A)^2 = I-A, so the expression is A.",
  },
  // Q111 — 3D Geometry (LWS mock)
  "9e332864-b7c4-48cb-8654-fed63574943e": {
    verdict: "stem_fixed",
    note:
      "Same pandoc artifact: '--' for minus three times in the stem. Repaired. The solution was ALSO rewritten as a RULE 5 failure independent of the glyphs — the stored one was the stem copied verbatim with '(- 1, 4, - 2)' appended and no working at all. Key B re-derived: centre (1,2,-1), r = 3, plane distance 9/3 = 3 so it is tangent, and the foot of the perpendicular is (-1,4,-2).",
  },
  // Q5 — Sets & Relations (LWS mock)
  "86e5cae6-ea2a-4fea-ab4d-68431c522a5d": {
    verdict: "stem_fixed",
    note:
      "Same pandoc artifact: 'non -- empty' in the stem. Repaired to 'non-empty'. The solution was corrected too — it closed the set with a paren ('{1,2,3)'), carried a stray line-break backslash, and said 'proper subsets' while correctly counting the NON-EMPTY proper ones. Key C (6) re-confirmed blind.",
  },
};

/**
 * Reviewed during this run but NOT in the final paper. Recorded anyway, because
 * the finding is about the QUESTION and would otherwise be lost.
 */
const OFF_PAPER: { id: string; verdict: ReviewInput["verdict"]; note: string }[] = [
  {
    id: "3fec3a58-1019-438a-92de-9340f26379b7", // Q6, NDA1_2018_Maths_PYQ.xlsx
    verdict: "unverifiable",
    note:
      "TWO CORRECT OPTIONS — the question cannot be answered as printed. Option C is (A u B) - (A n B); option D is (A' u B') - (A' n B'), which De Morgan rewrites as (A n B)' - (A u B)' = (A u B) - (A n B), the same set. Options A and B are likewise both the complement of that set. Established by exhausting all 256 (A,B) pairs over a 4-element universe, which realises every Boolean atom and so settles the identity rather than sampling it. The official key C is the canonical form and is PRESERVED per the printed-paper-defect convention; no key repair can fix a question with two right answers. Swapped out of Blueprint Mock 3 rather than altered. Note every structural probe passes this row: four options, four distinct strings, exactly one flagged correct.",
  },
];

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Latest blind derivation per questionId. Later files win, so the
  // re-derivations in batch 10/11 supersede the stale ones they replace.
  const blind = new Map<string, { derived: string; value?: string; note?: string }>();
  const files = readdirSync(BLIND_DIR)
    .filter((f) => /^result\d+\.json$/.test(f))
    .sort((a, b) => Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0]));
  for (const f of files) {
    for (const r of JSON.parse(readFileSync(join(BLIND_DIR, f), "utf8")) as any[]) {
      const id = r.questionId ?? r.id;
      if (id) blind.set(String(id), { derived: r.derived, value: r.value, note: r.note ?? r.why });
    }
  }

  const { data, error } = await db
    .from("paper_questions")
    .select("questions!inner(id, question_number, content_hash, options(label, is_correct))")
    .eq("paper_id", PAPER);
  if (error) throw error;
  const rows = (data as any[]).map((r) => r.questions);

  const inputs: ReviewInput[] = [];
  const problems: string[] = [];
  const tally: Record<string, number> = {};

  for (const q of rows) {
    const key = (q.options as any[]).find((o) => o.is_correct)?.label ?? null;
    const b = blind.get(q.id);
    if (!b) {
      problems.push(`Q${q.question_number}: no blind derivation — refusing to record a verdict`);
      continue;
    }
    if (!key) {
      problems.push(`Q${q.question_number}: no correct option`);
      continue;
    }
    const got = (b.derived ?? "").trim().toUpperCase();
    if (got !== key) {
      problems.push(`Q${q.question_number}: blind=${got} but key=${key} — adjudicate, do not record`);
      continue;
    }

    const changed = CHANGED[q.id];
    const verdict = changed?.verdict ?? "confirmed";
    const note =
      changed?.note ??
      `Blind re-derivation agreed with the stored key ${key}. Derived: ${(b.value ?? "").slice(0, 200)}`;
    tally[verdict] = (tally[verdict] ?? 0) + 1;
    inputs.push({
      questionId: q.id,
      reviewedContentHash: q.content_hash,
      method: "blind_rederivation",
      verdict,
      runLabel: RUN,
      note: note.slice(0, 480),
      source: "live",
    });
  }

  // Off-paper rows need their own hash lookup — they are not in the join above.
  for (const off of OFF_PAPER) {
    const { data: oData, error: oErr } = await db
      .from("questions")
      .select("id, question_number, content_hash")
      .eq("id", off.id)
      .single();
    if (oErr) throw oErr;
    tally[off.verdict] = (tally[off.verdict] ?? 0) + 1;
    inputs.push({
      questionId: off.id,
      reviewedContentHash: (oData as any).content_hash,
      method: "blind_rederivation",
      verdict: off.verdict,
      runLabel: RUN,
      note: off.note.slice(0, 480),
      source: "live",
    });
    console.log(`off-paper: Q${(oData as any).question_number} -> ${off.verdict}`);
  }

  console.log(`\npaper rows ${rows.length} | blind derivations available ${blind.size} (${files.length} files)`);
  console.log(`verdicts ready ${inputs.length}`, tally);
  if (problems.length) {
    console.error(`\n${problems.length} row(s) NOT recorded:`);
    problems.forEach((p) => console.error("  " + p));
  }
  if (inputs.length !== rows.length + OFF_PAPER.length) {
    console.error(
      `\nREFUSE: ${rows.length + OFF_PAPER.length - inputs.length} of ${rows.length + OFF_PAPER.length} rows unrecorded.`
    );
    process.exit(1);
  }
  if (!APPLY) {
    console.log("\nDRY RUN — re-run with --apply.");
    return;
  }
  const res = await recordReviews(db as any, inputs);
  console.log(formatRecordResult(res));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
