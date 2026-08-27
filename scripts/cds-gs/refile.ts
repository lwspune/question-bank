/**
 * Re-file already-committed questions onto different catalog entries.
 *
 *   npx tsx scripts/cds-gs/refile.ts <paperId>          # dry-run
 *   npx tsx scripts/cds-gs/refile.ts <paperId> --apply  # update source + DB
 *
 * Reads data/<paperId>.refile.json — `[{ number, subject, chapter, subtopic, why }]` —
 * validates every target against the CURRENT catalog, rewrites the committed
 * questions file, and updates the live rows.
 *
 * WHY A DEDICATED PATH RATHER THAN A RE-COMMIT. `content_hash` is computed from
 * stem + options + answer and does NOT include taxonomy, so re-running commit.ts
 * after a taxonomy change is a no-op: every row dedups against itself and the
 * chapter never moves. The classification genuinely has to be updated in place.
 *
 * SOURCE FIRST, THEN DB. The questions file is the source of record; a DB-only
 * fix is silently reverted by the next re-commit from source. Both are written
 * here, and the DB update is keyed on `question_number` scoped to this paper's
 * `source_file` so it cannot reach another paper's rows.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, catalog, dataPath, requirePaper } from "./config";
import type { TQ } from "./lib";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Refile = { number: number; subject: string; chapter: string; subtopic: string; why: string };

async function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");
  loadEnv();

  const rPath = dataPath(paper.id, "refile");
  if (!existsSync(rPath)) throw new Error(`missing ${rPath}`);
  const refiles: Refile[] = JSON.parse(readFileSync(rPath, "utf8"));
  const questions: TQ[] = JSON.parse(readFileSync(dataPath(paper.id, "questions"), "utf8"));
  const byNumber = new Map(questions.map((q) => [q.number, q]));
  const cat = catalog();

  const errors: string[] = [];
  const moves: { q: TQ; to: Refile }[] = [];
  for (const r of refiles) {
    const q = byNumber.get(r.number);
    if (!q) {
      errors.push(`Q${r.number}: not in ${paper.id}.questions.json`);
      continue;
    }
    const chapters = cat[r.subject];
    if (!chapters) { errors.push(`Q${r.number}: unknown subject "${r.subject}"`); continue; }
    const subtopics = chapters[r.chapter];
    if (!subtopics) { errors.push(`Q${r.number}: "${r.chapter}" is not a chapter of "${r.subject}"`); continue; }
    if (!subtopics.includes(r.subtopic)) {
      errors.push(`Q${r.number}: "${r.subtopic}" is not a subtopic of "${r.subject} / ${r.chapter}"`);
      continue;
    }
    if (q.subject === r.subject && q.chapter === r.chapter && q.subtopic === r.subtopic) {
      console.log(`  = Q${r.number} already filed there — skipping`);
      continue;
    }
    moves.push({ q, to: r });
  }

  console.log(`\n${paper.id}: ${moves.length} question(s) to re-file`);
  for (const { q, to } of moves) {
    console.log(`  Q${q.number}`);
    console.log(`     from ${q.subject} / ${q.chapter} / ${q.subtopic ?? "(none)"}`);
    console.log(`     to   ${to.subject} / ${to.chapter} / ${to.subtopic}`);
  }
  if (errors.length) {
    console.log(`\nERRORS (${errors.length}):`);
    for (const e of errors) console.log(`  ${e}`);
    throw new Error("refusing to re-file — fix the refile map first.");
  }
  if (!apply) {
    console.log("\n[dry-run] pass --apply to write source + DB. Nothing changed.");
    return;
  }
  if (!moves.length) { console.log("nothing to do."); return; }

  // 1. source of record
  for (const { q, to } of moves) {
    q.subject = to.subject;
    q.chapter = to.chapter;
    q.subtopic = to.subtopic;
  }
  writeFileSync(dataPath(paper.id, "questions"), JSON.stringify(questions, null, 2) + "\n", "utf8");
  console.log(`\nrewrote ${dataPath(paper.id, "questions")}`);

  // 2. live rows — resolve/auto-create the taxonomy, then update by question_number
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  async function resolve(subject: string, chapter: string, subtopic: string) {
    const { data: s } = await client.from("subjects").select("id").eq("exam_id", EXAM_ID).eq("name", subject).single();
    if (!s) throw new Error(`subject "${subject}" not found under CDS — run seed-subjects.ts`);
    let { data: c } = await client.from("chapters").select("id").eq("subject_id", s.id).eq("name", chapter).maybeSingle();
    if (!c) {
      const ins = await client.from("chapters").insert({ subject_id: s.id, name: chapter }).select("id").single();
      if (ins.error) throw new Error(`chapter insert failed: ${ins.error.message}`);
      c = ins.data;
    }
    let { data: t } = await client.from("subtopics").select("id").eq("chapter_id", c!.id).eq("name", subtopic).maybeSingle();
    if (!t) {
      const ins = await client.from("subtopics").insert({ chapter_id: c!.id, name: subtopic }).select("id").single();
      if (ins.error) throw new Error(`subtopic insert failed: ${ins.error.message}`);
      t = ins.data;
    }
    return { subjectId: s.id, chapterId: c!.id, subtopicId: t!.id };
  }

  let updated = 0;
  for (const { q, to } of moves) {
    const ids = await resolve(to.subject, to.chapter, to.subtopic);
    const { error, count } = await client
      .from("questions")
      .update(
        { subject_id: ids.subjectId, chapter_id: ids.chapterId, subtopic_id: ids.subtopicId },
        { count: "exact" }
      )
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .eq("question_number", String(q.number));
    if (error) throw new Error(`Q${q.number} update failed: ${error.message}`);
    if (count !== 1) throw new Error(`Q${q.number}: expected to update exactly 1 row, updated ${count}`);
    updated++;
  }
  console.log(`updated ${updated} live row(s).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
