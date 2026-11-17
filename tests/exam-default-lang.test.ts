import { describe, expect, it } from "vitest";
import { EXAM_REGISTRY, examAltLang, examDefaultLang, getExamBySlug } from "../src/lib/exam/examContext";

describe("examDefaultLang", () => {
  it("opens UP Board pages in Hindi (owner, 2026-11-17)", () => {
    expect(examDefaultLang(getExamBySlug("up-board-10"))).toBe("hi");
    expect(examDefaultLang(getExamBySlug("up-board-12"))).toBe("hi");
  });

  it("names no default for an exam that keeps the language rule", () => {
    expect(examDefaultLang(getExamBySlug("ssc-cgl"))).toBeNull();
    expect(examDefaultLang(getExamBySlug("rpsc-ras"))).toBeNull();
    expect(examDefaultLang(getExamBySlug("nda"))).toBeNull();
    expect(examDefaultLang(null)).toBeNull();
  });

  it("is only declared on a bilingual exam, and only as one of its own languages", () => {
    for (const e of EXAM_REGISTRY) {
      if (!e.defaultLang) continue;
      const alt = examAltLang(e);
      expect(alt, `${e.slug} declares defaultLang but is not bilingual`).not.toBeNull();
      expect(["en", "both", alt], `${e.slug} defaultLang`).toContain(e.defaultLang);
    }
  });
});
