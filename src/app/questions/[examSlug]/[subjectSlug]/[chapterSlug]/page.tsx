/**
 * Public per-chapter question landing page.
 *
 * The cacheable, indexable counterpart to `/browse`. Same questions, addressed
 * by path instead of query string — which is what lets Next cache it (a page
 * reading `searchParams` never can) and what gives Google a real page to rank
 * instead of a single `/browse` URL for the whole bank.
 *
 * Read-only by design: no filters, no download dialog, PUBLIC questions only.
 * Anything beyond that is one click away in the tool itself.
 */
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, ClipboardCheck, Compass } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import QuestionList from "@/app/browse/QuestionList";
import { getQuestionResources } from "@/lib/links/questionResources";
import { getExamBySlug } from "@/lib/exam/examContext";
import { questionsLandingTitle } from "@/lib/seo/pageTitles";
import {
  listChapterLandings,
  getChapterLanding,
  getSiblingLandings,
  loadLandingQuestions,
  loadLandingSubtopics,
  browseHrefFor,
  landingHref,
  LANDING_PAGE_SIZE,
  type ChapterLanding,
} from "@/lib/questions/landing";
import {
  landingLead,
  difficultyLine,
  subtopicsLine,
  updatedLine,
} from "@/lib/questions/landingSummary";
import { mockCta } from "@/lib/notes/keepGoing";
import { mockCtaCopy, withChapterTest } from "@/lib/mocks/chapterTests";
import { listChapterTests } from "@/lib/mocks/chapterTestsQuery";
import { examHomeHref } from "@/lib/exam/examHome";
import ChapterShareCard from "@/components/ChapterShareCard";
import VHello from "@/components/chat/VHello";
import NextStepCard from "@/components/question/NextStepCard";
import { pickHello, nextStepLinks, CARD_AFTER, type HelloInput } from "@/lib/growth/secondPage";
import Breadcrumbs from "@/components/nav/Breadcrumbs";

const SITE_URL = "https://www.pyqvault.com";

/** Rebuilt daily; new chapters appear without a deploy. */
export const revalidate = 86400;

/**
 * A SAFETY CEILING, not a selection: every eligible chapter is pre-built.
 *
 * This used to read `.slice(0, 40)` — "pre-build only the busiest chapters, the
 * rest render on first request and are then cached exactly the same way". That
 * reasoning priced the build and never priced the MISS, and the miss turned out
 * to be the expensive half.
 *
 * A page that was never built has no stale copy for ISR to serve, so the first
 * request is a true miss that pays the full render. Measured 2026-09-17 against
 * production: a cold landing page took 1.86-2.60 s, the same URL warm 0.23-0.27 s
 * (`X-Vercel-Cache: HIT`). Googlebot fetches ~4 HTML pages/day across this whole
 * site (Crawl stats: 1,173 requests over 51 days, 17.48% HTML), so it returns to
 * any given landing page months apart — far beyond `revalidate`. Essentially
 * every crawl of this route was therefore paying ~2.5 s, which suppresses crawl
 * rate, which lengthens the gap, which guarantees the next hit is cold too.
 *
 * The build cost the old cap was avoiding does not exist at this size. Measured
 * on the same machine, cold `.next` each time:
 *
 *      cap  40 -> 6m22s   (823 HTML on disk)
 *      cap 150 -> 3m01s   (933)
 *      cap 800 -> 3m51s   (1,413 — all 630 eligible chapters)
 *
 * Build time is dominated by compilation, not by these pages; 590 extra pages
 * cost nothing measurable and produced zero ECONNRESETs. Note the 40-cap run was
 * the SLOWEST of the three, so treat these as "the same, within noise" rather
 * than as a speed-up.
 *
 * The 800 is a ceiling against unbounded growth, not a ranking — 630 chapters
 * qualify today (>= MIN_QUESTIONS_FOR_LANDING). If the taxonomy ever approaches
 * it, raise it deliberately after re-measuring rather than letting it silently
 * truncate the tail again. The sort is kept only so the build order is
 * deterministic.
 */
export async function generateStaticParams() {
  try {
    const landings = await listChapterLandings();
    return [...landings]
      .sort((a, b) => b.questionCount - a.questionCount)
      .slice(0, 800)
      .map((l) => ({
        examSlug: l.examSlug,
        subjectSlug: l.subjectSlug,
        chapterSlug: l.chapterSlug,
      }));
    // A Supabase blip during a build must not fail the DEPLOY — pre-building is
    // an optimisation, not a correctness requirement. Returning nothing means
    // every page renders on first request instead. That is now a much worse
    // outcome than it was under the old 40-cap (see above), but it is still
    // strictly better than a failed deploy. Mirrors the guard on the sitemap's
    // DB read.
  } catch {
    return [];
  }
}

type Params = {
  params: { examSlug: string; subjectSlug: string; chapterSlug: string };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const landing = await getChapterLanding(
    params.examSlug,
    params.subjectSlug,
    params.chapterSlug
  );
  if (!landing) return { title: "Questions not found" };

  const title = questionsLandingTitle({
    chapterName: landing.chapterName,
    examDisplay: getExamBySlug(landing.examSlug)?.displayName ?? landing.examName,
    subjectName: landing.subjectName,
    practiceOnly: landing.practiceOnly,
  });
  // The same sentence the page opens with, so the <meta> tag and the first
  // screen state the same facts (count, papers, years).
  const description = `${landing.chapterName}: ${landingLead(landing)} Free to browse.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}${landingHref(landing)}` },
    openGraph: { title, description, type: "website" },
  };
}

function SiblingLinks({ siblings }: { siblings: ChapterLanding[] }) {
  if (siblings.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="text-sm font-medium text-muted-foreground">
        More chapters in this subject
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {siblings.map((s) => (
          <li key={s.chapterId}>
            <Link
              href={landingHref(s)}
              className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {s.chapterName}
              <span className="text-xs text-muted-foreground">
                {s.questionCount}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ChapterQuestionsPage({ params }: Params) {
  const landing = await getChapterLanding(
    params.examSlug,
    params.subjectSlug,
    params.chapterSlug
  );
  if (!landing) notFound();

  const [questions, siblings, subtopics, chapterTests] = await Promise.all([
    loadLandingQuestions(landing),
    getSiblingLandings(landing),
    loadLandingSubtopics(landing),
    listChapterTests(),
  ]);

  // The quotable header: every line is a fact the bank can back, and a line
  // the bank cannot back is null and simply not rendered.
  const headerLines = [
    difficultyLine(landing.profile),
    subtopicsLine(subtopics),
    updatedLine(landing.lastAdded),
  ].filter((s): s is string => s !== null);
  // The chapter's own test when it has one, else the exam's past papers.
  const mock = withChapterTest(
    landing.practiceOnly ? null : mockCta(landing.examName),
    chapterTests.get(landing.chapterId),
    landing.chapterName
  );

  // Reuse the same chapter→notes/guide mapping the /browse cards use, so a
  // rename stays a one-place fix rather than drifting between surfaces.
  const resources = getQuestionResources({
    examName: landing.examName,
    subjectName: landing.subjectName,
    chapterName: landing.chapterName,
    subtopicName: null,
  });

  // The "second page" nudges (growth registry "second-page"): V's one-time
  // hello and the card after the 5th question point at a page that is not
  // more of the same.
  const secondPage: HelloInput = {
    surface: "questions",
    chapterName: landing.chapterName,
    questionCount: landing.questionCount,
    mock,
    notesHref: resources.notes?.href ?? null,
    questionsHref: null,
    bankHref: browseHrefFor(landing),
  };

  const showing = Math.min(questions.rows.length, LANDING_PAGE_SIZE);
  const hasMore = questions.totalCount > showing;

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl p-8">
        <Breadcrumbs
          items={[
            { href: "/questions", label: "Questions" },
            { href: examHomeHref(landing.examSlug), label: landing.examName },
            { label: landing.subjectName },
          ]}
        />

        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          {landing.chapterName}
        </h1>
        <p className="mt-2 text-muted-foreground">{landingLead(landing)}</p>
        {headerLines.length > 0 && (
          <ul className="mt-2 space-y-0.5 text-sm text-muted-foreground">
            {headerLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild variant="brand" size="wrap">
            <Link href={browseHrefFor(landing)}>
              Filter all {landing.questionCount} in the question bank
              <ArrowRight className="ml-1.5 h-4 w-4 shrink-0" />
            </Link>
          </Button>
          {resources.notes && (
            <Button asChild variant="outline" size="wrap">
              <Link href={resources.notes.href}>
                <BookOpen className="mr-1.5 h-4 w-4 shrink-0" />
                {resources.notes.label}
              </Link>
            </Button>
          )}
          {resources.guide && (
            <Button asChild variant="outline" size="wrap">
              <Link href={resources.guide.href}>
                <Compass className="mr-1.5 h-4 w-4 shrink-0" />
                {resources.guide.label}
              </Link>
            </Button>
          )}
          {mock && (
            <Button asChild variant="outline" size="wrap">
              <Link href={mock.href}>
                <ClipboardCheck className="mr-1.5 h-4 w-4 shrink-0" />
                {mockCtaCopy(mock).short}
              </Link>
            </Button>
          )}
        </div>

        <div className="mt-8">
          {questions.rows.length === 0 ? (
            <p className="rounded-md border p-6 text-muted-foreground">
              No public questions here yet.
            </p>
          ) : (
            <QuestionList
              questions={questions.rows}
              pageOffset={0}
              canEdit={false}
              isLoggedIn={false}
              supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
              includeExam={false}
              breadcrumbFixed={{ subject: true, chapter: true }}
              insert={{
                afterQuestions: CARD_AFTER,
                node: <NextStepCard links={nextStepLinks(secondPage)} />,
              }}
            />
          )}
        </div>

        {hasMore && (
          <div className="mt-8 rounded-md border p-6 text-center">
            <p className="text-muted-foreground">
              Showing the first {showing} of {questions.totalCount}.
            </p>
            <Button asChild className="mt-3" variant="brand">
              <Link href={browseHrefFor(landing)}>
                See all {questions.totalCount} questions
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        <ChapterShareCard
          path={landingHref(landing)}
          chapterName={landing.chapterName}
          examDisplay={getExamBySlug(landing.examSlug)?.displayName ?? landing.examName}
          questionCount={landing.questionCount}
          practiceOnly={landing.practiceOnly}
          surface="questions"
        />

        <SiblingLinks siblings={siblings} />
      </main>
      <VHello hello={pickHello(secondPage)} surface="questions" />
      <Footer />
    </>
  );
}
