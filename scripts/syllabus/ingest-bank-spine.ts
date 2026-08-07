/**
 * Exam-bank spines: one concept row per (exam, chapter, subtopic) of a subject's
 * PYQ corpus, so the map can ask the INVERSE question — "does the State Board
 * cover what this exam actually sets?".
 *
 *   npx tsx scripts/syllabus/ingest-bank-spine.ts --subject=physics
 *   npx tsx scripts/syllabus/ingest-bank-spine.ts --subject=physics --apply
 *
 * WRITES CONCEPT ROWS ONLY — deliberately no `syllabus_concept_exams` links.
 *
 * The Chemistry equivalent (ingest-exam-spine.ts) defaults an unruled subtopic
 * to `status:'full'`, which was sound THERE because its author adjudicated the
 * whole corpus and used the ruling maps only for exceptions — "everything else
 * is covered" was a reviewed conclusion, not an assumption. Reusing that default
 * for a fresh subject would assert full State Board coverage for a few hundred
 * subtopics nobody has read, and 0065's whole design is that an unassessed pair
 * is the ABSENCE of a row. A wrong ruling here is also unfalsifiable by probe:
 * it reads as plausible and no automated check can contradict it. So rulings are
 * authored separately, in reviewed batches, and this script never invents one.
 *
 * Re-running is safe and idempotent. Note that `section_no` is POSITIONAL
 * (JEE-001, JEE-002, ...), so if the bank's taxonomy changes the numbering
 * shifts; the prune below removes rows past the new end rather than leaving
 * ghosts behind.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { bankSubjectNames } from "../../src/lib/syllabus/subjects";
import { requireSubjectArg } from "./subject-arg";

const EXAMS = ["JEE Mains", "MHT-CET", "NDA"] as const;

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Row = { exam: string; chapter: string; subtopic: string; n: number };

/** Short prefix for the positional section ref: "JEE Mains" -> "JEE". */
function examPrefix(exam: string): string {
  return exam.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase();
}

async function loadCounts(db: SupabaseClient, subject: string): Promise<Row[]> {
  const counts = new Map<string, Row>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("exams!inner(name),subjects!inner(name),chapters!inner(name),subtopics!inner(name)")
      // Alias-aware: JEE's subject row is "Maths", NDA/MHT-CET say
      // "Mathematics" — a plain .eq() would silently ingest a JEE-less spine.
      .in("subjects.name", bankSubjectNames(subject))
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const batch = (data ?? []) as unknown as {
      exams: { name: string };
      chapters: { name: string };
      subtopics: { name: string };
    }[];
    for (const r of batch) {
      const exam = r.exams?.name ?? "";
      if (!(EXAMS as readonly string[]).includes(exam)) continue;
      const chapter = r.chapters?.name;
      const subtopic = r.subtopics?.name;
      if (!chapter || !subtopic) continue;
      const k = `${exam}|${chapter}|${subtopic}`;
      const hit = counts.get(k);
      if (hit) hit.n += 1;
      else counts.set(k, { exam, chapter, subtopic, n: 1 });
    }
    if (batch.length < 1000) break;
  }
  return [...counts.values()].sort(
    (a, b) =>
      a.exam.localeCompare(b.exam) ||
      a.chapter.localeCompare(b.chapter) ||
      a.subtopic.localeCompare(b.subtopic),
  );
}

async function main() {
  const apply = process.argv.includes("--apply");
  const cfg = requireSubjectArg(process.argv);
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("service-role env required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const rows = await loadCounts(db, cfg.subject);
  if (rows.length === 0) {
    console.error(`no PUBLIC pyq rows found for subject "${cfg.subject}"`);
    process.exit(1);
  }

  console.log(`\nBank spine — ${cfg.label}\n`);
  console.log("  exam            chapters   subtopics   PYQ");
  for (const e of EXAMS) {
    const mine = rows.filter((r) => r.exam === e);
    if (!mine.length) continue;
    const chapters = new Set(mine.map((r) => r.chapter)).size;
    const pyq = mine.reduce((s, r) => s + r.n, 0);
    console.log(
      `  ${e.padEnd(14)} ${String(chapters).padStart(8)} ${String(mine.length).padStart(11)} ${String(pyq).padStart(5)}`,
    );
  }

  // chapter_no is the chapter's 1-based position within its OWN exam, so the
  // detail view can order chapters sensibly. (The Chemistry script stores the
  // index of a chapter's first ROW instead, which yields 1, 4, 9, ... — fine for
  // grouping but meaningless as an ordinal.)
  const chapterNo = new Map<string, number>();
  for (const e of EXAMS) {
    const chapters = [...new Set(rows.filter((r) => r.exam === e).map((r) => r.chapter))];
    chapters.forEach((c, i) => chapterNo.set(`${e}|${c}`, i + 1));
  }

  const concepts = rows.map((r, i) => ({
    // The spine is exam-level, not class-level; 12 satisfies the 0065 CHECK.
    class: 12,
    subject: cfg.subject,
    source: `${r.exam} bank taxonomy`,
    chapter_no: chapterNo.get(`${r.exam}|${r.chapter}`)!,
    chapter_name: r.chapter,
    section_no: `${examPrefix(r.exam)}-${String(i + 1).padStart(3, "0")}`,
    // The PYQ count rides in the name, as the map's splitPyqCount() expects.
    concept: `${r.subtopic} (${r.n} PYQ)`,
    seq: i + 1,
  }));

  const tooLong = concepts.filter((c) => c.concept.length > 300 || c.section_no.length > 20);
  if (tooLong.length) {
    console.error(`\nREFUSING TO WRITE — ${tooLong.length} row(s) violate the 0065 CHECKs`);
    for (const c of tooLong.slice(0, 5)) console.error(`  ${c.section_no} ${c.concept.slice(0, 80)}`);
    process.exit(1);
  }

  console.log(`\nTotal ${concepts.length} subtopic rows.`);
  console.log("Writes concept rows ONLY — no rulings. Unruled stays UNASSESSED by design.");

  if (!apply) {
    console.log("\nDRY RUN — nothing written. Re-run with --apply.");
    return;
  }

  for (let i = 0; i < concepts.length; i += 200) {
    const { error } = await db
      .from("syllabus_concepts")
      .upsert(concepts.slice(i, i + 200), { onConflict: "source,class,subject,section_no" });
    if (error) throw new Error(`concepts: ${error.message}`);
  }

  // PRUNE, scoped to this subject AND these sources. Section numbers are
  // positional, so a taxonomy change shortens the list and would strand the tail
  // as ghost rows. Scoping to the subject matters as much: every subject's spine
  // shares the same source names, so an unscoped prune would delete another
  // subject's rows outright (the exact bug that existed in ingest-ncert-spine).
  const wanted = new Set(concepts.map((c) => `${c.source}|${c.section_no}`));
  let pruned = 0;
  for (const e of EXAMS) {
    const source = `${e} bank taxonomy`;
    const { data, error } = await db
      .from("syllabus_concepts")
      .select("id,section_no")
      .eq("source", source)
      .eq("subject", cfg.subject);
    if (error) throw new Error(error.message);
    const stale = (data ?? []).filter((r) => !wanted.has(`${source}|${r.section_no}`));
    if (stale.length) {
      const { error: delErr } = await db
        .from("syllabus_concepts")
        .delete()
        .in("id", stale.map((r) => r.id));
      if (delErr) throw new Error(`prune: ${delErr.message}`);
      pruned += stale.length;
    }
  }
  if (pruned) console.log(`Pruned ${pruned} stale row(s).`);
  console.log(`\nDone. ${concepts.length} ${cfg.label} bank-spine rows written.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
