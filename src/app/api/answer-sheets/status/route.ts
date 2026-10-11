/**
 * GET /api/answer-sheets/status: what the upload box on a (cached, shared)
 * paper page needs to know about the viewer. Signed in? Already sent today?
 */
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { submittedToday } from "@/lib/answerSheets/service";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data } = await createSupabaseServerClient().auth.getUser();
  if (!data.user) return NextResponse.json({ signedIn: false, submittedToday: false });
  try {
    return NextResponse.json({
      signedIn: true,
      submittedToday: await submittedToday(createSupabaseAdminClient(), data.user.id),
    });
  } catch (e) {
    console.error("answer sheet status", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not check your answer sheets." }, { status: 500 });
  }
}
