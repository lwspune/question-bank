import type { Metadata } from "next";
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
import { getNotesChaptersForSubject } from "@/lib/notes/chapters";
import { ROUTES } from "../../_data/mht-cet-maths";
import {
  PLAYBOOKS,
  PLAYBOOK_SLUGS,
  type PlaybookBucket,
} from "../../_data/playbooks";
import { PLAYBOOK_DETAILS } from "../../_data/playbook-details";

export const revalidate = 86400;

type Params = { slug: string };

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/mht-cet-maths/${r.slug}` : "/guide/mht-cet-maths",
  label: r.label,
}));

/** Short strand names. Kept in sync by eye with the playbooks index — the two
 *  pages are the only consumers, and neither may add a field to _data. */
const STRAND_LABEL: Record<PlaybookBucket, string> = {
  cornerstone: "Cornerstone",
  quickwin: "Quick-Win",
  longtail: "Long Tail",
};

export function generateStaticParams(): Params[] {
  return PLAYBOOK_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const playbook = PLAYBOOKS.find((p) => p.slug === params.slug);
  if (!playbook) return { title: "Playbook not found" };
  return {
    title: `${playbook.name} — MHT-CET Maths playbook`,
    description: playbook.summary,
    alternates: { canonical: `/guide/mht-cet-maths/playbooks/${params.slug}` },
  };
}

export default async function PlaybookDetail({ params }: { params: Params }) {
  const playbook = PLAYBOOKS.find((p) => p.slug === params.slug);
  const detail = PLAYBOOK_DETAILS[params.slug];
  // Every one of the 22 playbooks has a deep dive; a half-populated page would
  // be worse than a 404, so both must resolve.
  if (!playbook || !detail) notFound();

  const supabase = createSupabaseAnonClient();
  // "Maths" is MHT-CET's subject literal — NOT "Mathematics" (that is NDA's).
  const taxonomy = await resolveTaxonomy(supabase, "MHT-CET", "Maths");

  const chap = taxonomy.chapters.get(playbook.chapter);
  const chapterIds = chap ? [chap.id] : [];
  // Pair each subtopic with its resolved id so an unresolved name (a taxonomy
  // rename) renders as plain text rather than as a drill link to nothing.
  const subtopicRows = playbook.subtopics.map((name) => ({
    name,
    id: chap?.subtopics.get(name),
  }));
  const subtopicIds = subtopicRows
    .map((s) => s.id)
    .filter((id): id is string => Boolean(id));

  // Teaching notes exist for only some chapters; the notes chapterSlug happens
  // to equal the playbook slug here. Derived from the live registry so a
  // renamed notes chapter cannot leave a link pointing at a 404.
  const notedSlugs = new Set(
    getNotesChaptersForSubject("mht-cet-maths").map((c) => c.chapterSlug)
  );
  const notesHref = notedSlugs.has(playbook.slug)
    ? `/notes/mht-cet-maths/${playbook.slug}`
    : null;

  // Prev/Next chains along the PLAYBOOKS order so a reader can walk the
  // catalog in strand order.
  const idx = PLAYBOOKS.findIndex((p) => p.slug === params.slug);
  const prev =
    idx > 0
      ? {
          href: `/guide/mht-cet-maths/playbooks/${PLAYBOOKS[idx - 1].slug}`,
          label: PLAYBOOKS[idx - 1].name,
        }
      : { href: "/guide/mht-cet-maths/playbooks", label: "All playbooks" };
  const next =
    idx >= 0 && idx + 1 < PLAYBOOKS.length
      ? {
          href: `/guide/mht-cet-maths/playbooks/${PLAYBOOKS[idx + 1].slug}`,
          label: PLAYBOOKS[idx + 1].name,
        }
      : { href: "/guide/mht-cet-maths/formulas", label: "Formulas" };

  const stats = [
    { value: String(playbook.qCount), label: "Questions in the bank" },
    {
      value: playbook.qPerPaper.toFixed(2),
      label: "q/paper (2024–25 shifts)",
    },
    { value: `${playbook.pctHard}%`, label: "Tagged HARD" },
    {
      value: String(playbook.subtopics.length),
      label: `Subtopic${playbook.subtopics.length === 1 ? "" : "s"}`,
    },
  ];

  return (
    <GuideShell
      guideTitle="MHT-CET Maths Guide"
      sideNav={sideNav}
      landingHref="/guide/mht-cet-maths"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/mht-cet", label: "MHT-CET" },
        { href: "/guide/mht-cet-maths", label: "Mathematics" },
        { href: "/guide/mht-cet-maths/playbooks", label: "Playbooks" },
        { label: playbook.name },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path={`/guide/mht-cet-maths/playbooks/${params.slug}`}
        headline={`${playbook.name} — MHT-CET Maths playbook`}
        description={playbook.summary}
      />
      <GuideHero
        eyebrow="Playbook"
        title={playbook.name}
        subtitle={playbook.summary}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      <p className="-mt-6 text-sm text-muted-foreground sm:-mt-8">
        Strand:{" "}
        <Link
          href="/guide/mht-cet-maths/strategy"
          className="font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {STRAND_LABEL[playbook.bucket]}
        </Link>
      </p>

      {/* Trigger callout */}
      <section className="mt-8 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="flex items-start gap-2 text-sm font-medium uppercase tracking-wide text-primary">
          <Lightbulb className="mt-0.5 h-4 w-4" aria-hidden />
          When you&rsquo;ll see it
        </h2>
        <p className="mt-2 font-serif text-base leading-relaxed text-foreground">
          {detail.trigger}
        </p>
      </section>

      {/* Story */}
      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          How this chapter is tested
        </h2>
        {detail.story.map((para, i) => (
          <p
            key={i}
            className="font-serif text-base leading-relaxed text-muted-foreground"
          >
            {para}
          </p>
        ))}
      </section>

      {/* Sub-skills */}
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
                <h3 className="text-sm font-semibold tracking-tight">
                  {s.name}
                </h3>
                <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Traps */}
      {detail.traps.length > 0 && (
        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
            <AlertTriangle className="h-5 w-5 text-primary" aria-hidden />
            Traps to expect
          </h2>
          <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
            Distractor shapes this chapter reuses. The{" "}
            <Link
              href="/guide/mht-cet-maths/traps"
              className="text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Traps page
            </Link>{" "}
            covers the patterns that cut across chapters.
          </p>
          <ul className="mt-4 space-y-3">
            {detail.traps.map((t) => (
              <li
                key={t.name}
                className="rounded-md border-l-4 border-amber-500/60 bg-amber-50/40 p-4 dark:bg-amber-950/20"
              >
                <h3 className="text-sm font-semibold tracking-tight">
                  {t.name}
                </h3>
                <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
                  {t.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Teaching notes — only for the chapters that ship them. */}
      {notesHref && (
        <section className="mt-12 rounded-lg border bg-card p-5">
          <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
            <BookOpen className="h-4 w-4 text-primary" aria-hidden />
            Learn it before you drill it
          </h2>
          <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
            This chapter has full teaching notes — foundations, worked
            examples, self-checks and a per-subtopic mastery checkpoint. Read
            the notes once, then drill subtopic by subtopic below.
          </p>
          <Link
            href={notesHref}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {playbook.name} notes
          </Link>
        </section>
      )}

      {/* Primary drill CTA */}
      <section className="mt-12 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Drill every {playbook.name.toLowerCase()} question
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          {playbook.qCount} questions from the bank, scoped to{" "}
          {playbook.subtopics.length === 1
            ? "the named subtopic"
            : `${playbook.subtopics.length} bundled subtopics`}
          .
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

      {/* Per-subtopic drills */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Drill one subtopic at a time
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          The {playbook.subtopics.length} subtopic
          {playbook.subtopics.length === 1 ? "" : "s"} this playbook covers, in
          catalog order.
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
                  Drill
                </BrowseLink>
              )}
            </li>
          ))}
        </ul>
      </section>

      <RelatedPlaybooks
        guidePath="mht-cet-maths"
        items={PLAYBOOKS}
        slugs={detail.relatedSlugs}
        intro="Often paired with this one — the technique, the trap or the taxonomy overlaps. Drill these next."
      />

      <PrevNextNav prev={prev} next={next} />
    </GuideShell>
  );
}
