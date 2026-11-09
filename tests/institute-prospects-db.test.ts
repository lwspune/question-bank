/**
 * Integration test for institute_prospects (migration 0246).
 *
 * The table is RLS-enabled with NO policies: it holds institutes' phone
 * numbers (some are home tutors, so a private person's number) and the owner's
 * sales notes, so only the service role (the import script, /dashboard/institutes
 * and its save route) reads or writes it. The CHECKs are the data rules; the
 * upsert test is the import's promise that a re-run never overwrites the
 * owner's status or note.
 *
 * The service-role insert runs FIRST so "anon reads zero rows" runs against a
 * non-empty table. Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = testRunId();
const PREFIX = `test-${RUN_ID}-`;

function row(suffix: string, over: Record<string, unknown> = {}) {
  return {
    place_id: PREFIX + suffix,
    name: `Test Classes ${RUN_ID}`,
    category: "Coaching center",
    phone: "+91 95038 54178",
    lat: 18.523,
    lng: 73.842,
    distance_km: 0.11,
    rating: 4.6,
    reviews: 29,
    kind: "board",
    searches: ["tuition classes"],
    area: "FC Road",
    ...over,
  };
}

describe.skipIf(!HAS_ENV)("institute_prospects table", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;

  beforeAll(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anonClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
  });

  afterAll(async () => {
    await admin.from("institute_prospects").delete().like("place_id", `${PREFIX}%`);
  });

  const insert = (r: Record<string, unknown>) => admin.from("institute_prospects").insert(r);

  it("service role can insert a row, which starts as New", async () => {
    expect((await insert(row("a"))).error).toBeNull();
    const { data } = await admin.from("institute_prospects").select("status, note, follow_up").eq("place_id", PREFIX + "a").single();
    expect(data).toEqual({ status: "new", note: null, follow_up: null });
  });

  it("anon can neither insert nor read", async () => {
    expect((await anonClient.from("institute_prospects").insert(row("anon"))).error).not.toBeNull();
    const sel = await anonClient.from("institute_prospects").select("id");
    expect(sel.data ?? []).toEqual([]);
  });

  it("keeps one row per Google place", async () => {
    expect((await insert(row("a"))).error?.code).toBe("23505");
  });

  it("refuses an unknown status or kind, a bad rating or review count, a long note or a blank name", async () => {
    expect((await insert(row("s", { status: "maybe" }))).error?.code).toBe("23514");
    expect((await insert(row("k", { kind: "school" }))).error?.code).toBe("23514");
    expect((await insert(row("r", { rating: 5.5 }))).error?.code).toBe("23514");
    expect((await insert(row("v", { reviews: -1 }))).error?.code).toBe("23514");
    expect((await insert(row("n", { note: "x".repeat(1001) }))).error?.code).toBe("23514");
    expect((await insert(row("b", { name: "  " }))).error?.code).toBe("23514");
  });

  it("a re-import upsert updates the Maps fields and keeps the owner's status, note and follow-up", async () => {
    const edit = await admin
      .from("institute_prospects")
      .update({ status: "interested", note: "Wants a demo", follow_up: "2026-11-16" })
      .eq("place_id", PREFIX + "a");
    expect(edit.error).toBeNull();

    const again = await admin
      .from("institute_prospects")
      .upsert([row("a", { reviews: 31, rating: 4.7 })], { onConflict: "place_id" });
    expect(again.error).toBeNull();

    const { data } = await admin
      .from("institute_prospects")
      .select("reviews, rating, status, note, follow_up")
      .eq("place_id", PREFIX + "a")
      .single();
    expect(data).toEqual({ reviews: 31, rating: 4.7, status: "interested", note: "Wants a demo", follow_up: "2026-11-16" });
  });
});
