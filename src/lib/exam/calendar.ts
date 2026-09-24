/**
 * The exam calendar and the days-to-exam resolution — ENGAGEMENT_SPEC.md C3.
 *
 * DERIVE-WITH-OVERRIDE (the user's decision, 2026-09-24). A student's
 * countdown comes from this committed calendar via their primary target exam,
 * so 280 of 342 profiles get one on day one; a nullable `exam_date` on the
 * profile (migration 0116) wins when set and in the future. The alternative
 * — a student-entered date only — was rejected on the evidence of the optional
 * `goal` field, filled by 1%.
 *
 * `official` WAS FALSE ON EVERY ENTRY AS FIRST WRITTEN (NDA 2027-I flipped
 * the same day: 11 April 2027, UPSC). On 2026-09-24 no other upcoming
 * sitting had an announced date (UPSC publishes its calendar around November,
 * NTA and the boards later still), so each row is the usual pattern — NDA-I on
 * the third Sunday of April, boards from mid-February — and the UI says
 * "expected" until the flag is flipped by hand with the notice in `source`.
 * A guess labelled as one is honest; a guess stored as a fact is not.
 *
 * THE ROT PROBE is tests/exam-calendar.test.ts: a sitting more than
 * CALENDAR_GRACE_DAYS in the past fails the gate. That is the roadmap's
 * stated preference over a DB table nothing checks — an empty or stale
 * calendar must not look like a working one.
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
};

/** Days a passed sitting may linger before the rot probe fails the gate. */
export const CALENDAR_GRACE_DAYS = 14;

const PATTERN = "expected from the usual pattern; not yet announced";

export const EXAM_CALENDAR: readonly SittingEntry[] = [
  { exam: "jee-mains", sitting: "2027-Jan", label: "JEE Main 2027 (January)", date: "2027-01-24", official: false, source: PATTERN },
  { exam: "mh-hsc-12", sitting: "2027", label: "HSC boards 2027", date: "2027-02-11", official: false, source: PATTERN },
  { exam: "cbse-10", sitting: "2027", label: "CBSE Class 10 boards 2027", date: "2027-02-15", official: false, source: PATTERN },
  { exam: "cbse-12", sitting: "2027", label: "CBSE Class 12 boards 2027", date: "2027-02-15", official: false, source: PATTERN },
  { exam: "mh-ssc-10", sitting: "2027", label: "SSC boards 2027", date: "2027-03-01", official: false, source: PATTERN },
  { exam: "jee-mains", sitting: "2027-Apr", label: "JEE Main 2027 (April)", date: "2027-04-04", official: false, source: PATTERN },
  { exam: "nda", sitting: "2027-I", label: "NDA 2027 (I)", date: "2027-04-11", official: true, source: "UPSC, confirmed by the user 2026-09-24" },
  { exam: "cds", sitting: "2027-I", label: "CDS 2027 (I)", date: "2027-04-11", official: false, source: "expected alongside NDA 2027 (I), which UPSC set for 11 April 2027; CDS itself not confirmed" },
  { exam: "mht-cet", sitting: "2027", label: "MHT-CET 2027", date: "2027-04-20", official: false, source: PATTERN },
  { exam: "neet", sitting: "2027", label: "NEET 2027", date: "2027-05-02", official: false, source: PATTERN },
  { exam: "ipmat-indore", sitting: "2027", label: "IPMAT Indore 2027", date: "2027-05-09", official: false, source: PATTERN },
  { exam: "ipmat-rohtak", sitting: "2027", label: "IPMAT Rohtak 2027", date: "2027-05-09", official: false, source: PATTERN },
  { exam: "jipmat", sitting: "2027", label: "JIPMAT 2027", date: "2027-05-09", official: false, source: PATTERN },
  { exam: "nda", sitting: "2027-II", label: "NDA 2027 (II)", date: "2027-09-05", official: false, source: PATTERN },
  { exam: "cds", sitting: "2027-II", label: "CDS 2027 (II)", date: "2027-09-05", official: false, source: PATTERN },
];

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
export function nextSitting(exam: ExamSlug, now: Date): SittingEntry | null {
  const upcoming = EXAM_CALENDAR.filter((e) => e.exam === exam && daysUntilIst(e.date, now) >= 0).sort(
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
 * a calendar entry supplies it. Null when neither applies.
 */
export function resolveExamDate(
  profile: { targetExams: readonly string[]; examDate: string | null },
  now: Date
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
    const s = nextSitting(slug, now);
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
