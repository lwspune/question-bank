import { describe, expect, it } from "vitest";
import { CATALOG, SECTION_SUBJECTS, SHIFTS, SUBJECTS, subjectFor } from "../scripts/ssc-cgl/config";

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

  it("gives every shift its own source_file (mocks find a sitting by it)", () => {
    const files = ids.map((id) => SHIFTS[id].sourceFile);
    expect(new Set(files).size).toBe(files.length);
  });

  it("keeps pyq_note a short sitting id, under the public provenance cap", () => {
    // audit:provenance: pyq notes publish only under 48 chars, and real sitting ids sit at <= 38.
    for (const id of ids) expect(SHIFTS[id].pyqNote.length, id).toBeLessThanOrEqual(38);
  });
});
