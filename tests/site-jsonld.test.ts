/**
 * The site-wide Organization + WebSite structured data in the root layout
 * (2026-09-29). Until now the only JSON-LD on the site was per-page (blog
 * Article, guide CollectionPage), so nothing told a search engine who
 * "PYQ Vault" is or how its pages relate to the publisher.
 *
 * Only genuine profiles go in `sameAs`. The logo is the real brand icon
 * (2026-10-04: the V mark, public/icons/icon-512.png); before that there was
 * no logo file, and pointing at a generated OG image would have been a
 * fabrication. Google wants a square image of at least 112 px on a crawlable
 * URL, which is why it is the 512 px icon and an absolute URL.
 */
import { describe, it, expect } from "vitest";
import { buildSiteJsonLd } from "../src/lib/seo/siteJsonLd";
import { CONTACT_EMAIL, FOUNDER_LINKEDIN_URL, GITHUB_REPO_URL, LINKEDIN_COMPANY_URL } from "../src/lib/brand";

const graph = buildSiteJsonLd();
const org = graph["@graph"].find((n) => n["@type"] === "Organization")!;
const site = graph["@graph"].find((n) => n["@type"] === "WebSite")!;

describe("buildSiteJsonLd", () => {
  it("is one graph with exactly an Organization and a WebSite", () => {
    expect(graph["@context"]).toBe("https://schema.org");
    expect(graph["@graph"].map((n) => n["@type"]).sort()).toEqual(["Organization", "WebSite"]);
  });

  it("names the brand, its canonical URL and its public contact", () => {
    expect(org.name).toBe("PYQ Vault");
    expect(org.url).toBe("https://www.pyqvault.com");
    expect(org.email).toBe(CONTACT_EMAIL);
    expect(org["@id"]).toBe("https://www.pyqvault.com/#organization");
  });

  it("links only genuine profiles in sameAs, and names the founder as a Person", () => {
    expect(org.sameAs).toEqual([LINKEDIN_COMPANY_URL, GITHUB_REPO_URL]);
    expect(org.founder).toEqual({
      "@type": "Person",
      name: "Vilas Shinde",
      sameAs: [FOUNDER_LINKEDIN_URL],
    });
  });

  it("points the logo at the real 512 px brand icon, by absolute URL", () => {
    expect(org.logo).toBe("https://www.pyqvault.com/icons/icon-512.png");
  });

  it("ties the WebSite to the Organization by id", () => {
    expect(site.name).toBe("PYQ Vault");
    expect(site.url).toBe("https://www.pyqvault.com");
    expect(site.publisher).toEqual({ "@id": "https://www.pyqvault.com/#organization" });
    expect(site.inLanguage).toBe("en-IN");
  });

  it("serialises without undefined values", () => {
    expect(JSON.stringify(graph)).not.toMatch(/undefined|null/);
  });
});
