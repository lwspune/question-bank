import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Info } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { getNotesChaptersForSubject } from "@/lib/notes/chapters";
import { OVERVIEW, ROUTES } from "../_data/mht-cet-chemistry";
import {
  PLAYBOOKS,
  playbooksInBucket,
  type PlaybookBucket,
} from "../_data/playbooks";
import { TAIL_CHAPTERS, type TailStatus } from "../_data/strategy";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "MHT-CET Chemistry Playbooks — 23 chapters, drilled",
  description:
    "Twenty-three playbooks for MHT-CET Chemistry — one per chapter above 0.9 questions per paper, grouped Recall / Reactions / Calculate by how a question is answered. Each playbook: how the chapter is tested, the reactions and formulas it turns on, its traps, and a one-click drill link.",
  alternates: { canonical: "/guide/mht-cet-chemistry/playbooks" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/mht-cet-chemistry/${r.slug}` : "/guide/mht-cet-chemistry",
  label: r.label,
}));

/**
 * Human framing per strand. Deliberately carries NO statistics — every number
 * on this page is computed from the playbook catalog at render time, so the
 * page cannot drift from the data the way a hand-typed figure would.
 */
const STRAND_INFO: Record<
  PlaybookBucket,
  { label: string; blurb: string }
> = {
  recall: {
    label: "Recall — answer on sight",
    blurb:
      "Names, structures, uses, trends and counts: the descriptive chapters, about 2% HARD together. Each question takes seconds if the table is learned and will not come back with more time if it is not — so these go on the first sweep, and they are the marks that fund the Physics minutes.",
  },
  reactions: {
    label: "Reactions — reagent to product",
    blurb:
      "The organic reaction chapters. Recognise the reagent or the named reaction and the product follows; there is almost nothing to calculate. Learn every reaction in both directions — reagent to product, and product to reagent — because the paper asks both ways.",
  },
  calculate: {
    label: "Calculate — arithmetic, second sweep",
    blurb:
      "The physical-chemistry chapters: most answers are numbers, and each chapter turns on one or two formulas. They are no harder than the rest of the paper, only slower — so they come after the first sweep, at about a minute a question.",
  },
};

/** Rendered as TEXT so a chapter's syllabus state is never carried by colour
 *  alone (repo accessibility standard). */
const TAIL_STATUS_LABEL: Record<TailStatus, string> = {
  live: "Still live",
  entering: "New for 2025",
  dropped: "Dropped after 2024",
};

const TAIL_STATUS_CLASS: Record<TailStatus, string> = {
  live: "border-muted-foreground/30 text-muted-foreground",
  entering: "border-emerald-500/50 text-emerald-700 dark:text-emerald-400",
  dropped: "border-amber-500/50 text-amber-700 dark:text-amber-400",
};

const STRAND_ORDER: PlaybookBucket[] = ["recall", "reactions", "calculate"];

const cardClass =
  "group flex h-full flex-col rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function PlaybooksIndex() {
  // Everything numeric below is addition over the catalog, never a fresh
  // measurement: strand totals reconcile with strategy.ts, and the playbook
  // total plus the tail total reconciles with OVERVIEW.totalQ.
  const coveredQ = PLAYBOOKS.reduce((s, p) => s + p.qCount, 0);
  const coveredPerPaper = PLAYBOOKS.reduce((s, p) => s + p.qPerPaper, 0);
  const tailQ = TAIL_CHAPTERS.reduce((s, c) => s + c.qCount, 0);

  // Chapters that also ship full teaching notes, derived from the live notes
  // registry (a notes chapterSlug happens to equal its playbook slug here).
  // Derived rather than hard-coded so a renamed notes chapter cannot leave a
  // "Notes" badge pointing at a 404.
  const notedSlugs = new Set(
    getNotesChaptersForSubject("mht-cet-chemistry").map((c) => c.chapterSlug)
  );

  const stats = [
    { value: String(PLAYBOOKS.length), label: "Playbooks" },
    { value: coveredQ.toLocaleString("en-IN"), label: "Questions covered" },
    {
      value: coveredPerPaper.toFixed(1),
      label: `of ${OVERVIEW.paper.questions} q/paper covered`,
    },
    { value: String(OVERVIEW.papers), label: "Papers analysed" },
  ];

  const playbooksBlurb = ROUTES.find((r) => r.slug === "playbooks")?.blurb;

  return (
    <GuideShell
      guideTitle="MHT-CET Chemistry Guide"
      sideNav={sideNav}
      landingHref="/guide/mht-cet-chemistry"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/mht-cet", label: "MHT-CET" },
        { href: "/guide/mht-cet-chemistry", label: "Chemistry" },
        { label: "Playbooks" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/mht-cet-chemistry/playbooks"
        headline="MHT-CET Chemistry Playbooks — 23 chapters, drilled"
        description="Twenty-three playbooks for MHT-CET Chemistry — one per chapter above 0.9 questions per paper. Each: how the chapter is tested, its sub-skills, its traps, and a one-click drill link."
      />
      <GuideHero
        eyebrow="Playbooks"
        title={`${PLAYBOOKS.length} chapter playbooks behind ${coveredPerPaper.toFixed(1)} of the ${OVERVIEW.paper.questions} questions`}
        subtitle={playbooksBlurb}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* The single most misreadable number on this page, stated up front. */}
      <section className="mt-2 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
          <Clock className="h-4 w-4" aria-hidden />
          Read &ldquo;q/paper&rdquo; as a recent rate, not a lifetime share
        </h2>
        <p className="mt-2 font-serif text-base leading-relaxed text-foreground">
          Two different numbers appear on every card below and they do not
          measure the same thing. The <strong>question count</strong> is
          lifetime — all {OVERVIEW.totalQ.toLocaleString("en-IN")} questions
          across {OVERVIEW.papers} papers and {OVERVIEW.yearsCovered} years.
          The <strong>q/paper rate</strong> is measured on recent papers only
          (2024&ndash;2025), and that is the number the strands below are built
          on.
        </p>
        <p className="mt-3 font-serif text-base leading-relaxed text-muted-foreground">
          They disagree because the 2025 papers moved a few chapters.
          Structure of Atom carries 70 questions lifetime and halved in 2025;
          Green Chemistry carries 33 and rose to a question in every 2025
          paper. A lifetime average hides both, which is why the catalog is
          built on the recent rate.
        </p>
        <Link
          href="/guide/mht-cet-chemistry/trends"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          See the year-on-year drift
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </section>

      {STRAND_ORDER.map((bucket) => {
        const list = playbooksInBucket(bucket);
        const strandQ = list.reduce((s, p) => s + p.qCount, 0);
        const strandPerPaper = list.reduce((s, p) => s + p.qPerPaper, 0);
        const hardRates = list.map((p) => p.pctHard);
        const minHard = Math.min(...hardRates);
        const maxHard = Math.max(...hardRates);

        return (
          <section key={bucket} className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {STRAND_INFO[bucket].label}
            </h2>
            <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
              {STRAND_INFO[bucket].blurb}
            </p>
            <p className="mt-3 text-xs tabular-nums text-muted-foreground">
              {list.length} playbook{list.length === 1 ? "" : "s"} ·{" "}
              {strandQ.toLocaleString("en-IN")} questions lifetime ·{" "}
              {strandPerPaper.toFixed(1)} of {OVERVIEW.paper.questions} q/paper
              on 2024&ndash;25 papers · {minHard}&ndash;{maxHard}% HARD
            </p>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {list.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/guide/mht-cet-chemistry/playbooks/${p.slug}`}
                    className={cardClass}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold tracking-tight sm:text-base">
                        {p.name}
                      </h3>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </div>
                    <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                      {p.summary}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 text-xs text-muted-foreground">
                      <span className="tabular-nums">
                        {p.qCount} q · {p.qPerPaper.toFixed(2)}/paper ·{" "}
                        {p.pctHard}% hard · {p.subtopics.length} subtopic
                        {p.subtopics.length === 1 ? "" : "s"}
                      </span>
                      {notedSlugs.has(p.slug) && (
                        <span className="inline-flex items-center gap-1 text-primary">
                          <BookOpen className="h-3 w-3" aria-hidden /> notes
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {/* Why the catalog stops short of every chapter — the counts come from PLAYBOOKS and OVERVIEW. */}
      <section className="mt-16">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Info className="h-5 w-5 text-primary" aria-hidden />
          Why {PLAYBOOKS.length} playbooks and not {OVERVIEW.chapters}
        </h2>
        <p className="mt-2 font-serif text-base leading-relaxed text-muted-foreground">
          A playbook ships for every chapter at or above{" "}
          <strong>0.9 questions per paper on recent weightage</strong>.{" "}
          {PLAYBOOKS.length} of the {OVERVIEW.chapters} chapters clear that
          line. The other {TAIL_CHAPTERS.length} are named below rather than
          quietly dropped &mdash; between them they are{" "}
          {tailQ.toLocaleString("en-IN")} of the{" "}
          {OVERVIEW.totalQ.toLocaleString("en-IN")} questions in the bank, and
          one of them — Basic Principles of Organic Chemistry, the hardest
          chapter of any size — matters more than that share suggests. They are
          covered in the tail block on the{" "}
          <Link
            href="/guide/mht-cet-chemistry/strategy"
            className="font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            strategy page
          </Link>
          .
        </p>

        <ul className="mt-5 space-y-3">
          {TAIL_CHAPTERS.map((c) => (
            <li key={c.chapter} className="rounded-md border bg-card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="text-sm font-semibold tracking-tight">
                  {c.chapter}
                </h3>
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-medium ${TAIL_STATUS_CLASS[c.status]}`}
                >
                  {TAIL_STATUS_LABEL[c.status]}
                </span>
              </div>
              <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                {c.qCount} q lifetime · {c.qPerPaper.toFixed(2)}/paper on
                2024&ndash;25 papers · {c.pctHard}% hard
              </p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                {c.note}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/mht-cet-chemistry/strategy", label: "Strategy" }}
        next={{ href: "/guide/mht-cet-chemistry/reference", label: "Reference" }}
      />
    </GuideShell>
  );
}
