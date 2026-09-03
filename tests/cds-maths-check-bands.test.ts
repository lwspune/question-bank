import { describe, expect, it } from "vitest";
import { checkBand } from "../scripts/cds-maths/check-bands";
import type { Band, TQ } from "../scripts/cds-maths/lib";

const CHAPTERS = new Set(["Number System", "Circles"]);

const q = (over: Partial<TQ> = {}): TQ => ({
  number: 1,
  stem: "What is \\(2 + 2\\) ?",
  options: [
    { label: "A", text: "3" },
    { label: "B", text: "4" },
    { label: "C", text: "5" },
    { label: "D", text: "6" },
  ],
  chapter: "Number System",
  subtopic: "Digits and Place Value",
  difficulty: "EASY",
  ...over,
});

const band = (questions: TQ[]): Band => ({
  band: "b1",
  pages: [0],
  bandReport: { numbersFound: questions.map((x) => x.number), firstComplete: true, lastComplete: true, notes: "" },
  questions,
});

const msgs = (b: Band) => checkBand(b, CHAPTERS).map((f) => `${f.level} ${f.msg}`).join("\n");
const errs = (b: Band) => checkBand(b, CHAPTERS).filter((f) => f.level === "ERROR");

describe("checkBand — a clean band", () => {
  it("reports nothing at all", () => {
    expect(checkBand(band([q()]), CHAPTERS)).toEqual([]);
  });

  it("accepts a well-formed Directions set", () => {
    const set = [
      q({ number: 4, setLabel: "D4-5", context: "Study the table." }),
      q({ number: 5, setLabel: "D4-5", context: "Study the table.", stem: "And what is \\(3+3\\) ?" }),
    ];
    expect(checkBand(band(set), CHAPTERS)).toEqual([]);
  });

  // The rule that has produced false positives in every hand-rolled version of
  // this probe: `\ne` is backslash + "n" + a letter, and is perfectly valid.
  it("does not flag LaTeX commands beginning with n as a literal backslash-n", () => {
    for (const cmd of ["\\ne", "\\neq", "\\nabla"]) {
      expect(msgs(band([q({ stem: `\\(a ${cmd} b\\)` })]))).not.toMatch(/backslash-n/);
    }
  });
});

describe("checkBand — each rule goes red", () => {
  it("a genuine literal backslash-n", () => {
    expect(msgs(band([q({ stem: "line one\\nline two" })]))).toMatch(/literal backslash-n/);
  });

  it("unbalanced math delimiters", () => {
    expect(msgs(band([q({ stem: "the value \\(x^2 is" })]))).toMatch(/unbalanced/);
  });

  it("a control character", () => {
    expect(msgs(band([q({ stem: "heta" })]))).toMatch(/control character/);
  });

  it("Unicode maths glyphs, naming the LaTeX form", () => {
    expect(msgs(band([q({ stem: "area is √2" })]))).toMatch(/\\sqrt/);
    expect(msgs(band([q({ stem: "angle 30°" })]))).toMatch(/\^\\circ/);
    expect(msgs(band([q({ stem: "x² + 1" })]))).toMatch(/\^2/);
  });

  it("a middle dot used as a decimal separator", () => {
    expect(msgs(band([q({ stem: "speed is 37·5 km/hour" })]))).toMatch(/full stop/);
  });

  it("dollar math and display math", () => {
    expect(msgs(band([q({ stem: "$x^2$" })]))).toMatch(/never \$ math/);
    expect(msgs(band([q({ stem: "\\[x^2\\]" })]))).toMatch(/display math/);
  });

  it("an answer field smuggled into a transcription", () => {
    const bad = { ...q(), answer: "B" } as unknown as TQ;
    expect(msgs(band([bad]))).toMatch(/must not carry an answer/);
  });

  it("option labels that are not exactly A,B,C,D", () => {
    const bad = q({ options: [{ label: "A", text: "3" }, { label: "B", text: "4" }, { label: "C", text: "5" }] });
    expect(msgs(band([bad]))).toMatch(/expected A,B,C,D/);
  });

  it("a chapter that is not in the catalog", () => {
    expect(msgs(band([q({ chapter: "Astrology" })]))).toMatch(/not in catalog\.json/);
  });

  it("hasFigure with no figureNote", () => {
    expect(msgs(band([q({ hasFigure: true })]))).toMatch(/figureNote is empty/);
  });

  it("a setLabel with no context", () => {
    expect(msgs(band([q({ setLabel: "D1" })]))).toMatch(/setLabel with no context/);
  });

  it("a bandReport that disagrees with its own questions", () => {
    const b = band([q({ number: 1 }), q({ number: 2 })]);
    b.bandReport.numbersFound = [1, 7];
    const m = msgs(b);
    expect(m).toMatch(/present but unreported: 2/);
    expect(m).toMatch(/reported but absent: 7/);
  });

  it("duplicate question numbers inside one band", () => {
    expect(msgs(band([q({ number: 3 }), q({ number: 3 })]))).toMatch(/duplicate question numbers: 3/);
  });

  it("an empty band", () => {
    expect(msgs(band([]))).toMatch(/no questions/);
  });
});

describe("checkBand — severity", () => {
  // A printed duplicate option is a SOURCE defect worth shipping a flag for, not
  // a transcription bug, so it must not block the merge.
  it("treats duplicate option text as a warning, not an error", () => {
    const b = band([q({ options: [
      { label: "A", text: "4" },
      { label: "B", text: "4" },
      { label: "C", text: "5" },
      { label: "D", text: "6" },
    ] })]);
    expect(errs(b)).toEqual([]);
    expect(msgs(b)).toMatch(/WARN .*identical text/);
  });

  it("treats a blank option as an error", () => {
    const b = band([q({ options: [
      { label: "A", text: "3" },
      { label: "B", text: " " },
      { label: "C", text: "5" },
      { label: "D", text: "6" },
    ] })]);
    expect(errs(b).some((f) => /blank/.test(f.msg))).toBe(true);
  });
});
