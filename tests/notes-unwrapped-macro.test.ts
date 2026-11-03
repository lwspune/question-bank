import { describe, expect, it } from "vitest";
import { findUnwrappedMacro } from "../scripts/lib/unwrappedMacro";

// A formula legend (FormulaBlock symbol/meaning) is handed to KatexRenderer
// raw, so any LaTeX outside a \(...\) zone prints as literal markup.
describe("findUnwrappedMacro", () => {
  it("flags a bare letter macro", () => {
    expect(findUnwrappedMacro("\\det A")).toBe("\\det");
  });

  it("flags bare spacing macros, which printed raw on the live notes (2026-11-02)", () => {
    expect(findUnwrappedMacro("g(x)\\,f'(x)/f(x)")).toBe("\\,");
    expect(findUnwrappedMacro("a^2 + x^2,\\ x^2 - a^2")).toBe("\\ ");
    expect(findUnwrappedMacro("x\\;y")).toBe("\\;");
    expect(findUnwrappedMacro("x\\!y")).toBe("\\!");
  });

  it("passes macros inside a math zone", () => {
    expect(findUnwrappedMacro("\\(g'(x)\\,\\log f(x)\\)")).toBeNull();
    expect(findUnwrappedMacro("\\[\\det A\\]")).toBeNull();
  });

  it("passes plain text and a LaTeX line break", () => {
    expect(findUnwrappedMacro("the term from the base")).toBeNull();
    expect(findUnwrappedMacro("row one \\\\ row two")).toBeNull();
  });
});
