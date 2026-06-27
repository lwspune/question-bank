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
import { ROUTES } from "../_data/nda-english";
import {
  TRAPS_BY_BUCKET,
  TRAP_HEADLINE,
  TRAP_SHAPES,
} from "../_data/traps";
import { PLAYBOOKS } from "../_data/playbooks";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "NDA English Traps — Distractor patterns NDA reuses",
  description:
    "How students who know the answer still lose marks. Near-synonym confusion, opposite-direction antonyms, literal-idiom interpretation, S-V proximity errors, PQRS opener mismatches — measured against the live 900-question bank.",
  alternates: { canonical: "/guide/nda-english/traps" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-english/${r.slug}` : "/guide/nda-english",
  label: r.label,
}));

const BUCKET_LABEL = {
  recall: "Recall traps (Vocab + Idioms)",
  rule: "Rule traps (Errors + Grammar)",
  reason: "Reason traps (RC + Rearrangement + Cloze + FIB)",
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
    { value: "3", label: "skill buckets affected" },
    { value: String(TRAP_HEADLINE.topAffects), label: "playbooks per top trap" },
    {
      value: String(examples.length),
      label: "worked examples below",
    },
  ];

  return (
    <GuideShell
      guideTitle="NDA English Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-english"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-english", label: "NDA English" },
        { label: "Traps" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-english/traps"
        headline="NDA English Traps — Distractor patterns NDA reuses"
        description="How students who know the answer still lose marks. Near-synonym confusion, opposite-direction antonyms, literal-idiom interpretation, S-V proximity errors, PQRS opener mismatches."
      />
      <GuideHero
        eyebrow="Traps"
        title="How NDA loses you marks even when you know the answer"
        subtitle="English distractors are linguistic, not numeric — so the shapes are different from Maths' factor-of-2 and sign-flip cells. Each trap below is one mechanism, illustrated on a real past-year question, with the verification habit that defends against it."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* How to read */}
      <section className="mt-10 rounded-lg border-l-4 border-amber-500 bg-amber-50/40 p-5 dark:bg-amber-950/20">
        <h2 className="text-base font-semibold tracking-tight">
          How to use this page
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
          Read once cover-to-cover. Then re-read the bucket relevant to your
          next practice session — the trap is far easier to spot when
          you&rsquo;ve just been primed on its mechanism. NDA recycles these
          same shapes year after year; pattern recognition pays.
        </p>
      </section>

      {(["recall", "rule", "reason"] as const).map((bucket) => {
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
                            href={`/guide/nda-english/playbooks/${slug}`}
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
          Verification quality scales with the time you have. Pick the deepest
          check the budget allows — don&rsquo;t skip verification entirely.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              15 seconds left (Recall)
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Polarity + literal check
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Antonyms: did I pick the polar option, not a same-direction
              near-synonym? Idioms: am I sure the literal reading is NOT the
              answer?
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              30 seconds left (Rule)
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Bracket-out + rule recall
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Errors: bracket out any prepositional phrase between subject and
              verb; check S-V on the bare subject. Grammar: name the rule the
              question tests.
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              60 seconds left (Reason)
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Full passage re-scan
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              RC: locate the source sentence(s) in the passage that commit the
              author to your answer. PQRS: re-check opener has no backward
              reference and closer has a generalisation.
            </p>
          </div>
        </div>
        <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">
            The habit, not the rule.
          </strong>{" "}
          A 10-second verification per question recovers more marks per paper
          than learning a single new word — the trap is what loses students
          who already know the answer.
        </p>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/nda-english/trends", label: "Trends" }}
        next={{ href: "/guide/nda-english", label: "Back to Overview" }}
      />
    </GuideShell>
  );
}
