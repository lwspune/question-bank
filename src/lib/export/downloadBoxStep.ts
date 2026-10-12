/**
 * Which step the /browse download box shows (2026-10-12).
 *
 * Until now a signed-out visitor whose filters matched more than 200 questions
 * was asked to sign in, and only after signing up was told the paper could not
 * be made (Clarity: a student tapped the greyed-out buttons a dozen times; 11
 * of 37 download-box signups since 2026-10-08 never downloaded). The box now
 * says the selection is too big FIRST, and never asks for a sign-in or a
 * payment for a paper it cannot make. The cap itself is the export route's.
 */

/** Most questions one export may hold; /api/export refuses more. */
export const EXPORT_CAP = 200;

export type DownloadBoxStep = "download" | "over_cap" | "offer" | "no_pass";

export function downloadBoxStep(input: {
  /** resolveExportAccess allows the paper (staff, the pass, or the free paper). */
  canDownload: boolean;
  /** The student tapped "Get Premium Pass" from the free download's line. */
  wantPass: boolean;
  /** Questions in the active selection (filters or cart). */
  count: number;
  /** A pass that unlocks downloads is on sale. */
  passOnSale: boolean;
}): DownloadBoxStep {
  const { canDownload, wantPass, count, passOnSale } = input;
  // The download view carries its own over-cap warning for those who can download.
  if (canDownload && !wantPass) return "download";
  if (!wantPass && count > EXPORT_CAP) return "over_cap";
  return passOnSale ? "offer" : "no_pass";
}

export function overCapCopy(mode: "filters" | "cart", count: number): { title: string; body: string } {
  const n = count.toLocaleString("en-IN");
  return {
    title: "Too many questions for one paper",
    body:
      mode === "cart"
        ? `A paper can hold up to ${EXPORT_CAP} questions, and your selection has ${n}. Remove some, then download.`
        : `A paper can hold up to ${EXPORT_CAP} questions, and these filters match ${n}. Narrow them by chapter, subtopic or year, then download.`,
  };
}
