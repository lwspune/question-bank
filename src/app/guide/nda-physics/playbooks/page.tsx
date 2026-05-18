import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { ROUTES } from "../_data/nda-physics";
import { PLAYBOOKS, PLAYBOOKS_BY_BUCKET } from "../_data/playbooks";
import { PLAYBOOK_DETAIL_SLUGS } from "../_data/playbook-details";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA Physics Playbooks — 14 chapters, drilled",
  description:
    "Fourteen playbooks for NDA PART B Physics — one per chapter. Light & Optics, E&M, Mechanics, Heat, Modern, Sound, more. Each playbook: how the chapter is tested, the sub-skills, the traps, the must-drill subtopics, and a one-click drill link.",
  alternates: { canonical: "/guide/nda-physics/playbooks" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-physics/${r.slug}` : "/guide/nda-physics",
  label: r.label,
}));

const BUCKET_INFO = {
  recall: {
    label: "Recall — Sound · Modern · Astronomy · Energy · Units",
    blurb:
      "Pure fact recall. Memorisation discipline + statement-truth practice. 5 chapters, 79 questions, 2% average HARD.",
  },
  apply: {
    label: "Apply — Light · Laws of Motion · Kinematics · WEP · Gravitation · Oscillations",
    blurb:
      "Formula plug-in. Each chapter anchored on 1–3 named formulas — recognise the formula, watch the sign and unit. 6 chapters, 215 q.",
  },
  reason: {
    label: "Reason — Electricity & Magnetism · Heat · Fluid Mechanics",
    blurb:
      "Multi-step computational reasoning. 3 chapters, 155 q, 22% average HARD — the bank's HARD-concentrated strand.",
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
      guideTitle="NDA Physics Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-physics"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-physics", label: "NDA Physics" },
        { label: "Playbooks" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/nda-physics/playbooks"
        headline="NDA Physics Playbooks — 14 chapters, drilled"
        description="Fourteen playbooks for NDA PART B Physics — one per chapter. Each: how the chapter is tested, the sub-skills, the traps, and a one-click drill link."
      />
      <GuideHero
        eyebrow="Playbooks"
        title={`${PLAYBOOKS.length} chapter playbooks behind every NDA Physics question`}
        subtitle="One playbook per chapter (subtopics are too fine for English-style per-subtopic playbooks). Grouped by the strategic axis that matters: Recall / Apply / Reason."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {(["recall", "apply", "reason"] as const).map((bucket) => {
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
                      href={`/guide/nda-physics/playbooks/${p.slug}`}
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
        prev={{ href: "/guide/nda-physics/strategy", label: "Strategy" }}
        next={{
          href: "/guide/nda-physics/formulas",
          label: "Formula compendium",
        }}
      />
    </GuideShell>
  );
}
