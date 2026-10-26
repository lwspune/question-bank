import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { BOARD_CHAPTER_COLUMNS } from "@/lib/board/query";

// The /board reader shows the Animated/Still switch (owner, 2026-10-27). No
// jsdom here, so the card's wiring is pinned by reading its source, the way
// tests/long-form-field-renderer-contract.test.ts pins renderers.
const card = readFileSync(join(__dirname, "../src/app/board/BoardQuestionItem.tsx"), "utf8");

describe("board reader animated solutions", () => {
  it("loads the animated solution with a chapter's rows", () => {
    expect(BOARD_CHAPTER_COLUMNS).toMatch(/\bsolution_visual\b/);
  });

  it("renders the revealed solution through SolutionViews", () => {
    expect(card).toMatch(/import SolutionViews from "@\/components\/visuals\/SolutionViews"/);
    expect(card).toMatch(/<SolutionViews[\s\S]*?solution=\{q\.solution\}/);
  });

  it("keeps a Marathi-medium question on Still: the steps are English sentences", () => {
    expect(card).toMatch(/visual=\{bi \? null : q\.solutionVisual\}/);
  });
});
