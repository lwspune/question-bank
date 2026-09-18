/**
 * POST /api/mock/share — record that a student tapped a share affordance on the
 * mock result screen (migration 0109).
 *
 * Fire-and-forget from the client: the share sheet opens regardless of what
 * this returns, so the response is never awaited for anything the student sees.
 * It answers 204 on success and on a rejected body alike — a student must never
 * see an analytics failure, and there is no caller to act on the distinction.
 *
 * SIGNED-IN ONLY. The result screen is auth-gated, so an anonymous POST here is
 * either a mistake or noise; rejecting it keeps the table's denominator equal to
 * the attempts it is divided by.
 *
 * This records INTENT TO SHARE, not delivery — see the migration header.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { SHARE_CHANNELS } from "@/lib/mocks/share";
import { recordShareEvent } from "@/lib/mocks/shareLog";

const BodySchema = z.object({
  slug: z.string().min(1).max(200),
  channel: z.enum(SHARE_CHANNELS),
  includedScore: z.boolean(),
});

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return new NextResponse(null, { status: 401 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }
  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) return new NextResponse(null, { status: 204 });

  await recordShareEvent({
    userId: user.id,
    subjectKind: "mock",
    subjectSlug: parsed.data.slug,
    channel: parsed.data.channel,
    includedScore: parsed.data.includedScore,
  });

  return new NextResponse(null, { status: 204 });
}
