/**
 * The welcome email — pure core. STUDENT_EDUCATION_SPEC.md §4 item 6.
 *
 * WHAT IT IS. The three-step loop (lib/education/howItWorks.ts), by email,
 * once per account EVER. It is the one channel that reaches a student who
 * closed the tab, and until it existed no email had ever described a feature
 * (38 sends in total, all about mocks).
 *
 * THE BACKLOG IS INCLUDED ON PURPOSE. The students who did not know the
 * features existed are EXISTING accounts; a July signup who sat one mock has
 * the same gap as a new one. Newest accounts are picked first so a new
 * student never waits behind the backlog when the runner is capped.
 *
 * THE RULES, in the order they are checked:
 *   no-email / opted-out
 *   already-welcomed  — the dedupe key carries NO day, so the UNIQUE index on
 *                       email_sends makes a second welcome impossible even if
 *                       this module is wrong
 *   mailed-today      — any other kind in the last 24 h (the evening mock
 *                       report and this should not land on the same day)
 *
 * Content-led, never absence-led: the template says what exists and where to
 * tap, never what the student has not done.
 *
 * No I/O. Spec: tests/email-welcome.test.ts.
 */
import type { ExamSlug } from "@/lib/exam/examContext";
import type { PriorSend, StudentLite } from "./recommend";

export const WELCOME_KIND = "welcome" as const;

/** No other email on the same calendar day as the welcome. */
export const WELCOME_QUIET_HOURS = 24;

const HOUR_MS = 3_600_000;

export function welcomeDedupeKey(userId: string): string {
  return `${WELCOME_KIND}:${userId}`;
}

export type WelcomePick = {
  userId: string;
  email: string;
  name: string;
  dedupeKey: string;
  /** The student's primary target exam, or null (no profile / skipped). */
  exam: ExamSlug | null;
};

export type WelcomeSkipReason = "no-email" | "opted-out" | "already-welcomed" | "mailed-today";

export type WelcomeSkip = { userId: string; reason: WelcomeSkipReason };

export type SelectWelcomesInput = {
  /** The mailable roster (readStudents already excludes staff). */
  students: readonly StudentLite[];
  /** userId → primary target exam. Absence = no profile row. */
  primaryExams: ReadonlyMap<string, ExamSlug | null>;
  /** Every prior send of every kind. */
  priorSends: readonly PriorSend[];
  now: Date;
};

export function selectWelcomes(input: SelectWelcomesInput): {
  picks: WelcomePick[];
  skipped: WelcomeSkip[];
} {
  const { students, primaryExams, priorSends, now } = input;
  const welcomed = new Set<string>();
  const lastSendByUser = new Map<string, number>();
  for (const s of priorSends) {
    if (s.dedupeKey === welcomeDedupeKey(s.userId)) welcomed.add(s.userId);
    const t = Date.parse(s.createdAt);
    const prev = lastSendByUser.get(s.userId);
    if (prev === undefined || t > prev) lastSendByUser.set(s.userId, t);
  }

  const picks: WelcomePick[] = [];
  const skipped: WelcomeSkip[] = [];
  const quietSince = now.getTime() - WELCOME_QUIET_HOURS * HOUR_MS;

  for (const s of students) {
    if (!s.email) {
      skipped.push({ userId: s.userId, reason: "no-email" });
      continue;
    }
    if (s.emailOptOut) {
      skipped.push({ userId: s.userId, reason: "opted-out" });
      continue;
    }
    if (welcomed.has(s.userId)) {
      skipped.push({ userId: s.userId, reason: "already-welcomed" });
      continue;
    }
    const last = lastSendByUser.get(s.userId);
    if (last !== undefined && last >= quietSince) {
      skipped.push({ userId: s.userId, reason: "mailed-today" });
      continue;
    }
    picks.push({
      userId: s.userId,
      email: s.email,
      name: s.name,
      dedupeKey: welcomeDedupeKey(s.userId),
      exam: primaryExams.get(s.userId) ?? null,
    });
  }

  // Newest first: under --limit the backlog drains behind today's signups.
  const createdAt = new Map(students.map((s) => [s.userId, Date.parse(s.createdAt)]));
  picks.sort((a, b) => (createdAt.get(b.userId) ?? 0) - (createdAt.get(a.userId) ?? 0));

  return { picks, skipped };
}
