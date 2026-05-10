/**
 * queryQuestionsByIds — used by the cart-mode export and the /api/cart/preview
 * endpoint. Returns rows in the order specified by the input IDs (cart-insertion
 * order), drops any IDs that don't resolve under current RLS scope.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { queryQuestionsByIds } from "@/lib/questions/query";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("queryQuestionsByIds (against LWS Pune seed)", () => {
  let client: SupabaseClient;
  let sampleIds: string[];

  beforeAll(async () => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    const { data } = await client
      .from("questions")
      .select("id")
      .limit(5);
    sampleIds = (data ?? []).map((r) => r.id as string);
  });

  it("returns rows in the order given by ids[] (cart-insertion preserved)", async () => {
    // Reverse to ensure the returned order matches the input, not the DB order.
    const ids = [...sampleIds].reverse();
    const rows = await queryQuestionsByIds(client, ids);
    expect(rows.map((r) => r.id)).toEqual(ids);
  });

  it("drops unknown ids silently rather than failing the whole batch", async () => {
    const ids = [
      sampleIds[0],
      "00000000-0000-0000-0000-000000000000",
      sampleIds[1],
    ];
    const rows = await queryQuestionsByIds(client, ids);
    expect(rows.map((r) => r.id)).toEqual([sampleIds[0], sampleIds[1]]);
  });

  it("returns [] for an empty input array (no DB call needed)", async () => {
    expect(await queryQuestionsByIds(client, [])).toEqual([]);
  });

  it("hydrates options + taxonomy on every returned row", async () => {
    const rows = await queryQuestionsByIds(client, [sampleIds[0]]);
    expect(rows).toHaveLength(1);
    const r = rows[0];
    expect(r.options).toHaveLength(4);
    expect(r.options.map((o) => o.label)).toEqual(["A", "B", "C", "D"]);
    expect(r.exam.name).toBeTruthy();
    expect(r.subject.name).toBeTruthy();
    expect(r.chapter.name).toBeTruthy();
  });
});
