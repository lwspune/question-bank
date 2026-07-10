/**
 * Build NDA mock tests from the bank — "use PYQPs as is".
 *
 * Blueprint-driven: for each MOCK_BLUEPRINTS entry (Paper I Mathematics, Paper II
 * GAT), discovers every sitting (distinct pyq_year × pyq_month of the PUBLIC pyq
 * corpus for that paper's subjects), reconstructs each into an immutable snapshot
 * via the pure core (src/lib/mocks/reconstruct.ts), and upserts a `mock_tests`
 * row keyed on the deterministic slugToUuid id (re-running is idempotent).
 *
 *   npx tsx scripts/mocks/build.ts                       # dry-run all papers
 *   npx tsx scripts/mocks/build.ts --apply               # upsert as status='draft'
 *   npx tsx scripts/mocks/build.ts --apply --publish     # ...and publish
 *   npx tsx scripts/mocks/build.ts --paper=gat --apply --publish
 *   npx tsx scripts/mocks/build.ts --only=2024-Sep --apply --publish
 *
 * Writes via the service-role client (bypasses RLS by design — same as the other
 * ingest scripts). Content is NOT copied: the snapshot stores ordered question
 * refs; delivery renders live from `questions`.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { MOCK_BLUEPRINTS, type MockPaperBlueprint } from "../../src/lib/mocks/blueprints";
import { buildMockPaper, type PaperQuestionRow } from "../../src/lib/mocks/reconstruct";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** Distinct bank subject names a paper's sections span. */
function paperSubjects(bp: MockPaperBlueprint): string[] {
  return [...new Set(bp.sections.flatMap((s) => s.subjects))];
}

/** Resolve the exam + the chapters (with their subject name) for a paper. */
async function resolvePaper(db: SupabaseClient, bp: MockPaperBlueprint) {
  const { data: exam, error: eErr } = await db
    .from("exams").select("id").eq("name", bp.examName).single();
  if (eErr || !exam) throw new Error(`${bp.examName} exam not found: ${eErr?.message}`);

  const names = paperSubjects(bp);
  const { data: subjects, error: sErr } = await db
    .from("subjects").select("id, name").eq("exam_id", exam.id).in("name", names);
  if (sErr) throw new Error(`subjects lookup: ${sErr.message}`);
  const subjectName = new Map<string, string>((subjects ?? []).map((s) => [s.id as string, s.name as string]));

  const { data: chapters, error: cErr } = await db
    .from("chapters").select("id, subject_id").in("subject_id", [...subjectName.keys()]);
  if (cErr) throw new Error(`chapters lookup: ${cErr.message}`);
  const chapterToSubject = new Map<string, string>();
  for (const c of chapters ?? []) {
    const sn = subjectName.get(c.subject_id as string);
    if (sn) chapterToSubject.set(c.id as string, sn);
  }
  return { examId: exam.id as string, chapterToSubject };
}

/** Distinct (year, month) sittings present in this paper's PUBLIC pyq corpus. */
async function discoverSittings(db: SupabaseClient, chapterIds: string[]) {
  const seen = new Map<string, { year: number; month: string | null }>();
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("questions")
      .select("pyq_year, pyq_month")
      .in("chapter_id", chapterIds)
      .eq("question_kind", "pyq")
      .eq("visibility", "PUBLIC")
      .not("pyq_year", "is", null)
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`discover sittings: ${error.message}`);
    for (const r of data ?? []) {
      const year = r.pyq_year as number;
      const month = (r.pyq_month as string | null) ?? null;
      seen.set(`${year}-${month ?? ""}`, { year, month });
    }
    if (!data || data.length < PAGE) break;
  }
  return [...seen.values()].sort((a, b) => b.year - a.year || (a.month ?? "").localeCompare(b.month ?? ""));
}

/** Fetch one sitting's rows (id + ordering + subject + correct-option label). */
async function fetchPaperRows(
  db: SupabaseClient,
  chapterToSubject: Map<string, string>,
  year: number,
  month: string | null
): Promise<PaperQuestionRow[]> {
  const chapterIds = [...chapterToSubject.keys()];
  const out: PaperQuestionRow[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    let q = db
      .from("questions")
      .select("id, source_row, question_number, chapter_id, options(label,is_correct)")
      .in("chapter_id", chapterIds)
      .eq("question_kind", "pyq")
      .eq("visibility", "PUBLIC")
      .eq("pyq_year", year);
    q = month === null ? q.is("pyq_month", null) : q.eq("pyq_month", month);
    const { data, error } = await q.range(from, from + PAGE - 1);
    if (error) throw new Error(`fetch rows ${year}-${month}: ${error.message}`);
    for (const r of data ?? []) {
      const opts = (r.options ?? []) as { label: string; is_correct: boolean }[];
      out.push({
        id: r.id as string,
        sourceRow: (r.source_row as number | null) ?? null,
        questionNumber: (r.question_number as string | null) ?? null,
        subjectName: chapterToSubject.get(r.chapter_id as string) ?? "?",
        answer: (opts.find((o) => o.is_correct)?.label as "A" | "B" | "C" | "D" | null) ?? null,
      });
    }
    if (!data || data.length < PAGE) break;
  }
  return out;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const publish = process.argv.includes("--publish");
  const only = process.argv.find((a) => a.startsWith("--only="))?.split("=")[1];
  const paperFilter = process.argv.find((a) => a.startsWith("--paper="))?.split("=")[1];
  loadEnv();
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const blueprints = MOCK_BLUEPRINTS.filter((b) => !paperFilter || b.code === paperFilter);
  if (blueprints.length === 0) throw new Error(`no blueprint matches --paper=${paperFilter}`);

  let built = 0;
  const failures: string[] = [];
  for (const bp of blueprints) {
    const { examId, chapterToSubject } = await resolvePaper(db, bp);
    let sittings = await discoverSittings(db, [...chapterToSubject.keys()]);
    if (only) sittings = sittings.filter((s) => `${s.year}-${s.month ?? ""}` === only);
    console.log(`\n${bp.paperLabel} — ${sittings.length} sitting(s)${only ? ` (filtered: ${only})` : ""}\n`);

    for (const { year, month } of sittings) {
      const rows = await fetchPaperRows(db, chapterToSubject, year, month);
      // 2020 was a single combined NDA I+II sitting (COVID); the bank tags it Apr.
      const titleOverride =
        year === 2020 && month === "Apr"
          ? `NDA 2020 (Combined I & II) — ${bp.paperLabel}`
          : undefined;
      let snap;
      try {
        snap = buildMockPaper(bp, rows, { year, month, title: titleOverride });
      } catch (e) {
        failures.push(`${bp.code} ${year} ${month ?? "-"}: ${e instanceof Error ? e.message.split("\n")[0] : String(e)}`);
        continue;
      }
      console.log(`  ✓ ${snap.slug.padEnd(20)} ${snap.title}  (${snap.totalQuestions}q / ${snap.totalMarks}m)`);
      if (apply) {
        const { error } = await db.from("mock_tests").upsert(
          {
            id: snap.id, slug: snap.slug, exam_id: examId, paper_code: snap.paperCode,
            pyq_year: snap.pyqYear, pyq_month: snap.pyqMonth, title: snap.title,
            duration_secs: snap.durationSecs, marking: snap.marking, sections: snap.sections,
            questions: snap.questions, total_questions: snap.totalQuestions, total_marks: snap.totalMarks,
            status: publish ? "published" : "draft", updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );
        if (error) { failures.push(`${snap.slug}: upsert ${error.message}`); continue; }
      }
      built++;
    }
  }

  console.log(`\n${apply ? "Upserted" : "Would build"} ${built} mock(s)${publish ? " (published)" : apply ? " (draft)" : ""}.`);
  if (failures.length) { console.log(`\n${failures.length} failure(s):`); failures.forEach((f) => console.log(`  ✗ ${f}`)); }
  if (!apply) console.log("\n(dry-run — re-run with --apply to write)");
}

main().catch((e) => { console.error(e); process.exit(1); });
