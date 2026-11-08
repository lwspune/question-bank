/**
 * POST /api/me/focus — save the exam a two-exam student's Home and Performance
 * tabs are about (lib/me/focus.ts, migration 0231). Body: { exam: <slug> | "all" }.
 *
 * Checked against the student's own exams BEFORE the write; the database
 * refuses anything else too (0231's CHECK), so a stale tab cannot store an exam
 * the student since removed. Written with the student's own session (own-row
 * RLS, 0045). Never cached.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getOnboardingState } from "@/lib/profile/service";
import { parseFocusChoice } from "@/lib/me/focus";
import { saveOwnFocus } from "@/lib/me/focusServer";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" } as const;
const BodySchema = z.object({ exam: z.string().max(40) });

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401, headers: NO_STORE });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: NO_STORE });
  }
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: NO_STORE });

  const db = createSupabaseServerClient();
  try {
    const { targetExams } = await getOnboardingState(db, user.id);
    const choice = parseFocusChoice(parsed.data.exam, targetExams);
    if (!choice) {
      return NextResponse.json({ error: "That is not one of your exams." }, { status: 400, headers: NO_STORE });
    }
    await saveOwnFocus(db, user.id, choice);
    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (e) {
    console.error("focus save failed", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500, headers: NO_STORE });
  }
}
