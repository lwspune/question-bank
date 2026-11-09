"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MAX_NOTE, REPLY_STATUSES, STATUS_LABELS, type ReplyStatus } from "@/lib/feedback/replies";

const EMAIL_MESSAGES: Record<string, string> = {
  sent: "Reply saved and emailed.",
  already_sent: "Reply saved. This status was already emailed, so no new email.",
  no_address: "Reply saved. The student has no email address.",
};

/**
 * Reply to one feature request (migration 0243). The status list shows what
 * the student will read (STATUS_LABELS), so there is no second wording to keep
 * in step.
 */
export default function ReplyForm({
  feedbackId,
  initial,
}: {
  feedbackId: string;
  initial: { status: ReplyStatus; note: string | null } | null;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<ReplyStatus>(initial?.status ?? "received");
  const [note, setNote] = useState(initial?.note ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/feedback-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackId, status, note }),
      });
      const body = (await res.json().catch(() => null)) as { email?: string; error?: string } | null;
      if (!res.ok) {
        toast.error(body?.error ?? "Could not save.");
        return;
      }
      if (body?.email === "failed") toast.error("Reply saved, but the email failed. Save again to retry it.");
      else toast.success(EMAIL_MESSAGES[body?.email ?? ""] ?? "Reply saved.");
      router.refresh();
    } catch {
      toast.error("Could not save. Check your connection.");
    } finally {
      setSaving(false);
    }
  }

  const statusId = `reply-status-${feedbackId}`;
  const noteId = `reply-note-${feedbackId}`;
  return (
    <div className="mt-3 space-y-2 border-t pt-3">
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor={statusId} className="text-xs text-muted-foreground">
          Reply
        </label>
        <select
          id={statusId}
          value={status}
          onChange={(e) => setStatus(e.target.value as ReplyStatus)}
          disabled={saving}
          className="h-8 rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {REPLY_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
      <textarea
        id={noteId}
        aria-label="Note to the student (optional)"
        value={note}
        maxLength={MAX_NOTE}
        rows={2}
        placeholder="Optional note, e.g. CUET papers are live under Exams."
        onChange={(e) => setNote(e.target.value)}
        disabled={saving}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Button type="button" size="sm" variant="brand" onClick={save} disabled={saving}>
        {saving ? "Saving…" : initial ? "Update reply" : "Send reply"}
      </Button>
    </div>
  );
}
