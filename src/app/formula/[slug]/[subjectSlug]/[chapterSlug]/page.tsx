/**
 * Chapter formula page: /formula/<exam>/<subject>/<chapter> (2026-10-10).
 *
 * Every formula of one /notes chapter with its symbol legend, every reference
 * table, and every trap with its explanation, grouped by subtopic in teaching
 * order, plus the one-page PDF download. Built from the notes registry alone:
 * no database read at build or at request, so these ~220 pages add no load.
 * The URL tail is the chapter's /questions tail (same slug rule, same names).
 *
 * The first segment is the parent folder's [slug] (Next allows one name per
 * level, and /formula/<identity-slug> lives there). Next pre-builds these
 * pages for the exam slugs the PARENT's generateStaticParams returns, which is
 * why the parent lists the exam hubs too. Pure core: lib/formula/chapterPages.
 */
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen, Sigma } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { Button } from "@/components/ui/button";
import FormulaBlock from "@/app/notes/_components/FormulaBlock";
import ReferenceTableBlock from "@/app/notes/_components/ReferenceTableBlock";
import TrapCallout from "@/app/notes/_components/TrapCallout";
import FormulaSheetDownload from "@/app/notes/_components/FormulaSheetDownload";
import { getNotesChapterBySlug } from "@/lib/notes/chapters";
import { formulaCountsLine } from "@/lib/notes/formulaSheetSummary";
import { formulaChapterTitle } from "@/lib/seo/pageTitles";
import {
  buildFormulaPageSections,
  findFormulaChapterPage,
  formulaChapterHref,
  formulaPageLead,
  formulaPageSiblings,
  listFormulaChapterPages,
} from "@/lib/formula/chapterPages";

const SITE_URL = "https://www.pyqvault.com";

export const revalidate = 86400;

type Params = { params: { slug: string; subjectSlug: string; chapterSlug: string } };

/**
 * Called once per parent [slug] when the parent pre-builds; returns this
 * exam's chapters. Without a parent value it returns every page whole, so a
 * change in how Next calls it still pre-builds rather than building nothing.
 */
export function generateStaticParams({ params }: { params: { slug?: string } }) {
  const slug = params?.slug;
  return listFormulaChapterPages()
    .filter((p) => !slug || p.examSlug === slug)
    .map((p) =>
      slug
        ? { subjectSlug: p.subjectSlug, chapterSlug: p.chapterSlug }
        : { slug: p.examSlug, subjectSlug: p.subjectSlug, chapterSlug: p.chapterSlug }
    );
}

export function generateMetadata({ params }: Params): Metadata {
  const page = findFormulaChapterPage(params.slug, params.subjectSlug, params.chapterSlug);
  if (!page) return { title: "Formulas not found" };
  const title = formulaChapterTitle({
    chapterName: page.chapterName,
    examDisplay: page.examDisplay,
    subjectName: page.subjectName,
  });
  const description = `${formulaPageLead(page)} Free to read, with a one-page PDF.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}${formulaChapterHref(page)}` },
    openGraph: { title, description, type: "website" },
  };
}

export default function ChapterFormulaPage({ params }: Params) {
  const page = findFormulaChapterPage(params.slug, params.subjectSlug, params.chapterSlug);
  if (!page) notFound();
  const chapter = getNotesChapterBySlug(page.subjectRoute, page.notesChapterSlug);
  if (!chapter) notFound();
  const sections = buildFormulaPageSections(chapter);
  const siblings = formulaPageSiblings(page);

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-4xl p-8">
        <Breadcrumbs
          items={[
            { href: "/formula", label: "Formulas" },
            { href: `/formula/${page.examSlug}`, label: page.examDisplay },
            { label: page.subjectName },
          ]}
        />

        <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-brand-accent">
          <Sigma className="h-3.5 w-3.5" aria-hidden />
          {page.examDisplay} {page.subjectName} · Formula sheet
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{page.chapterName} formulas</h1>
        <p className="mt-2 text-muted-foreground">{formulaPageLead(page)}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <FormulaSheetDownload
            subjectRoute={page.subjectRoute}
            chapterSlug={page.notesChapterSlug}
            chapterName={page.chapterName}
            summary={formulaCountsLine(page.counts)}
          />
          <Button asChild variant="outline" size="wrap">
            <Link href={page.notesHref}>
              <BookOpen className="mr-1.5 h-4 w-4 shrink-0" aria-hidden />
              Full notes with worked examples
            </Link>
          </Button>
        </div>

        {sections.length > 1 && (
          <nav aria-label="Subtopics on this page" className="mt-8 rounded-lg border bg-card p-4">
            <p className="text-sm font-medium">On this page</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
              {sections.map((s) => (
                <li key={s.subtopicSlug}>
                  <a
                    href={`#${s.subtopicSlug}`}
                    className="text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-10 space-y-12">
          {sections.map((s) => (
            <section key={s.subtopicSlug} id={s.subtopicSlug} aria-labelledby={`h-${s.subtopicSlug}`} className="scroll-mt-20">
              <h2 id={`h-${s.subtopicSlug}`} className="text-xl font-semibold tracking-tight">
                {s.title}
              </h2>
              <Link
                href={s.notesHref}
                className="mt-1 inline-block text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Learn this subtopic in the notes
              </Link>

              {s.formulas.length > 0 && (
                <div className="mt-4 space-y-4">
                  {s.formulas.map((f) => (
                    <div key={f.conceptSlug}>
                      {f.conceptName.toLowerCase() !== f.formula.label.toLowerCase() && (
                        <h3 className="mb-1.5 text-sm font-medium">{f.conceptName}</h3>
                      )}
                      <FormulaBlock formula={f.formula} />
                    </div>
                  ))}
                </div>
              )}

              {s.tables.length > 0 && (
                <div className="mt-6 space-y-5">
                  {s.tables.map((t) => (
                    <div key={t.conceptSlug}>
                      <h3 className="mb-2 text-sm font-medium">{t.conceptName}</h3>
                      <ReferenceTableBlock table={t.table} compact />
                    </div>
                  ))}
                </div>
              )}

              {s.traps.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium">Common traps</h3>
                  <div className="mt-2 space-y-3">
                    {s.traps.map((t, i) => (
                      <TrapCallout key={i} title={t.title} body={t.body} />
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {siblings.length > 0 && (
          <section className="mt-14" aria-labelledby="more-formulas">
            <h2 id="more-formulas" className="text-sm font-medium text-muted-foreground">
              More {page.examDisplay} {page.subjectName} formula sheets
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {siblings.map((p) => (
                <li key={p.chapterSlug}>
                  <Link
                    href={formulaChapterHref(p)}
                    className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {p.chapterName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
