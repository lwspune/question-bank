"use client";

import { useState } from "react";
import { Download } from "lucide-react";
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
  const [title, setTitle] = useState("Question Bank Export");
  const [includeSolutions, setIncludeSolutions] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filterCount = totalCount;
  const cartCount = cart.count;
  const activeCount = mode === "cart" ? cartCount : filterCount;
  const overCap = activeCount > 200;

  async function onDownload() {
    setBusy(true);
    setError(null);
    try {
      const body =
        mode === "cart"
          ? { questionIds: cart.ids, options: { title, includeSolutions } }
          : { filters, options: { title, includeSolutions } };
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
      a.download = `${sanitize(title)}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(
        `Downloaded ${activeCount} question${activeCount === 1 ? "" : "s"}`
      );
      setOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Download failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  const cartAvailable = cart.hydrated && cartCount > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          <Button disabled={filterCount === 0} className="w-full sm:w-auto">
            <Download className="h-4 w-4" aria-hidden />
            Download
            {filterCount > 0 && (
              <span className="ml-1 text-primary-foreground/80">
                · {filterCount}
              </span>
            )}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Download {activeCount} question{activeCount === 1 ? "" : "s"}
          </DialogTitle>
          <DialogDescription>
            You&apos;ll get a .zip with two files: the Question Paper and the
            Answer Key. Both use 0.5″ margins, 2 columns, Cambria 10pt.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
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

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={busy}
          >
            Cancel
          </Button>
          <Button
            onClick={onDownload}
            disabled={busy || overCap || activeCount === 0}
          >
            {busy ? "Generating…" : "Download"}
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
