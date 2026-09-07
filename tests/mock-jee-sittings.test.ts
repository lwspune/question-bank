import { describe, expect, it } from "vitest";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { deriveJeeSittings, JEE_SHIFT_SIZE } from "../scripts/mocks/jeeSittings";

/** A throwaway papers dir holding the given configs. */
function fixtureDir(configs: { file: string; sourceFile: string; pyqYear: number }[]) {
  const dir = mkdtempSync(join(tmpdir(), "jee-sittings-"));
  for (const c of configs) {
    writeFileSync(
      join(dir, c.file),
      JSON.stringify({ sourceFile: c.sourceFile, pyqYear: c.pyqYear, classification: {} })
    );
  }
  return dir;
}

describe("deriveJeeSittings — against the committed paper configs", () => {
  const sittings = deriveJeeSittings();

  it("derives 37 buildable sittings, of which 24 ship and 13 are held", () => {
    expect(sittings).toHaveLength(37);
    expect(sittings.filter((s) => !s.hold)).toHaveLength(24);
    expect(sittings.filter((s) => s.hold)).toHaveLength(13);
  });

  /** 2021-2024 print 90 questions of which only 75 are attempted (any 5 of 10
   *  numeric per subject). gradeMock cannot express that, so they must not
   *  appear here at all — a 90-question paper scored out of 360 would look
   *  perfectly well-formed. */
  it("excludes every pre-2025 sitting", () => {
    expect(sittings.every((s) => s.year >= 2025)).toBe(true);
    expect(new Set(sittings.map((s) => s.year))).toEqual(new Set([2025, 2026]));
  });

  it("gives every sitting a unique key", () => {
    const keys = sittings.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  /** A 2025 file is a whole DATE — two shifts back to back — so it yields two
   *  sittings reading different 75-row blocks of the SAME file. Getting this
   *  wrong would ship one shift twice under two names. */
  it("splits a 2025 date file into two blocks of the same file", () => {
    const jan23 = sittings.filter((s) => s.sourceFile === "JEE_2025_Jan23.docx");
    expect(jan23).toHaveLength(2);
    expect(jan23.map((s) => s.block).sort()).toEqual([1, 2]);
    expect(jan23.map((s) => s.shiftNo).sort()).toEqual([1, 2]);
    expect(new Set(jan23.map((s) => s.key)).size).toBe(2);
  });

  /** 2026 is already one file per shift, so each carries a single block — and
   *  block 1 of an S2 file is still SHIFT 2. Conflating the two would read
   *  every 2026 afternoon paper as a morning one. */
  it("reads a 2026 per-shift file as block 1 of its own shift", () => {
    const s2 = sittings.find((s) => s.sourceFile === "JEE_2026_Jan21_S2.docx");
    expect(s2).toBeDefined();
    expect(s2!.block).toBe(1);
    expect(s2!.shiftNo).toBe(2);
    expect(s2!.key).toBe("2026-jan-21-s2");
    expect(s2!.label).toBe("21 Jan, Shift 2");
  });

  /** The 2025 sources name no shift anywhere; 2026 names it twice. That
   *  difference is recorded, not smoothed over. */
  it("marks 2025 shifts inferred and 2026 shifts stated", () => {
    expect(sittings.filter((s) => s.year === 2025).every((s) => s.shiftInferred)).toBe(true);
    expect(sittings.filter((s) => s.year === 2026).some((s) => s.shiftInferred)).toBe(false);
  });

  /** The label must not repeat the year — the title supplies it, and carrying
   *  it in both printed "JEE Mains 2026 (28 Jan 2026, Shift 1)". */
  it("labels without the year", () => {
    expect(sittings.every((s) => !s.label.includes(String(s.year)))).toBe(true);
  });
});

describe("deriveJeeSittings — guards", () => {
  it("throws on a source file whose naming it does not recognise", () => {
    // Silently skipping is the dangerous alternative: a real sitting would never
    // ship and nothing would say so.
    const dir = fixtureDir([
      { file: "a.json", sourceFile: "JEE_2027_SESSION1.docx", pyqYear: 2027 },
    ]);
    try {
      expect(() => deriveJeeSittings(dir, {})).toThrow(/unrecognised source file/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("throws when a file's name disagrees with its config's year", () => {
    const dir = fixtureDir([
      { file: "a.json", sourceFile: "JEE_2026_Jan21_S1.docx", pyqYear: 2025 },
    ]);
    try {
      expect(() => deriveJeeSittings(dir, {})).toThrow(/names 2026 but its config says 2025/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  /** A hold naming a sitting that no longer exists would sit there forever
   *  suppressing nothing, while reading as a known corpus gap. */
  it("throws when a hold names a sitting that does not exist", () => {
    const dir = fixtureDir([
      { file: "a.json", sourceFile: "JEE_2026_Jan21_S1.docx", pyqYear: 2026 },
    ]);
    try {
      // Both directions, so the assertion cannot pass by accident: a hold that
      // MATCHES is fine, and only the bogus one throws.
      expect(() =>
        deriveJeeSittings(dir, { "2026-jan-21-s1": "short 1 — a real gap" })
      ).not.toThrow();
      expect(() =>
        deriveJeeSittings(dir, { "2026-jan-21-s1": "ok", "1999-jan-01-s1": "stale" })
      ).toThrow(/HOLDS names unknown sitting\(s\): 1999-jan-01-s1/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("ignores pre-2025 configs rather than throwing on their naming", () => {
    const dir = fixtureDir([
      { file: "a.json", sourceFile: "JEE_2021_Paper17.docx", pyqYear: 2021 },
      { file: "b.json", sourceFile: "JEE_2023_Jan25.docx", pyqYear: 2023 },
    ]);
    try {
      expect(deriveJeeSittings(dir, {})).toEqual([]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe("JEE_SHIFT_SIZE", () => {
  it("is the 2025-onward paper length", () => {
    // 3 subjects x (20 MCQ + 5 numeric). The block arithmetic depends on it:
    // block 2 is rows 76..150 of a 2025 date file.
    expect(JEE_SHIFT_SIZE).toBe(75);
  });
});
