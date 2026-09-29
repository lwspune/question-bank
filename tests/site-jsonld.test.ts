/**
 * The site-wide Organization + WebSite structured data in the root layout
 * (2026-09-29). Until now the only JSON-LD on the site was per-page (blog
 * Article, guide CollectionPage), so nothing told a search engine who
 * "PYQ Vault" is or how its pages relate to the publisher.
 *
 * Only genuine profiles go in `sameAs`. There is no logo property on purpose:
 * the repo has no logo file, and pointing it at a generated OG image would
 * be a fabrication.
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

  it("carries no logo — there is no logo file to point at", () => {
    expect("logo" in org).toBe(false);
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
