import type { Metadata } from "next";
import { Flame, TrendingDown, TrendingUp } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import DriftTable from "@/app/guide/_components/DriftTable";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { ROUTES } from "../_data/nda-physics";
import { DRIFT_CALLOUTS, DRIFT_ROWS, HARD_BY_YEAR, YEARS } from "../_data/trends";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA Physics Trends — How the paper shifted (2017–2026)",
  description:
    "Year-by-year chapter drift in NDA PART B Physics across 18 papers. The paper HARDENED 22× per question — HARD share went from 2% (2021) to 44% (2026 NDA-1). E&M tripled in 2022. Laws of Motion grew 3× in 2023–24.",
  alternates: { canonical: "/guide/nda-physics/trends" },
};

export default async function Trends() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "Physics");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/nda-physics/${r.slug}` : "/guide/nda-physics",
    label: r.label,
  }));

  const stats = [
    { value: "10", label: "years analysed" },
    { value: "18", label: "papers" },
    { value: "449", label: "questions tagged" },
    { value: "14", label: "chapters tracked" },
  ];

  const driftTableRows = DRIFT_ROWS.map((r) => ({
    principle: r.chapter,
    counts: r.counts,
  }));

  return (
    <GuideShell
      guideTitle="NDA Physics Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-physics"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-physics", label: "NDA Physics" },
        { label: "Trends" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-physics/trends"
        headline="NDA Physics Trends — How the paper shifted (2017–2026)"
        description="Year-by-year chapter drift in NDA PART B Physics across 18 papers. The paper hardened 22× per question. E&M tripled in 2022. Laws of Motion grew 3× in 2023–24."
      />
      <GuideHero
        eyebrow="Trends"
        title="NDA Physics 2026 is not the NDA Physics from 2021"
        subtitle="Two structural shifts dominate the 2017–2026 window: a chapter-mix reweighting (E&M tripled, Laws of Motion grew 3×, Modern Physics faded) and — far more important — a difficulty hardening. Per-question, the 2026 paper is ~22× more difficulty-dense than 2021. If you only practiced one cohort of papers, you have a blind spot."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* The headline hardening callout */}
      <section className="mt-12 rounded-lg border-l-4 border-rose-500 bg-rose-50/40 p-5 dark:bg-rose-950/20">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Flame className="h-5 w-5 text-rose-600 dark:text-rose-400" aria-hidden />
          The headline: %HARD by year
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
          The single most important pattern in NDA Physics. Each year&rsquo;s
          HARD share, with the paper-set size for context (2020 had only
          NDA-1 due to COVID, 2026 has only NDA-1 so far).
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2 font-medium">Year</th>
                <th className="px-3 py-2 text-right font-medium">Questions</th>
                <th className="px-3 py-2 text-right font-medium">HARD count</th>
                <th className="px-3 py-2 text-right font-medium">% HARD</th>
              </tr>
            </thead>
            <tbody className="tabular-nums">
              {HARD_BY_YEAR.map((y) => {
                const isPeak = y.pctHard >= 40;
                const isLow = y.pctHard <= 5;
                return (
                  <tr
                    key={y.year}
                    className={`border-b last:border-b-0 ${
                      isPeak
                        ? "bg-rose-50/60 font-semibold text-rose-800 dark:bg-rose-950/30 dark:text-rose-300"
                        : isLow
                          ? "bg-emerald-50/50 dark:bg-emerald-950/20"
                          : ""
                    }`}
                  >
                    <td className="px-3 py-2">{y.year}</td>
                    <td className="px-3 py-2 text-right">{y.totalQ}</td>
                    <td className="px-3 py-2 text-right">{y.hardQ}</td>
                    <td className="px-3 py-2 text-right">{y.pctHard}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-serif text-sm leading-relaxed text-foreground/90">
          <strong className="font-semibold text-foreground">
            Per-question, the 2026 paper is 22× more HARD-dense than 2021.
          </strong>{" "}
          Translation: drill the most recent papers, not the oldest. Use
          2017–2021 for chapter recall + formula practice; use 2023–2026 for
          HARD-pool calibration.
        </p>
      </section>

      {/* The shifts */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          The {DRIFT_CALLOUTS.length} biggest shifts
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          The hardening above is the structural shift. These four chapter-mix
          shifts come on top — drill the called-out cohorts.
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
              <li
                key={c.title}
                className={`rounded-lg border-l-4 p-4 ${color}`}
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Icon className="h-4 w-4" aria-hidden />
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

      {/* Drift table */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Year-by-year drift
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Counts per year (NDA-1 + NDA-2 combined; 2020 NDA-2 COVID-cancelled,
          2026 NDA-2 not yet held — so those columns hold ~half a normal
          year). Cells are tinted by row magnitude.
        </p>
        <div className="mt-4">
          <DriftTable rows={driftTableRows} years={YEARS} rowLabel="Chapter" />
        </div>
      </section>

      {/* Recommendation */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6">
        <h2 className="text-lg font-semibold tracking-tight">
          Recommendation: drill 2024+ papers FIRST
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          The 2024–2026 cohort carries the HARD-hardening signal and the new
          chapter-mix (E&M ~12/yr, Laws of Motion ~6/yr). Pre-2022 papers
          undertrain you on circuit-combination reasoning and on the calorimetry
          / fluid-mechanics HARD pools. Calibrate on recent first, then back-fill
          formula practice from the older years.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            pyqYears={[2026]}
          >
            Drill 2026 (25 q · 44% HARD)
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            pyqYears={[2024]}
            variant="outline"
          >
            Drill 2024 (50 q · 28% HARD)
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            pyqYears={[2024, 2025, 2026]}
            variant="outline"
          >
            Last 3 years (125 q)
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/nda-physics/formulas",
          label: "Formula compendium",
        }}
        next={{ href: "/guide/nda-physics/traps", label: "Traps" }}
      />
    </GuideShell>
  );
}
