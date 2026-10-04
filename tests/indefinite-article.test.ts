import { describe, it, expect } from "vitest";
import { withArticle } from "@/lib/text/article";

/**
 * "a" or "an" before an exam name. The choice follows the SOUND, not the
 * letter: exam names are mostly said letter by letter, so "an NDA", "an
 * MHT-CET", "an MPSC", but "a CDS", "a UPSC" ("you"). NEET is said as a word,
 * so "a NEET". Copy built as `Sit a ${exam}` printed "Sit a NDA past paper"
 * on every NDA notes page.
 */
describe("withArticle", () => {
  it.each([
    ["NDA", "an NDA"],
    ["MHT-CET", "an MHT-CET"],
    ["MH SSC 10", "an MH SSC 10"],
    ["MPSC Group B & C", "an MPSC Group B & C"],
    ["IPMAT Indore", "an IPMAT Indore"],
    ["ISC Class 12", "an ISC Class 12"],
  ])("letter-by-letter names with a vowel sound: %s", (name, out) => {
    expect(withArticle(name)).toBe(out);
  });

  it.each([
    ["CDS", "a CDS"],
    ["JEE Mains", "a JEE Mains"],
    ["UPSC CSE", "a UPSC CSE"],
    ["CBSE Class 12", "a CBSE Class 12"],
    ["JIPMAT", "a JIPMAT"],
  ])("letter-by-letter names with a consonant sound: %s", (name, out) => {
    expect(withArticle(name)).toBe(out);
  });

  it("NEET is said as a word", () => {
    expect(withArticle("NEET")).toBe("a NEET");
  });

  it("ordinary words go by their first letter", () => {
    expect(withArticle("Foundation")).toBe("a Foundation");
    expect(withArticle("Worksheets 11+12")).toBe("a Worksheets 11+12");
    expect(withArticle("exam")).toBe("an exam");
  });
});
