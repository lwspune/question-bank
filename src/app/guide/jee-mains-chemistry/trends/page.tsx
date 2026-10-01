import type { Metadata } from "next";
import { TrendingDown, TrendingUp } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import ReportProvenance from "@/app/guide/_components/ReportProvenance";
import { trendsReportFor } from "@/lib/guide/trendsReports";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { EARLY, OVERVIEW, PAPER, RECENT, chapterRow } from "../_data/jee-mains-chemistry";
import { YEARS } from "../_data/matrix.generated";
import { DRIFT_CALLOUTS, YEAR_RATES, lastSeen } from "../_data/trends";
import { LEFT_CHAPTERS } from "../_data/strategy";
import { GUIDE_BASE, jeeChemGuideSideNav } from "../_data/nav";

export const revalidate = 86400;

const ROUTE = `${GUIDE_BASE}/trends`;

export const metadata: Metadata = {
  title: `JEE Mains Chemistry Trends — what moved, ${OVERVIEW.firstYear}–${OVERVIEW.lastYear}`,
  description: `What changed across every JEE Mains Chemistry shift from ${OVERVIEW.firstYear} to ${OVERVIEW.lastYear}, ${OVERVIEW.totalQ.toLocaleString("en-IN")} past-year questions. Physical chemistry grew as ${LEFT_CHAPTERS.length} chapters left the syllabus; the p-Block Elements shrank. Each chapter's share of each year, scaled to a ${PAPER.questions}-question paper.`,
  alternates: { canonical: ROUTE },
};

const fmt = (n: number) => n.toFixed(2);

/** Shade a cell by its rate, relative to the largest rate in the grid. */
const MAX_RATE = Math.max(...YEAR_RATES.flatMap((r) => r.rates));
function cellClass(rate: number): string {
  if (rate === 0) return "text-muted-foreground/60";
  const t = rate / MAX_RATE;
  if (t >= 0.66) return "bg-brand/25 font-semibold";
  if (t >= 0.33) return "bg-brand/15";
  if (t >= 0.15) return "bg-brand/5";
  return "";
}

export default async function Trends() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "JEE Mains", "Chemistry");

  const stats = [
    { value: String(OVERVIEW.years), label: "years analysed" },
    { value: OVERVIEW.totalQ.toLocaleString("en-IN"), label: "questions tagged" },
    { value: String(OVERVIEW.chapters), label: "chapters tracked" },
    { value: String(LEFT_CHAPTERS.length), label: "chapters gone since" },
  ];

  const report = trendsReportFor(ROUTE)!;

  return (
    <GuideShell
      guideTitle="JEE Mains Chemistry Guide"
      sideNav={jeeChemGuideSideNav()}
      landingHref={GUIDE_BASE}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/jee-mains", label: "JEE Mains" },
        { href: GUIDE_BASE, label: "Chemistry" },
        { label: "Trends" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path={ROUTE}
        headline={report.claim}
        description={`What changed across every JEE Mains Chemistry shift, ${OVERVIEW.firstYear} to ${OVERVIEW.lastYear}: each chapter's weight by year, what rose, what fell and what left the paper.`}
      />
      <GuideHero
        eyebrow="Trends"
        title={report.claim}
        subtitle={`Every JEE Mains Chemistry shift from ${OVERVIEW.firstYear} to ${OVERVIEW.lastYear}, chapter by chapter and year by year. The papers changed length in ${RECENT.from}, so each rate is a chapter's share of that year's questions, scaled to one ${PAPER.questions}-question paper.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>
      <ReportProvenance route={ROUTE} questions={stats[1].value} />

      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="text-base font-semibold tracking-tight">How to read this page</h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
          The comparison is {EARLY.label} against {RECENT.label}. The recent window is only two years, and one
          heavy year moves a chapter a long way, so read a change as a direction, not a forecast. Nothing here
          predicts the next paper.
        </p>
      </section>

      {/* Drift callouts — prose from trends.ts, numbers from the grid */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What moved</h2>
        <div className="mt-5 space-y-4">
          {DRIFT_CALLOUTS.map((c) => {
            const r = chapterRow(c.chapter);
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
                  {c.chapter}: {fmt(r.earlyPerPaper)} a paper in {EARLY.label} → {fmt(r.recentPerPaper)} in{" "}
                  {RECENT.label}
                </p>
                <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                {chap && (
                  <BrowseLink
                    examId={taxonomy.examId}
                    subjectId={taxonomy.subjectId}
                    chapterIds={[chap.id]}
                    pyqYears={[RECENT.from, RECENT.to]}
                    variant="outline"
                    className="mt-3 px-3 py-1 text-xs"
                  >
                    Drill {c.chapter} from {RECENT.label}
                  </BrowseLink>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Left the paper */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">What left the syllabus</h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          These chapters were cut from the syllabus and are no longer set. A few recent questions are still filed
          under them, but those are on live topics, such as salt analysis, so a recent &ldquo;last set&rdquo; year
          does not mean a chapter is back.
        </p>
        <ul className="mt-4 space-y-2">
          {LEFT_CHAPTERS.map((c) => (
            <li key={c.chapter} className="rounded-md border bg-card px-4 py-3 text-sm">
              <span className="font-medium">{c.chapter}</span>
              <span className="ml-2 tabular-nums text-muted-foreground">
                {c.qCount} questions · last set in {lastSeen(c.chapter) ?? "—"}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* The full grid */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Every chapter, year by year</h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Questions per {PAPER.questions}-question paper, one column per year, heaviest on the recent papers
          first. A zero is a measured zero: the chapter set no question that year.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">
              Questions per {PAPER.questions}-question paper for each JEE Mains Chemistry chapter, by year from{" "}
              {OVERVIEW.firstYear} to {OVERVIEW.lastYear}
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">Chapter</th>
                {YEARS.map((y) => (
                  <th key={y.year} scope="col" className="px-2 py-2 text-right font-medium">
                    {y.year}
                  </th>
                ))}
                <th scope="col" className="px-3 py-2 text-right font-medium">Questions</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {YEAR_RATES.map((r) => (
                <tr key={r.chapter} className="border-b last:border-b-0">
                  <th scope="row" className="px-3 py-2 text-left font-medium">{r.chapter}</th>
                  {r.rates.map((rate, i) => (
                    <td key={YEARS[i].year} className={`px-2 py-2 text-right ${cellClass(rate)}`}>
                      {fmt(rate)}
                    </td>
                  ))}
                  <td className="px-3 py-2 text-right text-muted-foreground">{r.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t bg-muted/40 text-xs text-muted-foreground">
              <tr>
                <th scope="row" className="px-3 py-2 text-left font-medium">Questions that year</th>
                {YEARS.map((y) => (
                  <td key={y.year} className="px-2 py-2 text-right tabular-nums">
                    {y.total}
                  </td>
                ))}
                <td className="px-3 py-2 text-right tabular-nums">{OVERVIEW.totalQ}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <PrevNextNav
        prev={{ href: `${GUIDE_BASE}/reference`, label: "Reference" }}
        next={{ href: `${GUIDE_BASE}/traps`, label: "Traps" }}
      />
    </GuideShell>
  );
}
