import type { Metadata } from "next";
import { Minus, TrendingDown, TrendingUp, Activity } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import DriftTable from "@/app/guide/_components/DriftTable";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { ROUTES } from "../_data/nda-geography";
import { DRIFT_CALLOUTS, DRIFT_ROWS, HARD_BY_YEAR, YEARS } from "../_data/trends";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA Geography Trends — How the paper drifted (2017–2026)",
  description:
    "Year-by-year chapter drift in NDA PART A Geography across 18 papers. UNLIKE Physics, the paper has NOT consistently hardened — %HARD bounces 6% to 42% with no monotonic trajectory. Climatology grew 2024–25, Earth's Structure has dominated since 2021. Drill all 10 years equally.",
  alternates: { canonical: "/guide/nda-geography/trends" },
};

export default async function Trends() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "Geography");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/nda-geography/${r.slug}` : "/guide/nda-geography",
    label: r.label,
  }));

  const stats = [
    { value: "10", label: "years analysed" },
    { value: "18", label: "papers" },
    { value: "345", label: "questions tagged" },
    { value: "7", label: "chapters tracked" },
  ];

  const driftTableRows = DRIFT_ROWS.map((r) => ({
    principle: r.chapter,
    counts: r.counts,
  }));

  return (
    <GuideShell
      guideTitle="NDA Geography Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-geography"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-geography", label: "NDA Geography" },
        { label: "Trends" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-geography/trends"
        headline="NDA Geography Trends — How the paper drifted (2017–2026)"
        description="Year-by-year chapter drift in NDA PART A Geography across 18 papers. The paper has NOT consistently hardened. Climatology grew 2024–25, Earth's Structure has dominated since 2021."
      />
      <GuideHero
        eyebrow="Trends"
        title="NDA Geography 2026 is structurally similar to NDA Geography 2017"
        subtitle="The most important pattern in NDA Geography trends is the ABSENCE of a monotonic one — UNLIKE Physics (which hardened 22× per question), Geography has bounced 6% to 42% HARD across the 10-year window with no trajectory. 2018 was an outlier high; 2025 hardened again; 2019 + 2021 were unusually easy. Chapter mix has shifted (Climatology + Earth's Structure grew, World/Human faded), but the difficulty floor is stable. Drill all 10 years equally."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* The headline NON-hardening callout */}
      <section className="mt-12 rounded-lg border-l-4 border-emerald-500 bg-emerald-50/40 p-5 dark:bg-emerald-950/20">
        <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" aria-hidden />
          The headline: %HARD by year (no monotonic trend)
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
          Each year&rsquo;s HARD share, with the paper-set size for context.
          2020 had only NDA-1 (COVID), 2026 has only NDA-1 so far. Notice the
          oscillation — 2018 had 16 HARDs (42% — the peak); 2019 had only 2
          HARDs (6% — the trough); 2025 hardened again (12 HARD · 30%). No
          monotonic trajectory.
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
                const isPeak = y.pctHard >= 25;
                const isLow = y.pctHard <= 10;
                return (
                  <tr
                    key={y.year}
                    className={`border-b last:border-b-0 ${
                      isPeak
                        ? "bg-amber-50/60 font-medium text-amber-900 dark:bg-amber-950/30 dark:text-amber-200"
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
            Per-question, the 2026 paper is no harder than the 2017 paper.
          </strong>{" "}
          Translation: don&rsquo;t over-weight recent papers. Drill 2017 papers as
          seriously as 2024 papers; the difficulty floor is stable, only the
          year-to-year variance is high. The Recall + Apply + Verify strands
          are tested in roughly the same proportions year-to-year.
        </p>
      </section>

      {/* The shifts */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          The {DRIFT_CALLOUTS.length} biggest shifts
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          %HARD is wavy but the chapter mix has shifted in concrete ways.
          These four shifts come on top of the noisy difficulty — drill the
          called-out cohorts.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {DRIFT_CALLOUTS.map((c) => {
            const Icon =
              c.icon === "up"
                ? TrendingUp
                : c.icon === "down"
                  ? TrendingDown
                  : c.icon === "spike"
                    ? Activity
                    : Minus;
            const chap = c.drill ? taxonomy.chapters.get(c.drill.chapter) : undefined;
            const subtopicId =
              c.drill?.subtopic && chap
                ? chap.subtopics.get(c.drill.subtopic)
                : undefined;
            const color =
              c.icon === "spike"
                ? "text-amber-700 dark:text-amber-400 border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20"
                : c.icon === "up"
                  ? "text-emerald-700 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20"
                  : c.icon === "down"
                    ? "text-slate-700 dark:text-slate-300 border-slate-500/30 bg-slate-50/40 dark:bg-slate-950/20"
                    : "text-blue-700 dark:text-blue-400 border-blue-500/30 bg-blue-50/40 dark:bg-blue-950/20";
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
          Recommendation: drill across ALL 10 years
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          UNLIKE Physics, NDA Geography doesn&rsquo;t reward a &lsquo;recent-only&rsquo;
          drill plan. Old papers test the same recall + apply + verify
          material at similar difficulty (noisy year-to-year but no
          trajectory). The exceptions: Climatology grew dramatically in
          2024–25 — drill that cohort with extra weight if your prep predates
          2024. Earth&rsquo;s Structure has dominated since 2021 — drill the
          2021–26 cohort for chapter calibration.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            pyqYears={[2024, 2025, 2026]}
          >
            Drill 2024–2026 (99 q · the recent cohort)
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            pyqYears={[2017, 2018, 2019]}
            variant="outline"
          >
            Drill 2017–2019 (113 q · the older cohort)
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            variant="outline"
          >
            Browse all 10 years
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/nda-geography/reference-tables",
          label: "Reference tables",
        }}
        next={{ href: "/guide/nda-geography/traps", label: "Traps" }}
      />
    </GuideShell>
  );
}
