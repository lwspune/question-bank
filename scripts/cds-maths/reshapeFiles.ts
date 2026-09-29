/**
 * The per-paper data side of a CDS Mathematics re-cut (reshape.ts step 3), as a pure function so
 * the runner can check EVERY data file before it writes anything.
 *
 * Why it is separate: reshape.ts used to resolve these rows after it had already written the bank
 * and catalog.json, so a refusal here left the bank re-cut and one data row pointing at a subtopic
 * that no longer existed (Time and Work, 2021-2 Q39, 2026-09-29).
 *
 * A row resolves, in order: the subtopic its bank row now has (paper#number) → already a teaching
 * subtopic → a whole-subtopic move. A row with none of these (a question withheld from the bank,
 * e.g. because no option is correct) is a problem, not a silent skip.
 */
export type DataRow = { number: number | string; chapter?: string; subtopic?: string };

export function planFileEdits(
  list: DataRow[],
  opts: { pid: string; chapter: string; order: string[]; whole: Record<string, string>; byKey: Map<string, string> },
): { changes: { index: number; to: string }[]; problems: string[] } {
  const changes: { index: number; to: string }[] = [];
  const problems: string[] = [];
  list.forEach((q, index) => {
    if (q?.chapter !== opts.chapter) return;
    const sub = q.subtopic ?? "";
    const to =
      opts.byKey.get(`${opts.pid}#${Number(q.number)}`) ??
      (opts.order.includes(sub) ? sub : opts.whole[sub]);
    if (!to) {
      problems.push(`NO DB ROW ${opts.pid} Q${q.number} subtopic="${sub}" and no whole-subtopic move`);
      return;
    }
    if (sub !== to) changes.push({ index, to });
  });
  return { changes, problems };
}
