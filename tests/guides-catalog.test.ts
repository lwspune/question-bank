import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { GUIDE_CATALOG, getSubjectGuides } from "@/lib/guide/guideCatalog";

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
