/**
 * board:smoke-pyqs — drive the /board PYQ loader against LIVE data.
 *
 *   npx tsx scripts/board/smoke-pyqs.ts
 *
 * The chapter page is a server component behind a dynamic route, so `next build`
 * never renders it: a green gate proves these loaders COMPILE, never that they
 * return anything sane. This sweeps every board chapter through the real
 * `getBoardChapterPyqs` + `groupBoardPyqSittings` and asserts the invariants the
 * reader depends on.
 *
 * Uses the ANON client on purpose — that is what the page uses, so RLS decides
 * visibility here exactly as it does in production.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { getBoardChapterPyqs, pyqYearCounts } from "../../src/lib/board/query";
import { boardPyqPaperStats } from "../../src/lib/board/papers";
import { getSubjectPaperCounts } from "../../src/lib/board/query";
import { BOARD_EXAMS } from "../../src/lib/exam/examContext";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type Chapter = {
  id: string;
  name: string;
  subject: string;
  subjectId: string;
  exam: string;
  examId: string;
};

/**
 * What each board is KNOWN to set per year, from the source papers rather than
 * from this code. This is the run's one independent check on the paper rule: if
 * `paperKeyFor` miscounts, the observed number stops matching what the board
 * actually sets and the run goes red. Ranges, because 2025 was a 6-paper year
 * for CBSE and the MH Maths supplementary only starts in 2024.
 */
const PAPERS_PER_YEAR: Record<string, { min: number; max: number }> = {
  "CBSE Class 12": { min: 5, max: 6 },
  "Maharashtra HSC Class 12": { min: 1, max: 2 },
  "Maharashtra State Board Class 10": { min: 1, max: 1 },
};

async function main() {
  loadEnv();
  const anon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

  // LOADER defects fail the run — ordering, keys, labels are this code's job.
  // DATA findings are reported loudly and do NOT fail: they are properties of
  // the corpus that predate this surface, and a probe that goes red for them
  // trains people to wave it through. (Live example: the 5 CBSE board MCQs with
  // four options and zero marked correct, logged 2026-08-26 and still in the
  // backfill ledger. All 5 carry a solution, so the reader still reveals a
  // worked answer — it just highlights no option.)
  const problems: string[] = [];
  const findings: string[] = [];
  const multiSitting: string[] = [];
  // Papers-per-year OBSERVED per exam, so the run can be checked against what
  // we independently know each board sets (see PAPERS_PER_YEAR below).
  const papersPerYear = new Map<string, Map<number, Set<number>>>();
  let chaptersWithPyqs = 0;
  let chaptersWithout = 0;
  let totalPyqs = 0;

  for (const exam of BOARD_EXAMS) {
    const { data: examRow } = await anon.from("exams").select("id").eq("name", exam.examName).maybeSingle();
    if (!examRow) continue;
    const examId = (examRow as { id: string }).id;

    // Every chapter that is ON /board — i.e. has section-structured PUBLIC rows.
    // Paged: an exam crosses 1000 backfilled rows easily.
    const seen = new Map<string, Chapter>();
    const PAGE = 1000;
    for (let from = 0; ; from += PAGE) {
      const { data, error } = await anon
        .from("questions")
        .select("chapter:chapters!chapter_id(id, name), subject:subjects!subject_id(id, name)")
        .eq("exam_id", examId)
        .not("section_seq", "is", null)
        .range(from, from + PAGE - 1);
      if (error) throw new Error(`chapter sweep: ${error.message}`);
      const rows = (data ?? []) as { chapter: unknown; subject: unknown }[];
      for (const r of rows) {
        const ch = (Array.isArray(r.chapter) ? r.chapter[0] : r.chapter) as { id: string; name: string } | null;
        const sub = (Array.isArray(r.subject) ? r.subject[0] : r.subject) as
          | { id: string; name: string }
          | null;
        if (ch && sub && !seen.has(ch.id)) {
          seen.set(ch.id, {
            id: ch.id,
            name: ch.name,
            subject: sub.name,
            subjectId: sub.id,
            exam: exam.examName,
            examId,
          });
        }
      }
      if (rows.length < PAGE) break;
    }

    // One divisor load per SUBJECT, not per chapter — it is the same fact for
    // every chapter of a subject, and the page pays for it once too.
    const divisors = new Map<string, Map<number, number>>();

    for (const ch of seen.values()) {
      const sittings = await getBoardChapterPyqs(anon, { examId, chapterId: ch.id });
      const where = `${ch.exam} / ${ch.subject} / ${ch.name}`;
      if (sittings.length === 0) {
        chaptersWithout++;
        continue;
      }
      chaptersWithPyqs++;
      const n = sittings.reduce((a, s) => a + s.questions.length, 0);
      totalPyqs += n;

      // 1. Sittings strictly newest-first by year.
      for (let i = 1; i < sittings.length; i++) {
        if (sittings[i].year > sittings[i - 1].year) {
          problems.push(`${where}: sittings out of order (${sittings[i - 1].label} before ${sittings[i].label})`);
        }
      }
      // 2. Keys unique — two sittings of one year must not collapse.
      if (new Set(sittings.map((s) => s.key)).size !== sittings.length) {
        problems.push(`${where}: duplicate sitting key`);
      }
      // 3. Two sittings in one year stay apart. Record them — this is the case
      //    a year-only key would have silently merged.
      const byYear = new Map<number, number>();
      for (const s of sittings) byYear.set(s.year, (byYear.get(s.year) ?? 0) + 1);
      for (const [year, count] of byYear) {
        if (count > 1) {
          const labels = sittings.filter((s) => s.year === year).map((s) => s.label).join(" + ");
          multiSitting.push(`${where} — ${year}: ${labels}`);
        }
      }
      // 4. Every question is answerable and labelled (the reader is a SOLUTIONS
      //    reader; a blank answer or an "undefined 2024" label is a defect).
      for (const s of sittings) {
        if (!s.label.trim() || s.label.includes("undefined") || s.label.includes("null")) {
          problems.push(`${where}: bad sitting label ${JSON.stringify(s.label)}`);
        }
        for (const q of s.questions) {
          // No solution IS a loader defect — the fetch filters them out, so one
          // reaching here means the filter stopped working.
          if (!q.solution || !q.solution.trim()) problems.push(`${where} ${s.label}: ${q.id} has no solution`);
          if (q.format === "mcq" && q.options.filter((o) => o.isCorrect).length !== 1) {
            const n = q.options.filter((o) => o.isCorrect).length;
            findings.push(`${where} ${s.label}: Q${q.questionNumber ?? "?"} has ${q.options.length} options, ${n} correct (${q.id})`);
          }
        }
        // 5. Paper order within a sitting.
        const rows = s.questions.map((q) => q.sourceRow).filter((r): r is number => r != null);
        for (let i = 1; i < rows.length; i++) {
          if (rows[i] < rows[i - 1]) problems.push(`${where} ${s.label}: source_row out of order`);
        }
      }
      // 6. The strip must never invent a year.
      const counts = pyqYearCounts(sittings);
      if (counts.reduce((a, c) => a + c.count, 0) !== n) problems.push(`${where}: year counts do not sum to ${n}`);
      if (new Set(counts.map((c) => c.year)).size !== counts.length) problems.push(`${where}: duplicate year bar`);

      // 7. Per-paper split. The strip divides by papers, so the thing that must
      //    hold is that the split LOSES NOTHING: every question either belongs
      //    to a paper or is declared excluded. A row that is silently neither
      //    would shrink a bar with no trace on the page.
      let divisor = divisors.get(ch.subjectId);
      if (!divisor) {
        const counts = await getSubjectPaperCounts(anon, {
          examId,
          subjectId: ch.subjectId,
          examName: ch.exam,
        });
        divisor = new Map(counts.map((c) => [c.year, c.papers]));
        divisors.set(ch.subjectId, divisor);
      }
      const stats = boardPyqPaperStats(sittings, ch.exam, divisor);
      const counted = stats.years.reduce((a, y) => a + y.questions, 0);
      if (counted + stats.excludedQuestions !== n) {
        problems.push(`${where}: per-paper split covers ${counted}+${stats.excludedQuestions}, not ${n}`);
      }
      // A year with questions but no paper cannot be drawn. Real per the type,
      // absent from today's data — so seeing one means a pipeline changed how it
      // names files, which is exactly when this needs to be loud.
      for (const y of stats.years) {
        if (y.questions > 0 && y.papers === 0) {
          problems.push(`${where}: ${y.year} has ${y.questions} questions in 0 papers`);
        }
        // The independent check: does the rule count the papers the board sets?
        const expected = PAPERS_PER_YEAR[ch.exam];
        if (expected && y.papers > 0 && (y.papers < expected.min || y.papers > expected.max)) {
          problems.push(
            `${where}: ${y.year} resolves to ${y.papers} papers, expected ${expected.min}-${expected.max}`
          );
        }
        if (y.papers > 0) {
          let byExam = papersPerYear.get(ch.exam);
          if (!byExam) {
            byExam = new Map();
            papersPerYear.set(ch.exam, byExam);
          }
          let seenCounts = byExam.get(y.year);
          if (!seenCounts) {
            seenCounts = new Set();
            byExam.set(y.year, seenCounts);
          }
          seenCounts.add(y.papers);
        }
      }
    }
  }

  console.log(`chapters on /board with PYQs : ${chaptersWithPyqs}`);
  console.log(`chapters on /board without   : ${chaptersWithout}`);
  console.log(`board PYQs reachable         : ${totalPyqs}`);
  // A year holding two sittings is what the (year, month) key exists for. It was
  // unexercised in production until MH HSC 12 Mathematics gained a July paper in
  // 2024 and kept it; every hit below is a Maths chapter, and each one is a year
  // the per-YEAR bar used to read roughly double. Note the labels: the main
  // paper prints as a bare year because its month was never recorded in the
  // source compilation, which is why papers.ts keys on source_file instead.
  console.log(
    `\nchapters where one year holds TWO sittings: ${multiSitting.length}` +
      (multiSitting.length === 0 ? "  (the (year, month) key is unexercised here — see tests/board-pyqs.test.ts)" : "")
  );
  for (const m of multiSitting.slice(0, 12)) console.log(`  ${m}`);
  if (multiSitting.length > 12) console.log(`  …and ${multiSitting.length - 12} more`);

  // Papers per year as the rule resolved them, per exam. Read this against what
  // you know the board sets — it is the number every bar is divided by.
  console.log("\npapers per year, as resolved:");
  for (const [exam, years] of [...papersPerYear.entries()].sort()) {
    const line = [...years.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([year, counts]) => `${year}:${[...counts].sort((x, y) => x - y).join("/")}`)
      .join("  ");
    console.log(`  ${exam}\n    ${line}`);
  }

  if (findings.length) {
    console.log(`\n${findings.length} DATA finding(s) — pre-existing, not loader defects:`);
    for (const f of findings.slice(0, 20)) console.log(`  ! ${f}`);
    if (findings.length > 20) console.log(`  …and ${findings.length - 20} more`);
  }

  if (problems.length) {
    console.log(`\n${problems.length} LOADER PROBLEM(S):`);
    for (const p of problems.slice(0, 40)) console.log(`  ✗ ${p}`);
    process.exit(1);
  }
  console.log("\n✓ every loader check passed");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
