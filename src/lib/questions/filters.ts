import { parseFit, type SyllabusFit } from "@/lib/relevance/fit";

export type Difficulty = "EASY" | "MODERATE" | "HARD";

/** Which question corpus to browse. Default 'pyq' keeps the PYQ-first product
 *  promise; 'practice' is the opt-in supplementary bank; 'all' is the union. */
export type QuestionKind = "pyq" | "practice" | "all";

/** Question shape (migration 0041). 'mcq' has 4 options + one correct; 'subjective'
 *  has zero options and its model answer lives in `questions.solution`. */
export type QuestionFormat = "mcq" | "subjective" | "numeric";

/** The question_format axis as a FILTER — the three real formats plus the
 *  'all' default. Kept distinct from `QuestionFormat` (the column's own type)
 *  so a row can never be assigned the sentinel. */
export type FormatFilter = QuestionFormat | "all";

export type Filters = {
  examId: string | null;
  subjectId: string | null;
  chapterIds: string[];
  subtopicIds: string[];
  difficulties: Difficulty[];
  pyqYears: number[];
  /** Curated question UUIDs added to the result via OR with subtopicIds —
   *  used by principle drill links to include questions where the principle
   *  is the lever but the subtopic name doesn't carry the keyword. Empty by
   *  default; never user-facing in the FilterBar.
   *
   *  Deprecated for /guide principle drills — `principleSlug` is the source
   *  of truth now (migration 0023). Retained for backward URL compatibility. */
  extraIds: string[];
  /** Slug of a top-20 principle from `/guide/nda-maths/_data/principles.ts`.
   *  When set, narrows results to questions tagged with this principle in
   *  `question_principle_tags` (migration 0023). AND-composes with all other
   *  filters. Single value — only one principle can be active at a time. */
  principleSlug: string | null;
  /** PYQ (default) / Practice / All — the question_kind axis (migration 0036). */
  kind: QuestionKind;
  /** MCQ / Subjective / Numeric — the question_format axis (migrations 0041 +
   *  0061). Orthogonal to `kind`: either corpus can hold any format.
   *
   *  Defaults to 'all' and MUST stay that way. 8,370 subjective + 2,900 numeric
   *  PUBLIC questions are the primary corpus of the six board/JEE exams; any
   *  other default would silently empty them out of every pre-existing URL,
   *  guide CTA and notes drill link. */
  format: FormatFilter;
  /** Cross-exam syllabus screen (migration 0062). Only meaningful on JEE Mains:
   *  narrows to questions an NDA+CET-taught student can actually solve, or to
   *  the excluded set for auditing. 'all' (default) applies no screen. */
  fit: SyllabusFit;
  q: string;
  page: number;
};

const ALL_DIFFICULTIES: Difficulty[] = ["EASY", "MODERATE", "HARD"];
const KINDS: QuestionKind[] = ["pyq", "practice", "all"];
// Allow-list, not a regex. The parsed value reaches `.eq("question_format", …)`
// verbatim, and an unrecognised literal makes Postgres raise `invalid input
// value for enum question_format` — a 500 rather than an empty result set.
const FORMATS: FormatFilter[] = ["all", "mcq", "subjective", "numeric"];

/** Narrow an untrusted value to a FormatFilter, defaulting to 'all'.
 *
 *  Exported because `/api/export` accepts a client-supplied `Filters` object
 *  and hands it straight to `queryQuestions` without re-parsing. Anything not
 *  on the allow-list would reach `.eq("question_format", …)` and make Postgres
 *  raise `invalid input value for enum` — a 500. (The sibling fields on that
 *  route are trusted the same way and have the same gap; this at least does
 *  not widen it. See ROADMAP.) */
export function coerceFormat(value: unknown): FormatFilter {
  return FORMATS.includes(value as FormatFilter)
    ? (value as FormatFilter)
    : "all";
}
const MIN_YEAR = 1900;
const MAX_YEAR = 2100;
// UUID v1-v5 shape — relaxed enough to also accept v7/v8 variants.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// Principle slug: lowercase, kebab-case, max 80 chars. Defence-in-depth
// against a malicious caller smuggling SQL fragments via ?principle=.
const PRINCIPLE_SLUG_RE = /^[a-z][a-z0-9-]{0,79}$/;

export const EMPTY_FILTERS: Filters = {
  examId: null,
  subjectId: null,
  chapterIds: [],
  subtopicIds: [],
  difficulties: [],
  pyqYears: [],
  extraIds: [],
  principleSlug: null,
  kind: "pyq",
  format: "all",
  fit: "all",
  q: "",
  page: 1,
};

export function parseFilters(params: URLSearchParams): Filters {
  const examId = params.get("examId") || null;
  const subjectId = params.get("subjectId") || null;
  const chapterIds = csv(params.get("chapterIds"));
  const subtopicIds = csv(params.get("subtopicIds"));
  const difficulties = csv(params.get("difficulty")).filter(
    (d): d is Difficulty => ALL_DIFFICULTIES.includes(d as Difficulty)
  );
  const pyqYears = csv(params.get("pyqYears"))
    .map((s) => parseInt(s, 10))
    .filter(
      (n) => Number.isInteger(n) && n >= MIN_YEAR && n <= MAX_YEAR
    );
  // Defensive: only accept UUID-shaped extras so a malicious caller can't
  // smuggle SQL fragments or other identifiers into the query.
  const extraIds = csv(params.get("extras")).filter((s) => UUID_RE.test(s));
  const rawPrinciple = params.get("principle");
  const principleSlug =
    rawPrinciple && PRINCIPLE_SLUG_RE.test(rawPrinciple) ? rawPrinciple : null;
  const rawKind = params.get("kind");
  const kind: QuestionKind = KINDS.includes(rawKind as QuestionKind)
    ? (rawKind as QuestionKind)
    : "pyq";
  const format = coerceFormat(params.get("format"));
  const fit = parseFit(params.get("fit"));
  const q = params.get("q") ?? "";
  const pageRaw = parseInt(params.get("page") ?? "1", 10);
  const page = Number.isNaN(pageRaw) || pageRaw < 1 ? 1 : pageRaw;
  return {
    examId,
    subjectId,
    chapterIds,
    subtopicIds,
    difficulties,
    pyqYears,
    extraIds,
    principleSlug,
    kind,
    format,
    fit,
    q,
    page,
  };
}

export function buildSearchParams(filters: Filters): URLSearchParams {
  const sp = new URLSearchParams();
  if (filters.examId) sp.set("examId", filters.examId);
  if (filters.subjectId) sp.set("subjectId", filters.subjectId);
  if (filters.chapterIds.length > 0)
    sp.set("chapterIds", filters.chapterIds.join(","));
  if (filters.subtopicIds.length > 0)
    sp.set("subtopicIds", filters.subtopicIds.join(","));
  if (filters.difficulties.length > 0)
    sp.set("difficulty", filters.difficulties.join(","));
  if (filters.pyqYears.length > 0)
    sp.set("pyqYears", filters.pyqYears.join(","));
  if (filters.extraIds.length > 0)
    sp.set("extras", filters.extraIds.join(","));
  if (filters.principleSlug) sp.set("principle", filters.principleSlug);
  if (filters.kind !== "pyq") sp.set("kind", filters.kind);
  // Omitted at the default so every URL minted before this filter existed —
  // and every guide/notes CTA built through buildBrowseUrl — stays byte-identical.
  if (filters.format !== "all") sp.set("format", filters.format);
  if (filters.fit !== "all") sp.set("fit", filters.fit);
  if (filters.q) sp.set("q", filters.q);
  if (filters.page > 1) sp.set("page", String(filters.page));
  return sp;
}

function csv(s: string | null): string[] {
  if (!s) return [];
  return s
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
}
