/**
 * The "Q" column from the Excel is the question number printed on the
 * original PYQ paper. parseXlsx must surface it as questionNumber on
 * each parsed row, even when the column contains numeric cells (XLSX
 * deserialises those as numbers).
 *
 * Backwards-compat: the "Q" header is optional. Old templates without
 * it must continue to parse cleanly.
 */
import { describe, it, expect } from "vitest";
import * as XLSX from "xlsx";
import { goodXlsxBuffer, customXlsxBuffer, HEADER } from "./fixtures/upload";
import { parseXlsx } from "@/lib/upload/parser";

describe("parseXlsx — Q column", () => {
  it("yields questionNumber as a string from numeric Q cells", () => {
    const parsed = parseXlsx(goodXlsxBuffer());
    expect(parsed.rows).toHaveLength(5);
    expect(parsed.rows.map((r) => r.questionNumber)).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
    ]);
  });

  it("preserves text Q values like '1(a)' / '2A' / '12-i'", () => {
    const rows = [
      [
        "1(a)",
        "Physics",
        "MHT-CET",
        "Mechanics",
        "",
        "",
        "Q text 1a",
        "x",
        "y",
        "z",
        "w",
        "A",
        "",
        "Easy",
      ],
      [
        "2A",
        "Physics",
        "MHT-CET",
        "Mechanics",
        "",
        "",
        "Q text 2A",
        "x",
        "y",
        "z",
        "w",
        "B",
        "",
        "Easy",
      ],
      [
        "  12-i  ",
        "Physics",
        "MHT-CET",
        "Mechanics",
        "",
        "",
        "Q text 12i",
        "x",
        "y",
        "z",
        "w",
        "C",
        "",
        "Easy",
      ],
    ];
    const parsed = parseXlsx(customXlsxBuffer(rows));
    expect(parsed.rows.map((r) => r.questionNumber)).toEqual([
      "1(a)",
      "2A",
      "12-i",
    ]);
  });

  it("returns undefined for empty Q cells", () => {
    const rows = [
      [
        "",
        "Physics",
        "MHT-CET",
        "Mechanics",
        "",
        "",
        "Q with no number",
        "x",
        "y",
        "z",
        "w",
        "A",
        "",
        "Easy",
      ],
    ];
    const parsed = parseXlsx(customXlsxBuffer(rows));
    expect(parsed.rows[0].questionNumber).toBeUndefined();
  });

  it("returns undefined when the Q header is missing entirely", () => {
    // Build a workbook without the "Q" column.
    const headerNoQ = HEADER.filter((h) => h !== "Q");
    const rowNoQ = [
      "Physics",
      "MHT-CET",
      "Mechanics",
      "",
      "",
      "Q text",
      "x",
      "y",
      "z",
      "w",
      "A",
      "",
      "Easy",
    ];
    const aoa: (string | number | undefined)[][] = [headerNoQ, rowNoQ];
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const buffer = XLSX.write(wb, {
      type: "buffer",
      bookType: "xlsx",
    }) as Buffer;

    const parsed = parseXlsx(buffer);
    expect(parsed.rows).toHaveLength(1);
    expect(parsed.rows[0].questionNumber).toBeUndefined();
  });
});
