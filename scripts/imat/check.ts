/**
 * Dry check of the reviewed IMAT transcriptions. Writes nothing.
 *
 *   npx tsx scripts/imat/check.ts            # all years
 *   npx tsx scripts/imat/check.ts 2024       # one year
 *
 * Runs every question of data/<year>.questions.json through the same
 * validatePaper + buildRow the commit uses, renders every math zone with
 * KaTeX as the site does, and reports: errors, questions
 * still without a chapter, figures still to attach, and how the shuffled
 * answers spread across A-E.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import katex from "katex";
import { buildRow, validatePaper, type ImatQuestion } from "./lib";

// Inline \( ... \) and display \[ ... \] zones, as the site renders them.
const ZONE = new RegExp(String.raw`\\\((.+?)\\\)|\\\[(.+?)\\\]`, "gs");

/** Every math zone in a question that KaTeX refuses, plus any delimiter left unpaired. */
export function mathErrors(q: ImatQuestion): string[] {
  const out: string[] = [];
  for (const s of [q.context ?? "", q.text, ...q.options]) {
    for (const m of s.matchAll(ZONE)) {
      const tex = m[1] ?? m[2];
      try {
        katex.renderToString(tex, { throwOnError: true, displayMode: m[2] !== undefined });
      } catch (e) {
        out.push(`Q${q.n}: KaTeX refuses "${tex.slice(0, 60)}": ${(e as Error).message.slice(0, 80)}`);
      }
    }
    const rest = s.replace(ZONE, "");
    if (rest.includes(String.raw`\(`) || rest.includes(String.raw`\[`)) out.push(`Q${q.n}: unpaired math delimiter`);
  }
  return out;
}

export const YEARS = [2023, 2024, 2025, 2026] as const;

export function loadPaper(year: number): { sourceFile: string; questions: ImatQuestion[] } {
  const file = join(__dirname, "data", `${year}.questions.json`);
  if (!existsSync(file)) throw new Error(`${file} not found`);
  return JSON.parse(readFileSync(file, "utf8"));
}

function main() {
  const arg = process.argv[2];
  const years = arg ? [Number(arg)] : [...YEARS];
  let failed = false;
  for (const year of years) {
    const { questions } = loadPaper(year);
    const errors = validatePaper(year, questions);
    const letters: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    for (const q of questions) {
      errors.push(...mathErrors(q));
      try {
        const row = buildRow(year, q);
        letters[row.options.find((o) => o.isCorrect)!.label]++;
      } catch (e) {
        errors.push((e as Error).message);
      }
    }
    const noChapter = questions.filter((q) => !q.chapter?.trim()).map((q) => q.n);
    const figures = questions.filter((q) => q.figure).map((q) => q.n);
    console.log(`${year}: ${questions.length} questions, ${errors.length} error(s)`);
    for (const e of errors) console.log(`  - ${e}`);
    console.log(`  answers by letter: ${Object.entries(letters).map(([k, v]) => `${k} ${v}`).join(" · ")}`);
    if (noChapter.length) console.log(`  no chapter yet: ${noChapter.length} question(s)`);
    if (figures.length) console.log(`  figure to attach: Q${figures.join(", Q")}`);
    if (errors.length) failed = true;
  }
  if (failed) process.exit(1);
}

if (require.main === module) main();
