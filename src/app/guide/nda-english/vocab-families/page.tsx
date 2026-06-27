import type { Metadata } from "next";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import StatBlock from "@/app/guide/_components/StatBlock";
import BrowseLink from "@/app/guide/_components/BrowseLink";
import PrevNextNav from "@/app/guide/_components/PrevNextNav";
import GuideJsonLd from "@/app/guide/_components/GuideJsonLd";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { ROUTES } from "../_data/nda-english";
import {
  VOCAB_FAMILIES,
  VOCAB_FAMILY_STATS,
} from "../_data/vocab-families";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "NDA English Vocab Families — 13 themes, 270 PYQ-tested words",
  description:
    "270 words tested across NDA English Synonyms + Antonyms (2017–2026), clustered into 13 themes. The patterns NDA reuses so you can build vocabulary breadth efficiently.",
  alternates: { canonical: "/guide/nda-english/vocab-families" },
};

const sideNav = ROUTES.map((r) => ({
  href: r.slug ? `/guide/nda-english/${r.slug}` : "/guide/nda-english",
  label: r.label,
}));

export default async function VocabFamiliesPage() {
  const supabase = createSupabaseAnonClient();
  const taxonomy = await resolveTaxonomy(supabase, "NDA", "English");

  const vocabChapter = taxonomy.chapters.get("Vocabulary");
  const synId = vocabChapter?.subtopics.get("Synonyms");
  const antId = vocabChapter?.subtopics.get("Antonyms");

  const stats = [
    {
      value: String(VOCAB_FAMILY_STATS.bankTested),
      label: "PYQ-tested words",
    },
    {
      value: String(VOCAB_FAMILY_STATS.families),
      label: "thematic families",
    },
    {
      value: String(VOCAB_FAMILY_STATS.totalWords),
      label: "words in this guide",
    },
    { value: "5", label: "stem repeats in 10 yrs" },
  ];

  return (
    <GuideShell
      guideTitle="NDA English Guide"
      sideNav={sideNav}
      landingHref="/guide/nda-english"
      breadcrumbs={[
        { href: "/guide", label: "Guides" },
        { href: "/guide/nda", label: "NDA" },
        { href: "/guide/nda-english", label: "NDA English" },
        { label: "Vocab Families" },
      ]}
    >
      <GuideJsonLd
        type="Article"
        path="/guide/nda-english/vocab-families"
        headline="NDA English Vocab Families — 13 themes, 270 PYQ-tested words"
        description="270 words tested across NDA English Synonyms + Antonyms (2017–2026), clustered into 13 themes."
      />
      <GuideHero
        eyebrow="Vocab Families"
        title="13 word families NDA reuses"
        subtitle="Words don't repeat across years — only 5 stems were tested twice in 10 years. So memorising the 270 PYQ-tested words is a losing strategy. Memorising the families they cluster into is the real lever. Each family below is the actual editorial pattern; the specific words rotate, the patterns don't."
      >
        <StatBlock stats={stats} />
      </GuideHero>

      {/* How to read the page */}
      <section className="mt-10 rounded-lg border-l-4 border-primary bg-primary/5 p-5">
        <h2 className="text-base font-semibold tracking-tight">
          How to use these families
        </h2>
        <div className="mt-2 space-y-2 font-serif text-sm leading-relaxed text-muted-foreground">
          <p>
            Read one family per day. For each word: cover the gloss, read the
            word, try to recall the meaning. If you can&rsquo;t, add it to a
            spaced-repetition deck. Repeat for 13 days. Then run a second pass
            adding 5 fresh words per family from any standard NDA vocab list.
          </p>
          <p>
            On test day: when you see an unfamiliar tested word, ask which
            family it likely belongs to (by Latin/Greek root, by prefix, by
            sentence context). Family-fast lookup beats word-by-word
            memorisation under time pressure.
          </p>
        </div>
      </section>

      {/* Quick jump TOC */}
      <section className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Jump to family
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {VOCAB_FAMILIES.map((f) => (
            <li key={f.slug}>
              <a
                href={`#${f.slug}`}
                className="inline-flex items-center rounded-full border bg-card px-3 py-1 text-xs font-medium hover:border-primary/40 hover:bg-accent"
              >
                {f.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* The families */}
      {VOCAB_FAMILIES.map((family) => (
        <section
          key={family.slug}
          id={family.slug}
          className="mt-10 scroll-mt-24"
        >
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {family.name}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              ({family.words.length} words)
            </span>
          </h2>
          <p className="mt-1 text-sm italic text-muted-foreground">
            {family.theme}
          </p>
          <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
            {family.note}
          </p>
          <div className="mt-4 overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/40">
                <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Word</th>
                  <th className="px-3 py-2 font-medium">Bank source</th>
                  <th className="px-3 py-2 font-medium">Gloss</th>
                </tr>
              </thead>
              <tbody>
                {family.words.map((w) => (
                  <tr key={w.word} className="border-b last:border-b-0 align-top">
                    <td className="px-3 py-2 font-medium tabular-nums">{w.word}</td>
                    <td className="px-3 py-2 text-xs text-muted-foreground">
                      {w.sources.includes("S") && (
                        <span className="mr-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-emerald-700 dark:text-emerald-300">
                          S
                        </span>
                      )}
                      {w.sources.includes("A") && (
                        <span className="rounded bg-rose-500/10 px-1.5 py-0.5 text-rose-700 dark:text-rose-300">
                          A
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 font-serif leading-snug text-muted-foreground">
                      {w.gloss}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="mt-14 rounded-lg border-2 border-primary/40 bg-primary/5 p-6 text-center">
        <h2 className="text-lg font-semibold tracking-tight">
          Drill the Vocabulary playbooks
        </h2>
        <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
          150 Synonym questions + 135 Antonym questions from the live bank.
          Apply the family-fast lookup habit on real PYQs.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            chapterIds={vocabChapter ? [vocabChapter.id] : []}
            subtopicIds={synId ? [synId] : []}
          >
            Drill 150 Synonyms
          </BrowseLink>
          <BrowseLink
            examId={taxonomy.examId}
            subjectId={taxonomy.subjectId}
            chapterIds={vocabChapter ? [vocabChapter.id] : []}
            subtopicIds={antId ? [antId] : []}
            variant="outline"
          >
            Drill 135 Antonyms
          </BrowseLink>
        </div>
      </section>

      <PrevNextNav
        prev={{
          href: "/guide/nda-english/playbooks",
          label: "Playbooks",
        }}
        next={{ href: "/guide/nda-english/trends", label: "Trends" }}
      />
    </GuideShell>
  );
}
