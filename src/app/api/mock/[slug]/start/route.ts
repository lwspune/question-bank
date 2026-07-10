/**
 * POST /api/mock/[slug]/start — begin (or resume) a signed-in student's attempt
 * at a published mock. Returns { attemptId, expiresAt, resumed }. All DB work
 * runs through the RLS-bound server client as the acting user.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { startOrResumeAttempt, MockError } from "@/lib/mocks/service";

export async function POST(_req: NextRequest, { params }: { params: { slug: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in to start a mock test." }, { status: 401 });
  try {
    const db = createSupabaseServerClient();
    const result = await startOrResumeAttempt(db, user.id, params.slug);
    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof MockError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error("mock start error", e);
    return NextResponse.json({ error: "Could not start the test." }, { status: 500 });
  }
}
