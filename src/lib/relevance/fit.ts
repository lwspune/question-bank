import {
  JEE_MAINS_EXAM_ID,
  REVIEWED_CHAPTER_IDS,
  REVIEWED_CHAPTER_NAMES,
} from "./config";

/**
 * `all`        — no screen; every JEE question (the default)
 * `answerable` — only questions an NDA+CET-taught student can solve
 * `excluded`   — only the drops, so a teacher can audit the calls
 */
export type SyllabusFit = "all" | "answerable" | "excluded";

const FITS: SyllabusFit[] = ["all", "answerable", "excluded"];

export function parseFit(raw: string | null): SyllabusFit {
  return FITS.includes(raw as SyllabusFit) ? (raw as SyllabusFit) : "all";
}

/** The filter only means anything on JEE Mains — see config.ts. */
export function isFitExam(examId: string | null): boolean {
  return examId === JEE_MAINS_EXAM_ID;
}

/** Selected chapters that have not been adjudicated yet. */
export function unreviewedChapterIds(
  selected: string[],
  reviewed: ReadonlySet<string> = REVIEWED_CHAPTER_IDS
): string[] {
  return selected.filter((id) => !reviewed.has(id));
}

/**
 * How much of what the user is looking at has actually been screened.
 *
 * `unscoped` is the important one: with no chapter filter the user is browsing
 * the whole exam, most of which has never been reviewed. Returning those rows
 * silently would read as "all vetted", so the UI states the real scope.
 */
export type FitCoverage =
  | { kind: "inactive" }
  | { kind: "full" }
  | { kind: "partial"; unreviewed: string[] }
  | { kind: "unscoped"; reviewedNames: string[] };

export function fitCoverage(
  fit: SyllabusFit,
  chapterIds: string[],
  reviewed: ReadonlySet<string> = REVIEWED_CHAPTER_IDS
): FitCoverage {
  if (fit === "all") return { kind: "inactive" };
  if (chapterIds.length === 0)
    return { kind: "unscoped", reviewedNames: REVIEWED_CHAPTER_NAMES };
  const unreviewed = unreviewedChapterIds(chapterIds, reviewed);
  return unreviewed.length === 0 ? { kind: "full" } : { kind: "partial", unreviewed };
}
