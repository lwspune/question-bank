/**
 * Schema.org JSON-LD for /blog.
 *
 * Separate from GuideJsonLd rather than a reuse of it: that component hardcodes
 * a single site-wide `datePublished` of 2026-05-13, which is correct for the
 * evergreen guide pages and would be a lie on a dated post. A BlogPosting whose
 * dates are wrong is worse than one with no dates at all, so the post's real
 * dates are required arguments here.
 */
import { SITE_URL } from "@/lib/brand";
import type { BlogPost } from "@/lib/blog/posts";
import { faqPageJsonLd } from "@/lib/blog/faq";

const PUBLISHER_NAME = "PYQ Vault";

const publisher = {
  "@type": "Organization",
  name: PUBLISHER_NAME,
  url: SITE_URL,
} as const;

function render(payload: unknown) {
  return (
    <script
      type="application/ld+json"
      // Server-rendered from editorial constants and owner-approved articles
      // (0263); JSON.stringify output inside a script tag, with "<" escaped below.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, "\\u003c") }}
    />
  );
}

/** One post. */
export function BlogPostingJsonLd({ post }: { post: BlogPost }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return render({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    name: post.title,
    description: post.description,
    url,
    inLanguage: "en-IN",
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    keywords: post.tags.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: publisher,
    publisher,
    isPartOf: { "@type": "Blog", name: `${PUBLISHER_NAME} Blog`, url: `${SITE_URL}/blog` },
  });
}

/** A post's FAQ as FAQPage markup; nothing when the post has none. */
export function BlogFaqJsonLd({ post }: { post: BlogPost }) {
  const payload = faqPageJsonLd(post.faq, `${SITE_URL}/blog/${post.slug}`);
  return payload ? render(payload) : null;
}

/** The index, as a Blog carrying its posts in order. */
export function BlogIndexJsonLd({ description, posts }: { description: string; posts: readonly BlogPost[] }) {
  return render({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${PUBLISHER_NAME} Blog`,
    description,
    url: `${SITE_URL}/blog`,
    inLanguage: "en-IN",
    publisher,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.datePublished,
      dateModified: p.dateModified ?? p.datePublished,
    })),
  });
}

/** An exam's evergreen syllabus page (0263): an Article at its own URL, not part of the blog. */
export function EvergreenArticleJsonLd({ post, path }: { post: BlogPost; path: string }) {
  const url = `${SITE_URL}${path}`;
  return render({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    name: post.title,
    description: post.description,
    url,
    inLanguage: "en-IN",
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    keywords: post.tags.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: publisher,
    publisher,
  });
}

/** A FAQ at any path (the syllabus page's), as FAQPage markup. */
export function FaqJsonLdAt({ post, path }: { post: BlogPost; path: string }) {
  const payload = faqPageJsonLd(post.faq, `${SITE_URL}${path}`);
  return payload ? render(payload) : null;
}
