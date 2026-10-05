"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useBookmarks } from "@/lib/bookmarks/BookmarksProvider";
import SignInLink from "@/components/reveal/SignInLink";
import { SaveLimitReached } from "@/lib/bookmarks/limit";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { pricingHref } from "@/lib/billing/checkoutReturn";

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
  if (hydrated && !signedIn) {
    return (
      <SignInLink
        aria-label="Sign in to save this question"
        title="Sign in to save this question"
        className={cn(BASE, IDLE)}
      >
        <Bookmark className="h-4 w-4" aria-hidden />
      </SignInLink>
    );
  }

  const saved = hydrated && has(questionId);
  async function onClick() {
    if (!hydrated) return;
    try {
      await toggle(questionId);
    } catch (err) {
      if (err instanceof SaveLimitReached) {
        // The free save limit (0134): say so, and where unlimited saves are.
        sendActivityOnce("saves", { kind: "paywall_event", step: "shown", gate: "saves" });
        toast.error(err.message, {
          description: "Remove a saved question to make room, or get Premium Pass for unlimited saves.",
          action: {
            label: "Get pass",
            onClick: () => {
              window.location.href = pricingHref(null, window.location.pathname + window.location.search);
            },
          },
        });
        return;
      }
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
      title={saved ? "Saved. Click to remove" : "Save this question"}
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
