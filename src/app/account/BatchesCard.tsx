"use client";

/**
 * "Your classes" on /account — pending batch invites, and the batches a student
 * has joined (migrations 0083/0084).
 *
 * THE CONSENT LINE IS THE POINT OF THIS CARD, not decoration. Accepting lets an
 * institute see this person's exam results, so the card says exactly that
 * before the button, names the institute, and pairs it with the fact that
 * leaving is always available. A student who does not recognise the inviter is
 * told outright that declining is the right move.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PendingInviteView = {
  id: string;
  batchName: string;
  orgName: string;
};

export type MyBatchView = {
  batchId: string;
  batchName: string;
  orgName: string;
};

export default function BatchesCard({
  invites,
  batches,
}: {
  invites: PendingInviteView[];
  batches: MyBatchView[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  if (invites.length === 0 && batches.length === 0) return null;

  async function post(body: Record<string, string>, key: string, okMsg: string) {
    setBusy(key);
    try {
      const res = await fetch("/api/batches/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast.error(json.error ?? "Something went wrong.");
        return;
      }
      toast.success(okMsg);
      router.refresh();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="rounded-xl border bg-card p-6" aria-labelledby="classes-heading">
      <h2 id="classes-heading" className="flex items-center gap-2 font-semibold">
        <GraduationCap className="h-4 w-4 text-brand-accent" aria-hidden />
        Your classes
      </h2>

      {invites.length > 0 && (
        <ul className="mt-4 space-y-3">
          {invites.map((inv) => (
            <li key={inv.id} className="rounded-lg border border-brand-accent/40 bg-brand-accent/5 p-4">
              <p className="text-sm">
                <span className="font-semibold">{inv.orgName}</span> invited you to join{" "}
                <span className="font-semibold">{inv.batchName}</span>.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                If you accept, their teachers will be able to see your mock test results. You
                can leave at any time, which stops that.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant="brand"
                  size="sm"
                  disabled={busy !== null}
                  onClick={() => post({ action: "accept", inviteId: inv.id }, inv.id, `Joined ${inv.batchName}.`)}
                >
                  {busy === inv.id ? "Working…" : "Accept"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={busy !== null}
                  onClick={() => post({ action: "decline", inviteId: inv.id }, inv.id, "Invitation declined.")}
                >
                  Decline
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Don&apos;t recognise {inv.orgName}? Decline — nothing is shared unless you accept.
              </p>
            </li>
          ))}
        </ul>
      )}

      {batches.length > 0 && (
        <ul className="mt-4 space-y-2">
          {batches.map((b) => (
            <li
              key={b.batchId}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3"
            >
              <span className="flex items-center gap-2 text-sm">
                <Users className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                <span>
                  <span className="font-medium">{b.batchName}</span>
                  <span className="text-muted-foreground"> · {b.orgName}</span>
                </span>
              </span>
              <Button
                variant="ghost"
                size="sm"
                disabled={busy !== null}
                onClick={() =>
                  post({ action: "leave", batchId: b.batchId }, b.batchId, `Left ${b.batchName}.`)
                }
              >
                {busy === b.batchId ? "Leaving…" : "Leave"}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
