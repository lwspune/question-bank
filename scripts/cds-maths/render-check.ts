/**
 * Render every math zone of a merged paper through the repo's OWN KaTeX, and
 * report the ones KaTeX refuses.
 *
 *   npx tsx scripts/cds-maths/render-check.ts <paperId>
 *   npx tsx scripts/cds-maths/render-check.ts <paperId> --self-test
 *
 * WHY IT IS SEPARATE FROM check-bands.ts: that probe is pure and dependency-free
 * so it can run on raw band files. This one needs KaTeX, and it is the only
 * check that can answer "will a student actually see this?" — a stem with
 * balanced delimiters and no banned glyphs can still contain `\ce{}` or an
 * unclosed `\frac` and render as a red error box on /browse.
 *
 * TWO TRAPS, both of which have produced a FALSE GREEN in this repo:
 *
 *  1. `parseLatex` emits segment types "text" | "inline" | "block". It never
 *     emits "math". Five agents on the State Board Chemistry run independently
 *     wrote `seg.type === "math"` and got a clean pass over ZERO zones. The
 *     count printed below is the guard: if it says 0 zones on a maths paper,
 *     the probe is broken, not the data.
 *  2. A check that has never gone red proves nothing — hence `--self-test`,
 *     which feeds KaTeX known-bad input and FAILS if it is not rejected.
 */
import { readFileSync, existsSync } from "node:fs";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { dataPath, requirePaper } from "./config";
import { normalizeQuestions, type TQ } from "./lib";

function zonesOf(s: string): string[] {
  return parseLatex(s)
    .filter((seg) => seg.type === "inline" || seg.type === "block")
    .map((seg) => seg.content);
}

function tryRender(tex: string): string | null {
  try {
    katex.renderToString(tex, { throwOnError: true, displayMode: false });
    return null;
  } catch (e) {
    return (e as Error).message.split("\n")[0];
  }
}

function selfTest() {
  const mustFail = [
    ["\\ce{H2SO4}", "mhchem is not loaded in this app"],
    ["\\frac{1}{", "unclosed group"],
    ["\\notacommand{x}", "undefined control sequence"],
    ["x^", "dangling superscript"],
  ];
  let bad = 0;
  for (const [tex, why] of mustFail) {
    const err = tryRender(tex);
    console.log(`  ${err ? "rejected" : "ACCEPTED"}  ${JSON.stringify(tex).padEnd(22)} (${why})`);
    if (!err) bad += 1;
  }
  const good = ["\\frac{1}{2}", "\\sqrt{2}", "\\cfrac{1}{1+\\cfrac{1}{2}}", "30^\\circ", "\\angle ABC", "\\triangle PQR"];
  for (const tex of good) {
    const err = tryRender(tex);
    console.log(`  ${err ? "REJECTED" : "accepted"}  ${JSON.stringify(tex)}${err ? `  ${err}` : ""}`);
    if (err) bad += 1;
  }
  if (bad) {
    console.log(`\nself-test FAILED (${bad}) — this probe cannot be trusted.`);
    process.exit(1);
  }
  console.log(`\nself-test passed: the probe rejects bad LaTeX and accepts the forms this corpus uses.`);
}

function main() {
  if (process.argv.includes("--self-test")) return selfTest();

  const paper = requirePaper(process.argv[2]);
  const qPath = dataPath(paper.id, "questions");
  if (!existsSync(qPath)) throw new Error(`missing ${qPath} — run merge.ts first`);
  const questions: TQ[] = normalizeQuestions(JSON.parse(readFileSync(qPath, "utf8")));

  // SOLUTIONS ARE IN SCOPE, and they were not until two agents rewriting them
  // reported, independently, that this probe could not validate a word of their
  // new LaTeX. That was a real hole: a solution is rendered to the student
  // through the same KaTeX path as a stem, so unconvertible markup there fails
  // exactly as visibly -- and the solutions are the half most likely to carry
  // hand-authored maths, because stems are transcribed from a printed page
  // while solutions are written from scratch.
  const aPath = dataPath(paper.id, "answers");
  const solutions = new Map<number, string>();
  if (existsSync(aPath)) {
    const file = JSON.parse(readFileSync(aPath, "utf8")) as {
      derivations?: { number: number; reasoning?: string; solution?: string }[];
    };
    for (const d of file.derivations ?? []) {
      // Mirror buildRecords: the student-facing field when authored, the
      // reviewer evidence otherwise. Checking `reasoning` when a `solution`
      // exists would validate a string nobody will ever see.
      const text = d.solution ?? d.reasoning;
      if (text) solutions.set(d.number, text);
    }
  }

  let zones = 0;
  const failures: string[] = [];
  for (const q of questions) {
    const fields: [string, string | undefined][] = [
      ["stem", q.stem],
      ["context", q.context],
      ...q.options.map((o) => [`option ${o.label}`, o.text] as [string, string]),
      ["solution", solutions.get(q.number)],
    ];
    for (const [name, val] of fields) {
      if (!val) continue;
      for (const tex of zonesOf(val)) {
        zones += 1;
        const err = tryRender(tex);
        if (err) failures.push(`Q${q.number} ${name}: ${err}\n    ${tex}`);
      }
    }
  }

  console.log(`${paper.id}: ${questions.length} questions, ${zones} math zones rendered`);
  if (!zones) {
    // The Chemistry false-green, made loud instead of silent.
    console.log(`\nZERO math zones on a mathematics paper — this probe is broken, not the data.`);
    process.exit(1);
  }
  if (failures.length) {
    console.log(`\nKaTeX FAILURES (${failures.length}):`);
    for (const f of failures) console.log(`  ${f}`);
    process.exit(1);
  }
  console.log(`clean: every math zone renders.`);
}

main();
