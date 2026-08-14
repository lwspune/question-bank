/**
 * Does a bank spine still describe the bank it was sampled from?
 *
 * A bank spine (`<exam> bank taxonomy`) is a SNAPSHOT: one concept row per
 * (exam, chapter, subtopic) with the PYQ count baked into the row's name. The
 * live corpus moves underneath it on every ingest, and nothing re-derives it —
 * so the map keeps reporting whatever was true the day someone last ran
 * ingest-bank-spine.
 *
 * That is not hypothetical. JEE Chemistry completed on 2026-08-06 and the spine
 * had been built before it: for eight days /dashboard/syllabus/chemistry showed
 * 149 subtopics and 731 PYQ against a bank holding 202 and 3,455. 53 subtopics
 * were absent from the page entirely, and the 149 that remained carried counts
 * that are what ORDER the gap list a teacher prioritises from.
 *
 * It went unnoticed because every other invariant here has a probe —
 * audit-directions, audit-alignment, audit-spine, board:lint — and this one had
 * none. It was found by a human doubting a number on the page.
 *
 * MISSING subtopics are the finding that matters: they render nowhere at all, so
 * the page cannot even show them as unassessed. A changed PYQ count is milder
 * (the row exists, its weight is wrong) and a STALE row — in the spine, gone
 * from the bank — usually means a taxonomy rename, which strands its rulings.
 */

/** One (chapter, subtopic) of a spine or of the live bank. */
export type SpineEntry = { chapter: string; subtopic: string; pyq: number };

export type SpineDrift = {
  /** In the bank, absent from the spine — invisible on the page. */
  missing: SpineEntry[];
  /** In the spine, absent from the bank — usually a rename; rulings at risk. */
  stale: SpineEntry[];
  /** Present in both, but the count baked into the spine no longer matches. */
  changed: { chapter: string; subtopic: string; spinePyq: number; bankPyq: number }[];
};

export function diffSpine(spine: SpineEntry[], bank: SpineEntry[]): SpineDrift {
  const key = (e: { chapter: string; subtopic: string }) => `${e.chapter}\t${e.subtopic}`;
  const spineBy = new Map(spine.map((e) => [key(e), e]));
  const bankBy = new Map(bank.map((e) => [key(e), e]));

  const missing = bank.filter((e) => !spineBy.has(key(e)));
  const stale = spine.filter((e) => !bankBy.has(key(e)));
  const changed = spine
    .filter((e) => bankBy.has(key(e)) && bankBy.get(key(e))!.pyq !== e.pyq)
    .map((e) => ({
      chapter: e.chapter,
      subtopic: e.subtopic,
      spinePyq: e.pyq,
      bankPyq: bankBy.get(key(e))!.pyq,
    }));

  return { missing, stale, changed };
}

export function isDrifted(drift: SpineDrift): boolean {
  return drift.missing.length > 0 || drift.stale.length > 0 || drift.changed.length > 0;
}

/** Total PYQ weight the page cannot show at all, which is the number to act on. */
export function missingPyq(drift: SpineDrift): number {
  return drift.missing.reduce((n, e) => n + e.pyq, 0);
}
