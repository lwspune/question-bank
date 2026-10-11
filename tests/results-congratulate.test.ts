/**
 * The Congratulate button on the results strip (2026-10-11): one tap per result
 * group per browser, a message that names how many cleared, and a confetti
 * burst built from a pure piece maker. Nothing is stored on the server: the
 * memory is the visitor's own browser, and it must survive junk in storage.
 */
import { describe, it, expect } from "vitest";
import {
  CONGRATS_MEMORY_CAP,
  congratsKey,
  congratsMessage,
  hasCongratulated,
  rememberCongratulated,
} from "@/lib/results/congratulate";
import { makeConfettiPieces } from "@/lib/results/confetti";
import type { ResultGroup } from "@/lib/results/summary";

const group = (over: Partial<ResultGroup> = {}): ResultGroup => ({
  examSlug: "nda",
  examName: "NDA",
  sitting: "NDA 2 2026",
  stage: "written",
  names: ["A", "B", "C"],
  ...over,
});

describe("congratsKey", () => {
  it("is one key per exam, sitting and stage", () => {
    expect(congratsKey(group())).toBe(congratsKey(group({ names: ["X"] })));
    expect(congratsKey(group())).not.toBe(congratsKey(group({ stage: "ssb" })));
    expect(congratsKey(group())).not.toBe(congratsKey(group({ sitting: "NDA 1 2027" })));
  });
});

describe("remembering a congratulation", () => {
  it("starts empty and remembers what was added", () => {
    const k = congratsKey(group());
    expect(hasCongratulated(null, k)).toBe(false);
    const raw = rememberCongratulated(null, k);
    expect(hasCongratulated(raw, k)).toBe(true);
    expect(hasCongratulated(raw, congratsKey(group({ stage: "ssb" })))).toBe(false);
  });

  it("treats junk in storage as empty instead of throwing", () => {
    for (const junk of ["not json", "{}", "[1,2]", '"x"', "null"]) {
      expect(hasCongratulated(junk, "k")).toBe(false);
      expect(hasCongratulated(rememberCongratulated(junk, "k"), "k")).toBe(true);
    }
  });

  it("does not duplicate a key, and keeps only the newest few", () => {
    let raw: string | null = null;
    raw = rememberCongratulated(raw, "a");
    raw = rememberCongratulated(raw, "a");
    expect(JSON.parse(raw)).toEqual(["a"]);
    for (let i = 0; i < CONGRATS_MEMORY_CAP + 5; i++) raw = rememberCongratulated(raw, `k${i}`);
    const list = JSON.parse(raw) as string[];
    expect(list).toHaveLength(CONGRATS_MEMORY_CAP);
    expect(list[list.length - 1]).toBe(`k${CONGRATS_MEMORY_CAP + 4}`);
    expect(list).not.toContain("a");
  });
});

describe("congratsMessage", () => {
  it("counts everyone who cleared", () => {
    expect(congratsMessage(10)).toBe("Well done to all 10 of them!");
    expect(congratsMessage(2)).toBe("Well done to both of them!");
    expect(congratsMessage(1)).toBe("Well done to them!");
  });
});

describe("makeConfettiPieces", () => {
  const rand = (() => {
    let s = 42;
    return () => ((s = (s * 16807) % 2147483647) / 2147483647);
  })();

  it("makes the asked number of pieces, starting at the origin and flying upward", () => {
    const pieces = makeConfettiPieces(60, { x: 100, y: 400 }, ["#1D4ED8", "#F59E0B"], rand);
    expect(pieces).toHaveLength(60);
    for (const p of pieces) {
      expect(p.x).toBe(100);
      expect(p.y).toBe(400);
      expect(p.vy).toBeLessThan(0);
      expect(["#1D4ED8", "#F59E0B"]).toContain(p.color);
      expect(p.size).toBeGreaterThan(0);
    }
  });
});
