import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Target } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { ROUTES } from "../_data/mht-cet-physics";
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
  title: "MHT-CET Physics Traps — Where the marks and the minutes go",
  description:
    "The habits that cost marks in MHT-CET Physics: leaving a bubble blank on an exam with no negative marking, letting the shared Paper II clock drift, computing both sides of 279 ratio questions, the soap bubble's second surface, figures read from memory, Celsius where kelvin belongs, and prep hours still spent on the two chapters that halved in 2025.",
  alternates: { canonical: "/guide/mht-cet-physics/traps" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/mht-cet-physics/${r.slug}` : "/guide/mht-cet-physics",
  label: r.label,
}));

const BUCKET_ORDER: TrapBucket[] = ["cornerstone", "quickwin", "longtail"];

/**
 * Bucket headings. A trap's bucket is the strand whose MARKS it costs you,
 * which is not always the strand the question sits in — the ratio trap is
 * bucketed cornerstone because it spans 22 chapters and costs cornerstone
 * minutes, even though several of the chapters it hits are long-tail.
 */
const BUCKET_LABEL: Record<TrapBucket, string> = {
  cornerstone: "Cornerstone traps — where the marks actually go",
  quickwin: "Quick-win traps — cheap marks lost to procedure, not difficulty",
  longtail: "Long-tail traps — the expensive chapters",
};

const BUCKET_BLURB: Record<TrapBucket, string> = {
  cornerstone:
    "These cost you cornerstone marks. Three of them are paper-wide — the blank bubble, the drifting clock and the ratio computed in full — and are filed here because the minutes they burn are the minutes the heaviest chapters needed.",
  quickwin:
    "These sit in the cheapest chapters on the paper, and every one of them is a procedure error rather than a difficulty error. The physics is not what loses these marks.",
  longtail:
    "These cost long-tail marks: a graph read the wrong way, a sign dropped in a lens formula, and prep hours still going to two chapters the 2025 papers halved.",
};

export default function MhtCetPhysicsTraps() {
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
      guideTitle="MHT-CET Physics Guide"
      sideNav={sideNav}
      landingHref="/guide/mht-cet-physics"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/mht-cet", label: "MHT-CET" },
        { href: "/guide/mht-cet-physics", label: "Physics" },
        { label: "Traps" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/mht-cet-physics/traps"
        headline="MHT-CET Physics Traps — Where the marks and the minutes go"
        description="The habits that cost marks in MHT-CET Physics: leaving a bubble blank with no negative marking, letting the shared Paper II clock drift, computing both sides of a ratio question, and figures read from memory."
      />
      <GuideHero
        eyebrow="Traps"
        title="How MHT-CET Physics loses you marks even when you know the physics"
        subtitle={`Two things make this exam's trap list unlike NDA's or JEE's, and neither is physics. The penalty for a wrong answer is ${STRATEGY_HEADLINE.penaltyPerWrong}, so every reflex built on an exam that deducts for a wrong answer is harmful here — and Physics shares a ${STRATEGY_HEADLINE.sharedPaperMinutes}-minute paper with Chemistry, so several shapes below are TIME traps. At about ${STRATEGY_HEADLINE.minutesPerQuestion} minutes a Physics question, that is where marks are lost.`}
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
          Computing both sides of a ratio question is a cornerstone trap even
          when the question sits in a long-tail chapter, because what it takes
          from you is cornerstone time.
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
                            href={`/guide/mht-cet-physics/playbooks/${slug}`}
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
          disciplines, and neither of them is extra physics.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Before you start writing
            </p>
            <p className="mt-1 text-sm font-semibold tracking-tight">
              Read, then compute
            </p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Is this a ratio question — write the proportion, not the values?
              What is held constant — Q or V, pressure or volume? Is the figure
              what it looks like — trace the gates, check the bridge, mark each
              field&rsquo;s direction? Fifteen seconds of reading is cheaper than two
              minutes down the wrong route, and on about{" "}
              {STRATEGY_HEADLINE.minutesPerQuestion} minutes a question there is
              no cheap way back.
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
              three minutes of Paper II free to fill whatever is still empty. A blank and a
              wrong answer score the same on this exam, so an unfilled bubble
              is the only error here that costs you marks with certainty rather
              than probability.
            </p>
          </div>
        </div>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/mht-cet-physics/trends", label: "Trends" }}
        next={{
          href: "/guide/mht-cet-physics",
          label: "Back to the MHT-CET Physics overview",
        }}
      />
    </GuideShell>
  );
}
