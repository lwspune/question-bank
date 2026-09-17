/**
 * Public per-IDENTITY page — every bank question whose SOLUTION uses one
 * formula, property or technique.
 *
 * A third addressing axis over the same bank. `/browse` addresses questions by
 * TAXONOMY and `/questions/…` is its cacheable per-chapter counterpart; this
 * addresses them by what the solution actually DOES, which is not derivable
 * from the taxonomy and not findable by search.
 *
 * Read-only, PUBLIC questions only. Cached like the `/questions` landings: ISR
 * with the cookie-free anon client, because `createSupabaseServerClient()`
 * reads cookies and would silently de-cache the route.
 */
import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Sigma, Target } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import KatexRenderer from "@/components/math/KatexRenderer";
import FilteredQuestions from "./FilteredQuestions";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { queryQuestionsByIds, type QuestionRow } from "@/lib/questions/query";
import { loadPracticeIds } from "@/lib/formula/query";
import { buildBrowseUrl } from "@/lib/guide/buildBrowseUrl";
import {
  formulaBySlug,
  allFormulaSlugs,
  relatedTopics,
  type FormulaKind,
} from "@/lib/formula";

const SITE_URL = "https://www.pyqvault.com";

export const revalidate = 86400;

export function generateStaticParams() {
  return allFormulaSlugs().map((slug) => ({ slug }));
}

type Params = { params: { slug: string } };

const KIND_LABEL: Record<FormulaKind, string> = {
  formula: "Formula",
  property: "Property",
  technique: "Technique",
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const entry = formulaBySlug(params.slug);
  if (!entry) return { title: "Not found" };
  const { topic, chapter } = entry;

  const n = topic.questionIds.length;
  const title = `${topic.name} — ${n} ${chapter.chapterName} questions that use it`;
  const description = `${topic.statement} Every question in the bank whose solution uses it, with answers and worked solutions. Free to browse.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/formula/${params.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

/** EASY → MODERATE → HARD, then oldest paper first: the learning ramp. */
const DIFFICULTY_ORDER: Record<string, number> = { EASY: 0, MODERATE: 1, HARD: 2 };

function sortForLearning(rows: QuestionRow[]): QuestionRow[] {
  return [...rows].sort((a, b) => {
    const d =
      (DIFFICULTY_ORDER[a.difficulty] ?? 3) - (DIFFICULTY_ORDER[b.difficulty] ?? 3);
    if (d !== 0) return d;
    return (a.pyqYear ?? 0) - (b.pyqYear ?? 0);
  });
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold text-brand-accent">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export default async function FormulaPage({ params }: Params) {
  const entry = formulaBySlug(params.slug);
  if (!entry) notFound();
  const { topic, chapter } = entry;

  const db = createSupabaseAnonClient();
  const [loaded, practiceIds] = await Promise.all([
    queryQuestionsByIds(db, topic.questionIds),
    loadPracticeIds(db, topic.questionIds),
  ]);
  const rows = sortForLearning(loaded);

  const years = rows
    .map((r) => r.pyqYear)
    .filter((y): y is number => typeof y === "number");
  // From `question_kind`, matching the PYQ/Practice filter below. Deriving it
  // from `pyqYear` instead would let the headline stat and the filter chip
  // disagree on the same page.
  const pyqCount = rows.filter((r) => !practiceIds.has(r.id)).length;
  const hard = rows.filter((r) => r.difficulty === "HARD").length;
  const exams = new Set(rows.map((r) => r.exam.name));
  const related = relatedTopics(params.slug);

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl p-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/formula" className="hover:underline">
                Formulas
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>{chapter.chapterName}</li>
          </ol>
        </nav>

        <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-brand-accent">
          <Sigma className="h-3.5 w-3.5" aria-hidden />
          {KIND_LABEL[topic.kind]}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{topic.name}</h1>

        <div className="mt-5 overflow-x-auto rounded-lg border-2 border-brand-accent/30 bg-muted/30 p-6">
          <KatexRenderer text={`\\[${topic.latex}\\]`} />
        </div>

        <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          {topic.symbols.map((s) => (
            <div key={s.symbol} className="flex items-baseline gap-2">
              <dt className="font-medium">
                <KatexRenderer text={`\\(${s.symbol}\\)`} />
              </dt>
              <dd className="text-muted-foreground">{s.meaning}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 max-w-3xl font-serif text-lg leading-relaxed">
          {topic.statement}
        </p>

        {rows.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-10 rounded-lg border p-6">
            <Stat value={String(rows.length)} label="questions use it" />
            <Stat value={String(pyqCount)} label="of them past-year" />
            {years.length > 0 && (
              <Stat
                value={`${Math.min(...years)}–${Math.max(...years)}`}
                label="years it has appeared"
              />
            )}
            <Stat
              value={`${Math.round((hard / rows.length) * 100)}%`}
              label="rated HARD"
            />
            <Stat value={String(exams.size)} label={exams.size === 1 ? "exam" : "exams"} />
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {chapter.notesHref && (
            <Button asChild variant="outline">
              <Link href={chapter.notesHref}>
                <BookOpen className="mr-1.5 h-4 w-4" />
                {chapter.chapterName} notes
              </Link>
            </Button>
          )}
          {rows.length > 0 && (
            <Button asChild variant="outline">
              <Link
                href={buildBrowseUrl({
                  extraIds: topic.questionIds,
                  kind: "all",
                  from: `/formula/${params.slug}`,
                  fromLabel: topic.name,
                })}
              >
                <Target className="mr-1.5 h-4 w-4" />
                Open all {rows.length} in the paper builder
              </Link>
            </Button>
          )}
        </div>

        {/* Co-occurrence, not a guess: these identities are used in the SAME
            solutions, so they are what this one is actually paired with. */}
        {related.length > 0 && (
          <section className="mt-8 rounded-lg border border-dashed p-5">
            <h2 className="text-sm font-medium">Used alongside</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              How often each of these appears in the same solution as this one.
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {related.map(({ topic: t, shared }) => (
                <li key={t.slug}>
                  <Link
                    href={`/formula/${t.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {t.name}
                    <span className="text-xs text-muted-foreground">{shared}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">
            {rows.length} question{rows.length === 1 ? "" : "s"} whose solution uses this
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every one was read individually — a question is here because its
            solution invokes this, not because the stem mentions it.
          </p>

          {rows.length === 0 ? (
            <p className="mt-6 rounded-md border p-6 text-muted-foreground">
              No questions are currently listed.
            </p>
          ) : (
            // QuestionList's bookmark button calls useSearchParams(), which
            // bails a static prerender out to client rendering. Suspense is the
            // documented fix, as on the /questions landings.
            <Suspense fallback={null}>
              <FilteredQuestions
                questions={rows}
                practiceIds={[...practiceIds]}
                supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
              />
            </Suspense>
          )}
        </section>

        <div className="mt-12 rounded-md border p-6 text-center">
          <p className="text-muted-foreground">
            Every identity this chapter tests, with its own question set.
          </p>
          <Button asChild className="mt-3" variant="brand">
            <Link href="/formula">
              All {chapter.chapterName} formulas
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
