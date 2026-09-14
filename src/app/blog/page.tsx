import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import GuideHero from "@/app/guide/_components/GuideHero";
import { BlogIndexJsonLd } from "./_components/BlogJsonLd";
import { listPosts } from "@/lib/blog/posts";
import { formatPostDate } from "@/lib/blog/format";

// Static, revalidated daily — same profile as /notes and /guide. Nothing in
// this tree reads cookies() or useSearchParams(), which is what keeps it
// genuinely prerendered rather than merely labelled as such.
export const revalidate = 86400;

const PAGE_TITLE = "Blog";
const PAGE_INTRO =
  "Paper analysis and exam trends, measured against the PYQ Vault bank rather than " +
  "asserted from memory. Every number in a post is re-derived from the live question " +
  "bank by an automated check, so it cannot quietly go stale.";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} — Paper analysis from the PYQ Vault bank`,
  description: PAGE_INTRO,
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = listPosts();

  return (
    <GuideShell
      guideTitle="Blog"
      sideNav={[{ href: "/blog", label: "All posts" }]}
      breadcrumbs={[{ label: "Blog" }]}
    >
      <BlogIndexJsonLd description={PAGE_INTRO} />
      <GuideHero eyebrow="Blog" title={PAGE_TITLE} subtitle={PAGE_INTRO} />

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-lg border bg-card p-6 transition-colors hover:border-brand-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                  <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {post.readingMinutes} min read
                </span>
              </div>
              <h2 className="mt-2 text-xl font-semibold tracking-tight group-hover:text-brand-accent">
                {post.title}
              </h2>
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                {post.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent">
                Read the analysis
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </GuideShell>
  );
}
