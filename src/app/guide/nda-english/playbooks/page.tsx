import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { ROUTES } from "../_data/nda-english";
import { PLAYBOOKS_BY_BUCKET, PLAYBOOKS } from "../_data/playbooks";
import { PLAYBOOK_DETAIL_SLUGS } from "../_data/playbook-details";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "NDA English Playbooks — 16 question types, drilled",
  description:
    "Sixteen playbooks for NDA English (GAT) — one per major subtopic. Vocabulary, Idioms, Grammar, Spotting Errors, RC, Cloze, Sentence Rearrangement, FIB. Each playbook: how the question is asked, the sub-skills, the traps, and a one-click drill link.",
  alternates: { canonical: "/guide/nda-english/playbooks" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-english/${r.slug}` : "/guide/nda-english",
  label: r.label,
}));

const BUCKET_INFO = {
  recall: {
    label: "Recall — Vocab + Idioms",
    blurb:
      "Pure memorisation. Either you know the word/idiom or you don't. 4 playbooks, 402 questions.",
  },
  rule: {
    label: "Rule — Errors + Grammar",
    blurb:
      "Rule recognition + application. 8 playbooks across both chapters; Grammar chunk exploded post-2024.",
  },
  reason: {
    label: "Reason — RC + Rearrangement + Cloze + FIB",
    blurb:
      "Context + logic. 4 playbooks. Sentence Rearrangement is the bank's only chapter with real HARD load.",
  },
} as const;

export default function PlaybooksIndex() {
  const totalQ = PLAYBOOKS.reduce((s, p) => s + p.qCount, 0);
  const detailSet = new Set(PLAYBOOK_DETAIL_SLUGS);

  const stats = [
    { value: String(PLAYBOOKS.length), label: "playbooks" },
    { value: totalQ.toLocaleString("en-IN"), label: "questions covered" },
    { value: "3", label: "skill buckets" },
    { value: "10", label: "years analysed" },
  ];

  return (
    <GuideShell
      guideTitle="NDA English Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-english"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-english", label: "NDA English" },
        { label: "Playbooks" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/nda-english/playbooks"
        headline="NDA English Playbooks — 16 question types, drilled"
        description="Sixteen playbooks for NDA English — one per major subtopic. Each: how the question is asked, the sub-skills, the traps, and a one-click drill link."
      />
      <GuideHero
        eyebrow="Playbooks"
        title={`${PLAYBOOKS.length} playbooks behind every NDA English question`}
        subtitle="Each chapter of NDA English is a sealed question-type. One playbook per major subtopic, grouped by the strategic axis that matters: Recall / Rule / Reason."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {(["recall", "rule", "reason"] as const).map((bucket) => {
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
                      href={`/guide/nda-english/playbooks/${p.slug}`}
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
        prev={{ href: "/guide/nda-english/strategy", label: "Strategy" }}
        next={{
          href: "/guide/nda-english/vocab-families",
          label: "Vocab Families",
        }}
      />
    </GuideShell>
  );
}
