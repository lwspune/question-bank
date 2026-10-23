/**
 * Deal IMAT practice papers from the twin pool: full papers in today's ministry format
 * (IMAT_PAPER), assembled from our original practice questions because the twins of a
 * Cambridge year neither fill 60 nor follow today's section counts.
 *
 * Rules: every paper gets each section's exact count; no question appears twice, in a
 * paper or across papers; each paper's questions are spread over the section's
 * chapters. All the twins are rated MODERATE, so difficulty does not enter.
 *
 * How the spread is kept: in each round every paper takes one question, from the
 * chapter it has drawn on least so far (ties: the chapter with most left, then by
 * name), and the order the papers pick in rotates each round so no paper always
 * picks first. A fixed arithmetic deal (row i to paper i % papers, rotated or not)
 * lines up with the chapter cycle for some counts and hands a paper ONE chapter.
 *
 * Pure; unit-tested in tests/imat-practice-papers.test.ts.
 */

export type PoolRow = { id: string; sectionKey: string; chapter: string; subtopic: string };
export type SectionCount = { key: string; count: number };

const byText = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

/** How many papers the pool can fill without repeating a question. */
export function maxPapers(pool: readonly PoolRow[], sections: readonly SectionCount[]): number {
  return Math.min(...sections.map((s) => Math.floor(pool.filter((r) => r.sectionKey === s.key).length / s.count)));
}

/** `papers` question-id lists, each in section order. Throws when the pool runs short. */
export function dealPracticePapers(pool: readonly PoolRow[], sections: readonly SectionCount[], papers: number): string[][] {
  const out: string[][] = Array.from({ length: papers }, () => []);
  for (const s of sections) {
    const rows = pool.filter((r) => r.sectionKey === s.key);
    if (rows.length < papers * s.count) {
      throw new Error(`section ${s.key}: ${rows.length} questions cannot fill ${papers} papers of ${s.count}`);
    }
    const left = new Map<string, PoolRow[]>();
    for (const r of rows) left.set(r.chapter, [...(left.get(r.chapter) ?? []), r]);
    for (const list of left.values()) list.sort((a, b) => byText(a.subtopic, b.subtopic) || byText(a.id, b.id));
    const used = Array.from({ length: papers }, () => new Map<string, number>());

    for (let round = 0; round < s.count; round++) {
      for (let i = 0; i < papers; i++) {
        const p = (i + round) % papers;
        let best: string | null = null;
        for (const [chapter, list] of left) {
          if (list.length === 0) continue;
          if (best === null) {
            best = chapter;
            continue;
          }
          const d = (used[p].get(chapter) ?? 0) - (used[p].get(best) ?? 0);
          const more = list.length - left.get(best)!.length;
          if (d < 0 || (d === 0 && (more > 0 || (more === 0 && byText(chapter, best) < 0)))) best = chapter;
        }
        out[p].push(left.get(best!)!.shift()!.id);
        used[p].set(best!, (used[p].get(best!) ?? 0) + 1);
      }
    }
  }
  return out;
}
