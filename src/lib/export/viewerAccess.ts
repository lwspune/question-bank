import type { PassCta } from "@/lib/billing/plans";

/**
 * What the download box needs to know about the viewer: the answer of
 * GET /api/export/access, read by the past-paper box on cached pages.
 */
export type ExportViewerAccess = {
  signedIn: boolean;
  isStaff: boolean;
  hasDownloadPass: boolean;
  freeDownloadLeft: boolean;
  /** The pass on sale that unlocks downloads; null when none is (or for staff and holders). */
  pass: PassCta | null;
};
