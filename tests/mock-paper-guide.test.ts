/**
 * The strategy-guide link under "Before you start" on a mock's instructions
 * page (lib/mocks/paperGuide.ts): only papers with a guide get one, and every
 * link must land on a page that exists in src/app.
 */
import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { paperGuideLink, PAPER_GUIDES } from "@/lib/mocks/paperGuide";
import { getBlueprint } from "@/lib/mocks/blueprints";

describe("paperGuideLink", () => {
  it("links a JEE Main paper to the JEE Main guides", () => {
    expect(paperGuideLink("jee-mains", "paper-1")?.href).toBe("/guide/jee-mains");
  });

  it("links a paper of one subject straight to that subject's strategy page", () => {
    expect(paperGuideLink("nda", "maths")?.href).toBe("/guide/nda-maths/strategy");
    expect(paperGuideLink("cds", "maths")?.href).toBe("/guide/cds-maths/strategy");
    expect(paperGuideLink("mht-cet", "maths")?.href).toBe("/guide/mht-cet-maths/strategy");
  });

  it("gives no link to a paper with no guide", () => {
    expect(paperGuideLink("cds", "english")).toBeNull();
    expect(paperGuideLink("ssc-cgl", "tier-1")).toBeNull();
    expect(paperGuideLink(null, "maths")).toBeNull();
  });

  it("every link lands on a real page", () => {
    for (const g of PAPER_GUIDES) {
      const dir = join(process.cwd(), "src", "app", ...g.href.split("/").filter(Boolean));
      expect(existsSync(join(dir, "page.tsx")), g.href).toBe(true);
    }
  });

  it("every entry names a real paper", () => {
    for (const g of PAPER_GUIDES) expect(getBlueprint(g.examSlug, g.paperCode), `${g.examSlug}/${g.paperCode}`).not.toBeNull();
  });

  it("labels have no dashes as punctuation", () => {
    for (const g of PAPER_GUIDES) expect(g.label).not.toMatch(/[—–]/);
  });
});
