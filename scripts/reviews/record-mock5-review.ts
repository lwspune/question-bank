/**
 * Record the RULE 4 + RULE 5 review of Blueprint Mock 5.
 *
 *   npx tsx scripts/reviews/record-mock5-review.ts            # dry run
 *   npx tsx scripts/reviews/record-mock5-review.ts --apply
 *
 * Verdicts are DERIVED from the blind results, never hand-typed:
 *
 *   blind letter == stored key        -> confirmed
 *   stem or options repaired          -> stem_fixed
 *   correct option moved              -> key_fixed
 *   answer stood, working rewritten   -> solution_rewritten
 *
 * A row with NO blind derivation is REFUSED rather than recorded as confirmed.
 *
 * THIS PAPER INVERTS MOCK 3's PATTERN, which is the fact worth carrying forward.
 * There, every letter-level disagreement was a corrupt transcription under a
 * correct key. Here most transcriptions are FAITHFUL and the defects belong to
 * the printed books: THREE separate key errors were confirmed against the page
 * AND against the booklets' own printed answer tables, and in two of the three
 * the book prints the fuller, correct option and keys the narrower one. Reading
 * the page first is what separated these from the four flagged rows that turned
 * out to need no change at all.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { recordReviews, formatRecordResult } from "../../src/lib/reviews/service";
import type { ReviewInput } from "../../src/lib/reviews/record";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const PAPER = "f918efd4-e03f-4392-8bbf-6f5a4783b698";
const RUN = "paper-blind:2026-09-02-blueprint-mock-5";
const BLIND_DIR = join(process.cwd(), "scripts", "reviews", "data", "blind", "2026-09-02-mock5");

const CHANGED: Record<string, { verdict: ReviewInput["verdict"]; note: string }> = {
  // Q1195 — Trigonometric Equations booklet
  "5a01ab19-bb01-4774-bc5f-df63761ade2e": {
    verdict: "key_fixed",
    note:
      "BOOK KEY ERROR. tan x - sin x = 1 - tan x sin x factors as (1 + sin x)(tan x - 1) = 0; the sin x = -1 branch forces cos x = 0, where tan x is UNDEFINED, so those points are outside the domain of the printed equation and are extraneous roots of the CLEARED equation (which does hold there, both sides being -1 — that is how the error arises). Source-verified: stem, all four options and the booklet's own printed key (a) are transcribed faithfully, and the booklet prints the correct set separately as its option (c). Key A -> C.",
  },
  // Q1975 — 3D Geometry booklet
  "b22cc6e5-fbee-4c26-9374-641eae42e90b": {
    verdict: "key_fixed",
    note:
      "BOOK KEY ERROR, same shape as Q1195. cos^2(45) + cos^2(60) + cos^2(gamma) = 1 gives cos^2(gamma) = 1/4, so cos(gamma) = +/-1/2 and both 60 and 120 degrees occur — two genuinely different lines satisfy the stem, and nothing in it restricts the line to the first octant (the stored solution silently assumed that). Source-verified against the printed page and the booklet's own key table, both of which say (a); the booklet nonetheless prints '60 and 120' as its option (c). Key A -> C.",
  },
  // Q2507 — Application of Derivatives booklet
  "2d15302d-9b93-409c-8b40-40149335e1d3": {
    verdict: "key_fixed",
    note:
      "OUR OPTION TEXTS A AND B ARE SWAPPED relative to the printed page, and the key letter was carried across without accounting for it, so the stored key pointed at the wrong pair. The stored SOLUTION derives (3, 16/3) and (-3, -16/3) correctly and then writes 'Hence (A)' — our option B. Source-verified: the booklet prints that pair as its (a) and its key table says (a). dy/dx = -1 gives 16x = 9y; the rejected pair satisfies 16x = -9y, where the ordinate INCREASES. Key A -> B.",
  },
  // Q2973 — Differential Equations booklet
  "eef49939-b25f-4c63-882f-7d1dbcf975e7": {
    verdict: "stem_fixed",
    note:
      "Our third option read '3, 1' where the booklet prints '2, 1' — restored for fidelity, a distractor either way. Key B (2, 2) is correct AS PRINTED and unchanged: the blind pass suspected the stem was a corrupted Clairaut equation (which would give 1, 2), but the page really does write dp/dx rather than p, so the highest derivative is the second. Solved as printed, per the standing rule, and the discrepancy reported rather than 'corrected'.",
  },
  // Q1829 — Vectors booklet
  "1d48a2f8-4e15-43b1-aa8c-f709eaba0bcb": {
    verdict: "stem_fixed",
    note:
      "Our stem introduced the third point as 'a i' and then asked for 'lambda', naming an unknown it never defined. The booklet prints 'lambda i'. Restored. Key B (8) unchanged and confirmed blind — the first two points give slope -4, so 8/(x - 10) = -4 and x = 8.",
  },
  // Q8 — Weekly Mock T1
  "57e3afd7-1462-4674-9846-f4f2724544d6": {
    verdict: "stem_fixed",
    note:
      "Mis-zoned math delimiter from the .docx ingest: the base (x - 1) sat OUTSIDE the math zone while its exponent sat inside, so the row rendered with the first bracket in body text and a stray floating square. Not source-verifiable (the .docx is not on disk) but unambiguous. Key A unchanged — a sum of three squares vanishes only if each does, and x cannot be 1, 3 and 5 at once.",
  },
  // Q2179 — Functions booklet
  "57dda52c-4186-4971-a3bb-841fe5551efd": {
    verdict: "solution_rewritten",
    note:
      "Stem and key both faithful and unchanged; the solution gained an errata note. The booklet really does print the domain as [0, inf), where f(x) = x + 1/x is undefined at 0 and not one-one on (0,1) u (1,inf) — the intended domain is [1, inf), which is exactly the branch that maps onto [2, inf) and selects the plus root. Key A correct. The rewrite also records that y = 2 is a NON-discriminating test point, since both roots equal 1 there.",
  },
  // Q11 — Mock Test 05, complex numbers
  "0cb320a4-ef23-46e3-86b5-a7aa42f25250": {
    verdict: "solution_rewritten",
    note:
      "RULE 5: the stored solution derived the argument correctly and then stated the WRONG conclusion — it reached Arg = -pi/2 and wrote 'therefore z-bar*omega = -1', when unit modulus at angle -pi/2 is -i. Worse, -1 is itself a printed option, so the solution argued a student into a different letter than the key. Key A (-i) correct and unchanged, confirmed blind.",
  },
  // Q105 — Mock Test 07, two dice
  "194358fb-56d2-4038-8297-d6636de7fcda": {
    verdict: "solution_rewritten",
    note:
      "RULE 5, mildly: the stored solution was the single line 'P((1,6) or (6,1)) = 2/36 = 1/18'. Correct and it does compute, but it asserts the favourable pairs rather than showing that a difference of 5 forces the extremes 1 and 6. Rewritten, and it now notes that the outcomes are ORDERED. Key B unchanged.",
  },
  // Q110 — NDA 2019-II, median of a discrete distribution
  "548cc682-896b-4239-aad3-abf168453c38": {
    verdict: "solution_rewritten",
    note:
      "A KNIFE-EDGE the stored solution did not own, on a row swapped IN during this review. The cumulative frequency hits EXACTLY N/2 = 120 at x = 4, so the 120th observation is 4 and the 121st is 5 and the raw-data rule would give 4.5 — not a printed option. The keyed 5 is right under the standard discrete-series convention (size of the (N+1)/2 = 120.5th item), which is precisely what the tie is testing, and x = 4 is the MODE, making it the natural distractor. Blind pass agreed with the key but flagged the tie. Key B unchanged; solution rewritten to name the convention and address the tie explicitly.",
  },
};

/** Reviewed during this run but NOT in the final paper: judged unshippable. */
const OFF_PAPER: { id: string; verdict: ReviewInput["verdict"]; note: string }[] = [
  {
    id: "38a90f9a-4baa-47b4-8aa8-44cdcb79aae8", // Q113, NDA_Maths_Mock_Test_01.docx
    verdict: "unverifiable",
    note:
      "UNANSWERABLE. The stem says 'in respect of the above frequency distribution' and asks whether the median lies in the modal class, but set_id and context are BOTH null, so the table it refers to is absent. Neither statement can be evaluated. A NEW DEFECT CLASS for the builder: RULE 1 excludes rows that HAVE a context, but has no guard against one that NEEDS a context and lost it — the exclusion is one-directional. Measured afterwards: exactly TWO PUBLIC NDA Maths rows reference absent DATA this way, so the class is rare, not systemic (a first probe counting every 'the above' matched 145 and was measuring self-contained statement lists). Unrepairable: the .docx is not on disk.",
  },
  {
    id: "f2d84cc0-3099-45fd-bd42-f1ef9748d71b", // Q166, Complex Numbers booklet
    verdict: "unverifiable",
    note:
      "TWO OPTIONS DENOTE THE SAME DIRECTION, so the row turns on a convention rather than mathematics. (1+i)^5 = 4*sqrt(2) cis(5pi/4), and the booklet prints BOTH -3pi/4 and 5pi/4, keying the latter. 'Amplitude' conventionally means the PRINCIPAL argument in (-pi, pi], which -3pi/4 satisfies and 5pi/4 does not, so a student who reduces as the definition requires is marked wrong. Source-verified: stem, all four options and the key are faithful, so the defect is the book's. No key flip repairs it either — under a loose reading of 'amplitude' as any argument, both letters are correct. Replaced rather than re-keyed, as with Mock 3's De Morgan pair.",
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
