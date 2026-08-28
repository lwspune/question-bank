/**
 * Dump a chapter's PDF TEXT LAYER, page by page, for text-first transcription.
 *
 *   npx tsx scripts/mh-sb-9/dump-text.ts <chapterId>
 *
 * Why this exists (and why the Maths chapters don't use it): the History /
 * Political Science book is clean running PROSE with no mathematical notation, so
 * its text layer is trustworthy ground truth for stems, options and the chapter
 * narrative — the opposite of the Maths books, whose unicode math (∈ ∪ ∩ √ ∴)
 * flattens to `�` and forces vision. Transcribe from this dump, and use the
 * rendered PNGs (render.ts) to settle LAYOUT only: reading order, which lines
 * belong to which numbered item, tables, and figures.
 *
 * Caveat the dump makes visible rather than hides: the two-column layout
 * interleaves an inline activity box mid-question, and long labels wrap, so a
 * single printed question can arrive as several non-adjacent lines. Never infer
 * question boundaries from line breaks alone — check the page image.
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
    parts.append("\\n\\n===== PDF page index " + str(p) + " (printed p" + str(p - ch.get("printedOffset", 9)) + ") =====\\n")
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
  console.error("usage: tsx scripts/mh-sb-9/dump-text.ts <chapterId>");
  process.exit(1);
}
dump(id);
