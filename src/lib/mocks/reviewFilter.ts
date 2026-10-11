/**
 * The result page's review filter (2026-10-11): All, Wrong, Left, Right.
 * Pure; reads the verdict the grader already stamped on each review item
 * (1 right, which includes grace; -1 wrong; 0 left), so the filter can never
 * disagree with the score. Spec: tests/attempt-history.test.ts.
 */
export const REVIEW_FILTERS = ["all", "wrong", "left", "right"] as const;
export type ReviewFilter = (typeof REVIEW_FILTERS)[number];

type Verdicted = { verdict: 1 | -1 | 0 };

export function matchesReviewFilter(item: Verdicted, filter: ReviewFilter): boolean {
  switch (filter) {
    case "all":
      return true;
    case "wrong":
      return item.verdict === -1;
    case "left":
      return item.verdict === 0;
    case "right":
      return item.verdict === 1;
  }
}

export function reviewFilterCounts(items: readonly Verdicted[]): Record<ReviewFilter, number> {
  const counts: Record<ReviewFilter, number> = { all: items.length, wrong: 0, left: 0, right: 0 };
  for (const i of items) {
    if (i.verdict === -1) counts.wrong += 1;
    else if (i.verdict === 0) counts.left += 1;
    else counts.right += 1;
  }
  return counts;
}
