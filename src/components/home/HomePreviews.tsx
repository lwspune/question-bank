import { Check, CheckCircle2, Circle, Sigma, TriangleAlert } from "lucide-react";
import ScoreCard from "@/app/mock/attempt/[attemptId]/result/ScoreCard";
import FixOverview from "@/app/review/FixOverview";
import TodayCard from "@/app/me/TodayCard";
import WeakSpots from "@/app/me/WeakSpots";
import MapTileCard, { BAND_DOT, BAND_LABEL } from "@/components/performance/MapTile";
import { BAND_ORDER } from "@/lib/performance/masteryMap";
import { FIX_SAMPLE, MAP_SAMPLE, PULSE_SAMPLE, SCORE_SAMPLE } from "@/lib/home/previewSamples";
import { cn } from "@/lib/utils";
import ScreenPreview from "./ScreenPreview";

/**
 * The product's own screens on the homepage, with a made-up student
 * (2026-11-09). The mock result, Review, the map and Home are the REAL
 * components fed lib/home/previewSamples; the question, notes, homework and
 * the teacher's paper are drawn in the same styles, because their real
 * components either count reveals, fetch their own data, or bring KaTeX's
 * stylesheet onto the homepage. Nothing here fetches or saves.
 */

/** How it works, step 1. */
export function MockResultPreview() {
  return (
    <ScreenPreview
      title="Result · JEE Main 2026"
      label="A mock test result: 175 of 300 marks, 67% right, with Physics, Chemistry and Mathematics scored apart"
    >
      <ScoreCard
        {...SCORE_SAMPLE}
        fixHref="/drill"
        mockSlug="sample"
      />
    </ScreenPreview>
  );
}

/** How it works, step 2. */
export function ReviewPreview() {
  return (
    <ScreenPreview
      title="Review"
      label="The Review tab: 23 mistakes waiting, grouped by chapter, each with why it is there and a Fix button"
    >
      <FixOverview list={FIX_SAMPLE} focusExam={null} savedCount={4} />
    </ScreenPreview>
  );
}

/** How it works, step 3. */
export function MapPreview() {
  return (
    <ScreenPreview
      title="Progress · Chapters"
      label="The chapter map for NDA Mathematics: every subtopic a dot, coloured by how the student did, weakest chapters first"
    >
      <div className="space-y-3">
        <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {BAND_ORDER.map((b) => (
            <li key={b} className="flex items-center gap-1.5">
              <span className={cn("inline-block h-2.5 w-2.5 rounded-full", BAND_DOT[b])} aria-hidden />
              {BAND_LABEL[b]}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-3">
          {MAP_SAMPLE.map((t) => (
            <MapTileCard key={t.chapter} tile={t} />
          ))}
        </div>
      </div>
    </ScreenPreview>
  );
}

/** What's inside: the question bank. Drawn: the live card counts reveals. */
export function QuestionPreview() {
  const options = [
    { label: "A", text: "1/4" },
    { label: "B", text: "1/2", right: true },
    { label: "C", text: "1" },
    { label: "D", text: "2" },
  ];
  return (
    <ScreenPreview
      title="PYQs"
      label="A past-year NDA question with the right option marked and its worked solution open"
    >
      <div className="rounded-xl border bg-card p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-brand-accent">NDA 1 2026 · Q31</span>
          <span className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">Moderate</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Mathematics → Trigonometry → Identities</p>
        <p className="mt-2 font-serif text-base">If sin θ + cos θ = √2, what is sin θ cos θ?</p>
        <ul className="mt-3 space-y-2">
          {options.map((o) => (
            <li
              key={o.label}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border px-3 py-2 font-serif text-sm",
                o.right && "border-emerald-500/60 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
              )}
            >
              <span
                className={cn(
                  "grid h-6 w-6 place-items-center rounded-md bg-muted font-sans text-xs font-bold",
                  o.right && "bg-emerald-600 text-white"
                )}
              >
                {o.label}
              </span>
              {o.text}
              {o.right && <CheckCircle2 className="ml-auto h-4 w-4" aria-hidden />}
            </li>
          ))}
        </ul>
        <div className="mt-3 rounded-lg border-l-4 border-brand bg-muted p-3 font-serif text-sm">
          Square both sides: 1 + 2 sin θ cos θ = 2, so sin θ cos θ = 1/2.
        </div>
      </div>
    </ScreenPreview>
  );
}

/** What's inside: teaching notes. Drawn in the notes' own formula and trap styles. */
export function NotesPreview() {
  return (
    <ScreenPreview
      title="Notes · Trigonometry"
      label="A notes page: the ratios of a right triangle with a labelled diagram, the formula, and a common trap"
    >
      <div className="space-y-3">
        <p className="text-lg font-semibold tracking-tight">Ratios of a right triangle</p>
        <svg viewBox="0 0 220 110" className="h-24 w-full" aria-hidden>
          <path d="M20 95 H190 V18 Z" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-accent" />
          <path d="M178 95 V83 H190" fill="none" stroke="currentColor" className="text-muted-foreground" />
          <text x="92" y="108" fontSize="12" fill="currentColor" className="text-muted-foreground">adjacent</text>
          <text x="196" y="62" fontSize="12" fill="currentColor" className="text-muted-foreground">opp</text>
          <text x="70" y="48" fontSize="12" fill="currentColor" className="text-muted-foreground">hypotenuse</text>
          <text x="36" y="90" fontSize="14" fill="currentColor">θ</text>
        </svg>
        <div className="rounded-lg border-l-4 border-brand bg-brand/5 p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-accent">
            <Sigma className="h-3.5 w-3.5" aria-hidden /> Sine
          </p>
          <p className="mt-2 text-center font-serif text-lg">sin θ = opposite ÷ hypotenuse</p>
        </div>
        <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-950/30">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-800 dark:text-amber-300">
            <TriangleAlert className="h-4 w-4" aria-hidden /> sin²θ is not sin(θ²)
          </p>
          <p className="mt-1 font-serif text-sm text-muted-foreground">sin²θ means (sin θ)², the sine squared.</p>
        </div>
      </div>
    </ScreenPreview>
  );
}

/** What's inside: daily homework. Drawn: the day's progress is read live. */
export function HomeworkPreview() {
  const items = [
    { t: "Heights and distances", done: true },
    { t: "Compound angles", done: true },
    { t: "Identities", done: true },
    { t: "Trigonometric equations", done: false },
    { t: "Inverse functions", done: false },
  ];
  return (
    <ScreenPreview title="Homework" label="A homework day for NDA Mathematics: 3 of 5 questions marked, two still to do">
      <div className="space-y-3">
        <div>
          <p className="text-lg font-semibold tracking-tight">NDA Mathematics · Day 12</p>
          <p className="text-sm text-muted-foreground">3 of 5 marked</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <span className="block h-full w-3/5 rounded-full bg-emerald-500" />
          </div>
        </div>
        <ul className="space-y-2">
          {items.map((i, n) => (
            <li key={i.t} className="flex items-center gap-2.5 rounded-lg border bg-card px-3 py-2 text-sm">
              {i.done ? (
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground" aria-hidden />
              )}
              <span className="font-medium">Q{n + 1}</span>
              <span className="truncate text-muted-foreground">{i.t}</span>
            </li>
          ))}
        </ul>
        <span className="block rounded-lg bg-brand py-2 text-center text-sm font-semibold text-brand-foreground">Continue Day 12</span>
      </div>
    </ScreenPreview>
  );
}

/** What's inside: a student's own Home, from the real cards. */
export function YourHomePreview() {
  return (
    <ScreenPreview
      title="Home"
      label="A student's Home: today's next step is to fix the mistakes waiting, then the three weakest chapters"
    >
      <div className="space-y-3">
        <TodayCard mockHref="/mock" pulse={PULSE_SAMPLE} readOnly />
        <WeakSpots pulse={PULSE_SAMPLE} />
      </div>
    </ScreenPreview>
  );
}

/** For teachers: the two printed files, drawn as paper. */
export function TeacherPaperPreview() {
  const qs = [
    { q: "If sin θ + cos θ = √2, then sin θ cos θ equals", o: ["1/4", "1/2", "1", "2"] },
    { q: "The value of tan 15° is", o: ["2 − √3", "2 + √3", "√3 − 1", "1/√3"] },
    { q: "If cos A = 3/5, then sin 2A equals", o: ["12/25", "24/25", "7/25", "4/5"] },
    { q: "The period of sin 2x is", o: ["π/2", "π", "2π", "4π"] },
  ];
  const key = ["b", "a", "b", "b", "c", "a", "d", "b", "c", "a"];
  const paper =
    "absolute aspect-[210/297] w-[54%] overflow-hidden rounded-sm border border-slate-300 bg-white p-3 text-[7.5px] leading-snug text-slate-900 shadow-xl";
  return (
    <div
      role="img"
      aria-label="A printed question paper on Trigonometry and its separate answer key, the two files a teacher downloads"
      className="relative mx-auto h-[17.5rem] w-full max-w-[340px]"
    >
      <div className={cn(paper, "left-0 top-3 -rotate-3")} aria-hidden>
        <p className="text-center text-[9px] font-bold">Question Paper</p>
        <p className="mb-1.5 border-b border-slate-400 pb-1 text-center text-[6.5px] text-slate-600">
          NDA Mathematics · Trigonometry · 25 questions · 60 minutes
        </p>
        <ol className="list-decimal space-y-1.5 pl-3 font-serif">
          {qs.map((x) => (
            <li key={x.q}>
              {x.q}
              <span className="grid grid-cols-2 text-slate-700">
                {x.o.map((o, i) => (
                  <span key={o}>({"abcd"[i]}) {o}</span>
                ))}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className={cn(paper, "right-0 top-0 rotate-3")} aria-hidden>
        <p className="text-center text-[9px] font-bold">Answer Key</p>
        <p className="mb-1.5 border-b border-slate-400 pb-1 text-center text-[6.5px] text-slate-600">
          NDA Mathematics · Trigonometry · 25 questions
        </p>
        <div className="grid grid-cols-5 gap-1">
          {key.map((k, i) => (
            <span key={i} className="rounded-[2px] border border-slate-200 text-center">
              {i + 1} {k}
            </span>
          ))}
        </div>
        <p className="mt-2 font-serif">
          <b>1.</b> Square both sides: 1 + 2 sin θ cos θ = 2, so sin θ cos θ = 1/2.
        </p>
        <p className="mt-1 font-serif">
          <b>2.</b> tan 15° = tan(45° − 30°) = 2 − √3.
        </p>
      </div>
    </div>
  );
}
