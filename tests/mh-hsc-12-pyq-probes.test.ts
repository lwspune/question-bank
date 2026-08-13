import { describe, it, expect } from "vitest";
import {
  controlChars,
  orphanedStub,
  literalNewline,
  doubleEscaped,
  mathImbalance,
  tableWithoutSeparator,
  probeRow,
} from "../scripts/mh-hsc-12-pyq/textProbes";

// These two suites pin defects that ACTUALLY SHIPPED past the other checks on
// 2026-08-13, while authoring this chapter's MCQ solutions through a shell
// heredoc. Both survived the imbalance probe and the unicode probe.
describe("controlChars", () => {
  it("catches a vertical tab left where \\vee was eaten", () => {
    // "\vee" through a shell becomes VT + "ee".
    expect(controlChars("\\(t \x0bee (p \x0bee q)\\)")).toBe(true);
  });

  it("does not fire on ordinary text or on a newline or tab", () => {
    expect(controlChars("\\(p \\vee q\\)")).toBe(false);
    expect(controlChars("line one\nline two\tcolumn")).toBe(false);
  });

  // Carriage return is HALF OF A CRLF LINE ENDING on this platform. Including it
  // would flag every multi-line string in the repo and make the probe useless,
  // so it is excluded on purpose and orphanedStub covers the \r case instead.
  it("ignores a carriage return", () => {
    expect(controlChars("line one\r\nline two")).toBe(false);
  });
});

describe("orphanedStub", () => {
  it("catches \\rightarrow with its backslash-r eaten", () => {
    expect(orphanedStub("\\(q ightarrow r\\)")).toBe("ightarrow");
  });

  it("does not fire on the intact command", () => {
    expect(orphanedStub("\\(q \\rightarrow r\\)")).toBeNull();
    expect(orphanedStub("\\(p \\longleftrightarrow q\\)")).toBeNull();
  });

  // The stub must stand as its own word: "eftrightarrow" lives inside the real
  // \leftrightarrow, and a naive substring test would flag every correct use.
  it("does not fire inside a longer legitimate command", () => {
    expect(orphanedStub("\\(p \\leftrightarrow q\\)")).toBeNull();
  });
});

describe("literalNewline", () => {
  it("catches a 2-char backslash-n standing in for a line break", () => {
    expect(literalNewline("first line\\nsecond line")).toBe(true);
  });

  // The case that broke the first version of this probe: "\n" followed by a
  // LETTER is ambiguous — "\nsecond" is a defect and "\neq" is not — so a bare
  // "not a letter next" lookahead misses every real literal-newline in prose.
  it("catches backslash-n followed by an ordinary word", () => {
    expect(literalNewline("| p | q |\\n|---|---|")).toBe(true);
    expect(literalNewline("Statement one.\\nStatement two.")).toBe(true);
  });

  // THE FALSE POSITIVE THAT FIRED FIRST TIME OUT. A logic chapter is full of
  // \neq, and \nu / \nabla are the same shape.
  it("does not fire on a LaTeX command starting with n", () => {
    expect(literalNewline("\\(\\sqrt{2} \\neq \\sqrt{5}\\)")).toBe(false);
    expect(literalNewline("\\(\\nu\\) and \\(\\nabla\\)")).toBe(false);
  });
});

describe("doubleEscaped", () => {
  it("catches a double-escaped math delimiter", () => {
    expect(doubleEscaped("\\\\(x\\\\)")).toBe(true);
    expect(doubleEscaped("\\(x\\)")).toBe(false);
  });
});

describe("mathImbalance", () => {
  it("reports the counts when they disagree", () => {
    expect(mathImbalance("\\(a\\) and \\(b")).toEqual([2, 1]);
  });
  it("returns null when balanced", () => {
    expect(mathImbalance("\\(a\\) and \\(b\\)")).toBeNull();
  });
});

describe("tableWithoutSeparator", () => {
  it("flags pipe rows with no |---| row", () => {
    expect(tableWithoutSeparator("| p | q |\n| T | T |")).toBe(true);
  });
  it("accepts a well-formed GFM table", () => {
    expect(tableWithoutSeparator("| p | q |\n|---|---|\n| T | T |")).toBe(false);
  });
  // Inline |x| absolute value / determinant notation is not a table.
  it("does not fire on prose containing pipes mid-line", () => {
    expect(tableWithoutSeparator("The value of \\(|A|\\) is 3.")).toBe(false);
  });
});

describe("probeRow", () => {
  it("returns nothing for clean fields", () => {
    expect(probeRow("r#1", [["stem", "\\(p \\land q\\)"], ["solution", "**(B)**"]])).toEqual([]);
  });

  it("names the field the defect is in", () => {
    const d = probeRow("r#1", [["stem", "ok"], ["option A", "\\(t \x0bee q\\)"]]);
    expect(d).toHaveLength(1);
    expect(d[0]).toMatchObject({ ref: "r#1", field: "option A" });
  });
});
