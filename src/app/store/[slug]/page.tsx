import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getStoreEbook } from "@/lib/ebooks/query";
import { formatRupees } from "@/lib/billing/plans";
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
  return {
    title: book.title,
    description: book.subtitle,
    alternates: { canonical: `/store/${book.slug}` },
  };
}

export default async function StoreBookPage({ params }: { params: { slug: string } }) {
  const book = await getStoreEbook(createSupabaseAnonClient(), params.slug);
  if (!book) notFound();

  const stats = [
    book.questionCount ? { value: book.questionCount.toLocaleString("en-IN"), label: "past questions" } : null,
    book.contents.length ? { value: String(book.contents.length), label: "chapters" } : null,
    book.pageCount ? { value: String(book.pageCount), label: "pages" } : null,
  ].filter((s): s is { value: string; label: string } => s !== null);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Breadcrumbs items={[{ href: "/store", label: "Books" }, { label: book.title }]} />

        {/* One buy box: after the title on a phone, in the side column on a laptop. */}
        <div className="mt-6 grid lg:grid-cols-[1fr_20rem] lg:gap-x-8">
            <header className="min-w-0 lg:col-start-1">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{book.title}</h1>
              <p className="mt-2 font-serif text-base leading-relaxed text-muted-foreground">{book.subtitle}</p>
              {stats.length > 0 ? (
                <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd>
                        <span className="stat-gradient block text-2xl font-bold">{s.value}</span>
                        <span className="text-xs text-muted-foreground">{s.label}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </header>

            <aside className="mt-6 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <div className="lg:sticky lg:top-20">
                <EbookBuyBox slug={book.slug} title={book.title} listPrice={formatRupees(book.pricePaise)} hasSample={book.hasSample} />
              </div>
            </aside>

            <section className="mt-8 min-w-0 lg:col-start-1" aria-labelledby="inside">
              <h2 id="inside" className="section-title text-lg font-semibold">
                What is inside
              </h2>
              <p className="mt-2 font-serif text-sm leading-relaxed">{book.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  "Formulas, tables and common traps at the start of every chapter",
                  "Every past question, grouped by topic, oldest sitting first",
                  "A worked solution to every question, at the end of its chapter",
                  "One PDF that opens on any phone or laptop, yours to keep",
                ].map((line) => (
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
                        <th scope="col">Questions</th>
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
                          <td className="whitespace-nowrap px-2 py-2 text-right text-muted-foreground">{c.questions} q</td>
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
