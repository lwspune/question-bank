/**
 * Student results (migration 0149): the rules the DATABASE enforces. The page
 * is public, so these must hold whatever writes the table.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { loadPendingResultChecks, saveResultAnswer } from "@/lib/results/service";
import { listResultsForReview, reviewResult } from "@/lib/results/admin";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("student results (migration 0149)", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let announcementId = "";
  let examId = "";
  let examSlug = "";
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
    const { data: exam } = await admin.from("exams").select("id").eq("name", "NDA").single();
    const { data: a, error } = await admin
      .from("result_announcements")
      .insert({ exam_id: examId = exam!.id, sitting: `Test ${RUN_ID}`, stage: "written", announced_on: "2026-10-01", ask_until: "2026-10-31" })
      .select("id")
      .single();
    if (error) throw new Error(`announcement fixture: ${error.message}`);
    const { data: ex } = await admin.from("exams").select("name").eq("id", examId).single();
    const { getExamByName } = await import("@/lib/exam/examContext");
    examSlug = getExamByName(ex!.name as string)?.slug ?? "";
    announcementId = a!.id as string;
    for (let i = 0; i < 6; i++) {
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

  // The server path the /me card uses (service role, session user's id).
  const DAY = "2026-10-15";

  it("asks a student who chose the exam until they answer", async () => {
    expect(examSlug).toBe("nda");
    const before = await loadPendingResultChecks(users[4], [examSlug], DAY);
    expect(before.map((a) => a.id)).toContain(announcementId);
    expect(await saveResultAnswer(users[4], { announcementId, outcome: "dismissed", showPublicly: false, displayName: null }, DAY)).toBe("saved");
    const after = await loadPendingResultChecks(users[4], [examSlug], DAY);
    expect(after.map((a) => a.id)).not.toContain(announcementId);
  });

  it("stores a student's yes unpublished, for review", async () => {
    const r = await saveResultAnswer(users[5], { announcementId, outcome: "cleared", showPublicly: true, displayName: "Meera Iyer" }, DAY);
    expect(r).toBe("saved");
    const { data } = await admin.from("student_results").select("published, source, display_name").eq("user_id", users[5]).single();
    expect(data).toEqual({ published: false, source: "self", display_name: "Meera Iyer" });
  });

  it("never takes down a published name when the student answers again", async () => {
    const r = await saveResultAnswer(users[0], { announcementId, outcome: "dismissed", showPublicly: false, displayName: null }, DAY);
    expect(r).toBe("unchanged");
    const { data } = await admin.from("student_results").select("published").eq("user_id", users[0]).single();
    expect(data?.published).toBe(true);
  });

  it("refuses an answer outside the announcement's window", async () => {
    const r = await saveResultAnswer(users[5], { announcementId, outcome: "not_cleared", showPublicly: false, displayName: null }, "2026-11-15");
    expect(r).toBe("closed");
  });

  it("lists a waiting name for review, then publishes it to the public", async () => {
    const mine = (await listResultsForReview()).find((a) => a.id === announcementId)!;
    const waiting = mine.waiting.find((n) => n.name === "Meera Iyer")!;
    expect(waiting.source).toBe("self");
    expect(mine.counts.cleared).toBeGreaterThanOrEqual(2);
    await reviewResult(waiting.id, "publish");
    const { data } = await anon.from("student_results").select("display_name").eq("announcement_id", announcementId);
    expect((data ?? []).map((r) => r.display_name)).toContain("Meera Iyer");
  });

  it("declining takes a name off the waiting list and off the page", async () => {
    const mine = (await listResultsForReview()).find((a) => a.id === announcementId)!;
    const meera = mine.published.find((n) => n.name === "Meera Iyer")!;
    await reviewResult(meera.id, "decline");
    const after = (await listResultsForReview()).find((a) => a.id === announcementId)!;
    expect(after.waiting.map((n) => n.name)).not.toContain("Meera Iyer");
    expect(after.published.map((n) => n.name)).not.toContain("Meera Iyer");
  });
});
