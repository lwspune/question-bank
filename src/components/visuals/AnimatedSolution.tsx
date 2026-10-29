"use client";

/**
 * The Animated solution: a scene that moves with the solution step by step.
 * Loaded lazily by SolutionViews, so pages only fetch the scene code for a
 * question that has a visual. The solution text shown beside the picture is
 * the stored solution cut at its sentences (lib/visuals/visual stepTexts),
 * never rewritten; when the steps cannot be trusted against it, the picture
 * plays on its own and the whole solution sits below it.
 */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Play } from "lucide-react";
import BlockText from "@/components/math/BlockText";
import { fitMathLines } from "@/lib/visuals/fitMath";
import { easeInOut } from "@/lib/visuals/geometry";
import { getScene } from "@/lib/visuals/registry";
import { checkVisual, parseSolutionVisual, stepTexts } from "@/lib/visuals/visual";
import { cn } from "@/lib/utils";
import SceneSvg from "./SceneSvg";

type Pos = { step: number; beat: number; t: number };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

export default function AnimatedSolution({ visual: raw, solution }: { visual: unknown; solution: string | null }) {
  // Parsed and checked again here: a chat turn kept on the device can be edited,
  // so the player never trusts that the server's check still holds.
  const parsed = useMemo(() => {
    const r = parseSolutionVisual(raw);
    return r.ok && checkVisual(r.visual).ok ? r.visual : null;
  }, [raw]);
  if (!parsed) return solution ? <BlockText text={solution} solution /> : null;
  return <Player visual={parsed} solution={solution} />;
}

function Player({ visual, solution }: { visual: Extract<ReturnType<typeof parseSolutionVisual>, { ok: true }>["visual"]; solution: string | null }) {
  const scene = getScene(visual.scene)!;
  const params = visual.params;
  const steps = visual.steps;
  const texts = useMemo(() => stepTexts(visual, solution), [visual, solution]);
  const check = useMemo(() => checkVisual(visual), [visual]);
  const box = scene.viewBox(params);
  const slider = scene.slider?.(params);

  const [sliderValue, setSliderValue] = useState<number | undefined>(slider?.initial);
  // Starts at the very beginning: the first run plays by itself once the picture
  // is in view (owner, 2026-10-25), and the button only offers to play it again.
  const [pos, setPos] = useState<Pos>({ step: 0, beat: 0, t: 0 });
  const raf = useRef(0);
  const run = useRef(0);
  const frame = useRef<HTMLDivElement>(null);
  // The latest playAll, for the mount effect below without re-running it per render.
  const playAllRef = useRef<() => Promise<void>>(async () => {});

  useEffect(() => {
    // Reduced motion: show the finished picture, never animate unasked.
    if (prefersReducedMotion()) {
      const last = steps.length - 1;
      setPos({ step: last, beat: steps[last].beats.length - 1, t: 1 });
      return;
    }
    // Play when at least 40% of the picture is on screen, so a visual lower down
    // (mock review, V's window) plays when the student reaches it, not unseen.
    const el = frame.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      void playAllRef.current();
      return;
    }
    const seen = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          seen.disconnect();
          void playAllRef.current();
        }
      },
      { threshold: 0.4 },
    );
    seen.observe(el);
    return () => seen.disconnect();
  }, [steps]);

  // Maths lines (algebra steps) are measured once drawn and shrunk if wider than their box.
  useLayoutEffect(() => {
    if (frame.current) fitMathLines(frame.current);
  });
  // ...and again once KaTeX's fonts have loaded, which widens every line.
  useEffect(() => {
    let live = true;
    void document.fonts?.ready.then(() => {
      if (live && frame.current) fitMathLines(frame.current, true);
    });
    return () => {
      live = false;
    };
  }, []);

  // Stop any animation in flight when the player goes away.
  useEffect(
    () => () => {
      run.current++;
      cancelAnimationFrame(raf.current);
    },
    [],
  );

  const played = useMemo(
    () => [...steps.slice(0, pos.step).flatMap((s) => s.beats), ...steps[pos.step].beats.slice(0, pos.beat + 1)],
    [steps, pos.step, pos.beat],
  );
  const shapes = scene.frame(params, { played, t: easeInOut(pos.t), slider: sliderValue });

  function animateBeat(step: number, beat: number, token: number): Promise<boolean> {
    return new Promise((resolve) => {
      if (prefersReducedMotion()) {
        setPos({ step, beat, t: 1 });
        resolve(run.current === token);
        return;
      }
      const duration = scene.duration?.(steps[step].beats[beat]) ?? 1300;
      const t0 = performance.now();
      const tick = (now: number) => {
        if (run.current !== token) return resolve(false);
        const t = Math.min(1, (now - t0) / duration);
        setPos({ step, beat, t });
        if (t < 1) raf.current = requestAnimationFrame(tick);
        else resolve(true);
      };
      raf.current = requestAnimationFrame(tick);
    });
  }

  async function playStep(k: number, token: number): Promise<boolean> {
    for (let b = 0; b < steps[k].beats.length; b++) if (!(await animateBeat(k, b, token))) return false;
    return true;
  }

  function goTo(k: number) {
    const token = ++run.current;
    cancelAnimationFrame(raf.current);
    void playStep(Math.max(0, Math.min(steps.length - 1, k)), token);
  }

  async function playAll(): Promise<void> {
    const token = ++run.current;
    cancelAnimationFrame(raf.current);
    for (let k = 0; k < steps.length; k++) {
      if (!(await playStep(k, token))) return;
      if (k < steps.length - 1) await wait(prefersReducedMotion() ? 1200 : 600);
      if (run.current !== token) return;
    }
  }

  playAllRef.current = playAll;

  const status = slider && sliderValue !== undefined ? scene.status?.(params, sliderValue) : undefined;
  const sliderId = `viz-slider-${visual.fingerprint}`;

  return (
    <div className="viz space-y-3">
      <div className={cn("grid gap-4", texts && "md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]")}>
        <div ref={frame} className="min-w-0 space-y-2">
          <SceneSvg shapes={shapes} w={box.w} h={box.h} label={`Animated solution, step ${pos.step + 1} of ${steps.length}`} />

          {slider && sliderValue !== undefined && (
            <div className="space-y-1 font-sans text-sm">
              <label htmlFor={sliderId} className="flex justify-between gap-2 font-semibold">
                <span>Drag {slider.label}</span>
                <span className="tabular-nums">
                  {slider.label} = {sliderValue < 0 ? `−${(-sliderValue).toFixed(1)}` : sliderValue.toFixed(1)}
                </span>
              </label>
              <input
                id={sliderId}
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full accent-[hsl(var(--brand))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {status && (
                <p
                  aria-live="polite"
                  className={cn(
                    "text-xs font-semibold tabular-nums",
                    status.tone === "good" && "text-emerald-700 dark:text-emerald-300",
                    status.tone === "bad" && "text-red-700 dark:text-red-300",
                    status.tone === "muted" && "text-muted-foreground",
                  )}
                >
                  {status.text}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 font-sans">
            <button
              type="button"
              onClick={playAll}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-brand-foreground hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Play className="h-4 w-4" aria-hidden />
              Play again
            </button>
            <button
              type="button"
              onClick={() => goTo(pos.step - 1)}
              aria-label="Previous step"
              disabled={steps.length < 2}
              className="inline-flex items-center rounded-md border px-2 py-1.5 hover:border-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => goTo(pos.step + 1)}
              aria-label="Next step"
              disabled={steps.length < 2}
              className="inline-flex items-center rounded-md border px-2 py-1.5 hover:border-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
            <span className="ml-auto text-xs tabular-nums text-muted-foreground">
              Step {pos.step + 1} of {steps.length}
            </span>
          </div>

          {check.ok && (
            <p className="flex items-start gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1.5 font-sans text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>
                Checked: {scene.checkText(params, check.value)} Answer key: {visual.answer.label}.
              </span>
            </p>
          )}
        </div>

        {texts && (
          <ol className="min-w-0 space-y-1.5">
            {texts.map((t, k) => (
              <li key={k}>
                <div
                  role="button"
                  tabIndex={0}
                  aria-current={k === pos.step ? "step" : undefined}
                  onClick={() => goTo(k)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      goTo(k);
                    }
                  }}
                  className={cn(
                    "grid cursor-pointer grid-cols-[1.5rem_minmax(0,1fr)] gap-2 rounded-lg border border-transparent p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    k === pos.step && "border-brand-accent/40 bg-brand-accent/10",
                    k > pos.step && "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border font-sans text-xs font-bold",
                      k <= pos.step ? "border-brand bg-brand text-brand-foreground" : "text-muted-foreground",
                    )}
                    aria-hidden
                  >
                    {k + 1}
                  </span>
                  {/* A wide display equation scrolls sideways instead of being cut off on a phone. */}
                  <div className="min-w-0 overflow-x-auto">
                    <BlockText text={t} solution />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
      {!texts && solution && (
        <div className="min-w-0 overflow-x-auto">
          <BlockText text={solution} solution />
        </div>
      )}
    </div>
  );
}
