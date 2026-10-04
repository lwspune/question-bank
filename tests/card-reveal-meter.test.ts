/**
 * Dead taps, fix #2 (2026-10-04, DEAD_TAPS.md). A signed-out reveal writes the
 * shared reveal list, and every card that watches the WHOLE list redraws: 25-50
 * heavy cards per tap on /browse and the chapter pages. A card asks only "am I
 * locked?", a yes/no that changes for one card on a normal reveal and for all
 * of them only when the last free reveal is spent. There is no DOM test setup
 * here, so this pins the wiring by source: a question card must use the
 * card-level hook. The lock rule itself is tested in reveal-meter.test.ts.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

describe("per-card reveal subscription", () => {
  it("the /browse question card uses the card-level hook", () => {
    const src = read("src/app/browse/QuestionCard.tsx");
    expect(src).toMatch(/useCardRevealMeter\(/);
    expect(src).not.toMatch(/useRevealMeter\(/);
  });

  it("the card-level hook subscribes to a yes/no, not to the list", () => {
    const src = read("src/components/reveal/useRevealMeter.ts");
    const card = src.slice(src.indexOf("export function useCardRevealMeter"));
    expect(card).toMatch(/useSyncExternalStore\(subscribe, getLocked/);
  });
});
