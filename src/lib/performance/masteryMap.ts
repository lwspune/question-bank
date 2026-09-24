/**
 * The mastery map — ENGAGEMENT_SPEC.md B1. Pure core.
 *
 * WHAT IT IS. One (exam, subject) lane rendered as chapter tiles, each tile
 * carrying one dot per subtopic in the band the performance core already
 * computes. It is the same numbers as the chapter accordion on /performance,
 * shaped so a student can SEE progress rather than read it: the drill
 * retiring a question is what moves a dot from red to green.
 *
 * THE BANDS ARE NOT REDEFINED HERE. `bandOf` reads WEAK_BELOW, MASTERED_AT and
 * MIN_JUDGED_FOR_CLAIM from compute.ts, the same constants the accordion's
 * bar colour and the concept graph's root-cause chain use — so the map, the
 * accordion and the focus card can never disagree about what "weak" means.
 *
 * "unknown" is a band, not an absence: a subtopic under the evidence floor
 * renders as a grey dot and counts in the totals, because "not tested yet" is
 * a true thing to say about it and a missing dot would read as "nothing here".
 *
 * No I/O. Spec: tests/performance-mastery-map.test.ts.
 */
import {
  MASTERED_AT,
  MIN_JUDGED_FOR_CLAIM,
  WEAK_BELOW,
  type ChapterRow,
  type Lane,
  type SubtopicRow,
} from "./compute";
import { goPracticeHref } from "./links";

export type Band = "weak" | "mid" | "mastered" | "unknown";

/** Weakest first — the order tiles sort in and legends list in. */
export const BAND_ORDER: readonly Band[] = ["weak", "mid", "mastered", "unknown"];

export type BandCounts = Record<Band, number>;

export type MapDot = {
  subtopic: string;
  band: Band;
  /** 0-100 accuracy over judged answers, or null under the floor. */
  accuracy: number | null;
  judged: number;
  /** Link C — practise this subtopic, resolved by name at click time. */
  href: string;
};

export type MapTile = {
  chapter: string;
  dots: MapDot[];
  counts: BandCounts;
  /** Plain-words state: "1 to fix", "all mastered", "not tested yet". */
  label: string;
  /** Link C for the whole chapter. */
  href: string;
};

export type MasteryMap = {
  exam: string;
  subject: string;
  tiles: MapTile[];
  totals: BandCounts;
  subtopics: number;
};

export function bandOf(row: Pick<SubtopicRow, "judged" | "weightedScore">): Band {
  if (row.judged < MIN_JUDGED_FOR_CLAIM) return "unknown";
  if (row.weightedScore < WEAK_BELOW) return "weak";
  if (row.weightedScore >= MASTERED_AT) return "mastered";
  return "mid";
}

const zero = (): BandCounts => ({ weak: 0, mid: 0, mastered: 0, unknown: 0 });

function labelFor(c: BandCounts): string {
  const measured = c.weak + c.mid + c.mastered;
  if (measured === 0) return "not tested yet";
  if (c.weak > 0) return `${c.weak} to fix`;
  if (c.mid > 0) return `${c.mid} nearly there`;
  return "all mastered";
}

/** Tile rank: any weak dot first, then any mid, then all-mastered, then
 *  untested — the deliberate-practice order, worst first. Ties by name. */
function rankOf(c: BandCounts): number {
  if (c.weak > 0) return 0;
  if (c.mid > 0) return 1;
  if (c.mastered > 0) return 2;
  return 3;
}

function tileOf(lane: Lane, ch: ChapterRow): MapTile {
  const counts = zero();
  const dots: MapDot[] = ch.subtopics.map((s) => {
    const band = bandOf(s);
    counts[band] += 1;
    return {
      subtopic: s.subtopic,
      band,
      accuracy: band === "unknown" ? null : s.accuracy,
      judged: s.judged,
      href: goPracticeHref(lane.exam, lane.subject, ch.chapter, s.subtopic),
    };
  });
  return {
    chapter: ch.chapter,
    dots,
    counts,
    label: labelFor(counts),
    href: goPracticeHref(lane.exam, lane.subject, ch.chapter),
  };
}

export function buildMasteryMap(lane: Lane): MasteryMap {
  const tiles = lane.chapters.map((ch) => tileOf(lane, ch));
  tiles.sort(
    (a, b) => rankOf(a.counts) - rankOf(b.counts) || a.chapter.localeCompare(b.chapter)
  );
  const totals = zero();
  let subtopics = 0;
  for (const t of tiles) {
    for (const b of BAND_ORDER) totals[b] += t.counts[b];
    subtopics += t.dots.length;
  }
  return { exam: lane.exam, subject: lane.subject, tiles, totals, subtopics };
}
