/**
 * The pass a daily-answer wall sells in place: the bank's (GET /api/me/reveals,
 * 2026-10-25) and V's (2026-10-28). null when none is on sale or the read
 * failed, and the wall then links to /pricing. Server only.
 */
import { passCta, passForScope, type PassCta, type PlanSite } from "@/lib/billing/plans";
import { listActivePlansCached } from "@/lib/billing/plansQuery";
import { DOWNLOAD_PASS_SCOPE } from "@/lib/export/access";

export async function passOnSale(site: PlanSite = "pyqvault"): Promise<PassCta | null> {
  try {
    return passCta(passForScope(await listActivePlansCached(), DOWNLOAD_PASS_SCOPE, site));
  } catch (e) {
    console.error("reveal wall: plans read failed", e);
    return null;
  }
}
