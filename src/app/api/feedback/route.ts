/**
 * POST /api/feedback — a signed-in student submits NPS (score + optional comment)
 * or a feature request (message). Appends an own-row user_feedback row (0051)
 * via their JWT.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { validateNps, validateFeatureRequest } from "@/lib/feedback/nps";
import { saveUserFeedback } from "@/lib/feedback/service";

const BodySchema = z.object({
  kind: z.enum(["nps", "feature"]),
  score: z.number().optional(),
  message: z.string().max(4000).optional(),
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
  const body = parsed.data;

  let toSave: { kind: "nps" | "feature"; score: number | null; message: string | null };
  if (body.kind === "nps") {
    const v = validateNps({ score: body.score, message: body.message });
    if (!v.ok) return NextResponse.json({ error: v.message }, { status: 400 });
    toSave = { kind: "nps", score: v.score, message: v.message };
  } else {
    const v = validateFeatureRequest({ message: body.message });
    if (!v.ok) return NextResponse.json({ error: v.message }, { status: 400 });
    toSave = { kind: "feature", score: null, message: v.message };
  }

  try {
    const db = createSupabaseServerClient();
    await saveUserFeedback(db, user.id, toSave);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("user feedback save error", err);
    return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500 });
  }
}
