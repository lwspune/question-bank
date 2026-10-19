/**
 * GET /api/chat/plan: the student's week plan for the card inside V
 * (2026-10-19, study-partner Phase 3; lib/chat/weekPlan.ts). Each day with its
 * task, page and whether it is done, ticked from the log at read time. Read
 * with the student's own login (study_plans and user_activity are own-row),
 * and never cached: it is theirs, and the ticks move. Not found while plans
 * are switched off at /dashboard/chat (0170).
 */
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { dayLabel, planStartIst, planView, tickPlan } from "@/lib/chat/weekPlan";
import { loadCurrentPlan, loadPlanActivity } from "@/lib/chat/weekPlanServer";
import { readChatSettings } from "@/lib/chat/settingsAdmin";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store, private" } as const;

export async function GET() {
  let userId: string | null = null;
  try {
    userId = (await getSessionUser())?.id ?? null;
  } catch {
    userId = null;
  }
  if (!userId) return NextResponse.json({ error: "Not signed in." }, { status: 401, headers: NO_STORE });

  try {
    // Switched off at /dashboard/chat (0170): no card.
    if (!(await readChatSettings(createSupabaseAdminClient())).planEnabled) {
      return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_STORE });
    }
    const db = createSupabaseServerClient();
    const now = new Date();
    const plan = await loadCurrentPlan(db, userId, now);
    if (!plan) return NextResponse.json({ plan: null }, { headers: NO_STORE });
    const view = planView(plan, tickPlan(plan.items, await loadPlanActivity(db, userId, plan)));
    const exam = EXAM_REGISTRY.find((e) => e.slug === plan.examSlug)?.displayName ?? plan.examSlug;
    return NextResponse.json(
      {
        plan: {
          title: `${exam}${plan.subject ? ` ${plan.subject}` : ""}: ${dayLabel(plan.startsOn, 0)} to ${dayLabel(plan.startsOn, 6)}`,
          today: dayLabel(planStartIst(now), 0),
          ...view,
        },
      },
      { headers: NO_STORE }
    );
  } catch (err) {
    console.error("chat/plan GET failed", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500, headers: NO_STORE });
  }
}
