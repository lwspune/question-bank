/**
 * Match one syllabus section to the section of another book that covers it.
 *
 * Used to answer "which State Board subtopic covers this NCERT subtopic?" at
 * SUBTOPIC grain, one level finer than the chapter map.
 *
 * Deliberately conservative. Titles are short and the two books word things
 * differently ("Nomenclature" vs "IUPAC names of..."), so a weak overlap is more
 * likely to be a coincidence than a real correspondence — a wrong match here
 * would assert coverage that does not exist, which is worse than admitting no
 * match was found. Candidates below MIN_SCORE return null.
 */

/** Words too common in chemistry headings to discriminate between sections. */
const STOP = new Set(
  `the a an of and or in on to for with from by is are as at into its their between
general introduction some basic other others type types class classes kind kinds
properties property nature concept concepts idea ideas study terms term based
using use uses their there this that these those which what more most`.split(/\s+/),
);

export function tokens(title: string): string[] {
  return [
    ...new Set(
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .split(/\s+/)
        .map((w) => w.replace(/-+$/, ""))
        .filter((w) => w.length > 2 && !STOP.has(w)),
    ),
  ];
}

/**
 * Overlap weighted toward the SHORTER title. Plain Jaccard punishes a correct
 * match between a terse heading and a verbose one ("Work" vs "Work and Heat in
 * Thermodynamic Processes"), which is exactly the shape these two books produce.
 */
export function similarity(a: string, b: string): number {
  const ta = tokens(a);
  const tb = tokens(b);
  if (!ta.length || !tb.length) return 0;
  const setB = new Set(tb);
  const shared = ta.filter((t) => setB.has(t)).length;
  return shared / Math.min(ta.length, tb.length);
}

export const MIN_SCORE = 0.5;

export type Candidate = { sectionNo: string; title: string };

export type Match = { sectionNo: string; title: string; score: number } | null;

/** Best-scoring candidate, or null when nothing clears MIN_SCORE. */
export function bestMatch(title: string, candidates: Candidate[]): Match {
  let best: Match = null;
  for (const c of candidates) {
    const score = similarity(title, c.title);
    if (score > (best?.score ?? 0)) best = { sectionNo: c.sectionNo, title: c.title, score };
  }
  return best && best.score >= MIN_SCORE ? best : null;
}
