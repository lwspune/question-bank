/**
 * POST /api/admin/feedback-reply: reply to a student's feature request with a
 * status and an optional note (migration 0243). Superadmin only, the same gate
 * as /dashboard/feedback. Saves the reply, then emails the student once per
 * status (lib/feedback/replyService). The response says what happened to the
 * email so the form can say it.
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requireSuperadmin, HttpError } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { validateReply } from "@/lib/feedback/replies";
import { saveFeedbackReply } from "@/lib/feedback/replyService";

const BodySchema = z.object({
  feedbackId: z.uuid(),
  status: z.string().max(20),
  note: z.string().max(4000).nullable().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireSuperadmin();
    const parsed = BodySchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return NextResponse.json({ error: "Send a request id and a status." }, { status: 400 });
    const reply = validateReply(parsed.data);
    if (!reply.ok) return NextResponse.json({ error: reply.error }, { status: 400 });

    const result = await saveFeedbackReply(createSupabaseAdminClient(), {
      feedbackId: parsed.data.feedbackId,
      reply: reply.value,
      repliedBy: user.id,
    });
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
    return NextResponse.json({ ok: true, email: result.email });
  } catch (err) {
    if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("feedback reply route error", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }
}
