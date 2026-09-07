/**
 * Standing probe: every chapter's `pdf` and `answersPdf` must exist on disk, and
 * every `answerPages` index must be inside that PDF.
 *
 *   npx tsx scripts/ncert/verify-paths.ts [idPrefix]
 *   npx tsx scripts/ncert/verify-paths.ts [idPrefix] --renders
 *
 * Exists because a wrong path does not fail until render time, and an out-of-range
 * answerPage does not fail at all — it renders fewer pages than asked and the
 * cross-check silently runs against a truncated key.
 *
 * `--renders` additionally reports whether out/<id>/ and out/_answers/<id>/ are
 * populated. RUN IT BEFORE DISPATCHING A WAVE. A missing ANSWER render is the
 * dangerous one and it is not hypothetical — Mechanical Properties of Fluids was
 * dispatched for its cross-check on 2026-09-07 with an empty _answers dir, because
 * the chapter pages had been rendered in a batch that omitted `--answers`. Nothing
 * fails loudly in that state: the cross-check agent simply sees no key and reports
 * a chapter of NO-KEY-ENTRY, which is indistinguishable from a key that genuinely
 * skips those questions. Renders live under out/ and are gitignored, so this is a
 * per-machine check, not a repo invariant.
 */
import { existsSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { CHAPTERS, OUT } from "./config";
import { join } from "node:path";

const checkRenders = process.argv.includes("--renders");
const prefix = process.argv[2]?.startsWith("--") ? "" : (process.argv[2] ?? "");

/** How many p-*.png / ak-*.png a chapter currently has rendered (0 if the dir is absent). */
function renderCounts(id: string): { pages: number; answers: number } {
  const count = (dir: string, pre: string) => {
    try {
      return readdirSync(dir).filter((f) => f.startsWith(pre) && f.endsWith(".png")).length;
    } catch {
      return 0;
    }
  };
  return {
    pages: count(join(OUT, id), "p-"),
    answers: count(join(OUT, "_answers", id), "ak-"),
  };
}
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
  // Render state is reported separately from config problems: a chapter that has
  // simply not been rendered yet is not a FAIL, but dispatching a cross-check
  // against a missing answer render silently reads no key at all.
  let renderNote = "";
  if (checkRenders) {
    const r = renderCounts(c.id);
    if (r.pages === 0) problems.push("NO PAGE RENDER — run render.ts before transcribing");
    if (c.answersPdf && r.answers === 0) {
      problems.push("NO ANSWER RENDER — run render.ts --answers; a cross-check dispatched now would see NO key and report a chapter of false NO-KEY-ENTRY");
    }
    renderNote = `  rendered ${r.pages}pp/${r.answers}ak`;
  }

  const pdfPages = counts[c.pdf] ?? -1;
  if (problems.length) {
    bad++;
    console.log(`FAIL ${c.id}`);
    for (const p of problems) console.log(`       ${p}`);
  } else {
    console.log(`ok   ${c.id.padEnd(26)} ${String(pdfPages).padStart(3)}pp  ak=[${(c.answerPages ?? []).join(",")}]  ${c.subtopics.length} subtopics${renderNote}`);
  }
}
console.log(`\n${rows.length} chapter(s) checked, ${bad} failing.`);
if (bad) process.exit(1);
