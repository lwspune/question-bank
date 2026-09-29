import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Info } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { OVERVIEW, ROUTES } from "../_data/cds-maths";
import { PLAYBOOKS, playbooksInBucket, type PlaybookBucket } from "../_data/playbooks";
import { TAIL_CHAPTERS } from "../_data/strategy";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "CDS Maths Playbooks — 22 chapters, drilled",
  description:
    "Twenty-two playbooks for CDS Elementary Mathematics — one per chapter at 1.5 questions a paper or more, grouped Cornerstone / Quick-Win / Selective. Each: how the chapter is tested, its sub-skills, its traps, where the HARD questions sit, and a one-click drill link.",
  alternates: { canonical: "/guide/cds-maths/playbooks" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/cds-maths/${r.slug}` : "/guide/cds-maths",
  label: r.label,
}));

/** Human framing per strand. Carries NO statistics — every number is computed from the catalog. */
const STRAND_INFO: Record<PlaybookBucket, { label: string; blurb: string }> = {
  cornerstone: {
    label: "Cornerstone — prepare these first",
    blurb:
      "The five chapters the paper is built on. Four of them keep their HARD questions in one or two pages, so the rest of the chapter is cheap; the playbook says which pages.",
  },
  quickwin: {
    label: "Quick-Win — cheap marks",
    blurb:
      "Arithmetic and data chapters with low HARD rates and short questions. Attempt every one you meet, and guess after ruling out an option.",
  },
  selective: {
    label: "Selective — algebra and the rest of geometry",
    blurb:
      "Higher HARD rates, often pooled in one page. Bank the cheap pages; attempt the HARD pool only when you can see the solution.",
  },
};

const STRAND_ORDER: PlaybookBucket[] = ["cornerstone", "quickwin", "selective"];

const cardClass =
  "group flex h-full flex-col rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function PlaybooksIndex() {
  const coveredQ = PLAYBOOKS.reduce((s, p) => s + p.qCount, 0);
  const coveredPerPaper = PLAYBOOKS.reduce((s, p) => s + p.qPerPaper, 0);
  const tailQ = TAIL_CHAPTERS.reduce((s, c) => s + c.qCount, 0);

  const stats = [
    { value: String(PLAYBOOKS.length), label: "Playbooks" },
    { value: coveredQ.toLocaleString("en-IN"), label: "Questions covered" },
    { value: coveredPerPaper.toFixed(1), label: `of ${OVERVIEW.paper.questions} q/paper covered` },
    { value: String(OVERVIEW.papers), label: "Papers analysed" },
  ];

  const playbooksBlurb = ROUTES.find((r) => r.slug === "playbooks")?.blurb;

  return (
    <GuideShell
      guideTitle="CDS Maths Guide"
      sideNav={sideNav}
      landingHref="/guide/cds-maths"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/cds", label: "CDS" },
        { href: "/guide/cds-maths", label: "Mathematics" },
        { label: "Playbooks" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/cds-maths/playbooks"
        headline="CDS Maths Playbooks — 22 chapters, drilled"
        description="Twenty-two playbooks for CDS Elementary Mathematics — one per chapter at 1.5 questions a paper or more. Each: how the chapter is tested, its sub-skills, its traps, and a one-click drill link."
      />
      <GuideHero
        eyebrow="Playbooks"
        title={`${PLAYBOOKS.length} chapter playbooks behind ${coveredPerPaper.toFixed(1)} of the ${OVERVIEW.paper.questions} questions`}
        subtitle={playbooksBlurb}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {STRAND_ORDER.map((bucket) => {
        const list = playbooksInBucket(bucket);
        const strandQ = list.reduce((s, p) => s + p.qCount, 0);
        const strandPerPaper = list.reduce((s, p) => s + p.qPerPaper, 0);
        const hardRates = list.map((p) => p.pctHard);

        return (
          <section key={bucket} className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{STRAND_INFO[bucket].label}</h2>
            <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
              {STRAND_INFO[bucket].blurb}
            </p>
            <p className="mt-3 text-xs tabular-nums text-muted-foreground">
              {list.length} playbook{list.length === 1 ? "" : "s"} · {strandQ.toLocaleString("en-IN")} questions ·{" "}
              {strandPerPaper.toFixed(1)} of {OVERVIEW.paper.questions} q/paper · {Math.min(...hardRates)}&ndash;
              {Math.max(...hardRates)}% HARD
            </p>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {list.map((p) => (
                <li key={p.slug}>
                  <Link href={`/guide/cds-maths/playbooks/${p.slug}`} className={cardClass}>
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
                        {p.qCount} q · {p.qPerPaper.toFixed(2)}/paper · {p.pctHard}% hard · {p.subtopics.length}{" "}
                        subtopic{p.subtopics.length === 1 ? "" : "s"}
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
          A playbook ships for every chapter at <strong>1.5 questions a paper or more</strong> across the{" "}
          {OVERVIEW.papers} papers. The other {TAIL_CHAPTERS.length} are named below — between them{" "}
          {tailQ.toLocaleString("en-IN")} of the {OVERVIEW.totalQ.toLocaleString("en-IN")} questions — and each
          has full teaching notes. They are also covered on the{" "}
          <Link
            href="/guide/cds-maths/strategy"
            className="font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            strategy page
          </Link>
          .
        </p>
        <ul className="mt-5 space-y-3">
          {TAIL_CHAPTERS.map((c) => (
            <li key={c.chapter} className="rounded-md border bg-card p-4">
              <h3 className="text-sm font-semibold tracking-tight">{c.chapter}</h3>
              <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                {c.qCount} q · {c.qPerPaper.toFixed(2)}/paper · {c.pctHard}% hard
              </p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">{c.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <PrevNextNav
        prev={{ href: "/guide/cds-maths/strategy", label: "Strategy" }}
        next={{ href: "/guide/cds-maths/formulas", label: "Formulas" }}
      />
    </GuideShell>
  );
}
