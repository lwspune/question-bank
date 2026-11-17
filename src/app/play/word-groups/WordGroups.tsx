"use client";

import { useCallback, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Check, Share2, Shuffle } from "lucide-react";
import { toast } from "sonner";
import { useLocalStore, readLocal, writeLocal } from "@/components/play/useLocalStore";
import { confetti, floatText, replay, sfx, vibrate } from "@/components/play/sfx";
import { reportRound } from "@/components/play/report";
import { useViewerSession } from "@/lib/viewer/useViewerSession";
import { istDay } from "@/lib/play/day";
import { seededRng } from "@/lib/play/generate";
import { PUZZLES } from "@/lib/play/data/wordGroups";
import {
  GROUPS_KEY,
  MISTAKES,
  groupsShareText,
  parseGroupsProgress,
  puzzleIndexForDay,
  recordGroupsResult,
  serializeGroupsProgress,
  startGroups,
  submitGroup,
  type GroupLevel,
  type GroupsState,
  type Puzzle,
} from "@/lib/play/groups";

/**
 * Word Groups (2026-11-18): 16 words, 4 hidden groups of 4 that mean the same
 * thing, 4 mistakes. Today's puzzle, or any other from the list. The rules are
 * lib/play/groups; the puzzles lib/play/data/wordGroups (blind-checked).
 */

const COLOUR: Record<GroupLevel, string> = { 1: "#ffd166", 2: "#3ee6b0", 3: "#5cc8ff", 4: "#c9a7ff" };

function shuffled<T>(xs: readonly T[], rng: () => number = Math.random): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Game = { id: number; state: GroupsState; tiles: string[]; sel: string[] };

/** Long words get smaller type so a tile never breaks a word mid-letter on a 360 px phone. */
const tileSize = (w: string) => (w.length <= 8 ? "text-[0.85rem]" : w.length <= 10 ? "text-[0.72rem]" : "text-[0.62rem]");

/** A puzzle's first deal: shuffled the same way every time, so the cached page matches the browser. */
const firstDeal = (p: Puzzle): Game => ({
  id: p.id,
  state: startGroups(),
  tiles: shuffled(p.groups.flatMap((g) => g.words), seededRng(p.id * 7919)),
  sel: [],
});

const noSubscribe = () => () => {};

export default function WordGroups() {
  const raw = useLocalStore(GROUPS_KEY);
  const progress = useMemo(() => parseGroupsProgress(raw ?? null), [raw]);
  const { session } = useViewerSession();
  // Today's puzzle is read in the browser, so the cached page is the same for everyone.
  const today = useSyncExternalStore(noSubscribe, () => istDay(new Date()), () => "");
  const todayId = today ? PUZZLES[puzzleIndexForDay(today, PUZZLES.length)].id : null;
  const [picked, setPicked] = useState<Puzzle | null>(null);
  const puzzle = picked ?? (todayId ? PUZZLES[todayId - 1] : null);
  const [game, setGame] = useState<Game | null>(null);
  const cur = puzzle ? (game && game.id === puzzle.id ? game : firstDeal(puzzle)) : null;
  const state = cur?.state ?? startGroups();
  const tiles = cur?.tiles ?? [];
  const sel = cur?.sel ?? [];
  const update = (patch: Partial<Game>) => cur && setGame({ ...cur, ...patch });
  const [busy, setBusy] = useState(false);
  const [picking, setPicking] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const open = (p: Puzzle) => {
    setPicked(p);
    setGame(firstDeal(p));
    setPicking(false);
  };

  const over = state.won || state.lost;

  const toggle = (w: string) => {
    if (over || busy) return;
    update({ sel: sel.includes(w) ? sel.filter((x) => x !== w) : sel.length < 4 ? [...sel, w] : sel });
    sfx.tick();
  };

  const finish = useCallback(
    (p: Puzzle, s: GroupsState) => {
      writeLocal(GROUPS_KEY, serializeGroupsProgress(recordGroupsResult(parseGroupsProgress(readLocal(GROUPS_KEY)), p.id, s)));
      reportRound(
        !!session,
        { kind: "play_round", game: "word_groups", puzzle: p.id, won: s.won, mistakes: MISTAKES - s.mistakesLeft },
        { puzzle: p.id, won: s.won }
      );
      if (s.won) {
        sfx.win();
        setTimeout(() => confetti(stageRef.current, 70), 150);
      } else sfx.lose();
    },
    [session]
  );

  const submit = () => {
    if (!puzzle || !cur || sel.length !== 4 || busy || over) return;
    const r = submitGroup(state, puzzle, sel);
    if (r.result === "already") {
      floatText(stageRef.current, "Already tried", "pa-toast");
      return;
    }
    if (r.result === "invalid" || r.result === "over") return;
    setBusy(true);
    gridRef.current?.querySelectorAll<HTMLElement>("[data-sel]").forEach((el, i) => setTimeout(() => replay(el, "pa-jump"), i * 80));
    setTimeout(() => {
      setBusy(false);
      if (r.result === "solved") {
        const g = puzzle.groups[r.group!];
        setGame({ ...cur, state: r.state, tiles: tiles.filter((w) => !g.words.includes(w)), sel: [] });
        sfx.hit(3);
        vibrate(30);
      } else {
        setGame({ ...cur, state: r.state });
        sfx.miss();
        vibrate([50, 30, 50]);
        replay(gridRef.current, "pa-shake");
        if (r.result === "one-away") floatText(stageRef.current, "One away!", "pa-toast");
      }
      if (r.state.won || r.state.lost) finish(puzzle, r.state);
    }, 420);
  };

  const share = async () => {
    if (!puzzle) return;
    const text = `${groupsShareText(puzzle.id, state)}\nwww.pyqvault.com/play/word-groups`;
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      toast.success("Result copied. Paste it anywhere.");
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return;
      toast.error("Could not share. Try again.");
    }
  };

  if (!puzzle) return <div className="pa-stage h-[32rem]" aria-busy="true" />;

  if (picking) {
    return (
      <div className="pa-stage p-4">
        <p className="pa-display text-xl font-extrabold">Every puzzle</p>
        <p className="text-sm pa-dim">A new one each day at midnight, India time. Play any of them.</p>
        <ul className="mt-3 grid grid-cols-5 gap-2" aria-label="Puzzles">
          {PUZZLES.map((p) => {
            const d = progress.done[p.id];
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => open(p)}
                  className={`pa-display relative grid h-12 w-full place-items-center rounded-xl text-lg font-extrabold ${
                    d?.won ? "bg-[var(--pa-mint)] text-[var(--pa-mint-ink)]" : d ? "bg-[var(--pa-coral)]/30" : "bg-[var(--pa-night-3)]"
                  } ${p.id === todayId ? "ring-2 ring-[var(--pa-mango)]" : ""}`}
                  aria-label={`Puzzle ${p.id}${p.id === todayId ? ", today's" : ""}${d ? (d.won ? ", solved" : ", not solved") : ""}`}
                >
                  {p.id}
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" className="pa-btn-ghost mt-4 w-full" onClick={() => setPicking(false)}>
          Back
        </button>
      </div>
    );
  }

  const solvedGroups = (over ? [...state.solved, ...[0, 1, 2, 3].filter((i) => !state.solved.includes(i))] : state.solved).map((i) => puzzle.groups[i]);

  return (
    <div ref={stageRef} className="pa-stage px-3 pb-4 pt-3">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold">
          Puzzle {puzzle.id}
          {puzzle.id === todayId ? " · today" : ""}
        </span>
        <button type="button" className="font-semibold text-[var(--pa-sky)]" onClick={() => setPicking(true)}>
          Every puzzle
        </button>
      </div>
      <p className="mb-2 text-center text-sm pa-dim">Find four groups of four words that mean the same thing.</p>

      <div className="space-y-2">
        {solvedGroups.map((g) => (
          <div key={g.name} className="pa-pop rounded-xl p-2.5 text-center text-[#1b1240]" style={{ background: COLOUR[g.level] }}>
            <p className="pa-display text-lg font-extrabold uppercase leading-tight">{g.name}</p>
            <p className="text-sm font-semibold uppercase">{g.words.join(", ")}</p>
          </div>
        ))}
      </div>

      {!over && (
        <>
          <div ref={gridRef} className="mt-2 grid grid-cols-4 gap-2" role="group" aria-label="Words">
            {tiles.map((w) => {
              const on = sel.includes(w);
              return (
                <button
                  key={w}
                  type="button"
                  data-sel={on || undefined}
                  aria-pressed={on}
                  onClick={() => toggle(w)}
                  lang="en"
                  className={`flex h-16 items-center justify-center rounded-xl px-1 text-center font-bold uppercase leading-tight tracking-tight [hyphens:auto] transition-transform ${tileSize(w)} ${
                    on ? "-translate-y-0.5 bg-[var(--pa-ink)] text-[var(--pa-night)]" : "bg-[var(--pa-night-3)] text-[var(--pa-ink)] shadow-[0_4px_0_#120d38]"
                  }`}
                >
                  {w}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm pa-dim" aria-live="polite">
            Mistakes left
            <span className="flex gap-1.5" aria-label={`${state.mistakesLeft} mistakes left`} role="img">
              {Array.from({ length: MISTAKES }, (_, i) => (
                <span key={i} className={`h-3 w-3 rounded-full transition-all ${i < state.mistakesLeft ? "bg-[var(--pa-mango)]" : "scale-50 bg-[var(--pa-night-3)]"}`} />
              ))}
            </span>
          </div>
          <div className="mt-3 flex justify-center gap-2">
            <button type="button" className="pa-btn-ghost inline-flex items-center gap-1.5" onClick={() => update({ tiles: shuffled(tiles) })}>
              <Shuffle className="h-4 w-4" aria-hidden /> Shuffle
            </button>
            <button type="button" className="pa-btn-ghost" onClick={() => update({ sel: [] })} disabled={sel.length === 0}>
              Deselect
            </button>
            <button type="button" className="pa-btn !px-5 !py-1.5 !text-lg" onClick={submit} disabled={sel.length !== 4 || busy}>
              Submit
            </button>
          </div>
        </>
      )}

      {over && (
        <div className="pa-pop mt-4 space-y-2 text-center">
          <p className="pa-display text-3xl font-extrabold" style={{ color: state.won ? "var(--pa-mint)" : "var(--pa-coral)" }}>
            {state.won ? (state.mistakesLeft === MISTAKES ? "Perfect!" : "Solved!") : "Out of tries"}
          </p>
          <pre className="m-0 text-xl leading-tight" aria-hidden>
            {groupsShareText(puzzle.id, state).split("\n").slice(1).join("\n")}
          </pre>
          <div className="flex justify-center gap-2">
            <button type="button" className="pa-btn-ghost inline-flex items-center gap-1.5" onClick={share}>
              <Share2 className="h-4 w-4" aria-hidden /> Share
            </button>
            <button type="button" className="pa-btn !text-lg" onClick={() => setPicking(true)}>
              Another puzzle
            </button>
          </div>
          {progress.done[puzzle.id]?.won && (
            <p className="inline-flex items-center gap-1 text-xs pa-dim">
              <Check className="h-3.5 w-3.5" aria-hidden /> Saved on this device
            </p>
          )}
        </div>
      )}
    </div>
  );
}
