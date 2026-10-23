/**
 * PATCH /api/mock/attempt/[id]/answer — autosave one question's response
 * (selection / flag / time). Rejects writes after the timer expired. The client
 * sends the full per-question triple, so the upsert is a clean overwrite.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { saveAnswer, MockError } from "@/lib/mocks/service";
import { AnswerBodySchema } from "@/lib/mocks/answerPayload";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = AnswerBodySchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Invalid answer payload" }, { status: 400 });
  try {
    const db = createSupabaseServerClient();
    const result = await saveAnswer(db, user.id, params.id, parsed.data);
    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof MockError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error("mock answer error", e);
    return NextResponse.json({ error: "Could not save your answer." }, { status: 500 });
  }
}
