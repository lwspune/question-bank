/**
 * GET /api/homework/group (2026-11-15): one repeat or type group's questions,
 * for the panel the repeat line's "See all" opens on the same page. The same
 * load as the /homework/<plan>/group/<n> page (lib/homework/groupPage), with
 * the anon client, against the TEST project.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { testRunId } from "./helpers/runId";
import { GET } from "@/app/api/homework/group/route";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type Q = { id: string; exam_id: string; subject_id: string };

async function get(query: string): Promise<{ status: number; json: Record<string, unknown> | null; cache: string | null }> {
  const res = await GET(new NextRequest(`http://localhost:3000/api/homework/group${query}`));
  const json = res.headers.get("content-type")?.includes("json") ? ((await res.json()) as Record<string, unknown>) : null;
  return { status: res.status, json, cache: res.headers.get("cache-control") };
}

describe.skipIf(!HAS_ENV)("GET /api/homework/group", () => {
  let admin: SupabaseClient;
  const RUN_ID = testRunId();
  const planId = randomUUID();
  const slug = `repeat-panel-test-${RUN_ID}`;
  let qs: Q[] = [];

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data: seed } = await admin
      .from("questions")
      .select("id, exam_id, subject_id")
      .eq("visibility", "PUBLIC")
      .order("id")
      .limit(1000);
    const rows = (seed ?? []) as Q[];
    const key = (r: Q) => `${r.exam_id} ${r.subject_id}`;
    const sizes = new Map<string, number>();
    for (const r of rows) sizes.set(key(r), (sizes.get(key(r)) ?? 0) + 1);
    const biggest = [...sizes].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0];
    qs = rows.filter((r) => key(r) === biggest).slice(0, 3);
    if (qs.length < 3) throw new Error("need 3 PUBLIC questions of one exam and subject in the test project");

    const { error } = await admin.from("homework_plans").insert({
      id: planId,
      slug,
      exam_id: qs[0].exam_id,
      subject_id: qs[0].subject_id,
      title: "Repeat panel fixture",
      per_day: 5,
      published: true,
    });
    if (error) throw new Error(`plan fixture: ${error.message}`);

    const { error: rpcErr } = await admin.rpc("homework_replace_items", {
      p_plan_id: planId,
      p_items: qs.map((q, k) => ({ day: 1, position: k + 1, questionId: q.id, part: 1, note: "fixture" })),
      p_groups: [
        {
          n: 1,
          tier: "repeat",
          label: "Fixture repeat",
          sittings: ["NDA 1 2017*", "NDA 1 2021", "NDA 2 2024"],
          members: [
            { position: 1, sub: 1, questionId: qs[0].id, sitting: "NDA 1 2017" },
            { position: 2, sub: 1, questionId: qs[1].id, sitting: "NDA 1 2021" },
            { position: 3, sub: 1, questionId: qs[2].id, sitting: "NDA 2 2024" },
          ],
        },
      ],
    });
    if (rpcErr) throw new Error(`groups fixture: ${rpcErr.message}`);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("homework_plans").delete().eq("id", planId);
  });

  it("returns the group's questions in order, with what the panel needs to show them", async () => {
    const r = await get(`?plan=${slug}&n=1`);
    expect(r.status).toBe(200);
    expect(r.json).toMatchObject({
      label: "Fixture repeat",
      tier: "repeat",
      title: "Repeat panel fixture",
      href: `/homework/${slug}/group/1`,
    });
    expect(typeof r.json?.examName).toBe("string");
    expect(typeof r.json?.heading).toBe("string");
    const slots = r.json?.slots as { questions: { id: string }[] }[];
    expect(slots.flatMap((s) => s.questions.map((q) => q.id))).toEqual(qs.map((q) => q.id));
  });

  it("lets the CDN keep it for a day, like the group page", async () => {
    const r = await get(`?plan=${slug}&n=1`);
    expect(r.cache).toContain("s-maxage=86400");
  });

  it("is a 404 for a group or plan that does not exist", async () => {
    expect((await get(`?plan=${slug}&n=99`)).status).toBe(404);
    expect((await get(`?plan=no-such-plan-${RUN_ID}&n=1`)).status).toBe(404);
  });

  it("is a 400 for a malformed request, before any read", async () => {
    expect((await get(`?plan=${slug}&n=0`)).status).toBe(400);
    expect((await get(`?plan=${slug}&n=abc`)).status).toBe(400);
    expect((await get(`?n=1`)).status).toBe(400);
    expect((await get(`?plan=Bad Slug!&n=1`)).status).toBe(400);
  });
});
