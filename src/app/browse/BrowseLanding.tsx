import Link from "next/link";
import { ArrowRight, LibraryBig, Layers } from "lucide-react";
import type {
  ExamStarter,
  StarterChapter,
} from "@/lib/questions/browseLanding";

/**
 * What bare `/browse` shows instead of 25 arbitrary questions.
 *
 * The old default listed the 25 most recently INGESTED questions
 * (`created_at DESC`), so the front door of the tool opened on whatever batch
 * landed last — measured on 2026-08-13, that was 25 Maharashtra HSC Binomial
 * Distribution questions, on a site whose bank is mostly NDA and JEE.
 *
 * Every link here APPLIES A FILTER on this page rather than navigating away.
 * That is the distinction from `/` (exam cards → guides/notes) and
 * `/questions` (the exam → subject → chapter directory): those already exist
 * and this must not become a third copy of them. `/browse` is the tool; this
 * panel's whole job is to get you into it with one click.
 */
export default function BrowseLanding({
  exams,
  chapters,
  chapterDirectoryCount,
}: {
  exams: ExamStarter[];
  chapters: StarterChapter[];
  chapterDirectoryCount: number;
}) {
  return (
    <div className="space-y-8">
      <section aria-labelledby="browse-start-exam">
        <h2
          id="browse-start-exam"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <LibraryBig className="h-4 w-4 text-brand-accent" aria-hidden />
          Start with an exam
        </h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <li key={exam.slug}>
              <Link
                href={exam.href}
                className="group flex items-center justify-between gap-3 rounded-lg border bg-card p-4 shadow-sm transition-colors hover:border-brand-accent/60 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {exam.displayName}
                  </span>
                  <span className="mt-0.5 block text-xs tabular-nums text-brand-accent">
                    {exam.questionCount.toLocaleString("en-IN")} questions
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {chapters.length > 0 && (
        <section aria-labelledby="browse-start-chapter">
          <h2
            id="browse-start-chapter"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <Layers className="h-4 w-4 text-brand-accent" aria-hidden />
            Or jump straight into a chapter
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {chapters.map((chapter) => (
              <li key={chapter.chapterId}>
                <Link
                  href={chapter.href}
                  className="flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 shadow-sm transition-colors hover:border-brand-accent/60 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">
                      {chapter.chapterName}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {chapter.examName} · {chapter.subjectName}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-brand-accent">
                    {chapter.questionCount.toLocaleString("en-IN")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-sm text-muted-foreground">
        Or use the filters to narrow by chapter, difficulty and year —{" "}
        <Link
          href="/questions"
          className="font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          see all {chapterDirectoryCount.toLocaleString("en-IN")} chapters
        </Link>
        .
      </p>
    </div>
  );
}
