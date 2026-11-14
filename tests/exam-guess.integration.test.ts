/**
 * Integration test: the stored exam guess (migration 0254).
 *   - a student reads their own guess, never another's, and cannot write one;
 *   - the card's actions (seen / correct / change) record through the service
 *     role, the first answer wins, and a card with no stored guess stores the
 *     live one it showed.
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";
import { testRunId } from "./helpers/runId";
import { loadStoredGuess, recordGuessCardAction } from "@/lib/profile/examGuessServer";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "guess-test-password-1234";
const RUN_ID = testRunId();

describe.skipIf(!HAS_ENV)("student exam guesses", () => {
  let admin: SupabaseClient;
  let student: SupabaseClient;
  let userId: string;
  let otherId: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const email = `exam-guess-${RUN_ID}@test.local`;
    const a = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
    userId = a.data.user!.id;
    const b = await admin.auth.admin.createUser({
      email: `exam-guess-other-${RUN_ID}@test.local`,
      password: PASSWORD,
      email_confirm: true,
    });
    otherId = b.data.user!.id;
    student = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn(email, student, { email, password: PASSWORD });
    const { error } = await admin.from("student_exam_guesses").insert([
      { user_id: userId, exam: "cbse-12", source: "practice" },
      { user_id: otherId, exam: "nda", source: "landing" },
    ]);
    if (error) throw new Error(error.message);
  });

  afterAll(async () => {
    if (userId) await admin.auth.admin.deleteUser(userId);
    if (otherId) await admin.auth.admin.deleteUser(otherId);
  });

  const row = async (id: string) =>
    (await admin.from("student_exam_guesses").select("*").eq("user_id", id).maybeSingle()).data as Record<
      string,
      unknown
    > | null;

  it("a student reads their own guess and not another student's", async () => {
    expect(await loadStoredGuess(student, userId)).toEqual({ exam: "cbse-12", source: "practice", card_answer: null });
    const { data } = await student.from("student_exam_guesses").select("user_id");
    expect((data ?? []).map((r) => r.user_id)).toEqual([userId]);
  });

  it("a student cannot write a guess, not even their own", async () => {
    const upd = await student.from("student_exam_guesses").update({ exam: "nda" }).eq("user_id", userId).select();
    expect(upd.error !== null || (upd.data ?? []).length === 0).toBe(true);
    const ins = await student
      .from("student_exam_guesses")
      .upsert({ user_id: userId, exam: "nda", source: "landing" }, { onConflict: "user_id" });
    expect(ins.error).not.toBeNull();
    expect((await row(userId))?.exam).toBe("cbse-12");
  });

  it("records when the card was first seen, once", async () => {
    const t1 = new Date("2026-11-20T05:00:00Z");
    expect(await recordGuessCardAction(admin, userId, "seen", t1, async () => null)).toBe(true);
    expect(Date.parse((await row(userId))!.card_seen_at as string)).toBe(t1.getTime());
    await recordGuessCardAction(admin, userId, "seen", new Date("2026-11-21T05:00:00Z"), async () => null);
    expect(Date.parse((await row(userId))!.card_seen_at as string)).toBe(t1.getTime());
  });

  it("the first answer wins", async () => {
    const t = new Date("2026-11-20T06:00:00Z");
    expect(await recordGuessCardAction(admin, userId, "correct", t, async () => null)).toBe(true);
    await recordGuessCardAction(admin, userId, "change", new Date("2026-11-20T07:00:00Z"), async () => null);
    const r = await row(userId);
    expect(r?.card_answer).toBe("correct");
    expect(Date.parse(r!.card_answered_at as string)).toBe(t.getTime());
  });

  it("stores the live guess a card showed when none was stored yet", async () => {
    await admin.from("student_exam_guesses").delete().eq("user_id", otherId);
    const t = new Date("2026-11-29T05:00:00Z");
    expect(
      await recordGuessCardAction(admin, otherId, "change", t, async () => ({ slug: "jee-mains", source: "landing" }))
    ).toBe(true);
    const r = await row(otherId);
    expect(r).toMatchObject({ exam: "jee-mains", source: "landing", card_answer: "change" });
    expect(Date.parse(r!.card_seen_at as string)).toBe(t.getTime());
  });

  it("records nothing when there is no guess at all", async () => {
    await admin.from("student_exam_guesses").delete().eq("user_id", otherId);
    expect(await recordGuessCardAction(admin, otherId, "seen", new Date(), async () => null)).toBe(false);
    expect(await row(otherId)).toBeNull();
  });
});
