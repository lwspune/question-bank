/**
 * Pure detector for "this math zone uses a DERIVATIVE" — the one technique
 * signal `notes:coverage` carries, extracted here so it can be tested.
 *
 * Why it needed fixing (2026-09-14): the original lived inline in
 * scripts/notes-coverage.ts and required a prime to be followed by an OPEN
 * PAREN (`f'(`). That guard exists so matrix transpose `A'` (= Aᵀ) is not read
 * as a derivative, and it is worth keeping — but it also made the canonical
 * L'Hopital form invisible, because L'Hopital is written `\dfrac{f'}{g'}`,
 * where the prime is followed by `}`. Consequence: the NDA Maths
 * limits-continuity chapter reported 17 questions as "uses a derivative the
 * notes never teach" while its notes carry a dedicated L'Hopital concept with
 * a worked example, a practice set and two traps. 131 notes math zones, zero
 * matches.
 *
 * The fix adds the RATIO OF TWO PRIMED SYMBOLS — `\dfrac{f'}{g'}` or `f'/g'`
 * — and nothing looser.
 *
 * TWO looser rules were tried first and each was MEASURED to be worse:
 *
 *  1. Any prime on a lowercase symbol (`[a-z]'`) resolved the 17-question false
 *     positive but created twelve new ones across nine chapters — in this
 *     corpus a prime on a lowercase letter means "modified value" as often as
 *     "derivative": `g' = g/2` for gravity on another planet (Simple
 *     Pendulum), `1+a'` for a set complement (Probability via Counting).
 *  2. Any quotient of two primed symbols still fired on 3D Geometry's
 *     symmetric form `\frac{y - \alpha'}{m'}` — the second line's direction
 *     ratios l', m', n'. The substring `a'}{m'` (the `a` being the tail of
 *     `\alpha`) is shape-identical to `f'}{g'`.
 *
 * Hence the numerator brace must hold ONLY the primed symbol, which is what
 * separates L'Hopital from a primed quantity appearing inside an expression.
 *
 * Prose apostrophes ("Cramer's", "don't") cannot reach here — the caller only
 * ever passes the inside of a `\(...\)` / `\[...\]` zone.
 */

/**
 * Leibniz `\frac{d..}{d..}`, `d/dx`, partials, primed functions applied to an
 * argument, and the L'Hopital quotient `{f'}{g'}` / `f'/g'`.
 */
export const DERIV_RE =
  /frac\s*\{\s*d[^{}]*\}\s*\{\s*d|\bd\/dx|\\partial|[a-zA-Z]'+\(|\{\s*[a-z]'+\s*\}\s*\{\s*[a-z]'+\s*\}|(?:^|[^a-zA-Z\\])[a-z]'+\/[a-z]'+(?![a-zA-Z])/;

/** True when the zone uses a derivative operator in any of its written forms. */
export function usesDerivative(zone: string): boolean {
  return DERIV_RE.test(zone);
}
