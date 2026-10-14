import { describe, it, expect } from "vitest";
import { pyqNoteOf, commitGroups } from "../scripts/afcat/lib";

// Group C ("Conquer the Sky") chapters end with AFCAT past-year questions. The
// owner chose (2026-10-14) to ingest those as AFCAT PYQs with their sitting,
// while the model-practice questions stay practice. commitStaged takes
// question_kind / pyq_year / pyq_note per CALL, so a file commits in groups.
describe("pyqNoteOf", () => {
  it("follows the bank's sitting convention, provenance in brackets", () => {
    const note = pyqNoteOf({ year: 2019, sitting: "II" });
    expect(note.startsWith("AFCAT (II) 2019 — Numerical Ability [")).toBe(true);
    expect(note).toMatch(/published compilation/);
    // the public bracket-stripped part must stay under the 48-char publish cap
    expect(note.replace(/\s*\[.*\]$/, "").length).toBeLessThan(48);
  });
});

describe("commitGroups", () => {
  const recs = new Map([
    ["01-101", {}],
    ["01-102", {}],
    ["01-301", { pyq: { year: 2019, sitting: "II" as const } }],
    ["01-302", { pyq: { year: 2019, sitting: "II" as const } }],
    ["01-304", { pyq: { year: 2019, sitting: "I" as const } }],
  ]);
  const rows = ["01-101", "01-301", "01-102", "01-304", "01-302"].map((questionNumber) => ({ questionNumber }));

  it("puts practice rows in one group and PYQs in one group per sitting, keeping row order", () => {
    const g = commitGroups(rows, recs);
    expect(g.map((x) => [x.kind, x.year ?? null, x.rows.map((r) => r.questionNumber)])).toEqual([
      ["practice", null, ["01-101", "01-102"]],
      ["pyq", 2019, ["01-301", "01-302"]],
      ["pyq", 2019, ["01-304"]],
    ]);
    expect(g[1].note).toContain("AFCAT (II) 2019");
    expect(g[2].note).toContain("AFCAT (I) 2019");
  });

  it("omits an empty practice group", () => {
    const g = commitGroups([{ questionNumber: "01-304" }], recs);
    expect(g.map((x) => x.kind)).toEqual(["pyq"]);
  });

  it("refuses a row whose record is missing rather than guessing its kind", () => {
    expect(() => commitGroups([{ questionNumber: "09-999" }], recs)).toThrow(/no source record/);
  });
});
