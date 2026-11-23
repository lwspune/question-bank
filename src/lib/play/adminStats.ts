/**
 * /dashboard/play: who is playing the /play games and how the levels are
 * pitched, from `user_activity` play_round rows (migration 0267). Pure: the
 * loader (adminQuery.ts) reads the rows, this turns them into the page's
 * numbers. Spec: tests/play-admin-stats.test.ts.
 *
 * Signed-in rounds only: a signed-out round writes no row (Vercel's
 * play_round_end counts those). Staff are left out by the loader, not here.
 *
 * The study before/after numbers are scripts/play/readout.sql's, the
 * play-games experiment's own question: study DAYS (India time) in the 7 days
 * before a player's first round vs the 7 days after it, the first round's day
 * counting as after; only players whose 7 days after have passed are compared.
 */
import { LEVELS, levelById, type LevelId } from "@/lib/play/levels";

/** The study kinds the readout counts (never play_round: playing is not studying). */
export const STUDY_KINDS = [
  "mock_submitted",
  "question_practiced",
  "drill_started",
  "drill_completed",
  "note_checkpoint",
] as const;

export type PlayGame =
  | "maths"
  | "word_builder"
  | "daily_word"
  | "number_rain"
  | "word_groups"
  | "launch"
  | "element_hunt"
  | "timeline"
  | "pin_it"
  | "other";

/** maths and word_builder are the retired games (to 2026-11-18); their rows stay readable. */
export const GAME_LABEL: Record<PlayGame, string> = {
  maths: "Calculation (old)",
  word_builder: "Word Builder (old)",
  daily_word: "Daily Word",
  number_rain: "Number Rain",
  word_groups: "Word Groups",
  launch: "Launch",
  element_hunt: "Element Hunt",
  timeline: "Timeline",
  pin_it: "Pin It",
  other: "Other",
};

const KNOWN_GAMES = new Set<string>(["word_builder", "daily_word", "number_rain", "word_groups", "launch", "element_hunt", "timeline", "pin_it"]);

export type PlayRoundRow = { userId: string; createdAt: string; metadata: Record<string, unknown> | null };
export type StudyRow = { userId: string; createdAt: string };

/** Under this many first tries a level gets no easy/hard hint. */
export const HINT_MIN_FIRST_TRIES = 5;
/** First tries that clear at this share or more: the target looks low. */
export const EASY_FIRST_TRY_PCT = 80;
/** Rounds that clear under this share: the target looks high. */
export const HARD_CLEAR_PCT = 20;
export const PER_DAY_DAYS = 28;
export const RECENT_ROUNDS = 50;

const DAY_MS = 86_400_000;
const IST_OFFSET_MS = 5.5 * 3_600_000;
const WEEK_MS = 7 * DAY_MS;

/** YYYY-MM-DD in India time. */
function istDay(ms: number): string {
  return new Date(ms + IST_OFFSET_MS).toISOString().slice(0, 10);
}

/** Midnight in India for the day `ms` falls on, as epoch ms. */
function istDayStart(ms: number): number {
  return Date.parse(`${istDay(ms)}T00:00:00Z`) - IST_OFFSET_MS;
}

/** Rows written before the /play hub carry no `game`: those are the maths game. */
export function gameOf(meta: Record<string, unknown> | null | undefined): PlayGame {
  const g = meta?.game;
  if (g === undefined || g === null) return "maths";
  if (typeof g === "string" && KNOWN_GAMES.has(g)) return g as PlayGame;
  return "other";
}

function num(v: unknown): number | null {
  return typeof v === "number" && Number.isFinite(v) ? v : null;
}

function median(xs: number[]): number | null {
  if (xs.length === 0) return null;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function pct(part: number, whole: number): number | null {
  return whole > 0 ? Math.round((100 * part) / whole) : null;
}

export type LevelStats = {
  id: LevelId;
  name: string;
  target: number;
  rounds: number;
  players: number;
  cleared: number;
  clearedPct: number | null;
  firstTries: number;
  firstTryCleared: number;
  firstTryClearPct: number | null;
  medianCorrect: number | null;
  medianAccuracyPct: number | null;
  hint: "easy" | "hard" | null;
};

export type PlayerStats = {
  userId: string;
  name: string;
  firstRoundAt: string;
  lastRoundAt: string;
  rounds: number;
  days: number;
  games: PlayGame[];
  topLevel: number | null;
  levelsCleared: number;
  studyBefore: number;
  studyAfter: number;
  weekAfterDone: boolean;
};

export type RecentRound = {
  at: string;
  userId: string;
  name: string;
  game: PlayGame;
  result: string;
  /** Maths: cleared the level; Daily Word: solved; Word Builder: null. */
  cleared: boolean | null;
};

export type PlayStats = {
  summary: {
    players: number;
    rounds: number;
    roundsToday: number;
    playersToday: number;
    cameBack: number;
    lastRoundAt: string | null;
  };
  games: { game: PlayGame; label: string; rounds: number; players: number }[];
  levels: LevelStats[];
  wordBuilder: { rounds: number; medianCorrect: number | null; mastered: number };
  dailyWord: { rounds: number; solved: number; solvedPct: number | null; medianGuesses: number | null };
  perDay: { day: string; rounds: number; players: number }[];
  players: PlayerStats[];
  recent: RecentRound[];
  experiment: {
    players: number;
    compared: number;
    medianBefore: number | null;
    medianAfter: number | null;
    studiedMore: number;
    studiedLess: number;
    cameBackPct: number | null;
  };
};

type Round = PlayRoundRow & { ms: number; game: PlayGame };

function resultLine(r: Round): { result: string; cleared: boolean | null } {
  const m = r.metadata ?? {};
  if (r.game === "maths") {
    return {
      result: `Level ${num(m.level) ?? "?"} · ${num(m.correct) ?? 0} right, ${num(m.wrong) ?? 0} wrong`,
      cleared: m.cleared === true,
    };
  }
  if (r.game === "word_builder") {
    return {
      result: `${num(m.correct) ?? 0} right first try, ${num(m.wrong) ?? 0} wrong · ${num(m.mastered) ?? 0} mastered`,
      cleared: null,
    };
  }
  if (r.game === "daily_word") {
    const g = num(m.guesses) ?? 0;
    return m.solved === true
      ? { result: `Solved in ${g} ${g === 1 ? "guess" : "guesses"}`, cleared: true }
      : { result: `Not solved in ${g} guesses`, cleared: false };
  }
  if (r.game === "number_rain") return { result: `World ${num(m.world) ?? "?"} · ${num(m.score) ?? 0} points, ${num(m.blasts) ?? 0} blasted`, cleared: null };
  if (r.game === "word_groups") return { result: `Puzzle ${num(m.puzzle) ?? "?"} · ${num(m.mistakes) ?? 0} mistakes`, cleared: m.won === true };
  if (r.game === "launch") return { result: `Level ${num(m.level) ?? "?"} · ${num(m.shots) ?? 0} shots`, cleared: m.hit === true };
  if (r.game === "element_hunt")
    return { result: `World ${num(m.world) ?? "?"} · ${num(m.score) ?? 0} points, ${num(m.right) ?? 0} right, ${num(m.wrong) ?? 0} wrong`, cleared: null };
  if (r.game === "timeline") return { result: `${String(m.pack ?? "?")} · ${num(m.placed) ?? 0} placed`, cleared: m.won === true };
  if (r.game === "pin_it") return { result: `${String(m.pack ?? "?")} · ${num(m.score) ?? 0} of 5,000`, cleared: null };
  return { result: "A round", cleared: null };
}

export function buildPlayStats(input: {
  rounds: PlayRoundRow[];
  study: StudyRow[];
  names: ReadonlyMap<string, string>;
  now: Date;
}): PlayStats {
  const nowMs = input.now.getTime();
  const today = istDay(nowMs);
  const nameOf = (id: string) => input.names.get(id) ?? `Student ${id.slice(0, 8)}`;

  const rounds: Round[] = input.rounds
    .map((r) => ({ ...r, ms: Date.parse(r.createdAt), game: gameOf(r.metadata) }))
    .filter((r) => Number.isFinite(r.ms))
    .sort((a, b) => a.ms - b.ms);

  // --- per player ----------------------------------------------------------
  const byUser = new Map<string, Round[]>();
  for (const r of rounds) {
    const list = byUser.get(r.userId) ?? [];
    list.push(r);
    byUser.set(r.userId, list);
  }

  const studyByUser = new Map<string, number[]>();
  for (const s of input.study) {
    const ms = Date.parse(s.createdAt);
    if (!Number.isFinite(ms)) continue;
    const list = studyByUser.get(s.userId) ?? [];
    list.push(ms);
    studyByUser.set(s.userId, list);
  }

  const players: PlayerStats[] = [];
  for (const [userId, list] of byUser) {
    const first = list[0].ms;
    const firstDayStart = istDayStart(first);
    const before = new Set<string>();
    const after = new Set<string>();
    for (const ms of studyByUser.get(userId) ?? []) {
      if (ms >= first - WEEK_MS && ms < firstDayStart) before.add(istDay(ms));
      else if (ms >= firstDayStart && ms < first + WEEK_MS) after.add(istDay(ms));
    }
    const mathsRounds = list.filter((r) => r.game === "maths");
    const levels = mathsRounds.map((r) => levelById(r.metadata?.level)?.id).filter((x): x is LevelId => !!x);
    const cleared = new Set(
      mathsRounds.filter((r) => r.metadata?.cleared === true).map((r) => levelById(r.metadata?.level)?.id).filter(Boolean)
    );
    const games: PlayGame[] = [];
    for (const r of list) if (!games.includes(r.game)) games.push(r.game);
    players.push({
      userId,
      name: nameOf(userId),
      firstRoundAt: list[0].createdAt,
      lastRoundAt: list[list.length - 1].createdAt,
      rounds: list.length,
      days: new Set(list.map((r) => istDay(r.ms))).size,
      games,
      topLevel: levels.length ? Math.max(...levels) : null,
      levelsCleared: cleared.size,
      studyBefore: before.size,
      studyAfter: after.size,
      weekAfterDone: first + WEEK_MS <= nowMs,
    });
  }
  players.sort((a, b) => Date.parse(b.lastRoundAt) - Date.parse(a.lastRoundAt));

  // --- levels (maths) --------------------------------------------------------
  const levels: LevelStats[] = LEVELS.map((level) => {
    const lr = rounds.filter((r) => r.game === "maths" && levelById(r.metadata?.level)?.id === level.id);
    const firstTry = new Map<string, Round>();
    for (const r of lr) if (!firstTry.has(r.userId)) firstTry.set(r.userId, r);
    const cleared = lr.filter((r) => r.metadata?.cleared === true).length;
    const firstTryCleared = [...firstTry.values()].filter((r) => r.metadata?.cleared === true).length;
    const correct = lr.map((r) => num(r.metadata?.correct) ?? 0);
    const accuracy = lr
      .map((r) => {
        const c = num(r.metadata?.correct) ?? 0;
        const w = num(r.metadata?.wrong) ?? 0;
        return c + w > 0 ? (100 * c) / (c + w) : null;
      })
      .filter((x): x is number => x !== null);
    const clearedPct = pct(cleared, lr.length);
    const firstTryClearPct = pct(firstTryCleared, firstTry.size);
    const medAcc = median(accuracy);
    let hint: LevelStats["hint"] = null;
    if (firstTry.size >= HINT_MIN_FIRST_TRIES) {
      if ((firstTryClearPct ?? 0) >= EASY_FIRST_TRY_PCT) hint = "easy";
      else if ((clearedPct ?? 0) < HARD_CLEAR_PCT) hint = "hard";
    }
    return {
      id: level.id,
      name: level.name,
      target: level.target,
      rounds: lr.length,
      players: new Set(lr.map((r) => r.userId)).size,
      cleared,
      clearedPct,
      firstTries: firstTry.size,
      firstTryCleared,
      firstTryClearPct,
      medianCorrect: median(correct),
      medianAccuracyPct: medAcc === null ? null : Math.round(medAcc),
      hint,
    };
  });

  // --- games -----------------------------------------------------------------
  const order: PlayGame[] = [
    "number_rain",
    "word_groups",
    "daily_word",
    "launch",
    "element_hunt",
    "timeline",
    "pin_it",
    "maths",
    "word_builder",
    "other",
  ];
  const games = order
    .map((game) => {
      const gr = rounds.filter((r) => r.game === game);
      return { game, label: GAME_LABEL[game], rounds: gr.length, players: new Set(gr.map((r) => r.userId)).size };
    })
    .filter((g) => g.rounds > 0);

  const wb = rounds.filter((r) => r.game === "word_builder");
  const dw = rounds.filter((r) => r.game === "daily_word");
  const dwSolved = dw.filter((r) => r.metadata?.solved === true);

  // --- per day ---------------------------------------------------------------
  const dayRounds = new Map<string, { rounds: number; players: Set<string> }>();
  for (const r of rounds) {
    const d = istDay(r.ms);
    const e = dayRounds.get(d) ?? { rounds: 0, players: new Set<string>() };
    e.rounds++;
    e.players.add(r.userId);
    dayRounds.set(d, e);
  }
  const perDay = Array.from({ length: PER_DAY_DAYS }, (_, i) => {
    const day = istDay(nowMs - i * DAY_MS);
    const e = dayRounds.get(day);
    return { day, rounds: e?.rounds ?? 0, players: e?.players.size ?? 0 };
  });

  // --- recent ----------------------------------------------------------------
  const recent: RecentRound[] = rounds
    .slice(-RECENT_ROUNDS)
    .reverse()
    .map((r) => ({ at: r.createdAt, userId: r.userId, name: nameOf(r.userId), game: r.game, ...resultLine(r) }));

  // --- summary + experiment --------------------------------------------------
  const todayRounds = rounds.filter((r) => istDay(r.ms) === today);
  const cameBack = players.filter((p) => p.days >= 2).length;
  const compared = players.filter((p) => p.weekAfterDone);

  return {
    summary: {
      players: players.length,
      rounds: rounds.length,
      roundsToday: todayRounds.length,
      playersToday: new Set(todayRounds.map((r) => r.userId)).size,
      cameBack,
      lastRoundAt: rounds.length ? rounds[rounds.length - 1].createdAt : null,
    },
    games,
    levels,
    wordBuilder: {
      rounds: wb.length,
      medianCorrect: median(wb.map((r) => num(r.metadata?.correct) ?? 0)),
      mastered: wb.reduce((n, r) => n + (num(r.metadata?.mastered) ?? 0), 0),
    },
    dailyWord: {
      rounds: dw.length,
      solved: dwSolved.length,
      solvedPct: pct(dwSolved.length, dw.length),
      medianGuesses: median(dwSolved.map((r) => num(r.metadata?.guesses) ?? 0)),
    },
    perDay,
    players,
    recent,
    experiment: {
      players: players.length,
      compared: compared.length,
      medianBefore: median(compared.map((p) => p.studyBefore)),
      medianAfter: median(compared.map((p) => p.studyAfter)),
      studiedMore: compared.filter((p) => p.studyAfter > p.studyBefore).length,
      studiedLess: compared.filter((p) => p.studyAfter < p.studyBefore).length,
      cameBackPct: pct(cameBack, players.length),
    },
  };
}
