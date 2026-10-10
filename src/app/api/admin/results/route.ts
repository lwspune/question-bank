/**
 * POST /api/admin/results: publish, take down or decline a student's request
 * to be shown on /results (migration 0149), or `mark` a student's result from
 * their dashboard page in one step (staff hold their consent). Superadmin only. A change clears
 * the results cache and every page that shows that exam's results
 * (resultPagePaths), so it is live on the next page load, not the next day.
 */
import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { requireSuperadmin, HttpError } from "@/lib/auth";
import { markStudentResult, reviewResult } from "@/lib/results/admin";
import { validateStaffMark } from "@/lib/results/mark";
import { istDayKey } from "@/lib/email/dueNudge";
import { RESULTS_CACHE_TAG } from "@/lib/results/query";
import { resultPagePaths } from "@/lib/results/summary";
import { mockFamilyOf } from "@/lib/mocks/mocksNav";

const ACTIONS = ["publish", "unpublish", "decline"] as const;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  try {
    await requireSuperadmin();
    const body = (await request.json().catch(() => null)) as { action?: string; id?: string } | null;
    let examSlug: string | null;
    if (body?.action === "mark") {
      const mark = validateStaffMark(body);
      if (!mark.ok) return NextResponse.json({ error: mark.error }, { status: 400 });
      examSlug = await markStudentResult(mark.value, istDayKey(new Date()));
    } else {
      const action = ACTIONS.find((a) => a === body?.action);
      if (!action || typeof body?.id !== "string" || !UUID.test(body.id)) {
        return NextResponse.json({ error: "Send an action and a result id." }, { status: 400 });
      }
      examSlug = await reviewResult(body.id, action);
    }
    revalidateTag(RESULTS_CACHE_TAG);
    const paths = examSlug ? resultPagePaths(examSlug, mockFamilyOf(examSlug)?.slug ?? null) : ["/results", "/", "/pricing"];
    for (const path of paths) revalidatePath(path);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof HttpError) return NextResponse.json({ error: err.message }, { status: err.status });
    console.error("admin results route error", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }
}
