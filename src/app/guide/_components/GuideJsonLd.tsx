/**
 * Schema.org JSON-LD for guide pages. Article for sub-section + detail
 * pages, CollectionPage for the landing + principles index.
 *
 * Rendered as an inline <script type="application/ld+json"> tag — Google's
 * Rich Results test reads this without executing JS.
 */

const SITE_URL = "https://www.pyqvault.com";
const PUBLISHER_NAME = "LWS Pune — Question Bank";
const DATE_PUBLISHED = "2026-05-13";

type Props = {
  /** "Article" for narrative pages, "CollectionPage" for index pages. */
  type: "Article" | "CollectionPage";
  /** Path under the site root, e.g. "/guide/nda-maths/strategy". */
  path: string;
  /** Page headline / name. */
  headline: string;
  /** Meta description equivalent. */
  description: string;
  /** Optional ISO date if the page was meaningfully updated after PUBLISHED. */
  dateModified?: string;
};

export default function GuideJsonLd({
  type,
  path,
  headline,
  description,
  dateModified,
}: Props) {
  const url = `${SITE_URL}${path}`;
  const base = {
    "@context": "https://schema.org",
    "@type": type,
    headline,
    name: headline,
    description,
    url,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: PUBLISHER_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: PUBLISHER_NAME,
      url: SITE_URL,
    },
  };

  const articleExtras =
    type === "Article"
      ? {
          datePublished: DATE_PUBLISHED,
          dateModified: dateModified ?? DATE_PUBLISHED,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
        }
      : {};

  const payload = { ...base, ...articleExtras };

  return (
    <script
      type="application/ld+json"
      // Static, server-rendered, no user input → safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
