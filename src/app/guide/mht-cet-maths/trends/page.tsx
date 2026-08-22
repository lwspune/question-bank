import type { Metadata } from "next";
import { Flame, TrendingDown, TrendingUp } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { OVERVIEW, ROUTES } from "../_data/mht-cet-maths";
import {
  DRIFT_CALLOUTS,
  DRIFT_ROWS,
  HARD_BY_YEAR,
  YEARS,
  type DriftRow,
  type DriftWindow,
} from "../_data/trends";

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

const DROPPED = DRIFT_ROWS.find((r) => r.direction === "dropped");
const ENTERED = DRIFT_ROWS.find((r) => r.direction === "entered");

export const metadata: Metadata = {
  title: `MHT-CET Maths Trends — the 2025 syllabus moved (${YEARS[0]}–${YEARS[YEARS.length - 1]})`,
  description: `What changed across ${TOTAL_PAPERS} MHT-CET shifts and ${TOTAL_Q} past-year Maths questions. Measures of Dispersion ran 1.0 question a paper for two years and then scored zero across all 14 papers of 2025; Conic Sections went from 3 questions in the whole bank to 16 in 2025 alone. Shift counts differ wildly by year, so every comparison here is a per-paper rate, not a raw count.`,
  alternates: { canonical: "/guide/mht-cet-maths/trends" },
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
  const taxonomy = await resolveTaxonomy(supabase, "MHT-CET", "Maths");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/mht-cet-maths/${r.slug}` : "/guide/mht-cet-maths",
    label: r.label,
  }));

  const stats = [
    { value: String(YEARS.length), label: "years analysed" },
    { value: String(TOTAL_PAPERS), label: "shifts (papers)" },
    { value: String(TOTAL_Q), label: "questions tagged" },
    { value: String(OVERVIEW.chapters), label: "chapters tracked" },
  ];

  return (
    <GuideShell
      guideTitle="MHT-CET Maths Guide"
      sideNav={sideNav}
      landingHref="/guide/mht-cet-maths"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/mht-cet", label: "MHT-CET" },
        { href: "/guide/mht-cet-maths", label: "Mathematics" },
        { label: "Trends" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/mht-cet-maths/trends"
        headline={`MHT-CET Maths Trends — the 2025 syllabus moved (${YEARS[0]}–${YEARS[YEARS.length - 1]})`}
        description={`What changed across ${TOTAL_PAPERS} MHT-CET shifts and ${TOTAL_Q} past-year Maths questions. Measures of Dispersion dropped to zero in 2025; Conic Sections entered. Every comparison is a per-paper rate, because shift counts differ wildly by year.`}
      />
      <GuideHero
        eyebrow="Trends"
        title="The 2025 paper is not the paper you are practising from"
        subtitle={`MHT-CET moved its syllabus for 2025 and the move is invisible unless you date your practice papers. One chapter left the paper entirely and another arrived. Everything below is measured across ${TOTAL_PAPERS} shifts and ${TOTAL_Q} questions from ${YEARS[0]} to ${YEARS[YEARS.length - 1]}.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* Read-this-first: why rates, not counts */}
      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="text-base font-semibold tracking-tight">
          Read this before you read a number on this page
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
          MHT-CET is a multi-shift exam and the shift count per year is wildly
          uneven —{" "}
          {HARD_BY_YEAR.map(
            (y) => `${y.year} = ${y.papers} ${y.papers === 1 ? "shift" : "shifts"}`
          ).join(", ")}
          . A raw question count therefore means nothing across years: a
          chapter can carry more questions in a 17-shift year than in a
          14-shift year while sitting at exactly the same weight per paper.
          Every comparable figure below is a{" "}
          <strong className="font-semibold text-foreground">
            questions-per-paper rate
          </strong>
          , and where only a raw count was verified we say so and print a dash
          rather than dividing one out.
        </p>
      </section>

      {/* The headline: the 2025 syllabus move */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          The headline: one chapter left, one arrived
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          This is the whole reason to read this page. Prep off{" "}
          {DROPPED?.from.label ?? "the older"} papers alone and you spend
          revision time on a chapter that no longer appears, then walk into a
          chapter you have never seen.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {DROPPED && (
            <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50/40 p-5 dark:bg-rose-950/20">
              <div className="flex items-center gap-2 text-sm font-semibold text-rose-800 dark:text-rose-300">
                <TrendingDown className="h-4 w-4" aria-hidden />
                Dropped: {DROPPED.chapter}
              </div>
              <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
                {rateLabel(DROPPED.from)} across {DROPPED.from.label} (
                {DROPPED.from.shifts} shifts), then{" "}
                {rateLabel(DROPPED.to)} across all {DROPPED.to.shifts} papers
                of {DROPPED.to.label}. At {DROPPED.pctHard}% HARD over{" "}
                {DROPPED.lifetimeQCount} lifetime questions it looks like the
                best deal on the paper, which is exactly what makes it
                expensive. Give it no revision time.
              </p>
            </div>
          )}
          {ENTERED && (
            <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50/40 p-5 dark:bg-emerald-950/20">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                <TrendingUp className="h-4 w-4" aria-hidden />
                Entered: {ENTERED.chapter}
              </div>
              <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
                {ENTERED.from.qInWindow} questions across the{" "}
                {ENTERED.from.shifts} shifts {ENTERED.from.label}, then{" "}
                {ENTERED.to.qInWindow} in the {ENTERED.to.shifts} shifts of{" "}
                {ENTERED.to.label}. It is {ENTERED.pctHard}% HARD, so it is not
                a chapter you can pick up in the hall — drill it from{" "}
                {ENTERED.to.label} papers specifically.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Verified chapter drift */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Verified chapter drift
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          The {DRIFT_ROWS.length} chapters with a verified two-window story.
          There is no per-chapter-per-year matrix for this bank, so this list
          is deliberately short rather than padded out with plausible-looking
          cells — a number printed here reads as measured, and every one of
          these is. Each window names its own shift count, because that is
          what makes the two rates comparable.
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
          Where a window shows a dash, only a raw count was verified for it and
          no rate is claimed. Note also that a lifetime window{" "}
          <em>contains</em> the recent window it is compared against, so those
          two rows understate the move — the direction is real, the size is a
          floor.
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
              MHT-CET Maths difficulty by year: shifts, questions, HARD count
              and HARD share. Years with a single shift are marked as not
              readable as a trend.
            </caption>
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-3 py-2 font-medium">
                  Year
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Papers (shifts)
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
            The paper is not steadily hardening.
          </strong>{" "}
          Across the years with real shift counts it ran {TREND_RUN} — it
          hardened into the middle of the run and then eased. That matters for
          planning: the hardest year is the wrong year to calibrate against on
          its own, because it over-prepares you for difficulty and
          under-prepares you for the current syllabus.
        </p>
      </section>

      {/* Callouts */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          The {DRIFT_CALLOUTS.length} shifts worth acting on
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
          Recommendation: drill {ENTERED?.to.label ?? "the newest year"} for
          scope, the hardest year for depth
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          The newest papers carry the syllabus you will actually sit —{" "}
          {ENTERED?.chapter ?? "the entering chapter"} in,{" "}
          {DROPPED?.chapter ?? "the dropped chapter"} out — so they set your
          scope. The hardest year in the bank sets your depth. Do both, in that
          order, and remember there is no negative marking in this paper: every
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
            All multi-shift years (
            {TREND_YEARS.reduce((s, y) => s + y.totalQ, 0)} q)
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/mht-cet-maths/formulas",
          label: "Formula compendium",
        }}
        next={{ href: "/guide/mht-cet-maths/traps", label: "Traps" }}
      />
    </GuideShell>
  );
}
