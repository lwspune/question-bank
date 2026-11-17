import { LEVELS, levelById, type LevelId } from "./levels";
import { makeProblem, type Rng } from "./generate";

/**
 * Number Rain (2026-11-18), the /play/maths arcade game that replaced the
 * 60-second speed game: sums fall, typing an answer blasts the sum, a sum that
 * reaches the ground costs one of 3 lives. Combos, gold drops (freeze or blast
 * the sky) and a rain that speeds up. The eight speed-game levels are its
 * WORLDS (same sums, lib/play/generate); a world's target score opens the next.
 *
 * Games have looser rules than the study app (owner, 2026-11-17): lives and
 * game over are fine inside a round. Pure: the page owns the clock, the keypad
 * and the drawing; every rule is here. Positions are fractions (x across, y
 * down, 0 = top, 1 = ground) so the page can draw at any size.
 */

export const START_LIVES = 3;
export const FREEZE_MS = 3000;
/** Every this many blasts the rain falls faster. */
export const SPEED_UP_EVERY = 8;
/** A world's best score at or above this opens the next world. A first guess: tune from play_round rows. */
export const WORLD_TARGET = 300;
const MAX_ON_SCREEN = 6;
const GOLD_CHANCE = 0.08;
const POINTS = 10;

export type Drop = { id: number; prompt: string; answer: number; x: number; y: number; gold: boolean };
export type Missed = { prompt: string; answer: number };

export type RainState = {
  world: LevelId;
  drops: Drop[];
  lives: number;
  score: number;
  /** Blasts in a row now. */
  combo: number;
  bestCombo: number;
  blasts: number;
  /** How many times the rain has sped up. */
  speedLevel: number;
  sinceSpawn: number;
  frozenMs: number;
  nextId: number;
  missed: Missed[];
  over: boolean;
};

export type RainEvent =
  | { type: "spawn"; drop: Drop }
  | { type: "landed"; drop: Drop }
  | { type: "blast"; drop: Drop; points: number; multiplier: number }
  | { type: "power"; power: "freeze" | "bomb" }
  | { type: "faster" }
  | { type: "over" };

/** Seconds a sum takes to fall from the top to the ground at the start of a world. */
export function fallSecondsFor(world: LevelId): number {
  return [9, 9, 10, 11, 12, 14, 14, 16][world - 1];
}

/** Fraction of the height fallen per second now. */
function speedOf(s: RainState): number {
  return (1 / fallSecondsFor(s.world)) * Math.min(2.2, 1 + 0.12 * s.speedLevel);
}

function spawnEveryMs(s: RainState): number {
  return Math.max(900, (fallSecondsFor(s.world) * 1000) / 3.2 / Math.min(1.8, 1 + 0.08 * s.speedLevel));
}

/** The k-th blast in a row scores x1 for blasts 1-3, x2 for 4-6, and so on to x5. */
export function rainMultiplier(k: number): number {
  return Math.min(5, 1 + Math.floor((Math.max(1, k) - 1) / 3));
}

export function startRain(world: LevelId): RainState {
  return {
    world,
    drops: [],
    lives: START_LIVES,
    score: 0,
    combo: 0,
    bestCombo: 0,
    blasts: 0,
    speedLevel: 0,
    sinceSpawn: 0,
    frozenMs: 0,
    nextId: 1,
    missed: [],
    over: false,
  };
}

function spawn(s: RainState, rng: Rng): { state: RainState; drop: Drop } | null {
  if (s.drops.length >= MAX_ON_SCREEN) return null;
  const onScreen = new Set(s.drops.map((d) => d.answer));
  const prompts = new Set(s.drops.map((d) => d.prompt));
  let p = makeProblem(s.world, rng);
  for (let i = 0; i < 30 && (onScreen.has(p.answer) || prompts.has(p.prompt)); i++) p = makeProblem(s.world, rng);
  if (onScreen.has(p.answer)) return null;
  // Keep a new sum clear of one still near the top.
  let x = 0.06 + rng() * 0.62;
  for (const d of s.drops) if (d.y < 0.2 && Math.abs(d.x - x) < 0.24) x = (x + 0.32) % 0.68 + 0.06;
  const gold = s.blasts >= 4 && !s.drops.some((d) => d.gold) && rng() < GOLD_CHANCE;
  const drop: Drop = { id: s.nextId, prompt: p.prompt, answer: p.answer, x, y: 0, gold };
  return { state: { ...s, drops: [...s.drops, drop], nextId: s.nextId + 1, sinceSpawn: 0 }, drop };
}

/** Advance the game by `dtMs`: drops fall, new sums drop in, landed sums cost lives. */
export function tick(s: RainState, dtMs: number, rng: Rng): { state: RainState; events: RainEvent[] } {
  if (s.over) return { state: s, events: [] };
  const events: RainEvent[] = [];
  if (s.frozenMs > 0) {
    return { state: { ...s, frozenMs: Math.max(0, s.frozenMs - dtMs) }, events };
  }
  const v = speedOf(s);
  let state: RainState = { ...s, sinceSpawn: s.sinceSpawn + dtMs };
  const kept: Drop[] = [];
  for (const d of state.drops) {
    const y = d.y + (v * dtMs) / 1000;
    if (y >= 1) {
      events.push({ type: "landed", drop: d });
      state = {
        ...state,
        lives: state.lives - 1,
        combo: 0,
        missed: [...state.missed, { prompt: d.prompt, answer: d.answer }],
      };
    } else kept.push({ ...d, y });
  }
  state = { ...state, drops: kept };
  if (state.lives <= 0) {
    events.push({ type: "over" });
    return { state: { ...state, lives: 0, over: true }, events };
  }
  if (state.drops.length === 0 || state.sinceSpawn >= spawnEveryMs(state)) {
    const r = spawn(state, rng);
    if (r) {
      state = r.state;
      events.push({ type: "spawn", drop: r.drop });
    }
  }
  return { state, events };
}

function blastOne(s: RainState, d: Drop, events: RainEvent[]): RainState {
  const combo = s.combo + 1;
  const multiplier = rainMultiplier(combo);
  const points = POINTS * multiplier;
  events.push({ type: "blast", drop: d, points, multiplier });
  const blasts = s.blasts + 1;
  let speedLevel = s.speedLevel;
  if (blasts % SPEED_UP_EVERY === 0) {
    speedLevel += 1;
    events.push({ type: "faster" });
  }
  return {
    ...s,
    drops: s.drops.filter((x) => x.id !== d.id),
    score: s.score + points,
    combo,
    bestCombo: Math.max(s.bestCombo, combo),
    blasts,
    speedLevel,
  };
}

/**
 * The digits typed so far. A full answer blasts the lowest sum with it; the
 * start of an answer waits; anything else is wrong and ends the combo.
 */
export function typeAnswer(
  s: RainState,
  typed: string,
  rng: Rng
): { state: RainState; result: "blast" | "partial" | "wrong"; events: RainEvent[] } {
  const events: RainEvent[] = [];
  if (s.over || typed === "") return { state: s, result: "partial", events };
  const hit = s.drops
    .filter((d) => String(d.answer) === typed)
    .sort((a, b) => b.y - a.y)[0];
  if (hit) {
    let state = blastOne(s, hit, events);
    if (hit.gold) {
      const power = rng() < 0.5 ? "freeze" : "bomb";
      events.push({ type: "power", power });
      if (power === "freeze") state = { ...state, frozenMs: FREEZE_MS };
      else {
        // The blast of the sky scores each sum at the plain rate and keeps the combo as it was.
        const combo = state.combo;
        for (const d of [...state.drops]) {
          events.push({ type: "blast", drop: d, points: POINTS, multiplier: 1 });
          state = { ...state, drops: state.drops.filter((x) => x.id !== d.id), score: state.score + POINTS, blasts: state.blasts + 1 };
        }
        state = { ...state, combo };
      }
    }
    return { state, result: "blast", events };
  }
  if (s.drops.some((d) => String(d.answer).startsWith(typed))) return { state: s, result: "partial", events };
  return { state: { ...s, combo: 0 }, result: "wrong", events };
}

// --- progress, kept in the browser ------------------------------------------

export const RAIN_KEY = "pyqv-rain-v1";
export type RainProgress = { v: 1; best: Partial<Record<LevelId, number>> };

export function parseRainProgress(raw: string | null): RainProgress {
  const fresh: RainProgress = { v: 1, best: {} };
  if (!raw) return fresh;
  let o: unknown;
  try {
    o = JSON.parse(raw);
  } catch {
    return fresh;
  }
  if (typeof o !== "object" || o === null) return fresh;
  const r = o as Record<string, unknown>;
  if (r.v !== 1 || typeof r.best !== "object" || r.best === null) return fresh;
  const best: RainProgress["best"] = {};
  for (const [k, v] of Object.entries(r.best as Record<string, unknown>)) {
    const level = levelById(Number(k));
    if (!level) continue;
    if (typeof v !== "number" || !Number.isInteger(v) || v < 0) return fresh;
    best[level.id] = v;
  }
  return { v: 1, best };
}

export function serializeRainProgress(p: RainProgress): string {
  return JSON.stringify(p);
}

export function isWorldOpen(p: RainProgress, world: LevelId): boolean {
  if (world === 1) return true;
  return (p.best[(world - 1) as LevelId] ?? 0) >= WORLD_TARGET;
}

/** Fold a finished game into progress. `opened` is a world opened by THIS game. */
export function recordRainScore(
  p: RainProgress,
  world: LevelId,
  score: number
): { progress: RainProgress; newBest: boolean; opened: LevelId | null } {
  const prev = p.best[world] ?? 0;
  const newBest = score > prev;
  const progress: RainProgress = newBest ? { v: 1, best: { ...p.best, [world]: score } } : p;
  const next = levelById(world + 1);
  const opened = next && !isWorldOpen(p, next.id) && isWorldOpen(progress, next.id) ? next.id : null;
  return { progress, newBest, opened };
}

export const WORLDS = LEVELS;
