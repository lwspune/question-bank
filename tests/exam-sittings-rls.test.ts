/**
 * Integration test for public.exam_sittings (migration 0281), the exam calendar.
 *
 * Load-bearing properties:
 *   - READ is open (anon included): every page's countdown reads it through
 *     one cached anon copy.
 *   - No JWT can write. Only the service role (`npm run calendar`) writes, so
 *     a signed-in account cannot move another student's countdown.
 *   - The table's CHECKs hold on their own, not only in the script: an
 *     official date needs its notice's https link, and a label has no dash.
 *
 * Writes throwaway rows under a fake exam slug (the column is checked by
 * pattern, not against the registry) and deletes them after. Skipped when env
 * is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "exam-sittings-test-1234";
const RUN_ID = testRunId();
const USER_EMAIL = `es-user-${RUN_ID}@test.local`;
const EXAM = "zz-calendar-test";
const SITTING = `t${RUN_ID.replace(/[^A-Za-z0-9]/g, "").slice(0, 18)}`;

const row = (over: Record<string, unknown> = {}) => ({
  exam: EXAM,
  sitting: SITTING,
  label: "Test sitting",
  date: "2027-06-01",
  official: false,
  source: "test",
  source_url: null,
  ...over,
});

describe.skipIf(!HAS_ENV)("exam_sittings RLS and checks", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let userClient: SupabaseClient;
  let userId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anonClient = createClient(url, anonKey, { auth: { persistSession: false } });
    const { data: created, error } = await admin.auth.admin.createUser({ email: USER_EMAIL, password: PASSWORD, email_confirm: true });
    if (error) throw error;
    userId = created.user!.id;
    userClient = createClient(url, anonKey, { auth: { persistSession: false } });
    await mustSignIn("exam sittings user", userClient, { email: USER_EMAIL, password: PASSWORD });

    const { error: seedErr } = await admin.from("exam_sittings").insert(row());
    if (seedErr) throw seedErr;
  });

  afterAll(async () => {
    if (!HAS_ENV) return;
    await admin.from("exam_sittings").delete().eq("exam", EXAM);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("anyone can read it, signed out included", async () => {
    for (const client of [anonClient, userClient]) {
      const { data, error } = await client.from("exam_sittings").select("exam, sitting, date").eq("exam", EXAM).eq("sitting", SITTING);
      expect(error).toBeNull();
      expect(data).toEqual([{ exam: EXAM, sitting: SITTING, date: "2027-06-01" }]);
    }
  });

  it("no signed-in or signed-out client can insert, update or delete", async () => {
    for (const client of [anonClient, userClient]) {
      const ins = await client.from("exam_sittings").insert(row({ sitting: `${SITTING}x` }));
      expect(ins.error).not.toBeNull();

      await client.from("exam_sittings").update({ date: "2030-01-01" }).eq("exam", EXAM);
      await client.from("exam_sittings").delete().eq("exam", EXAM);
    }
    const { data } = await admin.from("exam_sittings").select("date").eq("exam", EXAM);
    expect(data).toEqual([{ date: "2027-06-01" }]);
  });

  it("refuses an official date without an https notice link", async () => {
    for (const source_url of [null, "http://example.gov.in/n.pdf"]) {
      const { error } = await admin.from("exam_sittings").insert(row({ sitting: `${SITTING}o`, official: true, source_url }));
      expect(error?.code).toBe("23514");
    }
    const ok = await admin
      .from("exam_sittings")
      .insert(row({ sitting: `${SITTING}o`, official: true, source_url: "https://example.gov.in/n.pdf" }));
    expect(ok.error).toBeNull();
  });

  it("refuses a dash in the label and a bad sitting key", async () => {
    expect((await admin.from("exam_sittings").insert(row({ sitting: `${SITTING}d`, label: "Test — sitting" }))).error?.code).toBe("23514");
    expect((await admin.from("exam_sittings").insert(row({ sitting: "has space" }))).error?.code).toBe("23514");
  });
});
