import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAnonClient, createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSessionMember, getSessionUser } from "@/lib/auth";
import { chooseFormat, resolveExportAccess, DOWNLOAD_PASS_SCOPE, type ExportKind } from "@/lib/export/access";
import { userHasAccess } from "@/lib/entitlements/query";
import { recordExportEvent } from "@/lib/export/log";
import { readPaywallSettings } from "@/lib/billing/admin";
import type { BrandingParts } from "@/lib/export/branding";
import { claimFreeDownload, isPaperFree } from "@/lib/export/freeDownload";
import { paperKey } from "@/lib/export/freePaper";
import {
  claimMockPaperDownload,
  decideMockPaperDownload,
  mockPaperLimitMessage,
  readTodaysMockPapers,
} from "@/lib/export/mockPaperLimit";
import { applyExportLanguage, parseExportLang } from "@/lib/export/exportLanguage";
import {
  queryQuestions,
  queryQuestionsByIds,
  type QuestionRow,
} from "@/lib/questions/query";
import { coerceFormat, type Filters } from "@/lib/questions/filters";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import {
  buildQuestionPaper,
  buildAnswerKey,
} from "@/lib/export/docxBuilder";
import { buildQuestionSlides } from "@/lib/export/pptxBuilder";
import { buildKeyHtml, buildPaperHtml } from "@/lib/export/pdf/paperHtml";
import { pdfHead } from "@/lib/export/pdf/assets";
import { printPdf } from "@/lib/export/pdf/printPdf";
import { imageDataUris } from "@/lib/export/pdf/images";
import { PPTX_CONTENT_TYPE } from "@/lib/export/pptxParts";
import { DOCX_CONTENT_TYPE, PDF_CONTENT_TYPE, XLSX_CONTENT_TYPE } from "@/lib/export/fileType";
import { buildPaperFile } from "@/lib/export/paperFile";
import { getMockBySlug } from "@/lib/mocks/query";
import { mockPaperExport } from "@/lib/mocks/paperExport";
import { homeworkDayExport, parseHomeworkTarget } from "@/lib/homework/dayExport";
import { getPlanDay } from "@/lib/homework/query";
import { buildTagRows, tagRowsToAoa } from "@/lib/export/tagsSheet";
import { getResourceTagsForQuestions } from "@/lib/links/getResourceTagsForQuestions";
import { downloadImage } from "@/lib/storage/images";
import * as XLSX from "xlsx";

// 60 s covered every Word export; a PDF also starts a Chromium (a cold one
// unpacks itself first) and may wait behind another print on the same
// instance (printPdf queues them), so it gets more room.
export const maxDuration = 120;

const EXPORT_CAP = 200;
const HOUR_MS = 60 * 60 * 1000;
// A full export is now two requests (Paper + Key); limits doubled so the
// user-perceived per-hour cap stays roughly what it was under the old ZIP shape.
const ANON_LIMIT = 20;
const STUDENT_LIMIT = 50;
const AUTHED_LIMIT = 200;


// "tags" = the nda-tracker enrichment sheet (.xlsx) — same question set as the
// paper, numbered identically, so it imports without any hand-typing.
// ExportKind + the access gate live in @/lib/export/access (shared with the UI).

type ExportOptions = {
  title?: string;
  includeSolutions?: boolean;
  groupBySubtopic?: boolean;
  /** Print `[JEE Mains 2016]` after each PYQ's stem. Question paper only. */
  includeSourceTag?: boolean;
  /**
   * Printed language for questions that carry a translation (MPSC Marathi,
   * migration 0118): "en" | "mr" | "both". Anything else is English, so an
   * older client exports exactly as before.
   */
  lang?: string;
  /** "pdf" | "docx": institute staff may choose; ignored for everyone else. */
  format?: string;
};

// Filter-mode, cart-mode, or a past paper by slug (2026-10-07); exactly one.
type Body = {
  kind?: ExportKind;
  filters?: Filters;
  questionIds?: string[];
  /** A published past paper, downloaded whole as its paper or key. */
  mockSlug?: unknown;
  /** One day of a published homework plan: { slug, day } (2026-10-09). */
  homework?: unknown;
  options?: ExportOptions;
};

export async function POST(request: NextRequest) {
  try {
    // Rate limit BEFORE payload parsing so junk requests still count toward
    // the bucket (basic abuse protection — can't burn the limit by sending
    // garbage and observing 400s for free).
    // getSessionMember reads cookies via next/headers; outside a real
    // request scope (e.g. integration tests calling POST directly) it
    // throws. Treat that as anon — the IP-based bucket still applies.
    let member = null;
    try {
      member = await getSessionMember();
    } catch {
      member = null;
    }
    // A self-serve student has no org membership — resolve the user directly so
    // paper/key downloads (any signed-in account) can be told apart from anon.
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
    // The Premium Pass: a paid grant that unlocks paper + key without an org.
    const hasDownloadPass =
      user && !isStaff
        ? await userHasAccess(createSupabaseServerClient(), user.id, DOWNLOAD_PASS_SCOPE)
        : false;
    const bucket = user
      ? `export:user:${user.id}`
      : `export:anon:${getClientIp(request)}`;
    const limit =
      isStaff || hasDownloadPass ? AUTHED_LIMIT : isSignedIn ? STUDENT_LIMIT : ANON_LIMIT;

    const admin = createSupabaseAdminClient();
    const rl = await checkAndIncrement(admin, bucket, {
      limit,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        {
          error: `Rate limit exceeded — try again in ${formatRetry(rl.retryAfter)}.`,
          retryAfter: rl.retryAfter,
          limit: rl.limit,
          used: rl.used,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rl.retryAfter) },
        }
      );
    }

    let body: Body;
    try {
      body = (await request.json()) as Body;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    if (
      body.kind !== "paper" &&
      body.kind !== "key" &&
      body.kind !== "tags" &&
      body.kind !== "ppt"
    ) {
      return NextResponse.json(
        { error: "kind must be 'paper', 'key', 'tags' or 'ppt'" },
        { status: 400 }
      );
    }
    const kind: ExportKind = body.kind;
    if (!body.options) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    const options = body.options;
    const isCartMode = Array.isArray(body.questionIds);
    const isMockMode = body.mockSlug !== undefined;
    const isHomeworkMode = body.homework !== undefined;
    const homework = isHomeworkMode ? parseHomeworkTarget(body.homework) : null;
    if (isHomeworkMode) {
      if (!homework) {
        return NextResponse.json({ error: "homework must name a plan and a day" }, { status: 400 });
      }
      if (body.filters || isCartMode || isMockMode) {
        return NextResponse.json(
          { error: "Send a homework day, a past paper, filters or questionIds, not more than one" },
          { status: 400 }
        );
      }
      if (kind !== "paper" && kind !== "key") {
        return NextResponse.json(
          { error: "A homework day downloads as its question paper or answer key" },
          { status: 400 }
        );
      }
    } else if (isMockMode) {
      if (typeof body.mockSlug !== "string" || !body.mockSlug.trim()) {
        return NextResponse.json({ error: "mockSlug must name a past paper" }, { status: 400 });
      }
      if (body.filters || isCartMode) {
        return NextResponse.json(
          { error: "Send a past paper, filters or questionIds, not more than one" },
          { status: 400 }
        );
      }
      if (kind !== "paper" && kind !== "key") {
        return NextResponse.json(
          { error: "A past paper downloads as its question paper or answer key" },
          { status: 400 }
        );
      }
    } else if (!body.filters && !isCartMode) {
      return NextResponse.json(
        { error: "Either filters or questionIds is required" },
        { status: 400 }
      );
    }
    if (body.filters && isCartMode) {
      return NextResponse.json(
        { error: "Send filters or questionIds, not both" },
        { status: 400 }
      );
    }

    // Download gate: staff, or the pass for paper/key. Enforced server-side
    // (never trust the hidden UI buttons), after the cheap payload validation
    // and before the expensive query. It also decides branding: pass downloads
    // carry the PYQ Vault watermark + footer, institute staff ones do not.
    // The one free download (2026-10-04): looked up only for an account that
    // would otherwise be refused a Word file, so staff and pass holders never
    // pay a query for it and never spend it.
    // One free PAPER since 0139: the request names the paper (past paper slug,
    // selected ids or filters), and a paper already taken free stays free, so
    // its Answer Key does not meet the pass offer.
    const freeKey = paperKey({
      mockSlug: isMockMode ? String(body.mockSlug).trim() : null,
      homework,
      questionIds: isCartMode ? body.questionIds : null,
      filters:
        !isMockMode && !isHomeworkMode && !isCartMode ? (body.filters as Record<string, unknown> | undefined) : null,
    });
    const freeDownloadLeft =
      user && !isStaff && !hasDownloadPass && (kind === "paper" || kind === "key")
        ? await isPaperFree(createSupabaseServerClient(), user.id, freeKey)
        : undefined;
    const access = resolveExportAccess({ kind, isSignedIn, isStaff, hasDownloadPass, freeDownloadLeft });
    if (!access.allowed) {
      return NextResponse.json({ error: access.message }, { status: access.status });
    }

    // RLS scopes the query: anon sees only PUBLIC rows, authed org members see
    // PUBLIC + their own org's PRIVATE.
    const supabase = createSupabaseServerClient();

    let questions: QuestionRow[];
    // A past paper: its own questions in printed order, headed by its sections.
    let mockId: string | undefined;
    let mockTitle: string | undefined;
    let sectionOf: Map<string, string> | undefined;
    let homeworkPlanId: string | undefined;
    if (homework) {
      const found = await getPlanDay(createSupabaseAnonClient(), homework.slug, homework.day);
      if (!found) {
        return NextResponse.json({ error: "That homework plan is not available." }, { status: 404 });
      }
      const day = homeworkDayExport(found.title, homework.day, found.items);
      if (!day.ok) {
        return NextResponse.json({ error: day.reason }, { status: 404 });
      }
      questions = await queryQuestionsByIds(supabase, day.questionIds);
      // A day with a question missing would print the wrong numbers against
      // the page, so it is refused rather than served short.
      if (questions.length !== day.questionIds.length) {
        console.error(
          `export: homework ${homework.slug} day ${homework.day} resolved ${questions.length} of ${day.questionIds.length} questions`
        );
        return NextResponse.json(
          { error: "This day can't be downloaded right now. Please try again later." },
          { status: 409 }
        );
      }
      // A case study's parts share a set key, so the passage prints once.
      questions = questions.map((q) => (day.setOf.has(q.id) ? { ...q, setId: day.setOf.get(q.id)! } : q));
      homeworkPlanId = found.planId;
      mockTitle = day.title;
      sectionOf = day.sectionOf;
    } else if (isMockMode) {
      const mock = await getMockBySlug(createSupabaseAnonClient(), String(body.mockSlug).trim());
      if (!mock) {
        return NextResponse.json({ error: "That paper is not available." }, { status: 404 });
      }
      const paper = mockPaperExport(mock);
      if (!paper.ok) {
        return NextResponse.json({ error: paper.reason }, { status: 400 });
      }
      questions = await queryQuestionsByIds(supabase, paper.questionIds);
      // A paper with a question missing would print wrong numbers against the
      // real sitting, so it is refused rather than served short.
      if (questions.length !== paper.questionIds.length) {
        console.error(
          `export: paper ${mock.slug} resolved ${questions.length} of ${paper.questionIds.length} questions`
        );
        return NextResponse.json(
          { error: "This paper can't be downloaded right now. Please try again later." },
          { status: 409 }
        );
      }
      mockId = mock.id;
      mockTitle = paper.title;
      sectionOf = paper.sectionOf;
      // The daily paper limit (migration 0137), checked before the file is
      // built so a refusal costs no PDF. The trigger is the real limit; this
      // is the early answer. Applies to staff and pass holders alike.
      if (user) {
        const today = await readTodaysMockPapers(createSupabaseAdminClient(), user.id);
        const decision = decideMockPaperDownload({ ...today, mockId: mock.id });
        if (!decision.allowed) {
          return NextResponse.json({ error: mockPaperLimitMessage(decision.limit) }, { status: 429 });
        }
      }
    } else if (isCartMode) {
      const ids = (body.questionIds ?? []).filter(
        (s): s is string => typeof s === "string" && s.length > 0
      );
      const unique = Array.from(new Set(ids));
      if (unique.length === 0) {
        return NextResponse.json(
          { error: "Your selection is empty." },
          { status: 400 }
        );
      }
      if (unique.length > EXPORT_CAP) {
        return NextResponse.json(
          {
            error: `Selected ${unique.length} questions — max ${EXPORT_CAP} per export.`,
          },
          { status: 400 }
        );
      }
      questions = await queryQuestionsByIds(supabase, unique);
      if (questions.length === 0) {
        return NextResponse.json(
          { error: "None of the selected questions are available anymore." },
          { status: 400 }
        );
      }
    } else {
      // `format` reaches an ENUM column, so an unrecognised literal would be a
      // 500 (`invalid input value for enum`) rather than an empty result. The
      // filters object arrives from the client unparsed, so narrow it here.
      const result = await queryQuestions(
        supabase,
        null,
        { ...body.filters!, format: coerceFormat(body.filters!.format) },
        EXPORT_CAP
      );
      if (result.totalCount === 0) {
        return NextResponse.json(
          { error: "No questions match these filters." },
          { status: 400 }
        );
      }
      if (result.totalCount > EXPORT_CAP) {
        return NextResponse.json(
          {
            error: `Found ${result.totalCount} questions — narrow filters to ${EXPORT_CAP} or fewer per export, then try again.`,
          },
          { status: 400 }
        );
      }
      questions = result.rows;
    }

    const title =
      mockTitle ??
      (typeof options.title === "string" && options.title.trim()
        ? options.title.trim()
        : "PYQ Vault Export");
    const includeSolutions = !!options.includeSolutions;
    const groupBySubtopic = !!options.groupBySubtopic;
    const includeSourceTag = !!options.includeSourceTag;
    // Paper and key only (Word or PDF): the tags sheet is structured data for nda-tracker and
    // stays English. Applied here, after the load, so every downstream builder
    // sees ordinary rows and the key never moves.
    if (kind === "paper" || kind === "key") {
      questions = applyExportLanguage(questions, parseExportLang(options.lang));
    }
    const safeName = sanitizeFilename(title);

    // Tagged sheet for nda-tracker: an .xlsx, not a .docx. No images to fetch —
    // it's pure structured data. Q-numbers match the paper by construction
    // (buildTagRows mirrors the docx groupBySet numbering).
    if (kind === "tags") {
      // Attach each question's primary concept tag (first one) so the sheet
      // carries notes slugs → nda-tracker builds slug-precise remediation links.
      // Untagged questions (English, GK, practice) simply get empty slug cells.
      const tagMap = await getResourceTagsForQuestions(
        supabase,
        questions.map((q) => q.id)
      );
      const conceptTags = new Map(
        Array.from(tagMap.entries())
          .filter(([, t]) => t.conceptTags.length > 0)
          .map(([id, t]) => [id, t.conceptTags[0]] as const)
      );
      const aoa = tagRowsToAoa(buildTagRows(questions, conceptTags));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), "Tags");
      const xlsxBuf = XLSX.write(wb, {
        type: "buffer",
        bookType: "xlsx",
      }) as Buffer;
      await recordExportEvent({
        userId: user?.id ?? null,
        orgId: member?.orgId ?? null,
        kind,
        questionCount: questions.length,
        mode: isCartMode ? "cart" : "filters",
        isStaff,
      });
      return new NextResponse(xlsxBuf as unknown as ArrayBuffer, {
        status: 200,
        headers: {
          "Content-Type": XLSX_CONTENT_TYPE,
          "Content-Disposition": `attachment; filename="Tags_${safeName}.xlsx"`,
          "Content-Length": String(xlsxBuf.length),
        },
      });
    }

    // Classroom slide deck: one question per slide. Shares the question
    // images with the paper path, so the same best-effort fetch applies.
    if (kind === "ppt") {
      const imageBytes = await fetchImageBytes(questions);
      const pptxBuf = await buildQuestionSlides({
        title,
        questions,
        imageBytes,
        groupBySubtopic,
        includeSourceTag,
      });
      await recordExportEvent({
        userId: user?.id ?? null,
        orgId: member?.orgId ?? null,
        kind,
        questionCount: questions.length,
        mode: isCartMode ? "cart" : "filters",
        isStaff,
      });
      return new NextResponse(pptxBuf as unknown as ArrayBuffer, {
        status: 200,
        headers: {
          "Content-Type": PPTX_CONTENT_TYPE,
          "Content-Disposition": `attachment; filename="Slides_${safeName}.pptx"`,
          "Content-Length": String(pptxBuf.length),
        },
      });
    }

    // A PDF for everyone without staff access, Word for institute staff (see
    // resolveExportAccess's `format`). The PDF is one HTML page printed by a
    // headless Chromium; its pictures are fetched per document, so a paper can
    // never carry a solution's picture.
    // The owner's branding switches (migration 0138, /dashboard/pricing). Read
    // only for a branded download; they can remove pieces, never add them, so a
    // staff paper stays clean. A failed read keeps every piece on (today's
    // behaviour) rather than shipping an unbranded pass paper by accident.
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
        console.error("export: branding switches unreadable, keeping full branding", settings.message);
      }
    }

    // If the PDF fails to print, the Word file is served instead (buildPaperFile),
    // so a student gets a file rather than a 500, and the failure is logged.
    const format = chooseFormat({ granted: access.format ?? "docx", isStaff, requested: options.format });
    const built = await buildPaperFile(format, {
      buildPdf: async () => {
        const images = await imageDataUris(createSupabaseAdminClient(), kind, questions);
        const common = {
          title,
          questions,
          images,
          groupBySubtopic,
          sectionOf,
          headingEveryQuestion: !!homework,
          branded: access.branded,
          brandingParts: brandParts,
          head: pdfHead(),
        };
        const html =
          kind === "paper"
            ? buildPaperHtml({ ...common, includeSourceTag })
            : buildKeyHtml({ ...common, includeSolutions });
        return printPdf(html);
      },
      buildDocx: async () =>
        kind === "paper"
          ? buildQuestionPaper({
              title,
              questions,
              imageBytes: await fetchImageBytes(questions),
              groupBySubtopic,
              sectionOf,
              headingEveryQuestion: !!homework,
              includeSourceTag,
              branded: access.branded,
          brandingParts: brandParts,
            })
          : buildAnswerKey({
              title,
              questions,
              includeSolutions,
              groupBySubtopic,
              sectionOf,
              branded: access.branded,
          brandingParts: brandParts,
            }),
      onPdfFailure: (err) => console.error("export pdf failed, serving docx", err),
    });
    const fileBuf = built.buf;
    const filename = `${kind === "paper" ? "QP" : "Answers"}_${safeName}.${built.format}`;
    const contentType = built.format === "pdf" ? PDF_CONTENT_TYPE : DOCX_CONTENT_TYPE;

    // Record the paper against today's limit now that the file exists, and
    // serve it only if the claim succeeds: two downloads at the same instant
    // cannot both pass the trigger. Before the free-download claim, so a refusal
    // here never spends the free download. A failed write refuses rather than
    // serving an unrecorded paper.
    if (isMockMode && mockId && user) {
      const claim = await claimMockPaperDownload(createSupabaseAdminClient(), user.id, mockId);
      if (claim.kind === "limit") {
        return NextResponse.json({ error: mockPaperLimitMessage(claim.limit) }, { status: 429 });
      }
      if (claim.kind === "error") {
        return NextResponse.json(
          { error: "This paper can't be downloaded right now. Please try again later." },
          { status: 503 }
        );
      }
    }

    // Spend the free download only now that the file exists, and serve it only
    // if this request's claim won: a racing second tap gets the refusal.
    if (access.free && user && (kind === "paper" || kind === "key")) {
      const won = await claimFreeDownload(createSupabaseAdminClient(), user.id, kind, questions.length, freeKey);
      if (!won) {
        return NextResponse.json(
          { error: "You've had your free paper. Every paper with its answer key comes with the Premium Pass." },
          { status: 403 }
        );
      }
    }

    await recordExportEvent({
      userId: user?.id ?? null,
      orgId: member?.orgId ?? null,
      kind,
      questionCount: questions.length,
      mode: homework ? "homework" : isMockMode ? "mock" : isCartMode ? "cart" : "filters",
      mockId,
      homeworkPlanId,
      homeworkDay: homework?.day,
      isStaff,
    });
    return new NextResponse(fileBuf as unknown as ArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(fileBuf.length),
      },
    });
  } catch (err) {
    console.error("export route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

function formatRetry(seconds: number): string {
  if (seconds < 90) return `${seconds} seconds`;
  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) return `${minutes} minutes`;
  const hours = Math.ceil(minutes / 60);
  return `${hours} hour${hours === 1 ? "" : "s"}`;
}

function sanitizeFilename(s: string): string {
  const cleaned = s.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_");
  return cleaned || "export";
}

/**
 * Download all referenced image paths in parallel via the service-role client.
 * Skips images that fail to fetch — the docx builder will silently render the
 * paragraph without that image rather than fail the whole export.
 */
async function fetchImageBytes(
  questions: QuestionRow[]
): Promise<Map<string, Buffer>> {
  const paths = new Set<string>();
  for (const q of questions) {
    if (q.imageUrl) paths.add(q.imageUrl);
    if (q.solutionImageUrl) paths.add(q.solutionImageUrl);
    for (const opt of q.options) {
      if (opt.imageUrl) paths.add(opt.imageUrl);
    }
  }
  if (paths.size === 0) return new Map();

  const admin = createSupabaseAdminClient();
  const result = new Map<string, Buffer>();
  await Promise.all(
    Array.from(paths).map(async (path) => {
      try {
        const bytes = await downloadImage(admin, path);
        result.set(path, bytes);
      } catch (err) {
        console.warn(`failed to fetch image ${path}: ${err instanceof Error ? err.message : err}`);
      }
    })
  );
  return result;
}
