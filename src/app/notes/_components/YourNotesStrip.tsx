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
 * are built straight from the denormalized row (subject_route/chapter_slug/slug).
 *
 * Labels are the real topic and chapter names from /api/notes/titles (the
 * server reads the notes registry). They used to be prettified slugs, which
 * printed "Jch Sbc Mole"; the slug is now only the fallback if that call fails.
 */
type Titles = Record<string, { topic: string; chapter: string }>;
const keyOf = (r: NotesProgressRow) => `${r.subjectRoute}/${r.chapterSlug}/${r.subtopicSlug}`;

async function fetchTitles(rows: NotesProgressRow[]): Promise<Titles> {
  const q = new URLSearchParams();
  for (const r of rows) q.append("k", keyOf(r));
  try {
    const res = await fetch(`/api/notes/titles?${q.toString()}`);
    const data = (await res.json()) as { ok?: boolean; titles?: Titles };
    return data.ok && data.titles ? data.titles : {};
  } catch {
    return {};
  }
}
export default function YourNotesStrip() {
  const { signedIn, loading } = useSignedIn();
  const [summary, setSummary] = useState<NotesProgressSummary | null>(null);
  const [titles, setTitles] = useState<Titles>({});

  useEffect(() => {
    if (loading || !signedIn) return;
    let active = true;
    fetchAllOwnProgress().then(async (rows) => {
      const s = summarizeNotesProgress(rows);
      // Ask only for the rows the strip shows; render once names are in, so
      // a slug never flashes before its title.
      const shown = [...s.recent, ...s.bookmarked.slice(0, 6)];
      const t = shown.length > 0 ? await fetchTitles(shown) : {};
      if (!active) return;
      setTitles(t);
      setSummary(s);
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
            titles={titles}
          />
        )}
        {summary.bookmarked.length > 0 && (
          <ProgressList
            icon={<Bookmark className="h-3.5 w-3.5" aria-hidden />}
            title="Bookmarked"
            rows={summary.bookmarked.slice(0, 6)}
            titles={titles}
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
  titles,
}: {
  icon: React.ReactNode;
  title: string;
  rows: NotesProgressRow[];
  titles: Titles;
}) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {icon}
        {title}
      </p>
      <ul className="space-y-1">
        {rows.map((r) => {
          const t = titles[keyOf(r)];
          const topic = t?.topic ?? prettifyNotesSlug(r.subtopicSlug);
          const chapter = t?.chapter ?? prettifyNotesSlug(r.chapterSlug);
          return (
            <li key={r.subtopicSlug}>
              <Link
                href={`/notes/${r.subjectRoute}/${r.chapterSlug}/${r.subtopicSlug}`}
                className="block truncate rounded px-2 py-1 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                title={topic}
              >
                {topic}
                <span className="ml-1.5 text-xs text-muted-foreground">· {chapter}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
