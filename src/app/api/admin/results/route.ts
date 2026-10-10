/**
 * POST /api/admin/results: publish, take down or decline a student's request
 * to be shown on /results (migration 0149). Superadmin only. A change clears
 * the results cache and the three pages that show results, so it is live on
 * the next page load rather than the next day.
 */
import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { requireSuperadmin, HttpError } from "@/lib/auth";
import { reviewResult } from "@/lib/results/admin";
import { RESULTS_CACHE_TAG } from "@/lib/results/query";

const ACTIONS = ["publish", "unpublish", "decline"] as const;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  try {
    await requireSuperadmin();
    const body = (await request.json().catch(() => null)) as { action?: string; id?: string } | null;
    const action = ACTIONS.find((a) => a === body?.action);
    if (!action || typeof body?.id !== "string" || !UUID.test(body.id)) {
      return NextResponse.json({ error: "Send an action and a result id." }, { status: 400 });
    }
    await reviewResult(body.id, action);
    revalidateTag(RESULTS_CACHE_TAG);
    for (const path of ["/results", "/", "/nda"]) revalidatePath(path);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("admin results route error", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }
}
