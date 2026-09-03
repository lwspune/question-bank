/**
 * Derive tight, leak-safe figure bboxes from COARSE anchors via the shared
 * snapCrop core (scripts/lib/figures/snapcrop.py).
 *
 *   npx tsx scripts/cds-maths/snap-crop.ts <paperId>          # derive + report, writes nothing
 *   npx tsx scripts/cds-maths/snap-crop.ts <paperId> --write  # write data/<id>.fig.json
 *
 * Input: data/<id>.anchors.json = [{ ref, page (0-based), col:[x0,x1], top,
 * bottom, answerY }], all as page FRACTIONS with a top-left origin. Those are the
 * forgiving anchors: a column band, whitespace gaps above and below the diagram,
 * and the hard ceiling the crop must not reach past.
 *
 * WHAT `answerY` MEANS ON THIS PAPER, and it is not what the name suggests. The
 * sibling pipelines crop a figure that sits ABOVE its solution, so the ceiling is
 * where the answer begins. Here the layout is: bare question number, then the
 * DIAGRAM, then the stem, then the options — so the thing the ceiling protects is
 * the STEM. Pass the stem's first line as `answerY`. Cropping into it would put
 * the question's own text inside the figure image.
 *
 * TWO DOCUMENTED BLIND SPOTS IN THE CORE, both of which have shipped clipped
 * figures elsewhere in this repo, and neither of which this script can fix:
 *
 *   1. `ok: true` means "your anchors sat in whitespace gaps and the crop did not
 *      cross answerY". It does NOT mean "the crop contains the whole figure".
 *   2. The core bounds only pixels darker than INK=165, so pale line art is
 *      invisible to it — it clips and still reports ok.
 *
 * So the VISUAL verify step is mandatory, not optional, and a bbox widened by
 * hand afterwards is silently reverted by re-running this with --write. Record
 * any such override in the fig entry's `bboxNote`.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { dataPath, requirePaper } from "./config";

type Anchor = {
  ref: string;
  page: number;
  col: [number, number];
  top: number;
  bottom: number;
  answerY: number;
};
type SnapResult = { bbox: [number, number, number, number] | null; warnings: string[]; ok: boolean };

const LIB = join(__dirname, "..", "lib", "figures", "snapcrop.py");

/** Batch-derive every bbox in one python process, caching the ink mask per page. */
function deriveBboxes(pdf: string, anchors: Anchor[]): Record<string, SnapResult> {
  const py = `
import sys, json, os
sys.path.insert(0, os.path.dirname(${JSON.stringify(LIB)}))
from snapcrop import snap_crop, ink_mask_from_pdf
anchors = json.loads(sys.argv[1]); pdf = sys.argv[2]
masks = {}; out = {}
for a in anchors:
    p1 = a["page"] + 1  # snapcrop is 1-based; our manifests are 0-based
    if p1 not in masks: masks[p1] = ink_mask_from_pdf(pdf, p1)
    try:
        out[a["ref"]] = snap_crop(masks[p1], a["col"], a["top"], a["bottom"], a["answerY"])
    except Exception as e:
        out[a["ref"]] = {"bbox": None, "warnings": ["ERROR: " + str(e)], "ok": False}
print(json.dumps(out))
`;
  const res = spawnSync("python", ["-c", py, JSON.stringify(anchors), pdf], { encoding: "utf8" });
  if (res.status !== 0) throw new Error(`snapcrop failed:\n${res.stderr}`);
  return JSON.parse(res.stdout);
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const write = process.argv.includes("--write");

  const aPath = dataPath(paper.id, "anchors");
  if (!existsSync(aPath)) throw new Error(`missing ${aPath} — do the anchor pass first`);
  const anchors: Anchor[] = JSON.parse(readFileSync(aPath, "utf8"));

  const seen = new Set<string>();
  for (const a of anchors) {
    if (seen.has(a.ref)) throw new Error(`duplicate anchor ref "${a.ref}"`);
    seen.add(a.ref);
    if (a.bottom > a.answerY) {
      throw new Error(
        `${a.ref}: bottom (${a.bottom}) is below answerY (${a.answerY}) — the search band already ` +
          `reaches past the ceiling, so the anchors are wrong, not merely loose.`
      );
    }
  }

  // Cross-check the anchor set against the transcription, both ways. A figure
  // question with no anchor ships a dangling "in the figure given below"; an
  // anchor with no question crops something nobody asked for.
  const qPath = dataPath(paper.id, "questions");
  if (existsSync(qPath)) {
    const qs = JSON.parse(readFileSync(qPath, "utf8")) as { number: number; hasFigure?: boolean }[];
    const want = new Set(qs.filter((q) => q.hasFigure).map((q) => `Q${q.number}`));
    const missing = [...want].filter((r) => !seen.has(r));
    const extra = [...seen].filter((r) => !want.has(r));
    if (missing.length) throw new Error(`figure questions with no anchor: ${missing.join(", ")}`);
    if (extra.length) throw new Error(`anchors for questions not marked hasFigure: ${extra.join(", ")}`);
    console.log(`anchor set matches the ${want.size} figure questions exactly.`);
  }

  const results = deriveBboxes(paper.pdf, anchors);

  let bad = 0;
  const figs: Record<string, unknown>[] = [];
  for (const a of anchors) {
    const r = results[a.ref];
    const bboxStr = r.bbox ? r.bbox.map((v) => v.toFixed(4)).join(", ") : "(none)";
    const h = r.bbox ? (r.bbox[3] - r.bbox[1]) : 0;
    console.log(`  ${a.ref.padEnd(5)} p${String(a.page).padStart(2)}  ok=${String(r.ok).padEnd(5)} h=${h.toFixed(3)}  [${bboxStr}]`);
    for (const w of r.warnings) console.log(`        ! ${w}`);
    if (!r.ok || !r.bbox) bad += 1;
    else figs.push({ ref: a.ref, page: a.page, bbox: r.bbox });
  }

  console.log(`\n${anchors.length} anchor(s), ${bad} not ok.`);
  console.log(
    `REMINDER: ok means the anchors sat in gaps and the crop cleared the ceiling. It does NOT\n` +
      `mean the crop contains the whole figure — the visual review is the only thing that does.`
  );

  if (!write) {
    console.log(`\n[dry-run] pass --write to write ${paper.id}.fig.json. Nothing written.`);
    return;
  }
  if (bad) throw new Error(`refusing to write with ${bad} not-ok bbox(es) — fix the anchors.`);

  writeFileSync(dataPath(paper.id, "fig"), JSON.stringify(figs, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${dataPath(paper.id, "fig")} (${figs.length} figures).`);
}

main();
