/**
 * The ASCII URL-slug rule: lowercase, every run of other characters to one "-", ends trimmed.
 * "Pair of Straight Lines" -> "pair-of-straight-lines".
 *
 * One function for the eight modules that each wrote it (TECH_DEBT_SPEC.md 3.5); the four named
 * ones agreed on all 15,400 taxonomy names on 2026-11-05. NOT for /questions URLs: those use slugifyName
 * (lib/questions/slugs.ts), which also strips accents. Spec: tests/slug.test.ts.
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
