/**
 * Build the multi-series answer key + solution book for one NDA GAT paper.
 *
 *   npx tsx scripts/nda-gat/build-solution-book.ts 2026-2
 *   npx tsx scripts/nda-gat/build-solution-book.ts 2026-2 --out=<dir>
 *
 * Output (default `generated-papers/`, gitignored + regenerable):
 *   NDA_<paper>_GAT_Solution_Key_All_Sets.docx
 *
 * ## Where each piece of the document comes from
 *
 * The four series are the SAME 150 questions in a different printed order. Only
 * the base series was transcribed to publication quality; the siblings were
 * transcribed only well enough to be IDENTIFIED (see FIDELITY_BRIEF.md), so
 * their text is TERSE BY DESIGN and must never reach a printed page.
 *
 * So every series prints the BASE series' stem, context, options and solution,
 * and takes from its own map only the two things that are genuinely per-series:
 * the question NUMBER and the option LABELLING. `match-variant.ts` has already
 * established both, bijectively and with a coverage check in both directions.
 *
 * ## This is NOT a copy of the sibling Maths builder — the map shape differs
 *
 * `scripts/nda-pyq` writes map rows of `{ number, base, answer, labels,
 * permuted }`. This pipeline's `match-variant.ts` writes
 * `{ variant, base, score, optionScore, labels, verdict }` plus a SEPARATE
 * top-level `key: [{ number, answer }]` that it derived itself. Copying the
 * Maths reader would therefore read `undefined` for every question number and
 * every answer — and `undefined` sorts and prints without erroring, so the
 * failure would be a silently mis-numbered book rather than a crash.
 *
 * Being handed a precomputed `key` is a gift and also a temptation. It is NOT
 * trusted: for every question this script re-derives the answer from `labels`
 * plus the base's own derived answer, and REFUSES if the two disagree. Two
 * independent computations of the same fact that agree are evidence; one
 * computation read twice is not.
 *
 * ## The hazard this script guards
 *
 * A solution that names an option by LETTER ("...so the answer is (b)") is only
 * true for a series whose options sit in the base series' order. Measured on
 * 2026-2 Set D every question is `MATCH` with an identity label map, so no
 * letter can disagree — but that is a property of THIS paper, not a law, and a
 * future paper that reshuffles options would silently print a solution
 * contradicting its own answer line. The script therefore refuses to build if a
 * PERMUTED question's solution names a letter.
 *
 * ## The sibling list is DERIVED from config, never hard-coded
 *
 * `paper.variants` is the source of truth. A paper with only one sibling in hand
 * builds a two-series book; hard-coding `["B", "C", "D"]` would instead report
 * two spurious "no map" failures and refuse to build at all.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildSolutionBook, type SolutionBookSeries } from "@/lib/export/docxBuilder";
import { DATA, QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";
import { normalizeQuestions, type Derivation, type GatTQ } from "./lib";

const LABELS = ["A", "B", "C", "D"] as const;

/** A row of `data/<id>-<S>.map.json` as THIS pipeline's match-variant writes it. */
type MapRow = {
  variant: number;
  base: number;
  labels: Record<string, string>;
  verdict: string;
};

type MapFile = {
  rows: MapRow[];
  key?: { number: number; answer: string }[];
  summary?: Record<string, unknown>;
};

function arg(name: string): string | undefined {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
}

/**
 * Does this solution point at an option by LETTER?
 *
 * Deliberately narrow: it must be a letter introduced by option/choice/
 * alternative. A bare capital A-D is ordinary English in a GAT solution — Part A
 * itself is called "Part A", statement lists are labelled, and options are
 * routinely named by their VALUE ("...so Preposition is correct"). Matching a
 * bare letter would fire on most of the paper and the guard would be ignored.
 */
function namesALetter(solution: string): boolean {
  return /\b(?:option|choice|alternative)\s*\(?[A-Da-d]\)?\b/.test(solution);
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const outDir = arg("out") ?? join(process.cwd(), "generated-papers");

  const base = normalizeQuestions(
    JSON.parse(readFileSync(dataPath(paper.id, "questions"), "utf8"))
  ) as GatTQ[];
  const byNumber = new Map(base.map((q) => [q.number, q]));
  const answers = JSON.parse(readFileSync(dataPath(paper.id, "answers"), "utf8")) as {
    derivations: Derivation[];
  };
  const derivation = new Map(answers.derivations.map((d) => [d.number, d]));

  if (base.length !== QUESTIONS_PER_PAPER) {
    throw new Error(`base paper has ${base.length} questions, expected ${QUESTIONS_PER_PAPER}`);
  }

  const baseSeries = paper.base.series;
  const seriesList: SolutionBookSeries[] = [];
  const problems: string[] = [];

  // --- The base series: the reference. Its numbering and labelling ARE the identity.
  seriesList.push({
    series: baseSeries,
    questions: base.map((q) => {
      const d = derivation.get(q.number);
      if (!d?.answer) problems.push(`${baseSeries}-Q${q.number}: no derived answer`);
      if (!d?.solution) problems.push(`${baseSeries}-Q${q.number}: no solution`);
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
  for (const booklet of paper.variants) {
    const series = booklet.series;
    const p = join(DATA, `${paper.id}-${series}.map.json`);
    if (!existsSync(p)) {
      problems.push(
        `series ${series}: no map at ${p} — run ` +
          `\`npx tsx scripts/nda-gat/match-variant.ts ${paper.id} ${series} --apply\` first`
      );
      continue;
    }
    const file = JSON.parse(readFileSync(p, "utf8")) as MapFile;
    const rows = file.rows;
    if (!rows?.length) {
      problems.push(`series ${series}: map has no rows`);
      continue;
    }

    // Both directions, so a map that is SHORT or DOUBLED UP cannot slip past —
    // a duplicated base number leaves another base number unprinted, and the
    // book would look complete either way.
    const want = Array.from({ length: QUESTIONS_PER_PAPER }, (_, i) => i + 1);
    const nums = rows.map((r) => r.variant).sort((a, b) => a - b);
    const bases = rows.map((r) => r.base).sort((a, b) => a - b);
    if (JSON.stringify(nums) !== JSON.stringify(want)) {
      problems.push(`series ${series}: question numbers are not exactly 1..${QUESTIONS_PER_PAPER}`);
    }
    if (JSON.stringify(bases) !== JSON.stringify(want)) {
      problems.push(
        `series ${series}: base numbers are not a bijection onto 1..${QUESTIONS_PER_PAPER}`
      );
    }

    // The map's own derived key, used ONLY as a second opinion (see the header).
    const mapKey = new Map((file.key ?? []).map((k) => [k.number, (k.answer ?? "").toUpperCase()]));

    const questions = rows
      .slice()
      .sort((a, b) => a.variant - b.variant)
      .map((r) => {
        const q = byNumber.get(r.base);
        if (!q) {
          problems.push(`${series}-Q${r.variant}: base question ${r.base} not found`);
          return null;
        }
        const d = derivation.get(r.base);
        const baseAnswer = (d?.answer ?? "").toUpperCase();
        const baseText = new Map(q.options.map((o) => [o.label, o.text]));

        // Relabel: THIS series' label L carries the text of base label labels[L].
        const options = LABELS.map((L) => {
          const from = r.labels?.[L];
          const text = from ? baseText.get(from) : undefined;
          if (!text) {
            problems.push(
              `${series}-Q${r.variant}: label ${L} maps to missing base option ${from ?? "(none)"}`
            );
          }
          return { label: L, text: text ?? "" };
        });

        // Re-derive the answer rather than reading the map's `key` field, then
        // require the two to agree.
        const derived = LABELS.find((L) => r.labels?.[L] === baseAnswer);
        if (!derived) {
          problems.push(
            `${series}-Q${r.variant}: no label carries base ${r.base}'s correct option ${baseAnswer || "(none)"}`
          );
        }
        const fromMap = mapKey.get(r.variant);
        if (derived && fromMap && derived !== fromMap) {
          problems.push(
            `${series}-Q${r.variant}: the map's key says ${fromMap} but relabelling base ` +
              `Q${r.base}'s answer ${baseAnswer} gives ${derived}. Two derivations disagree — ` +
              `resolve against the booklet before printing either.`
          );
        }
        if (r.verdict === "PERMUTED" && d?.solution && namesALetter(d.solution)) {
          problems.push(
            `${series}-Q${r.variant}: options are PERMUTED and the solution names an option by ` +
              `letter — it would contradict the answer line. Reword the base solution to name ` +
              `the option's VALUE.`
          );
        }

        return {
          number: r.variant,
          baseNumber: r.base,
          context: q.context ?? null,
          stem: q.stem,
          options,
          answer: derived ?? "?",
          solution: d?.solution ?? null,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    seriesList.push({ series, questions });
  }

  if (problems.length) {
    console.log(`\nREFUSING TO BUILD (${problems.length}):`);
    for (const p of problems) console.log(`  ${p}`);
    process.exitCode = 1;
    return;
  }

  const siblings = seriesList.slice(1).map((s) => s.series);
  const title = `${paper.pyqNote} ${paper.pyqYear} — General Ability Test (Paper II)`;
  const subtitle = `Answer Keys and Solutions — Series ${seriesList.map((s) => s.series).join(", ")}`;
  const note =
    `All ${seriesList.length} series carry the same ${QUESTIONS_PER_PAPER} questions in a different ` +
    `printed order. Each series' key and solutions are given in ITS OWN question numbering, so a ` +
    `student can follow the booklet they sat. ` +
    (siblings.length
      ? `Answers for Series ${siblings.join(", ")} are derived from Series ${baseSeries} by matching ` +
        `each question's option TEXT, not by assuming a block pattern. `
      : "") +
    `The paper is in two parts — Part A is English (Q1-50) and Part B is General Knowledge ` +
    `(Q51-150) — in every series. No official UPSC answer key exists for this sitting; the answers ` +
    `here are independently derived and cross-checked against two independent prep-house keys.`;

  mkdirSync(outDir, { recursive: true });
  const file = join(outDir, `NDA_${paper.id.replace(/-/g, "_")}_GAT_Solution_Key_All_Sets.docx`);

  buildSolutionBook({ title, subtitle, note, series: seriesList, baseSeriesLabel: baseSeries })
    .then((buf) => {
      writeFileSync(file, buf);
      console.log(`wrote ${file}  (${(buf.length / 1024 / 1024).toFixed(2)} MB)`);
      for (const s of seriesList) {
        const withSol = s.questions.filter((q) => q.solution).length;
        console.log(
          `  Series ${s.series}: ${s.questions.length} questions, ${withSol} with a solution`
        );
      }
      console.log(
        `\nNEXT: npx tsx scripts/nda-gat/verify-solution-book.ts ${paper.id}` +
          `   (reads the FILE back — the builder's own report is not the check)`
      );
    })
    .catch((e) => {
      console.error(e);
      process.exitCode = 1;
    });
}

main();
