"use client";

import { type ReactNode, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Position, backward, fillWith, forward, offersStart, startAt } from "@/lib/learn/lesson/navigation";
import type { RenderedSlide } from "@/lib/learn/lesson/renderDeck";
import { RenderedInlineNodes } from "./RenderedRichText";
import { SlideBody } from "./SlideBody";

// Copied from Concept Ladder (src/lessons/LessonStage.tsx, afca8bf), in PYQ Vault's colours,
// buttons and icons. Its language attribute is dropped: no Class 12 lesson is translated yet.

const SWIPE_MIN_PX = 60;

const subscribeFullscreen = (cb: () => void) => {
  document.addEventListener("fullscreenchange", cb);
  return () => document.removeEventListener("fullscreenchange", cb);
};

/**
 * Slides on a stage: swipe, arrow keys or Previous/Next. A points slide reveals one point per
 * step before moving on (navigation.ts). The first slide's button reads Start and fills the
 * screen: the browser's full screen where it works, otherwise (iPhone) the stage covers the page.
 *
 * - `banner`: above the header (the refresher bar).
 * - `questions`: rendered under the slide and kept mounted; given whether the questions slide is
 *   showing, and a way back to the first slide.
 * - `onBegin`: called once, on the learner's first move (Start, Next, a swipe, an arrow key).
 */
export function LessonStage({
  slides,
  label,
  startIndex = 0,
  banner,
  questions,
  onBegin,
}: {
  slides: RenderedSlide[];
  label: string;
  startIndex?: number;
  banner?: ReactNode;
  questions?: (api: { active: boolean; reread: () => void }) => ReactNode;
  onBegin?: () => void;
}) {
  const [pos, setPos] = useState<Position>(() => startAt(slides, startIndex));
  // Set on the first move or full screen, so Start never comes back (even after leaving full screen).
  const [begun, setBegun] = useState(false);
  // Covering the page, where the browser has no full screen (iPhone).
  const [covering, setCovering] = useState(false);
  const slide = slides[pos.index];

  const stageRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);

  const isFullscreen = useSyncExternalStore(
    subscribeFullscreen,
    () => document.fullscreenElement !== null,
    () => false,
  );

  const next = forward(slides, pos);
  const prev = backward(slides, pos);
  const canGoOn = next.index !== pos.index || next.shown !== pos.shown;
  const canGoBack = prev.index !== pos.index || prev.shown !== pos.shown;
  const isFilled = isFullscreen || covering;
  const showStart = offersStart(pos, { isFilled, begun });

  function go(to: (p: Position) => Position) {
    setBegun(true);
    setPos(to);
  }

  // A signed-in student's progress arrives after the (cached) page: one who has answered before
  // starts at the questions, unless they have already begun moving through the slides.
  const begunRef = useRef(false);
  begunRef.current = begun;
  useEffect(() => {
    if (!begunRef.current) setPos(startAt(slides, startIndex));
  }, [slides, startIndex]);

  const onBeginRef = useRef(onBegin);
  onBeginRef.current = onBegin;
  useEffect(() => {
    if (begun) onBeginRef.current?.();
  }, [begun]);

  // Move focus to a new slide's heading so screen readers announce it (a new point announces itself).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [pos.index]);

  // A new point can land below the fold (on phones the figure sits under the points): scroll so the
  // newest point shows, with the figure under it when both fit.
  useEffect(() => {
    const scroller = scrollRef.current;
    const point = scroller?.querySelector<HTMLElement>("ul[aria-live] > li:last-child");
    if (!scroller || !point || pos.shown < 2) return;
    const top = (el: HTMLElement) => el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
    const pointTop = top(point);
    let bottom = pointTop + point.offsetHeight;
    const figure = scroller.querySelector<HTMLElement>("[data-slide-figure]");
    if (figure && top(figure) > pointTop) {
      const figureBottom = top(figure) + figure.offsetHeight;
      if (figureBottom - pointTop <= scroller.clientHeight - 32) bottom = figureBottom;
    }
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (bottom + 16 > scroller.scrollTop + scroller.clientHeight) scroller.scrollTo({ top: bottom + 16 - scroller.clientHeight, behavior });
    else if (pointTop - 16 < scroller.scrollTop) scroller.scrollTo({ top: pointTop - 16, behavior });
  }, [pos.index, pos.shown]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof Element && e.target.closest("input, textarea, select")) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        setBegun(true);
        setPos((p) => forward(slides, p));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setBegun(true);
        setPos((p) => backward(slides, p));
      } else if (e.key === "Escape") {
        setCovering(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides]);

  // The page behind a covering stage must not scroll under the learner's swipes.
  useEffect(() => {
    if (!covering) return;
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = before;
    };
  }, [covering]);

  function toggleFill() {
    setBegun(true);
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (covering) setCovering(false);
    // A refusal (the browser or the learner) just leaves the slides where they are.
    else if (fillWith(document.fullscreenEnabled) === "fullscreen") stageRef.current?.requestFullscreen().catch(() => {});
    else setCovering(true);
  }

  const nextLabel = showStart ? "Start" : next.index !== pos.index && slides[next.index].kind === "questions" ? "Try a question" : "Next";

  return (
    <section
      ref={stageRef}
      aria-roledescription="carousel"
      aria-label={label}
      className={
        covering
          ? "fixed inset-0 z-[60] flex h-[100dvh] w-full flex-col overflow-hidden bg-card"
          : "flex h-[calc(100dvh-13rem)] min-h-[26rem] flex-col overflow-hidden rounded-2xl border bg-card md:h-[min(calc(100dvh-14rem),48rem)]"
      }
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") swipeStart.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        const start = swipeStart.current;
        swipeStart.current = null;
        if (!start) return;
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        if (Math.abs(dx) > SWIPE_MIN_PX && Math.abs(dx) > 1.5 * Math.abs(dy)) go((p) => (dx < 0 ? forward(slides, p) : backward(slides, p)));
      }}
    >
      {banner}
      <header className={`flex items-center gap-4 border-b px-5 py-3 ${covering ? "pt-[max(0.75rem,env(safe-area-inset-top))]" : ""}`}>
        <p className="text-sm font-medium tabular-nums text-muted-foreground">
          {pos.index + 1} / {slides.length}
        </p>
        {/* One segment per slide; the questions slide is the last. */}
        <div className="flex flex-1 gap-1" aria-hidden="true">
          {slides.map((s, i) => (
            <span
              key={s.id}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 motion-reduce:transition-none ${i <= pos.index ? "bg-brand" : "bg-muted"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={toggleFill}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={isFilled ? "Exit full screen" : "Full screen"}
        >
          {isFilled ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          <span className="hidden sm:inline">{isFilled ? "Exit full screen" : "Full screen"}</span>
        </button>
      </header>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-7 md:px-14 md:py-12">
        <div
          key={slide.id}
          aria-roledescription="slide"
          aria-label={`${pos.index + 1} of ${slides.length}: ${slide.title}`}
          className="mx-auto max-w-3xl font-serif leading-relaxed motion-safe:animate-learn-slide-in md:text-xl"
        >
          <h2 ref={headingRef} tabIndex={-1} className="font-sans text-2xl font-semibold tracking-tight outline-none md:text-3xl">
            <RenderedInlineNodes nodes={slide.heading} />
          </h2>
          <div className="mt-5">
            <SlideBody slide={slide} shown={pos.shown} />
          </div>
        </div>
        {questions?.({ active: slide.kind === "questions", reread: () => go(() => startAt(slides, 0)) })}
      </div>

      <footer
        className={`flex items-center justify-between gap-3 border-t bg-muted/40 px-5 py-3 ${covering ? "pb-[max(0.75rem,env(safe-area-inset-bottom))]" : ""}`}
      >
        <Button type="button" variant="outline" onClick={() => go(() => prev)} disabled={!canGoBack}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Previous
        </Button>
        {canGoOn && (
          <Button type="button" variant="brand" onClick={showStart ? toggleFill : () => go(() => next)}>
            {nextLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </footer>
    </section>
  );
}
