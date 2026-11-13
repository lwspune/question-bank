import { describe, expect, it } from "vitest";
import { CATALOG, LAYOUT, SHIFTS, SLOTS, SUBJECTS, requireShift } from "../scripts/rrb-ntpc/config";

describe("RRB NTPC graduate CBT 1 shifts", () => {
  const ids = Object.keys(SHIFTS);

  it("registers the 24 shifts of 16-27 March 2026, three a day", () => {
    expect(ids).toHaveLength(24);
    const days = new Set(ids.map((id) => id.slice(0, -3)));
    expect([...days].map((d) => d.slice(-2))).toEqual(["16", "17", "18", "19", "22", "24", "25", "27"]);
    for (const id of ids) expect(id).toMatch(/^g1-2026-03-\d\d-s[123]$/);
  });

  it("gives each shift its own source label and a pyq note short enough to publish", () => {
    const files = ids.map((id) => SHIFTS[id].sourceFile);
    expect(new Set(files).size).toBe(24);
    const s = requireShift("g1-2026-03-22-s2");
    expect(s).toMatchObject({ date: "2026-03-22", shift: 2, pyqYear: 2025, pyqMonth: "March", pyqNote: "Graduate CBT 1, 22 Mar 2026, Shift 2" });
    // publicPyqNote publishes a pyq note only under 48 characters.
    for (const id of ids) expect(SHIFTS[id].pyqNote.length).toBeLessThan(48);
  });

  it("points each shift at Prepp's copy of that date and shift", () => {
    for (const id of ids) {
      const { url, date, shift } = SHIFTS[id];
      expect(url).toContain(`-english-mar-${date.slice(-2)}-2026-shift-${shift}-`);
      expect(url).toMatch(/^https:\/\/cdn-images\.prepp\.in\/.+\.pdf$/);
    }
  });

  it("knows the three printed slots in shift order", () => {
    expect(SLOTS).toEqual(["9:00 AM - 10:30 AM", "12:45 PM - 2:15 PM", "4:30 PM - 6:00 PM"]);
  });

  it("refuses an unknown shift", () => {
    expect(() => requireShift("g1-2026-03-20-s1")).toThrow(/unknown shift/);
  });
});

describe("RRB NTPC paper and catalog", () => {
  it("is one printed section of 100 whose questions each name a subject", () => {
    expect(LAYOUT).toHaveLength(1);
    expect(LAYOUT[0]).toMatchObject({ part: "A", count: 100 });
    expect(LAYOUT[0].match.test("RRB NTPC GRADUATE CBT 1")).toBe(true);
    expect(LAYOUT[0].subjects).toEqual(SUBJECTS);
  });

  it("has Mathematics, Reasoning, the eight General Awareness subjects and Computer Knowledge, each with chapters", () => {
    // NTPC's General Awareness asks basic computer questions (1-3 a paper), which SSC CGL Tier I does not.
    expect(SUBJECTS).toEqual(["Mathematics", "Reasoning", "History", "Geography", "Polity", "Economics", "Physics", "Chemistry", "Biology", "Current Affairs", "Computer Knowledge"]);
    for (const s of SUBJECTS) expect(CATALOG[s]?.length ?? 0).toBeGreaterThan(0);
    expect(CATALOG["English"]).toBeUndefined();
  });
});
