import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Info } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { OVERVIEW, PAPER, RECENT, ROUTES } from "../_data/jee-mains-chemistry";
import { PLAYBOOKS, playbooksInBucket, type PlaybookBucket } from "../_data/playbooks";
import { LEFT_CHAPTERS, PLAYBOOK_LINE, TAIL_CHAPTERS } from "../_data/strategy";
import { GUIDE_BASE, jeeChemGuideSideNav } from "../_data/nav";

export const revalidate = 86400;

const TITLE = `JEE Mains Chemistry Playbooks — ${PLAYBOOKS.length} chapters, drilled`;
const DESCRIPTION = `${PLAYBOOKS.length} playbooks for JEE Mains Chemistry, grouped by the kind of work their questions ask for: Calculate, Reactions, Structure and recall. Each: how the chapter is tested, its sub-skills in order, its traps, and a drill link for every page.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${GUIDE_BASE}/playbooks` },
};

/** Human framing per strand. Carries NO statistics — every number is computed from the catalog. */
const STRAND_INFO: Record<PlaybookBucket, { label: string; blurb: string }> = {
  calculate: {
    label: "Calculate — physical chemistry",
    blurb:
      "Most questions need arithmetic, and most of the paper's numeric answers come from these chapters. A half-learned chapter here costs marks a guess cannot recover.",
  },
  reactions: {
    label: "Reactions — the organic reaction chapters",
    blurb: "Reagent to product, named reactions and short schemes. Learn the reactions as pairs and follow a scheme one step at a time.",
  },
  structure: {
    label: "Structure and recall — naming, bonding and the elements",
    blurb:
      "Exact facts, orders with their exceptions, and counts from a list. Most of these are answered on sight once learned.",
  },
};

const STRAND_ORDER: PlaybookBucket[] = ["calculate", "reactions", "structure"];

const cardClass =
  "group flex h-full flex-col rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function PlaybooksIndex() {
  const coveredQ = PLAYBOOKS.reduce((s, p) => s + p.qCount, 0);
  const coveredPerPaper = PLAYBOOKS.reduce((s, p) => s + p.recentPerPaper, 0);

  const stats = [
    { value: String(PLAYBOOKS.length), label: "Playbooks" },
    { value: coveredQ.toLocaleString("en-IN"), label: "Questions covered" },
    { value: coveredPerPaper.toFixed(1), label: `of ${PAPER.questions} q/paper covered` },
    { value: `${OVERVIEW.firstYear}–${OVERVIEW.lastYear}`, label: "Shifts analysed" },
  ];

  return (
    <GuideShell
      guideTitle="JEE Mains Chemistry Guide"
      sideNav={jeeChemGuideSideNav()}
      landingHref={GUIDE_BASE}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/jee-mains", label: "JEE Mains" },
        { href: GUIDE_BASE, label: "Chemistry" },
        { label: "Playbooks" },
      ]}
    >
      <GuideJsonLd type="CollectionPage" path={`${GUIDE_BASE}/playbooks`} headline={TITLE} description={DESCRIPTION} />
      <GuideHero
        eyebrow="Playbooks"
        title={`${PLAYBOOKS.length} chapter playbooks, grouped by the work they ask for`}
        subtitle={ROUTES.find((r) => r.slug === "playbooks")?.blurb}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {STRAND_ORDER.map((bucket) => {
        const list = playbooksInBucket(bucket);
        const strandQ = list.reduce((s, p) => s + p.qCount, 0);
        const strandPerPaper = list.reduce((s, p) => s + p.recentPerPaper, 0);
        return (
          <section key={bucket} className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{STRAND_INFO[bucket].label}</h2>
            <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
              {STRAND_INFO[bucket].blurb}
            </p>
            <p className="mt-3 text-xs tabular-nums text-muted-foreground">
              {list.length} playbook{list.length === 1 ? "" : "s"} · {strandQ.toLocaleString("en-IN")} questions ·{" "}
              {strandPerPaper.toFixed(1)} of {PAPER.questions} q/paper in {RECENT.label}
            </p>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {list.map((p) => (
                <li key={p.slug}>
                  <Link href={`${GUIDE_BASE}/playbooks/${p.slug}`} className={cardClass}>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold tracking-tight sm:text-base">{p.name}</h3>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </div>
                    <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-4 text-xs text-muted-foreground">
                      <span className="tabular-nums">
                        {p.qCount} q · {p.recentPerPaper.toFixed(2)}/paper · {p.pctCalc}% calculation ·{" "}
                        {p.subtopics.length} page{p.subtopics.length === 1 ? "" : "s"}
                      </span>
                      <span className="inline-flex items-center gap-1 text-primary">
                        <BookOpen className="h-3 w-3" aria-hidden /> notes
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="mt-16">
        <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
          <Info className="h-5 w-5 text-primary" aria-hidden />
          Why {PLAYBOOKS.length} playbooks and not {OVERVIEW.chapters}
        </h2>
        <p className="mt-2 font-serif text-base leading-relaxed text-muted-foreground">
          A playbook ships for every chapter that sets at least {PLAYBOOK_LINE} questions a paper on the{" "}
          {RECENT.label} papers. {TAIL_CHAPTERS.map((c) => c.name).join(", ")} sets fewer and has notes only. The
          other {LEFT_CHAPTERS.length} chapters left the syllabus; all of them are listed on the{" "}
          <Link
            href={`${GUIDE_BASE}/strategy`}
            className="font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            strategy page
          </Link>
          .
        </p>
      </section>

      <PrevNextNav
        prev={{ href: `${GUIDE_BASE}/strategy`, label: "Strategy" }}
        next={{ href: `${GUIDE_BASE}/reference`, label: "Reference" }}
      />
    </GuideShell>
  );
}
