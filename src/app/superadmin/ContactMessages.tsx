"use client";

import { useEffect, useState, useTransition } from "react";
import { Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { setContactMessageStatusAction } from "./actions";
import type { ContactMessage, ContactMessageStatus } from "@/lib/contact/service";

/**
 * Triage for messages from the /about contact form.
 *
 * Deliberately a SEPARATE queue from TeacherRequests: that one is an onboarding
 * pipeline whose actions are "provision this org", and a student reporting a
 * wrong answer key does not belong in it. Same shape, different lifecycle.
 */
const STATUSES: ContactMessageStatus[] = ["new", "read", "replied", "spam"];

const STATUS_LABEL: Record<ContactMessageStatus, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
  spam: "Spam",
};

const STATUS_CLASS: Record<ContactMessageStatus, string> = {
  new: "bg-brand/10 text-brand-accent border-brand/30",
  read: "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:text-amber-400",
  replied: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-400",
  spam: "bg-muted text-muted-foreground border-input",
};

export default function ContactMessages({
  initial,
  onOpenCountChange,
}: {
  initial: ContactMessage[];
  /** Reports the live untriaged count up to the tab badge. Optional so this
   *  component still stands alone outside the tab strip. */
  onOpenCountChange?: (n: number) => void;
}) {
  const [rows, setRows] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<string | null>(null);

  const openCount = rows.filter((r) => r.status === "new").length;

  // The badge must follow an optimistic triage — and its REVERT on failure.
  useEffect(() => {
    onOpenCountChange?.(openCount);
  }, [openCount, onOpenCountChange]);

  function onStatus(id: string, status: ContactMessageStatus) {
    setBusyId(id);
    const prev = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    startTransition(async () => {
      const res = await setContactMessageStatusAction(id, status);
      setBusyId(null);
      if (!res.ok) {
        setRows(prev); // revert
        toast.error(res.error);
      } else {
        toast.success(`Marked ${STATUS_LABEL[status].toLowerCase()}`);
      }
    });
  }

  return (
    <section className="space-y-3">
      <header>
        <h2 className="text-lg font-semibold tracking-tight">
          Contact messages
          {openCount > 0 && (
            <span className="ml-2 rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand-accent">
              {openCount} new
            </span>
          )}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          From the form on <code>/about</code>. Corrections land here — check one
          against the original paper before changing a key, then mark it replied.
        </p>
      </header>

      {rows.length === 0 ? (
        <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          No messages yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {rows.map((r) => (
            <li key={r.id} className="rounded-lg border p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <span className="font-medium">{r.name}</span>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <a
                      href={`mailto:${r.email}`}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden />
                      {r.email}
                    </a>
                    {r.phone && (
                      <a
                        href={`tel:${r.phone}`}
                        className="inline-flex items-center gap-1 hover:text-foreground"
                      >
                        <Phone className="h-3.5 w-3.5" aria-hidden />
                        {r.phone}
                      </a>
                    )}
                  </div>
                  <p className="max-w-prose whitespace-pre-wrap text-sm text-muted-foreground">
                    {r.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(r.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_CLASS[r.status]}`}
                  >
                    {STATUS_LABEL[r.status]}
                  </span>
                  <label className="sr-only" htmlFor={`cm-status-${r.id}`}>
                    Set status for the message from {r.name}
                  </label>
                  <select
                    id={`cm-status-${r.id}`}
                    value={r.status}
                    disabled={pending && busyId === r.id}
                    onChange={(e) => onStatus(r.id, e.target.value as ContactMessageStatus)}
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
