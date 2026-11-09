/**
 * Replies to feature requests against the database (migration 0243):
 *
 * - RLS: a student reads replies to their OWN requests only, and can write
 *   none; only the server (service role) writes a reply.
 * - Shape: a reply must belong to the same student as the request (composite
 *   FK), can only answer a FEATURE request (not an NPS score), and its status
 *   and note obey the CHECKs.
 * - mark_feedback_replies_seen() marks the caller's own replies only.
 * - saveFeedbackReply: one email per request + status (the email_sends dedupe
 *   key), a note edit sends nothing but shows unread again, a failed send is
 *   retried by the next save.
 *
 * Runs against the TEST project (tests/setup.ts refuses prod). Skipped when
 * env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";
import { saveFeedbackReply, listOwnRequests, countUnreadReplies } from "@/lib/feedback/replyService";
import type { SendPayload, SendResult } from "@/lib/email/resend";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const PASSWORD = "feedback-reply-test-password-1234";
const RUN_ID = testRunId();
const ALICE_EMAIL = `fbreply-alice-${RUN_ID}@test.local`;
const BOB_EMAIL = `fbreply-bob-${RUN_ID}@test.local`;

/** A fake sender: records every payload, and fails while `failing` is set. */
function fakeSender() {
  const sent: SendPayload[] = [];
  const state = { failing: false };
  const send = async (p: SendPayload): Promise<SendResult> => {
    if (state.failing) return { ok: false, error: "provider down" };
    sent.push(p);
    return { ok: true, providerId: `fake-${sent.length}` };
  };
  return { sent, state, send };
}

describe.skipIf(!HAS_ENV)("feedback replies (0243)", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let aliceClient: SupabaseClient;
  let bobClient: SupabaseClient;
  let aliceId: string;
  let bobId: string;
  let aliceRequest: string;
  let aliceNps: string;
  let bobRequest: string;

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

    const [{ data: alice }, { data: bob }] = await Promise.all([
      admin.auth.admin.createUser({
        email: ALICE_EMAIL,
        password: PASSWORD,
        email_confirm: true,
        user_metadata: { full_name: "Alice Test" },
      }),
      admin.auth.admin.createUser({ email: BOB_EMAIL, password: PASSWORD, email_confirm: true }),
    ]);
    aliceId = alice.user!.id;
    bobId = bob.user!.id;

    anonClient = createClient(url, anon, { auth: { persistSession: false } });
    aliceClient = createClient(url, anon, { auth: { persistSession: false } });
    bobClient = createClient(url, anon, { auth: { persistSession: false } });
    await mustSignIn(ALICE_EMAIL, aliceClient, { email: ALICE_EMAIL, password: PASSWORD });
    await mustSignIn(BOB_EMAIL, bobClient, { email: BOB_EMAIL, password: PASSWORD });

    const { data: rows, error } = await admin
      .from("user_feedback")
      .insert([
        { user_id: aliceId, kind: "feature", message: "Please add CUET papers" },
        { user_id: aliceId, kind: "nps", score: 8 },
        { user_id: bobId, kind: "feature", message: "Dark mode for PDFs" },
      ])
      .select("id, user_id, kind");
    if (error) throw new Error(error.message);
    aliceRequest = rows!.find((r) => r.user_id === aliceId && r.kind === "feature")!.id;
    aliceNps = rows!.find((r) => r.kind === "nps")!.id;
    bobRequest = rows!.find((r) => r.user_id === bobId)!.id;
  });

  afterAll(async () => {
    // Deleting the users cascades user_feedback, feedback_replies and email_sends.
    if (aliceId) await admin.auth.admin.deleteUser(aliceId);
    if (bobId) await admin.auth.admin.deleteUser(bobId);
  });

  describe("shape and access", () => {
    it("rejects a reply whose student is not the request's student", async () => {
      const { error } = await admin
        .from("feedback_replies")
        .insert({ feedback_id: aliceRequest, user_id: bobId, status: "received" });
      expect(error).not.toBeNull();
    });

    it("rejects a reply to an NPS score (only feature requests get replies)", async () => {
      const { error } = await admin
        .from("feedback_replies")
        .insert({ feedback_id: aliceNps, user_id: aliceId, status: "received" });
      expect(error).not.toBeNull();
    });

    it("rejects an unknown status and an empty or over-long note", async () => {
      for (const bad of [
        { status: "shipped", note: null },
        { status: "done", note: "" },
        { status: "done", note: "x".repeat(1001) },
      ]) {
        const { error } = await admin
          .from("feedback_replies")
          .insert({ feedback_id: bobRequest, user_id: bobId, ...bad });
        expect(error, JSON.stringify(bad).slice(0, 40)).not.toBeNull();
      }
    });

    it("a student cannot write a reply, even to their own request", async () => {
      const { error } = await aliceClient
        .from("feedback_replies")
        .insert({ feedback_id: aliceRequest, user_id: aliceId, status: "done" });
      expect(error).not.toBeNull();
    });
  });

  describe("saveFeedbackReply", () => {
    const mail = fakeSender();

    it("refuses a request that does not exist or is an NPS score", async () => {
      const missing = await saveFeedbackReply(
        admin,
        { feedbackId: randomUUID(), reply: { status: "done", note: null }, repliedBy: null },
        { send: mail.send }
      );
      expect(missing.ok).toBe(false);
      const nps = await saveFeedbackReply(
        admin,
        { feedbackId: aliceNps, reply: { status: "done", note: null }, repliedBy: null },
        { send: mail.send }
      );
      expect(nps.ok).toBe(false);
      expect(mail.sent).toHaveLength(0);
    });

    it("a first reply saves, shows unread and emails the student once", async () => {
      const r = await saveFeedbackReply(
        admin,
        { feedbackId: aliceRequest, reply: { status: "planned", note: "On the list for December." }, repliedBy: null },
        { send: mail.send }
      );
      expect(r).toEqual({ ok: true, email: "sent" });
      expect(mail.sent).toHaveLength(1);
      expect(mail.sent[0].to).toBe(ALICE_EMAIL);
      expect(mail.sent[0].text).toContain("Hi Alice,");
      expect(mail.sent[0].text).toContain("Please add CUET papers");
      expect(await countUnreadReplies(admin, aliceId)).toBe(1);
    });

    it("saving the same status again (even twice) does not email again", async () => {
      const r = await saveFeedbackReply(
        admin,
        { feedbackId: aliceRequest, reply: { status: "planned", note: "On the list for January." }, repliedBy: null },
        { send: mail.send }
      );
      expect(r).toEqual({ ok: true, email: "already_sent" });
      expect(mail.sent).toHaveLength(1);
    });

    it("the student reads it with their own JWT; another student does not", async () => {
      const own = await listOwnRequests(aliceClient);
      const req = own.find((x) => x.id === aliceRequest);
      expect(req?.reply).toMatchObject({ status: "planned", note: "On the list for January.", unread: true });
      // The NPS row is not a request.
      expect(own.find((x) => x.id === aliceNps)).toBeUndefined();

      const { data } = await bobClient.from("feedback_replies").select("feedback_id").eq("feedback_id", aliceRequest);
      expect(data ?? []).toHaveLength(0);
      const { data: anonRows } = await anonClient.from("feedback_replies").select("feedback_id");
      expect(anonRows ?? []).toHaveLength(0);
    });

    it("mark_feedback_replies_seen marks the caller's own replies, not another student's", async () => {
      await saveFeedbackReply(
        admin,
        { feedbackId: bobRequest, reply: { status: "received", note: null }, repliedBy: null },
        { send: mail.send }
      );
      expect(await countUnreadReplies(admin, bobId)).toBe(1);

      const { error } = await aliceClient.rpc("mark_feedback_replies_seen");
      expect(error).toBeNull();
      expect(await countUnreadReplies(admin, aliceId)).toBe(0);
      expect(await countUnreadReplies(admin, bobId)).toBe(1);

      const anonCall = await anonClient.rpc("mark_feedback_replies_seen");
      expect(anonCall.error).not.toBeNull();
    });

    it("a note edit shows unread again without an email", async () => {
      const r = await saveFeedbackReply(
        admin,
        { feedbackId: aliceRequest, reply: { status: "planned", note: "Now for February." }, repliedBy: null },
        { send: mail.send }
      );
      expect(r).toEqual({ ok: true, email: "already_sent" });
      expect(await countUnreadReplies(admin, aliceId)).toBe(1);
    });

    it("a failed send is recorded, then retried by the next save", async () => {
      const before = mail.sent.length;
      mail.state.failing = true;
      const failed = await saveFeedbackReply(
        admin,
        { feedbackId: aliceRequest, reply: { status: "done", note: "CUET is live." }, repliedBy: null },
        { send: mail.send }
      );
      expect(failed).toEqual({ ok: true, email: "failed" });
      const { data: row } = await admin
        .from("email_sends")
        .select("status")
        .eq("dedupe_key", `feedback_reply:${aliceRequest}:done`)
        .single();
      expect(row?.status).toBe("failed");

      mail.state.failing = false;
      const retried = await saveFeedbackReply(
        admin,
        { feedbackId: aliceRequest, reply: { status: "done", note: "CUET is live." }, repliedBy: null },
        { send: mail.send }
      );
      expect(retried).toEqual({ ok: true, email: "sent" });
      expect(mail.sent.length).toBe(before + 1);
      const { data: after } = await admin
        .from("email_sends")
        .select("status, provider_id, error")
        .eq("dedupe_key", `feedback_reply:${aliceRequest}:done`);
      expect(after).toHaveLength(1);
      expect(after![0]).toMatchObject({ status: "sent", error: null });
    });
  });
});
