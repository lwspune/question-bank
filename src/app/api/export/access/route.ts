import { NextResponse, type NextRequest } from "next/server";
import { getPageIdentity } from "@/lib/auth";
import { sessionHasAnyScope } from "@/lib/entitlements/session";
import { sessionFormulaSheetFree, sessionPaperFree } from "@/lib/export/freeDownloadSession";
import { formulaSheetKey, parseFormulaSheetTarget } from "@/lib/export/formulaSheet";
import { paperKey } from "@/lib/export/freePaper";
import { parseHomeworkTarget } from "@/lib/homework/dayExport";
import { parseTopPyqsTarget } from "@/lib/homework/topPyqs";
import { parseBoardPaperTarget } from "@/lib/questionPapers/exportPlan";
import { passCta, passForBuyer, type PassCta } from "@/lib/billing/plans";
import { passScopesFor } from "@/lib/billing/passScope";
import { readCountry } from "@/lib/acquisition/country";
import { listActivePlansCached } from "@/lib/billing/plansQuery";
import { planSiteForHost } from "@/lib/sites/intl";
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

export async function GET(request: NextRequest) {
  // The paper the box is for (a past paper's slug), so a paper already taken
  // free still reads as free: its other file is part of the same free paper.
  // Or one homework day, as "<plan-slug>:<day>".
  const slug = request.nextUrl.searchParams.get("mockSlug");
  const [hwSlug, hwDay] = (request.nextUrl.searchParams.get("homework") ?? "").split(":");
  const homework = parseHomeworkTarget({ slug: hwSlug, day: Number(hwDay) });
  // Or one board past paper set, as "<exam-slug>:<paper-slug>" (2026-10-09).
  const [bExam, bSlug] = (request.nextUrl.searchParams.get("board") ?? "").split(":");
  const boardPaper = parseBoardPaperTarget({ exam: bExam, slug: bSlug });
  // Or one /board chapter's top PYQs, as "<plan-slug>:<chapter-id>" (2026-10-13).
  const [tPlan, tChapter] = (request.nextUrl.searchParams.get("top") ?? "").split(":");
  const topPyqs = parseTopPyqsTarget({ plan: tPlan, chapter: tChapter });
  const freeKey = paperKey({
    mockSlug: slug && /^[a-z0-9-]{1,120}$/.test(slug) ? slug : null,
    homework,
    boardPaper,
    topPyqs,
  });
  // Or one chapter's formula sheet, as "<subjectRoute>/<chapterSlug>" (2026-10-10):
  // then `freeDownloadLeft` answers for the free SHEET, which is its own file,
  // apart from the free paper.
  const sheet = parseFormulaSheetTarget(request.nextUrl.searchParams.get("formula") ?? undefined);
  // The passes this site sells (0206): www the Premium Pass, intl its exams'.
  const site = planSiteForHost(request.headers.get("host"));
  const scopes = passScopesFor(site);
  let viewer = ANON;
  try {
    const { isSignedIn, isStaff } = await getPageIdentity();
    if (isSignedIn) {
      const hasDownloadPass = !isStaff && (await sessionHasAnyScope(scopes));
      viewer = {
        signedIn: true,
        isStaff,
        hasDownloadPass,
        freeDownloadLeft:
          !isStaff &&
          !hasDownloadPass &&
          (sheet ? await sessionFormulaSheetFree(formulaSheetKey(sheet)) : await sessionPaperFree(freeKey)),
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
      pass = passCta(
        passForBuyer(await listActivePlansCached(), scopes[0], site, readCountry(request.headers))
      );
    } catch (err) {
      console.error("export access: plans read failed", err);
    }
  }
  const body: ExportViewerAccess = { ...viewer, pass };
  return NextResponse.json(body, { headers: { "Cache-Control": "private, no-store" } });
}
