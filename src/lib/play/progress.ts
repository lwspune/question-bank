import { LEVELS, levelById, type LevelId } from "./levels";
import type { RunResult } from "./run";

/**
 * /play progress, kept in the browser (localStorage) for everyone, signed in
 * or not: levels cleared and the best round per level, with its timings for
 * the ghost. Per device by design; a lost copy only means replaying level 1.
 * Anything that fails to parse is a fresh start, never an error.
 */

export const PROGRESS_KEY = "pyqv-play-v1";

export type LevelBest = { points: number; correct: number; times: number[] };

export type Progress = {
  v: 1;
  cleared: LevelId[];
  best: Partial<Record<LevelId, LevelBest>>;
};

export function emptyProgress(): Progress {
  return { v: 1, cleared: [], best: {} };
}

const isCount = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v) && v >= 0;

function parseBest(v: unknown): LevelBest | null {
  if (typeof v !== "object" || v === null) return null;
  const o = v as Record<string, unknown>;
  if (!isCount(o.points) || !isCount(o.correct) || !Array.isArray(o.times) || !o.times.every(isCount)) return null;
  return { points: o.points, correct: o.correct, times: o.times as number[] };
}

export function parseProgress(raw: string | null): Progress {
  if (!raw) return emptyProgress();
  let o: unknown;
  try {
    o = JSON.parse(raw);
  } catch {
    return emptyProgress();
  }
  if (typeof o !== "object" || o === null || Array.isArray(o)) return emptyProgress();
  const r = o as Record<string, unknown>;
  if (r.v !== 1 || !Array.isArray(r.cleared) || typeof r.best !== "object" || r.best === null) return emptyProgress();
  if (!r.cleared.every((x) => typeof x === "number")) return emptyProgress();

  const best: Progress["best"] = {};
  for (const [k, v] of Object.entries(r.best as Record<string, unknown>)) {
    const level = levelById(Number(k));
    if (!level) continue;
    const b = parseBest(v);
    if (!b) return emptyProgress();
    best[level.id] = b;
  }
  const cleared = (r.cleared as number[]).flatMap((x) => {
    const l = levelById(x);
    return l ? [l.id] : [];
  });
  return { v: 1, cleared, best };
}

export function serializeProgress(p: Progress): string {
  return JSON.stringify(p);
}

export function isUnlocked(p: Progress, level: LevelId): boolean {
  return level === 1 || p.cleared.includes((level - 1) as LevelId);
}

/** Fold a finished round into progress. `unlocked` is a level opened by THIS round. */
export function recordResult(
  p: Progress,
  r: RunResult
): { progress: Progress; newBest: boolean; unlocked: LevelId | null } {
  const prev = p.best[r.level];
  const newBest = r.correct > 0 && (!prev || r.points > prev.points);
  const best = newBest ? { ...p.best, [r.level]: { points: r.points, correct: r.correct, times: r.correctTimes } } : p.best;

  const firstClear = r.cleared && !p.cleared.includes(r.level);
  const cleared = firstClear ? [...p.cleared, r.level] : p.cleared;
  const next = levelById(r.level + 1);
  const unlocked = firstClear && next && !isUnlocked(p, next.id) ? next.id : null;

  return { progress: { v: 1, cleared, best }, newBest, unlocked };
}

export const LEVEL_COUNT = LEVELS.length;
