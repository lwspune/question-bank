/**
 * V's question cards draw a table in the question as a table (owner,
 * 2026-10-23: an MH HSC Biology question showed "| Organism | Habitat |" as
 * raw pipes, in the student's window and on /dashboard/chat). The cards drew
 * question text with MathText, which knows nothing about tables; the
 * long-form renderer contract test scans only KatexRenderer, so it missed it.
 *
 * hasPipeTable decides whether the table renderer (BlockText) is loaded: V is
 * on every page, so its code comes only with a table. A false alarm only loads
 * BlockText, which draws text with no table exactly as before.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { hasPipeTable } from "@/lib/chat/tableText";

describe("hasPipeTable", () => {
  it("sees a GFM table: a pipe row, then its |---| line", () => {
    const uzma =
      "Identify A,B,C and D from the following table:\n\n| Organism | Habitat | Respiratory organ |\n|---|---|---|\n| A | Terrestrial | Tracheal tubes |";
    expect(hasPipeTable(uzma)).toBe(true);
    expect(hasPipeTable("| a | b |\n| :--- | ---: |\n| 1 | 2 |")).toBe(true);
  });

  it("sees none in maths bars or a lone pipe row: only a separator line makes a table", () => {
    expect(hasPipeTable("If \\(|x - 2| > 1\\), find x.")).toBe(false);
    expect(hasPipeTable("| just a row |")).toBe(false);
    expect(hasPipeTable("Zn|Zn^{2+} || Cu^{2+}|Cu")).toBe(false);
  });
});

describe("V's question cards draw the question's text and passage through the table-aware renderer", () => {
  for (const file of ["VAskedCard.tsx", "VQuestionCard.tsx"]) {
    it(file, () => {
      const src = readFileSync(join(process.cwd(), "src/components/chat", file), "utf8");
      expect(src).not.toMatch(/<MathText text=\{q\.(text|context)\}/);
      expect(src).toMatch(/<MathBlockText text=\{q\.text\}/);
      expect(src).toMatch(/<MathBlockText text=\{q\.context\}/);
    });
  }
});
