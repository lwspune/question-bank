/**
 * Rasterise a State Board textbook chapter's pages to per-page PNGs for VISION
 * transcription (truth-table solutions + figures that the text layer mangles).
 * The textbook is single-column, so we render full pages at high DPI.
 *
 *   npx tsx scripts/mh-sb-9/render.ts <chapterId>
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
  if (answers && !ch.answersPdf) {
    throw new Error(
      `chapter "${id}" has no answersPdf. For 10th_Hist_SB.pdf that is a FACT ABOUT ` +
        `THE BOOK (it prints no answers section at all), not an oversight — do not add one.`
    );
  }
  // Answer pages go to a SIBLING dir, never inside out/<id>/: the rmSync below
  // wipes that directory, so a shared parent would silently destroy one of the
  // two renders depending on which script ran last.
  const dir = answers ? join(OUT, "_answers", id) : join(OUT, id);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const py = `
import fitz, json, sys
ch = json.loads(sys.argv[1]); outdir = sys.argv[2]; answers = sys.argv[3] == "1"
d = fitz.open(ch["answersPdf"] if answers else ch["pdf"])
pages = (ch.get("answerPages") if answers else ch.get("pages")) or list(range(len(d)))
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
  const res = spawnSync("python", [pyFile, JSON.stringify(ch), dir, answers ? "1" : "0"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`render failed: ${res.stderr}`);
  console.log(res.stdout.trim());
  console.log(`PNGs in ${dir}`);
}

const id = process.argv[2];
const answers = process.argv.includes("--answers");
if (!id) {
  console.error("usage: tsx scripts/mh-ssc-10-text/render.ts <chapterId> [--answers]");
  process.exit(1);
}
render(id, answers);
