import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { logActivityOnce } from "@/lib/activity/service";
import { CLICK_TOKEN_RE, resolveClickTarget } from "@/lib/email/click";
import { decideSignIn } from "@/lib/email/signedLink";
import { signInFromSend } from "@/lib/email/signedLinkService";
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
 *
 * Since 2026-09-30 a FRESH link also signs the student in (signedLink.ts has
 * the rule; signedLinkService.ts the mechanism), because the viewer usually
 * IS signed out on their phone: a Gmail tap opens in an in-app browser with
 * no session, and /drill bounced every nudge to /login. The outcome rides on
 * the click row as `metadata.signIn`, so a report can tell a wall from a
 * channel. The response is built LAST so the session cookies the sign-in
 * sets are on it.
 *
 * Since 2026-10-01 (migration 0128) a browser NOTIFICATION's tap comes through
 * here too: a token found in push_sends instead records `push_clicked`, under
 * the same one-per-send rule and the same sign-in rule.
 */
type Channel = { table: "email_sends" | "push_sends"; kind: "email_clicked" | "push_clicked"; refKind: string; prefix: string };
const CHANNELS: Channel[] = [
  { table: "email_sends", kind: "email_clicked", refKind: "email_send", prefix: "email_click" },
  { table: "push_sends", kind: "push_clicked", refKind: "push_send", prefix: "push_click" },
];

export async function GET(request: NextRequest, { params }: { params: { token: string } }) {
  const target = resolveClickTarget(request.nextUrl.searchParams.get("to"));

  if (CLICK_TOKEN_RE.test(params.token)) {
    try {
      const admin = createSupabaseAdminClient();
      let send: Record<string, unknown> | null = null;
      let channel = CHANNELS[0];
      for (const c of CHANNELS) {
        const { data } = await admin
          .from(c.table)
          .select("id, user_id, kind, created_at")
          .eq("click_token", params.token)
          .maybeSingle();
        if (data) {
          send = data;
          channel = c;
          break;
        }
      }
      if (send?.user_id) {
        const userId = send.user_id as string;
        let signIn = "failed";
        try {
          const server = createSupabaseServerClient();
          const { data } = await server.auth.getUser();
          const decision = decideSignIn({ sentAt: send.created_at as string | null, sessionUserId: data.user?.id ?? null });
          signIn = decision === "sign-in" ? ((await signInFromSend(admin, server, userId)) ? "done" : "failed") : decision;
        } catch (e) {
          console.error("email click redirect: sign-in failed", e);
        }
        await logActivityOnce(admin, userId, {
          kind: channel.kind,
          refId: send.id as string,
          refKind: channel.refKind,
          metadata: { kind: send.kind, to: target, signIn },
          dedupeKey: `${channel.prefix}:${send.id}`,
        });
      }
    } catch (e) {
      console.error("email click redirect: lookup failed", e);
    }
  }
  return NextResponse.redirect(new URL(target, SITE_URL), 302);
}
