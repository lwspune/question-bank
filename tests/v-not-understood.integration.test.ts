/**
 * A No to V's "Did you understand?" sends the question to Fix your mistakes
 * (owner, 2026-11-08). Integration test against the TEST Supabase project.
 *
 * It proves the two things a unit test cannot:
 *  - the 0241 kind CHECK accepts `v_not_understood`. The activity writer is
 *    best effort, so a refused row would vanish silently and the question would
 *    simply never come back, with nothing failing;
 *  - the drill, read with the student's own login (RLS), sees that row as a
 *    miss, and a right answer later fixes it, as with a wrong answer.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";
import { logActivityOnce } from "@/lib/activity/service";
import { hasPriorWrong, loadDrillEvents } from "@/lib/drill/query";
import { questionState } from "@/lib/drill/select";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = testRunId();
const EMAIL = `v_not_understood_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-vnu`;
const REPLY_ID = "5b0c7f3e-2d4a-4e8b-9c1d-0a1b2c3d4e5f";

describe.skipIf(!HAS_ENV)("a No to V's explanation", () => {
  let admin: SupabaseClient;
  let client: SupabaseClient;
  let userId = "";
  let questionId = "";

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const created = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (created.error) throw new Error(created.error.message);
    userId = created.data.user!.id;
    client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("v-not-understood student", client, { email: EMAIL, password: PASSWORD });

    const { data, error } = await admin.from("questions").select("id").eq("visibility", "PUBLIC").limit(1).single();
    if (error) throw new Error(`seed question: ${error.message}`);
    questionId = (data as { id: string }).id;

    // Exactly what /api/chat/understood writes for a signed-in No.
    await logActivityOnce(admin, userId, {
      kind: "v_not_understood",
      refId: questionId,
      refKind: "question",
      metadata: { surface: "v", interactionId: REPLY_ID },
      dedupeKey: `v_not_understood:${REPLY_ID}`,
    });
  });

  afterAll(async () => {
    if (!userId) return;
    await admin.from("user_activity").delete().eq("user_id", userId);
    await admin.auth.admin.deleteUser(userId);
  });

  it("is stored: the activity log accepts the kind", async () => {
    const { data, error } = await admin
      .from("user_activity")
      .select("kind, metadata")
      .eq("user_id", userId)
      .eq("ref_id", questionId);
    if (error) throw new Error(error.message);
    expect(data).toEqual([{ kind: "v_not_understood", metadata: { surface: "v", interactionId: REPLY_ID } }]);
  });

  it("is kept once per reply, however many times the tap is sent", async () => {
    await logActivityOnce(admin, userId, {
      kind: "v_not_understood",
      refId: questionId,
      refKind: "question",
      metadata: { surface: "v", interactionId: REPLY_ID },
      dedupeKey: `v_not_understood:${REPLY_ID}`,
    });
    const { count } = await admin
      .from("user_activity")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("kind", "v_not_understood");
    expect(count).toBe(1);
  });

  it("puts the question in the drill, read with the student's own login", async () => {
    const events = await loadDrillEvents(client, userId);
    expect(questionState(events.filter((e) => e.questionId === questionId), new Date())).toBe("due");
    expect(await hasPriorWrong(client, userId, questionId)).toBe(true);
  });

  it("leaves the drill once the student answers it right, like any miss", async () => {
    await admin.from("user_activity").insert({
      user_id: userId,
      kind: "answer_correct",
      ref_id: questionId,
      ref_kind: "question",
      metadata: { surface: "drill" },
    });
    const events = await loadDrillEvents(client, userId);
    expect(questionState(events.filter((e) => e.questionId === questionId), new Date())).toBe("retired");
  });
});
