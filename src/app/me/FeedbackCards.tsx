"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MessageSquarePlus, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Voice-of-user cards on /me (Phase 4): an engagement-gated NPS prompt (shown
 * only when `showNps`) + an always-available "suggest a feature" form. Both
 * append to user_feedback via POST /api/feedback. Student-initiated, never a gate.
 */
export default function FeedbackCards({ showNps }: { showNps: boolean }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {showNps && <NpsCard />}
      <FeatureCard />
    </div>
  );
}

async function postFeedback(body: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not save.");
    return true;
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Could not save. Please try again.");
    return false;
  }
}

function NpsCard() {
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  async function submit() {
    if (score == null) return;
    setSaving(true);
    const ok = await postFeedback({ kind: "nps", score, message: comment.trim() || undefined });
    setSaving(false);
    if (ok) {
      setDone(true);
      toast.success("Thanks — that helps a lot.");
    }
  }

  if (done) return null;

  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="text-sm font-semibold">How likely are you to recommend PYQ Vault to a friend?</h2>
      <p className="mt-1 text-xs text-muted-foreground">0 = not likely · 10 = very likely</p>
      <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Recommendation score">
        {Array.from({ length: 11 }, (_, n) => {
          const selected = score === n;
          return (
            <button
              key={n}
              type="button"
              aria-pressed={selected}
              disabled={saving}
              onClick={() => setScore(n)}
              className={[
                "h-9 w-9 rounded-md border text-sm font-medium tabular-nums transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:opacity-50",
                selected
                  ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                  : "border-input bg-background text-foreground hover:bg-accent",
              ].join(" ")}
            >
              {n}
            </button>
          );
        })}
      </div>
      {score != null && (
        <div className="mt-3 space-y-2">
          <textarea
            value={comment}
            maxLength={1000}
            rows={2}
            placeholder="What's the main reason for your score? (optional)"
            onChange={(e) => setComment(e.target.value)}
            disabled={saving}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button type="button" variant="brand" size="sm" onClick={submit} disabled={saving}>
            {saving ? "Sending…" : "Submit"}
          </Button>
        </div>
      )}
    </section>
  );
}

function FeatureCard() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!message.trim()) return;
    setSaving(true);
    const ok = await postFeedback({ kind: "feature", message: message.trim() });
    setSaving(false);
    if (ok) {
      setMessage("");
      setOpen(false);
      toast.success("Thanks — we read every suggestion.");
    }
  }

  return (
    <section className="rounded-xl border bg-card p-6">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <Lightbulb className="h-4 w-4 text-brand-accent" aria-hidden />
        Suggest a feature or report a gap
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Missing an exam, a chapter, or a feature? Tell us — it shapes what we build next.
      </p>
      {!open ? (
        <Button type="button" variant="outline" size="sm" className="mt-3" onClick={() => setOpen(true)}>
          <MessageSquarePlus className="h-4 w-4" aria-hidden />
          Write a suggestion
        </Button>
      ) : (
        <div className="mt-3 space-y-2">
          <textarea
            value={message}
            maxLength={1000}
            rows={3}
            autoFocus
            placeholder="e.g. Add CUET papers, or a dark-mode fix on the mock timer…"
            onChange={(e) => setMessage(e.target.value)}
            disabled={saving}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div className="flex items-center gap-2">
            <Button type="button" variant="brand" size="sm" onClick={submit} disabled={saving || !message.trim()}>
              {saving ? "Sending…" : "Send suggestion"}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)} disabled={saving}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
