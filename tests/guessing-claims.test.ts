/**
 * What a guess is worth is ARITHMETIC on an exam's marking, never a typed
 * guess (2026-11-11). Six NDA guides said the -1.33 penalty "makes guessing
 * negative-EV below ~55% confidence"; on +4/-1.33 the break-even is 25%
 * (penalty / (reward + penalty)), and a BLIND guess among four options is worth
 * about 0, never negative. One guide added a "75%+ confidence threshold",
 * advice that throws away +1.33 a question at 50% confidence.
 *
 * So the guides may state guessing values only as worked numbers (CDS Maths'
 * GUESS_RULE, lib/guide/jeeMarking.ts), and this scan fails on the shapes the
 * wrong claims took. The live per-paper rule is lib/mocks/beforeYouStart.ts.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["src/app/guide", "src/lib/guide"].map((r) => join(process.cwd(), r));

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return files(p);
    return /\.(ts|tsx)$/.test(name) ? [p] : [];
  });
}

const BANNED: { what: string; re: RegExp }[] = [
  { what: "a guess called negative-EV (a blind guess is worth about 0 on a one-third penalty)", re: /negative[- ]EV\b/i },
  { what: "a typed confidence threshold (the break-even is penalty / (reward + penalty), compute it)", re: /\d+\s*%\+?\s*confiden/i },
  { what: "NDA GAT's -1.33 called harsher than Maths' -0.83 (both are a third of a right answer)", re: /harsher than NDA Maths/i },
];

describe("guide guessing claims", () => {
  const all = ROOTS.flatMap(files);

  it("scans the guides", () => {
    expect(all.length).toBeGreaterThan(100);
  });

  // The patterns must still catch the sentences they were written for, and not
  // ordinary maths ("a negative even though"), or the scan passes blind.
  it("each pattern catches the wrong sentence it was written for", () => {
    const bad = [
      "the −1.33 makes guessing negative-EV at below ~55% confidence.",
      "World Polity multi-statement questions need a 75%+ confidence threshold",
      "The −1.33 penalty per wrong is harsher than NDA Maths&rsquo; −0.83",
    ];
    bad.forEach((s, i) => expect(BANNED[i].re.test(s), BANNED[i].what).toBe(true));
    expect(BANNED[0].re.test("cos⁻¹ of a negative number, negative even though")).toBe(false);
  });

  for (const b of BANNED) {
    it(`no guide states ${b.what}`, () => {
      const hits = all.flatMap((f) =>
        readFileSync(f, "utf8")
          .replace(/\r?\n\s*/g, " ")
          .match(new RegExp(b.re.source, "gi"))
          ? [relative(process.cwd(), f)]
          : []
      );
      expect(hits).toEqual([]);
    });
  }
});
