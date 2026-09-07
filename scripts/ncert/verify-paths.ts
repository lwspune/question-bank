/**
 * Standing probe: every chapter's `pdf` and `answersPdf` must exist on disk, and
 * every `answerPages` index must be inside that PDF.
 *
 *   npx tsx scripts/ncert/verify-paths.ts [idPrefix]
 *
 * Exists because a wrong path does not fail until render time, and an out-of-range
 * answerPage does not fail at all — it renders fewer pages than asked and the
 * cross-check silently runs against a truncated key.
 */
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { CHAPTERS } from "./config";

const prefix = process.argv[2] ?? "";
const rows = Object.values(CHAPTERS).filter((c) => c.id.startsWith(prefix));
let bad = 0;

// one python call for all page counts (opening a PDF per chapter from node is slower)
const paths = [...new Set(rows.flatMap((c) => [c.pdf, c.answersPdf].filter(Boolean) as string[]))];
const py = `
import fitz, json, sys
out = {}
for p in json.loads(sys.argv[1]):
    try: out[p] = fitz.open(p).page_count
    except Exception as e: out[p] = -1
print(json.dumps(out))
`;
const res = spawnSync("python", ["-c", py, JSON.stringify(paths)], { encoding: "utf8" });
if (res.status !== 0) throw new Error(res.stderr);
const counts: Record<string, number> = JSON.parse(res.stdout);

for (const c of rows) {
  const problems: string[] = [];
  if (!existsSync(c.pdf)) problems.push(`pdf MISSING: ${c.pdf}`);
  else if (counts[c.pdf] < 0) problems.push(`pdf UNREADABLE: ${c.pdf}`);
  if (c.answersPdf) {
    if (!existsSync(c.answersPdf)) problems.push(`answersPdf MISSING: ${c.answersPdf}`);
    else {
      const n = counts[c.answersPdf];
      for (const p of c.answerPages ?? []) {
        if (p < 0 || p >= n) problems.push(`answerPage ${p} out of range (answersPdf has ${n} pages)`);
      }
    }
  } else if (c.answerPages?.length) {
    problems.push("answerPages set but no answersPdf");
  }
  const pdfPages = counts[c.pdf] ?? -1;
  if (problems.length) {
    bad++;
    console.log(`FAIL ${c.id}`);
    for (const p of problems) console.log(`       ${p}`);
  } else {
    console.log(`ok   ${c.id.padEnd(26)} ${String(pdfPages).padStart(3)}pp  ak=[${(c.answerPages ?? []).join(",")}]  ${c.subtopics.length} subtopics`);
  }
}
console.log(`\n${rows.length} chapter(s) checked, ${bad} failing.`);
if (bad) process.exit(1);
