import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Target } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { TRAP_SHAPES } from "../_data/traps";
import type { TrapBucket } from "../_data/types";
import { GUIDE_BASE, jeeGuideSideNav } from "../_data/nav";
import { PLAYBOOKS } from "../_data/playbooks";
import { STRATEGY_HEADLINE } from "../_data/strategy";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "JEE Mains Physics Traps — the distractors JEE reuses",
  description:
    "The mistakes that cost marks on JEE Mains Physics: the blank MCQ that was worth a guess, the blind numeric answer that was not, the wrong power of r, the dropped sign convention, the forgotten spin energy and the ignored internal resistance. Each with the check that avoids it.",
  alternates: { canonical: `${GUIDE_BASE}/traps` },
};

const sideNav = jeeGuideSideNav();

const BUCKET_ORDER: TrapBucket[] = ["paper", "cornerstone", "core", "longtail"];

const BUCKET_LABEL: Record<TrapBucket, string> = {
  paper: "Paper traps — marks lost to the marking and the clock",
  cornerstone: "Cornerstone traps — where the most marks go",
  core: "Core traps — slips in the middle chapters",
  longtail: "Long-tail traps — units, ratios and conditions",
};

const BUCKET_BLURB: Record<TrapBucket, string> = {
  paper:
    "Nothing to do with any one chapter: the guessing rule for each format, the numeric entry, and the shared clock.",
  cornerstone:
    "The slips that cost marks in the chapters the paper leans on hardest. Each wrong answer they produce is printed among the options.",
  core: "A sign, a unit, a condition skipped: slips in method rather than hard questions.",
  longtail: "A power of r, an rms value read as a peak, a quantity assumed fixed: slips in the smaller chapters.",
};

export default function JeeMainsPhysicsTraps() {
  const playbookName = (slug: string) => PLAYBOOKS.find((p) => p.slug === slug)?.name ?? slug;
  const paperWide = TRAP_SHAPES.filter((t) => t.affects.length === 0).length;
  const h = STRATEGY_HEADLINE;
  const byBucket = (b: TrapBucket) => TRAP_SHAPES.filter((t) => t.bucket === b);
  const widest = Math.max(...TRAP_SHAPES.map((t) => t.affects.length));

  const stats = [
    { value: String(TRAP_SHAPES.length), label: "trap shapes" },
    { value: String(new Set(TRAP_SHAPES.flatMap((t) => t.affects)).size), label: "playbooks touched" },
    { value: String(widest), label: "playbooks hit by the widest trap" },
    { value: String(paperWide), label: "paper-wide, not chapter-specific" },
  ];

  return (
    <GuideShell
      guideTitle="JEE Mains Physics Guide"
      sideNav={sideNav}
      landingHref={GUIDE_BASE}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/jee-mains", label: "JEE Mains" },
        { href: GUIDE_BASE, label: "Physics" },
        { label: "Traps" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path={`${GUIDE_BASE}/traps`}
        headline="JEE Mains Physics Traps — the distractors JEE reuses"
        description="The mistakes that cost marks on JEE Mains Physics — the blank MCQ, the blind numeric guess, the wrong power of r, the dropped sign convention — each with the check that avoids it."
      />
      <GuideHero
        eyebrow="Traps"
        title="How JEE Mains Physics costs you marks when you know the physics"
        subtitle={`A right answer earns ${h.marksPerCorrect} and a wrong one loses ${h.penaltyPerWrong}, on multiple-choice and numeric questions alike, on a clock shared with two other subjects. So the first traps below are about the paper, not the mathematics. The rest are the slips that produce the wrong options JEE reuses from shift to shift.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {BUCKET_ORDER.map((bucket) => {
        const list = byBucket(bucket);
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
                            href={`${GUIDE_BASE}/playbooks/${slug}`}
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
              Rule out anything with the wrong units, the wrong sign or an impossible size. It often leaves one option, and when it
              does not, it makes the end-of-paper guess worth more.
            </p>
          </div>
          <div className="rounded-md border bg-card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">On the paper</p>
            <p className="mt-1 text-sm font-semibold tracking-tight">Two passes, then fill the MCQs</p>
            <p className="mt-1 font-serif text-xs leading-relaxed text-muted-foreground">
              Answer the quick ones first and mark the rest. At the end, every multiple-choice question gets an
              answer; a numeric answer you have not worked out stays blank.
            </p>
          </div>
        </div>
      </section>

      <PrevNextNav
        prev={{ href: `${GUIDE_BASE}/trends`, label: "Trends" }}
        next={{ href: GUIDE_BASE, label: "Back to the JEE Mains Physics overview" }}
      />
    </GuideShell>
  );
}
