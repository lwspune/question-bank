/**
 * Rasterise a State Board textbook chapter's pages to per-page PNGs for VISION
 * transcription (truth-table solutions + figures that the text layer mangles).
 * The textbook is single-column, so we render full pages at high DPI.
 *
 *   npx tsx scripts/mh-sb-11/render.ts <chapterId>              # chapter pages
 *   npx tsx scripts/mh-sb-11/render.ts <chapterId> --answers    # the ANSWERS block
 *
 * Writes out/<id>/p-<page>.png. PNGs are gitignored; the transcription JSON in
 * data/ is the committed source of truth.
 *
 * `--answers` renders this chapter's block of the WHOLE-BOOK answers section
 * (`answersPdf` + `answerPages` in config.ts) into **out/_answers/<id>/**, a
 * SIBLING of out/<id>/ rather than a child. That placement is load-bearing: the
 * chapter render below `rmSync`s out/<id>/, so answer pages written inside it
 * are destroyed by the next `render.ts <id>` — and worse, that same rmSync would
 * pull the page images out from under any in-flight transcription agent. Keeping
 * the two trees apart makes the scripts order-independent instead of requiring a
 * remembered order. (Same trap `dump-text.ts` hit in the mh-sb-9 pipeline.)
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, requireChapter } from "./config";

const PY = `
import fitz, json, sys
ch = json.loads(sys.argv[1]); outdir = sys.argv[2]; mode = sys.argv[3]
if mode == "answers":
    src, pages, prefix = ch["answersPdf"], ch["answerPages"], "ans-"
else:
    src, pages, prefix = ch["pdf"], ch.get("pages"), "p-"
d = fitz.open(src)
pages = pages or list(range(len(d)))
ZOOM = 3.0
n = 0
for p in pages:
    pix = d[p].get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM))
    pix.save(outdir + "/" + prefix + str(p).zfill(2) + ".png"); n += 1
d.close(); print("rendered", n, "pages")
`;

function render(id: string, answers: boolean) {
  const ch = requireChapter(id) as Record<string, unknown>;

  if (answers) {
    // Fail loudly and specifically: a chapter with no answers block configured
    // is a real state (the humanities books ship none), and silently rendering
    // zero pages would read as success.
    if (!ch.answersPdf || !ch.answerPages) {
      throw new Error(
        `${id}: no answersPdf/answerPages in config.ts. Both Class-11 volumes DO carry an ` +
          `ANSWERS section (Part 1 idx 225-241, Part 2 idx 205-221), so this is a missing ` +
          `config entry, not a book without a key — find the chapter's block and add it.`
      );
    }
  }

  // Only the chapter render clears its directory; the answers tree is additive,
  // so re-rendering one chapter's key cannot disturb another's.
  const dir = answers ? join(OUT, "_answers", id) : join(OUT, id);
  if (!answers) rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  mkdirSync(OUT, { recursive: true });
  const pyFile = join(OUT, `_render_${id}.py`);
  writeFileSync(pyFile, PY);
  const res = spawnSync("python", [pyFile, JSON.stringify(ch), dir, answers ? "answers" : "chapter"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (res.status !== 0) throw new Error(`render failed: ${res.stderr}`);
  console.log(res.stdout.trim());
  console.log(`PNGs in ${dir}`);
}

const id = process.argv[2];
if (!id || id.startsWith("--")) {
  console.error("usage: tsx scripts/mh-sb-11/render.ts <chapterId> [--answers]");
  process.exit(1);
}
render(id, process.argv.includes("--answers"));
