/**
 * Authorization contract for get_dashboard_stats (migration 0082).
 *
 * WHY THE FUNCTION CHANGED: it aggregates three full passes over `questions`,
 * and under RLS the policy predicate forces a Seq Scan of every row. Measured
 * on prod 2026-08-22, same SQL text with only the role differing:
 *   authenticated (RLS on)  -> 4,470 ms, Seq Scan
 *   service_role  (RLS off) ->   165 ms, Index Only Scan on questions_filter_idx
 * Against an 8s statement_timeout, the RLS path was being cancelled (57014) on
 * roughly half of all dashboard loads.
 *
 * SECURITY DEFINER buys the fast plan, so the authorization RLS used to provide
 * has to be re-asserted explicitly. That is what this file pins:
 *   - a member reading their OWN org still works (and is unchanged),
 *   - a signed-in NON-member is refused (this also CLOSES a pre-existing hole:
 *     before 0082, any org's admin could pass another org's id and read its
 *     PUBLIC counts, because the RLS policy's first arm allows PUBLIC rows),
 *   - anon cannot execute the function at all,
 *   - service_role is unrestricted (server-only contexts: scripts, tests).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const PASSWORD = `dash-authz-${RUN_ID}`;
const MEMBER_EMAIL = `dash-member-${RUN_ID}@test.local`;
const OUTSIDER_EMAIL = `dash-outsider-${RUN_ID}@test.local`;

describe.skipIf(!HAS_ENV)("get_dashboard_stats authorization", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let memberClient: SupabaseClient;
  let outsiderClient: SupabaseClient;
  let orgId: string;
  let otherOrgId: string;
  const userIds: string[] = [];

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    anonClient = createClient(url, anonKey, { auth: { persistSession: false } });

    const { data: orgA } = await admin
      .from("organizations")
      .insert({ name: `__authz_a_${RUN_ID}` })
      .select("id")
      .single();
    orgId = orgA!.id;
    const { data: orgB } = await admin
      .from("organizations")
      .insert({ name: `__authz_b_${RUN_ID}` })
      .select("id")
      .single();
    otherOrgId = orgB!.id;

    async function signedInUser(email: string, org: string | null) {
      const { data: created, error } = await admin.auth.admin.createUser({
        email,
        password: PASSWORD,
        email_confirm: true,
      });
      if (error) throw error;
      userIds.push(created.user!.id);
      if (org) {
        await admin
          .from("org_members")
          .insert({ user_id: created.user!.id, org_id: org, role: "ADMIN" });
      }
      const c = createClient(url, anonKey, { auth: { persistSession: false } });
      const { error: sErr } = await c.auth.signInWithPassword({
        email,
        password: PASSWORD,
      });
      if (sErr) throw sErr;
      return c;
    }

    memberClient = await signedInUser(MEMBER_EMAIL, orgId);
    outsiderClient = await signedInUser(OUTSIDER_EMAIL, otherOrgId);
  }, 60_000);

  afterAll(async () => {
    for (const id of userIds) {
      await admin.from("org_members").delete().eq("user_id", id);
      await admin.auth.admin.deleteUser(id);
    }
    await admin.from("organizations").delete().eq("id", orgId);
    await admin.from("organizations").delete().eq("id", otherOrgId);
  });

  it("lets a member read their own org", async () => {
    const { data, error } = await memberClient.rpc("get_dashboard_stats", {
      p_org_id: orgId,
    });
    expect(error).toBeNull();
    expect(data).toBeTruthy();
    expect((data as { total_questions: number }).total_questions).toBe(0);
  });

  it("refuses a signed-in user asking for an org they do not belong to", async () => {
    const { error } = await outsiderClient.rpc("get_dashboard_stats", {
      p_org_id: orgId,
    });
    expect(error).not.toBeNull();
  });

  it("refuses anon entirely", async () => {
    const { error } = await anonClient.rpc("get_dashboard_stats", {
      p_org_id: orgId,
    });
    expect(error).not.toBeNull();
  });

  it("still lets service_role read any org (scripts, tests, cross-org admin)", async () => {
    const { data, error } = await admin.rpc("get_dashboard_stats", {
      p_org_id: otherOrgId,
    });
    expect(error).toBeNull();
    expect((data as { total_questions: number }).total_questions).toBe(0);
  });
});
