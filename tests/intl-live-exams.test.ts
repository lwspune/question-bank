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
import { INTL_EXAMS, LIVE_INTL_EXAMS, intlHostDecision, intlNavFor } from "@/lib/sites/intl";

describe("live intl exams", () => {
  it("are the intl exams with public content", () => {
    expect(LIVE_INTL_EXAMS.every((e) => e.site === "intl" && !e.noPublicContent)).toBe(true);
    expect(INTL_EXAMS.filter((e) => !e.noPublicContent).map((e) => e.slug)).toEqual(LIVE_INTL_EXAMS.map((e) => e.slug));
  });

  it("leave out ENEM until its rows are public, while routing already knows it", () => {
    expect(INTL_EXAMS.map((e) => e.slug)).toContain("enem");
    expect(LIVE_INTL_EXAMS.map((e) => e.slug)).not.toContain("enem");
  });

  it("decide where bare section links go: one live exam keeps them on its pages", () => {
    if (LIVE_INTL_EXAMS.length !== 1) return;
    const only = LIVE_INTL_EXAMS[0];
    expect(intlHostDecision("/mock", "")).toEqual({ kind: "redirect", url: `/mock/exam/${only.slug}`, permanent: false });
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
    "src/app/intl/welcome/route.ts",
    "src/lib/mocks/mocksNav.ts",
  ])("%s lists only live intl exams", (f) => {
    const src = readFileSync(join(process.cwd(), f), "utf8");
    expect(src).toMatch(/LIVE_INTL_EXAMS/);
    expect(src).not.toMatch(/\bINTL_EXAMS\b(?!\w)/);
  });
});
