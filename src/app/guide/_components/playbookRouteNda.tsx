/**
 * The NDA guides' playbook detail page (/guide/nda-<subject>/playbooks/<slug>), one component for
 * all seven NDA subjects (TECH_DEBT_SPEC.md 3.1).
 *
 * WHY: the seven page files were copies that differed only in the subject, the link after the
 * last playbook and English's wording (34-59 changed lines between any two, 2026-11-05), so a fix
 * to one had to be made seven times. Each subject's page file now passes its data and settings;
 * the HTML of all 224 guide playbook pages was compared before and after: identical.
 *
 * Route segment config (`revalidate`) stays a literal in each page file: Next reads it statically.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lightbulb, Wrench, AlertTriangle } from "lucide-react";
import { fitTitle } from "@/lib/seo/title";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import WorkedExampleCard from "@/app/guide/_components/WorkedExampleCard";
import RelatedPlaybooks from "@/app/guide/_components/RelatedPlaybooks";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { loadWorkedExamples } from "@/lib/guide/loadWorkedExamples";

type NdaPlaybook = {
  slug: string;
  name: string;
  summary: string;
  chapter: string;
  subtopics: readonly string[];
  qCount: number;
  pctHard: number;
};

type NdaPlaybookDetail = {
  trigger: string;
  story: readonly string[];
  subSkills: readonly { name: string; description: string }[];
  traps: readonly { name: string; description: string }[];
  exampleQuestionIds: readonly string[];
  relatedSlugs: readonly string[];
};

export type NdaPlaybookSettings = {
  /** URL segment after /guide/, e.g. "nda-biology". */
  guidePath: string;
  /** e.g. "NDA Biology": titles, breadcrumb, JSON-LD headline. */
  displayName: string;
  /** The subject's name in the taxonomy, e.g. "Biology". */
  taxonomySubject: string;
  routes: readonly { slug: string; label: string }[];
  playbooks: readonly NdaPlaybook[];
  details: Readonly<Record<string, NdaPlaybookDetail | undefined>>;
  /** Where "next" points after the last playbook. */
  afterLast: { href: string; label: string };
  /** English talks about question types, not chapters. */
  wording?: "chapter" | "question-type";
};

type Params = { slug: string };

export function makeNdaPlaybookRoute(s: NdaPlaybookSettings) {
  const base = `/guide/${s.guidePath}`;
  const qt = s.wording === "question-type";
  const sideNav = s.routes.map((r) => ({ href: r.slug ? `${base}/${r.slug}` : base, label: r.label }));
  const find = (slug: string) => s.playbooks.find((p) => p.slug === slug);

  return {
    generateStaticParams(): Params[] {
      return s.playbooks.map((p) => ({ slug: p.slug }));
    },

    async generateMetadata({ params }: { params: Params }): Promise<Metadata> {
      const playbook = find(params.slug);
      if (!playbook) return { title: "Playbook not found" };
      return {
        title: { absolute: fitTitle(playbook.name, [s.displayName, { text: "Playbook", optional: true }], { shortenLead: false }) },
        description: playbook.summary,
        alternates: { canonical: `${base}/playbooks/${params.slug}` },
      };
    },

    async Page({ params }: { params: Params }) {
      const playbook = find(params.slug);
      const detail = s.details[params.slug];
      if (!playbook) notFound();

      const supabase = createSupabaseAnonClient();
      const [taxonomy, examples] = await Promise.all([
        resolveTaxonomy(supabase, "NDA", s.taxonomySubject),
        detail ? loadWorkedExamples(supabase, [...detail.exampleQuestionIds]) : Promise.resolve([]),
      ]);

      const chap = taxonomy.chapters.get(playbook.chapter);
      const chapterIds = chap ? [chap.id] : [];
      const subtopicIds = chap
        ? playbook.subtopics.map((name) => chap.subtopics.get(name)).filter((id): id is string => Boolean(id))
        : [];

      // Prev/Next chain along the playbook order, so a reader can walk the catalog.
      const list = s.playbooks;
      const idx = list.findIndex((p) => p.slug === params.slug);
      const prev =
        idx > 0
          ? { href: `${base}/playbooks/${list[idx - 1].slug}`, label: list[idx - 1].name }
          : { href: `${base}/playbooks`, label: "All playbooks" };
      const next = idx >= 0 && idx + 1 < list.length ? { href: `${base}/playbooks/${list[idx + 1].slug}`, label: list[idx + 1].name } : s.afterLast;

      const stats = [
        { value: String(playbook.qCount), label: "questions in the bank" },
        { value: `${playbook.pctHard}%`, label: "tagged HARD" },
        { value: String(playbook.subtopics.length), label: qt ? "subtopic(s) covered" : "subtopic(s)" },
        { value: String(examples.length), label: "worked examples" },
      ];

      return (
        <GuideShell
          guideTitle={`${s.displayName} Guide`}
          sideNav={sideNav}
          landingHref={base}
          breadcrumbs={[
            { href: "/guide", label: "Guides" },
            { href: "/guide/nda", label: "NDA" },
            { href: base, label: s.displayName },
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
            <StatBlock stats={stats} />
          </GuideHero>

          {detail ? (
            <>
              {/* Trigger callout */}
              <section className="mt-8 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
                <p className="flex items-start gap-2 text-sm font-medium uppercase tracking-wide text-primary">
                  <Lightbulb className="mt-0.5 h-4 w-4" aria-hidden />
                  When you&rsquo;ll see it
                </p>
                <p className="mt-2 font-serif text-base leading-relaxed text-foreground">{detail.trigger}</p>
              </section>

              {/* Story */}
              <section className="mt-10 space-y-4">
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {qt ? "How this question type works" : "How this chapter is tested"}
                </h2>
                {detail.story.map((para, i) => (
                  <p key={i} className="font-serif text-base leading-relaxed text-muted-foreground">
                    {para}
                  </p>
                ))}
              </section>

              {/* Sub-skills */}
              <section className="mt-12">
                <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
                  <Wrench className="h-5 w-5 text-primary" aria-hidden />
                  The sub-skills
                </h2>
                <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                  {qt
                    ? "The rules and habits that decide whether you get this question right."
                    : "The rules and habits that decide whether you get a question right."}
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

              {/* Worked examples */}
              {examples.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {examples.length} worked example{examples.length === 1 ? "" : "s"} from the bank
                  </h2>
                  <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                    {qt
                      ? "Real past-year questions tagged to this playbook. Click to reveal options + solution."
                      : "Real past-year questions illustrating the playbook. Click to reveal options + solution."}
                  </p>
                  <div className="mt-4 space-y-4">
                    {examples.map((ex, i) => (
                      <WorkedExampleCard key={ex.id} rank={i + 1} example={ex} />
                    ))}
                  </div>
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
                    {`Distractor shapes specific to this ${qt ? "playbook" : "chapter"}. The page-wide`}{" "}
                    <a className="text-primary hover:underline" href={`${base}/traps`}>
                      Traps section
                    </a>{" "}
                    covers the bank-level patterns.
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
            </>
          ) : (
            <section className="mt-8 rounded-md border-2 border-dashed bg-muted/30 p-5 text-sm text-muted-foreground">
              A full deep-dive for this playbook is on the way. In the meantime, drill the {playbook.qCount} questions
              directly via the link below.
            </section>
          )}

          {/* Primary CTA */}
          <section className="mt-12 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
            <h2 className="text-lg font-semibold tracking-tight">Drill every {playbook.name.toLowerCase()} question</h2>
            <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
              {playbook.qCount} questions from the bank, scoped to{" "}
              {playbook.subtopics.length === 1 ? "the named subtopic" : `${playbook.subtopics.length} bundled subtopics`}.
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

          {detail && <RelatedPlaybooks guidePath={s.guidePath} items={s.playbooks} slugs={[...detail.relatedSlugs]} />}

          <PrevNextNav prev={prev} next={next} />
        </GuideShell>
      );
    },
  };
}
