/**
 * Update an ALREADY-COMMITTED paper's stored text in place from the current
 * extraction.
 *
 *   npx tsx scripts/nda-mock/resync.ts m1           # dry-run
 *   npx tsx scripts/nda-mock/resync.ts m1 --apply   # write
 *
 * Needed whenever a parser fix changes text that has already been committed.
 * A plain re-commit is the WRONG remedy: `commitStaged` upserts on
 * (org, exam, content_hash), so a changed stem hashes differently and inserts a
 * SECOND copy instead of updating the first. Run `drift.ts` to detect, this to
 * repair.
 *
 * `content_hash` is recomputed only where the hashed inputs (stem / options /
 * answer) actually changed, and every recompute is collision-guarded: if the
 * new hash already belongs to a DIFFERENT row of this exam, the row is skipped
 * and reported rather than silently colliding.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
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

async function liveCatalog(client: SupabaseClient): Promise<Catalog> {
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
  const out: Catalog = {};
  for (const c of chapters ?? []) {
    out[c.name] = ((c.subtopics ?? []) as { name: string }[]).map((s) => s.name);
  }
  return out;
}

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const catalog = await liveCatalog(client);
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

  const { data: dbRows } = await client
    .from("questions")
    .select("id,question_number,content_hash,text,context,solution")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile);
  const byNum = new Map((dbRows ?? []).map((r) => [r.question_number, r]));

  const { data: allHashes } = await client
    .from("questions")
    .select("id,content_hash")
    .eq("exam_id", EXAM_ID)
    .in(
      "content_hash",
      rows.map((r) => r.contentHash),
    );
  const hashOwner = new Map((allHashes ?? []).map((r) => [r.content_hash, r.id]));

  const plan: { id: string; num: string; fields: string[]; hash?: string }[] = [];
  const skipped: string[] = [];

  for (const r of rows) {
    const db = byNum.get(r.questionNumber!);
    if (!db) continue;
    const fields: string[] = [];
    if (db.text !== r.text) fields.push("text");
    if ((db.context ?? null) !== (r.context ?? null)) fields.push("context");
    if ((db.solution ?? null) !== (r.solution ?? null)) fields.push("solution");
    const hashChanged = db.content_hash !== r.contentHash;
    if (!fields.length && !hashChanged) continue;

    if (hashChanged) {
      const owner = hashOwner.get(r.contentHash);
      if (owner && owner !== db.id) {
        skipped.push(`Q${r.questionNumber}: new hash already belongs to another row (${owner})`);
        continue;
      }
    }
    plan.push({
      id: db.id,
      num: r.questionNumber!,
      fields,
      ...(hashChanged ? { hash: r.contentHash } : {}),
    });
  }

  console.log(`\n=== ${paper.label} — resync ===`);
  console.log(`rows needing update: ${plan.length}`);
  for (const p of plan) {
    console.log(`  Q${p.num}: ${[...p.fields, ...(p.hash ? ["content_hash"] : [])].join(", ")}`);
  }
  for (const s of skipped) console.log(`  SKIP ${s}`);

  // Options are part of the hash, so a hash change may also mean option text
  // moved. Report it rather than silently leaving stale options behind.
  if (!apply) {
    console.log("\n[dry-run] pass --apply to write.");
    return;
  }

  for (const p of plan) {
    const r = rows.find((x) => x.questionNumber === p.num)!;
    const patch: Record<string, unknown> = {
      text: r.text,
      context: r.context ?? null,
      solution: r.solution ?? null,
    };
    if (p.hash) patch.content_hash = p.hash;
    const { error } = await client.from("questions").update(patch).eq("id", p.id);
    if (error) throw new Error(`Q${p.num} update failed: ${error.message}`);

    for (const o of r.options) {
      const { error: oe } = await client
        .from("options")
        .update({ text: o.text, is_correct: o.isCorrect })
        .eq("question_id", p.id)
        .eq("label", o.label);
      if (oe) throw new Error(`Q${p.num} option ${o.label} update failed: ${oe.message}`);
    }
  }
  console.log(`\nupdated ${plan.length} row(s) in place.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
