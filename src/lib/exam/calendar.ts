/**
 * The exam calendar and the days-to-exam resolution — ENGAGEMENT_SPEC.md C3.
 *
 * DERIVE-WITH-OVERRIDE (the user's decision, 2026-09-24). A student's
 * countdown comes from the calendar via their primary target exam; a nullable
 * `exam_date` on the profile (migration 0116) wins when set and in the future.
 * The alternative, a student-entered date only, was rejected on the evidence
 * of the optional `goal` field, filled by 1%.
 *
 * THE CALENDAR IS A TABLE since 2026-11-22: public.exam_sittings (migration
 * 0281), so the /blog skill records a sitting's date the day its notice comes
 * out, without a push. Servers read it with lib/exam/calendarQuery
 * loadExamCalendar (cached a day) and pass it in; this file stays pure, so a
 * client component can import the sentence helpers without a database read.
 * `official` is true only once the conducting body has announced the date
 * (the table then requires the notice's link); otherwise the UI says
 * "expected". A guess labelled as one is honest; a guess stored as a fact is
 * not.
 *
 * THE ROT PROBE is tests/exam-calendar-live.test.ts (prod-contract, daily),
 * applying staleExams below: an exam whose latest sitting passed more than
 * CALENDAR_GRACE_DAYS ago fails it.
 *
 * No I/O. Spec: tests/exam-calendar.test.ts.
 */
import { EXAM_REGISTRY, type ExamSlug } from "./examContext";

export type SittingEntry = {
  exam: ExamSlug;
  /** "2027-I", "2027", "2027-Jan" — unique per exam. */
  sitting: string;
  /** What the student reads: "NDA 2027 (I)". */
  label: string;
  /** YYYY-MM-DD, an IST calendar day. */
  date: string;
  /** True only once the conducting body has announced the date. */
  official: boolean;
  /** Where the date came from — the announcement, or the pattern it follows. */
  source: string;
  /** The notice's https link; required when `official`. */
  sourceUrl: string | null;
};

/** Days an exam's latest sitting may lie in the past before the rot probe fails. */
export const CALENDAR_GRACE_DAYS = 14;

const DAY_MS = 86_400_000;
const IST_OFFSET_MS = 5.5 * 3_600_000;

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Calendar-day index of a YYYY-MM-DD, or null when it is not a real date. */
function dayIndexOf(dateIso: string): number | null {
  const m = DATE_RE.exec(dateIso);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const utc = Date.UTC(y, mo - 1, d);
  const back = new Date(utc);
  if (back.getUTCFullYear() !== y || back.getUTCMonth() !== mo - 1 || back.getUTCDate() !== d) return null;
  return Math.floor(utc / DAY_MS);
}

/** Whole IST calendar days from `now` to the date; negative once past. */
export function daysUntilIst(dateIso: string, now: Date): number {
  const target = dayIndexOf(dateIso);
  if (target === null) return Number.NaN;
  const today = Math.floor((now.getTime() + IST_OFFSET_MS) / DAY_MS);
  return target - today;
}

/** The first sitting of the exam on or after today (IST), or null. */
export function nextSitting(exam: ExamSlug, now: Date, calendar: readonly SittingEntry[]): SittingEntry | null {
  const upcoming = calendar.filter((e) => e.exam === exam && daysUntilIst(e.date, now) >= 0).sort(
    (a, b) => a.date.localeCompare(b.date)
  );
  return upcoming[0] ?? null;
}

export type ExamCountdown = {
  source: "override" | "calendar";
  exam: ExamSlug | null;
  label: string;
  date: string;
  official: boolean;
  daysLeft: number;
};

/**
 * The one countdown a student sees. A future override wins and is `official`
 * by definition (it is their own date); otherwise the first target exam with
 * a calendar entry supplies it. Null when neither applies (an empty
 * calendar, as a failed read gives, still honours the override).
 */
export function resolveExamDate(
  profile: { targetExams: readonly string[]; examDate: string | null },
  now: Date,
  calendar: readonly SittingEntry[]
): ExamCountdown | null {
  const targets = profile.targetExams.filter((s): s is ExamSlug =>
    EXAM_REGISTRY.some((e) => e.slug === s)
  );
  const primary = targets[0] ?? null;

  if (profile.examDate) {
    const left = daysUntilIst(profile.examDate, now);
    if (Number.isFinite(left) && left >= 0) {
      const name = primary ? EXAM_REGISTRY.find((e) => e.slug === primary)!.displayName : "Your exam";
      return { source: "override", exam: primary, label: name, date: profile.examDate, official: true, daysLeft: left };
    }
  }

  for (const slug of targets) {
    const s = nextSitting(slug, now, calendar);
    if (s) {
      return { source: "calendar", exam: slug, label: s.label, date: s.date, official: s.official, daysLeft: daysUntilIst(s.date, now) };
    }
  }
  return null;
}

/** "NDA 2027 (I) in 206 days (expected)" — short enough for a menu line. */
export function examCountdownSentence(c: ExamCountdown): string {
  const when = c.daysLeft === 0 ? "is today" : c.daysLeft === 1 ? "is tomorrow" : `in ${c.daysLeft} days`;
  return `${c.label} ${when}${c.official ? "" : " (expected)"}`;
}

/** YYYY-MM-DD that is a real date, else null. Accepts a `<input type=date>` value. */
export function sanitizeExamDate(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const v = raw.trim();
  return dayIndexOf(v) === null ? null : v;
}

/**
 * Exams whose LATEST sitting is more than CALENDAR_GRACE_DAYS in the past:
 * their countdown has vanished and nobody added the next sitting. A passed
 * sitting with a later one on the calendar is history, not rot.
 */
export function staleExams(calendar: readonly SittingEntry[], now: Date): { exam: ExamSlug; latest: SittingEntry }[] {
  const latest = new Map<ExamSlug, SittingEntry>();
  for (const e of calendar) {
    const cur = latest.get(e.exam);
    if (!cur || e.date > cur.date) latest.set(e.exam, e);
  }
  return [...latest.entries()]
    .filter(([, e]) => daysUntilIst(e.date, now) < -CALENDAR_GRACE_DAYS)
    .map(([exam, e]) => ({ exam, latest: e }))
    .sort((a, b) => a.exam.localeCompare(b.exam));
}
