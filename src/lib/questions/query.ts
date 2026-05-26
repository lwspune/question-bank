import type { SupabaseClient } from "@supabase/supabase-js";
import type { Filters, Difficulty } from "./filters";

export type OptionRow = {
  label: "A" | "B" | "C" | "D";
  text: string;
  isCorrect: boolean;
  imageUrl: string | null;
};

export type QuestionRow = {
  id: string;
  text: string;
  context: string | null;
  difficulty: Difficulty;
  solution: string | null;
  imageUrl: string | null;
  setId: string | null;
  /** Original Q-number from the source PYQ paper's Excel "Q" column (nullable for the 150 pre-migration MHT-CET seed rows). */
  questionNumber: string | null;
  /** PYQ metadata — surfaced as the `[Q# · disambiguator · year]` provenance chip on the question card. */
  pyqYear: number | null;
  pyqMonth: string | null;
  pyqNote: string | null;
  exam: { id: string; name: string };
  subject: { id: string; name: string };
  chapter: { id: string; name: string };
  subtopic: { id: string; name: string } | null;
  options: OptionRow[];
};

/**
 * Slim shape for the cart panel: enough to render a breadcrumb + a text snippet
 * and to sort by Subject → Chapter → source_row. Skips options/solution/images
 * so the cart-preview payload stays small even for a 200-question cart.
 */
export type QuestionPreview = {
  id: string;
  text: string;
  questionNumber: string | null;
  sourceRow: number | null;
  exam: { id: string; name: string };
  subject: { id: string; name: string };
  chapter: { id: string; name: string };
  subtopic: { id: string; name: string } | null;
};

export type QueryResult = {
  totalCount: number;
  rows: QuestionRow[];
};

export const DEFAULT_PAGE_SIZE = 25;

export async function queryQuestions(
  client: SupabaseClient,
  orgId: string | null,
  filters: Filters,
  pageSize: number = DEFAULT_PAGE_SIZE
): Promise<QueryResult> {
  // Principle filter resolves to a question-id list via the tag table BEFORE
  // building the main query, so the result narrows by `id IN (taggedIds)` and
  // AND-composes with every other filter. RLS still applies (same client).
  // Short-circuit to empty result when zero questions are tagged — `.in("id",
  // [])` would generate a malformed array literal that PostgREST 400's on.
  let principleNarrow: string[] | null = null;
  if (filters.principleSlug) {
    const { data: tagRows, error: tagErr } = await client
      .from("question_principle_tags")
      .select("question_id")
      .eq("principle_slug", filters.principleSlug);
    if (tagErr) throw new Error(`principle tag lookup: ${tagErr.message}`);
    const taggedIds = (tagRows ?? []).map((r) => (r as { question_id: string }).question_id);
    if (taggedIds.length === 0) {
      return { totalCount: 0, rows: [] };
    }
    principleNarrow = taggedIds;
  }

  // When orgId is null, no org filter is applied — RLS scopes the result:
  //   anon role        → only PUBLIC rows
  //   authenticated    → PUBLIC rows + caller's own org's PRIVATE rows
  //   service-role     → everything (used in tests with explicit orgId)
  let q = client
    .from("questions")
    .select(
      `
      id, text, context, difficulty, solution, image_url, set_id,
      question_number, pyq_year, pyq_month, pyq_note,
      exam:exams!exam_id(id, name),
      subject:subjects!subject_id(id, name),
      chapter:chapters!chapter_id(id, name),
      subtopic:subtopics!subtopic_id(id, name),
      options(label, text, is_correct, image_url)
    `,
      { count: "exact" }
    );

  if (orgId !== null) q = q.eq("org_id", orgId);
  if (principleNarrow !== null) q = q.in("id", principleNarrow);

  if (filters.examId) q = q.eq("exam_id", filters.examId);
  if (filters.subjectId) q = q.eq("subject_id", filters.subjectId);
  if (filters.chapterIds.length > 0) q = q.in("chapter_id", filters.chapterIds);
  // Subtopic vs extras: principle drill links include both — questions in
  // named-keyword subtopics PLUS curated extras where the principle is the
  // lever but the subtopic name doesn't carry the keyword. The two sets are
  // OR'd; other filters (exam/subject/chapter/difficulty/year/q) AND-narrow
  // on top.
  const hasSubtopics = filters.subtopicIds.length > 0;
  const hasExtras = filters.extraIds.length > 0;
  if (hasSubtopics && hasExtras) {
    q = q.or(
      `subtopic_id.in.(${filters.subtopicIds.join(",")}),id.in.(${filters.extraIds.join(",")})`
    );
  } else if (hasSubtopics) {
    q = q.in("subtopic_id", filters.subtopicIds);
  } else if (hasExtras) {
    q = q.in("id", filters.extraIds);
  }
  if (filters.difficulties.length > 0)
    q = q.in("difficulty", filters.difficulties);
  if (filters.pyqYears.length > 0) q = q.in("pyq_year", filters.pyqYears);
  if (filters.q.trim()) {
    q = q.textSearch("search_vector", filters.q.trim(), {
      type: "websearch",
      config: "english",
    });
  }

  const start = (filters.page - 1) * pageSize;
  const end = start + pageSize - 1;
  // Bulk uploads insert rows with identical created_at timestamps;
  // source_row breaks the tie (so within one upload, Excel-row order is
  // preserved — Q34 before Q35 in the same set, etc.). id is the final
  // tiebreaker for the rare case where source_row is also tied
  // (sync-receiver inserts, ad-hoc imports without source_row).
  q = q
    .order("created_at", { ascending: false })
    .order("source_row", { ascending: true, nullsFirst: false })
    .order("id", { ascending: true })
    .range(start, end);

  const { data, error, count } = await q;
  if (error) throw new Error(`questions query: ${error.message}`);

  type RawOption = {
    label: "A" | "B" | "C" | "D";
    text: string;
    is_correct: boolean;
    image_url: string | null;
  };
  type RawTaxonomy = { id: string; name: string };
  type Raw = {
    id: string;
    text: string;
    context: string | null;
    difficulty: Difficulty;
    solution: string | null;
    image_url: string | null;
    set_id: string | null;
    question_number: string | null;
    pyq_year: number | null;
    pyq_month: string | null;
    pyq_note: string | null;
    exam: RawTaxonomy | RawTaxonomy[] | null;
    subject: RawTaxonomy | RawTaxonomy[] | null;
    chapter: RawTaxonomy | RawTaxonomy[] | null;
    subtopic: RawTaxonomy | RawTaxonomy[] | null;
    options: RawOption[] | null;
  };

  const flatten = (v: RawTaxonomy | RawTaxonomy[] | null): RawTaxonomy | null =>
    Array.isArray(v) ? v[0] ?? null : v;

  const rows: QuestionRow[] = ((data ?? []) as Raw[]).map((r) => ({
    id: r.id,
    text: r.text,
    context: r.context,
    difficulty: r.difficulty,
    solution: r.solution,
    imageUrl: r.image_url,
    setId: r.set_id,
    questionNumber: r.question_number,
    pyqYear: r.pyq_year,
    pyqMonth: r.pyq_month,
    pyqNote: r.pyq_note,
    exam: flatten(r.exam)!,
    subject: flatten(r.subject)!,
    chapter: flatten(r.chapter)!,
    subtopic: flatten(r.subtopic),
    options: (r.options ?? [])
      .map((o) => ({
        label: o.label,
        text: o.text,
        isCorrect: o.is_correct,
        imageUrl: o.image_url,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  }));

  return { totalCount: count ?? 0, rows };
}

/**
 * Fetch questions by an explicit ordered list of IDs and return them in the
 * caller's order (cart-insertion order). IDs that don't resolve under the
 * current RLS scope (deleted, made PRIVATE, etc.) are dropped silently —
 * callers decide whether to surface "some questions are no longer available".
 *
 * RLS still applies. Empty input → no DB round-trip.
 */
export async function queryQuestionsByIds(
  client: SupabaseClient,
  ids: string[]
): Promise<QuestionRow[]> {
  if (ids.length === 0) return [];

  const { data, error } = await client
    .from("questions")
    .select(
      `
      id, text, context, difficulty, solution, image_url, set_id,
      question_number, pyq_year, pyq_month, pyq_note,
      exam:exams!exam_id(id, name),
      subject:subjects!subject_id(id, name),
      chapter:chapters!chapter_id(id, name),
      subtopic:subtopics!subtopic_id(id, name),
      options(label, text, is_correct, image_url)
    `
    )
    .in("id", ids);

  if (error) throw new Error(`questions by ids: ${error.message}`);

  type RawOption = {
    label: "A" | "B" | "C" | "D";
    text: string;
    is_correct: boolean;
    image_url: string | null;
  };
  type RawTaxonomy = { id: string; name: string };
  type Raw = {
    id: string;
    text: string;
    context: string | null;
    difficulty: Difficulty;
    solution: string | null;
    image_url: string | null;
    set_id: string | null;
    question_number: string | null;
    pyq_year: number | null;
    pyq_month: string | null;
    pyq_note: string | null;
    exam: RawTaxonomy | RawTaxonomy[] | null;
    subject: RawTaxonomy | RawTaxonomy[] | null;
    chapter: RawTaxonomy | RawTaxonomy[] | null;
    subtopic: RawTaxonomy | RawTaxonomy[] | null;
    options: RawOption[] | null;
  };

  const flatten = (v: RawTaxonomy | RawTaxonomy[] | null): RawTaxonomy | null =>
    Array.isArray(v) ? v[0] ?? null : v;

  const byId = new Map<string, QuestionRow>();
  for (const r of (data ?? []) as Raw[]) {
    byId.set(r.id, {
      id: r.id,
      text: r.text,
      context: r.context,
      difficulty: r.difficulty,
      solution: r.solution,
      imageUrl: r.image_url,
      setId: r.set_id,
      questionNumber: r.question_number,
      pyqYear: r.pyq_year,
      pyqMonth: r.pyq_month,
      pyqNote: r.pyq_note,
      exam: flatten(r.exam)!,
      subject: flatten(r.subject)!,
      chapter: flatten(r.chapter)!,
      subtopic: flatten(r.subtopic),
      options: (r.options ?? [])
        .map((o) => ({
          label: o.label,
          text: o.text,
          isCorrect: o.is_correct,
          imageUrl: o.image_url,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    });
  }

  // Preserve the caller's order; skip ids that didn't resolve.
  return ids
    .map((id) => byId.get(id))
    .filter((row): row is QuestionRow => row !== undefined);
}

/**
 * Slim variant for the cart panel — same RLS scope, same order semantics,
 * but no options/solution/images. Use this when the consumer only needs to
 * render breadcrumbs + a text snippet.
 */
export async function queryQuestionPreviewsByIds(
  client: SupabaseClient,
  ids: string[]
): Promise<QuestionPreview[]> {
  if (ids.length === 0) return [];

  const { data, error } = await client
    .from("questions")
    .select(
      `
      id, text, question_number, source_row,
      exam:exams!exam_id(id, name),
      subject:subjects!subject_id(id, name),
      chapter:chapters!chapter_id(id, name),
      subtopic:subtopics!subtopic_id(id, name)
    `
    )
    .in("id", ids);

  if (error) throw new Error(`question previews: ${error.message}`);

  type RawTaxonomy = { id: string; name: string };
  type Raw = {
    id: string;
    text: string;
    question_number: string | null;
    source_row: number | null;
    exam: RawTaxonomy | RawTaxonomy[] | null;
    subject: RawTaxonomy | RawTaxonomy[] | null;
    chapter: RawTaxonomy | RawTaxonomy[] | null;
    subtopic: RawTaxonomy | RawTaxonomy[] | null;
  };

  const flatten = (v: RawTaxonomy | RawTaxonomy[] | null): RawTaxonomy | null =>
    Array.isArray(v) ? v[0] ?? null : v;

  const byId = new Map<string, QuestionPreview>();
  for (const r of (data ?? []) as Raw[]) {
    byId.set(r.id, {
      id: r.id,
      text: r.text,
      questionNumber: r.question_number,
      sourceRow: r.source_row,
      exam: flatten(r.exam)!,
      subject: flatten(r.subject)!,
      chapter: flatten(r.chapter)!,
      subtopic: flatten(r.subtopic),
    });
  }

  return ids
    .map((id) => byId.get(id))
    .filter((row): row is QuestionPreview => row !== undefined);
}
