"use client";

/**
 * "Teach me step by step" (V_SPEC.md section 0, step 1; owner 2026-11-12):
 * the stored solution of the question V just explained, one step at a time,
 * the animation (when the question has one) drawing the same step. Between
 * steps: "Got it, next step" or "Lost me here". No AI call per step, so it
 * uses none of the hour's messages; "Lost me here" hands the step to the
 * window, which asks V about it and offers to continue after V's reply.
 *
 * The steps come from POST /api/chat/steps, which serves them only for a
 * question V explained to this student today. Every tap is counted there.
 */
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, CircleHelp, Plus } from "lucide-react";
import { toast } from "sonner";
import MathBlockText from "./MathBlockText";
import type { StepAction } from "@/lib/chat/stepByStep";
import { sceneOf } from "@/lib/visuals/usage";
import { reportVisual } from "@/lib/visuals/usageBeacon";

// The player loads only when the steps are an animation's own.
const AnimatedSolution = dynamic(() => import("@/components/visuals/AnimatedSolution"));

type State =
  | { kind: "loading" }
  | { kind: "error"; text: string }
  | { kind: "ready"; steps: string[]; visual: unknown | null };

const CHIP =
  "inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50";
const PRIMARY =
  "inline-flex h-8 items-center gap-1.5 rounded-full bg-brand px-3 text-xs font-semibold text-brand-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50";

/** Count a tap. Best effort: a lost count never stops the student. */
function count(questionId: string, action: StepAction, step: number): Promise<boolean> {
  return fetch("/api/chat/steps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionId, action, step }),
  })
    .then((r) => r.ok)
    .catch(() => false);
}

export default function VStepCard({
  questionId,
  start,
  busy,
  onLost,
  onMore,
  onGrow,
}: {
  questionId: string;
  /** The step to begin at, 0-based: 0, or the one after a "Lost me here" V has answered. */
  start: number;
  /** V is answering: the buttons wait. */
  busy: boolean;
  /** "Lost me here" on step `step` (0-based) of `total`. The card stops here. */
  onLost: (step: number, total: number) => void;
  /** "Try one like it" after the last step. */
  onMore: () => void;
  /** The card grew (steps loaded, a step added): the window scrolls to keep it in view. */
  onGrow: () => void;
}) {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [at, setAt] = useState(start);
  const [stopped, setStopped] = useState(false);
  const [moreTaken, setMoreTaken] = useState(false);
  const doneSent = useRef(false);
  const onGrowRef = useRef(onGrow);
  onGrowRef.current = onGrow;

  useEffect(() => {
    let live = true;
    void fetch("/api/chat/steps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, action: "open", step: start }),
    })
      .then(async (res) => {
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean; steps?: unknown; visual?: unknown; error?: string };
        if (!live) return;
        const steps = Array.isArray(data.steps) ? data.steps.filter((s): s is string => typeof s === "string") : [];
        if (!res.ok || !data.ok || steps.length < 2) {
          setState({ kind: "error", text: data.error || "Couldn't load the steps. Please try again." });
          return;
        }
        setState({ kind: "ready", steps, visual: data.visual && typeof data.visual === "object" ? data.visual : null });
      })
      .catch(() => {
        if (live) setState({ kind: "error", text: "Couldn't load the steps. Please try again." });
      });
    return () => {
      live = false;
    };
  }, [questionId, start]);

  const total = state.kind === "ready" ? state.steps.length : 0;
  const last = total > 0 && at >= total - 1;

  // The last step on screen is the end of the solution: counted once.
  useEffect(() => {
    if (state.kind !== "ready" || !last || doneSent.current) return;
    doneSent.current = true;
    void count(questionId, "done", at);
  }, [state.kind, last, at, questionId]);

  useEffect(() => {
    if (state.kind !== "loading") onGrowRef.current();
  }, [state.kind, at]);

  if (state.kind === "loading") {
    return (
      <p className="ml-9 mt-2 text-xs text-muted-foreground" role="status">
        Getting the steps…
      </p>
    );
  }
  if (state.kind === "error") {
    return <p className="ml-9 mt-2 text-xs text-muted-foreground">{state.text}</p>;
  }

  const shown = state.steps.slice(start, at + 1);

  function next() {
    void count(questionId, "next", at);
    setAt((k) => Math.min(k + 1, total - 1));
  }

  function lost() {
    setStopped(true);
    void count(questionId, "lost", at).then((ok) => {
      if (!ok) toast.error("Couldn't save that, but V will still explain the step.");
    });
    onLost(at, total);
  }

  return (
    <div className="ml-9 mt-2 max-w-[calc(100%-2.25rem)] space-y-2 rounded-lg border bg-card p-3">
      <ol className="space-y-2" aria-live="polite">
        {shown.map((text, k) => {
          const n = start + k;
          return (
            <li key={n} className={n === at ? "" : "text-muted-foreground"}>
              <p className="mb-0.5 font-sans text-xs font-semibold text-brand-accent">
                Step {n + 1} of {total}
              </p>
              <div className="min-w-0 overflow-x-auto font-serif text-sm">
                <MathBlockText text={text} />
              </div>
            </li>
          );
        })}
      </ol>

      {state.visual ? (
        <div className="rounded-md border p-2">
          <AnimatedSolution
            visual={state.visual}
            solution={null}
            step={at}
            onEvent={(e, d) => reportVisual({ questionId, surface: "v" }, sceneOf(state.visual), e, d)}
          />
        </div>
      ) : null}

      {!stopped && (
        <div className="flex flex-wrap items-center gap-2 border-t pt-2">
          {last ? (
            <>
              <span className="w-full text-xs text-muted-foreground">That&apos;s the whole solution.</span>
              {!moreTaken && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => {
                    setMoreTaken(true);
                    onMore();
                  }}
                  className={PRIMARY}
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden />
                  Try one like it
                </button>
              )}
            </>
          ) : (
            <button type="button" disabled={busy} onClick={next} className={PRIMARY}>
              Got it, next step
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          )}
          <button type="button" disabled={busy} onClick={lost} className={CHIP}>
            <CircleHelp className="h-3.5 w-3.5" aria-hidden />
            Lost me here
          </button>
        </div>
      )}
    </div>
  );
}
