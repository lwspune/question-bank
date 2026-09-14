/**
 * Schema.org JSON-LD for /blog.
 *
 * Separate from GuideJsonLd rather than a reuse of it: that component hardcodes
 * a single site-wide `datePublished` of 2026-05-13, which is correct for the
 * evergreen guide pages and would be a lie on a dated post. A BlogPosting whose
 * dates are wrong is worse than one with no dates at all, so the post's real
 * dates are required arguments here.
 */
import { listPosts, type BlogPost } from "@/lib/blog/posts";

const SITE_URL = "https://www.pyqvault.com";
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
      // Server-rendered from editorial constants, no user input → safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
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

/** The index, as a Blog carrying its posts in order. */
export function BlogIndexJsonLd({ description }: { description: string }) {
  return render({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${PUBLISHER_NAME} Blog`,
    description,
    url: `${SITE_URL}/blog`,
    inLanguage: "en-IN",
    publisher,
    blogPost: listPosts().map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.datePublished,
      dateModified: p.dateModified ?? p.datePublished,
    })),
  });
}
