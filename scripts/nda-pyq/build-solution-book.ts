/**
 * Build the four-series answer key + solution book for one NDA paper.
 *
 *   npx tsx scripts/nda-pyq/build-solution-book.ts 2026-2
 *   npx tsx scripts/nda-pyq/build-solution-book.ts 2026-2 --out=<dir>
 *
 * Output (default `generated-papers/`, gitignored + regenerable):
 *   NDA_<paper>_Maths_Solution_Key_All_Sets.docx
 *
 * ## Where each piece of the document comes from
 *
 * The four series are the SAME 120 questions in a different printed order. Only
 * series A was transcribed to publication quality; B, C and D were transcribed
 * only well enough to be IDENTIFIED (see VARIANT_BRIEF.md), so their text is
 * terse by design and must never reach a printed page.
 *
 * So every series prints series A's stem, options and solution, and takes from
 * its own map only the two things that are genuinely per-series: the question
 * NUMBER and the option LABELLING. `match-variant.ts` has already established
 * both, bijectively and with a coverage check in both directions.
 *
 * ## The one hazard this script guards
 *
 * A solution that names an option by LETTER ("...so the answer is (b)") is only
 * true for a series whose options sit in series A's order. Measured on 2026-2
 * every series is `0 PERMUTED`, so no letter can disagree — but that is a
 * property of THIS paper, not a law, and a future paper that reshuffles options
 * would silently print a solution contradicting its own answer line. The script
 * therefore refuses to build if a permuted question's solution names a letter.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildSolutionBook, type SolutionBookSeries } from "@/lib/export/docxBuilder";
import { DATA, QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";
import { normalizeQuestions, type Derivation, type TQ } from "./lib";

const LABELS = ["A", "B", "C", "D"] as const;

type MapRow = {
  number: number;
  base: number;
  answer: string;
  labels: Record<string, string>;
  permuted: boolean;
};

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

/** Does this solution point at an option by LETTER? */
function namesALetter(solution: string): boolean {
  return /\b(?:option|choice|alternative)\s*\(?[A-Da-d]\)?\b/.test(solution);
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const outDir = arg("out") ?? join(process.cwd(), "generated-papers");

  const base: TQ[] = normalizeQuestions(
    JSON.parse(readFileSync(dataPath(paper.id, "questions"), "utf8"))
  );
  const byNumber = new Map(base.map((q) => [q.number, q]));
  const answers = JSON.parse(readFileSync(dataPath(paper.id, "answers"), "utf8")) as {
    derivations: Derivation[];
  };
  const derivation = new Map(answers.derivations.map((d) => [d.number, d]));

  if (base.length !== QUESTIONS_PER_PAPER) {
    throw new Error(`base paper has ${base.length} questions, expected ${QUESTIONS_PER_PAPER}`);
  }

  const baseSeries = paper.series ?? "A";
  const seriesList: SolutionBookSeries[] = [];
  const problems: string[] = [];

  // --- Series A: the reference. Numbering and labelling are the identity.
  seriesList.push({
    series: baseSeries,
    questions: base.map((q) => {
      const d = derivation.get(q.number);
      if (!d?.answer) problems.push(`A-Q${q.number}: no derived answer`);
      return {
        number: q.number,
        context: q.context ?? null,
        stem: q.stem,
        options: q.options.map((o) => ({ label: o.label, text: o.text })),
        answer: (d?.answer ?? "?").toUpperCase(),
        solution: d?.solution ?? null,
      };
    }),
  });

  // --- Sibling series, from their committed maps.
  for (const series of ["B", "C", "D"]) {
    const p = `${DATA}/${paper.id}-${series}.map.json`;
    if (!existsSync(p)) {
      problems.push(`series ${series}: no map at ${p} — run match-variant.ts --apply first`);
      continue;
    }
    const file = JSON.parse(readFileSync(p, "utf8"));
    const rows: MapRow[] = Array.isArray(file) ? file : file.rows;
    if (!rows?.length) {
      problems.push(`series ${series}: map has no rows`);
      continue;
    }
    // Both directions, so a map that is short OR doubled up cannot slip past.
    const nums = rows.map((r) => r.number).sort((a, b) => a - b);
    const bases = rows.map((r) => r.base).sort((a, b) => a - b);
    const want = Array.from({ length: QUESTIONS_PER_PAPER }, (_, i) => i + 1);
    if (JSON.stringify(nums) !== JSON.stringify(want)) {
      problems.push(`series ${series}: question numbers are not exactly 1..${QUESTIONS_PER_PAPER}`);
    }
    if (JSON.stringify(bases) !== JSON.stringify(want)) {
      problems.push(`series ${series}: base numbers are not a bijection onto 1..${QUESTIONS_PER_PAPER}`);
    }

    const questions = rows
      .slice()
      .sort((a, b) => a.number - b.number)
      .map((r) => {
        const q = byNumber.get(r.base);
        if (!q) {
          problems.push(`${series}-Q${r.number}: base question ${r.base} not found`);
          return null;
        }
        const d = derivation.get(r.base);
        const baseText = new Map(q.options.map((o) => [o.label, o.text]));
        // Relabel: THIS series' label L carries the text of base label labels[L].
        const options = LABELS.map((L) => {
          const from = r.labels[L];
          const text = baseText.get(from);
          if (!text) problems.push(`${series}-Q${r.number}: label ${L} maps to missing base option ${from}`);
          return { label: L, text: text ?? "" };
        });
        // The answer must be the label carrying the base's CORRECT option text.
        const expected = LABELS.find((L) => r.labels[L] === (d?.answer ?? "").toUpperCase());
        if (expected && expected !== r.answer.toUpperCase()) {
          problems.push(
            `${series}-Q${r.number}: map says answer ${r.answer} but label ${expected} carries base answer ${d?.answer}`
          );
        }
        if (r.permuted && d?.solution && namesALetter(d.solution)) {
          problems.push(
            `${series}-Q${r.number}: options are PERMUTED and the solution names an option by letter — ` +
              `it would contradict the answer line. Reword the base solution to name the option's VALUE.`
          );
        }
        return {
          number: r.number,
          baseNumber: r.base,
          context: q.context ?? null,
          stem: q.stem,
          options,
          answer: r.answer.toUpperCase(),
          solution: d?.solution ?? null,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    seriesList.push({ series, questions });
  }

  if (problems.length) {
    console.log(`\nREFUSING TO BUILD (${problems.length}):`);
    for (const p of problems) console.log(`  ${p}`);
    process.exit(1);
  }

  const title = `${paper.pyqNote} ${paper.pyqYear} — Mathematics (Paper I)`;
  const subtitle = `Answer Keys and Solutions — Series ${seriesList.map((s) => s.series).join(", ")}`;
  const note =
    `All four series carry the same ${QUESTIONS_PER_PAPER} questions in a different printed order. ` +
    `Each series' key and solutions are given in ITS OWN question numbering, so a student can follow ` +
    `the booklet they sat. Answers for Series ${seriesList
      .slice(1)
      .map((s) => s.series)
      .join(", ")} are derived from Series ${baseSeries} by matching each question's option TEXT, ` +
    `not by assuming a block pattern.`;

  mkdirSync(outDir, { recursive: true });
  const file = join(outDir, `NDA_${paper.id.replace(/-/g, "_")}_Maths_Solution_Key_All_Sets.docx`);

  buildSolutionBook({ title, subtitle, note, series: seriesList, baseSeriesLabel: baseSeries })
    .then((buf) => {
      writeFileSync(file, buf);
      console.log(`wrote ${file}  (${(buf.length / 1024 / 1024).toFixed(2)} MB)`);
      for (const s of seriesList) {
        const withSol = s.questions.filter((q) => q.solution).length;
        console.log(`  Series ${s.series}: ${s.questions.length} questions, ${withSol} with a solution`);
      }
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

main();
