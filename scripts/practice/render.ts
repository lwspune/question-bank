/**
 * Rasterise a practice topic's question + solution pages to PNGs for VISION
 * transcription. The book's text layer drops set/relational operators and
 * collapses superscripts in a two-column layout, so we transcribe from images,
 * not text. Answer letters come from the text layer (clean) — not rendered.
 *
 *   npx tsx scripts/practice/render.ts <topicId>
 *
 * Writes out/<topicId>/q-<pdfpage>.png and out/<topicId>/s-<pdfpage>.png at
 * ~2.2x scale. Requires Python + PyMuPDF (fitz), already used by the JEE/audit
 * tooling. The PNGs are gitignored; the transcription JSON in data/ is committed.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, requireTopic } from "./config";

function render(topicId: string) {
  const topic = requireTopic(topicId);
  // render.ts is the vision pipeline; a clean-text topic (no questionPages/
  // solutionPages) is transcribed directly and never rendered.
  if (!topic.questionPages || !topic.solutionPages) {
    throw new Error(`topic "${topicId}" has no questionPages/solutionPages — it is a clean-text topic (transcribe directly into data/, no render step).`);
  }
  const questionPages = topic.questionPages;
  const solutionPages = topic.solutionPages;
  const dir = join(OUT, topicId);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const jobs = [
    ...questionPages.pages.map((p) => ({ pdf: questionPages.pdf, page: p, prefix: "q" })),
    ...solutionPages.pages.map((p) => ({ pdf: solutionPages.pdf, page: p, prefix: "s" })),
  ];

  // The book is two-column. We render each column separately at high DPI so the
  // math (superscripts, fractions, set symbols) is large and unambiguous when a
  // vision model reads it — full-page renders shrink the fine notation.
  const py = `
import fitz, json, sys
jobs = json.loads(sys.argv[1])
outdir = sys.argv[2]
ZOOM = 3.4
PAD = 14  # pt overlap so a glyph straddling the gutter isn't clipped
n = 0
for j in jobs:
    d = fitz.open(j["pdf"])
    pg = d[j["page"]]
    w, h = pg.rect.width, pg.rect.height
    mid = w / 2
    cols = {"L": fitz.Rect(0, 0, mid + PAD, h), "R": fitz.Rect(mid - PAD, 0, w, h)}
    for col, clip in cols.items():
        pix = pg.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), clip=clip)
        pix.save(outdir + "/" + j["prefix"] + "-" + str(j["page"]).zfill(2) + col + ".png")
        n += 1
    d.close()
print("rendered", n, "column images")
`;
  const pyFile = join(OUT, `_render_${topicId}.py`);
  mkdirSync(OUT, { recursive: true });
  writeFileSync(pyFile, py);
  const res = spawnSync("python", [pyFile, JSON.stringify(jobs), dir], { encoding: "utf8" });
  rmSync(pyFile, { force: true });
  if (res.status !== 0) {
    console.error(res.stderr || res.stdout);
    throw new Error("render failed");
  }
  console.log(res.stdout.trim());
  console.log(`PNGs in ${dir}`);
  console.log(`Questions: q-*.png (pages ${questionPages.pages.join(",")}) — transcribe Q${topic.qFrom}-${topic.qTo}`);
  console.log(`Solutions: s-*.png (pages ${solutionPages.pages.join(",")})`);
}

render(process.argv[2]);
