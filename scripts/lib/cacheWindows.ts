/**
 * The cache windows (seconds) a source file sets on SHARED caches: every
 * `{ revalidate: N }` options object, which is how this repo writes both
 * `unstable_cache(fn, keys, { revalidate })` and `fetch(url, { next: { revalidate } })`.
 *
 * Exists for tests/page-cache-window.test.ts: Next.js refreshes a cached page
 * as often as the shortest of these anywhere it renders, so a one-hour cache
 * in a shared helper quietly makes every daily page hourly (2026-07-29 to
 * 2026-10-06).
 *
 * The page-level `export const revalidate = N` is NOT returned (it is an `=`,
 * not a property). A window this cannot read comes back as NaN, never
 * skipped, so the guard fails loudly instead of passing blind. `false`
 * (cache until invalidated) is Infinity. Pure, regex-based, like importGraph.
 */

/** Drop block comments and `//` comments, but not the `//` in a URL. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'])\/\/.*$/gm, "$1");
}

/** A literal like `86_400`, `60 * 60 * 24` or `false`; null when it is anything else. */
function literal(expr: string): number | null {
  const e = expr.trim();
  if (e === "false") return Infinity;
  if (!/^[\d_]+(\s*\*\s*[\d_]+)*$/.test(e)) return null;
  return e.split("*").reduce((acc, part) => acc * Number(part.replace(/_/g, "").trim()), 1);
}

const TYPE_WORDS = /^(number|boolean|false\s*\|\s*number|number\s*\|\s*false)$/;

export function cacheWindows(src: string): number[] {
  const code = stripComments(src);
  const constants = new Map<string, string>();
  for (const m of code.matchAll(/\bconst\s+([A-Za-z_$][\w$]*)\s*(?::\s*number\s*)?=\s*([^;\n]+)/g)) {
    constants.set(m[1], m[2]);
  }
  const out: number[] = [];
  for (const m of code.matchAll(/\brevalidate\s*:\s*([^,}\n]+)/g)) {
    const raw = m[1].trim();
    if (TYPE_WORDS.test(raw)) continue;
    const direct = literal(raw);
    if (direct !== null) {
      out.push(direct);
      continue;
    }
    const viaConst = constants.has(raw) ? literal(constants.get(raw)!) : null;
    out.push(viaConst ?? NaN);
  }
  return out;
}
