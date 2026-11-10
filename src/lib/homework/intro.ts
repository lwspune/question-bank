/**
 * The line under a homework plan's heading (2026-11-10, owner): the stored
 * summary's first sentence ("CBSE Class 12 Mathematics board questions, 2022
 * to 2026, five a day") plus "most asked first". The rest of the summary
 * explained the ranking, which the "Asked most often" section below explains
 * again, and ran six or seven lines on a phone.
 *
 * Shortened here, at render, not in homework_plans.summary: the stored text
 * stays whole, so no row is rewritten. A summary of one sentence is shown as
 * it is. Spec: tests/short-intros.test.ts.
 */
export function planIntro(summary: string): string {
  const cut = summary.indexOf(". ");
  if (cut < 0) return summary;
  return `${summary.slice(0, cut)}, most asked first.`;
}
