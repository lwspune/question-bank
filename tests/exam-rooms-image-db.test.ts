/**
 * Integration test for pictures on circle messages (migration 0295), against
 * the TEST project (tests/setup.ts refuses prod). The rules hold in the
 * database whatever a route does:
 *
 * - only a TEAM message carries a picture;
 * - a picture always has a description, and a description needs a picture;
 * - the path is circles/<exam>/<name>.png|jpg, nothing else in the bucket.
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
const ROOM = `test-img-${RUN_ID}`;

describe.skipIf(!HAS_ENV)("circle message pictures (0295)", () => {
  let admin: SupabaseClient;
  let student = "";

  const insert = (row: Record<string, unknown>) =>
    admin.from("exam_room_messages").insert({ exam_slug: ROOM, display_name: "PYQ Vault team", body: "Tips", ...row }).select("id, image_path, image_alt").single();

  beforeAll(async () => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const { data, error } = await admin.auth.admin.createUser({ email: `rooms-img-${RUN_ID}@test.local`, email_confirm: true });
    if (error || !data.user) throw new Error(`createUser failed: ${error?.message}`);
    student = data.user.id;
    const room = await admin.from("exam_rooms").insert({ exam_slug: ROOM, open: true });
    if (room.error) throw new Error(room.error.message);
    const member = await admin.from("exam_room_members").insert({ exam_slug: ROOM, user_id: student, display_name: "Asha K." });
    if (member.error) throw new Error(member.error.message);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("exam_rooms").delete().eq("exam_slug", ROOM); // cascades
    if (student) await admin.auth.admin.deleteUser(student);
  });

  it("stores a team message's picture and description", async () => {
    const { data, error } = await insert({ author_kind: "team", image_path: `circles/${ROOM}/a1-b2.png`, image_alt: "Chart of chapter shares" });
    expect(error).toBeNull();
    expect(data).toMatchObject({ image_path: `circles/${ROOM}/a1-b2.png`, image_alt: "Chart of chapter shares" });
  });

  it("refuses a picture on a student message", async () => {
    const { error } = await insert({ author_kind: "student", user_id: student, display_name: "Asha K.", image_path: `circles/${ROOM}/x.png`, image_alt: "x" });
    expect(error?.message).toMatch(/exam_room_messages_image_team_only/);
  });

  it("refuses a picture without a description, and a description alone", async () => {
    expect((await insert({ author_kind: "team", image_path: `circles/${ROOM}/x.png` })).error?.message).toMatch(/exam_room_messages_image_pair/);
    expect((await insert({ author_kind: "team", image_alt: "Chart" })).error?.message).toMatch(/exam_room_messages_image_pair/);
  });

  it("refuses a path outside circles/<exam>/", async () => {
    expect((await insert({ author_kind: "team", image_path: "nda/q1.png", image_alt: "x" })).error?.message).toMatch(/exam_room_messages_image_path/);
    expect((await insert({ author_kind: "team", image_path: `circles/${ROOM}/x.gif`, image_alt: "x" })).error?.message).toMatch(/exam_room_messages_image_path/);
  });
});
