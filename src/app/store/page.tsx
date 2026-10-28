import Link from "next/link";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { listStoreEbooks, type StoreEbook } from "@/lib/ebooks/query";
import { formatRupees } from "@/lib/billing/plans";
import { KIND_LABEL } from "@/lib/ebooks/theme";
import { storeShelves } from "@/lib/ebooks/shelves";
import BookCover from "./_components/BookCover";

/**
 * The book store (2026-10-20): books sold one at a time as PDFs, apart from the
 * Premium Pass. One shelf per exam (2026-10-26, lib/ebooks/shelves), with jump
 * chips to each, every book shown by its cover under its subject. The
 * catalogue is the `ebooks` table (active rows only); an hour's cache.
 */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ebooks: formula, notes, PYQ and solved board papers to download",
  description:
    "Formula, notes and chapter-wise previous year question (PYQ) ebooks, and solved past board papers, with full solutions, as PDFs to download. Pay once, keep it.",
  alternates: { canonical: "/store" },
};

const KIND_LINE: Record<StoreEbook["kind"], string> = {
  formula: "Formulas, tables and traps",
  notes: "Every chapter taught",
  pyq: "Previous year questions, solved",
  papers: "Past board papers, solved",
  repeats: "Questions the board asks again",
  chapterwise: "Every board question, by chapter and marks",
  textbook: "Every textbook exercise, solved",
};

const shelfId = (key: string) => `shelf-${key}`;

export default async function StorePage() {
  const books = await listStoreEbooks(createSupabaseAnonClient());
  const shelves = storeShelves(books);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <header className="hero-soft rounded-2xl px-5 py-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Ebooks</h1>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Formula, notes, PYQ and solved board paper ebooks to download.
          </p>
        </header>

        {books.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">The first ebooks are on their way. Check back soon.</p>
        ) : (
          <>
            {shelves.length > 1 ? (
              <nav aria-label="Jump to an exam" className="-mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
                  {shelves.map((s) => (
                    <li key={s.key}>
                      <a
                        href={`#${shelfId(s.key)}`}
                        className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-card px-3 py-1.5 text-sm font-medium hover:border-brand-accent hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {s.short}
                        <span className="text-xs text-muted-foreground">{s.books.length}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
            {shelves.map((s) => (
              <section key={s.key} id={shelfId(s.key)} className="mt-10 scroll-mt-20" aria-labelledby={`${shelfId(s.key)}-h`}>
                <h2 id={`${shelfId(s.key)}-h`} className="section-title text-lg font-semibold">
                  {s.label}
                </h2>
                <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
                  {s.books.map(({ book, subject }) => (
                    <li key={book.slug}>
                      <Link
                        href={`/store/${book.slug}`}
                        className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <div className="transition-transform group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                          <BookCover
                            kind={book.kind}
                            subject={subject}
                            over={s.key === "more" ? undefined : s.label}
                            stats={book.stats}
                            namePlate={book.namePlate}
                          />
                        </div>
                        <div className="mt-3">
                          <span className="block text-sm font-semibold">{subject}</span>
                          <span className="block text-xs text-muted-foreground">
                            {KIND_LABEL[book.kind]} · {KIND_LINE[book.kind]}
                          </span>
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
            ))}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
