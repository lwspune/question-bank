import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { resolveExportAccess } from "@/lib/export/access";
import { userHasAnyAccess } from "@/lib/entitlements/query";
import { downloadScopesFor } from "@/lib/billing/passScope";
import { planSiteForHost } from "@/lib/sites/intl";
import { recordExportEvent } from "@/lib/export/log";
import { readPaywallSettings } from "@/lib/billing/admin";
import type { BrandingParts } from "@/lib/export/branding";
import { parseRevisionTarget } from "@/lib/board/revision/target";
import { loadRevisionSheet, revisionKey } from "@/lib/board/revision/registry";
import { buildRevisionSheetHtml, revisionSheetFilename } from "@/lib/export/pdf/revisionSheetHtml";
import { pdfHead } from "@/lib/export/pdf/assets";
import { printPdf } from "@/lib/export/pdf/printPdf";
import { PDF_CONTENT_TYPE } from "@/lib/export/fileType";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";

/**
 * POST /api/export/revision-sheet (2026-11-03): one /board chapter's quick-
 * revision sheet as a PDF. Body: { examSlug, subjectRoute, chapterSlug }.
 *
 * The formula-sheet route's shape (rate limit → body → registry lookup → gate
 * → print → log → serve) and the same gate, branding switches and log, minus
 * the free first copy: a revision sheet is a Premium Pass download (owner).
 * The page itself, with every section of the sheet, stays free to read.
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
      user && !isStaff
        ? await userHasAnyAccess(
            createSupabaseServerClient(),
            user.id,
            downloadScopesFor(planSiteForHost(request.headers.get("host")))
          )
        : false;

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
    const target = parseRevisionTarget(body);
    if (!target) {
      return NextResponse.json({ error: "Send the chapter: examSlug, subjectRoute and chapterSlug." }, { status: 400 });
    }
    const sheet = await loadRevisionSheet(target);
    if (!sheet) {
      return NextResponse.json({ error: "That chapter has no revision sheet." }, { status: 404 });
    }

    const access = resolveExportAccess({ kind: "revision", isSignedIn, isStaff, hasDownloadPass });
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
        console.error("revision sheet: branding switches unreadable, keeping full branding", settings.message);
      }
    }

    let pdf: Buffer;
    try {
      pdf = await printPdf(
        buildRevisionSheetHtml({ sheet, head: pdfHead(), branded: access.branded, brandingParts: brandParts })
      );
    } catch (err) {
      console.error("revision sheet pdf failed", err);
      return NextResponse.json(
        { error: "The sheet could not be prepared right now. Please try again in a minute." },
        { status: 503 }
      );
    }

    await recordExportEvent({
      userId: user?.id ?? null,
      orgId: member?.orgId ?? null,
      kind: "revision",
      questionCount: 0,
      mode: "revision",
      revisionSheet: revisionKey(target),
      isStaff,
    });

    const filename = revisionSheetFilename(sheet.subjectName, sheet.chapterName);
    return new NextResponse(pdf as unknown as ArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": PDF_CONTENT_TYPE,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(pdf.length),
      },
    });
  } catch (err) {
    console.error("revision sheet route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
