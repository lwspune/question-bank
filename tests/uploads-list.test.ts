/**
 * Integration test for the /uploads index page helper.
 * Uses the live DB and the LWS Pune org (which has many uploads).
 * Skipped if env is not present.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { listUploads } from "@/lib/uploads/listUploads";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("listUploads (against LWS Pune seed)", () => {
  let client: SupabaseClient;
  let orgId: string;
  let totalUploads: number;

  beforeAll(async () => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    const { data: org } = await client
      .from("organizations")
      .select("id")
      .eq("name", "LWS Pune")
      .single();
    orgId = org!.id;

    const { count } = await client
      .from("upload_jobs")
      .select("id", { count: "exact", head: true })
      .eq("org_id", orgId);
    totalUploads = count ?? 0;
  });

  it("returns total reflecting the true upload count for the org", async () => {
    const { total } = await listUploads(client, orgId, {
      page: 1,
      pageSize: 20,
    });
    expect(total).toBe(totalUploads);
  });

  it("orders items by created_at DESC", async () => {
    const { items } = await listUploads(client, orgId, {
      page: 1,
      pageSize: 20,
    });
    expect(items.length).toBeGreaterThan(0);
    for (let i = 1; i < items.length; i++) {
      expect(
        new Date(items[i - 1].createdAt).getTime()
      ).toBeGreaterThanOrEqual(new Date(items[i].createdAt).getTime());
    }
  });

  it("paginates: page 1 and page 2 with pageSize=2 return distinct rows", async () => {
    if (totalUploads < 3) return; // not enough data to exercise pagination
    const page1 = await listUploads(client, orgId, { page: 1, pageSize: 2 });
    const page2 = await listUploads(client, orgId, { page: 2, pageSize: 2 });

    expect(page1.items.length).toBe(2);
    expect(page2.items.length).toBeGreaterThan(0);

    const ids1 = new Set(page1.items.map((i) => i.id));
    for (const item of page2.items) {
      expect(ids1.has(item.id)).toBe(false);
    }

    expect(page1.total).toBe(totalUploads);
    expect(page2.total).toBe(totalUploads);
  });

  it("out-of-range page returns empty items but correct total", async () => {
    const { items, total } = await listUploads(client, orgId, {
      page: 9999,
      pageSize: 20,
    });
    expect(items).toEqual([]);
    expect(total).toBe(totalUploads);
  });

  it("includes filename, inserted, skipped, status, and createdAt", async () => {
    const { items } = await listUploads(client, orgId, {
      page: 1,
      pageSize: 1,
    });
    expect(items.length).toBe(1);
    const [first] = items;
    expect(first.id).toEqual(expect.any(String));
    expect(first.filename).toEqual(expect.any(String));
    expect(first.inserted).toEqual(expect.any(Number));
    expect(first.skipped).toEqual(expect.any(Number));
    expect(first.status).toMatch(/^(PENDING|PROCESSING|COMPLETED|FAILED)$/);
    expect(first.createdAt).toEqual(expect.any(String));
  });

  it("returns total=0 and items=[] for an org with no uploads", async () => {
    const { data: emptyOrg, error } = await client
      .from("organizations")
      .insert({ name: `__test_empty_org_${Date.now()}` })
      .select("id")
      .single();
    expect(error).toBeNull();
    try {
      const { items, total } = await listUploads(client, emptyOrg!.id, {
        page: 1,
        pageSize: 20,
      });
      expect(items).toEqual([]);
      expect(total).toBe(0);
    } finally {
      await client.from("organizations").delete().eq("id", emptyOrg!.id);
    }
  });
});
