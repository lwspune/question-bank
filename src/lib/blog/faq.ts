/**
 * A blog post's FAQ as schema.org FAQPage JSON-LD.
 *
 * The entries live on the post (src/lib/blog/posts.ts) and the same list
 * renders as the visible questions section, so the markup can never say
 * something the page does not. Pure; spec tests/blog-faq.test.ts.
 */

export type FaqEntry = { q: string; a: string };

export function faqPageJsonLd(faq: readonly FaqEntry[] | undefined, url: string) {
  if (!faq || faq.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url,
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
