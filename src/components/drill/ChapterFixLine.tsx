"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { Target } from "lucide-react";
import { useViewerSession } from "@/lib/viewer/useViewerSession";
import { usePulse } from "@/lib/viewer/usePulse";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { chapterFixCount, chapterFixLabel, chapterFixLine } from "@/lib/drill/chapterFix";
import { drillChapterHref, type ChapterFixFrom } from "@/lib/drill/from";

/**
 * "Fix N mistakes in this chapter" above a chapter's questions (2026-11-07):
 * shown to a signed-in student whose drill holds mistakes from THIS chapter,
 * linked to the drill narrowed to it. See lib/drill/chapterFix for why.
 *
 * Browser-only, so the page it sits on stays one cached copy for everyone:
 * the session and the pulse are the header's own (one shared request each),
 * and an anonymous visitor or a chapter with nothing waiting renders nothing.
 * The count is rechecked by the drill itself, and the pulse refreshes when a
 * drill answer is recorded.
 *
 * `children` is what the line REPLACES (2026-11-07): rendered until there is
 * something to fix, so on /questions the sign-in sentence and the Fix line
 * share one slot instead of stacking. The cached HTML is always the fallback.
 */
export default function ChapterFixLine({
  chapterId,
  from,
  className = "",
  children,
}: {
  chapterId: string;
  from: ChapterFixFrom;
  className?: string;
  /** Shown instead of the line while nothing is waiting (and before the pulse arrives). */
  children?: ReactNode;
}) {
  const { session } = useViewerSession();
  const pulse = usePulse(!!session);
  const count = chapterFixCount(pulse, chapterId);

  useEffect(() => {
    if (count > 0) {
      sendActivityOnce(`chapter_fix:${chapterId}`, { kind: "surface_viewed", surface: "chapter_fix", chapterId, from });
    }
  }, [count, chapterId, from]);

  if (count === 0) return <>{children}</>;

  return (
    <div className={`flex items-center gap-3 rounded-md border bg-card px-3 py-2.5 ${className}`}>
      <Target className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
      <p className="min-w-0 flex-1 text-sm font-medium">{chapterFixLine(count)}</p>
      <Link
        href={drillChapterHref(from, chapterId)}
        prefetch={false}
        aria-label={chapterFixLabel(count)}
        className="inline-flex h-9 shrink-0 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Fix them
      </Link>
    </div>
  );
}
