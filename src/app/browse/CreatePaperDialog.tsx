"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
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
import { createPaperWithQuestions } from "./createPaperWithQuestions";

/**
 * Fast lane from the /browse cart to a BRAND-NEW paper: name it, and land in the
 * paper editor with the questions already filed by subject.
 *
 * Distinct from AddToPaperDialog, which picks an EXISTING draft and keeps you on
 * /browse afterwards. Org-member only — the cart footer routes everyone else to
 * /request-access instead of opening this, because `papers.org_id` is NOT NULL
 * and every RLS policy on papers scopes to the caller's org (migration 0039), so
 * a student cannot own or even read a paper row.
 */
export default function CreatePaperDialog({
  questionIds,
  open,
  onOpenChange,
  onCreated,
}: {
  questionIds: string[];
  open: boolean;
  onOpenChange: (v: boolean) => void;
  /** Fired ONLY on success — the cart clears here, never after a failure. */
  onCreated?: () => void;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);
  const count = questionIds.length;

  async function onCreate() {
    const clean = title.trim();
    if (!clean) {
      toast.error("Give the paper a title.");
      return;
    }
    setBusy(true);
    const res = await createPaperWithQuestions(clean, questionIds);
    setBusy(false);

    if (!res.ok) {
      // On a mid-sequence failure the paper exists but is empty. Name that, and
      // leave the cart intact so "Add to paper" can retry into it — clearing the
      // selection here would lose the questions that never landed.
      toast.error(
        res.createdId
          ? `${res.error} — "${clean}" was created but is empty. Your selection is still here; use "Add to paper" to retry.`
          : res.error
      );
      return;
    }

    const parts = [`Added ${res.added}`];
    if (res.alreadyIn > 0) parts.push(`${res.alreadyIn} already there`);
    toast.success(`${clean} · ${parts.join(" · ")}`);
    onCreated?.();
    onOpenChange(false);
    router.push(`/dashboard/papers/${res.id}`);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !busy && onOpenChange(v)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            New paper · {count} question{count === 1 ? "" : "s"}
          </DialogTitle>
          <DialogDescription>
            Questions are filed into the section matching their subject. You&apos;ll
            land in the paper, where you can rearrange them, add more, and download
            the Question Paper and Answer Key. Creating clears your selection.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1.5">
          <Label htmlFor="create-paper-title">Paper title</Label>
          <Input
            id="create-paper-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !busy) {
                e.preventDefault();
                void onCreate();
              }
            }}
            placeholder="e.g. NDA GAT — Mock 1"
            disabled={busy}
            autoFocus
          />
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={busy}
          >
            Cancel
          </Button>
          <Button
            variant="brand"
            onClick={() => void onCreate()}
            disabled={busy || count === 0}
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            {busy ? "Creating…" : "Create paper"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
