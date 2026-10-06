import type { PaperFormat } from "./access";

/**
 * Builds the question paper or answer key in the format the gate chose, with a
 * safety net (2026-10-07): when the PDF fails to print, the student gets the
 * Word file instead of an error, and `onPdfFailure` reports why, so the log
 * still shows the PDF is broken. A Word failure is not caught; there is
 * nothing left to fall back to.
 */
export async function buildPaperFile(
  format: PaperFormat,
  build: {
    buildPdf: () => Promise<Buffer>;
    buildDocx: () => Promise<Buffer>;
    onPdfFailure: (err: unknown) => void;
  }
): Promise<{ format: PaperFormat; buf: Buffer }> {
  if (format === "pdf") {
    try {
      return { format: "pdf", buf: await build.buildPdf() };
    } catch (err) {
      build.onPdfFailure(err);
    }
  }
  return { format: "docx", buf: await build.buildDocx() };
}
