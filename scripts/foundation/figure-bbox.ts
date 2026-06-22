/**
 * Auto-generate data/<id>.figures.json (the bbox manifest attach-images reads)
 * for EMBEDDED-in-stem figure questions. Marker-based resolver: each raster
 * image-block on a page is assigned to the question-number word immediately
 * above it in the same column; the target question's image-block(s) on one page
 * are unioned and padded. Works only for figures stored as raster image objects
 * (the born-digital + converted worksheets render their graphs/diagrams that way).
 *
 *   npx tsx scripts/foundation/figure-bbox.ts <worksheetId> 18,20,29   # print
 *   npx tsx scripts/foundation/figure-bbox.ts <worksheetId> 18,20,29 --write
 *
 * --write writes data/<id>.figures.json. ALWAYS eyeball the crops afterward via
 * `attach-images.ts <id>` (dry-run). If a target Q prints "NONE" or crops wrong,
 * the figure is vector-drawn or split — hand-author that entry in figures.json
 * (or commit it text-only). Pass only EMBEDDED-figure qnums here; option-graph
 * questions (the figure IS the 4 options, split across a column/page) go
 * text-only and must NOT be listed.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { DATA, requireWorksheet } from "./config";

const PY = String.raw`
import fitz, re, json, sys
pdf = sys.argv[1]
targets = [int(x) for x in sys.argv[2].split(',') if x.strip()]
d = fitz.open(pdf)
MIDX = d[0].rect.width / 2
# marker may be a standalone word ("18.") OR glued to the next word in
# docx-converted PDFs ("9.In", "23.Two") — match the leading "<n>." when what
# follows is a non-digit or end (so a decimal like "1.5" is NOT a marker).
numdot = re.compile(r'^(\d+)\.(?=\D|$)')
num = re.compile(r'^(\d+)$')
markers, imgs = [], []
for p in range(len(d)):
    pg = d[p]
    for b in pg.get_text('dict')['blocks']:
        if b['type'] == 1:
            x0, y0, x1, y1 = b['bbox']
            imgs.append((p, 'L' if x0 < MIDX else 'R', fitz.Rect(x0, y0, x1, y1)))
    words = pg.get_text('words')
    for i, w in enumerate(words):
        x0, txt = w[0], w[4]
        col = 'L' if x0 < MIDX else 'R'
        colleft = 30 if col == 'L' else MIDX + 12
        if abs(x0 - colleft) > 14:
            continue
        q = None
        if numdot.match(txt):
            q = int(numdot.match(txt).group(1))
        elif num.match(txt) and i + 1 < len(words) and words[i + 1][4] == '.':
            q = int(txt)
        if q is not None and 1 <= q <= 200:
            markers.append((p, col, w[1], q))
def owner(p, col, y0):
    cand = [m for m in markers if m[0] == p and m[1] == col and m[2] <= y0 + 2]
    return max(cand, key=lambda m: m[2])[3] if cand else None
assign = {}
for (p, col, r) in imgs:
    assign.setdefault(owner(p, col, r.y0), []).append((p, r))
out = {}
for q in targets:
    parts = assign.get(q, [])
    if not parts:
        print('  Q%d: NONE (no image-block under its marker — vector/split? hand-author)' % q, file=sys.stderr)
        continue
    page = parts[0][0]
    rs = [r for (pp, r) in parts if pp == page]
    u = rs[0]
    for r in rs[1:]:
        u |= r
    P = 4
    out[str(q)] = {"page": page, "bbox": [round(u.x0 - P, 1), round(u.y0 - P, 1), round(u.x1 + P, 1), round(u.y1 + P, 1)]}
print(json.dumps(out, indent=2))
`;

function main() {
  const id = process.argv[2];
  const qnums = process.argv[3];
  const write = process.argv.includes("--write");
  const ws = requireWorksheet(id);
  if (!qnums) throw new Error("usage: figure-bbox.ts <worksheetId> <comma-qnums> [--write]");

  const res = spawnSync("python", ["-c", PY, ws.pdf, qnums], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.stderr) process.stderr.write(res.stderr);
  if (res.status !== 0) throw new Error(`bbox resolver failed`);
  const out = res.stdout.trim();
  console.log(out);
  if (write) {
    const path = join(DATA, `${id}.figures.json`);
    writeFileSync(path, out + "\n", "utf8");
    console.log(`\nwrote ${path}`);
  } else {
    console.log("\n[print-only] pass --write to save data/<id>.figures.json");
  }
}

main();
