"use client";

/**
 * The buttons on an article (migration 0263): Publish, Apply changes, Discard
 * changes, Unpublish. They call /api/admin/blog, the only path from a draft to
 * a live page. Unpublish takes a second tap in place of a browser dialog.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { PublishAction } from "@/lib/blog/catalog";

const DONE: Record<PublishAction, string> = {
  publish: "Published. It is live now.",
  apply_changes: "Changes are live now.",
  discard_changes: "Waiting changes discarded.",
  unpublish: "Taken down. It is a draft again.",
};

export default function ArticleActions({
  id,
  status,
  hasPending,
  livePath,
}: {
  id: string;
  status: "draft" | "published";
  hasPending: boolean;
  livePath: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<PublishAction | null>(null);
  const [confirmUnpublish, setConfirmUnpublish] = useState(false);

  async function act(action: PublishAction) {
    setBusy(action);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Could not save.");
      toast.success(DONE[action]);
      setConfirmUnpublish(false);
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status === "draft" && (
        <Button variant="brand" size="sm" disabled={busy !== null} onClick={() => act("publish")}>
          {busy === "publish" ? "Publishing..." : "Publish"}
        </Button>
      )}
      {status === "published" && hasPending && (
        <>
          <Button variant="brand" size="sm" disabled={busy !== null} onClick={() => act("apply_changes")}>
            {busy === "apply_changes" ? "Applying..." : "Apply changes"}
          </Button>
          <Button variant="outline" size="sm" disabled={busy !== null} onClick={() => act("discard_changes")}>
            Discard changes
          </Button>
        </>
      )}
      {status === "published" && (
        <>
          <Button asChild variant="outline" size="sm">
            <a href={livePath} target="_blank" rel="noopener noreferrer">
              Open live page
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={busy !== null}
            onClick={() => (confirmUnpublish ? act("unpublish") : setConfirmUnpublish(true))}
            aria-live="polite"
          >
            {confirmUnpublish ? "Tap again to take it down" : "Unpublish"}
          </Button>
        </>
      )}
    </div>
  );
}
