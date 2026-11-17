import { describe, expect, it } from "vitest";
import { SPI_2026_PAPER, SPI_PRACTICE_PAPER, getBlueprint } from "../src/lib/mocks/blueprints";
import { buildMockPaper, validatePaperRows, type PaperQuestionRow } from "../src/lib/mocks/reconstruct";
import { practiceRow } from "../scripts/mocks/practiceSittings";
import { PAPERS } from "../scripts/spi/config";
import { SPI_PRACTICE_MOCKS, assemblePracticeMock, type NumberedRow } from "../scripts/spi/practiceMocks";

describe("SPI_PRACTICE_PAPER", () => {
  it("is the 2026 pattern (+4 / -1, 3 hours, two parts by printed number) with counts taken from the rows", () => {
    expect(SPI_PRACTICE_PAPER.marking).toEqual(SPI_2026_PAPER.marking);
    expect(SPI_PRACTICE_PAPER.durationSecs).toBe(SPI_2026_PAPER.durationSecs);
    expect(SPI_PRACTICE_PAPER.sections.map((s) => [s.key, s.questionNumbers, s.count])).toEqual([
      ["mathematical-ability", { from: 1, to: 75 }, undefined],
      ["general-ability", { from: 76, to: 150 }, undefined],
    ]);
    expect(getBlueprint("spi", SPI_PRACTICE_PAPER.code)).toBe(SPI_PRACTICE_PAPER);
  });

  it("builds Practice Paper 1 at 149 questions (its Q27 repeats Q12) out of 596", () => {
    const rows: PaperQuestionRow[] = [];
    for (let n = 1; n <= 150; n++) {
      if (n === 27) continue;
      const subjectName = n <= 75 ? "Mathematics" : n >= 140 ? "Reasoning" : "English";
      rows.push({ id: `q${n}`, sourceRow: n, questionNumber: String(n), subjectName, answer: { kind: "mcq", label: "A" } });
    }
    expect(validatePaperRows(SPI_PRACTICE_PAPER, rows)).toEqual([]);
    const snap = buildMockPaper(SPI_PRACTICE_PAPER, rows, { year: 0, month: null, slug: "spi-practice-paper-1", title: "t" });
    expect(snap.sections.map((s) => s.count)).toEqual([74, 75]);
    expect(snap.totalQuestions).toBe(149);
    expect(snap.totalMarks).toBe(596);
  });
});

describe("SPI_PRACTICE_MOCKS", () => {
  it("is the sample paper, Practice Paper 1 and the six LWS mocks, each 75 Maths then 75 General Ability", () => {
    expect(SPI_PRACTICE_MOCKS.map((m) => m.slug)).toEqual([
      "spi-practice-sample",
      "spi-practice-paper-1",
      ...[1, 2, 3, 4, 5, 6].map((n) => `spi-practice-mock-${n}`),
    ]);
    for (const m of SPI_PRACTICE_MOCKS) {
      for (const part of m.parts) {
        const paper = PAPERS.find((p) => p.id === part.paperId);
        expect(paper?.kind, part.paperId).toBe("practice");
      }
      expect(m.parts.map((p) => p.offset)).toEqual(m.parts.length === 2 ? [0, 75] : [0]);
      expect(m.title).not.toMatch(/LWS/);
    }
  });
});

describe("assemblePracticeMock", () => {
  const spec = { key: "k", slug: "s", title: "t", parts: [{ paperId: "m", offset: 0 }, { paperId: "g", offset: 75 }] };
  const row = (paperId: string, number: number, hash: string, flawed = false): NumberedRow => ({ paperId, number, hash, flawed });
  const ids = new Map([["h1", "id1"], ["h2", "id2"], ["h3", "id3"]]);

  it("numbers each half from its offset, finds rows by hash and marks flawed questions as grace", () => {
    const out = assemblePracticeMock(spec, [row("g", 1, "h3", true), row("m", 2, "h2"), row("m", 1, "h1")], ids);
    expect(out.questions).toEqual([
      { n: 1, kind: "bank", questionId: "id1" },
      { n: 2, kind: "bank", questionId: "id2" },
      { n: 76, kind: "bank", questionId: "id3", grace: true },
    ]);
    expect(out.dropped).toEqual([]);
  });

  it("leaves out a question the paper prints twice, and says so", () => {
    const out = assemblePracticeMock(spec, [row("m", 1, "h1"), row("m", 2, "h1")], ids);
    expect(out.questions.map((q) => q.n)).toEqual([1]);
    expect(out.dropped).toEqual(["m Q2 repeats n=1"]);
  });

  it("refuses a row the bank does not hold", () => {
    expect(() => assemblePracticeMock(spec, [row("m", 1, "nope")], ids)).toThrow(/m Q1/);
  });
});

describe("practiceRow", () => {
  it("orders by the printed number and carries grace", () => {
    const answer = { kind: "mcq" as const, label: "B" as const };
    expect(practiceRow({ n: 9, kind: "bank", questionId: "x", grace: true }, "x", "Physics", answer)).toEqual({
      id: "x", sourceRow: 9, questionNumber: "9", subjectName: "Physics", answer, grace: true,
    });
    expect(practiceRow({ n: 9, kind: "bank", questionId: "x" }, "x", "Physics", answer)).not.toHaveProperty("grace");
  });
});
