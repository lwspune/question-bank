/**
 * Read the signed-in daily answer limit (GET /api/me/reveals), asking once
 * more when the read fails (2026-11-08).
 *
 * A page asks for its quota once per load and keeps it. When that one read
 * failed, the page stayed unlimited until a reload: on 2026-11-07 the count
 * timed out for ~17 students and one opened 68 answers past a limit of 15.
 * The route now answers a failed read with 503, never "no limit", so it can be
 * told apart from a pass or a switched-off limit and asked for again.
 *
 * Still fails OPEN: two failures return null, no limit for this page load,
 * because a student is never walled by our error. A 401 (signed out) and other
 * 4xx replies are not retried: asking again cannot change them.
 */
import type { PassCta } from "@/lib/billing/plans";

export type QuotaReply = { limit: number | null; todayIds: string[]; pass?: PassCta | null };

export const QUOTA_RETRY_MS = 4000;

export async function fetchDailyQuota(
  load: () => Promise<Response>,
  wait: (ms: number) => Promise<void>,
  retryMs: number = QUOTA_RETRY_MS
): Promise<QuotaReply | null> {
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) await wait(retryMs);
    let res: Response;
    try {
      res = await load();
    } catch {
      continue; // offline or blocked: ask again
    }
    if (res.ok) {
      try {
        return (await res.json()) as QuotaReply;
      } catch {
        continue;
      }
    }
    if (res.status < 500) return null;
  }
  return null;
}
