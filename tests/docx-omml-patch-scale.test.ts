import { describe, expect, it } from "vitest";
import JSZip from "jszip";
import { buildSolutionBook, type SolutionBookSeries } from "@/lib/export/docxBuilder";

/**
 * `patchZip` replaces one OMML placeholder at a time, rescanning the WHOLE
 * document for each — which is quadratic in the number of math zones. That is
 * invisible on a 200-question paper export (the route's own cap) and fatal on a
 * four-series solution book, which carries ~10,000 zones across a multi-megabyte
 * document.xml: ~100 GB of string scanning plus one multi-MB allocation per
 * marker.
 *
 * This test pins the property that matters — EVERY marker is converted, none
 * left behind as literal `OMML_n` text in the document — at a size where the
 * quadratic version does not finish. It is a correctness test that happens to
 * also be a scale test: if the replacement ever goes back to one pass per
 * marker, this stops completing rather than going red, which is why the timeout
 * is stated explicitly rather than left to the default.
 */

function seriesWithMath(label: string, count: number): SolutionBookSeries {
  return {
    series: label,
    questions: Array.from({ length: count }, (_, i) => ({
      number: i + 1,
      baseNumber: i + 1,
      stem: `What is \\(\\int_0^{${i + 1}} \\frac{x^2 + ${i}}{\\sqrt{x + 1}}\\,dx\\) equal to?`,
      options: [
        { label: "A", text: `\\(\\frac{${i + 1}}{2}\\)` },
        { label: "B", text: `\\(\\sqrt{${i + 2}}\\)` },
        { label: "C", text: `\\(\\pi^{${i}}\\)` },
        { label: "D", text: "\\(\\text{Does not exist}\\)" },
      ],
      answer: "B",
      solution: `Substituting \\(u = x + 1\\) gives \\(\\frac{${i + 1}}{2}\\), so the value is \\(\\sqrt{${i + 2}}\\).`,
    })),
  };
}

async function documentXml(buf: Buffer): Promise<string> {
  const zip = await JSZip.loadAsync(buf);
  const f = zip.file("word/document.xml");
  expect(f).toBeTruthy();
  return f!.async("text");
}

describe("buildSolutionBook — OMML marker replacement at solution-book scale", () => {
  it(
    "leaves NO unconverted marker across four series of math-heavy questions",
    async () => {
      // 4 x 120 x ~7 zones — the real shape of an NDA four-series book.
      const series = ["A", "B", "C", "D"].map((s) => seriesWithMath(s, 120));
      const buf = await buildSolutionBook({
        title: "Scale check",
        subtitle: "Answer Keys and Solutions",
        series,
      });
      const xml = await documentXml(buf);

      // The failure this guards is SILENT: an unreplaced marker renders in Word
      // as the literal text "OMML_412" where a formula belongs.
      const leftover = xml.match(/OMML_\d+/g) ?? [];
      expect(leftover).toEqual([]);
      // And the conversions really happened, rather than every zone having been
      // dropped (which would also leave no markers).
      expect(xml).toContain("<m:oMath");
    },
    120_000
  );

  it("keeps each series' numbering independent rather than running 1..480", async () => {
    // The reason this builder does not reuse buildAnswerKey's Word auto-numbering.
    const series = ["A", "B"].map((s) => seriesWithMath(s, 3));
    const buf = await buildSolutionBook({ title: "Numbering", series });
    const xml = await documentXml(buf);
    // Each series prints its own 1. 2. 3. — so "1." appears once per series.
    const ones = xml.match(/<w:t(?:\s[^>]*)?>1\. <\/w:t>/g) ?? [];
    expect(ones.length).toBe(2);
    expect(xml).not.toMatch(/<w:t(?:\s[^>]*)?>4\. <\/w:t>/);
  });

  it("prints an answer key grid for every series", async () => {
    const series = ["A", "B", "C"].map((s) => seriesWithMath(s, 12));
    const buf = await buildSolutionBook({ title: "Keys", series });
    const xml = await documentXml(buf);
    for (const s of ["A", "B", "C"]) {
      expect(xml).toContain(`Answer Key — Series ${s}`);
      expect(xml).toContain(`Solutions — Series ${s}`);
    }
  });
});
