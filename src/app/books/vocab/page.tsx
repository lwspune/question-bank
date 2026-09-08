/**
 * /books/vocab — the Cadet Vocabulary book's contents page.
 *
 * A STATIC SEGMENT, deliberately, rather than another entry in `/books/[bookSlug]`.
 * That route serves books which are a VIEW OVER THE BANK — they store no content
 * and their unit is a question. This book's unit is a WORD, most of its content
 * is authored, and it lives in its own table with its own loaders. Sharing the
 * dynamic route would mean one page branching on which kind of book it had, and
 * the two would drift. Next gives a static segment priority over a dynamic one,
 * so `/books/vocab` lands here and `/books/nda-cds-english` still lands there.
 *
 * Counts are read live per chapter, so the contents cannot claim a chapter is
 * finished when it is not.
 */
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight, Printer } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { CADET_VOCAB, VOCAB_SECTIONS } from "@/lib/vocab/registry";
import { loadVocabOverview } from "@/lib/vocab/query";

export const dynamic = "force-dynamic";

export default async function VocabBookPage() {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const overview = await loadVocabOverview(createSupabaseAdminClient());
  if (!overview) redirect("/books");
  const { counts, total } = overview;

  const chapterRow = (slug: string, label: string, expected: number) => {
    const have = counts.get(slug) ?? 0;
    return (
      <li key={slug}>
        <Link
          href={`/books/vocab/${slug}`}
          className="flex items-center gap-3 rounded-md border px-3 py-2 text-sm transition-colors hover:border-brand-accent hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="w-16 shrink-0 font-medium">{label}</span>
          <span className="text-muted-foreground">
            {have.toLocaleString()}
            {have !== expected ? ` / ${expected.toLocaleString()}` : ""} entries
          </span>
          <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        </Link>
      </li>
    );
  };

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-8 px-6 py-8">
        <nav className="text-sm text-muted-foreground">
          <Link href="/books" className="hover:underline">
            Books
          </Link>
        </nav>

        <header>
          <h1 className="text-2xl font-semibold tracking-tight">{CADET_VOCAB.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{CADET_VOCAB.subtitle}</p>
          <p className="mt-2 text-sm">
            <span className="font-medium">{total.toLocaleString()}</span>{" "}
            <span className="text-muted-foreground">
              entries across {CADET_VOCAB.chapters.length} chapters
            </span>
          </p>
          <Link
            href="/books/vocab/index/print"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Printer className="h-3.5 w-3.5" aria-hidden="true" />
            Print the A–Z index
          </Link>
        </header>

        {CADET_VOCAB.parts.map((part) => {
          const chapters = CADET_VOCAB.chapters.filter((c) => c.part === part.key);
          if (!chapters.length) return null;
          const partTotal = chapters.reduce((n, c) => n + (counts.get(c.slug) ?? 0), 0);

          /**
           * A SECTIONED PART LISTS ITS OWN SECTIONS IN STUDY ORDER, because on
           * this page the order IS the instruction — a teacher reads it to tell
           * a batch what to work through first. Sections are filtered by part
           * because they are not one axis: Part 2 splits by exam and Part 4 by
           * provenance.
           */
          const sections = VOCAB_SECTIONS.filter((s) => s.part === part.key);
          const groups = sections.length
            ? sections.map((s) => ({
                key: s.key as string,
                title: s.title,
                blurb: s.blurb,
                rows: chapters.filter((c) => c.section === s.key),
              }))
            : [{ key: part.key, title: "", blurb: "", rows: chapters }];

          return (
            <section key={part.key} className="space-y-3">
              <div>
                <h2 className="text-lg font-semibold">
                  {part.ordinal} — {part.title}{" "}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    {partTotal.toLocaleString()}
                  </span>
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">{part.blurb}</p>
              </div>

              {groups.map((g) => (
                <div key={g.key} className="space-y-2">
                  {g.title ? (
                    <div className="pt-1">
                      <h3 className="text-sm font-medium">{g.title}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{g.blurb}</p>
                    </div>
                  ) : null}
                  <ul className="space-y-1.5">
                    {g.rows.map((c) => chapterRow(c.slug, c.label, c.expected))}
                  </ul>
                </div>
              ))}
            </section>
          );
        })}
      </main>
    </>
  );
}
