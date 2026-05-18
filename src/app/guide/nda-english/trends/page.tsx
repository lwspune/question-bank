import type { Metadata } from "next";
import { TrendingDown, TrendingUp } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import DriftTable from "@/app/guide/_components/DriftTable";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { ROUTES } from "../_data/nda-english";
import { DRIFT_CALLOUTS, DRIFT_ROWS, YEARS } from "../_data/trends";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA English Trends — How the GAT shifted (2017–2026)",
  description:
    "Year-by-year chapter drift in NDA English across 18 papers. Grammar exploded post-2024 (0 to 40 q/year). Spotting Errors went silent 2024–25. Cloze returned in 2024 after a 6-year gap. Practice the recent papers first.",
  alternates: { canonical: "/guide/nda-english/trends" },
};

export default async function Trends() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "English");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/nda-english/${r.slug}` : "/guide/nda-english",
    label: r.label,
  }));

  const stats = [
    { value: "10", label: "years analysed" },
    { value: "18", label: "papers" },
    { value: "900", label: "questions tagged" },
    { value: "8", label: "chapters tracked" },
  ];

  // Adapt the DriftRow type to what DriftTable expects (it uses `principle`).
  const driftTableRows = DRIFT_ROWS.map((r) => ({
    principle: r.chapter,
    counts: r.counts,
  }));

  return (
    <GuideShell
      guideTitle="NDA English Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-english"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-english", label: "NDA English" },
        { label: "Trends" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-english/trends"
        headline="NDA English Trends — How the GAT shifted (2017–2026)"
        description="Year-by-year chapter drift in NDA English across 18 papers. Grammar exploded post-2024. Spotting Errors went silent 2024–25. Cloze returned in 2024 after a 6-year gap."
      />
      <GuideHero
        eyebrow="Trends"
        title="NDA English 2026 is not the NDA English from 2017"
        subtitle="The chapter mix has shifted dramatically over the 10-year window. Grammar exploded, Spotting Errors went quiet, Cloze returned after a 6-year gap. If you only practiced one cohort of papers, you have a blind spot."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* The shifts */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          The {DRIFT_CALLOUTS.length} biggest shifts
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Four chapters have visibly moved across the 2017–2026 window — two
          on the rise (Grammar, Cloze), two in decline (Errors, FIB).
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {DRIFT_CALLOUTS.map((c) => {
            const Icon = c.icon === "up" ? TrendingUp : TrendingDown;
            const chap = c.drill ? taxonomy.chapters.get(c.drill.chapter) : undefined;
            const subtopicId =
              c.drill?.subtopic && chap
                ? chap.subtopics.get(c.drill.subtopic)
                : undefined;
            const color =
              c.icon === "up"
                ? "text-emerald-700 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20"
                : "text-rose-700 dark:text-rose-400 border-rose-500/30 bg-rose-50/40 dark:bg-rose-950/20";
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
          Counts per year (NDA-1 + NDA-2 combined; 2020 NDA-2 was
          COVID-cancelled, 2026 NDA-2 not yet held). Cells are tinted by row
          magnitude — your eye picks up the slope without a chart.
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
          The 2024 format change is the biggest single discontinuity in the
          10-year window. Grammar went from ~0 to 30+ q/year, Cloze returned,
          Spotting Errors disappeared. Pre-2024 papers will undertrain you on
          Sentence Completion and Connectors — two playbooks that are
          essentially post-2024 inventions.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            pyqYears={[2026]}
          >
            Drill 2026 (50 q)
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            pyqYears={[2025]}
            variant="outline"
          >
            Drill 2025 (100 q)
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            pyqYears={[2024, 2025, 2026]}
            variant="outline"
          >
            Last 3 years (250 q)
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/nda-english/vocab-families",
          label: "Vocab Families",
        }}
        next={{ href: "/guide/nda-english/traps", label: "Traps" }}
      />
    </GuideShell>
  );
}
