/**
 * V sees the follow-up answer (V_LEARNING_LOOP.md step 2, migration 0250),
 * against the test database: the server links a follow-up to an explanation
 * only when V really explained it today, once per explanation per day, and
 * marks the first one free (daily_reveals counts = false) only when the
 * switch is on. That a marked follow-up then costs no free answer is pinned in
 * free-save-limit.integration.test.ts, which owns the daily-limit setting.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { settleFollowUp } from "@/lib/chat/followUpServer";
import { istDayKey } from "@/lib/email/dueNudge";
import { mustSignIn } from "./helpers/fixture";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = testRunId();
const PASSWORD = "v-follow-up-pw-1234";

describe.skipIf(!HAS_ENV)("V follow-ups (0250)", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let userId = "";
  // Three PUBLIC questions in one subtopic, and one in another.
  let a = { id: "", subtopicId: "" as string | null };
  let b = { id: "", subtopicId: "" as string | null };
  let c = { id: "", subtopicId: "" as string | null };
  let other = { id: "", subtopicId: "" as string | null };
  const chatRowIds: string[] = [];
  const now = () => new Date();

  const explain = async (questionId: string, via: "tap" | "tool") => {
    const row =
      via === "tap"
        ? { asked_question_id: questionId, tool_calls: [{ name: "explain_question", input: { question_id: questionId } }] }
        : { asked_question_id: null, tool_calls: [{ name: "explain_question", input: { question_id: questionId } }] };
    const { data, error } = await admin
      .from("chat_interactions")
      .insert({ user_id: userId, event_type: "typed_question", message: "Explain this question.", reply: "Step 1 ...", reply_source: "ai", ...row })
      .select("id")
      .single();
    expect(error).toBeNull();
    chatRowIds.push(data!.id as string);
  };
  const reveal = async (questionId: string) =>
    (await admin.from("daily_reveals").select("counts").eq("user_id", userId).eq("ist_day", istDayKey(now())).eq("question_id", questionId).maybeSingle())
      .data as { counts: boolean } | null;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const email = `vfollowup-${RUN_ID}@test.local`;
    const { data } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
    userId = data.user!.id;
    student = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn(email, student, { email, password: PASSWORD });

    // A subtopic with at least three PUBLIC questions.
    const { data: rows, error } = await admin
      .from("questions")
      .select("id, subtopic_id")
      .eq("visibility", "PUBLIC")
      .not("subtopic_id", "is", null)
      .order("created_at", { ascending: true })
      .limit(500);
    expect(error).toBeNull();
    const bySub = new Map<string, string[]>();
    for (const r of rows ?? []) bySub.set(r.subtopic_id as string, [...(bySub.get(r.subtopic_id as string) ?? []), r.id as string]);
    const [sub, ids] = [...bySub].find(([, list]) => list.length >= 3)!;
    a = { id: ids[0], subtopicId: sub };
    b = { id: ids[1], subtopicId: sub };
    c = { id: ids[2], subtopicId: sub };
    const [otherSub, otherIds] = [...bySub].find(([s]) => s !== sub)!;
    other = { id: otherIds[0], subtopicId: otherSub };
  });

  afterAll(async () => {
    // chat_interactions keeps a deleted user's rows (user_id set null), so they go by id.
    if (chatRowIds.length) await admin.from("chat_interactions").delete().in("id", chatRowIds);
    // Cascades v_followups and daily_reveals.
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("does not link a follow-up to a question V never explained", async () => {
    expect(await settleFollowUp(admin, { userId, explained: a, followUp: b, switchOn: true, now: now() })).toEqual({ linked: false, free: false });
    expect(await reveal(b.id)).toBeNull();
  });

  it("links the first follow-up after an explanation and marks it free, so it uses no answer", async () => {
    await explain(a.id, "tap");
    expect(await settleFollowUp(admin, { userId, explained: a, followUp: b, switchOn: true, now: now() })).toEqual({ linked: true, free: true });
    expect(await reveal(b.id)).toEqual({ counts: false });
    const { data } = await admin.from("v_followups").select("followup_question_id, free").eq("user_id", userId).eq("explained_question_id", a.id);
    expect(data).toEqual([{ followup_question_id: b.id, free: true }]);
  });

  it("does not link or free a second follow-up for the same explanation that day", async () => {
    expect(await settleFollowUp(admin, { userId, explained: a, followUp: c, switchOn: true, now: now() })).toEqual({ linked: false, free: false });
    expect(await reveal(c.id)).toBeNull();
  });

  it("does not link a question from another subtopic, or the explained question itself", async () => {
    await explain(c.id, "tool");
    expect(await settleFollowUp(admin, { userId, explained: c, followUp: other, switchOn: true, now: now() })).toEqual({ linked: false, free: false });
    expect(await settleFollowUp(admin, { userId, explained: c, followUp: c, switchOn: true, now: now() })).toEqual({ linked: false, free: false });
  });

  it("with the switch off, links the follow-up (an explain_question call counts) but leaves it counted", async () => {
    expect(await settleFollowUp(admin, { userId, explained: c, followUp: a, switchOn: false, now: now() })).toEqual({ linked: true, free: false });
    expect(await reveal(a.id)).toBeNull();
  });

  it("lets the student read their own links but never write one", async () => {
    const { data } = await student.from("v_followups").select("explained_question_id");
    expect((data ?? []).length).toBe(2);
    const { error } = await student
      .from("v_followups")
      .insert({ user_id: userId, ist_day: istDayKey(now()), explained_question_id: other.id, followup_question_id: a.id, free: true });
    expect(error).not.toBeNull();
  });
});
