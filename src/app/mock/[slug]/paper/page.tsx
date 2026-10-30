import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClipboardCheck } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getMockBySlug, loadReviewQuestions } from "@/lib/mocks/query";
import { mockDownloadHref } from "@/lib/mocks/catalogue";
import { markingCopy } from "@/lib/mocks/marking";
import { getExamByName } from "@/lib/exam/examContext";
import {
  buildPaperSections,
  isReadablePaper,
  paperPageDescription,
  SOLVED_SHARE,
  paperPageHref,
  paperPageTitle,
  plainPaperTitle,
} from "@/lib/mocks/paperPage";
import PaperDownload from "../../_components/PaperDownload";
import MockPaperReader from "./MockPaperReader";
import { canonicalFor } from "@/lib/sites/intl";

type Params = { slug: string };

/**
 * One past paper to READ (2026-10-15): the whole paper in the order it was
 * set, answers behind a tap. /mock/<slug> stays the start page of the timed
 * mock. See lib/mocks/paperPage.ts for why this page exists.
 *
 * Rendered on first visit and cached for a day, never built ahead: there are
 * ~300 past papers and a build reads production (the 2026-10-04 and 10-09
 * outages). No cookies or session here, so every visitor and crawler gets the
 * cached copy.
 */
export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return [];
}

/** One read per request, shared by the metadata and the page. */
const load = cache(async (slug: string) => {
  const db = createSupabaseAnonClient();
  const mock = await getMockBySlug(db, slug);
  if (!mock || !isReadablePaper(mock)) return null;
  const content = await loadReviewQuestions(db, mock.questions);
  const { sections, missing, solved } = buildPaperSections(mock.questions, content, mock.sections);
  if (sections.length === 0) return null;
  const shown = sections.reduce((n, s) => n + s.items.length, 0);
  // Promise worked solutions only where this paper has them (MPSC, IPMAT and
  // JIPMAT papers carry answers alone).
  const withSolutions = solved / shown >= SOLVED_SHARE;
  return { mock, sections, missing, shown, withSolutions };
});

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await load(params.slug);
  if (!data) return { title: "Question paper not found" };
  const { mock, withSolutions } = data;
  return {
    title: { absolute: paperPageTitle(mock.title) },
    description: paperPageDescription(mock, withSolutions),
    alternates: { canonical: canonicalFor(paperPageHref(params.slug)) },
  };
}

export default async function MockPaperPage({ params }: { params: Params }) {
  const data = await load(params.slug);
  if (!data) notFound();
  const { mock, sections, missing, shown, withSolutions } = data;

  const exam = getExamByName(mock.examName);
  const name = plainPaperTitle(mock.title);
  const marking = markingCopy(mock.marking);
  const bilingual = exam?.bilingual === true;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          className="mb-4"
          items={[
            { href: "/mock", label: "Mocks" },
            ...(exam
              ? [
                  { href: `/mock/exam/${exam.slug}`, label: exam.displayName },
                  { href: mockDownloadHref(exam.slug), label: "Past papers" },
                ]
              : []),
            { label: name },
          ]}
        />
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{name} question paper</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {mock.totalQuestions} questions · {mock.totalMarks} marks · {Math.round(mock.durationSecs / 60)} minutes ·{" "}
            {marking.correctValue} per correct answer, {marking.hasPenalty ? `${marking.wrongValue} per wrong one` : "no negative marking"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Every question in the order it was set, free to read. Tap an option to check it, or open the answer
            {withSolutions ? " and worked solution" : ""}. Answers open as you go; sign in free to keep opening them.
          </p>
          {missing > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              {shown} of {mock.totalQuestions} questions are shown. The other {missing} are being checked and will be back
              soon.
            </p>
          )}
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="brand" className="w-full sm:w-auto">
              <Link href={`/mock/${mock.slug}`}>
                <ClipboardCheck className="h-4 w-4" aria-hidden />
                Sit it as a timed mock
              </Link>
            </Button>
            <PaperDownload slug={mock.slug} paperTitle={mock.title} bilingual={bilingual} variant="inline" />
          </div>
        </header>

        <MockPaperReader
          sections={sections}
          examName={mock.examName}
          paperName={name}
          supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
        />

        <div className="mt-10 rounded-lg border bg-card p-5 text-center">
          <p className="text-sm text-muted-foreground">
            Want the real exam feel? Sit this paper with a {Math.round(mock.durationSecs / 60)}-minute timer and get your
            score straight away.
          </p>
          <Button asChild variant="brand" className="mt-3">
            <Link href={`/mock/${mock.slug}`}>Sit it as a timed mock</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
