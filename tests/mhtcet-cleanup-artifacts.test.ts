import { describe, expect, it } from "vitest";
import { cleanupArtifacts } from "../scripts/mhtcet/lib";

describe("cleanupArtifacts de-glue", () => {
  // The fused macros it exists to separate.
  it.each([
    ["\\(\\simp\\)", "\\(\\sim p\\)"],
    ["\\(a\\cdotb\\)", "\\(a\\cdot b\\)"],
    ["\\(p\\landq\\)", "\\(p\\land q\\)"],
    ["\\(\\sinx\\)", "\\(\\sin x\\)"],
  ])("separates %s", (input, expected) => {
    expect(cleanupArtifacts(input)).toBe(expected);
  });

  // Real KaTeX commands that START with a de-glued macro. Splitting them broke
  // 29 MHT-CET 2026 rows on `\cdots` (found 2026-10-29: "= · s").
  it.each([
    "\\(1 + 2 + \\cdots + n\\)",
    "\\(x = \\cdots\\)",
    "\\(a \\cdotp b\\)",
    "\\(a \\simeq b\\)",
    "\\(a \\approxeq b\\)",
    "\\(\\left( x \\middle| y \\right)\\)",
    "\\(\\triangleq\\)",
    "\\(\\triangleleft \\triangleright \\triangledown\\)",
    "\\(p \\veebar q\\)",
    "\\(A \\subseteqq B \\supseteqq C\\)",
    "\\(\\coth x\\)",
    "\\(\\intop f\\)",
  ])("leaves the longer command %s whole", (input) => {
    expect(cleanupArtifacts(input)).toBe(input);
  });
});
