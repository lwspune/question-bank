import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireSuperadmin, getSessionMember, HttpError } from "@/lib/auth";
import { deleteUploadJob } from "@/lib/upload/deleteUploadJob";
import {
  setUploadPyqMetadata,
  type PyqMetadataPatch,
} from "@/lib/upload/setUploadPyqMetadata";

export const maxDuration = 60;

// Year accepted on PATCH. Conservative range; old papers not realistic.
const MIN_YEAR = 1980;
const MAX_YEAR = new Date().getFullYear() + 1;
const MAX_MONTH_LEN = 20;
const MAX_NOTE_LEN = 200;

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireSuperadmin();
    const member = await getSessionMember();
    if (!member) {
      return NextResponse.json({ error: "Handled via the superadmin console." }, { status: 400 });
    }
    const supabase = createSupabaseServerClient();
    const result = await deleteUploadJob(supabase, params.id, member.orgId);

    switch (result.kind) {
      case "ok":
        return NextResponse.json({
          ok: true,
          deletedQuestionCount: result.deletedQuestionCount,
          removedImagePaths: result.removedImagePaths,
        });
      case "not_found":
        return NextResponse.json({ error: "Upload not found" }, { status: 404 });
      case "forbidden":
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      case "error":
        console.error("deleteUploadJob error:", result.message);
        return NextResponse.json({ error: "internal error" }, { status: 500 });
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("delete upload route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireSuperadmin();
    const member = await getSessionMember();
    if (!member) {
      return NextResponse.json({ error: "Handled via the superadmin console." }, { status: 400 });
    }
    const body = (await request.json().catch(() => null)) as
      | (PyqMetadataPatch & Record<string, unknown>)
      | null;
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const validation = validatePyqPatch(body);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const supabase = createSupabaseServerClient();
    const result = await setUploadPyqMetadata(
      supabase,
      params.id,
      member.orgId,
      validation.patch
    );

    switch (result.kind) {
      case "ok":
        return NextResponse.json({ ok: true, updated: result.updated });
      case "not_found":
        return NextResponse.json({ error: "Upload not found" }, { status: 404 });
      case "forbidden":
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      case "error":
        console.error("setUploadPyqMetadata error:", result.message);
        return NextResponse.json({ error: "internal error" }, { status: 500 });
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("patch upload route error", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

type PatchValidation =
  | { ok: true; patch: PyqMetadataPatch }
  | { ok: false; error: string };

function validatePyqPatch(body: Record<string, unknown>): PatchValidation {
  const patch: PyqMetadataPatch = {};

  if ("pyqYear" in body) {
    const v = body.pyqYear;
    if (v === null) {
      patch.pyqYear = null;
    } else if (
      typeof v === "number" &&
      Number.isInteger(v) &&
      v >= MIN_YEAR &&
      v <= MAX_YEAR
    ) {
      patch.pyqYear = v;
    } else {
      return {
        ok: false,
        error: `pyqYear must be an integer between ${MIN_YEAR} and ${MAX_YEAR}, or null.`,
      };
    }
  }

  if ("pyqMonth" in body) {
    const v = body.pyqMonth;
    if (v === null) {
      patch.pyqMonth = null;
    } else if (typeof v === "string" && v.trim().length <= MAX_MONTH_LEN) {
      patch.pyqMonth = v.trim() === "" ? null : v.trim();
    } else {
      return {
        ok: false,
        error: `pyqMonth must be a string up to ${MAX_MONTH_LEN} chars, or null.`,
      };
    }
  }

  if ("pyqNote" in body) {
    const v = body.pyqNote;
    if (v === null) {
      patch.pyqNote = null;
    } else if (typeof v === "string" && v.length <= MAX_NOTE_LEN) {
      patch.pyqNote = v.trim() === "" ? null : v.trim();
    } else {
      return {
        ok: false,
        error: `pyqNote must be a string up to ${MAX_NOTE_LEN} chars, or null.`,
      };
    }
  }

  return { ok: true, patch };
}
