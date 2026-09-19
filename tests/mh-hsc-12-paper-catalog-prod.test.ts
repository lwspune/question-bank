/**
 * PROD-CONTRACT: the board-paper lane's generated catalog vs the LIVE taxonomy.
 *
 * `scripts/mh-hsc-12-pyq/paper/catalog.ts` was generated from prod on
 * 2026-09-19. A generated file nobody re-checks is a snapshot that quietly ages,
 * and this one decides where 264 incoming board questions get filed — a chapter
 * renamed in the DB would make the whole lane refuse, and a subtopic renamed
 * would silently auto-create a near-duplicate.
 *
 * Runs against PROD (read-only) via `npm run test:prod-contract`, because the
 * seeded test project carries no mh-hsc-12 content at all — pointed there this
 * fails for a reason that has nothing to do with the catalog.
 *
 * The pure catalog↔lib consistency checks live in mh-hsc-12-paper-catalog.test.ts
 * and run in the default suite.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { HSC_MATHS_CATALOG } from "../scripts/mh-hsc-12-pyq/paper/catalog";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("catalog vs the LIVE mh-hsc-12 Maths taxonomy", () => {
  const live: Record<string, string[]> = {};
  let resolved = false;

  beforeAll(async () => {
    const client: SupabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );
    const { data: exams } = await client.from("exams").select("id,name").ilike("name", "%HSC%");
    if (!exams?.length) return; // leaves resolved=false; the first test reports it
    const { data: subjects } = await client
      .from("subjects")
      .select("id,name")
      .eq("exam_id", exams[0].id)
      .ilike("name", "%math%");
    if (!subjects?.length) return;
    const { data: chapters } = await client.from("chapters").select("id,name").eq("subject_id", subjects[0].id);
    for (const ch of chapters ?? []) {
      const { data: subs } = await client.from("subtopics").select("name").eq("chapter_id", ch.id);
      live[ch.name as string] = (subs ?? []).map((s) => s.name as string);
    }
    resolved = true;
  }, 60_000);

  it("finds the mh-hsc-12 Mathematics taxonomy at all", () => {
    // Explicit, because an unresolved lookup would otherwise surface as "the
    // catalog has 15 chapters and the DB has 0" — a drift report for what is
    // really a connection or naming problem.
    expect(resolved, "could not resolve the HSC exam / Mathematics subject in prod").toBe(true);
  });

  it("names the same chapters the DB has, both directions", () => {
    expect(Object.keys(live).sort()).toEqual(Object.keys(HSC_MATHS_CATALOG.chapters).sort());
  });

  it("names, for each chapter, the same subtopics the DB has", () => {
    for (const [ch, subs] of Object.entries(HSC_MATHS_CATALOG.chapters)) {
      expect([...subs].sort(), ch).toEqual([...(live[ch] ?? [])].sort());
    }
  });
});
