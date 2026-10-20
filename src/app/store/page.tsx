import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { listStoreEbooks } from "@/lib/ebooks/query";
import { formatRupees } from "@/lib/billing/plans";

/**
 * The book store (2026-10-20): whole-subject PYQ books, sold one at a time as
 * PDFs, apart from the Premium Pass. An experiment for printed books, so it
 * stays simple: one card per book, the book's own page does the selling.
 * The catalogue is the `ebooks` table (active rows only); an hour's cache.
 */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Books: complete PYQ books with solutions",
  description:
    "Whole-subject past question books as PDFs: formulas, then every past question chapter by chapter, with full solutions. Pay once, keep it.",
  alternates: { canonical: "/store" },
};

export default async function StorePage() {
  const books = await listStoreEbooks(createSupabaseAnonClient());

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="hero-soft rounded-2xl px-5 py-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Books</h1>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Complete books you keep: the formulas, then every past question chapter by chapter, with a full solution to
            each. Pay once and download the PDF.
          </p>
        </header>

        {books.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">The first book is on its way. Check back soon.</p>
        ) : (
          <ul className="mt-8 grid gap-4">
            {books.map((book) => (
              <li key={book.slug}>
                <Link
                  href={`/store/${book.slug}`}
                  className="group flex gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-brand-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="icon-tile flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-brand-accent" aria-hidden>
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-semibold leading-snug">{book.title}</span>
                    <span className="mt-1 block font-serif text-sm leading-relaxed text-muted-foreground">{book.subtitle}</span>
                    <span className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                      <span className="font-semibold">{formatRupees(book.pricePaise)}</span>
                      {book.questionCount ? (
                        <span className="text-muted-foreground">{book.questionCount.toLocaleString("en-IN")} questions</span>
                      ) : null}
                      {book.pageCount ? <span className="text-muted-foreground">{book.pageCount} pages</span> : null}
                      <span className="ml-auto inline-flex items-center gap-1 font-medium text-brand-accent">
                        See the book <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
