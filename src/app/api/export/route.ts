import { NextResponse, type NextRequest } from "next/server";
import JSZip from "jszip";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSessionMember } from "@/lib/auth";
import { queryQuestions, type QuestionRow } from "@/lib/questions/query";
import type { Filters } from "@/lib/questions/filters";
import {
  buildQuestionPaper,
  buildAnswerKey,
} from "@/lib/export/docxBuilder";
import { downloadImage } from "@/lib/storage/images";

export const maxDuration = 60;

const EXPORT_CAP = 200;

type Body = {
  filters?: Filters;
  options?: {
    title?: string;
    includeSolutions?: boolean;
  };
};

export async function POST(request: NextRequest) {
  try {
    const member = await getSessionMember();
    if (!member) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const body = (await request.json()) as Body;
    if (!body.filters || !body.options) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
    const filters = body.filters;
    const options = body.options;

    const supabase = createSupabaseServerClient();
    const result = await queryQuestions(
      supabase,
      member.orgId,
      filters,
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

    const title =
      typeof options.title === "string" && options.title.trim()
        ? options.title.trim()
        : "Question Bank Export";
    const includeSolutions = !!options.includeSolutions;

    const imageBytes = await fetchImageBytes(result.rows);

    const [paperBuf, keyBuf] = await Promise.all([
      buildQuestionPaper({ title, questions: result.rows, imageBytes }),
      buildAnswerKey({ title, questions: result.rows, includeSolutions }),
    ]);

    const safeName = sanitizeFilename(title);
    const zip = new JSZip();
    zip.file(`QuestionPaper_${safeName}.docx`, paperBuf);
    zip.file(`AnswerKey_${safeName}.docx`, keyBuf);
    const zipBuf = (await zip.generateAsync({
      type: "nodebuffer",
    })) as Buffer;

    return new NextResponse(zipBuf as unknown as ArrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${safeName}.zip"`,
        "Content-Length": String(zipBuf.length),
      },
    });
  } catch (err) {
    console.error("export route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
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
