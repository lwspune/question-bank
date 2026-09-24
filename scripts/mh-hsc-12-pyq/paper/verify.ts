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
import { catalogFor } from "./catalog";
import { grammarFor } from "./lib";
import type { PaperQuestion } from "../../mh-ssc-10/lib";
// The per-STRING checker. `latexImbalances` in the stateboard lib takes committed
// rows, which this runs before there are any.
import { findLatexImbalance } from "../../practice/lib";
// The SAME normaliser commitStaged's guard uses. A hand-rolled regex for
// "backslash followed by n" flags the LaTeX commands neq, nabla and nu, all of
// which are legitimate; the normaliser masks math zones and does not.
// See apply-solutions.ts for where that mistake was actually made.
import { normalizeNewlines } from "../../../src/lib/text/normalizeNewlines";

/** Unicode maths the SOLUTION_BRIEF forbids in any output field.
 *
 *  The Physics block was added 2026-09-23 and is not decoration: a Physics stem
 *  is dense in ohms, degrees, angstroms and Greek, and the Std-XII source text
 *  layer sets Greek in a Symbol font that extracts as LATIN LETTERS. So a
 *  transcription that reaches for the unicode character is the same pass that
 *  could have copied a mis-decoded one, and `\Omega` cannot be mis-decoded.
 *
 *  Scoped to GREEK AND OPERATORS, deliberately. `°` and `Å` are NOT listed:
 *  the 364 Physics rows already in the bank write them as plain characters in
 *  prose ("4000Å", "27°C"), and forbidding them here would make every new row
 *  disagree with every shipped one for no gain — neither is mis-decodable the
 *  way a Symbol-font Greek letter is. */
const UNICODE_MATH =
  /[∧∨∼≡→↔∫∑√∞≠±×÷≤≥∈∪∩⇒⇔·−ℓ∝∮∂ΔΩΦΨΣΛΓΘΠαβγδεζηθικλμνξπρστυφχψω]/;

function check(id: string): number {
  const paper = requirePaper(id);
  const g = grammarFor(paper.subject);
  const catalog = catalogFor(paper.subject);
  const path = questionsJsonPath(id);
  if (!existsSync(path)) {
    console.log(`${id}: not transcribed yet`);
    return 0;
  }
  const qs = JSON.parse(readFileSync(path, "utf8")) as PaperQuestion[];
  const problems: string[] = [];

  // 1. refs, both directions
  const rec = g.reconcileRefs(qs.map((q) => q.ref));
  for (const r of rec.missing) problems.push(`MISSING ${r}`);
  for (const r of rec.unexpected) problems.push(`NOT ON THIS PAPER: ${JSON.stringify(r)}`);
  for (const r of rec.duplicates) problems.push(`DUPLICATE ${r}`);

  for (const q of qs) {
    const ref = g.normaliseRef(q.ref);
    if (!ref) continue; // already reported as unexpected

    // 2. format must follow from the section
    const place = g.sectionOf(ref);
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

      /**
       * THE FOUR OPTIONS MUST BE PAIRWISE DISTINCT.
       *
       * This is the direct guard for the defect that makes these papers
       * dangerous. PrimoPDF rasterised the operators, so on jun-2026 Q.1(iii)
       * the text layer gives options (c) and (d) — `Q = ΔU + W` and
       * `Q = ΔU − W` — IDENTICAL text, and Q.1(vi)'s (a)/(b)/(d) collapse three
       * ways. A transcription taken from that layer produces a well-formed MCQ
       * with a duplicate option, and NOTHING else in this pipeline would see
       * it: the ref reconciles, the format matches the section, four A-D labels
       * are present, every option is non-empty.
       *
       * A duplicate option also silently destroys the key. If the printed
       * answer is (d) and (c) now carries the same text, the blind derivation
       * has two correct options and will disagree with itself for a reason that
       * has nothing to do with the physics.
       *
       * Compared on normalised whitespace so a transcriber's spacing is not
       * mistaken for a distinction the student could see. A genuine printed
       * duplicate does occur (CDS Maths 2026-II Q.47 prints (a) and (c) both as
       * "2"), so if one ever shows up here it must be DECLARED rather than
       * silently allowed — the same rule that lane settled on.
       */
      /**
       * A question may DECLARE that the printed paper itself duplicates two
       * options, by setting `sourceDuplicateOptions: true`. Two guards keep the
       * declaration from becoming a way to wave the check through:
       *
       *  1. The declaration is REFUSED if there is no duplicate to explain, so
       *     it cannot be pasted onto a question prophylactically and then rot
       *     into a permanent exemption after the transcription is corrected.
       *  2. The KEYED option may not be one of the duplicated pair. That is the
       *     whole safety property: a duplicate among the distractors makes the
       *     item easier than intended but still answerable, whereas a duplicate
       *     that includes the key makes it unanswerable — two options are then
       *     equally correct and no student can be marked fairly.
       *
       * First fired on `chem-feb-2024` Q.1.ii, where the board printed options
       * (b) and (d) as the same "alpha-1,4-glycosidic linkage". The key there is
       * (c), so the item is still answerable and ships with the duplication
       * named in its solution.
       */
      const declared = (q as { sourceDuplicateOptions?: boolean }).sourceDuplicateOptions === true;
      const seen = new Map<string, string>();
      const dupLabels = new Set<string>();
      for (const o of q.options ?? []) {
        const key = (o.text ?? "").replace(/\s+/g, " ").trim();
        if (!key) continue;
        const prior = seen.get(key);
        if (prior) {
          dupLabels.add(prior).add(o.label);
          if (!declared) {
            problems.push(
              `${ref}: options ${prior} and ${o.label} are IDENTICAL (${JSON.stringify(key)}) — ` +
                `the text layer collapses rasterised operators, so read this question's options off the rendered page. ` +
                `If the PRINTED paper really does duplicate them, set sourceDuplicateOptions on this question`,
            );
          }
        } else {
          seen.set(key, o.label);
        }
      }
      if (declared && dupLabels.size === 0) {
        problems.push(
          `${ref}: declares sourceDuplicateOptions but its four options are all distinct — ` +
            `drop the declaration rather than leaving a standing exemption`,
        );
      }
      if (declared && q.answer && dupLabels.has(String(q.answer))) {
        problems.push(
          `${ref}: the keyed option ${q.answer} is one of the DUPLICATED pair (${[...dupLabels].sort().join(", ")}) — ` +
            `two options are then equally correct and the question is unanswerable, which no declaration can excuse`,
        );
      }
    } else if (q.options?.length) {
      problems.push(`${ref}: free-response question carries ${q.options.length} options`);
    }

    // 4. taxonomy
    try {
      g.validateChapter(q.chapter);
    } catch (e) {
      problems.push(`${ref}: ${(e as Error).message}`);
    }
    const subs = catalog.chapters[q.chapter];
    const declaredNew = (paper.newSubtopics ?? []).some(
      (n) => n.chapter === q.chapter && n.subtopic === q.subtopic,
    );
    if (subs && !subs.includes(q.subtopic) && !declaredNew) {
      problems.push(
        `${ref}: subtopic ${JSON.stringify(q.subtopic)} is off-catalog for "${q.chapter}". ` +
          `If the board examined something the textbook never did, declare it in the manifest's ` +
          `newSubtopics — do not widen this check.`,
      );
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

  // A `newSubtopics` entry is an exemption from the hard off-catalog check, so
  // it is asserted in BOTH directions. Forward-only, it would quietly outlive
  // the question that justified it, and the next transcription's typo could
  // land on a stale exemption and pass.
  for (const n of paper.newSubtopics ?? []) {
    const used = qs.some((q) => q.chapter === n.chapter && q.subtopic === n.subtopic);
    if (!used) {
      problems.push(
        `manifest declares new subtopic ${JSON.stringify(n.subtopic)} under "${n.chapter}", ` +
          `but no question on this paper uses it — remove the declaration`,
      );
    }
    if (catalog.chapters[n.chapter]?.includes(n.subtopic)) {
      problems.push(
        `manifest declares ${JSON.stringify(n.subtopic)} as new, but the catalog already carries it ` +
          `under "${n.chapter}" — it was committed; re-run gen-catalog.ts and drop the declaration`,
      );
    }
  }

  const mcqs = qs.filter((q) => q.format === "mcq").length;
  const answered = qs.filter((q) => q.answer).length;
  const solved = qs.filter((q) => q.solution).length;
  console.log(
    `${paper.id}: ${qs.length}/${g.expectedRefs.length} refs · ${mcqs} MCQ (${answered} keyed) · ${solved} with a solution`,
  );
  for (const p of problems) console.log(`   ✗ ${p}`);
  if (!problems.length) console.log(`   structure OK`);
  return problems.length;
}

const arg = process.argv[2];
if (!arg) {
  console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/verify.ts <paperId|--all|--subject=<name>>`);
  console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
  process.exit(1);
}
const subject = arg.startsWith("--subject=") ? arg.slice("--subject=".length) : null;
const ids = subject
  ? Object.values(PAPERS).filter((p) => p.subject === subject).map((p) => p.id)
  : arg === "--all"
    ? Object.keys(PAPERS)
    : [arg];
if (!ids.length) throw new Error(`no papers for ${JSON.stringify(arg)}`);
let total = 0;
for (const id of ids) total += check(id);
if (total) {
  console.error(`\n${total} problem(s).`);
  process.exit(1);
}
