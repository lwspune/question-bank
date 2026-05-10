import type { SupabaseClient } from "@supabase/supabase-js";

export type RateLimitOptions = {
  /** Max calls allowed per window. */
  limit: number;
  /** Window length in milliseconds. Buckets are aligned to this. */
  windowMs: number;
};

export type RateLimitResult =
  | { ok: true; limit: number; used: number; windowStart: string }
  | {
      ok: false;
      limit: number;
      used: number;
      retryAfter: number; // seconds
      windowStart: string;
    };

/**
 * Atomically increment a per-bucket counter for the current time window.
 * Returns ok=false (with retryAfter in seconds) once the count exceeds the
 * configured limit.
 *
 * Storage: the public.rate_limits table + public.rate_limit_increment SQL
 * function (service-role only). Each call also opportunistically GCs old
 * windows for the same bucket so the table stays small without a cron.
 */
export async function checkAndIncrement(
  client: SupabaseClient,
  bucket: string,
  opts: RateLimitOptions
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowStartMs = Math.floor(now / opts.windowMs) * opts.windowMs;
  const windowStartIso = new Date(windowStartMs).toISOString();

  const { data, error } = await client.rpc("rate_limit_increment", {
    p_bucket: bucket,
    p_window_start: windowStartIso,
  });
  if (error) {
    throw new Error(`rate_limit_increment failed: ${error.message}`);
  }
  const used = typeof data === "number" ? data : Number(data);

  if (used <= opts.limit) {
    return { ok: true, limit: opts.limit, used, windowStart: windowStartIso };
  }

  const windowEndMs = windowStartMs + opts.windowMs;
  const retryAfter = Math.max(1, Math.ceil((windowEndMs - now) / 1000));
  return {
    ok: false,
    limit: opts.limit,
    used,
    retryAfter,
    windowStart: windowStartIso,
  };
}
