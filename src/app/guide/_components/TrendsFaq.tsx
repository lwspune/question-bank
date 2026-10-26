/**
 * A trends report's FAQ: the visible questions section and its FAQPage
 * JSON-LD, rendered from ONE list so the markup can never say something the
 * page does not (the blog's rule, and the blog's `faqPageJsonLd`). Entries come
 * from `trendsFaq` (src/lib/guide/trendsInsights.ts), computed from the page's
 * own matrix.
 */
import { faqPageJsonLd, type FaqEntry } from "@/lib/blog/faq";

const SITE_URL = "https://www.pyqvault.com";

export default function TrendsFaq({ faq, path }: { faq: FaqEntry[]; path: string }) {
  const payload = faqPageJsonLd(faq, `${SITE_URL}${path}`);
  if (!payload) return null;
  return (
    <section aria-labelledby="trends-faq" className="mt-14">
      <script
        type="application/ld+json"
        // Server-rendered from numbers computed at build, no user input → safe.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
      />
      <h2 id="trends-faq" className="scroll-mt-24 text-xl font-semibold tracking-tight sm:text-2xl">
        Questions students ask
      </h2>
      <dl className="mt-6 space-y-6">
        {faq.map((f) => (
          <div key={f.q}>
            <dt className="font-semibold">{f.q}</dt>
            <dd className="mt-1.5 font-serif leading-relaxed text-muted-foreground">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
