import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import { BlogPostingJsonLd } from "../_components/BlogJsonLd";
import { POST_CONTENTS } from "../_posts/contents";
import { BLOG_SLUGS, listPosts, postBySlug } from "@/lib/blog/posts";
import { formatPostDate } from "@/lib/blog/format";

export const revalidate = 86400;

/** Prerender every post — this is what makes /blog/* static (●) rather than ƒ. */
export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = postBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = postBySlug(params.slug);
  const Body = POST_CONTENTS[params.slug];
  // Both guards matter: an unregistered slug, and a registered one whose body
  // was never wired into POST_CONTENTS. The second would otherwise throw.
  if (!post || !Body) notFound();

  return (
    <GuideShell
      guideTitle="Blog"
      sideNav={[
        { href: "/blog", label: "All posts" },
        ...listPosts().map((p) => ({ href: `/blog/${p.slug}`, label: p.title })),
      ]}
      landingHref="/blog"
      breadcrumbs={[{ href: "/blog", label: "Blog" }, { label: post.title }]}
    >
      <BlogPostingJsonLd post={post} />

      <header className="mb-10 sm:mb-12">
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
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
          {post.description}
        </p>
      </header>

      <Body />

      <div className="mt-16 border-t pt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent transition-colors hover:text-brand-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          All posts
        </Link>
      </div>
    </GuideShell>
  );
}
