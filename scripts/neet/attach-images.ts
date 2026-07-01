/**
 * Crop each figure-dependent question's diagram from the NEET booklet PDF, upload it
 * to storage, and set questions.image_url. The NEET booklets are full-page SCANS (one
 * bitmap per page), so we crop a bbox REGION of the page (clip + rasterize) rather than
 * extract an embedded image object.
 *
 *   npx tsx scripts/neet/attach-images.ts <paperId>          # dry-run (crop to out/ only)
 *   npx tsx scripts/neet/attach-images.ts <paperId> --apply  # upload + set image_url
 *
 * Manifest (merged from all data/<paperId>.figures*.json): a map
 *   { "<questionNumber>": { "page": <1-based booklet page>, "bbox": [fx0,fy0,fx1,fy1] } }
 * where bbox is FRACTIONS of the full page (0..1, left/top → right/bottom) — display-
 * independent, which is what the vision bbox pass returns. Idempotent: skips a question
 * whose image_url is already set. The question rows must already be committed.
 */
import { readFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import { ORG_ID, EXAM_ID, OUT, DATA, requirePaper } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type FigSpec = { page: number; bbox: [number, number, number, number] };

/** Merge every data/<paperId>.figures*.json into one manifest. */
function loadManifest(paperId: string): Record<string, FigSpec> {
  const files = readdirSync(DATA).filter((f) => f.startsWith(`${paperId}.figures`) && f.endsWith(".json"));
  if (!files.length) throw new Error(`no figures manifest (data/${paperId}.figures*.json)`);
  const out: Record<string, FigSpec> = {};
  for (const f of files) Object.assign(out, JSON.parse(readFileSync(join(DATA, f), "utf8")));
  return out;
}

/** Clip each fractional bbox from its page and render to a 4x PNG; returns {qnum: pngPath}. */
function cropFigures(pdf: string, figs: Record<string, FigSpec>, dir: string): Record<string, string> {
  mkdirSync(dir, { recursive: true });
  const py = `
import fitz, json, sys
pdf, figs, outdir = sys.argv[1], json.loads(sys.argv[2]), sys.argv[3]
d = fitz.open(pdf); out = {}
for q, spec in figs.items():
    pg = d[spec["page"] - 1]            # manifest page is 1-based
    r = pg.rect
    fx0, fy0, fx1, fy1 = spec["bbox"]
    clip = fitz.Rect(r.x0 + fx0 * r.width, r.y0 + fy0 * r.height,
                     r.x0 + fx1 * r.width, r.y0 + fy1 * r.height)
    pix = pg.get_pixmap(matrix=fitz.Matrix(4, 4), clip=clip)
    p = outdir + "/fig-q" + q + ".png"; pix.save(p); out[q] = p
print(json.dumps(out))
`;
  const res = spawnSync("python", ["-c", py, pdf, JSON.stringify(figs), dir], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`crop failed: ${res.stderr}`);
  return JSON.parse(res.stdout.trim().split("\n").pop()!);
}

async function main() {
  const paperId = process.argv[2];
  const apply = process.argv.includes("--apply");
  const paper = requirePaper(paperId);
  loadEnv();

  const figs = loadManifest(paper.id);
  const nums = Object.keys(figs).sort((a, b) => Number(a) - Number(b));
  console.log(`${paper.id}: ${nums.length} figure(s) to attach — Q${nums.join(", Q")}`);

  const crops = cropFigures(paper.pdf, figs, join(OUT, `${paper.id}-figs`));
  console.log(`cropped ${Object.keys(crops).length} figure PNG(s) to ${join(OUT, `${paper.id}-figs`)}`);

  if (!apply) {
    console.log("\n[dry-run] eyeball the cropped PNGs, then pass --apply to upload + set image_url.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  for (const qnum of nums) {
    const pngPath = crops[qnum];
    const { data: q, error } = await client.from("questions").select("id, image_url").eq("exam_id", EXAM_ID).eq("source_file", paper.sourceFile).eq("question_number", qnum).maybeSingle();
    if (error) throw new Error(`Q${qnum} lookup: ${error.message}`);
    if (!q) { console.log(`  Q${qnum}: NO committed row — skipping`); continue; }
    if (q.image_url) { console.log(`  Q${qnum}: image_url already set — skipping`); continue; }
    const path = await uploadImage(client, ORG_ID, readFileSync(pngPath), "image/png");
    const { error: uErr } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
    if (uErr) throw new Error(`Q${qnum} set image_url: ${uErr.message}`);
    console.log(`  Q${qnum}: attached ${path}`);
  }
  console.log("done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
