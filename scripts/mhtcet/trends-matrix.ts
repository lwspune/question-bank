/**
 * Generate the MHT-CET Maths chapter x shift matrix for
 * `/guide/mht-cet-maths/trends`.
 *
 *   npm run mhtcet:matrix            # rewrite the generated data file
 *   npm run mhtcet:matrix -- --check # exit 1 if it is stale (CI-safe)
 *
 * WHY GENERATED. The NDA equivalent hand-authors 19 columns. This is 45
 * papers x 27 chapters = 1,215 cells — past the point where a transcription
 * can be trusted, and well past the point where anyone could re-verify it
 * after the next ingest. Re-run this after any MHT-CET Maths upload.
 *
 * WHY COMMITTED rather than queried at request time: the trends page is a
 * cached guide page, and adding a 2,228-row scan to its render would cost the
 * caching it exists for (see the "shell component de-caches site" pitfall in
 * CLAUDE.md). The generated file is also reviewable in the diff, which is how
 * a bad ingest gets noticed.
 *
 * THE 1000-ROW CAP IS THE HAZARD HERE. The bank holds 2,228 PUBLIC Maths PYQ
 * rows and PostgREST silently truncates a raw `.select()` at 1,000 — the
 * defect that has bitten this project five times. So this pages explicitly AND
 * reconciles the fetched row count against an exact header count before
 * building anything. A short read fails the run; it never produces a smaller,
 * plausible-looking table.
 *
 * WHAT IT REFUSES TO DO. Three papers carry no date and one paper's filename
 * contradicts its note (see `scripts/lib/mhtcetTrendsMatrix.ts`). Both are
 * printed as warnings on every run and carried into the generated file's
 * header. Neither is silently resolved: a guessed column position and a
 * guessed shift number both read, on the page, exactly like a measured one.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  orderPapers,
  detectLabelConflicts,
  buildChapterMatrix,
  buildYearRateMatrix,
  type SourcePaper,
  type MatrixCell,
  type ShiftPaper,
} from "../lib/mhtcetTrendsMatrix";

const local = path.join(process.cwd(), ".env.local");
if (fs.existsSync(local)) require("dotenv").config({ path: local, override: true });

const EXAM = "MHT-CET";
const SUBJECT = "Maths";

const OUT_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "guide",
  "mht-cet-maths",
  "_data",
  "matrix.generated.ts"
);

/** PostgREST hands back at most 1000 rows per request, whatever we ask for. */
const PAGE = 1000;

/** A published MHT-CET Maths paper is 50 questions; some are short by a few. */
const EXPECTED_PAPER_SIZE = 50;
const SHORT_PAPER_FLOOR = 40;

type QuestionRow = {
  source_file: string | null;
  pyq_year: number | null;
  pyq_note: string | null;
  chapter_id: string | null;
};

async function examId(sb: SupabaseClient, name: string): Promise<string> {
  const { data, error } = await sb.from("exams").select("id").eq("name", name).single();
  if (error || !data) throw new Error(`exams: no row named ${name} (${error?.message})`);
  return data.id as string;
}

/**
 * Resolve a subject WITHIN its exam.
 *
 * `subjects` is keyed (exam_id, name), so "Maths" exists once per exam that
 * has one — an exam-less lookup matches several rows and fails. Scoping the
 * query is not a tidy-up: an unscoped match that happened to resolve would
 * silently build this table out of another exam's questions.
 */
async function subjectId(
  sb: SupabaseClient,
  exam: string,
  name: string
): Promise<string> {
  const { data, error } = await sb
    .from("subjects")
    .select("id")
    .eq("exam_id", exam)
    .eq("name", name)
    .single();
  if (error || !data) throw new Error(`subjects: no ${name} under that exam (${error?.message})`);
  return data.id as string;
}

/**
 * Read every PUBLIC MHT-CET Maths PYQ row, paging past the 1000-row cap.
 *
 * The header count is taken FIRST and reconciled after, so a truncated read
 * fails loudly instead of yielding a smaller table that still looks right.
 */
async function readQuestions(
  sb: SupabaseClient,
  examId: string,
  subjectId: string
): Promise<QuestionRow[]> {
  const base = () =>
    sb
      .from("questions")
      .select("source_file, pyq_year, pyq_note, chapter_id")
      .eq("exam_id", examId)
      .eq("subject_id", subjectId)
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq");

  const { count, error: countError } = await sb
    .from("questions")
    .select("*", { count: "exact", head: true })
    .eq("exam_id", examId)
    .eq("subject_id", subjectId)
    .eq("visibility", "PUBLIC")
    .eq("question_kind", "pyq");
  if (countError) throw new Error(`head count failed: ${countError.message}`);
  const expected = count ?? 0;

  const rows: QuestionRow[] = [];
  for (let from = 0; from < expected; from += PAGE) {
    const { data, error } = await base()
      // A stable ORDER BY is required for paging to partition the set rather
      // than resample it — without one, two pages can overlap and miss rows.
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`page at ${from} failed: ${error.message}`);
    rows.push(...((data ?? []) as QuestionRow[]));
  }

  if (rows.length !== expected) {
    throw new Error(
      `short read: fetched ${rows.length} rows but the bank reports ${expected}. ` +
        `Refusing to build a matrix from a truncated set.`
    );
  }
  return rows;
}

async function readChapterNames(sb: SupabaseClient): Promise<Map<string, string>> {
  const names = new Map<string, string>();
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from("chapters")
      .select("id, name")
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`chapters page at ${from} failed: ${error.message}`);
    const page = data ?? [];
    for (const c of page) names.set(c.id as string, c.name as string);
    if (page.length < PAGE) break;
  }
  return names;
}

type Built = {
  papers: ShiftPaper[];
  cells: MatrixCell[];
  rows: ReturnType<typeof buildChapterMatrix>;
  yearRates: ReturnType<typeof buildYearRateMatrix>;
  conflicts: ReturnType<typeof detectLabelConflicts>;
  totalQuestions: number;
};

function build(questions: QuestionRow[], chapterNames: Map<string, string>): Built {
  const papersByFile = new Map<string, SourcePaper>();
  // Nested rather than a joined string key: a chapter name is free text,
  // so any single-character separator is a guess about what it cannot contain.
  const cellCounts = new Map<string, Map<string, number>>();
  let skippedUnfiled = 0;

  for (const q of questions) {
    if (!q.source_file || q.pyq_year === null || !q.chapter_id) {
      // A row with no source file cannot be placed in a column, and a row with
      // no chapter cannot be placed in a row. Counted and reported rather than
      // dropped in silence — it would otherwise break the column totals.
      skippedUnfiled += 1;
      continue;
    }
    if (!papersByFile.has(q.source_file)) {
      papersByFile.set(q.source_file, {
        sourceFile: q.source_file,
        year: q.pyq_year,
        pyqNote: q.pyq_note,
      });
    }
    const chapter = chapterNames.get(q.chapter_id);
    if (!chapter) throw new Error(`unknown chapter_id ${q.chapter_id}`);
    let byChapter = cellCounts.get(q.source_file);
    if (!byChapter) {
      byChapter = new Map<string, number>();
      cellCounts.set(q.source_file, byChapter);
    }
    byChapter.set(chapter, (byChapter.get(chapter) ?? 0) + 1);
  }

  if (skippedUnfiled > 0) {
    console.warn(
      `  ! ${skippedUnfiled} row(s) had no source_file / pyq_year / chapter and are NOT in the matrix`
    );
  }

  const sourcePapers = [...papersByFile.values()];
  const papers = orderPapers(sourcePapers);
  const cells: MatrixCell[] = [...cellCounts.entries()].flatMap(
    ([sourceFile, byChapter]) =>
      [...byChapter.entries()].map(([chapter, count]) => ({
        sourceFile,
        chapter,
        count,
      }))
  );

  return {
    papers,
    cells,
    rows: buildChapterMatrix(cells, papers),
    yearRates: buildYearRateMatrix(cells, papers),
    conflicts: detectLabelConflicts(sourcePapers),
    totalQuestions: questions.length - skippedUnfiled,
  };
}

/** Column sums, used both as the page's footer and as this script's check. */
function columnTotals(built: Built): number[] {
  return built.papers.map((_, i) =>
    built.rows.reduce((sum, row) => sum + row.counts[i], 0)
  );
}

function report(built: Built): void {
  const totals = columnTotals(built);
  const grand = built.rows.reduce((a, r) => a + r.total, 0);

  console.log(
    `  ${built.papers.length} papers · ${built.rows.length} chapters · ${grand} questions`
  );
  if (grand !== built.totalQuestions) {
    throw new Error(
      `matrix holds ${grand} questions but ${built.totalQuestions} were read — cells were lost`
    );
  }

  const short = built.papers
    .map((p, i) => ({ p, total: totals[i] }))
    .filter(({ total }) => total < SHORT_PAPER_FLOOR || total > EXPECTED_PAPER_SIZE);
  if (short.length > 0) {
    console.warn(`  ! ${short.length} paper(s) outside ${SHORT_PAPER_FLOOR}-${EXPECTED_PAPER_SIZE} questions:`);
    for (const { p, total } of short) console.warn(`      ${p.id} — ${total}`);
  }

  const undated = built.papers.filter((p) => !p.dated);
  if (undated.length > 0) {
    console.warn(
      `  ! ${undated.length} paper(s) carry no date; sorted LAST within their year:`
    );
    for (const p of undated) console.warn(`      ${p.id} (${p.year}) — "${p.title}"`);
  }

  if (built.conflicts.length > 0) {
    console.warn(
      `  ! ${built.conflicts.length} paper(s) whose FILENAME and NOTE disagree about the shift:`
    );
    for (const c of built.conflicts) {
      console.warn(
        `      ${c.sourceFile} — filename says shift ${c.fileShift}, note says ${c.noteShift} ("${c.pyqNote}")`
      );
    }
    console.warn(
      `      Not resolved here. The columns are real and distinct; only the LABEL is in doubt.`
    );
  }
}

/** Line endings normalised, so a CRLF working tree is not read as a change. */
function lf(text: string): string {
  return text.split("\r\n").join("\n");
}

function render(built: Built): string {
  const { papers, rows, yearRates, conflicts } = built;
  const totals = columnTotals(built);
  const grand = rows.reduce((a, r) => a + r.total, 0);
  const width = Math.max(...rows.map((r) => r.chapter.length)) + 2;

  const paperLines = papers
    .map(
      (p) =>
        `  { id: ${JSON.stringify(p.id)}, year: ${p.year}, seq: ${p.seq}, ` +
        `label: ${JSON.stringify(p.label)}, title: ${JSON.stringify(p.title)}, ` +
        `dated: ${p.dated}, disputed: ${p.disputed} },`
    )
    .join("\n");

  const matrixLines = rows
    .map((r) => {
      const name = `${JSON.stringify(r.chapter)},`.padEnd(width + 1);
      const total = String(r.total).padStart(4);
      const counts = r.counts.map((c) => String(c).padStart(2)).join(", ");
      return `  { chapter: ${name} total: ${total}, counts: [${counts}] },`;
    })
    .join("\n");

  const rateLines = yearRates.rows
    .map((r) => {
      const name = `${JSON.stringify(r.chapter)},`.padEnd(width + 1);
      const total = String(r.total).padStart(4);
      const rates = r.rates.map((v) => v.toFixed(2).padStart(5)).join(", ");
      return `  { chapter: ${name} total: ${total}, rates: [${rates}] },`;
    })
    .join("\n");

  const yearLines = yearRates.years
    .map((y) => `  { year: ${y.year}, shifts: ${y.shifts} },`)
    .join("\n");

  const conflictLines =
    conflicts.length === 0
      ? " *   none"
      : conflicts
          .map(
            (c) =>
              ` *   ${c.sourceFile}: filename says shift ${c.fileShift}, ` +
              `pyq_note says ${c.noteShift} (${JSON.stringify(c.pyqNote)})`
          )
          .join("\n");

  const undated = papers.filter((p) => !p.dated);
  const undatedNote =
    undated.length === 0
      ? " * Every paper carries a date."
      : ` * ${undated.length} paper(s) carry NO date and are sorted last within their\n` +
        ` * year rather than placed at a guessed position:\n` +
        undated.map((p) => ` *   ${p.id} (${p.year})`).join("\n");

  return `/**
 * GENERATED FILE — do not edit by hand. Run \`npm run mhtcet:matrix\`.
 *
 * The MHT-CET Maths chapter x shift matrix behind /guide/mht-cet-maths/trends,
 * derived from the live bank by scripts/mhtcet/trends-matrix.ts. Re-run it
 * after any MHT-CET Maths ingest; \`-- --check\` fails if this file is stale.
 *
 * ${papers.length} papers · ${rows.length} chapters · ${grand} PUBLIC PYQ questions.
 *
 * WHY THE COLUMNS ARE SHIFTS, NOT YEARS. MHT-CET runs wildly uneven shift
 * counts per year (${yearRates.years.map((y) => `${y.year}=${y.shifts}`).join(" · ")}), so a
 * raw count does not compare across years — the warning the trends page has
 * always carried. Per SHIFT it does compare: every column below is one
 * ~${EXPECTED_PAPER_SIZE}-question paper, so any two cells in the grid can be read against
 * each other directly. YEAR_RATES holds the same data as questions-per-paper
 * for readers who want the summary, each year divided by its OWN shift count.
 *
 * A ZERO IS A MEASURED ZERO. A chapter absent from a paper scored nothing in
 * it; the cell is not missing data. That distinction is the page's headline —
 * Measures of Dispersion runs a question a paper for two years and then goes
 * to zero across every shift of 2025.
 *
${undatedNote}
 *
 * Papers whose filename and pyq_note disagree about the shift number —
 * reported, deliberately NOT resolved, because nothing in the bank says which
 * label is right:
${conflictLines}
 */

/** One column: a single sitting, ordered and named. */
export type ShiftPaper = {
  /** \`questions.source_file\` — the per-paper key the counts are grouped on. */
  id: string;
  year: number;
  /** 1-based index of this sitting within its year; the visible sub-header. */
  seq: number;
  label: string;
  /** Tooltip — the real date, or a plain statement that there is not one. */
  title: string;
  /** False when the bank records no day for this paper. */
  dated: boolean;
  /** True when the filename and pyq_note disagree about the shift number. */
  disputed: boolean;
};

/** One chapter across every paper. \`counts\` aligns 1:1 to SHIFT_PAPERS. */
export type ChapterMatrixRow = {
  chapter: string;
  total: number;
  counts: number[];
};

/** A year column in the rate table, carrying the divisor it was computed with. */
export type YearColumn = { year: number; shifts: number };

/** A chapter's questions-per-paper rate in each year. Always a measured number. */
export type YearRateRow = {
  chapter: string;
  total: number;
  /** Aligned 1:1 to YEAR_COLUMNS. Two decimal places. */
  rates: number[];
};

export const SHIFT_PAPERS: ShiftPaper[] = [
${paperLines}
];

export const YEAR_COLUMNS: YearColumn[] = [
${yearLines}
];

/** Heaviest chapter first. Column i is SHIFT_PAPERS[i]. */
export const CHAPTER_MATRIX: ChapterMatrixRow[] = [
${matrixLines}
];

/** The same questions as questions-per-paper. Column i is YEAR_COLUMNS[i]. */
export const YEAR_RATES: YearRateRow[] = [
${rateLines}
];

/** Per-paper question totals — the matrix footer, and its completeness proof. */
export const PAPER_TOTALS: number[] = [${totals.join(", ")}];

export const MATRIX_META = {
  papers: ${papers.length},
  chapters: ${rows.length},
  questions: ${grand},
  undatedPapers: ${undated.length},
  labelConflicts: ${conflicts.length},
} as const;
`;
}

async function main() {
  const check = process.argv.includes("--check");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (.env.local)"
    );
  }
  const sb = createClient(url, key, { auth: { persistSession: false } });

  const exam = await examId(sb, EXAM);
  const subject = await subjectId(sb, exam, SUBJECT);

  const [questions, chapterNames] = await Promise.all([
    readQuestions(sb, exam, subject),
    readChapterNames(sb),
  ]);

  const built = build(questions, chapterNames);
  report(built);

  const next = render(built);

  if (check) {
    const current = fs.existsSync(OUT_PATH) ? fs.readFileSync(OUT_PATH, "utf8") : "";
    // Compare on NORMALISED line endings. `core.autocrlf` is true in this
    // repo, so a checked-out file is CRLF in the working tree while `render()`
    // emits LF — a byte comparison therefore reports "stale" on Windows for
    // every clean tree, whatever the content says. (`npm run seo:dates
    // -- --check` has exactly this defect today; see the ROADMAP entry.)
    if (lf(current) !== lf(next)) {
      console.error(
        "\nMHT-CET matrix is stale — run `npm run mhtcet:matrix` and commit the result"
      );
      process.exit(1);
    }
    console.log("\nMHT-CET matrix up to date");
    return;
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, next, "utf8");
  console.log(`\nwrote ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
