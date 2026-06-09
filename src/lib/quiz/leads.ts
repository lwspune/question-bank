/**
 * Pure helpers for the public-quiz LEAD funnel — mobile normalisation/validation
 * and the by-mobile rollup the /dashboard/leads view renders. No I/O; unit-tested
 * in tests/quiz-leads.test.ts.
 *
 * Identity in this funnel is the MOBILE (PYQ Vault accounts are email-keyed and
 * store no phone — see [[org-scoping-global-content]]/the paywall axis), so the
 * sales dashboard groups by mobile to turn "same person took N quizzes" into a
 * single hot lead instead of N scattered rows.
 */

/**
 * Normalise an Indian mobile to canonical `91XXXXXXXXXX` (12 digits), or null if
 * it isn't a plausible Indian mobile. Accepts spaces/dashes, a `+91`/`91`/`0`
 * prefix, and requires the 10-digit subscriber number to start 6-9.
 */
export function normalizeMobile(raw: string | null | undefined): string | null {
  const digits = String(raw ?? "").replace(/\D/g, "");
  let ten: string | null = null;
  if (digits.length === 10) ten = digits;
  else if (digits.length === 11 && digits.startsWith("0")) ten = digits.slice(1);
  else if (digits.length === 12 && digits.startsWith("91")) ten = digits.slice(2);
  if (!ten || !/^[6-9]\d{9}$/.test(ten)) return null;
  return `91${ten}`;
}

export function isValidIndianMobile(raw: string | null | undefined): boolean {
  return normalizeMobile(raw) !== null;
}

/** One lead row as stored (snake_case, straight from the DB query). */
export type LeadRow = {
  quiz_id: string | null;
  name: string;
  mobile: string;
  best_score: number;
  attempts: number;
  last_attempt_at: string;
  first_seen_at: string;
};

/** One person, rolled up across every quiz they've taken. */
export type LeadGroup = {
  mobile: string;
  name: string;
  quizzes: number;
  totalAttempts: number;
  bestScore: number;
  lastSeen: string;
  firstSeen: string;
  leads: LeadRow[];
};

/**
 * Collapse per-(quiz, mobile) lead rows into one entry per person (mobile),
 * sorted most-recently-seen first. Name + lastSeen come from the person's latest
 * touch; bestScore is the max across their quizzes; quizzes = distinct quiz count.
 */
export function rollupLeadsByMobile(rows: LeadRow[]): LeadGroup[] {
  const byMobile = new Map<string, LeadRow[]>();
  for (const row of rows ?? []) {
    const g = byMobile.get(row.mobile);
    if (g) g.push(row);
    else byMobile.set(row.mobile, [row]);
  }

  const groups: LeadGroup[] = [];
  for (const [mobile, leads] of byMobile) {
    const sorted = [...leads].sort((a, b) => b.last_attempt_at.localeCompare(a.last_attempt_at));
    const latest = sorted[0];
    const quizzes = new Set(leads.map((l) => l.quiz_id)).size;
    groups.push({
      mobile,
      name: latest.name,
      quizzes,
      totalAttempts: leads.reduce((s, l) => s + l.attempts, 0),
      bestScore: Math.max(...leads.map((l) => l.best_score)),
      lastSeen: latest.last_attempt_at,
      firstSeen: leads.reduce((min, l) => (l.first_seen_at < min ? l.first_seen_at : min), latest.first_seen_at),
      leads: sorted,
    });
  }

  return groups.sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));
}
