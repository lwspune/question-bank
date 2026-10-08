/**
 * IMAT pipeline configuration. See NICHE_SITES_SPEC.md (content first,
 * niche-site domain later) and scripts/imat/README.md.
 */
import { join } from "node:path";

/** The `exams.name`. Listed in src/lib/sites/nicheExams.ts, so PYQ Vault never lists it. */
export const EXAM_NAME = "IMAT";

/** LWS Pune, the org that owns the bank (same as every other pipeline here). */
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
/** The superadmin account the bank's ingests are recorded against. */
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";

/** The official MUR papers and the figures cropped from them (outside the repo). */
export const SOURCE_DIR = String.raw`C:\Vilas\LWS_Pune\IMAT\source`;
export const FIGURE_DIR = String.raw`C:\Vilas\LWS_Pune\IMAT\figures`;

export function figurePath(year: number, n: number): string {
  return join(FIGURE_DIR, `${year}_q${n}.png`);
}

/**
 * IMAT stays PRIVATE until the niche site exists AND the copyright question
 * is answered (NICHE_SITES_SPEC.md D1). The commit writes this at insert.
 */
export const VISIBILITY = "PRIVATE" as const;
