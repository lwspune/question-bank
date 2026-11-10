import { describe, it, expect } from "vitest";
import { intlSitemapEntries, sitemapXml, intlRobotsTxt } from "@/lib/sites/intlSitemap";
import { robotsAllows } from "@/lib/seo/robotsRules";

// intl.pyqvault.com serves its own sitemap: the international pages from the
// one shared list (lib/seo/sitemapAll), moved onto the intl origin, plus its home.

const d = new Date("2026-10-30T00:00:00Z");

describe("intlSitemapEntries", () => {
  it("keeps only international pages, moves them onto the intl origin, and adds the intl home first", () => {
    const out = intlSitemapEntries(
      [
        { url: "https://www.pyqvault.com/notes/nda-maths", lastModified: d },
        { url: "https://www.pyqvault.com/notes/imat-biology", lastModified: d, priority: 0.7 },
        { url: "https://www.pyqvault.com/mock/imat-2023?x=1", lastModified: d },
      ],
      d
    );
    expect(out.map((e) => e.url)).toEqual([
      "https://intl.pyqvault.com/",
      "https://intl.pyqvault.com/notes/imat-biology",
      "https://intl.pyqvault.com/mock/imat-2023?x=1",
    ]);
    expect(out[1].priority).toBe(0.7);
  });
});

describe("sitemapXml", () => {
  it("writes a sitemap with escaped URLs and the optional fields it has", () => {
    const xml = sitemapXml([
      { url: "https://intl.pyqvault.com/a?b=1&c=2", lastModified: d, changeFrequency: "weekly", priority: 0.5 },
      { url: "https://intl.pyqvault.com/" },
    ]);
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain("<loc>https://intl.pyqvault.com/a?b=1&amp;c=2</loc>");
    expect(xml).toContain("<lastmod>2026-10-30T00:00:00.000Z</lastmod>");
    expect(xml).toContain("<changefreq>weekly</changefreq>");
    expect(xml).toContain("<priority>0.5</priority>");
    expect(xml).toContain("<url>\n<loc>https://intl.pyqvault.com/</loc>\n</url>");
  });
});

describe("intlRobotsTxt", () => {
  it("allows the site, keeps crawlers out of the API and account, and names the intl sitemap", () => {
    const txt = intlRobotsTxt();
    expect(txt).toContain("User-agent: *");
    expect(txt).toContain("Disallow: /api");
    expect(txt).toContain("Disallow: /account");
    expect(txt).toContain("Sitemap: https://intl.pyqvault.com/sitemap.xml");
  });
});

// Checked by BEHAVIOUR, like tests/robots-rules.test.ts does for www. Until
// 2026-11-10 intl's file blocked only /api and /account, so Google crawled and
// indexed filtered /browse?... pages there (3 in the 2026-11-06 Pages report).
describe("intlRobotsTxt rules", () => {
  const lines = intlRobotsTxt().split(/\r?\n/);
  const values = (field: string) =>
    lines.filter((l) => l.startsWith(`${field}:`)).map((l) => l.slice(field.length + 1).trim());
  const rules = { allow: values("Allow"), disallow: values("Disallow") };
  const can = (path: string) =>
    robotsAllows(rules, path) && robotsAllows(rules, path, { wildcards: false });

  it("blocks the /browse filter space but keeps the bare page", () => {
    expect(can("/browse")).toBe(true);
    expect(can("/browse?examId=674e89bf&subjectId=45f11121")).toBe(false);
  });

  it("blocks the same private areas as www", () => {
    for (const path of ["/dashboard", "/upload", "/api/x", "/account"]) {
      expect(can(path)).toBe(false);
    }
  });

  it("keeps the intl pages crawlable", () => {
    for (const path of ["/", "/notes/imat-biology", "/questions/imat/biology/x", "/formula/imat"]) {
      expect(can(path)).toBe(true);
    }
  });
});
