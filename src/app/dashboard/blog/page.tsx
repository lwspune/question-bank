import Link from "next/link";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import BackToDashboard from "@/app/dashboard/BackToDashboard";
import { getSessionSuperadmin } from "@/lib/auth";
import { listArticlesForAdmin, type AdminArticle } from "@/lib/blog/articles";
import { articlePath } from "@/lib/blog/paths";
import { formatPostDate } from "@/lib/blog/format";
import ArticleActions from "./ArticleActions";

export const dynamic = "force-dynamic";

/**
 * /dashboard/blog: every database article (migration 0263), drafts first by
 * last change. Superadmin only: drafts and waiting edits are read through the
 * service role. The /blog skill writes drafts by script (`npm run blog:draft`);
 * nothing here writes text, only the Publish buttons.
 */
export default async function BlogAdminPage() {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  let articles: AdminArticle[] = [];
  let loadError: string | null = null;
  try {
    articles = await listArticlesForAdmin();
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Could not load articles.";
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6">
        <BackToDashboard />
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Blog and syllabus pages</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Articles the /blog skill wrote. Open one to read it as readers will see it, then publish. Edits to a
            live article wait here until you apply them.
          </p>
        </header>

        {loadError ? (
          <p className="rounded-xl border border-destructive/40 bg-card p-4 text-sm text-destructive">{loadError}</p>
        ) : articles.length === 0 ? (
          <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No articles yet. Run /blog to write one.
          </p>
        ) : (
          <ul className="space-y-3">
            {articles.map((a) => (
              <li key={a.id} className="rounded-lg border bg-card p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className={
                      a.status === "published"
                        ? "rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100"
                        : "rounded-full bg-muted px-2 py-0.5 font-medium"
                    }
                  >
                    {a.status === "published" ? "Live" : "Draft"}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5">{a.kind}</span>
                  {a.pending && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
                      Changes waiting
                    </span>
                  )}
                  {a.datePublished && <span className="text-muted-foreground">Published {formatPostDate(a.datePublished)}</span>}
                </div>
                <Link
                  href={`/dashboard/blog/${a.slug}`}
                  className="mt-2 block rounded-sm font-semibold hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {a.title}
                </Link>
                <p className="mt-1 break-all text-xs text-muted-foreground">{articlePath(a)}</p>
                {a.watch && <p className="mt-1 text-xs text-muted-foreground">Watching for: {a.watch}</p>}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Link
                    href={`/dashboard/blog/${a.slug}`}
                    className="inline-flex h-9 items-center rounded-md border px-3 text-sm font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Preview
                  </Link>
                  <ArticleActions id={a.id} status={a.status} hasPending={!!a.pending} livePath={articlePath(a)} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
