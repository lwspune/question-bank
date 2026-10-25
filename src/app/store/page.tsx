import Link from "next/link";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { listStoreEbooks, type StoreEbook } from "@/lib/ebooks/query";
import { formatRupees } from "@/lib/billing/plans";
import { KIND_LABEL } from "@/lib/ebooks/theme";
import BookCover, { subjectOf } from "./_components/BookCover";

/**
 * The book store (2026-10-20): three kinds of book per subject, sold one at a
 * time as PDFs, apart from the Premium Pass. Grouped by subject, each book
 * shown by its cover. The catalogue is the `ebooks` table (active rows only);
 * an hour's cache.
 */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ebooks: formula, notes and PYQ ebooks to download",
  description:
    "Formula, notes and chapter-wise previous year question (PYQ) ebooks with full solutions, as PDFs to download. Pay once, keep it.",
  alternates: { canonical: "/store" },
};

const KIND_LINE: Record<StoreEbook["kind"], string> = {
  formula: "Formulas, tables and traps",
  notes: "Every chapter taught",
  pyq: "Previous year questions, solved",
  papers: "Past board papers, solved",
};

const idOf = (subject: string) => `s-${subject.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export default async function StorePage() {
  const books = await listStoreEbooks(createSupabaseAnonClient());
  const subjects = Array.from(new Set(books.map((b) => subjectOf(b.title))));

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <header className="hero-soft rounded-2xl px-5 py-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Ebooks</h1>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Formula, notes and previous year question (PYQ) ebooks to download.
          </p>
        </header>

        {books.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">The first ebooks are on their way. Check back soon.</p>
        ) : (
          subjects.map((subject) => (
            <section key={subject} className="mt-10" aria-labelledby={idOf(subject)}>
              <h2 id={idOf(subject)} className="section-title text-lg font-semibold">
                {subject}
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
                {books
                  .filter((b) => subjectOf(b.title) === subject)
                  .map((book) => (
                    <li key={book.slug}>
                      <Link
                        href={`/store/${book.slug}`}
                        className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <div className="transition-transform group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                          <BookCover kind={book.kind} subject={subject} stats={book.stats} />
                        </div>
                        <div className="mt-3">
                          <span className="block text-sm font-semibold">{KIND_LABEL[book.kind]}</span>
                          <span className="block text-xs text-muted-foreground">{KIND_LINE[book.kind]}</span>
                          <span className="mt-1 flex items-baseline gap-2 text-sm">
                            <span className="font-semibold">{formatRupees(book.pricePaise)}</span>
                            {book.pageCount ? <span className="text-xs text-muted-foreground">{book.pageCount} pages</span> : null}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}
