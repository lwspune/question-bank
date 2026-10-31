"use client";

/**
 * Animated or Still (owner, 2026-10-25). Where a question has a visual that
 * passed its self-check, the solution opens Animated and a switch offers
 * Still, which is the solution exactly as it was. The switch moves this
 * solution only; the device remembers it as the starting view of solutions
 * opened later. With no visual this renders header + lead + still unchanged, so
 * every other question looks exactly as before.
 *
 * With `track`, what the student does is recorded (lib/visuals/usage, signed-in
 * only): the player's shown / finished / replayed, a tap on the switch, and a
 * solution that opened in Still because the device remembered Still, counted
 * when its switch comes on screen (a closed mock-review solution is mounted but
 * never seen).
 *
 * `visual` must already have been through usableVisual() on the server.
 */
import dynamic from "next/dynamic";
import { useEffect, useRef, type ReactNode, type Ref } from "react";
import { readSolutionView, useSolutionView, type SolutionView } from "@/lib/visuals/viewPref";
import { sceneOf, type VisualAction } from "@/lib/visuals/usage";
import { reportVisual, type VisualTrack } from "@/lib/visuals/usageBeacon";
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
  /** The question and surface, to record use of the visual. */
  track?: VisualTrack;
}

export default function SolutionViews({ visual, solution, header, lead, still, track }: Props) {
  const [view, setView] = useSolutionView();
  const switchRef = useRef<HTMLDivElement>(null);
  const scene = sceneOf(visual);
  const report = (action: VisualAction) => {
    if (track) reportVisual(track, scene, action);
  };
  const reportRef = useRef(report);
  reportRef.current = report;

  // Opened in Still from the device's memory: recorded once the switch is seen.
  const hasVisual = !!visual;
  useEffect(() => {
    const el = switchRef.current;
    if (!hasVisual || !el || readSolutionView() !== "still") return;
    if (typeof IntersectionObserver === "undefined") {
      reportRef.current("opened_still");
      return;
    }
    const seen = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        seen.disconnect();
        reportRef.current("opened_still");
      }
    });
    seen.observe(el);
    return () => seen.disconnect();
  }, [hasVisual]);

  if (!visual) {
    return (
      <>
        {header}
        {lead}
        {still}
      </>
    );
  }
  const choose = (v: SolutionView) => {
    if (v !== view) report(v === "still" ? "chose_still" : "chose_animated");
    setView(v);
  };
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        {header}
        <ViewSwitch groupRef={switchRef} view={view} onChange={choose} />
      </div>
      {lead}
      {view === "animated" ? (
        <div className="mt-2">
          <AnimatedSolution visual={visual} solution={solution} onEvent={track ? report : undefined} />
        </div>
      ) : (
        still
      )}
    </>
  );
}

function ViewSwitch({
  groupRef,
  view,
  onChange,
}: {
  groupRef: Ref<HTMLDivElement>;
  view: SolutionView;
  onChange: (v: SolutionView) => void;
}) {
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
    <div ref={groupRef} role="group" aria-label="Solution view" className="inline-flex rounded-md border bg-card p-0.5">
      {option("animated", "Animated")}
      {option("still", "Still")}
    </div>
  );
}
