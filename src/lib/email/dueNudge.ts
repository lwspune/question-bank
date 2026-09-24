/**
 * The due-queue nudge — pure core. ENGAGEMENT_SPEC.md C2.
 *
 * WHAT IT IS. A student who got questions wrong in a timed mock has them
 * waiting in /drill. Most never come back to find out: 8 drills by 2 students
 * in the drill's first five days, against 10,788 recorded mistakes. This is
 * the message that reaches a student who has closed the tab, and it is
 * CONTENT-LED by rule: it names the chapters and the count, never the absence
 * ("we miss you", "you haven't practised"), which the sibling English AI Tutor
 * measured as reading like a guilt trip.
 *
 * THE ANTI-NAG RULES, in the order they are checked:
 *   not-a-student     — org staff are not mailed (readStudents already excludes them)
 *   no-email / opted-out
 *   nothing-due       — an empty nudge IS the guilt trip
 *   drilled-recently  — they were in the drill inside NUDGE_QUIET_HOURS; they know
 *   already-today     — the day's dedupe key is used (a same-day re-run)
 *   nudged-recently   — the last nudge was inside NUDGE_MIN_GAP_DAYS
 *   backed-off        — NUDGE_MAX_UNANSWERED nudges since their last drill went
 *                       unanswered; nothing more until they drill again. Found
 *                       on the first live dry run: 153 picks, many of them
 *                       students dormant since July, who would otherwise be
 *                       mailed every third day forever.
 *
 * The daily cap is ALSO a property of the table: the dedupe key carries the IST
 * calendar day and email_sends.dedupe_key is UNIQUE (0059), so a re-run cannot
 * double-send even if this module is wrong. The gap and the quiet window are
 * policy here only.
 *
 * Total by construction: every candidate lands in `picks` or `skipped` with a
 * reason, so a student who did not get one is explainable afterwards.
 *
 * No I/O. Spec: tests/email-due-nudge.test.ts.
 */
import type { DueQuestion } from "@/lib/drill/select";
import type { PriorSend, StudentLite } from "./recommend";

export const NUDGE_KIND = "due_nudge" as const;

/** Days between two nudges to the same student. Three, the sibling app's
 *  reminder cadence: a drill is a five-minute act, so a shorter gap than the
 *  seven-day mock recommendation is honest. */
export const NUDGE_MIN_GAP_DAYS = 3;

/** No nudge to a student who drilled this recently — they know what is due. */
export const NUDGE_QUIET_HOURS = 24;

/** After this many nudges with no drill in between, stop until they drill.
 *  Three: one may be missed, two is a pattern, three unanswered is an answer. */
export const NUDGE_MAX_UNANSWERED = 3;

const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;
const IST_OFFSET_MS = 5.5 * HOUR_MS;

/** A question with no chapter name still counts; it is filed here. */
export const UNNAMED_CHAPTER = "Other topics";

export type NudgeCandidate = {
  userId: string;
  /** Their drillable due pool, taxonomy attached (attachRefs). */
  due: DueQuestion[];
  /** ISO of their most recent drill activity (a drill answer or completion), or null. */
  lastDrillAt: string | null;
};

export type DueSummary = {
  total: number;
  /** Biggest first, ties by name. */
  chapters: { chapter: string; count: number }[];
};

export type NudgePick = {
  userId: string;
  email: string;
  name: string;
  dedupeKey: string;
  summary: DueSummary;
};

export type NudgeSkipReason =
  | "not-a-student"
  | "no-email"
  | "opted-out"
  | "nothing-due"
  | "drilled-recently"
  | "already-today"
  | "nudged-recently"
  | "backed-off";

export type NudgeSkip = { userId: string; reason: NudgeSkipReason };

/** YYYY-MM-DD of `d` in IST — the student's calendar day, not the server's. */
export function istDayKey(d: Date): string {
  return new Date(d.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10);
}

export function dueNudgeDedupeKey(userId: string, now: Date): string {
  return `${NUDGE_KIND}:${userId}:${istDayKey(now)}`;
}

export function summarizeDue(due: readonly DueQuestion[]): DueSummary {
  const counts = new Map<string, number>();
  for (const q of due) {
    const name = q.chapter.trim() === "" ? UNNAMED_CHAPTER : q.chapter;
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  const chapters = [...counts.entries()]
    .map(([chapter, count]) => ({ chapter, count }))
    .sort((a, b) => b.count - a.count || (a.chapter < b.chapter ? -1 : a.chapter > b.chapter ? 1 : 0));
  return { total: due.length, chapters };
}

export type SelectInput = {
  candidates: readonly NudgeCandidate[];
  /** The mailable roster, keyed by userId. Absence means staff. */
  students: ReadonlyMap<string, StudentLite>;
  /** Every prior send; other kinds are ignored here. */
  priorSends: readonly PriorSend[];
  now: Date;
};

export function selectDueNudges(input: SelectInput): { picks: NudgePick[]; skipped: NudgeSkip[] } {
  const { candidates, students, priorSends, now } = input;
  const prefix = `${NUDGE_KIND}:`;

  // Every prior NUDGE per student (timestamps), and the set of keys already used.
  const nudgesAt = new Map<string, number[]>();
  const usedKeys = new Set<string>();
  for (const p of priorSends) {
    if (!p.dedupeKey.startsWith(prefix)) continue;
    usedKeys.add(p.dedupeKey);
    const t = Date.parse(p.createdAt);
    if (!Number.isFinite(t)) continue;
    const list = nudgesAt.get(p.userId);
    if (list) list.push(t);
    else nudgesAt.set(p.userId, [t]);
  }

  const picks: NudgePick[] = [];
  const skipped: NudgeSkip[] = [];
  const skip = (userId: string, reason: NudgeSkipReason) => skipped.push({ userId, reason });

  for (const c of candidates) {
    const s = students.get(c.userId);
    if (!s) {
      skip(c.userId, "not-a-student");
      continue;
    }
    if (!s.email) {
      skip(c.userId, "no-email");
      continue;
    }
    if (s.emailOptOut) {
      skip(c.userId, "opted-out");
      continue;
    }
    if (c.due.length === 0) {
      skip(c.userId, "nothing-due");
      continue;
    }
    if (c.lastDrillAt !== null) {
      const t = Date.parse(c.lastDrillAt);
      if (Number.isFinite(t) && now.getTime() - t < NUDGE_QUIET_HOURS * HOUR_MS) {
        skip(c.userId, "drilled-recently");
        continue;
      }
    }
    const dedupeKey = dueNudgeDedupeKey(c.userId, now);
    if (usedKeys.has(dedupeKey)) {
      skip(c.userId, "already-today");
      continue;
    }
    const mine = nudgesAt.get(c.userId) ?? [];
    const last = mine.length ? Math.max(...mine) : undefined;
    if (last !== undefined && now.getTime() - last < NUDGE_MIN_GAP_DAYS * DAY_MS) {
      skip(c.userId, "nudged-recently");
      continue;
    }
    // Nudges since their last drill. No drill ever ⇒ every nudge is unanswered.
    const lastDrill = c.lastDrillAt === null ? -Infinity : Date.parse(c.lastDrillAt);
    const unanswered = mine.filter((t) => t > lastDrill).length;
    if (unanswered >= NUDGE_MAX_UNANSWERED) {
      skip(c.userId, "backed-off");
      continue;
    }
    picks.push({
      userId: c.userId,
      email: s.email,
      name: s.name,
      dedupeKey,
      summary: summarizeDue(c.due),
    });
  }

  return { picks, skipped };
}
