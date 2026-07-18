"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FilePlus2, History, Loader2 } from "lucide-react";
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
  listPickerBatchesAction,
  addCartToPaperAction,
  createPaperAction,
  questionUsageAction,
} from "@/app/dashboard/papers/actions";
import { filterUnused, type UsageRef } from "@/lib/papers/usage";
import { PAPER_PICKER_LIMIT } from "@/lib/papers/picker";

const SELECT_CLASS =
  "h-10 w-full rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

type PaperOption = { id: string; title: string; batchLabel: string | null };

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
  onCommitted,
}: {
  questionIds: string[];
  open: boolean;
  onOpenChange: (v: boolean) => void;
  /** Fired after a successful add — the cart clears itself here (no accumulation). */
  onCommitted?: () => void;
}) {
  const router = useRouter();
  const [papers, setPapers] = useState<PaperOption[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [usage, setUsage] = useState<Record<string, UsageRef[]>>({});
  // Picker filters — drafts pile up, so the list is recency-capped + searchable.
  const [query, setQuery] = useState("");
  const [batchId, setBatchId] = useState("");
  const [batches, setBatches] = useState<{ id: string; label: string }[]>([]);
  const count = questionIds.length;
  const idsKey = questionIds.join(",");

  // Load the batch-filter options once per open.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    listPickerBatchesAction().then((res) => {
      if (!cancelled && res.ok) setBatches(res.batches);
    });
    return () => {
      cancelled = true;
    };
  }, [open]);

  // Load draft papers whenever the picker filters change (debounced for the
  // search box). Only the initial, unfiltered open auto-flips to "create" mode
  // when the org genuinely has no drafts — a filter that returns nothing must not.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    const t = setTimeout(() => {
      listActivePapersAction({ query: query || undefined, batchId: batchId || null }).then(
        (res) => {
          if (cancelled) return;
          setLoading(false);
          if (res.ok) {
            setPapers(res.papers);
            setSelectedId((cur) =>
              res.papers.some((p) => p.id === cur) ? cur : res.papers[0]?.id ?? ""
            );
            if (!query && !batchId) setCreating(res.papers.length === 0);
          } else {
            toast.error(res.error);
          }
        }
      );
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [open, query, batchId]);

  // Cross-paper soft-warn: which cart questions already live in OTHER papers
  // (excluding the selected target — "already in this one" is the add's own
  // alreadyIn count, a separate message).
  useEffect(() => {
    if (!open) {
      setUsage({});
      return;
    }
    let cancelled = false;
    const exclude = creating ? undefined : selectedId || undefined;
    questionUsageAction(questionIds, exclude).then((res) => {
      if (cancelled) return;
      if (res.ok) setUsage(res.usage);
    });
    return () => {
      cancelled = true;
    };
  }, [open, selectedId, creating, idsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const { usedCount, usedPaperTitles } = useMemo(() => {
    const titles = new Set<string>();
    let n = 0;
    for (const id of questionIds) {
      const refs = usage[id];
      if (refs && refs.length > 0) {
        n += 1;
        for (const r of refs) titles.add(r.title);
      }
    }
    return { usedCount: n, usedPaperTitles: Array.from(titles) };
  }, [usage, idsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  function reportAndClose(paperId: string, added: number, alreadyIn: number) {
    const parts = [`Added ${added}`];
    if (alreadyIn > 0) parts.push(`${alreadyIn} already there`);
    toast.success(parts.join(" · "), {
      action: { label: "View paper", onClick: () => router.push(`/dashboard/papers/${paperId}`) },
    });
    // Clear the cart now that it's committed — otherwise the selection lingers
    // in localStorage and piles up across papers.
    onCommitted?.();
    onOpenChange(false);
  }

  // Add the given ids to the target (existing or freshly created) paper.
  async function doAdd(ids: string[]) {
    if (ids.length === 0) {
      toast.message("Nothing to add — all selected questions are used elsewhere.");
      return;
    }
    if (creating) {
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
      const res = await addCartToPaperAction(created.id, ids);
      setBusy(false);
      if (res.ok) reportAndClose(created.id, res.added, res.alreadyIn);
      else toast.error(res.error);
      return;
    }
    if (!selectedId) return;
    setBusy(true);
    const res = await addCartToPaperAction(selectedId, ids);
    setBusy(false);
    if (res.ok) reportAndClose(selectedId, res.added, res.alreadyIn);
    else toast.error(res.error);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !busy && onOpenChange(v)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add {count} question{count === 1 ? "" : "s"} to a paper</DialogTitle>
          <DialogDescription>
            Questions are filed into the section matching their subject. You can
            rearrange them in the paper afterwards. Adding clears your selection.
          </DialogDescription>
        </DialogHeader>

        {creating ? (
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
            <Label htmlFor="atp-search">Paper</Label>
            <div className="flex gap-2">
              <Input
                id="atp-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search papers by title…"
                disabled={busy}
                className="flex-1"
              />
              {batches.length > 0 && (
                <select
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  disabled={busy}
                  aria-label="Filter by batch"
                  className="h-10 max-w-[45%] rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">All batches</option>
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {loading ? (
              <p className="py-2 text-sm text-muted-foreground">Loading papers…</p>
            ) : papers.length === 0 ? (
              <p className="py-2 text-sm text-muted-foreground">
                No draft papers match.{" "}
                <button
                  type="button"
                  onClick={() => setCreating(true)}
                  className="text-brand-accent underline hover:opacity-80"
                >
                  Create a new paper
                </button>
                .
              </p>
            ) : (
              <select
                id="atp-select"
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                disabled={busy}
                className={SELECT_CLASS}
              >
                {papers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                    {p.batchLabel ? ` — ${p.batchLabel}` : ""}
                  </option>
                ))}
              </select>
            )}
            <p className="text-xs text-muted-foreground">
              Showing the {PAPER_PICKER_LIMIT} most recent drafts — search or filter
              to reach older ones.
            </p>
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-1 text-xs text-brand-accent underline hover:opacity-80"
            >
              <FilePlus2 className="h-3 w-3" aria-hidden /> New paper
            </button>
          </div>
        )}

        {usedCount > 0 && (
          <div className="flex items-start gap-2 rounded-md border bg-muted/50 p-3 text-xs text-muted-foreground">
            <History className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            <p>
              <span className="font-medium text-foreground">
                {usedCount} of {count}
              </span>{" "}
              {usedCount === 1 ? "is" : "are"} already used in other papers
              {usedPaperTitles.length > 0 && (
                <> ({usedPaperTitles.slice(0, 3).join(", ")}
                  {usedPaperTitles.length > 3 ? "…" : ""})</>
              )}
              . You can add them anyway or skip them.
            </p>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={busy}>
            Cancel
          </Button>
          {usedCount > 0 && (
            <Button
              variant="outline"
              onClick={() => doAdd(filterUnused(questionIds, new Map(Object.entries(usage))))}
              disabled={busy || loading || (!creating && !selectedId)}
            >
              Skip {usedCount} used
            </Button>
          )}
          <Button
            variant="brand"
            onClick={() => doAdd(questionIds)}
            disabled={busy || loading || count === 0 || (!creating && !selectedId)}
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {creating ? "Create & add all" : usedCount > 0 ? "Add all anyway" : "Add to paper"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
