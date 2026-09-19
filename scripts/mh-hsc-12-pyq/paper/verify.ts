/**
 * Check a transcription against the printed paper's STRUCTURE, before anything
 * is derived from it.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/verify.ts <paperId|--all>
 *
 * This is deliberately structural, not semantic — it cannot tell you a stem was
 * mis-copied (that is what the solving passes are for). What it CAN do is catch
 * every way a 44-item transcription silently stops being the paper:
 *
 *  - a ref missing, duplicated, or not on the paper at all (reconciled BOTH
 *    ways, because a count passes all three)
 *  - a question whose FORMAT disagrees with its section: Q.1's sub-items are
 *    MCQs and everything else is free-response, and that follows from the ref
 *    alone, so a transcription claiming otherwise is wrong about the paper
 *  - an MCQ without exactly four A-D options
 *  - a chapter outside the 15, or a subtopic outside its chapter's catalog
 *  - unicode maths where the brief requires LaTeX, and unbalanced \( \)
 *  - a figure ref with no `hasFigure`, or vice versa
 */
import { readFileSync, existsSync } from "node:fs";
import { PAPERS, requirePaper, questionsJsonPath } from "./config";
import { HSC_MATHS_CATALOG } from "./catalog";
import { EXPECTED_REFS, normaliseRef, sectionOf, reconcileRefs, validateChapter } from "./lib";
import type { PaperQuestion } from "../../mh-ssc-10/lib";
// The per-STRING checker. `latexImbalances` in the stateboard lib takes committed
// rows, which this runs before there are any.
import { findLatexImbalance } from "../../practice/lib";
// The SAME normaliser commitStaged's guard uses. A hand-rolled regex for
// "backslash followed by n" flags the LaTeX commands neq, nabla and nu, all of
// which are legitimate; the normaliser masks math zones and does not.
// See apply-solutions.ts for where that mistake was actually made.
import { normalizeNewlines } from "../../../src/lib/text/normalizeNewlines";

/** Unicode maths the SOLUTION_BRIEF forbids in any output field. */
const UNICODE_MATH = /[∧∨∼≡→↔∫∑√∞≠±×÷≤≥αβγθπλμΔ∈∪∩⇒⇔·−]/;

function check(id: string): number {
  const paper = requirePaper(id);
  const path = questionsJsonPath(id);
  if (!existsSync(path)) {
    console.log(`${id}: not transcribed yet`);
    return 0;
  }
  const qs = JSON.parse(readFileSync(path, "utf8")) as PaperQuestion[];
  const problems: string[] = [];

  // 1. refs, both directions
  const rec = reconcileRefs(qs.map((q) => q.ref));
  for (const r of rec.missing) problems.push(`MISSING ${r}`);
  for (const r of rec.unexpected) problems.push(`NOT ON THIS PAPER: ${JSON.stringify(r)}`);
  for (const r of rec.duplicates) problems.push(`DUPLICATE ${r}`);

  for (const q of qs) {
    const ref = normaliseRef(q.ref);
    if (!ref) continue; // already reported as unexpected

    // 2. format must follow from the section
    const place = sectionOf(ref);
    if (q.format !== place.format) {
      problems.push(`${ref}: section ${place.section} is ${place.format}, transcription says ${q.format}`);
    }

    // 3. options
    if (q.format === "mcq") {
      const labels = (q.options ?? []).map((o) => o.label).join(",");
      if (labels !== "A,B,C,D") problems.push(`${ref}: MCQ options are [${labels}], expected A,B,C,D`);
      for (const o of q.options ?? []) {
        if (!o.text?.trim()) problems.push(`${ref}: option ${o.label} is empty`);
      }
    } else if (q.options?.length) {
      problems.push(`${ref}: free-response question carries ${q.options.length} options`);
    }

    // 4. taxonomy
    try {
      validateChapter(q.chapter);
    } catch (e) {
      problems.push(`${ref}: ${(e as Error).message}`);
    }
    const subs = HSC_MATHS_CATALOG.chapters[q.chapter];
    if (subs && !subs.includes(q.subtopic)) {
      problems.push(`${ref}: subtopic ${JSON.stringify(q.subtopic)} is off-catalog for "${q.chapter}"`);
    }

    // 5. text hygiene
    const fields: [string, string | undefined][] = [
      ["stem", q.stem],
      ["context", q.context],
      ["solution", q.solution],
      ...(q.options ?? []).map((o) => [`option ${o.label}`, o.text] as [string, string]),
    ];
    for (const [name, value] of fields) {
      if (!value) continue;
      const u = value.match(UNICODE_MATH);
      if (u) problems.push(`${ref}: ${name} carries unicode maths ${JSON.stringify(u[0])} — use a LaTeX command`);
      const imbalance = findLatexImbalance(value);
      if (imbalance) problems.push(`${ref}: ${name} ${imbalance}`);
      if (normalizeNewlines(value) !== value) {
        problems.push(`${ref}: ${name} carries a LITERAL backslash-n outside a math zone`);
      }
    }

    // 6. figures
    const shouldHaveFigure = paper.figureRefs.includes(ref);
    if (shouldHaveFigure && !q.hasFigure) problems.push(`${ref}: manifest says this question prints a figure, transcription does not set hasFigure`);
    if (!shouldHaveFigure && q.hasFigure) problems.push(`${ref}: hasFigure set, but the manifest lists no figure at this ref`);
  }

  const mcqs = qs.filter((q) => q.format === "mcq").length;
  const answered = qs.filter((q) => q.answer).length;
  const solved = qs.filter((q) => q.solution).length;
  console.log(
    `${paper.id}: ${qs.length}/${EXPECTED_REFS.length} refs · ${mcqs} MCQ (${answered} keyed) · ${solved} with a solution`,
  );
  for (const p of problems) console.log(`   ✗ ${p}`);
  if (!problems.length) console.log(`   structure OK`);
  return problems.length;
}

const arg = process.argv[2];
if (!arg) {
  console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/verify.ts <paperId|--all>`);
  console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
  process.exit(1);
}
let total = 0;
for (const id of arg === "--all" ? Object.keys(PAPERS) : [arg]) total += check(id);
if (total) {
  console.error(`\n${total} problem(s).`);
  process.exit(1);
}
