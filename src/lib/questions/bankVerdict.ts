/**
 * Right or wrong on a bank answer — the pure core (2026-10-02, ENGAGEMENT_SPEC
 * B3, decided by the user after UX_REVIEW_TRIAGE.md Y1).
 *
 * WHY THIS EXISTS. The bank is where students practise: in the week to
 * 2026-10-02, 52 signed-in students revealed 1,229 bank answers while 22 sat 30
 * mocks. Every reveal was recorded as `question_practiced` with no verdict, so
 * the surface students use most could feed nothing — not the drill, not a
 * "fixed" count, not progress. A tapped option now carries its verdict.
 *
 * THE SERVER GRADES. The client sends only which option was tapped
 * (practiceBatch `picks`); the key is read at grade time. Same rule as the
 * drill (lib/drill/query.ts gradeDrillAnswer): a browser-asserted verdict could
 * retire its own questions from the spaced-repetition ladder.
 *
 * WHAT A PICK WRITES:
 *   - always one `question_practiced` (the reveal, as before), now carrying
 *     `chose` + `correct` — so the reveal series stays one row per reveal;
 *   - wrong → also `answer_wrong`: the miss enters the drill;
 *   - right after an earlier miss → also `answer_correct`: a recovery. A right
 *     answer to a question never missed writes no ladder row, because
 *     `answer_correct` means a recovery, not any correct answer
 *     (lib/mocks/correctEvents.ts measured and rejected the symmetric version).
 *
 * ONE LADDER VERDICT PER QUESTION PER SURFACE PER IST DAY. Without the dedupe
 * key, reload the page and re-tap the answer it just showed you, and the
 * question goes to sleep for ten days unfixed.
 *
 * Pure: no DB, no clock of its own. Spec: tests/bank-verdict.test.ts.
 */
import type { ActivityEvent } from "@/lib/activity/events";
import { istDayKey } from "@/lib/email/dueNudge";
import type { BatchPicks, PickLabel, PracticeSurface } from "./practiceBatch";

/** What the grader needs to know about one question, read at grade time. */
export type AnswerKey = {
  /** `question_format`; null is treated as MCQ (the column defaults to mcq). */
  format: string | null;
  /** Officially cancelled (migration 0119): no option is right. */
  cancelled: boolean;
  options: { label: string; isCorrect: boolean }[];
};

export type PickVerdict = { chose: PickLabel; correct: boolean };

/**
 * Grade one tap, or null when the question cannot be graded. Null is never
 * "wrong": a row the bank cannot grade (no key, two keys, cancelled, not an
 * MCQ, an unknown label, gone since the page loaded) must not put a question in
 * the student's drill for a defect that is ours.
 */
export function gradePick(chose: PickLabel, key: AnswerKey | undefined): PickVerdict | null {
  if (!key || key.cancelled) return null;
  if (key.format !== null && key.format !== "mcq") return null;
  const keyed = key.options.filter((o) => o.isCorrect);
  if (keyed.length !== 1) return null;
  const tapped = key.options.find((o) => o.label.toUpperCase() === chose);
  if (!tapped) return null;
  return { chose, correct: tapped.isCorrect };
}

/** Grade every pick in a batch; ungradable picks are left out. */
export function gradePicks(
  picks: BatchPicks,
  keys: ReadonlyMap<string, AnswerKey>
): Map<string, PickVerdict> {
  const out = new Map<string, PickVerdict>();
  for (const [questionId, chose] of Object.entries(picks)) {
    const verdict = gradePick(chose, keys.get(questionId));
    if (verdict) out.set(questionId, verdict);
  }
  return out;
}

/** The ids answered right — the only ones whose prior misses need looking up. */
export function correctlyAnsweredIds(verdicts: ReadonlyMap<string, PickVerdict>): string[] {
  return [...verdicts].filter(([, v]) => v.correct).map(([id]) => id);
}

export function answerDedupeKey(
  surface: PracticeSurface,
  userId: string,
  questionId: string,
  now: Date
): string {
  return `answer:${surface}:${userId}:${questionId}:${istDayKey(now)}`;
}

export type PracticeEvents = {
  /** One per revealed id: plain inserts, no dedupe (a reveal is real history). */
  reveals: ActivityEvent[];
  /** Drill ladder rows: deduped per question, surface and IST day. */
  ladder: ActivityEvent[];
};

export function practiceEvents(input: {
  ids: readonly string[];
  surface: PracticeSurface;
  verdicts: ReadonlyMap<string, PickVerdict>;
  /** Questions this student already has an `answer_wrong` for. */
  priorWrongIds: ReadonlySet<string>;
  userId: string;
  now: Date;
}): PracticeEvents {
  const { ids, surface, verdicts, priorWrongIds, userId, now } = input;
  const reveals: ActivityEvent[] = [];
  const ladder: ActivityEvent[] = [];

  for (const questionId of ids) {
    const verdict = verdicts.get(questionId);
    reveals.push({
      kind: "question_practiced",
      refId: questionId,
      refKind: "question",
      metadata: verdict ? { surface, chose: verdict.chose, correct: verdict.correct } : { surface },
    });
    if (!verdict) continue;

    const kind = !verdict.correct
      ? "answer_wrong"
      : priorWrongIds.has(questionId)
        ? "answer_correct"
        : null;
    if (kind === null) continue;
    ladder.push({
      kind,
      refId: questionId,
      refKind: "question",
      metadata: { surface, chose: verdict.chose },
      dedupeKey: answerDedupeKey(surface, userId, questionId, now),
    });
  }
  return { reveals, ladder };
}
