import type { Metadata } from "next";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import CompoundCard from "@/app/guide/_components/CompoundCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { ROUTES } from "../_data/nda-maths";
import { COMPOUNDS } from "../_data/compounds";

export const metadata: Metadata = {
  title: "NDA Maths Compound Tricks — 4 recipes that own 30% of HARD",
  description:
    "When two principles co-occur in NDA Maths — AM-GM + GP, AP + GP, ω + Vieta, extrema + log — the question is reliably hard. Drill the recipe, not the silos.",
  alternates: { canonical: "/guide/nda-maths/compound-tricks" },
};

export default async function CompoundTricks() {
  const supabase = createSupabaseServerClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "Mathematics");

  const sideNav = ROUTES.map((r) => ({
    href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
    label: r.label,
  }));

  // Resolve each compound's drill filters from chapter+subtopic NAMES → UUIDs
  const resolved = COMPOUNDS.map((c) => {
    const resolveSlice = (slice: { chapter: string; subtopic?: string }) => {
      const chap = taxonomy.chapters.get(slice.chapter);
      return {
        chapterId: chap?.id,
        subtopic: slice.subtopic
          ? { name: slice.subtopic, id: chap?.subtopics.get(slice.subtopic) }
          : undefined,
      };
    };
    return {
      ...c,
      drillFilter: { ...resolveSlice(c.drillFilter), note: c.drillFilter.note },
      soloA: { ...resolveSlice(c.soloA), qCount: c.soloA.qCount },
      soloB: { ...resolveSlice(c.soloB), qCount: c.soloB.qCount },
    };
  });

  const totalCompound = COMPOUNDS.reduce((s, c) => s + c.qCount, 0);

  const stats = [
    { value: String(COMPOUNDS.length), label: "compound recipes" },
    { value: String(totalCompound), label: "compound questions" },
    { value: "~30%", label: "of HARD pool" },
    { value: "1.4–1.7×", label: "harder than average" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Mathematics Guide"
      sideNav={sideNav}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda-maths", label: "NDA Mathematics" },
        { label: "Compound Tricks" },
      ]}
    >
      <GuideHero
        eyebrow="Compound Tricks"
        title="4 recipes that own 30% of the HARD pool"
        subtitle="When two principles appear together, the question is reliably hard. Most students lose marks here not because they don't know either principle — but because they didn't see them chained. Drill the recipe, not the silos."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      <section className="mt-12">
        <p className="font-serif leading-relaxed text-muted-foreground">
          Across the 322 HARD questions in the bank, four principle pairings
          recur with elevated frequency. Each compound below has a higher HARD
          rate than the bank average (24%), and the questions that match almost
          always require <em>both</em> tricks in sequence. Drill them as
          compounds.
        </p>
      </section>

      <section className="mt-10 space-y-6">
        {resolved.map((c, i) => (
          <CompoundCard
            key={c.name}
            rank={i + 1}
            name={c.name}
            principleA={c.principleA}
            principleB={c.principleB}
            qCount={c.qCount}
            pctHard={c.pctHard}
            bankPctHard={c.bankPctHard}
            description={c.description}
            examples={c.examples}
            drillFilter={c.drillFilter}
            soloA={c.soloA}
            soloB={c.soloB}
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
          />
        ))}
      </section>

      <section className="mt-12 rounded-lg border bg-muted/30 p-5">
        <h2 className="text-base font-semibold tracking-tight">
          Why compounds matter more than the individual tricks
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          The bank&rsquo;s difficulty isn&rsquo;t evenly distributed across the
          120 questions of any paper. Hard questions cluster — typically 25–30
          questions per paper sit at the top of the difficulty curve, and a
          disproportionate share of those involve one of the four compound
          recipes above. A student who knows AM-GM and GP separately but
          hasn&rsquo;t practiced them chained will solve the easy versions and
          lose the hard ones. The chain is the skill.
        </p>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/nda-maths/principles",
          label: "Principles",
        }}
        next={{ href: "/guide/nda-maths/trends", label: "Trends" }}
      />
    </GuideShell>
  );
}
