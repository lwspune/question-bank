/**
 * Integration test for what a drill answer reports back (2026-10-04): whether
 * it FIXED the question (one right answer after a miss, since 2026-10-05), the
 * running fixed count on a fix, and a
 * newly reached "N answered" milestone.
 *
 * Drives `recordDrillAnswer` against the TEST Supabase project as a real
 * signed-in student; the only substitution is the server client, which is the
 * student's own JWT client, so every read and write meets the browser's RLS.
 */
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { mustSignIn } from "./helpers/fixture";

const session = vi.hoisted(() => ({ client: null as unknown }));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: () => session.client }));

import { recordDrillAnswer } from "@/lib/drill/service";
import { CROWD_REVIEW_RUNS } from "@/lib/celebrate/crowd";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const EMAIL = `drill_progress_${STAMP}@test.local`;
const PASSWORD = `Pw-${STAMP}-drill`;
const CROWD_REF = `crowd-drill-test-${STAMP}`;

type Q = { id: string; right: string; wrong: string };

describe.skipIf(!HAS_ENV)("recordDrillAnswer — progress, fixed count, milestone", () => {
  let admin: SupabaseClient;
  let userId = "";
  let qs: Q[] = [];

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const created = await admin.auth.admin.createUser({ email: EMAIL, password: PASSWORD, email_confirm: true });
    if (created.error) throw new Error(created.error.message);
    userId = created.data.user!.id;

    const client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn("drill progress student", client, { email: EMAIL, password: PASSWORD });
    session.client = client;

    const { data, error } = await admin
      .from("questions")
      .select("id, options(label, is_correct)")
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .is("cancelled_note", null)
      .limit(40);
    if (error) throw new Error(error.message);
    for (const q of (data ?? []) as { id: string; options: { label: string; is_correct: boolean }[] }[]) {
      const keyed = q.options.filter((o) => o.is_correct);
      const other = q.options.find((o) => !o.is_correct);
      if (keyed.length === 1 && other) qs.push({ id: q.id, right: keyed[0].label, wrong: other.label });
      if (qs.length === 3) break;
    }
    if (qs.length < 3) throw new Error("test DB has fewer than 3 gradable PUBLIC MCQs");

    // The first question was missed in a mock three days ago.
    const { error: seedError } = await admin.from("user_activity").insert({
      user_id: userId,
      kind: "answer_wrong",
      ref_id: qs[0].id,
      ref_kind: "question",
      metadata: {},
      created_at: new Date(Date.now() - 3 * 86_400_000).toISOString(),
    });
    if (seedError) throw new Error(seedError.message);
  });

  afterAll(async () => {
    if (!admin || !userId) return;
    await admin.from("question_item_stats").delete().eq("source_ref", CROWD_REF);
    await admin.from("question_reviews").delete().eq("note", CROWD_REF);
    await admin.from("user_activity").delete().eq("user_id", userId);
    await admin.auth.admin.deleteUser(userId);
  });

  it("the first right answer after a miss FIXES it and reports the running count", async () => {
    const out = await recordDrillAnswer(qs[0].id, qs[0].right);
    expect(out).toMatchObject({ correct: true, progress: "fixed", fixedTotal: 1 });
  });

  it("a right answer to a question never missed is just right", async () => {
    const out = await recordDrillAnswer(qs[1].id, qs[1].right);
    expect(out).toMatchObject({ correct: true, progress: "right", fixedTotal: null });
  });

  it("a wrong answer is wrong", async () => {
    const out = await recordDrillAnswer(qs[2].id, qs[2].wrong);
    expect(out).toMatchObject({ correct: false, progress: "wrong", fixedTotal: null });
  });

  it("reports a newly reached milestone once", async () => {
    const seeded = Array.from({ length: 10 }, () => ({
      user_id: userId,
      kind: "question_practiced",
      ref_id: qs[1].id,
      ref_kind: "question",
      metadata: { surface: "bank", chose: qs[1].right, correct: true },
    }));
    const { error } = await admin.from("user_activity").insert(seeded);
    if (error) throw new Error(error.message);

    const first = await recordDrillAnswer(qs[2].id, qs[2].wrong);
    expect(first?.milestone).toBe(10);
    const second = await recordDrillAnswer(qs[2].id, qs[2].wrong);
    expect(second?.milestone).toBeNull();
  });

  it("carries the crowd tier on a right answer to a checked question most students missed", async () => {
    const q = qs[1];
    const { data: row, error } = await admin.from("questions").select("content_hash").eq("id", q.id).single();
    if (error) throw new Error(error.message);
    const hash = (row as { content_hash: string }).content_hash;
    const { error: sErr } = await admin.from("question_item_stats").insert({
      question_id: q.id,
      source: "vault_mock",
      source_ref: CROWD_REF,
      seen: 40,
      attempted: 40,
      correct: 10,
      skipped: 0,
      measured_content_hash: hash,
      measured_at: new Date().toISOString(),
    });
    if (sErr) throw new Error(sErr.message);
    const { error: rErr } = await admin.from("question_reviews").insert({
      question_id: q.id,
      reviewed_content_hash: hash,
      method: "structural_probe",
      verdict: "confirmed",
      run_label: CROWD_REVIEW_RUNS[0],
      note: CROWD_REF,
    });
    if (rErr) throw new Error(rErr.message);

    // 75% wrong → the 70 tier.
    expect((await recordDrillAnswer(q.id, q.right))?.crowd).toBe(70);
    expect((await recordDrillAnswer(q.id, q.wrong))?.crowd).toBeNull();
  });
});
