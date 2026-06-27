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
import { ROUTES } from "../_data/nda-chemistry";
import {
  TRAPS_BY_BUCKET,
  TRAP_HEADLINE,
  TRAP_SHAPES,
} from "../_data/traps";
import { PLAYBOOKS } from "../_data/playbooks";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "NDA Chemistry Traps — Distractor patterns NDA reuses",
  description:
    "How candidates who know chemistry still lose marks. Acid-source swap (oxalic vs citric), diamond-vs-graphite property flip, scientist–discovery swap, reducing-vs-oxidising agent confusion, oxide-classification error, ionic-vs-covalent cutoff — measured against the live 262-question bank.",
  alternates: { canonical: "/guide/nda-chemistry/traps" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-chemistry/${r.slug}` : "/guide/nda-chemistry",
  label: r.label,
}));

const BUCKET_LABEL = {
  recall:
    "Recall traps (Carbon · Matter · Industrial · Metals · Hydrogen · Everyday Life)",
  rule: "Rule traps (Atomic Structure · Acids/Bases/Salts · Reactions · Bonding)",
  calculate: "Calculate traps (Mole Concept and Stoichiometry)",
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
      guideTitle="NDA Chemistry Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-chemistry"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-chemistry", label: "NDA Chemistry" },
        { label: "Traps" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-chemistry/traps"
        headline="NDA Chemistry Traps — Distractor patterns NDA reuses"
        description="How candidates who know chemistry still lose marks. Acid-source swap, diamond-graphite property flip, scientist-discovery swap, reducing-vs-oxidising agent confusion."
      />
      <GuideHero
        eyebrow="Traps"
        title="How NDA loses you marks even when you know the chemistry"
        subtitle="Chemistry distractors are about IDENTITY CONFUSION — which compound is which, which acid from which fruit, which oxide type is which, which is the reducing agent vs oxidising agent. Different from Physics (formula misapplication) and English (semantic near-synonyms). Each trap below is illustrated on a real PYQ where one exists."
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

      {(["recall", "rule", "calculate"] as const).map((bucket) => {
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
                            href={`/guide/nda-chemistry/playbooks/${slug}`}
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
          Chemistry&rsquo;s verification habit is different from Physics &mdash; there&rsquo;s
          no unit-check or sign-check. The lever is paired-fact recall (source
          ↔ compound; reducing agent ↔ what gets oxidised; oxide class ↔
          metal/non-metal). Always state the pair explicitly before picking
          an option.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              10 seconds (Recall)
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Name → property check
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Diamond → insulator. Graphite → conductor. Oxalic → tomatoes.
              Citric → lemons. State both halves of the pair before picking.
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              20 seconds (Rule)
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Direction check
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Periodic trend — across or down? IE ↑ across, ↓ down. Reducing
              agent — gets oxidised (ox-state ↑). Worked through a test case
              (Li vs F) before committing.
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              30 seconds (Calculate)
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Formula re-check
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Equivalent weight = molar mass / valency factor. Did you divide
              by basicity for the polyprotic acid? Did you use molecule vs
              atom mass as the question asked?
            </p>
          </div>
        </div>
        <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">
            The 10-second pair-check is the highest-leverage habit.
          </strong>{" "}
          Most Chemistry distractors fall to it. A guess at 5 seconds without
          the pair-check is negative-EV; a 10-second pair-check + skip is
          strictly better.
        </p>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/nda-chemistry/trends", label: "Trends" }}
        next={{ href: "/guide/nda-chemistry", label: "Back to Overview" }}
      />
    </GuideShell>
  );
}
