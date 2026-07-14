"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FilePlus2, FileText, Loader2, Lock, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { createPaperAction, deletePaperAction } from "./actions";
import type { PaperListItem } from "@/lib/papers/admin";

const SELECT_CLASS =
  "h-9 w-full rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function PapersListClient({
  initialPapers,
  batches,
}: {
  initialPapers: PaperListItem[];
  batches: { id: string; label: string }[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [batchId, setBatchId] = useState("");
  const [toDelete, setToDelete] = useState<PaperListItem | null>(null);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Give the paper a title.");
      return;
    }
    setBusy(true);
    const res = await createPaperAction(title, batchId || null);
    setBusy(false);
    if (res.ok) {
      toast.success("Paper created");
      router.push(`/dashboard/papers/${res.id}`);
    } else {
      toast.error(res.error);
    }
  }

  async function onDelete() {
    if (!toDelete) return;
    setBusy(true);
    const res = await deletePaperAction(toDelete.id);
    setBusy(false);
    setToDelete(null);
    if (res.ok) {
      toast.success("Paper deleted");
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="/dashboard/batches">
            <Users className="h-4 w-4" aria-hidden />
            Manage batches
          </Link>
        </Button>
        <Button variant="brand" onClick={() => setNewOpen(true)}>
          <FilePlus2 className="h-4 w-4" aria-hidden />
          New paper
        </Button>
      </div>

      {initialPapers.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-card p-10 text-center">
          <FileText className="mx-auto h-8 w-8 text-muted-foreground/50" aria-hidden />
          <p className="mt-3 text-sm font-medium">No papers yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Create one to start assembling questions with your team.
          </p>
        </div>
      ) : (
        <ul className="divide-y rounded-lg border bg-card">
          {initialPapers.map((p) => (
            <li key={p.id} className="flex items-center gap-3 p-4">
              <Link href={`/dashboard/papers/${p.id}`} className="min-w-0 flex-1 group">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate font-medium group-hover:underline">
                    {p.title}
                  </span>
                  {p.status === "finalized" ? (
                    <Badge variant="secondary" className="gap-1 text-[10px]">
                      <Lock className="h-2.5 w-2.5" aria-hidden /> Finalized
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px]">
                      Draft
                    </Badge>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {p.batchLabel ? `${p.batchLabel} · ` : ""}
                  {p.questionCount} question{p.questionCount === 1 ? "" : "s"} · updated{" "}
                  {formatDate(p.updatedAt)}
                </p>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setToDelete(p)}
                disabled={busy}
                aria-label={`Delete ${p.title}`}
                className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" aria-hidden />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* New-paper dialog */}
      <Dialog open={newOpen} onOpenChange={(v) => !busy && setNewOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New paper</DialogTitle>
            <DialogDescription>
              Starts with the default GAT sections (English + GK subjects). You can
              add, rename, or remove sections inside the paper.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onCreate} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="paper-title">Title</Label>
              <Input
                id="paper-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. NDA GAT — Mock 1"
                disabled={busy}
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="paper-batch">Batch (optional)</Label>
              <select
                id="paper-batch"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className={SELECT_CLASS}
                disabled={busy}
              >
                <option value="">None (org-wide)</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                Linking a batch warns you if a question was already used for that
                cohort. You can also set this later inside the paper.
              </p>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setNewOpen(false)} disabled={busy}>
                Cancel
              </Button>
              <Button type="submit" variant="brand" disabled={busy}>
                {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!toDelete} onOpenChange={(v) => !v && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this paper?</DialogTitle>
            <DialogDescription>
              {toDelete ? (
                <>
                  <span className="font-medium text-foreground">{toDelete.title}</span>{" "}
                  and all its question selections will be removed. Only the creator
                  or an admin can delete a paper. This can&apos;t be undone.
                </>
              ) : null}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setToDelete(null)} disabled={busy}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDelete} disabled={busy}>
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
