import { describe, expect, it } from "vitest";
import { deriveSscSittings } from "../scripts/mocks/sscSittings";
import type { TranscriptQuestion } from "../scripts/ssc-cgl/lib";

const shift = (date: string, n: number) => ({
  day: `t1-${date}`,
  shift: n,
  sourceFile: `SSC_CGL_T1_${date}_S${n}`,
  pyqYear: Number(date.slice(0, 4)),
  pyqMonth: "Sep",
  pyqNote: `Tier I, ${date.slice(8)} Sep ${date.slice(0, 4)}, Shift ${n}`,
});

const q = (number: number, extra: Partial<TranscriptQuestion> = {}): TranscriptQuestion => ({
  number,
  chapter: "c",
  subtopic: "s",
  difficulty: "EASY",
  answer: "A",
  figure: "none",
  flawed: false,
  stem: "x",
  options: ["a", "b", "c", "d"],
  solution: "y",
  ...extra,
});

const SHIFTS = {
  "t1-2025-09-12-s1": shift("2025-09-12", 1),
  "t1-2025-09-12-s2": shift("2025-09-12", 2),
  "t1-2025-09-13-s1": shift("2025-09-13", 1),
};

describe("deriveSscSittings", () => {
  it("makes one sitting per transcribed shift, slugged and titled from the shift, skipping shifts with no transcript", () => {
    const s = deriveSscSittings(SHIFTS, { "t1-2025-09-12-s1": [q(1)] }, {}, {});
    expect(s).toEqual([
      {
        key: "t1-2025-09-12-s1",
        sourceFile: "SSC_CGL_T1_2025-09-12_S1",
        year: 2025,
        slug: "ssc-cgl-2025-09-12-s1",
        title: "SSC CGL Tier I, 12 Sep 2025, Shift 1",
        graceNumbers: [],
        overrides: [],
      },
    ]);
  });

  it("rides every flawed question as grace", () => {
    const [s] = deriveSscSittings(SHIFTS, { "t1-2025-09-12-s1": [q(1), q(8, { flawed: true }), q(60, { flawed: true })] }, {}, {});
    expect(s.graceNumbers).toEqual([8, 60]);
  });

  it("brings a repeat back into its own slot with its subject and answer from this shift's transcript", () => {
    const transcripts = {
      "t1-2025-09-12-s2": [q(14, { answer: "C" }), q(30, { subject: "History", answer: "B" }), q(99, { answer: "D" })],
    };
    const repeats = {
      "t1-2025-09-12-s2": [
        { number: 14, questionId: "id-14", first: "SSC_CGL_T1_2025-09-12_S1 Q19" },
        { number: 30, questionId: "id-30", first: "SSC_CGL_T1_2025-09-12_S1 Q31" },
        { number: 99, questionId: "id-99", first: "SSC_CGL_T1_2025-09-12_S1 Q100" },
      ],
    };
    const [s] = deriveSscSittings(SHIFTS, transcripts, repeats, {});
    expect(s.overrides).toEqual([
      { questionNumber: 14, questionId: "id-14", subjectName: "Reasoning", answer: "C" },
      { questionNumber: 30, questionId: "id-30", subjectName: "History", answer: "B" },
      { questionNumber: 99, questionId: "id-99", subjectName: "English", answer: "D" },
    ]);
  });

  it("holds a shift whose hosted file lacks questions, naming them", () => {
    const missing = { "t1-2025-09-13": { 1: Array.from({ length: 25 }, (_, i) => 51 + i) } };
    const [s] = deriveSscSittings(SHIFTS, { "t1-2025-09-13-s1": [q(1)] }, {}, missing);
    expect(s.hold).toBe("Q51-75 are not in the hosted file (25 of 100)");
  });

  it("refuses a repeat the shift's transcript does not hold", () => {
    const repeats = { "t1-2025-09-12-s1": [{ number: 5, questionId: "id-5", first: "x Q1" }] };
    expect(() => deriveSscSittings(SHIFTS, { "t1-2025-09-12-s1": [q(1)] }, repeats, {})).toThrow(/t1-2025-09-12-s1.*Q5/);
  });
});
