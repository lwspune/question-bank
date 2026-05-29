"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Presentation,
  Target,
  X,
} from "lucide-react";
import WorkedExampleCard from "@/app/guide/_components/WorkedExampleCard";
import KatexRenderer from "@/components/math/KatexRenderer";
import RichText from "@/components/math/RichText";
import { buildBrowseUrl } from "@/lib/guide/buildBrowseUrl";
import type { WorkedExample } from "@/lib/guide/loadWorkedExamples";
import type { Slide } from "@/app/notes/_types";
import FormulaBlock from "./FormulaBlock";
import WorkedExampleAuthored from "./WorkedExampleAuthored";
import TrapCallout from "./TrapCallout";

type Props = {
  slides: Slide[];
  /** Map of bank UUID → resolved WorkedExample row. Slides reference by id. */
  pyqExamples: Map<string, WorkedExample>;
  drillHref: string;
  drillCount: number;
};

/**
 * Client island: "Present" button + full-screen slide-deck overlay.
 * Keyboard: ←/→/Space nav · Shift+Space back · ESC close · F fullscreen.
 */
export default function NotePresenter({
  slides,
  pyqExamples,
  drillHref,
  drillCount,
}: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [isFull, setIsFull] = useState(false);

  const total = slides.length;

  const next = useCallback(() => {
    setIndex((i) => Math.min(i + 1, total - 1));
  }, [total]);
  const prev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    setIndex(0);
    if (typeof document !== "undefined" && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);
  const toggleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      } else if (
        e.key === "ArrowRight" ||
        (e.key === " " && !e.shiftKey) ||
        e.key === "PageDown"
      ) {
        e.preventDefault();
        next();
      } else if (
        e.key === "ArrowLeft" ||
        (e.key === " " && e.shiftKey) ||
        e.key === "Backspace" ||
        e.key === "PageUp"
      ) {
        e.preventDefault();
        prev();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev, close, toggleFullscreen]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const onChange = () => setIsFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  if (!open) {
    return (
      <div className="flex flex-col items-end gap-1.5">
        <button
          type="button"
          onClick={() => setOpen(true)}
          title="Open full-screen slide deck — keyboard: ←/→ navigate · Space next · F fullscreen · Esc exit"
          aria-label="Open Present mode (keyboard navigation: arrow keys, F for fullscreen, Esc to exit)"
          className="inline-flex items-center gap-2 rounded-md border-2 border-primary/50 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-all hover:border-primary/70 hover:bg-primary/15 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Presentation className="h-4 w-4" aria-hidden />
          <span>Present mode</span>
        </button>
        <div
          className="hidden items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground sm:flex"
          aria-hidden
        >
          <KbdKey>←</KbdKey>
          <KbdKey>→</KbdKey>
          <span className="opacity-60">·</span>
          <KbdKey>F</KbdKey>
          <span className="opacity-60">·</span>
          <KbdKey>Esc</KbdKey>
        </div>
      </div>
    );
  }

  const slide = slides[index];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-background"
      role="dialog"
      aria-modal="true"
      aria-label="Note presentation"
    >
      <header className="flex items-center justify-between border-b bg-muted/40 px-4 py-2 text-sm">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-primary">
            <Presentation className="mr-1 inline h-4 w-4" aria-hidden />
            Presenting
          </span>
          <span className="tabular-nums text-muted-foreground">
            Slide {index + 1} / {total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label={isFull ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFull ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={close}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Close presentation (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto flex min-h-full max-w-5xl items-start justify-center px-6 py-12">
          <div className="w-full">
            <SlideContent
              slide={slide}
              pyqExamples={pyqExamples}
              drillHref={drillHref}
              drillCount={drillCount}
            />
          </div>
        </div>
      </div>

      <footer className="flex items-center justify-between gap-4 border-t bg-muted/40 px-4 py-3">
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40 hover:bg-accent"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Prev
        </button>
        <span className="hidden text-xs text-muted-foreground sm:block">
          ← / → or Space to navigate · F fullscreen · Esc to exit
        </span>
        <button
          type="button"
          onClick={next}
          disabled={index === total - 1}
          className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40 hover:bg-accent"
          aria-label="Next slide"
        >
          Next
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </footer>
    </div>
  );
}

function KbdKey({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-4 min-w-[1rem] items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[9px] font-semibold leading-none">
      {children}
    </kbd>
  );
}

function ConceptBadge({ name }: { name: string }) {
  return (
    <p className="mb-6 text-base font-semibold uppercase tracking-wider text-primary sm:text-lg">
      {name}
    </p>
  );
}

function SlideContent({
  slide,
  pyqExamples,
  drillHref,
  drillCount,
}: {
  slide: Slide;
  pyqExamples: Map<string, WorkedExample>;
  drillHref: string;
  drillCount: number;
}) {
  if (slide.kind === "title") {
    return (
      <div className="text-center">
        <p className="mb-4 text-base font-semibold uppercase tracking-wider text-primary sm:text-lg">
          NDA Mathematics · Statistics
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          {slide.title}
        </h1>
        <p className="mx-auto mt-8 max-w-3xl font-serif text-2xl leading-snug text-muted-foreground sm:text-3xl md:text-4xl">
          {slide.definition}
        </p>
      </div>
    );
  }

  if (slide.kind === "why") {
    return (
      <div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Why this matters
        </h2>
        <p className="mt-8 font-serif text-2xl leading-snug text-muted-foreground sm:text-3xl md:text-4xl">
          {slide.whyItMatters}
        </p>
      </div>
    );
  }

  if (slide.kind === "concept-intro") {
    return (
      <div>
        <ConceptBadge name={slide.conceptName} />
        <div className="space-y-6">
          <div>
            <p className="text-base font-semibold uppercase tracking-wide text-muted-foreground sm:text-lg">
              Intuition
            </p>
            <div className="mt-3 font-serif text-2xl leading-snug text-foreground sm:text-3xl md:text-4xl">
              <KatexRenderer text={slide.intuition} />
            </div>
          </div>
          <div>
            <p className="text-base font-semibold uppercase tracking-wide text-muted-foreground sm:text-lg">
              Definition
            </p>
            <RichText
              text={slide.definition}
              className="mt-3 font-serif text-2xl leading-snug text-foreground sm:text-3xl md:text-4xl"
            />
          </div>
          {slide.formula && (
            <FormulaBlock formula={slide.formula} presentMode />
          )}
        </div>
      </div>
    );
  }

  if (slide.kind === "authored-example") {
    return (
      <div>
        <ConceptBadge name={slide.conceptName} />
        <WorkedExampleAuthored example={slide.example} presentMode />
      </div>
    );
  }

  if (slide.kind === "pyq-example") {
    const ex = pyqExamples.get(slide.exampleId);
    if (!ex) {
      return (
        <div>
          <ConceptBadge name={slide.conceptName} />
          <p className="text-center font-serif text-2xl text-muted-foreground">
            Past-year question not available (may be PRIVATE or deleted).
          </p>
        </div>
      );
    }
    return (
      <div>
        <ConceptBadge name={slide.conceptName} />
        <p className="mb-4 text-base font-semibold uppercase tracking-wide text-muted-foreground sm:text-lg">
          From the bank · past-year question
        </p>
        <WorkedExampleCard rank={1} example={ex} presentMode />
      </div>
    );
  }

  if (slide.kind === "trap") {
    return (
      <div>
        <ConceptBadge name={slide.conceptName} />
        <TrapCallout title={slide.trap.title} body={slide.trap.body} presentMode />
      </div>
    );
  }

  if (slide.kind === "concept-drill") {
    return (
      <div>
        <ConceptBadge name={slide.conceptName} />
        <div className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-10 text-center">
          <p className="flex items-center justify-center gap-2 text-base font-semibold uppercase tracking-wide text-primary sm:text-lg">
            <Target className="h-5 w-5" aria-hidden />
            Drill this concept
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            {slide.questionIds.length} questions from the bank
          </h2>
          <p className="mt-4 font-serif text-xl text-muted-foreground sm:text-2xl">
            Surgical practice on {slide.conceptName.toLowerCase()} only — no
            unrelated questions mixed in.
          </p>
          <a
            href={buildBrowseUrl({ extraIds: slide.questionIds })}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-xl font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 sm:text-2xl"
          >
            Open in Browse
            <ArrowRight className="h-6 w-6" aria-hidden />
          </a>
        </div>
      </div>
    );
  }

  // drill
  return (
    <div className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
        Drill the {drillCount} questions
      </h2>
      <p className="mt-6 font-serif text-xl text-muted-foreground sm:text-2xl">
        Every past-year question on this subtopic — paginated, filterable, and
        cart-ready for Word export.
      </p>
      <a
        href={drillHref}
        className="mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-xl font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 sm:text-2xl"
      >
        Open in Browse
        <ArrowRight className="h-6 w-6" aria-hidden />
      </a>
    </div>
  );
}
