/**
 * An intl exam on its way in (noPublicContent) is known to ROUTING from the day
 * it is registered (www's lists must leave it out, its URLs belong to intl),
 * but students must not SEE it until its questions are public (2026-11-15,
 * ENEM: registered and deployed before its rows were committed). Without this,
 * the intl home, footer and mocks switcher would show an empty exam, the intl
 * welcome step would add it to every new student's exams, and bare /notes and
 * /mock on intl would stop going to IMAT's pages.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import * as intl from "@/lib/sites/intl";
import {
  INTL_EXAMS,
  LIVE_INTL_EXAMS,
  intlExamPickerPath,
  intlHostDecision,
  intlNavFor,
  intlPickedExam,
  intlWelcomeExam,
} from "@/lib/sites/intl";

describe("live intl exams", () => {
  it("are the intl exams with public content", () => {
    expect(LIVE_INTL_EXAMS.every((e) => e.site === "intl" && !e.noPublicContent)).toBe(true);
    expect(INTL_EXAMS.filter((e) => !e.noPublicContent).map((e) => e.slug)).toEqual(LIVE_INTL_EXAMS.map((e) => e.slug));
  });

  it("include ENEM since its rows went public (2026-11-15), beside IMAT", () => {
    expect(LIVE_INTL_EXAMS.map((e) => e.slug)).toEqual(expect.arrayContaining(["imat", "enem"]));
  });

  it("send bare /notes and /formula to the one live exam WITH notes (IMAT), not home", () => {
    expect(intlHostDecision("/notes", "")).toEqual({ kind: "redirect", url: "/notes/imat", permanent: false });
    expect(intlHostDecision("/formula", "")).toEqual({ kind: "redirect", url: "/formula/imat", permanent: false });
  });

  it("send bare /mock home, where every live exam's mocks are listed, once there are two", () => {
    expect(intlHostDecision("/mock", "")).toEqual({ kind: "redirect", url: "/", permanent: false });
  });

  it("gives an exam without notes (ENEM) no Notes tab, rather than a dead link", () => {
    expect(intlNavFor("/mock/exam/enem").map((l) => l.label)).toEqual(["Mocks", "Questions"]);
    expect(intlNavFor("/mock/exam/imat").map((l) => l.label)).toContain("Notes");
  });

  it("links notes and formula sheets in the footer only for an exam that has notes", () => {
    const src = readFileSync(join(process.cwd(), "src/components/footer/IntlFooter.tsx"), "utf8");
    expect(src).not.toMatch(/notesPath \?\? `\/notes\//);
    expect(src).toMatch(/exam\.notesPath &&/);
  });

  it.each([
    "src/app/intl/page.tsx",
    "src/components/footer/IntlFooter.tsx",
    "src/lib/mocks/mocksNav.ts",
  ])("%s lists only live intl exams", (f) => {
    const src = readFileSync(join(process.cwd(), f), "utf8");
    expect(src).toMatch(/LIVE_INTL_EXAMS/);
    expect(src).not.toMatch(/\bINTL_EXAMS\b(?!\w)/);
  });
});

/**
 * The intl welcome step records a new student's ONE intl exam (owner,
 * 2026-11-18). Recording every live exam when the page named none counted an
 * IMAT student as an ENEM student too (one did, 18 Nov: signed in from a page
 * that named no exam, though they had landed on /notes/imat-chemistry). So:
 * the page they are headed to, else the page they first landed on, else no
 * guess, and the student picks on /welcome/exam.
 */
describe("intl welcome exam", () => {
  it.each([
    ["/notes/imat/biology/cell-biology", "imat"],
    ["/notes/imat-chemistry", "imat"],
    ["/mock/exam/imat", "imat"],
    ["/mock/exam/enem", "enem"],
    ["/questions/enem/matematica/estatistica", "enem"],
  ])("takes the exam the destination %s names", (next, want) => {
    expect(intlWelcomeExam({ next, landing: null })).toBe(want);
  });

  it.each([
    ["/", "/notes/imat-chemistry", "imat"],
    ["/browse", "/mock/exam/enem", "enem"],
    ["/me", "/questions/imat/chemistry/atomic-structure", "imat"],
  ])("falls back to the landing page when %s names no exam", (next, landing, want) => {
    expect(intlWelcomeExam({ next, landing })).toBe(want);
  });

  it("prefers the destination over the landing page", () => {
    expect(intlWelcomeExam({ next: "/mock/exam/enem", landing: "/notes/imat-chemistry" })).toBe("enem");
  });

  // With one live intl exam there is nothing to ask; with more, no guess.
  const noGuess = LIVE_INTL_EXAMS.length === 1 ? LIVE_INTL_EXAMS[0].slug : null;

  it.each([
    ["/", null],
    ["/browse", undefined],
    ["/me", "/"],
    ["/mock/exam/nda", "/notes/nda-maths"],
    ["not-a-path", "not-a-path"],
  ])("makes no guess when neither %s nor the landing names a live intl exam", (next, landing) => {
    expect(intlWelcomeExam({ next, landing })).toBe(noGuess);
  });

  it("never returns more than one exam", () => {
    const out = intlWelcomeExam({ next: "/", landing: "/" });
    expect(out === null || typeof out === "string").toBe(true);
  });
});

describe("intl picked exam", () => {
  it.each(LIVE_INTL_EXAMS.map((e) => e.slug))("accepts the live intl exam %s", (slug) => {
    expect(intlPickedExam(slug)).toBe(slug);
  });

  it.each([["nda"], [""], [undefined], [null], [["imat"]], ["IMAT "], ["imat,enem"]])(
    "refuses %j",
    (raw) => {
      expect(intlPickedExam(raw)).toBeNull();
    }
  );

  it("refuses an intl exam with no public content yet", () => {
    for (const e of INTL_EXAMS.filter((x) => x.noPublicContent)) expect(intlPickedExam(e.slug)).toBeNull();
  });
});

describe("intl welcome wiring", () => {
  const route = readFileSync(join(process.cwd(), "src/app/intl/welcome/route.ts"), "utf8");
  const picker = readFileSync(join(process.cwd(), "src/app/intl/welcome/exam/page.tsx"), "utf8");

  it("the route saves one guessed exam and sends a no-guess student to the picker", () => {
    expect(route).toMatch(/intlWelcomeExam\(/);
    expect(route).toMatch(/saveIntlTargets\(.*, \[exam\]\)/);
    expect(route).toMatch(/intlExamPickerPath\(/);
    expect(route).not.toMatch(/\bLIVE_INTL_EXAMS\b|\bINTL_EXAMS\b/);
  });

  it("the picker saves exactly the one exam the student tapped", () => {
    expect(picker).toMatch(/intlPickedExam\(/);
    expect(picker).toMatch(/saveIntlTargets\(.*, \[exam\]\)/);
  });

  it("the old save-every-live-exam helper is gone", () => {
    expect(intl).not.toHaveProperty("intlWelcomeTargets");
  });

  it("the picker URL carries the destination", () => {
    expect(intlExamPickerPath("/browse?x=1")).toBe("/welcome/exam?next=%2Fbrowse%3Fx%3D1");
  });
});
