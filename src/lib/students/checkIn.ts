/**
 * The owner's personal WhatsApp check-in, opened from /dashboard/students'
 * Message button. Pure: the roster supplies the name, the exams and the
 * per-exam mock counts. Unit-tested in tests/students-checkin.test.ts.
 *
 * Nothing is sent from here. The link opens WhatsApp with the text typed, and
 * the owner reads it and presses send, one student at a time.
 */
import { getExamBySlug } from "@/lib/exam/examContext";

/** Finished mocks per student, per exam slug. */
export type MockExamCounts = Map<string, Map<string, number>>;

export function countMockExams(rows: readonly { userId: string; examSlug: string }[]): MockExamCounts {
  const out: MockExamCounts = new Map();
  for (const { userId, examSlug } of rows) {
    const perExam = out.get(userId) ?? new Map<string, number>();
    perExam.set(examSlug, (perExam.get(examSlug) ?? 0) + 1);
    out.set(userId, perExam);
  }
  return out;
}

/**
 * The exam to name: the one the student sat most mocks in, because that is what
 * the roster's Avg % measures. A tie goes to an exam they chose. With no mocks,
 * the first chosen exam still in the registry; null when there is nothing.
 */
export function checkInExamSlug(
  mocks: ReadonlyMap<string, number> | undefined,
  targetExams: readonly string[]
): string | null {
  let best: string | null = null;
  let bestCount = 0;
  for (const [slug, n] of mocks ?? []) {
    if (!getExamBySlug(slug)) continue;
    const beats = n > bestCount || (n === bestCount && targetExams.includes(slug) && !targetExams.includes(best ?? ""));
    if (beats) {
      best = slug;
      bestCount = n;
    }
  }
  if (best) return best;
  return targetExams.find((slug) => getExamBySlug(slug)) ?? null;
}

/**
 * First name to greet by, or null. The roster's name falls back to the email,
 * and "Hi aarav.s@gmail.com" reads like a mail merge, so that gives null.
 */
export function checkInFirstName(name: string): string | null {
  const first = name.trim().split(/\s+/)[0] ?? "";
  if (!first || first.includes("@") || !/^\p{L}/u.test(first)) return null;
  // Google often carries "AARAV SHARMA" or "aarav sharma"; a mixed-case name
  // ("McKenzie") is the student's own spelling and stays as written.
  const oneCase = first === first.toUpperCase() || first === first.toLowerCase();
  return oneCase ? first.charAt(0).toUpperCase() + first.slice(1).toLowerCase() : first;
}

export function checkInMessage(name: string, examSlug: string | null): string {
  const first = checkInFirstName(name);
  const exam = examSlug ? getExamBySlug(examSlug)?.displayName : undefined;
  const greeting = first ? `Hi ${first},` : "Hi,";
  const doingWell = exam ? `in ${exam}` : "with your preparation";
  return `${greeting} this is Vilas. I built PYQ Vault. You seem to be doing well ${doingWell}. Just checking in: how is your study going?`;
}
