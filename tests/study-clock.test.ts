/**
 * The study clock's rules (lib/studyTime/clock.ts): which 30-second tick
 * counts, where it goes, and what one flush sends. Pure.
 */
import { describe, it, expect } from "vitest";
import {
  TICK_SECS,
  IDLE_AFTER_MS,
  PRACTICE_WINDOW_MS,
  MAX_ITEMS,
  MAX_ITEM_SECS,
  pageKindFor,
  tickTarget,
  partialSecs,
  addSeconds,
  claimUnassigned,
  takeBatch,
  type ClockState,
  type StudyItem,
} from "@/lib/studyTime/clock";

const NOW = 1_000_000_000;
const CH = "11111111-1111-4111-8111-111111111111";
const Q1 = "22222222-2222-4222-8222-222222222222";
const Q2 = "33333333-3333-4333-8333-333333333333";

function state(over: Partial<ClockState> = {}): ClockState {
  return {
    visible: true,
    lastInteractionAt: NOW - 5_000,
    page: { kind: "reading", chapterId: CH },
    lastQuestion: null,
    ...over,
  };
}

describe("pageKindFor", () => {
  it("reads notes, board, chapter pages, formula sheets, Learn and past papers as reading", () => {
    for (const p of [
      "/notes/nda-maths/matrices/foundations",
      "/board/cbse-12/maths/matrices",
      "/questions/nda/mathematics/matrices",
      "/formula/nda-maths/matrices",
      "/learn/lesson/matrices/determinants",
      "/mock/nda-2024-1/paper",
    ]) {
      expect(pageKindFor(p), p).toBe("reading");
    }
  });

  it("reads the bank, drill, review, saved and homework as practice", () => {
    for (const p of ["/browse", "/drill", "/review", "/saved", "/homework/abc", "/practice/x"]) {
      expect(pageKindFor(p), p).toBe("practice");
    }
  });

  it("marks the mock runner, whose time the mock itself records", () => {
    expect(pageKindFor("/mock/attempt/0b5f2c1e-1d3a-4c1b-9d7e-2f6a8b9c0d1e")).toBe("mock");
    // Its result page is a review, not the runner.
    expect(pageKindFor("/mock/attempt/0b5f2c1e-1d3a-4c1b-9d7e-2f6a8b9c0d1e/result")).toBe("other");
  });

  it("counts nothing on pages that are not study: home, pricing, the store, games", () => {
    for (const p of ["/", "/me", "/pricing", "/store", "/store/nda-maths", "/play/maths", "/account", "/mock"]) {
      expect(pageKindFor(p), p).toBe("other");
    }
  });
});

describe("tickTarget", () => {
  it("credits reading to the page's chapter", () => {
    expect(tickTarget(state(), NOW)).toEqual({ kind: "r", c: CH });
  });

  it("counts nothing in a hidden tab", () => {
    expect(tickTarget(state({ visible: false }), NOW)).toBeNull();
  });

  it("counts nothing once the student has been idle for a minute", () => {
    expect(tickTarget(state({ lastInteractionAt: NOW - IDLE_AFTER_MS }), NOW)).not.toBeNull();
    expect(tickTarget(state({ lastInteractionAt: NOW - IDLE_AFTER_MS - 1 }), NOW)).toBeNull();
    expect(tickTarget(state({ lastInteractionAt: null }), NOW)).toBeNull();
  });

  it("never counts the mock runner (the mock records its own time) or a page that is not study", () => {
    expect(tickTarget(state({ page: { kind: "mock", chapterId: null } }), NOW)).toBeNull();
    expect(tickTarget(state({ page: { kind: "other", chapterId: null } }), NOW)).toBeNull();
  });

  it("turns reading into practice on the question just answered, for 90 seconds", () => {
    const s = state({ lastQuestion: { id: Q1, at: NOW - PRACTICE_WINDOW_MS } });
    expect(tickTarget(s, NOW)).toEqual({ kind: "p", q: Q1 });
    const later = state({ lastQuestion: { id: Q1, at: NOW - PRACTICE_WINDOW_MS - 1 } });
    expect(tickTarget(later, NOW)).toEqual({ kind: "r", c: CH });
  });

  it("keeps practice-page time on the last question touched, however long ago", () => {
    const s = state({ page: { kind: "practice", chapterId: null }, lastQuestion: { id: Q1, at: NOW - 10 * 60_000 } });
    expect(tickTarget(s, NOW)).toEqual({ kind: "p", q: Q1 });
  });

  it("leaves practice before any question unassigned, and reading on a page with no chapter too", () => {
    expect(tickTarget(state({ page: { kind: "practice", chapterId: null } }), NOW)).toEqual({ kind: "p" });
    expect(tickTarget(state({ page: { kind: "reading", chapterId: null } }), NOW)).toEqual({ kind: "r" });
  });
});

describe("partialSecs", () => {
  it("credits the part of a tick that ran before the tab was hidden", () => {
    expect(partialSecs(NOW - 12_400, NOW)).toBe(12);
    expect(partialSecs(NOW - 45_000, NOW)).toBe(TICK_SECS);
    expect(partialSecs(NOW + 1_000, NOW)).toBe(0);
  });
});

describe("addSeconds", () => {
  it("adds to the same place rather than adding a row", () => {
    let items: StudyItem[] = [];
    items = addSeconds(items, { kind: "r", c: CH }, 30);
    items = addSeconds(items, { kind: "r", c: CH }, 30);
    items = addSeconds(items, { kind: "p", q: Q1 }, 30);
    expect(items).toEqual([
      { k: "r", c: CH, s: 60 },
      { k: "p", q: Q1, s: 30 },
    ]);
  });

  it("ignores a non-positive amount", () => {
    expect(addSeconds([], { kind: "r" }, 0)).toEqual([]);
  });
});

describe("claimUnassigned", () => {
  it("gives unassigned practice time to the first question touched", () => {
    const items: StudyItem[] = [
      { k: "p", s: 60 },
      { k: "r", s: 30 },
    ];
    expect(claimUnassigned(items, Q1)).toEqual([
      { k: "r", s: 30 },
      { k: "p", q: Q1, s: 60 },
    ]);
  });

  it("merges into time the question already has", () => {
    const items: StudyItem[] = [
      { k: "p", q: Q1, s: 30 },
      { k: "p", s: 60 },
    ];
    expect(claimUnassigned(items, Q1)).toEqual([{ k: "p", q: Q1, s: 90 }]);
  });

  it("leaves everything alone when nothing is unassigned", () => {
    const items: StudyItem[] = [{ k: "p", q: Q2, s: 30 }];
    expect(claimUnassigned(items, Q1)).toEqual(items);
  });
});

describe("takeBatch", () => {
  it("sends at most MAX_ITEMS places and keeps the rest for the next flush", () => {
    const items: StudyItem[] = Array.from({ length: MAX_ITEMS + 3 }, (_, i) => ({
      k: "p" as const,
      q: `00000000-0000-4000-8000-${String(i).padStart(12, "0")}`,
      s: 10,
    }));
    const { batch, rest } = takeBatch(items);
    expect(batch).toHaveLength(MAX_ITEMS);
    expect(rest).toHaveLength(3);
  });

  it("splits a place holding more than one call may add", () => {
    const { batch, rest } = takeBatch([{ k: "r", c: CH, s: MAX_ITEM_SECS + 40 }]);
    expect(batch).toEqual([{ k: "r", c: CH, s: MAX_ITEM_SECS }]);
    expect(rest).toEqual([{ k: "r", c: CH, s: 40 }]);
  });

  it("sends nothing when nothing is waiting", () => {
    expect(takeBatch([])).toEqual({ batch: [], rest: [] });
  });
});
