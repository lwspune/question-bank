/** Display helpers for /blog. Pure — see tests/blog-registry.test.ts. */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * "2026-09-14" → "14 September 2026".
 *
 * Formatted from the STRING PARTS, not via `new Date(...).toLocaleDateString`:
 * a bare `new Date("2026-09-14")` is parsed as UTC midnight and then rendered
 * in the server's zone, which prints the previous day anywhere west of UTC.
 * The date shown must match the `dateTime` attribute beside it exactly.
 */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const month = MONTHS[Number(m) - 1];
  if (!month || !y || !d) return iso;
  return `${Number(d)} ${month} ${y}`;
}
