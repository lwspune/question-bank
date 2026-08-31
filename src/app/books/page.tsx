/**
 * /books — the superadmin book shelf.
 *
 * A "book" here is a curated view over questions that already exist in the
 * bank: the NDA/CDS English PYQ master assembles both exams' English past-year
 * questions chapter by chapter. Nothing on this surface is student-facing, and
 * nothing here is new content.
 */
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookMarked } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { BOOKS, bookExams } from "@/lib/books/registry";

export const dynamic = "force-dynamic";

export default async function BooksIndexPage() {
  // Platform staff only. This is the boundary; the nav tab is only chrome.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Books</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Assembled PYQ books, for review before export. A book is a view over
            the live bank — it stores no content of its own, so a fix made to a
            question anywhere shows up here.
          </p>
        </header>

        <ul className="space-y-3">
          {BOOKS.map((book) => (
            <li key={book.slug}>
              <Link
                href={`/books/${book.slug}`}
                className="flex gap-4 rounded-lg border p-4 transition-colors hover:border-brand-accent hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <BookMarked
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent"
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block font-medium">{book.title}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {book.subtitle}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {book.chapters.length} chapters · {bookExams(book).join(" + ")}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
