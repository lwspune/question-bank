import type { Metadata } from "next";
import { fitTitle } from "@/lib/seo/title";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, BookOpen, Lightbulb, Wrench } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import RelatedPlaybooks from "@/app/guide/_components/RelatedPlaybooks";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { RECENT } from "../../_data/jee-mains-physics";
import { GUIDE_BASE, jeeGuideSideNav } from "../../_data/nav";
import { PLAYBOOKS, PLAYBOOK_SLUGS, type PlaybookBucket } from "../../_data/playbooks";
import { PLAYBOOK_DETAILS } from "../../_data/playbook-details";

export const revalidate = 86400;

type Params = { slug: string };

const sideNav = jeeGuideSideNav();

const TIER_LABEL: Record<PlaybookBucket, string> = {
  cornerstone: "Cornerstone",
  core: "Core",
  longtail: "Long tail",
};

const linkClass =
  "font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function generateStaticParams(): Params[] {
  return PLAYBOOK_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const playbook = PLAYBOOKS.find((p) => p.slug === params.slug);
  if (!playbook) return { title: "Playbook not found" };
  return {
    title: {
      absolute: fitTitle(playbook.name, ["JEE Mains Physics", { text: "Playbook", optional: true }], { shortenLead: false }),
    },
    description: playbook.summary,
    alternates: { canonical: `${GUIDE_BASE}/playbooks/${params.slug}` },
  };
}

export default async function PlaybookDetail({ params }: { params: Params }) {
  const playbook = PLAYBOOKS.find((p) => p.slug === params.slug);
  const detail = PLAYBOOK_DETAILS[params.slug];
  if (!playbook || !detail) notFound();

  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "JEE Mains", "Physics");

  const chap = taxonomy.chapters.get(playbook.chapter);
  const chapterIds = chap ? [chap.id] : [];
  // An unresolved name (a taxonomy rename) renders as plain text, not a drill link to nothing.
  const subtopicRows = playbook.subtopics.map((name) => ({ name, id: chap?.subtopics.get(name) }));
  const subtopicIds = subtopicRows.map((s) => s.id).filter((id): id is string => Boolean(id));

  const idx = PLAYBOOKS.findIndex((p) => p.slug === params.slug);
  const prev =
    idx > 0
      ? { href: `${GUIDE_BASE}/playbooks/${PLAYBOOKS[idx - 1].slug}`, label: PLAYBOOKS[idx - 1].name }
      : { href: `${GUIDE_BASE}/playbooks`, label: "All playbooks" };
  const next =
    idx >= 0 && idx + 1 < PLAYBOOKS.length
      ? { href: `${GUIDE_BASE}/playbooks/${PLAYBOOKS[idx + 1].slug}`, label: PLAYBOOKS[idx + 1].name }
      : { href: `${GUIDE_BASE}/formulas`, label: "Formulas" };

  const stats = [
    { value: String(playbook.qCount), label: "Questions in the bank" },
    { value: playbook.recentPerPaper.toFixed(2), label: `q/paper in ${RECENT.label}` },
    { value: `${playbook.pctNumeric}%`, label: "Numeric answer" },
    { value: String(playbook.subtopics.length), label: `Notes page${playbook.subtopics.length === 1 ? "" : "s"}` },
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
        { href: `${GUIDE_BASE}/playbooks`, label: "Playbooks" },
        { label: playbook.name },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path={`${GUIDE_BASE}/playbooks/${params.slug}`}
        headline={`${playbook.name} — JEE Mains Physics playbook`}
        description={playbook.summary}
      />
      <GuideHero eyebrow="Playbook" title={playbook.name} subtitle={playbook.summary}>
        <StatBlock stats={stats} />
      </GuideHero>

      <p className="-mt-6 text-sm text-muted-foreground sm:-mt-8">
        Tier:{" "}
        <Link href={`${GUIDE_BASE}/strategy`} className={linkClass}>
          {TIER_LABEL[playbook.bucket]}
        </Link>
      </p>

      <section className="mt-8 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="flex items-start gap-2 text-sm font-medium uppercase tracking-wide text-primary">
          <Lightbulb className="mt-0.5 h-4 w-4" aria-hidden />
          When you&rsquo;ll see it
        </h2>
        <p className="mt-2 font-serif text-base leading-relaxed text-foreground">{detail.trigger}</p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">How this chapter is tested</h2>
        {detail.story.map((para, i) => (
          <p key={i} className="font-serif text-base leading-relaxed text-muted-foreground">
            {para}
          </p>
        ))}
      </section>

      {detail.subSkills.length > 0 && (
        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
            <Wrench className="h-5 w-5 text-primary" aria-hidden />
            The sub-skills
          </h2>
          <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
            The distinct skills inside the chapter, in the order to learn them.
          </p>
          <ul className="mt-4 space-y-3">
            {detail.subSkills.map((s) => (
              <li key={s.name} className="rounded-md border bg-card p-4">
                <h3 className="text-sm font-semibold tracking-tight">{s.name}</h3>
                <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {detail.traps.length > 0 && (
        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
            <AlertTriangle className="h-5 w-5 text-primary" aria-hidden />
            Traps to expect
          </h2>
          <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
            Distractor shapes this chapter reuses. The{" "}
            <Link href={`${GUIDE_BASE}/traps`} className={linkClass}>
              Traps page
            </Link>{" "}
            covers the ones that cut across chapters.
          </p>
          <ul className="mt-4 space-y-3">
            {detail.traps.map((t) => (
              <li
                key={t.name}
                className="rounded-md border-l-4 border-amber-500/60 bg-amber-50/40 p-4 dark:bg-amber-950/20"
              >
                <h3 className="text-sm font-semibold tracking-tight">{t.name}</h3>
                <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">{t.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12 rounded-lg border bg-card p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <BookOpen className="h-4 w-4 text-primary" aria-hidden />
          Learn it before you drill it
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          This chapter has full teaching notes — foundations, worked examples, self-checks and a mastery check
          for each page. Read the notes once, then drill page by page below.
        </p>
        <Link href={playbook.notesHref} className={`mt-3 inline-flex items-center gap-1.5 text-sm ${linkClass}`}>
          {playbook.name} notes
        </Link>
      </section>

      <section className="mt-12 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">Drill every {playbook.name} question</h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          {playbook.qCount} questions from the bank, across {playbook.subtopics.length} subtopic
          {playbook.subtopics.length === 1 ? "" : "s"}.
        </p>
        <div className="mt-4 flex justify-center">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            chapterIds={chapterIds}
            subtopicIds={subtopicIds}
          >
            Drill the {playbook.qCount} questions
          </BrowseLink>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Drill one subtopic at a time</h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          The {playbook.subtopics.length} subtopic{playbook.subtopics.length === 1 ? "" : "s"}, in teaching order.
        </p>
        <ul className="mt-4 space-y-1.5">
          {subtopicRows.map((s) => (
            <li
              key={s.name}
              className="flex flex-col gap-1 rounded-md border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
            >
              <span className="text-sm">{s.name}</span>
              {s.id && (
                <BrowseLink
                  examId={taxonomy.examId}
                  subjectId={taxonomy.subjectId}
                  chapterIds={chapterIds}
                  subtopicIds={[s.id]}
                  variant="outline"
                  className="shrink-0 px-3 py-1 text-xs"
                >
                  <span className="sr-only">Drill {s.name}</span>
                  <span aria-hidden>Drill</span>
                </BrowseLink>
              )}
            </li>
          ))}
        </ul>
      </section>

      <RelatedPlaybooks
        guidePath="jee-mains-physics"
        items={PLAYBOOKS}
        slugs={detail.relatedSlugs}
        intro="Often paired with this one — the technique or the trap overlaps. Drill these next."
      />

      <PrevNextNav prev={prev} next={next} />
    </GuideShell>
  );
}
