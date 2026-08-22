import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Target } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { ROUTES } from "../_data/mht-cet-maths";
import {
  TRAPS_BY_BUCKET,
  TRAP_HEADLINE,
  TRAP_SHAPES,
  type TrapBucket,
} from "../_data/traps";
import { PLAYBOOKS } from "../_data/playbooks";
import { STRATEGY_HEADLINE } from "../_data/strategy";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "MHT-CET Maths Traps — Where the marks and the minutes go",
  description:
    "The habits that cost marks on MHT-CET Paper I: leaving a bubble blank on an exam with no negative marking, the five-minute counting question inside a 1.8-minute budget, one perpendicularity condition written four different ways, concurrency and coplanarity as a single determinant test, inverse trigonometry filed under two chapters at once, and a dead chapter every practice paper still contains.",
  alternates: { canonical: "/guide/mht-cet-maths/traps" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/mht-cet-maths/${r.slug}` : "/guide/mht-cet-maths",
  label: r.label,
}));

const BUCKET_ORDER: TrapBucket[] = ["cornerstone", "quickwin", "longtail"];

/**
 * Bucket headings. A trap's bucket is the strand whose MARKS it costs you,
 * which is not always the strand the question sits in — the counting time
 * trap is bucketed cornerstone because the minutes it eats are cornerstone
 * minutes, even though Permutations and Combinations is a long-tail chapter.
 */
const BUCKET_LABEL: Record<TrapBucket, string> = {
  cornerstone: "Cornerstone traps — where the marks actually go",
  quickwin: "Quick-win traps — cheap marks lost to procedure, not difficulty",
  longtail: "Long-tail traps — scope and technique",
};

const BUCKET_BLURB: Record<TrapBucket, string> = {
  cornerstone:
    "These cost you cornerstone marks. Not all of them live in a cornerstone chapter — the counting time-sink sits in Permutations and Combinations, a long-tail chapter, and is filed here because the minutes it burns are the minutes Applications of Derivative never got.",
  quickwin:
    "These sit in the cheapest chapters on the paper, and every one of them is a procedure error rather than a difficulty error. The mathematics is not what loses these marks.",
  longtail:
    "These cost long-tail marks: topics filed in two places at once, a chapter that no longer appears, and calculus reached for where a one-line geometric answer was available.",
};

export default function MhtCetMathsTraps() {
  const playbookName = (slug: string) =>
    PLAYBOOKS.find((p) => p.slug === slug)?.name ?? slug;

  const paperWide = TRAP_SHAPES.filter((t) => t.affects.length === 0).length;

  const stats = [
    { value: String(TRAP_HEADLINE.shapes), label: "trap shapes" },
    { value: String(BUCKET_ORDER.length), label: "strands affected" },
    {
      value: String(TRAP_HEADLINE.topAffects),
      label: "playbooks hit by the widest trap",
    },
    { value: String(paperWide), label: "paper-wide, not chapter-specific" },
  ];

  return (
    <GuideShell
      guideTitle="MHT-CET Maths Guide"
      sideNav={sideNav}
      landingHref="/guide/mht-cet-maths"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/mht-cet", label: "MHT-CET" },
        { href: "/guide/mht-cet-maths", label: "Mathematics" },
        { label: "Traps" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/mht-cet-maths/traps"
        headline="MHT-CET Maths Traps — Where the marks and the minutes go"
        description="The habits that cost marks on MHT-CET Paper I: leaving a bubble blank on an exam with no negative marking, the five-minute counting question inside a 1.8-minute budget, one perpendicularity condition written four ways, and a dead chapter every practice paper still contains."
      />
      <GuideHero
        eyebrow="Traps"
        title="How MHT-CET loses you marks even when you know the maths"
        subtitle={`Two things make this exam's trap list unlike NDA's or JEE's, and both are structural rather than mathematical. The penalty for a wrong answer is ${STRATEGY_HEADLINE.penaltyPerWrong}, so every reflex built on an exam that deducts for a wrong answer is harmful here — and Paper I is ${STRATEGY_HEADLINE.paperQ} questions in ${STRATEGY_HEADLINE.durationMin} minutes, so several of the shapes below are TIME traps rather than mathematical ones. At ${STRATEGY_HEADLINE.minutesPerQuestion} minutes a question, that is where the marks are lost.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* How to read */}
      <section className="mt-10 rounded-lg border-l-4 border-amber-500 bg-amber-50/40 p-5 dark:bg-amber-950/20">
        <h2 className="text-base font-semibold tracking-tight">
          How to use this page
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-foreground/90">
          Read it once cover-to-cover, then re-read the section matching your
          next practice block — a trap is far easier to spot when you have just
          been primed on its mechanism. One thing to know before you start:{" "}
          <strong className="font-semibold text-foreground">
            a trap is filed under the strand whose MARKS it costs you, not the
            strand the question sits in.
          </strong>{" "}
          A five-minute counting question is a cornerstone trap even though
          Permutations and Combinations is a long-tail chapter, because what it
          takes from you is cornerstone time.
        </p>
      </section>

      {BUCKET_ORDER.map((bucket) => {
        const list = TRAPS_BY_BUCKET[bucket];
        if (list.length === 0) return null;
        return (
          <section key={bucket} className="mt-12">
            <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
              <AlertTriangle className="h-5 w-5 text-primary" aria-hidden />
              {BUCKET_LABEL[bucket]}
            </h2>
            <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
              {BUCKET_BLURB[bucket]}
            </p>
            <div className="mt-6 space-y-6">
              {list.map((trap) => (
                <article
                  key={trap.id}
                  className="rounded-lg border bg-card p-5 shadow-sm"
                >
                  <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                    {trap.title}
                  </h3>
                  {trap.affects.length > 0 ? (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Affects:{" "}
                      {trap.affects.map((slug, i) => (
                        <span key={slug}>
                          <Link
                            href={`/guide/mht-cet-maths/playbooks/${slug}`}
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
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {/* Closing habit */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6">
        <h2 className="text-lg font-semibold tracking-tight">
          The two habits that cover most of this page
        </h2>
        <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
          Most of the {TRAP_HEADLINE.shapes} shapes above reduce to one of two
          disciplines, and neither of them is extra mathematics.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Before you start writing
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Classify, then compute
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Which method does this integrand want? What objects am I holding
              — two slopes, two vectors, a line and a plane? Is this
              concurrency question just a 3×3 determinant? Fifteen seconds of
              classification is cheaper than two minutes down the wrong route,
              and on a {STRATEGY_HEADLINE.minutesPerQuestion}-minute budget
              there is no cheap way back.
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Before you hand the paper in
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Nothing goes back unanswered
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Mark every uncertain question as you pass it, and keep the last
              five minutes free to fill whatever is still empty. A blank and a
              wrong answer score the same on this exam, so an unfilled bubble
              is the only error here that costs you marks with certainty rather
              than probability.
            </p>
          </div>
        </div>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/mht-cet-maths/trends", label: "Trends" }}
        next={{
          href: "/guide/mht-cet-maths",
          label: "Back to the MHT-CET Maths overview",
        }}
      />
    </GuideShell>
  );
}
