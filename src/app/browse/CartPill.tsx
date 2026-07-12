"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, FilePlus2, ShoppingCart, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart/CartProvider";
import { safeSnippet } from "@/lib/text/safeSnippet";
import KatexRenderer from "@/components/math/KatexRenderer";
import DownloadDialog from "./DownloadDialog";
import AddToPaperDialog from "./AddToPaperDialog";
import type { Filters } from "@/lib/questions/filters";

type Preview = {
  id: string;
  text: string;
  questionNumber: string | null;
  sourceRow: number | null;
  exam: { id: string; name: string };
  subject: { id: string; name: string };
  chapter: { id: string; name: string };
  subtopic: { id: string; name: string } | null;
};

type SortMode = "insertion" | "by-chapter";

/**
 * Floating "open paper" pill (bottom-right) + a Sheet that lists the cart's
 * questions with a sort toggle and a Download button. Hidden until the cart
 * has at least one item; never appears server-rendered (avoids the SSR-vs-
 * localStorage hydration mismatch — render only after CartProvider hydrates).
 */
export default function CartPill({
  filters,
  isOrgMember = false,
  isSignedIn = false,
}: {
  filters: Filters;
  /** Signed-in org member (ADMIN/TEACHER) — unlocks "Add to paper" + tagged sheet. */
  isOrgMember?: boolean;
  /** Signed-in (any account) — unlocks the paper + key downloads. */
  isSignedIn?: boolean;
}) {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [addPaperOpen, setAddPaperOpen] = useState(false);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>("insertion");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pulseKey, setPulseKey] = useState(0);
  const prevCountRef = useRef(cart.count);

  // Bump the count badge briefly whenever the cart grows (not when shrinking).
  useEffect(() => {
    if (cart.count > prevCountRef.current) setPulseKey((k) => k + 1);
    prevCountRef.current = cart.count;
  }, [cart.count]);

  // Fetch previews whenever the panel is opened OR the cart contents change
  // while it's open.
  useEffect(() => {
    if (!open || cart.ids.length === 0) {
      setPreviews([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch("/api/cart/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: cart.ids }),
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(body.error ?? `Preview failed (${res.status})`);
        }
        const data = (await res.json()) as { items: Preview[] };
        if (!cancelled) setPreviews(data.items);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Preview failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, cart.ids]);

  const sorted = useMemo(() => {
    if (sortMode === "by-chapter") {
      return [...previews].sort((a, b) => {
        const e = a.exam.name.localeCompare(b.exam.name);
        if (e !== 0) return e;
        const s = a.subject.name.localeCompare(b.subject.name);
        if (s !== 0) return s;
        const c = a.chapter.name.localeCompare(b.chapter.name);
        if (c !== 0) return c;
        return (a.sourceRow ?? 0) - (b.sourceRow ?? 0);
      });
    }
    // insertion-order: rely on cart.ids ordering, then map onto previews
    const byId = new Map(previews.map((p) => [p.id, p]));
    return cart.ids
      .map((id) => byId.get(id))
      .filter((p): p is Preview => p !== undefined);
  }, [previews, sortMode, cart.ids]);

  if (!cart.hydrated || cart.count === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        // Position respects iOS home-indicator safe area: pin to max(1rem,
        // env(safe-area-inset-bottom)) on phone, larger fixed offset on sm+.
        style={{
          bottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
        className={cn(
          "fixed right-4 z-40 flex animate-pill-in items-center gap-2 rounded-full border border-primary/20 bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:right-6"
        )}
        aria-label={`Open paper (${cart.count} questions)`}
      >
        <ShoppingCart className="h-4 w-4" aria-hidden />
        <span>Paper</span>
        <span
          key={pulseKey}
          className="inline-flex animate-count-pulse items-center justify-center rounded-full bg-primary-foreground/20 px-2 py-0.5 font-mono text-xs tabular-nums"
        >
          {cart.count}
        </span>
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
        >
          <SheetHeader className="border-b p-4">
            <SheetTitle>Your paper · {cart.count} questions</SheetTitle>
          </SheetHeader>

          <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-2">
            <span className="text-xs font-medium text-muted-foreground">
              Sort:
            </span>
            <div
              role="group"
              aria-label="Sort order"
              className="inline-flex rounded-md border border-input bg-background p-0.5"
            >
              <SortButton
                active={sortMode === "insertion"}
                onClick={() => setSortMode("insertion")}
                label="Added order"
              />
              <SortButton
                active={sortMode === "by-chapter"}
                onClick={() => setSortMode("by-chapter")}
                label="By chapter"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto h-8 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => setClearConfirmOpen(true)}
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden />
              Clear
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading && (
              <p className="p-4 text-sm text-muted-foreground">Loading…</p>
            )}
            {error && (
              <p
                className="m-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </p>
            )}
            {!loading && !error && sorted.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground">No questions.</p>
            )}
            <ul className="divide-y">
              {sorted.map((p, i) => (
                <CartItem
                  key={p.id}
                  index={i + 1}
                  preview={p}
                  onRemove={() => cart.remove(p.id)}
                />
              ))}
            </ul>
          </div>

          <div className="flex gap-2 border-t bg-background p-4">
            {isOrgMember && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setAddPaperOpen(true)}
                disabled={cart.count === 0}
              >
                <FilePlus2 className="h-4 w-4" aria-hidden />
                Add to paper
              </Button>
            )}
            <Button
              className="flex-1"
              onClick={() => setDownloadOpen(true)}
              disabled={cart.count === 0}
            >
              <Download className="h-4 w-4" aria-hidden />
              Download paper
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {isOrgMember && (
        <AddToPaperDialog
          questionIds={cart.ids}
          open={addPaperOpen}
          onOpenChange={setAddPaperOpen}
        />
      )}

      <DownloadDialog
        filters={filters}
        totalCount={0}
        initialMode="cart"
        externalOpen={downloadOpen}
        onExternalOpenChange={setDownloadOpen}
        hideTrigger
        isSignedIn={isSignedIn}
        isStaff={isOrgMember}
      />

      <Dialog open={clearConfirmOpen} onOpenChange={setClearConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Clear all questions?</DialogTitle>
            <DialogDescription>
              This removes all {cart.count} question
              {cart.count === 1 ? "" : "s"} from your paper. You can&apos;t
              undo this.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setClearConfirmOpen(false)}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                cart.clear();
                setClearConfirmOpen(false);
              }}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              Clear all
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function SortButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}

function CartItem({
  index,
  preview,
  onRemove,
}: {
  index: number;
  preview: Preview;
  onRemove: () => void;
}) {
  const breadcrumb = `${preview.subject.name} → ${preview.chapter.name}${
    preview.subtopic ? ` → ${preview.subtopic.name}` : ""
  }`;
  const snippet = safeSnippet(preview.text, 140);
  return (
    <li className="flex items-start gap-3 p-3">
      <span className="mt-0.5 inline-flex h-6 w-7 shrink-0 items-center justify-center rounded bg-muted font-mono text-xs text-muted-foreground">
        {index}
      </span>
      <div className="min-w-0 flex-1">
        <p className="mb-1 flex flex-wrap items-center gap-x-2 text-[11px] text-muted-foreground">
          {preview.questionNumber && (
            <span className="font-mono">Q{preview.questionNumber}</span>
          )}
          <span className="truncate">{breadcrumb}</span>
        </p>
        <div className="overflow-x-auto font-serif text-[13px] leading-snug [&_.katex]:max-w-full">
          <KatexRenderer text={snippet} />
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        title="Remove from paper"
        className="shrink-0 rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </li>
  );
}
