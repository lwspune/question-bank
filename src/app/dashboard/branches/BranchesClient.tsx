"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Archive, ArchiveRestore, Building2, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createBranchAction,
  updateBranchAction,
  setBranchArchivedAction,
  deleteBranchAction,
} from "./actions";
import type { Branch } from "@/lib/branches/types";

export default function BranchesClient({
  active,
  archived,
}: {
  active: Branch[];
  archived: Branch[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Branch | null>(null);
  const [toDelete, setToDelete] = useState<Branch | null>(null);
  const [name, setName] = useState("");

  function openCreate() {
    setEditing(null);
    setName("");
    setFormOpen(true);
  }

  function openEdit(b: Branch) {
    setEditing(b);
    setName(b.name);
    setFormOpen(true);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Give the branch a name.");
      return;
    }
    setBusy(true);
    const res = editing
      ? await updateBranchAction(editing.id, { name })
      : await createBranchAction({ name });
    setBusy(false);
    if (res.ok) {
      toast.success(editing ? "Branch updated" : "Branch created");
      setFormOpen(false);
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  async function onArchive(b: Branch, archivedNext: boolean) {
    setBusy(true);
    const res = await setBranchArchivedAction(b.id, archivedNext);
    setBusy(false);
    if (res.ok) {
      toast.success(archivedNext ? "Branch archived" : "Branch restored");
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  async function onDelete() {
    if (!toDelete) return;
    setBusy(true);
    const res = await deleteBranchAction(toDelete.id);
    setBusy(false);
    setToDelete(null);
    if (res.ok) {
      toast.success("Branch deleted");
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  const renderRow = (b: Branch) => (
    <li key={b.id} className="flex items-center gap-3 p-4">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-medium">{b.name}</span>
          {b.archived && (
            <Badge variant="outline" className="text-[10px]">
              Archived
            </Badge>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => openEdit(b)}
        disabled={busy}
        aria-label={`Edit ${b.name}`}
        className="text-muted-foreground hover:text-foreground"
      >
        <Pencil className="h-4 w-4" aria-hidden />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onArchive(b, !b.archived)}
        disabled={busy}
        aria-label={b.archived ? `Restore ${b.name}` : `Archive ${b.name}`}
        className="text-muted-foreground hover:text-foreground"
      >
        {b.archived ? (
          <ArchiveRestore className="h-4 w-4" aria-hidden />
        ) : (
          <Archive className="h-4 w-4" aria-hidden />
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setToDelete(b)}
        disabled={busy}
        aria-label={`Delete ${b.name}`}
        className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" aria-hidden />
      </Button>
    </li>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="brand" onClick={openCreate}>
          <Plus className="h-4 w-4" aria-hidden />
          New branch
        </Button>
      </div>

      {active.length === 0 && archived.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-card p-10 text-center">
          <Building2 className="mx-auto h-8 w-8 text-muted-foreground/50" aria-hidden />
          <p className="mt-3 text-sm font-medium">No branches yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your campuses (e.g. &ldquo;FC Road&rdquo;) so you can assign teachers and
            file batches under them.
          </p>
        </div>
      ) : (
        <>
          {active.length > 0 && (
            <ul className="divide-y rounded-lg border bg-card">{active.map(renderRow)}</ul>
          )}
          {archived.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground">Archived</h2>
              <ul className="divide-y rounded-lg border bg-card opacity-70">
                {archived.map(renderRow)}
              </ul>
            </div>
          )}
        </>
      )}

      {/* Create / edit dialog */}
      <Dialog open={formOpen} onOpenChange={(v) => !busy && setFormOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit branch" : "New branch"}</DialogTitle>
            <DialogDescription>
              Name the campus / location. It must be unique within your organization.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="branch-name">Name</Label>
              <Input
                id="branch-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. FC Road"
                disabled={busy}
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormOpen(false)}
                disabled={busy}
              >
                Cancel
              </Button>
              <Button type="submit" variant="brand" disabled={busy}>
                {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                {editing ? "Save" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!toDelete} onOpenChange={(v) => !v && setToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this branch?</DialogTitle>
            <DialogDescription>
              {toDelete ? (
                <>
                  <span className="font-medium text-foreground">{toDelete.name}</span> will
                  be removed. Its batches become unbranched and any teacher assignments to
                  it are cleared. Prefer <span className="font-medium">Archive</span> to keep
                  the history.
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
