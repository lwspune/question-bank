/**
 * The store's shelves (2026-10-26): one per exam, in a fixed order, each book
 * with its subject. PURE. Spec: tests/ebook-shelves.test.ts.
 *
 * The shelf comes from the slug (lib/ebooks/paperBooks for the board books),
 * never from parsing a title, and a book the catalog does not know goes on a
 * last "More books" shelf, so no book on sale can drop off the page. This file
 * does not import lib/ebooks/catalog, which loads the whole notes library.
 */
import { CHAPTERWISE_EBOOKS, PAPERS_EBOOKS, REPEATS_EBOOKS } from "./paperBooks";

export const SHELVES = [
  { key: "mht-cet", label: "MHT-CET", short: "MHT-CET" },
  { key: "mh-hsc-12", label: "Maharashtra HSC Class 12", short: "HSC 12" },
  { key: "mh-ssc-10", label: "Maharashtra SSC Class 10", short: "SSC 10" },
  { key: "cbse-12", label: "CBSE Class 12", short: "CBSE 12" },
  { key: "cbse-10", label: "CBSE Class 10", short: "CBSE 10" },
  { key: "more", label: "More books", short: "More" },
] as const;

export type ShelfKey = (typeof SHELVES)[number]["key"];
export type Shelf<B> = { key: ShelfKey; label: string; short: string; books: { book: B; subject: string }[] };

const BOARD_BOOK = new Map([...PAPERS_EBOOKS, ...REPEATS_EBOOKS, ...CHAPTERWISE_EBOOKS].map((b) => [b.slug, b]));

/** A book's shelf and the subject it is shown under. */
export function shelfOf(book: { slug: string; title: string }): { shelf: ShelfKey; subject: string } {
  const board = BOARD_BOOK.get(book.slug);
  if (board) return { shelf: board.examSlug as ShelfKey, subject: board.subjectTitle };
  if (book.slug.startsWith("mht-cet-")) {
    return { shelf: "mht-cet", subject: book.title.replace(/^MHT-CET\s+/, "").replace(/\s+(Formula|Notes|PYQ) Book$/i, "") };
  }
  return { shelf: "more", subject: book.title };
}

/** Books (in store order) as shelves: empty ones dropped, a subject's books side by side. */
export function storeShelves<B extends { slug: string; title: string }>(books: readonly B[]): Shelf<B>[] {
  return SHELVES.flatMap((s) => {
    const onShelf = books.map((book) => ({ book, ...shelfOf(book) })).filter((b) => b.shelf === s.key);
    if (onShelf.length === 0) return [];
    const subjects = Array.from(new Set(onShelf.map((b) => b.subject)));
    const ordered = subjects.flatMap((subject) => onShelf.filter((b) => b.subject === subject));
    return [{ key: s.key, label: s.label, short: s.short, books: ordered.map(({ book, subject }) => ({ book, subject })) }];
  });
}
