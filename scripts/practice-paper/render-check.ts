/**
 * Render-check a records JSON file BEFORE it is committed: every math zone is
 * pushed through the REAL renderers of both surfaces.
 *
 *   - KaTeX  -> what /browse and /board show a student.
 *   - findOmmlFailures -> what a teacher gets in a downloaded Word paper. A form
 *     KaTeX renders happily can still land in Word as raw LaTeX, which is
 *     invisible on the website.
 *
 * Reads a plain file rather than the DB, so it can run on an extraction that has
 * not been committed to anything.
 *
 *   npx tsx scripts/practice-paper/render-check.ts <path-to-records.json>
 */
import { readFileSync } from "node:fs";
import katex from "katex";
import { findOmmlFailures } from "../../src/lib/export/ommlAudit";

type Rec = Record<string, unknown> & { n: number };
const FIELDS = ["stem", "context", "solution", "optA", "optB", "optC", "optD"];

function isCtrl(code: number): boolean {
  // built from CODE POINTS, never a literal escape: a literal control
  // character typed into a regex class is invisible in review, and is
  // exactly the corruption this check exists to find.
  return (code < 32 && code !== 9 && code !== 10) || code === 127 || code === 0xfffd;
}

const path = process.argv[2];
if (!path) throw new Error("usage: render-check.ts <records.json>");
const recs: Rec[] = JSON.parse(readFileSync(path, "utf-8"));

const ZONE = /\\\((.+?)\\\)/gs;
let zones = 0;
let katexFails = 0;
let ommlFails = 0;
let ctrl = 0;

for (const r of recs) {
  for (const f of FIELDS) {
    const v = r[f];
    if (typeof v !== "string" || !v) continue;

    for (let i = 0; i < v.length; i++) {
      const code = v.codePointAt(i)!;
      if (isCtrl(code)) {
        ctrl++;
        console.log(`Q${r.n} ${f}: CONTROL CHAR U+${code.toString(16)} at ${i}`);
      }
    }

    for (const m of v.matchAll(ZONE)) {
      zones++;
      try {
        katex.renderToString(m[1], { throwOnError: true, displayMode: false });
      } catch (e) {
        katexFails++;
        console.log(
          `Q${r.n} ${f}: KATEX  ${JSON.stringify(m[1])}\n        ${(e as Error).message.split("\n")[0]}`,
        );
      }
    }

    for (const bad of findOmmlFailures(v)) {
      ommlFails++;
      console.log(`Q${r.n} ${f}: OMML   ${JSON.stringify(bad)}`);
    }
  }
}

console.log(
  `\n${recs.length} records | ${zones} math zones | ` +
    `KaTeX failures: ${katexFails} | OMML failures: ${ommlFails} | control chars: ${ctrl}`,
);
if (katexFails || ommlFails || ctrl) process.exit(1);
