/**
 * Pure filtering core for the `/formula/[slug]` pages.
 *
 * Filtering is done CLIENT-side over rows the page already loaded, and
 * deliberately does NOT live in the URL. Two documented traps say so:
 * `useSearchParams()` bails a static prerender out to client rendering, which
 * would cost these ISR-cached pages the caching they exist for; and a
 * query-param link on the SAME route has no `loading.tsx` boundary to stop a
 * prefetch at, so every filter chip would become a full server render — the
 * shape that took `/dashboard/students/[id]/performance` down in production.
 * The whole question set is already in memory, so filtering is free.
 *
 * The cost of that choice: a filtered view is not shareable by URL. That
 * matches the project's cross-nav-state convention, and the "open in the paper
 * builder" button is the shareable path.
 */

export type ExamFilter = string | "all";
export type KindFilter = "all" | "pyq" | "practice";

/** The minimum a row needs for filtering. Satisfied by `QuestionRow`. */
export type FilterableQuestion = {
  id: string;
  exam: { name: string };
};

export type FormulaFilterState = { exam: ExamFilter; kind: KindFilter };

/**
 * Short labels for the chips. The DB names are correct but too long to sit in
 * a row of buttons ("Maharashtra HSC Class 12").
 *
 * Unknown names pass through unchanged rather than being dropped, so a new
 * exam's questions stay filterable from the day they land.
 */
const SHORT: Record<string, string> = {
  NDA: "NDA",
  "MHT-CET": "MHT-CET",
  "Maharashtra HSC Class 12": "MH State Board",
  "CBSE Class 12": "CBSE",
};

/** Chip order. Anything unlisted sorts after, alphabetically. */
const ORDER = ["NDA", "MHT-CET", "Maharashtra HSC Class 12", "CBSE Class 12"];

export function examShortLabel(dbName: string): string {
  return SHORT[dbName] ?? dbName;
}

export type Facets = {
  /** Only exams that actually have questions here, in chip order. */
  exams: { name: string; label: string; count: number }[];
  total: number;
  pyq: number;
  practice: number;
};

/**
 * Counts for the chips. Rendering a chip reading "CBSE 0" would invite a click
 * that empties the page, so an absent exam is simply not offered.
 */
export function buildFacets<T extends FilterableQuestion>(
  rows: readonly T[],
  practiceIds: ReadonlySet<string>
): Facets {
  const byExam = new Map<string, number>();
  let practice = 0;
  for (const r of rows) {
    byExam.set(r.exam.name, (byExam.get(r.exam.name) ?? 0) + 1);
    if (practiceIds.has(r.id)) practice++;
  }

  const rank = (name: string) => {
    const i = ORDER.indexOf(name);
    return i === -1 ? ORDER.length : i;
  };

  const exams = [...byExam.entries()]
    .map(([name, count]) => ({ name, label: examShortLabel(name), count }))
    .sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name));

  return { exams, total: rows.length, pyq: rows.length - practice, practice };
}

/**
 * Apply both filters. Order is preserved: the page hands rows in its
 * easiest-first learning ramp, and filtering must not disturb that.
 *
 * Kind comes from `practiceIds` — i.e. from `question_kind` — and never from
 * whether `pyq_year` happens to be set, which is a different question.
 */
export function applyFilters<T extends FilterableQuestion>(
  rows: readonly T[],
  practiceIds: ReadonlySet<string>,
  { exam, kind }: FormulaFilterState
): T[] {
  return rows.filter((r) => {
    if (exam !== "all" && r.exam.name !== exam) return false;
    if (kind === "all") return true;
    const isPractice = practiceIds.has(r.id);
    return kind === "practice" ? isPractice : !isPractice;
  });
}
