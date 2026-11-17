import { describe, it, expect } from "vitest";
import { PLAY_SUBJECTS, ringCopies, realIndex, nearestVirtual, subjectIndex, gameStatus } from "@/lib/play/hub";
import { emptyProgress } from "@/lib/play/progress";
import { LEVELS } from "@/lib/play/levels";
import { emptyBuilder, recordAnswer } from "@/lib/play/words/builder";
import { emptyDaily, recordGuess } from "@/lib/play/words/daily";
import { wrapOffset } from "@/lib/exam/showcaseSlots";

describe("PLAY_SUBJECTS: the subjects on the /play ring", () => {
  it("each has a unique key, a name, a face, and at least one game", () => {
    const keys = PLAY_SUBJECTS.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
    for (const s of PLAY_SUBJECTS) {
      expect(s.name.length).toBeGreaterThan(0);
      expect(s.face.length).toBeGreaterThan(0);
      expect(s.games.length).toBeGreaterThan(0);
    }
  });

  it("every game links to its own /play page, never twice", () => {
    const hrefs = PLAY_SUBJECTS.flatMap((s) => s.games.map((g) => g.href));
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const h of hrefs) expect(h).toMatch(/^\/play\/[a-z-]+$/);
  });

  it("has Maths and English today", () => {
    expect(PLAY_SUBJECTS.map((s) => s.key)).toEqual(["maths", "english"]);
  });

  it("subjectIndex finds a subject and falls back to the first", () => {
    expect(subjectIndex("english")).toBe(1);
    expect(subjectIndex("mars")).toBe(0);
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
  const today = "2026-11-17";
  const none = { maths: emptyProgress(), builder: emptyBuilder(), daily: emptyDaily() };

  it("maths names the highest open level", () => {
    expect(gameStatus("maths", none, today)).toBe("Start at level 1");
    expect(gameStatus("maths", { ...none, maths: { ...emptyProgress(), cleared: [1, 2] } }, today)).toBe("Level 3 open");
    const all = LEVELS.map((l) => l.id);
    expect(gameStatus("maths", { ...none, maths: { ...emptyProgress(), cleared: all } }, today)).toBe(
      `All ${LEVELS.length} levels cleared`
    );
  });

  it("Word Builder counts due words, then words learning", () => {
    expect(gameStatus("word_builder", none, today)).toBe("Start your first round");
    let b = recordAnswer(emptyBuilder(), "cavil", false, "2026-11-15").progress;
    expect(gameStatus("word_builder", { ...none, builder: b }, today)).toBe("1 word due");
    b = recordAnswer(b, "abate", false, "2026-11-15").progress;
    expect(gameStatus("word_builder", { ...none, builder: b }, today)).toBe("2 words due");
    const learning = recordAnswer(emptyBuilder(), "cavil", true, today).progress;
    expect(gameStatus("word_builder", { ...none, builder: learning }, today)).toBe("1 word learning, none due");
  });

  it("Daily Word says where today's word stands", () => {
    expect(gameStatus("daily_word", none, today)).toBe("Today's word: not played");
    let d = recordGuess(emptyDaily(), today, "plain", "cavil").progress;
    expect(gameStatus("daily_word", { ...none, daily: d }, today)).toBe("1 of 6 tries used");
    d = recordGuess(d, today, "cavil", "cavil").progress;
    expect(gameStatus("daily_word", { ...none, daily: d }, today)).toBe("Solved today in 2");
    let lost = emptyDaily();
    for (const g of ["plain", "claim", "abate", "deter", "zesty", "humid"]) lost = recordGuess(lost, today, g, "cavil").progress;
    expect(gameStatus("daily_word", { ...none, daily: lost }, today)).toBe("Not solved today: new word tomorrow");
  });
});
