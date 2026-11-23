"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Delete, Heart, Lock, Star, Zap } from "lucide-react";
import { LEVELS, type LevelId } from "@/lib/play/levels";
import {
  RAIN_KEY,
  WORLD_TARGET,
  isWorldOpen,
  nextStarAt,
  rainStars,
  parseRainProgress,
  rainMultiplier,
  recordRainScore,
  serializeRainProgress,
  startRain,
  tick,
  typeAnswer,
  type RainEvent,
  type RainState,
} from "@/lib/play/rain";
import { useLocalStore, readLocal, writeLocal } from "@/components/play/useLocalStore";
import { confetti, floatText, replay, sfx, sparks, vibrate } from "@/components/play/sfx";
import { reportRound } from "@/components/play/report";
import { useViewerSession } from "@/lib/viewer/useViewerSession";

/**
 * Number Rain (2026-11-18): sums fall, type the answer to blast them, 3 lives.
 * The rules are lib/play/rain; this draws them and owns the clock.
 * 2026-11-23: sums fall as meteors over a city of three buildings, one per
 * life; a tip on the first world 1 game; stars per world.
 */

const MAX_TYPED = 4;
/** Height of the city at the bottom of the arena, in pixels. */
const CITY = 52;
/** Remembers that this browser has seen the "how to answer" tip. */
const TIP_KEY = "pyqv-rain-tip-v1";

/** Where a drop is drawn, in pixels, for an arena of w x h. */
const place = (x: number, y: number, w: number, h: number) => ({ left: x * w, top: y * (h - 46 - CITY) });
/** For effects fired from events: measures the arena now. */
const posIn = (a: HTMLElement | null, x: number, y: number) => place(x, y, a?.clientWidth ?? 320, a?.clientHeight ?? 400);

type End = { score: number; world: LevelId; newBest: boolean; best: number; opened: LevelId | null; missed: RainState["missed"]; bestCombo: number };

/** Three stars, the first `n` filled. */
function Stars({ n, className }: { n: number; className: string }) {
  return (
    <span className="flex" role="img" aria-label={`${n} of 3 stars`}>
      {[1, 2, 3].map((i) => (
        <Star key={i} className={`${className} ${i <= n ? "fill-[var(--pa-mango)] text-[var(--pa-mango)]" : "text-[var(--pa-edge)]"}`} aria-hidden />
      ))}
    </span>
  );
}

export default function NumberRain() {
  const raw = useLocalStore(RAIN_KEY);
  const progress = useMemo(() => parseRainProgress(raw ?? null), [raw]);
  const { session } = useViewerSession();
  const [view, setView] = useState<"menu" | "playing" | "over">("menu");
  const [state, setState] = useState<RainState | null>(null);
  const [typed, setTyped] = useState("");
  const [bad, setBad] = useState(false);
  const [end, setEnd] = useState<End | null>(null);
  const [tip, setTip] = useState(false);
  const stateRef = useRef<RainState | null>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLDivElement>(null);
  const rng = useRef(Math.random);

  const begin = (world: LevelId) => {
    const s = startRain(world);
    stateRef.current = s;
    setState(s);
    setT("");
    setEnd(null);
    setTip(world === 1 && readLocal(TIP_KEY) === null);
    setView("playing");
    sfx.tick();
  };

  // The arena's size, kept in state so drawing never reads a ref during render.
  const [size, setSize] = useState({ w: 320, h: 400 });
  useEffect(() => {
    const a = arenaRef.current;
    if (view !== "playing" || !a) return;
    const ro = new ResizeObserver(() => setSize({ w: a.clientWidth, h: a.clientHeight }));
    ro.observe(a);
    return () => ro.disconnect();
  }, [view]);

  const finish = useCallback(
    (s: RainState) => {
      const r = recordRainScore(parseRainProgress(readLocal(RAIN_KEY)), s.world, s.score);
      writeLocal(RAIN_KEY, serializeRainProgress(r.progress));
      setEnd({ score: s.score, world: s.world, newBest: r.newBest, best: r.progress.best[s.world] ?? 0, opened: r.opened, missed: s.missed, bestCombo: s.bestCombo });
      setView("over");
      sfx.lose();
      if (r.newBest && s.score > 0) setTimeout(() => confetti(stageRef.current, 60), 150);
      reportRound(
        !!session,
        { kind: "play_round", game: "number_rain", world: s.world, score: s.score, blasts: s.blasts, missed: s.missed.length },
        { world: s.world, score: s.score }
      );
    },
    [session]
  );

  const handle = useCallback((events: RainEvent[]) => {
    for (const e of events) {
      if (e.type === "landed") {
        sfx.miss();
        vibrate([60, 40, 60]);
        replay(arenaRef.current, "pa-flash");
        replay(stageRef.current, "pa-shake");
        const a = arenaRef.current;
        if (a) sparks(a, e.drop.x * a.clientWidth + 40, a.clientHeight - CITY / 2, "#ff9a3c");
      } else if (e.type === "blast") {
        const p = posIn(arenaRef.current, e.drop.x, e.drop.y);
        sparks(arenaRef.current, p.left + 40, p.top + 18, e.drop.gold ? "#ffb238" : "#5cc8ff");
        floatText(arenaRef.current, `+${e.points}`, "pa-float", p.left + 24, p.top);
        sfx.hit(e.multiplier);
        vibrate(15);
        setTip((t) => {
          if (t) writeLocal(TIP_KEY, "1");
          return false;
        });
      } else if (e.type === "power") {
        sfx.power();
        floatText(arenaRef.current, e.power === "freeze" ? "Freeze!" : "Blast!", "pa-banner", undefined, undefined, e.power === "freeze" ? "#5cc8ff" : "#ffb238");
      } else if (e.type === "faster") {
        floatText(arenaRef.current, "Faster!", "pa-banner");
      } else if (e.type === "ramp") {
        floatText(arenaRef.current, "Here it comes!", "pa-banner", undefined, undefined, "var(--pa-mango)");
      }
    }
  }, []);

  // The clock: one frame at a time while playing; paused when the tab is hidden.
  useEffect(() => {
    if (view !== "playing") return;
    let raf = 0;
    let last = 0;
    let hidden = false;
    const onVis = () => {
      hidden = document.hidden;
      last = 0;
    };
    document.addEventListener("visibilitychange", onVis);
    const frame = (t: number) => {
      const s = stateRef.current;
      if (!s) return;
      if (!hidden) {
        const dt = last ? Math.min(50, t - last) : 16;
        last = t;
        const r = tick(s, dt, rng.current);
        stateRef.current = r.state;
        if (r.events.length) handle(r.events);
        setState(r.state);
        if (r.state.over) {
          finish(r.state);
          return;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [view, handle, finish]);

  const typedNow = useRef("");
  const setT = (v: string) => {
    typedNow.current = v;
    setTyped(v);
  };

  const press = useCallback(
    (k: string) => {
      const s = stateRef.current;
      if (!s || s.over) return;
      const t = typedNow.current;
      if (k === "clear") return setT("");
      if (k === "back") return setT(t.slice(0, -1));
      if (t.length >= MAX_TYPED) return;
      const next = t + k;
      const r = typeAnswer(s, next, rng.current);
      if (r.result === "blast") {
        stateRef.current = r.state;
        handle(r.events);
        setState(r.state);
        setT("");
        return;
      }
      setT(next);
      if (r.result === "wrong") {
        stateRef.current = r.state;
        setState(r.state);
        sfx.bad();
        setBad(true);
        replay(typedRef.current, "pa-shake");
        setTimeout(() => {
          setBad(false);
          if (typedNow.current === next) setT("");
        }, 280);
      }
    },
    [handle]
  );

  useEffect(() => {
    if (view !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") press("back");
      else if (e.key === "Escape") press("clear");
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, press]);

  if (view === "menu" || !state) {
    return (
      <div className="space-y-4">
        <div className="pa-stage px-5 py-6 text-center">
          <p className="pa-display text-3xl font-extrabold text-[var(--pa-mango)]">Number Rain</p>
          <p className="mx-auto mt-1 max-w-xs text-sm pa-dim">Sums fall. Type the answer to blast them before they hit the ground. 3 lives.</p>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            <span className="pa-pill">Combos up to x5</span>
            <span className="pa-pill">Gold drops freeze or blast</span>
            <span className="pa-pill">3 stars a world</span>
          </div>
        </div>
        <ol className="space-y-2.5" aria-label="Worlds">
          {LEVELS.map((l) => {
            const open = raw !== undefined && isWorldOpen(progress, l.id);
            const best = progress.best[l.id];
            return (
              <li key={l.id} className={`flex items-center gap-3 rounded-2xl bg-[var(--pa-night-2)] p-3 ${open ? "" : "opacity-60"}`}>
                <span className="pa-display grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--pa-night-3)] text-xl font-extrabold">{l.id}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-tight">{l.name}</span>
                  <span className="block text-sm pa-dim">{l.blurb}</span>
                  {open && (
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--pa-mango)]">
                      <Stars n={rainStars(best ?? 0)} className="h-3.5 w-3.5" />
                      {best ? `Best ${best}` : `${WORLD_TARGET} for the first star`}
                    </span>
                  )}
                </span>
                {open ? (
                  <button type="button" className="pa-btn shrink-0 !px-4 !py-1.5 !text-base" onClick={() => begin(l.id)}>
                    Play<span className="sr-only"> world {l.id}</span>
                  </button>
                ) : (
                  <span className="flex shrink-0 items-center gap-1 text-xs pa-dim">
                    <Lock className="h-3.5 w-3.5" aria-hidden /> 1 star in world {l.id - 1}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  const mult = rainMultiplier(state.combo);

  return (
    <div ref={stageRef} className="pa-stage flex h-[min(78dvh,680px)] flex-col">
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <div className="flex gap-1" aria-label={`${state.lives} lives left`} role="img">
          {[0, 1, 2].map((i) => (
            <Heart
              key={i}
              className={`h-6 w-6 transition-all ${i < state.lives ? "fill-[var(--pa-coral)] text-[var(--pa-coral)]" : "scale-75 text-[var(--pa-night-3)]"}`}
              aria-hidden
            />
          ))}
        </div>
        {state.combo >= 4 && (
          <span key={mult} className="pa-pop flex items-center gap-1 rounded-full bg-[var(--pa-sky)] px-2.5 py-0.5 text-sm font-bold text-[#03243a]">
            <Zap className="h-3.5 w-3.5" aria-hidden />x{mult} combo
          </span>
        )}
        <span className="pa-display text-3xl font-extrabold tabular-nums text-[var(--pa-mango)]" aria-live="off">
          {state.score}
        </span>
      </div>

      <div
        ref={arenaRef}
        className="relative flex-1 overflow-hidden"
        style={{ background: state.frozenMs > 0 ? "linear-gradient(#18306a,#1e4a7a)" : undefined }}
        data-sky
        aria-hidden
      >
        {state.drops.map((d) => {
          const p = place(d.x, d.y, size.w, size.h);
          const near = !d.gold && d.y > 0.68;
          return (
            <div
              key={d.id}
              className={`pa-meteor pa-display absolute left-0 top-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[1.35rem] font-bold will-change-transform ${d.gold ? "pa-meteor-gold" : ""} ${near ? "pa-meteor-near" : ""}`}
              style={{ transform: `translate(${p.left}px, ${p.top}px)` }}
            >
              {d.gold ? "★ " : ""}
              {d.prompt}
            </div>
          );
        })}
        <div className="pa-city" style={{ height: CITY }}>
          {[40, 50, 34].map((h, i) => (
            <div key={i} className={`pa-bld ${i >= state.lives ? "pa-bld-down" : ""}`} style={{ height: h }} />
          ))}
        </div>
      </div>

      <div
        ref={typedRef}
        className={`pa-display relative flex h-14 items-center justify-center bg-black/20 text-[2rem] font-extrabold tracking-wider ${bad ? "text-[var(--pa-coral)]" : "text-[var(--pa-sky)]"}`}
        aria-live="polite"
        aria-label={typed ? `Typed ${typed}` : "Type an answer"}
      >
        {tip && <span className="pa-tip">Type the answer. No Enter needed.</span>}
        {typed || " "}
      </div>
      <div className="grid grid-cols-3 gap-1.5 bg-black/10 px-2.5 pb-3 pt-2" role="group" aria-label="Number pad">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "back"].map((k) => (
          <button
            key={k}
            type="button"
            className="pa-key"
            aria-label={k === "back" ? "Delete last digit" : k === "clear" ? "Clear" : k}
            onPointerDown={(e) => {
              e.preventDefault();
              press(k);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                press(k);
              }
            }}
          >
            {k === "back" ? <Delete className="mx-auto h-6 w-6" aria-hidden /> : k === "clear" ? "C" : k}
          </button>
        ))}
      </div>

      {view === "over" && end && (
        <div className="pa-overlay" role="dialog" aria-label="Game over">
          <p className="pa-display text-4xl font-extrabold text-[var(--pa-mango)]">Game over</p>
          <p className="pa-display text-6xl font-extrabold tabular-nums">{end.score}</p>
          <Stars n={rainStars(end.score)} className="h-9 w-9" />
          <p className="text-sm pa-dim">
            {nextStarAt(end.score) === null ? `All 3 stars in world ${end.world}` : `${(nextStarAt(end.score) ?? 0) - end.score} more for the next star`}
          </p>
          <p className="text-sm">
            {end.newBest && end.score > 0 ? <b className="text-[var(--pa-mango)]">New best!</b> : `Your best in world ${end.world}: ${end.best}`}
            {end.bestCombo >= 4 && ` · Longest combo ${end.bestCombo}`}
          </p>
          {end.opened && <p className="font-semibold text-[var(--pa-mint)]">World {end.opened} is open!</p>}
          {end.missed.length > 0 && (
            <div>
              <p className="text-xs pa-dim">Sums that got through</p>
              <ul className="mt-1 flex flex-wrap justify-center gap-1.5">
                {end.missed.map((m, i) => (
                  <li key={i} className="rounded-lg border border-[var(--pa-coral)]/50 bg-[var(--pa-coral)]/10 px-2 py-0.5 text-sm">
                    {m.prompt} = {m.answer}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className="pa-btn" onClick={() => begin(end.opened ?? end.world)} autoFocus>
              {end.opened ? `Play world ${end.opened}` : "Play again"}
            </button>
            <button type="button" className="pa-btn-ghost" onClick={() => setView("menu")}>
              Worlds
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
