import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { GUIDE_CATALOG, getSubjectGuides, hasSubjectGuide, soleGuideHrefs } from "@/lib/guide/guideCatalog";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";

/**
 * The subject-level guide registry. Before it, each /guide/<exam> hub
 * hardcoded its own card list, so a third exam meant a third hand-written list
 * and nothing tied a hub to EXAM_REGISTRY.guidesPath.
 */
describe("GUIDE_CATALOG — the subject-level guide registry", () => {
  const withGuides = EXAM_REGISTRY.filter((e) => e.guidesPath !== null).map((e) => e.slug);

  it("lists subject guides for every exam that has a /guide subtree", () => {
    for (const slug of withGuides) expect(getSubjectGuides(slug).length, slug).toBeGreaterThan(0);
  });

  it("lists no exam that has no /guide subtree", () => {
    for (const slug of Object.keys(GUIDE_CATALOG)) expect(withGuides, slug).toContain(slug);
  });

  it("points every card at a route that exists", () => {
    for (const cards of Object.values(GUIDE_CATALOG)) {
      for (const c of cards ?? []) {
        expect(existsSync(join(process.cwd(), "src/app", c.href, "page.tsx")), c.href).toBe(true);
      }
    }
  });

  it("never lists one guide twice", () => {
    const hrefs = Object.values(GUIDE_CATALOG).flatMap((cards) => (cards ?? []).map((c) => c.href));
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("returns an empty list for an exam without guides", () => {
    expect(getSubjectGuides("neet")).toEqual([]);
  });
});

describe("hasSubjectGuide — the notes pages' strategy chip", () => {
  it("is true for a subject with a guide and false for one without", () => {
    expect(hasSubjectGuide("jee-mains-maths")).toBe(true);
    expect(hasSubjectGuide("cds-maths")).toBe(true);
    expect(hasSubjectGuide("jee-mains-chemistry")).toBe(true);
    expect(hasSubjectGuide("jee-mains-physics")).toBe(true);
  });

  it("agrees with the filesystem for every notes subject, both ways", () => {
    const routes = [...new Set(NOTES_CHAPTERS.map((c) => c.subjectRoute))];
    for (const r of routes) {
      const onDisk = existsSync(join(process.cwd(), "src/app/guide", r, "page.tsx"));
      expect(hasSubjectGuide(r), r).toBe(onDisk);
    }
  });
});

describe("soleGuideHrefs — exams whose hub would hold a single card", () => {
  it("maps exactly the exams with one subject guide to that guide", () => {
    const expected = Object.fromEntries(
      Object.entries(GUIDE_CATALOG)
        .filter(([, cards]) => cards?.length === 1)
        .map(([slug, cards]) => [slug, cards![0].href])
    );
    expect(soleGuideHrefs()).toEqual(expected);
  });

  it("names CDS (Maths is its only guide today) and not a multi-guide exam", () => {
    const sole = soleGuideHrefs();
    expect(sole.cds).toBe("/guide/cds-maths");
    expect(sole.nda).toBeUndefined();
  });
});
