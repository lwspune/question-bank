/**
 * Pure core for the /dashboard/students engagement roster: filtering, sorting,
 * summary cards and CSV export. No I/O — unit-tested in tests/students-roster.test.ts.
 * `admin.ts` supplies the rows (from the get_student_roster RPC, migration 0098).
 *
 * Absence is modelled as null throughout, never as 0 or a zero date: "no graded
 * attempt yet" and "scored 0%" are different facts, and so are "never studied"
 * and "studied at the epoch".
 */

/** Sentinel for the exam filter's "no target exam recorded" bucket. Not an exam slug. */
export const EXAM_UNSPECIFIED = "__none__";

export type StudentRosterRow = {
  id: string;
  name: string;
  email: string;
  provider: string;
  /** ISO timestamp — account creation. Every account has one. */
  signedUp: string;
  lastSignIn: string | null;
  /** Canonical 91XXXXXXXXXX, or null when the student hasn't given one. */
  mobile: string | null;
  city: string | null;
  stage: string | null;
  targetExams: string[];
  whatsappOptIn: boolean;
  mocksSubmitted: number;
  mocksStarted: number;
  /** Mean % over GRADED submitted attempts; null when there are none. */
  avgPct: number | null;
  qsAnswered: number;
  notesSubtopics: number;
  notesSubjects: number;
  notesMastered: number;
  notesCheckpoints: number;
  bookmarks: number;
  /**
   * Newest LEARNING action (mock / notes / bookmark / activity event) — deliberately
   * not last sign-in, since opening the site without doing anything isn't engagement.
   * null = never active, which is a real state (the re-engagement list).
   */
  lastActive: string | null;
};

/**
 * Discriminated rather than a nullable day-count plus a boolean: the three cases are
 * genuinely different questions, and the typechecker then enumerates every consumer.
 */
export type TimeWindow =
  | { kind: "all" }
  | { kind: "days"; days: number }
  | { kind: "never" };

/** Which date the window applies to — "who's engaged lately" vs "who joined lately". */
export type DateField = "lastActive" | "signedUp";

export type RosterFilters = {
  /** Exam slugs, optionally including EXAM_UNSPECIFIED. Empty = no exam filter. */
  exams: readonly string[];
  window: TimeWindow;
  dateField: DateField;
  search: string;
};

function dateValue(r: StudentRosterRow, field: DateField): string | null {
  return field === "lastActive" ? r.lastActive : r.signedUp;
}

export function filterRoster(
  rows: readonly StudentRosterRow[],
  f: RosterFilters,
  now: Date
): StudentRosterRow[] {
  const needle = f.search.trim().toLowerCase();
  const wantUnspecified = f.exams.includes(EXAM_UNSPECIFIED);
  const wantExams = f.exams.filter((e) => e !== EXAM_UNSPECIFIED);
  // A days window is inclusive of its boundary instant.
  const cutoff =
    f.window.kind === "days" ? now.getTime() - f.window.days * 86_400_000 : null;

  return rows.filter((r) => {
    if (f.exams.length > 0) {
      const byExam = wantExams.some((e) => r.targetExams.includes(e));
      const byNone = wantUnspecified && r.targetExams.length === 0;
      if (!byExam && !byNone) return false;
    }

    const d = dateValue(r, f.dateField);
    if (f.window.kind === "never") {
      if (d !== null) return false;
    } else if (cutoff !== null) {
      // A null date is never "recent" — it is the absence of the event entirely.
      if (d === null || Date.parse(d) < cutoff) return false;
    }

    if (needle) {
      const hay = `${r.name}\n${r.email}\n${r.mobile ?? ""}`.toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  });
}

export type SortKey =
  | "name"
  | "mocksSubmitted"
  | "mocksStarted"
  | "avgPct"
  | "qsAnswered"
  | "notesSubtopics"
  | "notesMastered"
  | "bookmarks"
  | "lastActive"
  | "signedUp";

export type SortDir = "asc" | "desc";

/** Comparable scalar for a key, or null when the row has no value for it. */
function sortValue(r: StudentRosterRow, key: SortKey): string | number | null {
  switch (key) {
    case "name":
      return r.name.toLowerCase();
    case "avgPct":
      return r.avgPct;
    case "lastActive":
      return r.lastActive === null ? null : Date.parse(r.lastActive);
    case "signedUp":
      return Date.parse(r.signedUp);
    default:
      return r[key];
  }
}

/**
 * Sorts a COPY. Nulls sort last in BOTH directions — a student with no graded
 * attempt must not top a descending score sort, nor crowd out real data on an
 * ascending one. Ties keep their incoming order (Array.prototype.sort is stable
 * per ES2019), so a secondary sort can be layered by sorting twice.
 */
export function sortRoster(
  rows: readonly StudentRosterRow[],
  key: SortKey,
  dir: SortDir
): StudentRosterRow[] {
  return [...rows].sort((a, b) => {
    const av = sortValue(a, key);
    const bv = sortValue(b, key);
    if (av === null && bv === null) return 0;
    if (av === null) return 1;
    if (bv === null) return -1;
    const cmp = typeof av === "string" ? av.localeCompare(bv as string) : av - (bv as number);
    return dir === "asc" ? cmp : -cmp;
  });
}

export type RosterSummary = {
  students: number;
  withMobile: number;
  neverActive: number;
  activeLast7: number;
  totalMocksSubmitted: number;
  /** Mean of the students who HAVE a graded attempt; null when none do. */
  avgPct: number | null;
};

/** Summarises whatever rows it is given — pass the FILTERED rows so the cards follow the filters. */
export function summariseRoster(rows: readonly StudentRosterRow[], now: Date): RosterSummary {
  const weekAgo = now.getTime() - 7 * 86_400_000;
  const graded = rows.map((r) => r.avgPct).filter((p): p is number => p !== null);
  return {
    students: rows.length,
    withMobile: rows.filter((r) => r.mobile).length,
    neverActive: rows.filter((r) => r.lastActive === null).length,
    activeLast7: rows.filter((r) => r.lastActive !== null && Date.parse(r.lastActive) >= weekAgo).length,
    totalMocksSubmitted: rows.reduce((s, r) => s + r.mocksSubmitted, 0),
    avgPct: graded.length
      ? Math.round((graded.reduce((s, p) => s + p, 0) / graded.length) * 10) / 10
      : null,
  };
}

/** Canonical 91XXXXXXXXXX → "+91 XXXXXXXXXX" for display; other shapes pass through. */
export function formatMobile(mobile: string | null): string {
  if (!mobile) return "—";
  const m = /^91(\d{10})$/.exec(mobile);
  return m ? `+91 ${m[1]}` : mobile;
}

/**
 * Mobile as written to CSV: "91 XXXXXXXXXX".
 *
 * The space is load-bearing. A bare 12-digit number is read by Excel as a NUMBER
 * and rounded to 6 significant figures — that is exactly how the previous hand-made
 * export turned every number into "9.19521E+11" and collapsed six distinct students
 * onto one value. A cell containing a space cannot be a number, so the digits survive.
 * The leading "+" of the display format is dropped so the cell does not start with a
 * formula character and pick up the injection guard's apostrophe.
 */
function csvMobile(mobile: string | null): string {
  if (!mobile) return "";
  const m = /^91(\d{10})$/.exec(mobile);
  return m ? `91 ${m[1]}` : mobile;
}

/** ISO date (YYYY-MM-DD) — unambiguous across locales, unlike DD-MM-YYYY. */
function csvDate(iso: string | null): string {
  return iso ? iso.slice(0, 10) : "";
}

/**
 * Quotes a cell, doubling embedded quotes. A value opening with = + - @ is prefixed
 * with an apostrophe first: `name` and `city` are user-supplied (OAuth profile and
 * onboarding free text), so a crafted value must not execute as a formula when the
 * file is opened in Excel or Sheets.
 */
function cell(v: unknown): string {
  if (v === null || v === undefined) return '""';
  let s = String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

const CSV_HEADER = [
  "rank", "name", "mobile", "email", "avg_pct",
  "mocks_submitted", "mocks_started", "qs_answered",
  "notes_subtopics", "notes_subjects", "notes_mastered", "notes_checkpoints",
  "bookmarks", "last_active", "signed_up", "last_sign_in",
  "city", "target_exams", "stage", "whatsapp_opt_in", "sign_in_method",
] as const;

/**
 * Exports the rows AS GIVEN — pass the filtered+sorted rows, so the file matches
 * what is on screen. `rank` is the row's position in that order, not stored data.
 */
export function toRosterCsv(rows: readonly StudentRosterRow[]): string {
  const lines = rows.map((r, i) =>
    [
      i + 1,
      r.name,
      csvMobile(r.mobile),
      r.email,
      r.avgPct ?? "",
      r.mocksSubmitted,
      r.mocksStarted,
      r.qsAnswered,
      r.notesSubtopics,
      r.notesSubjects,
      r.notesMastered,
      r.notesCheckpoints,
      r.bookmarks,
      csvDate(r.lastActive),
      csvDate(r.signedUp),
      csvDate(r.lastSignIn),
      r.city ?? "",
      r.targetExams.join("|"),
      r.stage ?? "",
      r.whatsappOptIn ? "yes" : "no",
      r.provider,
    ]
      .map(cell)
      .join(",")
  );
  return [CSV_HEADER.join(","), ...lines].join("\n");
}
