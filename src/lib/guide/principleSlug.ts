/**
 * Convert a principle/subtopic display name into a URL-safe slug used for
 * /guide/nda-maths/principles/{slug} routes.
 *
 * Rules (in order):
 *   1. Lowercase.
 *   2. Common Greek letters (π, ω, θ, ...) are transliterated to their
 *      Latin names so identifiers like "A+B+C=π" survive as "abcpi".
 *   3. `&` → "and".
 *   4. Apostrophes are stripped (Cramer's → cramers, not cramer-s).
 *   5. Any non-Latin-alphanumeric run is collapsed into a single hyphen.
 *   6. Leading and trailing hyphens are trimmed.
 *
 * Designed to be stable: a small punctuation tweak in the subtopic name
 * shouldn't change the slug.
 */

const GREEK_TO_LATIN: Record<string, string> = {
  α: "alpha",
  β: "beta",
  γ: "gamma",
  δ: "delta",
  ε: "epsilon",
  ζ: "zeta",
  η: "eta",
  θ: "theta",
  λ: "lambda",
  μ: "mu",
  ν: "nu",
  ξ: "xi",
  π: "pi",
  ρ: "rho",
  σ: "sigma",
  τ: "tau",
  φ: "phi",
  χ: "chi",
  ψ: "psi",
  ω: "omega",
};

export function principleSlug(name: string): string {
  let s = name.toLowerCase();
  for (const [g, latin] of Object.entries(GREEK_TO_LATIN)) {
    s = s.split(g).join(latin);
  }
  return s
    .replace(/&/g, " and ")
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
