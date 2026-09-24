/**
 * Crop the printed figures out of a board paper, and reconcile what was found
 * against what the manifest says should be there.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/crop-figures.ts <paperId|--all>
 *
 * Writes data/figures/<paperId>.<ref-slug>.png (committed — these ARE the
 * artifact) plus out/_contact/<paperId>.png, a contact sheet of every crop.
 *
 * WHY THE CONTACT SHEET IS NOT OPTIONAL. `fig_bounds.py` locates figures from a
 * signature the page emits, and on this corpus it is exact: 4 found, 0 false
 * positives, nearest non-figure 21pt against a 40pt floor. None of that says
 * the CROP is right. On the NCERT Class-10 run the geometry was equally
 * confident and 6 of 22 crops were visibly wrong — one grabbed the wrong column
 * outright — and a single contact sheet caught all six in one pass. So this
 * script writes the sheet and prints a REVIEW line; it never reports success.
 *
 * WHY IT RECONCILES BOTH WAYS. A crop pass that only walks the manifest cannot
 * discover a figure nobody knew about, and that is not hypothetical here: the
 * July-2024 Q.27 circuit is absent from every text grep (its stem never says
 * "circuit") and was found only because detection ran over the whole paper.
 * Equally, a manifest ref with no detected figure means one of them is wrong.
 * Both directions are reported and both are failures.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { DATA, OUT, PAPERS, requirePaper, type Paper } from "./config";
import { grammarFor } from "./lib";

/** Padding around a detected bbox, in points. The raster's own bounds sit hard
 *  against the outermost wire, so an unpadded crop prints a circuit whose
 *  border IS the image edge. */
const PAD = 6;
/** 4x = ~288 dpi. These are line drawings; the bank's existing compilation
 *  scans are 437-512px wide and visibly soft, and the point of re-cropping is
 *  to beat them. */
const ZOOM = 4;

const FIGURES = join(DATA, "figures");
const CONTACT = join(OUT, "_contact");

const slug = (ref: string) => ref.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();

const CROP_PY = String.raw`
import fitz, sys, json
pdf, spec_json, zoom, pad = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4])
spec = json.loads(spec_json)
d = fitz.open(pdf)
out = []
for s in spec:
    page = d[s["page"] - 1]
    x0, y0, x1, y1 = s["bbox"]
    clip = fitz.Rect(x0 - pad, y0 - pad, x1 + pad, y1 + pad) & page.rect
    pm = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), clip=clip)
    pm.save(s["path"])
    out.append({"path": s["path"], "w": pm.width, "h": pm.height, "bytes": len(pm.tobytes("png"))})
print(json.dumps(out))
`;

const SHEET_PY = String.raw`
import sys, json
from PIL import Image, ImageDraw
spec = json.loads(sys.argv[1]); dest = sys.argv[2]
tiles = [(Image.open(t["path"]).convert("RGB"), t["label"]) for t in spec]
W = max(i.width for i, _ in tiles) + 24
H = sum(i.height + 40 for i, _ in tiles) + 20
sheet = Image.new("RGB", (W, H), "white"); dr = ImageDraw.Draw(sheet)
y = 10
for im, label in tiles:
    dr.text((12, y), label, fill="black"); y += 26
    sheet.paste(im, (12, y))
    dr.rectangle([11, y - 1, 12 + im.width, y + im.height], outline=(200, 60, 60))
    y += im.height + 14
sheet.save(dest); print(json.dumps({"w": sheet.width, "h": sheet.height}))
`;

function runPy(script: string, args: string[]): string {
  mkdirSync(OUT, { recursive: true });
  const file = join(OUT, `_py_${process.pid}_${Math.random().toString(36).slice(2)}.py`);
  writeFileSync(file, script);
  const res = spawnSync("python", [file, ...args], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  rmSync(file, { force: true });
  if (res.status !== 0) throw new Error(`python failed: ${res.stderr}`);
  return res.stdout.trim();
}

type Detected = { page: number; bbox: number[]; strips: number; width: number; height: number; under: string | null };

function detect(paper: Paper): Detected[] {
  const raw = spawnSync("python", [join(__dirname, "fig_bounds.py"), paper.pdf, "--json"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (raw.status !== 0) throw new Error(`fig_bounds failed: ${raw.stderr}`);
  return (JSON.parse(raw.stdout) as { figures: Detected[] }).figures;
}

/** Attribute a detected figure to the question printed above it. */
function refFor(d: Detected, paper: Paper): string | null {
  const m = (d.under ?? "").match(/^Q\.\s*\d+\.?/);
  return m ? grammarFor(paper.subject).normaliseRef(m[0].replace(/\.$/, "")) : null;
}

function cropPaper(id: string): boolean {
  const paper = requirePaper(id);
  const found = detect(paper);

  const attributed = found.map((d) => ({ d, ref: refFor(d, paper) }));
  const foundRefs = attributed.map((a) => a.ref).filter(Boolean) as string[];
  const expected = paper.figureRefs;

  const problems: string[] = [];
  for (const ref of expected) {
    if (!foundRefs.includes(ref)) problems.push(`manifest claims a figure at ${ref}, detection found none`);
  }
  for (const a of attributed) {
    if (!a.ref) problems.push(`figure on p${a.d.page} could not be attributed to a question (under ${JSON.stringify(a.d.under)})`);
    else if (!expected.includes(a.ref)) problems.push(`detected a figure at ${a.ref} that the manifest does not list`);
  }

  if (!found.length && !expected.length) {
    console.log(`${paper.id}: no figures (manifest agrees)`);
    return true;
  }

  mkdirSync(FIGURES, { recursive: true });
  mkdirSync(CONTACT, { recursive: true });

  const spec = attributed.map((a) => ({
    page: a.d.page,
    bbox: a.d.bbox,
    path: join(FIGURES, `${paper.id}.${slug(a.ref ?? `p${a.d.page}-unattributed`)}.png`),
  }));
  const written = JSON.parse(runPy(CROP_PY, [paper.pdf, JSON.stringify(spec), String(ZOOM), String(PAD)])) as {
    path: string;
    w: number;
    h: number;
    bytes: number;
  }[];

  const sheetSpec = written.map((w, i) => ({
    path: w.path,
    label: `${paper.id}  ${attributed[i].ref ?? "UNATTRIBUTED"}  p${attributed[i].d.page}  ${w.w}x${w.h}px  ${attributed[i].d.strips} strips`,
  }));
  const sheet = join(CONTACT, `${paper.id}.png`);
  runPy(SHEET_PY, [JSON.stringify(sheetSpec), sheet]);

  console.log(`${paper.id}: ${written.length} figure(s)`);
  for (const [i, w] of written.entries()) {
    console.log(`   ${attributed[i].ref ?? "UNATTRIBUTED"}  p${attributed[i].d.page}  ${w.w}x${w.h}px  ${(w.bytes / 1024).toFixed(1)} KB  -> ${w.path}`);
  }
  for (const p of problems) console.log(`   ⚠ ${p}`);
  console.log(`   REVIEW REQUIRED — open ${sheet} and check every crop before committing.`);

  return problems.length === 0;
}

const arg = process.argv[2];
if (!arg) {
  console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/crop-figures.ts <paperId|--all>`);
  console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
  process.exit(1);
}
let ok = true;
for (const id of arg === "--all" ? Object.keys(PAPERS) : [arg]) ok = cropPaper(id) && ok;
if (!ok) {
  console.error(`\nFAILED: detection and the manifest disagree. One of them is wrong — fix before cropping again.`);
  process.exit(1);
}
