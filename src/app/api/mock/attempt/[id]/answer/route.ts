/**
 * PATCH /api/mock/attempt/[id]/answer — autosave one question's response
 * (selection / flag / time). Rejects writes after the timer expired. The client
 * sends the full per-question triple, so the upsert is a clean overwrite.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { saveAnswer, MockError } from "@/lib/mocks/service";

/**
 * A response is EITHER an option label (MCQ) or a value (JEE Section-B numeric),
 * never both — mirroring the `attempt_answers` CHECK added in migration 0087.
 * Rejecting both-at-once here means the DB constraint is a backstop rather than
 * the thing users meet as a 500.
 *
 * `numericResponse` is finite-checked because z.number() accepts NaN and
 * Infinity, and either would reach a numeric column as a write error.
 */
const BodySchema = z
  .object({
    questionId: z.string().uuid(),
    selectedLabel: z.enum(["A", "B", "C", "D"]).nullable(),
    numericResponse: z.number().finite().nullable().default(null),
    isFlagged: z.boolean(),
    timeSpentSecs: z.number().int().min(0).max(24 * 3600),
  })
  .refine((b) => b.selectedLabel === null || b.numericResponse === null, {
    message: "A response is either an option or a value, not both",
  });

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(raw);
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
