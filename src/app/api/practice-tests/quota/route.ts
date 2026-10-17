/**
 * GET /api/practice-tests/quota — the signed-in student's free practice tests
 * today (migration 0156), so V's builder can say it BEFORE the steps rather
 * than on each built card (2026-10-17: a student built five tests they could
 * not start). The database trigger stays the real gate.
 *
 * Answers { ok: true, state } where state is a MockStartState for a practice
 * test, or null for a signed-out visitor or an unreadable quota (V then says
 * nothing). Per person, so no cache may keep it.
 */
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getMockQuota } from "@/lib/mocks/service";
import { mockStartState, type MockStartState } from "@/lib/mocks/quota";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET() {
  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  let state: MockStartState | null = null;
  if (user) {
    try {
      const quota = await getMockQuota(createSupabaseServerClient());
      state = quota ? mockStartState(quota, false, "custom") : null;
    } catch (err) {
      console.error("practice-tests/quota: read failed", err);
    }
  }
  return NextResponse.json({ ok: true, state }, { headers: NO_STORE });
}
