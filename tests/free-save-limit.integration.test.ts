/**
 * The free saved-question limit (migration 0134), enforced by a BEFORE INSERT
 * trigger on question_bookmarks. In the database, not the route, because a
 * student's own JWT can insert a bookmark straight through PostgREST (0047's
 * own-row policy), so a route check alone would be a button, not a limit.
 *
 * Rules pinned here:
 *   - free_save_limit NULL (the shipped default) = off
 *   - a free account may hold `free_save_limit` saved questions; the next is
 *     refused with SQLSTATE PT402 (HTTP 402 through PostgREST)
 *   - saving a question that is ALREADY saved is not a new save: the app's
 *     upsert(ignoreDuplicates) still reaches a BEFORE INSERT trigger, and
 *     refusing it would break the save button for a student at the limit
 *   - removing a save frees a slot
 *   - a pass holder is never limited
 *   - my_premium_limits() reports the numbers the app shows, for the caller
 *   - start_premium_trial('projection') starts the projected-score trial ONCE:
 *     a second call returns the first start time, and a student cannot write
 *     the row directly (no write policy), so the start cannot be forged
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";
import { istDayKey } from "@/lib/email/dueNudge";
import { markFreeReveal } from "@/lib/chat/followUpServer";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "free-save-limit-pw-1234";
const RUN_ID = testRunId();
// "reveal": the daily answer limit's own student (claim_reveal, migration 0228).
// The 7-day Practice Pass trial (0273): "trial" earns and takes it, "vtrial" meets the limit
// on V, "offered" has used all 3 offer days, "lapsed" once held a pass.
// The daily check (reveal_limit_overruns, 0294): "coveredtrial" answered while a trial ran that
// ended the same evening, "aftertrial" answered after theirs ended, "refunded" under a pass later
// revoked, "nopass" with none.
const ROLES = [
  "student", "pass", "practice", "off", "freeexam", "reveal", "trial", "vtrial", "offered", "lapsed", "intl",
  "coveredtrial", "aftertrial", "refunded", "nopass",
] as const;
type Role = (typeof ROLES)[number];

describe.skipIf(!HAS_ENV)("free save limit + my_premium_limits (migration 0134)", () => {
  let admin: SupabaseClient;
  const ids = {} as Record<Role, string>;
  const clients = {} as Record<Role, SupabaseClient>;
  let questionIds: string[] = [];
  // A free exam (0210) and two questions in it, copied from a paid one.
  let freeExamId = "";
  const freeQuestionIds: string[] = [];
  // An intl exam (pass scope 'imat') and four questions in it (0274).
  let intlExamId = "";
  const intlQuestionIds: string[] = [];
  let saved: Record<string, unknown> | null = null;

  const save = (role: Role, idx: number) =>
    clients[role]
      .from("question_bookmarks")
      .upsert(
        { user_id: ids[role], question_id: questionIds[idx] },
        { onConflict: "user_id,question_id", ignoreDuplicates: true }
      );

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });

    for (const role of ROLES) {
      const email = `freesave-${role}-${RUN_ID}@test.local`;
      const { data } = await admin.auth.admin.createUser({
        email,
        password: PASSWORD,
        email_confirm: true,
      });
      ids[role] = data.user!.id;
      clients[role] = createClient(url, anon, { auth: { persistSession: false } });
      await mustSignIn(email, clients[role], { email, password: PASSWORD });
    }

    // Questions of a paid exam: a free exam's saves are never limited (0210).
    const { data: qs, error: qErr } = await admin
      .from("questions")
      .select("id, exams!inner(pass_scope)")
      .eq("visibility", "PUBLIC")
      .eq("exams.pass_scope", "mocks")
      .order("created_at", { ascending: true })
      .limit(4);
    expect(qErr).toBeNull();
    questionIds = (qs ?? []).map((q) => q.id as string);
    expect(questionIds).toHaveLength(4);

    const { data: freeExam, error: freeErr } = await admin
      .from("exams")
      .insert({ name: `zz test free save exam ${RUN_ID}`, pass_scope: "free" })
      .select("id")
      .single();
    expect(freeErr).toBeNull();
    freeExamId = freeExam!.id;
    const { data: base } = await admin
      .from("questions")
      .select("org_id, subject_id, chapter_id, difficulty, created_by")
      .eq("id", questionIds[0])
      .single();
    for (let i = 0; i < 2; i++) {
      const { data, error } = await admin
        .from("questions")
        .insert({
          ...base,
          exam_id: freeExamId,
          text: `Free save question ${i} ${RUN_ID}`,
          content_hash: `free-save-${i}-${RUN_ID}`,
          visibility: "PRIVATE",
        })
        .select("id")
        .single();
      expect(error).toBeNull();
      freeQuestionIds.push(data!.id);
    }

    const { data: intlExam, error: intlErr } = await admin
      .from("exams")
      .insert({ name: `zz test intl reveal exam ${RUN_ID}`, pass_scope: "imat" })
      .select("id")
      .single();
    expect(intlErr).toBeNull();
    intlExamId = intlExam!.id;
    for (let i = 0; i < 4; i++) {
      const { data, error } = await admin
        .from("questions")
        .insert({
          ...base,
          exam_id: intlExamId,
          text: `Intl reveal question ${i} ${RUN_ID}`,
          content_hash: `intl-reveal-${i}-${RUN_ID}`,
          visibility: "PRIVATE",
        })
        .select("id")
        .single();
      expect(error).toBeNull();
      intlQuestionIds.push(data!.id);
    }

    await admin.from("entitlements").insert({
      user_id: ids.pass,
      scope: "mocks",
      source: "manual",
      status: "active",
      note: `test ${RUN_ID}`,
    });

    // The Practice Pass (0212): online limits lifted, no downloads.
    await admin.from("entitlements").insert({
      user_id: ids.practice,
      scope: "practice",
      source: "manual",
      status: "active",
      note: `test ${RUN_ID}`,
    });

    // A pass that has lapsed: this student is never offered the trial (0273).
    await admin.from("entitlements").insert({
      user_id: ids.lapsed,
      scope: "practice",
      source: "comp",
      status: "active",
      granted_at: new Date(Date.now() - 40 * 86_400_000).toISOString(),
      expires_at: new Date(Date.now() - 10 * 86_400_000).toISOString(),
      note: `test ${RUN_ID}`,
    });

    const { data: prev, error: readErr } = await admin
      .from("paywall_settings")
      .select("free_save_limit, free_drill_per_day, free_reveals_per_day, intl_free_reveals_per_day, projection_trial_days, practice_trial_after_days")
      .single();
    expect(readErr).toBeNull();
    saved = prev;
    const { error: setErr } = await admin
      .from("paywall_settings")
      .update({
        free_save_limit: 2,
        free_drill_per_day: 15,
        free_reveals_per_day: 50,
        intl_free_reveals_per_day: 3,
        projection_trial_days: 7,
        practice_trial_after_days: 3,
      })
      .eq("id", true);
    expect(setErr).toBeNull();
  });

  afterAll(async () => {
    if (saved) await admin.from("paywall_settings").update(saved).eq("id", true);
    // Deleting users cascades their bookmarks and entitlements.
    for (const role of ROLES) if (ids[role]) await admin.auth.admin.deleteUser(ids[role]);
    if (freeQuestionIds.length) await admin.from("questions").delete().in("id", freeQuestionIds);
    if (freeExamId) await admin.from("exams").delete().eq("id", freeExamId);
    if (intlQuestionIds.length) await admin.from("questions").delete().in("id", intlQuestionIds);
    if (intlExamId) await admin.from("exams").delete().eq("id", intlExamId);
  });

  it("lets a free student save two questions, then refuses the third with PT402", async () => {
    expect((await save("student", 0)).error).toBeNull();
    expect((await save("student", 1)).error).toBeNull();
    const { error } = await save("student", 2);
    expect(error?.code).toBe("PT402");
  });

  it("does not refuse re-saving a question already saved, at the limit", async () => {
    expect((await save("student", 0)).error).toBeNull();
  });

  it("frees a slot when a save is removed", async () => {
    await clients.student
      .from("question_bookmarks")
      .delete()
      .eq("user_id", ids.student)
      .eq("question_id", questionIds[1]);
    expect((await save("student", 2)).error).toBeNull();
  });

  it("never refuses or counts a free exam's saves (0210)", async () => {
    const saveAny = (questionId: string) =>
      clients.freeexam
        .from("question_bookmarks")
        .upsert({ user_id: ids.freeexam, question_id: questionId }, { onConflict: "user_id,question_id", ignoreDuplicates: true });
    expect((await saveAny(questionIds[0])).error).toBeNull();
    expect((await saveAny(questionIds[1])).error).toBeNull();
    expect((await saveAny(questionIds[2])).error?.code).toBe("PT402");
    for (const id of freeQuestionIds) expect((await saveAny(id)).error).toBeNull();
    const { data } = await clients.freeexam.rpc("my_premium_limits");
    expect(data).toMatchObject({ saveLimit: 2, saves: 2 });
  });

  it("never limits a pass holder", async () => {
    for (let i = 0; i < 4; i++) expect((await save("pass", i)).error).toBeNull();
  });

  it("never limits a Practice Pass holder, and reports the pass (0212)", async () => {
    for (let i = 0; i < 4; i++) expect((await save("practice", i)).error).toBeNull();
    const { data } = await clients.practice.rpc("my_premium_limits");
    expect(data).toMatchObject({ hasPass: true, passScopes: ["practice"], saves: 4 });
  });

  it("reports the caller's limits and saves", async () => {
    const { data, error } = await clients.student.rpc("my_premium_limits");
    expect(error).toBeNull();
    expect(data).toEqual({
      hasPass: false,
      passScopes: [],
      drillPerDay: 15,
      revealsPerDay: 50,
      intlRevealsPerDay: 3,
      saveLimit: 2,
      saves: 2,
      projectionTrialDays: 7,
      projectionStartedAt: null,
    });
    const { data: passData } = await clients.pass.rpc("my_premium_limits");
    expect(passData).toMatchObject({ hasPass: true, saves: 4 });
  });

  it("blocks nothing when the limit is NULL (off)", async () => {
    await admin.from("paywall_settings").update({ free_save_limit: null }).eq("id", true);
    for (let i = 0; i < 4; i++) expect((await save("off", i)).error).toBeNull();
    const { data } = await clients.off.rpc("my_premium_limits");
    expect(data).toMatchObject({ saveLimit: null });
    await admin.from("paywall_settings").update({ free_save_limit: 2 }).eq("id", true);
  });

  /*
   * claim_reveal (migration 0228): the server decides every new answer of the
   * signed-in daily limit, and records it in the same step. Here because this
   * file owns the settings row (free_reveals_per_day = 50 for its run): two
   * files writing it at once overwrite each other's limits.
   */
  describe("claim_reveal: the daily answer limit, decided by the server (0228)", () => {
    type Claim = { allowed: boolean; reason: string; used: number | null; limit: number | null };
    const claim = async (role: Role, questionId: string, surface = "bank") => {
      const { data, error } = await clients[role].rpc("claim_reveal", { p_question_id: questionId, p_surface: surface });
      expect(error).toBeNull();
      return data as Claim;
    };
    const today = () => istDayKey(new Date());
    const rowsFor = async (role: Role) => {
      const { data } = await admin.from("daily_reveals").select("question_id, counts").eq("user_id", ids[role]).eq("ist_day", today());
      return (data ?? []) as { question_id: string; counts: boolean }[];
    };

    it("counts a new answer, and opening it again is free", async () => {
      expect(await claim("reveal", questionIds[0])).toMatchObject({ allowed: true, reason: "counted", used: 1, limit: 50 });
      expect(await claim("reveal", questionIds[0])).toMatchObject({ allowed: true, reason: "repeat", used: 1 });
      expect((await rowsFor("reveal")).map((r) => r.question_id)).toEqual([questionIds[0]]);
    });

    it("gives exactly one of two simultaneous claims the last free answer", async () => {
      // 48 more answers today: 49 used, one left.
      const filler = Array.from({ length: 48 }, () => ({
        user_id: ids.reveal,
        ist_day: today(),
        question_id: randomUUID(),
        surface: "bank",
        counts: true,
      }));
      expect((await admin.from("daily_reveals").insert(filler)).error).toBeNull();
      const [a, b] = await Promise.all([claim("reveal", questionIds[1]), claim("reveal", questionIds[2])]);
      expect([a.allowed, b.allowed].sort()).toEqual([false, true]);
      const refused = a.allowed ? b : a;
      expect(refused).toMatchObject({ reason: "limit", used: 50, limit: 50 });
    });

    it("refuses a new answer at the limit but still opens one already counted", async () => {
      expect(await claim("reveal", questionIds[3])).toMatchObject({ allowed: false, reason: "limit" });
      expect(await claim("reveal", questionIds[0])).toMatchObject({ allowed: true, reason: "repeat" });
    });

    // V_LEARNING_LOOP.md step 2: the server marks a free follow-up BEFORE the answer is recorded.
    it("costs no answer for a follow-up the server marked free, and the recorded answer changes nothing (0250)", async () => {
      expect(await markFreeReveal(admin, { userId: ids.student, day: today(), questionId: questionIds[3] })).toBe(true);
      expect(await claim("student", questionIds[3], "v")).toMatchObject({ allowed: true, reason: "repeat", used: 0 });
      const { error } = await admin
        .from("user_activity")
        .insert({ user_id: ids.student, kind: "question_practiced", ref_id: questionIds[3], ref_kind: "question", metadata: { surface: "v", chose: "A", correct: true } });
      expect(error).toBeNull();
      expect(await rowsFor("student")).toEqual([{ question_id: questionIds[3], counts: false }]);
    });

    it("opens today's board-path questions at the limit, without counting them (0225)", async () => {
      const { data: path, error: pathErr } = await admin
        .from("study_paths")
        .insert({ user_id: ids.reveal, exam_slug: "cbse-12", subjects: ["physics"], daily_minutes: 30 })
        .select("id")
        .single();
      expect(pathErr).toBeNull();
      const { error } = await admin.from("study_path_days").insert({
        user_id: ids.reveal,
        day: today(),
        path_id: path!.id,
        tasks: [],
        exempt_question_ids: [questionIds[3]],
      });
      expect(error).toBeNull();
      expect(await claim("reveal", questionIds[3])).toMatchObject({ allowed: true, reason: "path" });
      expect((await rowsFor("reveal")).some((r) => r.question_id === questionIds[3])).toBe(false);
    });

    it("never limits or records a pass holder, and a free exam's answer is never counted", async () => {
      expect(await claim("pass", questionIds[0])).toMatchObject({ allowed: true, reason: "pass" });
      expect(await claim("practice", questionIds[0])).toMatchObject({ allowed: true, reason: "pass" });
      expect(await rowsFor("pass")).toEqual([]);
      expect(await claim("freeexam", freeQuestionIds[0])).toMatchObject({ allowed: true, reason: "free" });
    });

    it("does not count a surface outside the daily limit (the drill, the question of the day)", async () => {
      expect(await claim("freeexam", questionIds[0], "drill")).toMatchObject({ allowed: true, reason: "uncounted" });
      expect(await claim("freeexam", questionIds[0], "daily")).toMatchObject({ allowed: true, reason: "uncounted" });
      expect(await rowsFor("freeexam")).toEqual([]);
    });

    it("counts an answer any other code recorded (the trigger on user_activity)", async () => {
      const rows = [questionIds[2], freeQuestionIds[1]].map((id) => ({
        user_id: ids.freeexam,
        kind: "question_practiced",
        ref_id: id,
        ref_kind: "question",
        metadata: { surface: "board" },
      }));
      expect((await admin.from("user_activity").insert(rows)).error).toBeNull();
      const got = new Map((await rowsFor("freeexam")).map((r) => [r.question_id, r.counts]));
      expect(got.get(questionIds[2])).toBe(true);
      // Recorded, but a free exam's answer never counts toward the limit.
      expect(got.get(freeQuestionIds[1])).toBe(false);
      expect(await claim("freeexam", questionIds[3])).toMatchObject({ allowed: true, reason: "counted", used: 2 });
    });

    it("lets a student read their own rows but never write them", async () => {
      const { data } = await clients.reveal.from("daily_reveals").select("question_id").eq("ist_day", today());
      expect((data ?? []).length).toBeGreaterThanOrEqual(50);
      const { error } = await clients.reveal
        .from("daily_reveals")
        .insert({ user_id: ids.reveal, ist_day: today(), question_id: randomUUID(), surface: "bank", counts: false });
      expect(error).not.toBeNull();
      const { data: others } = await clients.student.from("daily_reveals").select("question_id").eq("user_id", ids.reveal);
      expect(others ?? []).toEqual([]);
    });

    it("reveal_limit_overruns names a student past the limit, and only them (0229)", async () => {
      const overruns = async () => {
        const { data, error } = await admin.rpc("reveal_limit_overruns", { p_day: today() });
        expect(error).toBeNull();
        return (data ?? []) as { user_id: string; used: number; day_limit: number }[];
      };
      // At the limit is not past it.
      expect((await overruns()).some((r) => r.user_id === ids.reveal)).toBe(false);
      // An answer recorded past the limit by code that never asked (an old tab).
      const { error } = await admin
        .from("daily_reveals")
        .insert({ user_id: ids.reveal, ist_day: today(), question_id: randomUUID(), surface: "bank", counts: true });
      expect(error).toBeNull();
      const mine = (await overruns()).find((r) => r.user_id === ids.reveal);
      expect(mine).toMatchObject({ used: 51, day_limit: 50 });
      // A pass holder's answers are never an overrun, however many.
      expect((await overruns()).some((r) => r.user_id === ids.pass)).toBe(false);
      // Students cannot call it: it lists other students.
      const { error: denied } = await clients.student.rpc("reveal_limit_overruns", { p_day: today() });
      expect(denied).not.toBeNull();
    });

    it("refuses a signed-out caller", async () => {
      const anonClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        auth: { persistSession: false },
      });
      const { error } = await anonClient.rpc("claim_reveal", { p_question_id: questionIds[0], p_surface: "bank" });
      expect(error).not.toBeNull();
    });

    // 0274: an intl exam's answers stop at the intl limit (3 for this run), the
    // www exams' at the www one (50). The day's count is shared.
    it("stops an intl exam's answers at the intl limit", async () => {
      for (let i = 0; i < 3; i++) {
        expect(await claim("intl", intlQuestionIds[i])).toMatchObject({ allowed: true, reason: "counted", used: i + 1, limit: 3 });
      }
      expect(await claim("intl", intlQuestionIds[3])).toMatchObject({ allowed: false, reason: "limit", used: 3, limit: 3 });
      expect(await claim("intl", intlQuestionIds[0])).toMatchObject({ allowed: true, reason: "repeat" });
    });

    it("keeps the www limit for a www exam, on the same day's count", async () => {
      expect(await claim("intl", questionIds[0])).toMatchObject({ allowed: true, reason: "counted", used: 4, limit: 50 });
    });

    it("leaves intl answers unlimited while the intl limit is off", async () => {
      await admin.from("paywall_settings").update({ intl_free_reveals_per_day: null }).eq("id", true);
      try {
        expect(await claim("intl", intlQuestionIds[3])).toMatchObject({ allowed: true, reason: "off" });
      } finally {
        await admin.from("paywall_settings").update({ intl_free_reveals_per_day: 3 }).eq("id", true);
      }
    });

    it("quotes the intl limit to perks (free_limits)", async () => {
      const { data, error } = await clients.student.rpc("free_limits");
      expect(error).toBeNull();
      expect(data).toMatchObject({ reveals: 50, intlReveals: 3 });
    });
  });

  /**
   * The 7-day Practice Pass trial (migration 0273). claim_reveal records every
   * day a student is refused at the limit; on the 3rd such day (setting
   * practice_trial_after_days) the refusal carries an offer, on at most 3 days
   * at the limit, and never to a student who has ever held a pass. Nothing is
   * granted until activate_practice_trial, and only on a day the offer showed.
   */
  describe("the 7-day Practice Pass trial (0273)", () => {
    type Claim = {
      allowed: boolean;
      reason: string;
      trialOffer: { days: number } | null;
      trialEnded: { endedAt: string; answered: number } | null;
    };
    const claim = async (role: Role, questionId: string, surface = "bank") => {
      const { data, error } = await clients[role].rpc("claim_reveal", { p_question_id: questionId, p_surface: surface });
      expect(error).toBeNull();
      return data as Claim;
    };
    const day = (back: number) => istDayKey(new Date(Date.now() - back * 86_400_000));
    /** Today's 50 free answers, used up. */
    const fillToday = async (role: Role) => {
      const rows = Array.from({ length: 50 }, () => ({
        user_id: ids[role],
        ist_day: day(0),
        question_id: randomUUID(),
        surface: "bank",
        counts: true,
      }));
      expect((await admin.from("daily_reveals").insert(rows)).error).toBeNull();
    };
    const limitDays = async (role: Role, ...back: number[]) => {
      const rows = back.map((b) => ({ user_id: ids[role], ist_day: day(b) }));
      expect((await admin.from("reveal_limit_days").insert(rows)).error).toBeNull();
    };
    const offerDays = async (role: Role) => {
      const { data } = await admin.from("practice_trial_offers").select("ist_day").eq("user_id", ids[role]);
      return (data ?? []).map((r) => r.ist_day as string).sort();
    };
    const activate = async (role: Role) => {
      const { data, error } = await clients[role].rpc("activate_practice_trial");
      expect(error).toBeNull();
      return data as { ok: boolean; expiresAt?: string; reason?: string };
    };

    it("offers nothing on a student's 2nd day at the limit, and records the day", async () => {
      await limitDays("trial", 5);
      await fillToday("trial");
      expect(await claim("trial", questionIds[0])).toMatchObject({ allowed: false, reason: "limit", trialOffer: null });
      const { data } = await admin.from("reveal_limit_days").select("ist_day").eq("user_id", ids.trial);
      expect((data ?? []).map((r) => r.ist_day).sort()).toEqual([day(5), day(0)].sort());
      expect(await offerDays("trial")).toEqual([]);
    });

    it("offers the trial on the 3rd day at the limit, without granting anything", async () => {
      await limitDays("trial", 3);
      expect(await claim("trial", questionIds[0])).toMatchObject({ allowed: false, reason: "limit", trialOffer: { days: 7 } });
      // A second refused tap the same day is the same offer day.
      expect(await claim("trial", questionIds[1])).toMatchObject({ trialOffer: { days: 7 } });
      expect(await offerDays("trial")).toEqual([day(0)]);
      const { data } = await admin.from("entitlements").select("id").eq("user_id", ids.trial);
      expect(data ?? []).toEqual([]);
    });

    it("activates a 7-day Practice Pass from the tap, once", async () => {
      const before = Date.now();
      const first = await activate("trial");
      expect(first.ok).toBe(true);
      const ends = Date.parse(first.expiresAt!);
      expect(ends).toBeGreaterThanOrEqual(before + 7 * 86_400_000 - 60_000);
      expect(ends).toBeLessThanOrEqual(Date.now() + 7 * 86_400_000 + 60_000);
      // A double tap is the same pass.
      expect((await activate("trial")).expiresAt).toBe(first.expiresAt);
      const { data } = await admin.from("entitlements").select("scope, source, status, amount_paise").eq("user_id", ids.trial);
      expect(data).toEqual([{ scope: "practice", source: "trial", status: "active", amount_paise: null }]);
      // The pass lifts the limit at once.
      expect(await claim("trial", questionIds[2])).toMatchObject({ allowed: true, reason: "pass" });
    });

    it("refuses Activate on a day the offer did not show", async () => {
      expect(await activate("vtrial")).toMatchObject({ ok: false });
      const { data } = await admin.from("entitlements").select("id").eq("user_id", ids.vtrial);
      expect(data ?? []).toEqual([]);
    });

    it("records a day at the limit on V but shows the offer only on a page", async () => {
      await limitDays("vtrial", 4, 2);
      await fillToday("vtrial");
      expect(await claim("vtrial", questionIds[0], "v")).toMatchObject({ allowed: false, reason: "limit", trialOffer: null });
      expect(await offerDays("vtrial")).toEqual([]);
      const { data } = await admin.from("reveal_limit_days").select("ist_day").eq("user_id", ids.vtrial);
      expect((data ?? []).length).toBe(3);
    });

    it("shows the offer on 3 days at the limit at most, then never", async () => {
      await limitDays("offered", 9, 8, 7);
      const past = [9, 8, 7].map((b) => ({ user_id: ids.offered, ist_day: day(b) }));
      expect((await admin.from("practice_trial_offers").insert(past)).error).toBeNull();
      await fillToday("offered");
      expect(await claim("offered", questionIds[0])).toMatchObject({ reason: "limit", trialOffer: null });
      expect((await offerDays("offered")).length).toBe(3);
      expect(await activate("offered")).toMatchObject({ ok: false });
    });

    it("never offers it to a student who once held a pass", async () => {
      await limitDays("lapsed", 6, 5, 4);
      await fillToday("lapsed");
      expect(await claim("lapsed", questionIds[0])).toMatchObject({ reason: "limit", trialOffer: null });
    });

    it("puts the ended trial and its answers on the wall once it is over", async () => {
      const granted = new Date(Date.now() - 8 * 86_400_000).toISOString();
      const ended = new Date(Date.now() - 86_400_000).toISOString();
      expect(
        (await admin.from("entitlements").update({ granted_at: granted, expires_at: ended }).eq("user_id", ids.trial).eq("source", "trial"))
          .error
      ).toBeNull();
      // Two answers inside the trial, one before it.
      const at = (msAgo: number) => new Date(Date.now() - msAgo).toISOString();
      const rows = [at(3 * 86_400_000), at(2 * 86_400_000), at(9 * 86_400_000)].map((created_at, i) => ({
        user_id: ids.trial,
        kind: "question_practiced",
        ref_id: questionIds[i],
        ref_kind: "question",
        created_at,
        metadata: { surface: "bank" },
      }));
      expect((await admin.from("user_activity").insert(rows)).error).toBeNull();
      const r = await claim("trial", questionIds[3]);
      expect(r).toMatchObject({ allowed: false, reason: "limit", trialOffer: null });
      expect(r.trialEnded?.answered).toBe(2);
      expect(Date.parse(r.trialEnded!.endedAt)).toBe(Date.parse(ended));
      // Never a second trial, and an ended one is not "activated" again.
      expect(await activate("trial")).toMatchObject({ ok: false });
      const { data } = await admin.from("entitlements").select("id").eq("user_id", ids.trial);
      expect((data ?? []).length).toBe(1);
    });

    it("lets a student read their own trial rows but never write them", async () => {
      const own = await clients.trial.from("practice_trial_offers").select("ist_day");
      expect((own.data ?? []).length).toBe(1);
      const w1 = await clients.trial.from("practice_trial_offers").insert({ user_id: ids.trial, ist_day: day(1) });
      expect(w1.error).not.toBeNull();
      const w2 = await clients.trial.from("reveal_limit_days").insert({ user_id: ids.trial, ist_day: day(1) });
      expect(w2.error).not.toBeNull();
      const others = await clients.student.from("practice_trial_offers").select("ist_day").eq("user_id", ids.trial);
      expect(others.data ?? []).toEqual([]);
    });

    it("offers nothing while the setting is off", async () => {
      expect((await admin.from("paywall_settings").update({ practice_trial_after_days: null }).eq("id", true)).error).toBeNull();
      try {
        // vtrial has 3 days at the limit and has never been offered on a page.
        expect(await claim("vtrial", questionIds[1])).toMatchObject({ reason: "limit", trialOffer: null });
        expect(await offerDays("vtrial")).toEqual([]);
      } finally {
        await admin.from("paywall_settings").update({ practice_trial_after_days: 3 }).eq("id", true);
      }
    });
  });

  it("starts the projected-score trial once, and a second start keeps the first time", async () => {
    const first = await clients.student.rpc("start_premium_trial", { p_feature: "projection" });
    expect(first.error).toBeNull();
    expect(typeof first.data).toBe("string");
    const second = await clients.student.rpc("start_premium_trial", { p_feature: "projection" });
    expect(second.data).toBe(first.data);
    const { data } = await clients.student.rpc("my_premium_limits");
    expect(Date.parse((data as { projectionStartedAt: string }).projectionStartedAt)).toBe(
      Date.parse(first.data as string)
    );
  });

  it("refuses an unknown trial feature", async () => {
    const { error } = await clients.student.rpc("start_premium_trial", { p_feature: "everything" });
    expect(error).not.toBeNull();
  });

  it("does not let a student write or move their own trial row", async () => {
    const past = new Date(Date.now() - 30 * 86_400_000).toISOString();
    await clients.student
      .from("premium_trials")
      .update({ started_at: past })
      .eq("user_id", ids.student);
    const { error: insErr } = await clients.pass
      .from("premium_trials")
      .insert({ user_id: ids.pass, feature: "projection", started_at: past });
    expect(insErr).not.toBeNull();
    const { data } = await admin
      .from("premium_trials")
      .select("started_at")
      .eq("user_id", ids.student)
      .single();
    expect(Date.parse(data!.started_at as string)).toBeGreaterThan(Date.parse(past));
  });

  describe("the daily check: who went past the answer limit (0229, 0294)", () => {
    // A fixed past day nothing else writes to, and the answers' own time: 04:00 IST on it.
    const DAY = "2020-01-15";
    const ANSWERED = "2020-01-14T22:30:00Z";
    const pass = (role: Role, status: string, grantedAt: string, expiresAt: string) =>
      admin.from("entitlements").insert({
        user_id: ids[role],
        scope: "practice",
        source: "trial",
        status,
        granted_at: grantedAt,
        expires_at: expiresAt,
        note: `test ${RUN_ID}`,
      });
    let named: string[] = [];

    beforeAll(async () => {
      // 2026-11-27: a trial student opened 41 answers in the morning and the trial ended that
      // evening; the check asked about passes held NOW and named them as a free student.
      expect((await pass("coveredtrial", "active", "2020-01-09T15:30:00Z", "2020-01-15T15:30:00Z")).error).toBeNull();
      expect((await pass("aftertrial", "active", "2020-01-08T15:30:00Z", "2020-01-14T21:30:00Z")).error).toBeNull();
      expect((await pass("refunded", "revoked", "2020-01-10T00:00:00Z", "2020-07-10T00:00:00Z")).error).toBeNull();
      for (const role of ["coveredtrial", "aftertrial", "refunded", "nopass"] as const) {
        // 51 answers against this file's limit of 50.
        const rows = Array.from({ length: 51 }, () => ({
          user_id: ids[role],
          ist_day: DAY,
          question_id: randomUUID(),
          surface: "bank",
          counts: true,
          created_at: ANSWERED,
        }));
        expect((await admin.from("daily_reveals").insert(rows)).error).toBeNull();
      }
      const { data, error } = await admin.rpc("reveal_limit_overruns", { p_day: DAY });
      expect(error).toBeNull();
      named = ((data ?? []) as { user_id: string }[]).map((r) => r.user_id);
    });

    it("does not name a student whose pass covered the answers, though it has ended since", () => {
      expect(named).not.toContain(ids.coveredtrial);
    });

    it("names a student who answered after their pass ended", () => {
      expect(named).toContain(ids.aftertrial);
    });

    it("names a student whose covering pass was refunded", () => {
      expect(named).toContain(ids.refunded);
    });

    it("names a student with no pass", () => {
      expect(named).toContain(ids.nopass);
    });
  });
});
