import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import GuideShell from "@/app/guide/_components/GuideShell";
import ArticleBody, { ArticleSources } from "@/app/blog/_components/ArticleBody";
import PostFrame from "@/app/blog/_components/PostFrame";
import SyllabusView from "@/app/exams/_components/SyllabusView";
import { getSessionSuperadmin } from "@/lib/auth";
import { getArticleForAdmin, withPending } from "@/lib/blog/articles";
import { articlePath } from "@/lib/blog/paths";
import { getExamBySlug } from "@/lib/exam/examContext";
import ArticleActions from "../ArticleActions";

export const dynamic = "force-dynamic";

// A preview is never a page for search engines, whatever robots.txt says.
export const metadata: Metadata = { title: "Article preview", robots: { index: false, follow: false } };

/**
 * /dashboard/blog/<slug>: an article exactly as readers will get it, drafts and
 * waiting edits included (the edit is laid over the live text, so this is the
 * page AFTER "Apply changes"). Superadmin only; service-role read. The buttons
 * on top are the only way it goes live.
 */
export default async function BlogPreviewPage(props: { params: Promise<{ slug: string }> }) {
  if (!(await getSessionSuperadmin())) redirect("/browse");
  const { slug } = await props.params;
  const stored = await getArticleForAdmin(slug);
  if (!stored) notFound();
  const article = withPending(stored);
  const exam = article.kind === "evergreen" ? getExamBySlug(article.examSlug) : null;
  const livePath = articlePath(article);

  return (
    <GuideShell
      guideTitle="Preview"
      sideNav={[{ href: "/dashboard/blog", label: "All articles" }]}
      breadcrumbs={[{ href: "/dashboard/blog", label: "Blog admin" }, { label: "Preview" }]}
    >
      <div className="mb-10 rounded-lg border-2 border-dashed border-brand-accent/50 bg-card p-4 text-sm">
        <Link
          href="/dashboard/blog"
          className="inline-flex items-center gap-1.5 rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          All articles
        </Link>
        <p className="mt-2 font-semibold">
          {stored.status === "published"
            ? stored.pending
              ? "Live, with changes waiting. You are reading the page as it will be after Apply changes."
              : "Live. This is the page readers see."
            : "Draft. Only you can see this page."}
        </p>
        <p className="mt-1 text-muted-foreground">
          {article.kind} · goes live at <span className="break-all">{livePath}</span>
        </p>
        {stored.watch && <p className="mt-1 text-muted-foreground">Watching for: {stored.watch}</p>}
        <div className="mt-3">
          <ArticleActions id={stored.id} status={stored.status} hasPending={!!stored.pending} livePath={livePath} />
        </div>
      </div>

      {article.kind === "evergreen" ? (
        exam ? (
          <SyllabusView exam={exam} article={article} />
        ) : (
          <p className="text-destructive">Unknown exam &quot;{article.examSlug}&quot;: this page cannot go live.</p>
        )
      ) : (
        <PostFrame post={article}>
          <ArticleBody body={article.body} />
          <ArticleSources sources={article.sources} />
        </PostFrame>
      )}
    </GuideShell>
  );
}
