/**
 * The stuck offer's server read (lib/questions/stuckOfferServer.ts) against the
 * test database: the student's recent graded answers on a subtopic decide it,
 * it fires once per streak, and the easier question is one they have not seen.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { readStuckOffer } from "@/lib/questions/stuckOfferServer";
import { mustSignIn } from "./helpers/fixture";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = testRunId();
const PASSWORD = "stuck-offer-pw-1234";

describe.skipIf(!HAS_ENV)("readStuckOffer", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let userId = "";
  let sub = "";
  let ids: string[] = [];
  let easyIds: string[] = [];
  let other = "";
  let minute = 0;

  const answer = async (questionId: string, correct: boolean, extra: Record<string, unknown> = {}) => {
    minute += 1;
    const { error } = await admin.from("user_activity").insert({
      user_id: userId,
      kind: "question_practiced",
      ref_id: questionId,
      ref_kind: "question",
      metadata: { surface: "bank", chose: correct ? "A" : "B", correct, ...extra },
      created_at: new Date(Date.UTC(2026, 10, 1, 6, minute)).toISOString(),
    });
    expect(error).toBeNull();
  };
  const offer = (questionId: string) => readStuckOffer(student, admin, userId, questionId);

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const email = `stuckoffer-${RUN_ID}@test.local`;
    const { data } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
    userId = data.user!.id;
    student = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn(email, student, { email, password: PASSWORD });

    // A subtopic with 8+ PUBLIC MCQs, at least one EASY and one not.
    const { data: rows, error } = await admin
      .from("questions")
      .select("id, subtopic_id, difficulty")
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .not("subtopic_id", "is", null)
      .order("created_at", { ascending: true })
      .limit(1000);
    expect(error).toBeNull();
    const bySub = new Map<string, { id: string; difficulty: string }[]>();
    for (const r of rows ?? []) bySub.set(r.subtopic_id as string, [...(bySub.get(r.subtopic_id as string) ?? []), { id: r.id as string, difficulty: r.difficulty as string }]);
    // The rule counts answers, not distinct questions, so a few questions answered more than once will do.
    const pick = [...bySub].find(([, l]) => l.some((q) => q.difficulty === "EASY") && l.filter((q) => q.difficulty !== "EASY").length >= 3);
    expect(pick).toBeTruthy();
    sub = pick![0];
    const hard = pick![1].filter((q) => q.difficulty !== "EASY").map((q) => q.id);
    ids = Array.from({ length: 7 }, (_, i) => hard[i % hard.length]);
    easyIds = pick![1].filter((q) => q.difficulty === "EASY").map((q) => q.id);
    other = [...bySub].find(([s]) => s !== sub)![1][0].id;
  });

  afterAll(async () => {
    // Cascades user_activity.
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("says nothing after two wrong answers", async () => {
    await answer(ids[0], false);
    await answer(ids[1], false);
    expect(await offer(ids[1])).toBeNull();
  });

  it("offers help on the third wrong one, with an easy question they have not answered", async () => {
    await answer(other, false); // another subtopic does not count
    await answer(ids[2], false);
    const o = await offer(ids[2]);
    expect(o).toMatchObject({ questionId: ids[2], history: [false, false, false] });
    expect(o!.subtopic.length).toBeGreaterThan(0);
    expect(easyIds).toContain(o!.easierId);
  });

  it("does not repeat it on the next wrong answer of the same streak, or count a self-mark", async () => {
    await answer(ids[3], true, { selfMark: "understood" });
    await answer(ids[3], false);
    expect(await offer(ids[3])).toBeNull();
  });

  it("offers it again only after right answers end the streak and a new 3 of 4 forms", async () => {
    await answer(ids[4], true);
    await answer(ids[5], true);
    await answer(ids[6], false);
    expect(await offer(ids[6])).toBeNull();
    await answer(ids[0], false);
    expect(await offer(ids[0])).toBeNull(); // R R W W: 2 of 4
    await answer(ids[1], false);
    expect(await offer(ids[1])).toMatchObject({ history: [true, false, false, false] });
  });
});
