/**
 * The formula legend in the /notes printable handout.
 *
 * Legend symbols are stored in THREE shapes across the registry: already
 * delimited ("\\(f_i\\)", 626 of them), bare math ("f_1, f_2"), and bare prose
 * ("Class width", "Row 1"). The handout used to wrap every one in \( \), so
 * the delimited ones became \(\(f_i\)\) and printed as red "KaTeX parse
 * error" lines — 59 of them in the Statistics handout alone, 48 chapters
 * affected. The registry sweep below renders every symbol and meaning through
 * real KaTeX, so a new chapter cannot reintroduce it in any shape.
 */
import { describe, it, expect } from "vitest";
import katex from "katex";
import { legendSymbolText } from "@/lib/notes/printDoc";
import { parseRichSegments } from "@/components/math/parseLatex";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";

describe("legendSymbolText", () => {
  it("leaves an already-delimited symbol as stored", () => {
    expect(legendSymbolText("\\(f_i\\)")).toBe("\\(f_i\\)");
  });

  it("leaves a symbol that mixes prose and math as stored", () => {
    expect(legendSymbolText("Sign of \\(r\\)")).toBe("Sign of \\(r\\)");
  });

  it("treats $...$ as already delimited", () => {
    expect(legendSymbolText("$x$")).toBe("$x$");
  });

  it("wraps bare math", () => {
    expect(legendSymbolText("f_1, f_2")).toBe("\\(f_1, f_2\\)");
    expect(legendSymbolText("u = g(x)")).toBe("\\(u = g(x)\\)");
    expect(legendSymbolText("C")).toBe("\\(C\\)");
    expect(legendSymbolText("dv")).toBe("\\(dv\\)");
    expect(legendSymbolText("v_{rms}")).toBe("\\(v_{rms}\\)");
  });

  it("keeps bare prose as text, so its spaces survive", () => {
    expect(legendSymbolText("Class width")).toBe("Class width");
    expect(legendSymbolText("partition")).toBe("partition");
    expect(legendSymbolText("Row 1")).toBe("Row 1");
    expect(legendSymbolText("3 equations, 2 unknowns")).toBe("3 equations, 2 unknowns");
    expect(legendSymbolText("STP-squared")).toBe("STP-squared");
  });

  it("keeps Unicode super/subscripts as text — KaTeX has no metrics for them", () => {
    expect(legendSymbolText("ⁿCᵣ")).toBe("ⁿCᵣ");
    expect(legendSymbolText("qⁿ⁻ʳ")).toBe("qⁿ⁻ʳ");
  });
});

/** KaTeX errors on every math zone of `text`, as the handout renders it. */
function katexErrors(text: string): string[] {
  const errors: string[] = [];
  for (const seg of parseRichSegments(text)) {
    if (seg.type === "text") continue;
    try {
      katex.renderToString(seg.content, { throwOnError: true, displayMode: seg.type === "block" });
    } catch (e) {
      errors.push(`${JSON.stringify(text)}: ${(e as Error).message}`);
    }
  }
  return errors;
}

describe("every legend in the registry renders without a KaTeX error", () => {
  const symbols: { where: string; symbol: string; meaning: string }[] = [];
  for (const ch of NOTES_CHAPTERS)
    for (const slug of ch.slugs)
      for (const c of ch.notes[slug]?.concepts ?? [])
        if (c.kind === "formula" && c.formula?.symbols)
          for (const s of c.formula.symbols)
            symbols.push({ where: `${ch.subjectRoute}/${ch.chapterSlug}`, ...s });

  it("finds legends to check", () => {
    expect(symbols.length).toBeGreaterThan(1000);
  });

  it("symbols", () => {
    const errors = symbols.flatMap((s) =>
      katexErrors(legendSymbolText(s.symbol)).map((e) => `${s.where} ${e}`)
    );
    expect(errors).toEqual([]);
  });

  it("meanings", () => {
    const errors = symbols.flatMap((s) => katexErrors(s.meaning).map((e) => `${s.where} ${e}`));
    expect(errors).toEqual([]);
  });
});
