/**
 * get_acquisition_snapshot (migration 0125) — the counts behind /dashboard/pmf's
 * "Where students come from" section.
 *
 * The test project is shared with suites that create users concurrently, so
 * totals are not assertable. Every student here carries a source unique to this
 * run, and the assertions read back only that source's row.
 *
 * Pinned:
 *   - a channel row counts students, and separately those who left a learning
 *     signal, finished a mock, and paid through Razorpay
 *   - staff (an org_members row) are not students and are not counted
 *   - a page view alone is not a learning signal
 *   - p_exam keeps only students who chose that exam
 *   - landings are counted per first page
 *   - anon and a signed-in student cannot call it
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = randomUUID().slice(0, 8);
const SOURCE = `acqtest-${RUN_ID}`;
const LANDING = `/notes/acqtest-${RUN_ID}/page`;
const PASSWORD = `acq-snapshot-${RUN_ID}`;
const ROLES = ["mocker", "idle", "payer", "viewer", "staff"] as const;
type Role = (typeof ROLES)[number];

type ChannelRow = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  beforeTracking: boolean;
  students: number;
  signalled: number;
  mocked: number;
  paid: number;
};
type Snapshot = { channels: ChannelRow[]; landings: (Omit<ChannelRow, "source" | "medium" | "campaign" | "beforeTracking"> & { landing: string | null })[] };

describe.skipIf(!HAS_ENV)("get_acquisition_snapshot (migration 0125)", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  let studentClient: SupabaseClient;
  const ids = {} as Record<Role, string>;
  let orgId = "";
  let mockId = "";
  const since = new Date(Date.now() - 3600_000).toISOString();

  const snapshot = async (exam: string | null = null) => {
    const { data, error } = await admin.rpc("get_acquisition_snapshot", { p_since: since, p_exam: exam });
    expect(error).toBeNull();
    return data as Snapshot;
  };
  const mine = (s: Snapshot) => s.channels.filter((c) => c.source === SOURCE);

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anonClient = createClient(url, anonKey, { auth: { persistSession: false } });

    for (const role of ROLES) {
      const email = `acq-${role}-${RUN_ID}@test.local`;
      const { data, error } = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
      expect(error).toBeNull();
      ids[role] = data.user!.id;
      const { error: pErr } = await admin.from("student_profiles").upsert(
        {
          user_id: ids[role],
          acq_source: SOURCE,
          acq_medium: "referral",
          acq_landing: LANDING,
          target_exams: ["mht-cet"],
        },
        { onConflict: "user_id" }
      );
      expect(pErr).toBeNull();
    }
    studentClient = createClient(url, anonKey, { auth: { persistSession: false } });
    await mustSignIn(`acq-idle-${RUN_ID}@test.local`, studentClient, {
      email: `acq-idle-${RUN_ID}@test.local`,
      password: PASSWORD,
    });

    // mocker: a finished mock (a signal AND a mock)
    const { data: exam } = await admin.from("exams").select("id").order("name").limit(1).single();
    const { data: q } = await admin.from("questions").select("id").eq("visibility", "PUBLIC").limit(1).single();
    mockId = randomUUID();
    const { error: mErr } = await admin.from("mock_tests").insert({
      id: mockId,
      slug: `acq-snapshot-${RUN_ID}`,
      exam_id: exam!.id,
      paper_code: "maths",
      pyq_year: 2099,
      title: `Acquisition snapshot ${RUN_ID}`,
      duration_secs: 60,
      marking: { correct: 1, wrong: 0 },
      sections: [{ key: "mathematics", label: "Mathematics", count: 1 }],
      questions: [{ position: 1, questionId: q!.id, sectionKey: "mathematics", marks: 1, negMarks: 0 }],
      total_questions: 1,
      total_marks: 1,
      status: "draft",
    });
    expect(mErr).toBeNull();
    const { error: aErr } = await admin.from("mock_attempts").insert({
      mock_id: mockId,
      user_id: ids.mocker,
      expires_at: new Date(Date.now() + 3600_000).toISOString(),
      status: "submitted",
      submitted_at: new Date().toISOString(),
    });
    expect(aErr).toBeNull();

    // payer: a Razorpay pass, nothing else
    const { error: eErr } = await admin.from("entitlements").insert({
      user_id: ids.payer,
      scope: "mocks",
      source: "razorpay",
      status: "active",
      note: `test ${RUN_ID}`,
    });
    expect(eErr).toBeNull();

    // viewer: a page view only — reach, not a learning signal
    const { error: vErr } = await admin.from("user_activity").insert({
      user_id: ids.viewer,
      kind: "surface_viewed",
      metadata: { surface: "site" },
      dedupe_key: `acqtest:${RUN_ID}`,
    });
    expect(vErr).toBeNull();

    // staff: an org member is not a student
    const { data: org } = await admin.from("organizations").insert({ name: `__acq_${RUN_ID}` }).select("id").single();
    orgId = org!.id;
    const { error: sErr } = await admin.from("org_members").insert({ user_id: ids.staff, org_id: orgId, role: "TEACHER" });
    expect(sErr).toBeNull();
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("mock_attempts").delete().eq("mock_id", mockId);
    await admin.from("mock_tests").delete().eq("id", mockId);
    await admin.from("entitlements").delete().eq("note", `test ${RUN_ID}`);
    await admin.from("org_members").delete().eq("org_id", orgId);
    await admin.from("organizations").delete().eq("id", orgId);
    for (const id of Object.values(ids)) await admin.auth.admin.deleteUser(id);
  });

  it("counts students, signals, finished mocks and payments per channel — staff excluded", async () => {
    const rows = mine(await snapshot());
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      medium: "referral",
      beforeTracking: false,
      students: 4, // mocker, idle, payer, viewer — not staff
      signalled: 1, // the mocker; a page view is not a signal
      mocked: 1,
      paid: 1,
    });
  });

  it("counts landings per first page", async () => {
    const s = await snapshot();
    expect(s.landings.find((l) => l.landing === LANDING)).toMatchObject({ students: 4, mocked: 1, paid: 1 });
  });

  it("filters by the exam a student chose", async () => {
    expect(mine(await snapshot("mht-cet"))[0]?.students).toBe(4);
    expect(mine(await snapshot("nda"))).toHaveLength(0);
  });

  it("cannot be called by anon or a signed-in student", async () => {
    const a = await anonClient.rpc("get_acquisition_snapshot", { p_since: since, p_exam: null });
    expect(a.error).not.toBeNull();
    const s = await studentClient.rpc("get_acquisition_snapshot", { p_since: since, p_exam: null });
    expect(s.error).not.toBeNull();
  });
});
