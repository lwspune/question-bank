/**
 * Phase 3b — upload + attach figures for one JEE paper.
 *
 *   npx tsx scripts/jee/attach-images.ts <paperId>          # dry-run (plan only)
 *   npx tsx scripts/jee/attach-images.ts <paperId> --apply  # upload + set image_url
 *
 * Mapping:
 *   stem-figure (1 image)      -> questions.image_url
 *   option-image (5 images)    -> img[0] = question figure, img[1..4] = options A,B,C,D
 *   option-image (4 images)    -> img[0..3] = options A,B,C,D (no question figure)
 *
 * Idempotent: skips any slot whose image_url is already set. Rows are scoped by
 * source_file so question numbers can't collide across papers.
 */
import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import type { AllowedMime } from "../../src/lib/storage/images";
import { ORG_ID, EXAM_ID, loadPaper, recordsPath, mediaDir, requirePaperId } from "./config";

type Rec = { questionNumber: number; status: string; imageRefs: string[] };

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function mimeOf(path: string): AllowedMime | null {
  const ext = path.toLowerCase().split(".").pop();
  if (ext === "png") return "image/png";
  if (ext === "jpeg" || ext === "jpg") return "image/jpeg";
  return null;
}

function resolveImage(ref: string, fallbackDir: string): string | null {
  if (existsSync(ref)) return ref;
  const fb = join(fallbackDir, basename(ref));
  return existsSync(fb) ? fb : null;
}

/** [questionImage | null, {label->image}] for a record, per the mapping above. */
function planFor(rec: Rec): { qImage: string | null; optImages: Record<string, string> } {
  const refs = rec.imageRefs;
  if (rec.status === "ok") return { qImage: refs[0] ?? null, optImages: {} };
  // option-image
  const labels = ["A", "B", "C", "D"];
  if (refs.length === 5) {
    return { qImage: refs[0], optImages: Object.fromEntries(labels.map((l, i) => [l, refs[i + 1]])) };
  }
  if (refs.length === 4) {
    return { qImage: null, optImages: Object.fromEntries(labels.map((l, i) => [l, refs[i]])) };
  }
  throw new Error(`Q${rec.questionNumber}: unexpected image count ${refs.length}`);
}

async function uploadRef(client: SupabaseClient, ref: string, fallbackDir: string): Promise<string> {
  const file = resolveImage(ref, fallbackDir);
  if (!file) throw new Error(`image not found on disk: ${ref}`);
  const mime = mimeOf(file);
  if (!mime) throw new Error(`unsupported image type: ${file}`);
  return uploadImage(client, ORG_ID, readFileSync(file), mime);
}

async function main() {
  const apply = process.argv.includes("--apply");
  const paperId = requirePaperId(process.argv, 2, "attach-images.ts <paperId> [--apply]");
  loadEnv();
  const { sourceFile } = loadPaper(paperId);
  const fallbackDir = join(mediaDir(paperId), "media");
  const records: Rec[] = JSON.parse(readFileSync(recordsPath(paperId), "utf8"));
  const imgRecs = records.filter((r) => (r.status === "ok" || r.status === "image_options") && r.imageRefs.length > 0);

  console.log(`${imgRecs.length} image-bearing questions.`);
  for (const r of imgRecs) {
    const plan = planFor(r);
    console.log(`Q${r.questionNumber} [${r.status}] qImage=${plan.qImage ? "yes" : "-"} optImages=[${Object.keys(plan.optImages).join("")}]`);
  }
  if (!apply) {
    console.log("\n[dry-run] pass --apply to upload + attach.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let qSet = 0;
  let optSet = 0;
  for (const r of imgRecs) {
    const plan = planFor(r);
    const { data: q } = await client
      .from("questions")
      .select("id, image_url, options(id, label, image_url)")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", sourceFile)
      .eq("question_number", String(r.questionNumber))
      .single();
    if (!q) {
      console.warn(`  Q${r.questionNumber}: question row not found — skipping`);
      continue;
    }

    if (plan.qImage && !q.image_url) {
      const path = await uploadRef(client, plan.qImage, fallbackDir);
      const { error } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
      if (error) throw new Error(`Q${r.questionNumber} question image_url: ${error.message}`);
      qSet++;
    }

    for (const [label, ref] of Object.entries(plan.optImages)) {
      const opt = (q.options as { id: string; label: string; image_url: string | null }[]).find((o) => o.label === label);
      if (!opt || opt.image_url) continue;
      const path = await uploadRef(client, ref, fallbackDir);
      const { error } = await client.from("options").update({ image_url: path }).eq("id", opt.id);
      if (error) throw new Error(`Q${r.questionNumber} opt ${label} image_url: ${error.message}`);
      optSet++;
    }
    console.log(`  Q${r.questionNumber}: done`);
  }
  console.log(`\nattached: ${qSet} question figures + ${optSet} option images.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
