/**
 * POST /api/results/answer: a student answers "Did you clear the <sitting>
 * <stage>?" from the card on /me (migration 0149).
 *
 * The student is the SESSION user, never an id from the body. The answer is
 * checked before anything is read (validateResultAnswer) and stored
 * unpublished: a name reaches /results only after a superadmin reviews it.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { validateResultAnswer } from "@/lib/results/check";
import { saveResultAnswer } from "@/lib/results/service";
import { istDayKey } from "@/lib/email/dueNudge";

export async function POST(request: NextRequest) {
  const parsed = validateResultAnswer(await request.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const db = createSupabaseServerClient();
  const { data } = await db.auth.getUser();
  if (!data.user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  try {
    const outcome = await saveResultAnswer(data.user.id, parsed.value, istDayKey(new Date()));
    if (outcome === "closed") {
      return NextResponse.json({ error: "This result is no longer open for answers." }, { status: 409 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("result answer save", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not save your answer." }, { status: 500 });
  }
}
