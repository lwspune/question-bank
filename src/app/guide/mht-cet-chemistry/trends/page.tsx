import type { Metadata } from "next";
import { Flame, TrendingDown, TrendingUp } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import ExamPaperMatrix from "@/app/guide/_components/ExamPaperMatrix";
import ChapterRateTable from "@/app/guide/_components/ChapterRateTable";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import ReportProvenance from "@/app/guide/_components/ReportProvenance";
import { trendsReportFor } from "@/lib/guide/trendsReports";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { OVERVIEW, ROUTES } from "../_data/mht-cet-chemistry";
import {
  DRIFT_CALLOUTS,
  DRIFT_ROWS,
  HARD_BY_YEAR,
  YEARS,
  type DriftRow,
  type DriftWindow,
} from "../_data/trends";
import {
  CHAPTER_MATRIX,
  MATRIX_META,
  PAPER_TOTALS,
  SHIFT_PAPERS,
  YEAR_COLUMNS,
  YEAR_RATES,
} from "../_data/matrix.generated";

export const revalidate = 86400;

/** Totals derived from the data, never hard-coded. */
const TOTAL_PAPERS = HARD_BY_YEAR.reduce((s, y) => s + y.papers, 0);
const TOTAL_Q = HARD_BY_YEAR.reduce((s, y) => s + y.totalQ, 0);

/** Years with enough shifts to read as a trend, and the ones without. */
const TREND_YEARS = HARD_BY_YEAR.filter((y) => y.papers > 1);
const SINGLE_PAPER_YEARS = HARD_BY_YEAR.filter((y) => y.papers === 1);

const TREND_RUN = TREND_YEARS.map((y) => `${y.year} at ${y.pctHard}%`).join(
  ", then "
);

/** The two most recent multi-shift years — scope first, then depth. */
const LATEST_TREND_YEAR = TREND_YEARS[TREND_YEARS.length - 1];
const PRIOR_TREND_YEAR = TREND_YEARS[TREND_YEARS.length - 2];

const FALLING = DRIFT_ROWS.filter((r) => r.direction === "down");
const RISING = DRIFT_ROWS.filter((r) => r.direction === "up");

export const metadata: Metadata = {
  title: `MHT-CET Chemistry Trends — what 2025 moved (${YEARS[0]}–${YEARS[YEARS.length - 1]})`,
  description: `What changed across ${TOTAL_PAPERS} MHT-CET papers and ${TOTAL_Q} past-year Chemistry questions. HARD stayed at 2-4% a year, but EASY fell from 56% to 42% in 2025; Structure of Atom halved while Some Basic Concepts, Groups 16-18 and Green Chemistry rose. Every comparison is a per-paper rate, not a raw count.`,
  alternates: { canonical: "/guide/mht-cet-chemistry/trends" },
};

/** The comparable figure for a window — or an honest blank. Never computed. */
function rateLabel(w: DriftWindow): string {
  return w.qPerPaper === null ? "—" : `${w.qPerPaper.toFixed(2)} q/paper`;
}

/** What was actually measured in the window, in raw terms. */
function rawLabel(w: DriftWindow): string {
  const papers = `${w.shifts} ${w.shifts === 1 ? "paper" : "papers"}`;
  return w.qInWindow === null
    ? `over ${papers}`
    : `${w.qInWindow} q over ${papers}`;
}

const DIRECTION_META: Record<
  DriftRow["direction"],
  { label: string; tone: string; Icon: typeof TrendingUp }
> = {
  dropped: {
    label: "Dropped off the paper",
    tone: "border-rose-500/40 bg-rose-50/40 text-rose-800 dark:bg-rose-950/20 dark:text-rose-300",
    Icon: TrendingDown,
  },
  entered: {
    label: "Entered the paper",
    tone: "border-emerald-500/40 bg-emerald-50/40 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300",
    Icon: TrendingUp,
  },
  up: {
    label: "Rising",
    tone: "border-emerald-500/40 bg-emerald-50/40 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300",
    Icon: TrendingUp,
  },
  down: {
    label: "Softening",
    tone: "border-amber-500/40 bg-amber-50/40 text-amber-800 dark:bg-amber-950/20 dark:text-amber-300",
    Icon: TrendingDown,
  },
};

export default async function Trends() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "MHT-CET", "Chemistry");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/mht-cet-chemistry/${r.slug}` : "/guide/mht-cet-chemistry",
    label: r.label,
  }));

  const stats = [
    { value: String(YEARS.length), label: "years analysed" },
    { value: String(TOTAL_PAPERS), label: "papers" },
    { value: String(TOTAL_Q), label: "questions tagged" },
    { value: String(OVERVIEW.chapters), label: "chapters tracked" },
  ];

  const report = trendsReportFor("/guide/mht-cet-chemistry/trends")!;

  return (
    <GuideShell
      guideTitle="MHT-CET Chemistry Guide"
      sideNav={sideNav}
      landingHref="/guide/mht-cet-chemistry"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/mht-cet", label: "MHT-CET" },
        { href: "/guide/mht-cet-chemistry", label: "Chemistry" },
        { label: "Trends" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/mht-cet-chemistry/trends"
        headline={`MHT-CET Chemistry Trends — what 2025 moved (${YEARS[0]}–${YEARS[YEARS.length - 1]})`}
        description={`What changed across ${TOTAL_PAPERS} MHT-CET papers and ${TOTAL_Q} past-year Chemistry questions. EASY fell to 42% in 2025; Structure of Atom halved; three chapters rose. Every comparison is a per-paper rate.`}
      />
      <GuideHero
        eyebrow="Trends"
        title={report.claim}
        subtitle={`The 2025 papers weighted Chemistry differently and made it less easy, and neither shows unless you date your practice papers. Everything below is measured across ${TOTAL_PAPERS} papers and ${TOTAL_Q} questions from ${YEARS[0]} to ${YEARS[YEARS.length - 1]}.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>
      <ReportProvenance route="/guide/mht-cet-chemistry/trends" papers={stats[1].value} questions={stats[2].value} />

      {/* Read-this-first: why rates, not counts */}
      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="text-base font-semibold tracking-tight">
          Read this before you read a number on this page
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
          MHT-CET is a multi-shift exam and the paper count per year is
          uneven —{" "}
          {HARD_BY_YEAR.map(
            (y) => `${y.year} = ${y.papers} ${y.papers === 1 ? "paper" : "papers"}`
          ).join(", ")}
          . A raw question count therefore means nothing across years: a
          chapter can carry more questions in a 16-paper year than in a
          13-paper year while sitting at exactly the same weight per paper.
          Every comparable figure below is a{" "}
          <strong className="font-semibold text-foreground">
            questions-per-paper rate
          </strong>
          , and every window below names its own paper count.
        </p>
      </section>

      {/* The headline: what 2025 moved */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          The headline: one chapter halved, three rose
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Prep off 2023-24 papers alone and you give Structure of Atom twice
          the hours it now earns, and too few to three chapters that grew.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[...FALLING, ...RISING].map((row) => {
            const up = row.direction === "up";
            return (
              <div
                key={row.chapter}
                className={`rounded-lg border-l-4 p-5 ${
                  up
                    ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20"
                    : "border-amber-500 bg-amber-50/40 dark:bg-amber-950/20"
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-sm font-semibold ${
                    up
                      ? "text-emerald-800 dark:text-emerald-300"
                      : "text-amber-800 dark:text-amber-300"
                  }`}
                >
                  {up ? (
                    <TrendingUp className="h-4 w-4" aria-hidden />
                  ) : (
                    <TrendingDown className="h-4 w-4" aria-hidden />
                  )}
                  {up ? "Rising" : "Falling"}: {row.chapter}
                </div>
                <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
                  {rateLabel(row.from)} across {row.from.label} ({row.from.shifts}{" "}
                  papers), then {rateLabel(row.to)} across the {row.to.shifts}{" "}
                  papers of {row.to.label}.
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Verified chapter drift */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Verified chapter drift
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          The {DRIFT_ROWS.length} chapters with a story worth spelling out in
          words. The full grid for every chapter is two sections below, derived
          from the bank rather than estimated; this list is the narrative, and
          the grid is its receipt. Each window names its own paper count,
          because that is what makes the two rates comparable.
        </p>
        <ul className="mt-6 space-y-4">
          {DRIFT_ROWS.map((row) => {
            const meta = DIRECTION_META[row.direction];
            const { Icon } = meta;
            return (
              <li key={row.chapter} className="rounded-lg border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-base font-semibold tracking-tight">
                    {row.chapter}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${meta.tone}`}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {meta.label}
                  </span>
                </div>

                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[row.from, row.to].map((w, i) => (
                    <div
                      key={`${row.chapter}-${w.label}`}
                      className="rounded-md border bg-muted/30 px-4 py-3"
                    >
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                        {i === 0 ? "Earlier window" : "Later window"} —{" "}
                        {w.label}
                      </dt>
                      <dd className="mt-1 text-lg font-semibold tabular-nums">
                        {rateLabel(w)}
                        <span className="ml-1 text-xs font-normal text-muted-foreground">
                          {w.qPerPaper === null
                            ? "per-paper rate not stated"
                            : "questions per paper"}
                        </span>
                      </dd>
                      <dd className="mt-0.5 text-xs text-muted-foreground">
                        {rawLabel(w)}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-3 text-xs text-muted-foreground">
                  Lifetime: {row.lifetimeQCount} questions · {row.pctHard}%
                  HARD
                </p>
                <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
                  {row.note}
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
          Every rate on this list is recomputed from the grid below by a test,
          so the narrative cannot drift from the evidence after the next
          ingest.
        </p>
      </section>

      {/* Per-paper weight by year — the readable summary */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          What every chapter is worth, per paper
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          All {MATRIX_META.chapters} chapters across all {MATRIX_META.papers}{" "}
          papers, as questions per paper. Every column is divided by its own
          year&rsquo;s paper count, so the cells compare directly even though
          the years do not have the same number of papers. Read a row
          left-to-right to see a chapter gain or lose weight; read the bottom
          row to confirm each year still adds up to a whole paper.
        </p>
        <div className="mt-6">
          <ChapterRateTable columns={YEAR_COLUMNS} rows={YEAR_RATES} />
        </div>
        <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
          The greyed columns are{" "}
          {SINGLE_PAPER_YEARS.map((y) => y.year).join(" and ")} — one paper
          each. Their numbers are real, but one paper&rsquo;s chapter mix is
          that paper, not the exam&rsquo;s shape, so do not read a line through
          them. A{" "}
          <span className="font-semibold text-foreground tabular-nums">
            0.00
          </span>{" "}
          is a measured zero: the chapter was on no paper that year.
        </p>
      </section>

      {/* Every paper, every chapter — the evidence */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Every paper, every chapter
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          The rates above come from this: one column per real sitting,{" "}
          {MATRIX_META.papers} of them, holding{" "}
          {MATRIX_META.questions.toLocaleString("en-IN")} questions. Raw counts
          do not compare across YEARS here, because the paper counts differ —
          but they compare perfectly across COLUMNS, because every column is a
          single paper of about {Math.round(
            PAPER_TOTALS.reduce((a, b) => a + b, 0) / PAPER_TOTALS.length
          )}{" "}
          questions. The footer row proves it: each column sums to its
          paper&rsquo;s own length. Hover a column number for its date and
          shift. Columns are papers by date and shift, not source files: a
          question re-dated to the paper it came from is counted in that
          paper.
        </p>
        <div className="mt-6">
          <ExamPaperMatrix papers={SHIFT_PAPERS} rows={CHAPTER_MATRIX} />
        </div>
        <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
          Columns are numbered within each year and ordered by exam date.{" "}
          {MATRIX_META.undatedPapers} papers carry no date in our records and
          sit last in their year rather than at a guessed position; their
          tooltips say so.{" "}
          {MATRIX_META.labelConflicts > 0 && (
            <>
              One paper&rsquo;s file name and its recorded shift disagree with
              each other — its column is underlined, and nothing in the source
              tells us which of the two labels is right, so we have not picked
              one.
            </>
          )}
        </p>
      </section>

      {/* %HARD by year */}
      <section className="mt-14 rounded-lg border-l-4 border-rose-500 bg-rose-50/40 p-5 dark:bg-rose-950/20">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Flame className="h-5 w-5 text-rose-600 dark:text-rose-400" aria-hidden />
          %HARD by year — and why two of these years are not data points
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
          Read the papers column first.{" "}
          {SINGLE_PAPER_YEARS.map((y) => y.year).join(" and ")} are{" "}
          <strong className="font-semibold text-foreground">
            one paper each
          </strong>{" "}
          ({SINGLE_PAPER_YEARS.map((y) => `${y.totalQ} questions`).join(" and ")}
          ). A single paper&rsquo;s difficulty split is noise, and those two
          years must not be read as the start of a trend line. The only
          readable run is {TREND_YEARS.map((y) => y.year).join(" → ")}.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border bg-card">
          <table className="w-full text-sm">
            <caption className="sr-only">
              MHT-CET Chemistry difficulty by year: papers, questions, HARD count
              and HARD share. Years with a single paper are marked as not
              readable as a trend.
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">
                  Year
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Papers
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Questions
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  HARD count
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  % HARD
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  % EASY
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Reads as trend?
                </th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {HARD_BY_YEAR.map((y) => {
                const single = y.papers === 1;
                return (
                  <tr
                    key={y.year}
                    className={`border-b last:border-b-0 ${
                      single ? "text-muted-foreground" : ""
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-3 py-2 text-left font-medium"
                    >
                      {y.year}
                    </th>
                    <td className="px-3 py-2 text-right">{y.papers}</td>
                    <td className="px-3 py-2 text-right">{y.totalQ}</td>
                    <td className="px-3 py-2 text-right">{y.hardQ}</td>
                    <td className="px-3 py-2 text-right">{y.pctHard}%</td>
                    <td className="px-3 py-2 text-right">
                      {Math.round((y.easyQ / y.totalQ) * 100)}%
                    </td>
                    <td className="px-3 py-2 text-xs">
                      {single ? "No — single paper" : "Yes"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-serif text-sm leading-relaxed text-foreground/90">
          <strong className="font-semibold text-foreground">
            HARD barely moved; EASY did.
          </strong>{" "}
          Across the years with real paper counts HARD ran {TREND_RUN}. The
          EASY column is where 2025 changed: 56% and 60% in 2023 and 2024, 42%
          in 2025, as one-glance recall questions gave way to MODERATE ones.
          Time your mocks on 2025 papers — a 2023 paper makes Chemistry look
          faster than it now is.
        </p>
      </section>

      {/* Callouts */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          The {DRIFT_CALLOUTS.length} moves worth acting on
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Each of these changes what you should be drilling this week, not just
          what you should know about the paper.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {DRIFT_CALLOUTS.map((c) => {
            const Icon =
              c.icon === "up"
                ? TrendingUp
                : c.icon === "down"
                  ? TrendingDown
                  : Flame;
            const chap = c.drill ? taxonomy.chapters.get(c.drill.chapter) : undefined;
            const subtopicId =
              c.drill?.subtopic && chap
                ? chap.subtopics.get(c.drill.subtopic)
                : undefined;
            const color =
              c.icon === "spike"
                ? "text-rose-700 dark:text-rose-400 border-rose-500/30 bg-rose-50/40 dark:bg-rose-950/20"
                : c.icon === "up"
                  ? "text-emerald-700 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20"
                  : "text-amber-700 dark:text-amber-400 border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20";
            return (
              <li key={c.title} className={`rounded-lg border-l-4 p-4 ${color}`}>
                <div className="flex items-start gap-2 text-sm font-semibold">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {c.title}
                </div>
                <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
                  {c.description}
                </p>
                {c.drill && (
                  <div className="mt-3">
                    <BrowseLink
                      examId={taxonomy.examId}
                      subjectId={taxonomy.subjectId}
                      chapterIds={chap?.id ? [chap.id] : []}
                      subtopicIds={subtopicId ? [subtopicId] : []}
                      pyqYears={c.drill.pyqYears}
                      variant="outline"
                      className="px-3 py-1 text-xs"
                    >
                      {c.drill.label}
                    </BrowseLink>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Recommendation */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6">
        <h2 className="text-lg font-semibold tracking-tight">
          Recommendation: drill 2025 for scope and pace
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          The newest papers carry the weights you will actually sit —{" "}
          {FALLING.map((r) => r.chapter).join(" and ")} down,{" "}
          {RISING.map((r) => r.chapter).join(", ")} up — and the 2025 pace.
          Use 2023-24 papers for volume. And remember there is no negative marking in this paper: every
          question is worth attempting, so the only thing these trends change
          is what you practise and in what order, never whether you answer.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {LATEST_TREND_YEAR && (
            <BrowseLink
              examId={taxonomy.examId}
              subjectId={taxonomy.subjectId}
              pyqYears={[LATEST_TREND_YEAR.year]}
            >
              Drill {LATEST_TREND_YEAR.year} ({LATEST_TREND_YEAR.totalQ} q ·{" "}
              {LATEST_TREND_YEAR.pctHard}% HARD)
            </BrowseLink>
          )}
          {PRIOR_TREND_YEAR && (
            <BrowseLink
              examId={taxonomy.examId}
              subjectId={taxonomy.subjectId}
              pyqYears={[PRIOR_TREND_YEAR.year]}
              variant="outline"
            >
              Drill {PRIOR_TREND_YEAR.year} ({PRIOR_TREND_YEAR.totalQ} q ·{" "}
              {PRIOR_TREND_YEAR.pctHard}% HARD)
            </BrowseLink>
          )}
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            pyqYears={TREND_YEARS.map((y) => y.year)}
            variant="outline"
          >
            All multi-paper years (
            {TREND_YEARS.reduce((s, y) => s + y.totalQ, 0)} q)
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/mht-cet-chemistry/reference",
          label: "Reference",
        }}
        next={{ href: "/guide/mht-cet-chemistry/traps", label: "Traps" }}
      />
    </GuideShell>
  );
}
