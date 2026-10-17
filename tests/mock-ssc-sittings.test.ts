import { describe, expect, it } from "vitest";
import { deriveSscSittings, deriveSscT2Sittings, t2Rows, withHeld } from "../scripts/mocks/sscSittings";
import { SSC_CGL_T2_COMPUTER_PAPER, SSC_CGL_T2_PAPER, totalQuestions } from "../src/lib/mocks/blueprints";
import type { PaperQuestionRow } from "../src/lib/mocks/reconstruct";
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

  it("makes Tier I mocks only: a Tier II sitting belongs to its own exam", () => {
    const t2 = { ...shift("2025-01-18", 1), day: "t2-2025-01-18", sourceFile: "SSC_CGL_T2_2025-01-18_S1" };
    const s = deriveSscSittings({ ...SHIFTS, "t2-2025-01-18-s1": t2 }, { "t2-2025-01-18-s1": [q(1)], "t1-2025-09-12-s1": [q(1)] }, {}, {});
    expect(s.map((x) => x.key)).toEqual(["t1-2025-09-12-s1"]);
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

const t2 = (date: string, cycle: number) => ({
  day: `t2-${date}`,
  shift: 1,
  sourceFile: `SSC_CGL_T2_${date}_S1`,
  pyqYear: cycle,
  pyqMonth: "January",
  pyqNote: `Tier II (CGL ${cycle}), ${date.slice(8)} Jan ${date.slice(0, 4)}`,
});

const T2_SHIFTS = {
  "t2-2025-01-18-s1": t2("2025-01-18", 2024),
  "t2-2026-01-18-s1": t2("2026-01-18", 2025),
  // CGL 2019: Paper 1 was Quantitative Abilities alone, a paper these blueprints do not describe.
  "t2-2020-11-15-s1": t2("2020-11-15", 2019),
  "t1-2025-09-12-s1": shift("2025-09-12", 1),
};
const fullPaper = (day: string) => day !== "t2-2020-11-15";

describe("deriveSscT2Sittings", () => {
  it("makes one sitting per transcribed five-module Tier II shift: a ranked mock and a Computer Knowledge mock", () => {
    const transcripts = { "t2-2025-01-18-s1": [q(1)], "t2-2020-11-15-s1": [q(1)], "t1-2025-09-12-s1": [q(1)] };
    expect(deriveSscT2Sittings(T2_SHIFTS, transcripts, {}, fullPaper)).toEqual([
      {
        key: "t2-2025-01-18-s1",
        sourceFile: "SSC_CGL_T2_2025-01-18_S1",
        year: 2024,
        slug: "ssc-cgl-tier-2-2025-01-18",
        title: "SSC CGL Tier II (CGL 2024), 18 Jan 2025",
        computerSlug: "ssc-cgl-tier-2-2025-01-18-computer",
        computerTitle: "SSC CGL Tier II (CGL 2024), 18 Jan 2025: Computer Knowledge",
        graceNumbers: [],
        heldSubjects: [],
      },
    ]);
  });

  it("rides every flawed question as grace", () => {
    const transcripts = { "t2-2025-01-18-s1": [q(1), q(66, { flawed: true }), q(119, { flawed: true, subject: "History" })] };
    const [s] = deriveSscT2Sittings(T2_SHIFTS, transcripts, {}, fullPaper);
    expect(s.graceNumbers).toEqual([66, 119]);
  });

  it("names the module of each held question, read from its number (1-30 Maths, 31-60 Reasoning, ...) or its own subject", () => {
    const transcripts = {
      "t2-2026-01-18-s1": [q(35), q(59), q(64), q(110, { subject: "Polity" }), q(140)],
    };
    const [s] = deriveSscT2Sittings(T2_SHIFTS, transcripts, { "t2-2026-01-18-s1": [35, 59, 64, 110, 140] }, fullPaper);
    expect(s.heldSubjects).toEqual(["Reasoning", "Reasoning", "English", "Polity", "Computer Knowledge"]);
  });

  it("refuses a held number its transcript does not hold", () => {
    expect(() =>
      deriveSscT2Sittings(T2_SHIFTS, { "t2-2026-01-18-s1": [q(1)] }, { "t2-2026-01-18-s1": [35] }, fullPaper)
    ).toThrow(/t2-2026-01-18-s1.*Q35/);
  });
});

describe("withHeld", () => {
  it("takes each held question off its section's count, so the count stays a hard check on what is served", () => {
    const bp = withHeld(SSC_CGL_T2_PAPER, ["Reasoning", "Reasoning", "History"]);
    expect(bp.sections.map((s) => [s.key, s.count])).toEqual([
      ["mathematical-abilities", 30],
      ["reasoning", 28],
      ["english", 45],
      ["general-awareness", 24],
    ]);
    expect(totalQuestions(bp)).toBe(127);
    expect(totalQuestions(SSC_CGL_T2_PAPER)).toBe(130);
  });

  it("returns the blueprint itself when nothing held falls in it", () => {
    expect(withHeld(SSC_CGL_T2_COMPUTER_PAPER, ["Reasoning"])).toBe(SSC_CGL_T2_COMPUTER_PAPER);
    expect(withHeld(SSC_CGL_T2_PAPER, [])).toBe(SSC_CGL_T2_PAPER);
  });
});

describe("t2Rows", () => {
  const row = (n: number, subjectName: string): PaperQuestionRow => ({
    id: `id-${n}`, sourceRow: n, questionNumber: String(n), subjectName, answer: { kind: "mcq", label: "A" },
  });
  const rows = [row(1, "Quantitative Aptitude"), row(70, "English"), row(131, "Computer Knowledge"), row(150, "Computer Knowledge")];

  it("the ranked mock takes every module but Computer Knowledge", () => {
    expect(t2Rows(rows, "ranked").map((r) => r.questionNumber)).toEqual(["1", "70"]);
  });

  it("the Computer Knowledge mock takes that module alone", () => {
    expect(t2Rows(rows, "computer").map((r) => r.questionNumber)).toEqual(["131", "150"]);
  });
});
