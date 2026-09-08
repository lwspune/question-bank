/**
 * Data layer for the vocab book.
 *
 * NO `server-only` GUARD, deliberately — matching src/lib/books/query.ts. These
 * loaders are driven by `scripts/vocab/render-print.tsx`, which runs under plain
 * tsx where `server-only` does not resolve at all. The routes are the boundary
 * (superadmin-gated, service-role), not this module; adding the guard would buy
 * nothing and cost the only headless proof that the page renders.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { CADET_VOCAB, vocabBook, type VocabBookDefinition, type VocabChapter, type VocabPartKey } from "./registry";

export type VocabEntry = {
  id: string;
  word: string;
  meaning: string;
  sentence: string | null;
  /** NULL means the sentence was AUTHORED, not taken from a paper. */
  sentenceSource: string | null;
  synonyms: string[];
  antonyms: string[];
  exams: string[];
  timesAsked: number;
  excluded: boolean;
  note: string | null;
  part: VocabPartKey;
};

export type VocabChapterView = {
  book: VocabBookDefinition;
  chapter: VocabChapter;
  entries: VocabEntry[];
  /** Printed count — excludes curated-out rows. */
  printed: number;
};

const SELECT =
  "id,word,meaning,sentence,sentence_source,synonyms,antonyms,exams,times_asked,excluded,note,part";

function toEntry(r: any): VocabEntry {
  return {
    id: r.id,
    word: r.word,
    meaning: r.meaning,
    sentence: r.sentence,
    sentenceSource: r.sentence_source,
    synonyms: r.synonyms ?? [],
    antonyms: r.antonyms ?? [],
    exams: r.exams ?? [],
    timesAsked: r.times_asked ?? 0,
    excluded: r.excluded,
    note: r.note,
    part: r.part,
  };
}

/**
 * One chapter, in book order.
 *
 * EXCLUDED ROWS ARE FETCHED, not filtered in SQL. The on-screen editor shows
 * them struck through so a curation decision stays visible and reversible; only
 * the PRINT view drops them. Filtering here would make the decision invisible
 * to the surface that has to undo it — the same call `/books` makes.
 */
export async function loadVocabChapter(
  client: SupabaseClient,
  bookSlug: string,
  chapterSlug: string
): Promise<VocabChapterView | null> {
  const book = vocabBook(bookSlug);
  if (!book) return null;
  const chapter = book.chapters.find((c) => c.slug === chapterSlug);
  if (!chapter) return null;

  const { data, error } = await client
    .from("vocab_entries")
    .select(SELECT)
    .eq("book_slug", bookSlug)
    .eq("chapter_slug", chapterSlug)
    .order("position");
  if (error) throw new Error(`vocab_entries: ${error.message}`);

  const entries = (data ?? []).map(toEntry);
  return { book, chapter, entries, printed: entries.filter((e) => !e.excluded).length };
}

export type VocabOverview = {
  book: VocabBookDefinition;
  /** chapter slug -> entries authored so far. */
  counts: Map<string, number>;
  total: number;
};

export async function loadVocabOverview(
  client: SupabaseClient,
  bookSlug = CADET_VOCAB.slug
): Promise<VocabOverview | null> {
  const book = vocabBook(bookSlug);
  if (!book) return null;

  // Counted per chapter rather than pulling every row: the finished book is
  // ~3,600 entries, which is past the PostgREST 1000-row cap this project has
  // been bitten by five times.
  const counts = new Map<string, number>();
  let total = 0;
  for (const c of book.chapters) {
    const { count, error } = await client
      .from("vocab_entries")
      .select("id", { count: "exact", head: true })
      .eq("book_slug", bookSlug)
      .eq("chapter_slug", c.slug)
      .eq("excluded", false);
    if (error) throw new Error(`vocab_entries count: ${error.message}`);
    counts.set(c.slug, count ?? 0);
    total += count ?? 0;
  }
  return { book, counts, total };
}
