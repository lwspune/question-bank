/**
 * Merge three near-duplicate subtopics under mh-ssc-10 Geometry.
 *
 *   npx tsx scripts/mh-ssc-10-text/merge-duplicate-subtopics.ts          # dry-run
 *   npx tsx scripts/mh-ssc-10-text/merge-duplicate-subtopics.ts --apply
 *
 * WHY. Each pair is the SAME subtopic spelled two ways — an article, or a plural.
 * They arose because the board-PYQ ingest and the textbook ingest each auto-created
 * a subtopic from the wording in front of them, and `commitStaged` auto-creates
 * rather than matching loosely. The textbook pass deliberately reused whichever
 * name already existed instead of renaming, so the split survived into the corpus.
 *
 * WHAT IS DELIBERATELY NOT HERE. A fourth pair was considered and rejected:
 * `Construction of Circumcircle` vs `Construction of Incircle and Circumcircle` is
 * a NARROWER name against a BROADER one, not a spelling variant, so merging it is a
 * taxonomy judgement rather than a typo fix. Also rejected: the "unused" subtopics
 * that receive no textbook rows. Measured — every one of them holds live board-PYQ
 * rows, so they are legitimate filing for content past papers asked and the current
 * textbook edition dropped. Zero subtopics under this exam are actually empty.
 *
 * BLAST RADIUS, measured before writing: 4 questions total, all `pyq`; 0 in a
 * teacher's paper; 0 answered in a mock attempt; 0 concept or principle tags (those
 * key on editorial slugs, and mh-ssc-10 has no /notes or /guide surface at all).
 *
 * REVERSIBLE. `subtopic_id` is a plain FK and is NOT part of `content_hash`, so a
 * re-file cannot move a row's identity, orphan a paper reference or break dedup.
 * The dropped names and the ids that moved are printed so the change can be undone.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID } from "./config";

/** [chapter, KEEP (the book's own wording), DROP] */
const MERGES: Array<[string, string, string]> = [
  ["Similarity", "Property of an Angle Bisector of a Triangle", "Property of Angle Bisector of a Triangle"],
  ["Geometric Constructions", "Construction of an Angle Bisector", "Construction of Angle Bisector"],
  ["Mensuration", "Area of Combined Figures", "Areas of Combined Figures"],
];

/** The PYQ pipeline's source of record — a re-commit would reinstate the dropped name. */
const PYQ_DATA = join(process.cwd(), "scripts", "mh-ssc-10", "data");

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: subjects } = await db.from("subjects").select("id,name").eq("exam_id", EXAM_ID);
  const { data: chapters } = await db
    .from("chapters").select("id,name,subject_id").in("subject_id", subjects!.map((s) => s.id));

  let moved = 0;
  let dropped = 0;
  for (const [chapterName, keep, drop] of MERGES) {
    const chs = chapters!.filter((c) => c.name === chapterName);
    if (chs.length !== 1) throw new Error(`${chapterName}: expected exactly 1 chapter, found ${chs.length}`);
    const chapterId = chs[0].id;

    const { data: subs } = await db
      .from("subtopics").select("id,name").eq("chapter_id", chapterId).in("name", [keep, drop]);
    const keepRow = (subs ?? []).find((s: any) => s.name === keep);
    const dropRow = (subs ?? []).find((s: any) => s.name === drop);
    if (!keepRow) throw new Error(`${chapterName}: keep subtopic "${keep}" not found`);
    if (!dropRow) { console.log(`  ok    ${chapterName}: "${drop}" already gone`); continue; }

    const { data: qs } = await db
      .from("questions").select("id, question_number, question_kind, source_file").eq("subtopic_id", (dropRow as any).id);
    console.log(`  ${chapterName}`);
    console.log(`      "${drop}"  ->  "${keep}"   ${qs!.length} question(s)`);
    for (const q of qs!) console.log(`        ${(q as any).question_kind}  ${(q as any).question_number}  ${(q as any).source_file}  [${(q as any).id}]`);
    if (!apply) continue;

    // Refuse if anything else depends on these rows — re-measured at write time
    // rather than trusted from the earlier survey.
    const ids = qs!.map((q: any) => q.id);
    if (ids.length) {
      const { data: pq } = await db.from("paper_questions").select("question_id").in("question_id", ids);
      const { data: aa } = await db.from("attempt_answers").select("question_id").in("question_id", ids);
      if ((pq?.length ?? 0) || (aa?.length ?? 0)) {
        throw new Error(`${chapterName}: ${pq?.length ?? 0} paper ref(s) and ${aa?.length ?? 0} attempt(s) — refusing`);
      }
      const { error, count } = await db
        .from("questions")
        .update({ subtopic_id: (keepRow as any).id }, { count: "exact" })
        .eq("subtopic_id", (dropRow as any).id);
      if (error) throw new Error(`${chapterName} repoint: ${error.message}`);
      moved += count ?? 0;
    }

    // Only delete once the subtopic is provably empty.
    const { count: left } = await db
      .from("questions").select("id", { count: "exact", head: true }).eq("subtopic_id", (dropRow as any).id);
    if (left !== 0) throw new Error(`${chapterName}: "${drop}" still holds ${left} row(s) — not deleting`);
    const { error: dErr } = await db.from("subtopics").delete().eq("id", (dropRow as any).id);
    if (dErr) throw new Error(`${chapterName} delete: ${dErr.message}`);
    dropped++;
  }

  // Source of record, or the next PYQ re-commit auto-creates the dropped name again.
  let files = 0;
  if (apply) {
    const dropNames = MERGES.map(([, keep, drop]) => [drop, keep] as const);
    for (const f of readdirSync(PYQ_DATA).filter((n) => n.endsWith(".json"))) {
      const path = join(PYQ_DATA, f);
      let raw: string;
      try { raw = readFileSync(path, "utf8"); } catch { continue; }
      let next = raw;
      for (const [drop, keep] of dropNames) {
        // Quote-bounded so "Area of Combined Figures" cannot be rewritten by the
        // "Areas of Combined Figures" rule, or vice versa.
        next = next.split(`"${drop}"`).join(`"${keep}"`);
      }
      if (next !== raw) { writeFileSync(path, next, "utf8"); files++; }
    }
  }

  console.log(
    apply
      ? `\nrepointed ${moved} question(s), deleted ${dropped} duplicate subtopic(s), rewrote ${files} PYQ source file(s).`
      : `\n[dry-run] pass --apply to write.`,
  );
}

main().catch((e) => { console.error(e); process.exit(1); });
