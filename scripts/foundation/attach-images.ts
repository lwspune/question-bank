/**
 * Crop each figure-dependent question's figure from the worksheet PDF, upload it
 * to storage, and set questions.image_url. Manifest-driven; mirrors the JEE
 * attach-images approach but crops a bbox region (these worksheets embed figures
 * as page graphics, not always as single extractable image objects).
 *
 *   npx tsx scripts/foundation/attach-images.ts <worksheetId>                    # dry-run (just crops to out/)
 *   npx tsx scripts/foundation/attach-images.ts <worksheetId> --apply            # upload + set image_url
 *   npx tsx scripts/foundation/attach-images.ts <worksheetId> --apply --replace  # RE-attach: overwrite an existing image_url
 *
 * Manifest: data/<id>.figures.json = { "<questionNumber>": { "page": <0-based>,
 * "bbox": [x0,y0,x1,y1] } }  (PDF points). Idempotent: skips a question whose
 * image_url is already set. The question rows must already be committed.
 *
 * --replace is for a RE-CROP. The skip above is right for a first attach and
 * blocks the repair when a bbox has been re-derived (see recrop-figures.ts), so
 * --replace uploads the new crop and repoints image_url at it. The superseded
 * storage object is deliberately LEFT IN PLACE rather than deleted:
 * scripts/sweep-orphan-images.ts exists for that, and it can prove an object is
 * unreferenced by ANY row (questions.image_url ∪ options.image_url) — which this
 * script cannot, so deleting here risks breaking a row it never looked at.
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
  const replace = process.argv.includes("--replace");
  const ws = requireWorksheet(id);
  loadEnv();

  const figPath = join(DATA, `${id}.figures.json`);
  if (!existsSync(figPath)) throw new Error(`no figures manifest at ${figPath}`);
  let figs: Record<string, FigSpec> = JSON.parse(readFileSync(figPath, "utf8"));

  // `--only=4,28` restricts the run to named questions. Without it a --replace
  // re-uploads EVERY figure in the worksheet, which for a mock-by-mock repair
  // means pushing dozens of untouched crops and orphaning their storage objects
  // for no gain. Repair the figures a paper actually uses, not the worksheet.
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  if (onlyArg) {
    const want = new Set(onlyArg.slice("--only=".length).split(",").map((s) => s.trim()).filter(Boolean));
    const missing = [...want].filter((q) => !(q in figs));
    if (missing.length) throw new Error(`--only names question(s) absent from ${id}.figures.json: ${missing.join(", ")}`);
    figs = Object.fromEntries(Object.entries(figs).filter(([q]) => want.has(q)));
  }

  const nums = Object.keys(figs);
  console.log(`${ws.chapterName}: ${nums.length} figure(s) to attach — Q${nums.join(", Q")}`);

  const crops = cropFigures(ws.pdf, figs, join(OUT, `${id}-figs`));
  console.log(`cropped ${Object.keys(crops).length} figure PNG(s) to ${join(OUT, `${id}-figs`)}`);

  if (!apply) {
    console.log("\n[dry-run] eyeball the cropped PNGs, then pass --apply to upload + set image_url.");
    if (replace) console.log("[dry-run] --replace is set: with --apply this would OVERWRITE existing image_url values.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let attached = 0;
  let replaced = 0;
  let skipped = 0;
  let missing = 0;

  for (const [qnum, pngPath] of Object.entries(crops)) {
    const { data: q, error } = await client
      .from("questions")
      .select("id, image_url")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ws.sourceFile)
      .eq("question_number", qnum)
      .maybeSingle();
    if (error) throw new Error(`Q${qnum} lookup: ${error.message}`);
    if (!q) { console.log(`  Q${qnum}: NO committed row — commit the question first; skipping`); missing++; continue; }
    const had = q.image_url;
    if (had && !replace) { console.log(`  Q${qnum}: image_url already set — skipping`); skipped++; continue; }
    const path = await uploadImage(client, ORG_ID, readFileSync(pngPath), "image/png");
    const { error: uErr } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
    if (uErr) throw new Error(`Q${qnum} set image_url: ${uErr.message}`);
    // The superseded object at `had` is NOT deleted — see the header. Only
    // scripts/sweep-orphan-images.ts can prove no other row still points at it.
    if (had) { console.log(`  Q${qnum}: REPLACED ${path}  (was ${had})`); replaced++; }
    else { console.log(`  Q${qnum}: attached ${path}`); attached++; }
  }

  console.log(`\nattached ${attached} · replaced ${replaced} · skipped ${skipped}${missing ? ` · no-row ${missing}` : ""}`);
  if (replaced) {
    console.log(`${replaced} superseded storage object(s) left in place — run scripts/sweep-orphan-images.ts to clear them.`);
  }
  console.log("done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
