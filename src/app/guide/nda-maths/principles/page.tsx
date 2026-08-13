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
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { loadPrincipleQuestionIds } from "@/lib/tags/principleTags";
import { ROUTES } from "../_data/nda-maths";
import {
  DOMAINS,
  TOP_11,
  type Principle,
} from "../_data/principles";
import type { SupabaseClient } from "@supabase/supabase-js";

type PrincipleStats = {
  total: number;
  pctHard: number;
  chapterSpread: number;
};

/** Live per-principle stats: question count, %HARD, chapter spread.
 *  One round-trip to loadPrincipleQuestionIds + one to questions. */
async function loadPrincipleStats(
  client: SupabaseClient,
  slugs: string[]
): Promise<Map<string, PrincipleStats>> {
  const taggedMap = await loadPrincipleQuestionIds(client, slugs);
  const allIds = Array.from(new Set(Array.from(taggedMap.values()).flat()));
  const stats = new Map<string, PrincipleStats>();
  if (allIds.length === 0) return stats;

  const { data, error } = await client
    .from("questions")
    .select("id, difficulty, chapter_id")
    .in("id", allIds);
  if (error) return stats;
  const byId = new Map(
    ((data ?? []) as { id: string; difficulty: string; chapter_id: string }[]).map(
      (r) => [r.id, r] as const
    )
  );

  for (const [slug, ids] of taggedMap) {
    let hard = 0;
    const chapters = new Set<string>();
    for (const id of ids) {
      const q = byId.get(id);
      if (!q) continue;
      if (q.difficulty === "HARD") hard++;
      if (q.chapter_id) chapters.add(q.chapter_id);
    }
    stats.set(slug, {
      total: ids.length,
      pctHard: ids.length > 0 ? Math.round((hard * 100) / ids.length) : 0,
      chapterSpread: chapters.size,
    });
  }
  return stats;
}

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
  const supabase = createSupabaseAnonClient();

  // Live tag counts + %HARD + chapter spread for TOP_11 slugs.
  const slugs = TOP_11.map((p) => p.slug!).filter(Boolean);
  const [taxonomy, statsMap] = await Promise.all([
    resolveTaxonomy(supabase, "NDA", "Mathematics"),
    loadPrincipleStats(supabase, slugs),
  ]);
  const liveCountFor = (slug: string) => statsMap.get(slug)?.total ?? 0;
  const livePctHardFor = (slug: string) =>
    statsMap.get(slug)?.pctHard ?? null;
  const liveSpreadFor = (slug: string) =>
    statsMap.get(slug)?.chapterSpread ?? 0;

  /** Resolve a long-tail (no-slug) principle's drill list into deduped ID
   *  lists ready to feed BrowseLink. TOP_11 principles use principleSlug
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
    { value: String(TOP_11.length), label: "with deep-dive pages" },
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
        subtitle={`The chapter labels in your textbook hide a smaller, sharper structure. Every question in the bank reduces to a few principles from this catalog. The top ${TOP_11.length} are genuinely cross-chapter — drill these first.`}
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* TOP TABLE — sorted by live #qs descending */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Top {TOP_11.length} — cross-chapter principles with deep-dive pages
        </h2>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          These principles disguise themselves across multiple chapters — a
          student who learns them as cross-chapter tricks unlocks questions
          that look unrelated. Each has a dedicated detail page with worked
          examples and a one-click drill CTA. Question count, % HARD, and
          chapter spread all come from live DB tags — sorted by question
          count descending so the highest-leverage principles are at the top.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2 font-medium">#</th>
                <th className="px-3 py-2 font-medium">Principle</th>
                <th className="px-3 py-2 text-right font-medium">Questions</th>
                <th className="px-3 py-2 text-right font-medium">% HARD</th>
                <th className="px-3 py-2 text-right font-medium">Chapters</th>
                <th className="px-3 py-2 font-medium">Deep dive</th>
              </tr>
            </thead>
            <tbody>
              {[...TOP_11]
                .sort(
                  (a, b) =>
                    liveCountFor(b.slug ?? "") - liveCountFor(a.slug ?? "")
                )
                .map((p, i) => (
                  <tr key={p.slug ?? p.name} className="border-b last:border-b-0">
                    <td className="px-3 py-2 tabular-nums text-muted-foreground">
                      {i + 1}
                    </td>
                    <td className="px-3 py-2 font-medium">{p.name}</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {p.slug ? liveCountFor(p.slug) : "—"}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {p.slug && livePctHardFor(p.slug) != null
                        ? `${livePctHardFor(p.slug)}%`
                        : "—"}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {p.slug ? liveSpreadFor(p.slug) : "—"}
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
            // Domain total: live counts for TOP_11 (slugged) + static qCount
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
                    // TOP_11: live count + live %HARD + ?principle= CTA
                    return (
                      <PrincipleCard
                        key={p.slug}
                        name={p.name}
                        qCount={liveCountFor(p.slug)}
                        pctHard={livePctHardFor(p.slug) ?? undefined}
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
          first — they have the broadest cross-chapter spread in the bank
          (Modulus {liveSpreadFor("modulus-absolute-value")} chapters, Vieta{" "}
          {liveSpreadFor("vieta-symmetric-roots")} chapters).
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
