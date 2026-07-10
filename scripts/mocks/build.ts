/**
 * Build NDA mock tests from the bank — "use PYQPs as is".
 *
 * Discovers every NDA Mathematics sitting (distinct pyq_year × pyq_month of the
 * PUBLIC pyq corpus), reconstructs each into an immutable snapshot via the pure
 * core (src/lib/mocks/reconstruct.ts), and upserts a `mock_tests` row keyed on
 * the deterministic slugToUuid id (re-running is idempotent).
 *
 *   npx tsx scripts/mocks/build.ts            # dry-run: report what would build
 *   npx tsx scripts/mocks/build.ts --apply    # upsert rows as status='draft'
 *   npx tsx scripts/mocks/build.ts --apply --publish   # ...and publish them
 *   npx tsx scripts/mocks/build.ts --apply --publish --only=2024-Sep  # one paper
 *
 * Writes via the service-role client (bypasses RLS by design — same as the other
 * ingest scripts). Content is NOT copied: the snapshot stores ordered question
 * refs; delivery renders live from `questions`.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NDA_MATHS_PAPER } from "../../src/lib/mocks/blueprints";
import { buildMockPaper, type PaperQuestionRow } from "../../src/lib/mocks/reconstruct";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

// NDA 2020 was a single combined NDA I+II sitting (COVID) — the bank tags it Apr.
const TITLE_OVERRIDES: Record<string, string> = {
  "2020-Apr": "NDA 2020 (Combined I & II) — Paper I — Mathematics",
};

async function resolveIds(db: SupabaseClient) {
  const { data: exam, error: eErr } = await db
    .from("exams").select("id").eq("name", NDA_MATHS_PAPER.examName).single();
  if (eErr || !exam) throw new Error(`NDA exam not found: ${eErr?.message}`);
  const { data: subject, error: sErr } = await db
    .from("subjects").select("id").eq("name", "Mathematics").eq("exam_id", exam.id).single();
  if (sErr || !subject) throw new Error(`NDA Mathematics subject not found: ${sErr?.message}`);
  const { data: chapters, error: cErr } = await db
    .from("chapters").select("id").eq("subject_id", subject.id);
  if (cErr) throw new Error(`chapters lookup: ${cErr.message}`);
  return { examId: exam.id as string, chapterIds: (chapters ?? []).map((c) => c.id as string) };
}

/** Distinct (year, month) sittings present in the Maths PUBLIC pyq corpus. */
async function discoverSittings(db: SupabaseClient, chapterIds: string[]) {
  const { data, error } = await db
    .from("questions")
    .select("pyq_year, pyq_month")
    .in("chapter_id", chapterIds)
    .eq("question_kind", "pyq")
    .eq("visibility", "PUBLIC")
    .not("pyq_year", "is", null);
  if (error) throw new Error(`discover sittings: ${error.message}`);
  const seen = new Map<string, { year: number; month: string | null }>();
  for (const r of data ?? []) {
    const year = r.pyq_year as number;
    const month = (r.pyq_month as string | null) ?? null;
    seen.set(`${year}-${month ?? ""}`, { year, month });
  }
  return [...seen.values()].sort((a, b) => b.year - a.year || (a.month ?? "").localeCompare(b.month ?? ""));
}

/** Fetch one sitting's Maths rows (id + ordering + correct-option label). */
async function fetchPaperRows(
  db: SupabaseClient, chapterIds: string[], year: number, month: string | null
): Promise<PaperQuestionRow[]> {
  let q = db
    .from("questions")
    .select("id, source_row, question_number, options(label,is_correct)")
    .in("chapter_id", chapterIds)
    .eq("question_kind", "pyq")
    .eq("visibility", "PUBLIC")
    .eq("pyq_year", year);
  q = month === null ? q.is("pyq_month", null) : q.eq("pyq_month", month);
  const { data, error } = await q;
  if (error) throw new Error(`fetch rows ${year}-${month}: ${error.message}`);
  return (data ?? []).map((r) => {
    const opts = (r.options ?? []) as { label: string; is_correct: boolean }[];
    const correct = opts.find((o) => o.is_correct)?.label ?? null;
    return {
      id: r.id as string,
      sourceRow: (r.source_row as number | null) ?? null,
      questionNumber: (r.question_number as string | null) ?? null,
      subjectName: "Mathematics", // scoped by chapter_id already
      answer: (correct as "A" | "B" | "C" | "D" | null) ?? null,
    };
  });
}

async function main() {
  const apply = process.argv.includes("--apply");
  const publish = process.argv.includes("--publish");
  const only = process.argv.find((a) => a.startsWith("--only="))?.split("=")[1];
  loadEnv();
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { examId, chapterIds } = await resolveIds(db);
  let sittings = await discoverSittings(db, chapterIds);
  if (only) sittings = sittings.filter((s) => `${s.year}-${s.month ?? ""}` === only);
  console.log(`\nNDA Mathematics — ${sittings.length} sitting(s)${only ? ` (filtered: ${only})` : ""}\n`);

  let built = 0;
  const failures: string[] = [];
  for (const { year, month } of sittings) {
    const rows = await fetchPaperRows(db, chapterIds, year, month);
    let snap;
    try {
      snap = buildMockPaper(NDA_MATHS_PAPER, rows, {
        year, month, title: TITLE_OVERRIDES[`${year}-${month ?? ""}`],
      });
    } catch (e) {
      failures.push(`${year} ${month ?? "-"}: ${e instanceof Error ? e.message.split("\n")[0] : String(e)}`);
      continue;
    }
    console.log(`  ✓ ${snap.slug.padEnd(22)} ${snap.title}  (${snap.totalQuestions}q / ${snap.totalMarks}m)`);
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

  console.log(`\n${apply ? "Upserted" : "Would build"} ${built} mock(s)${publish ? " (published)" : apply ? " (draft)" : ""}.`);
  if (failures.length) { console.log(`\n${failures.length} failure(s):`); failures.forEach((f) => console.log(`  ✗ ${f}`)); }
  if (!apply) console.log("\n(dry-run — re-run with --apply to write)");
}

main().catch((e) => { console.error(e); process.exit(1); });
