/**
 * DB-integration spec for `get_chapter_profile` (migration 0126): the
 * per-chapter years / papers / difficulty split behind the /questions landing
 * header.
 *
 * The RPC is checked against the facet aggregate the page already trusts:
 * for every chapter in a subject, easy + moderate + hard must equal
 * `get_chapter_facets`' count for the same (subject, kind). That ties the new
 * numbers to the old ones, so the header can never claim a split that does
 * not add up to the count printed beside it.
 *
 * Runs against the DEDICATED TEST project (tests/setup.ts); skipped without env.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

type ProfileRow = {
  chapter_id: string;
  min_year: number | null;
  max_year: number | null;
  sittings: number;
  easy_count: number;
  moderate_count: number;
  hard_count: number;
};

describe.skipIf(!HAS_ENV)("get_chapter_profile", () => {
  let db: SupabaseClient;
  let subjectId: string;

  beforeAll(async () => {
    db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    // Any subject that holds PUBLIC pyq rows will do.
    const { data } = await db
      .from("questions")
      .select("subject_id")
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .not("chapter_id", "is", null)
      .limit(1)
      .maybeSingle();
    subjectId = data?.subject_id as string;
    expect(subjectId).toBeTruthy();
  });

  it("splits by difficulty to exactly the facet count of every chapter", async () => {
    const [profile, facets] = await Promise.all([
      db.rpc("get_chapter_profile", { p_subject_id: subjectId, p_kind: "pyq" }),
      db.rpc("get_chapter_facets", {
        p_exam_id: null,
        p_subject_id: subjectId,
        p_difficulties: null,
        p_pyq_years: null,
        p_q: null,
        p_kind: "pyq",
      }),
    ]);
    expect(profile.error).toBeNull();
    expect(facets.error).toBeNull();

    const rows = (profile.data ?? []) as ProfileRow[];
    const counts = new Map(
      ((facets.data ?? []) as { chapter_id: string; q_count: number }[]).map((f) => [
        f.chapter_id,
        f.q_count,
      ])
    );
    expect(rows.length).toBe(counts.size);
    for (const r of rows) {
      expect(r.easy_count + r.moderate_count + r.hard_count).toBe(counts.get(r.chapter_id));
    }
  });

  it("reports a year range and at least one sitting wherever a year exists", async () => {
    const { data } = await db.rpc("get_chapter_profile", {
      p_subject_id: subjectId,
      p_kind: "pyq",
    });
    for (const r of (data ?? []) as ProfileRow[]) {
      if (r.min_year === null) {
        expect(r.max_year).toBeNull();
        expect(r.sittings).toBe(0);
        continue;
      }
      expect(r.max_year).toBeGreaterThanOrEqual(r.min_year);
      expect(r.sittings).toBeGreaterThanOrEqual(1);
      expect(r.sittings).toBeLessThanOrEqual(
        r.easy_count + r.moderate_count + r.hard_count
      );
    }
  });

  it("is callable by anon (the landing pages read through the anon client)", async () => {
    const anon = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    );
    const { error } = await anon.rpc("get_chapter_profile", {
      p_subject_id: subjectId,
      p_kind: "pyq",
    });
    expect(error).toBeNull();
  });
});
