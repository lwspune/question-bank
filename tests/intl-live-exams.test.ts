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
import { INTL_EXAMS, LIVE_INTL_EXAMS, intlHostDecision, intlNavFor, intlWelcomeTargets } from "@/lib/sites/intl";

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
 * The intl welcome step records a new student's intl exams. With two live
 * exams it must record the one they signed up from, else an IMAT student is
 * counted as an ENEM student (and mailed as one), and the other way round.
 */
describe("intl welcome targets", () => {
  it.each([
    ["/notes/imat/biology/cell-biology", ["imat"]],
    ["/mock/exam/imat", ["imat"]],
    ["/mock/exam/enem", ["enem"]],
    ["/questions/enem/matematica/estatistica", ["enem"]],
  ])("records only the exam %s belongs to", (next, want) => {
    expect(intlWelcomeTargets(next)).toEqual(want);
  });

  it.each(["/", "/browse", "/me", "/mock/exam/nda", "not-a-path"])(
    "records every live intl exam when %s names none of them",
    (next) => {
      expect(intlWelcomeTargets(next)).toEqual(LIVE_INTL_EXAMS.map((e) => e.slug));
    }
  );

  it("is what the welcome route saves", () => {
    const src = readFileSync(join(process.cwd(), "src/app/intl/welcome/route.ts"), "utf8");
    expect(src).toMatch(/intlWelcomeTargets\(destination\)/);
    expect(src).not.toMatch(/\bINTL_EXAMS\b(?!\w)/);
  });
});
