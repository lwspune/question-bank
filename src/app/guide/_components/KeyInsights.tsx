/**
 * The "Key numbers" box under a trends report's hero: the four or five facts a
 * student wants first, and the ones another site or an AI answer quotes.
 * Sentences come from `keyInsights` (src/lib/guide/trendsInsights.ts), computed
 * from the page's own matrix, so the box can never disagree with the grid.
 */
import { ListChecks } from "lucide-react";

export default function KeyInsights({ lines }: { lines: string[] }) {
  if (lines.length === 0) return null;
  return (
    <section aria-labelledby="key-numbers" className="mt-10 rounded-lg border bg-card p-6">
      <h2 id="key-numbers" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
        <ListChecks className="h-5 w-5 text-brand-accent" aria-hidden />
        Key numbers
      </h2>
      <ul className="mt-4 space-y-3">
        {lines.map((line) => (
          <li key={line} className="flex gap-3 font-serif leading-relaxed text-foreground/90">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
