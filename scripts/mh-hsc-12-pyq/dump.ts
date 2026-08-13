/**
 * Emit the per-chapter inputs the subtopic-assignment, key-derivation and
 * solution-authoring passes read.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/dump.ts <chapterId>
 *   npx tsx scripts/mh-hsc-12-pyq/dump.ts --all
 *
 * Writes into out/ (gitignored — these are derived, the reviewed OUTPUT goes in
 * data/):
 *   <id>.blind-mcq.json      stem + options ONLY. No key, no solution field.
 *   <id>.subjective.json     the free-response rows needing a model answer.
 *   <id>.practice-corpus.json  the chapter's EXISTING textbook rows with their
 *                            worked solutions — the calibration source for
 *                            subtopic assignment and the reuse source for
 *                            authoring, since ~30% of these board questions
 *                            have a near-verbatim solved twin already in the bank.
 *
 * The blind dump is a separate file rather than a filtered view of the full one
 * because "blind" has to be true at the FILE level: an agent told to ignore a
 * field it can see is not blind, it is trusted. There is no answer key in this
 * source at all, so the derivation is the primary evidence — but withholding is
 * what makes a SECOND derivation independent of the first.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { OUT, EXAM_ID, CHAPTERS, requireChapter, type Chapter } from "./config";
import type { Draft } from "./extract";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function dumpOne(client: SupabaseClient, ch: Chapter) {
  const draftPath = join(OUT, `${ch.id}.draft.json`);
  if (!existsSync(draftPath)) throw new Error(`${ch.id}: no draft — run extract.ts then dedupe.ts`);
  const rows = JSON.parse(readFileSync(draftPath, "utf8")) as Draft[];

  const { data: subj } = await client.from("subjects").select("id,name").eq("exam_id", EXAM_ID);
  const maths = (subj ?? []).find((s: { name: string }) => s.name === ch.subjectName);
  if (!maths) throw new Error(`subject ${ch.subjectName} not found`);
  const { data: chapter } = await client
    .from("chapters").select("id,name").eq("subject_id", maths.id).eq("name", ch.chapterName).single();
  if (!chapter) throw new Error(`chapter "${ch.chapterName}" not found — check the exact DB spelling`);

  const { data: subtopics } = await client
    .from("subtopics").select("id,name,order_index").eq("chapter_id", chapter.id).order("order_index");
  const byId = Object.fromEntries((subtopics ?? []).map((s: { id: string; name: string }) => [s.id, s.name]));

  // Only the TEXTBOOK rows: the board PYQs we are about to add would otherwise
  // calibrate against themselves once a chapter is re-run.
  const { data: practice } = await client
    .from("questions")
    .select("text,solution,subtopic_id,question_format,options(label,text,is_correct)")
    .eq("chapter_id", chapter.id).eq("visibility", "PUBLIC").eq("question_kind", "practice");

  const mcq = rows.filter((r) => r.format === "mcq");
  const subjective = rows.filter((r) => r.format === "subjective");

  writeFileSync(
    join(OUT, `${ch.id}.blind-mcq.json`),
    JSON.stringify(mcq.map((r) => ({ ref: r.ref, stem: r.stem, options: r.options })), null, 2) + "\n",
  );
  writeFileSync(
    join(OUT, `${ch.id}.subjective.json`),
    JSON.stringify(
      subjective.map((r) => ({ ref: r.ref, year: r.pyqYear, stem: r.stem, image: r.image })),
      null, 2,
    ) + "\n",
  );
  writeFileSync(
    join(OUT, `${ch.id}.practice-corpus.json`),
    JSON.stringify(
      (practice ?? []).map((q) => ({
        subtopic: byId[q.subtopic_id as string] ?? "(unfiled)",
        format: q.question_format,
        text: q.text,
        options: ((q.options ?? []) as { label: string; text: string; is_correct: boolean }[])
          .map((o) => `${o.label}${o.is_correct ? "*" : ""}) ${o.text}`),
        solution: q.solution,
      })),
      null, 2,
    ) + "\n",
  );

  const tally = new Map<string, number>();
  for (const p of practice ?? []) {
    const n = byId[p.subtopic_id as string] ?? "(unfiled)";
    tally.set(n, (tally.get(n) ?? 0) + 1);
  }
  console.log(`${ch.chapterName.padEnd(36)} ${String(rows.length).padStart(3)} rows (${mcq.length} mcq) | ${practice?.length ?? 0} practice rows across ${ch.subtopics.length} subtopics`);
  return { id: ch.id, chapter: ch.chapterName, rows: rows.length, mcq: mcq.length, subtopics: ch.subtopics, practiceBySubtopic: Object.fromEntries(tally) };
}

async function main() {
  mkdirSync(OUT, { recursive: true });
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const ids = process.argv.includes("--all") ? Object.keys(CHAPTERS) : [process.argv[2]];
  const index = [];
  for (const id of ids) index.push(await dumpOne(client, requireChapter(id)));
  writeFileSync(join(OUT, "chapter-index.json"), JSON.stringify(index, null, 2) + "\n");
  console.log(`\n-> ${join(OUT, "chapter-index.json")}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
