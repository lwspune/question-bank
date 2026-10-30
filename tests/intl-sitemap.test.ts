import { describe, it, expect } from "vitest";
import { intlSitemapEntries, sitemapXml, intlRobotsTxt } from "@/lib/sites/intlSitemap";

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
