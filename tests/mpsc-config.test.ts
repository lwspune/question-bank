import { describe, expect, it } from "vitest";
import { ALL_PAPERS, EXAMS, PAPERS, SSP_PAPERS, requirePaper } from "../scripts/mpsc/config";

describe("MPSC paper registry", () => {
  it("keeps Group B & C and State Services papers in separate lists, each naming its exam", () => {
    expect(PAPERS.every((p) => p.exam === "gbc")).toBe(true);
    expect(SSP_PAPERS.every((p) => p.exam === "ssp")).toBe(true);
    expect(ALL_PAPERS).toHaveLength(PAPERS.length + SSP_PAPERS.length);
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
