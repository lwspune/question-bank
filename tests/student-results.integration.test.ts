/**
 * Student results (migration 0149): the rules the DATABASE enforces. The page
 * is public, so these must hold whatever writes the table.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("student results (migration 0149)", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let announcementId = "";
  const users: string[] = [];

  const row = (userId: string, over: Record<string, unknown> = {}) => ({
    announcement_id: announcementId,
    user_id: userId,
    outcome: "cleared",
    display_name: "Asha Rao",
    show_publicly: true,
    published: true,
    source: "staff",
    ...over,
  });

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    const { data: exam } = await admin.from("exams").select("id").limit(1).single();
    const { data: a, error } = await admin
      .from("result_announcements")
      .insert({ exam_id: exam!.id, sitting: `Test ${RUN_ID}`, stage: "written", announced_on: "2026-10-01", ask_until: "2026-10-31" })
      .select("id")
      .single();
    if (error) throw new Error(`announcement fixture: ${error.message}`);
    announcementId = a!.id as string;
    for (let i = 0; i < 4; i++) {
      const { data } = await admin.auth.admin.createUser({ email: `results-${RUN_ID}-${i}@test.local`, email_confirm: true });
      users.push(data.user!.id);
    }
  });

  afterAll(async () => {
    if (announcementId) await admin.from("result_announcements").delete().eq("id", announcementId);
    for (const id of users) await admin.auth.admin.deleteUser(id);
  });

  it("shows anyone a published name, and nothing of an unpublished answer", async () => {
    expect((await admin.from("student_results").insert(row(users[0]))).error).toBeNull();
    expect(
      (await admin.from("student_results").insert(row(users[1], { display_name: "Hidden Name", published: false }))).error
    ).toBeNull();
    const { data, error } = await anon
      .from("student_results")
      .select("display_name")
      .eq("announcement_id", announcementId);
    expect(error).toBeNull();
    expect((data ?? []).map((r) => r.display_name)).toEqual(["Asha Rao"]);
  });

  it("never lets the public read whose account a result belongs to", async () => {
    const { error } = await anon.from("student_results").select("user_id").eq("announcement_id", announcementId);
    expect(error).not.toBeNull();
  });

  it("refuses an account handle as a shown name", async () => {
    const { error } = await admin.from("student_results").insert(row(users[2], { display_name: "Panda_74" }));
    expect(error?.code).toBe("23514");
  });

  it("refuses to publish a row the student did not agree to show", async () => {
    const { error } = await admin
      .from("student_results")
      .insert(row(users[3], { show_publicly: false, published: true }));
    expect(error?.code).toBe("23514");
  });

  it("refuses to show a student who did not clear", async () => {
    const { error } = await admin
      .from("student_results")
      .insert(row(users[3], { outcome: "not_cleared", published: false }));
    expect(error?.code).toBe("23514");
  });

  it("lets no one write a result without the service role", async () => {
    const { error } = await anon.from("student_results").insert(row(users[3]));
    expect(error).not.toBeNull();
  });
});
