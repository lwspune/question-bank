/**
 * The repeat line's read (loadRepeatLines): question ids -> the line, from a
 * PUBLISHED homework plan's groups only, with the anon client the public pages
 * use. Pure wording is tests/repeat-line.test.ts.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { testRunId } from "./helpers/runId";
import { loadRepeatLines } from "@/lib/questions/repeatQuery";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type Q = { id: string; exam_id: string; subject_id: string };

describe.skipIf(!HAS_ENV)("loadRepeatLines", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  const RUN_ID = testRunId();
  const planId = randomUUID();
  const slug = `repeat-line-test-${RUN_ID}`;
  let qs: Q[] = [];

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
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
    qs = rows.filter((r) => key(r) === biggest).slice(0, 4);
    if (qs.length < 4) throw new Error("need 4 PUBLIC questions of one exam and subject in the test project");

    const { error } = await admin.from("homework_plans").insert({
      id: planId,
      slug,
      exam_id: qs[0].exam_id,
      subject_id: qs[0].subject_id,
      title: "Repeat line fixture",
      per_day: 5,
      published: true,
    });
    if (error) throw new Error(`plan fixture: ${error.message}`);

    const member = (q: Q, position: number, sitting: string) => ({ position, sub: 1, questionId: q.id, sitting });
    const typeSittings = ["Mar 2016", "Mar 2017", "Mar 2018", "Mar 2019", "Mar 2020"];
    const { error: rpcErr } = await admin.rpc("homework_replace_items", {
      p_plan_id: planId,
      p_items: qs.map((q, k) => ({ day: 1, position: k + 1, questionId: q.id, part: 1, note: "fixture" })),
      p_groups: [
        {
          n: 1,
          tier: "repeat",
          label: "Fixture repeat",
          sittings: ["NDA 1 2017*", "NDA 2 2024"],
          members: [member(qs[0], 1, "NDA 1 2017"), member(qs[1], 2, "NDA 2 2024")],
        },
        {
          n: 2,
          tier: "type",
          label: "Fixture type",
          sittings: typeSittings,
          members: [member(qs[0], 1, "Mar 2016"), member(qs[2], 2, "Mar 2020")],
        },
      ],
    });
    if (rpcErr) throw new Error(`groups fixture: ${rpcErr.message}`);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("homework_plans").delete().eq("id", planId);
  });

  it("gives each grouped question its line, an exact repeat before a type", async () => {
    const lines = await loadRepeatLines(anon, qs.map((q) => q.id));
    expect(lines.get(qs[0].id)).toMatchObject({ kind: "repeat", lead: "Asked in 2 papers", href: `/homework/${slug}/group/1` });
    expect(lines.get(qs[1].id)).toMatchObject({ kind: "repeat", count: 2 });
    expect(lines.get(qs[2].id)).toMatchObject({
      kind: "type",
      lead: "Questions like this were asked 5 times",
      rest: ", 2016 to 2020, each with its own numbers",
      href: `/homework/${slug}/group/2`,
    });
    expect(lines.has(qs[3].id)).toBe(false);
  });

  it("shows nothing from an unpublished plan", async () => {
    await admin.from("homework_plans").update({ published: false }).eq("id", planId);
    try {
      // Read with the service role too: the drill and mock review may, and RLS does not apply there.
      for (const client of [anon, admin]) {
        const lines = await loadRepeatLines(client, qs.map((q) => q.id));
        // Real published plans may hold the same seed questions; this plan's links must be gone.
        expect([...lines.values()].some((l) => l.href.includes(slug))).toBe(false);
      }
    } finally {
      await admin.from("homework_plans").update({ published: true }).eq("id", planId);
    }
  });

  it("makes no request for no ids", async () => {
    expect((await loadRepeatLines(anon, [])).size).toBe(0);
  });
});
