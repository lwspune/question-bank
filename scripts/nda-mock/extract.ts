/**
 * Extract one mock paper's DOCX pair into reviewable JSON.
 *
 *   npx tsx scripts/nda-mock/extract.ts m1
 *
 * Runs pandoc over the question + solution DOCX, parses stems/options/answers/
 * solutions, applies the paper's errata, and writes:
 *   data/<id>.extract.json   — questions + options + key + solutions (committed)
 * Classification (chapter/subtopic/difficulty) is NOT done here; it is added by
 * the agent pass into data/<id>.classify.json.
 *
 * This step is deliberately read-only w.r.t. the bank. It reports every defect
 * it finds rather than guessing: a question whose options don't parse, a number
 * with no answer, a mismatch between key sources.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  splitQuestionBlocks,
  parseOptionsFromBlock,
  parseTailAnswerKey,
  parseInlineAnswers,
  parseSolutionBlocks,
  stripSourceTag,
  detectDirectionSets,
  normalizeMathDelimiters,
  unescapePandocBrackets,
  parseCombinedBlock,
  stripKatexUnsupported,
  parseSupplementSolutions,
  fixStackedOperators,
  stripPandocInlineMarkup,
  normalizeRtlSpans,
  parseGridAnswerKey,
} from "./parse";
import { stripPandocArtifacts } from "../lib/pandocArtifacts";
import { requirePaper, DATA, OUT, type Paper } from "./config";

export type ExtractedQuestion = {
  number: number;
  /** What the bank should STORE as question_number; defaults to `number`. */
  numberLabel?: string;
  stem: string;
  options: { label: string; text: string }[];
  answer: string | null;
  answerSource: string | null;
  solution: string | null;
  context?: string;
  setLabel?: string;
  sourceTag?: string;
  defects: string[];
};

function pandoc(docx: string, mediaDir: string): string {
  const raw = execFileSync(
    "pandoc",
    [docx, "-t", "markdown", "--wrap=none", `--extract-media=${mediaDir}`],
    { encoding: "utf8", maxBuffer: 200 * 1024 * 1024 },
  );
  // Applied to EVERY document at the boundary rather than per-paper: a stray
  // rtl run is a Word artefact that can appear in any of them, and where none
  // is present this is a byte-identical no-op (asserted by `drift.ts` over the
  // ten already-committed papers).
  return normalizeRtlSpans(raw);
}

export function extractPaper(paper: Paper): {
  questions: ExtractedQuestion[];
  report: string[];
} {
  const mediaDir = join(OUT, paper.id);
  mkdirSync(mediaDir, { recursive: true });

  const qMd = pandoc(paper.questionDocx, join(mediaDir, "q"));
  const sMd =
    paper.solutionDocx && paper.solutionDocx !== paper.questionDocx
      ? pandoc(paper.solutionDocx, join(mediaDir, "s"))
      : qMd;
  // Supplementary solution files are parsed SEPARATELY, never concatenated:
  // the block scanner keeps the longest ascending run of numbers, so appending
  // a file numbered 8/38/56 after one numbered 1..120 puts those three out of
  // order and the scan drops them silently.
  const extraMds = (paper.extraSolutionDocx ?? []).map((extra, i) =>
    pandoc(extra, join(mediaDir, `s-extra-${i}`)),
  );

  const report: string[] = [];
  const blocks = splitQuestionBlocks(qMd);
  report.push(`question blocks parsed: ${blocks.length}`);

  // Answer letters, in priority order: the paper's own tail ANSWER KEYS block,
  // then any inline `N.(c)` / `SOL. (a)` on the solutions. Disagreements are
  // REPORTED, never silently resolved — that is the point of two sources.
  //
  // The tail block is looked for in BOTH documents: Mocks 1/2/3/5 print it at
  // the end of the QUESTION paper, Mock 4 at the end of the SOLUTION paper, in
  // the identical format.
  const qTail = parseTailAnswerKey(qMd);
  const sTail = qMd === sMd ? new Map<number, string>() : parseTailAnswerKey(sMd);
  const bestTail = qTail.size >= sTail.size ? qTail : sTail;
  let tailKey = bestTail;

  const inlineKey = parseInlineAnswers(sMd);
  report.push(
    `tail ANSWER KEYS entries: ${bestTail.size}` +
      (bestTail.size ? ` (in the ${bestTail === qTail ? "question" : "solution"} paper)` : ""),
  );

  // A standalone GRID key (weekly series) is a third source of the same fact.
  // Reported on its OWN line, never folded into the tail count above: those are
  // different documents, and a report that says "tail key: 120" for a paper
  // whose tail block is empty sends the next reader to the wrong file.
  //
  // Its defects are surfaced, never auto-resolved. A duplicated label means one
  // number's letter is sitting in another number's cell, and only the grid's
  // geometry plus the solution document can say which.
  if (paper.answerKeyDocx) {
    const kMd = pandoc(paper.answerKeyDocx, join(mediaDir, "k"));
    const grid = parseGridAnswerKey(kMd, paper.questionCount);
    report.push(`grid ANSWER KEY entries : ${grid.keys.size}/${paper.questionCount}`);
    if (grid.duplicates.length) {
      report.push(
        `  DEFECT: label(s) printed twice: ${grid.duplicates.join(", ")} — ` +
          `so ${grid.missing.join(", ") || "no number"} never appears. One cell carries the ` +
          `wrong label; repair via an errata 'answer' entry after checking the row it sits in.`,
      );
    } else if (grid.missing.length) {
      report.push(`  grid key missing: ${grid.missing.join(", ")}`);
    }
    // Disagreements between the grid and the letters printed on the solutions
    // are the single most valuable signal this source offers — two documents,
    // independently typed. Report every one; the adjudication step settles them.
    const clash = [...grid.keys.keys()].filter(
      (n) => inlineKey.has(n) && inlineKey.get(n) !== grid.keys.get(n),
    );
    report.push(
      `  grid vs solution letters: overlap ${[...grid.keys.keys()].filter((n) => inlineKey.has(n)).length}, ` +
        `DISAGREE ${clash.length}` +
        (clash.length
          ? ` -> ${clash.map((n) => `Q${n}(grid=${grid.keys.get(n)},soln=${inlineKey.get(n)})`).join(" ")}`
          : ""),
    );
    if (grid.keys.size > tailKey.size) tailKey = grid.keys;
  }
  report.push(`inline solution answers : ${inlineKey.size}`);
  if (qTail.size && sTail.size) {
    const clash = [...qTail.keys()].filter((n) => sTail.has(n) && sTail.get(n) !== qTail.get(n));
    if (clash.length) {
      report.push(`!! the two ANSWER KEYS blocks disagree on ${clash.length}: ${clash.join(", ")}`);
    }
  }

  const conflicts: number[] = [];
  for (const [n, a] of tailKey) {
    const b = inlineKey.get(n);
    if (b && b !== a) conflicts.push(n);
  }
  if (conflicts.length) {
    report.push(`!! key CONFLICTS (tail vs solution) on ${conflicts.length}: ${conflicts.join(", ")}`);
  }

  const solutions = parseSolutionBlocks(sMd);
  report.push(`solution blocks parsed  : ${solutions.size}`);
  // A supplement heads its entries `Solution 8`, not `8.`, and may close with a
  // small answer key of its own — hence its own parser.
  const supplementKey = new Map<number, string>();
  for (const [i, md] of extraMds.entries()) {
    const extra = parseSupplementSolutions(md);
    const added: number[] = [];
    for (const [n, sol] of extra.solutions) {
      // A supplement fills GAPS; it never overwrites a solution the main
      // document already has, so a silent substitution is impossible. The test
      // is on the VALUE, not on `has`: Mock 8's main document carries an empty
      // block for exactly the three questions the supplement exists to solve, so
      // a `has` test declared all three "already present" and filled nothing.
      if (!solutions.get(n)) {
        solutions.set(n, sol);
        added.push(n);
      }
    }
    report.push(`supplement ${i + 1}: filled ${added.length} gap(s) [${added.join(", ")}]`);
    for (const n of extra.solutions.keys()) {
      if (!added.includes(n))
        report.push(`   note: supplement Q${n} ignored — main solution already present`);
    }
    if (extra.answers.size) {
      report.push(`supplement ${i + 1}: answer key for [${[...extra.answers.keys()].join(", ")}]`);
      for (const [n, a] of extra.answers) if (!supplementKey.has(n)) supplementKey.set(n, a);
    }
  }

  const sets = detectDirectionSets(qMd);
  if (sets.length) {
    report.push(`shared-context sets: ${sets.map((s) => `${s.from}-${s.to}`).join(", ")}`);
  }
  const setFor = (n: number) => sets.find((s) => n >= s.from && n <= s.to);

  // A combined document (Mock 10) interleaves each question with its solution,
  // so the solution has to be cut out of the LAST option's text — see
  // parseCombinedBlock for why it cannot be cut from the raw block first.
  const combined = sMd === qMd;

  const questions: ExtractedQuestion[] = [];
  for (const b of blocks) {
    const defects: string[] = [];
    const errataForQ = paper.errata?.[b.number];
    const ownSet = setFor(b.number);
    const body = b.body;
    let split: { solution: string | null; answer: string | null } | null = null;
    let stem = "";
    let options: { label: string; text: string }[] = [];
    try {
      if (combined) {
        const parsed = parseCombinedBlock(body);
        stem = parsed.stem;
        options = parsed.options;
        split = { solution: parsed.solution, answer: parsed.answer };
        if (parsed.fused) {
          // The block spans more than one question, so the options/answer/
          // solution it just produced belong to the LAST of them, not to this
          // number. Loud, because the result otherwise looks well-formed.
          defects.push(
            "block spans TWO questions — the source failed to number the second, so this row's " +
              "options/answer/solution are its NEIGHBOUR's; needs errata",
          );
        }
      } else {
        const parsed = parseOptionsFromBlock(body);
        stem = parsed.stem;
        options = parsed.options;
      }
    } catch (e) {
      if (ownSet?.options) {
        // An assertion-reason question: the four codes live once in the shared
        // Directions block, so the whole body is the stem.
        stem = body.replace(/\s*\\?\s*$/, "").trim();
        options = ownSet.options.map((o) => ({ label: o.label, text: o.text }));
      } else if (errataForQ?.optionTexts) {
        // The source's own option LABELS are broken and the parse could not
        // recover a run; the errata supplies the texts (applied below). Recover
        // the stem by cutting at the first label.
        const cut = body.search(/(?:^|[\s$)])\(?[a-dA-D][).]/m);
        stem = (cut > 0 ? body.slice(0, cut) : body).replace(/\s*\\?\s*$/, "").trim();
      } else {
        defects.push(`option parse failed: ${(e as Error).message.split("\n")[0]}`);
        stem = body;
      }
    }

    const tagged = stripSourceTag(stem);
    stem = tagged.text;

    const errata = errataForQ;
    // `optionTexts` wins UNCONDITIONALLY, not only when the parse threw. A later
    // parser improvement can make a broken label run parse "successfully" but
    // with damage — Mock 4 Q34's `9d)` leaks its stray 9 into option (c) — and
    // an errata that only applied on failure would be silently bypassed.
    if (errata?.optionTexts) {
      options = ["A", "B", "C", "D"].map((label, i) => ({
        label,
        text: errata.optionTexts![i],
      }));
    }
    if (errata?.stem) stem = errata.stem;
    const solutionOverride = errata?.solution;
    if (errata?.options) {
      for (const [label, text] of Object.entries(errata.options)) {
        const o = options.find((x) => x.label === label);
        if (o) o.text = text;
        else defects.push(`errata targets missing option ${label}`);
      }
    }

    let answer =
      tailKey.get(b.number) ??
      inlineKey.get(b.number) ??
      split?.answer ??
      supplementKey.get(b.number) ??
      null;
    let answerSource = tailKey.has(b.number)
      ? "tail-key"
      : inlineKey.has(b.number)
        ? "solution"
        : split?.answer
          ? "combined-marker"
          : supplementKey.has(b.number)
            ? "supplement-key"
            : null;
    if (errata?.answer) {
      answer = errata.answer;
      answerSource = "errata";
    }
    if (!answer) defects.push("no answer from any source");
    if (conflicts.includes(b.number)) {
      defects.push(`key conflict: tail=${tailKey.get(b.number)} solution=${inlineKey.get(b.number)}`);
    }

    // In a combined document the solution is this block's own tail, not an
    // entry from a separate solutions file.
    const solution = solutionOverride ?? (split ? split.solution : (solutions.get(b.number) ?? null));
    if (!solution) defects.push("no solution in source");

    const set = ownSet;
    // A context errata is authored once (on any member of the set) but must
    // apply to every question sharing that context.
    const ctxFix = set
      ? Object.entries(paper.errata ?? {}).find(
          ([n, e]) => e.context && Number(n) >= set.from && Number(n) <= set.to,
        )?.[1].context
      : undefined;

    // Normalise pandoc's $...$ to the bank-wide \(...\) LAST, so errata can be
    // authored in whichever form is convenient and still land normalised, then
    // undo pandoc's PLAIN-TEXT escaping (`AD \< DC` renders the backslash
    // literally). The repo's own helper is reused rather than reimplemented so
    // it cannot disagree with the `audit:text` probe that reports the defect —
    // it masks math zones, so LaTeX inside \(...\) is untouched.
    const md = (s: string) =>
      fixStackedOperators(
        stripPandocInlineMarkup(
          stripKatexUnsupported(stripPandocArtifacts(normalizeMathDelimiters(unescapePandocBrackets(s)))),
        ),
      );

    // Surgical solution edits run AFTER normalisation, so an errata is authored
    // in the bank's own `\(...\)` convention rather than in pandoc's raw `$...$`.
    let solutionOut = solution ? md(solution) : solution;
    for (const [from, to] of errata?.solutionReplace ?? []) {
      const hits = solutionOut ? solutionOut.split(from).length - 1 : 0;
      // Throw rather than warn: an edit that matched nothing would leave the
      // defect in place while the errata claims it was repaired.
      if (hits !== 1) {
        throw new Error(
          `Q${b.number}: solutionReplace expected exactly one match for ${JSON.stringify(from)}, found ${hits}`
        );
      }
      solutionOut = solutionOut!.split(from).join(to);
    }

    questions.push({
      number: b.number,
      stem: md(stem),
      options: options.map((o) => ({ ...o, text: md(o.text) })),
      answer,
      answerSource,
      solution: solutionOut,
      ...(set
        ? {
            context: md(ctxFix ?? set.context),
            setLabel: `${paper.id}-set-${set.from}-${set.to}`,
          }
        : {}),
      ...(tagged.tag ? { sourceTag: tagged.tag } : {}),
      defects,
    });
  }

  // Questions the source failed to number, supplied by hand. Normalised through
  // the same `md` pipeline as everything else so they cannot carry a different
  // math convention, and reported so they are never a silent addition.
  for (const x of paper.extraQuestions ?? []) {
    const md = (s: string) =>
      fixStackedOperators(
        stripPandocInlineMarkup(
          stripKatexUnsupported(stripPandocArtifacts(normalizeMathDelimiters(unescapePandocBrackets(s)))),
        ),
      );
    questions.push({
      number: x.number,
      numberLabel: x.numberLabel,
      stem: md(x.stem),
      options: ["A", "B", "C", "D"].map((label, i) => ({
        label,
        text: md(x.optionTexts[i]),
      })),
      answer: x.answer,
      answerSource: "extra-question",
      solution: md(x.solution),
      defects: [],
    });
    report.push(`extra question ${x.numberLabel} (internal #${x.number}): ${x.reason}`);
  }

  const missing = [];
  for (let n = 1; n <= paper.questionCount; n++) {
    if (!questions.some((q) => q.number === n)) missing.push(n);
  }
  if (missing.length) report.push(`!! MISSING question numbers: ${missing.join(", ")}`);

  const withDefects = questions.filter((q) => q.defects.length);
  report.push(`questions with defects  : ${withDefects.length}`);
  for (const q of withDefects) report.push(`   Q${q.number}: ${q.defects.join(" | ")}`);

  return { questions, report };
}

function main() {
  const id = process.argv[2];
  const paper = requirePaper(id);
  if (!existsSync(paper.questionDocx)) throw new Error(`missing DOCX: ${paper.questionDocx}`);

  const { questions, report } = extractPaper(paper);
  mkdirSync(DATA, { recursive: true });
  const out = join(DATA, `${paper.id}.extract.json`);
  writeFileSync(out, JSON.stringify(questions, null, 2) + "\n", "utf8");

  console.log(`\n=== ${paper.id} — ${paper.sourceFile} ===`);
  for (const line of report) console.log(line);
  console.log(`\nwrote ${out} (${questions.length} questions)`);
}

if (require.main === module) main();
