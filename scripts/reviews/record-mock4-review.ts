/**
 * Record the RULE 4 + RULE 5 review of Blueprint Mock 4.
 *
 *   npx tsx scripts/reviews/record-mock4-review.ts            # dry run
 *   npx tsx scripts/reviews/record-mock4-review.ts --apply
 *
 * Verdicts are DERIVED from the blind results, never hand-typed, so the record
 * cannot drift from the evidence that produced it:
 *
 *   blind letter == stored key             -> confirmed
 *   stem or options repaired this run      -> stem_fixed
 *   correct option moved this run          -> key_fixed
 *   answer stood, working rewritten        -> solution_rewritten
 *
 * A row with NO blind derivation is REFUSED rather than recorded as confirmed.
 * "Nobody checked this" and "somebody checked it and it was fine" are the two
 * states this table exists to keep apart.
 *
 * `reviewed_content_hash` is read AFTER the repairs landed, so a stem repaired
 * in this run is fingerprinted in its corrected form and a later edit makes the
 * verdict queryably stale rather than silently trusted.
 *
 * THREE ROWS ARE RECORDED THAT ARE NOT IN THE PAPER, and this run is why the
 * mechanism matters. Mock 3 rejected two questions as unshippable and swapped
 * them out; the rejection lived only in a script comment. Removing a question
 * from a paper makes it ELIGIBLE AGAIN — the builder's only durable exclusion
 * was "is it in some paper" — so Mock 4 selected BOTH of them straight back, and
 * a third of the same kind besides. Recording them as `unverifiable` is what
 * makes the rejection stick: the builder now excludes any question whose LATEST
 * verdict is unverifiable, so this is the exclusion list, derived from the audit
 * trail rather than kept by hand.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const PAPER = "0232fca2-34bf-452b-96db-b41c17c8e52c";
const RUN = "paper-blind:2026-08-31-blueprint-mock-4";
const BLIND_DIR = join(process.cwd(), "scripts", "reviews", "data", "blind", "2026-08-31-mock4");

/** Rows changed during this review, with the verdict that describes the change. */
const CHANGED: Record<string, { verdict: ReviewInput["verdict"]; note: string }> = {
  // Q25 — NDA Sep 2024, Properties of Triangle
  "c7a17945-6454-4838-8685-e4020416aa31": {
    verdict: "stem_fixed",
    note:
      "Caught BEFORE the paper was built, by reading the fill per RULE 2a rather than trusting its label. Stored stem asked for sqrt(2)a - b with A=75 and B=45, which by the sine rule is 0.6589 on a scale where the four options are 0.866, 1.2247, 1.732 and 2.449 — no option reachable. Source-verified against Maths_2024_NDA2.pdf (no text layer, read as an image) page index 5: the paper prints '2a - b', which gives exactly sqrt(2)c. Stem repaired, solution written; key B unchanged and re-confirmed blind.",
  },
  // Q426 — Sequence & Series practice booklet
  "8e4963f5-1d1d-43b1-b7d6-9717b89745d2": {
    verdict: "stem_fixed",
    note:
      "Stem AND all four options corrupt, on a row that carried NO SOLUTION AT ALL — which is why nothing had ever caught it. As stored the A.P. condition gave t^2 - 4t + 27/5 = 0, discriminant -140, so the question had no real answer. Source-verified: the booklet's first term is log_e(5), not log_3(2), and its options are log_5 4/log_5 3 etc. With the printed stem, t^2 - 7t + 12 = 0 gives t = 3, 4, both clearing the domain t > 11/5. Key A unchanged and re-confirmed blind.",
  },
  // Q79 — Matrices, LWS mock .docx
  "d97d28b2-afde-4761-ac66-33c417594f94": {
    verdict: "stem_fixed",
    note:
      "Option A printed as '--I', the pandoc en-dash artifact from the .docx ingest. NOT source-verified (the .docx is not on disk) but settled by the option set: A, B, C are -I, -2X, 2X, so a doubled hyphen is not an expression. Key C unchanged and independently re-derived (X^2 = [[1,-8],[0,9]], so X^2 - 2X + 3I = [[2,-4],[0,6]] = 2X).",
  },
  // Q69 — NDA 2021-I, 3D Geometry
  "c1bcdbfe-a28b-4c8a-8108-24f1d2cb9ae8": {
    verdict: "key_fixed",
    note:
      "THE ONE GENUINE WRONG KEY of this paper. Unusually the stem is FAITHFUL — verified against the printed page of Maths_2021_NDA1.pdf — so it is the answer that was wrong. The cross product of the two joining vectors has components 23-k, -k^2+10k-23 and 46-4k, vanishing at k=23, k=5+/-sqrt(2) and k=23/2 respectively, with NO common root, so the three points are never collinear. Key B (One) -> A (Zero). The source paper publishes no key and the stored value came from a prep-house compilation, so this corrects a derivation rather than overriding UPSC.",
  },
  // Q139 — Complex Numbers practice booklet
  "6b1266cb-8a72-432f-aa82-9b6e79fa7bcc": {
    verdict: "key_fixed",
    note:
      "A TRANSCRIPTION ERROR THAT MADE A WRONG OPTION LOOK RIGHT. Our option D read '-3, -1-2w, -1-2w^2', which IS the root set, so the row had TWO correct options and the blind pass flagged it AMBIGUOUS against option A. The booklet prints (d) as '-3, 1-2w, -1-2w^2' — one sign different, and a mixed list whose middle entry 2-sqrt(3)i is not a root. Restoring the printed text leaves exactly one correct option. The booklet's OWN key also says (d), so this is a book answer-key error, flagged in the solution. Key D -> A, re-derived blind with all six option pairs checked for set equality.",
  },
  // Q43 — Weekly Mock T4, skew-symmetric statements
  "08ba7c6a-e8b6-4dae-9c48-e5721973626d": {
    verdict: "solution_rewritten",
    note:
      "RULE 5: the entire stored solution was 'Ans : (c)** Both I and II are true.' — it restated the option and derived nothing, on a row where both statements need a real argument. Rewritten with the transpose argument for A^2 symmetric and the diagonal argument for zero trace, noting that the trace result needs no parity at all so 'odd order' is a red herring. Answer C unchanged and confirmed blind.",
  },
  // Q43 — Weekly Mock T3, matrix power sum
  "d9ea7b68-3dc0-4703-a270-50a5374c0e54": {
    verdict: "solution_rewritten",
    note:
      "THE STORED SOLUTION DERIVED THE WRONG OPTION. It summed n terms where the series A + ... + A^(n-1) has n-1, reaching n[[1,(n-1)/2],[0,1]] — which is printed option A, not the keyed C. It also carried an 'Ans-(c)**' artifact and a line of Hindi from the .docx ingest. Note the letter-mismatch probe could NOT see this: the solution ends in a matrix, not an option letter. Key C unchanged and confirmed blind; solution rewritten to make the term count the explicit crux.",
  },
  // Q1227 — Trigonometric Equations booklet
  "55fb413d-da97-46f2-b70a-999aab16895b": {
    verdict: "stem_fixed",
    note:
      "Two separate defects. Our option D read 'n*pi +/- pi/2' where the booklet prints '2n*pi +/- pi/2' — restored for fidelity (a distractor either way; neither form solves the equation). And the stored solution carried a REAL ALGEBRA ERROR: from 2x = 2n*pi +/- pi/2 it wrote x = 2n*pi +/- pi/4, when halving must halve the n*pi term too, giving x = n*pi +/- pi/4. Rewritten. Key A unchanged — and the rewritten solution now states the BOOK's own defect, that its keyed option omits 3pi/4 and 5pi/4, while remaining the only defensible choice since the other three contain no solution at all.",
  },
  // Q43 — Mock Test 01, ordered pairs
  "3a37b91c-bd20-44f8-948d-d843d9a73be2": {
    verdict: "solution_rewritten",
    note:
      "The stored solution listed the six pairs correctly and then trailed off — 'i.e., pairs' with the count missing — so the printed answer key never actually stated the answer. Rewritten to count by sum. Key C unchanged and confirmed blind.",
  },
};

/**
 * Reviewed during this run but NOT in the final paper: judged unshippable and
 * swapped out. Recorded so the rejection is queryable — see the header.
 */
const OFF_PAPER: { id: string; verdict: ReviewInput["verdict"]; note: string }[] = [
  {
    id: "0d64bb8f-5c50-4403-9bf2-320d71717bc0", // Q82, NDA_Maths_Mock_Test_02.docx
    verdict: "unverifiable",
    note:
      "AMBIGUOUS AS PRINTED, and rejected for the SECOND time — Mock 3 swapped it out and it was selected straight back, because a rejection recorded only in a script comment cannot be queried. It asks which of AM, median and GM are 'defined' for a set of discrete numbers and keys 'All of them', but the geometric mean is undefined once any observation is zero or negative and the stem never restricts to positives, so a student reasoning correctly is marked wrong. The source .docx is not on disk, so the intended wording cannot be recovered.",
  },
  {
    id: "00526aaf-b5d7-44db-bf65-830eaa8894ef", // Q92, NDA_Maths_Mock_Test_03.docx
    verdict: "unverifiable",
    note:
      "UNPRINTABLE, and likewise rejected for the second time. Option (a) leaked into the stem and was truncated mid-LaTeX, so the stem ends '(a) $A \\cup P(A) = P' and option A is a bare '$' — a broken stem and three usable options. Unrepairable: the source .docx is not on disk, and reconstructing the lost text would be invention. Worth recording that the render gate PASSES this row, because an UNPAIRED '$' renders as a literal dollar sign rather than raising a KaTeX error.",
  },
  {
    id: "cb249d93-db98-4a89-8d86-e55e56c533e6", // Q278, Permutation & Combination booklet
    verdict: "unverifiable",
    note:
      "NO CORRECT ANSWER EXISTS, and the stored solution refuted its own key. 'Five boys seated around a round-table in five chairs of DIFFERENT COLOURS' makes the seats distinguishable, so rotations are not equivalent and the count is 5! = 120 — absent from the printed options 24/12/23/64. The keyed 24 is 4!, the answer WITHOUT the colour clause. Source-verified: the booklet prints the clause and those four options exactly as stored, so the defect is the book's. The stored solution stated 'the five chairs are of different colours, so the seats are distinguishable' and then applied (5-1)! anyway — hand-waving past its own observation.",
  },
  {
    id: "5a6268e7-4c44-4980-84a9-1ee854d497e0", // Q2241, Limits & Continuity booklet
    verdict: "unverifiable",
    note:
      "NO CORRECT ANSWER EXISTS. lim(x->0) 1/(3 - 2^(1/x)) has right-hand limit 0 and left-hand limit 1/3, so the two-sided limit does not exist — and BOTH one-sided values are printed as options (A = 0, D = 1/3), the signature of a key that silently picked a branch. Source-verified: the booklet prints 'x -> 0' with no side, exactly as stored, so the transcription is FAITHFUL and the defect is the book's. Preserving it would guarantee that a student who reasons correctly finds no option and must guess.",
  },
];

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Latest blind derivation per questionId. SORTED NUMERICALLY — readdir order
  // is lexicographic (result1, result10, result2, ...), which would let a STALE
  // derivation win over the re-derivation that supersedes it.
  const blind = new Map<string, { derived: string; value?: string }>();
  const files = readdirSync(BLIND_DIR)
    .filter((f) => /^result\d+\.json$/.test(f))
    .sort((a, b) => Number(a.match(/\d+/)![0]) - Number(b.match(/\d+/)![0]));
  for (const f of files) {
    for (const r of JSON.parse(readFileSync(join(BLIND_DIR, f), "utf8")) as any[]) {
      const id = r.questionId ?? r.id;
      if (id) blind.set(String(id), { derived: r.derived, value: r.value });
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
