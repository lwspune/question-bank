import { describe, expect, it } from "vitest";
import {
  BOOK_OF_EXAM,
  parseCoveredRef,
  splitCoveredBy,
  splitPyqCount,
  SPINE,
} from "../src/lib/syllabus/summary";

describe("splitPyqCount", () => {
  it("pulls the PYQ count out of an exam-spine concept name", () => {
    expect(splitPyqCount("Diazonium Salts (12 PYQ)")).toEqual({ name: "Diazonium Salts", pyq: 12 });
  });

  it("leaves a book-spine name alone and reports zero", () => {
    // NCERT and State Board rows carry no count; they must not be mangled.
    expect(splitPyqCount("Nature of Matter")).toEqual({ name: "Nature of Matter", pyq: 0 });
  });

  it("does not treat a parenthetical that is not a PYQ count as one", () => {
    expect(splitPyqCount("Nature of Oxides (Acidic, Basic, Amphoteric)")).toEqual({
      name: "Nature of Oxides (Acidic, Basic, Amphoteric)",
      pyq: 0,
    });
  });
});

describe("parseCoveredRef", () => {
  it("reads an explicit year prefix", () => {
    expect(parseCoveredRef("XII:4.11.9", 11)).toEqual({ cls: 12, no: "4.11.9" });
    expect(parseCoveredRef("XI:2.7", 12)).toEqual({ cls: 11, no: "2.7" });
  });

  it("falls back to the row's own year when the ref carries none", () => {
    expect(parseCoveredRef("11.4", 12)).toEqual({ cls: 12, no: "11.4" });
  });

  it("tolerates surrounding whitespace from a comma-separated list", () => {
    expect(parseCoveredRef("  XI:9.7.1 ", 12)).toEqual({ cls: 11, no: "9.7.1" });
  });
});

describe("splitCoveredBy", () => {
  it("splits a multi-section pointer and drops empties", () => {
    expect(splitCoveredBy("1.2.1, 1.2.2, 1.2.3")).toEqual(["1.2.1", "1.2.2", "1.2.3"]);
    expect(splitCoveredBy("12.7, XII:4.11.9")).toEqual(["12.7", "XII:4.11.9"]);
  });

  it("returns nothing for an empty pointer, which is how a gap is stored", () => {
    expect(splitCoveredBy("")).toEqual([]);
    expect(splitCoveredBy(" , ")).toEqual([]);
  });
});

describe("BOOK_OF_EXAM", () => {
  it("maps an exam column on an exam-spine row to the book its refs point into", () => {
    // The bug this prevents: resolving an NCERT ref against the State Board book,
    // which renders NCERT 7.4 (Alcohols) as State Board Ch.7 (Groups 16, 17, 18).
    expect(BOOK_OF_EXAM["CBSE Class 12"]).toBe(SPINE.ncert);
    expect(BOOK_OF_EXAM["MH State Board"]).toBe(SPINE.stateBoard);
  });
});
