/**
 * Triage a reviews:paper dump BEFORE reading it question by question.
 *
 *   npx tsx scripts/reviews/triage-dump.ts <paperId>
 *
 * Cheap mechanical screens that narrow ~120 questions down to the handful worth
 * deriving by hand. NONE of these is a verdict — a flag means "read this one",
 * and a clean row still needs a human pass. They are the same defect shapes
 * `npm run audit:keys` looks for, applied to a paper's dump rather than a
 * source_file, plus the render/coherence checks `audit:text` contributed.
 *
 * Reuses `concludedLetter` from the practice audit so the letter-mismatch screen
 * cannot drift from the bank-wide probe.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { concludedLetter } from "../practice/audit-keys";

type Row = {
  questionId: string;
  questionNumber: string | null;
  context?: string | null;
  text: string | null;
  options: { label: string; text: string; is_correct?: boolean }[];
  solution: string | null;
};

const flagsFor = (r: Row): string[] => {
  const out: string[] = [];
  const key = r.options.find((o) => o.is_correct)?.label ?? null;
  const sol = (r.solution ?? "").trim();

  if (!sol) out.push("NO_SOLUTION");
  if (r.options.length !== 4) out.push(`OPTIONS=${r.options.length}`);
  const correct = r.options.filter((o) => o.is_correct).length;
  if (correct !== 1) out.push(`CORRECT=${correct}`);

  const texts = r.options.map((o) => (o.text ?? "").trim());
  if (new Set(texts).size !== texts.length) out.push("DUP_OPTIONS");
  if (texts.some((t) => t.length === 0)) out.push("EMPTY_OPTION");

  // EQUIVALENT-VALUE duplicates. String equality is not enough: Q761 offers
  // \dfrac{1}{3} and \dfrac{4}{12}, which are distinct strings and the same
  // number — a genuine paper defect that a text comparison cannot see. Compare
  // simple fractions and integers by value too.
  const asNumber = (t: string): number | null => {
    const s = t.replace(/\\[dt]?frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, "($1)/($2)")
      .replace(/\\[(){}$]|\s/g, "");
    const frac = s.match(/^\(?(-?\d+)\)?\/\(?(-?\d+)\)?$/);
    if (frac) return Number(frac[1]) / Number(frac[2]);
    return /^-?\d+(?:\.\d+)?$/.test(s) ? Number(s) : null;
  };
  const vals = r.options.map((o) => ({ label: o.label, v: asNumber(o.text ?? "") }));
  for (let i = 0; i < vals.length; i++) {
    for (let j = i + 1; j < vals.length; j++) {
      const a = vals[i], b = vals[j];
      if (a.v !== null && b.v !== null && Math.abs(a.v - b.v) < 1e-12) {
        out.push(`EQUIVALENT_OPTIONS_${a.label}_${b.label}`);
      }
    }
  }

  if (sol && key) {
    const c = concludedLetter(sol);
    if (c && c !== key) out.push(`SOLN_CONCLUDES_${c}_KEY_${key}`);
  }
  // Coherence: a solution that leans on a neighbour is unusable once the paper
  // samples only one of the pair (found on this very bank, NDA 2023-I Q36).
  if (/\bfrom q\.?\s*\d+/i.test(sol) || /previous (item|question)/i.test(sol)) {
    out.push("CROSS_REFERENCES_ANOTHER_Q");
  }
  // NUMERIC MISMATCH. `concludedLetter` only fires on an explicit "(D)"/"Hence D";
  // a solution that simply ends "= 5" trips nothing — which is exactly how a
  // wrong key survived on Q941 (variance of 2,4,6,8: solution derives 5, row
  // keyed 8). So: when the options are bare numbers, compare the solution's
  // LAST number against them. Flag only when it matches a DIFFERENT option —
  // a value matching nothing is usually an intermediate step, not a verdict.
  const numeric = (t: string) => {
    const m = t.trim().replace(/\\[(){}$]|\s/g, "").match(/^-?\d+(?:\.\d+)?$/);
    return m ? Number(m[0]) : null;
  };
  // Only when the solution states NO explicit letter: an explicit conclusion is
  // stronger evidence and is already screened above. Without this precedence the
  // trailing number of "...no root in [0, 2\pi]. Hence (A)." reads as "2".
  const optNums = r.options.map((o) => ({ label: o.label, n: numeric(o.text ?? "") }));
  if (sol && key && !concludedLetter(sol) && optNums.every((o) => o.n !== null)) {
    const tail = sol.match(/-?\d+(?:\.\d+)?/g);
    const last = tail ? Number(tail[tail.length - 1]) : null;
    if (last !== null) {
      const hit = optNums.find((o) => o.n === last);
      if (hit && hit.label !== key) out.push(`SOLN_VALUE_${last}_IS_${hit.label}_KEY_${key}`);
    }
  }

  if (sol && sol.length < 60) out.push("SOLUTION_VERY_SHORT");
  // Stem truncation: a stem opening lowercase usually lost its lead-in.
  if (r.text && /^[a-z]/.test(r.text.trim())) out.push("STEM_STARTS_LOWERCASE");
  return out;
};

function main() {
  const paperId = process.argv[2];
  if (!paperId) throw new Error("usage: triage-dump.ts <paperId>");
  const path = join(process.cwd(), "scripts", "reviews", "data", `paper-${paperId}.review.json`);
  const rows: Row[] = JSON.parse(readFileSync(path, "utf8"));

  // A BLIND dump withholds the solution and is_correct by design, so the
  // key/solution screens below would flag every single row. Refuse rather than
  // emit 120 false positives — noise on that scale buries the one real hit.
  const blind =
    rows.length > 0 &&
    rows.every((r) => r.solution === null) &&
    rows.every((r) => r.options.every((o) => !("is_correct" in o)));
  if (blind) {
    throw new Error(
      `${path}\n  is a BLIND dump (solution + is_correct withheld), so the key and\n` +
        `  solution screens cannot run. Re-dump without --method=blind_rederivation\n` +
        `  to triage, or use scripts/reviews/diff-blind.ts to compare a blind pass.`
    );
  }

  const flagged = rows
    .map((r) => ({ r, f: flagsFor(r) }))
    .filter((x) => x.f.length > 0);

  console.log(`\n${rows.length} rows | ${flagged.length} flagged for a close read\n`);
  for (const { r, f } of flagged) {
    console.log(`  Q${(r.questionNumber ?? "?").padEnd(5)} ${f.join(", ")}`);
  }
  const tally = new Map<string, number>();
  for (const { f } of flagged) for (const x of f) {
    const kind = x.replace(/_[A-D]_KEY_[A-D]$/, "").replace(/=\d+$/, "");
    tally.set(kind, (tally.get(kind) ?? 0) + 1);
  }
  console.log(`\nby kind:`);
  for (const [k, n] of [...tally].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(3)}  ${k}`);
  console.log(`\n(a flag means READ IT — not that it is wrong. A clean row still needs a pass.)\n`);
}

main();
