/**
 * Set `subtopics.order_index` for an NCERT chapter from the CANONICAL ORDER in
 * config.ts, so /browse lists a chapter's subtopics in teaching order rather than
 * alphabetically.
 *
 *   npx tsx scripts/ncert/set-subtopic-order.ts <chapterId>            # dry-run
 *   npx tsx scripts/ncert/set-subtopic-order.ts <chapterId> --apply
 *   npx tsx scripts/ncert/set-subtopic-order.ts --all [--apply]
 *
 * SCOPING IS THE WHOLE POINT OF THIS SCRIPT EXISTING.  `chapters` has no
 * `exam_id` — only `(id, subject_id, name, order_index)` — so a chapter must be
 * resolved through `subjects.exam_id`.  Several of these chapter NAMES exist
 * under OTHER exams too ("Differential Equations", "Probability", "Vector
 * Algebra", "Linear Programming", "Application of Derivatives" all appear in the
 * MHT-CET / NDA / State Board taxonomies), so a name-only UPDATE would silently
 * rewrite another exam's teaching order.  Every statement here is scoped by
 * exam AND subject AND chapter, and the script REFUSES to run if the lookup
 * returns anything other than exactly one chapter.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { EXAM_ID, CHAPTERS, requireChapter } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function orderOne(db: any, id: string, apply: boolean) {
  const ch = requireChapter(id);

  const { data: subject, error: sErr } = await db
    .from("subjects")
    .select("id")
    .eq("exam_id", EXAM_ID)
    .eq("name", ch.subjectName)
    .maybeSingle();
  if (sErr) throw sErr;
  if (!subject) throw new Error(`${id}: subject "${ch.subjectName}" not found under this exam`);

  // Scope by subject_id (which carries the exam) — never by chapter name alone.
  const { data: chapters, error: cErr } = await db
    .from("chapters")
    .select("id, name")
    .eq("subject_id", subject.id)
    .eq("name", ch.chapterName);
  if (cErr) throw cErr;
  if (!chapters || chapters.length !== 1) {
    throw new Error(
      `${id}: expected exactly 1 chapter named "${ch.chapterName}" under ${ch.subjectName}, got ${chapters?.length ?? 0}. ` +
        `Refusing to guess — a wrong match here rewrites another chapter's teaching order.`
    );
  }
  const chapterId = chapters[0].id;

  const { data: subs, error: stErr } = await db
    .from("subtopics")
    .select("id, name, order_index")
    .eq("chapter_id", chapterId);
  if (stErr) throw stErr;

  const canonical = ch.subtopics;
  const byName = new Map((subs ?? []).map((s: any) => [s.name, s]));
  const missing = canonical.filter((n) => !byName.has(n));
  const extra = (subs ?? []).map((s: any) => s.name).filter((n: string) => !canonical.includes(n));

  console.log(`\n${ch.chapterName} — ${subs?.length ?? 0} subtopic(s) in DB, ${canonical.length} canonical`);
  if (missing.length) console.log(`  NOT IN DB (no question uses them yet): ${missing.join(", ")}`);
  if (extra.length) console.log(`  IN DB BUT NOT CANONICAL: ${extra.join(", ")}`);

  let changed = 0;
  for (let i = 0; i < canonical.length; i++) {
    const s: any = byName.get(canonical[i]);
    if (!s) continue;
    const want = i + 1;
    const mark = s.order_index === want ? " " : "*";
    console.log(`  ${mark} [${String(want).padStart(2)}] ${canonical[i]}${s.order_index === want ? "" : `  (was ${s.order_index ?? "null"})`}`);
    if (s.order_index === want) continue;
    changed++;
    if (apply) {
      const { error } = await db.from("subtopics").update({ order_index: want }).eq("id", s.id);
      if (error) throw new Error(`${canonical[i]}: ${error.message}`);
    }
  }
  console.log(apply ? `  applied: ${changed} updated.` : `  [dry-run] ${changed} would be updated.`);
  return changed;
}

async function main() {
  loadEnv();
  const apply = process.argv.includes("--apply");
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const ids = process.argv.includes("--all") ? Object.keys(CHAPTERS) : args;
  if (!ids.length) {
    console.error("usage: tsx scripts/ncert/set-subtopic-order.ts <chapterId>|--all [--apply]");
    process.exit(1);
  }
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  let total = 0;
  for (const id of ids) total += await orderOne(db, id, apply);
  console.log(`\n${apply ? "APPLIED" : "DRY-RUN"}: ${total} subtopic order_index value(s) ${apply ? "updated" : "would change"}.`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
