/**
 * Dry check of a reviewed ENEM year. Writes nothing.
 *
 *   npx tsx scripts/enem/check.ts 2025
 *
 * Runs every question of data/<year>.questions.json through the commit's own
 * buildRow with INEP's key (data/<year>.key.json), renders every maths zone in
 * the text, options AND solution with KaTeX (strict, as the site does), checks
 * each figure file exists in C:\Vilas\LWS_Pune\ENEM\figures, and reports the
 * chapters, the cancelled items and how the keys spread across A-E.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import katex from "katex";
import { buildRow, type EnemQuestion, type KeyEntry } from "./lib";

const ZONE = new RegExp(String.raw`\\\((.+?)\\\)|\\\[(.+?)\\\]`, "gs");
export const FIGURE_DIR = String.raw`C:\Vilas\LWS_Pune\ENEM\figures`;

export type EnemPaper = { year: number; day: 1 | 2; booklet: number; source_file: string; questions: EnemQuestion[] };

export function loadPaper(year: number): { paper: EnemPaper; key: Record<string, KeyEntry> } {
  const dir = join(__dirname, "data");
  const paper = JSON.parse(readFileSync(join(dir, `${year}.questions.json`), "utf8")) as EnemPaper;
  const key = JSON.parse(readFileSync(join(dir, `${year}.key.json`), "utf8")) as Record<string, KeyEntry>;
  return { paper, key };
}

export function figurePath(year: number, n: number): string {
  return join(FIGURE_DIR, `${year}_q${n}.png`);
}

export function mathErrors(q: EnemQuestion): string[] {
  const out: string[] = [];
  for (const s of [q.text, q.solution, ...q.options]) {
    for (const m of s.matchAll(ZONE)) {
      const tex = m[1] ?? m[2];
      try {
        katex.renderToString(tex, { throwOnError: true, strict: "error", displayMode: m[2] !== undefined });
      } catch (e) {
        out.push(`Q${q.n}: KaTeX refuses "${tex.slice(0, 60)}": ${(e as Error).message.slice(0, 90)}`);
      }
    }
    const rest = s.replace(ZONE, "");
    if (rest.includes(String.raw`\(`) || rest.includes(String.raw`\[`)) out.push(`Q${q.n}: unpaired maths delimiter`);
  }
  return out;
}

export function checkPaper(year: number): string[] {
  const { paper, key } = loadPaper(year);
  const errors: string[] = [];
  const day = paper.day ?? 2;
  for (const q of paper.questions) {
    const k = key[String(q.n)];
    if (!k) {
      errors.push(`Q${q.n}: not in the key`);
      continue;
    }
    try {
      buildRow(year, q, k, { day });
    } catch (e) {
      errors.push((e as Error).message);
    }
    errors.push(...mathErrors(q));
    if ((q.figure || q.option_figures) && !existsSync(figurePath(year, q.n))) {
      errors.push(`Q${q.n}: figure file missing`);
    }
  }
  return errors;
}

if (require.main === module) {
  const year = Number(process.argv[2]);
  const { paper, key } = loadPaper(year);
  const errors = checkPaper(year);
  const chapters: Record<string, number> = {};
  for (const q of paper.questions) chapters[`${q.subject}/${q.chapter}`] = (chapters[`${q.subject}/${q.chapter}`] ?? 0) + 1;
  const spread: Record<string, number> = {};
  for (const v of Object.values(key)) spread[v] = (spread[v] ?? 0) + 1;
  console.log(`ENEM ${year}: ${paper.questions.length} questions, ${paper.questions.filter((q) => q.figure || q.option_figures).length} with a figure`);
  console.log(`keys ${JSON.stringify(spread)}`);
  console.log(`chapters ${JSON.stringify(chapters)}`);
  if (errors.length) {
    console.log(`CHECK: ${errors.length} problem(s)`);
    for (const e of errors.slice(0, 60)) console.log(`  - ${e}`);
    process.exitCode = 1;
  } else {
    console.log("CHECK: ok");
  }
}
