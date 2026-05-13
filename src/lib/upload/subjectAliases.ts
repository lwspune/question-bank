/**
 * Subject-name normalization + alias resolution for upload validation.
 *
 * Real-world Excels mix "Maths", "Mathematics", "MATHS", " Maths ",
 * "Phy" / "Physics" etc. Seeded subjects are exam-scoped: MHT-CET stores
 * "Maths" while NDA stores "Mathematics" — strict matching would reject
 * every NDA row that says "Maths" or every MHT-CET row that says
 * "Mathematics".
 *
 * Pipeline:
 *   1. `normalizeSubjectName` — lowercase + trim + collapse whitespace.
 *   2. `subjectMatchKeys` — return all aliases to try, canonical-first.
 *      Resolver walks the list against the prefetched per-exam map and
 *      returns the first hit.
 *
 * Keep aliases minimal and English-centric. Add new families only if a
 * real upload fails — don't speculate.
 */

const ALIAS_FAMILIES: ReadonlyArray<ReadonlyArray<string>> = [
  ["maths", "mathematics", "math"],
  ["physics", "phy"],
  ["chemistry", "chem"],
  ["biology", "bio"],
];

export function normalizeSubjectName(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Given a free-text subject cell from an Excel row, return the ordered
 * list of normalized keys the resolver should try. The input's own
 * normalized form is always first (best-effort prefer an exact match
 * over an alias-mapped one); the rest of its family follows.
 *
 * For inputs that aren't in any family, returns a single-element array.
 * Whitespace-only inputs return an empty array.
 */
export function subjectMatchKeys(input: string): string[] {
  const norm = normalizeSubjectName(input);
  if (norm === "") return [];

  for (const family of ALIAS_FAMILIES) {
    if (family.includes(norm)) {
      // Put the input's own normalized form first, then the rest of the
      // family in its declared order. Order matters: the resolver returns
      // on first map hit, so a row that says "Maths" against an exam that
      // has both "Maths" and "Mathematics" (hypothetical — none today)
      // would bind to "Maths" rather than "Mathematics".
      const rest = family.filter((k) => k !== norm);
      return [norm, ...rest];
    }
  }
  return [norm];
}
