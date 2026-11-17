import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// 2026-11-17 (SUGGESTIONS 2026-09-14): Quadratic Equations ("the densest HARD
// profile of any NDA Maths topic"), Properties of Triangle ("the toughest yield
// in NDA Maths") and Matrices ("It is also the hardest") all claimed the top
// spot while Height & Distance, at 69% HARD, actually holds it. The right
// wording cannot be derived, but a contradiction can be counted: at most ONE
// chapter per notes subject may call itself the subject's hardest.
const NOTES = join(__dirname, "..", "src", "app", "notes");

/** A sentence claiming a SUBJECT-wide difficulty superlative (not "the chapter's hardest pocket"). */
export function claimsSubjectSuperlative(text: string): boolean {
  return text
    .split(/(?<=[.!?])\s+/)
    .some(
      (s) =>
        /\b(single hardest|the hardest\b(?! (pocket|thing|one|questions|sphere|substitutions|is\b|subtopic))|toughest (yield|chapter)|densest HARD)/i.test(s) &&
        !/chapter's (hardest|toughest)|(among|one of) the (hardest|toughest)/i.test(s)
    );
}

function chapterIntros(route: string): { file: string; intro: string }[] {
  const out: { file: string; intro: string }[] = [];
  for (const ch of readdirSync(join(NOTES, route), { withFileTypes: true })) {
    if (!ch.isDirectory()) continue;
    const f = join(NOTES, route, ch.name, "_data", "chapter.ts");
    if (!existsSync(f)) continue;
    const src = readFileSync(f, "utf8").replace(/\r\n/g, "\n");
    const m = /intro:\s*([\s\S]*?),\n\s*[a-zA-Z]+:/.exec(src);
    if (m) out.push({ file: `${route}/${ch.name}`, intro: m[1] });
  }
  return out;
}

describe("claimsSubjectSuperlative", () => {
  it("catches the subject-wide forms", () => {
    expect(claimsSubjectSuperlative("It is the single hardest chapter in the NDA Maths bank.")).toBe(true);
    expect(claimsSubjectSuperlative("It is the toughest yield in NDA Maths.")).toBe(true);
    expect(claimsSubjectSuperlative("37% HARD, the densest HARD profile of any topic.")).toBe(true);
    expect(claimsSubjectSuperlative("It is also the hardest: a third are HARD.")).toBe(true);
  });
  it("leaves within-chapter and comparative wording alone", () => {
    expect(claimsSubjectSuperlative("This is the chapter's hardest pocket.")).toBe(false);
    expect(claimsSubjectSuperlative("It is among the hardest topics in NDA Maths.")).toBe(false);
    expect(claimsSubjectSuperlative("The hardest questions ask for a locus.")).toBe(false);
  });
});

describe("at most one chapter per notes subject claims to be its hardest", () => {
  const routes = readdirSync(NOTES, { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith("_") && !d.name.startsWith("["));
  for (const r of routes) {
    it(r.name, () => {
      const claimants = chapterIntros(r.name).filter((c) => claimsSubjectSuperlative(c.intro)).map((c) => c.file);
      expect(claimants.length, claimants.join(", ")).toBeLessThanOrEqual(1);
    });
  }
});
