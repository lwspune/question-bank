import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import PrincipleCard from "@/app/guide/_components/PrincipleCard";
import CollapsibleDomain from "@/app/guide/_components/CollapsibleDomain";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { ROUTES } from "../_data/nda-maths";
import {
  DOMAINS,
  TOP_20,
  type Principle,
} from "../_data/principles";

export const metadata: Metadata = {
  title: "NDA Maths Principles — ~70 atoms behind every question",
  description:
    "A complete catalog of the principles tested in NDA Mathematics. Top 20 cross-chapter principles get deep-dive pages; the long tail links to /browse for direct drill.",
  alternates: { canonical: "/guide/nda-maths/principles" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
  label: r.label,
}));

export default async function PrinciplesIndex() {
  const supabase = createSupabaseServerClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "Mathematics");

  /** Resolve a principle's drill list (chapter + optional subtopic per entry)
   *  into deduped ID lists ready to feed BrowseLink. ExtraIds pass through
   *  unchanged — they're already UUIDs. */
  const resolveDrill = (p: Principle) => {
    const subtopicIds = new Set<string>();
    for (const d of p.drill) {
      const chap = taxonomy.chapters.get(d.chapter);
      if (!chap) continue;
      if (d.subtopic) {
        const sid = chap.subtopics.get(d.subtopic);
        if (sid) subtopicIds.add(sid);
      }
    }
    return {
      // chapterIds intentionally empty — subtopicIds + extraIds is the
      // principle's atomic set. Setting chapterIds would AND-narrow and
      // exclude extras that live in unlisted chapters.
      chapterIds: [],
      subtopicIds: Array.from(subtopicIds),
      extraIds: p.extraQuestionIds ?? [],
    };
  };

  const totalPrinciples = DOMAINS.reduce((s, d) => s + d.principles.length, 0);
  const stats = [
    { value: String(totalPrinciples), label: "principles in the catalog" },
    { value: "20", label: "with deep-dive pages" },
    { value: "10", label: "mathematical domains" },
    { value: "1,320", label: "questions covered" },
  ];

  return (
    <GuideShell
      guideTitle="NDA Mathematics Guide"
      sideNav={sideNav}
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda-maths", label: "NDA Mathematics" },
        { label: "Principles" },
      ]}
    >
      <GuideJsonLd
        type="CollectionPage"
        path="/guide/nda-maths/principles"
        headline="NDA Maths Principles — ~70 atoms behind every question"
        description="A complete catalog of the principles tested in NDA Mathematics. Top 20 cross-chapter principles get deep-dive pages; the long tail links to /browse for direct drill."
      />
      <GuideHero
        eyebrow="Principles"
        title={`~${totalPrinciples} atoms behind every NDA Maths question`}
        subtitle="The chapter labels in your textbook hide a smaller, sharper structure. Every question in the 1,320-q bank reduces to 1-3 principles from this catalog. The top 20 are the highest-leverage — drill these and you've covered 60% of the bank."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* TOP 20 TABLE */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Top 20 — cross-chapter principles with deep-dive pages
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          These principles disguise themselves across multiple chapters — a
          student who learns them as cross-chapter tricks unlocks questions
          that look unrelated. Each has a dedicated detail page with 3–5 worked
          examples and a one-click drill CTA.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2 font-medium">#</th>
                <th className="px-3 py-2 font-medium">Principle</th>
                <th className="px-3 py-2 text-right font-medium">Questions</th>
                <th className="px-3 py-2 text-right font-medium">% HARD</th>
                <th className="px-3 py-2 font-medium">Deep dive</th>
              </tr>
            </thead>
            <tbody>
              {TOP_20.map((p, i) => (
                <tr key={p.slug ?? p.name} className="border-b last:border-b-0">
                  <td className="px-3 py-2 tabular-nums text-muted-foreground">
                    {i + 1}
                  </td>
                  <td className="px-3 py-2 font-medium">{p.name}</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {p.qCount}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {p.pctHard != null ? `${p.pctHard}%` : "—"}
                  </td>
                  <td className="px-3 py-2">
                    {p.slug ? (
                      <Link
                        href={`/guide/nda-maths/principles/${p.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        <BookOpen className="h-3 w-3" aria-hidden /> Read
                        <ArrowRight className="h-3 w-3" aria-hidden />
                      </Link>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Detail pages for the top 20 are being rolled out in upcoming phases.
          Each will go live as it&rsquo;s published.
        </p>
      </section>

      {/* DOMAIN ACCORDIONS */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Full catalog by domain
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Every principle the bank tests, grouped by mathematical domain.
          Click a domain to expand. Each card links to the relevant /browse
          filter for direct practice.
        </p>
        <div className="mt-6 space-y-3">
          {DOMAINS.map((d, idx) => {
            const totalQ = d.principles.reduce((s, p) => s + p.qCount, 0);
            return (
              <CollapsibleDomain
                key={d.id}
                label={d.label}
                blurb={d.blurb}
                principleCount={d.principles.length}
                totalQ={totalQ}
                defaultOpen={idx === 0}
              >
                {d.principles.map((p) => {
                  const drill = resolveDrill(p);
                  return (
                    <PrincipleCard
                      key={p.slug ?? p.name}
                      name={p.name}
                      qCount={p.qCount}
                      pctHard={p.pctHard}
                      summary={p.summary}
                      chapters={p.chapters}
                      drill={drill}
                      slug={p.slug}
                      examId={taxonomy.examId}
                      subjectId={taxonomy.subjectId}
                    />
                  );
                })}
              </CollapsibleDomain>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Don&rsquo;t know where to start?
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          Drill <strong className="font-semibold text-foreground">AM-GM</strong>
          {" "}and <strong className="font-semibold text-foreground">Vieta</strong>
          {" "}first — they each appear in 7+ chapters and together cover ~100
          questions.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            chapterIds={
              taxonomy.chapters.get("Sequence & Series")?.id
                ? [taxonomy.chapters.get("Sequence & Series")!.id]
                : []
            }
            subtopicIds={
              taxonomy.chapters
                .get("Sequence & Series")
                ?.subtopics.get("Geometric and Harmonic Progressions, AM-GM-HM Relations")
                ? [
                    taxonomy.chapters
                      .get("Sequence & Series")!
                      .subtopics.get("Geometric and Harmonic Progressions, AM-GM-HM Relations")!,
                  ]
                : []
            }
          >
            Drill AM-GM (60 questions)
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            chapterIds={
              taxonomy.chapters.get("Quadratic Equations")?.id
                ? [taxonomy.chapters.get("Quadratic Equations")!.id]
                : []
            }
            subtopicIds={
              taxonomy.chapters
                .get("Quadratic Equations")
                ?.subtopics.get("Vieta's Relations and Root-Coefficient Identities")
                ? [
                    taxonomy.chapters
                      .get("Quadratic Equations")!
                      .subtopics.get("Vieta's Relations and Root-Coefficient Identities")!,
                  ]
                : []
            }
            variant="outline"
          >
            Drill Vieta (45 questions)
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/nda-maths/strategy",
          label: "Strategy",
        }}
        next={{
          href: "/guide/nda-maths/compound-tricks",
          label: "Compound Tricks",
        }}
      />
    </GuideShell>
  );
}
