/**
 * Seed one SUBJECT row for an NCERT chapter's exam — idempotent.
 *
 *   npx tsx scripts/ncert/seed-subject.ts <chapterId>          # dry-run
 *   npx tsx scripts/ncert/seed-subject.ts <chapterId> --apply  # write
 *
 * Chapters auto-create on commit; SUBJECTS DO NOT (`commitStaged` resolves the
 * subject by name and fails if it is absent), so a new subject has to be seeded
 * once before its first chapter commits.
 *
 * WHY THIS IS A SEPARATE STEP AND NOT PART OF commit.ts — and why you should NOT
 * run it "to get set up":
 *
 *   `listSubjects` applies no question-count filter, so a subject row with zero
 *   questions renders as a live `/browse` filter that returns nothing. A Std-XI
 *   Physics row was seeded that way in the mh-sb-11 lane on 2026-09-02 and had
 *   to be removed the same day. Run this immediately before the first
 *   `commit.ts --apply` for that (exam, subject) pair — never earlier, and never
 *   for a subject whose chapters are not ready.
 *
 * Reversible: `delete from subjects where id = '<printed id>'` while it holds no
 * chapters. Once chapters hang off it, drop those first.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requireChapter, NCERT_EXAMS } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

async function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);
  loadEnv();

  const examLabel = NCERT_EXAMS.find((e) => e.examId === ch.examId)?.label ?? ch.examId;
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const { data: existing, error: selErr } = await client
    .from("subjects")
    .select("id, name")
    .eq("exam_id", ch.examId)
    .eq("name", ch.subjectName)
    .maybeSingle();
  if (selErr) throw new Error(`subject lookup failed: ${selErr.message}`);

  if (existing) {
    console.log(`subject already exists: ${examLabel} / ${existing.name} (${existing.id}) — nothing to do.`);
    return;
  }

  // Report the sibling subjects so a typo ("Physic", "Maths" vs "Mathematics")
  // is visible BEFORE it silently creates a second, near-identical subject that
  // splits the corpus in two — the mh-ssc-10-text chapter-name trap, one level up.
  const { data: siblings } = await client.from("subjects").select("name").eq("exam_id", ch.examId);
  console.log(`\n${examLabel} currently has subjects: ${(siblings ?? []).map((s) => `"${s.name}"`).join(", ") || "(none)"}`);
  console.log(`about to create: "${ch.subjectName}"  (for chapter "${ch.chapterName}")`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to write. Nothing inserted.");
    console.log("Run this ONLY immediately before the first commit.ts --apply for this subject.");
    return;
  }

  const { data: created, error } = await client
    .from("subjects")
    .insert({ exam_id: ch.examId, name: ch.subjectName })
    .select("id")
    .single();
  if (error) throw new Error(`subject insert failed: ${error.message}`);
  console.log(`\ncreated subject ${created.id} — ${examLabel} / ${ch.subjectName}`);
  console.log(`rollback while empty:  delete from subjects where id = '${created.id}';`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
