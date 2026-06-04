"use client";

import { useState } from "react";
import { Download, FileText, Key } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Filters } from "@/lib/questions/filters";
import { useCart } from "@/lib/cart/CartProvider";

type Mode = "filters" | "cart";
type Kind = "paper" | "key";

export default function DownloadDialog({
  filters,
  totalCount,
  /** When opened from the cart panel, default to cart mode and disable mode-toggle. */
  initialMode,
  /** External open control — used by CartPanel which has its own button. */
  externalOpen,
  onExternalOpenChange,
  hideTrigger,
}: {
  filters: Filters;
  totalCount: number;
  initialMode?: Mode;
  externalOpen?: boolean;
  onExternalOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = (v: boolean) => {
    if (onExternalOpenChange) onExternalOpenChange(v);
    else setInternalOpen(v);
  };

  const cart = useCart();
  const [mode, setMode] = useState<Mode>(initialMode ?? "filters");
  const [title, setTitle] = useState("PYQ Vault Export");
  const [includeSolutions, setIncludeSolutions] = useState(true);
  const [busyKind, setBusyKind] = useState<Kind | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filterCount = totalCount;
  const cartCount = cart.count;
  const activeCount = mode === "cart" ? cartCount : filterCount;
  const overCap = activeCount > 200;
  const busy = busyKind !== null;

  async function onDownload(kind: Kind) {
    setBusyKind(kind);
    setError(null);
    try {
      const body =
        mode === "cart"
          ? { kind, questionIds: cart.ids, options: { title, includeSolutions } }
          : { kind, filters, options: { title, includeSolutions } };
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
          retryAfter?: number;
        };
        const msg =
          res.status === 429 && json.retryAfter
            ? `Too many downloads — try again in ${formatRetry(json.retryAfter)}.`
            : json.error ?? `Download failed (${res.status})`;
        setError(msg);
        toast.error(msg);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${kind === "paper" ? "QP" : "Answers"}_${sanitize(title)}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(
        kind === "paper"
          ? "Question Paper downloaded"
          : "Answer Key downloaded"
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Download failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusyKind(null);
    }
  }

  const cartAvailable = cart.hydrated && cartCount > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          <Button
            variant="brand"
            disabled={filterCount === 0}
            className="w-full sm:w-auto"
          >
            <Download className="h-4 w-4" aria-hidden />
            Download
            {filterCount > 0 && (
              <span className="ml-1 text-brand-foreground/80">
                · {filterCount}
              </span>
            )}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="flex max-h-[90dvh] flex-col gap-0 p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>
            Download {activeCount} question{activeCount === 1 ? "" : "s"}
          </DialogTitle>
          <DialogDescription>
            Two separate Word files — Question Paper and Answer Key. Tap each
            to download. Both use 0.5″ margins, 2 columns, Cambria 10pt.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
          {cartAvailable && (
            <div
              role="group"
              aria-label="Question source"
              className="inline-flex w-full rounded-md border border-input bg-background p-0.5"
            >
              <ModeButton
                active={mode === "filters"}
                onClick={() => setMode("filters")}
                disabled={busy || filterCount === 0}
                label="Current filters"
                count={filterCount}
              />
              <ModeButton
                active={mode === "cart"}
                onClick={() => setMode("cart")}
                disabled={busy}
                label="Selected"
                count={cartCount}
              />
            </div>
          )}
          {overCap && (
            <div
              className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
              role="alert"
            >
              Too many questions for one export (cap is 200).{" "}
              {mode === "cart"
                ? "Remove some from your selection, then try again."
                : "Add a chapter or subtopic filter, then try again."}
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="export-title">Document title</Label>
            <Input
              id="export-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={busy}
            />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeSolutions}
              onChange={(e) => setIncludeSolutions(e.target.checked)}
              disabled={busy}
              className="h-4 w-4"
            />
            <span>Include solutions in the Answer Key</span>
          </label>
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>

        <DialogFooter className="sticky bottom-0 flex-col gap-2 border-t bg-background px-6 py-4 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={busy}
            className="w-full sm:w-auto"
          >
            {busy ? "Working…" : "Done"}
          </Button>
          <Button
            variant="outline"
            onClick={() => onDownload("key")}
            disabled={busy || overCap || activeCount === 0}
            className="w-full sm:w-auto"
          >
            <Key className="h-4 w-4" aria-hidden />
            {busyKind === "key" ? "Generating…" : "Answer Key"}
          </Button>
          <Button
            variant="brand"
            onClick={() => onDownload("paper")}
            disabled={busy || overCap || activeCount === 0}
            className="w-full sm:w-auto"
          >
            <FileText className="h-4 w-4" aria-hidden />
            {busyKind === "paper" ? "Generating…" : "Question Paper"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ModeButton({
  active,
  onClick,
  disabled,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  disabled: boolean;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={cn(
        "flex flex-1 items-center justify-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <span>{label}</span>
      <span className="font-mono tabular-nums opacity-80">· {count}</span>
    </button>
  );
}

function sanitize(s: string): string {
  return s.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_") || "export";
}

function formatRetry(seconds: number): string {
  if (seconds < 90) return `${seconds} seconds`;
  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) return `${minutes} minutes`;
  const hours = Math.ceil(minutes / 60);
  return `${hours} hour${hours === 1 ? "" : "s"}`;
}
