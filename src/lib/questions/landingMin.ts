/**
 * A chapter needs at least this many PUBLIC questions to earn a landing page.
 * Thin pages dilute a site's standing with search engines, and a 3-question page
 * is a poor landing experience anyway: those chapters stay reachable through
 * /browse and through their subject's landing index (and, since 2026-11-24, V's
 * chapter search: lib/questions/shortChapters.ts).
 */
export const MIN_QUESTIONS_FOR_LANDING = 15;
