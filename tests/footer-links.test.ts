/**
 * The site-wide footer's link model.
 *
 * Until 2026-09-24 the Footer was 23 hand-typed links in one flat wrap — eleven
 * of them individual subject guides — and it listed two of the four /notes
 * hubs, because a hand-typed list is exactly the thing that lags a registry.
 * `footerLinks()` is the pure replacement: four short groups, with the Guides
 * and Notes groups DERIVED from the same registries the /guide and /notes
 * pickers render from, so a new exam's hub appears here by itself.
 *
 * Two things are pinned here rather than in the component:
 *
 *  - CRAWL ENTRY POINTS. tests/crawl-entry-points.test.ts used to grep
 *    Footer.tsx for literal `href="…"` strings. Derived links no longer appear
 *    as literals, so that test now reads this model too. The pinned set is the
 *    same: the four crawl-starved content surfaces plus the ones the footer
 *    already carried.
 *  - WHAT IS NOT THERE. No GitHub link (user's call, 2026-09-24) and no
 *    per-subject guide links: those are one hop away on the exam hub the
 *    footer still links from every page.
 */
import { describe, it, expect } from "vitest";
import { footerLinks, type FooterGroup } from "@/lib/nav/footerLinks";
import { getGuideExamGroups } from "@/lib/guide/guidesNav";
import { getNotesExamGroups } from "@/lib/notes/notesNav";
import { CONTACT_EMAIL } from "@/lib/brand";

const groups = footerLinks();
const all = groups.flatMap((g) => g.links);
const hrefs = all.map((l) => l.href);
const byTitle = (title: string): FooterGroup => {
  const g = groups.find((x) => x.title === title);
  if (!g) throw new Error(`no footer group titled ${title}`);
  return g;
};

describe("footerLinks", () => {
  it("is four groups in a fixed order", () => {
    expect(groups.map((g) => g.title)).toEqual(["Explore", "Guides", "Notes", "About"]);
  });

  it.each(["/browse", "/questions", "/mock", "/board", "/formula"])(
    "Explore carries the content surface %s",
    (href) => {
      expect(byTitle("Explore").links.map((l) => l.href)).toContain(href);
    }
  );

  it("Guides is the index followed by one hub per guide-bearing exam, from the registry", () => {
    const expected = ["/guide", ...getGuideExamGroups().map((g) => g.guidesPath)];
    expect(byTitle("Guides").links.map((l) => l.href)).toEqual(expected);
    // The registry is not empty — otherwise the assertion above is vacuous.
    expect(expected.length).toBeGreaterThan(1);
  });

  it("Notes is the index followed by one hub per notes-bearing exam, from the registry", () => {
    const expected = ["/notes", ...getNotesExamGroups().map((g) => `/notes/${g.slug}`)];
    expect(byTitle("Notes").links.map((l) => l.href)).toEqual(expected);
    // The lagging hand-typed list had 2 of these; the registry has more.
    expect(expected.length).toBeGreaterThan(3);
    expect(expected).toContain("/notes/nda");
  });

  it("About carries how-it-works, blog, about and the report mailto", () => {
    const about = byTitle("About").links.map((l) => l.href);
    expect(about).toContain("/start");
    expect(about).toContain("/blog");
    expect(about).toContain("/about");
    const mailto = about.find((h) => h.startsWith("mailto:"));
    expect(mailto).toContain(CONTACT_EMAIL);
  });

  it("carries no GitHub link, and no /guide path beyond the index + exam hubs", () => {
    expect(hrefs.some((h) => /github\.com/i.test(h))).toBe(false);
    // A hyphen cannot tell a subject guide (/guide/nda-maths) from a hub
    // (/guide/mht-cet); the registry can.
    const allowed = new Set(["/guide", ...getGuideExamGroups().map((g) => g.guidesPath)]);
    for (const h of hrefs.filter((h) => h.startsWith("/guide"))) {
      expect(allowed.has(h), `${h} is not a guide hub`).toBe(true);
    }
  });

  it("every href is unique and every label is non-empty", () => {
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const l of all) expect(l.label.trim().length).toBeGreaterThan(0);
  });

  it("only the mailto is external", () => {
    for (const l of all) {
      if (l.href.startsWith("mailto:")) expect(l.external).toBe(true);
      else expect(l.href.startsWith("/")).toBe(true);
    }
  });
});
