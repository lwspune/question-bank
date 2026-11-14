import { describe, expect, it } from "vitest";
import { CPO_LAYOUT, DAYS, EXAMS, SECTION_SUBJECTS, SHIFTS, challengeFiles, examOf, examRowOf, layoutOf, tcsFiles, tierOf } from "../scripts/ssc-cgl/config";

// SSC CPO (Sub-Inspector in Delhi Police and CAPFs) Paper I shares the CGL lane: the same TCS
// response sheet (2024) and challenge-module sheet (2025), the same subjects and chapters, in its
// own exam row. A CPO day declares `exam: "cpo"`; its ids start `cpo-`, so no CGL or CHSL id moved.
// Owner, 2026-11-13: 2024, 2025 and 2026 only (2026 Paper I sits 20-28 Nov 2026).
const DAYS_2024 = ["27", "28", "29"];
const DAYS_2025 = ["09", "10", "11", "12"];

describe("SSC CPO Paper I", () => {
  it("registers 2024 as three days of three shifts, one TCS file per shift (PW's copies of SSC's sheet)", () => {
    const days = Object.entries(DAYS).filter(([id]) => id.startsWith("cpo-t1-2024-"));
    expect(days.map(([id]) => id)).toEqual(DAYS_2024.map((dd) => `cpo-t1-2024-06-${dd}`));
    for (const [id, d] of days) {
      const dd = id.slice(-2);
      expect(d).toMatchObject({ exam: "cpo", tier: 1, date: `2024-06-${dd}`, shifts: 3, format: "tcs" });
      expect(d.slots).toEqual(["9:00 AM - 11:00 AM", "12:30 PM - 2:30 PM", "4:00 PM - 6:00 PM"]);
      expect(Object.keys(d.shiftFiles ?? {})).toEqual(["1", "2", "3"]);
      for (const [n, f] of Object.entries(d.shiftFiles!)) {
        expect(f.file).toMatch(new RegExp(`CPO.2024_Tier1.SSC_CPO_2024_Tier1_${dd}Jun_S${n}_PW\\.pdf$`));
        expect(f.url).toMatch(/^https:\/\/drive\.google\.com\/file\/d\/[\w-]+\/view$/);
      }
    }
    expect(tcsFiles().filter((f) => f.day.exam === "cpo").map((f) => f.dir)).toEqual(
      DAYS_2024.flatMap((dd) => [1, 2, 3].map((n) => `cpo-t1-2024-06-${dd}-s${n}`)),
    );
  });

  it("registers 2025 as four day files of two shifts, each shift a page range (sscstudy's copies of SSC's challenge sheet)", () => {
    const days = Object.entries(DAYS).filter(([id]) => id.startsWith("cpo-t1-2025-"));
    expect(days.map(([id]) => id)).toEqual(DAYS_2025.map((dd) => `cpo-t1-2025-12-${dd}`));
    for (const [id, d] of days) {
      const dd = id.slice(-2);
      expect(d).toMatchObject({ exam: "cpo", tier: 1, date: `2025-12-${dd}`, shifts: 2, format: "challenge" });
      expect(d.file).toMatch(new RegExp(`CPO.2025_Tier1.SSC_CPO_2025_Tier1_${dd}Dec_AllShifts_sscstudy\\.pdf$`));
      expect(Object.keys(d.shiftPages ?? {})).toEqual(["1", "2"]);
    }
    // 9 Dec: Shift 1 is pages 1-72 (four captures, Q1-200), Shift 2 pages 73-147
    expect(DAYS["cpo-t1-2025-12-09"].shiftPages).toEqual({ 1: "1-72", 2: "73-147" });
    const files = challengeFiles().filter((f) => f.day.exam === "cpo");
    expect(files.map((f) => f.dir)).toEqual(DAYS_2025.flatMap((dd) => [1, 2].map((n) => `cpo-t1-2025-12-${dd}-s${n}`)));
    expect(files[0]).toMatchObject({ file: DAYS["cpo-t1-2025-12-09"].file, shift: 1, pages: "1-72" });
  });

  it("names each shift cpo-t1-<date>-s<n>, with its own CPO source_file and a Paper I sitting note", () => {
    expect(SHIFTS["cpo-t1-2024-06-27-s2"]).toEqual({
      day: "cpo-t1-2024-06-27",
      shift: 2,
      sourceFile: "SSC_CPO_T1_2024-06-27_S2",
      pyqYear: 2024,
      pyqMonth: "June",
      pyqNote: "Paper I, 27 Jun 2024, Shift 2",
    });
    const cpo = Object.keys(SHIFTS).filter((id) => id.startsWith("cpo-"));
    expect(cpo).toHaveLength(9 + 8);
    const files = Object.values(SHIFTS).map((s) => s.sourceFile);
    expect(new Set(files).size).toBe(files.length);
  });

  it("lays the paper out as CGL Tier I's order, fifty a section, with CPO's section names", () => {
    const L = layoutOf(DAYS["cpo-t1-2024-06-27"]);
    expect(L).toBe(CPO_LAYOUT);
    expect(L.map((s) => [s.part, s.count])).toEqual([["A", 50], ["B", 50], ["C", 50], ["D", 50]]);
    expect(L.map((s) => s.subjects)).toEqual([SECTION_SUBJECTS.A, SECTION_SUBJECTS.B, SECTION_SUBJECTS.C, SECTION_SUBJECTS.D]);
    // the section names the sheets print
    ["General Intelligence and Reasoning", "General Knowledge and General Awareness", "Quantitative Aptitude", "English Comprehension"].forEach((n, i) =>
      expect(L.filter((s) => s.match.test(n)).map((s) => s.part), n).toEqual([L[i].part]),
    );
    expect(layoutOf(DAYS["cpo-t1-2025-12-09"])).toBe(CPO_LAYOUT);
  });

  it("tells a shift's exam and tier from its id, and files it under its own exam row", () => {
    expect(examOf("cpo-t1-2024-06-27-s1")).toBe("cpo");
    expect(tierOf("cpo-t1-2024-06-27-s1")).toBe(1);
    expect(examOf("chsl-t1-2024-07-01-s1")).toBe("chsl");
    expect(examOf("t1-2025-09-18-s1")).toBe("cgl");
    expect(examRowOf("cpo-t1-2024-06-27-s1").name).toBe("SSC CPO");
    expect(examRowOf("t1-2025-09-18-s1")).toBe(EXAMS[1]);
  });
});
