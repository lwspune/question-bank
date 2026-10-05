import { describe, it, expect } from "vitest";
import {
  countDashTells,
  countWords,
  extractVisibleStrings,
  scanSource,
  compareToBaseline,
} from "../scripts/lib/voiceProbe";

/**
 * Spec for the dash-tell probe behind `npm run audit:voice` and the ratchet
 * in tests/voice-ratchet.test.ts. See scripts/lib/voiceProbe.ts for why the
 * em dash is measured at all.
 */

describe("countDashTells", () => {
  it("counts an em dash, spaced or not", () => {
    expect(countDashTells("Skip it — it is rarely asked")).toBe(1);
    expect(countDashTells("Skip it—it is rarely asked")).toBe(1);
    expect(countDashTells("one — two — three")).toBe(2);
  });

  it("counts a SPACED en dash and a spaced double hyphen, the swaps that keep the same rhythm", () => {
    expect(countDashTells("Skip it – it is rarely asked")).toBe(1);
    expect(countDashTells("Skip it -- it is rarely asked")).toBe(1);
  });

  it("does not count an en dash in a range", () => {
    expect(countDashTells("asked in 2017–2024")).toBe(0);
    expect(countDashTells("pages 4–7")).toBe(0);
  });

  it("does not count hyphens, CLI flags or a decrement", () => {
    expect(countDashTells("a well-known past-year question")).toBe(0);
    expect(countDashTells("npm run x -- --apply")).toBe(1); // the spaced pair still reads as a dash
    expect(countDashTells("--apply")).toBe(0);
    expect(countDashTells("i--")).toBe(0);
  });

  it("counts nothing in an empty string", () => {
    expect(countDashTells("")).toBe(0);
  });
});

describe("countWords", () => {
  it("counts words, keeping hyphenated and apostrophe words whole", () => {
    expect(countWords("A past-year question isn't hard")).toBe(5);
  });

  it("ignores numbers, math and punctuation", () => {
    expect(countWords("\\(x^2\\) = 4 — 2017")).toBe(1); // the x
    expect(countWords("— · |")).toBe(0);
  });
});

describe("extractVisibleStrings", () => {
  const texts = (src: string, file = "a.tsx") => extractVisibleStrings(src, file).map((s) => s.text);

  it("reads string literals, template text and JSX text", () => {
    const src = [
      'const a = "plain string";',
      "const b = `head ${x} tail`;",
      "const c = <p>Hello there</p>;",
    ].join("\n");
    expect(texts(src)).toEqual(["plain string", "head ", " tail", "Hello there"]);
  });

  it("skips comments", () => {
    const src = ['// a comment — with a dash', '/* block — dash */', 'const a = "kept";'].join("\n");
    expect(texts(src)).toEqual(["kept"]);
  });

  it("skips import and export specifiers", () => {
    const src = ['import x from "some—path";', 'export { y } from "./other";', 'const a = "kept";'].join("\n");
    expect(texts(src, "a.ts")).toEqual(["kept"]);
  });

  it("skips technical JSX attributes but keeps the ones people read", () => {
    const src =
      '<a className="flex gap-2" href="/x" aria-label="Open the paper" title="Paper">Go</a>';
    expect(texts(src)).toEqual(["Open the paper", "Paper", "Go"]);
  });

  it("skips technical object keys (slug, href, latex, ...)", () => {
    const src = 'const n = { slug: "a—b", href: "/x", latex: "a — b", name: "Shown name" };';
    expect(texts(src, "a.ts")).toEqual(["Shown name"]);
  });

  it("skips console calls and string literal TYPES", () => {
    const src = ['console.error("boom — failed");', 'type K = "a — b" | "c";', 'const a = "kept";'].join("\n");
    expect(texts(src, "a.ts")).toEqual(["kept"]);
  });

  it("reports the 1-based line of each string", () => {
    const src = ["const a = 1;", 'const b = "on line two";'].join("\n");
    expect(extractVisibleStrings(src, "a.ts")).toEqual([{ text: "on line two", line: 2 }]);
  });
});

describe("scanSource", () => {
  it("totals dashes and words over visible strings and lists each hit", () => {
    const src = [
      "// ignored — comment",
      'const a = "Skip it — it is rare";',
      "const b = <p>No dash here</p>;",
    ].join("\n");
    const r = scanSource(src, "a.tsx");
    expect(r.dashes).toBe(1);
    expect(r.words).toBe(8);
    expect(r.hits).toEqual([{ line: 2, text: "Skip it — it is rare" }]);
  });

  it("does not count a string that is ONLY a dash: that is an empty-cell placeholder", () => {
    const src = 'const cell = value ?? "—";';
    expect(scanSource(src, "a.ts").dashes).toBe(0);
  });

  it("DOES count a lone dash in JSX text: that is a visible separator between two values", () => {
    const src = "const r = <span>{a} — {b}</span>;";
    expect(scanSource(src, "a.tsx").dashes).toBe(1);
  });
});

describe("compareToBaseline", () => {
  it("passes when every file matches its baseline", () => {
    const r = compareToBaseline({ "a.ts": 3 }, { "a.ts": 3 });
    expect(r.increased).toEqual([]);
    expect(r.decreased).toEqual([]);
  });

  it("flags a file that went up, including a new file (baseline 0)", () => {
    const r = compareToBaseline({ "a.ts": 4, "new.ts": 1 }, { "a.ts": 3 });
    expect(r.increased).toEqual([
      { file: "a.ts", was: 3, now: 4 },
      { file: "new.ts", was: 0, now: 1 },
    ]);
  });

  it("flags a file that went down, including a deleted or fully cleaned one, so the baseline stays tight", () => {
    const r = compareToBaseline({ "a.ts": 1 }, { "a.ts": 3, "gone.ts": 2 });
    expect(r.decreased).toEqual([
      { file: "a.ts", was: 3, now: 1 },
      { file: "gone.ts", was: 2, now: 0 },
    ]);
    expect(r.increased).toEqual([]);
  });
});
