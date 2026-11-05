/**
 * The JEE Mains (Maths, Physics, Chemistry) and CDS Maths playbook detail page
 * (/guide/<guide>/playbooks/<slug>), one component for all four (TECH_DEBT_SPEC.md 3.1).
 *
 * WHY: the four page files were copies differing only in settings: the subject, the tier or
 * strand labels, three of the four stats, the link after the last playbook and one word in the
 * notes callout (14-60 changed lines between any two, 2026-11-05). The HTML of every guide
 * playbook page was compared before and after: identical.
 *
 * Route segment config (`revalidate`) stays a literal in each page file: Next reads it statically.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, BookOpen, Lightbulb, Wrench } from "lucide-react";
import { fitTitle } from "@/lib/seo/title";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import RelatedPlaybooks from "@/app/guide/_components/RelatedPlaybooks";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";

type JeePlaybook = {
  slug: string;
  name: string;
  summary: string;
  chapter: string;
  subtopics: readonly string[];
  qCount: number;
  bucket: string;
  notesHref: string;
};

type JeePlaybookDetail = {
  trigger: string;
  story: readonly string[];
  subSkills: readonly { name: string; description: string }[];
  traps: readonly { name: string; description: string }[];
  relatedSlugs: readonly string[];
};

export type JeePlaybookSettings<P extends JeePlaybook> = {
  /** URL segment after /guide/, e.g. "jee-mains-maths". */
  guidePath: string;
  /** e.g. "JEE Mains Maths": titles and JSON-LD headline. */
  displayName: string;
  exam: { taxonomyName: string; crumbHref: string; crumbLabel: string };
  /** Taxonomy subject name ("Maths", "Mathematics", ...) and its breadcrumb label. */
  subject: { taxonomyName: string; crumbLabel: string };
  sideNav: { href: string; label: string }[];
  playbooks: readonly P[];
  details: Readonly<Record<string, JeePlaybookDetail | undefined>>;
  /** "Tier" or "Strand", and the short name of each bucket. */
  bucket: { word: string; labels: Readonly<Record<string, string>> };
  /** The hero's four stats. */
  stats: (p: P) => { value: string; label: string }[];
  /** Where "next" points after the last playbook. */
  afterLast: { href: string; label: string };
  /** What one notes page is called: JEE "page", CDS "subtopic". */
  notesUnit: "page" | "subtopic";
};

const linkClass =
  "font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

type Params = { slug: string };

export function makeJeePlaybookRoute<P extends JeePlaybook>(s: JeePlaybookSettings<P>) {
  const base = `/guide/${s.guidePath}`;
  const find = (slug: string) => s.playbooks.find((p) => p.slug === slug);

  return {
    generateStaticParams(): Params[] {
      return s.playbooks.map((p) => ({ slug: p.slug }));
    },

    async generateMetadata({ params }: { params: Params }): Promise<Metadata> {
      const playbook = find(params.slug);
      if (!playbook) return { title: "Playbook not found" };
      return {
        title: {
          absolute: fitTitle(playbook.name, [s.displayName, { text: "Playbook", optional: true }], { shortenLead: false }),
        },
        description: playbook.summary,
        alternates: { canonical: `${base}/playbooks/${params.slug}` },
      };
    },

    async Page({ params }: { params: Params }) {
      const playbook = find(params.slug);
      const detail = s.details[params.slug];
      if (!playbook || !detail) notFound();

      const supabase = createSupabaseAnonClient();
      const taxonomy = await resolveTaxonomy(supabase, s.exam.taxonomyName, s.subject.taxonomyName);

      const chap = taxonomy.chapters.get(playbook.chapter);
      const chapterIds = chap ? [chap.id] : [];
      // An unresolved name (a taxonomy rename) renders as plain text, not a drill link to nothing.
      const subtopicRows = playbook.subtopics.map((name) => ({ name, id: chap?.subtopics.get(name) }));
      const subtopicIds = subtopicRows.map((r) => r.id).filter((id): id is string => Boolean(id));

      const list = s.playbooks;
      const idx = list.findIndex((p) => p.slug === params.slug);
      const prev =
        idx > 0
          ? { href: `${base}/playbooks/${list[idx - 1].slug}`, label: list[idx - 1].name }
          : { href: `${base}/playbooks`, label: "All playbooks" };
      const next = idx >= 0 && idx + 1 < list.length ? { href: `${base}/playbooks/${list[idx + 1].slug}`, label: list[idx + 1].name } : s.afterLast;

      const unit = s.notesUnit;

      return (
        <GuideShell
          guideTitle={`${s.displayName} Guide`}
          sideNav={s.sideNav}
          landingHref={base}
          breadcrumbs={[
            { href: "/guide", label: "Guides" },
            { href: s.exam.crumbHref, label: s.exam.crumbLabel },
            { href: base, label: s.subject.crumbLabel },
            { href: `${base}/playbooks`, label: "Playbooks" },
            { label: playbook.name },
          ]}
        >
          <GuideJsonLd
            type="Article"
            path={`${base}/playbooks/${params.slug}`}
            headline={`${playbook.name} — ${s.displayName} playbook`}
            description={playbook.summary}
          />
          <GuideHero eyebrow="Playbook" title={playbook.name} subtitle={playbook.summary}>
            <StatBlock stats={s.stats(playbook)} />
          </GuideHero>

          <p className="-mt-6 text-sm text-muted-foreground sm:-mt-8">
            {`${s.bucket.word}:`}{" "}
            <Link href={`${base}/strategy`} className={linkClass}>
              {s.bucket.labels[playbook.bucket]}
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
                {detail.subSkills.map((sk) => (
                  <li key={sk.name} className="rounded-md border bg-card p-4">
                    <h3 className="text-sm font-semibold tracking-tight">{sk.name}</h3>
                    <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">{sk.description}</p>
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
                <Link href={`${base}/traps`} className={linkClass}>
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
              {`This chapter has full teaching notes — foundations, worked examples, self-checks and a mastery check for each ${unit}. Read the notes once, then drill ${unit} by ${unit} below.`}
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
              {subtopicRows.map((r) => (
                <li
                  key={r.name}
                  className="flex flex-col gap-1 rounded-md border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                >
                  <span className="text-sm">{r.name}</span>
                  {r.id && (
                    <BrowseLink
                      examId={taxonomy.examId}
                      subjectId={taxonomy.subjectId}
                      chapterIds={chapterIds}
                      subtopicIds={[r.id]}
                      variant="outline"
                      className="shrink-0 px-3 py-1 text-xs"
                    >
                      <span className="sr-only">Drill {r.name}</span>
                      <span aria-hidden>Drill</span>
                    </BrowseLink>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <RelatedPlaybooks
            guidePath={s.guidePath}
            items={s.playbooks}
            slugs={[...detail.relatedSlugs]}
            intro="Often paired with this one — the technique or the trap overlaps. Drill these next."
          />

          <PrevNextNav prev={prev} next={next} />
        </GuideShell>
      );
    },
  };
}
