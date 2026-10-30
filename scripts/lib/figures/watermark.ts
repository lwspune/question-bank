/**
 * Ingestion watermark check for figure images. Spec: tests/figure-watermark.test.ts.
 *
 * WHY IT EXISTS. A source scan can carry a printed watermark that is not part
 * of the paper: the ISC 2026 question papers print a light-blue diagonal
 * candidate serial number across every page, and on 2026-10-30 twelve figures
 * shipped with it showing (since re-cropped). A watermark is invisible to every
 * text gate, so it is checked on the IMAGE, before it is uploaded.
 *
 * WHY IT FLAGS RATHER THAN DECIDES. Measured on the CISCE sources: the
 * watermark's light blues (RGB ~160-230, 200-250, 220-250) are the same colours
 * as graph-paper grids and light-blue fills in clean figures (seven 2025 ICSE
 * figures score above the threshold with no watermark at all), and a page-level
 * test fails too, because CISCE's 2025 reports print blue banners on every page.
 * So a figure over the threshold is refused until a person has looked at it and
 * either cleaned it (crop-figures.py strips the 2026 watermark) or recorded
 * `figure.watermark = "none"`.
 *
 * Any ingestion lane that uploads figures should run its images through
 * `checkFigureFile` before upload (scripts/cisce-pyq/commit.ts does).
 */

/** Share of watermark-blue pixels above which a figure must be looked at. */
export const WATERMARK_THRESHOLD = 0.002;

/**
 * Share of pixels in the colour band the ISC 2026 serial watermark is printed
 * in: blue clearly above red, blue at least green (green graph paper fails
 * this), and light (a dark blue ink line fails this).
 */
export function watermarkFraction(data: Uint8Array, channels: number): number {
  const n = Math.floor(data.length / channels);
  if (!n) return 0;
  let hits = 0;
  for (let i = 0; i < n; i++) {
    const o = i * channels;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    if (b - r > 18 && b >= g && b > 150) hits++;
  }
  return hits / n;
}

/**
 * The refusal for one figure, or null. `declared` is the figure's recorded
 * verdict: "none" once a person has looked and seen no watermark.
 */
export function figureWatermarkIssue(ref: string, fraction: number, declared?: string): string | null {
  if (fraction < WATERMARK_THRESHOLD || declared === "none") return null;
  return (
    `${ref}: figure may carry a watermark (${(fraction * 100).toFixed(2)}% light-blue pixels). ` +
    `Look at it: clean it (crop-figures.py), or if it has none set figure.watermark = "none".`
  );
}

/** Score an image file on disk. */
export async function checkFigureFile(path: string): Promise<number> {
  const sharp = (await import("sharp")).default;
  const { data, info } = await sharp(path).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return watermarkFraction(new Uint8Array(data.buffer, data.byteOffset, data.length), info.channels);
}
