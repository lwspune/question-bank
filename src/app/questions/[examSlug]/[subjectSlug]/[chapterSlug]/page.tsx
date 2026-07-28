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
import { ArrowRight, BookOpen, Compass } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import QuestionList from "@/app/browse/QuestionList";
import { getQuestionResources } from "@/lib/links/questionResources";
import {
  listChapterLandings,
  getChapterLanding,
  getSiblingLandings,
  loadLandingQuestions,
  browseHrefFor,
  landingHref,
  LANDING_PAGE_SIZE,
  type ChapterLanding,
} from "@/lib/questions/landing";

const SITE_URL = "https://www.pyqvault.com";

/** Rebuilt daily; new chapters appear without a deploy. */
export const revalidate = 86400;

/**
 * Pre-build only the busiest chapters. The rest are rendered on first request
 * and then cached exactly the same way — so every page gets the caching benefit
 * without paying for ~250 database round-trips on every deploy.
 */
export async function generateStaticParams() {
  try {
    const landings = await listChapterLandings();
    return [...landings]
      .sort((a, b) => b.questionCount - a.questionCount)
      .slice(0, 40)
      .map((l) => ({
        examSlug: l.examSlug,
        subjectSlug: l.subjectSlug,
        chapterSlug: l.chapterSlug,
      }));
    // A Supabase blip during a build must not fail the DEPLOY — pre-building is
    // an optimisation, not a correctness requirement. Returning nothing means
    // every page renders on first request instead, exactly as the other ~277 do.
    // Mirrors the guard already on the sitemap's DB read.
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

  const kindWord = landing.practiceOnly ? "practice questions" : "PYQs";
  const title = `${landing.chapterName} — ${landing.examName} ${landing.subjectName} ${landing.practiceOnly ? "Practice Questions" : "PYQs"}`;
  const description = `${landing.questionCount} ${landing.examName} ${landing.subjectName} ${kindWord} from ${landing.chapterName}, with answers and worked solutions. Free to browse.`;

  return {
    title,
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

  const [questions, siblings] = await Promise.all([
    loadLandingQuestions(landing),
    getSiblingLandings(landing),
  ]);

  // Reuse the same chapter→notes/guide mapping the /browse cards use, so a
  // rename stays a one-place fix rather than drifting between surfaces.
  const resources = getQuestionResources({
    examName: landing.examName,
    subjectName: landing.subjectName,
    chapterName: landing.chapterName,
    subtopicName: null,
  });

  const showing = Math.min(questions.rows.length, LANDING_PAGE_SIZE);
  const hasMore = questions.totalCount > showing;

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl p-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/questions" className="hover:underline">
                Questions
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>{landing.examName}</li>
            <li aria-hidden="true">/</li>
            <li>{landing.subjectName}</li>
          </ol>
        </nav>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          {landing.chapterName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {landing.questionCount}{" "}
          {landing.examName} {landing.subjectName}{" "}
          {landing.practiceOnly ? "practice questions" : "past-year questions"}{" "}
          with answers and solutions.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild variant="brand">
            <Link href={browseHrefFor(landing)}>
              Filter all {landing.questionCount} in the question bank
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
          {resources.notes && (
            <Button asChild variant="outline">
              <Link href={resources.notes.href}>
                <BookOpen className="mr-1.5 h-4 w-4" />
                {resources.notes.label}
              </Link>
            </Button>
          )}
          {resources.guide && (
            <Button asChild variant="outline">
              <Link href={resources.guide.href}>
                <Compass className="mr-1.5 h-4 w-4" />
                {resources.guide.label}
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

        <SiblingLinks siblings={siblings} />
      </main>
      <Footer />
    </>
  );
}
