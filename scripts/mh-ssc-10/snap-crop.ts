/**
 * Derive tight, leak-safe figure bboxes from COARSE anchors via the shared
 * snapCrop core (scripts/lib/figures/snapcrop.py). The board-paper figures
 * (Geometry triangles/circles; Science apparatus) are vector-drawn → they render
 * as ink, so snapCrop bounds the actual ink inside the anchor band. Replaces
 * hand/agent-eyeballed bboxes, which clip figures + leak the answer text.
 *
 *   npx tsx scripts/mh-ssc-10/snap-crop.ts <paperId>          # derive + report (writes nothing)
 *   npx tsx scripts/mh-ssc-10/snap-crop.ts <paperId> --write  # write bboxes into the *fig.json fragments
 *
 * Input: data/<id>.*.anchors.json = [{ ref, page (0-based), col:[x0,x1], top,
 * bottom, answerY }] — col band; top/bottom in the whitespace GAPS around the
 * figure; answerY = the hard ceiling where the next question/answer begins.
 * The derived bbox is written into the matching data/<id>.*fig.json entry, which
 * attach-images.ts reads. snapCrop flags a misplaced anchor / answerY leak
 * (`ok:false`) LOUDLY — but the mandatory backstop is the visual crop review.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { DATA, requirePaper } from "./config";

type Anchor = { ref: string; page: number; col: [number, number]; top: number; bottom: number; answerY: number };
type SnapResult = { bbox: [number, number, number, number]; warnings: string[]; ok: boolean };

const LIB = join(__dirname, "..", "lib", "figures", "snapcrop.py");

function loadAnchors(id: string): Anchor[] {
  const files = readdirSync(DATA).filter((f) => f.startsWith(`${id}.`) && f.endsWith(".anchors.json"));
  const all: Anchor[] = [];
  const seen = new Set<string>();
  for (const f of files) {
    const frag: Anchor[] = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    for (const a of frag) {
      if (seen.has(a.ref)) throw new Error(`duplicate anchor ref "${a.ref}" (in ${f})`);
      seen.add(a.ref);
      all.push(a);
    }
  }
  return all;
}

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
  const res = spawnSync("python", ["-c", py, JSON.stringify(anchors), pdf], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`snapcrop failed: ${res.stderr}`);
  return JSON.parse(res.stdout.trim().split("\n").pop()!);
}

function main() {
  const id = process.argv[2];
  const write = process.argv.includes("--write");
  const paper = requirePaper(id);

  const anchors = loadAnchors(id);
  if (anchors.length === 0) throw new Error(`no anchors in data/${id}.*.anchors.json`);
  const pageByRef = new Map(anchors.map((a) => [a.ref, a.page]));
  const results = deriveBboxes(paper.pdf, anchors);

  let ok = 0, flagged = 0;
  for (const a of anchors) {
    const r = results[a.ref];
    if (r.ok) ok++;
    else {
      flagged++;
      console.log(`  FLAG "${a.ref}": ${r.warnings.join("; ")}`);
    }
  }
  console.log(`\n${anchors.length} figures: ${ok} ok, ${flagged} flagged.`);

  if (!write) {
    console.log("\n[dry-run] pass --write to write derived bboxes into the *fig.json fragments, then crop + eyeball.");
    return;
  }

  const figFiles = readdirSync(DATA).filter((f) => f.startsWith(`${id}.`) && f.endsWith("fig.json"));
  let updated = 0;
  for (const f of figFiles) {
    const path = join(DATA, f);
    const frag = JSON.parse(readFileSync(path, "utf8")) as Array<Record<string, unknown> & { ref: string }>;
    let touched = false;
    for (const q of frag) {
      const r = results[q.ref];
      if (!r || !r.bbox) continue;
      q.bbox = r.bbox;
      q.page = pageByRef.get(q.ref);
      touched = true;
      updated++;
    }
    if (touched) writeFileSync(path, JSON.stringify(frag, null, 2), "utf8");
  }
  console.log(`wrote derived bbox on ${updated} figure(s). Next: attach-images (dry-run) → eyeball → --apply.`);
}

main();
