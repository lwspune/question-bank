import { describe, it, expect } from "vitest";
import { seededRng } from "@/lib/play/generate";
import {
  LIVES,
  yearLabel,
  validatePack,
  startTimeline,
  slotIsRight,
  placeCard,
  parseTimelineProgress,
  serializeTimelineProgress,
  recordTimeline,
  type TimelinePack,
} from "@/lib/play/timeline";
import { TIMELINE_PACKS } from "@/lib/play/data/timeline";

const P: TimelinePack = {
  id: "t",
  name: "Test",
  events: [
    { year: 1757, text: "Plassey" },
    { year: 1857, text: "Revolt" },
    { year: 1905, text: "Partition of Bengal" },
    { year: 1947, text: "Independence" },
  ],
};

describe("years as students read them", () => {
  it("BCE for negative years, CE below 1000, plain after", () => {
    expect(yearLabel(-326)).toBe("326 BCE");
    expect(yearLabel(78)).toBe("78 CE");
    expect(yearLabel(1857)).toBe("1857");
  });
});

describe("every shipped pack", () => {
  it("has at least 40 events, all valid", () => {
    expect(TIMELINE_PACKS.length).toBe(4);
    for (const p of TIMELINE_PACKS) {
      expect(p.events.length, p.name).toBeGreaterThanOrEqual(40);
      expect(validatePack(p), p.name).toEqual([]);
    }
  });

  it("validatePack catches a card that gives away its year, and a repeated card", () => {
    const bad: TimelinePack = { ...P, events: [...P.events, { year: 1885, text: "Congress founded in 1885" }, { year: 1757, text: "Plassey" }] };
    const errors = validatePack(bad).join(" ");
    expect(errors).toMatch(/1885/);
    expect(errors).toMatch(/Plassey/);
  });
});

describe("placing cards", () => {
  it("a slot is right when the card's year fits between its neighbours (equal years fit either side)", () => {
    const line = [P.events[0], P.events[2]];
    expect(slotIsRight(line, 1, 1857)).toBe(true);
    expect(slotIsRight(line, 0, 1857)).toBe(false);
    expect(slotIsRight(line, 2, 1857)).toBe(false);
    expect(slotIsRight(line, 1, 1905)).toBe(true);
    expect(slotIsRight(line, 2, 1905)).toBe(true);
  });

  it("starts with one card down, one to place and the rest in the deck", () => {
    const s = startTimeline(P, seededRng(4));
    expect(s.line).toHaveLength(1);
    expect(s.current).not.toBeNull();
    expect(s.deck.length).toBe(P.events.length - 2);
    expect(s.lives).toBe(LIVES);
  });

  it("a right place scores; a wrong one costs a life; both put the card where it belongs", () => {
    let s = startTimeline(P, seededRng(4));
    const card = s.current!;
    const right = [0, 1].find((i) => slotIsRight(s.line, i, card.year))!;
    const wrong = [0, 1].find((i) => !slotIsRight(s.line, i, card.year))!;
    const good = placeCard(s, right, seededRng(1));
    expect(good.right).toBe(true);
    expect(good.state.score).toBe(1);
    const bad = placeCard(s, wrong, seededRng(1));
    expect(bad.right).toBe(false);
    expect(bad.state.lives).toBe(LIVES - 1);
    for (const r of [good, bad]) {
      const years = r.state.line.map((e) => e.year);
      expect(years).toEqual([...years].sort((a, b) => a - b));
    }
    s = bad.state;
    expect(s.line.some((e) => e.text === card.text)).toBe(true);
  });

  it("the game ends when the lives run out or the deck is placed", () => {
    let s = startTimeline(P, seededRng(9));
    while (!s.over) {
      const c = s.current!;
      const slot = Array.from({ length: s.line.length + 1 }, (_, i) => i).find((i) => slotIsRight(s.line, i, c.year))!;
      s = placeCard(s, slot, seededRng(2)).state;
    }
    expect(s.won).toBe(true);
    expect(s.score).toBe(P.events.length - 1);
  });
});

describe("best per pack, kept in the browser", () => {
  it("keeps the best and round-trips", () => {
    let p = parseTimelineProgress(null);
    p = recordTimeline(p, "modern-india", 12);
    p = recordTimeline(p, "modern-india", 7);
    expect(p.best["modern-india"]).toBe(12);
    expect(parseTimelineProgress(serializeTimelineProgress(p))).toEqual(p);
    expect(parseTimelineProgress("{")).toEqual(parseTimelineProgress(null));
  });
});
