/**
 * Corrections to MHT-CET Maths adjudicated against the ORIGINAL source papers.
 *
 *   npx tsx scripts/books/apply-source-fixes.ts            # dry run (default)
 *   npx tsx scripts/books/apply-source-fixes.ts --apply
 *
 * HOW THESE WERE FOUND. Building the MHT-CET Maths book meant grouping repeated
 * stems, and three papers turn out to have been uploaded twice and typed
 * independently. Where the two typings DISAGREE about the answer, one of them is
 * simply wrong — and because both copies are the same paper, the printed source
 * settles it outright. That is the whole mechanism: a defect invisible in a
 * single copy becomes loud when the same paper exists twice.
 *
 * EVERY ENTRY WAS ADJUDICATED AGAINST THE PRINTED PAPER, never against the other
 * copy and never against a probe. The source booklets and their worked answer
 * keys live under C:/tmp/PYQPs/MHT-CET/<year>/; each fix below cites the paper,
 * the question number and the key's own conclusion, and each was ALSO re-derived
 * by hand so a defect in the published key could not be inherited.
 *
 * THE KEEPER IS NOT ALWAYS THE RIGHT COPY. Four defects sit in the redundant
 * copy and two sit in the copy the book will PRINT, so "trust the primary
 * upload" would have shipped two wrong answers into the book.
 *
 * `content_hash` IS DELIBERATELY LEFT UNTOUCHED — do not "fix" the mismatch.
 * Dedup is `(org_id, exam_id, content_hash)` over the pre-edit text, so
 * recomputing it would make a re-upload of the ORIGINAL, still-defective
 * spreadsheet hash differently and INSERT A DUPLICATE of the row we just
 * repaired. Leaving it means such a re-upload still dedups and skips. Same call
 * the 2026-09-02 statement-layout repair made, for the same reason. The cost is
 * that `question_reviews.reviewed_content_hash` will not mark these reviews
 * stale after the edit; accepted, and recorded here rather than left to be
 * discovered.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN_LABEL = "books:mht-cet-maths-source-adjudication:2026-09-06";

/** Make this option the correct one; every other option becomes incorrect. */
type KeyFix = { kind: "key"; from: string; to: string };
/** Replace one option's text, asserting exactly what is there now. */
type OptionFix = { kind: "option"; label: string; from: string; to: string };
/** Replace the stem, asserting exactly what is there now. */
type StemFix = { kind: "stem"; from: string; to: string };

type Fix = {
  questionId: string;
  /** Which upload the row came from — the two copies of one paper differ. */
  sourceFile: string;
  /** The printed paper this was adjudicated against, and the question number. */
  source: string;
  /** What the source proves, in one line. Becomes the review note. */
  finding: string;
  changes: (KeyFix | OptionFix | StemFix)[];
};

const FIXES: Fix[] = [
  // ── 2025, 19 April Shift II ───────────────────────────────────────────────
  // All three sit in MHT_CET_2025_PCM.xlsx, the duplicate upload. The primary
  // is the curated scripts/mhtcet .docx pipeline, whose answers were derived and
  // verified at ingest — and it is right in all three.
  {
    questionId: "93ded69e-0736-4e1c-a968-334df4e7fc3d",
    sourceFile: "MHT_CET_2025_PCM.xlsx",
    source: "19th april shift II_AK.docx, Q150",
    finding:
      "The key derives m = 16 and marks (b). Re-derived independently: orthogonality " +
      "gives x^2 = my^2/2, and substituting into both curves gives 4/(m-8) = 8/m, so m = 16.",
    changes: [{ kind: "key", from: "D", to: "B" }],
  },
  {
    questionId: "8c9a7b7d-98f3-46e1-981e-e5b4bb34b809",
    sourceFile: "MHT_CET_2025_PCM.xlsx",
    source: "19th april shift II_AK.docx, Q130",
    finding:
      "The key derives 2x + y - 3 = 0 and marks (a). Re-derived: the family " +
      "(1+3L)x + (1+4L)y + (1+5L)z - (1+2L) = 0 is perpendicular to the XY plane when " +
      "the z coefficient vanishes, so L = -1/5, giving 2x + y - 3 = 0.",
    changes: [{ kind: "key", from: "B", to: "A" }],
  },
  {
    questionId: "2d2004b5-ee16-4c36-bbd4-b13bd4efb4a5",
    sourceFile: "MHT_CET_2025_PCM.xlsx",
    source: "19th april shift II_AK.docx, Q105",
    finding:
      "The key derives AG:GP = 7:5 and marks (c). Re-derived with A(0,0), B(1,0), C(0,1): " +
      "P = (4/7, 3/7), Q = (0, 3/8), the lines meet at t = 7/12, so AG:GP = 7:5.",
    changes: [{ kind: "key", from: "B", to: "C" }],
  },

  // ── 2023, 16 May Shift 2 ──────────────────────────────────────────────────
  {
    questionId: "19716c4e-5884-4c90-a849-88bdcf0c2456",
    sourceFile: "MHT_CET_2023_Analysis.xlsx",
    source: "16 may shift 2 (ans).docx, Q103",
    finding:
      "The key lists corner points O(0,0), A(6,0), B(6,4), C(3,7), D(0,5) for z = 4x + 3y; " +
      "the maximum is 36 at B(6,4). Checked every corner: 0, 24, 36, 33, 15.",
    changes: [{ kind: "key", from: "A", to: "B" }],
  },
  {
    // TWO defects on one row: a corrupted stem AND a wrong key. The stem
    // corruption is in BOTH copies of this paper; the wrong key only in this one.
    questionId: "60ccc8ba-2c4f-45be-8da9-7c0b6f1060c0",
    sourceFile: "MHT_CET_2023_Analysis.xlsx",
    source: "16 may shift 2 (ques).docx, Q109",
    finding:
      "The paper prints l(AB) = sqrt(23), not 2 sqrt(3). With a=3, b=4, c^2=23 the " +
      "cotangent ratio is (30+2)/16 = 2, option (b). As stored (c^2=12) it evaluates to " +
      "6.4, which matches NO printed option, so the question was unanswerable.",
    changes: [
      {
        kind: "stem",
        from: String.raw`In a triangle ABC, \(l(AB) = 2\sqrt{3}\) units, \(l(BC) = 3\) units, \(l(CA) = 4\) units, then \(\frac{\cot A + \cot C}{\cot B}\) is`,
        to: String.raw`In a triangle ABC, \(l(AB) = \sqrt{23}\) units, \(l(BC) = 3\) units, \(l(CA) = 4\) units, then \(\frac{\cot A + \cot C}{\cot B}\) is`,
      },
      { kind: "key", from: "C", to: "B" },
    ],
  },
  {
    // The same corrupted stem in the other copy. Its key is already correct.
    questionId: "8c37f60f-1204-4534-bfe0-e10f8c900b3c",
    sourceFile: "MHT_CET_16thMay2023_Shift2_QuestionBank.xlsx",
    source: "16 may shift 2 (ques).docx, Q109",
    finding:
      "Same stem corruption as the other copy of this paper: the paper prints " +
      "l(AB) = sqrt(23). The stored key (b) 2 is correct once the stem is right.",
    changes: [
      {
        kind: "stem",
        from: String.raw`In a triangle ABC, \(l(AB) = 2\sqrt{3}\) units, \(l(BC) = 3\) units, \(l(CA) = 4\) units, then \(\frac{\cot A + \cot C}{\cot B}\) is`,
        to: String.raw`In a triangle ABC, \(l(AB) = \sqrt{23}\) units, \(l(BC) = 3\) units, \(l(CA) = 4\) units, then \(\frac{\cot A + \cot C}{\cot B}\) is`,
      },
    ],
  },
  {
    // A KEEPER defect — this copy is the one the book prints. All four options
    // were transcribed with log_e x where the paper prints log(e/x), so the
    // marked answer is a different function from the one the paper offers.
    questionId: "346a8a80-5a74-4436-90c0-cd771f1aae8d",
    sourceFile: "MHT_CET_16thMay2023_Shift2_QuestionBank.xlsx",
    source: "16 may shift 2 (ques).docx Q106 + (ans).docx",
    finding:
      "The paper's four options are all log(e/x), not log_e x. Solved independently: " +
      "y = vx gives sec^2 v dv = -dx/x, so tan(y/x) = 1 - log x = log(e/x), i.e. " +
      "y = x tan^-1(log(e/x)) — option (c). The key's own line reads tan(y/x) = -log x + 1.",
    changes: [
      {
        kind: "option",
        label: "A",
        from: String.raw`\(y = \tan^{-1}(\log_e x)\)`,
        to: String.raw`\(y = \tan^{-1}\left(\log\frac{e}{x}\right)\)`,
      },
      {
        kind: "option",
        label: "B",
        from: String.raw`\(y = x^2\tan^{-1}(\log_e x)\)`,
        to: String.raw`\(y = x^2\tan^{-1}\left(\log\frac{e}{x}\right)\)`,
      },
      {
        kind: "option",
        label: "C",
        from: String.raw`\(y = x\tan^{-1}(\log_e x)\)`,
        to: String.raw`\(y = x\tan^{-1}\left(\log\frac{e}{x}\right)\)`,
      },
      {
        kind: "option",
        label: "D",
        from: String.raw`\(y = \frac{1}{x}\tan^{-1}(\log_e x)\)`,
        to: String.raw`\(y = \frac{1}{x}\tan^{-1}\left(\log\frac{e}{x}\right)\)`,
      },
    ],
  },

  // ── 2024, 12 May Shift 2 ──────────────────────────────────────────────────
  {
    // A second KEEPER defect, and self-refuting: the marked answer is 17/9,
    // which exceeds 1 and so cannot be a cosine. Every option also carries a
    // stray `\\` that renders as a line break inside the inline math zone.
    questionId: "da03749e-8cbe-42fa-ac56-5a500765ab95",
    sourceFile: "MHT_CET_12thMay2024_Shift2_QuestionBank.xlsx",
    source: "12 May shift 2 (ques).docx Q141 + (ans).docx",
    finding:
      "The paper prints option (c) as sqrt(17)/9; the stored 17/9 exceeds 1 and cannot be " +
      "a cosine. Re-derived: |AB| = 15, |AD| = 3, AB.AD = 40, so cos t = 8/9 and " +
      "cos a = sin t = sqrt(17)/9. The key concludes cos a = sqrt(17)/9, option (c). " +
      "The leading double backslash is stripped from all four options.",
    changes: [
      {
        kind: "option",
        label: "A",
        from: String.raw`\(\\\frac{8}{9}\)`,
        to: String.raw`\(\frac{8}{9}\)`,
      },
      {
        kind: "option",
        label: "B",
        from: String.raw`\(\\\frac{1}{9}\)`,
        to: String.raw`\(\frac{1}{9}\)`,
      },
      {
        kind: "option",
        label: "C",
        from: String.raw`\(\\\frac{17}{9}\)`,
        to: String.raw`\(\frac{\sqrt{17}}{9}\)`,
      },
      {
        kind: "option",
        label: "D",
        from: String.raw`\(\\\frac{\sqrt{45}}{9}\)`,
        to: String.raw`\(\frac{\sqrt{45}}{9}\)`,
      },
    ],
  },
];

type Row = {
  id: string;
  text: string;
  source_file: string | null;
  content_hash: string;
  options: { id: string; label: string; text: string; is_correct: boolean }[];
};

const problems: string[] = [];
const planned: string[] = [];

/**
 * Decide what to do with one change: apply it, skip it as already done, or
 * refuse. An ALREADY-APPLIED fix is a skip rather than a failure, so a re-run is
 * a no-op; anything else refuses, so a row that drifted underneath us is never
 * silently overwritten.
 */
function classify(
  label: string,
  current: string | null,
  from: string,
  to: string
): "apply" | "done" | "refuse" {
  if (current === to) {
    planned.push(`    = ${label} already correct`);
    return "done";
  }
  if (current !== from) {
    problems.push(
      `${label}: expected\n      ${JSON.stringify(from)}\n    but found\n      ${JSON.stringify(current)}`
    );
    return "refuse";
  }
  planned.push(`    ~ ${label}\n        ${JSON.stringify(from)}\n     -> ${JSON.stringify(to)}`);
  return "apply";
}

async function main() {
  const client: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data, error } = await client
    .from("questions")
    .select("id, text, source_file, content_hash, options(id, label, text, is_correct)")
    .in("id", FIXES.map((f) => f.questionId));
  if (error) throw new Error(`read failed - ${error.message}`);
  const byId = new Map((data as unknown as Row[]).map((r) => [r.id, r]));

  type Write =
    | { table: "questions"; id: string; patch: Record<string, unknown> }
    | { table: "options"; id: string; patch: Record<string, unknown> }
    | { table: "key"; questionId: string; to: string };
  const writes: Write[] = [];
  const reviewed: { fix: Fix; verdicts: Set<string> }[] = [];

  for (const fix of FIXES) {
    const row = byId.get(fix.questionId);
    planned.push(`\n  ${fix.questionId}  [${fix.sourceFile}]\n    source: ${fix.source}`);
    if (!row) {
      problems.push(`${fix.questionId}: not found`);
      continue;
    }
    // The row must still be the copy that was adjudicated. Two copies of one
    // paper differ ONLY by upload, so applying a fix to the wrong one is exactly
    // the mistake this guard exists to prevent.
    if (row.source_file !== fix.sourceFile) {
      problems.push(
        `${fix.questionId}: expected source_file ${fix.sourceFile}, found ${row.source_file}`
      );
      continue;
    }

    const verdicts = new Set<string>();
    for (const ch of fix.changes) {
      if (ch.kind === "stem") {
        const verdict = classify("stem", row.text, ch.from, ch.to);
        if (verdict === "apply") {
          writes.push({ table: "questions", id: row.id, patch: { text: ch.to } });
          verdicts.add("stem_fixed");
        }
      } else if (ch.kind === "option") {
        const opt = row.options.find((o) => o.label === ch.label);
        const verdict = classify(`option ${ch.label}`, opt?.text ?? null, ch.from, ch.to);
        if (verdict === "apply" && opt) {
          writes.push({ table: "options", id: opt.id, patch: { text: ch.to } });
          verdicts.add("stem_fixed");
        }
      } else {
        const current = row.options.find((o) => o.is_correct)?.label ?? null;
        const verdict = classify("key", current, ch.from, ch.to);
        if (verdict === "apply") {
          writes.push({ table: "key", questionId: row.id, to: ch.to });
          verdicts.add("key_fixed");
        }
      }
    }
    if (verdicts.size) reviewed.push({ fix, verdicts });
  }

  console.log(`\nMHT-CET Maths - corrections adjudicated against the source papers`);
  console.log("-".repeat(72));
  console.log(planned.join("\n"));

  if (problems.length) {
    console.error(`\n${"!".repeat(72)}\nREFUSED - ${problems.length} assertion(s) failed:\n`);
    for (const p of problems) console.error(`  ${p}`);
    console.error(
      `\nNothing was written. Every fix asserts the exact text it replaces, so a\n` +
        `mismatch means the row changed since it was adjudicated - re-check it\n` +
        `against the source paper rather than loosening the assertion.\n`
    );
    process.exit(1);
  }

  console.log(`\n${"-".repeat(72)}`);
  console.log(`  ${writes.length} write(s) across ${reviewed.length} question(s)`);
  if (!APPLY) {
    console.log("  DRY RUN - pass --apply to write.\n");
    return;
  }

  for (const w of writes) {
    if (w.table === "key") {
      // Clear then set, so the row can never momentarily have two correct
      // options or none that a concurrent read could observe as valid.
      const { error: e1 } = await client
        .from("options")
        .update({ is_correct: false })
        .eq("question_id", w.questionId);
      if (e1) throw new Error(`key clear failed - ${e1.message}`);
      const { error: e2 } = await client
        .from("options")
        .update({ is_correct: true })
        .eq("question_id", w.questionId)
        .eq("label", w.to);
      if (e2) throw new Error(`key set failed - ${e2.message}`);
    } else {
      const { error: e } = await client.from(w.table).update(w.patch).eq("id", w.id);
      if (e) throw new Error(`${w.table} update failed - ${e.message}`);
    }
  }

  // Provenance LAST, so a review row can never claim a fix that did not land.
  const rows = reviewed.flatMap(({ fix, verdicts }) =>
    [...verdicts].map((verdict) => ({
      question_id: fix.questionId,
      run_label: RUN_LABEL,
      method: "source_key_crosscheck",
      verdict,
      reviewed_content_hash: byId.get(fix.questionId)!.content_hash,
      source: "live",
      note: `${fix.source} - ${fix.finding}`.slice(0, 2000),
    }))
  );
  const { error: revErr } = await client
    .from("question_reviews")
    .upsert(rows, { onConflict: "question_id,run_label,reviewed_content_hash", ignoreDuplicates: true });
  if (revErr) throw new Error(`question_reviews insert failed - ${revErr.message}`);

  console.log(`  APPLIED. ${rows.length} review row(s) recorded under "${RUN_LABEL}".\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
