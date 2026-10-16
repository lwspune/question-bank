import { describe, expect, it } from "vitest";
import { CATALOG, DAYS, SECTION_SUBJECTS, SHIFTS, SUBJECTS, subjectFor, tcsFiles } from "../scripts/ssc-cgl/config";

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
    for (const subject of SUBJECTS()) {
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

  it("has no subject the sections do not know", () => {
    expect(Object.keys(CATALOG).sort()).toEqual([...SUBJECTS()].sort());
  });
});

describe("SSC CGL shifts", () => {
  const ids = Object.keys(SHIFTS);

  it("registers the pilot shifts", () => {
    expect(ids).toEqual(expect.arrayContaining(["t1-2025-09-18-s1", "t1-2025-09-18-s2"]));
  });

  it("names every shift <day>-s<n> and keeps year and month in step with the day", () => {
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (const id of ids) {
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
  it("registers the 2023 days with a text layer, each with the shifts its file holds", () => {
    const days = Object.entries(DAYS).filter(([id]) => id.startsWith("t1-2023-"));
    // 17-24 Jul carry an OCR-like text layer the reader cannot use yet: not registered.
    expect(days.map(([id]) => id.slice(8))).toEqual(["07-14", "07-25", "07-26", "07-27"]);
    for (const [id, d] of days) {
      expect(d).toMatchObject({ tier: 1, format: "tcs", date: `2023-${id.slice(8)}` });
      expect(d.slots).toEqual(["9:00 AM - 10:00 AM", "11:45 AM - 12:45 PM", "2:30 PM - 3:30 PM", "5:15 PM - 6:15 PM"]);
      expect(d.file).toMatch(new RegExp(`2023_Tier1.SSC_CGL_2023_Tier1_${id.slice(11)}Jul_AllShifts_EN\.pdf$`));
      expect(d.url).toMatch(/^https:\/\/cdn\.aglasem\.com\/aglasem-doc\/[0-9a-f-]{36}\/[0-9a-f-]{36}\.pdf$/);
    }
    expect(DAYS["t1-2023-07-14"].present).toEqual([1, 2]);
    expect(DAYS["t1-2023-07-27"].present).toEqual([1, 2, 3]);
    expect(DAYS["t1-2023-07-25"].present).toBeUndefined();
    expect(SHIFTS["t1-2023-07-26-s4"]).toMatchObject({ sourceFile: "SSC_CGL_T1_2023-07-26_S4", pyqNote: "Tier I, 26 Jul 2023, Shift 4" });
    expect(tcsFiles().filter((f) => f.dir.startsWith("t1-2023-")).map((f) => f.dir)).toEqual(days.map(([id]) => id));
  });
});
