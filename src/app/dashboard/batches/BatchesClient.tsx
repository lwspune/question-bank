"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Archive, ArchiveRestore, Loader2, Pencil, Plus, Trash2, Users } from "lucide-react";
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
  createBatchAction,
  updateBatchAction,
  setBatchArchivedAction,
  deleteBatchAction,
} from "./actions";
import type { Batch } from "@/lib/batches/types";

const SELECT_CLASS =
  "h-9 w-full rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

type ExamOption = { id: string; name: string };

export default function BatchesClient({
  active,
  archived,
  exams,
}: {
  active: Batch[];
  archived: Batch[];
  exams: ExamOption[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Batch | null>(null);
  const [toDelete, setToDelete] = useState<Batch | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [examId, setExamId] = useState("");

  const examName = (id: string | null) => exams.find((e) => e.id === id)?.name ?? null;

  function openCreate() {
    setEditing(null);
    setName("");
    setBranch("");
    setExamId("");
    setFormOpen(true);
  }

  function openEdit(b: Batch) {
    setEditing(b);
    setName(b.name);
    setBranch(b.branch ?? "");
    setExamId(b.examId ?? "");
    setFormOpen(true);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Give the batch a name.");
      return;
    }
    setBusy(true);
    const input = { name, branch, examId };
    const res = editing
      ? await updateBatchAction(editing.id, input)
      : await createBatchAction(input);
    setBusy(false);
    if (res.ok) {
      toast.success(editing ? "Batch updated" : "Batch created");
      setFormOpen(false);
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  async function onArchive(b: Batch, archivedNext: boolean) {
    setBusy(true);
    const res = await setBatchArchivedAction(b.id, archivedNext);
    setBusy(false);
    if (res.ok) {
      toast.success(archivedNext ? "Batch archived" : "Batch restored");
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  async function onDelete() {
    if (!toDelete) return;
    setBusy(true);
    const res = await deleteBatchAction(toDelete.id);
    setBusy(false);
    setToDelete(null);
    if (res.ok) {
      toast.success("Batch deleted");
      router.refresh();
    } else {
      toast.error(res.error);
    }
  }

  const renderRow = (b: Batch) => (
    <li key={b.id} className="flex items-center gap-3 p-4">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {b.branch && (
            <Badge variant="secondary" className="text-[10px]">
              {b.branch}
            </Badge>
          )}
          <span className="truncate font-medium">{b.name}</span>
          {b.archived && (
            <Badge variant="outline" className="text-[10px]">
              Archived
            </Badge>
          )}
        </div>
        {examName(b.examId) && (
          <p className="mt-0.5 text-xs text-muted-foreground">{examName(b.examId)}</p>
        )}
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
          New batch
        </Button>
      </div>

      {active.length === 0 && archived.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-card p-10 text-center">
          <Users className="mx-auto h-8 w-8 text-muted-foreground/50" aria-hidden />
          <p className="mt-3 text-sm font-medium">No batches yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Create a cohort (e.g. &ldquo;NDA 2026 Morning&rdquo;) to start building
            papers that don&apos;t repeat questions for it.
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
            <DialogTitle>{editing ? "Edit batch" : "New batch"}</DialogTitle>
            <DialogDescription>
              Name the cohort and, optionally, tag its branch. The same name can&apos;t
              repeat within one branch.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="batch-name">Name</Label>
              <Input
                id="batch-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. NDA 2026 Morning"
                disabled={busy}
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="batch-branch">Branch (optional)</Label>
              <Input
                id="batch-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="e.g. FC Road"
                disabled={busy}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="batch-exam">Exam (optional)</Label>
              <select
                id="batch-exam"
                value={examId}
                onChange={(e) => setExamId(e.target.value)}
                className={SELECT_CLASS}
                disabled={busy}
              >
                <option value="">No specific exam</option>
                {exams.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
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
            <DialogTitle>Delete this batch?</DialogTitle>
            <DialogDescription>
              {toDelete ? (
                <>
                  <span className="font-medium text-foreground">{toDelete.name}</span> will
                  be removed. Any papers linked to it stay, but become org-wide
                  (un-batched). Prefer <span className="font-medium">Archive</span> to keep
                  the link. Only the creator or an admin can delete a batch.
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
