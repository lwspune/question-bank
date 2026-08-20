/**
 * Attach the cropped board-paper figures to their committed questions.
 *
 *   python scripts/cbse-12-pyq/extract_figures.py --crop     # first: the crops
 *   npx tsx scripts/cbse-12-pyq/attach-images.ts             # dry run
 *   npx tsx scripts/cbse-12-pyq/attach-images.ts --apply
 *
 * THE JOIN KEY IS content_hash, and that is deliberate. The sibling pipelines
 * match on (source_file, question_number) because their rows come from one
 * paper — but here a question is REPRINTED across up to three series, commits
 * ONCE, and keeps whichever paper's source_file won the race. So the paper the
 * figure was cropped from is frequently NOT the source_file on the surviving
 * row, and matching by paper would miss most of them. The hash is what made the
 * row unique in the first place (migration 0038: org+exam+content_hash), and
 * figure-groups.ts computes it with the REAL hash functions, so the two agree by
 * construction rather than by convention.
 *
 * A MULTI-HIT IS A REFUSAL, NOT A PICK. A wrong figure on a question is worse
 * than no figure, and it is invisible afterwards: image_url is not part of
 * content_hash, so nothing downstream can detect a mis-attached image.
 *
 * Storage keys are namespaced `cbse-12-pyq/<hash12>.png`. The hash names the
 * question, so re-running after re-cropping overwrites in place rather than
 * orphaning the old object.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA, OUT, ORG_ID, EXAM_ID_CBSE_12 } from "./config";

const BUCKET = "question-images";
const MAX_BYTES = 1_000_000;

type Entry = {
  hash: string; from: string; page: number; file: string;
  bytes: number; members: number; picked?: boolean; source?: string;
};

async function main() {
  const apply = process.argv.includes("--apply");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const manifestPath = join(DATA, "figures.json");
  if (!existsSync(manifestPath)) {
    throw new Error("no data/figures.json — run: python scripts/cbse-12-pyq/extract_figures.py --crop");
  }
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as Entry[];

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const plan: { e: Entry; bytes: Buffer; questionId: string; key: string; qn: string }[] = [];
  const problems: string[] = [];

  for (const e of manifest) {
    const file = join(OUT, "figures", e.file);
    if (!existsSync(file)) {
      problems.push(`${e.hash.slice(0, 8)}: ${e.file} not on disk — re-run extract_figures.py --crop`);
      continue;
    }
    const bytes = readFileSync(file);
    if (bytes.length > MAX_BYTES) {
      problems.push(`${e.hash.slice(0, 8)}: ${bytes.length} bytes, over the ${MAX_BYTES} storage cap`);
      continue;
    }

    const { data, error } = await client
      .from("questions")
      .select("id, question_number, source_file, image_url")
      .eq("org_id", ORG_ID)
      .eq("exam_id", EXAM_ID_CBSE_12)
      .eq("content_hash", e.hash);
    if (error) throw new Error(`${e.hash.slice(0, 8)}: ${error.message}`);

    // A figure-bearing question that is ABSENT is a real signal, not a glitch:
    // 2025-65-7-3 Q1 was deliberately held out of the commit because it collides
    // with 65-7-1 Q1 on content_hash while being a different question.
    if (!data?.length) {
      problems.push(`${e.hash.slice(0, 8)} (${e.from}): no committed row — held out, or the transcription changed since the commit`);
      continue;
    }
    if (data.length > 1) {
      problems.push(`${e.hash.slice(0, 8)}: ${data.length} rows share this hash — ambiguous, refusing`);
      continue;
    }
    plan.push({
      e, bytes, questionId: data[0].id, qn: data[0].question_number,
      key: `cbse-12-pyq/${e.hash.slice(0, 12)}.png`,
    });
  }

  const already = plan.filter((p) => p.e.picked).length;
  console.log(`${manifest.length} crops -> ${plan.length} attachable (${already} from an adjudicated pick)`);
  for (const p of plan) {
    console.log(`  ${p.e.hash.slice(0, 8)}  ${String(p.bytes.length).padStart(7)} B  Q${p.qn.padEnd(6)} ${p.e.from}`);
  }
  if (problems.length) {
    console.log(`\n${problems.length} problem(s):`);
    for (const p of problems) console.log(`  ${p}`);
  }

  if (!apply) {
    console.log(`\n[dry run] nothing written. Pass --apply to upload and set image_url.`);
    return;
  }
  // Refuse the whole batch rather than attach a partial set: a half-applied run
  // is the state nobody can tell apart from a finished one.
  if (problems.length) throw new Error("refusing to attach — resolve the problems above first.");

  let n = 0;
  for (const p of plan) {
    const { error: upErr } = await client.storage
      .from(BUCKET)
      .upload(p.key, p.bytes, { contentType: "image/png", upsert: true });
    if (upErr) throw new Error(`${p.e.hash.slice(0, 8)}: upload failed — ${upErr.message}`);
    const { data: pub } = client.storage.from(BUCKET).getPublicUrl(p.key);
    const { error } = await client.from("questions")
      .update({ image_url: pub.publicUrl }).eq("id", p.questionId);
    if (error) throw new Error(`${p.e.hash.slice(0, 8)}: ${error.message}`);
    n++;
  }
  console.log(`\ndone. ${n} figures attached.`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
