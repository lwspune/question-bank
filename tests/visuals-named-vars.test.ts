import { describe, expect, it } from "vitest";
import { parseVars } from "@/lib/visuals/namedVars";
import { getScene } from "@/lib/visuals/registry";

// Postgres jsonb does not keep an object's key order: it stores keys shortest
// first, then bytewise. A visual's `vars` written in dependency order came back
// with a var ahead of one it names, and the scene refused it on read, so the
// animation was silently hidden from students (2026-11-08: 1,180 of 8,369).
function jsonbOrder<T extends Record<string, unknown>>(o: T): T {
  const keys = Object.keys(o).sort((a, b) => a.length - b.length || (a < b ? -1 : a > b ? 1 : 0));
  return Object.fromEntries(keys.map((k) => [k, o[k]])) as T;
}

describe("parseVars", () => {
  it("works out each var once the vars it names are known, whatever their order", () => {
    expect(parseVars({ area: "base*h/2", base: 4, h: "base+2" }, 30)).toEqual({ base: 4, h: 6, area: 12 });
    expect(parseVars(jsonbOrder({ lam: "c/nu", c: 3e8, nu: "6*10^14" }), 30)).toEqual({ c: 3e8, nu: 6e14, lam: 5e-7 });
  });

  it("still refuses a name no var defines, naming it", () => {
    expect(() => parseVars({ a: "b*2" }, 30)).toThrow(/b/);
  });

  it("refuses vars that name each other in a circle", () => {
    expect(() => parseVars({ a: "b+1", b: "a+1" }, 30)).toThrow(/vars/);
  });

  it("keeps the limit and the name rules", () => {
    expect(() => parseVars({ a: 1, b: 2 }, 1)).toThrow(/at most 1/);
    expect(() => parseVars({ x: 1 }, 30)).toThrow(/cannot be a var name/);
  });

  it("parses a sketch and an algebra-steps visual after a jsonb round trip", () => {
    const sketch = getScene("sketch")!;
    const params = {
      vars: { r: 1.6, d: "2*r", g: 10, vL: 10, vH: "sqrt(vL^2-4*g*r)" },
      view: { x: [-3, 3], y: [-1, 4] },
      points: { B: [0, 0], T: [0, "d"] },
      items: [{ kind: "segment", from: "B", to: "T", step: "s1" }],
      assert: ["vH = 6"],
      answer: "d",
    };
    const stored = JSON.parse(JSON.stringify({ ...params, vars: jsonbOrder(params.vars) }));
    expect(Object.keys(stored.vars)[0]).toBe("d");
    expect(sketch.parse(stored)).not.toHaveProperty("error");

    const algebra = getScene("algebraSteps")!;
    const alg = {
      vars: jsonbOrder({ E: 1000, w1: 20, w2: 30, I: "2*E/(w2^2-w1^2)" }),
      lines: [
        { step: "s1", kind: "note", tex: "E = 1000\\ \\text{J}" },
        { step: "s2", kind: "calc", tex: "I = 4", f: "I", value: "4" },
      ],
      answer: "I",
    };
    expect(algebra.parse(alg)).not.toHaveProperty("error");
  });
});
