import { daysBetween } from "./day";

/**
 * Word Groups (2026-11-18), a /play English game: 16 words hide 4 groups of 4
 * that mean the same thing; find them with at most 4 mistakes. One puzzle a
 * day (India time) and every earlier puzzle on demand. Puzzles are written
 * around words from real past papers and checked by two blind solvers
 * (lib/play/data/wordGroups.ts). Pure; the page draws and keeps the clock.
 */

export const MISTAKES = 4;
/** The day puzzle 1 is the daily puzzle. */
export const GROUPS_EPOCH = "2026-11-18";

export type GroupLevel = 1 | 2 | 3 | 4;
export type Group = { name: string; level: GroupLevel; words: string[] };
export type Puzzle = { id: number; groups: Group[] };

/** What is wrong with a puzzle; empty when it is fine. */
export function validatePuzzle(p: Puzzle): string[] {
  const errors: string[] = [];
  if (p.groups.length !== 4) errors.push(`has ${p.groups.length} groups, not 4`);
  const levels = new Set(p.groups.map((g) => g.level));
  if (levels.size !== 4 || ![1, 2, 3, 4].every((l) => levels.has(l as GroupLevel))) errors.push("needs one group of each colour 1-4");
  const seen = new Set<string>();
  for (const g of p.groups) {
    if (!g.name.trim()) errors.push("a group has no name");
    if (g.words.length !== 4) errors.push(`group ${g.name} has ${g.words.length} words, not 4`);
    for (const w of g.words) {
      const k = w.toLowerCase();
      if (seen.has(k)) errors.push(`${w} is used twice`);
      seen.add(k);
    }
  }
  return errors;
}

export function puzzleIndexForDay(day: string, count: number): number {
  const n = daysBetween(GROUPS_EPOCH, day);
  return ((n % count) + count) % count;
}

export type GroupsState = {
  /** Group indexes in the order found. */
  solved: number[];
  mistakesLeft: number;
  /** Sorted word keys of every guess, so a repeat is not charged twice. */
  tried: string[];
  /** Each guess as the level of each word: the share grid. */
  rows: GroupLevel[][];
  won: boolean;
  lost: boolean;
};

export function startGroups(): GroupsState {
  return { solved: [], mistakesLeft: MISTAKES, tried: [], rows: [], won: false, lost: false };
}

export type GroupsResult = "solved" | "one-away" | "wrong" | "already" | "invalid" | "over";

export function submitGroup(
  s: GroupsState,
  p: Puzzle,
  words: string[]
): { state: GroupsState; result: GroupsResult; group?: number } {
  if (s.won || s.lost) return { state: s, result: "over" };
  const keys = words.map((w) => w.toLowerCase());
  const groupOf = (w: string) => p.groups.findIndex((g) => g.words.some((x) => x.toLowerCase() === w));
  if (keys.length !== 4 || new Set(keys).size !== 4 || keys.some((k) => groupOf(k) < 0 || s.solved.includes(groupOf(k)))) {
    return { state: s, result: "invalid" };
  }
  const key = [...keys].sort().join("|");
  if (s.tried.includes(key)) return { state: s, result: "already" };
  const idx = keys.map(groupOf);
  const row = idx.map((i) => p.groups[i].level);
  const base = { ...s, tried: [...s.tried, key], rows: [...s.rows, row] };
  if (idx.every((i) => i === idx[0])) {
    const solved = [...s.solved, idx[0]];
    return { state: { ...base, solved, won: solved.length === 4 }, result: "solved", group: idx[0] };
  }
  const counts = new Map<number, number>();
  for (const i of idx) counts.set(i, (counts.get(i) ?? 0) + 1);
  const oneAway = [...counts.values()].some((c) => c === 3);
  const mistakesLeft = s.mistakesLeft - 1;
  return { state: { ...base, mistakesLeft, lost: mistakesLeft === 0 }, result: oneAway ? "one-away" : "wrong" };
}

const TILE: Record<GroupLevel, string> = { 1: "🟨", 2: "🟩", 3: "🟦", 4: "🟪" };

export function groupsShareText(puzzleNo: number, s: GroupsState): string {
  return [`PYQ Vault Word Groups #${puzzleNo}`, ...s.rows.map((r) => r.map((l) => TILE[l]).join(""))].join("\n");
}

// --- results, kept in the browser -------------------------------------------

export const GROUPS_KEY = "pyqv-word-groups-v1";
export type GroupsDone = { won: boolean; mistakes: number };
export type GroupsProgress = { v: 1; done: Record<number, GroupsDone> };

export function parseGroupsProgress(raw: string | null): GroupsProgress {
  const fresh: GroupsProgress = { v: 1, done: {} };
  if (!raw) return fresh;
  let o: unknown;
  try {
    o = JSON.parse(raw);
  } catch {
    return fresh;
  }
  if (typeof o !== "object" || o === null) return fresh;
  const r = o as Record<string, unknown>;
  if (r.v !== 1 || typeof r.done !== "object" || r.done === null) return fresh;
  const done: Record<number, GroupsDone> = {};
  for (const [k, v] of Object.entries(r.done as Record<string, unknown>)) {
    const id = Number(k);
    const d = v as Record<string, unknown>;
    if (!Number.isInteger(id) || typeof d !== "object" || d === null) return fresh;
    if (typeof d.won !== "boolean" || typeof d.mistakes !== "number" || d.mistakes < 0 || d.mistakes > MISTAKES) return fresh;
    done[id] = { won: d.won, mistakes: d.mistakes };
  }
  return { v: 1, done };
}

export function serializeGroupsProgress(p: GroupsProgress): string {
  return JSON.stringify(p);
}

export function recordGroupsResult(p: GroupsProgress, puzzleId: number, s: GroupsState): GroupsProgress {
  if (!s.won && !s.lost) return p;
  return { v: 1, done: { ...p.done, [puzzleId]: { won: s.won, mistakes: MISTAKES - s.mistakesLeft } } };
}
