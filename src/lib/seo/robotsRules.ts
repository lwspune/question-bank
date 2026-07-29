/**
 * A small robots.txt matcher, used to TEST what `app/robots.ts` actually permits.
 *
 * Not used at runtime — search engines do their own matching. It exists so the
 * rules can be asserted by BEHAVIOUR ("is /browse still crawlable?") instead of
 * by checking that an array contains a string, which would only restate the
 * implementation and would not catch the failure that matters: `Allow: /`
 * matches every URL on the site, so every Disallow works only because it is
 * longer. Adding a narrow Disallow beside a broad Allow is exactly the shape
 * that could silently de-index the busiest page.
 *
 * Implements the documented subset: `*` wildcards, the `$` end-anchor, and
 * longest-match-wins with Allow breaking ties.
 */

export type RobotsRuleSet = {
  allow: readonly string[];
  disallow: readonly string[];
};

/** Longest pattern that matches, or 0 if none. Length is measured on the pattern. */
function bestMatchLength(patterns: readonly string[], path: string): number {
  let best = 0;
  for (const pattern of patterns) {
    if (!pattern) continue;
    if (matches(pattern, path) && pattern.length > best) best = pattern.length;
  }
  return best;
}

function matches(pattern: string, path: string): boolean {
  const anchored = pattern.endsWith("$");
  const body = anchored ? pattern.slice(0, -1) : pattern;
  // Escape every regex metacharacter EXCEPT `*`, which is the one wildcard
  // robots.txt defines. Note `?` is a literal here — that is what makes
  // `/browse?*` match only the query-string variants.
  const source = body
    .split("*")
    .map((chunk) => chunk.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");
  return new RegExp(`^${source}${anchored ? "$" : ""}`).test(path);
}

/** True when a crawler may fetch `path` under these rules. */
export function robotsAllows(rules: RobotsRuleSet, path: string): boolean {
  const allowLen = bestMatchLength(rules.allow, path);
  const disallowLen = bestMatchLength(rules.disallow, path);
  if (disallowLen === 0) return true;
  // Ties go to Allow, per the documented behaviour.
  return allowLen >= disallowLen;
}
