import { describe, it, expect } from "vitest";
import { renderCorruption } from "../scripts/lib/render-lint";

describe("renderCorruption", () => {
  // Class 3 — truncated stem opening (stem-only)
  it("flags a stem that begins mid-sentence (lowercase)", () => {
    expect(renderCorruption("of the lines \\(x=0\\)", { isStem: true })).toContain("lowercase-start");
  });
  it("flags a dropped-letter opener like 'et O be the origin'", () => {
    expect(renderCorruption("et \\(O\\) be the origin", { isStem: true })).toContain("lowercase-start");
  });
  it("does not flag a normal capitalized stem", () => {
    expect(renderCorruption("Let \\(x=0\\)", { isStem: true })).not.toContain("lowercase-start");
  });
  it("does not flag a stem opening with a math zone", () => {
    expect(renderCorruption("\\(f(x)\\) is continuous", { isStem: true })).not.toContain("lowercase-start");
  });
  it("ignores leading whitespace when testing the opener", () => {
    expect(renderCorruption("   the tangent at", { isStem: true })).toContain("lowercase-start");
  });
  it("only applies lowercase-start to stems, not other fields", () => {
    expect(renderCorruption("of the above", {})).not.toContain("lowercase-start");
    expect(renderCorruption("of the above")).not.toContain("lowercase-start");
  });

  // Class 1 — scrambled $ / \( delimiter mix
  it("flags a $ / \\( delimiter scramble", () => {
    expect(renderCorruption("point (3, $\\( ) be perpendicular \\)2x\\(")).toContain("delimiter-scramble");
  });
  it("does not flag clean \\(...\\) math", () => {
    expect(renderCorruption("\\(y^{2}=12x\\)")).not.toContain("delimiter-scramble");
  });
  it("does not flag a lone $ with no \\( in the field", () => {
    expect(renderCorruption("a price of $5")).not.toContain("delimiter-scramble");
  });

  // Class 2 — plain-text escaped-underscore blank
  it("flags a plain-text escaped-underscore blank", () => {
    expect(renderCorruption("is equal to \\_\\_\\_\\_")).toContain("plaintext-underscore");
  });
  it("does NOT flag an escaped underscore inside a \\(...\\) math zone", () => {
    expect(renderCorruption("\\(A(\\triangle ABC)\\) \\(\\_\\_\\_\\_\\) sq units")).not.toContain(
      "plaintext-underscore",
    );
  });
  it("does NOT flag an escaped underscore inside a \\[...\\] display zone", () => {
    expect(renderCorruption("value \\[x\\_1 + x\\_2\\]")).not.toContain("plaintext-underscore");
  });

  // Clean rows
  it("returns no flags for a clean stem", () => {
    expect(renderCorruption("Find \\(\\int_{0}^{1} x\\,dx\\).", { isStem: true })).toEqual([]);
  });
  it("returns no flags for a clean non-stem field", () => {
    expect(renderCorruption("\\(\\frac{3}{5}\\)")).toEqual([]);
  });

  // Multiple classes at once
  it("can report more than one class for a badly-mangled stem", () => {
    const flags = renderCorruption("of the set $\\( ) is \\_\\_\\_\\_", { isStem: true });
    expect(flags).toEqual(expect.arrayContaining(["lowercase-start", "delimiter-scramble", "plaintext-underscore"]));
  });
});
