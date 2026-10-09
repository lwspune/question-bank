/**
 * Export access gate (pure — no I/O, importable from both the API route and the
 * client DownloadDialog so the two never diverge).
 *
 *   - paper / key  → org STAFF, or anyone holding the Premium Pass, or a
 *     signed-in account taking its ONE free download (2026-10-04).
 *   - tags (.xlsx nda-tracker sheet) → org staff only.
 *   - ppt (.pptx classroom slide deck) → org staff only. A projected question
 *     deck is a teaching artifact, so it belongs to the provisioned-institute tier.
 *   - anon         → nothing. Browsing + preview stay free.
 *
 * History: staff only from 2026-07-18; a separate ₹499 Teacher Pass from
 * 2026-09-26; from 2026-10-01 the ONE ₹99 pass unlocks the paper + key for
 * students and teachers alike — 44 of 52 "teacher access" requests had come
 * from students, and a teacher cannot be verified anyway.
 *
 * BRANDING (2026-10-01): a pass download carries the PYQ Vault watermark +
 * footer; an institute's own staff download never does (the owner's call that
 * institute papers stay unbranded). Decided HERE, on the same inputs that
 * decide access, so the route cannot brand a staff paper by mistake.
 *
 * FREE DOWNLOAD (2026-10-04): every account may take one file, paper or
 * key, before paying, so a visitor sees the proof. It is branded like a pass
 * paper, and `free: true` tells the route to record the use (one row per
 * account in `free_downloads`, which is what makes it once). Staff and pass
 * holders never spend it.
 *
 * FORMAT (2026-10-05): the paper and key reach everyone without staff access
 * as a PDF, because they open them on phones, where Word's two columns and
 * equations break. Institute staff keep the Word file, which they edit. It is
 * decided here with branding, from the same inputs, and today the two always
 * agree (branded = PDF): kept as two fields because they answer different
 * questions, and a later change may part them.
 *
 * Denials carry the HTTP status the route should return (401 = not signed in,
 * 403 = signed in without staff or a pass) plus a user-facing message.
 */
import { SCOPE_MOCKS } from "@/lib/entitlements/access";

/**
 * The entitlement scope that unlocks paper + key downloads: the scope the
 * Premium Pass is sold under. "teacher" (the retired ₹499 pass) and "all"
 * both cover it through scopeCovers, so no older grant loses anything.
 */
export const DOWNLOAD_PASS_SCOPE = SCOPE_MOCKS;

export type ExportKind = "paper" | "key" | "tags" | "ppt";

/** The file a paper or key is served as; absent for slides and the tags sheet. */
export type PaperFormat = "pdf" | "docx";

export type ExportAccess =
  | { allowed: true; branded: boolean; format?: PaperFormat; free?: true }
  | { allowed: false; status: 401 | 403; message: string };

export function resolveExportAccess(input: {
  kind: ExportKind;
  isSignedIn: boolean;
  isStaff: boolean;
  /** Active pass that unlocks downloads (see DOWNLOAD_PASS_SCOPE). */
  hasDownloadPass?: boolean;
  /**
   * The account's one free download: true = unused, false = used, undefined =
   * not looked up (the caller does not offer it, and the old message stands).
   */
  freeDownloadLeft?: boolean;
}): ExportAccess {
  const { kind, isSignedIn, isStaff, hasDownloadPass = false, freeDownloadLeft } = input;
  const paperOrKey = kind === "paper" || kind === "key";

  if (!isSignedIn) {
    return { allowed: false, status: 401, message: "Sign in to download." };
  }
  if (isStaff) return paperOrKey ? { allowed: true, branded: false, format: "docx" } : { allowed: true, branded: false };
  if (hasDownloadPass && paperOrKey) return { allowed: true, branded: true, format: "pdf" };
  if (freeDownloadLeft === true && paperOrKey) return { allowed: true, branded: true, format: "pdf", free: true };
  return {
    allowed: false,
    status: 403,
    message: !paperOrKey
      ? "This download is for institute staff accounts."
      : freeDownloadLeft === false
      ? "You've had your free paper. Every paper with its answer key comes with the Premium Pass."
      : "Question paper and answer key downloads come with the Premium Pass.",
  };
}

/**
 * The format a paper is served in. Institute staff may ask for the PDF as well
 * as their Word file (the daily homework page offers both, 2026-10-09);
 * everyone else gets what the gate granted, whatever the request says.
 */
export function chooseFormat(input: {
  granted: PaperFormat;
  isStaff: boolean;
  requested: unknown;
}): PaperFormat {
  if (input.isStaff && (input.requested === "pdf" || input.requested === "docx")) return input.requested;
  return input.granted;
}
