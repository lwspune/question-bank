import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSessionMember } from "@/lib/auth";
import {
  queryQuestions,
  queryQuestionsByIds,
  type QuestionRow,
} from "@/lib/questions/query";
import type { Filters } from "@/lib/questions/filters";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import {
  buildQuestionPaper,
  buildAnswerKey,
} from "@/lib/export/docxBuilder";
import { buildTagRows, tagRowsToAoa } from "@/lib/export/tagsSheet";
import { getResourceTagsForQuestions } from "@/lib/links/getResourceTagsForQuestions";
import { downloadImage } from "@/lib/storage/images";
import * as XLSX from "xlsx";

export const maxDuration = 60;

const EXPORT_CAP = 200;
const HOUR_MS = 60 * 60 * 1000;
// A full export is now two requests (Paper + Key); limits doubled so the
// user-perceived per-hour cap stays roughly what it was under the old ZIP shape.
const ANON_LIMIT = 20;
const AUTHED_LIMIT = 200;

const DOCX_CONTENT_TYPE =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const XLSX_CONTENT_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

// "tags" = the nda-tracker enrichment sheet (.xlsx) — same question set as the
// paper, numbered identically, so it imports without any hand-typing.
type ExportKind = "paper" | "key" | "tags";

type ExportOptions = {
  title?: string;
  includeSolutions?: boolean;
  groupBySubtopic?: boolean;
};

// Either filter-mode or cart-mode; never both. Front-end picks one.
type Body = {
  kind?: ExportKind;
  filters?: Filters;
  questionIds?: string[];
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
    const bucket = member
      ? `export:user:${member.user.id}`
      : `export:anon:${getClientIp(request)}`;
    const limit = member ? AUTHED_LIMIT : ANON_LIMIT;

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
      body.kind !== "tags"
    ) {
      return NextResponse.json(
        { error: "kind must be 'paper', 'key' or 'tags'" },
        { status: 400 }
      );
    }
    const kind: ExportKind = body.kind;
    if (!body.options) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    const options = body.options;
    const isCartMode = Array.isArray(body.questionIds);
    if (!body.filters && !isCartMode) {
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

    // Public endpoint — RLS scopes the query: anon sees only PUBLIC rows,
    // authed org members see PUBLIC + their own org's PRIVATE.
    const supabase = createSupabaseServerClient();

    let questions: QuestionRow[];
    if (isCartMode) {
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
      const result = await queryQuestions(
        supabase,
        null,
        body.filters!,
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
      typeof options.title === "string" && options.title.trim()
        ? options.title.trim()
        : "PYQ Vault Export";
    const includeSolutions = !!options.includeSolutions;
    const groupBySubtopic = !!options.groupBySubtopic;
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
      return new NextResponse(xlsxBuf as unknown as ArrayBuffer, {
        status: 200,
        headers: {
          "Content-Type": XLSX_CONTENT_TYPE,
          "Content-Disposition": `attachment; filename="Tags_${safeName}.xlsx"`,
          "Content-Length": String(xlsxBuf.length),
        },
      });
    }

    let docxBuf: Buffer;
    let filename: string;
    if (kind === "paper") {
      const imageBytes = await fetchImageBytes(questions);
      docxBuf = await buildQuestionPaper({
        title,
        questions,
        imageBytes,
        groupBySubtopic,
      });
      filename = `QP_${safeName}.docx`;
    } else {
      docxBuf = await buildAnswerKey({
        title,
        questions,
        includeSolutions,
        groupBySubtopic,
      });
      filename = `Answers_${safeName}.docx`;
    }

    return new NextResponse(docxBuf as unknown as ArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": DOCX_CONTENT_TYPE,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(docxBuf.length),
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
