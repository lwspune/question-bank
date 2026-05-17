import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOP_11 } from "../nda-maths/_data/principles";

type Props = {
  /** Slugs (must exist in TOP_11). */
  slugs: string[];
};

export default function RelatedPrinciples({ slugs }: Props) {
  const principles = slugs
    .map((s) => TOP_11.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  if (principles.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        Related principles
      </h2>
      <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
        Often combined with this one — drill these next if you found the
        examples above tractable.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/guide/nda-maths/principles/${p.slug}`}
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
              {p.pctHard != null && (
                <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                  {p.pctHard}% hard
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
