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
import { ROUTES } from "../_data/nda-polity";
import {
  TRAPS_BY_BUCKET,
  TRAP_HEADLINE,
  TRAP_SHAPES,
} from "../_data/traps";
import { PLAYBOOKS } from "../_data/playbooks";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "NDA Polity Traps — Distractor patterns NDA reuses",
  description:
    "How candidates who know Polity still lose marks. Article↔subject swap, Amendment↔year confusion, body↔function swap, Money Bill vs Finance Bill, Speaker vs President powers, original vs appellate jurisdiction, multi-statement partial-credit — measured against the live 90-question bank.",
  alternates: { canonical: "/guide/nda-polity/traps" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-polity/${r.slug}` : "/guide/nda-polity",
  label: r.label,
}));

const BUCKET_LABEL = {
  "paired-fact":
    "Paired-fact swap (Recall genre — Article↔subject, Amendment↔year, body↔function, HC↔jurisdiction)",
  procedural:
    "Procedural confusion (Polity-specific — Money Bill vs Finance Bill, Speaker vs President, SC jurisdictions, constitutional vs statutory)",
  verify:
    "Multi-statement Verify (consider the following — partial-credit, universal-claim, match-list misalignment)",
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
    { value: "3", label: "genre buckets" },
    {
      value: String(TRAP_HEADLINE.topAffects),
      label: "playbooks per top trap",
    },
    { value: String(examples.length), label: "worked examples below" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Polity Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-polity"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-polity", label: "NDA Polity" },
        { label: "Traps" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-polity/traps"
        headline="NDA Polity Traps — Distractor patterns NDA reuses"
        description="How candidates who know Polity still lose marks. Article-subject swap, Amendment-year confusion, body-function swap, Money Bill vs Finance Bill, multi-statement partial-credit."
      />
      <GuideHero
        eyebrow="Traps"
        title="How NDA loses you marks even when you know the Polity"
        subtitle="Polity distractors split into 3 genres: PAIRED-FACT SWAPS (Article↔subject, Amendment↔year, body↔function, HC↔territorial jurisdiction — same genre as Biology + History recall), PROCEDURAL CONFUSION (Money Bill vs Finance Bill, Speaker vs President powers, original vs appellate jurisdiction, constitutional vs statutory body — Polity-specific institutional-procedure distinctions, unique among NDA subjects), and MULTI-STATEMENT VERIFY (partial-credit, universal-claim, match-list misalignment). Each trap below is illustrated on a real PYQ where one exists."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* How to read */}
      <section className="mt-10 rounded-lg border-l-4 border-amber-500 bg-amber-50/40 p-5 dark:bg-amber-950/20">
        <h2 className="text-base font-semibold tracking-tight">
          How to use this page
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
          Read once cover-to-cover. Then re-read the genre relevant to your
          next practice session — the trap is far easier to spot when
          you&rsquo;ve just been primed on its mechanism. NDA recycles these
          same shapes year after year; pattern recognition pays. The
          procedural-confusion genre is especially Polity-unique — the only
          NDA subject where confusing two institutional procedures (Money
          Bill vs Finance Bill, Speaker vs President) costs you marks
          consistently.
        </p>
      </section>

      {(["paired-fact", "procedural", "verify"] as const).map((bucket) => {
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
                            href={`/guide/nda-polity/playbooks/${slug}`}
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
          Polity&rsquo;s verification habit is different from Physics&rsquo;s
          unit-check. The Recall lever is paired-fact recall (Article ↔
          subject; Amendment ↔ year; body ↔ function). The Procedural lever
          is institutional-distinction recall (Money Bill vs Finance Bill;
          Speaker vs President powers; constitutional vs statutory body).
          The Verify lever is statement-by-statement T/F. Match the tier to
          the question shape.
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
              Article 21 → life and personal liberty. Article 51A →
              Fundamental Duties (42nd 1976). 73rd Amendment → Panchayati
              Raj 1992. CAG → Article 148 → reports to President. State
              both halves of the pair before picking.
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              25 seconds (Procedural)
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Institution → procedure check
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Money Bill: LS-only intro + RS recommend in 14 days +
              Speaker certifies. Finance Bill: either House + RS equal +
              no certificate. President SUMMONS and PROROGUES; Speaker
              only ADJOURNS sittings. Don&rsquo;t pick on partial
              recognition — verify the institutional-distinction cold.
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
              Read each statement INDEPENDENTLY. Write T/F next to each.
              Then match to the option that lists EXACTLY your T set.
              Don&rsquo;t pick partial recognition — uncertain statements
              make the whole question uncertain. Watch for universal
              claims (all / every / always).
            </p>
          </div>
        </div>
        <p className="mt-4 font-serif text-sm leading-relaxed text-muted-foreground">
          <strong className="font-semibold text-foreground">
            The 10-second pair-check is the highest-leverage habit on
            Recall; the institutional-distinction check on Procedural.
          </strong>{" "}
          Most Polity distractors fall to one of these. A guess at 5 seconds
          without either is negative-EV; a 10-second check + skip is
          strictly better in a 5-question section where you can&rsquo;t
          recover from many wrongs.
        </p>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/nda-polity/trends", label: "Trends" }}
        next={{ href: "/guide/nda-polity", label: "Back to Overview" }}
      />
    </GuideShell>
  );
}
