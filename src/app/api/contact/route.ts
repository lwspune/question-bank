/**
 * POST /api/contact — the public /about contact-form write.
 *
 * Flow: rate-limit (IP) → validate (shared pure validator, incl. honeypot) →
 * service-role insert → best-effort ops notification. There is no anon RLS
 * surface on contact_messages; this route (service-role) is the only way in.
 *
 * The INSERT is the success condition. The notification is fire-and-forget on
 * top, because this form exists precisely so a message survives email being
 * broken — which it was when 0102 shipped (pyqvault.com had no MX at all), and
 * which any mailbox can be again. The ordering is the feature, not a stopgap.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { validateContactMessage } from "@/lib/contact/validate";
import { createContactMessage, notifyNewContactMessage } from "@/lib/contact/service";

export const maxDuration = 15;

const HOUR_MS = 60 * 60 * 1000;
const SUBMIT_LIMIT = 5; // per IP per hour — a genuine sender writes once

type Body = {
  name?: string;
  email?: string;
  phone?: string | null;
  message?: string;
  website?: string | null;
};

export async function POST(request: NextRequest) {
  try {
    const admin = createSupabaseAdminClient();

    // Rate-limit BEFORE parsing so junk still counts toward the bucket.
    const rl = await checkAndIncrement(admin, `contact:anon:${getClientIp(request)}`, {
      limit: SUBMIT_LIMIT,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many messages — please try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    let raw: Body;
    try {
      raw = (await request.json()) as Body;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const v = validateContactMessage({
      name: raw.name ?? "",
      email: raw.email ?? "",
      phone: raw.phone,
      message: raw.message ?? "",
      website: raw.website,
    });
    if (!v.ok) {
      // A tripped honeypot answers 200 with no row. Telling a bot it was
      // detected just teaches it which field to leave alone next time.
      if (v.field === "website") return NextResponse.json({ ok: true }, { status: 200 });
      return NextResponse.json({ error: v.message, field: v.field }, { status: 400 });
    }

    const created = await createContactMessage(v.value);
    if (!created.ok) {
      return NextResponse.json(
        { error: "Could not send your message. Please try again." },
        { status: 500 }
      );
    }

    // Best-effort — never blocks the success response, never fails the request.
    await notifyNewContactMessage(v.value);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("contact submit error", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
