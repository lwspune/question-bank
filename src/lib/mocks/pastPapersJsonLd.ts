/**
 * Schema.org JSON-LD for an exam's past-papers page (/mock/exam/<exam>/download):
 * the list of papers (CollectionPage + ItemList), the breadcrumb trail and the
 * FAQ. Search engines read it; nothing on screen changes (2026-11-17, after
 * ChatGPT named a CLAT site carrying all three and not us).
 *
 * Every field comes from what the page already renders (the paper list, the
 * visible breadcrumb, pastPapersFaq), so the markup can never say something
 * the page does not. Pure; spec tests/past-papers-jsonld.test.ts.
 */
import { SITE_URL } from "@/lib/brand";
import { INTL_ORIGIN, intlExamOfPath } from "@/lib/sites/intl";
import { faqPageJsonLd } from "@/lib/blog/faq";
import type { Crumb } from "@/components/nav/Breadcrumbs";
import type { FaqItem } from "@/lib/mocks/pastPapersPage";

const CONTEXT = "https://schema.org";

export type PastPapersJsonLdInput = {
  /** The page's own path, e.g. /mock/exam/clat/download. */
  path: string;
  /** The page's heading. */
  name: string;
  description: string;
  /** In the order the page lists them. */
  papers: readonly { title: string; href: string }[];
  /** The visible trail, without Home (Breadcrumbs adds Home itself). */
  breadcrumbs: readonly Crumb[];
  faq: readonly FaqItem[];
};

export function pastPapersJsonLd(input: PastPapersJsonLdInput): Record<string, unknown>[] {
  // An intl exam's page lives on intl.pyqvault.com, and so does every link on it.
  const origin = intlExamOfPath(input.path) ? INTL_ORIGIN : SITE_URL;
  const abs = (path: string) => `${origin}${path}`;
  const url = abs(input.path);

  const trail = [{ label: "Home", href: "/" }, ...input.breadcrumbs];
  const nodes: Record<string, unknown>[] = [
    {
      "@context": CONTEXT,
      "@type": "BreadcrumbList",
      itemListElement: trail.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        // The last crumb has no href: it is this page.
        item: c.href ? abs(c.href) : url,
      })),
    },
  ];

  // The page shows neither the list nor the FAQ until the exam has a paper.
  if (input.papers.length === 0) return nodes;

  nodes.unshift({
    "@context": CONTEXT,
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url,
    inLanguage: "en-IN",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: input.papers.length,
      itemListElement: input.papers.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        url: abs(p.href),
      })),
    },
  });

  const faq = faqPageJsonLd(input.faq, url);
  if (faq) nodes.push(faq);
  return nodes;
}

/**
 * JSON for an inline <script type="application/ld+json">. Paper titles are
 * data, so `<` is escaped: a "</script>" in one could otherwise end the tag.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
