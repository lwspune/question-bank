import type { WatchItem } from "@/lib/competitors/model";
import { linkClass } from "./AudienceView";

/** Products outside our audiences, with what we could borrow. Rendered under every audience. */
export default function WatchListView({ items }: { items: WatchItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-sm font-semibold">Worth learning from (outside our audiences)</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Not in the table above: they serve other exams, so a column of &quot;no&quot; would say nothing. Each one
          lists what we could borrow.
        </p>
      </div>
      <div className="grid gap-4">
        {items.map((w) => (
          <div key={w.id} className="rounded-lg border bg-card p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <a
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium ${linkClass}`}
                aria-label={`${w.name}, opens in a new tab`}
              >
                {w.name}
              </a>
              <span className="text-xs text-muted-foreground">{w.covers}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{w.whyNotCompared}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {w.lessons.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
