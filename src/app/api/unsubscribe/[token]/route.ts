/**
 * POST /api/unsubscribe/[token] — turn off product emails for the student the
 * token identifies. No login required: the token IS the capability (a person
 * who can't sign in must still be able to get out).
 *
 * POST-only, deliberately. Gmail/Outlook link-scanners PREFETCH urls in mail —
 * an unsubscribe that acted on GET would silently opt people out the moment a
 * scanner touched the message. The GET surface is /unsubscribe/[token], a page
 * with a confirm button that posts here.
 *
 * This also serves RFC 8058 one-click: the List-Unsubscribe-Post header points
 * mailbox providers at this exact endpoint, and they POST it directly.
 *
 * Service-role: the token holder has no session, so there is no JWT to carry —
 * the lookup and the write both need to bypass RLS. Scope is pinned to the one
 * row the (unique, unguessable) token matches.
 */
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(_request: Request, { params }: { params: { token: string } }) {
  const token = params.token;
  // Shape-check before touching the DB: `unsubscribe_token` is uuid, so a
  // non-uuid would be a 22P02 cast error rather than a clean miss.
  if (!UUID_RE.test(token)) {
    return NextResponse.json({ error: "Invalid unsubscribe link." }, { status: 400 });
  }

  try {
    const db = createSupabaseAdminClient();
    const { data, error } = await db
      .from("student_profiles")
      .update({ email_opt_out: true })
      .eq("unsubscribe_token", token)
      .select("user_id");
    if (error) throw error;

    // Unknown token → same 200 as success. An honest 404 would turn this into a
    // token-probing oracle, and there is nothing useful to tell the caller.
    if (!data || data.length === 0) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("unsubscribe error", err);
    return NextResponse.json({ error: "Could not unsubscribe. Please try again." }, { status: 500 });
  }
}
