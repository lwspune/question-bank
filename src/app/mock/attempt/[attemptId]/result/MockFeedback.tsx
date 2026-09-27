"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";
import { RATINGS, RATING_LABELS, commentNeedsSave, type Rating } from "@/lib/mocks/feedback";

/**
 * 1-tap post-mock feedback (Phase 3) — pick how the mock felt; the tap itself
 * saves. An optional one-line comment can follow. One row per attempt (upsert),
 * so a re-tap corrects it. Renders directly under the score card.
 *
 * The comment SAVES ITSELF — after a pause in typing and when the box loses
 * focus. It used to need an "Add" tap, and a student who typed and moved on
 * lost the comment without knowing: 6 of 67 ratings carried one.
 */

/** Pause after the last keystroke before the comment is sent. */
const COMMENT_DEBOUNCE_MS = 1200;

type CommentStatus = "idle" | "saving" | "saved";

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
  const [ratingSaving, setRatingSaving] = useState(false);
  const [commentStatus, setCommentStatus] = useState<CommentStatus>("idle");
  // What the server holds. A ref, not state: the debounce timer and the blur
  // handler both read it, and neither should wait for a render.
  const savedComment = useRef<string | null>(initialComment);
  // The rating a delayed comment save must send. The timer's closure holds the
  // render it was set in, so a rating changed inside the pause would otherwise
  // be overwritten by the old one.
  const ratingRef = useRef<Rating | null>(initialRating);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function post(nextRating: Rating, nextComment: string): Promise<boolean> {
    try {
      const res = await fetch("/api/mock/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attemptId, rating: nextRating, comment: nextComment.trim() || undefined }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not save.");
      savedComment.current = nextComment.trim() || null;
      return true;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save feedback.");
      return false;
    }
  }

  async function pick(r: Rating) {
    setRating(r);
    ratingRef.current = r;
    setRatingSaving(true);
    const ok = await post(r, comment);
    setRatingSaving(false);
    if (ok) toast.success("Thanks for the feedback!");
  }

  async function flushComment(text: string) {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    const current = ratingRef.current;
    if (!current || !commentNeedsSave(savedComment.current, text)) return;
    setCommentStatus("saving");
    const ok = await post(current, text);
    setCommentStatus(ok ? "saved" : "idle");
  }

  function onCommentChange(text: string) {
    setComment(text);
    setCommentStatus("idle");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => void flushComment(text), COMMENT_DEBOUNCE_MS);
  }

  return (
    <section className="mt-5 rounded-xl border bg-card p-5">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-brand-accent" aria-hidden />
        <h2 className="text-sm font-semibold">How was this mock?</h2>
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="How the mock felt">
        {RATINGS.map((r) => {
          const selected = rating === r;
          return (
            <button
              key={r}
              type="button"
              aria-pressed={selected}
              disabled={ratingSaving}
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
        <div className="mt-3">
          {/* Never disabled while a save is in flight: autosave fires mid-typing,
              and disabling the box would drop focus under the student's fingers. */}
          <input
            type="text"
            value={comment}
            maxLength={500}
            aria-label="Anything to add about this mock (optional)"
            placeholder="Anything to add? (optional)"
            onChange={(e) => onCommentChange(e.target.value)}
            onBlur={() => void flushComment(comment)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <p className="mt-1 h-4 text-xs text-muted-foreground" aria-live="polite">
            {commentStatus === "saving" ? "Saving…" : commentStatus === "saved" ? "Saved" : ""}
          </p>
        </div>
      )}
    </section>
  );
}
