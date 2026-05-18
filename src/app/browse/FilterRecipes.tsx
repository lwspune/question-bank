import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Filter,
  Flame,
  Target,
  type LucideIcon,
} from "lucide-react";
import { getFilterRecipes, type FilterRecipe } from "./recipes";

const ICON_MAP: Record<FilterRecipe["iconName"], LucideIcon> = {
  Target,
  Calendar,
  Flame,
};

type Props = {
  examId: string | null;
  pyqYears: number[];
};

/**
 * One-click filter recipes shown on /browse when no filters are active.
 * Renders nothing when the helper returns an empty list (e.g. fresh DB
 * with no PYQ years — the HARD-only recipe still ships in that case).
 *
 * Server component — chips are plain Links; no client state needed.
 */
export default function FilterRecipes({ examId, pyqYears }: Props) {
  const recipes = getFilterRecipes({ examId, pyqYears });
  if (recipes.length === 0) return null;

  return (
    <section
      aria-label="Quick filters"
      className="mb-6 rounded-lg border bg-card p-4 shadow-sm sm:p-5"
    >
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Filter className="h-3.5 w-3.5 text-primary" aria-hidden />
        <span>Quick filters</span>
      </div>
      <ul className="flex flex-wrap gap-2">
        {recipes.map((r) => {
          const Icon = ICON_MAP[r.iconName];
          return (
            <li key={r.id}>
              <Link
                href={r.href}
                title={r.description}
                className="group inline-flex items-center gap-1.5 rounded-full border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                <span>{r.label}</span>
                <ArrowRight
                  className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        Or open the filter panel to combine subject, chapter, year, and
        difficulty.
      </p>
    </section>
  );
}
