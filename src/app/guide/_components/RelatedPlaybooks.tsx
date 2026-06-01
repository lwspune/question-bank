import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type RelatedItem = {
  /** Optional because some catalogs (maths TOP_11) carry slug-less long-tail
   *  entries; only slugged entries are ever rendered (see the filter below). */
  slug?: string;
  name: string;
  /** Playbooks carry a question count; principles don't. */
  qCount?: number;
  pctHard?: number | null;
};

type Props = {
  /** Guide path segment, e.g. "nda-biology". */
  guidePath: string;
  /** The full catalog the slugs index into (a guide's PLAYBOOKS or TOP_11). */
  items: ReadonlyArray<RelatedItem>;
  /** Which catalog entries to show (editorial pick — must exist in items). */
  slugs: string[];
  /** Path segment under the guide — "playbooks" (default) or "principles". */
  pathSegment?: string;
  /** Section heading. */
  heading?: string;
  /** Intro line under the heading. */
  intro?: string;
};

/** Pure href builder for a related guide item — kept exported for unit testing. */
export function relatedItemHref(
  guidePath: string,
  pathSegment: string,
  slug: string
): string {
  return `/guide/${guidePath}/${pathSegment}/${slug}`;
}

/**
 * Cross-link card row at the bottom of a /guide/<guide>/playbooks/[slug] (or
 * /principles/[slug]) detail page. Editorial pick — 2–3 related items.
 *
 * Generic over every guide: the call site passes its own catalog + guidePath.
 * Replaces the former eight per-guide copies (RelatedPlaybooks (english),
 * RelatedBiology/Chemistry/Physics/Geography/History/PolityPlaybooks, and
 * RelatedPrinciples (maths)) — they differed only by import path + href.
 */
export default function RelatedPlaybooks({
  guidePath,
  items,
  slugs,
  pathSegment = "playbooks",
  heading = "Related playbooks",
  intro = "Often paired with this one — drill these next if you found the worked examples above tractable.",
}: Props) {
  const picked = slugs
    .map((s) => items.find((p) => p.slug === s))
    .filter((p): p is RelatedItem & { slug: string } =>
      p !== undefined && p.slug !== undefined
    );

  if (picked.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {heading}
      </h2>
      <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
        {intro}
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {picked.map((p) => (
          <li key={p.slug}>
            <Link
              href={relatedItemHref(guidePath, pathSegment, p.slug)}
              className="group flex h-full flex-col rounded-md border bg-card p-3 transition-colors hover:border-primary/40 hover:bg-accent"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold tracking-tight">
                  {p.name}
                </h3>
                <ArrowRight
                  className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden
                />
              </div>
              {(p.qCount != null || p.pctHard != null) && (
                <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                  {p.qCount != null
                    ? `${p.qCount} q · ${p.pctHard}% hard`
                    : `${p.pctHard}% hard`}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
