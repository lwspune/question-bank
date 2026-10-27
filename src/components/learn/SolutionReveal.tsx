"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import type { RenderedSolution } from "@/lib/learn/answer";
import { FigureFrame } from "./FigureFrame";
import { FigureView } from "./FigureView";
import { StepList } from "./StepList";

// Copied from Concept Ladder (src/app/learn/[chapter]/[concept]/SolutionReveal.tsx, afca8bf).

/** Seconds between solution steps; figure elements tagged with a step appear in sync. */
const STEP_S = 0.9;

/** The "See the solution" button; it sits in the row with the other answer buttons. */
export function SolutionToggle({ open, panelId, onToggle }: { open: boolean; panelId: string; onToggle: () => void }) {
  return (
    <Button type="button" variant="outline" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
      {open ? "Hide the solution" : "See the solution"}
    </Button>
  );
}

/** The solution itself: the steps play in turn, beside the figure when there is one. */
export function SolutionPanel({ solution, panelId }: { solution: RenderedSolution; panelId: string }) {
  const [plays, setPlays] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  // On small screens the solution opens below the fold of the slide.
  useEffect(() => {
    panelRef.current?.scrollIntoView({ block: "nearest" });
  }, [plays]);

  return (
    // Remounting on replay restarts the CSS animations.
    <div key={plays} ref={panelRef} id={panelId} className="mt-4 rounded-2xl border bg-card p-5">
      <p className="font-sans text-lg font-semibold">Solution</p>
      <div className={`mt-4 ${solution.figure ? "grid gap-6 md:grid-cols-2 md:items-start" : ""}`}>
        <StepList steps={solution.steps} stagger={STEP_S} />
        {solution.figure && (
          <FigureFrame>
            <FigureView figure={solution.figure} stagger={STEP_S} className="h-auto w-full" />
          </FigureFrame>
        )}
      </div>
      <button
        type="button"
        className="mt-4 rounded text-sm font-medium text-brand-accent underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={() => setPlays((n) => n + 1)}
      >
        Replay
      </button>
    </div>
  );
}
