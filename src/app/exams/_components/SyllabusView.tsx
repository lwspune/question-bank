/**
 * An exam's pattern, syllabus and marks page (/exams/<exam>/syllabus), shared
 * by the public route and the owner's preview at /dashboard/blog/<slug>.
 *
 * Two kinds of content, kept apart on purpose:
 *   * LIVE, from our own data: the paper facts (questions, marks, time, the
 *     marking scheme) read from the mock blueprints, and the most-asked
 *     chapters averaged over every published past paper. These are the same
 *     cards as the past-papers page, so the two pages cannot disagree, and they
 *     move on their own when a paper is added.
 *   * WRITTEN, from the official notice: the syllabus, what changed, what the
 *     marks rules mean. That is the evergreen article (migration 0263, kind
 *     'evergreen'), written by the /blog skill and published by the owner.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleBody, { ArticleSources } from "@/app/blog/_components/ArticleBody";
import PostFrame from "@/app/blog/_components/PostFrame";
import PaperFactsList from "@/app/mock/_components/PaperFactsList";
import PaperTrendCards, { trendsTitle } from "@/app/mock/_components/PaperTrendCards";
import { loadExamPaperFacts } from "@/lib/mocks/paperFactsServer";
import { mockDownloadHref } from "@/lib/mocks/catalogue";
import { examHomeHref } from "@/lib/exam/examHome";
import type { ExamEntry } from "@/lib/exam/examContext";
import type { DbPost } from "@/lib/blog/catalog";

const H2 = "mt-14 text-2xl font-bold tracking-tight sm:text-3xl";
const NOTE = "mt-3 font-serif text-base leading-relaxed text-muted-foreground";
const ACTION =
  "inline-flex items-center gap-1.5 rounded-sm font-medium text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default async function SyllabusView({ exam, article }: { exam: ExamEntry; article: DbPost }) {
  let live: Awaited<ReturnType<typeof loadExamPaperFacts>> | null = null;
  try {
    live = await loadExamPaperFacts(exam.slug, exam.examName);
  } catch (e) {
    // The written part still stands on its own; the live cards come back on the next render.
    console.error("syllabus page: paper facts failed", e instanceof Error ? e.message : e);
  }
  const hasPapers = !!live && live.papers.length > 0;

  return (
    <PostFrame post={article} back={{ href: examHomeHref(exam.slug), label: `${exam.displayName} on PYQ Vault` }}>
      {live && live.facts.length > 0 && (
        <section aria-labelledby="paper-facts">
          <h2 id="paper-facts" className="text-2xl font-bold tracking-tight sm:text-3xl">
            The {exam.examName} {live.facts.length === 1 ? "paper" : "papers"} at a glance
          </h2>
          <p className={NOTE}>From the newest {exam.examName} paper, as it was set.</p>
          <PaperFactsList facts={live.facts} />
        </section>
      )}

      <ArticleBody body={article.body} />

      {live && live.trends.length > 0 && (
        <section aria-labelledby="paper-trends">
          <h2 id="paper-trends" className={H2}>
            {trendsTitle(exam.examName, live.trends)}
          </h2>
          <p className={NOTE}>
            Average questions a paper from each chapter, counted from every published {exam.examName} past paper.
          </p>
          <PaperTrendCards trends={live.trends} />
        </section>
      )}

      {hasPapers && (
        <section aria-labelledby="practise" className="mt-14 rounded-lg border bg-card p-6">
          <h2 id="practise" className="text-xl font-semibold tracking-tight">
            Practise on the real papers
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href={mockDownloadHref(exam.slug)} prefetch={false} className={ACTION}>
                Every {exam.examName} previous year paper, free to read
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </li>
            <li>
              <Link href={`/mock/exam/${exam.slug}`} prefetch={false} className={ACTION}>
                Sit a past paper as a timed mock
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </li>
          </ul>
        </section>
      )}

      <ArticleSources sources={article.sources} />
    </PostFrame>
  );
}
