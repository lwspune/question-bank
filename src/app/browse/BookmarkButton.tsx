"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useBookmarks } from "@/lib/bookmarks/BookmarksProvider";

const BASE =
  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const IDLE =
  "border-input bg-background text-muted-foreground hover:border-brand-accent/40 hover:text-brand-accent";

/**
 * Save/bookmark toggle on a QuestionCard. Anon → a sign-in nudge (returns to the
 * current page); signed-in → optimistic toggle via the shared BookmarksProvider.
 */
export default function BookmarkButton({ questionId }: { questionId: string }) {
  const { has, toggle, signedIn, hydrated } = useBookmarks();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnUrl = searchParams?.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname ?? "/browse";

  if (hydrated && !signedIn) {
    return (
      <Link
        href={`/login?next=${encodeURIComponent(returnUrl)}`}
        aria-label="Sign in to save this question"
        title="Sign in to save this question"
        className={cn(BASE, IDLE)}
      >
        <Bookmark className="h-4 w-4" aria-hidden />
      </Link>
    );
  }

  const saved = hydrated && has(questionId);
  async function onClick() {
    if (!hydrated) return;
    try {
      await toggle(questionId);
    } catch {
      toast.error("Couldn't save. Try again.");
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!hydrated}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved" : "Save this question"}
      title={saved ? "Saved — click to remove" : "Save this question"}
      className={cn(BASE, saved ? "border-brand-accent/40 bg-brand/10 text-brand-accent" : IDLE)}
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4" aria-hidden />
      ) : (
        <Bookmark className="h-4 w-4" aria-hidden />
      )}
    </button>
  );
}
