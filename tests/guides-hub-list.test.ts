import { describe, it, expect } from "vitest";
import { guideShortName, orderHubGuides } from "@/lib/guide/hubList";
import { getSubjectGuides } from "@/lib/guide/guideCatalog";

/**
 * /guide/<exam> lists its subject guides as one compact list (it was ten tall
 * cards, ~12,000 px on a phone for NDA): the biggest one marked "Start here",
 * the rest by size.
 */
describe("guideShortName", () => {
  it("strips the exam name and the paper part from the card label", () => {
    expect(guideShortName("NDA Mathematics", "NDA")).toBe("Mathematics");
    expect(guideShortName("NDA English (GAT)", "NDA")).toBe("English");
    expect(guideShortName("NDA PART B Physics", "NDA")).toBe("Physics");
    expect(guideShortName("NDA PART A Geography", "NDA")).toBe("Geography");
    expect(guideShortName("NDA Current Affairs", "NDA")).toBe("Current Affairs");
    expect(guideShortName("MHT-CET Chemistry", "MHT-CET")).toBe("Chemistry");
    expect(guideShortName("CDS Elementary Mathematics", "CDS")).toBe("Elementary Mathematics");
  });

  it("keeps a label that is not prefixed", () => {
    expect(guideShortName("Mathematics", "NDA")).toBe("Mathematics");
  });

  it("names every live guide with something left after stripping", () => {
    for (const exam of ["nda", "mht-cet", "jee-mains", "cds"] as const) {
      const display = { nda: "NDA", "mht-cet": "MHT-CET", "jee-mains": "JEE Mains", cds: "CDS" }[exam];
      for (const g of getSubjectGuides(exam)) expect(guideShortName(g.exam, display).length, g.exam).toBeGreaterThan(2);
    }
  });
});

describe("orderHubGuides", () => {
  const g = (href: string, qCount: number) => ({ href, qCount });

  it("puts the biggest guide first and the rest by size", () => {
    const { start, rest } = orderHubGuides([g("a", 10), g("b", 50), g("c", 30)]);
    expect(start?.href).toBe("b");
    expect(rest.map((x) => x.href)).toEqual(["c", "a"]);
  });

  it("keeps catalogue order between equal sizes", () => {
    const { rest } = orderHubGuides([g("top", 99), g("a", 5), g("b", 5)]);
    expect(rest.map((x) => x.href)).toEqual(["a", "b"]);
  });

  it("handles one guide and none", () => {
    expect(orderHubGuides([g("only", 3)])).toEqual({ start: g("only", 3), rest: [] });
    expect(orderHubGuides([])).toEqual({ start: null, rest: [] });
  });

  it("starts NDA with Maths, its biggest paper", () => {
    expect(orderHubGuides(getSubjectGuides("nda")).start?.href).toBe("/guide/nda-maths");
  });
});
