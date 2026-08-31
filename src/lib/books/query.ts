/**
 * Data layer for the book reader.
 *
 * Reads only. The book is a derived view over questions that already exist, so
 * nothing here writes, and every row it returns is already PUBLIC — the
 * superadmin gate on the pages is about who may see the ASSEMBLED book, not
 * about privileged content.
 *
 * TWO-PHASE FETCH, deliberately. Phase one pulls only the ordering fields
 * (id, chapter, exam, set, row, year, month, file); phase two pulls the full
 * question shape for one chapter via `queryQuestionsByIds`. This is the same
 * split `/browse` uses, and for the same reason: a single wide query carrying
 * `text`/`context`/`solution` through an ORDER BY makes Postgres sort the
 * entire result set to keep one page, which on `/browse` was spilling ~14 MB
 * to disk per call.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { queryQuestionsByIds, type QuestionRow } from "@/lib/questions/query";
import {
  buildStoredSections,
  sittingOrdinal,
  type BookExam,
  type BookQuestionMeta,
  type BookSection,
  type BookSectionKey,
  type SetMeta,
  type StoredPlacement,
} from "./order";
import type { BookChapter, BookDefinition } from "./registry";

/** PostgREST truncates a `.select()` at 1000 rows, silently. Page under it. */
const PAGE_SIZE = 1000;

/**
 * Ids per `.in()` filter — a DIFFERENT limit from PAGE_SIZE, and the one that
 * is easy to confuse with it. `.in()` puts every id in the URL, so a few
 * hundred uuids overrun the request line and PostgREST answers a bare
 * `Bad Request` (measured elsewhere in this repo at 833 ids, ~31 kB).
 * Vocabulary is already 773 questions, so this is not theoretical.
 * `queryQuestionsByIds` does not chunk — it is only ever called with one
 * 25-row page on /browse — so the chunking has to happen here.
 */
const ID_CHUNK = 200;

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export type BookMetaRow = BookQuestionMeta & { chapterName: string };

/** Per-chapter tallies for the book's table of contents. */
export type BookChapterSummary = {
  chapter: BookChapter;
  /** Question count per exam, keyed by exam name. */
  byExam: Record<BookExam, number>;
  total: number;
};

export type BookOverview = {
  book: BookDefinition;
  chapters: BookChapterSummary[];
  total: number;
  /**
   * False when the book has never been assembled (`npm run books:sync`).
   * Reported rather than silently falling back to the derived order — a
   * fallback would make a sync that never ran indistinguishable from one that
   * did, which is the thing the stored order exists to make visible.
   */
  assembled: boolean;
  syncedAt: string | null;
  /** Rows curated OUT of the book. Counted so a zero reads as a zero. */
  excluded: number;
};

export type BookChapterView = {
  book: BookDefinition;
  chapter: BookChapter;
  sections: BookSection[];
  /** Every question of the chapter, by id, for the reader to render. */
  questionsById: Map<string, QuestionRow>;
  /** LIVE questions — excluded rows are not part of the book. */
  total: number;
  assembled: boolean;
  /** Rows curated out of THIS chapter. */
  excluded: number;
  /**
   * Questions present in the chapter but curated OUT. They are still rendered
   * (struck through, with an Include control) rather than hidden, for two
   * reasons: a decision you cannot see is one you cannot reverse, and
   * excluding one question of a passage set must not visually shatter the set.
   */
  excludedIds: string[];
};

/** A `book_questions` row as the reader needs it. */
type StoredRow = StoredPlacement & {
  chapterSlug: string;
  position: number;
  excluded: boolean;
};

/**
 * Resolve the `books` row. Null = never assembled.
 *
 * `books` and `book_questions` are RLS-locked (enabled, no policies), so these
 * reads REQUIRE a service-role client. The pages pass one, having already
 * proved the caller is a superadmin — the same shape as the platform-wide
 * /dashboard surfaces.
 */
async function resolveBookId(
  client: SupabaseClient,
  book: BookDefinition
): Promise<{ id: string; syncedAt: string | null } | null> {
  const { data, error } = await client
    .from("books")
    .select("id, synced_at")
    .eq("slug", book.slug)
    .maybeSingle();
  if (error) throw new Error(`books: book row lookup failed — ${error.message}`);
  return data ? { id: data.id, syncedAt: data.synced_at } : null;
}

/** Stored placements for a book, or one chapter of it, in book order. */
async function loadStored(
  client: SupabaseClient,
  bookId: string,
  chapterSlug?: string
): Promise<StoredRow[]> {
  const rows: StoredRow[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    let q = client
      .from("book_questions")
      .select("question_id, chapter_slug, section_key, position, excluded")
      .eq("book_id", bookId);
    if (chapterSlug) q = q.eq("chapter_slug", chapterSlug);
    // Ordered by position so the stored sequence survives paging. `question_id`
    // breaks ties, since LIMIT/OFFSET paging with a non-unique sort key can
    // repeat and skip rows between pages.
    const { data, error } = await q
      .order("position")
      .order("question_id")
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(`books: book_questions read failed — ${error.message}`);
    for (const r of data ?? []) {
      rows.push({
        questionId: r.question_id,
        chapterSlug: r.chapter_slug,
        sectionKey: r.section_key as BookSectionKey,
        position: r.position,
        excluded: r.excluded,
      });
    }
    if (!data || data.length < PAGE_SIZE) break;
  }
  return rows;
}

/** Set id / year / sitting per question — what a stored row does not carry. */
function setMetaById(meta: BookMetaRow[]): Map<string, SetMeta> {
  return new Map(
    meta.map((m) => [
      m.id,
      { setId: m.setId, year: m.pyqYear, sitting: sittingOrdinal(m) },
    ])
  );
}

type Scope = {
  examNameById: Map<string, BookExam>;
  subjectIds: string[];
  /** chapter name -> the chapter row ids carrying it (one per exam). */
  chapterIdsByName: Map<string, string[]>;
};

/**
 * Resolve the book's names to ids.
 *
 * `subjects.exam_id` is NOT NULL, so "English" is a DIFFERENT row per exam and
 * both must be resolved — filtering on the name alone would silently pick one.
 */
async function resolveScope(
  client: SupabaseClient,
  book: BookDefinition
): Promise<Scope> {
  const { data: exams, error: examErr } = await client
    .from("exams")
    .select("id, name")
    .in("name", book.exams);
  if (examErr) throw new Error(`books: exam lookup failed — ${examErr.message}`);

  const examNameById = new Map<string, BookExam>();
  for (const row of exams ?? []) {
    if ((book.exams as string[]).includes(row.name)) {
      examNameById.set(row.id, row.name as BookExam);
    }
  }

  const { data: subjects, error: subjErr } = await client
    .from("subjects")
    .select("id, exam_id")
    .eq("name", book.subject)
    .in("exam_id", Array.from(examNameById.keys()));
  if (subjErr) throw new Error(`books: subject lookup failed — ${subjErr.message}`);
  const subjectIds = (subjects ?? []).map((s) => s.id);

  const { data: chapters, error: chapErr } = await client
    .from("chapters")
    .select("id, name")
    .in("subject_id", subjectIds)
    .in(
      "name",
      book.chapters.map((c) => c.name)
    );
  if (chapErr) throw new Error(`books: chapter lookup failed — ${chapErr.message}`);

  const chapterIdsByName = new Map<string, string[]>();
  for (const row of chapters ?? []) {
    const list = chapterIdsByName.get(row.name) ?? [];
    list.push(row.id);
    chapterIdsByName.set(row.name, list);
  }

  return { examNameById, subjectIds, chapterIdsByName };
}

/**
 * Ordering metadata for the book, optionally scoped to one chapter.
 *
 * Paged, because a single chapter can already exceed the 1000-row cap
 * (Vocabulary is 773 across both exams and the bank only grows). The
 * `.order("id")` is not cosmetic: LIMIT/OFFSET paging with no ORDER BY has no
 * stability guarantee, and consecutive pages can then repeat and skip rows —
 * which is exactly how the syllabus alignment table came to render a different
 * row count on every request.
 */
async function loadMeta(
  client: SupabaseClient,
  scope: Scope,
  chapterIds: string[]
): Promise<BookMetaRow[]> {
  if (chapterIds.length === 0) return [];

  const nameByChapterId = new Map<string, string>();
  for (const [name, ids] of scope.chapterIdsByName) {
    for (const id of ids) nameByChapterId.set(id, name);
  }

  const rows: BookMetaRow[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await client
      .from("questions")
      .select("id, exam_id, chapter_id, set_id, source_row, pyq_year, pyq_month, source_file")
      .in("chapter_id", chapterIds)
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .order("id")
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(`books: question metadata fetch failed — ${error.message}`);

    for (const row of data ?? []) {
      const exam = scope.examNameById.get(row.exam_id);
      const chapterName = nameByChapterId.get(row.chapter_id);
      // A row outside the book's exams or chapters cannot be placed, and
      // guessing a home for it would put it under the wrong heading.
      if (!exam || !chapterName) continue;
      rows.push({
        id: row.id,
        exam,
        chapterName,
        setId: row.set_id,
        sourceRow: row.source_row,
        pyqYear: row.pyq_year,
        pyqMonth: row.pyq_month,
        sourceFile: row.source_file,
      });
    }

    if (!data || data.length < PAGE_SIZE) break;
  }
  return rows;
}

/**
 * Ordering metadata for a whole book, or one chapter of it.
 *
 * Exported for `scripts/books/sync.ts`, which needs the DERIVED order (what
 * the bank says the book should contain) to diff against the STORED order in
 * `book_questions`. It deliberately does not fetch question bodies — the sync
 * only ever compares ids and placement.
 */
export async function loadBookMeta(
  client: SupabaseClient,
  book: BookDefinition,
  opts: { chapterName?: string } = {}
): Promise<BookMetaRow[]> {
  const scope = await resolveScope(client, book);
  const chapterIds = opts.chapterName
    ? scope.chapterIdsByName.get(opts.chapterName) ?? []
    : Array.from(scope.chapterIdsByName.values()).flat();
  return loadMeta(client, scope, chapterIds);
}

/**
 * The book's table of contents.
 *
 * Counts come from the BOOK (`book_questions`), not from the bank, so the TOC
 * describes what a chapter will actually render. Excluded rows are counted
 * separately rather than folded into the total — the total is the book.
 */
export async function loadBookOverview(
  client: SupabaseClient,
  book: BookDefinition
): Promise<BookOverview> {
  const row = await resolveBookId(client, book);
  const empty = () =>
    Object.fromEntries(book.exams.map((e) => [e, 0])) as Record<BookExam, number>;

  if (!row) {
    return {
      book,
      chapters: book.chapters.map((chapter) => ({ chapter, byExam: empty(), total: 0 })),
      total: 0,
      assembled: false,
      syncedAt: null,
      excluded: 0,
    };
  }

  const stored = await loadStored(client, row.id);
  const examOfSection: Record<BookSectionKey, BookExam> = { nda: "NDA", cds: "CDS" };

  const counts = new Map<string, Record<BookExam, number>>();
  let excluded = 0;
  for (const r of stored) {
    if (r.excluded) {
      excluded += 1;
      continue;
    }
    const entry = counts.get(r.chapterSlug) ?? empty();
    const exam = examOfSection[r.sectionKey];
    if (exam) entry[exam] = (entry[exam] ?? 0) + 1;
    counts.set(r.chapterSlug, entry);
  }

  const chapters: BookChapterSummary[] = book.chapters.map((chapter) => {
    const byExam = counts.get(chapter.slug) ?? empty();
    return {
      chapter,
      byExam,
      total: Object.values(byExam).reduce((a, b) => a + b, 0),
    };
  });

  return {
    book,
    chapters,
    total: chapters.reduce((n, c) => n + c.total, 0),
    assembled: row.syncedAt != null,
    syncedAt: row.syncedAt,
    excluded,
  };
}

/**
 * One chapter, in BOOK order: "NDA PYQ" then "CDS PYQ".
 *
 * Order comes from `book_questions`. The bank is still read, but only for the
 * facts a stored row does not carry — a question's set id, year and sitting,
 * needed to regroup passages and label them.
 */
export async function loadBookChapter(
  client: SupabaseClient,
  book: BookDefinition,
  chapter: BookChapter
): Promise<BookChapterView> {
  const row = await resolveBookId(client, book);
  if (!row) {
    return {
      book,
      chapter,
      sections: buildStoredSections([], new Map()),
      questionsById: new Map(),
      total: 0,
      assembled: false,
      excluded: 0,
      excludedIds: [],
    };
  }

  const [stored, meta] = await Promise.all([
    loadStored(client, row.id, chapter.slug),
    loadBookMeta(client, book, { chapterName: chapter.name }),
  ]);

  // Sections are built from EVERY stored row, excluded ones included, so a
  // curated-out question still appears in place. The reader strikes it through;
  // hiding it would make the decision invisible and irreversible from the page.
  const sections = buildStoredSections(stored, setMetaById(meta));
  const excludedIds = stored.filter((r) => r.excluded).map((r) => r.questionId);

  const orderedIds = sections.flatMap((s) => s.sets.flatMap((set) => set.questionIds));
  const batches = await Promise.all(
    chunk(orderedIds, ID_CHUNK).map((ids) => queryQuestionsByIds(client, ids))
  );
  const questionsById = new Map(batches.flat().map((q) => [q.id, q]));

  return {
    book,
    chapter,
    sections,
    questionsById,
    total: orderedIds.length - excludedIds.length,
    assembled: row.syncedAt != null,
    excluded: excludedIds.length,
    excludedIds,
  };
}
