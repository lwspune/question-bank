/**
 * POST /api/activity/practice — record that a signed-in student revealed the
 * answer to one or more bank questions (migration 0105, kind
 * `question_practiced`), on the SURFACE that revealed them.
 *
 * WHY THIS ROUTE EXISTS: /browse and the 317 /questions landing pages are the
 * core of the product — 70k of ~72k question rows — and recorded NOTHING when a
 * student used them. The reveal meter already computed the act client-side and
 * threw it away, so "mocks are the most-used feature" was indistinguishable
 * from "mocks are the only measured feature".
 *
 * A BEACON, NOT A SERVER WRITE ON RENDER. /questions is ISR-cached; doing this
 * work during a page render would mark those routes dynamic and cost the site
 * its prerendering — the exact failure that left this project with zero cached
 * pages for months. The client batches ids and flushes here.
 *
 * SIGNED-IN ONLY — see the 0105 header. An anonymous visitor would need a
 * persistent device identifier for this to mean anything over time, and that is
 * behavioural monitoring of an audience that is largely under 18.
 *
 * SURFACE, in metadata (2026-09-17): the same question row can be revealed on
 * /browse, in the /board reader, or inside a /guide worked example, and those
 * are different products even though they are the same act. Without this the
 * PMF readout could not answer "do the guides contribute to retention?" — the
 * question that exposed the gap. `metadata` is jsonb and `question_practiced`
 * was already an allowed kind, so this needed no migration; get_pmf_snapshot
 * coalesces a missing surface to 'bank', which is true of every row written
 * before today.
 *
 * Responses are deliberately terse (204/400/401): this is fire-and-forget from
 * sendBeacon, where nothing reads the body.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { checkAndIncrement } from "@/lib/rate-limit";
import { logActivityBatch } from "@/lib/activity/service";
import { parsePracticeBatch } from "@/lib/questions/practiceBatch";
import type { ActivityEvent } from "@/lib/activity/events";

/** Generous for a real reader, tight enough to bound a scripted client. */
const LIMIT_PER_HOUR = 120;
const HOUR_MS = 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  let user = null;
  try {
    user = await getSessionUser();
  } catch {
    user = null;
  }
  // Anonymous reveals are not recorded, by design — not an error the client
  // should retry, so say so plainly and cheaply.
  if (!user) return new NextResponse(null, { status: 401 });

  // Rate limit BEFORE parsing, so junk bodies still cost the caller their budget.
  const rl = await checkAndIncrement(createSupabaseAdminClient(), `practice:user:${user.id}`, {
    limit: LIMIT_PER_HOUR,
    windowMs: HOUR_MS,
  });
  if (!rl.ok) return new NextResponse(null, { status: 429 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = parsePracticeBatch(raw);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const events: ActivityEvent[] = parsed.ids.map((questionId) => ({
    kind: "question_practiced",
    refId: questionId,
    refKind: "question",
    // Written on EVERY row, including the bank's, so a row is self-describing
    // rather than meaningful only by the absence of a field.
    metadata: { surface: parsed.surface },
  }));

  // Through the user's JWT: user_activity is own-row insert under RLS, and this
  // is the student's own action. Best-effort — logActivityBatch never throws.
  await logActivityBatch(createSupabaseServerClient(), user.id, events);

  return new NextResponse(null, { status: 204 });
}
