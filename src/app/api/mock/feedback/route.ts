/**
 * POST /api/mock/feedback — a signed-in student leaves 1-tap feedback (difficulty
 * rating + optional comment) on their OWN mock attempt. Own-row upsert via their
 * JWT; RLS (0050) enforces that the attempt belongs to them.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { validateFeedback } from "@/lib/mocks/feedback";
import { saveMockFeedback } from "@/lib/mocks/feedbackService";

const BodySchema = z.object({
  attemptId: z.string().uuid(),
  rating: z.string(),
  comment: z.string().max(2000).optional(),
});

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validation = validateFeedback({ rating: parsed.data.rating, comment: parsed.data.comment });
  if (!validation.ok) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  try {
    const db = createSupabaseServerClient();
    await saveMockFeedback(db, user.id, parsed.data.attemptId, {
      rating: validation.rating,
      comment: validation.comment,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("mock feedback save error", err);
    return NextResponse.json({ error: "Could not save feedback. Please try again." }, { status: 500 });
  }
}
