/**
 * Populate subtopics.order_index (migration 0029) from the teaching order each
 * /notes chapter already encodes in its `subtopicOrder`.
 *
 * Teaching order exists, authoritatively, only for the chapters in
 * NOTES_CHAPTERS — the chapter page renders subtopics in `chapter.subtopicOrder`
 * order, and that IS the pedagogical sequence. This script copies that order
 * onto the DB so /browse (filter sidebar + question list) can sort by it.
 * Chapters with no notes are left untouched (order_index stays NULL → sorts
 * last → historical count-desc behaviour).
 *
 * The notes→DB link is by NAME (subtopicName), the same fragility the
 * shipped-chapter-rename discipline manages. So this script is LOUD about
 * mismatches rather than silent:
 *   - a notes slug whose subtopicName has no live DB subtopic  → reported, skipped
 *   - a DB subtopic in a noted chapter left with no order       → reported (it
 *     would sort ahead of its ordered siblings — author/notes drift)
 *
 * Idempotent: re-running rewrites the same order_index values. Pass --dry to
 * report without writing.
 *
 * Usage:
 *   npx tsx scripts/sync-subtopic-order.ts [--dry]
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local
 * (service role — this writes order_index, which has no client write policy).
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NOTES_CHAPTERS } from "../src/lib/notes/chapters";

function loadEnv() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) {
    const dotenv = require("dotenv");
    dotenv.config({ path: local, override: true });
  }
}

type Problem = { chapter: string; message: string };

async function resolveChapterId(
  supabase: SupabaseClient,
  examName: string,
  subjectName: string,
  chapterName: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from("chapters")
    .select("id, subject:subjects!subject_id(name, exam:exams!exam_id(name))")
    .eq("name", chapterName);
  if (error) throw new Error(`chapter lookup "${chapterName}": ${error.message}`);
  const match = (data ?? []).find((c) => {
    // supabase embeds may type as array; normalise.
    const subj = Array.isArray(c.subject) ? c.subject[0] : c.subject;
    const exam = Array.isArray(subj?.exam) ? subj.exam[0] : subj?.exam;
    return subj?.name === subjectName && exam?.name === examName;
  });
  return match?.id ?? null;
}

async function main() {
  loadEnv();
  const dryRun = process.argv.includes("--dry");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error(
      "missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local " +
        "(service role required — order_index has no client write policy)"
    );
    process.exit(2);
  }
  const supabase = createClient(url, key);

  const problems: Problem[] = [];
  let chaptersDone = 0;
  let subtopicsSet = 0;

  for (const reg of NOTES_CHAPTERS) {
    const label = `${reg.subjectRoute}/${reg.chapterSlug}`;
    const chapterId = await resolveChapterId(
      supabase,
      reg.examName,
      reg.subjectName,
      reg.chapter.chapterName
    );
    if (!chapterId) {
      problems.push({
        chapter: label,
        message: `chapter "${reg.chapter.chapterName}" not found under ${reg.examName} / ${reg.subjectName}`,
      });
      continue;
    }

    // Live DB subtopics for this chapter, keyed by name.
    const { data: dbSubs, error: subErr } = await supabase
      .from("subtopics")
      .select("id, name, order_index")
      .eq("chapter_id", chapterId);
    if (subErr) throw new Error(`subtopics for ${label}: ${subErr.message}`);
    const byName = new Map((dbSubs ?? []).map((s) => [s.name, s]));
    const ordered = new Set<string>(); // DB subtopic ids we assigned an order

    // Walk the teaching order; position i (1-based) → order_index.
    const teachingOrder = reg.chapter.subtopicOrder;
    for (let i = 0; i < teachingOrder.length; i++) {
      const slug = teachingOrder[i];
      const note = reg.notes[slug];
      if (!note) {
        problems.push({
          chapter: label,
          message: `subtopicOrder slug "${slug}" has no SubtopicNote in the registry`,
        });
        continue;
      }
      const dbSub = byName.get(note.subtopicName);
      if (!dbSub) {
        problems.push({
          chapter: label,
          message: `notes subtopicName "${note.subtopicName}" (slug ${slug}) has no live DB subtopic — name drift?`,
        });
        continue;
      }
      const position = i + 1;
      ordered.add(dbSub.id);
      if (dbSub.order_index === position) continue; // already correct
      if (!dryRun) {
        const { error: updErr } = await supabase
          .from("subtopics")
          .update({ order_index: position })
          .eq("id", dbSub.id);
        if (updErr) throw new Error(`update ${dbSub.name}: ${updErr.message}`);
      }
      subtopicsSet++;
    }

    // DB subtopics in this chapter that the notes didn't order — they'd sort
    // ahead of their ordered siblings (NULL = last only when ALL are NULL).
    for (const s of dbSubs ?? []) {
      if (!ordered.has(s.id)) {
        problems.push({
          chapter: label,
          message: `DB subtopic "${s.name}" is NOT in the notes subtopicOrder — left with no teaching order (will sort ahead of ordered siblings)`,
        });
      }
    }

    chaptersDone++;
  }

  console.log(
    `${dryRun ? "[dry-run] " : ""}${chaptersDone} noted chapters processed, ` +
      `${subtopicsSet} subtopic order_index ${dryRun ? "would be " : ""}updated.`
  );
  if (problems.length) {
    console.log(`\n${problems.length} issue(s) — review:`);
    for (const p of problems) console.log(`  [${p.chapter}] ${p.message}`);
    process.exit(1);
  }
  console.log("No name-join issues. ✓");
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
