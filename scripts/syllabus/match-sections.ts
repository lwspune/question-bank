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

/** The parent section's title, or "" for a top-level section. */
export function parentTitle(sectionNo: string, byNo: Map<string, string>): string {
  const parts = sectionNo.trim().split(".");
  if (parts.length < 3) return "";
  return byNo.get(parts.slice(0, 2).join(".")) ?? "";
}

/**
 * Are two sections' parents compatible?
 *
 * This is a GUARD on the bare-title score, not an input to it. Prefixing both
 * titles with their parents was tried first and made matching WORSE — it gave
 * siblings extra tokens to tie on, so "The pH Scale" under "Ionization of Acids
 * and Bases" started matching "Acids and Bases" instead of "pH Scale".
 *
 * As a guard it only ever REJECTS: when both sides have a parent and those
 * parents share nothing, the titles agreeing is a coincidence. That is what
 * separates "Physical properties" under Aromatic Hydrocarbons from the State
 * Board's "Physical properties of alkanes" — the exact wrong-section answer that
 * would mislead a student.
 *
 * Missing parent (either side top-level) means no evidence, so it permits.
 */
export function parentsCompatible(a: string, b: string): boolean {
  if (!a || !b) return true;
  return similarity(a, b) > 0;
}

/**
 * Titles that say nothing on their own — every chapter has a "Preparation" and a
 * "Physical properties", so they are only identifiable through their parent.
 *
 * The parent guard applies to THESE ONLY. Applied to every title it cost 68 real
 * matches (Chromatography under "Methods of Purification" was rejected against
 * "Chromatographic techniques" because the parents share no words) while the
 * confusion it exists to prevent only ever arises between generic siblings.
 */
const GENERIC = new Set(
  `preparation preparations properties property nomenclature isomerism structure
structures classification uses reactions reaction methods method definitions
introduction general physical chemical`.split(/\s+/),
);

/**
 * MAJORITY-generic, not all-generic. Extraction leaves stray words in titles —
 * "Properties Sulphonation: Physical properties" is the aromatic-hydrocarbons
 * section, and that one stray token was enough to switch the guard off and let it
 * match "Physical properties of alkanes" again.
 */
export function isGenericTitle(title: string): boolean {
  const t = tokens(title);
  if (!t.length) return false;
  return t.filter((w) => GENERIC.has(w)).length * 2 >= t.length;
}

export type Candidate = { sectionNo: string; title: string; parent?: string };

export type Match = { sectionNo: string; title: string; score: number } | null;

/**
 * Best-scoring candidate, or null when nothing clears MIN_SCORE.
 *
 * `parent` on both sides is optional; when both are present and incompatible the
 * candidate is skipped, however well the titles score.
 */
export function bestMatch(title: string, candidates: Candidate[], parent = ""): Match {
  // Only generic titles need the parent guard; a distinctive title identifies
  // itself, and guarding it just discards good matches.
  const guard = isGenericTitle(title);
  let best: Match = null;
  for (const c of candidates) {
    if (guard && !parentsCompatible(parent, c.parent ?? "")) continue;
    const score = similarity(title, c.title);
    if (score > (best?.score ?? 0)) best = { sectionNo: c.sectionNo, title: c.title, score };
  }
  return best && best.score >= MIN_SCORE ? best : null;
}
