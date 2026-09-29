import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Target } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { ROUTES } from "../_data/cds-maths";
import { TRAPS_BY_BUCKET, TRAP_HEADLINE, TRAP_SHAPES, type TrapBucket } from "../_data/traps";
import { PLAYBOOKS } from "../_data/playbooks";
import { STRATEGY_HEADLINE } from "../_data/strategy";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "CDS Maths Traps — the distractors CDS reuses",
  description:
    "The mistakes that cost marks on CDS Elementary Mathematics: the blind guess on a paper with a one-third penalty, the four-minute question on a 1.2-minute budget, the average of two speeds, the percentage on the wrong base, mixed units, and x² + 1/x² taken as k². Each with the check that avoids it.",
  alternates: { canonical: "/guide/cds-maths/traps" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/cds-maths/${r.slug}` : "/guide/cds-maths",
  label: r.label,
}));

const BUCKET_ORDER: TrapBucket[] = ["cornerstone", "quickwin", "selective"];

const BUCKET_LABEL: Record<TrapBucket, string> = {
  cornerstone: "Cornerstone traps — where the most marks go",
  quickwin: "Quick-win traps — cheap marks lost to a slip",
  selective: "Selective traps — algebra and geometry",
};

const BUCKET_BLURB: Record<TrapBucket, string> = {
  cornerstone:
    "The two paper-wide traps — the blind guess and the time sink — plus the slips that cost marks in the five largest chapters.",
  quickwin:
    "These sit in the cheapest chapters, and each is a slip in method, not a hard question. The wrong answer is always among the options.",
  selective:
    "Algebra and the smaller geometry chapters: a dropped term, a sign, a root that breaks the domain, and the case the question did not name.",
};

export default function CdsMathsTraps() {
  const playbookName = (slug: string) => PLAYBOOKS.find((p) => p.slug === slug)?.name ?? slug;
  const paperWide = TRAP_SHAPES.filter((t) => t.affects.length === 0).length;
  const h = STRATEGY_HEADLINE;

  const stats = [
    { value: String(TRAP_HEADLINE.shapes), label: "trap shapes" },
    { value: String(BUCKET_ORDER.length), label: "strands affected" },
    { value: String(TRAP_HEADLINE.topAffects), label: "playbooks hit by the widest trap" },
    { value: String(paperWide), label: "paper-wide, not chapter-specific" },
  ];

  return (
    <GuideShell
      guideTitle="CDS Maths Guide"
      sideNav={sideNav}
      landingHref="/guide/cds-maths"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/cds", label: "CDS" },
        { href: "/guide/cds-maths", label: "Mathematics" },
        { label: "Traps" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/cds-maths/traps"
        headline="CDS Maths Traps — the distractors CDS reuses"
        description="The mistakes that cost marks on CDS Elementary Mathematics — the blind guess, the time sink, the average of two speeds, the percentage on the wrong base — each with the check that avoids it."
      />
      <GuideHero
        eyebrow="Traps"
        title="How CDS Maths costs you marks when you know the maths"
        subtitle={`A wrong answer loses a third of a mark, and there are ${h.minutesPerQuestion} minutes a question. So two of the traps below are about the paper, not the mathematics: guessing blind, and staying too long. The rest are the slips that produce the wrong options CDS reuses from paper to paper.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {BUCKET_ORDER.map((bucket) => {
        const list = TRAPS_BY_BUCKET[bucket];
        if (list.length === 0) return null;
        return (
          <section key={bucket} className="mt-12">
            <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
              <AlertTriangle className="h-5 w-5 text-primary" aria-hidden />
              {BUCKET_LABEL[bucket]}
            </h2>
            <p className="mt-3 font-serif leading-relaxed text-muted-foreground">{BUCKET_BLURB[bucket]}</p>
            <div className="mt-6 space-y-6">
              {list.map((trap) => (
                <article key={trap.id} className="rounded-lg border bg-card p-5 shadow-sm">
                  <h3 className="text-base font-semibold tracking-tight sm:text-lg">{trap.title}</h3>
                  {trap.affects.length > 0 ? (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Affects:{" "}
                      {trap.affects.map((slug, i) => (
                        <span key={slug}>
                          <Link
                            href={`/guide/cds-maths/playbooks/${slug}`}
                            className="rounded-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            {playbookName(slug)}
                          </Link>
                          {i < trap.affects.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                  ) : (
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      Paper-wide — not tied to any one chapter
                    </p>
                  )}
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        How it happens
                      </p>
                      <p className="mt-1 font-serif text-sm leading-relaxed text-foreground/90">{trap.mechanic}</p>
                    </div>
                    <div className="rounded-md border-l-4 border-emerald-500/60 bg-emerald-50/40 p-3 dark:bg-emerald-950/20">
                      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                        <Target className="h-3.5 w-3.5" aria-hidden /> The check
                      </p>
                      <p className="mt-1 font-serif text-sm leading-relaxed text-foreground/90">{trap.fix}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6">
        <h2 className="text-lg font-semibold tracking-tight">Two habits cover most of this page</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Before you solve</p>
            <p className="mt-1 text-sm font-semibold tracking-tight">Check the options first</p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Rule out anything out of range, in the wrong units or with the wrong sign. It often leaves one
              option, and when it does not, it makes a guess worth taking.
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">On the paper</p>
            <p className="mt-1 text-sm font-semibold tracking-tight">Two passes, no blind guesses</p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Answer the quick ones first and mark the rest. Leave a question only if you cannot rule out a
              single option — at a third of a mark per wrong answer, that is the one guess not worth making.
            </p>
          </div>
        </div>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/cds-maths/trends", label: "Trends" }}
        next={{ href: "/guide/cds-maths", label: "Back to the CDS Maths overview" }}
      />
    </GuideShell>
  );
}
