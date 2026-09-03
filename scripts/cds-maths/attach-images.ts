/**
 * Upload the verified figure crops and set `questions.image_url`.
 *
 *   npx tsx scripts/cds-maths/attach-images.ts <paperId>          # dry-run
 *   npx tsx scripts/cds-maths/attach-images.ts <paperId> --apply  # upload + link
 *
 * Reads data/<id>.fig.json (written by snap-crop.ts) and re-crops from the source
 * PDF at 3x, so the bytes uploaded are derived from the same bbox the visual
 * verify looked at.
 *
 * RUN `verify-figures.ts` AND ACTUALLY LOOK AT THE PANELS FIRST. snapCrop's
 * `ok: true` is computed from the anchors, not from the figure — it cannot tell
 * you the crop contains the whole diagram, and the core is blind to line art
 * paler than INK=165. Both have shipped clipped figures in this repo.
 *
 * Idempotent: a question whose `image_url` is already set is skipped rather than
 * re-uploaded, so a re-run cannot orphan a storage object. If a bbox is genuinely
 * wrong, clear that row's image_url deliberately and sweep the orphan.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import { EXAM_ID, ORG_ID, OUT, dataPath, requirePaper } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Fig = { ref: string; page: number; bbox: [number, number, number, number] };

function cropFigures(pdf: string, figs: Fig[], dir: string): Record<string, string> {
  const py = `
import fitz, json, sys, os
pdf, figs_json, outdir = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(outdir, exist_ok=True)
doc = fitz.open(pdf); out = {}
for f in json.loads(figs_json):
    pg = doc[f["page"]]; r = pg.rect
    x0, y0, x1, y1 = f["bbox"]
    clip = fitz.Rect(r.width*x0, r.height*y0, r.width*x1, r.height*y1)
    p = f"{outdir}/{f['ref']}.png"
    pg.get_pixmap(matrix=fitz.Matrix(3.0, 3.0), clip=clip).save(p)
    out[f["ref"]] = p
print(json.dumps(out))
`;
  const res = spawnSync("python", ["-c", py, pdf, JSON.stringify(figs), dir], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (res.status !== 0) throw new Error(`crop failed: ${res.stderr}`);
  return JSON.parse(res.stdout.trim().split("\n").pop()!);
}

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  loadEnv();

  const fPath = dataPath(paper.id, "fig");
  if (!existsSync(fPath)) throw new Error(`missing ${fPath} — run snap-crop.ts --write first`);
  const figs: Fig[] = JSON.parse(readFileSync(fPath, "utf8"));

  const dir = join(OUT, paper.id, "attach");
  const crops = cropFigures(paper.pdf, figs, dir);
  console.log(`${paper.id}: ${figs.length} figure(s) cropped to ${dir}`);

  if (!apply) {
    console.log("\n[dry-run] confirm you have LOOKED at the verify panels, then pass --apply.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let attached = 0;
  for (const f of figs) {
    const qnum = f.ref.replace(/^Q/, "");
    const { data: q, error } = await client
      .from("questions")
      .select("id, image_url")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .eq("question_number", qnum)
      .maybeSingle();
    if (error) throw new Error(`${f.ref} lookup: ${error.message}`);
    if (!q) {
      // Not a skip to shrug at: the question this figure belongs to is not in the
      // bank, so a stem saying "in the figure given below" is shipping with nothing.
      console.log(`  ${f.ref}: NO committed row — the figure has no home. Investigate.`);
      continue;
    }
    if (q.image_url) {
      console.log(`  ${f.ref}: image_url already set — skipping`);
      continue;
    }
    const path = await uploadImage(client, ORG_ID, readFileSync(crops[f.ref]), "image/png");
    const { error: uErr } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
    if (uErr) throw new Error(`${f.ref} set image_url: ${uErr.message}`);
    console.log(`  ${f.ref}: attached ${path}`);
    attached += 1;
  }

  // Read back: every question the transcription marked hasFigure must now carry one.
  const { data: rows } = await client
    .from("questions")
    .select("question_number, image_url")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile)
    .not("image_url", "is", null);
  const have = new Set((rows ?? []).map((r) => `Q${r.question_number}`));
  const missing = figs.map((f) => f.ref).filter((r) => !have.has(r));
  console.log(`\nattached ${attached}; ${have.size} row(s) of this paper now carry an image_url.`);
  if (missing.length) throw new Error(`figures still unattached: ${missing.join(", ")}`);
  console.log(`verified: all ${figs.length} figure questions have an image.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
