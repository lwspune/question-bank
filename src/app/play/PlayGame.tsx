"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Check, Delete, Lock, Sparkles, Timer, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEVELS, ROUND_MS, levelById, type Level, type LevelId } from "@/lib/play/levels";
import { nextProblem, type Problem } from "@/lib/play/generate";
import {
  answer,
  feedbackLine,
  finishRun,
  ghostCountAt,
  multiplierFor,
  shouldSubmit,
  startRun,
  type RunResult,
  type RunState,
} from "@/lib/play/run";
import {
  PROGRESS_KEY,
  emptyProgress,
  isUnlocked,
  parseProgress,
  recordResult,
  serializeProgress,
  type Progress,
} from "@/lib/play/progress";
import { trackFunnel } from "@/lib/analytics/trackFunnel";
import { sendActivity } from "@/lib/activity/clientBeacon";
import { useViewerSession } from "@/lib/viewer/useViewerSession";

/** How long a wrong answer's correction stays up before the next sum. */
const WRONG_FLASH_MS = 700;
const MAX_TYPED = 6;

type Done = { result: RunResult; newBest: boolean; unlocked: LevelId | null; mistakes: RunState["mistakes"] };

/*
 * Saved progress is an external store (the browser's localStorage), read with
 * useSyncExternalStore: the server snapshot is `undefined`, so the cached HTML
 * is the same for everyone and the level list appears once the browser has read it.
 */
const listeners = new Set<() => void>();

function subscribeProgress(cb: () => void): () => void {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(PROGRESS_KEY);
  } catch {
    return null;
  }
}

function loadProgress(): Progress {
  return parseProgress(readRaw());
}

function saveProgress(p: Progress): void {
  try {
    window.localStorage.setItem(PROGRESS_KEY, serializeProgress(p));
  } catch {
    /* private window or blocked storage: the round still counts on screen */
  }
  for (const cb of listeners) cb();
}

export default function PlayGame({ intro }: { intro: ReactNode }) {
  const { session } = useViewerSession();
  const raw = useSyncExternalStore(subscribeProgress, readRaw, () => undefined);
  const loaded = raw !== undefined;
  const progress = useMemo(() => (raw === undefined ? emptyProgress() : parseProgress(raw)), [raw]);
  const [view, setView] = useState<"menu" | "playing" | "done">("menu");
  const [level, setLevel] = useState<Level>(LEVELS[0]);
  const [run, setRun] = useState<RunState>(() => startRun(1));
  const [problem, setProblem] = useState<Problem>({ prompt: "", answer: 0 });
  const [typed, setTyped] = useState("");
  const [flash, setFlash] = useState<{ prompt: string; answer: number } | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [ghost, setGhost] = useState<number[]>([]);
  const [done, setDone] = useState<Done | null>(null);

  const runRef = useRef(run);
  const startRef = useRef(0);
  const finishedRef = useRef(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateRun = (next: RunState) => {
    runRef.current = next;
    setRun(next);
  };

  const begin = useCallback((l: Level) => {
    const fresh = startRun(l.id);
    runRef.current = fresh;
    setRun(fresh);
    setLevel(l);
    setGhost(loadProgress().best[l.id]?.times ?? []);
    setProblem(nextProblem(l.id, Math.random));
    setTyped("");
    setFlash(null);
    setElapsed(0);
    setDone(null);
    finishedRef.current = false;
    startRef.current = performance.now();
    setView("playing");
    // Started from lower in the list, the round would open scrolled with its top under the header.
    window.scrollTo({ top: 0 });
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    if (flashTimer.current) clearTimeout(flashTimer.current);
    const state = runRef.current;
    const result = finishRun(state);
    const before = loadProgress();
    const rec = recordResult(before, result);
    saveProgress(rec.progress);
    setDone({ result, newBest: rec.newBest, unlocked: rec.unlocked, mistakes: state.mistakes });
    setView("done");
    window.scrollTo({ top: 0 });

    trackFunnel("play_round_end", { level: result.level, cleared: result.cleared, signedIn: !!session });
    if (session) {
      sendActivity({
        kind: "play_round",
        level: result.level,
        correct: result.correct,
        wrong: result.wrong,
        points: result.points,
        cleared: result.cleared,
      });
    }
  }, [session]);

  const quit = useCallback(() => {
    finishedRef.current = true;
    if (flashTimer.current) clearTimeout(flashTimer.current);
    setView("menu");
  }, []);

  // The clock: the round ends at 60 seconds, measured from its start, not by counting ticks.
  useEffect(() => {
    if (view !== "playing") return;
    const id = setInterval(() => {
      const t = performance.now() - startRef.current;
      setElapsed(Math.min(t, ROUND_MS));
      if (t >= ROUND_MS) finish();
    }, 100);
    return () => clearInterval(id);
  }, [view, finish]);

  useEffect(() => () => {
    if (flashTimer.current) clearTimeout(flashTimer.current);
  }, []);

  const press = useCallback(
    (key: string) => {
      if (view !== "playing" || flash || finishedRef.current) return;
      if (key === "back") return setTyped((t) => t.slice(0, -1));
      if (key === "clear") return setTyped("");
      if (!/^\d$/.test(key)) return;
      const next = (typed + key).slice(0, MAX_TYPED);
      if (!shouldSubmit(next, problem.answer)) return setTyped(next);

      const at = performance.now() - startRef.current;
      const given = Number(next);
      updateRun(answer(runRef.current, problem, given, at));
      setTyped("");
      if (given === problem.answer) {
        setProblem(nextProblem(level.id, Math.random, problem));
        return;
      }
      setFlash({ prompt: problem.prompt, answer: problem.answer });
      flashTimer.current = setTimeout(() => {
        setFlash(null);
        setProblem((p) => nextProblem(level.id, Math.random, p));
      }, WRONG_FLASH_MS);
    },
    [view, flash, typed, problem, level.id]
  );

  // A laptop keyboard works too: digits, Backspace, Escape to stop.
  useEffect(() => {
    if (view !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^\d$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") press("back");
      else if (e.key === "Escape") quit();
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, press, quit]);

  if (view === "playing") {
    return (
      <PlayingView
        level={level}
        run={run}
        problem={problem}
        typed={typed}
        flash={flash}
        elapsed={elapsed}
        ghost={ghost}
        onKey={press}
        onQuit={quit}
      />
    );
  }

  if (view === "done" && done) {
    const next = done.unlocked ? levelById(done.unlocked) : undefined;
    return <DoneView level={level} done={done} next={next} onAgain={() => begin(level)} onMenu={() => setView("menu")} onNext={next ? () => begin(next) : undefined} />;
  }

  return (
    <div className="space-y-5">
      {intro}
      {loaded ? (
        <ol className="space-y-3" aria-label="Levels">
          {LEVELS.map((l) => (
            <LevelCard key={l.id} level={l} progress={progress} onPlay={() => begin(l)} />
          ))}
        </ol>
      ) : (
        <div className="h-96" aria-busy="true" />
      )}
    </div>
  );
}

function LevelCard({ level, progress, onPlay }: { level: Level; progress: Progress; onPlay: () => void }) {
  const open = isUnlocked(progress, level.id);
  const cleared = progress.cleared.includes(level.id);
  const best = progress.best[level.id];
  return (
    <li className={`rounded-xl border bg-card p-4 ${open ? "" : "opacity-70"}`}>
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
            cleared ? "bg-brand text-brand-foreground" : "bg-muted text-foreground"
          }`}
          aria-hidden
        >
          {cleared ? <Check className="h-4 w-4" /> : level.id}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-tight">
            <span className="sr-only">Level {level.id}: </span>
            {level.name}
          </p>
          {/* Non-breaking spaces round the signs, so "14 + 7" never leaves the 7 alone on a line. */}
          <p className="text-sm text-muted-foreground">{level.blurb.replace(/ ([+−×÷]) /g, " $1 ")}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {cleared ? "Cleared" : `Clear it: ${level.target} right at 80%`}
            {best ? ` · Your best: ${best.correct} right` : ""}
          </p>
        </div>
        {open ? (
          <Button size="sm" className="shrink-0 rounded-full" onClick={onPlay}>
            {best ? "Play again" : "Play"}
            <span className="sr-only"> level {level.id}</span>
          </Button>
        ) : (
          <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Clear level {level.id - 1} first
          </span>
        )}
      </div>
    </li>
  );
}

function PlayingView({
  level,
  run,
  problem,
  typed,
  flash,
  elapsed,
  ghost,
  onKey,
  onQuit,
}: {
  level: Level;
  run: RunState;
  problem: Problem;
  typed: string;
  flash: { prompt: string; answer: number } | null;
  elapsed: number;
  ghost: number[];
  onKey: (key: string) => void;
  onQuit: () => void;
}) {
  const secondsLeft = Math.ceil((ROUND_MS - elapsed) / 1000);
  const ghostNow = ghostCountAt(ghost, elapsed);
  const scale = Math.max(level.target, ghost.length, run.correct, 1);
  const combo = run.streak >= 5 ? multiplierFor(run.streak + 1) : 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">
          Level {level.id}: {level.name}
        </span>
        <button
          type="button"
          onClick={onQuit}
          className="rounded-md px-2 py-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Stop
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 font-semibold tabular-nums" role="timer" aria-label={`${secondsLeft} seconds left`}>
            <Timer className="h-4 w-4" aria-hidden />
            {secondsLeft}s
          </span>
          {combo > 1 && (
            <span className="flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-brand-foreground">
              <Zap className="h-3.5 w-3.5" aria-hidden />
              Combo ×{combo}
            </span>
          )}
          <span className="font-semibold tabular-nums">{run.points} pts</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
          <div className="h-full bg-brand transition-[width] duration-100" style={{ width: `${(1 - elapsed / ROUND_MS) * 100}%` }} />
        </div>
      </div>

      <div className="space-y-1.5" aria-hidden>
        <RaceBar label="You" count={run.correct} scale={scale} strong />
        {ghost.length > 0 && <RaceBar label="Best" count={ghostNow} scale={scale} />}
        <p className="text-right text-xs text-muted-foreground">Goal: {level.target} right</p>
      </div>

      <div
        className={`rounded-2xl border p-6 text-center ${flash ? "border-destructive bg-destructive/10" : "bg-card"}`}
        aria-live="polite"
      >
        {flash ? (
          <p className="text-3xl font-bold tabular-nums">
            {flash.prompt} = <span className="text-destructive">{flash.answer}</span>
          </p>
        ) : (
          <p className="text-3xl font-bold tabular-nums">
            {problem.prompt} = <span className="inline-block min-w-[3ch] border-b-2 border-foreground/40 text-brand-accent">{typed || " "}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2" role="group" aria-label="Number pad">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
          <KeyButton key={d} onPress={() => onKey(d)} label={d} />
        ))}
        <KeyButton onPress={() => onKey("clear")} label="Clear" small />
        <KeyButton onPress={() => onKey("0")} label="0" />
        <KeyButton onPress={() => onKey("back")} label={<Delete className="mx-auto h-5 w-5" aria-hidden />} ariaLabel="Delete last digit" />
      </div>
      <p className="text-center text-xs text-muted-foreground">It checks itself as you type. No Enter needed.</p>
    </div>
  );
}

function KeyButton({
  label,
  onPress,
  ariaLabel,
  small,
}: {
  label: ReactNode;
  onPress: () => void;
  ariaLabel?: string;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      // pointerdown, not click: a fast tapper's next tap must not wait for the click delay.
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      // Enter or Space on a focused key, and a screen reader's tap, arrive as a
      // click with no pointer (detail 0); a finger already fired pointerdown.
      onClick={(e) => {
        if (e.detail === 0) onPress();
      }}
      aria-label={ariaLabel}
      className={`h-14 touch-manipulation select-none rounded-xl border bg-card font-semibold tabular-nums active:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        small ? "text-sm" : "text-xl"
      }`}
    >
      {label}
    </button>
  );
}

function RaceBar({ label, count, scale, strong }: { label: string; count: number; scale: number; strong?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-9 shrink-0 text-muted-foreground">{label}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-[width] duration-200 ${strong ? "bg-brand" : "bg-foreground/30"}`}
          style={{ width: `${Math.min(100, (count / scale) * 100)}%` }}
        />
      </div>
      <span className="w-6 shrink-0 text-right font-semibold tabular-nums">{count}</span>
    </div>
  );
}

function DoneView({
  level,
  done,
  next,
  onAgain,
  onMenu,
  onNext,
}: {
  level: Level;
  done: Done;
  next: Level | undefined;
  onAgain: () => void;
  onMenu: () => void;
  onNext?: () => void;
}) {
  const { result } = done;
  const pct = Math.round(result.accuracy * 100);
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Level {level.id}: {level.name}
        </p>
        <p className="mt-2 text-4xl font-bold tabular-nums">{result.correct} right</p>
        <p className="mt-1 text-sm text-muted-foreground tabular-nums">
          {pct}% right · {result.points} pts · best combo {result.bestStreak}
        </p>
        {done.newBest && (
          <p className="mt-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm font-medium text-brand-accent">
            <Sparkles className="h-4 w-4" aria-hidden />
            Your best round on this level
          </p>
        )}
        <p className="mt-3 font-medium" role="status">
          {feedbackLine(result)}
        </p>
        {next && <p className="mt-1 text-sm font-semibold text-brand-accent">Level {next.id} is open: {next.name}.</p>}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {onNext && next ? (
          <Button className="rounded-full" onClick={onNext}>
            Play level {next.id}
          </Button>
        ) : null}
        <Button variant={onNext ? "outline" : "default"} className="rounded-full" onClick={onAgain}>
          Play again
        </Button>
        <Button variant="outline" className="rounded-full" onClick={onMenu}>
          All levels
        </Button>
      </div>

      {done.mistakes.length > 0 && (
        <div className="rounded-xl border bg-card p-4">
          <h2 className="text-sm font-semibold">Go over these</h2>
          <ul className="mt-2 space-y-1 text-sm tabular-nums">
            {done.mistakes.slice(0, 10).map((m, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span>
                  {m.prompt} = <span className="font-semibold">{m.answer}</span>
                </span>
                <span className="text-muted-foreground">you typed {m.given}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
