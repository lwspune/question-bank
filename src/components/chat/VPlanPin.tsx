"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CalendarCheck, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import type { PathView } from "@/lib/path/view";
import { planSummary } from "@/lib/chat/planPin";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import { cn } from "@/lib/utils";
import { VPathCardBody } from "./VPathCard";

/**
 * The pinned "Today's plan" row at the top of V's chat (owner, 2026-11-22).
 * The board plan left every page; a student on it taps "My plan for today"
 * and this row stays above the conversation for the rest of the India day
 * (lib/chat/planPin), one line until tapped, then today's card in place.
 *
 * Reads GET /api/path on mount and on each opening, so a task done on another
 * page shows ticked; that read also stores today's pick, the free Top 10
 * answers and the Fix questions, exactly as /me's card used to.
 */
export default function VPlanPin({
  open,
  onToggle,
  onNavigate,
  onGone,
}: {
  open: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
  /** No plan to show (stopped, or none): the widget drops the pin. */
  onGone: () => void;
}) {
  const [view, setView] = useState<PathView | null>(null);

  // Held in a ref so a new callback from the widget never re-runs the read.
  const gone = useRef(onGone);
  gone.current = onGone;
  const first = useRef(true);

  // Read on mount and again each time it opens.
  useEffect(() => {
    if (!open && !first.current) return;
    first.current = false;
    let live = true;
    fetch("/api/path", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: { today: PathView | null }) => {
        if (!live) return;
        if (!j.today) return gone.current();
        setView(j.today);
      })
      .catch(() => {
        // Keep the row with what it last showed; a first read that fails shows nothing.
      });
    return () => {
      live = false;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !view) return;
    // The readout's funnel (Phase 4): V's plan card opened, and the week review seen in it.
    sendActivityOnce("v_path", { kind: "surface_viewed", surface: "v_path" });
    if (view.review) sendActivityOnce("path_review", { kind: "surface_viewed", surface: "path_review" });
  }, [open, view]);

  async function stop() {
    try {
      const res = await fetch("/api/path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "stop" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast.success("Your plan is stopped.");
      gone.current();
    } catch {
      toast.error("Couldn't stop the plan. Try again.");
    }
  }

  if (!view) return null;
  return <VPlanPinView view={view} open={open} onToggle={onToggle} onNavigate={onNavigate} onStop={stop} />;
}

export function VPlanPinView({
  view,
  open,
  onToggle,
  onNavigate,
  onStop,
}: {
  view: PathView;
  open: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
  onStop?: () => Promise<void>;
}) {
  const panelId = useId();
  return (
    <div className="shrink-0 border-b border-border/70 bg-card px-4 py-2">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-2 rounded-md py-1 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <CalendarCheck className="h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
        <span className="font-semibold">Today&apos;s plan</span>
        <span className="text-xs tabular-nums text-muted-foreground">{planSummary(view)}</span>
        <ChevronDown className={cn("ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none", open && "rotate-180")} aria-hidden />
      </button>
      <div id={panelId} hidden={!open} className="max-h-[50vh] overflow-y-auto pb-1 pt-2">
        {open && <VPathCardBody view={view} onNavigate={onNavigate} onStop={onStop} inPin />}
      </div>
    </div>
  );
}
