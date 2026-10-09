import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { IMAT_NOTES_SUBJECTS, imatChaptersOf } from "@/lib/sites/imat/notes/registry";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "IMAT notes preview",
  robots: { index: false, follow: false },
};

/**
 * Staff-only preview of the IMAT notes. PYQ Vault shows nothing of IMAT, and
 * the IMAT site does not exist yet, so this is the one place to read them.
 */
export default async function ImatNotesPreviewIndex() {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Preview, staff only
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">IMAT notes</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Teaching notes for the IMAT site, by subject. Not visible on PYQ Vault. Every
            worked example and self-check is original; no past paper question is quoted.
          </p>
        </header>

        {IMAT_NOTES_SUBJECTS.map((subject) => {
          const chapters = imatChaptersOf(subject.subjectRoute);
          return (
            <section key={subject.subjectRoute} aria-labelledby={subject.subjectRoute}>
              <h2 id={subject.subjectRoute} className="text-lg font-semibold">
                {subject.subjectDisplay}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  {chapters.length} chapters
                </span>
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {chapters.map((c) => (
                  <li key={c.chapterSlug}>
                    <Link
                      href={`/dashboard/imat-notes/${c.subjectRoute}/${c.chapterSlug}`}
                      className="flex items-center justify-between gap-2 rounded-lg border bg-card p-4 text-sm hover:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span>
                        <span className="font-medium">{c.chapter.chapterName}</span>
                        <span className="block text-xs text-muted-foreground">
                          {c.chapter.subtopicOrder.length} pages
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </main>
    </>
  );
}
