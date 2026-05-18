import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { ROUTES } from "../_data/nda-history";
import { PLAYBOOKS, PLAYBOOKS_BY_BUCKET } from "../_data/playbooks";
import { PLAYBOOK_DETAIL_SLUGS } from "../_data/playbook-details";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA History Playbooks — 4 chapters, drilled",
  description:
    "Four playbooks for NDA PART A History — one per chapter. Modern India (cornerstone), Ancient India + Medieval India (foundation recall), World History (quick-win). Each playbook: how the chapter is tested, the sub-skills, the traps, the must-drill subtopics, and a one-click drill link.",
  alternates: { canonical: "/guide/nda-history/playbooks" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-history/${r.slug}` : "/guide/nda-history",
  label: r.label,
}));

const BUCKET_INFO = {
  cornerstone: {
    label: "Cornerstone — Modern India",
    blurb:
      "47% of the bank in a single chapter — densest-HARD too. Freedom Movement + INC sessions + Gandhi satyagrahas + 19thC reformers + British Acts. 122 questions, 34% HARD. Cannot be cherry-picked — drill all subtopics, target HARDs in 19thC Reform + British Admin + British Economic.",
  },
  foundation: {
    label: "Foundation Recall — Ancient India + Medieval India",
    blurb:
      "Named-fact recall heavy (75% + 64% pure recall, only 5–6% date-anchored). Ruler↔dynasty, scholar↔text, traveller↔era, reformer↔movement pairs. 2 chapters, 97 q at 28% HARD avg — Medieval is genuinely DIFFUSE (3-3-3-3-2-1 HARD spread), drill all. The /timeline-and-pairs page does most of the work.",
  },
  quickwin: {
    label: "Quick-Win — World History",
    blurb:
      "Lightest %HARD (20%) — date-anchored quick-win pocket. 39% of the chapter q is date-anchored (highest in History). 1 chapter, 41 q. Drill the chronology cluster cold — once you have ~15 absolute dates, most questions answer themselves. Enlightenment + Political Revolutions is the densest %HARD subtopic.",
  },
} as const;

export default function PlaybooksIndex() {
  const totalQ = PLAYBOOKS.reduce((s, p) => s + p.qCount, 0);
  const detailSet = new Set(PLAYBOOK_DETAIL_SLUGS);

  const stats = [
    { value: String(PLAYBOOKS.length), label: "playbooks" },
    { value: totalQ.toLocaleString("en-IN"), label: "questions covered" },
    { value: "3", label: "tier strands" },
    { value: "10", label: "years analysed" },
  ];

  return (
    <GuideShell
      guideTitle="NDA History Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-history"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-history", label: "NDA History" },
        { label: "Playbooks" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/nda-history/playbooks"
        headline="NDA History Playbooks — 4 chapters, drilled"
        description="Four playbooks for NDA PART A History — one per chapter. Each: how the chapter is tested, the sub-skills, the traps, and a one-click drill link."
      />
      <GuideHero
        eyebrow="Playbooks"
        title={`${PLAYBOOKS.length} chapter playbooks behind every NDA History question`}
        subtitle="One playbook per chapter. History's 22 subtopics range 4–56 q — chapter is the natural unit, per-subtopic playbooks would proliferate without adding clarity. Grouped by the strategic axis that matters: Cornerstone / Foundation Recall / Quick-Win."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {(["cornerstone", "foundation", "quickwin"] as const).map((bucket) => {
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
                      href={`/guide/nda-history/playbooks/${p.slug}`}
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
        prev={{ href: "/guide/nda-history/strategy", label: "Strategy" }}
        next={{
          href: "/guide/nda-history/timeline-and-pairs",
          label: "Timeline & pairs",
        }}
      />
    </GuideShell>
  );
}
