/**
 * Integration test for the /me class offer (migration 0282).
 *
 * class_offer_answers: RLS on with NO policies, so only the service role reads
 * or writes it. One row per account per offer; an answer exactly when it has a
 * time; only the two offers the card asks about.
 *
 * record_class_offer_yes: the lead and the answer in ONE transaction. A Yes on
 * a mobile that already has a lead ADDS the course (the /classes route replaces
 * courses; here a student who asked about CDS must not lose it by saying Yes to
 * NDA), keeps the team's "called" tick and first date, and stays in the
 * /classes course order. Not callable by anon or a signed-in student.
 *
 * Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = testRunId();
const digits = String(Math.abs([...RUN_ID].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 11))).padStart(9, "0");
const MOBILE = `918${digits.slice(0, 9)}`;

describe.skipIf(!HAS_ENV)("class offer on /me", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let userId = "";

  const yes = (offer: "spi" | "nda") => ({
    p_user_id: userId,
    p_offer: offer,
    p_name: "Test Student",
    p_city: "Pune",
    p_is_pune: true,
    p_mobile: MOBILE,
    p_exam_slug: "nda",
  });

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anonClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    const { data, error } = await admin.auth.admin.createUser({ email: `class-offer-${RUN_ID}@test.local`, email_confirm: true });
    if (error || !data.user) throw new Error(`createUser failed: ${error?.message}`);
    userId = data.user.id;
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("class_interest").delete().eq("mobile", MOBILE);
    if (userId) await admin.auth.admin.deleteUser(userId); // cascades class_offer_answers
  });

  it("records a sighting once, then Know more on the same row", async () => {
    const seen = await admin.from("class_offer_answers").insert({ user_id: userId, offer: "spi" });
    expect(seen.error).toBeNull();
    const dup = await admin.from("class_offer_answers").insert({ user_id: userId, offer: "spi" });
    expect(dup.error?.code).toBe("23505");
    const more = await admin
      .from("class_offer_answers")
      .upsert({ user_id: userId, offer: "spi", more_at: new Date().toISOString() }, { onConflict: "user_id,offer" })
      .select("shown_at, more_at, answer")
      .single();
    expect(more.error).toBeNull();
    expect(more.data?.shown_at).toBeTruthy();
    expect(more.data?.answer).toBeNull();
  });

  it("refuses an unknown offer, or an answer without its time", async () => {
    const bad = await admin.from("class_offer_answers").insert({ user_id: userId, offer: "jee" });
    expect(bad.error?.code).toBe("23514");
    const noTime = await admin
      .from("class_offer_answers")
      .upsert({ user_id: userId, offer: "nda", answer: "no" }, { onConflict: "user_id,offer" });
    expect(noTime.error?.code).toBe("23514");
  });

  it("a Yes saves the lead and the answer together", async () => {
    const { error } = await admin.rpc("record_class_offer_yes", yes("spi"));
    expect(error).toBeNull();
    const lead = await admin.from("class_interest").select("courses, from_section, user_id").eq("mobile", MOBILE).single();
    expect(lead.data).toMatchObject({ courses: ["spi"], from_section: "me", user_id: userId });
    const ans = await admin.from("class_offer_answers").select("answer, answered_at").eq("user_id", userId).eq("offer", "spi").single();
    expect(ans.data?.answer).toBe("yes");
    expect(ans.data?.answered_at).toBeTruthy();
  });

  it("a second Yes on the same mobile adds the course in /classes order and keeps the called tick", async () => {
    const calledAt = "2026-11-20T10:00:00.000Z";
    await admin.from("class_interest").update({ called_at: calledAt, courses: ["cds", "spi"] }).eq("mobile", MOBILE);
    const { error } = await admin.rpc("record_class_offer_yes", yes("nda"));
    expect(error).toBeNull();
    const lead = await admin.from("class_interest").select("courses, called_at").eq("mobile", MOBILE).single();
    expect(lead.data?.courses).toEqual(["nda", "cds", "spi"]);
    expect(new Date(lead.data!.called_at as string).toISOString()).toBe(calledAt);
  });

  it("anon reads nothing and cannot call the Yes function", async () => {
    const read = await anonClient.from("class_offer_answers").select("user_id");
    expect(read.data ?? []).toEqual([]);
    const call = await anonClient.rpc("record_class_offer_yes", yes("nda"));
    expect(call.error).not.toBeNull();
  });
});
