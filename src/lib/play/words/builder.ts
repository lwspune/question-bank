import type { Rng } from "@/lib/play/generate";
import type { WordEntry, WordGroup } from "./extract";

/**
 * Word Builder (2026-11-17), the idea taken from Vocabulary.com without its
 * leaderboard: each word is tracked on its own, a miss comes back at the end
 * of the round and again the next day, and a word is mastered once it is
 * right on 3 different days. Progress lives in the browser like /play's
 * (per device by design). Days are India dates. Spec:
 * tests/play-word-builder.test.ts.
 */

export const MASTERY_DAYS = 3;
export const ROUND_SIZE = 10;
export const BUILDER_KEY = "pyqv-words-v1";

/** The chips: "all" also takes in the few words from other exams (MPSC and the like). */
export type GroupChoice = "all" | Exclude<WordGroup, "other">;
export const GROUP_CHOICES: GroupChoice[] = ["all", "ssc", "nda", "cds"];

export type WordState = {
  /** The India day the word was first answered. */
  first: string;
  /** The India day it was last answered. */
  last: string;
  /** The distinct India days it was right, oldest first. */
  right: string[];
  misses: number;
  /** When it comes back; null once mastered. */
  due: string | null;
};

export type BuilderProgress = { v: 1; group: GroupChoice; words: Record<string, WordState> };

const DAY_MS = 86_400_000;
const IST_MS = 330 * 60_000;
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

export function istDay(now: Date): string {
  return new Date(now.getTime() + IST_MS).toISOString().slice(0, 10);
}

export function addDays(day: string, n: number): string {
  return new Date(Date.parse(`${day}T00:00:00Z`) + n * DAY_MS).toISOString().slice(0, 10);
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export function weekdayName(day: string): string {
  return WEEKDAYS[new Date(`${day}T00:00:00Z`).getUTCDay()];
}

export function emptyBuilder(): BuilderProgress {
  return { v: 1, group: "all", words: {} };
}

export function isMastered(s: WordState): boolean {
  return s.right.length >= MASTERY_DAYS;
}

/**
 * Record a word's answer. Only the first answer of a day counts: a second
 * try the same day (the round's re-ask, or a replay) changes nothing.
 */
export function recordAnswer(
  p: BuilderProgress,
  word: string,
  correct: boolean,
  today: string
): { progress: BuilderProgress; counted: boolean } {
  const cur = p.words[word];
  if (cur && cur.last === today) return { progress: p, counted: false };

  const right = correct && !cur?.right.includes(today) ? [...(cur?.right ?? []), today] : [...(cur?.right ?? [])];
  const next: WordState = {
    first: cur?.first ?? today,
    last: today,
    right,
    misses: (cur?.misses ?? 0) + (correct ? 0 : 1),
    due: null,
  };
  if (!isMastered(next)) next.due = correct ? addDays(today, right.length === 1 ? 2 : 4) : addDays(today, 1);
  return { progress: { ...p, words: { ...p.words, [word]: next } }, counted: true };
}

export function isDue(s: WordState, today: string): boolean {
  return !isMastered(s) && s.due !== null && s.due <= today && s.last !== today;
}

export function dueCount(p: BuilderProgress, today: string): number {
  return Object.values(p.words).filter((s) => isDue(s, today)).length;
}

/** A round: due words (oldest due first), then new words in a random order. */
export function pickRound(pool: WordEntry[], p: BuilderProgress, today: string, rng: Rng, size = ROUND_SIZE): WordEntry[] {
  const due = pool
    .filter((e) => p.words[e.word] && isDue(p.words[e.word], today))
    .sort((a, b) => {
      const da = p.words[a.word].due!;
      const db = p.words[b.word].due!;
      return da < db ? -1 : da > db ? 1 : a.word < b.word ? -1 : 1;
    });
  const fresh = pool.filter((e) => !p.words[e.word]);
  for (let i = fresh.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [fresh[i], fresh[j]] = [fresh[j], fresh[i]];
  }
  return [...due, ...fresh].slice(0, size);
}

export type RoundState = {
  /** Word keys still to ask, front first. */
  queue: string[];
  /** Words already sent to the back once. */
  requeued: string[];
  /** Whether each word was right the first time it was asked. */
  firstTry: Record<string, boolean>;
  answers: number;
};

export function startRound(words: string[]): RoundState {
  return { queue: [...words], requeued: [], firstTry: {}, answers: 0 };
}

/** Answer the word at the front; a first miss sends it to the back once. */
export function answerInRound(r: RoundState, correct: boolean): RoundState {
  const [word, ...rest] = r.queue;
  if (word === undefined) return r;
  const firstTry = word in r.firstTry ? r.firstTry : { ...r.firstTry, [word]: correct };
  const again = !correct && !r.requeued.includes(word);
  return {
    queue: again ? [...rest, word] : rest,
    requeued: again ? [...r.requeued, word] : r.requeued,
    firstTry,
    answers: r.answers + 1,
  };
}

export type WordStatus = "New" | "Learning" | "Mastered";

export function wordStatus(s: WordState, today: string): WordStatus {
  if (isMastered(s)) return "Mastered";
  return s.first === today ? "New" : "Learning";
}

const isCount = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v) && v >= 0;
const isDay = (v: unknown): v is string => typeof v === "string" && DAY_RE.test(v);

function parseState(v: unknown): WordState | null {
  if (typeof v !== "object" || v === null) return null;
  const o = v as Record<string, unknown>;
  if (!isDay(o.first) || !isDay(o.last) || !isCount(o.misses)) return null;
  if (!Array.isArray(o.right) || !o.right.every(isDay)) return null;
  if (!(o.due === null || isDay(o.due))) return null;
  return { first: o.first, last: o.last, right: o.right as string[], misses: o.misses, due: o.due as string | null };
}

export function parseBuilder(raw: string | null): BuilderProgress {
  if (!raw) return emptyBuilder();
  let o: unknown;
  try {
    o = JSON.parse(raw);
  } catch {
    return emptyBuilder();
  }
  if (typeof o !== "object" || o === null || Array.isArray(o)) return emptyBuilder();
  const r = o as Record<string, unknown>;
  if (r.v !== 1 || !GROUP_CHOICES.includes(r.group as GroupChoice)) return emptyBuilder();
  if (typeof r.words !== "object" || r.words === null || Array.isArray(r.words)) return emptyBuilder();
  const words: Record<string, WordState> = {};
  for (const [k, v] of Object.entries(r.words as Record<string, unknown>)) {
    const s = parseState(v);
    if (s && /^[a-z]+$/.test(k)) words[k] = s;
  }
  return { v: 1, group: r.group as GroupChoice, words };
}

export function serializeBuilder(p: BuilderProgress): string {
  return JSON.stringify(p);
}
