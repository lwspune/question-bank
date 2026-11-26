/**
 * /dashboard/rooms/<exam> (owner, 2026-11-26): how a room answered its daily
 * question. Staff only; students never see a count (no ranking, engagement
 * gate). Pure. Spec: tests/rooms-admin-room.test.ts.
 */

export type DailyTally = {
  answered: number;
  right: number;
  byOption: { label: string; count: number; correct: boolean }[];
};

export function tallyDailyAnswers(
  options: readonly { id: string; label: string; is_correct: boolean }[],
  /** option id -> how many picked it */
  counts: ReadonlyMap<string, number>
): DailyTally {
  const byOption = [...options]
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((o) => ({ label: o.label, count: counts.get(o.id) ?? 0, correct: o.is_correct }));
  return {
    answered: byOption.reduce((n, o) => n + o.count, 0),
    right: byOption.filter((o) => o.correct).reduce((n, o) => n + o.count, 0),
    byOption,
  };
}
