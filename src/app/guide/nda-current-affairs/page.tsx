import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  ListChecks,
  Newspaper,
  Sparkles,
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy, type ResolvedTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { buildBrowseUrl } from "@/lib/guide/buildBrowseUrl";
import {
  OVERVIEW,
  CHAPTER_TABLE,
  ANCHOR_THEMES,
  RECURRING_THEMES,
  OCCASIONAL_THEMES,
  HALF_LIFE_NOTICE,
  TEST_DAY_PLAN,
  type AnchorTheme,
  type RecurringTheme,
  type OccasionalTheme,
} from "./_data/nda-current-affairs";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "NDA Current Affairs — Strategy Guide",
  description:
    "How NDA Current Affairs actually works. A 180-question shape analysis of every paper from 2017 to 2026 — 90% of CA questions reference events within 12 months of the paper, so this guide teaches the recurring question SHAPES, not the historical facts. Eight anchor themes, a half-life directive, and a single drill link into the full bank.",
  alternates: { canonical: "/guide/nda-current-affairs" },
};

export default async function NdaCurrentAffairsLanding() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "Current Affairs");

  const stats = [
    {
      value: OVERVIEW.totalQ.toLocaleString("en-IN"),
      label: "Past-year questions",
    },
    {
      value: `~${OVERVIEW.avgQPerPaper}`,
      label: "Q per paper (avg)",
    },
    {
      value: `~${OVERVIEW.maxMarksPerPaper}`,
      label: "Max marks per paper",
    },
    {
      value: `${OVERVIEW.pctHard}%`,
      label: "% HARD bank-wide",
    },
  ];

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <GuideJsonLd
          type="CollectionPage"
          path="/guide/nda-current-affairs"
          headline="NDA Current Affairs — Strategy Guide"
          description="A 180-question shape analysis of NDA Current Affairs across every paper 2017–2026. 90% of CA questions reference events within 12 months of their paper, so this guide is built around stable question shapes — eight anchor themes with prep checklists, sixteen recurring themes, and seven occasional themes. Drill the bank for shape, harvest the facts externally."
        />

        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <a href="/" className="hover:text-foreground">
                Home
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden>›</span>
              <a href="/guide" className="hover:text-foreground">
                Guides
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden>›</span>
              <a href="/guide/nda" className="hover:text-foreground">
                NDA
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden>›</span>
              <span className="font-medium text-foreground">
                NDA Current Affairs
              </span>
            </li>
          </ol>
        </nav>

        <div className="mt-6 sm:mt-8">
          <GuideHero
            eyebrow="NDA Current Affairs Guide"
            title="How NDA Current Affairs actually works"
            subtitle={`A ${OVERVIEW.totalQ}-question shape analysis of NDA Current Affairs across every paper from 2017 to 2026. CA is the highest-churn topic on the GAT — about ${OVERVIEW.avgQPerPaper} q per paper, ${OVERVIEW.maxMarksPerPaper} marks at most. This guide names the recurring question SHAPES so you can prep against THIS YEAR's facts, not the bank's historical answers.`}
          >
            <StatBlock stats={stats} />
          </GuideHero>
        </div>

        <BrowseLink
          examId={taxonomy.examId}
          subjectId={taxonomy.subjectId}
          className="mt-2"
        >
          Drill all {OVERVIEW.totalQ} NDA Current Affairs questions
        </BrowseLink>

        {/* HALF-LIFE DIRECTIVE — the load-bearing framing for the whole page */}
        <section
          className="mt-10 rounded-lg border border-primary/30 bg-primary/5 p-5"
          aria-labelledby="half-life-headline"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Newspaper className="h-4 w-4" aria-hidden />
            </span>
            <div className="flex-1">
              <h2
                id="half-life-headline"
                className="text-base font-semibold tracking-tight"
              >
                {HALF_LIFE_NOTICE.headline}
              </h2>
              <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
                {HALF_LIFE_NOTICE.body.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {HALF_LIFE_NOTICE.callouts.map((c) => (
                  <div
                    key={c.label}
                    className="rounded-md border bg-background p-3"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {c.label}
                    </p>
                    <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER TABLE */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            How the {OVERVIEW.totalQ} questions break down
          </h2>
          <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
            Eight chapters across the 2017–2026 bank, sorted by question count.
            Two chapters tie at the top — International Affairs and Government
            Schemes each carry 18% of the bank. None of them is %HARD-heavy
            except National Events; this is mostly a high-volume recall
            section.
          </p>
          <div className="mt-4 overflow-x-auto rounded-md border">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="border-b bg-muted/40">
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Chapter</th>
                  <th className="px-3 py-2 text-right font-medium">
                    Questions
                  </th>
                  <th className="px-3 py-2 text-right font-medium">Share</th>
                  <th className="px-3 py-2 text-right font-medium">% HARD</th>
                  <th className="px-3 py-2 font-medium">What it tests</th>
                </tr>
              </thead>
              <tbody>
                {CHAPTER_TABLE.map((row) => (
                  <tr
                    key={row.chapter}
                    className="border-b align-top last:border-b-0"
                  >
                    <td className="px-3 py-2 font-medium">{row.chapter}</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {row.qCount}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                      {row.pctTotal.toFixed(1)}%
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                      {row.pctHard.toFixed(1)}%
                    </td>
                    <td className="px-3 py-2 font-serif text-sm leading-relaxed text-muted-foreground">
                      {row.focus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ANCHOR THEMES */}
        <section className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Anchor themes — 5+ year recurrence
            </h2>
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {ANCHOR_THEMES.reduce((a, t) => a + t.qCount, 0)} q · ~
              {Math.round(
                ANCHOR_THEMES.reduce((a, t) => a + t.qPerYearWhenPresent, 0)
              )}{" "}
              q per paper
            </span>
          </div>
          <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
            These eight themes have appeared on at least 5 of the last 10
            papers. Each card names the recurring question SHAPE, then lists
            the categories of facts you should harvest from this year&rsquo;s
            news — these are durable prep directives, not specific answers.
            The drill link practises the shape against the bank&rsquo;s
            historical instances.
          </p>
          <div className="mt-5 space-y-5">
            {ANCHOR_THEMES.map((t) => (
              <AnchorThemeCard key={t.slug} theme={t} taxonomy={taxonomy} />
            ))}
          </div>
        </section>

        {/* RECURRING THEMES */}
        <section className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Recurring themes — 3–4 year recurrence
            </h2>
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {RECURRING_THEMES.reduce((a, t) => a + t.qCount, 0)} q · ~
              {Math.round(
                RECURRING_THEMES.reduce((a, t) => a + t.qCount, 0) /
                  OVERVIEW.papers
              )}{" "}
              q per paper
            </span>
          </div>
          <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
            Sixteen themes that appear regularly but not every year. Light
            prep — track recent additions / appointments / award rounds in
            each, then drill the bank for shape.
          </p>
          <div className="mt-4 overflow-x-auto rounded-md border">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="border-b bg-muted/40">
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Theme</th>
                  <th className="px-3 py-2 font-medium">Chapter</th>
                  <th className="px-3 py-2 text-right font-medium">Q</th>
                  <th className="px-3 py-2 text-right font-medium">Years</th>
                  <th className="px-3 py-2 font-medium">Shape</th>
                  <th className="px-3 py-2 font-medium" aria-label="Drill" />
                </tr>
              </thead>
              <tbody>
                {RECURRING_THEMES.map((t) => (
                  <RecurringThemeRow
                    key={t.slug}
                    theme={t}
                    taxonomy={taxonomy}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* OCCASIONAL THEMES */}
        <section className="mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Occasional themes — 1–2 year recurrence
            </h2>
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {OCCASIONAL_THEMES.reduce((a, t) => a + t.qCount, 0)} q · drill
              if time permits
            </span>
          </div>
          <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
            Seven themes with thin bank coverage and inconsistent appearance.
            Drill once for awareness; don&rsquo;t deep-prep — these are the
            ~20 q of year-specific noise that age out fastest.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {OCCASIONAL_THEMES.map((t) => (
              <OccasionalThemeChip
                key={t.slug}
                theme={t}
                taxonomy={taxonomy}
              />
            ))}
          </ul>
        </section>

        {/* TEST-DAY PLAN */}
        <section className="mt-12 rounded-lg border bg-muted/30 p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <ListChecks className="h-4 w-4" aria-hidden />
            </span>
            <div className="flex-1">
              <h2 className="text-base font-semibold tracking-tight">
                {TEST_DAY_PLAN.headline}
              </h2>
              <ol className="mt-3 space-y-3 font-serif text-sm leading-relaxed text-muted-foreground">
                {TEST_DAY_PLAN.bullets.map((b) => (
                  <li key={b.label} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
                    />
                    <span>
                      <strong className="text-foreground">{b.label}.</strong>{" "}
                      {b.body}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* DRILL CTAs */}
        <section className="mt-12">
          <h2 className="text-base font-semibold tracking-tight">
            Drill the bank for shape
          </h2>
          <p className="mt-2 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground">
            One pass through all 180 questions gives you the shape calibration
            — the kinds of stems, the multi-statement traps, the partial-credit
            distractor patterns. Don&rsquo;t memorise the answers; they&rsquo;re
            historical.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <BrowseLink
              examId={taxonomy.examId}
              subjectId={taxonomy.subjectId}
            >
              Drill all {OVERVIEW.totalQ} questions
            </BrowseLink>
            <BrowseLink
              examId={taxonomy.examId}
              subjectId={taxonomy.subjectId}
              pyqYears={[2026, 2025, 2024]}
              variant="outline"
            >
              Drill last 3 years only
            </BrowseLink>
            <BrowseLink
              examId={taxonomy.examId}
              subjectId={taxonomy.subjectId}
              difficulties={["HARD"]}
              variant="outline"
            >
              Drill the {OVERVIEW.difficulty.hard} HARD only
            </BrowseLink>
          </div>
        </section>

        {/* WHY ONE PAGE — honest closing */}
        <section className="mt-12 rounded-lg border bg-card p-5">
          <h2 className="text-base font-semibold tracking-tight">
            Why this guide is one page
          </h2>
          <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
            <p>
              The other NDA guides on this site are 10–22 indexable pages each
              — strategy, playbooks, references, trends, traps — because each
              subject has bank shape that&rsquo;s genuinely durable. NDA
              Current Affairs doesn&rsquo;t.
            </p>
            <p>
              Building a 5-section guide here would teach you 2019 facts and
              call it strategy. The honest stance is to name the half-life
              (90% of questions reference events within 12 months of paper),
              name the recurring shapes (the eight anchor themes), and point
              you at this year&rsquo;s news — not at the bank&rsquo;s
              historical answers.
            </p>
            <p>
              The bank still pulls its weight. It calibrates question SHAPE so
              you know what kinds of facts to harvest, and it lets you drill
              the shapes (multi-statement traps, named-pair swaps,
              date-anchored stems). That&rsquo;s real prep value — just not
              the kind that lives in fact tables.
            </p>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Data snapshot:{" "}
            {new Date(OVERVIEW.asOf).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            . Numbers refresh as new papers land.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────

function AnchorThemeCard({
  theme,
  taxonomy,
}: {
  theme: AnchorTheme;
  taxonomy: ResolvedTaxonomy;
}) {
  const subtopicIds = resolveSubtopicIds(theme, taxonomy);

  return (
    <article className="rounded-lg border bg-card p-5 shadow-sm transition-colors hover:border-primary/40">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {theme.chapter}
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight">
            {theme.name}
          </h3>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-1.5 text-xs">
          <span className="inline-flex items-center rounded-full border bg-background px-2 py-0.5 font-medium tabular-nums">
            {theme.qCount} q
          </span>
          <span className="inline-flex items-center rounded-full border bg-background px-2 py-0.5 font-medium tabular-nums">
            {theme.yearsAppearing}/10 yrs
          </span>
          <span className="inline-flex items-center rounded-full border bg-background px-2 py-0.5 font-medium tabular-nums">
            ~{theme.qPerYearWhenPresent.toFixed(1)} q/yr
          </span>
        </div>
      </header>

      <div className="mt-4 space-y-4 font-serif text-sm leading-relaxed text-muted-foreground">
        <p>
          <strong className="text-foreground">Question shape.</strong>{" "}
          {theme.shape}
        </p>

        <div>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Sparkles
              className="h-3.5 w-3.5 text-primary"
              aria-hidden
            />
            Harvest from this year&rsquo;s news
          </p>
          <ul className="mt-2 space-y-1.5">
            {theme.checklist.map((item) => (
              <li key={item.slice(0, 60)} className="flex gap-2">
                <span
                  aria-hidden
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {theme.durableAnchors && theme.durableAnchors.length > 0 && (
          <div className="rounded-md border bg-muted/30 p-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground">
              <CheckCircle2
                className="h-3.5 w-3.5 text-primary"
                aria-hidden
              />
              Anchors that stay still
            </p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {theme.durableAnchors.map((a) => (
                <li key={a.slice(0, 60)} className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60"
                  />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4">
        <BrowseLink
          examId={taxonomy.examId}
          subjectId={taxonomy.subjectId}
          subtopicIds={subtopicIds}
          variant="outline"
        >
          Drill the {theme.qCount} {theme.name.split(" — ")[0]} PYQ for shape
        </BrowseLink>
      </div>
    </article>
  );
}

function RecurringThemeRow({
  theme,
  taxonomy,
}: {
  theme: RecurringTheme;
  taxonomy: ResolvedTaxonomy;
}) {
  const subtopicIds = resolveSubtopicIds(theme, taxonomy);
  const href = buildDrillHref(taxonomy, subtopicIds);

  return (
    <tr className="border-b align-top last:border-b-0">
      <td className="px-3 py-2 font-medium">{theme.name}</td>
      <td className="px-3 py-2 text-xs text-muted-foreground">
        {theme.chapter}
      </td>
      <td className="px-3 py-2 text-right tabular-nums">{theme.qCount}</td>
      <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
        {theme.yearsAppearing}
      </td>
      <td className="px-3 py-2 font-serif text-sm leading-relaxed text-muted-foreground">
        {theme.oneLineShape}
      </td>
      <td className="px-3 py-2">
        <a
          href={href}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          aria-label={`Drill ${theme.name}`}
        >
          Drill
          <ArrowRight className="h-3 w-3" aria-hidden />
        </a>
      </td>
    </tr>
  );
}

function OccasionalThemeChip({
  theme,
  taxonomy,
}: {
  theme: OccasionalTheme;
  taxonomy: ResolvedTaxonomy;
}) {
  const subtopicIds = resolveSubtopicIds(theme, taxonomy);
  const href = buildDrillHref(taxonomy, subtopicIds);

  return (
    <li>
      <a
        href={href}
        className="group flex items-center justify-between gap-3 rounded-md border bg-card px-3 py-2 transition-colors hover:border-primary/40 hover:bg-accent"
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{theme.name}</p>
          <p className="text-xs text-muted-foreground">{theme.chapter}</p>
        </div>
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
          {theme.qCount} q
        </span>
      </a>
    </li>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function resolveSubtopicIds(
  theme: {
    chapter: string;
    drillSubtopics: readonly string[];
  },
  taxonomy: ResolvedTaxonomy
): string[] {
  const chap = taxonomy.chapters.get(theme.chapter);
  if (!chap) return [];
  const ids: string[] = [];
  for (const name of theme.drillSubtopics) {
    const id = chap.subtopics.get(name);
    if (id) ids.push(id);
  }
  return ids;
}

function buildDrillHref(
  taxonomy: ResolvedTaxonomy,
  subtopicIds: string[]
): string {
  return buildBrowseUrl({
    examId: taxonomy.examId,
    subjectId: taxonomy.subjectId,
    subtopicIds,
  });
}
