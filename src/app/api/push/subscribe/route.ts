/**
 * POST / DELETE /api/push/subscribe — store or forget THIS browser's push
 * subscription for the signed-in student (PUSH_SPEC.md §6, migration 0128).
 *
 * The session is verified with the caller's own cookies; the write then goes
 * through the SERVICE ROLE, scoped to that user id. Own-row RLS is not enough
 * here: a browser endpoint can change hands on a shared phone, and a second
 * student turning notifications on must take the row over, which RLS cannot
 * express. The body is validated before anything touches the database.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { parseSubscription } from "@/lib/push/core";

async function readJson(request: NextRequest): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}

export async function POST(request: NextRequest) {
  const parsed = parseSubscription(await readJson(request));
  if (!parsed.ok) return NextResponse.json({ ok: false, error: parsed.reason }, { status: 400 });

  const user = await getSessionUser();
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  const { endpoint, keys, userAgent } = parsed.value;
  const { error } = await createSupabaseAdminClient()
    .from("push_subscriptions")
    .upsert(
      {
        user_id: user.id,
        endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth,
        user_agent: userAgent ?? null,
        last_seen_at: new Date().toISOString(),
        fail_count: 0,
        failed_at: null,
      },
      { onConflict: "endpoint" }
    );
  if (error) {
    console.error("push subscribe failed", error.message);
    return NextResponse.json({ ok: false, error: "Could not turn notifications on. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

const DeleteBody = z.object({ endpoint: z.string().min(1).max(2048) });

export async function DELETE(request: NextRequest) {
  const parsed = DeleteBody.safeParse(await readJson(request));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });

  const user = await getSessionUser();
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });

  const { error } = await createSupabaseAdminClient()
    .from("push_subscriptions")
    .delete()
    .eq("endpoint", parsed.data.endpoint)
    .eq("user_id", user.id);
  if (error) {
    console.error("push unsubscribe failed", error.message);
    return NextResponse.json({ ok: false, error: "Could not turn notifications off. Please try again." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
