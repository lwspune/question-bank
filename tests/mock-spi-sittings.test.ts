import { describe, expect, it } from "vitest";
import { SPI_PAPER, totalQuestions } from "../src/lib/mocks/blueprints";
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

describe("deriveSpiSittings", () => {
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
      },
    ]);
  });

  it("leaves out practice papers and papers not yet transcribed", () => {
    const transcripts = { "sample-maths": parseTranscript(block(1)) };
    expect(deriveSpiSittings(PAPERS, transcripts)).toEqual([]);
  });
});
