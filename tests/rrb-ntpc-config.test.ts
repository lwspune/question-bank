import { describe, expect, it } from "vitest";
import { CATALOG, GA, LAYOUT, LEVELS, SHIFTS, SLOTS, SUBJECTS, requireShift } from "../scripts/rrb-ntpc/config";

describe("RRB NTPC graduate CBT 1 shifts", () => {
  const ids = Object.keys(SHIFTS).filter((id) => SHIFTS[id].level === "graduate");

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
      expect(url).not.toBeNull();
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

  it("has Mathematics, Reasoning, the eight General Awareness subjects, Static GK and Computer Knowledge, each with chapters", () => {
    // NTPC's General Awareness asks basic computer questions (1-3 a paper), which SSC CGL Tier I does not.
    expect(SUBJECTS).toEqual(["Mathematics", "Reasoning", "History", "Geography", "Polity", "Economics", "Physics", "Chemistry", "Biology", "Current Affairs", "Static GK", "Computer Knowledge"]);
    for (const s of SUBJECTS) expect(CATALOG[s]?.length ?? 0).toBeGreaterThan(0);
    expect(CATALOG["English"]).toBeUndefined();
  });
});

describe("RRB NTPC Undergraduate CBT 1 shifts", () => {
  const ids = Object.keys(SHIFTS).filter((id) => SHIFTS[id].level === "undergraduate");

  it("registers the 32 shifts of 7-9 May and 13-20 June 2026 (13 June has shifts 2 and 3 only)", () => {
    expect(ids).toHaveLength(32);
    for (const id of ids) expect(id).toMatch(/^u1-2026-0[56]-\d\d-s[123]$/);
    expect(ids.filter((id) => id.startsWith("u1-2026-06-13"))).toEqual(["u1-2026-06-13-s2", "u1-2026-06-13-s3"]);
    const days = [...new Set(ids.map((id) => id.slice(3, -3)))];
    expect(days).toEqual(["2026-05-07", "2026-05-08", "2026-05-09", "2026-06-13", "2026-06-14", "2026-06-15", "2026-06-16", "2026-06-17", "2026-06-18", "2026-06-19", "2026-06-20"]);
  });

  it("files each shift under its own source label, the 2025 cycle (CEN 07/2025) and a note short enough to publish", () => {
    expect(new Set(ids.map((id) => SHIFTS[id].sourceFile)).size).toBe(32);
    expect(requireShift("u1-2026-05-07-s1")).toMatchObject({
      level: "undergraduate",
      date: "2026-05-07",
      shift: 1,
      sourceFile: "RRB_NTPC_UG_CBT1_2026-05-07_S1",
      pyqYear: 2025,
      pyqMonth: "May",
      pyqNote: "Undergraduate CBT 1, 7 May 2026, Shift 1",
    });
    expect(requireShift("u1-2026-06-20-s3")).toMatchObject({ pyqMonth: "June", pyqNote: "Undergraduate CBT 1, 20 Jun 2026, Shift 3" });
    expect(requireShift("u1-2026-06-14-s2").file).toMatch(/2026_UG_CBT1[\\/]RRB_NTPC_UG_CBT1_2026-06-14_S2_EN\.pdf$/);
    for (const id of ids) expect(SHIFTS[id].pyqNote.length).toBeLessThan(48);
  });

  it("refuses a shift that was not held (13 June Shift 1)", () => {
    expect(() => requireShift("u1-2026-06-13-s1")).toThrow(/unknown shift/);
  });
});

describe("RRB NTPC levels", () => {
  it("keeps Graduate as the exam it shipped as", () => {
    expect(LEVELS.graduate).toMatchObject({ examName: "RRB NTPC", numberedThrough: false });
    expect(LEVELS.graduate.layout).toBe(LAYOUT);
  });

  it("makes Undergraduate its own exam, three printed sections numbered straight through", () => {
    expect(LEVELS.undergraduate).toMatchObject({ examName: "RRB NTPC Undergraduate", numberedThrough: true });
    const [maths, ga, reasoning] = LEVELS.undergraduate.layout;
    expect(LEVELS.undergraduate.layout).toHaveLength(3);
    expect(maths).toMatchObject({ part: "A", count: 30, subjects: ["Mathematics"] });
    expect(ga).toMatchObject({ part: "B", count: 40, subjects: GA });
    expect(reasoning).toMatchObject({ part: "C", count: 30, subjects: ["Reasoning"] });
    expect(maths.match.test("Mathematics")).toBe(true);
    expect(ga.match.test("General Awareness")).toBe(true);
    expect(reasoning.match.test("General Intelligence and Reasoning")).toBe(true);
    expect(reasoning.match.test("Mathematics")).toBe(false);
  });
});
