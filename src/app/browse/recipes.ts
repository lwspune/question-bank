/**
 * Empty-state filter recipes shown on /browse when no filters are active.
 * Each recipe is a one-click `/browse?...` deep-link into a useful slice
 * of the bank, scoped to the active exam from the cookie context.
 *
 * Pure helper — no DB calls. Recipes are derived from the active examId
 * and the per-exam `pyqYears` list that /browse already fetches via the
 * `get_pyq_years` RPC.
 */

export type RecipeId = "hard-only" | "recent-years" | "hard-latest";

export type FilterRecipe = {
  id: RecipeId;
  /** Display label rendered on the chip. */
  label: string;
  /** Short tooltip / accessible description. */
  description: string;
  /** Lucide icon name (rendered by the consumer). */
  iconName: "Target" | "Calendar" | "Flame";
  /** Pre-composed `/browse?...` URL. */
  href: string;
};

export type RecipeInput = {
  /** Active exam UUID from the cookie context, or null when no exam picked. */
  examId: string | null;
  /** All PYQ years present in the bank — descending after this helper sorts them. */
  pyqYears: number[];
};

/**
 * Returns the recipes that have meaningful targets given the current bank
 * state. Year-dependent recipes are omitted when the necessary years
 * aren't available, so the chip row never points at an empty result page.
 *
 * Recipe ordering is stable: HARD-only first (always shown), then year-
 * based recipes from broadest to narrowest.
 */
export function getFilterRecipes(input: RecipeInput): FilterRecipe[] {
  const years = [...input.pyqYears].sort((a, b) => b - a);
  const recipes: FilterRecipe[] = [];

  // 1. HARD only — universal, doesn't depend on the year list.
  recipes.push({
    id: "hard-only",
    label: "HARD questions only",
    description: "Drill the toughest slice of the bank.",
    iconName: "Target",
    href: buildHref(input.examId, { difficulty: ["HARD"] }),
  });

  // 2. Recent 2 PYQ years — broad recency view. Needs ≥2 years.
  if (years.length >= 2) {
    const top2 = years.slice(0, 2);
    recipes.push({
      id: "recent-years",
      label: `Last 2 PYQ years (${top2[0]}–${top2[1]})`,
      description:
        "Every question from the most recent two past-year papers.",
      iconName: "Calendar",
      href: buildHref(input.examId, { pyqYears: top2 }),
    });
  }

  // 3. HARD from the latest year — narrowest, most relevant for revision.
  if (years.length >= 1) {
    const latest = years[0];
    recipes.push({
      id: "hard-latest",
      label: `HARD from ${latest}`,
      description: "Only HARD questions from the latest paper.",
      iconName: "Flame",
      href: buildHref(input.examId, {
        difficulty: ["HARD"],
        pyqYears: [latest],
      }),
    });
  }

  return recipes;
}

function buildHref(
  examId: string | null,
  filters: { difficulty?: string[]; pyqYears?: number[] }
): string {
  const sp = new URLSearchParams();
  if (examId) sp.set("examId", examId);
  if (filters.difficulty && filters.difficulty.length > 0) {
    sp.set("difficulty", filters.difficulty.join(","));
  }
  if (filters.pyqYears && filters.pyqYears.length > 0) {
    sp.set("pyqYears", filters.pyqYears.join(","));
  }
  return `/browse?${sp.toString()}`;
}
