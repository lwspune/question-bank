import { describe, expect, it } from "vitest";
import {
  ALL_PAPERS,
  ASP_CHAPTERS,
  ASP_PAPERS,
  EXAMS,
  FSP_CHAPTERS,
  FSP_PAPERS,
  PAPERS,
  SSP_CHAPTERS,
  SSP_CSAT_CHAPTERS,
  SSP_CSAT_PAPERS,
  SSP_PAPERS,
  expectedNumbers,
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
    for (const p of SSP_CSAT_PAPERS) expect(ALL_PAPERS).toContain(p);
    expect(new Set(ALL_PAPERS.map((p) => p.sourceFile)).size).toBe(ALL_PAPERS.length);
  });
});

describe("MPSC Forest + Agriculture Service Prelims registry", () => {
  it("registers the four Forest booklets and five Agriculture booklets in the merged mains scan", () => {
    expect(FSP_PAPERS.map((p) => p.pyqYear)).toEqual([2014, 2016, 2017, 2018]);
    expect(ASP_PAPERS.map((p) => p.pyqYear)).toEqual([2011, 2012, 2016, 2017, 2018]);
    expect(FSP_PAPERS.every((p) => p.exam === "fsp")).toBe(true);
    expect(ASP_PAPERS.every((p) => p.exam === "asp")).toBe(true);
    expect(EXAMS.fsp.name).toBe("MPSC Forest Service Prelims");
    expect(EXAMS.asp.name).toBe("MPSC Agriculture Service Prelims");
  });

  it("tiles pages 741-1081 booklet then key, with no gap or overlap (pp.711-740 are the duplicate 2018 Group B paper)", () => {
    const spans = [...FSP_PAPERS, ...ASP_PAPERS].flatMap((p) => [p.pages, p.keyPages]).sort((a, b) => a[0] - b[0]);
    expect(spans[0][0]).toBe(741);
    expect(spans[spans.length - 1][1]).toBe(1081);
    for (let i = 1; i < spans.length; i++) expect(spans[i][0]).toBe(spans[i - 1][1] + 1);
    for (const p of [...FSP_PAPERS, ...ASP_PAPERS]) expect(p.keyPages[0]).toBe(p.pages[1] + 1);
  });

  it("reads each key from the same scan as its booklet", () => {
    for (const p of [...FSP_PAPERS, ...ASP_PAPERS]) {
      expect(p.keyPdf).toBeUndefined();
      expect(p.sourcePdf).toMatch(/All PYQ mar eng/);
    }
  });

  it("knows the two 200-question Agriculture papers (2011, 2012); the rest are 100", () => {
    expect(ASP_PAPERS.filter((p) => questionCount(p) === 200).map((p) => p.id)).toEqual(["asp-2011", "asp-2012"]);
    expect(FSP_PAPERS.every((p) => questionCount(p) === 100)).toBe(true);
  });

  it("holds both exams to a fixed list with the language sections, aptitude and GS; only Agriculture adds its own head", () => {
    for (const p of FSP_PAPERS) expect(p.chapters).toBe(FSP_CHAPTERS);
    for (const p of ASP_PAPERS) expect(p.chapters).toBe(ASP_CHAPTERS);
    for (const s of ["Marathi", "English", "Reasoning and Aptitude", "History", "Environment"]) {
      expect(FSP_CHAPTERS[s]?.length).toBeGreaterThan(0);
      expect(ASP_CHAPTERS[s]).toBe(FSP_CHAPTERS[s]);
    }
    expect(FSP_CHAPTERS.Agriculture).toBeUndefined();
    expect(ASP_CHAPTERS.Agriculture.length).toBeGreaterThan(0);
  });

  it("keeps ids and source_file labels unique across every MPSC Prelims exam", () => {
    expect(ALL_PAPERS).toHaveLength(PAPERS.length + SSP_PAPERS.length + SSP_CSAT_PAPERS.length + FSP_PAPERS.length + ASP_PAPERS.length);
    expect(new Set(ALL_PAPERS.map((p) => p.id)).size).toBe(ALL_PAPERS.length);
    expect(new Set(ALL_PAPERS.map((p) => p.sourceFile)).size).toBe(ALL_PAPERS.length);
    expect(requirePaper("fsp-2018").code).toBe("K11");
    expect(requirePaper("asp-2011").provisionalKey).toBe(true);
  });
});

describe("MPSC questions left out on purpose", () => {
  it("expects every number of a whole paper", () => {
    expect(expectedNumbers(requirePaper("fsp-2018"))).toHaveLength(100);
  });

  it("leaves fsp-2016 Q7 out of what merge and commit expect, with its reason on record", () => {
    const p = requirePaper("fsp-2016");
    const nums = expectedNumbers(p);
    expect(nums).toHaveLength(99);
    expect(nums).not.toContain(7);
    expect(p.omitted?.[7]).toMatch(/\S/);
  });
});
