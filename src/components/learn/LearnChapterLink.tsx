import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { getExamBySlug } from "@/lib/exam/examContext";
import { learnChapterFor } from "@/lib/learn/bankChapters";
import { chapterHref } from "@/lib/learn/links";
import { getOutline } from "@/lib/learn/query";

/**
 * On a board reader chapter: the Learn chapter that teaches it (the Learn tab, 2026-10-27), for an
 * exam with a Learn course and its Maths chapters only. Renders nothing otherwise, or if the Learn
 * read fails: the textbook page must never break over it.
 */
export async function LearnChapterLink({ examSlug, subjectName, chapterName }: { examSlug: string; subjectName: string; chapterName: string }) {
  const course = getExamBySlug(examSlug)?.learnPath?.split("/").pop();
  if (!course || subjectName !== "Mathematics") return null;
  const outline = await getOutline(course).catch((e) => {
    console.error("board: Learn outline unavailable", e);
    return null;
  });
  const ch = outline && learnChapterFor(course, outline.chapters, chapterName);
  if (!ch) return null;
  return (
    <Link
      href={chapterHref(course, ch.slug)}
      className="group mb-6 flex items-center gap-3 rounded-2xl border border-brand/40 bg-brand/5 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="icon-tile grid h-10 w-10 shrink-0 place-items-center rounded-xl">
        <GraduationCap className="h-5 w-5 text-brand-accent" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-foreground">Learn the ideas first</span>
        <span className="block text-sm text-muted-foreground">
          {ch.title} one concept at a time: a short lesson, then questions until you have it.
        </span>
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-brand-accent transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
    </Link>
  );
}
