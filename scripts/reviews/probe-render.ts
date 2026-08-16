/**
 * Render-integrity probe over a paper's stems and solutions.
 *
 *   npx tsx scripts/reviews/probe-render.ts
 *
 * These defects are invisible to every other gate here: the answer is right, the
 * key is right, the delimiters balance, and the page still prints garbage.
 *
 *   LOST_BACKSLASH  a LaTeX command sitting OUTSIDE a math zone with no leading
 *                   backslash ("dfrac{5}{sqrt{26}}approx0.98"). Renders as literal
 *                   text in both the web reveal and the Word answer key.
 *   CONTROL_CHAR    a real TAB/CR/VT/FF/BS in the text. This is the tail of the
 *                   same corruption: a shell layer ate the backslash of `\t`/`\n`
 *                   and left the control character it denotes, so `\times` became
 *                   TAB+"imes" and `\neq` became NEWLINE+"eq". See the project
 *                   memory on heredoc backslash-eating — author through the editor.
 *   BUILD_MARKER    an internal triage/pipeline note that leaked into student-facing
 *                   text ("**[MISMATCH: …]**", or a caveat explaining a probe
 *                   convention). Correct in a build log, wrong on a printed key.
 *
 * TRIAGE, exits 0.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

type Row = { questionId: string; questionNumber: string | null; text: string | null; solution: string | null };

/**
 * Only commands that TAKE AN ARGUMENT are searched, and only where the argument
 * is actually present ("dfrac{", "bar{", "sum_"). The obvious wider list is a
 * trap: `times`, `sum`, `end`, `log` and `bar` are ordinary English words, and
 * including them bare made this probe fire on "3 times the number" and "the sum
 * of" across a third of the corpus — the same false-positive shape as matching
 * the article "a" as option A. A command with its brace attached cannot be prose.
 */
const CMDS =
  "dfrac|tfrac|frac|sqrt|bar|vec|widehat|hat|overline|underline|begin|end|sum|int|prod|lim|binom|left|right";

const LOST = new RegExp(String.raw`(?<![\\A-Za-z])(${CMDS})(?=[{_^])`, "g");
/** Argument-less commands are only credible as a defect beside another lost one. */
const LOST_BARE = new RegExp(String.raw`(?<![\\A-Za-z])(approx|cdot|neq|infty|Rightarrow|alpha|beta|theta|lambda)(?![A-Za-z])`, "g");
const CONTROL = /[\t\r\v\f\b]/g;
const MARKER = /\*?\*?\[(MISMATCH|TODO|CHECK|FIXME|VERIFY)\b|REVIEW:|standing key-audit probe|the probe read/i;
const MATH = /\\\([\s\S]*?\\\)/g;

function main() {
  const dir = join(process.cwd(), "scripts", "reviews", "data", "audit-run");
  const files = readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => join(dir, f));
  const seen = new Set<string>();
  const out: string[] = [];
  let n = 0;

  for (const f of files) {
    for (const r of JSON.parse(readFileSync(f, "utf8")) as Row[]) {
      if (seen.has(r.questionId)) continue;
      seen.add(r.questionId);
      n++;
      for (const field of ["text", "solution"] as const) {
        const s = r[field];
        if (!s) continue;
        const hits: string[] = [];

        const outside = s.replace(MATH, " ");
        const lost = [...new Set(Array.from(outside.matchAll(LOST), (m) => m[1]))];
        const bare = [...new Set(Array.from(outside.matchAll(LOST_BARE), (m) => m[1]))];
        // A bare command alone is weak evidence; beside a braced one it is the
        // same corruption event, so report them together and never bare-only.
        if (lost.length) hits.push(`LOST_BACKSLASH ${[...lost, ...bare].sort().join(",")}`);

        // A lone \r is a CRLF line ending from an Excel-sourced row, not corruption
        // — normalizeNewlines collapses it. Only the escape-eaten controls matter.
        const ctrl = [...new Set(s.match(CONTROL) ?? [])].filter((c) => c !== "\r").map((c) => JSON.stringify(c));
        if (ctrl.length) hits.push(`CONTROL_CHAR ${ctrl.join(",")}`);

        const mk = s.match(MARKER);
        if (mk) hits.push(`BUILD_MARKER ${mk[0]}`);

        if (hits.length) out.push(`  ${(r.questionNumber ?? r.questionId.slice(0, 8)).padEnd(22)} ${field.padEnd(9)} ${hits.join(" | ")}`);
      }
    }
  }

  console.log(`\nprobed ${n} question(s)\n`);
  if (!out.length) console.log("  clean\n");
  else {
    for (const l of out) console.log(l);
    console.log(`\n${out.length} field(s) affected. TRIAGE — verify each against the stored row.\n`);
  }
}

main();
