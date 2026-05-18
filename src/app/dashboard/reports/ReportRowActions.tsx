"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  REPORT_STATUSES,
  REPORT_STATUS_LABELS,
  type ReportStatus,
} from "@/lib/reports/types";

type Props = {
  reportId: string;
  currentStatus: ReportStatus;
  currentResolutionNote: string | null;
};

const TERMINAL: ReadonlySet<ReportStatus> = new Set([
  "resolved",
  "wont-fix",
  "duplicate",
]);

export default function ReportRowActions({
  reportId,
  currentStatus,
  currentResolutionNote,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState(currentResolutionNote ?? "");

  async function apply(next: ReportStatus) {
    if (next === currentStatus) return;

    const body: Record<string, unknown> = { status: next };
    if (TERMINAL.has(next) && note.trim().length > 0) {
      body.resolutionNote = note.trim();
    } else if (!TERMINAL.has(next)) {
      // Reverting clears the note
      body.resolutionNote = null;
    }

    try {
      const res = await fetch(`/api/reports/${reportId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        toast.error(j.error ?? `Status update failed (${res.status})`);
        return;
      }
      toast.success(`Marked ${REPORT_STATUS_LABELS[next].toLowerCase()}.`);
      startTransition(() => router.refresh());
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Status update failed"
      );
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Status:
        </label>
        <select
          value={currentStatus}
          onChange={(e) => apply(e.target.value as ReportStatus)}
          disabled={pending}
          className="rounded-md border border-input bg-background px-2 py-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {REPORT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {REPORT_STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
      {TERMINAL.has(currentStatus) && (
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Resolution note (optional)"
            className="block w-full max-w-md rounded-md border border-input bg-background px-2 py-1 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="button"
            disabled={pending || note.trim() === (currentResolutionNote ?? "").trim()}
            onClick={() => apply(currentStatus)}
            className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save note
          </button>
        </div>
      )}
    </div>
  );
}
