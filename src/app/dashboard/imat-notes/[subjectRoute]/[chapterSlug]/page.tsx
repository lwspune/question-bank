import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { getImatChapter, getImatSubject } from "@/lib/sites/imat/notes/registry";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "IMAT notes preview",
  robots: { index: false, follow: false },
};

type Params = { params: { subjectRoute: string; chapterSlug: string } };

export default async function ImatChapterPreview({ params }: Params) {
  if (!(await getSessionSuperadmin())) redirect("/browse");
  const subject = getImatSubject(params.subjectRoute);
  const entry = getImatChapter(params.subjectRoute, params.chapterSlug);
  if (!subject || !entry) notFound();
  const { chapter, notes } = entry;
  const base = `/dashboard/imat-notes/${entry.subjectRoute}/${entry.chapterSlug}`;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
        <Link
          href="/dashboard/imat-notes"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          All IMAT notes
        </Link>
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
            {subject.subjectDisplay}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{chapter.title}</h1>
          <p className="font-serif text-base leading-relaxed text-foreground">{chapter.intro}</p>
        </header>

        <ol className="space-y-3">
          {chapter.subtopicOrder.map((slug, i) => {
            const note = notes[slug];
            return (
              <li key={slug}>
                <Link
                  href={`${base}/${slug}`}
                  className="flex items-start gap-3 rounded-lg border bg-card p-4 hover:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span
                    className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-foreground"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium">{note.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {note.oneLineDefinition}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {note.concepts.length} concepts
                    </span>
                  </span>
                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ol>
      </main>
    </>
  );
}
