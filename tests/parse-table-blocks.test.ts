import { describe, it, expect } from "vitest";
import { parseTableBlocks } from "@/components/math/parseTableBlocks";
import { normalizeNewlines } from "@/lib/text/normalizeNewlines";

describe("parseTableBlocks", () => {
  it("returns [] for empty input", () => {
    expect(parseTableBlocks("")).toEqual([]);
  });

  it("returns a single text block for plain prose", () => {
    expect(parseTableBlocks("What is the arithmetic mean?")).toEqual([
      { kind: "text", text: "What is the arithmetic mean?" },
    ]);
  });

  it("does NOT treat inline math pipes as a table (no separator row)", () => {
    // determinant + abs-value bars must survive as text, not be split into columns
    const input = "If \\(|A| = \\frac{1}{22}\\) and \\(\\frac{|x|}{|x|+x^2}\\), find it.";
    const out = parseTableBlocks(input);
    expect(out).toEqual([{ kind: "text", text: input }]);
  });

  it("does NOT treat a lone pipe line as a table without a separator row", () => {
    const input = "Consider P(A | B) and the value | of the set.";
    const out = parseTableBlocks(input);
    expect(out).toEqual([{ kind: "text", text: input }]);
  });

  it("parses a GFM frequency table (outer pipes)", () => {
    const input = [
      "| x | 1 | 2 | 3 |",
      "|---|---|---|---|",
      "| f | 4 | 6 | 9 |",
    ].join("\n");
    expect(parseTableBlocks(input)).toEqual([
      {
        kind: "table",
        headers: ["x", "1", "2", "3"],
        rows: [["f", "4", "6", "9"]],
      },
    ]);
  });

  it("parses a table written WITHOUT outer pipes", () => {
    const input = ["Marks | 5-15 | 15-25", "---|---|---", "Students | 20 | 30"].join("\n");
    expect(parseTableBlocks(input)).toEqual([
      {
        kind: "table",
        headers: ["Marks", "5-15", "15-25"],
        rows: [["Students", "20", "30"]],
      },
    ]);
  });

  it("preserves KaTeX inside cells (masking protects the pipes)", () => {
    const input = [
      "| Function | Maximum |",
      "|---|---|",
      "| \\(\\sin x + \\cos x\\) | \\(\\sqrt{2}\\) |",
    ].join("\n");
    const out = parseTableBlocks(input);
    expect(out).toEqual([
      {
        kind: "table",
        headers: ["Function", "Maximum"],
        rows: [["\\(\\sin x + \\cos x\\)", "\\(\\sqrt{2}\\)"]],
      },
    ]);
  });

  it("preserves **bold** inside cells", () => {
    const input = ["| **Marks** | Count |", "|---|---|", "| A | 10 |"].join("\n");
    const out = parseTableBlocks(input) as Array<{ kind: string; headers?: string[] }>;
    expect(out[0].kind).toBe("table");
    expect(out[0].headers).toEqual(["**Marks**", "Count"]);
  });

  it("splits prose-before + table + prose-after into three blocks", () => {
    const input = [
      "The distribution is given below:",
      "| x | 1 | 2 |",
      "|---|---|---|",
      "| f | 5 | 7 |",
      "What is the mean?",
    ].join("\n");
    const out = parseTableBlocks(input);
    expect(out.map((b) => b.kind)).toEqual(["text", "table", "text"]);
    expect((out[0] as { text: string }).text).toBe("The distribution is given below:");
    expect((out[2] as { text: string }).text).toBe("What is the mean?");
  });

  it("tolerates CRLF newlines", () => {
    const input = "| a | b |\r\n|---|---|\r\n| 1 | 2 |";
    const out = parseTableBlocks(input);
    expect(out).toEqual([
      { kind: "table", headers: ["a", "b"], rows: [["1", "2"]] },
    ]);
  });

  it("pads a ragged data row to the header column count", () => {
    const input = ["| a | b | c |", "|---|---|---|", "| 1 | 2 |"].join("\n");
    const out = parseTableBlocks(input) as Array<{ rows: string[][] }>;
    expect(out[0].rows[0]).toEqual(["1", "2", ""]);
  });

  // Write-boundary contract: normalizeNewlines (run at upload + edit) must not
  // break a table, and SHOULD upgrade an Excel-authored literal-\n table.
  describe("normalizeNewlines write-boundary", () => {
    it("leaves a real-newline pipe table parseable", () => {
      const input = "| a | b |\n|---|---|\n| 1 | 2 |";
      const out = parseTableBlocks(normalizeNewlines(input));
      expect(out).toEqual([{ kind: "table", headers: ["a", "b"], rows: [["1", "2"]] }]);
    });

    it("upgrades a literal-\\n table into a real table", () => {
      const input = "| a | b |\\n|---|---|\\n| 1 | 2 |"; // literal backslash-n
      const out = parseTableBlocks(normalizeNewlines(input));
      expect(out).toEqual([{ kind: "table", headers: ["a", "b"], rows: [["1", "2"]] }]);
    });
  });
});
