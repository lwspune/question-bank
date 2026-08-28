"use client";

/**
 * Roster table + the invite box (migrations 0083/0084).
 *
 * The invite box takes a PASTED BLOCK rather than one address at a time,
 * because the real input is a class list out of a spreadsheet. Parsing is the
 * shared pure helper, so what the teacher is told here and what the server
 * writes can never disagree.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, UserMinus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RosterStudent } from "@/lib/batches/invitesAdmin";

type PendingInvite = { id: string; email: string; expiresAt: string };

export default function RosterClient({
  batchId,
  students,
  pendingInvites,
}: {
  batchId: string;
  students: RosterStudent[];
  pendingInvites: PendingInvite[];
}) {
  const router = useRouter();
  const [emails, setEmails] = useState("");
  const [sending, setSending] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  async function invite() {
    if (!emails.trim()) return;
    setSending(true);
    try {
      const res = await fetch("/api/batches/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "invite", batchId, emails }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        invited?: number;
        alreadyEnrolled?: number;
        invalid?: string[];
        overflow?: number;
        emailFailures?: number;
      };
      if (!res.ok) {
        toast.error(json.error ?? "Could not send invitations.");
        if (json.invalid?.length) {
          toast.error(`Not valid email addresses: ${json.invalid.join(", ")}`);
        }
        return;
      }
      toast.success(
        json.invited === 0
          ? "No new invitations to send."
          : `${json.invited} invitation${json.invited === 1 ? "" : "s"} sent.`
      );
      // Every partial outcome is surfaced. A silent skip here reads to the
      // teacher as "all sent", and they would not chase the student.
      if (json.alreadyEnrolled) {
        toast.info(`${json.alreadyEnrolled} already in this batch — skipped.`);
      }
      if (json.invalid?.length) {
        toast.warning(`Skipped ${json.invalid.length} invalid: ${json.invalid.join(", ")}`);
      }
      if (json.overflow) {
        toast.warning(`${json.overflow} address(es) over the per-request limit were not invited.`);
      }
      if (json.emailFailures) {
        toast.warning(
          `${json.emailFailures} invitation email(s) failed to send — the invite still shows in the student's account.`
        );
      }
      setEmails("");
      router.refresh();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  }

  async function revoke(inviteId: string) {
    setBusy(inviteId);
    try {
      const res = await fetch("/api/batches/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "revoke", batchId, inviteId }),
      });
      if (!res.ok) {
        toast.error("Could not revoke that invitation.");
        return;
      }
      toast.success("Invitation revoked.");
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function remove(userId: string, label: string) {
    if (!confirm(`Remove ${label} from this batch? They keep their account and their results.`)) {
      return;
    }
    setBusy(userId);
    try {
      const res = await fetch("/api/batches/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchId, userId }),
      });
      if (!res.ok) {
        toast.error("Could not remove that student.");
        return;
      }
      toast.success(`${label} removed from this batch.`);
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-card p-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Mail className="h-4 w-4 text-brand-accent" aria-hidden />
          Invite students
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste email addresses — one per line, or separated by commas. Each student gets
          an email and an in-app invitation they must accept.
        </p>
        <label htmlFor="invite-emails" className="sr-only">
          Student email addresses
        </label>
        <textarea
          id="invite-emails"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          rows={4}
          placeholder={"anita@example.com\nrahul@example.com"}
          className="mt-3 w-full rounded-lg border bg-background p-3 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button
          variant="brand"
          size="sm"
          className="mt-3"
          disabled={sending || !emails.trim()}
          onClick={invite}
        >
          {sending ? "Sending…" : "Send invitations"}
        </Button>
      </section>

      {pendingInvites.length > 0 && (
        <section className="rounded-xl border bg-card p-4">
          <h2 className="text-sm font-semibold">Invited, no reply yet</h2>
          <ul className="mt-3 space-y-2">
            {pendingInvites.map((inv) => (
              <li
                key={inv.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-2 text-sm"
              >
                <span className="font-mono">{inv.email}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={busy !== null}
                  onClick={() => revoke(inv.id)}
                  aria-label={`Revoke the invitation to ${inv.email}`}
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                  Revoke
                </Button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-xl border">
        <h2 className="border-b px-4 py-3 text-sm font-semibold">
          Students ({students.length})
        </h2>
        {students.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            Nobody has joined yet. Invite students above — they appear here once they
            accept.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left font-medium">Student</th>
                  <th scope="col" className="px-4 py-2 text-right font-medium">Mocks</th>
                  <th scope="col" className="px-4 py-2 text-right font-medium">Last score</th>
                  <th scope="col" className="px-4 py-2 text-right font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const label = s.name ?? s.email;
                  return (
                    <tr key={s.userId} className="border-t">
                      <td className="px-4 py-2">
                        <div className="font-medium">{label}</div>
                        {s.name && (
                          <div className="text-xs text-muted-foreground">{s.email}</div>
                        )}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums">{s.attempts}</td>
                      <td className="px-4 py-2 text-right tabular-nums">
                        {s.lastScorePct === null ? (
                          <span className="text-muted-foreground">—</span>
                        ) : (
                          `${s.lastScorePct}%`
                        )}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={busy !== null}
                          onClick={() => remove(s.userId, label)}
                          aria-label={`Remove ${label} from this batch`}
                        >
                          <UserMinus className="h-3.5 w-3.5" aria-hidden />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
