import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { CHSL_LAYOUT, DAYS, EXAMS, SECTION_SUBJECTS, SHIFTS, challengeFiles, examOf, examRowOf, layoutOf, shiftSections, tcsFiles, tierOf } from "../scripts/ssc-cgl/config";

// SSC CHSL Tier I shares the CGL lane (scripts/ssc-cgl): the same TCS response sheet, the same
// subjects and chapters. A CHSL day declares `exam: "chsl"`; its ids start `chsl-`, so no CGL
// id, source_file or mock moved.
const CHSL_2024 = ["01", "02", "03", "04", "05", "08", "09", "10", "11"];

describe("SSC CHSL 2024 Tier I", () => {
  it("registers the nine hosted 2024 sheets, Shift 1 of each day, one TCS file each", () => {
    const days = Object.entries(DAYS).filter(([id]) => id.startsWith("chsl-t1-2024-"));
    expect(days.map(([id]) => id)).toEqual(CHSL_2024.map((dd) => `chsl-t1-2024-07-${dd}`));
    for (const [id, d] of days) {
      const dd = id.slice(-2);
      expect(d).toMatchObject({ exam: "chsl", tier: 1, date: `2024-07-${dd}`, shifts: 1, format: "tcs", slots: ["9:00 AM - 10:00 AM"] });
      expect(d.file).toMatch(new RegExp(`CHSL.2024_Tier1.SSC_CHSL_2024_Tier1_${dd}Jul_Shift1\\.pdf$`));
      expect(d.url).toMatch(/^https:\/\/cdn\.aglasem\.com\/aglasem-doc\/[0-9a-f-]{36}\/[0-9a-f-]{36}\.pdf$/);
    }
  });

  it("names each shift chsl-t1-<date>-s1, with its own CHSL source_file and a short sitting note", () => {
    expect(SHIFTS["chsl-t1-2024-07-01-s1"]).toEqual({
      day: "chsl-t1-2024-07-01",
      shift: 1,
      sourceFile: "SSC_CHSL_T1_2024-07-01_S1",
      pyqYear: 2024,
      pyqMonth: "July",
      pyqNote: "Tier I, 1 Jul 2024, Shift 1",
    });
    const chsl = Object.keys(SHIFTS).filter((id) => id.startsWith("chsl-t1-2024-"));
    expect(chsl).toHaveLength(9);
    const files = Object.values(SHIFTS).map((s) => s.sourceFile);
    expect(new Set(files).size).toBe(files.length);
  });

  it("lists each CHSL file for extraction under its day id", () => {
    expect(tcsFiles().filter((f) => f.day.exam === "chsl").map((f) => f.dir)).toEqual(CHSL_2024.map((dd) => `chsl-t1-2024-07-${dd}`));
  });

  it("lays the paper out in CHSL's print order: English, Reasoning, Quantitative Aptitude, General Awareness", () => {
    const L = layoutOf(DAYS["chsl-t1-2024-07-02"]);
    expect(L).toBe(CHSL_LAYOUT);
    expect(L.map((s) => [s.part, s.count, s.subjects[0]])).toEqual([
      ["A", 25, "English"],
      ["B", 25, "Reasoning"],
      ["C", 25, "Quantitative Aptitude"],
      ["D", 25, expect.any(String)],
    ]);
    expect([...L[3].subjects].sort()).toEqual([...SECTION_SUBJECTS.B].sort());
    // the section names the 2024 sheets print
    ["English Language", "General Intelligence", "Quantitative Aptitude", "General Awareness"].forEach((n, i) =>
      expect(L.filter((s) => s.match.test(n)).map((s) => s.part), n).toEqual([L[i].part]),
    );
    expect(shiftSections("chsl-t1-2024-07-02-s1").A).toEqual(["English"]);
  });

  it("marks the 1 Jul sheet, which prints no heading over its first section", () => {
    expect(DAYS["chsl-t1-2024-07-01"].untitledFirstSection).toBe(true);
    expect(DAYS["chsl-t1-2024-07-02"].untitledFirstSection).toBeUndefined();
  });

  it("tells a shift's exam and tier from its id", () => {
    expect(examOf("chsl-t1-2024-07-01-s1")).toBe("chsl");
    expect(tierOf("chsl-t1-2024-07-01-s1")).toBe(1);
    expect(examOf("t1-2025-09-18-s1")).toBe("cgl");
    expect(examOf("t2-2025-01-18-s1")).toBe("cgl");
    expect(() => tierOf("chsl-2024-07-01-s1")).toThrow(/names no tier/);
  });

  it("files a shift under its own exam row: CHSL its own, CGL's two unchanged", () => {
    expect(examRowOf("chsl-t1-2024-07-01-s1").name).toBe("SSC CHSL");
    expect(examRowOf("t1-2025-09-18-s1")).toBe(EXAMS[1]);
    expect(examRowOf("t2-2025-01-18-s1")).toBe(EXAMS[2]);
  });
});

describe("SSC CGL registry, untouched by CHSL", () => {
  // Fingerprints taken on 2026-11-13, before the lane learned a second exam.
  it("keeps every CGL shift and every CGL TCS file exactly as before", () => {
    const cglShifts = Object.entries(SHIFTS).filter(([id]) => examOf(id) === "cgl").sort();
    expect(cglShifts).toHaveLength(156);
    expect(createHash("sha256").update(JSON.stringify(cglShifts)).digest("hex").slice(0, 16)).toBe("64309f4c0c25d4e7");
    const files = tcsFiles()
      .filter((x) => (x.day.exam ?? "cgl") === "cgl")
      .map((x) => [x.dir, x.file, x.shift ?? null, x.pages ?? null]);
    expect(createHash("sha256").update(JSON.stringify(files)).digest("hex").slice(0, 16)).toBe("5f88efb25ee11bd2");
  });
});

describe("SSC CHSL 2025 Tier I (PW's scanned challenge-module sheets)", () => {
  const HOSTED: [string, number[]][] = [
    ["14", [3]], ["15", [1, 3]], ["17", [1]], ["18", [1]], ["19", [2]], ["20", [1]], ["21", [1, 3]], ["22", [2]],
    ["25", [1, 2, 3]], ["26", [2]], ["27", [1]], ["28", [1]], ["29", [1]],
  ];

  it("registers the 17 shifts PW hosts, one scanned file per shift, read by the challenge reader", () => {
    for (const [dd, shifts] of HOSTED) {
      const d = DAYS[`chsl-t1-2025-11-${dd}`];
      expect(d, dd).toMatchObject({ exam: "chsl", tier: 1, date: `2025-11-${dd}`, format: "challenge", layout: CHSL_LAYOUT, present: shifts });
      for (const n of shifts) {
        expect(d.shiftFiles![n].file).toMatch(new RegExp(`CHSL.2025_Tier1.SSC_CHSL_2025_Tier1_${dd}Nov_S${n}_PW\.pdf$`));
        expect(d.shiftFiles![n].url).toMatch(/^https:\/\/drive\.google\.com\/file\/d\/[\w-]+\/view$/);
      }
    }
    const ids = Object.keys(SHIFTS).filter((id) => id.startsWith("chsl-t1-2025-"));
    expect(ids).toHaveLength(17);
    expect(SHIFTS["chsl-t1-2025-11-25-s2"]).toMatchObject({ sourceFile: "SSC_CHSL_T1_2025-11-25_S2", pyqYear: 2025, pyqMonth: "November", pyqNote: "Tier I, 25 Nov 2025, Shift 2" });
  });

  it("lists every scanned file for the challenge reader, not the TCS reader", () => {
    expect(tcsFiles().filter((f) => f.dir.startsWith("chsl-t1-2025-"))).toEqual([]);
    const files = challengeFiles().filter((f) => f.day.exam === "chsl");
    expect(files).toHaveLength(17);
    expect(files[0]).toMatchObject({ dir: "chsl-t1-2025-11-14-s3", shift: 3 });
  });
});
