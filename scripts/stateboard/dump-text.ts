/**
 * Dump a chapter's PDF TEXT LAYER, page by page, for text-first transcription.
 *
 *   npx tsx scripts/stateboard/dump-text.ts <chapterId>
 *
 * Ported from scripts/mh-sb-9/dump-text.ts for the GEOGRAPHY lane (2026-09-24).
 *
 * WHY THIS EXISTS, AND WHY THE MATHS / PHYSICS / CHEMISTRY CHAPTERS MUST NOT USE IT.
 * Those three books are vision-only, and config.ts documents exactly why: the
 * Physics text layer renders Greek in Symbol font (so `S/4` IS `pi/4` and reads
 * as well-formed algebra in a variable S), and the Chemistry layer has ZERO
 * subscripts and ZERO charge signs across 648 pages (so `SO4^2-` silently loses
 * its charge). Both corruptions are PLAUSIBLE, which is what makes them lethal.
 *
 * Geography is the opposite case and the reason this script is here: it is clean
 * running PROSE with no mathematical notation at all, so its text layer is
 * trustworthy ground truth for stems, options and the chapter narrative. Use the
 * rendered PNGs (render.ts) to settle LAYOUT only: reading order, which lines
 * belong to which numbered item, tables, and figures.
 *
 * The caveat this dump makes VISIBLE rather than hides: these exercise pages are
 * two-column, and the text layer serialises them by block, not by column. On
 * Ch.7 both `Q.1)` and `Q.3)` sit at y=183.8 — left and right column of the same
 * page. So a single printed question can arrive as several non-adjacent lines,
 * and whole questions arrive out of printed order. Never infer question
 * boundaries or ordering from the dump alone; check the page image.
 *
 * Deliberately NOT ported: the Class-9 script printed a "printed pN" label
 * computed as `page index - 9`. That offset is a property of THAT book's front
 * matter. These chapter PDFs are pre-split and each starts at a different
 * printed page, so any single offset would be wrong for seven of the eight
 * chapters. The printed number is legible in the page text itself (it is the
 * first line), so emitting a fabricated one buys nothing and can mislead.
 *
 * Writes out/<id>.text.md (gitignored, like the PNGs). data/ stays the committed
 * source of truth.
 *
 * NOTE the output path is out/<id>.text.md and NOT out/<id>/text.md, deliberately:
 * render.ts rmSync's the whole out/<id>/ directory before it rasterises, so a dump
 * written inside it silently vanishes the next time anyone re-renders. Keeping the
 * dump a sibling of that directory makes the two scripts order-independent.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, requireChapter } from "./config";

function dump(id: string) {
  const ch = requireChapter(id);
  mkdirSync(OUT, { recursive: true });

  const py = `
import fitz, json, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
ch = json.loads(sys.argv[1]); out = sys.argv[2]
d = fitz.open(ch["pdf"])
pages = ch.get("pages") or list(range(len(d)))
parts = []
for p in pages:
    parts.append("\\n\\n===== PDF page index " + str(p) + " =====\\n")
    parts.append(d[p].get_text())
d.close()
open(out, "w", encoding="utf-8").write("".join(parts))
print("dumped", len(pages), "pages ->", out)
`;
  const pyFile = join(OUT, `_dumptext_${id}.py`);
  writeFileSync(pyFile, py);
  const target = join(OUT, `${id}.text.md`);
  const res = spawnSync("python", [pyFile, JSON.stringify(ch), target], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (res.status !== 0) throw new Error(`dump-text failed: ${res.stderr}`);
  console.log(res.stdout.trim());
}

const id = process.argv[2];
if (!id) {
  console.error("usage: tsx scripts/stateboard/dump-text.ts <chapterId>");
  process.exit(1);
}
dump(id);
