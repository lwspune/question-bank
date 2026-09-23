/**
 * Crop fractional bboxes out of a PDF page and write them as web-ready images.
 * Shared by every figure pipeline — see [[probe-scoped-to-whoever-looked]] for
 * why this lives here rather than inside the folder of whoever wrote it first.
 */
import { mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { MAX_SIZE_BYTES } from "../../../src/lib/storage/images";

export type FigSpec = { page: number; bbox: [number, number, number, number] };

/** Crop each fractional bbox via PyMuPDF; returns {ref: imagePath}. Size-aware. */
export function cropFigures(pdf: string, figs: Record<string, FigSpec>, dir: string): Record<string, string> {
  mkdirSync(dir, { recursive: true });
  // 4x is right for a small line-art diagram (a Venn diagram, a flowchart), but
  // the Geography chapters crop NEAR-FULL-PAGE colour maps and photographs — the
  // Exogenetic-2 landform panorama lands at 7.2 MB against the 1 MB storage cap
  // (MAX_SIZE_BYTES in src/lib/storage/images) and the upload simply throws. So
  // step the render scale down until the PNG fits, then fall back to JPEG (also
  // an ALLOWED_MIME) when even a modest scale won't compress — a printed
  // photograph is already lossy, so JPEG costs nothing real and stays legible.
  // Small figures still take the 4x PNG path on the first try, unchanged.
  // Ported from scripts/mh-ssc-10/attach-images.ts, which hit this first.
  const py = `
import fitz, json, sys, re, io
from PIL import Image
pdf, figs, outdir, budget = sys.argv[1], json.loads(sys.argv[2]), sys.argv[3], int(sys.argv[4])
d = fitz.open(pdf); out = {}
for ref, spec in figs.items():
    pg = d[spec["page"]]; w, h = pg.rect.width, pg.rect.height
    fx0, fy0, fx1, fy1 = spec["bbox"]
    clip = fitz.Rect(fx0*w, fy0*h, fx1*w, fy1*h)
    slug = re.sub(r'[^A-Za-z0-9]+', '_', ref).strip('_')
    chosen = None
    for scale in (4, 3, 2.5, 2):
        pix = pg.get_pixmap(matrix=fitz.Matrix(scale, scale), clip=clip)
        data = pix.tobytes("png")
        if len(data) <= budget:
            p = outdir + "/fig-" + slug + ".png"
            open(p, "wb").write(data); chosen = (p, scale, "png", len(data)); break
    if chosen is None:
        pix = pg.get_pixmap(matrix=fitz.Matrix(3, 3), clip=clip)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        for q in (88, 80, 70, 60):
            buf = io.BytesIO(); img.save(buf, "JPEG", quality=q, optimize=True)
            if buf.tell() <= budget or q == 60:
                p = outdir + "/fig-" + slug + ".jpg"
                open(p, "wb").write(buf.getvalue()); chosen = (p, 3, "jpeg q%d" % q, buf.tell()); break
    p, scale, fmt, size = chosen
    print("  %-14s %sx %-9s %6d KB" % (ref, scale, fmt, size // 1024), file=sys.stderr)
    out[ref] = p
print(json.dumps(out))
`;
  const budget = Math.floor(MAX_SIZE_BYTES * 0.95); // headroom under the hard cap
  const res = spawnSync("python", ["-c", py, pdf, JSON.stringify(figs), dir, String(budget)], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
  });
  if (res.status !== 0) throw new Error(`crop failed: ${res.stderr}`);
  if (res.stderr.trim()) console.log(res.stderr.trimEnd());
  return JSON.parse(res.stdout.trim().split("\n").pop()!);
}

