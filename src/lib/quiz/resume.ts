/**
 * Carrying a half-finished quiz across a sign-in round-trip. Pure; unit-tested
 * in tests/quiz-resume.test.ts.
 *
 * WHY: the reveal gate now offers "Already have an account? Sign in", because
 * 5 of the 13 mobiles in quiz_leads already belong to an account — those people
 * re-typed a number we hold and were filed as anonymous sales leads. But quiz
 * answers live in React state ONLY (`qb:lead:v1` stores the visitor's identity,
 * not the attempt), so navigating to /login would destroy the quiz they had just
 * finished. This is what survives the trip.
 *
 * sessionStorage, not localStorage: the payload is meaningful for exactly one
 * round-trip and should not outlive the tab. And it is read back as UNTRUSTED
 * input — the user can edit it — so parseResume validates rather than casts.
 */

const LETTERS = ["A", "B", "C", "D"] as const;
export type ResumeLetter = (typeof LETTERS)[number];
const LETTER_SET: ReadonlySet<string> = new Set(LETTERS);

/** Bound on restored entries. The longest quiz assembled here is a few dozen
 *  questions; the cap exists so a hand-crafted blob cannot balloon the page. */
export const MAX_RESUME_ANSWERS = 100;

/**
 * The sessionStorage key for one quiz's in-flight answers.
 *
 * The slug is percent-encoded: it is a DB value, not a constant, and one
 * containing ':' would otherwise be able to address another quiz's key.
 */
export function quizResumeKey(slug: string): string {
  return `qb:quiz:${encodeURIComponent(slug)}:v1`;
}

export function serialiseResume(answers: Record<string, string>): string {
  return JSON.stringify(answers);
}

/**
 * Parse a stored blob back into an answer map, dropping anything that is not a
 * question position mapped to an option letter.
 *
 * Returns null when there is nothing worth restoring — including an empty result
 * after filtering, because bouncing a student to the review screen with a blank
 * answer sheet is worse than letting them start over.
 */
export function parseResume(raw: string | null): Record<string, ResumeLetter> | null {
  if (!raw) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return null;

  const out: Record<string, ResumeLetter> = {};
  let n = 0;
  // Object.entries, not for..in: own enumerable properties only, so a
  // "__proto__" key in the JSON is an ordinary entry to be filtered, never a
  // prototype write.
  for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
    if (n >= MAX_RESUME_ANSWERS) break;
    if (!/^\d+$/.test(k)) continue; // question positions only
    if (typeof v !== "string" || !LETTER_SET.has(v)) continue;
    out[k] = v as ResumeLetter;
    n++;
  }

  return n > 0 ? out : null;
}
