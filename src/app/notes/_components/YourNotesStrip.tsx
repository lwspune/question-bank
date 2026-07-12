"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, History, Trophy } from "lucide-react";
import {
  summarizeNotesProgress,
  prettifyNotesSlug,
  type NotesProgressRow,
  type NotesProgressSummary,
} from "@/lib/notes/progress";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { fetchAllOwnProgress } from "./progressClient";

/**
 * "Your notes" strip on the /notes index — signed-in only, so the index page
 * stays ISR-static (this is a client island that fetches the user's own rows via
 * RLS). Shows continue-where-you-left-off + bookmarks + a mastered count. Hrefs
 * are built straight from the denormalized row (subject_route/chapter_slug/slug);
 * labels are the prettified slug (approximate, no server title map needed).
 */
export default function YourNotesStrip() {
  const { signedIn, loading } = useSignedIn();
  const [summary, setSummary] = useState<NotesProgressSummary | null>(null);

  useEffect(() => {
    if (loading || !signedIn) return;
    let active = true;
    fetchAllOwnProgress().then((rows) => {
      if (active) setSummary(summarizeNotesProgress(rows));
    });
    return () => {
      active = false;
    };
  }, [loading, signedIn]);

  if (loading || !signedIn || !summary) return null;
  const empty =
    summary.recent.length === 0 &&
    summary.bookmarked.length === 0 &&
    summary.masteredCount === 0;
  if (empty) return null;

  return (
    <section
      aria-label="Your notes"
      className="mb-8 rounded-xl border bg-card p-4 sm:p-5"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold tracking-tight">Your notes</h2>
        {summary.masteredCount > 0 && (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            <Trophy className="h-3.5 w-3.5" aria-hidden />
            {summary.masteredCount} mastered
          </span>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {summary.recent.length > 0 && (
          <ProgressList
            icon={<History className="h-3.5 w-3.5" aria-hidden />}
            title="Continue"
            rows={summary.recent}
          />
        )}
        {summary.bookmarked.length > 0 && (
          <ProgressList
            icon={<Bookmark className="h-3.5 w-3.5" aria-hidden />}
            title="Bookmarked"
            rows={summary.bookmarked.slice(0, 6)}
          />
        )}
      </div>
    </section>
  );
}

function ProgressList({
  icon,
  title,
  rows,
}: {
  icon: React.ReactNode;
  title: string;
  rows: NotesProgressRow[];
}) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {icon}
        {title}
      </p>
      <ul className="space-y-1">
        {rows.map((r) => (
          <li key={r.subtopicSlug}>
            <Link
              href={`/notes/${r.subjectRoute}/${r.chapterSlug}/${r.subtopicSlug}`}
              className="block truncate rounded px-2 py-1 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
              title={prettifyNotesSlug(r.subtopicSlug)}
            >
              {prettifyNotesSlug(r.subtopicSlug)}
              <span className="ml-1.5 text-xs text-muted-foreground">
                · {prettifyNotesSlug(r.chapterSlug)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
