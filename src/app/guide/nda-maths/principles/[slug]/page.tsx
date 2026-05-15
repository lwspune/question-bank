import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lightbulb } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import WorkedExampleCard from "@/app/guide/_components/WorkedExampleCard";
import RelatedPrinciples from "@/app/guide/_components/RelatedPrinciples";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { loadWorkedExamples } from "@/lib/guide/loadWorkedExamples";
import { ROUTES } from "../../_data/nda-maths";
import { TOP_20 } from "../../_data/principles";
import {
  DETAIL_SLUGS,
  PRINCIPLE_DETAILS,
} from "../../_data/principle-details";

type Params = { slug: string };

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
  label: r.label,
}));

export function generateStaticParams(): Params[] {
  return DETAIL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const principle = TOP_20.find((p) => p.slug === params.slug);
  if (!principle) return { title: "Principle not found" };
  return {
    title: `${principle.name} — NDA Maths principle deep dive`,
    description: principle.summary,
    alternates: { canonical: `/guide/nda-maths/principles/${params.slug}` },
  };
}

export default async function PrincipleDetail({ params }: { params: Params }) {
  const principle = TOP_20.find((p) => p.slug === params.slug);
  const detail = PRINCIPLE_DETAILS[params.slug];
  if (!principle || !detail) notFound();

  const supabase = createSupabaseServerClient();
  const [taxonomy, examples] = await Promise.all([
    resolveTaxonomy(supabase, "NDA", "Mathematics"),
    loadWorkedExamples(supabase, detail.exampleQuestionIds),
  ]);

  const chap = taxonomy.chapters.get(principle.drill.chapter);
  const subtopicId = principle.drill.subtopic
    ? chap?.subtopics.get(principle.drill.subtopic)
    : undefined;

  // Find the next principle slug in TOP_20 order, for the PrevNext nav.
  const idx = TOP_20.findIndex((p) => p.slug === params.slug);
  const next =
    idx >= 0 && idx + 1 < TOP_20.length && TOP_20[idx + 1].slug
      ? {
          href: `/guide/nda-maths/principles/${TOP_20[idx + 1].slug}`,
          label: TOP_20[idx + 1].name,
        }
      : { href: "/guide/nda-maths/compound-tricks", label: "Compound Tricks" };
  const prev =
    idx > 0 && TOP_20[idx - 1].slug
      ? {
          href: `/guide/nda-maths/principles/${TOP_20[idx - 1].slug}`,
          label: TOP_20[idx - 1].name,
        }
      : { href: "/guide/nda-maths/principles", label: "All principles" };

  const stats = [
    { value: String(principle.qCount), label: "questions in the bank" },
    {
      value: principle.pctHard != null ? `${principle.pctHard}%` : "—",
      label: "tagged HARD",
    },
    {
      value: String(principle.chapters?.length ?? 1),
      label: "chapter spread",
    },
    { value: String(examples.length), label: "worked examples below" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Mathematics Guide"
      sideNav={sideNav}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda-maths", label: "NDA Mathematics" },
        { href: "/guide/nda-maths/principles", label: "Principles" },
        { label: principle.name },
      ]}
    >
      <GuideHero
        eyebrow="Principle deep dive"
        title={principle.name}
        subtitle={principle.summary}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* Trigger callout */}
      <section className="mt-8 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <p className="flex items-start gap-2 text-sm font-medium uppercase tracking-wide text-primary">
          <Lightbulb className="mt-0.5 h-4 w-4" aria-hidden />
          When to reach for it
        </p>
        <p className="mt-2 font-serif text-base leading-relaxed text-foreground">
          {detail.trigger}
        </p>
      </section>

      {/* Story / explanation */}
      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Why this principle matters
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

      {/* Worked examples */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {examples.length} worked examples from the bank
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          Each example demonstrates the principle on a real past-year question.
          Click to reveal the answer, then the solution.
        </p>
        {examples.length === 0 ? (
          <p className="mt-4 rounded-md border-2 border-dashed bg-muted/30 p-4 text-sm text-muted-foreground">
            No worked examples have been resolved for this principle. The
            question IDs may be unavailable under the current RLS scope.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {examples.map((ex, i) => (
              <WorkedExampleCard key={ex.id} rank={i + 1} example={ex} />
            ))}
          </div>
        )}
      </section>

      {/* Variants */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Variants to recognise
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          Same principle, different surfaces. Pattern-match these on test day.
        </p>
        <ul className="mt-4 space-y-3">
          {detail.variants.map((v) => (
            <li key={v.name} className="rounded-md border bg-card p-4">
              <h3 className="text-sm font-semibold tracking-tight">{v.name}</h3>
              <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">
                {v.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Primary CTA */}
      <section className="mt-12 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Drill every {principle.name.toLowerCase()} question
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          {principle.qCount} questions from the bank — paginated, with cart and
          Word-export support.
        </p>
        <div className="mt-4 flex justify-center">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            chapterIds={chap?.id ? [chap.id] : []}
            subtopicIds={subtopicId ? [subtopicId] : []}
          >
            Drill the {principle.qCount} questions
          </BrowseLink>
        </div>
      </section>

      {/* Related principles */}
      <RelatedPrinciples slugs={detail.relatedSlugs} />

      <PrevNextNav prev={prev} next={next} />
    </GuideShell>
  );
}
