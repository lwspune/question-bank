import { wrapOffset } from "@/lib/exam/showcaseSlots";
import { LEVELS } from "./levels";
import { isUnlocked, type Progress } from "./progress";
import { dueCount, isMastered, type BuilderProgress } from "./words/builder";
import { dayState, MAX_GUESSES, type DailyProgress } from "./words/daily";

/**
 * The /play hub (2026-11-17): a 3D ring of subjects (the homepage ring's look,
 * owner's pick over a row per subject), and the chosen subject's games below
 * it. A new subject is one more entry here. Pure. Spec: tests/play-hub.test.ts.
 */

export type GameKey = "maths" | "word_builder" | "daily_word";

export type PlayGameCard = {
  key: GameKey;
  name: string;
  blurb: string;
  href: string;
};

export type PlaySubject = {
  key: string;
  name: string;
  /** The big text on the ring card. */
  face: string;
  tagline: string;
  games: PlayGameCard[];
};

export const PLAY_SUBJECTS: PlaySubject[] = [
  {
    key: "maths",
    name: "Maths",
    face: "7 × 8",
    tagline: "Quick calculation",
    games: [{ key: "maths", name: "Speed game", blurb: "60-second rounds of quick sums", href: "/play/maths" }],
  },
  {
    key: "english",
    name: "English",
    face: "Aa",
    tagline: "Words from real past papers",
    games: [
      { key: "word_builder", name: "Word Builder", blurb: "Real exam words until you know them", href: "/play/word-builder" },
      { key: "daily_word", name: "Daily Word", blurb: "One exam word a day, 6 tries", href: "/play/daily-word" },
    ],
  },
];

export const HUB_SUBJECT_KEY = "pyqv-play-subject";

export function subjectIndex(key: string | null): number {
  const i = PLAY_SUBJECTS.findIndex((s) => s.key === key);
  return i < 0 ? 0 : i;
}

/** How many times the subject list is drawn so the ring shows at least 4 cards. */
export function ringCopies(n: number): number {
  return n >= 4 ? 1 : Math.ceil(4 / Math.max(1, n));
}

export function realIndex(v: number, n: number): number {
  return ((v % n) + n) % n;
}

/** The drawn copy of subject `want` closest to card `from`; ties go forward. */
export function nearestVirtual(from: number, want: number, n: number, total: number): number {
  let best = -1;
  let bestD = Infinity;
  for (let v = 0; v < total; v++) {
    if (realIndex(v, n) !== want) continue;
    const d = wrapOffset(v, from, total);
    const a = Math.abs(d);
    if (a < bestD || (a === bestD && d > 0)) {
      best = v;
      bestD = a;
    }
  }
  return best;
}

export type SavedPlay = { maths: Progress; builder: BuilderProgress; daily: DailyProgress };

const plural = (n: number, one: string) => `${n} ${one}${n === 1 ? "" : "s"}`;

/** The progress line on a game card, from what the browser saved. */
export function gameStatus(game: GameKey, saved: SavedPlay, today: string): string {
  if (game === "maths") {
    if (saved.maths.cleared.length === 0) return "Start at level 1";
    if (LEVELS.every((l) => saved.maths.cleared.includes(l.id))) return `All ${LEVELS.length} levels cleared`;
    const open = LEVELS.filter((l) => isUnlocked(saved.maths, l.id)).pop()!;
    return `Level ${open.id} open`;
  }
  if (game === "word_builder") {
    const states = Object.values(saved.builder.words);
    if (states.length === 0) return "Start your first round";
    const due = dueCount(saved.builder, today);
    if (due > 0) return `${plural(due, "word")} due`;
    const learning = states.filter((s) => !isMastered(s)).length;
    if (learning > 0) return `${plural(learning, "word")} learning, none due`;
    return `${plural(states.length, "word")} mastered`;
  }
  const d = dayState(saved.daily, today);
  if (d.solved) return `Solved today in ${d.guesses.length}`;
  if (d.done) return "Not solved today: new word tomorrow";
  if (d.guesses.length > 0) return `${d.guesses.length} of ${MAX_GUESSES} tries used`;
  return "Today's word: not played";
}
