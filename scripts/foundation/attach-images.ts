/**
 * Crop each figure-dependent question's figure from the worksheet PDF, upload it
 * to storage, and set questions.image_url. Manifest-driven; mirrors the JEE
 * attach-images approach but crops a bbox region (these worksheets embed figures
 * as page graphics, not always as single extractable image objects).
 *
 *   npx tsx scripts/foundation/attach-images.ts <worksheetId>          # dry-run (just crops to out/)
 *   npx tsx scripts/foundation/attach-images.ts <worksheetId> --apply  # upload + set image_url
 *
 * Manifest: data/<id>.figures.json = { "<questionNumber>": { "page": <0-based>,
 * "bbox": [x0,y0,x1,y1] } }  (PDF points). Idempotent: skips a question whose
 * image_url is already set. The question rows must already be committed.
 */
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import { ORG_ID, EXAM_ID, OUT, DATA, requireWorksheet } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type FigSpec = { page: number; bbox: [number, number, number, number] };

/** Render each bbox to a PNG (4x) via PyMuPDF; returns {qnum: pngPath}. */
function cropFigures(pdf: string, figs: Record<string, FigSpec>, dir: string): Record<string, string> {
  mkdirSync(dir, { recursive: true });
  const py = `
import fitz, json, sys
pdf, figs, outdir = sys.argv[1], json.loads(sys.argv[2]), sys.argv[3]
d = fitz.open(pdf); out = {}
for q, spec in figs.items():
    pg = d[spec["page"]]
    clip = fitz.Rect(*spec["bbox"])
    pix = pg.get_pixmap(matrix=fitz.Matrix(4, 4), clip=clip)
    p = outdir + "/fig-q" + q + ".png"; pix.save(p); out[q] = p
print(json.dumps(out))
`;
  const res = spawnSync("python", ["-c", py, pdf, JSON.stringify(figs), dir], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`crop failed: ${res.stderr}`);
  return JSON.parse(res.stdout.trim().split("\n").pop()!);
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ws = requireWorksheet(id);
  loadEnv();

  const figPath = join(DATA, `${id}.figures.json`);
  if (!existsSync(figPath)) throw new Error(`no figures manifest at ${figPath}`);
  const figs: Record<string, FigSpec> = JSON.parse(readFileSync(figPath, "utf8"));
  const nums = Object.keys(figs);
  console.log(`${ws.chapterName}: ${nums.length} figure(s) to attach — Q${nums.join(", Q")}`);

  const crops = cropFigures(ws.pdf, figs, join(OUT, `${id}-figs`));
  console.log(`cropped ${Object.keys(crops).length} figure PNG(s) to ${join(OUT, `${id}-figs`)}`);

  if (!apply) {
    console.log("\n[dry-run] eyeball the cropped PNGs, then pass --apply to upload + set image_url.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  for (const [qnum, pngPath] of Object.entries(crops)) {
    const { data: q, error } = await client
      .from("questions")
      .select("id, image_url")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ws.sourceFile)
      .eq("question_number", qnum)
      .maybeSingle();
    if (error) throw new Error(`Q${qnum} lookup: ${error.message}`);
    if (!q) { console.log(`  Q${qnum}: NO committed row — commit the question first; skipping`); continue; }
    if (q.image_url) { console.log(`  Q${qnum}: image_url already set — skipping`); continue; }
    const path = await uploadImage(client, ORG_ID, readFileSync(pngPath), "image/png");
    const { error: uErr } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
    if (uErr) throw new Error(`Q${qnum} set image_url: ${uErr.message}`);
    console.log(`  Q${qnum}: attached ${path}`);
  }
  console.log("done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
