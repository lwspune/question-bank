/**
 * Pure unit tests for the /guide cross-exam rail.
 *
 * Mirrors tests/notes-nav.test.ts. The rail is the exam switcher shown on
 * /guide, /guide/nda and /guide/mht-cet — the same shape /notes uses, so the
 * two trees navigate identically.
 */
import { describe, it, expect } from "vitest";
import {
  getGuideExamGroups,
  buildGuideSideNav,
} from "@/lib/guide/guidesNav";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

describe("getGuideExamGroups", () => {
  it("returns exactly the exams that have a shipped /guide subtree", () => {
    const groups = getGuideExamGroups();
    const expected = EXAM_REGISTRY.filter((e) => e.guidesPath !== null);
    expect(groups).toHaveLength(expected.length);
    expect(groups.map((g) => g.slug)).toEqual(expected.map((e) => e.slug));
  });

  it("includes NDA and MHT-CET today", () => {
    const slugs = getGuideExamGroups().map((g) => g.slug);
    expect(slugs).toContain("nda");
    expect(slugs).toContain("mht-cet");
  });

  it("excludes exams with no guide subtree", () => {
    const slugs = getGuideExamGroups().map((g) => g.slug);
    // These have notes and/or a bank but no /guide subtree.
    expect(slugs).not.toContain("jee-mains");
    expect(slugs).not.toContain("neet");
    expect(slugs).not.toContain("cds");
  });

  it("preserves EXAM_REGISTRY order", () => {
    const groups = getGuideExamGroups();
    const registryOrder = EXAM_REGISTRY.filter(
      (e) => e.guidesPath !== null
    ).map((e) => e.slug);
    expect(groups.map((g) => g.slug)).toEqual(registryOrder);
  });

  it("carries a non-empty guidesPath for every group", () => {
    for (const g of getGuideExamGroups()) {
      expect(g.guidesPath, `${g.slug} has an empty guidesPath`).toBeTruthy();
      expect(g.guidesPath.startsWith("/guide")).toBe(true);
    }
  });
});

describe("buildGuideSideNav", () => {
  it('leads with "All exams" pointing at the index', () => {
    const nav = buildGuideSideNav();
    expect(nav[0]).toEqual({ href: "/guide", label: "All exams" });
  });

  it("lists one entry per guide-bearing exam after the index", () => {
    const nav = buildGuideSideNav();
    const groups = getGuideExamGroups();
    expect(nav).toHaveLength(groups.length + 1);
    for (const g of groups) {
      expect(nav).toContainEqual({ href: g.guidesPath, label: g.displayName });
    }
  });

  it("has no duplicate hrefs", () => {
    const hrefs = buildGuideSideNav().map((i) => i.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("matches the /notes rail shape so the two trees navigate alike", () => {
    // GuideSideNav derives its active-state landing from the FIRST item, so
    // the index must lead — otherwise "All exams" stays highlighted on every
    // per-exam hub.
    const nav = buildGuideSideNav();
    expect(nav[0].href).toBe("/guide");
    expect(nav.every((i) => i.href.startsWith("/guide"))).toBe(true);
  });
});
