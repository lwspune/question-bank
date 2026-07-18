/**
 * POST /api/teacher-access — the public "request teacher access" lead write.
 *
 * Flow: rate-limit (IP) → validate (shared pure validator) → service-role insert
 * → best-effort ops notification. There is no anon RLS surface on
 * teacher_access_requests; this route (service-role) is the only way in.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/http";
import { validateTeacherAccessRequest } from "@/lib/teacherAccess/validate";
import {
  createTeacherAccessRequest,
  notifyNewTeacherRequest,
} from "@/lib/teacherAccess/service";

export const maxDuration = 15;

const HOUR_MS = 60 * 60 * 1000;
const SUBMIT_LIMIT = 10; // per IP per hour — a genuine teacher submits once

type Body = {
  name?: string;
  institute?: string | null;
  email?: string | null;
  mobile?: string | null;
  city?: string | null;
  message?: string | null;
  consent?: boolean;
};

export async function POST(request: NextRequest) {
  try {
    const admin = createSupabaseAdminClient();

    // Rate-limit BEFORE parsing so junk still counts toward the bucket.
    const rl = await checkAndIncrement(admin, `teacher-access:anon:${getClientIp(request)}`, {
      limit: SUBMIT_LIMIT,
      windowMs: HOUR_MS,
    });
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many requests — please try again later.", retryAfter: rl.retryAfter },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    let raw: Body;
    try {
      raw = (await request.json()) as Body;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const v = validateTeacherAccessRequest({
      name: raw.name ?? "",
      institute: raw.institute,
      email: raw.email,
      mobile: raw.mobile,
      city: raw.city,
      message: raw.message,
      consent: raw.consent === true,
    });
    if (!v.ok) {
      return NextResponse.json({ error: v.message, field: v.field }, { status: 400 });
    }

    const created = await createTeacherAccessRequest(v.value);
    if (!created.ok) {
      return NextResponse.json({ error: "Could not submit your request. Please try again." }, { status: 500 });
    }

    // Best-effort — never blocks the success response.
    await notifyNewTeacherRequest(v.value);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("teacher-access submit error", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
