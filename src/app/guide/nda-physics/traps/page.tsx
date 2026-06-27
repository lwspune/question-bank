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
import { ROUTES } from "../_data/nda-physics";
import {
  TRAPS_BY_BUCKET,
  TRAP_HEADLINE,
  TRAP_SHAPES,
} from "../_data/traps";
import { PLAYBOOKS } from "../_data/playbooks";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "NDA Physics Traps — Distractor patterns NDA reuses",
  description:
    "How candidates who know the formulas still lose marks. Mirror/lens sign-flip, TIR direction, mass in pendulum, CGS/SI mix, parallel-vs-series swap, latent-heat omission, density mixing mean confusion — measured against the live 449-question bank.",
  alternates: { canonical: "/guide/nda-physics/traps" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-physics/${r.slug}` : "/guide/nda-physics",
  label: r.label,
}));

const BUCKET_LABEL = {
  recall: "Recall traps (Sound · Modern · Astronomy · Energy · Units)",
  apply: "Apply traps (Light · Mechanics · WEP · Gravity · SHM)",
  reason: "Reason traps (E&M · Heat · Fluid Mechanics)",
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
      guideTitle="NDA Physics Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-physics"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-physics", label: "NDA Physics" },
        { label: "Traps" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-physics/traps"
        headline="NDA Physics Traps — Distractor patterns NDA reuses"
        description="How candidates who know the formulas still lose marks. Mirror/lens sign-flip, TIR direction, mass in pendulum, CGS/SI mix, parallel-vs-series swap, latent-heat omission, density mixing mean confusion."
      />
      <GuideHero
        eyebrow="Traps"
        title="How NDA loses you marks even when you know the formula"
        subtitle="Physics distractors are about CONFUSED FORMULA APPLICATION — wrong formula picked, right formula misapplied (sign, unit, direction), or one missing term in a multi-step setup. Different from Maths' factor-of-2 / sign-flip numeric cells and English's near-synonym semantic shapes. Each trap below is illustrated on a real PYQ."
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

      {(["recall", "apply", "reason"] as const).map((bucket) => {
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
                            href={`/guide/nda-physics/playbooks/${slug}`}
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

      {/* Time-budgeted verification habits */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6">
        <h2 className="text-lg font-semibold tracking-tight">
          The time-budgeted verification habit
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          Verification quality scales with the time you have. Pick the
          deepest check the budget allows — don&rsquo;t skip verification
          entirely.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              15 seconds left (Recall)
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Unit + dimension check
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Does the answer have the right unit? Force in Newtons not
              Joules; energy in Joules not Watts; light year is distance not
              time.
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              30 seconds left (Apply)
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Sign + symbol check
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Sign convention applied consistently? (u negative for real
              object in Cartesian.) Did mass appear where it shouldn&rsquo;t
              (pendulum, free-fall)?
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              60 seconds left (Reason)
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Full setup re-check
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Heat-balance accounts for EACH phase boundary? Resistor reduction
              starts from innermost combination? Density-mixing formula
              matches equal-volume vs equal-mass?
            </p>
          </div>
        </div>
        <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">
            The habit, not the rule.
          </strong>{" "}
          A 10-second verification per question recovers more marks per paper
          than learning a new formula — the trap is what loses students who
          already know the formula.
        </p>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/nda-physics/trends", label: "Trends" }}
        next={{ href: "/guide/nda-physics/ncert-map", label: "NCERT Map" }}
      />
    </GuideShell>
  );
}
