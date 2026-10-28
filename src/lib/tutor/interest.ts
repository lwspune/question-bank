/**
 * The /tutor interest check (owner, 2026-10-27; migration 0190): three
 * one-tap answers that measure demand for 1:1 tutoring before any of it is
 * built. Pure: the route and the page both lean on this one validator, and the
 * growth readout on the one summary.
 *
 * The rules mirror the table's CHECKs, so a bad answer is refused here with a
 * clear message rather than by the database with a constraint code.
 *
 * Spec: tests/tutor-interest.test.ts.
 */

export const TUTOR_ROLES = ["student", "teacher"] as const;
export const TUTOR_MODES = ["online", "offline", "either"] as const;

export type TutorRole = (typeof TUTOR_ROLES)[number];
export type TutorMode = (typeof TUTOR_MODES)[number];

export type TutorInterestAnswer = { role: TutorRole; wants: boolean; mode: TutorMode | null };

export type TutorInterestValidation = { ok: true; value: TutorInterestAnswer } | { ok: false; error: string };

const isRole = (v: unknown): v is TutorRole => (TUTOR_ROLES as readonly unknown[]).includes(v);
const isMode = (v: unknown): v is TutorMode => (TUTOR_MODES as readonly unknown[]).includes(v);

export function validateTutorInterest(raw: unknown): TutorInterestValidation {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Invalid answer." };
  const { role, wants, mode } = raw as Record<string, unknown>;
  if (!isRole(role)) return { ok: false, error: "Choose student or teacher." };
  if (typeof wants !== "boolean") return { ok: false, error: "Choose yes or no." };
  if (wants) {
    if (!isMode(mode)) return { ok: false, error: "Choose online, offline or either." };
    return { ok: true, value: { role, wants, mode } };
  }
  if (mode !== undefined && mode !== null) return { ok: false, error: "A no takes no mode." };
  return { ok: true, value: { role, wants, mode: null } };
}

const SECTION_RE = /^[a-z0-9-]{1,40}$/;

/** The section the Tutor button was tapped from, or null when it is anything but a plain path segment. */
export function normaliseFrom(raw: unknown): string | null {
  return typeof raw === "string" && SECTION_RE.test(raw) ? raw : null;
}

/**
 * Whether to ask for a mobile as the last question (owner, 2026-10-28): only
 * after a Yes, and only when the account has none on file, so we can reach the
 * people who want tutoring without asking anyone twice.
 */
export function needsContactStep({ wants, hasMobile }: { wants: boolean; hasMobile: boolean }): boolean {
  return wants && !hasMobile;
}

/** One stored answer, as the contact list reads it. */
export type TutorAnswerRow = {
  user_id: string | null;
  role: TutorRole;
  wants: boolean;
  mode: TutorMode | null;
  exam_slug: string | null;
  created_at: string;
};

export type TutorContact = {
  userId: string;
  name: string | null;
  email: string | null;
  mobile: string | null;
  role: TutorRole;
  mode: TutorMode | null;
  examSlug: string | null;
  answeredAt: string;
};

/**
 * The people who said Yes, newest first, for the owner to reach. A Yes saved
 * before sign-in was required (2026-10-28) has no account behind it, so it is
 * counted as unreachable rather than listed.
 */
export function buildTutorContacts(
  rows: readonly TutorAnswerRow[],
  people: ReadonlyMap<string, { name: string | null; email: string | null }>,
  mobiles: ReadonlyMap<string, string>
): { contacts: TutorContact[]; unreachableYes: number } {
  const contacts: TutorContact[] = [];
  let unreachableYes = 0;
  for (const r of rows) {
    if (!r.wants) continue;
    if (!r.user_id) {
      unreachableYes++;
      continue;
    }
    const person = people.get(r.user_id);
    contacts.push({
      userId: r.user_id,
      name: person?.name ?? null,
      email: person?.email ?? null,
      mobile: mobiles.get(r.user_id) ?? null,
      role: r.role,
      mode: r.mode,
      examSlug: r.exam_slug,
      answeredAt: r.created_at,
    });
  }
  contacts.sort((a, b) => b.answeredAt.localeCompare(a.answeredAt));
  return { contacts, unreachableYes };
}

/** One stored answer, as the readout reads it. */
export type TutorInterestRow = {
  role: TutorRole;
  wants: boolean;
  mode: TutorMode | null;
  exam_slug: string | null;
  signed_in: boolean;
};

export type TutorSideTally = { yes: number; no: number } & Record<TutorMode, number>;

export type TutorInterestSummary = {
  total: number;
  signedIn: number;
  student: TutorSideTally;
  teacher: TutorSideTally;
  /** Student Yes answers per exam, most first; the unknown exam (null) last. */
  studentYesByExam: { exam: string | null; count: number }[];
};

const emptySide = (): TutorSideTally => ({ yes: 0, no: 0, online: 0, offline: 0, either: 0 });

export function summariseTutorInterest(rows: readonly TutorInterestRow[]): TutorInterestSummary {
  const side = { student: emptySide(), teacher: emptySide() };
  const byExam = new Map<string | null, number>();
  let signedIn = 0;
  for (const r of rows) {
    const t = side[r.role];
    if (r.signed_in) signedIn++;
    if (!r.wants) {
      t.no++;
      continue;
    }
    t.yes++;
    if (r.mode) t[r.mode]++;
    if (r.role === "student") byExam.set(r.exam_slug, (byExam.get(r.exam_slug) ?? 0) + 1);
  }
  const studentYesByExam = Array.from(byExam, ([exam, count]) => ({ exam, count })).sort((a, b) => {
    if ((a.exam === null) !== (b.exam === null)) return a.exam === null ? 1 : -1;
    return b.count - a.count || (a.exam ?? "").localeCompare(b.exam ?? "");
  });
  return { total: rows.length, signedIn, ...side, studentYesByExam };
}
