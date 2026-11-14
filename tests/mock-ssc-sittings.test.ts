import { describe, expect, it } from "vitest";
import { deriveChslSittings, deriveCpoSittings, deriveSscSittings, deriveSscT2Sittings, t2Rows, withHeld } from "../scripts/mocks/sscSittings";
import { SSC_CGL_T2_COMPUTER_PAPER, SSC_CGL_T2_PAPER, SSC_CHSL_T1_PAPER, SSC_CPO_P1_PAPER, totalQuestions } from "../src/lib/mocks/blueprints";
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
const paperOf = (day: string) => (day === "t2-2020-11-15" ? ("quant" as const) : ("five-module" as const));

describe("deriveSscT2Sittings", () => {
  it("makes one sitting per transcribed five-module Tier II shift: a ranked mock and a Computer Knowledge mock", () => {
    const transcripts = { "t2-2025-01-18-s1": [q(1)], "t1-2025-09-12-s1": [q(1)] };
    expect(deriveSscT2Sittings(T2_SHIFTS, transcripts, {}, paperOf)).toEqual([
      {
        key: "t2-2025-01-18-s1",
        paper: "five-module",
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

  it("makes a Quantitative-Abilities-only sitting (CGL 2019-2021) one mock, with no Computer Knowledge mock", () => {
    const [s] = deriveSscT2Sittings(T2_SHIFTS, { "t2-2020-11-15-s1": [q(1), q(40, { flawed: true }), q(77)] }, { "t2-2020-11-15-s1": [77] }, paperOf);
    expect(s).toEqual({
      key: "t2-2020-11-15-s1",
      paper: "quant",
      sourceFile: "SSC_CGL_T2_2020-11-15_S1",
      year: 2019,
      slug: "ssc-cgl-tier-2-2020-11-15",
      title: "SSC CGL Tier II (CGL 2019), 15 Jan 2020",
      graceNumbers: [40],
      heldSubjects: ["Quantitative Aptitude"],
    });
  });

  it("skips a day whose paper no blueprint describes", () => {
    expect(deriveSscT2Sittings(T2_SHIFTS, { "t2-2025-01-18-s1": [q(1)] }, {}, () => null)).toEqual([]);
  });

  it("rides every flawed question as grace", () => {
    const transcripts = { "t2-2025-01-18-s1": [q(1), q(66, { flawed: true }), q(119, { flawed: true, subject: "History" })] };
    const [s] = deriveSscT2Sittings(T2_SHIFTS, transcripts, {}, paperOf);
    expect(s.graceNumbers).toEqual([66, 119]);
  });

  it("names the module of each held question, read from its number (1-30 Maths, 31-60 Reasoning, ...) or its own subject", () => {
    const transcripts = {
      "t2-2026-01-18-s1": [q(35), q(59), q(64), q(110, { subject: "Polity" }), q(140)],
    };
    const [s] = deriveSscT2Sittings(T2_SHIFTS, transcripts, { "t2-2026-01-18-s1": [35, 59, 64, 110, 140] }, paperOf);
    expect(s.heldSubjects).toEqual(["Reasoning", "Reasoning", "English", "Polity", "Computer Knowledge"]);
  });

  it("refuses a held number its transcript does not hold", () => {
    expect(() =>
      deriveSscT2Sittings(T2_SHIFTS, { "t2-2026-01-18-s1": [q(1)] }, { "t2-2026-01-18-s1": [35] }, paperOf)
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

describe("deriveChslSittings (SSC CHSL Tier I)", () => {
  const chslShift = (dd: string) => ({
    day: `chsl-t1-2024-07-${dd}`,
    shift: 1,
    sourceFile: `SSC_CHSL_T1_2024-07-${dd}_S1`,
    pyqYear: 2024,
    pyqMonth: "July",
    pyqNote: `Tier I, ${Number(dd)} Jul 2024, Shift 1`,
  });
  const MIXED = { ...SHIFTS, "chsl-t1-2024-07-01-s1": chslShift("01"), "chsl-t1-2024-07-03-s1": chslShift("03") };
  // CHSL's print order: 1-25 English, 26-50 Reasoning, 51-75 Quant, 76-100 General Awareness
  const paper = (extra: Record<number, Partial<TranscriptQuestion>> = {}) =>
    Array.from({ length: 100 }, (_, i) => q(i + 1, { ...(i >= 75 ? { subject: "History" } : {}), ...extra[i + 1] }));

  it("makes one CHSL mock per transcribed shift, never a CGL shift", () => {
    const s = deriveChslSittings(MIXED, { "chsl-t1-2024-07-01-s1": paper(), "t1-2025-09-12-s1": paper() }, {});
    expect(s).toEqual([
      {
        key: "chsl-t1-2024-07-01-s1",
        sourceFile: "SSC_CHSL_T1_2024-07-01_S1",
        year: 2024,
        slug: "ssc-chsl-2024-07-01-s1",
        title: "SSC CHSL Tier I, 1 Jul 2024, Shift 1",
        graceNumbers: [],
        heldSubjects: [],
        overrides: [],
      },
    ]);
    // and CGL's own derivation never takes a CHSL shift
    expect(deriveSscSittings(MIXED, { "chsl-t1-2024-07-01-s1": paper() }, {}, {})).toEqual([]);
  });

  it("rides every flawed question as grace and names the subject of each held one", () => {
    const s = deriveChslSittings(MIXED, { "chsl-t1-2024-07-03-s1": paper({ 60: { flawed: true }, 63: { flawed: true } }) }, { "chsl-t1-2024-07-03-s1": [63] });
    expect(s[0].graceNumbers).toEqual([60, 63]);
    expect(s[0].heldSubjects).toEqual(["Quantitative Aptitude"]);
  });

  it("refuses a held number its transcript does not hold", () => {
    expect(() => deriveChslSittings(MIXED, { "chsl-t1-2024-07-03-s1": paper().slice(0, 50) }, { "chsl-t1-2024-07-03-s1": [63] })).toThrow(/HELD names Q63/);
  });

  it("brings a repeat SSC printed twice back at its own slot (18 Nov 2025 S1 Q35 = Q34)", () => {
    const s = deriveChslSittings(
      MIXED,
      { "chsl-t1-2024-07-01-s1": paper({ 35: { answer: "C" }, 80: { answer: "D", subject: "Polity" } }) },
      {},
      { "chsl-t1-2024-07-01-s1": [
        { number: 35, questionId: "q-34", first: "SSC_CHSL_T1_2024-07-01_S1 Q34" },
        { number: 80, questionId: "q-12", first: "SSC_CHSL_T1_2024-07-02_S1 Q90" },
      ] }
    );
    expect(s[0].overrides).toEqual([
      { questionNumber: 35, questionId: "q-34", subjectName: "Reasoning", answer: "C" },
      { questionNumber: 80, questionId: "q-12", subjectName: "Polity", answer: "D" },
    ]);
    expect(() =>
      deriveChslSittings(MIXED, { "chsl-t1-2024-07-01-s1": paper().slice(0, 30) }, {}, { "chsl-t1-2024-07-01-s1": [{ number: 35, questionId: "x", first: "y" }] })
    ).toThrow(/repeats.json names Q35/);
  });

  it("builds against CHSL's blueprint: 4 x 25 in CHSL order, +2/-0.5, 60 minutes, held questions off their section", () => {
    expect(SSC_CHSL_T1_PAPER).toMatchObject({ examName: "SSC CHSL", examSlug: "ssc-chsl", durationSecs: 3600, marking: { correct: 2, wrong: -0.5 } });
    expect(SSC_CHSL_T1_PAPER.sections.map((x) => [x.key, x.count])).toEqual([["english", 25], ["reasoning", 25], ["quantitative-aptitude", 25], ["general-awareness", 25]]);
    expect(totalQuestions(SSC_CHSL_T1_PAPER)).toBe(100);
    const two = withHeld(SSC_CHSL_T1_PAPER, ["Quantitative Aptitude", "Quantitative Aptitude"]);
    expect(two.sections.find((x) => x.key === "quantitative-aptitude")!.count).toBe(23);
  });
});

describe("deriveCpoSittings (SSC CPO Paper I)", () => {
  const cpoShift = (date: string, n: number) => ({
    day: `cpo-t1-${date}`,
    shift: n,
    sourceFile: `SSC_CPO_T1_${date}_S${n}`,
    pyqYear: Number(date.slice(0, 4)),
    pyqMonth: "June",
    pyqNote: `Paper I, ${Number(date.slice(8))} Jun ${date.slice(0, 4)}, Shift ${n}`,
  });
  const MIXED = {
    ...SHIFTS,
    "cpo-t1-2024-06-27-s1": cpoShift("2024-06-27", 1),
    "cpo-t1-2024-06-27-s2": cpoShift("2024-06-27", 2),
    "chsl-t1-2024-07-01-s1": { ...cpoShift("2024-07-01", 1), day: "chsl-t1-2024-07-01", sourceFile: "SSC_CHSL_T1_2024-07-01_S1" },
  };
  // CPO's print order: 1-50 Reasoning, 51-100 General Knowledge, 101-150 Quant, 151-200 English
  const paper = (extra: Record<number, Partial<TranscriptQuestion>> = {}) =>
    Array.from({ length: 200 }, (_, i) => q(i + 1, { ...(i >= 50 && i < 100 ? { subject: "History" } : {}), ...extra[i + 1] }));

  it("makes one CPO mock per transcribed shift, never a CGL or CHSL shift", () => {
    const s = deriveCpoSittings(MIXED, { "cpo-t1-2024-06-27-s1": paper(), "t1-2025-09-12-s1": paper(), "chsl-t1-2024-07-01-s1": paper() }, {});
    expect(s).toEqual([
      {
        key: "cpo-t1-2024-06-27-s1",
        sourceFile: "SSC_CPO_T1_2024-06-27_S1",
        year: 2024,
        slug: "ssc-cpo-2024-06-27-s1",
        title: "SSC CPO Paper I, 27 Jun 2024, Shift 1",
        graceNumbers: [],
        heldSubjects: [],
        overrides: [],
      },
    ]);
    // and neither CGL's nor CHSL's derivation takes a CPO shift
    expect(deriveSscSittings(MIXED, { "cpo-t1-2024-06-27-s1": paper() }, {}, {})).toEqual([]);
    expect(deriveChslSittings(MIXED, { "cpo-t1-2024-06-27-s1": paper() }, {})).toEqual([]);
  });

  it("names each section's subject from the question number, General Knowledge from the block itself", () => {
    const s = deriveCpoSittings(
      MIXED,
      { "cpo-t1-2024-06-27-s2": paper({ 120: { flawed: true }, 170: { flawed: true } }) },
      { "cpo-t1-2024-06-27-s2": [10, 60, 120, 170] }
    );
    expect(s[0].graceNumbers).toEqual([120, 170]);
    expect(s[0].heldSubjects).toEqual(["Reasoning", "History", "Quantitative Aptitude", "English"]);
  });

  it("brings a repeat back at its own slot, and refuses one its transcript does not hold", () => {
    const s = deriveCpoSittings(
      MIXED,
      { "cpo-t1-2024-06-27-s1": paper({ 77: { answer: "B", subject: "Polity" }, 160: { answer: "D" } }) },
      {},
      { "cpo-t1-2024-06-27-s1": [
        { number: 77, questionId: "q-1", first: "SSC_CPO_T1_2024-06-27_S2 Q55" },
        { number: 160, questionId: "q-2", first: "SSC_CPO_T1_2024-06-28_S1 Q161" },
      ] }
    );
    expect(s[0].overrides).toEqual([
      { questionNumber: 77, questionId: "q-1", subjectName: "Polity", answer: "B" },
      { questionNumber: 160, questionId: "q-2", subjectName: "English", answer: "D" },
    ]);
    expect(() =>
      deriveCpoSittings(MIXED, { "cpo-t1-2024-06-27-s1": paper().slice(0, 30) }, {}, { "cpo-t1-2024-06-27-s1": [{ number: 160, questionId: "x", first: "y" }] })
    ).toThrow(/repeats.json names Q160/);
  });

  it("builds against CPO's blueprint: 4 x 50 in CPO order, +1/-0.25, 120 minutes", () => {
    expect(SSC_CPO_P1_PAPER).toMatchObject({ examName: "SSC CPO", examSlug: "ssc-cpo", durationSecs: 7200, marking: { correct: 1, wrong: -0.25 } });
    expect(SSC_CPO_P1_PAPER.sections.map((x) => [x.key, x.count])).toEqual([["reasoning", 50], ["general-awareness", 50], ["quantitative-aptitude", 50], ["english", 50]]);
    expect(totalQuestions(SSC_CPO_P1_PAPER)).toBe(200);
  });
});
