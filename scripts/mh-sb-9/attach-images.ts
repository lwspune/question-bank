/**
 * Crop each figure-question's diagram from the chapter PDF, upload it, and set
 * questions.image_url. The State Board switching-circuit figures are VECTOR-drawn
 * (not extractable raster objects), so we crop a bbox region off the rendered
 * page. Mirrors scripts/foundation/attach-images.ts but takes FRACTIONAL bboxes
 * (0-1 of the page, display-independent — the NEET pattern) so a vision agent can
 * give them off the rendered PNGs.
 *
 *   npx tsx scripts/mh-sb-9/attach-images.ts <chapterId>          # dry-run: crop to out/ for eyeballing
 *   npx tsx scripts/mh-sb-9/attach-images.ts <chapterId> --apply  # upload + set image_url
 *
 * Manifest: merged from data/<id>.*fig.json entries carrying `page` (0-based) +
 * `bbox` ([x0,y0,x1,y1] fractional). The question rows must already be committed
 * (looked up by exam + source_file + question_number). Idempotent: skips a row
 * whose image_url is already set.
 */
import { readFileSync, readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { uploadImage, MAX_SIZE_BYTES } from "../../src/lib/storage/images";
import { ORG_ID, EXAM_ID, OUT, DATA, requireChapter } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type FigSpec = { page: number; bbox: [number, number, number, number] };

/** Read every data/<id>.*fig.json fragment and collect {ref: {page, bbox}}. */
function loadManifest(id: string): Record<string, FigSpec> {
  const files = readdirSync(DATA).filter((f) => f.startsWith(`${id}.`) && f.endsWith("fig.json"));
  const out: Record<string, FigSpec> = {};
  for (const f of files) {
    const frag = JSON.parse(readFileSync(join(DATA, f), "utf8")) as Array<{
      ref: string; page?: number; bbox?: [number, number, number, number];
    }>;
    for (const q of frag) {
      if (q.page === undefined || !q.bbox) continue;
      if (out[q.ref]) throw new Error(`duplicate figure ref "${q.ref}" (in ${f})`);
      out[q.ref] = { page: q.page, bbox: q.bbox };
    }
  }
  return out;
}

/** Crop each fractional bbox via PyMuPDF; returns {ref: imagePath}. Size-aware. */
function cropFigures(pdf: string, figs: Record<string, FigSpec>, dir: string): Record<string, string> {
  mkdirSync(dir, { recursive: true });
  // 4x is right for a small line-art diagram (a Venn diagram, a flowchart), but
  // the Geography chapters crop NEAR-FULL-PAGE colour maps and photographs — the
  // Exogenetic-2 landform panorama lands at 7.2 MB against the 1 MB storage cap
  // (MAX_SIZE_BYTES in src/lib/storage/images) and the upload simply throws. So
  // step the render scale down until the PNG fits, then fall back to JPEG (also
  // an ALLOWED_MIME) when even a modest scale won't compress — a printed
  // photograph is already lossy, so JPEG costs nothing real and stays legible.
  // Small figures still take the 4x PNG path on the first try, unchanged.
  // Ported from scripts/mh-ssc-10/attach-images.ts, which hit this first.
  const py = `
import fitz, json, sys, re, io
from PIL import Image
pdf, figs, outdir, budget = sys.argv[1], json.loads(sys.argv[2]), sys.argv[3], int(sys.argv[4])
d = fitz.open(pdf); out = {}
for ref, spec in figs.items():
    pg = d[spec["page"]]; w, h = pg.rect.width, pg.rect.height
    fx0, fy0, fx1, fy1 = spec["bbox"]
    clip = fitz.Rect(fx0*w, fy0*h, fx1*w, fy1*h)
    slug = re.sub(r'[^A-Za-z0-9]+', '_', ref).strip('_')
    chosen = None
    for scale in (4, 3, 2.5, 2):
        pix = pg.get_pixmap(matrix=fitz.Matrix(scale, scale), clip=clip)
        data = pix.tobytes("png")
        if len(data) <= budget:
            p = outdir + "/fig-" + slug + ".png"
            open(p, "wb").write(data); chosen = (p, scale, "png", len(data)); break
    if chosen is None:
        pix = pg.get_pixmap(matrix=fitz.Matrix(3, 3), clip=clip)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        for q in (88, 80, 70, 60):
            buf = io.BytesIO(); img.save(buf, "JPEG", quality=q, optimize=True)
            if buf.tell() <= budget or q == 60:
                p = outdir + "/fig-" + slug + ".jpg"
                open(p, "wb").write(buf.getvalue()); chosen = (p, 3, "jpeg q%d" % q, buf.tell()); break
    p, scale, fmt, size = chosen
    print("  %-14s %sx %-9s %6d KB" % (ref, scale, fmt, size // 1024), file=sys.stderr)
    out[ref] = p
print(json.dumps(out))
`;
  const budget = Math.floor(MAX_SIZE_BYTES * 0.95); // headroom under the hard cap
  const res = spawnSync("python", ["-c", py, pdf, JSON.stringify(figs), dir, String(budget)], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
  });
  if (res.status !== 0) throw new Error(`crop failed: ${res.stderr}`);
  if (res.stderr.trim()) console.log(res.stderr.trimEnd());
  return JSON.parse(res.stdout.trim().split("\n").pop()!);
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force"); // re-upload even if image_url already set (leaves the old object orphaned — sweep later)
  const ch = requireChapter(id);
  loadEnv();

  const figs = loadManifest(id);
  const refs = Object.keys(figs);
  if (refs.length === 0) throw new Error(`no figure specs found in data/${id}.*fig.json`);
  console.log(`${ch.chapterName}: ${refs.length} figure(s) to crop.`);

  const crops = cropFigures(ch.pdf, figs, join(OUT, `${id}-figs`));
  console.log(`cropped ${Object.keys(crops).length} PNG(s) to ${join(OUT, `${id}-figs`)}`);

  if (!apply) {
    console.log("\n[dry-run] eyeball the cropped PNGs (leak/completeness), then pass --apply to upload + set image_url.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let attached = 0, missing = 0;
  for (const [ref, pngPath] of Object.entries(crops)) {
    const { data: q, error } = await client
      .from("questions")
      .select("id, image_url")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", ch.sourceFile)
      .eq("question_number", ref)
      .maybeSingle();
    if (error) throw new Error(`"${ref}" lookup: ${error.message}`);
    if (!q) { console.log(`  "${ref}": NO committed row — commit the question first; skipping`); missing++; continue; }
    if (q.image_url && !force) { console.log(`  "${ref}": image_url already set — skipping (use --force to overwrite)`); continue; }
    const mime = pngPath.endsWith(".jpg") ? "image/jpeg" : "image/png";
    const path = await uploadImage(client, ORG_ID, readFileSync(pngPath), mime);
    const { error: uErr } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
    if (uErr) throw new Error(`"${ref}" set image_url: ${uErr.message}`);
    console.log(`  "${ref}": attached ${path}`);
    attached++;
  }
  console.log(`\ndone. attached ${attached}, missing-row ${missing}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
