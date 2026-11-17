"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Lock, Zap } from "lucide-react";
import { useLocalStore, readLocal, writeLocal } from "@/components/play/useLocalStore";
import { confetti, floatText, replay, sfx, vibrate } from "@/components/play/sfx";
import { reportRound } from "@/components/play/report";
import { useViewerSession } from "@/lib/viewer/useViewerSession";
import {
  HUNT_KEY,
  HUNT_MS,
  HUNT_TARGET,
  HUNT_WORLDS,
  elementByZ,
  elementsForWorld,
  huntMultiplier,
  isHuntWorldOpen,
  parseHuntProgress,
  recordHunt,
  serializeHuntProgress,
  startHunt,
  tapElement,
  tickHunt,
  type Element,
  type HuntState,
  type HuntWorld,
} from "@/lib/play/elements";

/**
 * Element Hunt (2026-11-18), the Chemistry game: the periodic table is the
 * board; find what the clue names before the 60 seconds run out. Rules in
 * lib/play/elements. World 1 shows only its 8 columns so the cells are big;
 * the full table scrolls sideways on a phone rather than shrinking below a
 * tappable size.
 */

type End = { score: number; world: HuntWorld; newBest: boolean; best: number; opened: HuntWorld | null; missed: HuntState["missed"] };

/** Column on the board: world 1 packs groups 1, 2 and 13-18 into 8 columns. */
const colOf = (e: Element, w: HuntWorld) => (w === 1 ? (e.g <= 2 ? e.g : e.g - 10) : e.g);

export default function ElementHunt() {
  const raw = useLocalStore(HUNT_KEY);
  const progress = useMemo(() => parseHuntProgress(raw ?? null), [raw]);
  const { session } = useViewerSession();
  const [state, setState] = useState<HuntState | null>(null);
  const [flash, setFlash] = useState<Record<number, "ok" | "no" | "show">>({});
  const [line, setLine] = useState("");
  const [end, setEnd] = useState<End | null>(null);
  const stateRef = useRef<HuntState | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  const finish = useCallback(
    (s: HuntState) => {
      const r = recordHunt(parseHuntProgress(readLocal(HUNT_KEY)), s.world, s.score);
      writeLocal(HUNT_KEY, serializeHuntProgress(r.progress));
      setEnd({ score: s.score, world: s.world, newBest: r.newBest, best: r.progress.best[s.world] ?? 0, opened: r.opened, missed: s.missed });
      sfx.lose();
      if (r.newBest && s.score > 0) setTimeout(() => confetti(stageRef.current, 60), 150);
      reportRound(
        !!session,
        { kind: "play_round", game: "element_hunt", world: s.world, score: s.score, right: s.right, wrong: s.wrong },
        { world: s.world, score: s.score }
      );
    },
    [session]
  );

  const begin = (w: HuntWorld) => {
    const s = startHunt(w, Math.random);
    stateRef.current = s;
    setState(s);
    setEnd(null);
    setFlash({});
    setLine("");
    sfx.tick();
  };

  // The clock, paused while the tab is hidden.
  useEffect(() => {
    if (!state || state.over || end) return;
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      const dt = document.hidden ? 0 : now - last;
      last = now;
      const s = stateRef.current;
      if (!s || s.over) return;
      const n = tickHunt(s, dt);
      stateRef.current = n;
      setState(n);
      if (n.over) {
        clearInterval(id);
        finish(n);
      }
    }, 100);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.world, end, finish]);

  const mark = (zs: number[], kind: "ok" | "no" | "show", ms: number) => {
    setFlash((f) => ({ ...f, ...Object.fromEntries(zs.map((z) => [z, kind])) }));
    setTimeout(() => setFlash((f) => Object.fromEntries(Object.entries(f).filter(([z]) => !zs.includes(Number(z))))), ms);
  };

  const tap = (e: Element) => {
    const s = stateRef.current;
    if (!s || s.over) return;
    const clue = s.clue;
    const r = tapElement(s, e.z, Math.random);
    stateRef.current = r.state;
    setState(r.state);
    replay(promptRef.current, "pa-pop");
    if (r.right) {
      mark([e.z], "ok", 450);
      sfx.hit(huntMultiplier(r.state.combo));
      vibrate(15);
      setLine(`${e.s} · ${e.name} · Z = ${e.z}`);
      const cell = gridRef.current?.querySelector<HTMLElement>(`[data-z="${e.z}"]`);
      const host = stageRef.current;
      if (cell && host) {
        const a = cell.getBoundingClientRect();
        const b = host.getBoundingClientRect();
        floatText(host, `+${r.points}`, "pa-float", a.left - b.left, a.top - b.top - 6);
      }
    } else {
      mark([e.z], "no", 500);
      mark(clue.answers, "show", 1000);
      sfx.miss();
      vibrate([50, 30, 50]);
      replay(gridRef.current, "pa-shake");
      const ans = clue.answers.map((z) => elementByZ(z)!);
      setLine(`That is ${e.name}. ${ans.length === 1 ? `Answer: ${ans[0].name}.` : `Answers glow: ${ans.map((a) => a.s).join(", ")}.`} −3 s`);
    }
    if (r.state.over) finish(r.state);
  };

  if (!state) {
    return (
      <div className="space-y-3">
        <div className="pa-stage px-5 py-5 text-center">
          <p className="pa-display text-3xl font-extrabold text-[var(--pa-lilac)]">Element Hunt</p>
          <p className="mx-auto mt-1 max-w-xs text-sm pa-dim">60 seconds. Find each element the clue names. A wrong tap costs 3 seconds.</p>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            <span className="pa-pill">Names</span>
            <span className="pa-pill">Atomic numbers</span>
            <span className="pa-pill">Group and period</span>
            <span className="pa-pill">Families and facts</span>
          </div>
        </div>
        <ol className="space-y-2.5" aria-label="Worlds">
          {HUNT_WORLDS.map((w) => {
            const open = raw !== undefined && isHuntWorldOpen(progress, w.id);
            const best = progress.best[w.id];
            return (
              <li key={w.id} className={`flex items-center gap-3 rounded-2xl bg-[var(--pa-night-2)] p-3 ${open ? "" : "opacity-60"}`}>
                <span className="pa-display grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--pa-night-3)] text-xl font-extrabold">{w.id}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{w.name}</span>
                  <span className="block text-xs font-semibold text-[var(--pa-mango)]">
                    {best ? `Best ${best}` : open && w.id < 3 ? `${HUNT_TARGET} points opens the next` : ""}
                  </span>
                </span>
                {open ? (
                  <button type="button" className="pa-btn shrink-0 !px-4 !py-1.5 !text-base" onClick={() => begin(w.id)}>
                    Play<span className="sr-only"> {w.name}</span>
                  </button>
                ) : (
                  <span className="flex shrink-0 items-center gap-1 text-xs pa-dim">
                    <Lock className="h-3.5 w-3.5" aria-hidden /> {HUNT_TARGET} in world {w.id - 1}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  const els = elementsForWorld(state.world);
  const cols = state.world === 1 ? 8 : 18;
  const rows = HUNT_WORLDS[state.world - 1].periods;
  const left = Math.ceil(state.leftMs / 1000);

  return (
    <div ref={stageRef} className="pa-stage pb-4">
      <div className="flex items-center justify-between px-4 pb-1 pt-3">
        <span className={`pa-display text-2xl font-extrabold tabular-nums ${left <= 10 ? "text-[var(--pa-coral)]" : ""}`} role="timer" aria-label={`${left} seconds left`}>
          {left}
        </span>
        {state.combo >= 4 && (
          <span key={huntMultiplier(state.combo)} className="pa-pop flex items-center gap-1 rounded-full bg-[var(--pa-sky)] px-2.5 py-0.5 text-sm font-bold text-[#03243a]">
            <Zap className="h-3.5 w-3.5" aria-hidden />x{huntMultiplier(state.combo)} combo
          </span>
        )}
        <span className="pa-display text-3xl font-extrabold tabular-nums text-[var(--pa-mango)]">{state.score}</span>
      </div>
      <div className="mx-4 h-1.5 overflow-hidden rounded-full bg-[var(--pa-night-3)]" aria-hidden>
        <div className="h-full bg-[var(--pa-mango)] transition-[width] duration-100" style={{ width: `${(state.leftMs / HUNT_MS) * 100}%` }} />
      </div>
      <div ref={promptRef} className="mx-3 mt-3 rounded-2xl bg-black/25 p-3 text-center" aria-live="polite">
        <p className="text-xs pa-dim">Find</p>
        <p className="pa-display text-2xl font-extrabold leading-tight">{state.clue.text}</p>
      </div>
      <div className={state.world === 1 ? "px-3 pt-3" : "overflow-x-auto px-3 pt-3"}>
        <div
          ref={gridRef}
          className="grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(${state.world === 1 ? "0" : "1.75rem"}, 1fr))`, gridTemplateRows: `repeat(${rows}, auto)` }}
          role="group"
          aria-label="Periodic table"
        >
          {els.map((e) => {
            const f = flash[e.z];
            const tone = f === "ok" ? "bg-[var(--pa-mint)] text-[var(--pa-mint-ink)]" : f === "no" ? "bg-[var(--pa-coral)] text-[#2a0710]" : f === "show" ? "bg-[var(--pa-mango)] text-[var(--pa-mango-ink)]" : "bg-[var(--pa-night-3)]";
            return (
              <button
                key={e.z}
                type="button"
                data-z={e.z}
                onClick={() => tap(e)}
                style={{ gridColumn: colOf(e, state.world), gridRow: e.p }}
                className={`flex flex-col items-center justify-center rounded-md leading-none touch-manipulation ${state.world === 1 ? "h-14" : "h-11"} ${tone}`}
                aria-label={e.s}
              >
                <span className="text-[0.55rem] opacity-70">{e.z}</span>
                <span className={`font-bold ${state.world === 1 ? "text-lg" : "text-[0.8rem]"}`}>{e.s}</span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="mx-4 mt-2 min-h-[1.25rem] text-center text-sm pa-dim" aria-live="polite">
        {line}
      </p>

      {end && (
        <div className="pa-overlay" role="dialog" aria-label="Time up">
          <p className="pa-display text-4xl font-extrabold text-[var(--pa-mango)]">Time!</p>
          <p className="pa-display text-6xl font-extrabold tabular-nums">{end.score}</p>
          <p className="text-sm">{end.newBest && end.score > 0 ? <b className="text-[var(--pa-mango)]">New best!</b> : `Your best: ${end.best}`}</p>
          {end.opened && <p className="font-semibold text-[var(--pa-mint)]">{HUNT_WORLDS[end.opened - 1].name} is open!</p>}
          {end.missed.length > 0 && (
            <div>
              <p className="text-xs pa-dim">To look at again</p>
              <ul className="mt-1 flex flex-wrap justify-center gap-1.5">
                {end.missed.slice(0, 6).map((m, i) => (
                  <li key={i} className="rounded-lg border border-[var(--pa-coral)]/50 bg-[var(--pa-coral)]/10 px-2 py-0.5 text-sm">
                    {m.clue}: {m.answers.map((z) => elementByZ(z)!.s).slice(0, 4).join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className="pa-btn" onClick={() => begin(end.opened ?? end.world)} autoFocus>
              {end.opened ? "Play the next world" : "Play again"}
            </button>
            <button type="button" className="pa-btn-ghost" onClick={() => setState(null)}>
              Worlds
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
