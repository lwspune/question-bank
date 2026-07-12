"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RATINGS, type Rating } from "@/lib/mocks/feedback";

/**
 * 1-tap post-mock feedback (Phase 3) — pick how the mock felt; the tap itself
 * saves. An optional one-line comment can follow. One row per attempt (upsert),
 * so a re-tap corrects it. Renders below the score on the result page.
 */
const RATING_LABELS: Record<Rating, string> = {
  too_easy: "Too easy",
  just_right: "Just right",
  too_hard: "Too hard",
};

export default function MockFeedback({
  attemptId,
  initialRating,
  initialComment,
}: {
  attemptId: string;
  initialRating: Rating | null;
  initialComment: string | null;
}) {
  const [rating, setRating] = useState<Rating | null>(initialRating);
  const [comment, setComment] = useState(initialComment ?? "");
  const [saving, setSaving] = useState(false);

  async function save(nextRating: Rating, nextComment: string) {
    setSaving(true);
    try {
      const res = await fetch("/api/mock/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attemptId, rating: nextRating, comment: nextComment.trim() || undefined }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not save.");
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save feedback.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function pick(r: Rating) {
    setRating(r);
    const ok = await save(r, comment);
    if (ok) toast.success("Thanks for the feedback!");
  }

  async function saveComment() {
    if (!rating) return;
    const ok = await save(rating, comment);
    if (ok) toast.success("Comment saved.");
  }

  return (
    <section className="mt-5 rounded-xl border bg-card p-5">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-brand-accent" aria-hidden />
        <h2 className="text-sm font-semibold">How was this mock?</h2>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {RATINGS.map((r) => {
          const selected = rating === r;
          return (
            <button
              key={r}
              type="button"
              aria-pressed={selected}
              disabled={saving}
              onClick={() => pick(r)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
                selected
                  ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                  : "border-input bg-background text-foreground hover:bg-accent",
              ].join(" ")}
            >
              {RATING_LABELS[r]}
            </button>
          );
        })}
      </div>

      {rating && (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={comment}
            maxLength={500}
            placeholder="Anything to add? (optional)"
            onChange={(e) => setComment(e.target.value)}
            disabled={saving}
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="button" variant="outline" size="sm" onClick={saveComment} disabled={saving}>
            Add
          </Button>
        </div>
      )}
    </section>
  );
}
