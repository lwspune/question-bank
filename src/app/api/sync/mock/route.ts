import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { applyMockSync } from "@/lib/sync/applyMockSync";
import { validateSyncPayload } from "@/lib/sync/payload";

export const maxDuration = 60;

const DESTINATION_ORG_NAME = "LWS Pune";

export async function POST(request: NextRequest) {
  const expected = process.env.SYNC_SHARED_SECRET;
  if (!expected) {
    console.error("SYNC_SHARED_SECRET is not configured on the server");
    return NextResponse.json(
      { error: "sync endpoint is not configured" },
      { status: 500 }
    );
  }

  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token || token !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  const validation = validateSyncPayload(body);
  if (!validation.ok) {
    return NextResponse.json(
      { error: "invalid payload", fieldErrors: validation.errors },
      { status: 400 }
    );
  }

  const admin = createSupabaseAdminClient();

  const { data: org, error: orgErr } = await admin
    .from("organizations")
    .select("id")
    .eq("name", DESTINATION_ORG_NAME)
    .maybeSingle();
  if (orgErr || !org) {
    console.error("destination org lookup failed", orgErr);
    return NextResponse.json(
      { error: `Destination org "${DESTINATION_ORG_NAME}" not found` },
      { status: 500 }
    );
  }

  const result = await applyMockSync(admin, validation.payload, {
    orgId: org.id as string,
  });

  if (result.kind === "fatal") {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    inserted: result.inserted,
    merged: result.merged,
    skipped: result.skipped,
    errors: result.errors,
  });
}
