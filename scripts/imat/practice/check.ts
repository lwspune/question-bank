/**
 * Check every IMAT twin file and report coverage.
 *
 *   npx tsx scripts/imat/practice/check.ts
 *
 * Twins live in scripts/imat/practice/twins/<year>.json, one array per
 * Cambridge year (see lib.ts for what a twin is and which questions get one).
 * Runs checkTwins, then the originality check against all 1,000 past
 * questions (reviews in scripts/imat/originality-reviews.json), then prints
 * per year: in scope, twinned, held for figures, out of the syllabus.
 * Exits 1 on any problem or unreviewed originality finding. Read-only.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { ImatQuestion } from "../lib";
import { buildOriginalityIndex, checkOriginality, unreviewed, wordingKey } from "../../../src/lib/sites/imat/originality";
import { loadPastQuestions, loadReviews } from "../notes/bank";
import { checkTwins, twinScope, type ImatTwin } from "./lib";

const DATA = join(__dirname, "..", "data");
const TWINS = join(__dirname, "twins");
export const FIGURES = join(__dirname, "figures");
export const CAMBRIDGE_YEARS = Array.from({ length: 12 }, (_, i) => 2011 + i);

export function loadTwinFile(year: number): ImatTwin[] {
  const file = join(TWINS, `${year}.json`);
  return existsSync(file) ? (JSON.parse(readFileSync(file, "utf8")) as ImatTwin[]) : [];
}

/**
 * Everything check.ts verifies, as data: every twin file against its sources
 * (checkTwins) and against all 1,000 past questions (originality, minus the
 * reviewed findings). The commit script refuses to write unless this is empty.
 */
export function checkAllTwins() {
  const sources = new Map<string, ImatQuestion>();
  const byYear = new Map<number, ImatQuestion[]>();
  for (const year of CAMBRIDGE_YEARS) {
    const qs = (JSON.parse(readFileSync(join(DATA, `${year}.questions.json`), "utf8")) as { questions: ImatQuestion[] }).questions;
    byYear.set(year, qs);
    for (const q of qs) sources.set(`${year} Q${q.n}`, q);
  }
  const twins = CAMBRIDGE_YEARS.flatMap(loadTwinFile);
  const problems = checkTwins(twins, sources, { figureExists: (f) => existsSync(join(FIGURES, f)) });
  const idx = buildOriginalityIndex(loadPastQuestions());
  const findings = twins.flatMap((t) => checkOriginality(idx, t));
  const open = unreviewed(findings, twins, loadReviews());
  for (const f of open)
    problems.push(`${f.candidateId} (wording ${wordingKey(twins.find((t) => t.id === f.candidateId)!)}): ${f.kind} ~ ${f.sourceId}: ${f.detail}`);
  return { twins, byYear, problems };
}

function main() {
  const { twins, byYear, problems } = checkAllTwins();

  const done = new Set(twins.map((t) => t.twinOf));
  // "figure source" = in-scope questions whose source carries a figure (the
  // later pass); "figure left" = those of them not yet twinned.
  console.log("year  in-scope  twinned  figure-source  figure-left  out-of-syllabus");
  const total = { scope: 0, done: 0, fig: 0, left: 0, out: 0 };
  for (const year of CAMBRIDGE_YEARS) {
    let scope = 0, twinned = 0, fig = 0, left = 0, out = 0;
    for (const q of byYear.get(year)!) {
      const s = twinScope(q);
      const isFig = !!(q.figure || q.optionImages);
      if (s.inScope) {
        scope++;
        const has = done.has(`${year} Q${q.n}`);
        if (has) twinned++;
        if (isFig) {
          fig++;
          if (!has) left++;
        }
      } else out++;
    }
    Object.assign(total, { scope: total.scope + scope, done: total.done + twinned, fig: total.fig + fig, left: total.left + left, out: total.out + out });
    console.log(`${year}  ${String(scope).padStart(8)}  ${String(twinned).padStart(7)}  ${String(fig).padStart(13)}  ${String(left).padStart(11)}  ${String(out).padStart(15)}`);
  }
  console.log(`all   ${String(total.scope).padStart(8)}  ${String(total.done).padStart(7)}  ${String(total.fig).padStart(13)}  ${String(total.left).padStart(11)}  ${String(total.out).padStart(15)}`);

  const letters = twins.reduce<Record<string, number>>((m, t) => ({ ...m, [t.answer]: (m[t.answer] ?? 0) + 1 }), {});
  console.log(`\nanswer letters: ${JSON.stringify(letters)}`);
  if (problems.length) {
    console.log(`\nFAIL: ${problems.length} problem(s)`);
    for (const p of problems) console.log(`  - ${p}`);
    process.exit(1);
  }
  console.log(`\nPASS: ${twins.length} twins`);
}

if (require.main === module) main();
