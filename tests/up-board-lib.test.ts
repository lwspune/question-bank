import { describe, it, expect } from "vitest";
import {
  parsePaperFile,
  sourceFileFor,
  pyqNoteFor,
  paperIssues,
  parityWarnings,
  buildRows,
  answerSummary,
  applySolutions,
  type UpPaper,
  type UpQuestion,
} from "../scripts/up-board/lib";
import { SUBJECTS } from "../scripts/up-board/config";

const catalog = new Map<string, string[]>([
  ["Probability", ["Theoretical Probability"]],
  ["Real Numbers", ["Fundamental Theorem of Arithmetic"]],
]);

const mcq = (over: Partial<UpQuestion> = {}): UpQuestion => ({
  ref: "Q2",
  questionNumber: "2",
  section: "A",
  marks: 1,
  format: "mcq",
  chapter: "Probability",
  subtopic: "Theoretical Probability",
  difficulty: "EASY",
  stem: "A die is thrown once. The probability of getting an odd number will be :",
  options: [
    { label: "A", text: "\\(\\frac{1}{6}\\)" },
    { label: "B", text: "\\(\\frac{1}{2}\\)" },
    { label: "C", text: "\\(\\frac{1}{3}\\)" },
    { label: "D", text: "1" },
  ],
  hi: {
    stem: "किसी पासे को एक बार फेंका जाता है, तो एक विषम संख्या के आने की प्रायिकता होगी :",
    options: ["\\(\\frac{1}{6}\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{3}\\)", "1"],
  },
  ...over,
});

const written = (over: Partial<UpQuestion> = {}): UpQuestion => ({
  ref: "B1a",
  questionNumber: "1 (a)",
  section: "B",
  marks: 2,
  format: "subjective",
  chapter: "Real Numbers",
  subtopic: "Fundamental Theorem of Arithmetic",
  difficulty: "EASY",
  stem: "Find the HCF of 96 and 404 by the prime factorisation method.",
  hi: { stem: "अभाज्य गुणनखण्डन विधि द्वारा 96 और 404 का HCF ज्ञात कीजिए।" },
  ...over,
});

const paper = (questions: UpQuestion[], over: Partial<UpPaper> = {}): UpPaper => ({
  paper: "822-BW",
  year: 2025,
  subject: "maths10",
  questions,
  ...over,
});

const solved = (q: UpQuestion): UpQuestion => ({
  ...q,
  ...(q.format === "mcq" ? { answer: "B" as const } : {}),
  solution: "Three of the six faces are odd, so the probability is \\(\\frac{3}{6} = \\frac{1}{2}\\).",
  hi: { ...q.hi, solution: "छह में से तीन फलक विषम हैं, अतः प्रायिकता \\(\\frac{3}{6} = \\frac{1}{2}\\) है।" },
});

describe("parsePaperFile", () => {
  it("reads subject, code, series and year from an upboardonline file name", () => {
    expect(parsePaperFile("up-board-class-10-mathematics-822-bw-2025.pdf")).toEqual({
      id: "2025-822-BW",
      subject: "maths10",
      year: 2025,
      code: "822",
      series: "BW",
      file: "up-board-class-10-mathematics-822-bw-2025.pdf",
    });
    expect(parsePaperFile("up-board-class-12-biology-348-kh-2025").subject).toBe("biology12");
  });

  it("refuses a half-yearly paper and a subject outside the scope", () => {
    expect(() => parsePaperFile("up-board-class-12-physics-141124-2025.pdf")).toThrow();
    expect(() => parsePaperFile("up-board-class-10-hindi-801-ha-2024.pdf")).toThrow();
  });

  it("refuses a code that does not belong to the named subject", () => {
    expect(() => parsePaperFile("up-board-class-10-mathematics-824-bw-2025.pdf")).toThrow(/code/);
  });
});

describe("sourceFileFor / pyqNoteFor", () => {
  it("names the paper uniquely and keeps the public note short", () => {
    const p = paper([]);
    expect(sourceFileFor(p)).toBe("up-board-10-pyq-2025-822-BW");
    expect(pyqNoteFor(p)).toBe("Paper 822 (BW)");
    // audit:provenance publishes a pyq note only under 48 characters.
    expect(pyqNoteFor(p).length).toBeLessThan(39);
  });
});

describe("paperIssues (transcribed stage)", () => {
  it("passes a well-formed bilingual paper", () => {
    expect(paperIssues(paper([mcq(), written()]), catalog, "transcribed")).toEqual([]);
  });

  it("fails a chapter or subtopic outside the catalog", () => {
    const issues = paperIssues(paper([mcq({ chapter: "Probabilty" }), written({ subtopic: "Euclid" })]), catalog, "transcribed");
    expect(issues.some((i) => /Q2: chapter "Probabilty"/.test(i))).toBe(true);
    expect(issues.some((i) => /B1a: subtopic "Euclid"/.test(i))).toBe(true);
  });

  it("fails a missing Hindi version, and Hindi with no Devanagari", () => {
    expect(paperIssues(paper([mcq({ hi: undefined as never })]), catalog, "transcribed")).toContain("Q2: no Hindi version (hi)");
    const english = mcq({ hi: { stem: "A die is thrown once.", options: ["1", "2", "3", "4"] } });
    expect(paperIssues(paper([english]), catalog, "transcribed")).toContain("Q2: hi stem carries no Devanagari");
  });

  it("fails an MCQ without four options in either language, and a written row with options", () => {
    const three = mcq({ options: mcq().options!.slice(0, 3) });
    expect(paperIssues(paper([three]), catalog, "transcribed")).toContain("Q2: mcq needs options A-D, has A B C");
    const hiThree = mcq({ hi: { ...mcq().hi, options: ["1", "2", "3"] } });
    expect(paperIssues(paper([hiThree]), catalog, "transcribed")).toContain("Q2: hi has 3 options, expected 4");
    const opts = written({ options: mcq().options });
    expect(paperIssues(paper([opts]), catalog, "transcribed")).toContain("B1a: a written row carries options");
  });

  it("fails unbalanced maths in either language", () => {
    const bad = mcq({ stem: "Find \\(x^2 + 1" });
    expect(paperIssues(paper([bad]), catalog, "transcribed").some((i) => i.startsWith("Q2: stem:"))).toBe(true);
    const badHi = mcq({ hi: { ...mcq().hi, stem: "मान \\(x" } });
    expect(paperIssues(paper([badHi]), catalog, "transcribed").some((i) => i.startsWith("Q2: hi stem:"))).toBe(true);
  });

  it("fails a duplicate ref, an OR alternative pointing nowhere, and the hoster's footer", () => {
    const issues = paperIssues(
      paper([mcq(), mcq(), written({ ref: "B3b", alternativeTo: "B3a" }), written({ ref: "B4", stem: "https://www.upboardonline.com" })]),
      catalog,
      "transcribed"
    );
    expect(issues).toContain("Q2: duplicate ref");
    expect(issues).toContain('B3b: alternativeTo "B3a" names no row');
    expect(issues).toContain("B4: carries the upboardonline.com footer");
  });

  it("fails a literal backslash-n (the DB rejects it; fix the source)", () => {
    const issues = paperIssues(paper([written({ stem: "Line one\\nLine two" })]), catalog, "transcribed");
    expect(issues).toContain("B1a: stem has a literal \\n");
  });

  it("refuses an answer or solution at the transcribed stage (transcription is blind)", () => {
    expect(paperIssues(paper([mcq({ answer: "B" })]), catalog, "transcribed")).toContain(
      "Q2: carries an answer at the transcribed stage"
    );
  });

  it("checks a Class 10 paper has exactly 20 MCQs", () => {
    const issues = paperIssues(paper([mcq()]), catalog, "transcribed", { expectMcq: 20 });
    expect(issues).toContain("paper: 1 MCQ(s), expected 20");
  });
});

describe("paperIssues (solved stage)", () => {
  it("passes a solved paper", () => {
    expect(paperIssues(paper([solved(mcq()), solved(written())]), catalog, "solved")).toEqual([]);
  });

  it("needs a key on every MCQ and a solution in both languages on every row", () => {
    const issues = paperIssues(paper([mcq(), written()]), catalog, "solved");
    expect(issues).toContain("Q2: mcq has no answer");
    expect(issues).toContain("Q2: no English solution");
    expect(issues).toContain("B1a: no Hindi solution");
  });

  it("refuses a Hindi solution with no Devanagari and a solution in solver voice", () => {
    const s = solved(written());
    const issues = paperIssues(
      paper([{ ...s, solution: "I think the answer is 4.", hi: { ...s.hi, solution: "The answer is 4." } }]),
      catalog,
      "solved"
    );
    expect(issues).toContain("B1a: hi solution carries no Devanagari");
    expect(issues.some((i) => /B1a: solution reads as solver notes/.test(i))).toBe(true);
  });
});

describe("parityWarnings", () => {
  it("is quiet when both languages carry the same numbers", () => {
    expect(parityWarnings(mcq())).toEqual([]);
  });

  it("names a field whose numbers differ (a misread digit in either language)", () => {
    const w = parityWarnings(written({ hi: { stem: "अभाज्य गुणनखण्डन विधि द्वारा 96 और 440 का HCF ज्ञात कीजिए।" } }));
    expect(w).toHaveLength(1);
    expect(w[0]).toMatch(/^B1a: stem numbers differ/);
  });
});

describe("buildRows", () => {
  it("builds an MCQ and a written row the way the upload path expects", () => {
    const rows = buildRows(paper([solved(mcq()), solved(written())]), SUBJECTS.maths10);
    expect(rows).toHaveLength(2);
    expect(rows[0].questionFormat).toBe("mcq");
    expect(rows[0].options.filter((o) => o.isCorrect).map((o) => o.label)).toEqual(["B"]);
    expect(rows[1].questionFormat).toBe("subjective");
    expect(rows[1].options).toEqual([]);
    expect(rows[0].subjectName).toBe("Mathematics");
    expect(new Set(rows.map((r) => r.contentHash)).size).toBe(2);
  });

  it("hashes English only, so editing the Hindi never moves a row's identity", () => {
    const a = buildRows(paper([solved(mcq())]), SUBJECTS.maths10)[0].contentHash;
    const q = solved(mcq());
    const b = buildRows(paper([{ ...q, hi: { ...q.hi, stem: "बदला हुआ हिन्दी पाठ" } }]), SUBJECTS.maths10)[0].contentHash;
    expect(a).toBe(b);
  });

  it("refuses to build an unsolved paper", () => {
    expect(() => buildRows(paper([mcq()]), SUBJECTS.maths10)).toThrow(/no answer/);
  });
});

describe("applySolutions", () => {
  const passA = {
    answers: { Q2: "B" as const },
    solutions: {
      Q2: { en: "Three of the six faces are odd, so \\(\\frac{3}{6} = \\frac{1}{2}\\).", hi: "छह में से तीन फलक विषम हैं।" },
      B1a: { en: "\\(96 = 2^5 \\times 3\\), so the HCF is 4.", hi: "\\(96 = 2^5 \\times 3\\), अतः HCF 4 है।" },
    },
  };

  it("keys agreed MCQs, writes both solutions and the no-key note in both languages", () => {
    const out = applySolutions(paper([mcq(), written()]), passA, { answers: { Q2: "B" } }, {});
    const [q, w] = out.questions;
    expect(q.answer).toBe("B");
    expect(q.solution).toMatch(/^Three of the six faces/);
    expect(q.solution).toMatch(/UP Board does not publish an answer key/);
    expect(q.hi.solution).toMatch(/^छह में से/);
    expect(q.hi.solution).toMatch(/उत्तर कुंजी/);
    expect(w.answer).toBeUndefined();
    expect(w.solution).toMatch(/HCF is 4/);
    expect(paperIssues(out, catalog, "solved")).toEqual([]);
  });

  it("refuses while any MCQ is disputed and unsettled", () => {
    expect(() => applySolutions(paper([mcq()]), passA, { answers: { Q2: "C" } }, {})).toThrow(/Q2.*B.*C/);
  });

  it("takes a settled answer with its own solution over both passes", () => {
    const out = applySolutions(paper([mcq()]), passA, { answers: { Q2: "C" } }, {
      Q2: { answer: "B", en: "Settled: three odd faces of six.", hi: "निर्णय: छह में से तीन विषम फलक।" },
    });
    expect(out.questions[0].answer).toBe("B");
    expect(out.questions[0].solution).toMatch(/^Settled/);
  });

  it("needs a solution for every row", () => {
    expect(() => applySolutions(paper([written()]), { answers: {}, solutions: {} }, { answers: {} }, {})).toThrow(
      /B1a: no solution/
    );
  });
});

describe("answerSummary", () => {
  it("compares two blind passes and lists every disagreement", () => {
    const s = answerSummary(
      [mcq({ ref: "Q1" }), mcq({ ref: "Q2" }), mcq({ ref: "Q3" })],
      { Q1: "A", Q2: "B", Q3: "C" },
      { Q1: "A", Q2: "C" }
    );
    expect(s.agreed).toEqual({ Q1: "A" });
    expect(s.disputed).toEqual([
      { ref: "Q2", a: "B", b: "C" },
      { ref: "Q3", a: "C", b: null },
    ]);
  });
});
