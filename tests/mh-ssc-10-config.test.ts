import { describe, it, expect } from "vitest";
import { PAPERS } from "../scripts/mh-ssc-10/config";

// The board also sits a SUPPLEMENTARY exam (July, and June from 2026) for every
// subject. Its papers share a subject AND a year with that year's March paper, so
// an id or source file derived from (subject, year) alone would collide with a
// paper already in the bank. These pin the sitting suffix, and pin the March
// papers as they were.
describe("mh-ssc-10 PAPERS — supplementary sittings", () => {
  it("leaves a March paper's id, month, source file and note exactly as shipped", () => {
    const p = PAPERS["alg-2024"];
    expect(p.month).toBe("March");
    expect(p.sourceFile).toBe("MH_SSC_10_Algebra_2024.pdf");
    expect(p.note).toBe(
      "Maharashtra State Board Class 10 (SSC) — Algebra (Mathematics Part I), March 2024 board paper",
    );
  });

  it("registers a July 2024 paper beside the March one, with its own source file", () => {
    const p = PAPERS["alg-2024-jul"];
    expect(p).toBeDefined();
    expect(p.year).toBe(2024);
    expect(p.month).toBe("July");
    expect(p.paperCode).toBe("N 384");
    expect(p.sourceFile).toBe("MH_SSC_10_Algebra_2024_July.pdf");
    expect(p.pdf.endsWith("MH_SSC_10_Algebra_2024_July.pdf")).toBe(true);
    expect(p.note).toBe(
      "Maharashtra State Board Class 10 (SSC) — Algebra (Mathematics Part I), July 2024 board paper",
    );
  });

  it("names the 2026 supplementary sitting June, as its cover does", () => {
    const p = PAPERS["sci2-2026-jun"];
    expect(p.month).toBe("June");
    expect(p.sourceFile).toBe("MH_SSC_10_Science_II_2026_June.pdf");
  });

  it("keeps History and Political Science together on a supplementary Paper I", () => {
    expect(PAPERS["hist-2025-jul"].subjects).toEqual(["History", "Political Science"]);
  });

  it("registers all 18 supplementary papers, six subjects at each of three sittings", () => {
    const supp = Object.keys(PAPERS).filter((id) => /-(jul|jun)$/.test(id));
    expect(supp).toHaveLength(18);
    for (const s of ["2024-jul", "2025-jul", "2026-jun"]) {
      expect(supp.filter((id) => id.endsWith(s))).toHaveLength(6);
    }
  });

  it("gives every paper a distinct source file, the dedup and rollback key", () => {
    const files = Object.values(PAPERS).map((p) => p.sourceFile);
    expect(new Set(files).size).toBe(files.length);
  });
});
