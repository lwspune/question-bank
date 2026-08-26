/**
 * Apply AUTHORED solutions — for rows whose printed solution is unusable.
 *
 *   npx tsx scripts/nda-mock/apply-authored.ts m9          # dry-run
 *   npx tsx scripts/nda-mock/apply-authored.ts m9 --apply
 *
 * Reads data/<id>.authored.passA.json and .passB.json — two INDEPENDENT blind
 * derivations of the same questions, neither shown the stored answer — and
 * writes one of the two workings onto the row.
 *
 * These solutions are AUTHORED, not transcribed, and the row says so: it carries
 * `derived_model`, `derived_at` and a `pyq_note` clause. That distinction is not
 * decoration. Every other solution in this paper is the source's own working,
 * and a reader comparing a row against the printed booklet must be able to tell
 * which is which — the four rows treated here exist precisely because the
 * booklet prints a solution to a DIFFERENT question under their number.
 *
 * THREE-WAY GATE, and it refuses on any disagreement:
 *   1. the two passes must agree on the answer letter;
 *   2. that letter must equal what the bank already stores;
 *   3. the row must currently have no solution.
 *
 * (2) is the load-bearing one. If an independent derivation disagrees with the
 * stored key, the right outcome is to stop and adjudicate — not to attach a
 * confident explanation to an answer nobody re-checked. A solution that argues
 * for a wrong key is worse than no solution at all, because it makes the error
 * look considered.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requirePaper, DATA, EXAM_ID } from "./config";
import { findLatexImbalance } from "./lib";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";

type Authored = Record<string, { answer: string; solution: string }>;

const DERIVED_MODEL = "claude-opus-5 (agent)";
const NOTE =
  "Worked solution AUTHORED (not from the source): the paper prints a solution to a different question under this number. " +
  "Answer independently re-derived by two blind passes, both agreeing with the stored key.";

function load(id: string, pass: string): Authored {
  const p = join(DATA, `${id}.authored.${pass}.json`);
  if (!existsSync(p)) throw new Error(`missing ${p} — run both blind passes first`);
  return JSON.parse(readFileSync(p, "utf8")) as Authored;
}

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");

  const A = load(paper.id, "passA");
  const B = load(paper.id, "passB");

  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const numbers = [...new Set([...Object.keys(A), ...Object.keys(B)])].sort((a, b) => Number(a) - Number(b));
  const problems: string[] = [];
  const ready: { num: string; solution: string; answer: string }[] = [];

  console.log(`\n=== ${paper.label} — authored solutions ===`);

  for (const num of numbers) {
    const a = A[num];
    const b = B[num];
    if (!a || !b) {
      problems.push(`Q${num}: only one pass produced it (A=${!!a}, B=${!!b})`);
      continue;
    }
    if (a.answer !== b.answer) {
      problems.push(`Q${num}: the two passes DISAGREE — A says ${a.answer}, B says ${b.answer}. Adjudicate; do not attach either.`);
      continue;
    }

    const { data, error } = await client
      .from("questions")
      .select("id,solution,options:options(label,is_correct)")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .eq("question_number", num)
      .limit(2);
    if (error) throw new Error(error.message);
    if (data?.length !== 1) {
      problems.push(`Q${num}: matched ${data?.length ?? 0} rows — refusing to guess`);
      continue;
    }
    const row = data[0] as { id: string; solution: string | null; options: { label: string; is_correct: boolean }[] };
    const stored = row.options.find((o) => o.is_correct)?.label ?? null;

    if (stored !== a.answer) {
      problems.push(
        `Q${num}: both passes derived ${a.answer} but the BANK stores ${stored}. ` +
          `Stop and adjudicate — attaching a solution here would argue for a key nobody re-checked.`,
      );
      continue;
    }
    if (row.solution && row.solution.trim().length >= 5) {
      problems.push(`Q${num}: already has a solution — refusing to overwrite`);
      continue;
    }

    // Same text guards the merge step uses: a control character is the
    // signature of a shell-eaten backslash, and the DB rejects a literal \n.
    const sol = a.solution.trim();
    // eslint-disable-next-line no-control-regex
    if (/[\u0000-\u0009\u000b\u000c\u000e-\u001f]/.test(sol)) {
      problems.push(`Q${num}: control character in the solution text`);
      continue;
    }
    if (normalizeNewlines(sol) !== sol) {
      problems.push(`Q${num}: literal two-character \\n in the solution text`);
      continue;
    }
    const imbalance = findLatexImbalance(sol);
    if (imbalance) {
      problems.push(`Q${num}: ${imbalance}`);
      continue;
    }
    if (/\boption\s*\(?[A-Da-d]\)?\b/.test(sol)) {
      problems.push(`Q${num}: the solution names an option by LETTER — state the value instead, or audit:keys will flag it`);
      continue;
    }

    ready.push({ num, solution: sol, answer: a.answer });
    console.log(`  Q${num}: both passes -> ${a.answer}, bank stores ${stored}  OK (${sol.length} chars)`);
  }

  if (problems.length) {
    console.log(`\nREFUSING — ${problems.length} problem(s):`);
    for (const p of problems) console.log("  " + p);
    process.exitCode = 1;
    return;
  }

  if (!apply) {
    console.log(`\n[dry-run] ${ready.length} row(s) would be updated. Pass --apply to write.`);
    return;
  }

  const now = new Date().toISOString();
  for (const r of ready) {
    const { error } = await client
      .from("questions")
      .update({ solution: r.solution, derived_model: DERIVED_MODEL, derived_at: now, pyq_note: NOTE })
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .eq("question_number", r.num);
    if (error) throw new Error(error.message);
    console.log(`  Q${r.num}: written`);
  }
  console.log(`\nupdated ${ready.length} row(s), stamped derived_model + derived_at + pyq_note.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
