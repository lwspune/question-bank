"use client";

/**
 * A screen-only "Save as PDF" button on the print handout, hidden by
 * `@media print` so it never appears in the output. Its one client sibling is
 * HandoutAutoPrint, which opens the same dialog when the chapter's
 * "Download as PDF" link asked for it.
 */
export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()}>
      Save as PDF
    </button>
  );
}
