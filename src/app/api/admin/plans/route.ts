import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { PLANS_CACHE_TAG } from "@/lib/billing/plansQuery";
import { requireSuperadmin, HttpError } from "@/lib/auth";
import {
  listAllPlans,
  upsertPlan,
  setPlanActive,
  readPaywallSettings,
  savePaywallSettings, saveBrandingSettings,
} from "@/lib/billing/admin";
import type { PlanInput } from "@/lib/billing/plans";
import { isPaywallLimit } from "@/lib/billing/paywallSettings";
import { parseBrandingSwitches } from "@/lib/export/branding";

export const maxDuration = 30;

type Body =
  | { action: "list" }
  | { action: "upsert"; plan: PlanInput & { active: boolean } }
  | { action: "setActive"; id: string; active: boolean }
  | { action: "saveSettings"; which?: string; enabled: boolean; limit: number }
  | { action: "saveBranding"; watermark: boolean; siteUrl: boolean; nameLine: boolean };

/** Every public page that renders a price or the free-mock number. */
const PAGES_QUOTING_PLANS = ["/pricing", "/terms", "/refunds"];

/**
 * The pass catalogue + the free-mock limit. Platform-wide, so superadmin only.
 * Each write revalidates the cached public pages that quote a price, so a
 * change shows within the request that follows, not a day later.
 */
export async function POST(request: NextRequest) {
  try {
    await requireSuperadmin();
    const body = (await request.json().catch(() => null)) as Body | null;
    if (!body || typeof body !== "object" || !("action" in body)) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    switch (body.action) {
      case "list": {
        const [plans, settings] = await Promise.all([listAllPlans(), readPaywallSettings()]);
        if (plans.kind === "error") return err500(plans.message);
        if (settings.kind === "error") return err500(settings.message);
        return NextResponse.json({ ok: true, plans: plans.plans, settings: settings.settings });
      }
      case "upsert": {
        if (!body.plan || typeof body.plan !== "object") return bad("Missing plan");
        const result = await upsertPlan(body.plan);
        if (result.kind === "invalid") {
          return NextResponse.json({ error: result.message, field: result.field }, { status: 400 });
        }
        if (result.kind === "error") return err500(result.message);
        revalidateQuotingPages();
        return NextResponse.json({ ok: true });
      }
      case "setActive": {
        if (typeof body.id !== "string" || typeof body.active !== "boolean") return bad("Missing id/active");
        const result = await setPlanActive(body.id, body.active);
        if (result.kind === "error") return err500(result.message);
        revalidateQuotingPages();
        return NextResponse.json({ ok: true });
      }
      case "saveSettings": {
        if (typeof body.enabled !== "boolean") return bad("Missing enabled");
        const which = body.which ?? "mocks";
        if (!isPaywallLimit(which)) return bad("Unknown limit");
        const result = await savePaywallSettings({ which, enabled: body.enabled, limit: Number(body.limit) });
        if (result.kind === "invalid") return bad(result.message);
        if (result.kind === "error") return err500(result.message);
        revalidateQuotingPages();
        return NextResponse.json({ ok: true, settings: result.settings });
      }
      case "saveBranding": {
        // Download branding switches (migration 0138). Read per download, so a
        // change applies to the next file; no public page quotes them.
        const parsed = parseBrandingSwitches(body);
        if (!parsed.ok) return bad(parsed.message);
        const result = await saveBrandingSettings(parsed.parts);
        if (result.kind === "error") return err500(result.message);
        return NextResponse.json({ ok: true, settings: result.settings });
      }
      default:
        return bad("Unknown action");
    }
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    console.error("admin plans route error", err);
    return err500("internal error");
  }
}

function revalidateQuotingPages() {
  for (const p of PAGES_QUOTING_PLANS) revalidatePath(p);
  // The price list /browse remembers (listActivePlansCached).
  revalidateTag(PLANS_CACHE_TAG);
}
function bad(msg: string) {
  return NextResponse.json({ error: msg }, { status: 400 });
}
function err500(msg: string) {
  console.error("admin plans error:", msg);
  return NextResponse.json({ error: "internal error" }, { status: 500 });
}
