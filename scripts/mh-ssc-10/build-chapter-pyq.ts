/**
 * Build a per-chapter Board-PYQ handout pair for MH-SSC-10 (Class 10 SSC) and
 * write it into that chapter's folder on disk, beside the existing Quiz pair.
 *
 *   npx tsx scripts/mh-ssc-10/build-chapter-pyq.ts                    # dry run (default)
 *   npx tsx scripts/mh-ssc-10/build-chapter-pyq.ts --apply            # write all 33 chapters
 *   npx tsx scripts/mh-ssc-10/build-chapter-pyq.ts --only=Circle      # one chapter
 *   npx tsx scripts/mh-ssc-10/build-chapter-pyq.ts --min-group=1      # keep every subtopic heading
 *   npx tsx scripts/mh-ssc-10/build-chapter-pyq.ts --out=<dir>        # write elsewhere (pilot review)
 *
 * Output per chapter (`<leaf>` = the chapter folder name, e.g. 03_Circle):
 *   <leaf>_PYQ.docx      — questions only, printable
 *   <leaf>_PYQ_Key.docx  — questions + full model solutions
 *
 * The documents are built by buildQuestionPaper / buildAnswerKey — the SAME code
 * path as a "download Question Paper / Answer Key" from /browse — so the output is
 * format-identical to what teachers already receive, and inherits the OMML math
 * pipeline, GFM pipe-table rendering and subjective-answer handling for free.
 *
 * SCOPE: current-syllabus chapters only (the 33 folders that exist on disk). See
 * chapter-pyq.ts for the registry and the deliberate old-syllabus exclusions.
 *
 * Read-only against the DB. Writes nothing but .docx files.
 */
import { existsSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { buildQuestionPaper, buildAnswerKey } from "@/lib/export/docxBuilder";
import { queryQuestionsByIds, type QuestionRow } from "@/lib/questions/query";
import { downloadImage } from "@/lib/storage/images";
import { EXAM_ID } from "./config";
import {
  CHAPTERS_ROOT,
  CHAPTER_TARGETS,
  chapterDocBaseName,
  orderChapterQuestions,
  type ChapterTarget,
} from "./chapter-pyq";

const YEARS = "2016–2026";
/** Board QPs publish no answer key — every answer here is derived/authored. Say so. */
const KEY_SUFFIX = "Answer Key (answers derived — board papers publish no official key)";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit?.slice(name.length + 3);
}

function paperTitle(t: ChapterTarget): string {
  return `Class 10 · ${t.part} · Ch. ${t.chapterNo} ${t.chapter} — Board PYQs ${YEARS}`;
}

function keyTitle(t: ChapterTarget): string {
  return `${paperTitle(t)} · ${KEY_SUFFIX}`;
}

/** Storage path → bytes, for the figures a chapter's questions reference. */
async function fetchImageBytes(
  client: SupabaseClient,
  questions: QuestionRow[]
): Promise<Map<string, Buffer>> {
  const paths = new Set<string>();
  for (const q of questions) {
    if (q.imageUrl) paths.add(q.imageUrl);
    if (q.solutionImageUrl) paths.add(q.solutionImageUrl);
    for (const opt of q.options) if (opt.imageUrl) paths.add(opt.imageUrl);
  }
  const out = new Map<string, Buffer>();
  await Promise.all(
    Array.from(paths).map(async (path) => {
      try {
        out.set(path, await downloadImage(client, path));
      } catch (err) {
        console.warn(`    ! image fetch failed ${path}: ${err instanceof Error ? err.message : err}`);
      }
    })
  );
  return out;
}

/** Resolve the registry against live taxonomy, failing loudly on any drift. */
async function resolveChapterIds(client: SupabaseClient) {
  const { data: subjects, error: sErr } = await client
    .from("subjects")
    .select("id, name")
    .eq("exam_id", EXAM_ID);
  if (sErr) throw new Error(`subject read failed: ${sErr.message}`);
  const subjectId = new Map((subjects ?? []).map((s) => [s.name as string, s.id as string]));

  const { data: chapters, error: cErr } = await client
    .from("chapters")
    .select("id, name, subject_id")
    .in("subject_id", Array.from(subjectId.values()));
  if (cErr) throw new Error(`chapter read failed: ${cErr.message}`);

  const key = (subject: string, chapter: string) => `${subject}|${chapter}`;
  const bySubjectId = new Map(Array.from(subjectId, ([name, id]) => [id, name]));
  const chapterId = new Map<string, string>();
  for (const c of chapters ?? []) {
    const subject = bySubjectId.get(c.subject_id as string);
    if (subject) chapterId.set(key(subject, c.name as string), c.id as string);
  }

  const missing = CHAPTER_TARGETS.filter((t) => !chapterId.has(key(t.subject, t.chapter)));
  if (missing.length > 0) {
    throw new Error(
      `registry drift — these chapters are not in the bank:\n` +
        missing.map((t) => `  ${t.subject} / ${t.chapter}`).join("\n") +
        `\nA DB chapter was renamed; fix scripts/mh-ssc-10/chapter-pyq.ts.`
    );
  }
  return (t: ChapterTarget) => chapterId.get(key(t.subject, t.chapter))!;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const only = arg("only");
  const outRoot = arg("out") ?? CHAPTERS_ROOT;
  const minGroup = Number(arg("min-group") ?? 2);
  if (!Number.isInteger(minGroup) || minGroup < 1) throw new Error("--min-group must be an integer >= 1");

  loadEnv();
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const chapterIdOf = await resolveChapterIds(client);
  const targets = only
    ? CHAPTER_TARGETS.filter(
        (t) =>
          t.chapter.toLowerCase().includes(only.toLowerCase()) ||
          t.dir.toLowerCase().includes(only.toLowerCase())
      )
    : CHAPTER_TARGETS;
  if (targets.length === 0) throw new Error(`--only=${only} matched no chapter`);

  console.log(
    `${apply ? "WRITE" : "DRY RUN"} · ${targets.length} chapter(s) · min-group=${minGroup}\n` +
      `root: ${outRoot}\n`
  );

  let totalQ = 0;
  let totalFolded = 0;
  let totalFigures = 0;
  let wrote = 0;
  const skipped: string[] = [];

  for (const target of targets) {
    const leaf = chapterDocBaseName(target);
    const dir = join(outRoot, ...target.dir.split("/"));

    const { data: ids, error } = await client
      .from("questions")
      .select("id")
      .eq("exam_id", EXAM_ID)
      .eq("chapter_id", chapterIdOf(target))
      .eq("visibility", "PUBLIC");
    if (error) throw new Error(`question read failed for ${target.chapter}: ${error.message}`);

    const rows = await queryQuestionsByIds(client, (ids ?? []).map((r) => r.id as string));
    if (rows.length === 0) {
      skipped.push(`${target.chapter} — no PUBLIC questions`);
      continue;
    }

    const ordered = orderChapterQuestions(rows, { minGroup });
    const folded = ordered.filter((q) => q.subtopic === null).length;
    const headings = new Set(ordered.map((q) => q.subtopic?.name ?? "Other"));
    const figures = ordered.filter((q) => q.imageUrl).length;
    const mcq = ordered.filter((q) => q.questionFormat !== "subjective").length;
    totalQ += ordered.length;
    totalFolded += folded;
    totalFigures += figures;

    console.log(
      `${target.subject.padEnd(24)} Ch.${String(target.chapterNo).padStart(2)} ${target.chapter}\n` +
        `    ${ordered.length} q (${mcq} mcq / ${ordered.length - mcq} subjective) · ` +
        `${headings.size} section(s)${folded ? ` · ${folded} folded into "Other"` : ""} · ${figures} figure(s)`
    );

    // Writing into the real chapter tree: the folder MUST already exist. A missing
    // one means the disk layout moved, and silently creating it would strand the
    // handout in a folder holding neither the textbook PDF nor the Quiz pair.
    // A custom --out is a scratch/review tree, so there we create as needed.
    const isRealRoot = outRoot === CHAPTERS_ROOT;
    if (isRealRoot && !existsSync(dir)) {
      skipped.push(`${target.chapter} — folder not found: ${dir}`);
      console.log(`    ! SKIPPED — folder not found`);
      continue;
    }
    if (existsSync(dir) && !statSync(dir).isDirectory()) {
      skipped.push(`${target.chapter} — not a directory: ${dir}`);
      continue;
    }

    if (!apply) continue;

    const imageBytes = await fetchImageBytes(client, ordered);
    const paper = await buildQuestionPaper({
      title: paperTitle(target),
      questions: ordered,
      imageBytes,
      groupBySubtopic: true,
    });
    const key = await buildAnswerKey({
      title: keyTitle(target),
      questions: ordered,
      includeSolutions: true,
      groupBySubtopic: true,
    });

    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, `${leaf}_PYQ.docx`), paper);
    writeFileSync(join(dir, `${leaf}_PYQ_Key.docx`), key);
    wrote += 2;
    console.log(`    -> ${leaf}_PYQ.docx (${Math.round(paper.length / 1024)} KB) + _PYQ_Key.docx (${Math.round(key.length / 1024)} KB)`);
  }

  console.log(
    `\n${apply ? `wrote ${wrote} file(s)` : "no files written (pass --apply)"} · ` +
      `${totalQ} questions · ${totalFolded} folded into "Other" · ${totalFigures} figures`
  );
  if (skipped.length > 0) console.log(`skipped:\n${skipped.map((s) => `  ${s}`).join("\n")}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
