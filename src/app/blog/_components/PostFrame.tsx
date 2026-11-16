/**
 * Everything around a post's body: the date line, the title and description,
 * the FAQ and the back link. Shared by /blog/<slug> (code and database posts)
 * and the owner's preview at /dashboard/blog/<slug>, so the preview is the
 * page a reader will get, not a look-alike.
 */
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog/posts";
import { formatPostDate } from "@/lib/blog/format";

export default function PostFrame({
  post,
  children,
  back = { href: "/blog", label: "All posts" },
}: {
  post: BlogPost;
  children: React.ReactNode;
  /** Where the link under the article goes: /blog, or the exam's page for a syllabus page. */
  back?: { href: string; label: string };
}) {
  return (
    <>
      <header className="mb-10 sm:mb-12">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {post.datePublished ? (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden />
              <time dateTime={post.datePublished}>{formatPostDate(post.datePublished)}</time>
            </span>
          ) : (
            <span>Not published yet</span>
          )}
          {post.dateModified && (
            <span>
              Updated <time dateTime={post.dateModified}>{formatPostDate(post.dateModified)}</time>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {post.readingMinutes} min read
          </span>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
        <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">
          {post.description}
        </p>
      </header>

      {children}

      {post.faq && post.faq.length > 0 && (
        <section aria-labelledby="faq-heading" className="mt-14">
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
            Questions people ask
          </h2>
          <dl className="mt-6 space-y-6">
            {post.faq.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold">{f.q}</dt>
                <dd className="mt-1.5 font-serif text-base leading-relaxed text-muted-foreground sm:text-lg">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="mt-16 border-t pt-6">
        <Link
          href={back.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent transition-colors hover:text-brand-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          {back.label}
        </Link>
      </div>
    </>
  );
}
