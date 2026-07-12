/**
 * Export access gate (pure — no I/O, importable from both the API route and the
 * client DownloadDialog so the two never diverge).
 *
 * Tiers:
 *   - paper / key  → any signed-in user (self-serve student OR org staff).
 *   - tags (.xlsx nda-tracker sheet) → org staff only (teacher/admin accounts).
 *   - anon         → nothing. Browsing + preview stay free; the download is the
 *                    sign-in gate.
 *
 * Denials carry the HTTP status the route should return (401 = not signed in,
 * 403 = signed in but not staff) plus a user-facing message.
 */
export type ExportKind = "paper" | "key" | "tags";

export type ExportAccess =
  | { allowed: true }
  | { allowed: false; status: 401 | 403; message: string };

export function resolveExportAccess(input: {
  kind: ExportKind;
  isSignedIn: boolean;
  isStaff: boolean;
}): ExportAccess {
  const { kind, isSignedIn, isStaff } = input;

  if (kind === "tags") {
    if (!isSignedIn) {
      return { allowed: false, status: 401, message: "Sign in to download." };
    }
    if (!isStaff) {
      return {
        allowed: false,
        status: 403,
        message: "The tagged sheet is available to LWS staff accounts only.",
      };
    }
    return { allowed: true };
  }

  // paper | key — any signed-in account.
  if (!isSignedIn) {
    return {
      allowed: false,
      status: 401,
      message: "Sign in to download the question paper and answer key.",
    };
  }
  return { allowed: true };
}
