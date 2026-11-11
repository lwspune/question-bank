/**
 * The Review tab's traps panel reads a chapter's playbook (trigger + traps)
 * through lib/guide/chapterTraps.ts, keyed exactly as the /browse playbook
 * chip is (lib/links/questionResources: exam, subject literal, chapter name).
 *
 * The traps are the guides' own text, already public on the playbook pages.
 * They have NOT been independently checked yet (owner, 2026-11-11: ship,
 * validate later; SUGGESTIONS.md backfill ledger).
 */
import { describe, it, expect } from "vitest";
import { getChapterTraps } from "@/lib/guide/chapterTraps";
import { chapterKeyedGuides } from "@/lib/links/questionResources";

describe("getChapterTraps", () => {
  it("reads JEE Main Maths Conic Sections: its trigger, its traps and the playbook link the chips use", () => {
    const t = getChapterTraps({ examName: "JEE Mains", subjectName: "Maths", chapterName: "Conic Sections" });
    expect(t?.trigger).toMatch(/circle, parabola, ellipse or hyperbola/);
    expect(t?.traps.map((x) => x.name)).toContain("Reading g and f too early");
    expect(t?.playbook).toEqual({ href: "/guide/jee-mains-maths/playbooks/conic-sections", label: "Conic Sections playbook" });
  });

  it("keys by the subject literal each exam uses (MHT-CET says Maths, NDA and CDS say Mathematics)", () => {
    expect(getChapterTraps({ examName: "CDS", subjectName: "Maths", chapterName: "Trigonometry" })).toBeNull();
  });

  it("returns null where there is no chapter playbook: NDA Maths (principles), NDA English (by subtopic), an unknown chapter", () => {
    expect(getChapterTraps({ examName: "NDA", subjectName: "Mathematics", chapterName: "Probability" })).toBeNull();
    expect(getChapterTraps({ examName: "NDA", subjectName: "English", chapterName: "Spotting Errors" })).toBeNull();
    expect(getChapterTraps({ examName: "JEE Mains", subjectName: "Maths", chapterName: "No Such Chapter" })).toBeNull();
    expect(getChapterTraps({ examName: "SSC CGL", subjectName: "Quantitative Aptitude", chapterName: "Percentage" })).toBeNull();
  });

  it("every chapter-keyed playbook resolves, with a trigger and at least one trap", () => {
    let n = 0;
    for (const g of chapterKeyedGuides()) {
      for (const p of g.playbooks) {
        const t = getChapterTraps({ examName: g.exam, subjectName: g.subject, chapterName: p.chapter });
        expect(t, `${g.guideSlug}/${p.slug}`).not.toBeNull();
        expect(t!.trigger.length, `${g.guideSlug}/${p.slug} trigger`).toBeGreaterThan(10);
        expect(t!.traps.length, `${g.guideSlug}/${p.slug} traps`).toBeGreaterThanOrEqual(1);
        n += 1;
      }
    }
    expect(n).toBeGreaterThan(200);
  });
});
