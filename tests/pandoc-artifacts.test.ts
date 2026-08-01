import { describe, expect, it } from "vitest";
import { pandocArtifactCount, stripPandocArtifacts } from "../scripts/lib/pandocArtifacts";

/**
 * The transform's entire value is in what it REFUSES to touch. A backslash is
 * meaningful inside a math zone (`\ ` control space, `\\` matrix row break) and
 * meaningful in markdown (`\|` inside a table cell, `\*` for a literal star),
 * so a blanket strip would corrupt far more than it repairs. These cases pin
 * that boundary — the escape set is deliberately limited to punctuation that
 * was actually OBSERVED escaped in the bank.
 */
describe("stripPandocArtifacts", () => {
  describe("pandoc hard line break (the dominant class, ~1118 occurrences)", () => {
    it("turns a backslash-space in prose into a real line break", () => {
      expect(stripPandocArtifacts("Arrange in order of stability.\\ (I) (II)")).toBe(
        "Arrange in order of stability.\n(I) (II)"
      );
    });

    it("drops a trailing backslash at end of string", () => {
      expect(stripPandocArtifacts("Choose the correct answer given below :\\")).toBe(
        "Choose the correct answer given below :"
      );
    });

    it("drops a backslash sitting at end of a line", () => {
      expect(stripPandocArtifacts("first line\\\nsecond line")).toBe("first line\nsecond line");
    });

    it("collapses a backslash followed by several spaces into one break", () => {
      expect(stripPandocArtifacts("alpha\\   beta")).toBe("alpha\nbeta");
    });
  });

  /**
   * Regression: the first cut of this transform matched a LONE backslash before
   * a newline, which silently ate one of the two backslashes of a LaTeX row
   * separator in a `\begin{array}` living outside a math zone. It damaged a
   * real MHT-CET row before the parity rule was added.
   */
  describe("backslash-run parity (a `\\\\` row separator is not a hard break)", () => {
    it("leaves a paired `\\\\` row separator before a newline", () => {
      const s = "X=x & 0 & 1\\\\\n\\hline P(x) & k & 2k\\\\\n\\hline";
      expect(stripPandocArtifacts(s)).toBe(s);
    });

    it("drops exactly one backslash when a row separator carries a pandoc break too", () => {
      expect(stripPandocArtifacts("a & b\\\\\\\n\\hline")).toBe("a & b\\\\\n\\hline");
    });

    it("leaves a paired `\\\\` before spaces", () => {
      const s = "row one\\\\  row two";
      expect(stripPandocArtifacts(s)).toBe(s);
    });

    it("is idempotent on a LaTeX array in plain text", () => {
      const s = "\\begin{array}{|c|c|}\\hline A & B\\\\\\\n\\hline\\end{array}";
      const once = stripPandocArtifacts(s);
      expect(stripPandocArtifacts(once)).toBe(once);
      expect(once).toContain("\\\\\n");
    });
  });

  describe("math zones are untouchable", () => {
    it("leaves a control space inside inline math", () => {
      const s = String.raw`the value \(a \ b\) holds`;
      expect(stripPandocArtifacts(s)).toBe(s);
    });

    it("leaves a matrix row separator inside math", () => {
      const s = String.raw`\(\begin{bmatrix} 1 \\ 2 \end{bmatrix}\)`;
      expect(stripPandocArtifacts(s)).toBe(s);
    });

    it("leaves escaped underscores inside math (they render correctly there)", () => {
      const s = String.raw`the error is \(\_\_\_\_\) percent`;
      expect(stripPandocArtifacts(s)).toBe(s);
    });

    it("leaves a dollar-delimited zone alone", () => {
      const s = String.raw`matrices of order $3\times 3$ are square`;
      expect(stripPandocArtifacts(s)).toBe(s);
    });

    it("leaves a display zone alone", () => {
      const s = String.raw`\[{l = 8.35 \pm 0.05 }{d = 20.2 }\]`;
      expect(stripPandocArtifacts(s)).toBe(s);
    });
  });

  describe("escaped punctuation observed in the bank", () => {
    it.each([
      [String.raw`is equal to \.`, "is equal to ."],
      [String.raw`he said \"go\"`, 'he said "go"'],
      [String.raw`a \- b`, "a - b"],
      [String.raw`set \{x\}`, "set {x}"],
      [String.raw`Copper (s) \> Helium (g)`, "Copper (s) > Helium (g)"],
      [String.raw`a \< b`, "a < b"],
      [String.raw`x \, y`, "x , y"],
    ])("unescapes %j", (input, expected) => {
      expect(stripPandocArtifacts(input)).toBe(expected);
    });

    it("unescapes a fill-in blank run in PLAIN text", () => {
      expect(stripPandocArtifacts(String.raw`the answer is \_\_\_\_ J`)).toBe("the answer is ____ J");
    });
  });

  describe("refuses the markdown-significant and ambiguous escapes", () => {
    it("leaves an escaped pipe (unescaping would forge a table cell boundary)", () => {
      const s = String.raw`P(A \| B) is conditional`;
      expect(stripPandocArtifacts(s)).toBe(s);
    });

    it("leaves an escaped asterisk (unescaping would forge a bold marker)", () => {
      const s = String.raw`the value \*x\* is starred`;
      expect(stripPandocArtifacts(s)).toBe(s);
    });

    it("leaves a LaTeX command word alone — it may be a genuine command in prose", () => {
      const s = String.raw`10, 11, 12, \ldots, 99 with replacement`;
      expect(stripPandocArtifacts(s)).toBe(s);
    });

    it("leaves an unbalanced math delimiter alone rather than guessing", () => {
      const s = String.raw`something \( broken zone`;
      expect(stripPandocArtifacts(s)).toBe(s);
    });
  });

  describe("CJK full stop (25 rows, all JEE 2026)", () => {
    it("replaces the ideographic full stop with a period", () => {
      expect(stripPandocArtifacts("percentage error is 5%。")).toBe("percentage error is 5%.");
    });

    it("does not disturb a normal period", () => {
      expect(stripPandocArtifacts("a normal sentence.")).toBe("a normal sentence.");
    });
  });

  describe("safety properties", () => {
    it("is a no-op on clean text (returns an identical string)", () => {
      const s = "A perfectly clean stem with \\(x^2\\) math and a table | a | b |";
      expect(stripPandocArtifacts(s)).toBe(s);
    });

    it("is idempotent", () => {
      const s = "stability.\\ (I)。 and \\> plus \\(a \\ b\\)";
      const once = stripPandocArtifacts(s);
      expect(stripPandocArtifacts(once)).toBe(once);
    });

    it("handles empty and whitespace input", () => {
      expect(stripPandocArtifacts("")).toBe("");
      expect(stripPandocArtifacts("   ")).toBe("   ");
    });

    it("never introduces a literal backslash that was not there", () => {
      const s = "alpha\\ beta。 gamma \\> delta";
      const out = stripPandocArtifacts(s);
      const count = (x: string) => (x.match(/\\/g) ?? []).length;
      expect(count(out)).toBeLessThanOrEqual(count(s));
    });
  });

  describe("pandocArtifactCount", () => {
    it("counts each repairable artifact outside math", () => {
      expect(pandocArtifactCount("a\\ b。c \\> d")).toBe(3);
    });

    it("counts zero for clean text and for math-only backslashes", () => {
      expect(pandocArtifactCount(String.raw`clean \(a \ b\) text`)).toBe(0);
    });

    /** The counter must agree with the repair, or the audit reports rows the
     *  sweep then refuses to touch. An even run is a LaTeX row separator. */
    it("counts zero for a paired `\\\\` row separator the repair leaves alone", () => {
      expect(pandocArtifactCount("a & b\\\\\n\\hline")).toBe(0);
    });

    it("agrees with the transform on whether a field is dirty", () => {
      for (const s of [
        "a & b\\\\\n\\hline",
        "stability.\\ (I)",
        String.raw`clean \(x^2\) text`,
        "value。",
        "a\\\\\\\nb",
      ]) {
        expect(pandocArtifactCount(s) > 0).toBe(stripPandocArtifacts(s) !== s);
      }
    });
  });
});
