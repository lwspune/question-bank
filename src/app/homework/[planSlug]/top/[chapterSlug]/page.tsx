import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPlanChapters } from "@/lib/homework/query";
import { loadPlanChapterTopPyqs } from "@/lib/homework/chapterTop";
import { chapterNeighbours } from "@/lib/homework/chapters";
import { planHref, topChapterHref, topListHref } from "@/lib/homework/links";
import { planWording } from "@/lib/homework/display";
import NotesTopPyqs from "@/app/notes/_components/NotesTopPyqs";

type Params = { planSlug: string; chapterSlug: string };

/**
 * One chapter's Top 10 PYQs inside the Homework tab (2026-11-04): the same list,
 * reveal and download as the /board chapter's Top 10 tab, read from this plan.
 * Rendered on first visit and cached for a day, never built ahead (~220 pages,
 * and a build reads production).
 */
export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return [];
}

async function load(params: Params) {
  const client = createSupabaseAnonClient();
  const page = await getPlanChapters(client, params.planSlug);
  if (!page) return null;
  const chapter = page.chapters.find((c) => c.slug === params.chapterSlug);
  if (!chapter) return null;
  const top = await loadPlanChapterTopPyqs(client, page.plan.slug, chapter.id);
  if (!top) return null;
  return { plan: page.plan, chapters: page.chapters, chapter, top };
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params;
  const data = await load(params);
  if (!data) return { title: "Top 10 PYQs" };
  const { plan, chapter } = data;
  return {
    title: `${chapter.name}: Top 10 ${plan.examName} PYQs`,
    description: `The ${plan.examName} ${plan.subjectName} ${chapter.name} past questions to practise first: the ones ${planWording(plan.examName).asker} asked again, highest count first.`,
    // The same list is a tab on the chapter's /board page; this copy is for
    // students in the Homework tab. Followed, so a crawler still reaches the plan.
    robots: { index: false, follow: true },
  };
}

export default async function HomeworkTopChapterPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const data = await load(params);
  if (!data) notFound();
  const { plan, chapters, chapter, top } = data;
  const { prev, next } = chapterNeighbours(chapters, chapter.slug);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          className="mb-4"
          items={[
            { href: "/homework", label: "Daily Homework" },
            { href: planHref(plan.slug), label: plan.title },
            { href: topListHref(plan.slug), label: "Top 10 PYQs" },
            { label: chapter.name },
          ]}
        />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{chapter.name}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{plan.title}. Try each one first, then open its answer.</p>

        <NotesTopPyqs
          top={top}
          examName={plan.examName}
          chapterName={chapter.name}
          supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
          className="mt-6"
        />

        <nav aria-label="Other chapters" className="mt-10 flex items-center justify-between gap-3 border-t pt-4 text-sm">
          {prev ? (
            <Link
              href={topChapterHref(plan.slug, prev.slug)}
              prefetch={false}
              className="inline-flex min-w-0 items-center gap-1.5 font-medium text-brand-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
              <span className="truncate">{prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          <Link href={topListHref(plan.slug)} className="shrink-0 text-muted-foreground hover:text-foreground hover:underline">
            All chapters
          </Link>
          {next ? (
            <Link
              href={topChapterHref(plan.slug, next.slug)}
              prefetch={false}
              className="inline-flex min-w-0 items-center justify-end gap-1.5 font-medium text-brand-accent hover:underline"
            >
              <span className="truncate">{next.name}</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
}
