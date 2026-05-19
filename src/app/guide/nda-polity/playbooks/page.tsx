import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { ROUTES } from "../_data/nda-polity";
import { PLAYBOOKS, PLAYBOOKS_BY_BUCKET } from "../_data/playbooks";
import { PLAYBOOK_DETAIL_SLUGS } from "../_data/playbook-details";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA Polity Playbooks — 4 chapters, drilled",
  description:
    "Four playbooks for NDA PART A Polity — one per chapter. Government Structure (cornerstone), Indian Constitution + Fundamental Rights/DPSP (foundation recall), World Polity (specialist wildcard). Each playbook: how the chapter is tested, the sub-skills, the traps, the must-drill subtopics, and a one-click drill link.",
  alternates: { canonical: "/guide/nda-polity/playbooks" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-polity/${r.slug}` : "/guide/nda-polity",
  label: r.label,
}));

const BUCKET_INFO = {
  cornerstone: {
    label: "Cornerstone — Government Structure",
    blurb:
      "40% of the bank in a single chapter AND highest absolute HARD count (6 of 17). Constitutional Bodies (21 q) + Parliament (10 q) + Judiciary (2 q) + Government Departments (3 q). 36 questions, 17% HARD. Drill all 4 subtopics; target HARDs in Parliament (Money Bill vs Finance Bill, Speaker's powers) + Judiciary (HC territorial jurisdictions).",
  },
  foundation: {
    label: "Foundation Recall — Indian Constitution + FR/DPSP/Local Governance",
    blurb:
      "Constitutional-content recall heavy. Articles (FR 12–35, DPSP 36–51, FD 51A), Amendments (42nd, 73rd/74th, 86th, 101st, 103rd), Parts/Schedules (Anti-Defection 10th, PRI 11th, FR Part III). 2 chapters, 42 q at ~14% HARD avg. The /reference-tables page does most of the work — Key Articles cluster + Amendments cluster compound here.",
  },
  specialist: {
    label: "Specialist Wildcard — World Polity",
    blurb:
      "Smallest chapter (12 q · 13% of bank) BUT highest %HARD (42%) — INVERTS History's Quick-Win pattern. 50% multi-statement, abstract theory + UN reference content. UN Peacekeeping ↔ region, UNSC composition, UN Declarations chronology, universal adult franchise chronology, Panchsheel 5 principles. Drill cold or skip — confidence threshold 75%+.",
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
      guideTitle="NDA Polity Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-polity"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-polity", label: "NDA Polity" },
        { label: "Playbooks" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/nda-polity/playbooks"
        headline="NDA Polity Playbooks — 4 chapters, drilled"
        description="Four playbooks for NDA PART A Polity — one per chapter. Each: how the chapter is tested, the sub-skills, the traps, and a one-click drill link."
      />
      <GuideHero
        eyebrow="Playbooks"
        title={`${PLAYBOOKS.length} chapter playbooks behind every NDA Polity question`}
        subtitle="One playbook per chapter. Polity's 14 subtopics range 2–21 q — chapter is the natural unit, per-subtopic playbooks would proliferate without adding clarity. Grouped by the strategic axis that matters: Cornerstone / Foundation Recall / Specialist Wildcard."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {(["cornerstone", "foundation", "specialist"] as const).map((bucket) => {
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
                      href={`/guide/nda-polity/playbooks/${p.slug}`}
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
        prev={{ href: "/guide/nda-polity/strategy", label: "Strategy" }}
        next={{
          href: "/guide/nda-polity/reference-tables",
          label: "Reference tables",
        }}
      />
    </GuideShell>
  );
}
