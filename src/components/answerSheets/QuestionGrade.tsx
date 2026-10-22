"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/**
 * "Question this grade" on one question of a checked sheet (migration 0153).
 * Once per question; the grading session answers it, and a regrade updates
 * the marks.
 */
export default function QuestionGrade({
  submissionId,
  position,
  printedNumber,
  asked,
}: {
  submissionId: string;
  position: number;
  printedNumber: string;
  asked: { message: string; resolution: string | null } | null;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState<string | null>(asked?.message ?? null);

  if (sent) {
    return (
      <div className="mt-3 rounded-md border bg-muted/30 p-3 text-sm">
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">You asked:</span> {sent}
        </p>
        <p className="mt-1 text-muted-foreground">
          <span className="font-medium text-foreground">Our answer:</span>{" "}
          {asked?.resolution ?? "We will look at it again and reply here."}
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <MessageSquare className="h-3.5 w-3.5" aria-hidden />
        Question this grade
      </button>
    );
  }

  async function send() {
    setBusy(true);
    try {
      const res = await fetch(`/api/answer-sheets/${submissionId}/question`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ position, message }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? `Could not send (${res.status})`);
      setSent(message.trim());
      toast.success("Sent. We will look at this question again.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not send");
    } finally {
      setBusy(false);
    }
  }

  const id = `question-grade-${position}`;
  return (
    <div className="mt-3 space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        What should we look at again in Q.{printedNumber}?
      </label>
      <textarea
        id={id}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={1000}
        rows={3}
        placeholder="For example: I wrote the units on page 4."
        className="w-full rounded-md border bg-background p-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <div className="flex gap-2">
        <Button size="sm" variant="brand" disabled={busy || message.trim().length < 5} onClick={() => void send()}>
          {busy ? "Sending" : "Send"}
        </Button>
        <Button size="sm" variant="outline" disabled={busy} onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
