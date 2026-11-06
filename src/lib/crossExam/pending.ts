/**
 * Which exam-twin comparisons are still to be made. A comparison is one board
 * question read against one exam question; a settled run (scripts/cross-exam/data)
 * made every comparison between the board ids and the exam ids in its `reviewed`
 * lists. After an ingest only the comparisons no run has made are read, so the
 * old papers are never read twice. Runbook: scripts/cross-exam/README.md.
 */

export type IdSets = { targets: string[]; board: string[] };

/**
 * The comparisons still to make, as parts: each part is a set of exam questions
 * that all need the same board questions, so one run (one target.md, one set of
 * board slices) covers it with no comparison made twice. Biggest part first.
 * Ids a run read that are no longer in the chapter are ignored; a question that
 * arrives in the chapter (ingested or moved in) counts as new.
 */
export function pendingWork(current: IdSets, done: IdSets[]): IdSets[] {
  const coveredBoard = new Map<string, Set<string>>();
  for (const run of done) {
    for (const t of run.targets) {
      const s = coveredBoard.get(t) ?? new Set<string>();
      for (const b of run.board) s.add(b);
      coveredBoard.set(t, s);
    }
  }
  const parts = new Map<string, IdSets>();
  for (const t of current.targets) {
    const covered = coveredBoard.get(t);
    const missing = current.board.filter((b) => !covered?.has(b));
    if (missing.length === 0) continue;
    const key = missing.join(",");
    const part = parts.get(key) ?? { targets: [], board: missing };
    part.targets.push(t);
    parts.set(key, part);
  }
  return [...parts.values()].sort((a, b) => b.targets.length * b.board.length - a.targets.length * a.board.length);
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Is this settled file (a file name in scripts/cross-exam/data) a run of `slug`? */
export function isRunOf(slug: string, fileName: string): boolean {
  return new RegExp(`^${escape(slug)}-\\d{4}-\\d{2}-\\d{2}(-\\d+)?\\.json$`).test(fileName);
}

/** `<slug>-<day>`, or `-2`, `-3` ... when that day already has a run of the slug. */
export function nextRunName(slug: string, day: string, fileNames: string[]): string {
  const base = `${slug}-${day}`;
  const taken = new Set(fileNames.map((f) => f.replace(/\.json$/, "")));
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}
