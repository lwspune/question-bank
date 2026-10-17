/**
 * POST /api/mock/[slug]/start — begin (or resume) a signed-in student's attempt
 * at a published mock. Returns { attemptId, expiresAt, resumed }. All DB work
 * runs through the RLS-bound server client as the acting user.
 *
 * Optional body { with: <invite code> } (practise together, migration 0166):
 * a friend starting a paper someone sent them. The join is recorded FIRST,
 * with the service role (the table has no student policies), so the start
 * trigger lets the paper through free. A bad, own or rate-limited code is
 * ignored and the paper starts under the ordinary limits.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { startOrResumeAttempt, MockError } from "@/lib/mocks/service";
import { isInviteCode } from "@/lib/practiceTests/mockInvite";
import { joinMockInvite } from "@/lib/practiceTests/mockInviteService";

const DAY_MS = 24 * 60 * 60 * 1000;
/** Papers a student may start from friends' invites in a day (each one is free). */
const JOIN_LIMIT = 20;

export async function POST(req: NextRequest, { params }: { params: { slug: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in to start a mock test." }, { status: 401 });

  const body = (await req.json().catch(() => null)) as { with?: unknown } | null;
  const invite = body?.with;
  if (isInviteCode(invite)) {
    try {
      const admin = createSupabaseAdminClient();
      await joinMockInvite(admin, {
        code: invite,
        slug: params.slug,
        userId: user.id,
        allowNew: async () =>
          (await checkAndIncrement(admin, `mock-join:${user.id}`, { limit: JOIN_LIMIT, windowMs: DAY_MS })).ok,
      });
    } catch (e) {
      // The paper still starts; only the free pass is lost.
      console.error("mock start: invite join failed", e);
    }
  }

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
