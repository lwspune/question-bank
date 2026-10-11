/**
 * POST /api/answer-sheets/<id>/submit: every file is uploaded, so put the
 * sheet in the grading queue (migration 0153). Refused unless the sheet is the
 * session user's own unfinished upload and every file it promised is there.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { finishSubmission } from "@/lib/answerSheets/service";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!UUID.test(params.id)) return NextResponse.json({ error: "Unknown answer sheet." }, { status: 404 });
  const { data } = await createSupabaseServerClient().auth.getUser();
  if (!data.user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

  try {
    const outcome = await finishSubmission(createSupabaseAdminClient(), data.user.id, params.id);
    if (outcome === "not-found") return NextResponse.json({ error: "Unknown answer sheet." }, { status: 404 });
    if (outcome === "missing-files") {
      return NextResponse.json({ error: "Some files did not upload. Please try again." }, { status: 409 });
    }
    if (outcome === "limit") {
      return NextResponse.json(
        { error: "You have already sent one answer sheet today. Send the next one tomorrow." },
        { status: 409 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("answer sheet submit", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not send your answer sheet. Please try again." }, { status: 500 });
  }
}
