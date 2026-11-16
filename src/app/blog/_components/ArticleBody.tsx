/**
 * A database article's body (migration 0263), rendered on the server.
 *
 * Every block of lib/blog/articleBody.ts becomes a React element; there is no
 * raw HTML anywhere, so a body cannot put a script or a style on the page.
 * Maths is drawn on the server (StaticMath) with its MathML copy kept, so the
 * finished HTML is what a crawler, an AI search tool and a phone all read.
 *
 * Typography matches the code posts (src/app/blog/_posts/<slug>/content.tsx).
 */
import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";
import { StaticKatexRenderer } from "@/components/math/StaticMath";
import { parseArticleBody, type Inline } from "@/lib/blog/articleBody";
import type { ArticleSource } from "@/lib/blog/articleBody";
import { checkHref } from "@/lib/blog/articleBody";

const LINK_CLASS =
  "font-medium text-brand-accent underline underline-offset-2 hover:text-brand-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm";

function Text({ text }: { text: string }) {
  return <StaticKatexRenderer text={text} mathml />;
}

function ArticleLink({ href, external, official, children }: {
  href: string;
  external: boolean;
  official: boolean;
  children: React.ReactNode;
}) {
  if (!external) {
    return (
      <Link href={href} prefetch={false} className={LINK_CLASS}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel={official ? "noopener noreferrer" : "nofollow noopener noreferrer"}
      className={LINK_CLASS}
    >
      {children}
      <ExternalLink className="ml-0.5 inline h-3.5 w-3.5 align-[-2px]" aria-hidden />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Inlines({ runs }: { runs: Inline[] }) {
  return (
    <>
      {runs.map((r, i) =>
        r.kind === "text" ? (
          <Text key={i} text={r.text} />
        ) : (
          <ArticleLink key={i} href={r.href} external={r.external} official={r.official}>
            <Text text={r.text} />
          </ArticleLink>
        )
      )}
    </>
  );
}

const PROSE = "font-serif text-base leading-relaxed sm:text-lg";

export default function ArticleBody({ body }: { body: string }) {
  const blocks = parseArticleBody(body);
  return (
    <div>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "h2":
            return (
              <h2 key={i} id={b.id} className="mt-14 scroll-mt-24 text-2xl font-bold tracking-tight sm:text-3xl">
                <Text text={b.text} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={b.id} className="mt-8 scroll-mt-24 text-lg font-semibold tracking-tight">
                <Text text={b.text} />
              </h3>
            );
          case "p":
            return (
              <p key={i} className={`mt-4 ${PROSE}`}>
                <Inlines runs={b.inlines} />
              </p>
            );
          case "ul":
          case "ol": {
            const List = b.kind === "ul" ? "ul" : "ol";
            return (
              <List key={i} className={`mt-4 space-y-2 pl-6 ${b.kind === "ul" ? "list-disc" : "list-decimal"} ${PROSE}`}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Inlines runs={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "note":
            return (
              <div key={i} className="mt-6 flex gap-3 rounded-lg border bg-muted/40 p-4">
                <Info className="mt-1 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                <p className={PROSE}>
                  <Inlines runs={b.inlines} />
                </p>
              </div>
            );
          case "table":
            return (
              <div key={i} className="mt-6 overflow-x-auto rounded-lg border bg-card">
                <table className="w-full border-collapse text-sm sm:text-base">
                  <thead className="bg-muted/50">
                    <tr>
                      {b.headers.map((h, j) => (
                        <th key={j} scope="col" className={`px-3 py-2 text-left font-semibold ${j > 0 ? "border-l" : ""}`}>
                          <Inlines runs={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="border-t">
                        {row.map((cell, c) => (
                          <td key={c} className={`px-3 py-2 align-top ${c > 0 ? "border-l" : ""}`}>
                            <Inlines runs={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}

/** "Sources": the notices the article rests on. Only https links are shown. */
export function ArticleSources({ sources }: { sources: ArticleSource[] }) {
  const shown = sources
    .map((s) => ({ ...s, check: checkHref(s.url) }))
    .filter((s) => s.check.ok && s.check.external);
  if (shown.length === 0) return null;
  return (
    <section aria-labelledby="sources-heading" className="mt-14">
      <h2 id="sources-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
        Sources
      </h2>
      <ul className={`mt-4 list-disc space-y-2 pl-6 ${PROSE}`}>
        {shown.map((s) => (
          <li key={s.url}>
            <ArticleLink href={s.url} external official={s.check.ok && s.check.official}>
              {s.label}
            </ArticleLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
