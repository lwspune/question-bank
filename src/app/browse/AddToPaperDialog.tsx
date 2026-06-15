"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FilePlus2, Loader2 } from "lucide-react";
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
import {
  listActivePapersAction,
  addCartToPaperAction,
  createPaperAction,
} from "@/app/dashboard/papers/actions";

/**
 * Commit the /browse cart into a collaborative paper. Org-member only (the cart
 * panel renders this only when signed in to an org). Picks an active draft
 * paper (or creates one) and bulk-adds the cart's questions, auto-filing each by
 * subject. Idempotent — re-adding reports "already there".
 */
export default function AddToPaperDialog({
  questionIds,
  open,
  onOpenChange,
}: {
  questionIds: string[];
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const [papers, setPapers] = useState<{ id: string; title: string }[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const count = questionIds.length;

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    listActivePapersAction().then((res) => {
      if (cancelled) return;
      setLoading(false);
      if (res.ok) {
        setPapers(res.papers);
        setSelectedId((cur) => cur || res.papers[0]?.id || "");
        setCreating(res.papers.length === 0);
      } else {
        toast.error(res.error);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [open]);

  function reportAndClose(paperId: string, added: number, alreadyIn: number) {
    const parts = [`Added ${added}`];
    if (alreadyIn > 0) parts.push(`${alreadyIn} already there`);
    toast.success(parts.join(" · "), {
      action: { label: "View paper", onClick: () => router.push(`/dashboard/papers/${paperId}`) },
    });
    onOpenChange(false);
  }

  async function onAddExisting() {
    if (!selectedId) return;
    setBusy(true);
    const res = await addCartToPaperAction(selectedId, questionIds);
    setBusy(false);
    if (res.ok) reportAndClose(selectedId, res.added, res.alreadyIn);
    else toast.error(res.error);
  }

  async function onCreateAndAdd() {
    if (!newTitle.trim()) {
      toast.error("Give the paper a title.");
      return;
    }
    setBusy(true);
    const created = await createPaperAction(newTitle);
    if (!created.ok) {
      setBusy(false);
      toast.error(created.error);
      return;
    }
    const res = await addCartToPaperAction(created.id, questionIds);
    setBusy(false);
    if (res.ok) reportAndClose(created.id, res.added, res.alreadyIn);
    else toast.error(res.error);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !busy && onOpenChange(v)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add {count} question{count === 1 ? "" : "s"} to a paper</DialogTitle>
          <DialogDescription>
            Questions are filed into the section matching their subject. You can
            rearrange them in the paper afterwards. Your selection stays here too.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <p className="py-6 text-center text-sm text-muted-foreground">Loading papers…</p>
        ) : creating ? (
          <div className="space-y-1.5">
            <Label htmlFor="atp-title">New paper title</Label>
            <Input
              id="atp-title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. NDA GAT — Mock 1"
              disabled={busy}
              autoFocus
            />
            {papers.length > 0 && (
              <button
                type="button"
                onClick={() => setCreating(false)}
                className="text-xs text-muted-foreground underline hover:text-foreground"
              >
                ← Add to an existing paper instead
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="atp-select">Paper</Label>
            <select
              id="atp-select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              disabled={busy}
              className="h-10 w-full rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {papers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-1 text-xs text-brand-accent underline hover:opacity-80"
            >
              <FilePlus2 className="h-3 w-3" aria-hidden /> New paper
            </button>
          </div>
        )}

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={busy}>
            Cancel
          </Button>
          <Button
            variant="brand"
            onClick={creating ? onCreateAndAdd : onAddExisting}
            disabled={busy || loading || count === 0 || (!creating && !selectedId)}
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {creating ? "Create & add" : "Add to paper"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
