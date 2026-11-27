/**
 * exam_room_audience() (migration 0292): the exams the morning circle question
 * goes to (owner, 2026-11-27). Every exam a student chose, plus the guessed
 * exam of a student who chose none. A guess is ignored once the student has
 * chosen, because their circles list ignores it then too. Service role only.
 *
 * Runs against the TEST project (tests/setup.ts refuses prod). Skipped when
 * env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { testRunId } from "./helpers/runId";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN_ID = testRunId();
// Slugs no real exam uses, so the assertions hold whatever else the test DB has.
const CHOSEN = `aud-chosen-${RUN_ID}`.slice(0, 40);
const GUESSED = `aud-guess-${RUN_ID}`.slice(0, 40);
const SHADOWED = `aud-shadow-${RUN_ID}`.slice(0, 40);

describe.skipIf(!HAS_ENV)("exam_room_audience (0292)", () => {
  let admin: SupabaseClient;
  let anonClient: SupabaseClient;
  const users: string[] = [];

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anonClient = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    for (const who of ["chose", "guess", "both"]) {
      const { data, error } = await admin.auth.admin.createUser({ email: `aud-${who}-${RUN_ID}@test.local`, email_confirm: true });
      if (error || !data.user) throw new Error(`createUser failed: ${error?.message}`);
      users.push(data.user.id);
    }
    const [chose, guess, both] = users;
    const profiles = await admin.from("student_profiles").upsert(
      [
        { user_id: chose, target_exams: [CHOSEN] },
        { user_id: guess, target_exams: [] },
        { user_id: both, target_exams: [CHOSEN] },
      ],
      { onConflict: "user_id" }
    );
    if (profiles.error) throw new Error(profiles.error.message);
    const guesses = await admin.from("student_exam_guesses").insert([
      { user_id: guess, exam: GUESSED, source: "practice" },
      { user_id: both, exam: SHADOWED, source: "practice" },
    ]);
    if (guesses.error) throw new Error(guesses.error.message);
  });

  afterAll(async () => {
    for (const id of users) await admin.auth.admin.deleteUser(id);
  });

  it("returns chosen exams and the guess of a student who chose none, once each", async () => {
    const { data, error } = await admin.rpc("exam_room_audience");
    expect(error).toBeNull();
    const slugs = (data as { exam_slug: string }[]).map((r) => r.exam_slug);
    expect(slugs.filter((s) => s === CHOSEN)).toHaveLength(1);
    expect(slugs).toContain(GUESSED);
    expect(slugs).not.toContain(SHADOWED);
  });

  it("is not callable by anon", async () => {
    const { error } = await anonClient.rpc("exam_room_audience");
    expect(error).not.toBeNull();
  });
});
