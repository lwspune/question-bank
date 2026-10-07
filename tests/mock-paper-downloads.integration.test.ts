/**
 * The daily past-paper download limit in the DATABASE (migration 0137): a
 * BEFORE INSERT trigger on mock_paper_downloads, so two downloads at the same
 * instant cannot both slip past the route's early check.
 *
 * Rules pinned here (owner, 2026-10-07):
 *   - paywall_settings.mock_papers_per_day NULL = off
 *   - N different papers per user per IST day; the next is refused (PT429)
 *   - the same paper again that day is not a new paper (its answer key, or a
 *     second copy): the claim's upsert(ignoreDuplicates) still reaches the
 *     BEFORE INSERT trigger, and refusing it would block a key at the limit
 *   - another day's downloads do not count
 *   - a student cannot write the table (no write policy), so the count cannot
 *     be reset from the browser
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";
import { claimMockPaperDownload, readTodaysMockPapers } from "@/lib/export/mockPaperLimit";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "mock-paper-limit-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("mock paper daily download limit (migration 0137)", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let userId = "";
  const mockIds: string[] = [];
  let savedLimit: number | null | undefined;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    const email = `mockpaperlimit-${RUN_ID}@test.local`;
    const { data } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
    userId = data.user!.id;
    student = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn(email, student, { email, password: PASSWORD });

    // Three DRAFT papers: never listed anywhere, deleted in afterAll.
    const { data: exam } = await admin.from("exams").select("id").limit(1).single();
    for (let i = 0; i < 3; i++) {
      const { data: m, error } = await admin
        .from("mock_tests")
        .insert({
          id: randomUUID(), // mock_tests.id has no default
          slug: `test-paper-limit-${RUN_ID}-${i}`,
          exam_id: exam!.id,
          paper_code: `TPL${i}`,
          title: `Test paper ${i} ${RUN_ID}`,
          duration_secs: 60,
          marking: {},
          total_questions: 0,
          total_marks: 0,
          status: "draft",
          pyq_year: 2020, // a whole past paper must carry its year (mock_tests_full_pyq_has_year)
        })
        .select("id")
        .single();
      expect(error).toBeNull();
      mockIds.push(m!.id as string);
    }

    const { data: prev, error: readErr } = await admin
      .from("paywall_settings")
      .select("mock_papers_per_day")
      .single();
    expect(readErr).toBeNull();
    savedLimit = prev!.mock_papers_per_day as number | null;
    const { error: setErr } = await admin.from("paywall_settings").update({ mock_papers_per_day: 2 }).eq("id", true);
    expect(setErr).toBeNull();
  });

  afterAll(async () => {
    if (savedLimit !== undefined) {
      await admin.from("paywall_settings").update({ mock_papers_per_day: savedLimit }).eq("id", true);
    }
    if (userId) await admin.auth.admin.deleteUser(userId); // cascades its download rows
    if (mockIds.length) await admin.from("mock_tests").delete().in("id", mockIds);
  });

  it("allows two different papers, then refuses a third the same day", async () => {
    expect(await claimMockPaperDownload(admin, userId, mockIds[0])).toEqual({ kind: "ok" });
    expect(await claimMockPaperDownload(admin, userId, mockIds[1])).toEqual({ kind: "ok" });
    expect(await claimMockPaperDownload(admin, userId, mockIds[2])).toEqual({ kind: "limit", limit: 2 });
  });

  it("allows a paper already downloaded today, at the limit", async () => {
    expect(await claimMockPaperDownload(admin, userId, mockIds[0])).toEqual({ kind: "ok" });
  });

  it("reads back today's papers, each once", async () => {
    const r = await readTodaysMockPapers(admin, userId);
    expect(r.limit).toBe(2);
    expect([...r.todaysMockIds].sort()).toEqual([mockIds[0], mockIds[1]].sort());
  });

  it("does not count another day's downloads", async () => {
    await admin
      .from("mock_paper_downloads")
      .update({ ist_day: "2026-01-01" })
      .eq("user_id", userId);
    expect(await claimMockPaperDownload(admin, userId, mockIds[2])).toEqual({ kind: "ok" });
  });

  it("does not let a student write the table", async () => {
    const { error } = await student.from("mock_paper_downloads").insert({ user_id: userId, mock_id: mockIds[1] });
    expect(error).not.toBeNull();
  });

  it("refuses nothing while the limit is off", async () => {
    await admin.from("paywall_settings").update({ mock_papers_per_day: null }).eq("id", true);
    for (const id of mockIds) expect(await claimMockPaperDownload(admin, userId, id)).toEqual({ kind: "ok" });
  });
});
