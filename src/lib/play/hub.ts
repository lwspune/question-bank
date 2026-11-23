import { wrapOffset } from "@/lib/exam/showcaseSlots";
import { LEVELS } from "./levels";
import { isWorldOpen, type RainProgress } from "./rain";
import { MISTAKES, puzzleIndexForDay, type GroupsProgress } from "./groups";
import { PUZZLES } from "./data/wordGroups";
import { dayState, MAX_GUESSES, type DailyProgress } from "./words/daily";
import { LAUNCH_LEVELS, isLaunchOpen, type LaunchProgress } from "./launch";
import { HUNT_WORLDS, isHuntWorldOpen, type HuntProgress } from "./elements";
import type { TimelineProgress } from "./timeline";
import { PLACES_PER_ROUND, type PinProgress } from "./pin";

/**
 * The /play hub (2026-11-17; six subjects and the arcade rebuild 2026-11-18):
 * a 3D ring of subjects; tapping the front card opens a panel with that
 * subject's games. A new subject or game is one more entry here. Pure.
 * Spec: tests/play-hub.test.ts.
 */

export type GameKey = "number_rain" | "word_groups" | "daily_word" | "launch" | "element_hunt" | "timeline" | "pin_it";

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
  /** The card's colour on the dark stage. */
  color: string;
  games: PlayGameCard[];
};

export const PLAY_SUBJECTS: PlaySubject[] = [
  {
    key: "maths",
    name: "Maths",
    face: "7 × 8",
    tagline: "Quick calculation",
    color: "#ffb238",
    games: [{ key: "number_rain", name: "Number Rain", blurb: "Blast falling sums before they land", href: "/play/maths" }],
  },
  {
    key: "english",
    name: "English",
    face: "Aa",
    tagline: "Words from real past papers",
    color: "#3ee6b0",
    games: [
      { key: "word_groups", name: "Word Groups", blurb: "Find four groups of four words", href: "/play/word-groups" },
      { key: "daily_word", name: "Daily Word", blurb: "One past-paper word a day, 6 tries", href: "/play/daily-word" },
    ],
  },
  {
    key: "physics",
    name: "Physics",
    face: "v₀",
    tagline: "Projectiles, g = 10",
    color: "#5cc8ff",
    games: [{ key: "launch", name: "Launch", blurb: "Set angle and speed, hit the target", href: "/play/launch" }],
  },
  {
    key: "chemistry",
    name: "Chemistry",
    face: "Fe",
    tagline: "The periodic table",
    color: "#b48cff",
    games: [{ key: "element_hunt", name: "Element Hunt", blurb: "Find elements on the table, fast", href: "/play/element-hunt" }],
  },
  {
    key: "history",
    name: "History",
    face: "1857",
    tagline: "Events in order",
    color: "#ff8a9a",
    games: [{ key: "timeline", name: "Timeline", blurb: "Put events in order, 3 lives", href: "/play/timeline" }],
  },
  {
    key: "geography",
    name: "Geography",
    face: "28°N",
    tagline: "The map of India",
    color: "#9be15d",
    games: [{ key: "pin_it", name: "Pin It", blurb: "Find places on the India map", href: "/play/pin-it" }],
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

export type SavedPlay = {
  rain: RainProgress;
  groups: GroupsProgress;
  daily: DailyProgress;
  launch: LaunchProgress;
  hunt: HuntProgress;
  timeline: TimelineProgress;
  pin: PinProgress;
};

export function emptySaved(): SavedPlay {
  return {
    rain: { v: 1, best: {} },
    groups: { v: 1, done: {} },
    daily: { v: 1, days: {} },
    launch: { v: 1, stars: {} },
    hunt: { v: 1, best: {} },
    timeline: { v: 1, best: {} },
    pin: { v: 1, best: {} },
  };
}

const plural = (n: number, one: string) => `${n} ${one}${n === 1 ? "" : "s"}`;
const maxOf = (r: Record<string | number, number | undefined>) => Math.max(0, ...Object.values(r).map((v) => v ?? 0));

/** The progress line on a game card, from what the browser saved. */
export function gameStatus(game: GameKey, saved: SavedPlay, today: string): string {
  switch (game) {
    case "number_rain": {
      if (Object.keys(saved.rain.best).length === 0) return "Start in world 1";
      const open = LEVELS.filter((l) => isWorldOpen(saved.rain, l.id)).pop()!;
      return `World ${open.id} open`;
    }
    case "word_groups": {
      const id = PUZZLES[puzzleIndexForDay(today, PUZZLES.length)].id;
      const d = saved.groups.done[id];
      if (!d) return "Today's puzzle: not played";
      if (!d.won) return "Not solved today: new puzzle tomorrow";
      const spare = MISTAKES - d.mistakes;
      return spare === MISTAKES ? "Solved today with no mistakes" : `Solved today with ${spare} mistakes to spare`;
    }
    case "daily_word": {
      const d = dayState(saved.daily, today);
      if (d.solved) return `Solved today in ${d.guesses.length}`;
      if (d.done) return "Not solved today: new word tomorrow";
      if (d.guesses.length > 0) return `${d.guesses.length} of ${MAX_GUESSES} tries used`;
      return "Today's word: not played";
    }
    case "launch": {
      const won = Object.keys(saved.launch.stars).length;
      if (won === 0) return "Start at level 1";
      const stars = Object.values(saved.launch.stars).reduce((a, b) => a + b, 0);
      if (won >= LAUNCH_LEVELS.length) return `All ${LAUNCH_LEVELS.length} levels won · ${plural(stars, "star")}`;
      const open = LAUNCH_LEVELS.filter((l) => isLaunchOpen(saved.launch, l.id)).pop()!;
      return `Level ${open.id} open · ${plural(stars, "star")}`;
    }
    case "element_hunt": {
      if (Object.keys(saved.hunt.best).length === 0) return `Start with ${HUNT_WORLDS[0].name.toLowerCase()}`;
      const open = HUNT_WORLDS.filter((w) => isHuntWorldOpen(saved.hunt, w.id)).pop()!;
      return `${open.name} open · best ${maxOf(saved.hunt.best)}`;
    }
    case "timeline": {
      const best = maxOf(saved.timeline.best);
      return best === 0 ? "Start with Modern India" : `Best: ${plural(best, "card")} placed`;
    }
    case "pin_it": {
      const best = maxOf(saved.pin.best);
      return best === 0 ? "Five places a round" : `Best: ${best.toLocaleString("en-IN")} of ${(PLACES_PER_ROUND * 1000).toLocaleString("en-IN")}`;
    }
  }
}
