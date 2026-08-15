/**
 * Rasterise a State Board textbook chapter's pages to per-page PNGs for VISION
 * transcription (truth-table solutions + figures that the text layer mangles).
 * The textbook is single-column, so we render full pages at high DPI.
 *
 *   npx tsx scripts/mh-sb-9/render.ts <chapterId>              # the chapter's pages
 *   npx tsx scripts/mh-sb-9/render.ts <chapterId> --answers    # its ANSWERS block
 *
 * Writes out/<id>/p-<page>.png. PNGs are gitignored; the transcription JSON in
 * data/ is the committed source of truth.
 *
 * `--answers` rasterises `answerPages` (the chapter's block inside the book's
 * end-of-book ANSWERS section) for the step-6 cross-check. It writes to
 * out/_answers/<id>/ — a SIBLING of out/<id>/, NOT a subdirectory, because this
 * script rmSync's out/<id>/ on every run and would otherwise delete the answer
 * renders the moment anyone re-rendered the chapter.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, requireChapter } from "./config";

function render(id: string, answers: boolean) {
  const ch = requireChapter(id);
  if (answers && !(ch.answersPdf && ch.answerPages?.length)) {
    throw new Error(
      `${id} has no answersPdf/answerPages. For the History/PolSci + Geography chapters that is DELIBERATE — ` +
        `that book ships no answers section at all (see config.ts), so the step-6 cross-check cannot run.`
    );
  }
  const dir = answers ? join(OUT, "_answers", id) : join(OUT, id);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const target = answers ? { ...ch, pdf: ch.answersPdf, pages: ch.answerPages } : ch;

  const py = `
import fitz, json, sys
ch = json.loads(sys.argv[1]); outdir = sys.argv[2]
d = fitz.open(ch["pdf"])
pages = ch.get("pages") or list(range(len(d)))
ZOOM = 3.0
n = 0
for p in pages:
    pix = d[p].get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM))
    pix.save(outdir + "/p-" + str(p).zfill(2) + ".png"); n += 1
d.close(); print("rendered", n, "pages")
`;
  mkdirSync(OUT, { recursive: true });
  const pyFile = join(OUT, `_render_${id}.py`);
  writeFileSync(pyFile, py);
  const res = spawnSync("python", [pyFile, JSON.stringify(target), dir], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`render failed: ${res.stderr}`);
  console.log(res.stdout.trim());
  console.log(`PNGs in ${dir}`);
}

const id = process.argv[2];
if (!id) {
  console.error("usage: tsx scripts/mh-sb-9/render.ts <chapterId> [--answers]");
  process.exit(1);
}
render(id, process.argv.includes("--answers"));
