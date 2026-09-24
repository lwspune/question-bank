/**
 * Teacher-assigned mocks with a deadline — pure core. ENGAGEMENT_SPEC.md C1.
 *
 * DEADLINE PULL, NEVER RANK PULL. Nothing in this module orders students
 * against each other. It decides whether an assignment is open, due soon or
 * overdue; what the label says in the student's calendar (IST); and who has
 * SAT the paper — a graded attempt of THIS mock, by someone on the roster.
 *
 * "Sat" is deliberately any graded attempt, not only one after the assignment
 * was made: a teacher asking "who has done this paper?" wants the true answer,
 * and a student who sat it last week has done it.
 *
 * No I/O. Spec: tests/assignments-core.test.ts.
 */

export const DUE_SOON_HOURS = 48;
export const MAX_NOTE_LEN = 200;

const HOUR_MS = 3_600_000;
const DAY_MS = 24 * HOUR_MS;
const IST_OFFSET_MS = 5.5 * HOUR_MS;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type AssignmentInput = { mockId: string; dueAt: string; note?: string | null };
export type AssignmentFields = { mockId: string; dueAt: string; note: string | null };

export type ValidateResult = { ok: true; value: AssignmentFields } | { ok: false; error: string };

export function validateAssignmentInput(input: AssignmentInput, now: Date): ValidateResult {
  if (typeof input.mockId !== "string" || !UUID_RE.test(input.mockId)) {
    return { ok: false, error: "Pick a mock test." };
  }
  const t = Date.parse(String(input.dueAt ?? ""));
  if (!Number.isFinite(t)) return { ok: false, error: "Pick a due date." };
  if (t <= now.getTime()) return { ok: false, error: "The due date has to be in the future." };
  const note = String(input.note ?? "").trim();
  if (note.length > MAX_NOTE_LEN) {
    return { ok: false, error: `Keep the note under ${MAX_NOTE_LEN} characters.` };
  }
  return { ok: true, value: { mockId: input.mockId, dueAt: new Date(t).toISOString(), note: note || null } };
}

export type AssignmentState = "open" | "due-soon" | "overdue";

export function assignmentState(dueAt: string, now: Date): AssignmentState {
  const left = Date.parse(dueAt) - now.getTime();
  if (left < 0) return "overdue";
  if (left < DUE_SOON_HOURS * HOUR_MS) return "due-soon";
  return "open";
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Whole IST calendar days since the epoch. */
function istDay(ms: number): number {
  return Math.floor((ms + IST_OFFSET_MS) / DAY_MS);
}

/**
 * "Due today" · "Due tomorrow" · "Due Sunday" (inside a week) · "Due 4 Oct" ·
 * "Overdue" · "Overdue by 2 days" — in the student's calendar, which is IST
 * regardless of where the server runs.
 */
export function dueLabel(dueAt: string, now: Date): string {
  const due = Date.parse(dueAt);
  const nowMs = now.getTime();
  const diff = istDay(due) - istDay(nowMs);
  if (due < nowMs) {
    const over = -diff;
    return over <= 0 ? "Overdue" : `Overdue by ${over} day${over === 1 ? "" : "s"}`;
  }
  if (diff === 0) return "Due today";
  if (diff === 1) return "Due tomorrow";
  const shifted = new Date(due + IST_OFFSET_MS);
  if (diff < 7) return `Due ${WEEKDAYS[shifted.getUTCDay()]}`;
  return `Due ${shifted.getUTCDate()} ${MONTHS[shifted.getUTCMonth()]}`;
}

export type AttemptLite = { userId: string; mockId: string; submittedAt: string | null };

export type Completion = { done: string[]; pending: string[] };

/** Who on the roster has a GRADED attempt of this mock. Total over the roster,
 *  in roster order; attempts by non-roster users are ignored. */
export function completionFor(
  mockId: string,
  roster: readonly { userId: string }[],
  attempts: readonly AttemptLite[]
): Completion {
  const sat = new Set<string>();
  for (const a of attempts) {
    if (a.mockId === mockId && a.submittedAt !== null) sat.add(a.userId);
  }
  const done: string[] = [];
  const pending: string[] = [];
  for (const r of roster) (sat.has(r.userId) ? done : pending).push(r.userId);
  return { done, pending };
}

export type StudentAssignmentRow = {
  id: string;
  mockId: string;
  mockSlug: string;
  mockTitle: string;
  batchName: string;
  dueAt: string;
  note: string | null;
};

export type StudentAssignmentView = StudentAssignmentRow & {
  done: boolean;
  state: AssignmentState;
  label: string;
};

/** The /me list: papers not yet sat first, soonest due first; sat ones after. */
export function studentAssignmentViews(
  rows: readonly StudentAssignmentRow[],
  ownAttempts: readonly AttemptLite[],
  now: Date
): StudentAssignmentView[] {
  const sat = new Set(ownAttempts.filter((a) => a.submittedAt !== null).map((a) => a.mockId));
  return rows
    .map((r) => ({ ...r, done: sat.has(r.mockId), state: assignmentState(r.dueAt, now), label: dueLabel(r.dueAt, now) }))
    .sort((a, b) => Number(a.done) - Number(b.done) || a.dueAt.localeCompare(b.dueAt));
}
