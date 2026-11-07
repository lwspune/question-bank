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
  // One line (2026-11-07; was a ~120 px card above the questions on a phone).
  return (
    <Link
      href={chapterHref(course, ch.slug)}
      aria-label={`Learn the ideas first: ${ch.title} one concept at a time`}
      className="group mb-4 inline-flex items-center gap-1.5 rounded text-sm font-medium text-brand-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <GraduationCap className="h-4 w-4 shrink-0" aria-hidden="true" />
      Learn the ideas first
      <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
    </Link>
  );
}
