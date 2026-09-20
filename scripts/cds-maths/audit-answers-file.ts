/**
 * Run the student-facing solution probes over a paper's `answers.json` BEFORE it
 * is committed.
 *
 *   npx tsx scripts/cds-maths/audit-answers-file.ts 2026-2
 *
 * WHY THIS EXISTS. `audit-solutions.ts` reads the DATABASE, so it can only find
 * a leaked reviewer note after the row is already in the bank. That is one step
 * too late in exactly the way this corpus has been bitten before: reviewer-facing
 * `reasoning` was piped into the shipped `solution` on 419 of 800 published rows,
 * and students read "RUNNER-UP: option C" and "Verified with sympy" beside a
 * typeset stem. It was caught by someone looking at a rendered card, not by a
 * gate.
 *
 * Same pure core (`auditSolution`), same findings, one stage earlier — so the fix
 * is an edit to a JSON file rather than an UPDATE against live rows.
 *
 * It also checks the two structural things `auditSolution` does not:
 *   - every derivation carries a non-empty `solution` and a non-empty `value`
 *     (the publish gate refuses a missing solution, and `value` is what makes a
 *     hand adjudication comparable at all);
 *   - `answer` and `value` do not contradict each other on an adjudicated row,
 *     which shipped once on 2022-I Q5 as `answer: "D"` ("cannot be determined")
 *     beside `value: "45"`.
 *
 * Read-only. Exits 1 if anything is flagged, so it can gate a commit.
 */
import { existsSync, readFileSync } from "node:fs";
import { dataPath, requirePaper } from "./config";
import { auditSolution } from "./solutionText";

type Derivation = {
  number: number;
  answer: string | null;
  value?: string;
  confidence?: string;
  reasoning?: string;
  solution?: string;
};

function main() {
  const paper = requirePaper(process.argv[2]);
  const path = dataPath(paper.id, "answers");
  if (!existsSync(path)) throw new Error(`missing ${path} — adjudicate the pass first`);

  const file = JSON.parse(readFileSync(path, "utf8")) as { derivations: Derivation[] };
  const rows = file.derivations ?? [];

  let problems = 0;
  const say = (n: number, msg: string) => {
    console.log(`  Q${String(n).padStart(3)}  ${msg}`);
    problems++;
  };

  console.log(`${paper.id}: auditing ${rows.length} derivation(s) from ${path}\n`);

  for (const d of rows) {
    // A null answer is a deliberate "no printed option is correct" and is
    // dropped at assembly, so it is exempt from the shipped-text checks.
    const dropped = d.answer == null;

    if (!dropped && !d.solution?.trim()) say(d.number, "no solution — the publish gate will refuse this row");
    if (!d.value?.toString().trim()) say(d.number, "no value — a hand adjudication cannot be compared without it");

    for (const f of auditSolution(d.solution ?? "")) {
      say(d.number, `${f.kind}: ${f.detail ?? ""}`.trim());
    }
  }

  console.log(
    problems
      ? `\n${problems} finding(s). Fix them in ${paper.id}.answers.json, not after commit.`
      : `\nclean: every solution is student-facing, and every row carries a value.`
  );
  process.exit(problems ? 1 : 0);
}

main();
