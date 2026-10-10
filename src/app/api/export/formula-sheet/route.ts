import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { resolveExportAccess, DOWNLOAD_PASS_SCOPE } from "@/lib/export/access";
import { userHasAccess } from "@/lib/entitlements/query";
import { recordExportEvent } from "@/lib/export/log";
import { readPaywallSettings } from "@/lib/billing/admin";
import type { BrandingParts } from "@/lib/export/branding";
import { formulaSheetKey, parseFormulaSheetTarget } from "@/lib/export/formulaSheet";
import { claimFreeFormulaSheet, isFormulaSheetFree } from "@/lib/export/freeFormulaSheet";
import { buildFormulaSheetHtml, formulaSheetFilename } from "@/lib/export/pdf/formulaSheetHtml";
import { pdfHead } from "@/lib/export/pdf/assets";
import { printPdf } from "@/lib/export/pdf/printPdf";
import { PDF_CONTENT_TYPE } from "@/lib/export/fileType";
import { getNotesChapterBySlug } from "@/lib/notes/chapters";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";

/**
 * POST /api/export/formula-sheet (2026-10-10): one /notes chapter's formula
 * sheet as a PDF. Body: { subjectRoute, chapterSlug }.
 *
 * Its OWN route rather than a shape on /api/export: the sheet is built from
 * the notes registry (1,884 data modules), which must not join the paper
 * route's bundle (the 2026-10-02 bundle incident). The gate, the branding
 * switches, the log row and the rate limit are the paper's, through the same
 * helpers, so the two routes cannot disagree about who may download.
 *
 * Order: rate limit → body → chapter lookup (a registry read, free) → gate →
 * print → claim the free sheet → log → serve. The free sheet is claimed AFTER
 * the print and the file is served only on a won claim, so a failed print
 * never spends it and a racing second tap gets the refusal. There is no Word
 * fallback: a failed print is an error, logged, and the box tells the student
 * to try again.
 */
export const maxDuration = 60;

const HOUR_MS = 60 * 60 * 1000;
const ANON_LIMIT = 20;
const STUDENT_LIMIT = 50;
const AUTHED_LIMIT = 200;

export async function POST(request: NextRequest) {
  try {
    let member = null;
    try {
      member = await getSessionMember();
    } catch {
      member = null;
    }
    let user = member?.user ?? null;
    if (!member) {
      try {
        user = await getSessionUser();
      } catch {
        user = null;
      }
    }
    const isStaff = !!member;
    const isSignedIn = !!user;
    const hasDownloadPass =
      user && !isStaff ? await userHasAccess(createSupabaseServerClient(), user.id, DOWNLOAD_PASS_SCOPE) : false;

    const bucket = user ? `export:user:${user.id}` : `export:anon:${getClientIp(request)}`;
    const limit = isStaff || hasDownloadPass ? AUTHED_LIMIT : isSignedIn ? STUDENT_LIMIT : ANON_LIMIT;
    const admin = createSupabaseAdminClient();
    const rl = await checkAndIncrement(admin, bucket, { limit, windowMs: HOUR_MS });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many downloads for now. Please try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const target = parseFormulaSheetTarget(body);
    if (!target) {
      return NextResponse.json({ error: "Send the chapter: subjectRoute and chapterSlug." }, { status: 400 });
    }
    const chapter = getNotesChapterBySlug(target.subjectRoute, target.chapterSlug);
    if (!chapter) {
      return NextResponse.json({ error: "That chapter has no formula sheet." }, { status: 404 });
    }

    const sheetKey = formulaSheetKey(target);
    const freeDownloadLeft =
      user && !isStaff && !hasDownloadPass
        ? await isFormulaSheetFree(createSupabaseServerClient(), user.id, sheetKey)
        : undefined;
    const access = resolveExportAccess({ kind: "formula", isSignedIn, isStaff, hasDownloadPass, freeDownloadLeft });
    if (!access.allowed) {
      return NextResponse.json({ error: access.message }, { status: access.status });
    }

    // The owner's branding switches (migration 0138): read only for a branded
    // sheet; a failed read keeps every piece on rather than shipping it clean.
    let brandParts: Partial<BrandingParts> | undefined;
    if (access.branded) {
      const settings = await readPaywallSettings();
      if (settings.kind === "ok") {
        brandParts = {
          watermark: settings.settings.brandWatermark,
          siteUrl: settings.settings.brandSiteUrl,
          nameLine: settings.settings.brandNameLine,
        };
      } else {
        console.error("formula sheet: branding switches unreadable, keeping full branding", settings.message);
      }
    }

    let pdf: Buffer;
    try {
      pdf = await printPdf(
        buildFormulaSheetHtml({ chapter, head: pdfHead(), branded: access.branded, brandingParts: brandParts })
      );
    } catch (err) {
      console.error("formula sheet pdf failed", err);
      return NextResponse.json(
        { error: "The sheet could not be prepared right now. Please try again in a minute." },
        { status: 503 }
      );
    }

    if (access.free && user) {
      const won = await claimFreeFormulaSheet(admin, user.id, sheetKey);
      if (!won) {
        return NextResponse.json(
          { error: "You've had your free formula sheet. Every chapter's formula sheet comes with the Premium Pass." },
          { status: 403 }
        );
      }
    }

    await recordExportEvent({
      userId: user?.id ?? null,
      orgId: member?.orgId ?? null,
      kind: "formula",
      questionCount: 0,
      mode: "formula",
      formulaSheet: `${target.subjectRoute}/${target.chapterSlug}`,
      isStaff,
    });

    const filename = formulaSheetFilename(chapter.subjectDisplay, chapter.chapter.chapterName);
    return new NextResponse(pdf as unknown as ArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": PDF_CONTENT_TYPE,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(pdf.length),
      },
    });
  } catch (err) {
    console.error("formula sheet route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
