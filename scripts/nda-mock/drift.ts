/**
 * Does a paper's CURRENT extraction still match what is in the bank?
 *
 *   npx tsx scripts/nda-mock/drift.ts m1
 *
 * content_hash is derived from stem + options + answer, so any later parser
 * change silently invalidates an already-committed paper: re-running commit
 * would INSERT a second copy rather than upsert. Run this after touching the
 * parser, before re-committing anything.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { buildRecords, type MockQuestion, type Catalog } from "./lib";
import { requirePaper, DATA, EXAM_ID, SUBJECT_NAME } from "./config";
import type { ExtractedQuestion } from "./extract";
import type { Adjudicated } from "./adjudicate";

function loadEnv() {
  require("dotenv").config({
    path: join(process.cwd(), ".env.local"),
    override: true,
  });
}

async function main() {
  const paper = requirePaper(process.argv[2]);
  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: rowsDb } = await client
    .from("questions")
    .select("question_number,content_hash,text")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  if (!rowsDb?.length) {
    console.log(`${paper.id}: not in the bank yet — nothing to drift from.`);
    return;
  }

  const { data: subject } = await client
    .from("subjects")
    .select("id")
    .eq("exam_id", EXAM_ID)
    .eq("name", SUBJECT_NAME)
    .single();
  const { data: chapters } = await client
    .from("chapters")
    .select("name,subtopics(name)")
    .eq("subject_id", subject!.id);
  const catalog: Catalog = {};
  for (const c of chapters ?? []) {
    catalog[c.name] = ((c.subtopics ?? []) as { name: string }[]).map((s) => s.name);
  }

  const extracted: ExtractedQuestion[] = JSON.parse(
    readFileSync(join(DATA, `${paper.id}.extract.json`), "utf8"),
  );
  const adj = new Map(
    (JSON.parse(readFileSync(join(DATA, `${paper.id}.adjudication.json`), "utf8")) as Adjudicated[]).map(
      (a) => [a.number, a],
    ),
  );
  const questions: MockQuestion[] = extracted.map((e) => {
    const a = adj.get(e.number);
    return {
      number: e.number,
      numberLabel: e.numberLabel,
      stem: e.stem,
      options: e.options,
      context: e.context,
      setLabel: e.setLabel,
      solution: e.solution,
      answer: a?.resolved ?? null,
      chapter: a?.chapter ?? "",
      subtopic: a?.subtopic ?? "",
      difficulty: a?.difficulty ?? "MODERATE",
    };
  });
  const { rows } = buildRecords(questions, catalog, {
    subjectName: SUBJECT_NAME,
  });

  // A row absent from THIS source_file may still be in the bank: content_hash is
  // unique per (org, exam), so a question shared with an earlier paper was
  // deduped into that paper's source_file. That is expected, not drift — and
  // reporting it as drift would bury a real hash change among the noise.
  const { data: elsewhere } = await client
    .from("questions")
    .select("content_hash,source_file,question_number")
    .eq("exam_id", EXAM_ID)
    .in(
      "content_hash",
      rows.map((r) => r.contentHash),
    );
  const byHash = new Map((elsewhere ?? []).map((r) => [r.content_hash, r]));

  const dbByNum = new Map(rowsDb.map((r) => [r.question_number, r]));
  const drifted: string[] = [];
  const deduped: string[] = [];
  for (const r of rows) {
    const db = dbByNum.get(r.questionNumber!);
    if (!db) {
      const twin = byHash.get(r.contentHash);
      // Expected dedup means a twin at a different (source_file, number) PAIR.
      // Both halves are load-bearing, and each was got wrong on its own first:
      //   * requiring a different SOURCE_FILE misses Mock 7's Q89, a duplicate of
      //     Q88 within the same paper;
      //   * requiring a different NUMBER misses Mock 6's nine questions shared
      //     with Mock 5, which sit at IDENTICAL numbers in both papers.
      // Either mistake reports an expected drop as a lost question, which is the
      // one thing this check must never cry wolf about.
      const sameRow =
        twin &&
        twin.source_file === paper.sourceFile &&
        String(twin.question_number) === String(r.questionNumber);
      if (twin && !sameRow) {
        deduped.push(`Q${r.questionNumber} -> ${twin.source_file} Q${twin.question_number}`);
      } else {
        drifted.push(`Q${r.questionNumber}: not in the bank at all`);
      }
    } else if (db.content_hash !== r.contentHash) {
      drifted.push(`Q${r.questionNumber}: hash changed (stored != re-extracted)`);
    }
  }

  console.log(`\n=== ${paper.label} — drift check ===`);
  console.log(
    `bank rows: ${rowsDb.length}   re-extracted: ${rows.length}   ` +
      `deduped elsewhere: ${deduped.length}   drifted: ${drifted.length}`,
  );
  for (const d of deduped) console.log(`  dedup  ${d}`);
  for (const d of drifted.slice(0, 30)) console.log(`  DRIFT  ${d}`);
  if (drifted.length) {
    console.log(`\nRe-committing would INSERT duplicates. Update the stored rows in place instead.`);
    process.exitCode = 1;
  } else {
    console.log("clean — the committed rows still match the current parser.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
