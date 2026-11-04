import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { checkShiftSourceFile } from "../scripts/mhtcet/config";

/**
 * commit.ts sets EVERY row with the shift's source_file to PRIVATE, and
 * flip-public.ts sets every PRIVATE one PUBLIC. A shift file that names a
 * sitting's existing spreadsheet (MHT_CET_10thMay2023_Shift1.xlsx) would hide
 * that whole live sitting, or publish its withheld rows. Found 2026-11-04 before
 * it ran: added rows join their sitting by SQL after the flip instead.
 */
describe("MHT-CET shift source_file", () => {
  it("refuses a spreadsheet name", () => {
    expect(() => checkShiftSourceFile("MHT_CET_10thMay2023_Shift1.xlsx")).toThrow(/spreadsheet/);
  });

  it("accepts the paper's own .docx or .pdf name", () => {
    expect(() => checkShiftSourceFile("MHT_CET_2023_May_10_S1.docx")).not.toThrow();
    expect(() => checkShiftSourceFile("MHT_CET_2026_Apr_15_S1.pdf")).not.toThrow();
  });

  it("holds for every committed shift file", () => {
    const dir = join(__dirname, "..", "scripts", "mhtcet", "shifts");
    for (const f of readdirSync(dir).filter((f) => /^\d{4}-[a-z]{3}-\d{2}-s\d\.json$/.test(f))) {
      const { sourceFile } = JSON.parse(readFileSync(join(dir, f), "utf8"));
      expect(() => checkShiftSourceFile(sourceFile), f).not.toThrow();
    }
  });
});
