/**
 * The global teardown's sweep against the test project, scoped to one run
 * (2026-11-09): it deletes the run's own test orgs and users, leaves another
 * live run's fresh ones alone, and deletes a killed run's leftovers once they
 * are older than STALE_HOURS. Pure rules: tests/test-run-ids.test.ts.
 *
 * "Own" and "other" are both ids from testRunId(), so the real teardown still
 * cleans up whatever this file leaves; the scope passed to sweepTestData is
 * what decides ownership here.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { sweepTestData } from "./global-teardown";
import { STALE_HOURS } from "./global-teardown-helpers";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const OWN = testRunId();
const OTHER = testRunId();
const OLD = testRunId();

describe.skipIf(!HAS_ENV)("sweepTestData scoped to one run", () => {
  let admin: SupabaseClient;
  const orgIds: Record<"own" | "other" | "old", string> = { own: "", other: "", old: "" };
  const userIds: Record<"own" | "other", string> = { own: "", other: "" };

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const old = new Date(Date.now() - (STALE_HOURS + 1) * 3_600_000).toISOString();
    const { data: orgs, error } = await admin
      .from("organizations")
      .insert([
        { name: `Sweep Own Org ${OWN}` },
        { name: `Sweep Other Org ${OTHER}` },
        { name: `Sweep Old Org ${OLD}`, created_at: old },
        // A batch otherwise writes NULL where a row leaves created_at out.
      ], { defaultToNull: false })
      .select("id, name");
    if (error) throw new Error(error.message);
    for (const o of orgs!) {
      if (o.name.endsWith(OWN)) orgIds.own = o.id;
      else if (o.name.endsWith(OTHER)) orgIds.other = o.id;
      else orgIds.old = o.id;
    }
    const [own, other] = await Promise.all([
      admin.auth.admin.createUser({ email: `sweep-own-${OWN}@test.local`, email_confirm: true }),
      admin.auth.admin.createUser({ email: `sweep-other-${OTHER}@test.invalid`, email_confirm: true }),
    ]);
    userIds.own = own.data.user!.id;
    userIds.other = other.data.user!.id;

    await sweepTestData(admin, { own: new Set([OWN]), now: new Date() });
  });

  afterAll(async () => {
    const ids = Object.values(orgIds).filter(Boolean);
    if (ids.length) await admin.from("organizations").delete().in("id", ids);
    for (const id of Object.values(userIds)) if (id) await admin.auth.admin.deleteUser(id).catch(() => undefined);
  });

  async function orgExists(id: string): Promise<boolean> {
    const { count } = await admin.from("organizations").select("id", { count: "exact", head: true }).eq("id", id);
    return (count ?? 0) > 0;
  }

  async function userExists(id: string): Promise<boolean> {
    const { data } = await admin.auth.admin.getUserById(id);
    return !!data.user;
  }

  it("deletes this run's test org and test user", async () => {
    expect(await orgExists(orgIds.own)).toBe(false);
    expect(await userExists(userIds.own)).toBe(false);
  });

  it("leaves another live run's fresh test org and test user alone", async () => {
    expect(await orgExists(orgIds.other)).toBe(true);
    expect(await userExists(userIds.other)).toBe(true);
  });

  it(`deletes another run's test org once it is older than ${STALE_HOURS} hours`, async () => {
    expect(await orgExists(orgIds.old)).toBe(false);
  });
});
