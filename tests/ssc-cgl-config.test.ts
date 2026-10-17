import { describe, expect, it } from "vitest";
import { CATALOG, DAYS, EXAMS, LAYOUTS, SECTION_SUBJECTS, SHIFTS, SUBJECTS, layoutOf, sectionSubjects, shiftSections, subjectFor, tcsFiles, tierOf } from "../scripts/ssc-cgl/config";

describe("SSC CGL sections and subjects", () => {
  it("maps each Tier I part to its subjects, General Awareness split CDS-style", () => {
    expect(SECTION_SUBJECTS.A).toEqual(["Reasoning"]);
    expect(SECTION_SUBJECTS.C).toEqual(["Quantitative Aptitude"]);
    expect(SECTION_SUBJECTS.D).toEqual(["English"]);
    expect([...SECTION_SUBJECTS.B].sort()).toEqual(
      ["Biology", "Chemistry", "Current Affairs", "Economics", "Geography", "History", "Physics", "Polity"]
    );
  });

  it("partitions the subjects: every subject belongs to exactly one part", () => {
    const all = Object.values(SECTION_SUBJECTS).flat();
    expect(new Set(all).size).toBe(all.length);
    expect([...SUBJECTS()].sort()).toEqual([...all].sort());
  });

  it("resolves a question's subject from its part, and needs one named in General Awareness", () => {
    expect(subjectFor("A")).toBe("Reasoning");
    expect(subjectFor("C", "Quantitative Aptitude")).toBe("Quantitative Aptitude");
    expect(subjectFor("B", "Polity")).toBe("Polity");
    expect(() => subjectFor("B")).toThrow(/General Awareness.*subject/);
    expect(() => subjectFor("B", "Reasoning")).toThrow(/not a PART-B subject/);
    expect(() => subjectFor("A", "History")).toThrow(/not a PART-A subject/);
  });
});

describe("SSC CGL catalog", () => {
  it("gives every subject chapters, every chapter subtopics, and no duplicate names", () => {
    for (const subject of new Set([...SUBJECTS(1), ...SUBJECTS(2)])) {
      const chapters = CATALOG[subject];
      expect(chapters?.length, subject).toBeGreaterThan(0);
      const names = chapters.map((c) => c.chapter);
      expect(new Set(names).size, `${subject} chapters`).toBe(names.length);
      for (const c of chapters) {
        expect(c.subtopics.length, `${subject} / ${c.chapter}`).toBeGreaterThan(0);
        expect(new Set(c.subtopics).size, `${subject} / ${c.chapter} subtopics`).toBe(c.subtopics.length);
      }
    }
  });

  it("has no subject the sections of either tier do not know", () => {
    expect(Object.keys(CATALOG).sort()).toEqual([...new Set([...SUBJECTS(1), ...SUBJECTS(2)])].sort());
  });
});

describe("SSC CGL shifts", () => {
  const ids = Object.keys(SHIFTS);

  it("registers the pilot shifts", () => {
    expect(ids).toEqual(expect.arrayContaining(["t1-2025-09-18-s1", "t1-2025-09-18-s2"]));
  });

  it("names every shift <day>-s<n> and keeps year and month in step with the day (Tier I)", () => {
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (const id of ids.filter((x) => x.startsWith("t1-"))) {
      const s = SHIFTS[id];
      expect(id).toBe(`${s.day}-s${s.shift}`);
      const [, y, m] = /^t\d-(\d{4})-(\d{2})-\d{2}$/.exec(s.day) ?? [];
      expect(s.pyqYear, id).toBe(Number(y));
      // pyq_month is a month NAME everywhere in the bank ("September"), never a number.
      expect(s.pyqMonth, id).toBe(MONTHS[Number(m) - 1]);
    }
  });

  it("registers only the shifts a day's file holds (13 Sep 2025 has Shifts 2 and 3, not 1)", () => {
    expect(ids).toEqual(expect.arrayContaining(["t1-2025-09-13-s2", "t1-2025-09-13-s3"]));
    expect(ids).not.toContain("t1-2025-09-13-s1");
    expect(SHIFTS["t1-2025-09-13-s3"].pyqNote).toBe("Tier I, 13 Sep 2025, Shift 3");
  });

  it("gives every shift its own source_file (mocks find a sitting by it)", () => {
    const files = ids.map((id) => SHIFTS[id].sourceFile);
    expect(new Set(files).size).toBe(files.length);
  });

  it("keeps pyq_note a short sitting id, under the public provenance cap", () => {
    // audit:provenance: pyq notes publish only under 48 chars, and real sitting ids sit at <= 38.
    for (const id of ids) expect(SHIFTS[id].pyqNote.length, id).toBeLessThanOrEqual(38);
  });
});

describe("SSC CGL 2024 Tier I (TCS response sheets)", () => {
  it("registers 12 exam days of 3 shifts, each from its own day's TCS file", () => {
    const days = Object.entries(DAYS).filter(([id]) => id.startsWith("t1-2024-"));
    expect(days.map(([id]) => id.slice(11))).toEqual(["09", "10", "11", "12", "13", "17", "18", "19", "23", "24", "25", "26"]);
    for (const [id, d] of days) {
      expect(d.format).toBe("tcs");
      expect(d.slots).toEqual(["9:00 AM - 10:00 AM", "12:30 PM - 1:30 PM", "4:00 PM - 5:00 PM"]);
      expect(d.file).toMatch(new RegExp(`2024_Tier1.SSC_CGL_2024_Tier1_${id.slice(11)}Sep_AllShifts_EN\.pdf$`));
      expect(d.url).toMatch(/^https:\/\/cdn\.aglasem\.com\/aglasem-doc\/[0-9a-f-]{36}\/[0-9a-f-]{36}\.pdf$/);
    }
    expect(SHIFTS["t1-2024-09-11-s1"]).toMatchObject({ sourceFile: "SSC_CGL_T1_2024-09-11_S1", pyqNote: "Tier I, 11 Sep 2024, Shift 1" });
  });

  it("lists every TCS file the 2024 sheets can come from (a file runs past its own day)", () => {
    const files2024 = tcsFiles().filter((f) => f.dir.startsWith("t1-2024-"));
    expect(files2024.length).toBe(12);
    expect(files2024[1]).toMatchObject({ dir: "t1-2024-09-10" });
  });
});

describe("SSC CGL 2022 Tier I (one TCS file per shift)", () => {
  it("registers each 2022 day with its four shift files, and lists each file for extraction", () => {
    // 5 Dec S4 holds three different papers and is left out: that day registers shifts 1-3.
    expect(DAYS["t1-2022-12-05"].present).toEqual([1, 2, 3]);
    const d = DAYS["t1-2022-12-08"];
    expect(d).toMatchObject({ tier: 1, date: "2022-12-08", shifts: 4, format: "tcs" });
    expect(Object.keys(d.shiftFiles ?? {})).toEqual(["1", "2", "3", "4"]);
    expect(d.shiftFiles![2].file).toMatch(/2022_Tier1.SSC_CGL_2022_Tier1_08Dec_S2_EN\.pdf$/);
    expect(d.slots).toEqual(["9:00 AM - 10:00 AM", "11:45 AM - 12:45 PM", "2:30 PM - 3:30 PM", "5:15 PM - 6:15 PM"]);
    const f = tcsFiles().find((x) => x.dir === "t1-2022-12-08-s2");
    expect(f).toMatchObject({ shift: 2, file: d.shiftFiles![2].file });
    expect(SHIFTS["t1-2022-12-08-s4"]).toMatchObject({ sourceFile: "SSC_CGL_T1_2022-12-08_S4", pyqNote: "Tier I, 8 Dec 2022, Shift 4" });
  });
});

describe("SSC CGL 2023 Tier I (one TCS file per day)", () => {
  it("registers the scanned 2023 sheets by page range, read by the vector reader per shift", () => {
    // 14 Jul: pages 1-58 are text sheets (S1, S2); its 2:30 and 5:15 sheets are scans.
    const d14 = DAYS["t1-2023-07-14"];
    expect(d14).toMatchObject({ pages: "1-58", shiftPages: { 3: "59-91", 4: "92-126" } });
    expect(d14.present).toBeUndefined();
    expect(Object.keys(DAYS["t1-2023-07-21"].shiftPages ?? {})).toEqual(["1", "2", "3", "4"]);
    const f14 = tcsFiles().filter((f) => f.day === d14);
    expect(f14).toEqual([
      { dir: "t1-2023-07-14", day: d14, file: d14.file, pages: "1-58" },
      { dir: "t1-2023-07-14-s3", day: d14, file: d14.file, shift: 3, pages: "59-91" },
      { dir: "t1-2023-07-14-s4", day: d14, file: d14.file, shift: 4, pages: "92-126" },
    ]);
    // a day that is all scans has no text-sheet entry
    expect(tcsFiles().filter((f) => f.day === DAYS["t1-2023-07-17"]).map((f) => f.dir)).toEqual(
      ["t1-2023-07-17-s1", "t1-2023-07-17-s2", "t1-2023-07-17-s3", "t1-2023-07-17-s4"],
    );
    // 14 Jul (4) + 17-24 Jul (6 days x 4) + 25, 26 Jul (4 each) + 27 Jul (3)
    expect(Object.keys(SHIFTS).filter((id) => id.startsWith("t1-2023-"))).toHaveLength(39);
  });

  it("registers the 2023 days with a text layer, each with the shifts its file holds", () => {
    const days = Object.entries(DAYS).filter(([id]) => id.startsWith("t1-2023-") && !DAYS[id].shiftPages);
    expect(days.map(([id]) => id.slice(8))).toEqual(["07-25", "07-26", "07-27"]);
    for (const [id, d] of days) {
      expect(d).toMatchObject({ tier: 1, format: "tcs", date: `2023-${id.slice(8)}` });
      expect(d.slots).toEqual(["9:00 AM - 10:00 AM", "11:45 AM - 12:45 PM", "2:30 PM - 3:30 PM", "5:15 PM - 6:15 PM"]);
      expect(d.file).toMatch(new RegExp(`2023_Tier1.SSC_CGL_2023_Tier1_${id.slice(11)}Jul_AllShifts_EN\.pdf$`));
      expect(d.url).toMatch(/^https:\/\/cdn\.aglasem\.com\/aglasem-doc\/[0-9a-f-]{36}\/[0-9a-f-]{36}\.pdf$/);
    }
    expect(DAYS["t1-2023-07-27"].present).toEqual([1, 2, 3]);
    expect(DAYS["t1-2023-07-25"].present).toBeUndefined();
    expect(SHIFTS["t1-2023-07-26-s4"]).toMatchObject({ sourceFile: "SSC_CGL_T1_2023-07-26_S4", pyqNote: "Tier I, 26 Jul 2023, Shift 4" });
    expect(tcsFiles().filter((f) => days.some(([, d]) => d === f.day)).map((f) => f.dir)).toEqual(days.map(([id]) => id));
  });
});

describe("SSC CGL Tier II (Paper 1)", () => {
  it("is its own exam row, beside Tier I's unchanged one", () => {
    expect(EXAMS[1]).toEqual({ name: "SSC CGL", id: "eec6daa8-bea9-4643-a10e-cfb3739be607" });
    expect(EXAMS[2].name).toBe("SSC CGL Tier II");
  });

  it("lays Paper 1 out as five modules, numbered 1-150 in print order", () => {
    const L = LAYOUTS[2];
    expect(L.map((s) => [s.part, s.count])).toEqual([["A", 30], ["B", 30], ["C", 45], ["D", 25], ["E", 20]]);
    expect(L.map((s) => s.subjects[0])).toEqual(["Quantitative Aptitude", "Reasoning", "English", expect.any(String), "Computer Knowledge"]);
    expect([...L[3].subjects].sort()).toEqual([...SECTION_SUBJECTS.B].sort());
    // the printed section names, as the 2024 sheets carry them
    const names = ["Module I Mathematical Abilities", "Module II Reasoning and General Intelligence", "Module I English Language and Comprehension", "Module II General Awareness", "Module I Computer Knowledge Module"];
    names.forEach((n, i) => expect(L.filter((s) => s.match.test(n)).map((s) => s.part), n).toEqual([L[i].part]));
  });

  it("keeps Tier I's layout exactly as SECTION_SUBJECTS has it", () => {
    expect(LAYOUTS[1].map((s) => [s.part, s.count])).toEqual([["A", 25], ["B", 25], ["C", 25], ["D", 25]]);
    expect(sectionSubjects(1)).toEqual(SECTION_SUBJECTS);
    expect(sectionSubjects(2).E).toEqual(["Computer Knowledge"]);
  });

  it("resolves subjects per tier: Computer Knowledge is Tier II's PART-E", () => {
    expect(subjectFor("E", undefined, 2)).toBe("Computer Knowledge");
    expect(subjectFor("A", undefined, 2)).toBe("Quantitative Aptitude");
    expect(() => subjectFor("E")).toThrow(/not a Tier I part/);
    expect(SUBJECTS(2)).toContain("Computer Knowledge");
    expect(SUBJECTS(1)).not.toContain("Computer Knowledge");
    expect(CATALOG["Computer Knowledge"]?.length).toBeGreaterThan(0);
  });

  it("registers the three sittings: CGL 2024 on 18 and 20 Jan 2025 (one file), CGL 2025 on 18 Jan 2026 (a scan)", () => {
    const t2 = Object.keys(SHIFTS).filter((id) => id.startsWith("t2-"));
    expect(t2).toEqual(expect.arrayContaining(["t2-2025-01-18-s1", "t2-2025-01-20-s1", "t2-2026-01-18-s1"]));
    expect(new Set(t2.map(tierOf))).toEqual(new Set([2]));
    expect(tierOf("t1-2025-09-18-s1")).toBe(1);
    expect(SHIFTS["t2-2025-01-20-s1"]).toMatchObject({
      sourceFile: "SSC_CGL_T2_2025-01-20_S1",
      // the paper is SSC's "Combined Graduate Level Examination 2024 Tier II": the cycle is the year
      pyqYear: 2024,
      pyqMonth: "January",
      pyqNote: "Tier II (CGL 2024), 20 Jan 2025",
    });
    expect(SHIFTS["t2-2026-01-18-s1"]).toMatchObject({ pyqYear: 2025, pyqNote: "Tier II (CGL 2025), 18 Jan 2026" });
  });

  it("registers the older Paper 1 sittings each original sheet exists for (CGL 2019-2023)", () => {
    const t2 = Object.keys(SHIFTS).filter((id) => id.startsWith("t2-")).sort();
    expect(t2).toEqual([
      "t2-2020-11-15-s1", // CGL 2019
      "t2-2022-01-29-s1", // CGL 2020
      "t2-2022-02-03-s1", // CGL 2020
      "t2-2022-08-08-s1", // CGL 2021
      "t2-2023-03-02-s1", // CGL 2022, the first five-module Paper 1
      "t2-2023-03-03-s1",
      "t2-2023-03-06-s1",
      "t2-2023-03-07-s1",
      "t2-2023-10-26-s1", // CGL 2023
      "t2-2025-01-18-s1",
      "t2-2025-01-20-s1",
      "t2-2026-01-18-s1",
    ]);
    expect(SHIFTS["t2-2020-11-15-s1"]).toMatchObject({ pyqYear: 2019, pyqMonth: "November", pyqNote: "Tier II (CGL 2019), 15 Nov 2020" });
    expect(SHIFTS["t2-2022-08-08-s1"]).toMatchObject({ pyqYear: 2021, sourceFile: "SSC_CGL_T2_2022-08-08_S1" });
    expect(SHIFTS["t2-2023-10-26-s1"]).toMatchObject({ pyqYear: 2023 });
    for (const id of t2) expect(DAYS[SHIFTS[id].day].file, id).toMatch(/_Tier2[\\/]SSC_CGL_20\d\d_Tier2_Paper1_/);
  });

  it("reads CGL 2016-2021 Paper 1 as ONE section of 100 Quantitative Abilities questions", () => {
    for (const day of ["t2-2020-11-15", "t2-2022-01-29", "t2-2022-02-03", "t2-2022-08-08"]) {
      expect(layoutOf(DAYS[day]).map((s) => [s.part, s.count, s.subjects]), day).toEqual([["A", 100, ["Quantitative Aptitude"]]]);
    }
    expect(layoutOf(DAYS["t2-2022-08-08"])[0].match.test("Quantitative abilities")).toBe(true);
    expect(shiftSections("t2-2022-08-08-s1")).toEqual({ A: ["Quantitative Aptitude"] });
    // the new pattern keeps the tier's five modules
    expect(layoutOf(DAYS["t2-2023-03-02"])).toBe(LAYOUTS[2]);
    expect(shiftSections("t2-2023-10-26-s1").E).toEqual(["Computer Knowledge"]);
    expect(shiftSections("t1-2025-09-18-s1")).toEqual(SECTION_SUBJECTS);
  });

  it("takes the CGL 2019 sheet's date from config: its hosted copy prints no Exam Date/Time header", () => {
    expect(DAYS["t2-2020-11-15"]).toMatchObject({ format: "tcs", headerless: true, cycle: 2019 });
    expect(tcsFiles().filter((f) => f.day.tier === 2).map((f) => f.dir)).toEqual([
      "t2-2020-11-15", "t2-2022-01-29", "t2-2022-02-03", "t2-2022-08-08",
      "t2-2023-03-02", "t2-2023-03-03", "t2-2023-03-06", "t2-2023-03-07", "t2-2023-10-26", "t2-2025-01-18",
    ]);
  });

  it("reads both 2024 sittings from the one file, and lists that file once", () => {
    expect(DAYS["t2-2025-01-18"]).toMatchObject({ tier: 2, format: "tcs", slots: ["9:00 AM - 12:00 PM"], cycle: 2024 });
    expect(DAYS["t2-2025-01-18"].file).toMatch(/2024_Tier2.SSC_CGL_2024_Tier2_Paper1_EN\.pdf$/);
    expect(DAYS["t2-2025-01-20"]).toMatchObject({ tier: 2, sheetIn: "t2-2025-01-18" });
    expect(tcsFiles().filter((f) => f.day.tier === 2 && f.day.cycle === 2024).map((f) => f.dir)).toEqual(["t2-2025-01-18"]);
  });
});
