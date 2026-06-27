import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { ROUTES } from "../_data/nda-biology";
import { PLAYBOOKS, PLAYBOOKS_BY_BUCKET } from "../_data/playbooks";
import { PLAYBOOK_DETAIL_SLUGS } from "../_data/playbook-details";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "NDA Biology Playbooks — 9 chapters, drilled",
  description:
    "Nine playbooks for NDA PART B Biology — one per chapter. Human Physiology, Cell Biology, Plant Biology, Microbiology, Reproduction, Ecology, Biodiversity, Genetics, Biochemistry. Each playbook: how the chapter is tested, the sub-skills, the traps, the must-drill subtopics, and a one-click drill link.",
  alternates: { canonical: "/guide/nda-biology/playbooks" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-biology/${r.slug}` : "/guide/nda-biology",
  label: r.label,
}));

const BUCKET_INFO = {
  recall: {
    label:
      "Recall — Human Physiology · Cell Biology · Microbiology · Biodiversity · Genetics",
    blurb:
      "Pure fact recall — vitamin↔deficiency, organ↔function, organelle role, kingdom classification, disease↔pathogen, scientist↔discovery. 5 chapters, 132 questions, 1.5% average HARD. The marks-per-hour leader.",
  },
  apply: {
    label: "Apply — Plant Biology · Reproduction",
    blurb:
      "Mechanism-tracing — photosynthesis flow, transpiration physics, osmosis direction, inheritance ratios, pollination genetics. 2 chapters, 42 q at 4% HARD — including 4 of the bank's 5 HARDs.",
  },
  verify: {
    label: "Verify — Ecology + Environment · Biochemistry",
    blurb:
      "Multi-statement true/false evaluation. 'Consider the following statements about X. Which are correct?' shape dominates. 2 chapters, 16 q at 0% HARD. Slower per attempt — methodical evaluation pays.",
  },
} as const;

export default function PlaybooksIndex() {
  const totalQ = PLAYBOOKS.reduce((s, p) => s + p.qCount, 0);
  const detailSet = new Set(PLAYBOOK_DETAIL_SLUGS);

  const stats = [
    { value: String(PLAYBOOKS.length), label: "playbooks" },
    { value: totalQ.toLocaleString("en-IN"), label: "questions covered" },
    { value: "3", label: "skill strands" },
    { value: "10", label: "years analysed" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Biology Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-biology"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-biology", label: "NDA Biology" },
        { label: "Playbooks" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/nda-biology/playbooks"
        headline="NDA Biology Playbooks — 9 chapters, drilled"
        description="Nine playbooks for NDA PART B Biology — one per chapter. Each: how the chapter is tested, the sub-skills, the traps, and a one-click drill link."
      />
      <GuideHero
        eyebrow="Playbooks"
        title={`${PLAYBOOKS.length} chapter playbooks behind every NDA Biology question`}
        subtitle="One playbook per chapter (subtopics are well-cleaned but thin — per-subtopic playbooks would proliferate without adding clarity). Grouped by the strategic axis that matters: Recall / Apply / Verify."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {(["recall", "apply", "verify"] as const).map((bucket) => {
        const list = PLAYBOOKS_BY_BUCKET[bucket];
        const subtotal = list.reduce((s, p) => s + p.qCount, 0);
        return (
          <section key={bucket} className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {BUCKET_INFO[bucket].label}
            </h2>
            <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground sm:text-base">
              {BUCKET_INFO[bucket].blurb}{" "}
              <span className="tabular-nums">{subtotal} q total.</span>
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {list.map((p) => {
                const hasDetail = detailSet.has(p.slug);
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/guide/nda-biology/playbooks/${p.slug}`}
                      className="group flex h-full flex-col rounded-lg border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent"
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
                      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="tabular-nums">
                          {p.qCount} q · {p.pctHard}% hard
                        </span>
                        {hasDetail && (
                          <span className="inline-flex items-center gap-1 text-primary">
                            <BookOpen className="h-3 w-3" aria-hidden /> deep dive
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <PrevNextNav
        prev={{ href: "/guide/nda-biology/strategy", label: "Strategy" }}
        next={{
          href: "/guide/nda-biology/reference-tables",
          label: "Reference tables",
        }}
      />
    </GuideShell>
  );
}
