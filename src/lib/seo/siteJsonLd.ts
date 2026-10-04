/**
 * Site-wide structured data: who PYQ Vault is, once, in the root layout.
 *
 * Until 2026-09-29 the only JSON-LD on the site was per-page (blog Article,
 * guide CollectionPage), each naming "PYQ Vault" as publisher without any
 * node saying what that publisher IS. This is that node, plus the WebSite
 * that points at it — the shape Google's and Bing's entity understanding
 * reads. Not a ranking signal for ChatGPT search; it removes ambiguity about
 * the brand for everything else.
 *
 * Only genuine profiles in `sameAs`. `logo` is the real 512 px brand icon
 * (the V mark, built by scripts/brand/build_icons.py); Google wants a square
 * image of at least 112 px on a crawlable URL.
 * Pure — spec in tests/site-jsonld.test.ts.
 */
import {
  CONTACT_EMAIL,
  FOUNDER_LINKEDIN_URL,
  FOUNDER_NAME,
  GITHUB_REPO_URL,
  LINKEDIN_COMPANY_URL,
} from "@/lib/brand";

const SITE_URL = "https://www.pyqvault.com";
const SITE_NAME = "PYQ Vault";
const ORG_ID = `${SITE_URL}/#organization`;

export type SiteJsonLdNode = Record<string, unknown> & { "@type": string };

export type SiteJsonLd = {
  "@context": "https://schema.org";
  "@graph": SiteJsonLdNode[];
};

export function buildSiteJsonLd(): SiteJsonLd {
  const organization: SiteJsonLdNode = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description:
      "A free, public bank of past-year questions for Indian entrance and board exams, filed by exam, subject, chapter, subtopic, difficulty and year, with timed mocks, chapter notes and strategy guides.",
    founder: {
      "@type": "Person",
      name: FOUNDER_NAME,
      sameAs: [FOUNDER_LINKEDIN_URL],
    },
    logo: `${SITE_URL}/icons/icon-512.png`,
    sameAs: [LINKEDIN_COMPANY_URL, GITHUB_REPO_URL],
    areaServed: "IN",
  };

  const website: SiteJsonLdNode = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };

  return { "@context": "https://schema.org", "@graph": [organization, website] };
}
