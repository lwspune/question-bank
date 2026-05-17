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
import { loadPrincipleQuestionIds } from "@/lib/tags/principleTags";
import { ROUTES } from "../_data/nda-maths";
import {
  DOMAINS,
  TOP_20,
  type Principle,
} from "../_data/principles";

export const metadata: Metadata = {
  title: "NDA Maths Principles — the atoms behind every question",
  description:
    "A catalog of the principles tested in NDA Mathematics. Top cross-chapter principles get deep-dive pages backed by live DB tags; the long tail links to /browse for direct drill.",
  alternates: { canonical: "/guide/nda-maths/principles" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-maths/${r.slug}` : "/guide/nda-maths",
  label: r.label,
}));

export default async function PrinciplesIndex() {
  const supabase = createSupabaseServerClient();

  // Live tag counts for TOP_20 slugs — one DB round-trip for all of them.
  const slugs = TOP_20.map((p) => p.slug!).filter(Boolean);
  const [taxonomy, taggedMap] = await Promise.all([
    resolveTaxonomy(supabase, "NDA", "Mathematics"),
    loadPrincipleQuestionIds(supabase, slugs),
  ]);
  const liveCountFor = (slug: string) => taggedMap.get(slug)?.length ?? 0;

  /** Resolve a long-tail (no-slug) principle's drill list into deduped ID
   *  lists ready to feed BrowseLink. TOP_20 principles use principleSlug
   *  instead and never hit this path. */
  const resolveDrillStatic = (p: Principle) => {
    const subtopicIds = new Set<string>();
    for (const d of p.drill ?? []) {
      const chap = taxonomy.chapters.get(d.chapter);
      if (!chap) continue;
      if (d.subtopic) {
        const sid = chap.subtopics.get(d.subtopic);
        if (sid) subtopicIds.add(sid);
      }
    }
    return {
      chapterIds: [] as string[],
      subtopicIds: Array.from(subtopicIds),
    };
  };

  // Hero stats — use live data where possible.
  const topTaggedTotal = slugs.reduce((s, slug) => s + liveCountFor(slug), 0);
  const longTailTotal = DOMAINS.reduce(
    (s, d) =>
      s +
      d.principles.reduce(
        (ds, p) => ds + (p.slug ? 0 : p.qCount ?? 0),
        0
      ),
    0
  );
  const totalPrinciples = DOMAINS.reduce((s, d) => s + d.principles.length, 0);
  const stats = [
    { value: String(totalPrinciples), label: "principles in the catalog" },
    { value: String(TOP_20.length), label: "with deep-dive pages" },
    { value: String(DOMAINS.length), label: "mathematical domains" },
    {
      value: String(topTaggedTotal + longTailTotal),
      label: "questions covered",
    },
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
        headline="NDA Maths Principles — the atoms behind every question"
        description="A catalog of the principles tested in NDA Mathematics. Top cross-chapter principles get deep-dive pages backed by live DB tags; the long tail links to /browse for direct drill."
      />
      <GuideHero
        eyebrow="Principles"
        title={`${totalPrinciples} atoms behind every NDA Maths question`}
        subtitle={`The chapter labels in your textbook hide a smaller, sharper structure. Every question in the bank reduces to a few principles from this catalog. The top ${TOP_20.length} are genuinely cross-chapter — drill these first.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* TOP TABLE */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Top {TOP_20.length} — cross-chapter principles with deep-dive pages
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          These principles disguise themselves across multiple chapters — a
          student who learns them as cross-chapter tricks unlocks questions
          that look unrelated. Each has a dedicated detail page with worked
          examples and a one-click drill CTA. Question counts come from live
          DB tags, so they stay accurate as the bank grows.
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
                    {p.slug ? liveCountFor(p.slug) : "—"}
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
            // Domain total: live counts for TOP_20 (slugged) + static qCount
            // for long-tail.
            const totalQ = d.principles.reduce(
              (s, p) =>
                s + (p.slug ? liveCountFor(p.slug) : p.qCount ?? 0),
              0
            );
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
                  if (p.slug) {
                    // TOP_20: live count + ?principle= CTA
                    return (
                      <PrincipleCard
                        key={p.slug}
                        name={p.name}
                        qCount={liveCountFor(p.slug)}
                        pctHard={p.pctHard}
                        summary={p.summary}
                        chapters={p.chapters}
                        slug={p.slug}
                      />
                    );
                  }
                  // Long-tail: static qCount + subtopic-filter CTA
                  const drill = resolveDrillStatic(p);
                  return (
                    <PrincipleCard
                      key={p.name}
                      name={p.name}
                      qCount={p.qCount ?? 0}
                      pctHard={p.pctHard}
                      summary={p.summary}
                      chapters={p.chapters}
                      drill={{
                        examId: taxonomy.examId,
                        subjectId: taxonomy.subjectId,
                        chapterIds: drill.chapterIds,
                        subtopicIds: drill.subtopicIds,
                      }}
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
          Drill{" "}
          <strong className="font-semibold text-foreground">Modulus</strong>{" "}
          and{" "}
          <strong className="font-semibold text-foreground">Vieta</strong>{" "}
          first — they each span 7+ chapters in the live tagged set.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <BrowseLink principleSlug="modulus-absolute-value">
            Drill Modulus ({liveCountFor("modulus-absolute-value")} questions)
          </BrowseLink>
          <BrowseLink
            principleSlug="vieta-symmetric-roots"
            variant="outline"
          >
            Drill Vieta ({liveCountFor("vieta-symmetric-roots")} questions)
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
