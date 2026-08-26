/**
 * Contact sheet: every cropped figure of a worksheet rendered into ONE labelled
 * montage PNG, so a human can eyeball all of them at once instead of opening
 * twenty separate files.
 *
 *   npx tsx scripts/foundation/contact-sheet.ts <worksheetId> [<worksheetId> ...]
 *   npx tsx scripts/foundation/contact-sheet.ts                  # every worksheet with a manifest
 *
 * WHY THIS EXISTS. `figure-bbox.ts` already instructs "ALWAYS eyeball the crops
 * afterward". That instruction has no enforcement: the crops land as N separate
 * PNGs under out/<id>-figs/, and nobody opens twenty of them one at a time. The
 * leaky-crop defect (158 of 282 crops reaching into the neighbouring stem,
 * option text, or the numbered answer statements) is exactly what looking would
 * have caught. This makes looking cheap enough to actually happen.
 *
 * A MONTAGE TRIAGES — IT DOES NOT ADJUDICATE. A cell border sits close to a
 * figure's own edge labels and reads as a slice through them, so a montage
 * MANUFACTURES suspected clipping that is not there; this repo has been fooled
 * by precisely that and called complete crops clipped. So: use the sheet to
 * decide which crops to doubt, then CONFIRM every suspicion against the
 * individual crop file at full size. Never conclude "clipped" from the montage.
 *
 * Reports only. Reads the manifest and writes one PNG per worksheet; never
 * edits a bbox, never touches storage or the database.
 */
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { DATA, OUT, WORKSHEETS, requireWorksheet } from "./config";

type FigSpec = { page: number; bbox: [number, number, number, number] };

const PY = String.raw`
import fitz, json, sys, os
from PIL import Image, ImageDraw, ImageFont

pdf_path, spec_json, out_path, title = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
specs = json.loads(spec_json)   # {qnum: {page, bbox}} — bbox in PDF POINTS, page 0-based

COLS    = 3
CELL_W  = 520     # cell width, including the border and the white gutter
IMG_H   = 340     # cell image band height, including the white gutter
LABEL_H = 28
# WHITE GUTTER between the figure and its cell border. Non-negotiable and the
# reason it is this large: a border drawn tight against a figure overlaps that
# figure's own edge labels and READS AS A CLIPPED CROP. Reviewers of this repo
# have twice called a complete crop clipped for exactly that reason. Keeping a
# clear band of white means a suspicious edge in the montage is the crop's, not
# the montage's.
GUTTER  = 14
SCALE   = 3.0     # render matrix; figures are downscaled to fit, never upscaled

def font(size):
    for p in (r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"):
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

doc = fitz.open(pdf_path)
items = sorted(specs.items(), key=lambda kv: int(kv[0]))

tiles = []
for q, spec in items:
    page = doc[spec["page"]]
    clip = fitz.Rect(*spec["bbox"])
    pix = page.get_pixmap(matrix=fitz.Matrix(SCALE, SCALE), clip=clip)
    im = None
    if pix.width > 0 and pix.height > 0:
        im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    tiles.append((q, spec["page"], im))

rows = max(1, -(-len(tiles) // COLS))
cell_h = IMG_H + LABEL_H
head_h = 34
sheet = Image.new("RGB", (COLS * CELL_W, head_h + rows * cell_h), "white")
d = ImageDraw.Draw(sheet)
f_head, f_label = font(17), font(15)
d.text((10, 9), title, font=f_head, fill="#0a0a0a")

# usable box for the artwork, once the gutter is reserved on all four sides
avail_w, avail_h = CELL_W - 2 * GUTTER, IMG_H - 2 * GUTTER

for i, (q, pg, im) in enumerate(tiles):
    cx = (i % COLS) * CELL_W
    cy = head_h + (i // COLS) * cell_h
    if im is not None:
        # fit to the cell but NEVER enlarge past 1:1 — an upscaled crop looks
        # soft and invites a false "this is blurry/clipped" call
        sc = min(avail_w / im.width, avail_h / im.height, 1.0)
        w, h = max(1, int(im.width * sc)), max(1, int(im.height * sc))
        thumb = im.resize((w, h), Image.LANCZOS) if sc < 1.0 else im
        sheet.paste(thumb, (cx + (CELL_W - w) // 2, cy + (IMG_H - h) // 2))
    else:
        d.text((cx + GUTTER, cy + IMG_H // 2), "EMPTY CROP (degenerate bbox)", font=f_label, fill="#b00")
    d.rectangle([cx + 1, cy + 1, cx + CELL_W - 2, cy + cell_h - 2], outline="#bbbbbb")
    d.text((cx + GUTTER, cy + IMG_H + 5), "Q" + str(q) + "   page " + str(pg), font=f_label, fill="#0a0a0a")

sheet.save(out_path)
print(json.dumps({"tiles": len(tiles), "rows": rows}))
`;

/** Render one worksheet's crops into a single labelled montage. Returns the path, or null if skipped. */
function contactSheet(id: string): string | null {
  const ws = WORKSHEETS[id];
  if (!ws) {
    console.log(`  ${id}: not in WORKSHEETS — skipping`);
    return null;
  }
  const figPath = join(DATA, `${id}.figures.json`);
  if (!existsSync(figPath)) {
    console.log(`  ${id}: no figures manifest — skipping`);
    return null;
  }
  if (!existsSync(ws.pdf)) {
    console.log(`  ${id}: PDF not on disk (${ws.pdf}) — skipping`);
    return null;
  }
  const figs: Record<string, FigSpec> = JSON.parse(readFileSync(figPath, "utf8"));
  const nums = Object.keys(figs);
  if (nums.length === 0) {
    console.log(`  ${id}: manifest is empty — skipping`);
    return null;
  }

  mkdirSync(OUT, { recursive: true });
  const outPath = resolve(join(OUT, `${id}-contact.png`));
  const title = `${id} — ${ws.chapterName} — ${nums.length} figure(s)`;
  const res = spawnSync("python", ["-c", PY, ws.pdf, JSON.stringify(figs), outPath, title], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (res.stderr) process.stderr.write(res.stderr);
  if (res.status !== 0) throw new Error(`${id}: contact sheet failed`);

  console.log(`  ${id}: ${nums.length} tile(s) -> ${outPath}`);
  return outPath;
}

function main() {
  const ids = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  // Explicitly-named ids go through requireWorksheet so a typo is a loud error
  // with the known list, rather than a silent skip.
  for (const id of ids) requireWorksheet(id);

  const targets = ids.length
    ? ids
    : Object.keys(WORKSHEETS).filter((id) => existsSync(join(DATA, `${id}.figures.json`)));

  if (!targets.length) {
    console.log("no worksheets with a figures manifest — nothing to do.");
    return;
  }
  console.log(`contact sheets for ${targets.length} worksheet(s):`);

  const written: string[] = [];
  for (const id of targets) {
    const p = contactSheet(id);
    if (p) written.push(p);
  }

  console.log(`\nwrote ${written.length} contact sheet(s).`);
  console.log("LOOK AT EVERY TILE. A montage only tells you WHICH crops to doubt —");
  console.log("confirm any suspected clipping against the individual crop, never the montage.");
}

main();
