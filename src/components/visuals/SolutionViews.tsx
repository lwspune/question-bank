"use client";

/**
 * Animated or Still (owner, 2026-10-25). Where a question has a visual that
 * passed its self-check, the solution opens Animated and a switch offers
 * Still, which is the solution exactly as it was. The switch moves this
 * solution only; the device remembers it as the starting view of solutions
 * opened later. With no visual this renders header + lead + still unchanged, so
 * every other question looks exactly as before.
 *
 * `visual` must already have been through usableVisual() on the server.
 */
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useSolutionView, type SolutionView } from "@/lib/visuals/viewPref";
import { cn } from "@/lib/utils";

const AnimatedSolution = dynamic(() => import("./AnimatedSolution"), {
  loading: () => <div className="h-56 animate-pulse rounded-lg bg-muted" aria-hidden />,
});

interface Props {
  visual: unknown | null | undefined;
  solution: string | null;
  /** The solution box's title row. */
  header: ReactNode;
  /** Shown in both views, under the title (a numeric answer). */
  lead?: ReactNode;
  /** The solution as it renders today. */
  still: ReactNode;
}

export default function SolutionViews({ visual, solution, header, lead, still }: Props) {
  const [view, setView] = useSolutionView();
  if (!visual) {
    return (
      <>
        {header}
        {lead}
        {still}
      </>
    );
  }
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        {header}
        <ViewSwitch view={view} onChange={setView} />
      </div>
      {lead}
      {view === "animated" ? (
        <div className="mt-2">
          <AnimatedSolution visual={visual} solution={solution} />
        </div>
      ) : (
        still
      )}
    </>
  );
}

function ViewSwitch({ view, onChange }: { view: SolutionView; onChange: (v: SolutionView) => void }) {
  const option = (v: SolutionView, label: string) => (
    <button
      type="button"
      aria-pressed={view === v}
      onClick={() => onChange(v)}
      className={cn(
        "rounded px-2.5 py-1 font-sans text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        view === v ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
  return (
    <div role="group" aria-label="Solution view" className="inline-flex rounded-md border bg-card p-0.5">
      {option("animated", "Animated")}
      {option("still", "Still")}
    </div>
  );
}
