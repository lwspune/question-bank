/**
 * Crop each figure question's diagram via snapCrop (ink-bounding), upload it, and set
 * image_url.
 *
 *   npx tsx scripts/pariksha/attach-images.ts <testId>          # dry-run: crop to out/ + report ok/warnings
 *   npx tsx scripts/pariksha/attach-images.ts <testId> --apply  # upload + set image_url (ok crops only)
 *   npx tsx scripts/pariksha/attach-images.ts <testId> --apply --force  # also attach not-ok crops
 *
 * Instead of an eyeballed tight bbox, the transcription agents record FORGIVING snapCrop
 * anchors per figure question (fractions of the rendered logical L/R half-page PNG):
 *   { "<qnum>": { "img": "p003_L", "col": [c0,c1], "top": t, "bottom": b, "answerY": a } }
 *   - col     : the rough column band the figure sits in (wide is fine)
 *   - top     : a point in the whitespace gap ABOVE the figure (below the stem)
 *   - bottom  : a point in the whitespace gap BELOW the figure (above options / the answer)
 *   - answerY : the HARD leak ceiling — where the 'Answer :' line begins; crop can't dip past it
 * snapCrop (scripts/lib/figures/snapcrop.py) renders the half PNG to an ink mask, bounds the
 * actual figure ink within [top,bottom]x[col], pads into whitespace, and returns a tight bbox
 * + `ok`/warnings. Not-ok crops (misplaced anchor / leak risk) are reported and skipped unless
 * --force. Merged from data/<testId>.figures*.json. Idempotent: skips a set image_url.
 */
import { readFileSync, readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import { ORG_ID, EXAM_ID, OUT, DATA, requireTest } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type FigSpec = { img: string; col: [number, number]; top: number; bottom: number; answerY: number };
type CropResult = { png: string; ok: boolean; warnings: string[] };

function loadManifest(testId: string): Record<string, FigSpec> {
  const files = readdirSync(DATA).filter((f) => f.startsWith(`${testId}.figures`) && f.endsWith(".json"));
  if (!files.length) throw new Error(`no figures manifest (data/${testId}.figures*.json)`);
  const out: Record<string, FigSpec> = {};
  for (const f of files) Object.assign(out, JSON.parse(readFileSync(join(DATA, f), "utf8")));
  return out;
}

/** snapCrop each figure from its rendered half PNG; returns {qnum: {png, ok, warnings}}. */
function cropFigures(testId: string, figs: Record<string, FigSpec>, dir: string): Record<string, CropResult> {
  mkdirSync(dir, { recursive: true });
  const py = `
import sys, os, json
sys.path.insert(0, os.path.join(${JSON.stringify(process.cwd())}, "scripts", "lib", "figures"))
import numpy as np
from PIL import Image
from snapcrop import snap_crop
srcdir, figs, outdir = sys.argv[1], json.loads(sys.argv[2]), sys.argv[3]
out = {}
for q, spec in figs.items():
    png = os.path.join(srcdir, spec["img"] + ".png")
    gray = np.asarray(Image.open(png).convert("L"))
    mask = gray < 165
    try:
        r = snap_crop(mask, spec["col"], spec["top"], spec["bottom"], spec["answerY"])
    except Exception as e:
        out[q] = {"png": None, "ok": False, "warnings": ["snapCrop error: " + str(e)]}; continue
    fx0, fy0, fx1, fy1 = r["bbox"]
    H, W = mask.shape
    box = (int(fx0*W), int(fy0*H), int(fx1*W), int(fy1*H))
    crop = Image.open(png).convert("RGB").crop(box)
    p = os.path.join(outdir, "fig-q" + q + ".png"); crop.save(p)
    out[q] = {"png": p, "ok": r["ok"], "warnings": r["warnings"]}
print(json.dumps(out))
`;
  const res = spawnSync("python", ["-c", py, join(OUT, testId), JSON.stringify(figs), dir], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`crop failed: ${res.stderr}`);
  return JSON.parse(res.stdout.trim().split("\n").pop()!);
}

async function main() {
  const testId = process.argv[2];
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force");
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const only = onlyArg ? new Set(onlyArg.slice("--only=".length).split(",").map((s) => s.trim()).filter(Boolean)) : null;
  const test = requireTest(testId);
  loadEnv();

  const figs = loadManifest(test.id);
  let nums = Object.keys(figs).sort((a, b) => Number(a) - Number(b));
  if (only) nums = nums.filter((n) => only.has(n));
  console.log(`${test.id}: ${nums.length} figure(s) — Q${nums.join(", Q")}`);

  const crops = cropFigures(test.id, figs, join(OUT, `${test.id}-figs`));
  let okCount = 0;
  for (const q of nums) {
    const c = crops[q];
    if (c?.ok) okCount++;
    else console.log(`  Q${q}: NOT OK — ${(c?.warnings || ["missing"]).join("; ")}`);
  }
  console.log(`cropped ${nums.length} → ${okCount} ok, ${nums.length - okCount} flagged (to ${join(OUT, `${test.id}-figs`)})`);

  if (!apply) {
    console.log("\n[dry-run] montage-verify the crops, then --apply (ok crops only) or --apply --force (all).");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  for (const qnum of nums) {
    const c = crops[qnum];
    if (!c?.png) { console.log(`  Q${qnum}: no crop — skipping`); continue; }
    if (!c.ok && !force) { console.log(`  Q${qnum}: flagged not-ok — skipping (‑‑force to attach)`); continue; }
    const { data: q, error } = await client.from("questions").select("id, image_url").eq("exam_id", EXAM_ID).eq("source_file", test.sourceFile).eq("question_number", qnum).maybeSingle();
    if (error) throw new Error(`Q${qnum} lookup: ${error.message}`);
    if (!q) { console.log(`  Q${qnum}: NO committed row — skipping`); continue; }
    if (q.image_url) { console.log(`  Q${qnum}: image_url already set — skipping`); continue; }
    const path = await uploadImage(client, ORG_ID, readFileSync(c.png), "image/png");
    const { error: uErr } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
    if (uErr) throw new Error(`Q${qnum} set image_url: ${uErr.message}`);
    console.log(`  Q${qnum}: attached ${path}`);
  }
  console.log("done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
