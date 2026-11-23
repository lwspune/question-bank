import { describe, it, expect } from "vitest";
import { wrapOffset } from "@/lib/exam/showcaseSlots";
import { PLAY_SUBJECTS, subjectIndex, ringCopies, realIndex, nearestVirtual, gameStatus, emptySaved } from "@/lib/play/hub";
import { WORLD_TARGET } from "@/lib/play/rain";
import { MISTAKES, puzzleIndexForDay } from "@/lib/play/groups";
import { PUZZLES } from "@/lib/play/data/wordGroups";

describe("PLAY_SUBJECTS: the subjects on the /play ring", () => {
  it("each has a unique key, a name, a face, a colour and at least one game", () => {
    const keys = PLAY_SUBJECTS.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
    for (const s of PLAY_SUBJECTS) {
      expect(s.name).toBeTruthy();
      expect(s.face).toBeTruthy();
      expect(s.color).toMatch(/^#[0-9a-f]{6}$/i);
      expect(s.games.length).toBeGreaterThan(0);
    }
  });

  it("every game links to its own /play page, never twice", () => {
    const hrefs = PLAY_SUBJECTS.flatMap((s) => s.games.map((g) => g.href));
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const h of hrefs) expect(h).toMatch(/^\/play\/[a-z-]+$/);
  });

  it("has six subjects, and Word Builder is gone", () => {
    expect(PLAY_SUBJECTS.map((s) => s.key)).toEqual(["maths", "english", "physics", "chemistry", "history", "geography"]);
    expect(PLAY_SUBJECTS.flatMap((s) => s.games.map((g) => g.href))).not.toContain("/play/word-builder");
  });

  it("subjectIndex finds a subject and falls back to the first", () => {
    expect(subjectIndex("english")).toBe(1);
    expect(subjectIndex("nope")).toBe(0);
    expect(subjectIndex(null)).toBe(0);
  });
});

describe("the ring repeats a short subject list so it never looks empty", () => {
  it("draws at least 4 cards, whole copies of the list", () => {
    expect(ringCopies(1)).toBe(4);
    expect(ringCopies(2)).toBe(2);
    expect(ringCopies(3)).toBe(2);
    expect(ringCopies(4)).toBe(1);
    expect(ringCopies(9)).toBe(1);
  });

  it("realIndex maps a drawn card back to its subject", () => {
    expect(realIndex(0, 2)).toBe(0);
    expect(realIndex(3, 2)).toBe(1);
    expect(realIndex(-1, 2)).toBe(1);
  });

  it("nearestVirtual picks the copy of a subject closest to the front", () => {
    const n = 2;
    const total = n * ringCopies(n); // 4
    // At card 2 (a Maths copy), English is either card 1 or card 3: both one step away; the one ahead wins.
    expect(nearestVirtual(2, 1, n, total)).toBe(3);
    // Asking for the subject already in front stays put.
    expect(nearestVirtual(2, 0, n, total)).toBe(2);
    for (let from = 0; from < total; from++) {
      for (let want = 0; want < n; want++) {
        const v = nearestVirtual(from, want, n, total);
        expect(realIndex(v, n)).toBe(want);
        expect(Math.abs(wrapOffset(v, from, total))).toBeLessThanOrEqual(total / 2);
      }
    }
  });
});

describe("gameStatus: the progress line on each game card, from what the browser saved", () => {
  const today = "2026-11-20";

  it("starts every game with an invitation", () => {
    const saved = emptySaved();
    for (const s of PLAY_SUBJECTS) for (const g of s.games) expect(gameStatus(g.key, saved, today)).toBeTruthy();
    expect(gameStatus("number_rain", saved, today)).toBe("Start in world 1");
  });

  it("Number Rain names the highest open world", () => {
    const saved = { ...emptySaved(), rain: { v: 1 as const, best: { 1: WORLD_TARGET, 2: 40 } } };
    expect(gameStatus("number_rain", saved, today)).toBe("World 2 open");
  });

  it("Word Groups says whether today's puzzle is done", () => {
    const saved = emptySaved();
    expect(gameStatus("word_groups", saved, today)).toBe("Today's puzzle: not played");
    const id = PUZZLES[puzzleIndexForDay(today, PUZZLES.length)].id;
    const done = { ...saved, groups: { v: 1 as const, done: { [id]: { won: true, mistakes: 1 } } } };
    expect(gameStatus("word_groups", done, today)).toBe(`Solved today with ${MISTAKES - 1} mistakes to spare`);
  });

  it("Launch counts levels won", () => {
    const saved = { ...emptySaved(), launch: { v: 1 as const, stars: { 1: 3, 2: 1 } } };
    expect(gameStatus("launch", saved, today)).toBe("Level 3 open · 4 stars");
  });
});
