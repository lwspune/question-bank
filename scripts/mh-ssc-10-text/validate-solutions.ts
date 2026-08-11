/**
 * Validate authored solution fragments BEFORE apply-solutions.ts writes them.
 *
 *   npx tsx scripts/mh-ssc-10-text/validate-solutions.ts <chapterId>
 *
 * Reads every data/<id>.*.solutions.json against data/<id>.all.topaper.json and
 * checks four things that all fail SILENTLY downstream:
 *
 * 1. THE (id → ref) PAIRING, not the count. Authoring agents work from a dump
 *    and copy a uuid per row; a permutation loses nothing from a set and would
 *    shift every answer onto its neighbour, producing a chapter where every
 *    solution is a real solution to a different question. Counting cannot see it.
 * 2. COVERAGE — every row in the dump is answered exactly once across all
 *    fragments, and nothing is answered twice by two agents.
 * 3. KaTeX-BREAKING LATEX — unbalanced \( \), an empty zone, or a zone ending in
 *    a lone backslash. Any of these takes down the whole rendered solution, not
 *    just the zone.
 * 4. UNICODE MATH OUTSIDE A MATH ZONE — a bare √ or ∠ in prose renders as a
 *    literal glyph in the browser AND breaks the Word/OMML export path.
 *
 * Exits non-zero on any failure. Triage-free: everything it reports is a defect.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { DATA, requireChapter } from "./config";

type Sol = { id: string; ref: string; solution: string };
type Row = { id: string; ref: string };

/** Math that must live inside \( … \). Deliberately NOT including ° — the book
 *  uses it in prose ("a 30° angle") and both renderers handle it fine. */
const UNICODE_MATH = ["√", "∠", "△", "≅", "⊥", "∴", "∥", "≠", "≤", "≥"];

function mathZones(s: string): { inside: string[]; outside: string } {
  const inside: string[] = [];
  const outside = s.replace(/\\\((.*?)\\\)/gs, (_m, z: string) => {
    inside.push(z);
    return " ";
  });
  return { inside, outside };
}

function main() {
  const id = process.argv[2];
  requireChapter(id);

  const dump: Row[] = JSON.parse(readFileSync(join(DATA, `${id}.all.topaper.json`), "utf8"));
  const wantByRef = new Map(dump.map((r) => [r.ref, r.id]));

  const files = readdirSync(DATA).filter((f) => f.startsWith(`${id}.`) && f.endsWith(".solutions.json"));
  if (files.length === 0) throw new Error(`no ${id}.*.solutions.json fragments in ${DATA}`);

  const problems: string[] = [];
  const seen = new Map<string, string>(); // ref -> file

  for (const f of files) {
    const rows: Sol[] = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    for (const r of rows) {
      // 1 + 2
      const expected = wantByRef.get(r.ref);
      if (expected === undefined) problems.push(`${f}: ref "${r.ref}" is not in the dump`);
      else if (expected !== r.id) problems.push(`${f}: ${r.ref} PAIRED WITH THE WRONG id (got ${r.id}, want ${expected})`);
      const prev = seen.get(r.ref);
      if (prev) problems.push(`${r.ref} answered twice (${prev} and ${f})`);
      seen.set(r.ref, f);

      // 3
      const s = r.solution ?? "";
      if (!s.trim()) problems.push(`${f}: ${r.ref} has an EMPTY solution`);
      const opens = (s.match(/\\\(/g) ?? []).length;
      const closes = (s.match(/\\\)/g) ?? []).length;
      if (opens !== closes) problems.push(`${f}: ${r.ref} unbalanced math delimiters (${opens} open, ${closes} close)`);
      const { inside, outside } = mathZones(s);
      inside.forEach((z, i) => {
        if (!z.trim()) problems.push(`${f}: ${r.ref} EMPTY math zone #${i + 1}`);
        if (/\\$/.test(z.trimEnd())) problems.push(`${f}: ${r.ref} math zone #${i + 1} ends in a lone backslash`);
      });

      // 4
      for (const ch of UNICODE_MATH) {
        if (outside.includes(ch)) {
          problems.push(`${f}: ${r.ref} unicode math "${ch}" OUTSIDE a math zone`);
          break;
        }
      }

      // 5. DOUBLE-ESCAPING. Two independent authoring agents emitted `\\(` in the
      //    DECODED string (four backslashes in the JSON source) where `\(` is
      //    wanted. It is invisible to the balance check above — `\\(` still
      //    contains a `\(` — but renders as a LaTeX line break followed by a
      //    literal paren, i.e. the math zone never opens. Both agents caught it
      //    only by decoding the file back and reading the bytes; this makes that
      //    check mechanical. Same family as the shell-heredoc backslash trap.
      if (/\\\\[()]/.test(s)) problems.push(`${f}: ${r.ref} DOUBLE-ESCAPED math delimiter (\\\\( or \\\\)) — zone will not open`);
      if (/\\\\sqrt|\\\\frac|\\\\triangle|\\\\angle/.test(s))
        problems.push(`${f}: ${r.ref} DOUBLE-ESCAPED LaTeX command — renders literally`);
    }
    console.log(`  ${f.padEnd(38)} ${rows.length} solution(s)`);
  }

  const missing = dump.filter((r) => !seen.has(r.ref)).map((r) => r.ref);
  if (missing.length) problems.push(`UNANSWERED (${missing.length}): ${missing.join(", ")}`);

  console.log(`\n${seen.size} of ${dump.length} dump rows answered.`);
  if (problems.length) {
    console.error(`\n${problems.length} PROBLEM(S):`);
    for (const p of problems) console.error(`  ✗ ${p}`);
    process.exit(1);
  }
  console.log("✓ pairing, coverage, LaTeX and unicode all clean.");
}

main();
