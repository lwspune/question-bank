import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { getExamBySlug } from "@/lib/exam/examContext";
import { slugify } from "@/lib/board/query";
import { getPublishedPapersFor, type PaperListingWithExam } from "@/lib/questionPapers/query";
import { subjectListing } from "@/lib/questionPapers/listing";
import { openYearKeys } from "@/lib/mocks/pastPapersPage";
import {
  boardFacts,
  boardPapersFaq,
  boardYearHeading,
  chapterMarks,
  hoursLabel,
  newestBoardSitting,
  setOverlap,
  yearCountLabel,
} from "@/lib/questionPapers/subjectPage";
import { loadSubjectStats } from "@/lib/questionPapers/subjectStats";

type Params = { examSlug: string; subjectSlug: string };

/** Rendered on first visit, then cached for a day (not built ahead). */
export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return [];
}

async function load(params: Params) {
  const exam = getExamBySlug(params.examSlug);
  if (!exam?.boardExam) return null;
  const mine = (p: PaperListingWithExam) =>
    p.examName === exam.examName && slugify(p.subjectName) === params.subjectSlug;
  const papers = (await getPublishedPapersFor(mine)).filter(mine);
  if (papers.length === 0) return null;
  return { exam, papers, subjectName: papers[0].subjectName, years: subjectListing(papers), count: papers.length };
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params;
  const data = await load(params);
  if (!data) return { title: "Question papers" };
  return {
    title: `${data.exam.displayName} ${data.subjectName} past question papers with answers`,
    description: `${data.count} whole ${data.exam.displayName} ${data.subjectName} board papers, newest first, with marks and model answers.`,
    alternates: { canonical: `/question-papers/${params.examSlug}/${params.subjectSlug}` },
  };
}

const SECTION_TITLE = "section-title text-lg font-semibold tracking-tight";
const SUMMARY =
  "flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-lg px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden";
const CHEVRON = "h-4 w-4 shrink-0 text-brand-accent transition-transform group-open:rotate-90 motion-reduce:transition-none";
const CHIP = "rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand-accent";

/**
 * One board subject's past papers, by year (facts, chapter marks and FAQ
 * 2026-11-10, read from data: lib/questionPapers/subjectPage.ts). The stats
 * read is best-effort: without it the page is the list it always was.
 */
export default async function SubjectPapers(props: { params: Promise<Params> }) {
  const params = await props.params;
  const data = await load(params);
  if (!data) notFound();
  const { exam, papers, subjectName, years } = data;

  const stats = await loadSubjectStats(
    exam.slug,
    exam.examName,
    subjectName,
    papers.map((p) => p.id)
  );
  // A CBSE case key is one printed question; a Maharashtra one is a block of them (subjectPage.ts).
  const facts = stats ? boardFacts(papers, stats, { casesAreQuestions: params.examSlug.startsWith("cbse-") }) : null;
  const marks = stats && facts ? chapterMarks(papers, stats, facts.marks) : null;
  const overlap = stats ? setOverlap(papers, stats) : null;
  const paperCount = years.reduce((s, y) => s + y.groups.length, 0);
  const faq = boardPapersFaq({
    exam: exam.displayName,
    subject: subjectName,
    facts,
    years: years.map((y) => y.year),
    paperCount,
    setCount: papers.length,
    overlap,
  });
  const open = openYearKeys(years.map((y) => ({ key: String(y.year), items: y.groups })));
  const newest = newestBoardSitting(papers);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          className="mb-4"
          items={[
            { href: "/question-papers", label: "Question papers" },
            { href: `/question-papers/${params.examSlug}`, label: exam.displayName },
            { label: subjectName },
          ]}
        />
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {exam.displayName} {subjectName} past papers
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Each paper as printed, with marks and a model answer for every question.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={CHIP}>{yearCountLabel(years.flatMap((y) => y.groups))}</span>
            {newest && <span className={CHIP}>Newest: {newest}</span>}
          </div>
        </header>

        <div className="space-y-10">
          {facts && (
            <section aria-labelledby="paper-facts">
              <h2 id="paper-facts" className={SECTION_TITLE}>
                The {subjectName} paper at a glance
              </h2>
              <div className="mt-3 rounded-lg border bg-card p-4">
                <p className="font-semibold">The {facts.label}</p>
                <p className="mt-1 text-sm">
                  {facts.marks} marks
                  {facts.minutes !== null && <> · {hoursLabel(facts.minutes)}</>}
                  {facts.questions !== null && <> · {facts.questions} questions</>}
                </p>
                {facts.choices ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {facts.choices} {facts.choices === 1 ? "question has" : "questions have"} an OR choice.
                  </p>
                ) : null}
                {facts.sections.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {facts.sections.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                )}
                {facts.earlierText && <p className="mt-2 text-sm text-muted-foreground">{facts.earlierText}</p>}
              </div>
            </section>
          )}

          <section aria-labelledby="all-papers">
            <h2 id="all-papers" className={SECTION_TITLE}>
              All papers, newest first
            </h2>
            <div className="mt-3 space-y-3">
              {years.map((y) => (
                <details key={y.year} open={open.has(String(y.year))} className="group rounded-lg border bg-card">
                  <summary className={SUMMARY}>
                    <ChevronRight className={CHEVRON} aria-hidden />
                    <h3 className="text-base font-semibold">{boardYearHeading(exam.displayName, subjectName, y.year)}</h3>
                    <span className="ml-auto whitespace-nowrap text-sm text-muted-foreground">
                      {yearCountLabel(y.groups)}
                    </span>
                  </summary>
                  <ul className="grid gap-2 px-4 pb-4 sm:grid-cols-2">
                    {y.groups.map((g) => (
                      <li key={g.groupSlug}>
                        <Link
                          href={`/question-papers/${params.examSlug}/${params.subjectSlug}/${g.groupSlug}`}
                          className="group/link flex items-center gap-3 rounded-lg border bg-background px-4 py-3 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold tracking-tight">{g.label}</span>
                            {g.sets.length > 1 && (
                              <span className="block text-xs text-muted-foreground">
                                Sets {g.sets.map((s) => s.setNumber).join(", ")}
                              </span>
                            )}
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </section>

          {marks && (
            <section aria-labelledby="chapter-marks">
              <h2 id="chapter-marks" className={SECTION_TITLE}>
                What {marks.papers} {subjectName} papers show
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Average marks a paper by chapter, over one set of each {marks.total}-mark paper.
              </p>
              <div className="mt-3 rounded-lg border bg-card p-4">
                <h3 className="font-semibold">
                  Most-asked chapters <span className="font-normal text-muted-foreground">(of {marks.total} marks)</span>
                </h3>
                <ul className="mt-3 space-y-2">
                  {marks.rows.map((r) => {
                    const max = Math.max(...marks.rows.map((x) => x.marks), 1);
                    return (
                      <li key={r.name} className="flex items-center gap-3 text-sm">
                        <span className="w-36 shrink-0 break-words leading-snug sm:w-56">
                          {r.href ? (
                            <Link
                              href={r.href}
                              className="rounded-sm text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              {r.name}
                            </Link>
                          ) : (
                            r.name
                          )}
                        </span>
                        <span className="h-2.5 flex-1 rounded-full bg-muted" aria-hidden>
                          <span
                            className="block h-2.5 rounded-full bg-brand"
                            style={{ width: `${Math.round((r.marks / max) * 100)}%` }}
                          />
                        </span>
                        <span className="w-10 shrink-0 text-right font-semibold tabular-nums">{r.marks}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          )}

          <section aria-labelledby="papers-faq">
            <h2 id="papers-faq" className={SECTION_TITLE}>
              Questions students ask
            </h2>
            <div className="mt-3 space-y-2">
              {faq.map((f, i) => (
                <details key={f.q} open={i === 0} className="group rounded-lg border bg-card">
                  <summary className={SUMMARY}>
                    <ChevronRight className={CHEVRON} aria-hidden />
                    <h3 className="text-base font-semibold">{f.q}</h3>
                  </summary>
                  <p className="px-4 pb-4 pl-10 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
