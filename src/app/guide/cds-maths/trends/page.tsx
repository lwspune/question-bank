import type { Metadata } from "next";
import { Flame, TrendingDown, TrendingUp } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import ExamPaperMatrix from "@/app/guide/_components/ExamPaperMatrix";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import ReportProvenance from "@/app/guide/_components/ReportProvenance";
import { trendsReportFor } from "@/lib/guide/trendsReports";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { OVERVIEW, ROUTES } from "../_data/cds-maths";
import { CHAPTER_MATRIX, PAPERS, PAPER_TOTALS } from "../_data/matrix.generated";
import { DRIFT_CALLOUTS, HARD_BY_YEAR, WINDOWS, WINDOW_PAPERS, WINDOW_RATES, ratesFor } from "../_data/trends";

export const revalidate = 86400;

const ROUTE = "/guide/cds-maths/trends";
const TOTAL_Q = CHAPTER_MATRIX.reduce((s, r) => s + r.total, 0);
const FIRST_YEAR = PAPERS[0].year;
const LAST_YEAR = PAPERS[PAPERS.length - 1].year;
const SHORT_PAPERS = PAPER_TOTALS.filter((t) => t.total < OVERVIEW.paper.questions).length;

/** HARD share before and from 2023, pooled over each period's papers. */
function pooledHard(from: number, to: number) {
  const years = HARD_BY_YEAR.filter((y) => y.year >= from && y.year <= to && y.papers > 1);
  const hard = years.reduce((s, y) => s + y.hardQ, 0);
  const total = years.reduce((s, y) => s + y.totalQ, 0);
  return { from: years[0]?.year, to: years[years.length - 1]?.year, pct: Math.round((100 * hard) / total) };
}
const HARD_BEFORE = pooledHard(FIRST_YEAR, 2022);
const HARD_SINCE = pooledHard(2023, LAST_YEAR);

export const metadata: Metadata = {
  title: `CDS Maths Trends — what moved, ${FIRST_YEAR}–${LAST_YEAR}`,
  description: `What changed across ${PAPERS.length} CDS Elementary Mathematics papers and ${TOTAL_Q.toLocaleString("en-IN")} past-year questions. Trigonometry and Number System rose to 13 questions a paper each; Linear Equations and Time and Work faded; the HARD share rose from ${HARD_BEFORE.pct}% to ${HARD_SINCE.pct}%. Every paper is 100 questions, so the counts compare directly.`,
  alternates: { canonical: ROUTE },
};

const fmt = (n: number) => n.toFixed(2);

export default async function Trends() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "CDS", "Mathematics");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/cds-maths/${r.slug}` : "/guide/cds-maths",
    label: r.label,
  }));

  const stats = [
    { value: String(LAST_YEAR - FIRST_YEAR + 1), label: "years analysed" },
    { value: String(PAPERS.length), label: "papers" },
    { value: TOTAL_Q.toLocaleString("en-IN"), label: "questions tagged" },
    { value: String(OVERVIEW.chapters), label: "chapters tracked" },
  ];

  const report = trendsReportFor(ROUTE)!;
  const windowLabel = (id: (typeof WINDOWS)[number]["id"]) => {
    const w = WINDOWS.find((x) => x.id === id)!;
    return `${w.label} (${WINDOW_PAPERS[id]} papers)`;
  };

  return (
    <GuideShell
      guideTitle="CDS Maths Guide"
      sideNav={sideNav}
      landingHref="/guide/cds-maths"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/cds", label: "CDS" },
        { href: "/guide/cds-maths", label: "Mathematics" },
        { label: "Trends" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path={ROUTE}
        headline={report.claim}
        description={`What changed across ${PAPERS.length} CDS Elementary Mathematics papers and ${TOTAL_Q} past-year questions, ${FIRST_YEAR} to ${LAST_YEAR}: chapter weights by period, the HARD share by year, and every chapter paper by paper.`}
      />
      <GuideHero
        eyebrow="Trends"
        title={report.claim}
        subtitle={`Every CDS Maths paper from ${PAPERS[0].title} to ${PAPERS[PAPERS.length - 1].title}, chapter by chapter. Each paper is 100 questions, so a count in one paper compares directly with a count in another.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>
      <ReportProvenance route={ROUTE} papers={stats[1].value} questions={stats[2].value} />

      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="text-base font-semibold tracking-tight">How to read this page</h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
          Rates are questions per paper in three periods: {windowLabel("early")}, {windowLabel("mid")} and{" "}
          {windowLabel("recent")}. Six papers is a small sample — one heavy paper moves a chapter&rsquo;s
          recent rate by a question or more — so read a change as a direction, not a forecast. Nothing here
          predicts the next paper.
        </p>
      </section>

      {/* Drift callouts — prose from trends.ts, numbers from the grid */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What moved</h2>
        <div className="mt-5 space-y-4">
          {DRIFT_CALLOUTS.map((c) => {
            const r = ratesFor(c.chapter);
            const chap = taxonomy.chapters.get(c.chapter);
            const Icon = c.direction === "up" ? TrendingUp : TrendingDown;
            const tone =
              c.direction === "up"
                ? "border-emerald-500/50 text-emerald-700 dark:text-emerald-400"
                : "border-amber-500/50 text-amber-700 dark:text-amber-400";
            return (
              <article key={c.chapter} className="rounded-lg border bg-card p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-base font-semibold tracking-tight sm:text-lg">{c.title}</h3>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${tone}`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {c.direction === "up" ? "Rising" : "Falling"}
                  </span>
                </div>
                <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                  {c.chapter}: {fmt(r.early)} → {fmt(r.mid)} → {fmt(r.recent)} questions a paper
                </p>
                <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                {chap && (
                  <BrowseLink
                    examId={taxonomy.examId}
                    subjectId={taxonomy.subjectId}
                    chapterIds={[chap.id]}
                    pyqYears={[LAST_YEAR - 2, LAST_YEAR - 1, LAST_YEAR]}
                    variant="outline"
                    className="mt-3 px-3 py-1 text-xs"
                  >
                    Drill {c.chapter} from {LAST_YEAR - 2}–{LAST_YEAR}
                  </BrowseLink>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* All chapters by period */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Every chapter, by period</h2>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[560px] text-sm">
            <caption className="sr-only">
              Questions per paper for each CDS Maths chapter in {WINDOWS.map((w) => w.label).join(", ")}
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Chapter</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Questions</th>
                {WINDOWS.map((w) => (
                  <th key={w.id} scope="col" className="px-3 py-2 text-right font-medium">
                    {w.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {WINDOW_RATES.map((r) => (
                <tr key={r.chapter} className="border-b last:border-b-0">
                  <th scope="row" className="px-3 py-2 text-left font-medium">{r.chapter}</th>
                  <td className="px-3 py-2 text-right text-muted-foreground">{r.total}</td>
                  <td className="px-3 py-2 text-right">{fmt(r.early)}</td>
                  <td className="px-3 py-2 text-right">{fmt(r.mid)}</td>
                  <td className="px-3 py-2 text-right">{fmt(r.recent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* HARD by year */}
      <section className="mt-14">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Flame className="h-5 w-5 text-rose-600 dark:text-rose-400" aria-hidden />
          The paper has got harder, unevenly
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          From {HARD_BEFORE.from} to {HARD_BEFORE.to}, {HARD_BEFORE.pct}% of questions were HARD. From{" "}
          {HARD_SINCE.from} to {HARD_SINCE.to} it was {HARD_SINCE.pct}% — but not every year: see the table. Plan
          for more HARD questions than older papers suggest, and practise leaving the ones you cannot open.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full text-sm">
            <caption className="sr-only">HARD questions by year in CDS Elementary Mathematics</caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Year</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Papers</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Questions</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">HARD</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">% HARD</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {HARD_BY_YEAR.map((y) => (
                <tr key={y.year} className="border-b last:border-b-0">
                  <th scope="row" className="px-3 py-2 text-left font-medium">
                    {y.year}
                    {y.papers === 1 && (
                      <span className="ml-2 text-xs font-normal text-muted-foreground">one paper only</span>
                    )}
                  </th>
                  <td className="px-3 py-2 text-right">{y.papers}</td>
                  <td className="px-3 py-2 text-right">{y.totalQ}</td>
                  <td className="px-3 py-2 text-right">{y.hardQ}</td>
                  <td className="px-3 py-2 text-right font-medium">{y.pctHard}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The full grid */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Every chapter, paper by paper</h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          One column per paper. A zero is a measured zero: the chapter set no question in that paper. The
          footer is each paper&rsquo;s total; {SHORT_PAPERS} papers hold fewer than {OVERVIEW.paper.questions} questions in the bank.
        </p>
        <div className="mt-4">
          <ExamPaperMatrix papers={PAPERS} rows={CHAPTER_MATRIX} />
        </div>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/cds-maths/formulas", label: "Formulas" }}
        next={{ href: "/guide/cds-maths/traps", label: "Traps" }}
      />
    </GuideShell>
  );
}
