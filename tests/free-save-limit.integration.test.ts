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

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "free-save-limit-pw-1234";
const RUN_ID = randomUUID().slice(0, 8);
const ROLES = ["student", "pass", "off"] as const;
type Role = (typeof ROLES)[number];

describe.skipIf(!HAS_ENV)("free save limit + my_premium_limits (migration 0134)", () => {
  let admin: SupabaseClient;
  const ids = {} as Record<Role, string>;
  const clients = {} as Record<Role, SupabaseClient>;
  let questionIds: string[] = [];
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

    const { data: qs, error: qErr } = await admin
      .from("questions")
      .select("id")
      .eq("visibility", "PUBLIC")
      .order("created_at", { ascending: true })
      .limit(4);
    expect(qErr).toBeNull();
    questionIds = (qs ?? []).map((q) => q.id as string);
    expect(questionIds).toHaveLength(4);

    await admin.from("entitlements").insert({
      user_id: ids.pass,
      scope: "mocks",
      source: "manual",
      status: "active",
      note: `test ${RUN_ID}`,
    });

    const { data: prev, error: readErr } = await admin
      .from("paywall_settings")
      .select("free_save_limit, free_drill_per_day, free_reveals_per_day, projection_trial_days")
      .single();
    expect(readErr).toBeNull();
    saved = prev;
    const { error: setErr } = await admin
      .from("paywall_settings")
      .update({ free_save_limit: 2, free_drill_per_day: 15, free_reveals_per_day: 50, projection_trial_days: 7 })
      .eq("id", true);
    expect(setErr).toBeNull();
  });

  afterAll(async () => {
    if (saved) await admin.from("paywall_settings").update(saved).eq("id", true);
    // Deleting users cascades their bookmarks and entitlements.
    for (const role of ROLES) if (ids[role]) await admin.auth.admin.deleteUser(ids[role]);
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

  it("never limits a pass holder", async () => {
    for (let i = 0; i < 4; i++) expect((await save("pass", i)).error).toBeNull();
  });

  it("reports the caller's limits and saves", async () => {
    const { data, error } = await clients.student.rpc("my_premium_limits");
    expect(error).toBeNull();
    expect(data).toEqual({
      hasPass: false,
      drillPerDay: 15,
      revealsPerDay: 50,
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
});
