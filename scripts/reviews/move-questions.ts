/**
 * Move live questions to the chapter (and subtopic) that teaches them.
 *
 *   npx tsx scripts/reviews/move-questions.ts <moves.json>             # dry run
 *   npx tsx scripts/reviews/move-questions.ts <moves.json> --apply     # write
 *
 * moves.json: [{ "id", "fromChapter", "toChapter", "toSubtopic", "reason",
 *                "dropTags"?: [{subtopicSlug, conceptSlug}], "addTags"?: [...] }]
 *
 * Keeps the row id (a move never deletes: every drill, save, mock answer and
 * item stat stays linked). The target chapter is looked up by NAME inside the
 * question's own subject and the subtopic by NAME inside that chapter; neither
 * is ever created. Each write is conditional on the row still sitting in
 * `fromChapter`, so a re-run is a no-op and a row someone else moved is left
 * alone.
 *
 * It REPORTS what follows the chapter and must be redone by hand: chapter tests
 * holding the row (scripts/mocks/data/<exam>-sectional.json, rebuild with
 * build-sectional.ts), and concept tags still naming the old chapter's notes
 * (`dropTags` removes named ones; a homework plan re-reads chapters on rebuild).
 * Precedent: the 2026-11-04 MH HSC 12 relocations (owner: "move").
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Tag = { subtopicSlug: string; conceptSlug: string };
type Move = { id: string; fromChapter: string; toChapter: string; toSubtopic: string; reason: string; dropTags?: Tag[]; addTags?: Tag[] };

async function main() {
  const file = process.argv[2];
  if (!file || file.startsWith("--")) throw new Error("usage: move-questions.ts <moves.json> [--apply]");
  const apply = process.argv.includes("--apply");
  const moves: Move[] = JSON.parse(readFileSync(file, "utf8"));
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let moved = 0, noop = 0;
  const problems: string[] = [];
  for (const m of moves) {
    const { data: q, error } = await db
      .from("questions")
      .select("id, subject_id, chapter_id, subtopic_id, chapters(name), subtopics(name)")
      .eq("id", m.id)
      .maybeSingle();
    if (error) throw error;
    if (!q) { problems.push(`${m.id}: not found`); continue; }
    const cur = (q.chapters as unknown as { name: string } | null)?.name;
    const { data: target, error: tErr } = await db
      .from("chapters")
      .select("id, subtopics(id, name)")
      .eq("subject_id", q.subject_id)
      .eq("name", m.toChapter)
      .maybeSingle();
    if (tErr) throw tErr;
    if (!target) { problems.push(`${m.id}: no chapter "${m.toChapter}" in this subject`); continue; }
    const sub = (target.subtopics as { id: string; name: string }[]).find((s) => s.name === m.toSubtopic);
    if (!sub) { problems.push(`${m.id}: no subtopic "${m.toSubtopic}" in "${m.toChapter}"`); continue; }
    if (q.chapter_id === target.id && q.subtopic_id === sub.id) { noop++; console.log(`  ${m.id.slice(0, 8)} already in ${m.toChapter} / ${m.toSubtopic}`); continue; }
    if (cur !== m.fromChapter) { problems.push(`${m.id}: sits in "${cur}", not "${m.fromChapter}"; left alone`); continue; }

    const { data: mocks, error: mErr } = await db
      .from("mock_tests")
      .select("slug")
      .filter("questions", "cs", JSON.stringify([{ questionId: m.id }]));
    if (mErr) throw new Error(`mock lookup: ${mErr.message}`);
    const { data: tags } = await db.from("question_concept_tags").select("subtopic_slug, concept_slug").eq("question_id", m.id);
    console.log(`${apply ? "move" : "would move"} ${m.id.slice(0, 8)}: ${cur} / ${(q.subtopics as unknown as { name: string } | null)?.name} -> ${m.toChapter} / ${m.toSubtopic}`);
    if (mocks?.length) console.log(`    in mocks: ${mocks.map((x) => x.slug).join(", ")} (a chapter test there needs a swap + rebuild)`);
    if (tags?.length) console.log(`    concept tags: ${tags.map((t) => `${t.subtopic_slug}/${t.concept_slug}`).join(", ")}`);
    if (!apply) continue;

    const { error: uErr, count } = await db
      .from("questions")
      .update({ chapter_id: target.id, subtopic_id: sub.id }, { count: "exact" })
      .eq("id", m.id)
      .eq("chapter_id", q.chapter_id);
    if (uErr) throw uErr;
    if (count !== 1) { problems.push(`${m.id}: update matched ${count} rows`); continue; }
    for (const t of m.dropTags ?? []) {
      const { error: dErr } = await db.from("question_concept_tags").delete()
        .eq("question_id", m.id).eq("subtopic_slug", t.subtopicSlug).eq("concept_slug", t.conceptSlug);
      if (dErr) throw dErr;
    }
    if (m.addTags?.length) {
      const { error: aErr } = await db.from("question_concept_tags").upsert(
        m.addTags.map((t) => ({ question_id: m.id, subtopic_slug: t.subtopicSlug, concept_slug: t.conceptSlug })),
        { onConflict: "question_id,subtopic_slug,concept_slug", ignoreDuplicates: true }
      );
      if (aErr) throw aErr;
    }
    moved++;
  }
  console.log(`\n${apply ? "moved" : "would move"} ${apply ? moved : moves.length - noop - problems.length}, already there ${noop}, problems ${problems.length}`);
  for (const p of problems) console.log(`  ! ${p}`);
  if (problems.length) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
