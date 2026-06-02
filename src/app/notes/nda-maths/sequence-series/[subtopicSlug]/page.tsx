import type { Metadata } from "next";
import { getNotesChapterBySlug } from "@/lib/notes/chapters";
import NotesSubtopicPage, {
  buildSubtopicMetadata,
} from "@/app/notes/_components/NotesSubtopicPage";

const CHAPTER = getNotesChapterBySlug("nda-maths", "sequence-series")!;

export const revalidate = 3600;

type Params = { subtopicSlug: string };

export function generateStaticParams(): Params[] {
  return CHAPTER.slugs.map((subtopicSlug) => ({ subtopicSlug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  return buildSubtopicMetadata(CHAPTER, params.subtopicSlug);
}

export default function Page({ params }: { params: Params }) {
  return <NotesSubtopicPage chapter={CHAPTER} subtopicSlug={params.subtopicSlug} />;
}
