/**
 * Export access gate (pure — no I/O, importable from both the API route and the
 * client DownloadDialog so the two never diverge).
 *
 *   - paper / key  → org STAFF, or anyone holding the Premium Pass.
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

export type ExportAccess =
  | { allowed: true; branded: boolean }
  | { allowed: false; status: 401 | 403; message: string };

export function resolveExportAccess(input: {
  kind: ExportKind;
  isSignedIn: boolean;
  isStaff: boolean;
  /** Active pass that unlocks downloads (see DOWNLOAD_PASS_SCOPE). */
  hasDownloadPass?: boolean;
}): ExportAccess {
  const { kind, isSignedIn, isStaff, hasDownloadPass = false } = input;
  const wordDoc = kind === "paper" || kind === "key";

  if (!isSignedIn) {
    return { allowed: false, status: 401, message: "Sign in to download." };
  }
  if (isStaff) return { allowed: true, branded: false };
  if (hasDownloadPass && wordDoc) return { allowed: true, branded: true };
  return {
    allowed: false,
    status: 403,
    message: wordDoc
      ? "Word paper downloads come with the Premium Pass."
      : "This download is for institute staff accounts.",
  };
}
