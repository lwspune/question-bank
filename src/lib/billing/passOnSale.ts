/**
 * The pass a daily-answer wall sells in place: the bank's (GET /api/me/reveals,
 * 2026-10-25) and V's (2026-10-28). null when none is on sale or the read
 * failed, and the wall then links to /pricing. Server only.
 */
import { passCta, passForBuyer, type PassCta, type PlanSite } from "@/lib/billing/plans";
import { listActivePlansCached } from "@/lib/billing/plansQuery";
import { DOWNLOAD_PASS_SCOPE } from "@/lib/export/access";

/**
 * `scope`: the pass to sell (default the www pass); `country`: the buyer's,
 * for a plan priced for their country (0206). The order route re-prices for
 * the country anyway, so a wrong guess here costs only the shown price.
 */
export async function passOnSale(
  site: PlanSite = "pyqvault",
  opts: { scope?: string; country?: string | null } = {}
): Promise<PassCta | null> {
  try {
    return passCta(
      passForBuyer(await listActivePlansCached(), opts.scope ?? DOWNLOAD_PASS_SCOPE, site, opts.country ?? null)
    );
  } catch (e) {
    console.error("reveal wall: plans read failed", e);
    return null;
  }
}
