"use client";

/**
 * The only client JS on the print handout — a screen-only "Save as PDF"
 * button. Hidden by `@media print` so it never appears in the output.
 */
export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()}>
      Save as PDF
    </button>
  );
}
