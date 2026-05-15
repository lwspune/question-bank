import type { Metadata } from "next";
import { TrendingDown, TrendingUp } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import DriftTable from "@/app/guide/_components/DriftTable";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { ROUTES } from "../_data/nda-maths";
import { DRIFT_CALLOUTS, DRIFT_ROWS, YEARS } from "../_data/trends";

export const metadata: Metadata = {
  title: "NDA Mathematics Trends — How the exam shifted (2021–2026)",
  description:
    "Year-by-year principle drift in NDA Maths. Modulus jumped 4 → 15 in 2023. Vieta declined 13 → 5. Cube roots of unity appeared post-2022. Practice recent papers first.",
  alternates: { canonical: "/guide/nda-maths/trends" },
};

export default async function Trends() {
  const supabase = createSupabaseServerClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "Mathematics");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
    label: r.label,
  }));

  const stats = [
    { value: "6", label: "years analysed" },
    { value: "11", label: "papers" },
    { value: "1,320", label: "questions tagged" },
    { value: "13", label: "principles tracked" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Mathematics Guide"
      sideNav={sideNav}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda-maths", label: "NDA Mathematics" },
        { label: "Trends" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-maths/trends"
        headline="NDA Mathematics Trends — How the exam shifted (2021–2026)"
        description="Year-by-year principle drift in NDA Maths. Modulus jumped 4 → 15 in 2023. Vieta declined 13 → 5. Cube roots of unity appeared post-2022. Practice recent papers first."
      />
      <GuideHero
        eyebrow="Trends"
        title="NDA Mathematics 2025 is not the NDA Mathematics from 2021"
        subtitle="The bank's principle distribution drifts year over year. A 5-year average misleads — the most recent papers are the more accurate forecast of the next one."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* The big shifts */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          The 4 biggest shifts
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Four principles have visibly moved between 2021 and 2026 — two on the
          rise, two in decline. If you only practiced one cohort of papers, you
          have a blind spot.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {DRIFT_CALLOUTS.map((c) => {
            const Icon = c.icon === "up" ? TrendingUp : TrendingDown;
            const chap = c.drill ? taxonomy.chapters.get(c.drill.chapter ?? "") : undefined;
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
          Counts per paper-set (240 q each for 2021–2025, 120 q for 2026 since
          NDA 2 hasn&rsquo;t happened yet). Cells are tinted by row magnitude — your
          eye picks up the slope without a chart.
        </p>
        <div className="mt-4">
          <DriftTable rows={DRIFT_ROWS} years={YEARS} />
        </div>
      </section>

      {/* Recommendation */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6">
        <h2 className="text-lg font-semibold tracking-tight">
          Recommendation: practice 2025 and 2026 papers first
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          The 2021 paper was the easiest and least representative of where
          NDA is now. The 2023–24 papers were the hardest. 2025 was a bit
          softer; 2026 NDA 1 is trending back up. Calibrate against the
          recent two years before tackling older ones.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            pyqYears={[2025]}
          >
            Drill 2025 papers (240 q)
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            pyqYears={[2026]}
            variant="outline"
          >
            Drill 2026 NDA 1 (120 q)
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            pyqYears={[2024, 2025, 2026]}
            variant="outline"
          >
            Last 3 years (600 q)
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/nda-maths/compound-tricks",
          label: "Compound Tricks",
        }}
        next={{ href: "/guide/nda-maths/traps", label: "Traps" }}
      />
    </GuideShell>
  );
}
