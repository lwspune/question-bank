/**
 * Integration test for taxonomy seeding.
 * Requires DATABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local.
 * Skipped automatically until those are present.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const TINY_TAXONOMY = {
  exams: [
    {
      name: "__TEST_EXAM__",
      subjects: [
        {
          name: "__TEST_SUBJECT__",
          chapters: [
            {
              name: "__TEST_CHAPTER__",
              orderIndex: 0,
              subtopics: ["__TEST_SUBTOPIC_A__", "__TEST_SUBTOPIC_B__"],
            },
          ],
        },
      ],
    },
  ],
};

describe.skipIf(!HAS_ENV)("seedTaxonomy idempotency", () => {
  let admin: SupabaseClient;

  beforeAll(() => {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  });

  afterAll(async () => {
    // Clean up the test exam (cascades to subjects → chapters → subtopics).
    await admin.from("exams").delete().eq("name", "__TEST_EXAM__");
  });

  it("inserts taxonomy on first run, no-ops on second run", async () => {
    const { seedTaxonomy } = await import("@/lib/seed");

    const first = await seedTaxonomy(admin, TINY_TAXONOMY);
    expect(first.exams).toBe(1);
    expect(first.subjects).toBe(1);
    expect(first.chapters).toBe(1);
    expect(first.subtopics).toBe(2);

    const { data: examsAfterFirst } = await admin
      .from("exams")
      .select("id")
      .eq("name", "__TEST_EXAM__");
    expect(examsAfterFirst?.length).toBe(1);

    const second = await seedTaxonomy(admin, TINY_TAXONOMY);
    expect(second.exams).toBe(0);
    expect(second.subjects).toBe(0);
    expect(second.chapters).toBe(0);
    expect(second.subtopics).toBe(0);

    const { data: examsAfterSecond } = await admin
      .from("exams")
      .select("id")
      .eq("name", "__TEST_EXAM__");
    expect(examsAfterSecond?.length).toBe(1);
  });
});
