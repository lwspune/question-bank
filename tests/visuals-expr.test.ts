import { describe, expect, it } from "vitest";
import { compileExpr } from "@/lib/visuals/expr";

const at = (src: string, x: number) => {
  const r = compileExpr(src);
  if ("error" in r) throw new Error(r.error);
  return r.fn(x);
};

describe("compileExpr", () => {
  it("does arithmetic with the usual precedence", () => {
    expect(at("1+2*3", 0)).toBe(7);
    expect(at("(1+2)*3", 0)).toBe(9);
    expect(at("2^3^2", 0)).toBe(512); // ^ is right-associative
    expect(at("-x^2", 3)).toBe(-9); // unary minus binds looser than ^
    expect(at("10/4-1", 0)).toBe(1.5);
  });

  it("knows x, pi and e, and implicit multiplication is NOT allowed", () => {
    expect(at("x*pi", 2)).toBeCloseTo(2 * Math.PI, 12);
    expect(at("e", 0)).toBeCloseTo(Math.E, 12);
    expect(compileExpr("2x")).toHaveProperty("error");
  });

  it("knows the functions a JEE or CET solution uses", () => {
    expect(at("sin(x)^2+cos(x)^2", 1.234)).toBeCloseTo(1, 12);
    expect(at("16^(sin(x)^2)+16^(cos(x)^2)", Math.PI / 3)).toBeCloseTo(16 ** 0.75 + 16 ** 0.25, 9);
    expect(at("x*log(x)", Math.exp(-2))).toBeCloseTo(-2 * Math.exp(-2), 12); // log is natural
    expect(at("ln(e)", 0)).toBeCloseTo(1, 12);
    expect(at("log10(1000)", 0)).toBeCloseTo(3, 12);
    expect(at("sqrt(abs(x))", -9)).toBe(3);
    expect(at("atan(1)+asin(1)+acos(1)", 0)).toBeCloseTo(Math.PI / 4 + Math.PI / 2, 12);
    expect(at("exp(tan(0))", 0)).toBe(1);
  });

  it("refuses anything outside the grammar: unknown names, bad syntax, too long", () => {
    for (const bad of ["alert(1)", "x.constructor", "sin x", "1+", "(1", "1)", "x;1", "[1]", "", "1".repeat(200)]) {
      expect(compileExpr(bad), bad).toHaveProperty("error");
    }
  });

  it("returns NaN, not a throw, outside a function's domain", () => {
    expect(at("log(x)", -1)).toBeNaN();
    expect(at("sqrt(x)", -4)).toBeNaN();
  });

  it("reads named numbers when given them, for the sketch scene's vars", () => {
    const r = compileExpr("sqrt(a^2+b^2)", { a: 3, b: 4 });
    if ("error" in r) throw new Error(r.error);
    expect(r.fn(0)).toBe(5);
    // A name not given is still refused, so a typo cannot read as zero.
    expect(compileExpr("a+c", { a: 1 })).toHaveProperty("error");
    // Without names the language is unchanged.
    expect(compileExpr("a+1")).toHaveProperty("error");
  });

  it("knows atan2 and degree helpers, for angles in a sketch", () => {
    const at = (src: string) => {
      const r = compileExpr(src, {});
      if ("error" in r) throw new Error(r.error);
      return r.fn(0);
    };
    expect(at("atan2(1, 1)")).toBeCloseTo(Math.PI / 4, 12);
    expect(at("deg(pi)")).toBeCloseTo(180, 12);
    expect(at("rad(90)")).toBeCloseTo(Math.PI / 2, 12);
    expect(at("min(2, 3) + max(2, 3)")).toBe(5);
    expect(compileExpr("atan2(1)")).toHaveProperty("error");
  });
});

