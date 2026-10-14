// Attach the book's own figures to committed AFCAT questions.
//
//   npx tsx scripts/afcat/attach-figures.ts <chapterId>            # dry run: crops + plan
//   npx tsx scripts/afcat/attach-figures.ts <chapterId> --apply
//
// A Group C transcript records a question's figure as {page, bbox} (find the
// box with figure-boxes.py). This crops that box from the source PDF
// (crop-figures.py), uploads it to `question-images` under
// afcat/<chapterId>/<file key>-<question id>.png and stores that bucket PATH in
// questions.image_url (the convention the render layer resolves).
//
// The row is found by exam + source_file + question_number, which is unique
// within an AFCAT file. A miss on a question the build excluded is expected;
// any other miss, or more than one hit, refuses the whole run: a wrong figure
// on a question is worse than none, and image_url is not in content_hash, so
// nothing later would notice it.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, OUT, SOURCE_ROOT, DATA, sourceFileOf } from "./config";
import { buildChapter, readJson } from "./build";
import { loadChapter, qid } from "./read";
import type { ShufflePlan } from "../worksheets/lib";
import { adminClient, afcatExamId } from "./db";

const BUCKET = "question-images";

async function main() {
  const chapter = requireChapter(process.argv[2]);
  const apply = process.argv.includes("--apply");
  const shuffles = readJson<ShufflePlan>(join(DATA, `${chapter.id}.shuffles.json`), {});
  const excluded = new Set(buildChapter(chapter, { shuffles }).flatMap((f) => f.excluded));

  const dir = join(OUT, chapter.id, "figures");
  mkdirSync(dir, { recursive: true });
  const jobs: { pdf: string; page: number; bbox: number[]; pad?: number; out: string; id: string; sourceFile: string; key: string }[] = [];
  for (const { file, fileIndex, records } of loadChapter(chapter)) {
    for (const r of records) {
      if (!r.figure) continue;
      const id = qid(fileIndex, r.n);
      if (excluded.has(id)) {
        console.log(`  ${id}: excluded by the build, no figure attached`);
        continue;
      }
      jobs.push({
        pdf: join(SOURCE_ROOT, file.path),
        page: r.figure.page,
        bbox: r.figure.bbox,
        pad: r.figure.pad,
        out: join(dir, `${file.key}-${id}.png`),
        id,
        sourceFile: sourceFileOf(chapter, file),
        key: `afcat/${chapter.id}/${file.key}-${id}.png`,
      });
    }
  }
  if (!jobs.length) return console.log(`${chapter.chapterName}: no figures in the transcript.`);
  const jobsPath = join(dir, "jobs.json");
  writeFileSync(jobsPath, JSON.stringify(jobs.map(({ pdf, page, bbox, pad, out }) => ({ pdf, page, bbox, pad, out })), null, 2));
  console.log(execFileSync("python", [join(__dirname, "crop-figures.py"), jobsPath], { encoding: "utf8" }));

  const client = adminClient();
  const examId = await afcatExamId(client);
  const plan: { job: (typeof jobs)[number]; questionId: string; current: string | null }[] = [];
  const problems: string[] = [];
  for (const job of jobs) {
    const { data, error } = await client
      .from("questions")
      .select("id, image_url")
      .eq("exam_id", examId)
      .eq("source_file", job.sourceFile)
      .eq("question_number", job.id);
    if (error) throw new Error(`${job.id}: ${error.message}`);
    if (!data?.length) problems.push(`${job.id}: no committed row under ${job.sourceFile}`);
    else if (data.length > 1) problems.push(`${job.id}: ${data.length} rows, refusing`);
    else plan.push({ job, questionId: data[0].id, current: data[0].image_url });
  }
  for (const p of plan) console.log(`  ${p.job.id} -> ${p.job.key}${p.current && p.current !== p.job.key ? `  (replaces ${p.current})` : ""}`);
  if (problems.length) throw new Error(`refusing:\n  ${problems.join("\n  ")}`);
  if (!apply) return console.log(`[dry run] ${plan.length} figure(s); look at ${dir}, then pass --apply.`);

  for (const p of plan) {
    const { error: upErr } = await client.storage.from(BUCKET).upload(p.job.key, readFileSync(p.job.out), { contentType: "image/png", upsert: true });
    if (upErr) throw new Error(`${p.job.id}: upload failed: ${upErr.message}`);
    const { error } = await client.from("questions").update({ image_url: p.job.key }).eq("id", p.questionId);
    if (error) throw new Error(`${p.job.id}: update failed: ${error.message}`);
  }
  console.log(`attached ${plan.length} figure(s).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
