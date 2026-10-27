import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getStoreEbook, type StoreEbook } from "@/lib/ebooks/query";
import { formatRupees } from "@/lib/billing/plans";
import { KIND_LABEL, PREMIUM_KINDS } from "@/lib/ebooks/theme";
import BookCover, { subjectOf } from "../_components/BookCover";
import { SHELVES, shelfOf } from "@/lib/ebooks/shelves";
import EbookBuyBox from "./EbookBuyBox";

/**
 * One book's page. The page is the same cached copy for everyone (an hour);
 * the buy box asks the server who is looking (owns it? pass holder?) after it
 * loads. Built on first visit, never at build time, like the past-paper pages.
 */
export const revalidate = 3600;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const book = await getStoreEbook(createSupabaseAnonClient(), params.slug);
  if (!book) return { title: "Book not found", robots: { index: false } };
  return { title: book.title, description: book.subtitle, alternates: { canonical: `/store/${book.slug}` } };
}

const INSIDE: Record<StoreEbook["kind"], string[]> = {
  formula: [
    "Every formula of every chapter, topic by topic",
    "What each symbol in a formula means",
    "The reference tables you need to remember",
    "The common traps, each one explained",
  ],
  notes: [
    "Each topic taught from the start, in plain words",
    "Definitions, formulas and a worked example for every idea",
    "A problem to try in each lesson, answers at the end of the chapter",
    "The traps that cost marks, each one explained",
  ],
  pyq: [
    "Every previous year question, grouped by topic, oldest sitting first",
    "The sitting each question was asked in",
    "An answer key and a worked solution to every question",
    "Questions asked more than once printed once, with every sitting listed",
  ],
  papers: [
    "Each board paper as it was set: its sections, marks and OR choices",
    "Newest paper first, so you can sit the latest one against the clock",
    "A worked solution to every question, under its printed number",
    "Model answers for every written question",
  ],
  repeats: [
    "Every question the board has asked more than once, most-asked first",
    "Then the types of question it keeps coming back to",
    "When each was asked, on a line over the question",
    "A worked solution to every question at the end of its chapter",
  ],
  chapterwise: [
    "Every board question, chapter by chapter in textbook order",
    "Grouped by marks: 1-mark questions, then 2, 3 and more, then case studies",
    "When each was asked, on a line over the question",
    "A worked solution to every question at the end of its chapter",
  ],
};

export default async function StoreBookPage({ params }: { params: { slug: string } }) {
  const book = await getStoreEbook(createSupabaseAnonClient(), params.slug);
  if (!book) notFound();
  // A Solved Papers book: the board line over the subject, as its cover prints it.
  const shelf = shelfOf(book);
  const board = PREMIUM_KINDS.has(book.kind) ? SHELVES.find((s) => s.key === shelf.shelf)?.label : undefined;
  const subject = board ? shelf.subject : subjectOf(book.title);
  const heading = board ? `${board} ${subject}` : subject;
  const stats = book.stats.length
    ? book.stats
    : book.pageCount
      ? [{ value: String(book.pageCount), label: "pages" }]
      : [];

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Breadcrumbs items={[{ href: "/store", label: "Ebooks" }, { label: book.title }]} />

        {/* One buy box: after the title on a phone, in the side column on a laptop. */}
        <div className="mt-6 grid lg:grid-cols-[1fr_20rem] lg:gap-x-8">
          <header className="flex min-w-0 gap-5 lg:col-start-1">
            <div className="w-28 shrink-0 sm:w-40">
              <BookCover kind={book.kind} subject={subject} over={board} size="sm" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">{KIND_LABEL[book.kind]}</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-4xl">{heading}</h1>
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">{book.subtitle}</p>
              {book.pageCount ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  {book.pageCount} pages · PDF · {formatRupees(book.pricePaise)}
                </p>
              ) : null}
            </div>
          </header>

          <aside className="mt-6 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:mt-0">
            <div className="lg:sticky lg:top-20">
              <EbookBuyBox slug={book.slug} title={book.title} listPrice={formatRupees(book.pricePaise)} hasSample={book.hasSample} />
            </div>
          </aside>

          {stats.length > 0 ? (
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-start-1">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border bg-card px-4 py-3">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="stat-gradient block text-2xl font-bold">{s.value}</span>
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <section className="mt-8 min-w-0 lg:col-start-1" aria-labelledby="inside">
            <h2 id="inside" className="section-title text-lg font-semibold">
              What is inside
            </h2>
            <p className="mt-2 font-serif text-sm leading-relaxed">{book.description}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {INSIDE[book.kind].map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          {book.contents.length > 0 ? (
            <section className="mt-8 min-w-0 lg:col-start-1" aria-labelledby="contents">
              <h2 id="contents" className="section-title text-lg font-semibold">
                Contents
              </h2>
              <div className="mt-3 overflow-hidden rounded-xl border bg-card">
                <table className="w-full text-sm">
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Chapter</th>
                      <th scope="col">Inside</th>
                      <th scope="col">Page</th>
                    </tr>
                  </thead>
                  <tbody>
                    {book.contents.map((c) => (
                      <tr key={c.number} className="border-b last:border-b-0">
                        <td className="py-2 pl-4 pr-2">
                          <span className="mr-2 text-muted-foreground">{c.number}.</span>
                          {c.name}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-right text-muted-foreground">{c.detail}</td>
                        <td className="whitespace-nowrap py-2 pl-2 pr-4 text-right text-muted-foreground">p. {c.page}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
