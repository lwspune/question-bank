import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideShell from "@/app/guide/_components/GuideShell";
import { BlogFaqJsonLd, BlogPostingJsonLd } from "../_components/BlogJsonLd";
import ArticleBody, { ArticleSources } from "../_components/ArticleBody";
import PostFrame from "../_components/PostFrame";
import { POST_CONTENTS } from "../_posts/contents";
import { BLOG_SLUGS, postBySlug } from "@/lib/blog/posts";
import { getBlogCatalog, getPublishedArticles } from "@/lib/blog/articles";
import type { CatalogPost } from "@/lib/blog/catalog";

export const revalidate = 86400;

/**
 * Prerender every post — this is what makes /blog/* static (●) rather than ƒ.
 *
 * Database posts (migration 0263) are included when the read works; when it
 * does not, the build still succeeds with the code posts, and a database post
 * renders on its first visit instead (dynamicParams is on), then stays cached.
 */
export async function generateStaticParams() {
  let dbSlugs: string[] = [];
  try {
    dbSlugs = (await getBlogCatalog()).filter((p) => p.source === "db").map((p) => p.slug);
  } catch (e) {
    console.error("blog generateStaticParams: articles read failed", e instanceof Error ? e.message : e);
  }
  return [...BLOG_SLUGS, ...dbSlugs].map((slug) => ({ slug }));
}

/** A code post, else a published database post (never an evergreen page: those live under /exams). */
async function findPost(slug: string): Promise<CatalogPost | null> {
  const code = postBySlug(slug);
  if (code) return { ...code, source: "code" };
  const db = (await getPublishedArticles()).find((a) => a.slug === slug && a.kind !== "evergreen");
  return db ?? null;
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await findPost(slug);
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

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = await findPost(slug);
  // A code post needs its body wired into POST_CONTENTS as well; without it the
  // page would throw, so it 404s instead.
  const Body = post?.source === "code" ? POST_CONTENTS[slug] : null;
  if (!post || (post.source === "code" && !Body)) notFound();

  const catalog = await getBlogCatalog();

  return (
    <GuideShell
      guideTitle="Blog"
      sideNav={[
        { href: "/blog", label: "All posts" },
        ...catalog.map((p) => ({ href: `/blog/${p.slug}`, label: p.title })),
      ]}
      landingHref="/blog"
      breadcrumbs={[{ href: "/blog", label: "Blog" }, { label: post.title }]}
    >
      <BlogPostingJsonLd post={post} />
      <BlogFaqJsonLd post={post} />
      <PostFrame post={post}>
        {post.source === "code" && Body ? (
          <Body />
        ) : post.source === "db" ? (
          <>
            <ArticleBody body={post.body} />
            <ArticleSources sources={post.sources} />
          </>
        ) : null}
      </PostFrame>
    </GuideShell>
  );
}
