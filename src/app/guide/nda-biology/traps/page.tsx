import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Target } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import WorkedExampleCard from "@/app/guide/_components/WorkedExampleCard";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { loadWorkedExamples } from "@/lib/guide/loadWorkedExamples";
import { ROUTES } from "../_data/nda-biology";
import {
  TRAPS_BY_BUCKET,
  TRAP_HEADLINE,
  TRAP_SHAPES,
} from "../_data/traps";
import { PLAYBOOKS } from "../_data/playbooks";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "NDA Biology Traps — Distractor patterns NDA reuses",
  description:
    "How candidates who know biology still lose marks. Disease↔pathogen swap (malaria-Mycobacterium), vitamin↔deficiency swap, hormone↔gland swap, RNA-vs-DNA virus identity, monocot↔dicot trait flip, multi-statement partial-credit traps — measured against the live 190-question bank.",
  alternates: { canonical: "/guide/nda-biology/traps" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-biology/${r.slug}` : "/guide/nda-biology",
  label: r.label,
}));

const BUCKET_LABEL = {
  recall:
    "Recall traps (Human Physiology · Cell Biology · Microbiology · Biodiversity · Genetics)",
  apply: "Apply traps (Plant Biology · Reproduction · Cell Biology osmosis)",
  verify: "Verify traps (Ecology · Biochemistry · multi-statement everywhere)",
} as const;

export default async function Traps() {
  const supabase = createSupabaseAnonClient();
  const exampleIds = TRAP_SHAPES.map((t) => t.exampleQuestionId).filter(
    (id): id is string => Boolean(id)
  );
  const examples = await loadWorkedExamples(supabase, exampleIds);
  const examplesById = new Map(examples.map((e) => [e.id, e] as const));

  const playbookName = (slug: string) =>
    PLAYBOOKS.find((p) => p.slug === slug)?.name ?? slug;

  const stats = [
    { value: String(TRAP_HEADLINE.shapes), label: "trap shapes" },
    { value: "3", label: "skill strands affected" },
    {
      value: String(TRAP_HEADLINE.topAffects),
      label: "playbooks per top trap",
    },
    { value: String(examples.length), label: "worked examples below" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Biology Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-biology"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-biology", label: "NDA Biology" },
        { label: "Traps" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-biology/traps"
        headline="NDA Biology Traps — Distractor patterns NDA reuses"
        description="How candidates who know biology still lose marks. Disease-pathogen swap, vitamin-deficiency swap, hormone-gland swap, RNA-vs-DNA virus identity, monocot-dicot trait flip."
      />
      <GuideHero
        eyebrow="Traps"
        title="How NDA loses you marks even when you know the biology"
        subtitle="Biology distractors are about PAIRED-FACT SWAP — disease↔pathogen, vitamin↔deficiency, hormone↔gland, scientist↔discovery, organelle↔function, virus-vs-bacterium identity. Different from Chemistry (compound identity) and Physics (formula misapplication). Each trap below is illustrated on a real PYQ where one exists."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* How to read */}
      <section className="mt-10 rounded-lg border-l-4 border-amber-500 bg-amber-50/40 p-5 dark:bg-amber-950/20">
        <h2 className="text-base font-semibold tracking-tight">
          How to use this page
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
          Read once cover-to-cover. Then re-read the strand relevant to your
          next practice session — the trap is far easier to spot when
          you&rsquo;ve just been primed on its mechanism. NDA recycles these
          same shapes year after year; pattern recognition pays.
        </p>
      </section>

      {(["recall", "apply", "verify"] as const).map((bucket) => {
        const list = TRAPS_BY_BUCKET[bucket];
        if (list.length === 0) return null;
        return (
          <section key={bucket} className="mt-12">
            <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
              <AlertTriangle className="h-5 w-5 text-primary" aria-hidden />
              {BUCKET_LABEL[bucket]}
            </h2>
            <div className="mt-6 space-y-6">
              {list.map((trap) => {
                const example = trap.exampleQuestionId
                  ? examplesById.get(trap.exampleQuestionId)
                  : undefined;
                return (
                  <article
                    key={trap.id}
                    className="rounded-lg border bg-card p-5 shadow-sm"
                  >
                    <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                      {trap.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Affects:{" "}
                      {trap.affects.map((slug, i) => (
                        <span key={slug}>
                          <Link
                            href={`/guide/nda-biology/playbooks/${slug}`}
                            className="text-primary hover:underline"
                          >
                            {playbookName(slug)}
                          </Link>
                          {i < trap.affects.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                    <div className="mt-4 space-y-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          The mechanic
                        </p>
                        <p className="mt-1 font-serif text-sm leading-relaxed text-foreground/90">
                          {trap.mechanic}
                        </p>
                      </div>
                      <div className="rounded-md border-l-4 border-emerald-500/60 bg-emerald-50/40 p-3 dark:bg-emerald-950/20">
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                          <Target className="h-3.5 w-3.5" aria-hidden /> The fix
                        </p>
                        <p className="mt-1 font-serif text-sm leading-relaxed text-foreground/90">
                          {trap.fix}
                        </p>
                      </div>
                    </div>
                    {example && (
                      <div className="mt-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Worked example from the bank
                        </p>
                        <WorkedExampleCard rank={1} example={example} />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Verification habits */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6">
        <h2 className="text-lg font-semibold tracking-tight">
          The 3-tier verification habit
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          Biology&rsquo;s verification habit is different from Physics &mdash; there&rsquo;s
          no unit-check or sign-check. The lever is paired-fact recall (disease
          ↔ pathogen; vitamin ↔ deficiency; hormone ↔ gland). Always state BOTH
          halves of the pair explicitly before picking an option.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              10 seconds (Recall)
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Name → pair check
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Malaria → Plasmodium. TB → Mycobacterium. Vitamin C → scurvy.
              Insulin → pancreas. State both halves of the pair before picking.
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              25 seconds (Apply)
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Mechanism trace
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Photosynthesis: write inputs + outputs + site. Osmosis: state
              gradient (high water → low water). Pollination: write the 2n + n
              = 3n endosperm arithmetic.
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              60 seconds (Verify)
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Statement-by-statement T/F
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Read each statement INDEPENDENTLY. Write T/F next to each. Then
              match to the option that lists EXACTLY your T set. Don&rsquo;t pick
              partial recognition — uncertain statements make the whole
              question uncertain.
            </p>
          </div>
        </div>
        <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">
            The 10-second pair-check is the highest-leverage habit.
          </strong>{" "}
          Most Biology distractors fall to it. A guess at 5 seconds without
          the pair-check is negative-EV; a 10-second pair-check + skip is
          strictly better.
        </p>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/nda-biology/trends", label: "Trends" }}
        next={{ href: "/guide/nda-biology", label: "Back to Overview" }}
      />
    </GuideShell>
  );
}
