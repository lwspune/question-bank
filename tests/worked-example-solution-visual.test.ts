import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Worked questions on /notes and /guide show the Animated/Still switch
// (2026-11-19). Before this, 741 of the 1,252 MHT-CET notes worked questions
// had a checked animated solution in the bank that the notes never showed.
// No jsdom here, so the wiring is pinned by reading the source, the way
// tests/board-solution-visual.test.ts pins the board reader.
const read = (p: string) => readFileSync(join(__dirname, "..", p), "utf8");
const loader = read("src/lib/guide/loadWorkedExamples.ts");
const card = read("src/app/guide/_components/WorkedExampleCard.tsx");
const concept = read("src/app/notes/_components/ConceptUnitCard.tsx");
const checkpoint = read("src/app/notes/_components/SubtopicMasteryCheckpoint.tsx");

describe("worked-question animated solutions", () => {
  it("loads the animated solution and keeps it only when its own check passes", () => {
    expect(loader).toMatch(/\bsolution_visual\b/);
    expect(loader).toMatch(/solutionVisual:\s*usableVisual\(r\.solution_visual\)/);
  });

  it("renders the revealed solution through SolutionViews", () => {
    expect(card).toMatch(/import SolutionViews from "@\/components\/visuals\/SolutionViews"/);
    expect(card).toMatch(/<SolutionViews[\s\S]*?visual=\{example\.solutionVisual\}/);
    expect(card).toMatch(/<SolutionViews[\s\S]*?solution=\{example\.solution\}/);
    expect(card).toMatch(/<SolutionViews[\s\S]*?track=\{\{\s*questionId: example\.id,\s*surface: visualSurface\s*\}\}/);
  });

  it("records use on the notes pages as notes, not guide", () => {
    expect(concept).toMatch(/<WorkedExampleCard[^>]*visualSurface="notes"/);
    expect(checkpoint).toMatch(/<WorkedExampleCard[^>]*visualSurface="notes"/);
  });
});
