import { NextResponse } from "next/server";
import { getPageIdentity } from "@/lib/auth";
import { sessionHasScope } from "@/lib/entitlements/session";
import { sessionFreeDownloadLeft } from "@/lib/export/freeDownloadSession";
import { DOWNLOAD_PASS_SCOPE } from "@/lib/export/access";
import { passCta, passForScope, type PassCta } from "@/lib/billing/plans";
import { listActivePlansCached } from "@/lib/billing/plansQuery";
import type { ExportViewerAccess } from "@/lib/export/viewerAccess";

/**
 * What the download box needs to know about the viewer (2026-10-07).
 *
 * The past-paper download box sits on cached pages (the /mock lists), which are
 * one copy served to everyone and so cannot say who is looking. The box asks
 * here when it opens, and again after a sign-in or a payment, where /browse
 * instead re-renders its server page. Same helpers as /browse, so the two
 * cannot disagree; /api/export enforces the gate again either way.
 */
const ANON: Omit<ExportViewerAccess, "pass"> = {
  signedIn: false,
  isStaff: false,
  hasDownloadPass: false,
  freeDownloadLeft: false,
};

export async function GET() {
  let viewer = ANON;
  try {
    const { isSignedIn, isStaff } = await getPageIdentity();
    if (isSignedIn) {
      const hasDownloadPass = !isStaff && (await sessionHasScope(DOWNLOAD_PASS_SCOPE));
      viewer = {
        signedIn: true,
        isStaff,
        hasDownloadPass,
        freeDownloadLeft: !isStaff && !hasDownloadPass && (await sessionFreeDownloadLeft()),
      };
    }
  } catch {
    // No request scope (cookies unavailable): answer as signed out. The
    // download route checks again, so a wrong "signed out" only costs a tap.
    viewer = ANON;
  }
  let pass: PassCta | null = null;
  if (!viewer.isStaff && !viewer.hasDownloadPass) {
    try {
      pass = passCta(passForScope(await listActivePlansCached(), DOWNLOAD_PASS_SCOPE));
    } catch (err) {
      console.error("export access: plans read failed", err);
    }
  }
  const body: ExportViewerAccess = { ...viewer, pass };
  return NextResponse.json(body, { headers: { "Cache-Control": "private, no-store" } });
}
