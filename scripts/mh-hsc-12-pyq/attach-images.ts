/**
 * Attach the compilation's embedded figures to their committed questions.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/attach-images.ts <chapterId>          # dry-run
 *   npx tsx scripts/mh-hsc-12-pyq/attach-images.ts <chapterId> --apply
 *
 * Unlike the textbook pipelines there is NO cropping step: a .docx embeds each
 * picture as its own file under word/media/, so the figure arrives already
 * isolated. Run `unzip -j <docx> "word/media/*"` into out/media/ first — the
 * extractor records the filename on the row but does not unpack it.
 *
 * SIZE: Supabase storage caps an object at 1 MB. These are small line drawings
 * (5-35 KB), so no step-down is needed; the script REFUSES anything over the cap
 * rather than letting the upload throw halfway through a batch.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { OUT, EXAM_ID, requireChapter, questionsJsonPath } from "./config";
import type { PyqQuestion } from "./lib";

const BUCKET = "question-images";
const MAX_BYTES = 1_000_000;

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);
  loadEnv();

  const rows = (JSON.parse(readFileSync(questionsJsonPath(id), "utf8")) as PyqQuestion[]).filter((r) => r.image);
  if (!rows.length) {
    console.log(`${ch.chapterName}: no figures.`);
    return;
  }

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const plan: { ref: string; file: string; bytes: number; questionId: string; key: string }[] = [];
  const problems: string[] = [];

  for (const r of rows) {
    const file = join(OUT, "media", r.image!);
    if (!existsSync(file)) {
      problems.push(`${r.ref}: ${r.image} not unpacked — run unzip -j "<docx>" "word/media/*" into out/media/`);
      continue;
    }
    const bytes = readFileSync(file).length;
    if (bytes > MAX_BYTES) problems.push(`${r.ref}: ${r.image} is ${bytes} bytes, over the ${MAX_BYTES} cap`);

    // Match on source_file + question_number + YEAR. `ref` is a pipeline-internal
    // id and is not stored, so it cannot be the join key — and question_number
    // alone is NOT unique here: 20 tags in this compilation label different
    // questions, and in this very chapter the 2024 and 2025 circuit questions are
    // both "Q. 15". The year disambiguates them; a multi-hit still refuses rather
    // than picking the first, because a wrong figure is worse than none.
    const { data, error } = await client.from("questions").select("id")
      .eq("exam_id", EXAM_ID).eq("source_file", ch.sourceFile)
      .eq("question_number", r.questionNumber).eq("pyq_year", r.pyqYear);
    if (error) throw new Error(error.message);
    if (!data?.length) { problems.push(`${r.ref}: no committed row for "${r.questionNumber}" (${r.pyqYear})`); continue; }
    if (data.length > 1) { problems.push(`${r.ref}: "${r.questionNumber}" (${r.pyqYear}) matches ${data.length} rows — ambiguous`); continue; }

    plan.push({ ref: r.ref, file, bytes, questionId: data[0].id, key: `${id}/${r.image}` });
  }

  for (const p of plan) console.log(`  ${p.ref.padEnd(22)} ${String(p.bytes).padStart(7)} B  -> ${p.key}`);
  if (problems.length) {
    console.log(`\n${problems.length} problem(s):`);
    for (const p of problems) console.log(`  ${p}`);
    throw new Error("refusing to attach — resolve the problems above first.");
  }

  if (!apply) {
    console.log(`\n[dry-run] ${plan.length} figures ready. Pass --apply to upload.`);
    return;
  }

  for (const p of plan) {
    const { error: upErr } = await client.storage.from(BUCKET)
      .upload(p.key, readFileSync(p.file), { contentType: "image/png", upsert: true });
    if (upErr) throw new Error(`${p.ref}: upload failed — ${upErr.message}`);
    const { data: pub } = client.storage.from(BUCKET).getPublicUrl(p.key);
    const { error } = await client.from("questions").update({ image_url: pub.publicUrl }).eq("id", p.questionId);
    if (error) throw new Error(`${p.ref}: ${error.message}`);
    console.log(`  attached ${p.ref}`);
  }
  console.log(`\ndone. ${plan.length} figures attached.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
