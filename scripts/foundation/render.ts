/**
 * Rasterise a Foundation worksheet's pages to per-column PNGs for VISION
 * transcription (the worksheets are 2-column with lossy chem subscripts —
 * full-page renders shrink the notation). Mirrors scripts/practice/render.ts.
 *
 *   npx tsx scripts/foundation/render.ts <worksheetId>
 *
 * Writes out/<id>/p-<page><col>.png at high DPI. PNGs are gitignored; the
 * transcription JSON in data/ is the committed source of truth.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, requireWorksheet } from "./config";

function render(id: string) {
  const ws = requireWorksheet(id);
  const dir = join(OUT, id);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const py = `
import fitz, json, sys
ws = json.loads(sys.argv[1]); outdir = sys.argv[2]
d = fitz.open(ws["pdf"])
pages = ws.get("pages") or list(range(len(d)))
ZOOM = 3.2
PAD = 16  # pt overlap so a glyph straddling the gutter isn't clipped
n = 0
for p in pages:
    pg = d[p]; w, h = pg.rect.width, pg.rect.height; mid = w / 2
    cols = {"L": fitz.Rect(0, 0, mid + PAD, h), "R": fitz.Rect(mid - PAD, 0, w, h)}
    for col, clip in cols.items():
        pix = pg.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), clip=clip)
        pix.save(outdir + "/p-" + str(p).zfill(2) + col + ".png"); n += 1
d.close(); print("rendered", n, "column images from", len(pages), "pages")
`;
  mkdirSync(OUT, { recursive: true });
  const pyFile = join(OUT, `_render_${id}.py`);
  writeFileSync(pyFile, py);
  const res = spawnSync("python", [pyFile, JSON.stringify(ws), dir], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`render failed: ${res.stderr}`);
  console.log(res.stdout.trim());
  console.log(`PNGs in ${dir}`);
}

const id = process.argv[2];
if (!id) {
  console.error("usage: tsx scripts/foundation/render.ts <worksheetId>");
  process.exit(1);
}
render(id);
