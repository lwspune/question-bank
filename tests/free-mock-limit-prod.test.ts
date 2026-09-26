/**
 * PROD-CONTRACT: the free-mock number the COPY promises vs the one the
 * DATABASE enforces.
 *
 * The limit is enforced by migration 0120's trigger, which reads
 * paywall_settings.free_mock_limit — a value switched on by a data UPDATE, not
 * by a deploy. The Terms, /pricing, /account and the mock start page all quote
 * the number too, from FREE_MOCK_LIMIT. If someone changes one side and not the
 * other, the site promises 3 free mocks while charging after 2 (or the
 * reverse), and nothing else would notice.
 *
 * NULL (limit off) passes, and so does a missing table (0120 not applied yet):
 * both mean "no limit is enforced", which breaks no promise the copy makes
 * about the NUMBER. Switching the limit on is a go-live step in OPERATIONS.md.
 */
import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { FREE_MOCK_LIMIT } from "@/lib/mocks/quota";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("free-mock limit: copy vs paywall_settings", () => {
  it("the database limit is off, or equals FREE_MOCK_LIMIT", async () => {
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    const { data, error } = await client
      .from("paywall_settings")
      .select("free_mock_limit")
      .maybeSingle();

    // Table not there yet (0120 unapplied): no limit is enforced.
    if (error && (error.code === "PGRST205" || error.code === "42P01")) return;
    if (error) throw new Error(`paywall_settings: ${error.message}`);

    const limit = data?.free_mock_limit ?? null;
    if (limit !== null) expect(limit).toBe(FREE_MOCK_LIMIT);
  });
});
