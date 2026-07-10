/**
 * POST /api/mock/attempt/[id]/submit — grade + finalize an attempt. Idempotent
 * (a repeat submit returns the stored result). `reason:"expired"` is sent by the
 * runner's auto-submit when the timer hits zero; "manual" is the Submit button.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { submitAttempt, MockError } from "@/lib/mocks/service";

const BodySchema = z.object({ reason: z.enum(["manual", "expired"]).optional() });

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  let reason: "manual" | "expired" = "manual";
  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (parsed.success && parsed.data.reason) reason = parsed.data.reason;
  } catch {
    // empty body is fine → manual
  }
  try {
    const db = createSupabaseServerClient();
    const result = await submitAttempt(db, user.id, params.id, reason);
    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof MockError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error("mock submit error", e);
    return NextResponse.json({ error: "Could not submit the test." }, { status: 500 });
  }
}
