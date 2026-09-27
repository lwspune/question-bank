import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { logActivityOnce } from "@/lib/activity/service";
import { CLICK_TOKEN_RE, resolveClickTarget } from "@/lib/email/click";
import { SITE_URL } from "@/lib/email/templates";

export const dynamic = "force-dynamic";

/**
 * Email click redirect: /api/e/<token>?to=<path>. Looks the send up by its
 * click_token (migration 0122), records ONE `email_clicked` per send for the
 * student it was sent to — no session needed, the token identifies the send —
 * and redirects to the same-site path. An unknown or malformed token still
 * redirects (a student is never stranded on an error for our bookkeeping) and
 * records nothing. Service-role: email_sends and this write are ours, not the
 * viewer's, and the viewer may well be signed out on their phone.
 */
export async function GET(request: NextRequest, { params }: { params: { token: string } }) {
  const target = resolveClickTarget(request.nextUrl.searchParams.get("to"));
  const redirect = NextResponse.redirect(new URL(target, SITE_URL), 302);

  if (!CLICK_TOKEN_RE.test(params.token)) return redirect;

  try {
    const admin = createSupabaseAdminClient();
    const { data: send } = await admin
      .from("email_sends")
      .select("id, user_id, kind")
      .eq("click_token", params.token)
      .maybeSingle();
    if (send?.user_id) {
      await logActivityOnce(admin, send.user_id as string, {
        kind: "email_clicked",
        refId: send.id as string,
        refKind: "email_send",
        metadata: { kind: send.kind, to: target },
        dedupeKey: `email_click:${send.id}`,
      });
    }
  } catch (e) {
    console.error("email click redirect: lookup failed", e);
  }
  return redirect;
}
