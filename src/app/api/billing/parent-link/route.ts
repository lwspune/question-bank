import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { listActivePlans } from "@/lib/billing/plansQuery";
import { formatPrice, ownsPlan, planLengthLabel } from "@/lib/billing/plans";
import { upgradePricePaise } from "@/lib/billing/upgrade";
import { loadEntitlements } from "@/lib/entitlements/query";
import { parentFirstName, parentPayUrl, parentShareText } from "@/lib/billing/parentLink";
import { findOrCreateParentLink } from "@/lib/billing/parentLinkStore";
import { studentExamName } from "@/lib/billing/parentPayService";
import { logActivityOnce } from "@/lib/activity/service";
import { checkoutBox, checkoutGate, paywallEvent } from "@/lib/activity/clientEvents";

export const maxDuration = 30;

/**
 * "Ask a parent to pay" (2026-11-09, migration 0244): the student's short link
 * for a pass, and the message to send with it. Reuses the student's live link
 * for that pass, so tapping twice sends the same link.
 */
export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Sign in first" }, { status: 401 });

  const body = (await request.json().catch(() => null)) as { planId?: unknown; gate?: unknown; box?: unknown } | null;
  const db = createSupabaseServerClient();
  const plans = await listActivePlans(db);
  const plan = plans.find((p) => p.id === body?.planId && p.site === "pyqvault" && p.currency === "INR") ?? null;
  if (!plan) return NextResponse.json({ error: "Unknown pass" }, { status: 400 });

  const admin = createSupabaseAdminClient();
  const now = Date.now();
  const rows = await loadEntitlements(admin, user.id);
  if (ownsPlan(rows, plan, now)) {
    return NextResponse.json({ error: "You already have this pass." }, { status: 409 });
  }

  try {
    const [link, examName] = await Promise.all([
      findOrCreateParentLink(admin, {
        userId: user.id,
        planId: plan.id,
        studentName: parentFirstName(user.preferredName, user.name),
        nowMs: now,
      }),
      studentExamName(db, user.id),
    ]);
    const url = parentPayUrl(link.code);
    const text = parentShareText({
      examName,
      planLabel: plan.label,
      price: formatPrice(upgradePricePaise(plan, rows, plans, now), plan.currency),
      length: planLengthLabel(plan),
      url,
    });
    const event = paywallEvent("parent_link_created", checkoutGate(body?.gate), plan.id, undefined, checkoutBox(body?.box));
    await logActivityOnce(db, user.id, { ...event, dedupeKey: `paywall:parent_link_created:${link.code}` });
    return NextResponse.json({ code: link.code, url, text });
  } catch (err) {
    console.error("parent link failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not make the link. Try again." }, { status: 500 });
  }
}
