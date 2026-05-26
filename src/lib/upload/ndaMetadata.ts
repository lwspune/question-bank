/**
 * NDA paper canonical convention.
 *
 * NDA runs exactly two papers per year — `Apr ⇒ NDA 1` and `Sep ⇒ NDA 2`.
 * UPSC has never run a retest or "Shift 2". Anything else is an
 * upload-form metadata error and must be rejected at the request
 * boundary so the /browse provenance bracket + future analytics stay
 * structurally clean.
 *
 * History: 4 batches were misfiled in the bank between 2017–2025 and
 * corrected by SQL UPDATE on 2026-05-26 (see CLAUDE.md decisions log +
 * [[nda-paper-canonical]] memory). This module is the upload-form guard
 * that prevents the same mistake going forward.
 *
 * Scope: pure functions only. The /api/upload/preview route uses these
 * for server-side validation; the upload form UI uses them to drive a
 * conditional Month select + auto-pair Note display.
 */

export const NDA_MONTHS = ["Apr", "Sep"] as const;
export type NdaMonth = (typeof NDA_MONTHS)[number];

export const NDA_MONTH_TO_NOTE: Record<NdaMonth, "NDA 1" | "NDA 2"> = {
  Apr: "NDA 1",
  Sep: "NDA 2",
};

/**
 * Map a free-form month string to its canonical NDA paper note, or null
 * if the month isn't one of NDA's two valid sittings. Case-sensitive on
 * purpose — the DB stores title-case ("Apr"/"Sep") and silent-lowering
 * here would mask input-shape bugs.
 */
export function getNdaPaperFromMonth(
  month: string | null | undefined
): "NDA 1" | "NDA 2" | null {
  if (!month) return null;
  if (month === "Apr") return NDA_MONTH_TO_NOTE.Apr;
  if (month === "Sep") return NDA_MONTH_TO_NOTE.Sep;
  return null;
}

/**
 * Validate an (`pyq_month`, `pyq_note`) pair against the NDA convention.
 *
 * Returns true when:
 * - both fields are absent (incomplete metadata is allowed at this
 *   layer — the form treats PYQ details as optional, with the caveat
 *   that incomplete uploads produce no provenance bracket)
 * - the pair matches one of the two canonical mappings
 *
 * Returns false when:
 * - only one field is set (partial pair = strong signal of upload error)
 * - both fields are set but the pair is non-canonical
 */
export function isNdaCanonical(args: {
  month: string | null | undefined;
  note: string | null | undefined;
}): boolean {
  const month = args.month ?? "";
  const note = args.note ?? "";

  if (month === "" && note === "") return true;
  if (month === "" || note === "") return false;

  const expected = getNdaPaperFromMonth(month);
  return expected !== null && expected === note;
}
