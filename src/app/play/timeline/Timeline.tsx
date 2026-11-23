"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { useLocalStore, readLocal, writeLocal } from "@/components/play/useLocalStore";
import { confetti, replay, sfx, vibrate } from "@/components/play/sfx";
import { reportRound } from "@/components/play/report";
import { useViewerSession } from "@/lib/viewer/useViewerSession";
import { TIMELINE_PACKS } from "@/lib/play/data/timeline";
import {
  LIVES,
  TIMELINE_KEY,
  parseTimelineProgress,
  placeCard,
  recordTimeline,
  serializeTimelineProgress,
  startTimeline,
  yearLabel,
  type TimelineEvent,
  type TimelinePack,
  type TimelineState,
} from "@/lib/play/timeline";

/**
 * Timeline (2026-11-18), the History game: tap where each event goes in your
 * line; a wrong place costs one of 3 lives. Rules in lib/play/timeline, decks
 * in lib/play/data/timeline (dates blind-checked).
 */

export default function Timeline() {
  const raw = useLocalStore(TIMELINE_KEY);
  const progress = useMemo(() => parseTimelineProgress(raw ?? null), [raw]);
  const { session } = useViewerSession();
  const [pack, setPack] = useState<TimelinePack | null>(null);
  const [state, setState] = useState<TimelineState | null>(null);
  const [last, setLast] = useState<{ card: TimelineEvent; right: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [newBest, setNewBest] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const begin = (p: TimelinePack) => {
    setPack(p);
    setState(startTimeline(p, Math.random));
    setLast(null);
    setNewBest(false);
    sfx.tick();
  };

  // Keep the card just placed in view.
  useEffect(() => {
    if (!last) return;
    lineRef.current?.querySelector('[data-last="true"]')?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [last]);

  const place = (slot: number) => {
    if (!state || !pack || busy || state.over) return;
    const card = state.current!;
    const r = placeCard(state, slot, Math.random);
    setBusy(true);
    setLast({ card, right: r.right });
    setState({ ...r.state, current: null });
    if (r.right) {
      sfx.hit(Math.min(5, 1 + Math.floor(r.state.score / 3)));
      vibrate(15);
    } else {
      sfx.miss();
      vibrate([50, 30, 50]);
      replay(stageRef.current, "pa-shake");
    }
    setTimeout(
      () => {
        setBusy(false);
        setState(r.state);
        if (r.state.over) {
          const before = parseTimelineProgress(readLocal(TIMELINE_KEY));
          const best = r.state.score > (before.best[pack.id] ?? 0);
          writeLocal(TIMELINE_KEY, serializeTimelineProgress(recordTimeline(before, pack.id, r.state.score)));
          setNewBest(best);
          if (r.state.won || best) {
            sfx.win();
            setTimeout(() => confetti(stageRef.current, 60), 150);
          } else sfx.lose();
          reportRound(
            !!session,
            { kind: "play_round", game: "timeline", pack: pack.id, placed: r.state.score, won: r.state.won },
            { pack: pack.id, placed: r.state.score }
          );
        }
      },
      r.right ? 450 : 1100
    );
  };

  if (!pack || !state) {
    return (
      <div className="space-y-3">
        <div className="pa-stage px-5 py-5 text-center">
          <p className="pa-display text-3xl font-extrabold text-[var(--pa-coral)]">Timeline</p>
          <p className="mx-auto mt-1 max-w-xs text-sm pa-dim">An event arrives with its year hidden. Tap where it goes in your line. 3 lives.</p>
        </div>
        <ul className="space-y-2.5" aria-label="Decks">
          {TIMELINE_PACKS.map((p) => (
            <li key={p.id}>
              <button type="button" onClick={() => begin(p)} className="flex w-full items-center gap-3 rounded-2xl bg-[var(--pa-night-2)] p-3 text-left">
                <span className="min-w-0 flex-1">
                  <span className="pa-display block text-lg font-extrabold leading-tight">{p.name}</span>
                  <span className="block text-sm pa-dim">
                    {p.events.length} events{progress.best[p.id] ? ` · best ${progress.best[p.id]} placed` : ""}
                  </span>
                </span>
                <span className="pa-btn shrink-0 !px-4 !py-1.5 !text-base">Play</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const slots = state.line.length + 1;

  return (
    <div ref={stageRef} className="pa-stage flex h-[min(78dvh,680px)] flex-col">
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <div className="flex gap-1" role="img" aria-label={`${state.lives} lives left`}>
          {Array.from({ length: LIVES }, (_, i) => (
            <Heart key={i} className={`h-6 w-6 transition-all ${i < state.lives ? "fill-[var(--pa-coral)] text-[var(--pa-coral)]" : "scale-75 text-[var(--pa-night-3)]"}`} aria-hidden />
          ))}
        </div>
        <span className="truncate px-2 text-sm font-semibold pa-dim">{pack.name}</span>
        <span className="pa-display text-3xl font-extrabold tabular-nums text-[var(--pa-mango)]">{state.score}</span>
      </div>

      {state.current && !state.over && (
        <div key={state.current.text} className="pa-pop mx-3 rounded-2xl bg-[var(--pa-mango)] px-4 py-3 text-center text-[var(--pa-mango-ink)] shadow-[0_6px_0_var(--pa-mango-deep)]" aria-live="polite">
          <p className="pa-display text-xs font-extrabold uppercase tracking-wider opacity-70">When was this?</p>
          <p className="text-lg font-bold leading-snug">{state.current.text}</p>
        </div>
      )}
      {!state.over && <p className="mt-2 text-center text-xs pa-dim">Tap where it goes. Oldest at the top.</p>}

      <div ref={lineRef} className="mt-2 flex-1 space-y-1.5 overflow-y-auto px-3 pb-4">
        {Array.from({ length: slots }, (_, i) => (
          <div key={i} className="space-y-1.5">
            {state.current && !state.over && !busy && (
              <button
                type="button"
                onClick={() => place(i)}
                className="w-full rounded-xl border-2 border-dashed border-[var(--pa-edge)] py-1.5 text-xs font-semibold pa-dim hover:border-[var(--pa-mango)] hover:text-[var(--pa-ink)]"
                aria-label={i === 0 ? "Place before every card" : i === state.line.length ? "Place after every card" : `Place between ${yearLabel(state.line[i - 1].year)} and ${yearLabel(state.line[i].year)}`}
              >
                {i === 0 ? "Earlier than all" : i === state.line.length ? "Later than all" : "Here"}
              </button>
            )}
            {i < state.line.length && (
              <div
                data-last={state.line[i] === last?.card}
                className={`flex items-center gap-3 rounded-xl bg-[var(--pa-night-3)] px-3 py-2 ${
                  state.line[i] === last?.card ? (last.right ? "pa-pop ring-2 ring-[var(--pa-mint)]" : "ring-2 ring-[var(--pa-coral)]") : ""
                }`}
              >
                <span
                  className={`pa-display min-w-[4.5rem] shrink-0 text-lg font-extrabold tabular-nums ${
                    state.line[i] === last?.card && !last.right ? "text-[var(--pa-coral)]" : "text-[var(--pa-mango)]"
                  }`}
                >
                  {yearLabel(state.line[i].year)}
                </span>
                <span className="text-sm leading-snug">{state.line[i].text}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {state.over && !busy && (
        <div className="pa-overlay" role="dialog" aria-label="Game over">
          <p className="pa-display text-3xl font-extrabold text-[var(--pa-mango)]">{state.won ? "Whole deck placed!" : "Out of lives"}</p>
          <p className="pa-display text-6xl font-extrabold tabular-nums">{state.score}</p>
          <p className="text-sm">{newBest ? <b className="text-[var(--pa-mango)]">New best!</b> : `cards placed · best ${progress.best[pack.id] ?? state.score}`}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className="pa-btn" onClick={() => begin(pack)} autoFocus>
              Play again
            </button>
            <button type="button" className="pa-btn-ghost" onClick={() => setPack(null)}>
              Decks
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
