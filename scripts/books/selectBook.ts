/**
 * `--book=<slug>` selection, shared by every books script.
 *
 * These scripts each hardcoded `NDA_CDS_ENGLISH`, which was correct while there
 * was one book and silently wrong the moment there were two — `smoke.ts` would
 * report the English book as healthy while the MHT-CET book was the broken one.
 *
 * An unknown slug EXITS rather than falling back to the default: falling back
 * would print a clean report for a book nobody asked about, under a heading
 * naming the one they did. Same call `scripts/syllabus/search_corpus.py` makes
 * for an unknown --corpus.
 */
import { BOOKS, getBookBySlug, type BookDefinition } from "../../src/lib/books/registry";

export function selectBook(argv: string[] = process.argv): BookDefinition {
  const slug = argv.find((a) => a.startsWith("--book="))?.slice("--book=".length);
  if (!slug) return BOOKS[0];
  const book = getBookBySlug(slug);
  if (!book) {
    const known = BOOKS.map((b) => b.slug).join(", ");
    console.error(`Unknown --book="${slug}". Known books: ${known}`);
    process.exit(1);
  }
  return book;
}
