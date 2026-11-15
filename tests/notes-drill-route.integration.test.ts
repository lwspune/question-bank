/**
 * GET /api/notes/drill (2026-11-15): one page of a notes drill link's questions,
 * for the panel the link opens on the notes page. Anon client, so PUBLIC rows
 * only, cached like the page. Read-only against the TEST project.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { NextRequest } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { GET } from "@/app/api/notes/drill/route";
import { DRILL_PAGE_SIZE } from "@/lib/notes/drillPanel";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type Body = { rows?: { id: string; options: unknown[] }[]; total?: number; error?: string };

async function get(query: string): Promise<{ status: number; json: Body; cache: string | null }> {
  const res = await GET(new NextRequest(`http://localhost:3000/api/notes/drill${query}`));
  return { status: res.status, json: (await res.json()) as Body, cache: res.headers.get("cache-control") };
}

describe.skipIf(!HAS_ENV)("GET /api/notes/drill", () => {
  let admin: SupabaseClient;
  let ids: string[] = [];
  let subtopic: { id: string; total: number } | null = null;

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data } = await admin
      .from("questions")
      .select("id, subtopic_id")
      .eq("visibility", "PUBLIC")
      .not("subtopic_id", "is", null)
      .order("id")
      .limit(1000);
    const rows = (data ?? []) as { id: string; subtopic_id: string }[];
    ids = rows.slice(0, 3).map((r) => r.id);
    if (ids.length < 3) throw new Error("need 3 PUBLIC questions in the test project");

    const counts = new Map<string, number>();
    for (const r of rows) counts.set(r.subtopic_id, (counts.get(r.subtopic_id) ?? 0) + 1);
    const biggest = [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0];
    const { count } = await admin
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("visibility", "PUBLIC")
      .eq("subtopic_id", biggest);
    subtopic = { id: biggest, total: count ?? 0 };
  });

  it("returns a concept's ids in the order asked, with their options, cached", async () => {
    const asked = [...ids].reverse();
    const { status, json, cache } = await get(`?ids=${asked.join(",")}`);
    expect(status).toBe(200);
    expect(json.rows!.map((r) => r.id)).toEqual(asked);
    expect(Array.isArray(json.rows![0].options)).toBe(true);
    expect(cache).toMatch(/s-maxage=86400/);
  });

  it("returns one page of a topic and how many it holds", async () => {
    const { status, json } = await get(`?subtopic=${subtopic!.id}&kind=all&page=1`);
    expect(status).toBe(200);
    expect(json.total).toBe(subtopic!.total);
    expect(json.rows!.length).toBe(Math.min(DRILL_PAGE_SIZE, subtopic!.total));
  });

  it("returns an empty page past the end, not an error", async () => {
    const { status, json } = await get(`?subtopic=${subtopic!.id}&kind=all&page=100`);
    expect(status).toBe(200);
    expect(json.rows).toEqual([]);
  });

  it("refuses a malformed request with 400", async () => {
    expect((await get("?ids=nope")).status).toBe(400);
    expect((await get(`?subtopic=${subtopic!.id}&kind=practice`)).status).toBe(400);
    expect((await get("")).status).toBe(400);
  });
});
