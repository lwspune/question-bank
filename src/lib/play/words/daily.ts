import type { WordEntry } from "./extract";

/**
 * Daily Word (2026-11-17), the idea taken from Wordle without its streak: one
 * past-paper word a day, the same for everyone, 6 tries, a clue (the
 * question's right answer) after 2, and a grid to share. Marks are b (right
 * place, drawn blue), o (elsewhere in the word, orange) and g (not in it,
 * grey): blue and orange so colour-blind students can tell them apart.
 * Guesses are not checked against a dictionary. Spec:
 * tests/play-daily-word.test.ts.
 */

export type Mark = "b" | "o" | "g";

export const CLUE_AFTER = 2;
export const MAX_GUESSES = 6;
export const KEEP_DAYS = 30;
export const DAILY_KEY = "pyqv-daily-word-v1";

export function scoreGuess(guess: string, answer: string): Mark[] {
  const g = guess.toLowerCase().split("");
  const a = answer.toLowerCase().split("");
  const marks: Mark[] = g.map(() => "g");
  const left = new Map<string, number>();
  a.forEach((ch, i) => {
    if (g[i] === ch) marks[i] = "b";
    else left.set(ch, (left.get(ch) ?? 0) + 1);
  });
  g.forEach((ch, i) => {
    if (marks[i] === "b") return;
    const n = left.get(ch) ?? 0;
    if (n > 0) {
      marks[i] = "o";
      left.set(ch, n - 1);
    }
  });
  return marks;
}

const RANK: Record<Mark, number> = { g: 0, o: 1, b: 2 };

/** Each guessed letter's best mark, for the keyboard. */
export function keyMarks(guesses: string[], answer: string): Record<string, Mark> {
  const out: Record<string, Mark> = {};
  for (const guess of guesses) {
    scoreGuess(guess, answer).forEach((m, i) => {
      const ch = guess[i].toLowerCase();
      if (!(ch in out) || RANK[m] > RANK[out[ch]]) out[ch] = m;
    });
  }
  return out;
}

export function isDailyCandidate(e: WordEntry): boolean {
  return /^[a-z]{5,6}$/.test(e.word);
}

/** FNV-1a: a fixed shuffle of the word list that never depends on its order. */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

/** The day's word: the same for everyone, every word once before any repeats. */
export function dailyWord(pool: WordEntry[], day: string): WordEntry | null {
  const seen = new Set<string>();
  const list = pool
    .filter((e) => isDailyCandidate(e) && !seen.has(e.word) && seen.add(e.word))
    .sort((x, y) => hash(x.word) - hash(y.word) || (x.word < y.word ? -1 : 1));
  if (list.length === 0) return null;
  const n = Math.floor(Date.parse(`${day}T00:00:00Z`) / 86_400_000);
  return list[((n % list.length) + list.length) % list.length];
}

export function isValidGuess(guess: string, length: number): boolean {
  return guess.length === length && /^[a-z]+$/i.test(guess);
}

export type DayState = { guesses: string[]; done: boolean; solved: boolean };
export type DailyProgress = { v: 1; days: Record<string, DayState> };

export function emptyDaily(): DailyProgress {
  return { v: 1, days: {} };
}

export function dayState(p: DailyProgress, day: string): DayState {
  return p.days[day] ?? { guesses: [], done: false, solved: false };
}

export function recordGuess(
  p: DailyProgress,
  day: string,
  guess: string,
  answer: string
): { ok: boolean; progress: DailyProgress } {
  const cur = dayState(p, day);
  const g = guess.toLowerCase();
  if (cur.done || !isValidGuess(g, answer.length)) return { ok: false, progress: p };
  const guesses = [...cur.guesses, g];
  const solved = g === answer.toLowerCase();
  const next: DayState = { guesses, solved, done: solved || guesses.length >= MAX_GUESSES };
  const days = { ...p.days, [day]: next };
  const kept = Object.keys(days).sort().slice(-KEEP_DAYS);
  return { ok: true, progress: { v: 1, days: Object.fromEntries(kept.map((d) => [d, days[d]])) } };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function shortDate(day: string): string {
  const [, m, d] = day.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]}`;
}

const SQUARE: Record<Mark, string> = { b: "🟩", o: "🟧", g: "⬛" };

export function shareText(day: string, guesses: string[], answer: string, solved: boolean): string {
  return [
    `PYQ Vault Daily Word, ${shortDate(day)}: ${solved ? guesses.length : "X"}/${MAX_GUESSES}`,
    ...guesses.map((g) => scoreGuess(g, answer).map((m) => SQUARE[m]).join("")),
    "www.pyqvault.com/play/daily-word",
  ].join("\n");
}

export function parseDaily(raw: string | null): DailyProgress {
  if (!raw) return emptyDaily();
  let o: unknown;
  try {
    o = JSON.parse(raw);
  } catch {
    return emptyDaily();
  }
  if (typeof o !== "object" || o === null || Array.isArray(o)) return emptyDaily();
  const r = o as Record<string, unknown>;
  if (r.v !== 1 || typeof r.days !== "object" || r.days === null || Array.isArray(r.days)) return emptyDaily();
  const days: Record<string, DayState> = {};
  for (const [k, v] of Object.entries(r.days as Record<string, unknown>)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(k) || typeof v !== "object" || v === null) return emptyDaily();
    const s = v as Record<string, unknown>;
    if (!Array.isArray(s.guesses) || !s.guesses.every((g) => typeof g === "string" && /^[a-z]+$/.test(g))) return emptyDaily();
    if (typeof s.done !== "boolean" || typeof s.solved !== "boolean") return emptyDaily();
    days[k] = { guesses: s.guesses as string[], done: s.done, solved: s.solved };
  }
  return { v: 1, days };
}

export function serializeDaily(p: DailyProgress): string {
  return JSON.stringify(p);
}

export type Clue = { kind: "sentence" | "meaning"; text: string };

/**
 * The clue after 2 guesses: the exam's own sentence with the word taken out,
 * when the question has one, so the follow-up exam question is still a real
 * question; the meaning (its right answer) only when there is no sentence.
 */
export function clueFor(e: WordEntry): Clue {
  if (e.sentence) {
    const w = e.word.replace(/[^a-z]/g, "");
    const marked = new RegExp(
      String.raw`\\\(\\underline\{\\text(?:it)?\{\s*${w}\s*\}\}\\\)|\*\*\s*${w}\s*\*\*`,
      "gi"
    );
    const text = e.sentence.replace(marked, "[?]");
    if (text !== e.sentence && !new RegExp(`\b${w}\b`, "i").test(text)) return { kind: "sentence", text };
  }
  const ans = e.options[e.answer];
  return {
    kind: "meaning",
    text: e.kind === "synonym" ? `It means much the same as "${ans}".` : `It is the opposite of "${ans}".`,
  };
}
