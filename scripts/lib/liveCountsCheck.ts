/**
 * Does a live page tell visitors the bank is empty?
 *
 * On 2026-10-08 one failed catalog load was cached as zeros, and for at least
 * nine hours the homepage read "0 past-year questions · 0 textbook and
 * practice" (every exam card "Coming soon") and /browse "0 public questions".
 * Every build and test passed throughout: those pages render per request, so
 * only the served page shows it. scripts/smoke/live-counts.ts fetches them
 * once a day (prod-contract.yml) and fails on anything this returns.
 *
 * Pure: takes the page HTML, returns each claim of zero it found.
 */
const ZERO_CLAIMS = ["past-year questions", "textbook and practice", "public questions"];

export function zeroCountClaims(html: string): string[] {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
  // A bare 0, not the last digit of 10 or 87,620.
  return ZERO_CLAIMS.filter((label) =>
    new RegExp(`(?<![\\d,])0 ${label}`).test(text)
  ).map((label) => `0 ${label}`);
}
