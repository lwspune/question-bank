/**
 * Stamp `[Textbook …]` errata brackets onto MH-SSC-10 solutions, recording where
 * the publisher's own printed solution is wrong (or silent) and our stored
 * answer is right.
 *
 *   npx tsx scripts/mh-ssc-10/apply-errata.ts            # dry run
 *   npx tsx scripts/mh-ssc-10/apply-errata.ts --apply
 *
 * Source: the 2026-07-27 answer-key cross-check of the 11 papers whose source
 * PDF bundles an official printed solution (`data/<id>.crosscheck.json`).
 * Result of that pass: 295 questions — 279 AGREE, 14 BOOK-WRONG, 1
 * NO-BOOK-ANSWER, 1 BOTH-DEFENSIBLE, and **zero** wrong on our side. So there
 * are no answer corrections to make; this records the book's defects so a
 * student cross-referencing a guidebook isn't misled, and so the errata can be
 * reported to the publisher.
 *
 * The bracket goes at the START of the solution (an errata aggregator scans
 * `startsWith("[")` — a bracket appended at the end is invisible to it).
 *
 * Every edit here is SOLUTION-ONLY, and `solution` feeds neither `contentHash`
 * (question + options + answer) nor `subjectiveContentHash` (stem + context),
 * so these are hash-neutral by construction: no recompute, no collision risk.
 * Idempotent — a row already starting with "[Textbook" is skipped.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { EXAM_ID, requirePaper } from "./config";

const APPLY = process.argv.includes("--apply");

type Errata = { paper: string; ref: string; note: string };

const ERRATA: Errata[] = [
  // ── Algebra ────────────────────────────────────────────────────────────────
  {
    paper: "alg-2017", ref: "Q3(ii)",
    note: "Textbook answer-key error: the printed solution splits the middle term correctly as 3x^2 - 12x - 10x + 40 but then factorises 3x^2 - 12x as 3x(x - 12), carrying the splitting coefficient into the bracket; it is 3x(x - 4). The roots are x = 4 and x = 10/3, not x = 12 (substituting 12 gives 208, not 0).",
  },
  {
    paper: "alg-2017", ref: "Q4(i)",
    note: "Textbook answer-key error: the printed solution uses P(B) = 3P(C), but the question states B is TWICE as likely to win as C. With P(A) = 2P(B) and P(B) = 2P(C) the ratio is 4 : 2 : 1, giving 4/7, 2/7 and 1/7 — not the printed 6/10, 3/10, 1/10.",
  },
  {
    paper: "alg-2018", ref: "Q5(iii)",
    note: "Textbook answer-key error: the printed histogram draws and labels the last bar (class 40-45) as 10, but the question's own frequency table gives 25. The other five bars match the table.",
  },
  {
    paper: "alg-2019", ref: "Q3(B)(ii)",
    note: "Textbook answer-key error: the printed solution states the correct form x^2 - [(-3) + (-7)]x + (-3)(-7) = 0 and then writes the product as -21. The quadratic is x^2 + 10x + 21 = 0, which factorises as (x + 3)(x + 7); the printed x^2 + 10x - 21 = 0 has irrational roots and not the stated ones.",
  },
  {
    paper: "alg-2019", ref: "Q5(ii)",
    note: "Textbook answer-key error: the printed solution adds the two filling TIMES (x + y = 40/3). Filling times do not add — rates do. It also misreads 3 1/13 as 40/3 instead of 40/13. Solving 1/t + 1/(t+3) = 13/40 gives t = 5, so the taps take 5 and 8 minutes (check: 1/5 + 1/8 = 13/40). The printed 49/6 and 31/6 are self-refuting, since 6/49 + 6/31 corresponds to neither reading of the question.",
  },
  // ── Geometry ───────────────────────────────────────────────────────────────
  {
    paper: "geo-2016", ref: "Q3(iii)",
    note: "Textbook answer-key error: the printed steps lay the tangent-chord angle off at L (angle KLR = angle KML, 'Join LG') and the printed figure shows the line touching the circle at L — constructing the tangent at L, the other end of the chord — yet the closing sentence calls it the tangent at K. The construction must place the angle at K.",
  },
  {
    paper: "geo-2017", ref: "Q1(iii)",
    note: "Textbook answer-key error: the printed final line reads 3.(sqrt3/2), but the line immediately above it is (sqrt3/2) x 6, which is 3.sqrt3. The height of an equilateral triangle of side 6 is 3.sqrt3, not 3.sqrt3/2.",
  },
  {
    paper: "geo-2017", ref: "Q2(vi)",
    note: "Textbook answer-key error: the printed solution gives 50 x 18 x 10 = 900 cm^3 and repeats 900 cm^3 in its conclusion. The product is 9000 cm^3 — a dropped zero, printed twice.",
  },
  {
    paper: "geo-2017", ref: "Q4(ii)",
    note: "Textbook answer-key error: the printed solution writes 4x = 12cosec(t) + 12cot(t) and 3y = 12cosec(t) - 12cot(t), fabricating the cot coefficients so they cancel; multiplying the given equations actually yields +16cot(t) and -9cot(t). Correct elimination: 3x + 4y = 25cosec(t) and 4x - 3y = 25cot(t), so (3x + 4y)^2 - (4x - 3y)^2 = 625. The printed identity fails numerically (at t = 30 degrees its left side is about 1739.9, not 576).",
  },
  {
    paper: "geo-2017", ref: "Q5(iii)",
    note: "Textbook answer-key error: two slips. The printed solution states the midpoint formula correctly then substitutes (-2 - (-8))/2, a subtraction where addition is required, giving D = (-1, 3) instead of (-1, -5); the resulting median x - 6y = -19 inherits the error. Separately its own line 4y + 32 = 3x - 3 rearranges to 3x - 4y = 35, but it prints -35 (C(1, -8) gives 35).",
  },
  {
    paper: "geo-2019", ref: "Q2(A)(i)",
    note: "Textbook answer-key error: the printed working starts correctly from 1/2 = 4^2/DE^2 but then writes DE^2 = 4 x 2, dropping the square on the 4. Cross-multiplying gives DE^2 = 32, so DE = 4.sqrt2; the printed 2.sqrt2 would make the ratio 2 : 1, the inverse of the given 1 : 2.",
  },
  {
    paper: "geo-2019", ref: "Q4(i)",
    note: "Textbook answer-key error: the printed solution correctly obtains QM = 8 by Apollonius and then stops, never stating QR. Since M is the midpoint of QR, the quantity the question asks for is QR = 16.",
  },
  // ── Science and Technology I ────────────────────────────────────────────────
  {
    paper: "sci1-2016", ref: "Q2(6)",
    note: "Textbook answer-key error: in the printed pH-scale figure the third callout (pH about 8.5) is labelled 'Weakly acidic', duplicating the label at pH about 5.5. It lies inside the span the same figure brackets as 'Alkaline' and must read 'Weakly alkaline'.",
  },
  {
    paper: "sci1-2018", ref: "Q3(5)(c)",
    note: "Textbook answer-key error: the printed solution writes f = 1/(-2.5 D) and then drops the sign, concluding 0.4 m = 40 cm. A concave (diverging) lens has a negative focal length — and the same solution's part (a) uses the negative power to identify the lens as concave — so f = -0.4 m = -40 cm.",
  },
  // ── Notes (not answer-key errors) ──────────────────────────────────────────
  {
    paper: "geo-2017", ref: "Q5(ii)",
    note: "Textbook note: the printed solution gives the construction steps and figure but never states the ratio the question asks for, so the ratio below is derived rather than source-verified.",
  },
  {
    paper: "sci1-2019", ref: "Q4(2)(iii)",
    note: "Textbook note: the printed diagram labels the transmitted ray 'Reflected ray' in panels (a) and (b); it is the refracted ray — the same figure's panel (c) shows the actual reflected ray remaining in the denser medium.",
  },
];

/** Our own wording slips found by the cross-check (solution-only, hash-neutral). */
const WORDING_FIXES: { paper: string; ref: string; from: string; to: string }[] = [
  {
    paper: "geo-2016", ref: "Q3(iii)",
    // A parenthetical copied from the book named the wrong angle: the
    // tangent-chord angle at K is ∠LKR (between tangent ray KR and chord KL),
    // so the alternate-segment equality is ∠KML = ∠LKR. ∠KLR sits at L.
    // NOTE the DB stores this as LaTeX (`\angle …`), not the Unicode ∠ — a
    // Unicode match string silently finds nothing and reports "already correct".
    from: "\\angle KML = \\angle KLR",
    to: "\\angle KML = \\angle LKR",
  },
];

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  console.log(`${APPLY ? "APPLY" : "[dry-run]"} MH-SSC-10 errata\n`);
  let stamped = 0;
  let fixed = 0;
  let skipped = 0;

  // 1. Wording repairs first, so a later bracket prepend sees the final text.
  for (const w of WORDING_FIXES) {
    const paper = requirePaper(w.paper);
    const { data, error } = await client
      .from("questions")
      .select("id, solution")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .eq("question_number", w.ref);
    if (error) throw new Error(`read failed: ${error.message}`);
    const row = (data ?? [])[0] as { id: string; solution: string | null } | undefined;
    if (!row?.solution) { console.log(`  ! ${w.paper} ${w.ref}: no row/solution — SKIPPED`); continue; }
    if (!row.solution.includes(w.from)) {
      console.log(`  = ${w.paper} ${w.ref}: wording already correct`);
      continue;
    }
    const next = row.solution.split(w.from).join(w.to);
    fixed++;
    console.log(`  [wording] ${w.paper} ${w.ref}: "${w.from}" → "${w.to}"`);
    if (APPLY) {
      const { error: uErr } = await client.from("questions").update({ solution: next }).eq("id", row.id);
      if (uErr) throw new Error(`update failed: ${uErr.message}`);
    }
  }

  // 2. Errata brackets.
  for (const e of ERRATA) {
    const paper = requirePaper(e.paper);
    const { data, error } = await client
      .from("questions")
      .select("id, solution")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .eq("question_number", e.ref);
    if (error) throw new Error(`read failed: ${error.message}`);
    const row = (data ?? [])[0] as { id: string; solution: string | null } | undefined;
    if (!row) { console.log(`  ! ${e.paper} ${e.ref}: row not found — SKIPPED`); continue; }
    const current = row.solution ?? "";
    if (current.trimStart().startsWith("[Textbook")) { skipped++; continue; }

    const next = normalizeNewlines(`[${e.note}]\n\n${current}`);
    stamped++;
    console.log(`  [errata] ${e.paper} ${e.ref}: ${e.note.slice(0, 76)}…`);
    if (APPLY) {
      const { error: uErr } = await client.from("questions").update({ solution: next }).eq("id", row.id);
      if (uErr) throw new Error(`update failed: ${uErr.message}`);
    }
  }

  console.log(
    `\n${APPLY ? "applied" : "would apply"}: ${stamped} errata bracket(s), ${fixed} wording fix(es), ${skipped} already stamped.`
  );
  if (!APPLY) console.log("pass --apply to write.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
