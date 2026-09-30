import { describe, expect, it } from "vitest";
import {
  ALL_PAPERS,
  EXAMS,
  PAPERS,
  SSP_CHAPTERS,
  SSP_CSAT_CHAPTERS,
  SSP_CSAT_PAPERS,
  SSP_PAPERS,
  questionCount,
  requirePaper,
} from "../scripts/mpsc/config";

describe("MPSC paper registry", () => {
  it("keeps Group B & C and State Services papers in separate lists, each naming its exam", () => {
    expect(PAPERS.every((p) => p.exam === "gbc")).toBe(true);
    expect(SSP_PAPERS.every((p) => p.exam === "ssp")).toBe(true);
  });

  it("registers the ten State Services Prelims GS Paper I booklets, one per year 2013-2022", () => {
    expect(SSP_PAPERS.map((p) => p.pyqYear).sort()).toEqual([2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]);
  });

  it("tiles the 460-page State Services scan with no gap or overlap", () => {
    const ranges = SSP_PAPERS.map((p) => p.pages).sort((a, b) => a[0] - b[0]);
    expect(ranges[0][0]).toBe(1);
    expect(ranges[ranges.length - 1][1]).toBe(460);
    for (let i = 1; i < ranges.length; i++) expect(ranges[i][0]).toBe(ranges[i - 1][1] + 1);
  });

  it("gives every State Services paper its own final-key PDF", () => {
    expect(SSP_PAPERS.every((p) => p.keyPdf && p.keyPdf !== p.sourcePdf)).toBe(true);
    expect(new Set(SSP_PAPERS.map((p) => p.keyPdf)).size).toBe(SSP_PAPERS.length);
  });

  it("keeps source_file labels and paper ids unique across BOTH exams (source_file is the rollback + mock key)", () => {
    expect(new Set(ALL_PAPERS.map((p) => p.sourceFile)).size).toBe(ALL_PAPERS.length);
    expect(new Set(ALL_PAPERS.map((p) => p.id)).size).toBe(ALL_PAPERS.length);
  });

  it("maps every paper to a known exam row", () => {
    for (const p of ALL_PAPERS) expect(EXAMS[p.exam]).toBeDefined();
    expect(EXAMS.ssp.name).toBe("MPSC State Services Prelims");
    expect(EXAMS.gbc.name).toBe("MPSC Group B & C Prelims");
  });

  it("finds a paper of either exam, and refuses an unknown id", () => {
    expect(requirePaper("ssp-2022").exam).toBe("ssp");
    expect(requirePaper("2024-b").exam).toBe("gbc");
    expect(() => requirePaper("ssp-2023")).toThrow(/unknown paper/);
  });
});

describe("MPSC State Services CSAT Paper II registry", () => {
  it("registers the nine CSAT booklets on file — no 2017 booklet exists in the source", () => {
    expect(SSP_CSAT_PAPERS.map((p) => p.pyqYear).sort()).toEqual([2013, 2014, 2015, 2016, 2018, 2019, 2020, 2021, 2022]);
  });

  it("puts CSAT under the State Services exam row, 80 questions, with its own chapter list", () => {
    for (const p of SSP_CSAT_PAPERS) {
      expect(p.exam).toBe("ssp");
      expect(questionCount(p)).toBe(80);
      expect(p.chapters).toBe(SSP_CSAT_CHAPTERS);
      expect(p.pyqNote).toMatch(/^CSAT Paper II · /);
    }
  });

  it("keeps GS Paper I at 100 questions on the GS chapter list", () => {
    for (const p of SSP_PAPERS) {
      expect(questionCount(p)).toBe(100);
      expect(p.chapters).toBe(SSP_CHAPTERS);
    }
  });

  it("dates each CSAT paper on the same day as that year's GS Paper I (both papers sit together)", () => {
    for (const c of SSP_CSAT_PAPERS) {
      const gs = SSP_PAPERS.find((p) => p.pyqYear === c.pyqYear)!;
      expect(c.date).toBe(gs.date);
    }
  });

  it("gives every CSAT paper its own booklet and key PDF", () => {
    expect(new Set(SSP_CSAT_PAPERS.map((p) => p.sourcePdf)).size).toBe(SSP_CSAT_PAPERS.length);
    expect(new Set(SSP_CSAT_PAPERS.map((p) => p.keyPdf)).size).toBe(SSP_CSAT_PAPERS.length);
  });

  it("reads the 2018 booklet from the file mislabelled paper-2017.pdf", () => {
    expect(requirePaper("ssp-csat-2018").sourcePdf).toMatch(/paper-2017\.pdf$/);
    expect(requirePaper("ssp-csat-2018").keyPdf).toMatch(/key-2018\.pdf$/);
  });

  it("includes CSAT in ALL_PAPERS with unique ids and source_file labels", () => {
    expect(ALL_PAPERS).toHaveLength(PAPERS.length + SSP_PAPERS.length + SSP_CSAT_PAPERS.length);
    expect(new Set(ALL_PAPERS.map((p) => p.sourceFile)).size).toBe(ALL_PAPERS.length);
  });
});
