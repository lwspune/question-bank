/**
 * Prove the repaired rows RENDER — on the web (KaTeX) and in Word (OMML).
 *
 *   npx tsx scripts/reviews/verify-render.ts
 *
 * A solution can be mathematically perfect and still take the whole stem down in
 * the browser, or fall back to raw LaTeX in a downloaded answer key. Those are
 * different pipelines with different failure modes, so both are checked here
 * against the same text — the field x surface contract this project keeps
 * re-learning. Exits 1 on any failure.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import katex from "katex";
import { findOmmlFailures } from "../../src/lib/export/ommlAudit";

const CHUNKS = join(process.cwd(), "scripts", "reviews", "data", "findings", "2026-08-16-papers");
const LIVE = join(process.cwd(), "scripts", "reviews", "data", "audit-run");

type Fix = { questionId: string; questionNumber: string };
type Row = { questionId: string; questionNumber: string | null; text: string | null; solution: string | null };

function mathZones(s: string): string[] {
  return Array.from(s.matchAll(/\\\(([\s\S]*?)\\\)/g), (m) => m[1]);
}

function main() {
  const ids = new Set<string>();
  for (const dir of [CHUNKS]) {
    let names: string[] = [];
    try { names = readdirSync(dir); } catch { continue; }
    for (const n of names.filter((f) => f.startsWith("fix.") && f.endsWith(".out.json"))) {
      for (const f of JSON.parse(readFileSync(join(dir, n), "utf8")) as Fix[]) ids.add(f.questionId);
    }
  }
  // the option-text repair is not in a fix.*.out.json — check it too
  ids.add("930819d1-f485-4349-8429-0d0e7e0859d8");

  const live: Row[] = readdirSync(LIVE)
    .filter((f) => f.endsWith(".json"))
    .flatMap((f) => JSON.parse(readFileSync(join(LIVE, f), "utf8")) as Row[]);
  const byId = new Map(live.map((r) => [r.questionId, r]));

  let checked = 0, zones = 0, katexFail = 0, ommlFail = 0, missing = 0;
  for (const id of ids) {
    const r = byId.get(id);
    if (!r) { console.log(`  ! ${id} not in the live dump`); missing++; continue; }
    checked++;
    for (const field of ["text", "solution"] as const) {
      const s = r[field];
      if (!s) continue;
      for (const z of mathZones(s)) {
        zones++;
        try {
          katex.renderToString(z, { throwOnError: true, displayMode: false });
        } catch (e) {
          katexFail++;
          console.log(`  KATEX  ${r.questionNumber} [${field}] ${(e as Error).message.split("\n")[0].slice(0, 110)}`);
        }
      }
      for (const f of findOmmlFailures(s)) {
        ommlFail++;
        console.log(`  OMML   ${r.questionNumber} [${field}] ${JSON.stringify(f).slice(0, 110)}`);
      }
    }
  }

  console.log(`\n${checked} repaired row(s), ${zones} math zone(s)`);
  console.log(`  KaTeX failures ${katexFail}`);
  console.log(`  OMML  failures ${ommlFail}`);
  if (missing) console.log(`  not found      ${missing}`);
  if (katexFail || ommlFail || missing) process.exit(1);
  console.log(`  PASS — renders on web and converts for Word\n`);
}

main();
