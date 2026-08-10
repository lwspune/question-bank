/**
 * Dump a chapter's committed exercise-subjective rows that still need an
 * authored model answer (runbook step 5).
 *
 *   npx tsx scripts/mh-sb-11/dump-subjective.ts <chapterId> [refPrefix] [outPath]
 *
 * `refPrefix` partitions the work for parallel authoring agents, e.g.
 *   npx tsx scripts/mh-sb-11/dump-subjective.ts differentiation-12 "Ex 1.1"
 * Each agent writes data/<id>.<group>.solutions.json ({id, ref, solution}) and
 * apply-solutions.ts does the hash-safe, solution-only UPDATE.
 *
 * Only dumps rows with solution IS NULL — the book's solved examples already
 * carry its own worked solution and must never be overwritten by an authored one.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requireChapter, DATA } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "all";
}

async function main() {
  loadEnv();
  const id = process.argv[2];
  const chapter = requireChapter(id);
  const refPrefix = process.argv[3] ?? "";
  const out = process.argv[4] ?? join(DATA, `${id}.${slug(refPrefix)}.topaper.json`);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let q = db
    .from("questions")
    .select("id, question_number, source_row, text, context, subtopic_id, subtopics(name)")
    .eq("source_file", chapter.sourceFile)
    .eq("question_format", "subjective")
    .is("solution", null)
    .order("source_row");
  if (refPrefix) q = q.like("question_number", `${refPrefix}%`);

  const { data, error } = await q;
  if (error) throw error;

  const rows = (data ?? []).map((r: any) => ({
    id: r.id,
    ref: r.question_number,
    subtopic: r.subtopics?.name ?? null,
    context: r.context ?? null,
    stem: r.text,
  }));

  if (!rows.length) throw new Error(`no unanswered subjective rows for prefix "${refPrefix}"`);

  writeFileSync(out, JSON.stringify(rows, null, 2), "utf-8");
  console.log(`dumped ${rows.length} unanswered subjective rows -> ${out}`);
  console.log(`refs: ${rows[0].ref} … ${rows[rows.length - 1].ref}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
