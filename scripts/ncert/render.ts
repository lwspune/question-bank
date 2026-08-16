/**
 * Rasterise a State Board textbook chapter's pages to per-page PNGs for VISION
 * transcription (truth-table solutions + figures that the text layer mangles).
 * The textbook is single-column, so we render full pages at high DPI.
 *
 *   npx tsx scripts/ncert/render.ts <chapterId>
 *
 * Writes out/<id>/p-<page>.png. PNGs are gitignored; the transcription JSON in
 * data/ is the committed source of truth.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, requireChapter } from "./config";

function render(id: string, answers: boolean) {
  const ch = requireChapter(id);
  // The ANSWERS render goes to out/_answers/<id>/, a SIBLING of out/<id>, because
  // the chapter render rmSync's out/<id> — writing the answer pages inside it would
  // destroy them on the next chapter re-render (and pull the page images out from
  // under an in-flight transcription agent). Only the chapter render clears its dir.
  const dir = answers ? join(OUT, "_answers", id) : join(OUT, id);
  if (answers) {
    if (!ch.answersPdf) throw new Error(`chapter "${id}" has no answersPdf — nothing to render`);
    if (!ch.answerPages?.length) throw new Error(`chapter "${id}" has no answerPages range in config.ts`);
    mkdirSync(dir, { recursive: true }); // additive: never clears
  } else {
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
  }

  const py = answers
    ? `
import fitz, json, sys
ch = json.loads(sys.argv[1]); outdir = sys.argv[2]
d = fitz.open(ch["answersPdf"])
ZOOM = 3.0
n = 0
for p in ch["answerPages"]:
    pix = d[p].get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM))
    pix.save(outdir + "/ak-" + str(p).zfill(2) + ".png"); n += 1
d.close(); print("rendered", n, "answer-key pages")
`
    : `
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
  const res = spawnSync("python", [pyFile, JSON.stringify(ch), dir], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`render failed: ${res.stderr}`);
  console.log(res.stdout.trim());
  console.log(`PNGs in ${dir}`);
}

const id = process.argv[2];
if (!id) {
  console.error("usage: tsx scripts/ncert/render.ts <chapterId> [--answers]");
  process.exit(1);
}
render(id, process.argv.includes("--answers"));
