import type { Rng } from "./generate";

/**
 * Timeline (2026-11-18), the /play History game: an event card arrives with
 * its year hidden; tap where it goes in your line. Right: it stays and the
 * year shows. Wrong: a life goes and the card moves to where it belongs.
 * 3 lives. Chronology is asked in NDA, CDS, SSC, UPSC and MPSC papers.
 * Pure; decks in lib/play/data/timeline.ts.
 */

export const LIVES = 3;

export type TimelineEvent = { year: number; text: string };
export type TimelinePack = { id: string; name: string; events: TimelineEvent[] };

export function yearLabel(y: number): string {
  if (y < 0) return `${-y} BCE`;
  if (y < 1000) return `${y} CE`;
  return String(y);
}

export function validatePack(p: TimelinePack): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  for (const e of p.events) {
    if (!Number.isInteger(e.year) || e.year === 0) errors.push(`${e.text}: bad year ${e.year}`);
    if (new RegExp(`(^|\\D)${Math.abs(e.year)}(\\D|$)`).test(e.text)) errors.push(`${e.text}: gives away ${e.year}`);
    const k = e.text.toLowerCase();
    if (seen.has(k)) errors.push(`${e.text}: used twice`);
    seen.add(k);
  }
  return errors;
}

export type TimelineState = {
  packId: string;
  /** Cards down, oldest first. */
  line: TimelineEvent[];
  current: TimelineEvent | null;
  deck: TimelineEvent[];
  lives: number;
  score: number;
  over: boolean;
  won: boolean;
};

function shuffle<T>(xs: readonly T[], rng: Rng): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function startTimeline(p: TimelinePack, rng: Rng): TimelineState {
  const deck = shuffle(p.events, rng);
  const first = deck.pop()!;
  const current = deck.pop() ?? null;
  return { packId: p.id, line: [first], current, deck, lives: LIVES, score: 0, over: current === null, won: current === null };
}

/** Slot i is before line[i]; slot line.length is after the last card. */
export function slotIsRight(line: readonly TimelineEvent[], slot: number, year: number): boolean {
  const before = line[slot - 1];
  const after = line[slot];
  return (!before || before.year <= year) && (!after || year <= after.year);
}

export function placeCard(s: TimelineState, slot: number, rng: Rng): { state: TimelineState; right: boolean } {
  if (s.over || !s.current) return { state: s, right: false };
  void rng;
  const card = s.current;
  const right = slotIsRight(s.line, slot, card.year);
  let at = s.line.findIndex((e) => e.year > card.year);
  if (at < 0) at = s.line.length;
  const line = [...s.line.slice(0, at), card, ...s.line.slice(at)];
  const lives = right ? s.lives : s.lives - 1;
  const score = right ? s.score + 1 : s.score;
  const deck = [...s.deck];
  const next = lives > 0 ? deck.pop() ?? null : null;
  const won = lives > 0 && next === null;
  return { state: { ...s, line, current: next, deck, lives, score, over: lives <= 0 || won, won }, right };
}

// --- best per pack, kept in the browser -------------------------------------

export const TIMELINE_KEY = "pyqv-timeline-v1";
export type TimelineProgress = { v: 1; best: Record<string, number> };

export function parseTimelineProgress(raw: string | null): TimelineProgress {
  const fresh: TimelineProgress = { v: 1, best: {} };
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
  const best: Record<string, number> = {};
  for (const [k, v] of Object.entries(r.best as Record<string, unknown>)) {
    if (typeof v !== "number" || !Number.isInteger(v) || v < 0) return fresh;
    best[k] = v;
  }
  return { v: 1, best };
}

export function serializeTimelineProgress(p: TimelineProgress): string {
  return JSON.stringify(p);
}

export function recordTimeline(p: TimelineProgress, packId: string, score: number): TimelineProgress {
  if ((p.best[packId] ?? 0) >= score) return p;
  return { v: 1, best: { ...p.best, [packId]: score } };
}
