/**
 * Derive leak-safe figure bboxes for named Foundation questions via the shared
 * snapCrop core, and render each result for the MANDATORY visual check.
 *
 *   npx tsx scripts/foundation/snap-crop.ts <worksheetId>:<qnum>[,<qnum>...] [...]
 *   npx tsx scripts/foundation/snap-crop.ts light-1:4,28 human-eye-1:54 --write
 *
 * WHY snapCrop RATHER THAN A PAD. `figure-bbox.ts` unions a question's raster
 * blocks and pads the union by 4pt. Four points is about a third of a line, so
 * wherever a diagram sits tight under its stem the pad reaches into the
 * neighbouring text — measured across this corpus, 134 of 283 crops carried
 * readable foreign text, several of them an option or a numbered answer
 * statement. snapCrop takes coarse anchors and tightens to the page ink instead,
 * and its `answerY` guard refuses a bbox that reaches into the answer block.
 *
 * WHAT THIS FILE ADDS: the anchors. `answerY` is the one input geometry cannot
 * infer, so it is read off the page text here — the y of the first option line
 * (or the next question's stem) below this question's own stem. Everything
 * after that is the shared core.
 *
 * THE VERIFY IS NOT OPTIONAL, and `ok` is not evidence. Per
 * scripts/lib/figures/README.md, `ok` means "your anchors sat in whitespace",
 * never "the crop contains the whole figure" — snapCrop bounds only pixels
 * darker than 165 grey, so pale line art is invisible to it and gets clipped
 * with `ok` still reported. This script therefore always writes a PNG per
 * figure and prints its path. LOOK AT EVERY ONE.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { DATA, OUT, requireWorksheet } from "./config";

const SNAP = join(__dirname, "..", "lib", "figures", "snapcrop.py");

/** Read the page and propose (col0, col1, top, bottom, answerY) for a question. */
const ANCHOR_PY = String.raw`
import fitz, json, sys, re
pdf, qnum = sys.argv[1], sys.argv[2]
doc = fitz.open(pdf)
stem_re = re.compile(r'^' + re.escape(qnum) + r'\.(?=\D|$)')
opt_re  = re.compile(r'^\(?[a-dA-D][\).]')
nxt_re  = re.compile(r'^(\d+)\.(?=\D|$)')

best = None
for pno in range(len(doc)):
    page = doc[pno]
    mid = page.rect.width / 2
    spans = []
    for b in page.get_text("dict")["blocks"]:
        if b.get("type") == 1:
            continue
        for l in b.get("lines", []):
            for s in l.get("spans", []):
                t = s["text"].strip()
                if t:
                    spans.append((fitz.Rect(s["bbox"]), t))
    spans.sort(key=lambda p: (p[0].y0, p[0].x0))
    for i, (r, t) in enumerate(spans):
        if not stem_re.match(t):
            continue
        col = 0 if r.x0 < mid else 1
        col0, col1 = (0, mid) if col == 0 else (mid, page.rect.width)
        # answerY: the first option marker, or the next question's number,
        # whichever comes first BELOW this stem in the same column.
        answer_y = None
        for r2, t2 in spans[i + 1:]:
            same_col = (r2.x0 < mid) == (col == 0)
            if not same_col or r2.y0 <= r.y0:
                continue
            m = nxt_re.match(t2)
            if opt_re.match(t2) or (m and m.group(1) != qnum):
                answer_y = r2.y0
                break
        if answer_y is None:
            answer_y = page.rect.height - 20

        # top must clear the WHOLE stem, not just its first line. A stem wraps
        # over two or three lines and the figure sits under the last of them, so
        # anchoring to the first line leaves the tail inside the crop (measured:
        # human-eye-1 Q54 kept "causes of this defect?" above the eye diagram).
        # Walk down while lines stay contiguous; the first real vertical gap is
        # where the prose stops and the figure starts.
        stem_bottom = r.y1
        for r2, t2 in spans[i + 1:]:
            same_col = (r2.x0 < mid) == (col == 0)
            if not same_col or r2.y0 < r.y0:
                continue
            if r2.y0 >= answer_y - 1:
                break
            if r2.y0 - stem_bottom > 6:   # a gap wider than line spacing
                break
            stem_bottom = max(stem_bottom, r2.y1)

        best = {
            "page1": pno + 1, "page0": pno,
            "col0": round(col0 + 2, 1), "col1": round(col1 - 2, 1),
            "top": round(stem_bottom + 1.5, 1),
            "bottom": round(answer_y - 1, 1),
            "answerY": round(answer_y, 1),
            "pw": round(page.rect.width, 2), "ph": round(page.rect.height, 2),
            "stem": t[:70],
        }
        break
    if best:
        break
print(json.dumps(best))
`;

type Anchors = {
  page1: number; page0: number; col0: number; col1: number;
  top: number; bottom: number; answerY: number;
  pw: number; ph: number; stem: string;
};

function anchors(pdf: string, qnum: string): Anchors | null {
  const r = spawnSync("python", ["-c", ANCHOR_PY, pdf, qnum], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`anchors: ${r.stderr || r.stdout}`);
  return JSON.parse(r.stdout.trim() || "null");
}

/** snapCrop speaks PAGE FRACTIONS, not points — its anchors AND its returned
 *  bbox are 0..1 (see its docstring: "col [fx0,fx1]", "top yfrac"). The manifest
 *  stores points, so convert on the way in and back on the way out. Passing
 *  points straight through puts every anchor off the page and snapCrop raises
 *  "anchors point at blank page". */
function snap(pdf: string, a: Anchors) {
  const fx = (v: number) => (v / a.pw).toFixed(5);
  const fy = (v: number) => (v / a.ph).toFixed(5);
  const args = [SNAP, pdf, String(a.page1), fx(a.col0), fx(a.col1), fy(a.top), fy(a.bottom), fy(a.answerY)];
  const r = spawnSync("python", args, { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`snapcrop: ${r.stderr || r.stdout}`);
  const out = JSON.parse(r.stdout.trim().split("\n").pop()!) as { bbox: number[]; warnings: string[]; ok: boolean };
  const b = out.bbox;
  const pts = [b[0] * a.pw, b[1] * a.ph, b[2] * a.pw, b[3] * a.ph];

  // BREATHING ROOM, bounded by the anchors. snapCrop bounds the ink and adds
  // only ~0.4% of the page back, which on this corpus shaves the outermost arc
  // of a curve: human-eye-1 Q54's eyeball closed at y=248.8 and snapCrop cut at
  // 247.9. Grow each edge back up to 1.5pt, but never past an anchor — `top`
  // sits under the stem and `answerY` is the hard leak ceiling, so staying
  // inside them cannot re-admit text.
  const GROW = 1.5;
  return {
    ...out,
    bbox: [
      Math.max(pts[0] - GROW, a.col0),
      Math.max(pts[1] - GROW, a.top),
      Math.min(pts[2] + GROW, a.col1),
      Math.min(pts[3] + GROW, a.answerY - 0.2),
    ],
  };
}

function render(pdf: string, page0: number, bbox: number[], out: string) {
  const py = `
import fitz, sys
d = fitz.open(sys.argv[1])
pg = d[int(sys.argv[2])]
clip = fitz.Rect(*[float(v) for v in sys.argv[3:7]])
pg.get_pixmap(matrix=fitz.Matrix(4, 4), clip=clip).save(sys.argv[7])
`;
  const r = spawnSync("python", ["-c", py, pdf, String(page0), ...bbox.map(String), out], { encoding: "utf8" });
  if (r.status !== 0) throw new Error(`render: ${r.stderr}`);
}

function main() {
  const write = process.argv.includes("--write");
  const specs = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  if (!specs.length) throw new Error("usage: snap-crop.ts <worksheetId>:<qnum>[,<qnum>] [...] [--write]");

  const dir = join(OUT, "snap");
  mkdirSync(dir, { recursive: true });

  for (const spec of specs) {
    const [id, list] = spec.split(":");
    const ws = requireWorksheet(id);
    const manifestPath = join(DATA, `${id}.figures.json`);
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Record<string, { page: number; bbox: number[] }>;

    for (const qnum of (list ?? "").split(",").filter(Boolean)) {
      const a = anchors(ws.pdf, qnum);
      if (!a) { console.log(`${id} Q${qnum}: stem not found on any page — skipping`); continue; }
      const res = snap(ws.pdf, a);
      const png = join(dir, `${id}-q${qnum}.png`);
      render(ws.pdf, a.page0, res.bbox, png);

      const was = manifest[qnum]?.bbox;
      console.log(`\n${id} Q${qnum}  page ${a.page0}  ${res.ok ? "ok" : "WARN"}`);
      console.log(`  stem     ${JSON.stringify(a.stem)}`);
      console.log(`  answerY  ${a.answerY}   (crop must end above this)`);
      console.log(`  was      ${was ? JSON.stringify(was) : "(absent)"}`);
      console.log(`  now      ${JSON.stringify(res.bbox.map((v) => Math.round(v * 10) / 10))}`);
      if (res.warnings?.length) console.log(`  warnings ${res.warnings.join("; ")}`);
      console.log(`  LOOK AT  ${png}`);

      if (write) {
        manifest[qnum] = { page: a.page0, bbox: res.bbox.map((v) => Math.round(v * 10) / 10) as any };
        writeFileSync(manifestPath, JSON.stringify(
          Object.fromEntries(Object.keys(manifest).sort((x, y) => Number(x) - Number(y)).map((k) => [k, manifest[k]])),
          null, 1), "utf8");
      }
    }
  }
  if (!write) console.log(`\n[print-only] pass --write to update the manifests.`);
  console.log(`\nok means your anchors sat in whitespace — NOT that the crop is complete.`);
  console.log(`snapCrop cannot see art lighter than 165 grey. Look at every PNG above.`);
}

main();
