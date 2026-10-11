/**
 * POST /api/answer-sheets/<id>/question: the student questions the grade of
 * one question on their own graded sheet (migration 0153). Written with the
 * student's OWN session, so the row-level policy is the check: their sheet,
 * graded, a question that was graded, once per question.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  if (!UUID.test(params.id)) return NextResponse.json({ error: "Unknown answer sheet." }, { status: 404 });
  const body = (await request.json().catch(() => null)) as { position?: unknown; message?: unknown } | null;
  const position = body?.position;
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (typeof position !== "number" || !Number.isInteger(position) || position < 1 || position > 999) {
    return NextResponse.json({ error: "Unknown question." }, { status: 400 });
  }
  if (message.length < 5 || message.length > 1000) {
    return NextResponse.json({ error: "Tell us what to look at again (5 to 1000 characters)." }, { status: 400 });
  }

  const db = createSupabaseServerClient();
  const { data } = await db.auth.getUser();
  if (!data.user) return NextResponse.json({ error: "Please sign in." }, { status: 401 });

  const { error } = await db
    .from("answer_grade_disputes")
    .insert({ submission_id: params.id, position, user_id: data.user.id, message });
  if (error?.code === "23505") {
    return NextResponse.json({ error: "You have already asked about this question." }, { status: 409 });
  }
  if (error) {
    console.error("answer sheet question", error.message);
    return NextResponse.json({ error: "Could not send your question." }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
