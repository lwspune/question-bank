import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, FileText, History } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks } from "@/lib/mocks/query";
import { getMockExam, getMockExams, mockFamilyOf, mockSideNav } from "@/lib/mocks/mocksNav";
import { groupMocksForType, mocksOfType, mockDownloadHref } from "@/lib/mocks/catalogue";
import { getBlueprint } from "@/lib/mocks/blueprints";
import { EXAM_REGISTRY, getExamByName, type ExamSlug } from "@/lib/exam/examContext";
import { getExamIdMap } from "@/lib/exam/examIdMap";
import { downloadPageTitle, paperPageHref, paperYearRange, plainPaperTitle } from "@/lib/mocks/paperPage";
import {
  YEAR_NOTES,
  newestSittingLabel,
  openYearKeys,
  paperCountLabel,
  paperFacts,
  paperTrends,
  pastPapersFaq,
  yearHeading,
} from "@/lib/mocks/pastPapersPage";
import { loadChapterWeights } from "@/lib/me/startNextServer";
import { landingHref, listChapterLandings } from "@/lib/questions/landing";
import { getSubjectGuides } from "@/lib/guide/guideCatalog";
import PaperDownload from "../../../_components/PaperDownload";
import { canonicalFor } from "@/lib/sites/intl";

// Same refresh as the /mock lists beside it.
export const revalidate = 3600;

type Params = { examSlug: string };

/** Every exam, including one with no past papers yet: an honest empty state beats a 404. */
export function generateStaticParams(): Params[] {
  return getMockExams(EXAM_REGISTRY).map((e) => ({ examSlug: e.slug as string }));
}

/** One read per request, shared by the metadata and the page. */
const pastPapersOf = cache(async (examName: string) => {
  const all = await getPublishedMocks(createSupabaseAnonClient());
  return mocksOfType(
    all.filter((m) => m.examName === examName),
    "past-papers"
  );
});

/** subject + chapter -> its /questions landing, for the chapters this exam's papers ask most. */
async function chapterHrefs(examName: string): Promise<(subject: string, chapter: string) => string | undefined> {
  try {
    const landings = (await listChapterLandings()).filter((l) => l.examName === examName);
    const map = new Map(landings.map((l) => [`${l.subjectName}\u0000${l.chapterName}`, landingHref(l)]));
    return (subject, chapter) => map.get(`${subject}\u0000${chapter}`);
  } catch (e) {
    console.error("past papers: chapter landings failed", e instanceof Error ? e.message : e);
    return () => undefined;
  }
}

/** The exam's strategy guides, where it has any: the one guide, or the exam's guide hub. */
function guideHref(slug: ExamSlug): string | null {
  const guides = getSubjectGuides(slug);
  if (guides.length === 0) return null;
  return guides.length === 1 ? guides[0].href : `/guide/${slug}`;
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params;
  const exam = getMockExam(params.examSlug);
  if (!exam) return {};
  // The words students search (2026-10-15): "previous year question papers",
  // with the years we actually hold.
  const range = paperYearRange(await pastPapersOf(exam.examName));
  const solved = getExamByName(exam.examName)?.pastPaperSolutions === true;
  return {
    title: { absolute: downloadPageTitle(exam.examName, range, solved) },
    description: `${exam.examName} previous year question papers${range ? ` from ${range}` : ""}, each exactly as it was set. Every paper is free to read online ${solved ? "with answers and worked solutions" : "with answers"}, or sit it as a timed mock. Your first PDF paper and answer key are free to download.`,
    alternates: { canonical: canonicalFor(mockDownloadHref(exam.slug)) },
  };
}

const SECTION_TITLE = "text-xl font-semibold tracking-tight";
const SUMMARY =
  "flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-lg px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden";
const CHEVRON = "h-4 w-4 shrink-0 text-brand-accent transition-transform group-open:rotate-90 motion-reduce:transition-none";

/**
 * One exam's past papers (2026-10-07; facts, trends and FAQ 2026-11-10): each
 * published past paper, grouped by year, with its paper and answer key a tap
 * away, and the facts a student searches for around them, all read from data
 * (lib/mocks/pastPapersPage.ts). The download box is the only per-viewer part,
 * and it asks the browser, so this page stays a cached copy that search
 * engines can read.
 */
export default async function MockDownloadList(props: { params: Promise<Params> }) {
  const params = await props.params;
  const exam = getMockExam(params.examSlug);
  if (!exam) notFound();

  const papers = await pastPapersOf(exam.examName);
  const range = paperYearRange(papers);
  const groups = groupMocksForType("past-papers", papers);
  const open = openYearKeys(groups);
  const parent = mockFamilyOf(exam.slug);
  const bilingual = getExamByName(exam.examName)?.bilingual === true;
  const solved = getExamByName(exam.examName)?.pastPaperSolutions === true;
  const yearNotes = YEAR_NOTES[exam.slug] ?? {};

  const facts = paperFacts(papers, (code) => getBlueprint(exam.slug, code));
  const examId = papers.length > 0 ? (await getExamIdMap())[exam.slug] : null;
  const trends = examId
    ? paperTrends(await loadChapterWeights(examId), facts, await chapterHrefs(exam.examName))
    : [];
  // One count in the heading only when every card averages the same papers
  // (NDA: 19 and 19); MHT-CET has 58 Maths and 54 PCB papers, so each card says its own.
  const trendCounts = [...new Set(trends.map((t) => t.papers))];
  const trendsTitle =
    trendCounts.length === 1
      ? `What ${trendCounts[0]} sittings of ${exam.examName} papers show`
      : `What the ${exam.examName} past papers show`;
  const years = [...new Set(papers.map((m) => m.pyqYear).filter((y): y is number => y !== null))];
  const faq = pastPapersFaq({ examName: exam.examName, facts, years, paperCount: papers.length, solved, yearNotes });
  const newest = newestSittingLabel(papers);
  const guide = guideHref(exam.slug);

  return (
    <GuideShell
      guideTitle="Mock Tests"
      sideNav={mockSideNav(params.examSlug)}
      breadcrumbs={[
        { href: "/mock", label: "Mocks" },
        ...(parent ? [{ href: `/mock/exam/${parent.slug}`, label: parent.name }] : []),
        { href: `/mock/exam/${exam.slug}`, label: exam.displayName },
        { label: "Past papers" },
      ]}
    >
      <GuideHero
        eyebrow={`${exam.displayName} · Past papers`}
        title={`${exam.examName} previous year question papers${range ? ` (${range})` : ""}`}
        subtitle={`Every paper exactly as it was set${range ? `, ${range}` : ""}. Read any paper free online ${solved ? "with answers and worked solutions" : "with answers"}, sit it as a timed mock, or download it as a PDF. Your first PDF paper and its answer key are free.`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {papers.length > 0 && (
            <span className="rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand-accent">
              {paperCountLabel(papers.length)}
            </span>
          )}
          {newest && (
            <span className="rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand-accent">
              Newest: {newest}
            </span>
          )}
          <Link
            href="/mock/attempts"
            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <History className="h-4 w-4" aria-hidden />
            My attempts
          </Link>
        </div>
      </GuideHero>

      {groups.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          {exam.examName} past papers are coming soon. Check back shortly.
        </p>
      ) : (
        <div className="space-y-10">
          {facts.length > 0 && (
            <section aria-labelledby="paper-facts">
              <h2 id="paper-facts" className={SECTION_TITLE}>
                The {exam.examName} {facts.length === 1 ? "paper" : "papers"} at a glance
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {facts.map((f) => (
                  <li key={f.label} className="rounded-lg border bg-card p-4">
                    <p className="font-semibold">{f.label}</p>
                    <p className="mt-1 text-sm">
                      {f.questions} questions · {f.marks} marks · {f.minutes} min
                    </p>
                    {f.sections && <p className="mt-1 text-sm text-muted-foreground">{f.sections}</p>}
                    <p className="mt-2 text-sm text-muted-foreground">
                      {f.marking.kind === "one" ? (
                        <>Marking: {f.marking.line}.</>
                      ) : (
                        <>
                          Each section is marked differently:{" "}
                          <Link
                            href={`/mock/${f.newestSlug}`}
                            className="rounded-sm font-medium text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            see the newest paper&apos;s marking
                          </Link>
                          .
                        </>
                      )}
                      {f.note && <> {f.note}</>}
                    </p>
                    {f.earlierText && <p className="mt-1 text-sm text-muted-foreground">{f.earlierText}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="all-papers">
            <h2 id="all-papers" className={SECTION_TITLE}>
              All {paperCountLabel(papers.length)}, newest first
            </h2>
            <div className="mt-4 space-y-3">
              {groups.map((group) => (
                <details key={group.key} open={open.has(group.key)} className="group rounded-lg border bg-card">
                  <summary className={SUMMARY}>
                    <ChevronRight className={CHEVRON} aria-hidden />
                    <h3 className="text-base font-semibold">{yearHeading(exam.examName, group.label)}</h3>
                    <span className="ml-auto whitespace-nowrap text-sm text-muted-foreground">
                      {paperCountLabel(group.items.length)}
                    </span>
                  </summary>
                  <div className="px-4 pb-4">
                    {yearNotes[Number(group.key)] && (
                      <p className="mb-3 rounded-md bg-muted px-3 py-2 text-sm">{yearNotes[Number(group.key)]}</p>
                    )}
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {group.items.map((m) => (
                        <li
                          key={m.slug}
                          className="flex items-center justify-between gap-3 rounded-lg border bg-background p-4"
                        >
                          <div className="min-w-0">
                            <Link
                              href={paperPageHref(m.slug)}
                              className="font-semibold leading-snug hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              {/* The stored title's dashes become commas, as on the paper's own page. */}
                              {plainPaperTitle(m.title)}
                            </Link>
                            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                              <FileText className="h-3.5 w-3.5" aria-hidden />
                              {m.totalQuestions} questions
                            </p>
                            {/* Own line, no separators: on a phone a wrapped "·" was left hanging. */}
                            <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                              <Link
                                href={paperPageHref(m.slug)}
                                className="rounded-sm text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                aria-label={`Read ${plainPaperTitle(m.title)} online`}
                              >
                                Read online
                              </Link>
                              <Link
                                href={`/mock/${m.slug}`}
                                className="rounded-sm text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                aria-label={`Sit ${plainPaperTitle(m.title)} as a timed mock`}
                              >
                                Sit as a timed mock
                              </Link>
                            </p>
                          </div>
                          <div className="shrink-0">
                            <PaperDownload slug={m.slug} paperTitle={plainPaperTitle(m.title)} bilingual={bilingual} variant="row" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {trends.length > 0 && (
            <section aria-labelledby="paper-trends">
              <h2 id="paper-trends" className={SECTION_TITLE}>
                {trendsTitle}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Average questions a paper, counted from every published {exam.examName} past paper.
              </p>
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                {trends.map((card) => {
                  const max = Math.max(...card.rows.map((r) => r.perPaper), 1);
                  return (
                    <div key={card.code} className="rounded-lg border bg-card p-4">
                      <h3 className="font-semibold">
                        {card.title}{" "}
                        <span className="font-normal text-muted-foreground">
                          (of {card.total}
                          {trendCounts.length > 1 ? `, over ${card.papers} papers` : ""})
                        </span>
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {card.rows.map((r) => (
                          <li key={r.name} className="flex items-center gap-3 text-sm">
                            <span className="w-36 shrink-0 break-words leading-snug sm:w-48">
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
                                style={{ width: `${Math.round((r.perPaper / max) * 100)}%` }}
                              />
                            </span>
                            <span className="w-10 shrink-0 text-right font-semibold tabular-nums">{r.perPaper}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              {guide && (
                <Link
                  href={guide}
                  className="mt-3 inline-block rounded-sm text-sm font-semibold text-brand-accent underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Every chapter, year by year, in the {exam.examName} strategy guides
                </Link>
              )}
            </section>
          )}

          <section aria-labelledby="papers-faq">
            <h2 id="papers-faq" className={SECTION_TITLE}>
              Questions students ask
            </h2>
            <div className="mt-4 space-y-2">
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
      )}
    </GuideShell>
  );
}
