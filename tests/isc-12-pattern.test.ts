import { describe, it, expect } from "vitest";
import {
  ISC_SUBJECTS,
  MEASURED_YEARS,
  patternForYear,
  effectiveMarks,
  sectionForQuestion,
  type IscSubject,
} from "../scripts/isc-12-pyq/pattern";

/**
 * The ISC paper-pattern core.
 *
 * WHY A PATTERN TABLE EXISTS AT ALL: the three PCM subjects have THREE
 * DIFFERENT structures in the same sitting (Maths 22 q / 3 sections / 80 marks,
 * Physics 20 q / 4 sections / 70, Chemistry 21 q / 4 sections / 70), so there
 * is no single "ISC pattern" any consumer can assume. Measured from the printed
 * instruction pages of the 2026 papers and the 2025 marking schemes.
 *
 * WHY IT THROWS ON AN UNMEASURED YEAR: the cbse-12-pyq lane learned this the
 * expensive way — its 2022 COVID Term-2 paper is a different shape from every
 * other year, and a pattern that DEFAULTS silently turns "we never looked at
 * this year" into a confident false claim. See [[default-becomes-assertion]].
 */

describe("patternForYear", () => {
  it("returns the measured 2026 Mathematics pattern", () => {
    const p = patternForYear("Mathematics", 2026);
    expect(p.totalMarks).toBe(80);
    expect(p.totalQuestions).toBe(22);
    expect(p.durationMinutes).toBe(180);
    expect(p.sections.map((s) => s.id)).toEqual(["A", "B", "C"]);
  });

  it("returns four sections for Physics and Chemistry, both out of 70", () => {
    for (const subject of ["Physics", "Chemistry"] as const) {
      const p = patternForYear(subject, 2026);
      expect(p.totalMarks).toBe(70);
      expect(p.sections.map((s) => s.id)).toEqual(["A", "B", "C", "D"]);
    }
    expect(patternForYear("Physics", 2026).totalQuestions).toBe(20);
    expect(patternForYear("Chemistry", 2026).totalQuestions).toBe(21);
  });

  it("2025 and 2026 share a pattern per subject — measured, not assumed", () => {
    // The 2025 marking schemes carry exactly as many MARKING SCHEME blocks as
    // the 2026 papers carry questions (22/20/21), and the same section letters.
    // This pins that agreement so a future year that DIVERGES is visible.
    for (const subject of ISC_SUBJECTS) {
      const a = patternForYear(subject, 2025);
      const b = patternForYear(subject, 2026);
      expect(a.totalQuestions).toBe(b.totalQuestions);
      expect(a.totalMarks).toBe(b.totalMarks);
      expect(a.sections.map((s) => s.id)).toEqual(b.sections.map((s) => s.id));
    }
  });

  it("throws for a year that has not been measured", () => {
    expect(() => patternForYear("Mathematics", 2024)).toThrow(/not measured/i);
    expect(() => patternForYear("Physics", 2027)).toThrow(/not measured/i);
  });

  it("throws rather than defaulting for every unmeasured year in a wide range", () => {
    for (let y = 2015; y <= 2030; y++) {
      if ((MEASURED_YEARS as readonly number[]).includes(y)) continue;
      expect(() => patternForYear("Chemistry", y)).toThrow();
    }
  });
});

describe("effectiveMarks", () => {
  /**
   * ISC Mathematics prints 95 marks of sections (A 65 + B 15 + C 15) for an
   * 80-mark paper, because a candidate attempts EITHER Section B OR Section C.
   * A naive sum over sections is therefore wrong by 15 marks on one of the three
   * subjects, which is exactly the kind of total that looks plausible and is
   * not. Physics and Chemistry have no optional group, so their sum is direct.
   */
  it("counts an either/or group once for Mathematics", () => {
    const p = patternForYear("Mathematics", 2026);
    const naive = p.sections.reduce((n, s) => n + s.marks, 0);
    expect(naive).toBe(95);
    expect(effectiveMarks(p)).toBe(80);
  });

  it("equals the plain section sum where there is no optional group", () => {
    for (const subject of ["Physics", "Chemistry"] as const) {
      const p = patternForYear(subject, 2026);
      const naive = p.sections.reduce((n, s) => n + s.marks, 0);
      expect(naive).toBe(70);
      expect(effectiveMarks(p)).toBe(70);
    }
  });

  it("agrees with the declared totalMarks for every measured pattern", () => {
    for (const subject of ISC_SUBJECTS) {
      for (const year of MEASURED_YEARS) {
        const p = patternForYear(subject, year);
        expect(effectiveMarks(p)).toBe(p.totalMarks);
      }
    }
  });

  it("section question counts sum to the declared totalQuestions", () => {
    // Every printed Question number belongs to exactly one section, INCLUDING
    // the two mutually-exclusive ones — optionality is about what a candidate
    // answers, not about what the paper prints, and the bank stores what is
    // printed.
    for (const subject of ISC_SUBJECTS) {
      for (const year of MEASURED_YEARS) {
        const p = patternForYear(subject, year);
        const sum = p.sections.reduce((n, s) => n + s.questions, 0);
        expect(sum).toBe(p.totalQuestions);
      }
    }
  });
});

describe("question bands", () => {
  it("cover 1..totalQuestions contiguously, with no gap or overlap", () => {
    for (const subject of ISC_SUBJECTS) {
      for (const year of MEASURED_YEARS) {
        const p = patternForYear(subject, year);
        const sorted = [...p.bands].sort((a, b) => a.from - b.from);
        expect(sorted[0].from).toBe(1);
        expect(sorted[sorted.length - 1].to).toBe(p.totalQuestions);
        for (let i = 1; i < sorted.length; i++) {
          expect(sorted[i].from).toBe(sorted[i - 1].to + 1);
        }
      }
    }
  });

  it("uses exactly the sections the pattern declares, in order", () => {
    for (const subject of ISC_SUBJECTS) {
      const p = patternForYear(subject, 2026);
      expect(p.bands.map((b) => b.section)).toEqual(p.sections.map((s) => s.id));
    }
  });

  it("places every Section-C Maths question in the commerce band", () => {
    const p = patternForYear("Mathematics", 2026);
    // Verified against the 2025 marking scheme: Q20 Linear Regression,
    // Q21 Application of Calculus, Q22 Linear Programming.
    for (const q of [19, 20, 21, 22]) {
      expect(sectionForQuestion(p, q)).toBe("C");
    }
    expect(sectionForQuestion(p, 18)).toBe("B");
    expect(sectionForQuestion(p, 14)).toBe("A");
  });

  it("puts Physics Q11 in Section C and Q1 alone in Section A", () => {
    const p = patternForYear("Physics", 2026);
    expect(sectionForQuestion(p, 11)).toBe("C"); // read off p7 of the 2026 paper
    expect(sectionForQuestion(p, 1)).toBe("A");
    expect(sectionForQuestion(p, 2)).toBe("B");
    expect(sectionForQuestion(p, 20)).toBe("D");
  });

  it("does NOT size Section A by its band width — the subpart trap", () => {
    // Section A is ONE printed question carrying 14 subparts. A consumer that
    // measured the section by band width would read 1 where the paper means 14
    // marks, on all three subjects.
    for (const subject of ["Physics", "Chemistry"] as const) {
      const p = patternForYear(subject, 2026);
      const bandA = p.bands.find((b) => b.section === "A")!;
      const sectionA = p.sections.find((s) => s.id === "A")!;
      expect(bandA.to - bandA.from + 1).toBe(1);
      expect(sectionA.marks).toBe(14);
    }
  });

  it("throws for a question number outside the paper", () => {
    const p = patternForYear("Chemistry", 2026);
    expect(() => sectionForQuestion(p, 0)).toThrow(/outside the paper/i);
    expect(() => sectionForQuestion(p, 22)).toThrow(/outside the paper/i);
    expect(() => sectionForQuestion(p, 99)).toThrow(/outside the paper/i);
  });
});

describe("ISC_SUBJECTS", () => {
  it("is exactly PCM", () => {
    expect([...ISC_SUBJECTS]).toEqual(["Mathematics", "Physics", "Chemistry"]);
  });

  it("every subject resolves for every measured year", () => {
    for (const subject of ISC_SUBJECTS) {
      for (const year of MEASURED_YEARS) {
        expect(() => patternForYear(subject as IscSubject, year)).not.toThrow();
      }
    }
  });
});
