/**
 * A blog post's FAQ is DATA on the post (src/lib/blog/posts.ts). The same
 * entries render as the visible "Questions people ask" section AND as
 * schema.org FAQPage JSON-LD, so the markup can never say something the page
 * does not. Google shows FAQ rich results only for a few site types now, but
 * the markup still hands answer engines the Q&A in a form they parse.
 */
import { describe, it, expect } from "vitest";
import { faqPageJsonLd } from "@/lib/blog/faq";
import { BLOG_POSTS } from "@/lib/blog/posts";

describe("faqPageJsonLd", () => {
  it("builds a FAQPage with one Question per entry, in order", () => {
    const ld = faqPageJsonLd(
      [
        { q: "Is the December attempt cancelled?", a: "Yes, as reported on 9 October 2026." },
        { q: "Do both attempts count?", a: "The better score counts." },
      ],
      "https://www.pyqvault.com/blog/x"
    );
    expect(ld).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url: "https://www.pyqvault.com/blog/x",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the December attempt cancelled?",
          acceptedAnswer: { "@type": "Answer", text: "Yes, as reported on 9 October 2026." },
        },
        {
          "@type": "Question",
          name: "Do both attempts count?",
          acceptedAnswer: { "@type": "Answer", text: "The better score counts." },
        },
      ],
    });
  });

  // An empty FAQPage is invalid markup; the post simply has none.
  it("returns null when there are no questions", () => {
    expect(faqPageJsonLd([], "https://www.pyqvault.com/blog/x")).toBeNull();
    expect(faqPageJsonLd(undefined, "https://www.pyqvault.com/blog/x")).toBeNull();
  });
});

describe("blog registry: FAQ entries", () => {
  const withFaq = BLOG_POSTS.filter((p) => p.faq && p.faq.length > 0);

  it("has non-empty questions ending in a question mark, and non-empty answers", () => {
    for (const p of withFaq) {
      for (const f of p.faq!) {
        expect(f.q.trim().endsWith("?"), `${p.slug}: ${f.q}`).toBe(true);
        expect(f.a.trim().length, `${p.slug}: ${f.q}`).toBeGreaterThan(0);
      }
    }
  });

  // The text goes into JSON-LD verbatim, where markdown would show as
  // asterisks, and into the page, where the site's rule is no em dashes.
  it("keeps answers plain text: no markdown, no em dashes", () => {
    for (const p of withFaq) {
      for (const f of p.faq!) {
        for (const s of [f.q, f.a]) {
          expect(s, `${p.slug}: ${s}`).not.toMatch(/\*\*|—| – | -- /);
        }
      }
    }
  });

  it("has no duplicate questions within a post", () => {
    for (const p of withFaq) {
      const qs = p.faq!.map((f) => f.q);
      expect(new Set(qs).size, p.slug).toBe(qs.length);
    }
  });
});
