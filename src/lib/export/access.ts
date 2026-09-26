/**
 * Export access gate (pure — no I/O, importable from both the API route and the
 * client DownloadDialog so the two never diverge).
 *
 * Tiers (all three now require org staff — 2026-07-18):
 *   - paper / key  → org STAFF only (teacher/admin accounts). A downloadable Word
 *                    paper is a teacher artifact — students get the online product
 *                    (preview, timed mocks, notes) instead, so download is scoped
 *                    to provisioned teachers. Was "any signed-in account".
 *   - tags (.xlsx nda-tracker sheet) → org staff only (unchanged).
 *   - ppt (.pptx classroom slide deck) → org staff only. A projected question
 *     deck is a teaching artifact, so it sits in the same tier as the paper.
 *   - anon         → nothing. Browsing + preview stay free.
 *
 * A signed-in student (no org membership) is NOT staff, so they're denied 403 —
 * the UI turns that into a "request teacher access" prompt rather than a sign-in
 * one, since signing in as a student wouldn't unlock the download.
 *
 * TEACHER PASS (2026-09-26): a paid pass (entitlement scope "teacher") lets an
 * account with no org download the Word paper + answer key. Slides and the tag
 * sheet stay org-staff only — they belong to the provisioned-institute tier.
 *
 * Denials carry the HTTP status the route should return (401 = not signed in,
 * 403 = signed in but not staff) plus a user-facing message.
 */
export type ExportKind = "paper" | "key" | "tags" | "ppt";

export type ExportAccess =
  | { allowed: true }
  | { allowed: false; status: 401 | 403; message: string };

export function resolveExportAccess(input: {
  kind: ExportKind;
  isSignedIn: boolean;
  isStaff: boolean;
  /** Active Teacher Pass (entitlement scope "teacher"). */
  hasTeacherPass?: boolean;
}): ExportAccess {
  const { kind, isSignedIn, isStaff, hasTeacherPass = false } = input;

  // Every downloadable artifact is staff-only. Distinguish anon (401) from a
  // signed-in-but-not-staff student (403) so the route + UI can respond in kind.
  if (!isSignedIn) {
    return {
      allowed: false,
      status: 401,
      message: "Sign in with a teacher account to download.",
    };
  }
  if (!isStaff) {
    if (hasTeacherPass && (kind === "paper" || kind === "key")) return { allowed: true };
    return {
      allowed: false,
      status: 403,
      message:
        kind === "paper" || kind === "key"
          ? "Downloads are for teachers. Get a Teacher Pass for instant access, or request teacher access."
          : "This download is for institute staff accounts.",
    };
  }
  return { allowed: true };
}
