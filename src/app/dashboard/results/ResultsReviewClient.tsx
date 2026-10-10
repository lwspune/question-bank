"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { ReviewAnnouncement, ReviewName } from "@/lib/results/admin";

const COUNT_LABELS = [
  ["cleared", "Cleared"],
  ["not_cleared", "Did not clear"],
  ["did_not_appear", "Did not appear"],
  ["dismissed", "Dismissed the card"],
] as const;

export default function ResultsReviewClient({ announcements }: { announcements: ReviewAnnouncement[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function act(id: string, action: "publish" | "unpublish" | "decline", name: string) {
    setBusy(id);
    try {
      const res = await fetch("/api/admin/results", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Could not save.");
      toast.success(
        action === "publish" ? `${name} is on /results.` : action === "unpublish" ? `${name} taken down.` : `${name} declined.`
      );
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(null);
    }
  }

  if (announcements.length === 0) {
    return <p className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">No result announcements yet.</p>;
  }

  return (
    <div className="space-y-6">
      {announcements.map((a) => (
        <section key={a.id} className="rounded-xl border bg-card p-4 sm:p-5">
          <h2 className="font-semibold text-foreground">{a.label}</h2>
          <p className="text-xs text-muted-foreground">Students asked until {a.askUntil}</p>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            {COUNT_LABELS.map(([key, label]) => (
              <div key={key} className="rounded-lg border p-2">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="text-lg font-semibold tabular-nums">{a.counts[key]}</dd>
              </div>
            ))}
          </dl>

          <NameList
            title={`Waiting for review (${a.waiting.length})`}
            empty="Nobody is waiting."
            names={a.waiting}
            render={(n) => (
              <>
                <Button size="sm" variant="brand" disabled={busy === n.id} onClick={() => act(n.id, "publish", n.name)}>
                  Publish
                </Button>
                <Button size="sm" variant="outline" disabled={busy === n.id} onClick={() => act(n.id, "decline", n.name)}>
                  Decline
                </Button>
              </>
            )}
          />
          <NameList
            title={`On /results (${a.published.length})`}
            empty="No names published."
            names={a.published}
            render={(n) => (
              <Button size="sm" variant="outline" disabled={busy === n.id} onClick={() => act(n.id, "unpublish", n.name)}>
                Take down
              </Button>
            )}
          />
        </section>
      ))}
    </div>
  );
}

function NameList({
  title,
  empty,
  names,
  render,
}: {
  title: string;
  empty: string;
  names: ReviewName[];
  render: (n: ReviewName) => React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {names.length === 0 ? (
        <p className="mt-1 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <ul className="mt-2 divide-y rounded-lg border">
          {names.map((n) => (
            <li key={n.id} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-sm">
              <span>
                {n.name}
                {n.source === "staff" && <span className="ml-2 text-xs text-muted-foreground">(added by staff)</span>}
              </span>
              <span className="flex gap-2">{render(n)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
