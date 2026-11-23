import { describe, it, expect } from "vitest";
import { parseClientEvent } from "@/lib/activity/clientEvents";
import { isActivityKind } from "@/lib/activity/events";
import { LEVELS } from "@/lib/play/levels";

const NOW = new Date("2026-11-16T10:00:00Z");
const ok = { kind: "play_round", level: 2, correct: 18, wrong: 2, points: 260, cleared: false };

describe("play_round (a finished /play round, signed in)", () => {
  it("is an activity kind", () => {
    expect(isActivityKind("play_round")).toBe(true);
  });

  it("records the level, counts, points and whether it cleared, with no dedupe (each round is its own)", () => {
    const r = parseClientEvent(ok, "u1", NOW);
    expect(r).toEqual({
      ok: true,
      value: { kind: "play_round", metadata: { level: 2, correct: 18, wrong: 2, points: 260, cleared: false } },
    });
  });

  it("accepts every real level and nothing else", () => {
    for (const l of LEVELS) expect(parseClientEvent({ ...ok, level: l.id }, "u1", NOW).ok).toBe(true);
    for (const level of [0, LEVELS.length + 1, 1.5, "2", null]) {
      expect(parseClientEvent({ ...ok, level }, "u1", NOW).ok).toBe(false);
    }
  });

  it("rejects counts a 60-second round cannot produce", () => {
    for (const bad of [{ correct: -1 }, { correct: 201 }, { wrong: 201 }, { correct: 2.5 }, { points: 20001 }, { points: "9" }]) {
      expect(parseClientEvent({ ...ok, ...bad }, "u1", NOW).ok).toBe(false);
    }
  });

  it("needs cleared to be a boolean", () => {
    expect(parseClientEvent({ ...ok, cleared: "yes" }, "u1", NOW).ok).toBe(false);
    expect(parseClientEvent({ ...ok, cleared: undefined }, "u1", NOW).ok).toBe(false);
  });

  it("carries nothing else", () => {
    expect(parseClientEvent({ ...ok, surface: "start" }, "u1", NOW).ok).toBe(false);
  });

  it("a maths round never carries a game field, so rows from before and after the hub read the same", () => {
    expect(parseClientEvent({ ...ok, game: "maths" }, "u1", NOW).ok).toBe(false);
  });
});

describe("play_round for the English games (2026-11-17)", () => {
  const wb = { kind: "play_round", game: "word_builder", correct: 7, wrong: 3, mastered: 1 };
  const dw = { kind: "play_round", game: "daily_word", solved: true, guesses: 3 };

  it("records a Word Builder round: first-try right and wrong, and words mastered", () => {
    expect(parseClientEvent(wb, "u1", NOW)).toEqual({
      ok: true,
      value: { kind: "play_round", metadata: { game: "word_builder", correct: 7, wrong: 3, mastered: 1 } },
    });
  });

  it("refuses Word Builder counts a 10-word round cannot reach", () => {
    for (const bad of [{ correct: 11 }, { wrong: -1 }, { correct: 6, wrong: 5 }, { mastered: 11 }, { mastered: 1.5 }, { level: 2 }]) {
      expect(parseClientEvent({ ...wb, ...bad }, "u1", NOW).ok).toBe(false);
    }
  });

  it("records a finished Daily Word: solved and how many guesses", () => {
    expect(parseClientEvent(dw, "u1", NOW)).toEqual({
      ok: true,
      value: { kind: "play_round", metadata: { game: "daily_word", solved: true, guesses: 3 } },
    });
  });

  it("refuses a Daily Word outside 1 to 6 guesses, or unsolved short of 6", () => {
    for (const bad of [{ guesses: 0 }, { guesses: 7 }, { guesses: 2.5 }, { solved: "yes" }, { solved: false, guesses: 4 }, { correct: 1 }]) {
      expect(parseClientEvent({ ...dw, ...bad }, "u1", NOW).ok).toBe(false);
    }
    expect(parseClientEvent({ ...dw, solved: false, guesses: 6 }, "u1", NOW).ok).toBe(true);
  });

  it("refuses an unknown game", () => {
    expect(parseClientEvent({ ...wb, game: "chess" }, "u1", NOW).ok).toBe(false);
  });
});

describe("play_round for the arcade games (2026-11-18)", () => {
  const NOW2 = new Date("2026-11-18T10:00:00Z");
  const parse = (raw: Record<string, unknown>) => parseClientEvent({ kind: "play_round", ...raw }, "u1", NOW2);

  it("records a Number Rain game: world, score, blasts and sums missed", () => {
    expect(parse({ game: "number_rain", world: 3, score: 420, blasts: 30, missed: 3 })).toEqual({
      ok: true,
      value: { kind: "play_round", metadata: { game: "number_rain", world: 3, score: 420, blasts: 30, missed: 3 } },
    });
    for (const bad of [{ world: 9 }, { score: -1 }, { missed: 4 }, { blasts: 1.5 }, { extra: 1 }]) {
      expect(parse({ game: "number_rain", world: 3, score: 420, blasts: 30, missed: 3, ...bad }).ok, JSON.stringify(bad)).toBe(false);
    }
  });

  it("records Word Groups, Launch, Element Hunt, Timeline and Pin It within what a game can reach", () => {
    const good = [
      { game: "word_groups", puzzle: 7, won: true, mistakes: 2 },
      { game: "launch", level: 12, hit: true, shots: 2 },
      { game: "launch", level: 3, hit: false, shots: 14 },
      { game: "element_hunt", world: 2, score: 380, right: 30, wrong: 4 },
      { game: "timeline", pack: "modern-india", placed: 17, won: false },
      { game: "pin_it", pack: "parks", score: 3120 },
    ];
    for (const g of good) {
      const r = parse(g);
      expect(r.ok, g.game).toBe(true);
      if (r.ok) expect(r.value.metadata).toEqual(g);
    }
    const bad = [
      { game: "word_groups", puzzle: 0, won: true, mistakes: 0 },
      { game: "word_groups", puzzle: 3, won: true, mistakes: 5 },
      { game: "launch", level: 31, hit: true, shots: 1 },
      { game: "launch", level: 3, hit: true, shots: 0 },
      { game: "launch", level: 3, hit: true, shots: 1000 },
      { game: "element_hunt", world: 4, score: 10, right: 1, wrong: 0 },
      { game: "timeline", pack: "mars", placed: 3, won: false },
      { game: "pin_it", pack: "parks", score: 5001 },
      { game: "pin_it", pack: "parks", score: 100, extra: true },
    ];
    for (const g of bad) expect(parse(g).ok, JSON.stringify(g)).toBe(false);
  });
});
