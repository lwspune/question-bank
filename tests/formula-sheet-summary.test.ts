import { describe, it, expect } from "vitest";
import { formulaCountsLine, formulaSheetSummaryLine } from "@/lib/notes/formulaSheetSummary";

const s = (formulas: number, references: number, traps: number) => ({
  formulas: Array(formulas).fill({}),
  references: Array(references).fill({}),
  traps: Array(traps).fill({}),
});

describe("formulaSheetSummaryLine", () => {
  it("sums across subtopics and pluralises", () => {
    expect(formulaSheetSummaryLine([s(3, 1, 4), s(7, 1, 10)])).toBe("10 formulas · 2 tables · 14 traps");
  });
  it("leaves out a zero part and uses the singular for one", () => {
    expect(formulaSheetSummaryLine([s(0, 6, 1)])).toBe("6 tables · 1 trap");
    expect(formulaSheetSummaryLine([s(1, 0, 0)])).toBe("1 formula");
  });
  it("is empty for nothing", () => {
    expect(formulaSheetSummaryLine([])).toBe("");
  });
});

describe("formulaCountsLine", () => {
  it("says the same thing from counts", () => {
    expect(formulaCountsLine({ formulas: 10, tables: 2, traps: 14 })).toBe("10 formulas · 2 tables · 14 traps");
    expect(formulaCountsLine({ formulas: 0, tables: 1, traps: 0 })).toBe("1 table");
  });
});
