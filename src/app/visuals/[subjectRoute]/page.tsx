import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getExamBySlug } from "@/lib/exam/examContext";
import { GALLERY_LOADERS, GALLERY_SUBJECTS } from "@/lib/gallery/galleryIndex.generated";
import { loadPracticeByConcept } from "@/lib/gallery/practice";
import GalleryView from "./GalleryView";

/**
 * /visuals/<subject> (owner, 2026-11-23): one notes subject's visuals as a
 * grid, by chapter and kind, each opening full screen with its concept and 3
 * questions to practise. Mockup: https://claude.ai/artifact/5RqMpgmjCork2oNHEebMLD
 *
 * Cached for everyone (tests/gallery-pages.test.ts): built on first visit and
 * daily after, never at deploy (no build-time database reads). A student's own
 * chapter order comes from the browser (/api/gallery/weak), and the tile
 * pictures from ./thumbs, fetched once and cached, so the page's own data
 * stays small.
 */
export const revalidate = 86400;

export function generateStaticParams() {
  return [];
}

type Params = { params: Promise<{ subjectRoute: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { subjectRoute } = await params;
  const s = GALLERY_SUBJECTS.find((x) => x.subjectRoute === subjectRoute);
  if (!s) return {};
  return {
    title: `${s.subjectDisplay} visuals`,
    description: `${s.count} pictures and interactive diagrams from the ${s.subjectDisplay} notes, by chapter.`,
    robots: { index: false, follow: true },
    alternates: { canonical: `/visuals/${s.subjectRoute}` },
  };
}

export default async function GallerySubjectPage({ params }: Params) {
  const { subjectRoute } = await params;
  const subject = GALLERY_SUBJECTS.find((x) => x.subjectRoute === subjectRoute);
  const load = GALLERY_LOADERS[subjectRoute];
  if (!subject || !load) notFound();

  const { VISUALS } = await load();
  // Best effort: without them a visual simply offers no practice button.
  const practice = await loadPracticeByConcept(createSupabaseAnonClient(), VISUALS).catch((e) => {
    console.error("gallery practice read failed", e instanceof Error ? e.message : e);
    return {} as Record<string, string[]>;
  });

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl px-3 py-4 sm:px-6 sm:py-8">
        <GalleryView
          subject={subject}
          subjects={GALLERY_SUBJECTS}
          exams={[...new Set(GALLERY_SUBJECTS.map((s) => s.examSlug))].map((examSlug) => ({
            examSlug,
            label: getExamBySlug(examSlug)?.displayName ?? examSlug,
          }))}
          visuals={VISUALS.map((v) => ({ ...v, practice: practice[`${v.subtopicSlug}/${v.conceptSlug}`] ?? [] }))}
        />
      </main>
      <Footer />
    </>
  );
}
