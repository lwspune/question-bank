/**
 * Attach stem figures for one MHT-CET shift.
 *
 *   npx tsx scripts/mhtcet/attach-images.ts <shiftId>          # dry-run (plan only)
 *   npx tsx scripts/mhtcet/attach-images.ts <shiftId> --apply  # upload + set image_url
 *
 * MHT-CET questions carry at most a single STEM figure (a circuit/graph/diagram the
 * stem refers to). The choices themselves are never pictures in the committed bank —
 * option-image questions (e.g. "which structure is X?") are handled at derive time by
 * DESCRIBING each option in text (set `optionImages: true` in shifts/<id>.json to skip
 * them here). Multi-image stems are composited into one image by a one-off before this
 * runs (then listed with a single resolved ref); a record left with >1 ref is warned.
 *
 * Idempotent: skips a question whose image_url is already set. Scoped by source_file.
 */
import { existsSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { uploadImage, type AllowedMime } from "../../src/lib/storage/images";
import { ORG_ID, EXAM_ID, loadShift, recordsPath, mediaDir, requireShiftId } from "./config";

type Rec = { questionNumber: number; imageRefs: string[] };

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

async function uploadRef(client: SupabaseClient, ref: string, fallbackDir: string): Promise<string> {
  const file = resolveImage(ref, fallbackDir);
  if (!file) throw new Error(`image not found on disk: ${ref}`);
  const mime = mimeOf(file);
  if (!mime) throw new Error(`unsupported image type: ${file}`);
  return uploadImage(client, ORG_ID, readFileSync(file), mime);
}

async function main() {
  const apply = process.argv.includes("--apply");
  const shiftId = requireShiftId(process.argv, 2, "attach-images.ts <shiftId> [--apply]");
  loadEnv();
  const shift = loadShift(shiftId);
  const fallbackDir = join(mediaDir(shiftId), "media");
  const records: Rec[] = JSON.parse(readFileSync(recordsPath(shiftId), "utf8"));
  const byNum = new Map(records.map((r) => [r.questionNumber, r]));

  // figure index per question: explicit figureRefIndex wins; default 0; -1 = skip.
  const figIdx = (n: number) => shift.questions[String(n)]?.figureRefIndex ?? 0;
  const isOptFig = (n: number) => Boolean(shift.questions[String(n)]?.optionFigures);

  // "which graph/structure" questions: attach option images (5 refs -> stem + A-D; 4 refs -> A-D).
  const optFigTargets = Object.entries(shift.questions)
    .filter(([, q]) => q.optionFigures)
    .map(([key]) => Number(key))
    .filter((n) => [4, 5].includes(byNum.get(n)?.imageRefs.length ?? 0))
    .sort((a, b) => a - b);

  // Stem-figure questions = committed, not option-image/option-figure, has refs, not skipped (idx -1).
  const targets = Object.entries(shift.questions)
    .filter(([, q]) => !q.optionImages && !q.optionFigures)
    .map(([key]) => Number(key))
    .filter((n) => (byNum.get(n)?.imageRefs.length ?? 0) > 0 && figIdx(n) >= 0)
    .sort((a, b) => a - b);

  console.log(`${targets.length} stem-figure questions: ${targets.join(", ")}`);
  for (const n of targets) {
    const refs = byNum.get(n)!.imageRefs;
    if (refs.length > 1) console.warn(`  Q${n}: ${refs.length} images — attaching index ${figIdx(n)} (set figureRefIndex to pick / -1 to skip)`);
  }
  console.log(`${optFigTargets.length} option-figure questions: ${optFigTargets.join(", ")}`);
  if (!apply) {
    console.log("\n[dry-run] pass --apply to upload + attach.");
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let set = 0;
  for (const n of targets) {
    const ref = byNum.get(n)!.imageRefs[figIdx(n)];
    if (!ref) {
      console.warn(`  Q${n}: figureRefIndex ${figIdx(n)} out of range — skipping`);
      continue;
    }
    const { data: q } = await client
      .from("questions")
      .select("id, image_url")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", shift.sourceFile)
      .eq("question_number", String(n))
      .single();
    if (!q) {
      console.warn(`  Q${n}: question row not found — skipping`);
      continue;
    }
    if (q.image_url) {
      console.log(`  Q${n}: image already set — skip`);
      continue;
    }
    const path = await uploadRef(client, ref, fallbackDir);
    const { error } = await client.from("questions").update({ image_url: path }).eq("id", q.id);
    if (error) throw new Error(`Q${n} image_url: ${error.message}`);
    set++;
    console.log(`  Q${n}: attached`);
  }

  // Option-figure questions: 5 refs -> [stem, A, B, C, D]; 4 refs -> [A, B, C, D].
  let optSet = 0;
  for (const n of optFigTargets) {
    const refs = byNum.get(n)!.imageRefs;
    const labels = ["A", "B", "C", "D"];
    const stemRef = refs.length === 5 ? refs[0] : null;
    const optRefs = refs.length === 5 ? refs.slice(1) : refs;
    const { data: q } = await client
      .from("questions")
      .select("id, image_url, options(id, label, image_url)")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", shift.sourceFile)
      .eq("question_number", String(n))
      .single();
    if (!q) { console.warn(`  Q${n}: row not found — skip`); continue; }
    if (stemRef && !q.image_url) {
      const path = await uploadRef(client, stemRef, fallbackDir);
      await client.from("questions").update({ image_url: path }).eq("id", q.id);
    }
    for (let i = 0; i < 4; i++) {
      const opt = (q.options as { id: string; label: string; image_url: string | null }[]).find((o) => o.label === labels[i]);
      if (!opt || opt.image_url) continue;
      const path = await uploadRef(client, optRefs[i], fallbackDir);
      const { error } = await client.from("options").update({ image_url: path }).eq("id", opt.id);
      if (error) throw new Error(`Q${n} opt ${labels[i]} image_url: ${error.message}`);
      optSet++;
    }
    console.log(`  Q${n}: option figures attached`);
  }
  console.log(`\nattached ${set} stem figures + ${optSet} option images.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
