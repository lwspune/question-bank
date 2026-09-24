"use client";

/**
 * Assign a published mock to this batch with a due date, and see who has sat
 * each one. ENGAGEMENT_SPEC.md C1.
 *
 * DEADLINE, NOT RANKING. The list shows "12 of 30 sat" and, behind a
 * disclosure, who has not — never a score column, never an order of students.
 * The teacher's job here is to chase a deadline, and that is all the card
 * gives them the means to do.
 *
 * Writes go to /api/batches/assign through the caller's RLS client, so a
 * teacher of another branch is refused by the database; this component only
 * relays the message.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarClock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AssignmentState } from "@/lib/assignments/core";

export type AssignmentRow = {
  id: string;
  mockTitle: string;
  mockSlug: string;
  dueAt: string;
  note: string | null;
  label: string;
  state: AssignmentState;
  done: number;
  total: number;
  pending: { userId: string; name: string | null; email: string }[];
};

export type MockChoice = { id: string; title: string };

const STATE_TONE: Record<AssignmentState, string> = {
  open: "text-muted-foreground",
  "due-soon": "text-amber-600 dark:text-amber-400",
  overdue: "text-red-600 dark:text-red-400",
};

/** datetime-local wants a local wall-clock value; the browser is the teacher's. */
function defaultDue(): string {
  const d = new Date(Date.now() + 3 * 86_400_000);
  d.setHours(21, 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AssignmentsCard({
  batchId,
  assignments,
  mocks,
}: {
  batchId: string;
  assignments: AssignmentRow[];
  mocks: MockChoice[];
}) {
  const router = useRouter();
  const [mockId, setMockId] = useState(mocks[0]?.id ?? "");
  const [dueLocal, setDueLocal] = useState(defaultDue);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  async function post(body: Record<string, unknown>, key: string): Promise<boolean> {
    setBusy(key);
    try {
      const res = await fetch("/api/batches/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast.error(json.error ?? "Could not save.");
        return false;
      }
      return true;
    } catch {
      toast.error("Could not reach the server.");
      return false;
    } finally {
      setBusy(null);
    }
  }

  async function assign() {
    if (!mockId) return;
    const dueAt = new Date(dueLocal).toISOString();
    const ok = await post({ action: "create", batchId, mockId, dueAt, note }, "create");
    if (ok) {
      toast.success("Assigned. Students see it on their dashboard.");
      setNote("");
      router.refresh();
    }
  }

  async function remove(id: string) {
    const ok = await post({ action: "delete", assignmentId: id }, id);
    if (ok) {
      toast.success("Assignment removed.");
      router.refresh();
    }
  }

  return (
    <section className="rounded-xl border bg-card p-6" aria-labelledby="assign-heading">
      <h2 id="assign-heading" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <CalendarClock className="h-4 w-4 text-brand-accent" aria-hidden />
        Assigned papers
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick a mock and a due date. Every student in this batch sees it on their dashboard with the
        deadline, and you see who has sat it.
      </p>

      {mocks.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">No published mocks to assign yet.</p>
      ) : (
        <form
          className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-end"
          onSubmit={(e) => {
            e.preventDefault();
            void assign();
          }}
        >
          <label className="grid gap-1 text-xs font-medium">
            Mock test
            <select
              value={mockId}
              onChange={(e) => setMockId(e.target.value)}
              className="h-10 rounded-md border bg-background px-2 text-sm font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {mocks.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-xs font-medium">
            Due
            <input
              type="datetime-local"
              value={dueLocal}
              onChange={(e) => setDueLocal(e.target.value)}
              className="h-10 rounded-md border bg-background px-2 text-sm font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          <Button type="submit" variant="brand" className="h-10" disabled={busy === "create" || !mockId}>
            {busy === "create" ? "Assigning…" : "Assign"}
          </Button>
          <label className="grid gap-1 text-xs font-medium sm:col-span-3">
            Note for students (optional)
            <input
              type="text"
              value={note}
              maxLength={200}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Sit it in one go, under the clock."
              className="h-10 rounded-md border bg-background px-2 text-sm font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
        </form>
      )}

      {assignments.length > 0 && (
        <ul className="mt-5 divide-y">
          {assignments.map((a) => (
            <li key={a.id} className="py-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{a.mockTitle}</p>
                  <p className="mt-0.5 text-xs">
                    <span className={cn("font-medium", STATE_TONE[a.state])}>{a.label}</span>
                    <span className="text-muted-foreground">
                      {" · "}
                      {a.done} of {a.total} sat
                    </span>
                  </p>
                  {a.note && <p className="mt-1 text-xs text-muted-foreground">{a.note}</p>}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label={`Remove assignment ${a.mockTitle}`}
                  disabled={busy === a.id}
                  onClick={() => void remove(a.id)}
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </Button>
              </div>
              {a.pending.length > 0 && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    Who has not sat it ({a.pending.length})
                  </summary>
                  <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                    {a.pending.map((p) => (
                      <li key={p.userId} className="truncate">
                        {p.name ?? p.email}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
