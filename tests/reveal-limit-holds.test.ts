/**
 * PROD-CONTRACT: no student without a pass went past the daily answer limit
 * yesterday (IST).
 *
 * The limit leaked for weeks before anyone noticed (2026-11-07: one student
 * opened 81 answers against a limit of 15, found by chance). Since migration
 * 0228 the server decides every answer the site's buttons open, so this should
 * stay empty. A hit means something opened answers without asking: a tab
 * running code from before a deploy, a new surface that skipped the claim, or
 * someone reading answers out of the page.
 *
 * It measures against today's limit and passes (none of either is kept as
 * history), so a limit lowered mid-day or a lapsed pass can name a student
 * wrongly. Read the student's day before acting: the query is in migration 0229.
 * Yesterday, not today: today's count is still moving.
 */
import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { istDayKey } from "@/lib/email/dueNudge";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("the daily answer limit held yesterday", () => {
  it("names no student without a pass past the limit", async () => {
    const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const yesterday = istDayKey(new Date(Date.now() - 86_400_000));
    const { data, error } = await client.rpc("reveal_limit_overruns", { p_day: yesterday });
    expect(error).toBeNull();
    const rows = (data ?? []) as { user_id: string; used: number; day_limit: number }[];
    const named = rows.map((r) => `${r.user_id.slice(0, 8)}: ${r.used} of ${r.day_limit}`);
    expect(named, `past the daily answer limit on ${yesterday}`).toEqual([]);
  });
});
