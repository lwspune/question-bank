/**
 * POST /api/bookmarks — a signed-in student toggles a saved question. Own-row
 * insert/delete through the user's JWT (RLS, migration 0047).
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { setBookmark } from "@/lib/bookmarks/service";
import { logActivity } from "@/lib/activity/service";

const BodySchema = z.object({
  questionId: z.string().uuid(),
  bookmarked: z.boolean(),
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
    return NextResponse.json({ error: "Invalid bookmark request." }, { status: 400 });
  }

  try {
    const db = createSupabaseServerClient();
    await setBookmark(db, user.id, parsed.data.questionId, parsed.data.bookmarked);

    // Engagement spine (0052): a save is a signal; an un-save isn't. Best-effort.
    if (parsed.data.bookmarked) {
      await logActivity(db, user.id, {
        kind: "question_bookmarked",
        refId: parsed.data.questionId,
        refKind: "question",
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("bookmark save error", err);
    return NextResponse.json({ error: "Could not save your bookmark." }, { status: 500 });
  }
}
