"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, CircleCheck, Circle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSignedIn } from "@/components/auth/useSignedIn";
import { fetchOwnProgressRow, postProgress } from "./progressClient";

/**
 * Per-subtopic track controls: bookmark + "mark mastered". Signed-in only (anon
 * gets nothing — the practice gate already nudges sign-in), so it renders null
 * until auth resolves. On mount it loads current state and fires a best-effort
 * last-viewed touch (powers "continue where you left off" on the /notes index).
 */
export default function NotesProgressControls({
  subtopicSlug,
  chapterSlug,
  subjectRoute,
}: {
  subtopicSlug: string;
  chapterSlug: string;
  subjectRoute: string;
}) {
  const { signedIn, loading } = useSignedIn();
  const [bookmarked, setBookmarked] = useState(false);
  const [mastered, setMastered] = useState(false);
  const [busy, setBusy] = useState<null | "bookmark" | "mastered">(null);

  useEffect(() => {
    if (loading || !signedIn) return;
    let active = true;
    fetchOwnProgressRow(subtopicSlug).then((row) => {
      if (!active) return;
      setBookmarked(Boolean(row?.bookmarked));
      setMastered(Boolean(row?.masteredAt));
    });
    // Best-effort last-viewed touch — ignore failures (it's not user-facing).
    postProgress({ subtopicSlug, chapterSlug, subjectRoute, touchViewed: true }).catch(() => {});
    return () => {
      active = false;
    };
  }, [loading, signedIn, subtopicSlug, chapterSlug, subjectRoute]);

  if (loading || !signedIn) return null;

  async function toggleBookmark() {
    const next = !bookmarked;
    setBusy("bookmark");
    setBookmarked(next);
    try {
      await postProgress({ subtopicSlug, chapterSlug, subjectRoute, bookmarked: next });
    } catch {
      setBookmarked(!next);
      toast.error("Couldn't save your bookmark.");
    } finally {
      setBusy(null);
    }
  }

  async function toggleMastered() {
    const next = !mastered;
    setBusy("mastered");
    setMastered(next);
    try {
      await postProgress({ subtopicSlug, chapterSlug, subjectRoute, mastered: next });
      toast.success(next ? "Marked as mastered" : "Removed from mastered");
    } catch {
      setMastered(!next);
      toast.error("Couldn't save. Try again.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={toggleBookmark}
        disabled={busy !== null}
        aria-pressed={bookmarked}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:opacity-60",
          bookmarked
            ? "border-brand-accent/40 bg-brand/10 text-brand-accent"
            : "border-input bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
        )}
      >
        {bookmarked ? (
          <BookmarkCheck className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <Bookmark className="h-3.5 w-3.5" aria-hidden />
        )}
        {bookmarked ? "Bookmarked" : "Bookmark"}
      </button>

      <button
        type="button"
        onClick={toggleMastered}
        disabled={busy !== null}
        aria-pressed={mastered}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:opacity-60",
          mastered
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
            : "border-input bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
        )}
      >
        {mastered ? (
          <CircleCheck className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <Circle className="h-3.5 w-3.5" aria-hidden />
        )}
        {mastered ? "Mastered" : "Mark mastered"}
      </button>
    </div>
  );
}
