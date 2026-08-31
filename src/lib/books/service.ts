/**
 * Curation writes for a book. Server-only.
 *
 * Every operation RE-DERIVES the chapter's current state before planning a
 * move, rather than trusting what the browser last rendered. A page open in a
 * tab since before the last sync would otherwise move a set to where it USED to
 * belong; re-deriving means a stale client either finds its set exactly where
 * the server sees it, or fails to find it at all — never moves the wrong thing.
 *
 * `books` / `book_questions` are RLS-locked (enabled, no policies), so these
 * take a SERVICE-ROLE client. The authorization boundary is `requireSuperadmin`
 * in the calling server action; RLS cannot express "is a platform admin"
 * without a policy, and this table deliberately has none.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { buildStoredSections, sittingOrdinal, type BookSectionKey, type SetMeta } from "./order";
import { planSetMove, planSetToSection, type PositionedSet } from "./curate";
import { loadBookMeta } from "./query";
import type { BookChapter, BookDefinition } from "./registry";

type Row = {
  questionId: string;
  sectionKey: BookSectionKey;
  position: number;
  excluded: boolean;
};

const PAGE_SIZE = 1000;

async function bookIdOf(client: SupabaseClient, book: BookDefinition): Promise<string> {
  const { data, error } = await client
    .from("books")
    .select("id")
    .eq("slug", book.slug)
    .maybeSingle();
  if (error) throw new Error(`books: lookup failed — ${error.message}`);
  if (!data) throw new Error(`books: "${book.slug}" has not been assembled yet`);
  return data.id as string;
}

async function chapterRows(
  client: SupabaseClient,
  bookId: string,
  chapterSlug: string
): Promise<Row[]> {
  const rows: Row[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await client
      .from("book_questions")
      .select("question_id, section_key, position, excluded")
      .eq("book_id", bookId)
      .eq("chapter_slug", chapterSlug)
      .order("position")
      .order("question_id")
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw new Error(`books: chapter read failed — ${error.message}`);
    for (const r of data ?? []) {
      rows.push({
        questionId: r.question_id,
        sectionKey: r.section_key as BookSectionKey,
        position: r.position,
        excluded: r.excluded,
      });
    }
    if (!data || data.length < PAGE_SIZE) break;
  }
  return rows;
}

/**
 * The chapter's sets, per section, with live positions — the shape the pure
 * planners take. Rebuilt from the SAME functions the reader uses, so a set key
 * the browser sent is guaranteed to mean the same thing here.
 */
async function positionedSets(
  client: SupabaseClient,
  book: BookDefinition,
  chapter: BookChapter,
  rows: Row[]
): Promise<Map<BookSectionKey, PositionedSet[]>> {
  const meta = await loadBookMeta(client, book, { chapterName: chapter.name });
  const metaById = new Map<string, SetMeta>(
    meta.map((m) => [m.id, { setId: m.setId, year: m.pyqYear, sitting: sittingOrdinal(m) }])
  );
  const positionById = new Map(rows.map((r) => [r.questionId, r.position]));
  const sections = buildStoredSections(rows, metaById);

  const out = new Map<BookSectionKey, PositionedSet[]>();
  for (const section of sections) {
    out.set(
      section.key,
      section.sets.map((set) => ({
        key: set.key,
        items: set.questionIds.map((questionId) => ({
          questionId,
          position: positionById.get(questionId) ?? 0,
        })),
      }))
    );
  }
  return out;
}

/** Apply a batch of position/section updates, one row at a time. */
async function applyMoves(
  client: SupabaseClient,
  bookId: string,
  moves: { questionId: string; position: number; sectionKey?: BookSectionKey }[]
): Promise<void> {
  for (const move of moves) {
    const patch: Record<string, unknown> = { position: move.position };
    if (move.sectionKey) patch.section_key = move.sectionKey;
    const { error } = await client
      .from("book_questions")
      .update(patch)
      .eq("book_id", bookId)
      .eq("question_id", move.questionId);
    if (error) throw new Error(`books: move failed — ${error.message}`);
  }
}

/** Curate a question in or out of the book. The row stays either way. */
export async function setQuestionExcluded(
  client: SupabaseClient,
  book: BookDefinition,
  questionId: string,
  excluded: boolean
): Promise<void> {
  const bookId = await bookIdOf(client, book);
  const { error } = await client
    .from("book_questions")
    .update({ excluded })
    .eq("book_id", bookId)
    .eq("question_id", questionId);
  if (error) throw new Error(`books: exclude failed — ${error.message}`);
}

/**
 * Move a whole set one step up or down within its section.
 *
 * Returns false when the move is not possible (already at the end, or the set
 * key no longer resolves) so the caller can report it rather than silently
 * doing nothing.
 */
export async function moveSet(
  client: SupabaseClient,
  book: BookDefinition,
  chapter: BookChapter,
  sectionKey: BookSectionKey,
  setKey: string,
  direction: "up" | "down"
): Promise<boolean> {
  const bookId = await bookIdOf(client, book);
  const rows = await chapterRows(client, bookId, chapter.slug);
  const bySection = await positionedSets(client, book, chapter, rows);
  const plan = planSetMove(bySection.get(sectionKey) ?? [], setKey, direction);
  if (!plan) return false;
  await applyMoves(client, bookId, plan);
  return true;
}

/** Move a whole set into the chapter's other half, appended at its end. */
export async function moveSetToSection(
  client: SupabaseClient,
  book: BookDefinition,
  chapter: BookChapter,
  fromSection: BookSectionKey,
  setKey: string,
  toSection: BookSectionKey
): Promise<boolean> {
  if (fromSection === toSection) return false;
  const bookId = await bookIdOf(client, book);
  const rows = await chapterRows(client, bookId, chapter.slug);
  const bySection = await positionedSets(client, book, chapter, rows);
  const plan = planSetToSection(
    bySection.get(fromSection) ?? [],
    setKey,
    toSection,
    bySection.get(toSection) ?? []
  );
  if (!plan) return false;
  await applyMoves(client, bookId, plan);
  return true;
}
