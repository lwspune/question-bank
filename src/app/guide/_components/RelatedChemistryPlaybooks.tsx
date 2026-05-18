import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLAYBOOKS } from "@/app/guide/nda-chemistry/_data/playbooks";

type Props = {
  /** Slugs (must exist in PLAYBOOKS). */
  slugs: string[];
};

/**
 * Cross-link card row at the bottom of a /guide/nda-chemistry/playbooks/[slug]
 * page. Editorial pick — 2–3 related playbooks per detail page. Parallel to
 * RelatedPhysicsPlaybooks, RelatedPlaybooks (english) and RelatedPrinciples
 * (maths) — kept as its own component because the link path is hard-coded
 * per guide.
 */
export default function RelatedChemistryPlaybooks({ slugs }: Props) {
  const items = slugs
    .map((s) => PLAYBOOKS.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        Related playbooks
      </h2>
      <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
        Often paired with this one — drill these next if you found the worked
        examples above tractable.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/guide/nda-chemistry/playbooks/${p.slug}`}
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
              <p className="mt-1 text-xs tabular-nums text-muted-foreground">
                {p.qCount} q · {p.pctHard}% hard
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
