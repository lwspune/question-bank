/**
 * Integration tests for the superadmin cross-org helpers (service-role).
 * Proves org onboarding: createOrg (+ dedup guard) and listOrgsWithStats.
 */
import { describe, it, expect, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { createOrg, listOrgsWithStats } from "@/lib/superadmin/admin";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const ORG_NAME = `Superadmin Test Org ${RUN_ID}`;

describe.skipIf(!HAS_ENV)("superadmin cross-org helpers", () => {
  let admin: SupabaseClient;
  let createdId: string | null = null;

  afterAll(async () => {
    if (!HAS_ENV) return;
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    if (createdId) await admin.from("organizations").delete().eq("id", createdId);
  });

  it("createOrg onboards a new org", async () => {
    const res = await createOrg(`  ${ORG_NAME}  `); // trims
    expect(res.ok).toBe(true);
    if (res.ok) createdId = res.id;
  });

  it("createOrg rejects a duplicate name (case-insensitive)", async () => {
    const res = await createOrg(ORG_NAME.toUpperCase());
    expect(res.ok).toBe(false);
  });

  it("createOrg rejects a blank name", async () => {
    expect((await createOrg("   ")).ok).toBe(false);
  });

  it("listOrgsWithStats includes the new org with zero members", async () => {
    const orgs = await listOrgsWithStats();
    const mine = orgs.find((o) => o.id === createdId);
    expect(mine).toBeDefined();
    expect(mine?.name).toBe(ORG_NAME);
    expect(mine?.memberCount).toBe(0);
    expect(mine?.adminCount).toBe(0);
    expect(mine?.questionCount).toBe(0);
  });
});
