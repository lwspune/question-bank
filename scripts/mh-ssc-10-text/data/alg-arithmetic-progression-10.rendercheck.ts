/**
 * Render-check for alg-arithmetic-progression-10 — pushes every math zone in the
 * transcription (and, when pointed at the DB, in the authored solutions) through
 * the REAL renderers of both surfaces:
 *   - KaTeX            -> what /browse and /board show a student
 *   - findOmmlFailures -> what a teacher gets in a downloaded Word paper (a form
 *                         KaTeX renders happily can still land there as raw LaTeX)
 * Also scans for control characters / U+FFFD / doubled backslashes, the
 * shell-heredoc corruption signature.
 *
 *   npx tsx scripts/mh-ssc-10-text/data/alg-arithmetic-progression-10.rendercheck.ts [file.json ...]
 *
 * Defaults to the chapter's questions.json. Accepts any array of objects; every
 * string field named below is checked.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import katex from "katex";
import { findOmmlFailures } from "../../../src/lib/export/ommlAudit";

const FIELDS = ["stem", "context", "solution", "text"];

function isCtrl(code: number): boolean {
  // built from CODE POINTS, never a literal escape — a literal control character
  // typed into a regex class is invisible in review and is exactly what this
  // check exists to find.
  return (code < 32 && code !== 9 && code !== 10) || code === 127 || code === 0xfffd;
}

const paths = process.argv.slice(2);
if (paths.length === 0) {
  paths.push(join(__dirname, "alg-arithmetic-progression-10.questions.json"));
}

const ZONE = /\\\((.+?)\\\)/gs;
let rows = 0;
let zones = 0;
let katexFails = 0;
let ommlFails = 0;
let ctrlHits = 0;
let dblHits = 0;

function collect(v: unknown, sink: [string, string][], label: string) {
  if (typeof v === "string") sink.push([label, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => collect(x, sink, `${label}[${i}]`));
  else if (v && typeof v === "object") {
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) {
      if (FIELDS.includes(k)) collect(x, sink, `${label}.${k}`);
    }
  }
}

for (const p of paths) {
  const recs: Record<string, unknown>[] = JSON.parse(readFileSync(p, "utf-8"));
  for (const r of recs) {
    rows++;
    const id = String(r.ref ?? r.id ?? rows);
    const strings: [string, string][] = [];
    for (const f of FIELDS) collect(r[f], strings, f);
    collect(r.options, strings, "options");

    for (const [label, s] of strings) {
      for (let i = 0; i < s.length; i++) {
        if (isCtrl(s.codePointAt(i)!)) {
          ctrlHits++;
          console.log(`CTRL  ${id} ${label} @${i} U+${s.codePointAt(i)!.toString(16)}`);
          break;
        }
      }
      if (s.includes("\\\\(") || s.includes("\\\\)") || /\\\\[a-zA-Z]/.test(s)) {
        dblHits++;
        console.log(`DBL   ${id} ${label} — doubled backslash before a command`);
      }
      for (const m of s.matchAll(ZONE)) {
        zones++;
        try {
          katex.renderToString(m[1], { throwOnError: true, displayMode: false });
        } catch (e) {
          katexFails++;
          console.log(`KATEX ${id} ${label}: ${(e as Error).message}\n      zone: ${m[1]}`);
        }
      }
      const bad = findOmmlFailures(s);
      if (bad.length) {
        ommlFails += bad.length;
        for (const z of bad) console.log(`OMML  ${id} ${label}: ${z}`);
      }
    }
  }
}

console.log(
  `\nrows=${rows} zones=${zones} katexFails=${katexFails} ommlFails=${ommlFails} ` +
    `ctrl=${ctrlHits} doubleEscape=${dblHits}`
);
if (katexFails || ommlFails || ctrlHits || dblHits) process.exit(1);
