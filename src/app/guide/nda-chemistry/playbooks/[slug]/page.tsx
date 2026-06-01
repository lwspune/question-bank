import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lightbulb, Wrench, AlertTriangle } from "lucide-react";
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
import { ROUTES } from "../../_data/nda-chemistry";
import { PLAYBOOKS } from "../../_data/playbooks";
import { PLAYBOOK_DETAILS } from "../../_data/playbook-details";

export const revalidate = 3600;

type Params = { slug: string };

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-chemistry/${r.slug}` : "/guide/nda-chemistry",
  label: r.label,
}));

export function generateStaticParams(): Params[] {
  return PLAYBOOKS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const playbook = PLAYBOOKS.find((p) => p.slug === params.slug);
  if (!playbook) return { title: "Playbook not found" };
  return {
    title: `${playbook.name} — NDA Chemistry playbook`,
    description: playbook.summary,
    alternates: { canonical: `/guide/nda-chemistry/playbooks/${params.slug}` },
  };
}

export default async function PlaybookDetail({ params }: { params: Params }) {
  const playbook = PLAYBOOKS.find((p) => p.slug === params.slug);
  const detail = PLAYBOOK_DETAILS[params.slug];
  if (!playbook) notFound();

  const supabase = createSupabaseAnonClient();
  const [taxonomy, examples] = await Promise.all([
    resolveTaxonomy(supabase, "NDA", "Chemistry"),
    detail
      ? loadWorkedExamples(supabase, detail.exampleQuestionIds)
      : Promise.resolve([]),
  ]);

  const chap = taxonomy.chapters.get(playbook.chapter);
  const chapterIds = chap ? [chap.id] : [];
  const subtopicIds = chap
    ? playbook.subtopics
        .map((name) => chap.subtopics.get(name))
        .filter((id): id is string => Boolean(id))
    : [];

  // Prev/Next nav — chain along the PLAYBOOKS order so a reader can swipe
  // through the catalog in strand order.
  const idx = PLAYBOOKS.findIndex((p) => p.slug === params.slug);
  const prev =
    idx > 0
      ? {
          href: `/guide/nda-chemistry/playbooks/${PLAYBOOKS[idx - 1].slug}`,
          label: PLAYBOOKS[idx - 1].name,
        }
      : { href: "/guide/nda-chemistry/playbooks", label: "All playbooks" };
  const next =
    idx >= 0 && idx + 1 < PLAYBOOKS.length
      ? {
          href: `/guide/nda-chemistry/playbooks/${PLAYBOOKS[idx + 1].slug}`,
          label: PLAYBOOKS[idx + 1].name,
        }
      : {
          href: "/guide/nda-chemistry/common-compounds",
          label: "Common compounds reference",
        };

  const stats = [
    { value: String(playbook.qCount), label: "questions in the bank" },
    { value: `${playbook.pctHard}%`, label: "tagged HARD" },
    { value: String(playbook.subtopics.length), label: "subtopic(s)" },
    { value: String(examples.length), label: "worked examples" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Chemistry Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-chemistry"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-chemistry", label: "NDA Chemistry" },
        { href: "/guide/nda-chemistry/playbooks", label: "Playbooks" },
        { label: playbook.name },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path={`/guide/nda-chemistry/playbooks/${params.slug}`}
        headline={`${playbook.name} — NDA Chemistry playbook`}
        description={playbook.summary}
      />
      <GuideHero
        eyebrow="Playbook"
        title={playbook.name}
        subtitle={playbook.summary}
      >
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
          <section className="mt-12">
            <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl">
              <Wrench className="h-5 w-5 text-primary" aria-hidden />
              The sub-skills
            </h2>
            <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
              The rules and habits that decide whether you get a question
              right.
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

          {/* Worked examples */}
          {examples.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {examples.length} worked example{examples.length === 1 ? "" : "s"} from the bank
              </h2>
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                Real past-year questions illustrating the playbook. Click to
                reveal options + solution.
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
                Distractor shapes specific to this chapter. The page-wide{" "}
                <a className="text-primary hover:underline" href="/guide/nda-chemistry/traps">
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
        </>
      ) : (
        <section className="mt-8 rounded-md border-2 border-dashed bg-muted/30 p-5 text-sm text-muted-foreground">
          A full deep-dive for this playbook is on the way. In the meantime,
          drill the {playbook.qCount} questions directly via the link below.
        </section>
      )}

      {/* Primary CTA */}
      <section className="mt-12 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Drill every {playbook.name.toLowerCase()} question
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          {playbook.qCount} questions from the bank, scoped to{" "}
          {playbook.subtopics.length === 1
            ? "the named subtopic"
            : `${playbook.subtopics.length} bundled subtopics`}.
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

      {detail && (
        <RelatedPlaybooks
          guidePath="nda-chemistry"
          items={PLAYBOOKS}
          slugs={detail.relatedSlugs}
        />
      )}

      <PrevNextNav prev={prev} next={next} />
    </GuideShell>
  );
}
