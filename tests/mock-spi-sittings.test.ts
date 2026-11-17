import { describe, expect, it } from "vitest";
import { SPI_2026_PAPER, SPI_PAPER, getBlueprint, spiPaperFor, totalMarks, totalQuestions } from "../src/lib/mocks/blueprints";
import { assignSection, buildMockPaper, validatePaperRows, type PaperQuestionRow } from "../src/lib/mocks/reconstruct";
import { deriveSpiSittings } from "../scripts/mocks/spiSittings";
import { PAPERS, requirePaper, SUBJECTS } from "../scripts/spi/config";
import { parseTranscript } from "../scripts/ssc-cgl/lib";

const block = (n: number, extra = "") =>
  `=== ${n}\nchapter: Number System\nsubtopic: x\ndifficulty: EASY\nanswer: B\n${extra}stem:\nQ${n}?\nA: 1\nB: 2\nC: 3\nD: 4\nsolution:\nWhy.\n`;

describe("SPI_PAPER", () => {
  it("is the printed paper: 150 questions, 3 hours, +1 / -0.5, two parts of 75", () => {
    expect(totalQuestions(SPI_PAPER)).toBe(150);
    expect(SPI_PAPER.durationSecs).toBe(180 * 60);
    expect(SPI_PAPER.marking).toEqual({ correct: 1, wrong: -0.5 });
    expect(SPI_PAPER.sections.map((s) => s.count)).toEqual([75, 75]);
  });

  it("files every bank subject under exactly one section", () => {
    const all = SPI_PAPER.sections.flatMap((s) => s.subjects);
    expect(new Set(all).size).toBe(all.length);
    expect([...all].sort()).toEqual([...SUBJECTS].sort());
  });
});

describe("SPI_2026_PAPER", () => {
  it("is the 2026 booklet: the same two parts of 75 and 3 hours, but +4 / -1 out of 600", () => {
    expect(totalQuestions(SPI_2026_PAPER)).toBe(150);
    expect(SPI_2026_PAPER.durationSecs).toBe(180 * 60);
    expect(SPI_2026_PAPER.marking).toEqual({ correct: 4, wrong: -1 });
    expect(totalMarks(SPI_2026_PAPER)).toBe(600);
    expect(SPI_2026_PAPER.sections.map((s) => s.key)).toEqual(SPI_PAPER.sections.map((s) => s.key));
  });

  // 2026 prints Reasoning in BOTH parts (Q64 in Part 1, Q144-150 in Part 2), so subject
  // alone cannot split the paper; each part is the printed numbers it covers.
  const row = (n: number, subjectName: string): PaperQuestionRow => ({
    id: `q${n}`,
    sourceRow: null,
    questionNumber: String(n),
    subjectName,
    answer: { kind: "mcq", label: "A" },
  });
  const paper2026 = Array.from({ length: 150 }, (_, i) => {
    const n = i + 1;
    if (n === 64 || n >= 144) return row(n, "Reasoning");
    return row(n, n <= 75 ? "Mathematics" : n <= 120 ? "English" : "Physics");
  });

  it("files a Reasoning question by the part it is printed in", () => {
    expect(assignSection(SPI_2026_PAPER, "Reasoning", null, "mcq", 64)).toBe("mathematical-ability");
    expect(assignSection(SPI_2026_PAPER, "Reasoning", null, "mcq", 146)).toBe("general-ability");
    expect(assignSection(SPI_2026_PAPER, "Mathematics", null, "mcq", 120)).toBeNull();
  });

  it("validates a 2026 paper as 75 + 75 with Reasoning in both parts", () => {
    expect(validatePaperRows(SPI_2026_PAPER, paper2026)).toEqual([]);
    const built = buildMockPaper(SPI_2026_PAPER, paper2026, { year: 2026, month: null });
    expect(built.sections.map((s) => s.count)).toEqual([75, 75]);
    expect(built.totalMarks).toBe(600);
  });

  it("leaves 2022's scheme, where every Reasoning question is in Part 1, as it was", () => {
    expect(assignSection(SPI_PAPER, "Reasoning", null, "mcq", 10)).toBe("mathematical-ability");
    expect(assignSection(SPI_PAPER, "Reasoning", null, "mcq")).toBe("mathematical-ability");
  });

  it("has its own code, so getBlueprint finds each scheme", () => {
    expect(SPI_2026_PAPER.code).not.toBe(SPI_PAPER.code);
    expect(getBlueprint("spi", SPI_2026_PAPER.code)).toBe(SPI_2026_PAPER);
    expect(getBlueprint("spi", SPI_PAPER.code)).toBe(SPI_PAPER);
  });

  it("spiPaperFor picks the scheme printed on that year's booklet", () => {
    expect(spiPaperFor(2022)).toBe(SPI_PAPER);
    expect(spiPaperFor(2026)).toBe(SPI_2026_PAPER);
    expect(spiPaperFor(2027)).toBe(SPI_2026_PAPER);
  });
});

describe("deriveSpiSittings", () => {
  it("makes a sitting for each transcribed past paper, 2026 included", () => {
    const transcripts = { "2022": parseTranscript(block(1)), "2026": parseTranscript(block(1)) };
    expect(deriveSpiSittings(PAPERS, transcripts).map((s) => [s.key, s.year, s.slug, s.title])).toEqual([
      ["2022", 2022, "spi-2022", "SPI Entrance Examination 2022"],
      ["2026", 2026, "spi-2026", "SPI Entrance Examination 2026"],
    ]);
  });

  it("makes one sitting per past paper with a transcript, flawed questions as grace", () => {
    const transcripts = { "2022": parseTranscript([block(1), block(2, "flawed: yes\nnote: no right option\n"), block(3)].join("\n")) };
    const sittings = deriveSpiSittings(PAPERS, transcripts);
    expect(sittings).toEqual([
      {
        key: "2022",
        sourceFile: requirePaper("2022").sourceFile,
        year: 2022,
        slug: "spi-2022",
        title: "SPI Entrance Examination 2022",
        graceNumbers: [2],
        overrides: [],
      },
    ]);
  });

  it("serves a question SPI re-asked from an earlier paper at its own slot, keyed from this transcript", () => {
    const transcripts = { "2026": parseTranscript([block(1), block(2, "subject: Reasoning\n")].join("\n")) };
    const repeats = { "2026": [{ number: 2, questionId: "row-in-sample", first: "SPI Sample Paper, General Ability Q75" }] };
    const [s] = deriveSpiSittings(PAPERS, transcripts, repeats);
    expect(s.overrides).toEqual([{ questionNumber: 2, questionId: "row-in-sample", subjectName: "Reasoning", answer: "B" }]);
    const maths = deriveSpiSittings(PAPERS, transcripts, { "2026": [{ number: 1, questionId: "x", first: "y" }] })[0];
    expect(maths.overrides[0].subjectName).toBe("Mathematics");
  });

  it("refuses a repeat the transcript does not hold", () => {
    const transcripts = { "2026": parseTranscript(block(1)) };
    expect(() => deriveSpiSittings(PAPERS, transcripts, { "2026": [{ number: 9, questionId: "x", first: "y" }] })).toThrow(/Q9/);
  });

  it("leaves out practice papers and papers not yet transcribed", () => {
    const transcripts = { "sample-maths": parseTranscript(block(1)) };
    expect(deriveSpiSittings(PAPERS, transcripts)).toEqual([]);
  });
});
