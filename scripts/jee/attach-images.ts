/**
 * Phase 3b — upload + attach figures for the JEE Paper 1 pilot.
 *
 *   npx tsx scripts/jee/attach-images.ts          # dry-run (plan only)
 *   npx tsx scripts/jee/attach-images.ts --apply  # upload + set image_url
 *
 * Mapping (verified for Paper 1):
 *   stem-figure (1 image)      -> questions.image_url
 *   option-image (5 images)    -> img[0] = question figure, img[1..4] = options A,B,C,D
 *   option-image (4 images)    -> img[0..3] = options A,B,C,D (no question figure)
 *
 * Idempotent: skips any slot whose image_url is already set.
 */
import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import type { AllowedMime } from "../../src/lib/storage/images";

const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
const EXAM_ID = "56360311-614d-43ea-9cd9-8ca8178dd679";
const MEDIA_FALLBACK = join(__dirname, "out", "media", "media");

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

function resolveImage(ref: string): string | null {
  if (existsSync(ref)) return ref;
  const fb = join(MEDIA_FALLBACK, basename(ref));
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

async function uploadRef(client: SupabaseClient, ref: string): Promise<string> {
  const file = resolveImage(ref);
  if (!file) throw new Error(`image not found on disk: ${ref}`);
  const mime = mimeOf(file);
  if (!mime) throw new Error(`unsupported image type: ${file}`);
  return uploadImage(client, ORG_ID, readFileSync(file), mime);
}

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();
  const records: Rec[] = JSON.parse(readFileSync(join(__dirname, "out", "paper1.records.json"), "utf8"));
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
      .eq("question_number", String(r.questionNumber))
      .single();
    if (!q) {
      console.warn(`  Q${r.questionNumber}: question row not found — skipping`);
      continue;
    }

    if (plan.qImage && !q.image_url) {
      const path = await uploadRef(client, plan.qImage);
      const { error } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
      if (error) throw new Error(`Q${r.questionNumber} question image_url: ${error.message}`);
      qSet++;
    }

    for (const [label, ref] of Object.entries(plan.optImages)) {
      const opt = (q.options as { id: string; label: string; image_url: string | null }[]).find((o) => o.label === label);
      if (!opt || opt.image_url) continue;
      const path = await uploadRef(client, ref);
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
